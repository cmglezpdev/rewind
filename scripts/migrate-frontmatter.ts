import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { stringify } from 'yaml';
import { z } from 'zod';
import { noteMetadataSchema, parseNote } from '../src/lib/frontmatter';

const entrySchema = z.object({
  name: z.string().trim().min(1),
  description: z.string().optional(),
  url: z.url({ protocol: /^https?$/ }).optional(),
  image: z.string().optional(),
  tags: z.array(z.string().trim().min(1)).optional(),
  language: z.string().optional(),
  channel: z.string().optional(),
  duration: z.string().optional(),
}).strict();
const catalogSchema = z.object({
  videos: z.record(z.string(), entrySchema),
  courses: z.record(z.string(), entrySchema),
}).strict();

function fail(message: string): never {
  console.error(`Frontmatter migration: ${message}`);
  process.exit(1);
}

function normalizeTag(tag: string): string {
  const normalized = tag.normalize('NFKD').toLowerCase()
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!normalized) throw new Error(`tag ${JSON.stringify(tag)} has no usable characters`);
  return normalized;
}

async function readmeFor(folder: string): Promise<string> {
  const dir = resolve('notes', folder);
  let names: string[];
  try { names = await readdir(dir); }
  catch { throw new Error(`notes folder does not exist: notes/${folder}`); }
  const matches = names.filter((name) => /^readme\.md$/i.test(name));
  if (matches.length !== 1) throw new Error(`expected exactly one case-insensitive README.md in notes/${folder}; found ${matches.length}`);
  return join(dir, matches[0]);
}

async function main() {
  const input = process.argv[2];
  if (!input || process.argv.length !== 3) fail('usage: node --import tsx scripts/migrate-frontmatter.ts <legacy-json-path>');
  let raw: unknown;
  try { raw = JSON.parse(await readFile(resolve(input), 'utf8')); }
  catch (error) { fail(`cannot read/parse ${input}: ${String(error)}`); }
  const parsed = catalogSchema.safeParse(raw);
  if (!parsed.success) fail(`invalid legacy catalog: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`);
  const catalog = parsed.data;
  const entries = [
    ...Object.entries(catalog.videos).map(([folder, metadata]) => ({ folder, metadata })),
    ...Object.entries(catalog.courses).map(([folder, metadata]) => ({ folder, metadata })),
  ];

  // Preflight every target and build every prefix before writing anything.
  const plans: { path: string; body: string; prefix: string; skip: boolean }[] = [];
  const uniquePaths = new Set<string>();
  try {
    for (const { folder, metadata } of entries) {
      if (!folder.split('/').every((part) => /^[a-z0-9][a-z0-9-]*$/.test(part))) throw new Error(`invalid folder key ${JSON.stringify(folder)}`);
      const path = await readmeFor(folder);
      if (uniquePaths.has(path)) throw new Error(`multiple catalog entries resolve to ${path}`);
      uniquePaths.add(path);
      const body = await readFile(path, 'utf8');
      const skip = parseNote(body, path).hasFrontmatter;
      const frontmatter: Record<string, unknown> = { title: metadata.name };
      for (const key of ['description', 'url', 'image', 'tags', 'language', 'channel', 'duration'] as const) {
        const value = metadata[key];
        if (value === undefined) continue;
        if (key === 'image' && typeof value === 'string') {
          const portable = value.match(new RegExp(`^/media/${folder}/cover\\.webp$`));
          frontmatter[key] = portable ? './cover.webp' : value;
        } else if (key === 'tags' && Array.isArray(value)) {
          frontmatter[key] = [...new Set(value.map(normalizeTag))];
        } else frontmatter[key] = value;
      }
      const yaml = stringify(noteMetadataSchema.parse(frontmatter), { lineWidth: 0 }).replace(/\n$/, '');
      plans.push({ path, body, prefix: `---\n${yaml}\n---\n`, skip });
    }
  } catch (error) { fail(String(error)); }

  const changed: typeof plans = [];
  for (const plan of plans) {
    if (plan.skip) continue;
    await writeFile(plan.path, plan.prefix + plan.body, 'utf8');
    changed.push(plan);
  }
  const tags = [...new Set(entries.flatMap(({ metadata }) => (metadata.tags ?? []).map(normalizeTag)))].sort();
  console.log(`Migrated ${changed.length} README(s); skipped ${plans.length - changed.length} with existing frontmatter.`);
  console.log(`Tags (${tags.length}): ${tags.join(', ')}`);
  if (changed.length) console.log(`Changed paths: ${changed.map(({ path }) => path).join(', ')}`);
}

main().catch((error) => fail(String(error)));
