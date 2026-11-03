import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { parseNote } from '../src/lib/frontmatter';

const args = process.argv.slice(2);
if (args.some((arg) => arg !== '--json')) throw new Error('Usage: npm run tags [-- --json]');
const usage = new Map<string, number>();
for (const file of (await readdir('notes', { recursive: true })).filter((file) => /\.md$/i.test(file)).sort()) {
  const filename = path.join('notes', file);
  const { metadata } = parseNote(await readFile(filename, 'utf8'), filename);
  for (const tag of metadata.tags ?? []) usage.set(tag, (usage.get(tag) ?? 0) + 1);
}
const tags = [...usage].sort(([a], [b]) => a.localeCompare(b)).map(([tag, notes]) => ({ tag, notes }));
if (args.includes('--json')) process.stdout.write(`${JSON.stringify(tags, null, 2)}\n`);
else process.stdout.write(`${tags.map(({ tag, notes }) => `${tag}\t${notes}`).join('\n')}\n`);
