import { parseDocument } from 'yaml';
import { z } from 'zod';

const text = z.string().trim().min(1);
export const tagSchema = text.regex(/^(?=.*[a-z])[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase hyphenated tags containing a letter, such as llm-evaluation. Run npm run tags to reuse existing tags.');
export const noteMetadataSchema = z.object({
  title: text.optional(),
  description: text.optional(),
  url: z.url({ protocol: /^https?$/ }).optional(),
  image: text.optional(),
  tags: z.array(tagSchema).refine((tags) => new Set(tags).size === tags.length, 'Remove duplicate tags.').optional(),
  language: text.regex(/^[a-z]{2,3}(?:-[A-Za-z0-9]{2,8})*$/, 'Use a language code such as en or es.').optional(),
  channel: text.optional(),
  duration: text.optional(),
});
export type NoteMetadata = z.infer<typeof noteMetadataSchema>;

/** Parse metadata once at the file boundary, leaving the Markdown body intact. */
export function parseNote(markdown: string, filename = 'Markdown'): { metadata: NoteMetadata; body: string; hasFrontmatter: boolean } {
  const opening = markdown.match(/^\uFEFF?---[ \t]*\r?\n/);
  if (!opening) return { metadata: {}, body: markdown, hasFrontmatter: false };
  const remaining = markdown.slice(opening[0].length);
  const closing = /^---[ \t]*(?:\r?\n|$)/m.exec(remaining);
  if (!closing) throw new Error(`${filename}: frontmatter is missing its closing --- line.`);
  const yaml = parseDocument(remaining.slice(0, closing.index));
  if (yaml.errors.length) throw new Error(`${filename}: invalid frontmatter: ${yaml.errors.map((error) => error.message).join('; ')}`);
  const data: unknown = yaml.toJS({ maxAliasCount: 0 });
  const result = noteMetadataSchema.safeParse(data ?? {});
  if (!result.success) {
    throw new Error(`${filename}: invalid frontmatter: ${result.error.issues.map((issue) => `${issue.path.join('.') || 'metadata'}: ${issue.message}`).join('; ')}`);
  }
  return {
    metadata: result.data,
    body: remaining.slice(closing.index + closing[0].length),
    hasFrontmatter: true,
  };
}
