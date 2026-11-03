import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, realpath, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const project = fileURLToPath(new URL('../', import.meta.url));
const destination = path.join(project, 'notes');
const allowed = new Set(['.md', '.webp', '.png', '.jpg', '.jpeg', '.gif', '.svg', '.avif']);
const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function collect(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const relative = path.join(prefix, entry.name);
    if (entry.isDirectory()) files.push(...await collect(path.join(directory, entry.name), relative));
    else if (entry.isFile() && allowed.has(path.extname(entry.name).toLowerCase())) files.push(relative);
  }
  return files.sort();
}

async function main() {
  const sourceArgument = process.argv[2];
  if (!sourceArgument) throw new Error('Usage: npm run import:notes -- "/path/to/video-notes"');
  const source = await realpath(path.resolve(sourceArgument));
  const projectPath = await realpath(project);
  if (source === projectPath || projectPath.startsWith(`${source}${path.sep}`) || source === destination || source.startsWith(`${destination}${path.sep}`)) {
    throw new Error('Choose a source folder outside this project and its parent folders.');
  }
  const files = await collect(source);
  if (!files.some((file) => file.toLowerCase().endsWith('.md'))) throw new Error('No Markdown files found. Nothing copied.');
  // Preflight every conflict before writing. Repeated imports may add files but never overwrite edits.
  const pending = [];
  for (const relative of files) {
    const bytes = await readFile(path.join(source, relative));
    const target = path.join(destination, relative);
    try {
      const existing = await readFile(target);
      if (!existing.equals(bytes)) throw new Error(`Local file differs: notes/${relative}. Resolve it before importing.`);
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
      pending.push({ relative, bytes });
    }
  }
  for (const { relative, bytes } of pending) {
    const target = path.join(destination, relative);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes, { flag: 'wx' });
  }
  const manifest = [];
  for (const relative of files) {
    const original = await readFile(path.join(source, relative));
    const copied = await readFile(path.join(destination, relative));
    if (!original.equals(copied)) throw new Error(`Verification failed: ${relative}`);
    manifest.push({ path: relative, sha256: digest(copied) });
  }
  await mkdir(path.join(project, '.local'), { recursive: true });
  await writeFile(path.join(project, '.local/import-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  console.log(`Verified ${files.length} unchanged files; copied ${pending.length} new files into notes/.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
