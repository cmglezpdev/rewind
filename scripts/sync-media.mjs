import { cp, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

async function copyMedia(directory, destination) {
  const entries = await readdir(directory, { withFileTypes: true }).catch((error) => {
    if (error.code === 'ENOENT') return [];
    throw error;
  });
  for (const entry of entries) {
    if (entry.name.startsWith('.')) continue;
    const source = path.join(directory, entry.name);
    const target = path.join(destination, entry.name);
    if (entry.isDirectory()) await copyMedia(source, target);
    else if (entry.isFile() && !/\.md$/i.test(entry.name)) {
      await mkdir(path.dirname(target), { recursive: true });
      await cp(source, target);
    }
  }
}
await copyMedia('notes', 'public/media');
