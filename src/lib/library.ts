import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { visit } from 'unist-util-visit';
import type { Root, Element, RootContent } from 'hast';
import type { PhrasingContent } from 'mdast';
import { parseNote, type NoteMetadata } from './frontmatter';

export interface NoteDocument {
  id: string;
  title: string;
  href: string;
  sourcePath: string;
  kind: 'overview' | 'topic' | 'transcript' | 'index';
  videoId?: string;
  courseId?: string;
}
export interface Video {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  tags: string[];
  language: string;
  channel?: string;
  duration?: string;
  courseId?: string;
  overview: NoteDocument;
  documents: NoteDocument[];
}
export interface Course {
  id: string;
  name: string;
  description: string;
  url?: string;
  videos: Video[];
  overview: NoteDocument;
}
export interface Library {
  videos: Video[];
  courses: Course[];
  documents: NoteDocument[];
  tags: string[];
}
export interface Heading { depth: number; slug: string; text: string }
export interface RenderedDocument extends NoteDocument { html: string; headings: Heading[]; titleId?: string }

export const notesDirectory = path.resolve('notes');

async function filesIn(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error: unknown) => {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') return [];
    throw error;
  });
  const lists = await Promise.all(entries.filter((entry) => !entry.name.startsWith('.')).map(async (entry) => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(filename) : entry.isFile() ? [filename] : [];
  }));
  return lists.flat().sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
}

