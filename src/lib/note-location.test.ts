import assert from 'node:assert/strict';
import test from 'node:test';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { findMisplacedNotes } from './note-location';

test('validation catches misplaced standalone videos, playlists, and loose notes while allowing notes and application folders', async () => {
  const root = await mkdtemp(path.join(tmpdir(), 'rewind-location-'));
  try {
    for (const directory of ['wrong-video', 'wrong-course/lesson', 'notes/right-video', 'src/fixture', 'node_modules/package', '.local/draft']) {
      await mkdir(path.join(root, directory), { recursive: true });
      await writeFile(path.join(root, directory, 'transcript.md'), '# Transcript');
    }
    await writeFile(path.join(root, '01-topic.md'), '# Topic');
    await writeFile(path.join(root, 'README.md'), '# Rewind');
    assert.deepEqual(await findMisplacedNotes(root), ['01-topic.md', 'wrong-course', 'wrong-video']);
    await rm(path.join(root, 'wrong-video'), { recursive: true });
    await rm(path.join(root, 'wrong-course'), { recursive: true });
    await rm(path.join(root, '01-topic.md'));
    assert.deepEqual(await findMisplacedNotes(root), []);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
