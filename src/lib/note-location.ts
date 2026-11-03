import { readdir } from 'node:fs/promises';
import path from 'node:path';

const projectDirectories = new Set(['notes', 'src', 'public', 'scripts', 'node_modules', 'dist']);

async function containsTranscript(directory: string): Promise<boolean> {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    if (entry.isFile() && /^transcript\.md$/i.test(entry.name)) return true;
    if (entry.isDirectory() && await containsTranscript(path.join(directory, entry.name))) return true;
  }
  return false;
}

/** Catch generated libraries the reader would otherwise silently ignore. */
export async function findMisplacedNotes(root: string): Promise<string[]> {
  const misplaced: string[] = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || projectDirectories.has(entry.name)) continue;
    if (entry.isFile() && /^(?:transcript\.md|\d+-.+\.md|cover\.(?:webp|png|jpe?g))$/i.test(entry.name)) misplaced.push(entry.name);
    if (entry.isDirectory() && await containsTranscript(path.join(root, entry.name))) misplaced.push(entry.name);
  }
  return misplaced.sort();
}
