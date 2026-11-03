import { getDocument, getLibrary } from '../src/lib/library';
import { access, readFile } from 'node:fs/promises';
import { parseNote } from '../src/lib/frontmatter';

const library = await getLibrary();
const routes = new Set(library.documents.map((document) => document.href));
const failures: string[] = [];
const catalogOverviews = new Set([...library.videos, ...library.courses].map((entry) => entry.overview.id));
for (const document of library.documents.filter((document) => document.kind === 'overview')) {
  if (!catalogOverviews.has(document.id)) failures.push(`${document.sourcePath}: README is not associated with a video or course. Add the video source url or transcript, or place course lessons beneath it.`);
}
for (const entry of [...library.videos, ...library.courses]) {
  const { metadata, body, hasFrontmatter } = parseNote(await readFile(entry.overview.sourcePath, 'utf8'), entry.overview.sourcePath);
  if (!hasFrontmatter) failures.push(`${entry.overview.sourcePath}: add YAML frontmatter. See notes/AGENTS.md.`);
  if (!/^#\s+\S/m.test(body) && !metadata.title) failures.push(`${entry.overview.sourcePath}: add a # heading or frontmatter title.`);
  if (!metadata.description) failures.push(`${entry.overview.sourcePath}: add a description.`);
  if (!metadata.url) failures.push(`${entry.overview.sourcePath}: add the source url.`);
  if ('tags' in entry) {
    if (!metadata.tags?.length) failures.push(`${entry.overview.sourcePath}: add tags; run npm run tags to reuse existing ones.`);
    if (!metadata.language) failures.push(`${entry.overview.sourcePath}: add a language code.`);
    if (entry.image.startsWith('/media/')) {
      try { await access(`notes/${decodeURIComponent(entry.image.slice('/media/'.length))}`); }
      catch { failures.push(`${entry.overview.sourcePath}: cover image does not exist: ${entry.image}`); }
    } else if (!entry.image.startsWith('https://') && entry.image !== '/placeholder-cover.svg') {
      failures.push(`${entry.overview.sourcePath}: image must point to an existing local asset or an HTTPS URL.`);
    }
  }
}
let diagramDocuments = 0;
for (const document of library.documents) {
  const rendered = await getDocument(document.id);
  if (!rendered) { failures.push(`Missing document ${document.id}`); continue; }
  if (rendered.html.includes('language-mermaid')) diagramDocuments += 1;
  for (const [, href] of rendered.html.matchAll(/href="(\/notes\/[^"#?]*)(?:[#?][^"]*)?"/g)) {
    if (href && !routes.has(href)) failures.push(`${document.id}: ${href}`);
  }
}
if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exitCode = 1;
}
process.stdout.write(`Rendered ${library.documents.length} documents, ${library.videos.length} videos, ${library.courses.length} courses, ${diagramDocuments} documents with diagrams; ${failures.length} unresolved Markdown links.\n`);
