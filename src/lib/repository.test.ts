import assert from 'node:assert/strict';
import test from 'node:test';
import { githubEditUrl } from './repository';

test('GitHub links point at exact Markdown files, including branch and filename case', () => {
  assert.equal(githubEditUrl({ repositoryUrl: 'https://github.com/example/notes.git', sourcePath: 'notes/video/README.md' }), 'https://github.com/example/notes/edit/main/notes/video/README.md');
  assert.equal(githubEditUrl({ repositoryUrl: 'https://github.com/example/notes/', branch: 'draft/notes', sourcePath: 'notes/curso español/01-topic.md' }), 'https://github.com/example/notes/edit/draft%2Fnotes/notes/curso%20espa%C3%B1ol/01-topic.md');
  assert.equal(githubEditUrl({ repositoryUrl: '', sourcePath: 'notes/readme.md' }), undefined);
  assert.throws(() => githubEditUrl({ repositoryUrl: 'https://example.com/notes', sourcePath: 'notes/readme.md' }), /GITHUB_REPOSITORY_URL/);
  assert.throws(() => githubEditUrl({ repositoryUrl: 'https://github.com/example/notes', sourcePath: '../notes/readme.md' }), /repository-relative/);
});