function plainText(value: string): string {
  return value.replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();
}
function headingText(node: PhrasingContent): string {
  if ('value' in node) return node.value;
  if ('alt' in node) return node.alt ?? '';
  return 'children' in node ? node.children.map(headingText).join('') : '';
}
export function titleOf(markdown: string, fallback: string): string {
  const heading = unified().use(remarkParse).use(remarkGfm).parse(markdown).children.find((node) => node.type === 'heading' && node.depth === 1);
  return (heading?.type === 'heading' ? heading.children.map(headingText).join('').trim() : '') || plainText(fallback);
}
function descriptionOf(markdown: string): string {
  return plainText(markdown.split(/\n\s*\n/).find((line) => !/^[#|!<>\-\d]/.test(line.trim()) && line.trim().length > 40) ?? '').slice(0, 280);
}
function sourceUrl(markdown: string): string {
  return markdown.match(/https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)[A-Za-z0-9_-]+/)?.[0] ?? '';
}
export function documentHref(id: string): string {
  return `/notes/${id.split('/').map(encodeURIComponent).join('/')}/`;
}

interface Source { document: NoteDocument; filename: string; markdown: string; metadata: NoteMetadata }
interface Catalog { library: Library; sources: Map<string, Source>; fileNames: Set<string> }
let catalogPromise: Promise<Catalog> | undefined;

async function loadCatalog(): Promise<Catalog> {
  const files = await filesIn(notesDirectory);
  const fileNames = new Set(files.map((file) => path.relative(notesDirectory, file).split(path.sep).join('/')));
  const sources = new Map<string, Source>();
  for (const filename of files.filter((file) => /\.md$/i.test(file) && !/^(?:AGENTS|CLAUDE)\.md$/i.test(path.basename(file)))) {
    const relative = path.relative(notesDirectory, filename).split(path.sep).join('/');
    const id = relative.replace(/\.md$/i, '');
    const { body: markdown, metadata } = parseNote(await readFile(filename, 'utf8'), relative);
    const name = path.basename(relative);
    sources.set(id, { filename, markdown, metadata, document: {
      id, title: titleOf(markdown, metadata.title ?? path.basename(id).replace(/^\d+-/, '').replaceAll('-', ' ')), href: documentHref(id), sourcePath: `notes/${relative}`,
      kind: /^readme\.md$/i.test(name) ? (id.includes('/') ? 'overview' : 'index') : /^transcript\.md$/i.test(name) ? 'transcript' : 'topic',
    } });
  }
  const videos: Video[] = [];
  const videoFolders = new Set([...sources.values()].filter(({ document, metadata, markdown }) =>
    document.kind === 'transcript' || (document.kind === 'overview' && sourceUrl(metadata.url ?? markdown) !== ''),
  ).map(({ document }) => path.posix.dirname(document.id)));
  for (const folder of videoFolders) {
    const overviewSource = [...sources.values()].find(({ document }) => path.posix.dirname(document.id) === folder && document.kind === 'overview');
    if (!overviewSource) continue;
    const metadata = overviewSource.metadata;
    const documents = [...sources.values()].filter(({ document }) => path.posix.dirname(document.id) === folder).map(({ document }) => document);
    const parent = path.posix.dirname(folder);
    const courseId = parent === '.' ? undefined : parent;
    for (const document of documents) {
      document.videoId = folder;
      if (courseId) document.courseId = courseId;
    }
    const url = metadata.url ?? sourceUrl(overviewSource.markdown);
    const videoId = url.match(/(?:v=|youtu\.be\/)([A-Za-z0-9_-]+)/)?.[1];
    const localCover = `${folder}/cover.webp`;
    videos.push({
      id: folder, name: overviewSource.document.title,
      description: metadata.description ?? descriptionOf(overviewSource.markdown),
      url, image: metadata.image ? resolveReference(metadata.image, overviewSource.document.id, fileNames) : (fileNames.has(localCover) ? `/media/${localCover}` : videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : '/placeholder-cover.svg'),
      tags: metadata.tags ?? [], language: metadata.language ?? 'und', channel: metadata.channel, duration: metadata.duration, courseId,
      overview: overviewSource.document, documents,
    });
  }
  const courses: Course[] = [];
  for (const source of sources.values()) {
    const folder = path.posix.dirname(source.document.id);
    if (source.document.kind !== 'overview' || videoFolders.has(folder)) continue;
    const members = videos.filter((video) => video.courseId === folder);
    if (!members.length) continue;
    const metadata = source.metadata;
    source.document.courseId = folder;
    courses.push({ id: folder, name: source.document.title, description: metadata.description ?? descriptionOf(source.markdown), url: metadata.url, videos: members, overview: source.document });
  }
  return { library: { videos, courses, documents: [...sources.values()].map(({ document }) => document), tags: [...new Set(videos.flatMap((video) => video.tags))].sort() }, sources, fileNames };
}

function catalog(): Promise<Catalog> {
  catalogPromise ??= loadCatalog();
  return catalogPromise;
}
export async function getLibrary(): Promise<Library> { return (await catalog()).library; }

/** Translate portable Markdown references only at render time; source files stay unchanged. */
export function resolveReference(value: string, sourceId: string, fileNames: Set<string>): string {
  if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return value;
  const match = value.match(/^([^?#]*)(.*)$/);
  if (!match) return value;
  let relative: string;
  try { relative = decodeURIComponent(match[1] ?? ''); } catch { return value; }
  const suffix = match[2] ?? '';
  const candidates = [path.posix.normalize(path.posix.join(path.posix.dirname(sourceId), relative)), relative.replace(/^\/?(?:videos?-notes\/)?/, '')];
  const target = candidates.find((candidate) => fileNames.has(candidate)) ?? candidates[0] ?? '';
  if (target.startsWith('../') || target.startsWith('/')) return value;
  if (/\.md$/i.test(target)) return documentHref(target.replace(/\.md$/i, '')) + suffix;
  if (fileNames.has(target)) return `/media/${target.split('/').map(encodeURIComponent).join('/')}${suffix}`;
  return value;
}
function textOf(node: RootContent | Element): string {
  if (node.type === 'text') return node.value;
  return 'children' in node ? node.children.map(textOf).join('') : '';
}

export async function getDocument(id: string): Promise<RenderedDocument | undefined> {
  const { sources, fileNames } = await catalog();
  const source = sources.get(id);
  if (!source) return undefined;
  const rendered = await renderMarkdown(source.markdown, id, fileNames, { omitTitle: true });
  return { ...source.document, ...rendered };
}

export async function renderMarkdown(markdown: string, id: string, fileNames: Set<string>, { omitTitle = false } = {}): Promise<Pick<RenderedDocument, 'html' | 'headings' | 'titleId'>> {
  const { body } = parseNote(markdown, id);
  const headings: Heading[] = [];
  let titleId: string | undefined;
  const processor = unified().use(remarkParse).use(remarkGfm).use(remarkRehype, { allowDangerousHtml: true }).use(rehypeRaw).use(rehypeSanitize).use(rehypeSlug)
    .use(() => (tree: Root) => {
      if (omitTitle) {
        const titleIndex = tree.children.findIndex((node) => node.type === 'element' && node.tagName === 'h1');
        const title = tree.children[titleIndex];
        if (title?.type === 'element') {
          if (typeof title.properties.id === 'string') titleId = title.properties.id;
          tree.children.splice(titleIndex, 1);
        }
      }
      visit(tree, 'element', (node: Element) => {
        for (const property of ['href', 'src']) {
          const value = node.properties[property];
          if (typeof value === 'string') node.properties[property] = resolveReference(value, id, fileNames);
        }
        if (/^h[1-6]$/.test(node.tagName) && typeof node.properties.id === 'string') headings.push({ depth: Number(node.tagName[1]), slug: node.properties.id, text: textOf(node) });
      });
    }).use(rehypeStringify);
  const result = await processor.process(body);
  return { html: String(result), headings, titleId };
}
