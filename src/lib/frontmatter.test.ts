import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseNote } from './frontmatter';
import { renderMarkdown, titleOf } from './library';

test('YAML properties are parsed without changing the portable Markdown body', () => {
  const body = '# Existing title\r\n\r\n[Chapter](01-topic.md)\r\n';
  const note = parseNote(`\uFEFF---\r\ntitle: Metadata fallback\r\ndescription: >-\r\n  First line\r\n  second line\r\ntags: [ai-coding, llm-evaluation]\r\nduration: "12:34"\r\nobsidian-property: kept-on-disk\r\n---\r\n${body}`, 'example/README.md');
  assert.equal(note.body, body);
  assert.equal(note.metadata.description, 'First line second line');
  assert.equal(note.metadata.duration, '12:34');
  assert.deepEqual(note.metadata.tags, ['ai-coding', 'llm-evaluation']);
  assert.equal(titleOf(note.body, note.metadata.title ?? 'Fallback'), 'Existing title');
  assert.equal(titleOf('No heading here.', note.metadata.title ?? 'Fallback'), 'Metadata fallback');
  assert.equal(titleOf('```md\n# Example inside code\n```\n\n# Real *heading* with `code`', 'Fallback'), 'Real heading with code');
  assert.deepEqual(parseNote('---\n---\n# Empty metadata').metadata, {});
  assert.equal(parseNote(body).hasFrontmatter, false);
});

test('malformed metadata fails with a filename and actionable field errors', () => {
  const invalid = [
    '---\ntags: [AI coding]\n---\n# Title',
    '---\ntags: [1234]\n---\n# Title',
    '---\ntags: [ai-coding, ai-coding]\n---\n# Title',
    '---\nurl: javascript:alert(1)\n---\n# Title',
    '---\nduration: 123\n---\n# Title',
    '---\ntitle: [broken\n---\n# Title',
    '---\ntitle: Duplicate\ntitle: Again\n---\n# Title',
    '---\ntitle: Missing closing marker',
  ];
  for (const markdown of invalid) assert.throws(() => parseNote(markdown, 'bad/README.md'), /bad\/README\.md:/);
});

test('reader hides YAML and the repeated title while preserving its anchor and chapter navigation', async () => {
  const rendered = await renderMarkdown('---\ntitle: Metadata title\ndescription: Private metadata text\n---\n# Actual title\n\n## Details\n\n[Title](#actual-title)', 'video/README', new Set(), { omitTitle: true });
  assert.equal(rendered.titleId, 'actual-title');
  assert.doesNotMatch(rendered.html, /<h1|Metadata title|Private metadata text/);
  assert.match(rendered.html, /<h2 id="details">Details<\/h2>/);
  assert.match(rendered.html, /href="#actual-title"/);
  assert.deepEqual(rendered.headings.map((heading) => heading.text), ['Details']);
});

test('new video folders use only their own frontmatter without any central catalog', async () => {
  const directory = await mkdtemp(path.join(tmpdir(), 'video-frontmatter-'));
  try {
    await mkdir(path.join(directory, 'notes', 'new-video'), { recursive: true });
    await writeFile(path.join(directory, 'notes', 'new-video', 'README.md'), '---\ntitle: Fallback title\ndescription: A new video\nurl: https://youtu.be/NEW_VIDEO\nimage: ./cover.webp\ntags: [llm-evaluation]\nlanguage: en\n---\n# Original heading\n\n[Chapter](01-topic.md)\n');
    await writeFile(path.join(directory, 'notes', 'new-video', '01-topic.md'), '---\ntitle: Chapter fallback\n---\nChapter text without an H1.');
    await writeFile(path.join(directory, 'notes', 'new-video', 'cover.webp'), 'fixture image');
    await writeFile(path.join(directory, 'notes', 'AGENTS.md'), '# Instructions');
    const libraryUrl = new URL('./library.ts', import.meta.url).href;
    const program = `import { getLibrary, getDocument } from ${JSON.stringify(libraryUrl)}; const library = await getLibrary(); const chapter = await getDocument('new-video/01-topic'); console.log(JSON.stringify({library,chapter}));`;
    const result = spawnSync(process.execPath, ['--import', import.meta.resolve('tsx'), '--input-type=module', '-e', program], { cwd: directory, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    const { library, chapter } = JSON.parse(result.stdout);
    assert.equal(library.documents.length, 2);
    assert.equal(library.videos.length, 1);
    assert.equal(library.videos[0].name, 'Original heading');
    assert.equal(library.videos[0].image, '/media/new-video/cover.webp');
    assert.deepEqual(library.tags, ['llm-evaluation']);
    assert.equal(chapter.title, 'Chapter fallback');
    assert.equal(chapter.videoId, 'new-video');
    assert.equal(chapter.sourcePath, 'notes/new-video/01-topic.md');
    const validator = new URL('../../scripts/validate-library.ts', import.meta.url).pathname;
    const validate = () => spawnSync(process.execPath, ['--import', import.meta.resolve('tsx'), validator], { cwd: directory, encoding: 'utf8' });
    const valid = validate();
    assert.equal(valid.status, 0, valid.stderr);
    const readmePath = path.join(directory, 'notes', 'new-video', 'README.md');
    await writeFile(readmePath, (await readFile(readmePath, 'utf8')).replace('description: A new video\n', ''));
    const incomplete = validate();
    assert.equal(incomplete.status, 1);
    assert.match(incomplete.stderr, /notes\/new-video\/README.md: add a description/);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
