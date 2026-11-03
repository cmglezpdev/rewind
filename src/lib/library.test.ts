import assert from 'node:assert/strict';
import test from 'node:test';
import { getDocument, getLibrary, renderMarkdown, resolveReference } from './library';

const files = new Set(['readme.md', 'course/README.md', 'course/lesson/README.md', 'course/lesson/01-topic.md', 'course/lesson/cover.webp']);

test('portable references map to reader pages and local media while preserving timestamps and fragments', () => {
  assert.equal(resolveReference('01-topic.md#details', 'course/lesson/README', files), '/notes/course/lesson/01-topic/#details');
  assert.equal(resolveReference('../README.md', 'course/lesson/README', files), '/notes/course/README/');
  assert.equal(resolveReference('/course/lesson/README.md', 'course/lesson/01-topic', files), '/notes/course/lesson/README/');
  assert.equal(resolveReference('videos-notes/course/lesson/README.md', 'course/lesson/01-topic', files), '/notes/course/lesson/README/');
  assert.equal(resolveReference('./cover.webp', 'course/lesson/README', files), '/media/course/lesson/cover.webp');
  assert.equal(resolveReference('https://youtube.com/watch?v=abc&t=42', 'course/lesson/README', files), 'https://youtube.com/watch?v=abc&t=42');
  assert.equal(resolveReference('#details', 'course/lesson/README', files), '#details');
});

test('imported corpus exposes all videos and courses and its original root index', async () => {
  const library = await getLibrary();
  if (!library.documents.length) return;
  assert.ok(library.videos.length >= 95);
  assert.ok(library.courses.length >= 3);
  assert.ok(library.documents.length >= 1082);
  assert.ok(library.videos.every((video) => video.url.startsWith('https://')));
  const index = await getDocument('readme');
  assert.match(index?.html ?? '', /\/notes\/ai-skills-with-matt-pocock\/README\//);
  assert.match(index?.html ?? '', /\/media\/ai-skills-with-matt-pocock\/cover.webp/);
  const noCover = library.videos.find((video) => video.id === 'kimi-k3-es-salvaje-lo-siento-claude');
  assert.match(noCover?.image ?? '', /^https:\/\/i.ytimg.com/);
});

test('real Markdown pipeline renders tables, HTML images, diagrams and stable duplicate heading ids safely', async () => {
  const markdown = '# Topic\n\n## Details\n\n## Details\n\n| A | B |\n| - | - |\n| 1 | 2 |\n\n<img src="cover.webp" alt="Cover" width="144">\n\n[Next](01-topic.md#details)\n\n```mermaid\ngraph TD; A-->B;\n```\n\n<script>alert(1)</script>';
  const rendered = await renderMarkdown(markdown, 'course/lesson/README', files);
  assert.match(rendered.html, /<table>/);
  assert.match(rendered.html, /src="\/media\/course\/lesson\/cover.webp"/);
  assert.match(rendered.html, /href="\/notes\/course\/lesson\/01-topic\/#details"/);
  assert.match(rendered.html, /class="language-mermaid"/);
  assert.doesNotMatch(rendered.html, /<script>/);
  assert.deepEqual(rendered.headings.map(({ slug }) => slug), ['topic', 'details', 'details-1']);
});
