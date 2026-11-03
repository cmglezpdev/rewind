export function languageLabel(code: string): string {
  if (!code || code === 'und') return 'Unspecified';
  try {
    return new Intl.DisplayNames(['en'], { type: 'language' }).of(code) ?? code;
  } catch {
    return code;
  }
}

export function kindLabel(kind: 'overview' | 'topic' | 'transcript' | 'index'): string {
  if (kind === 'transcript') return 'Full transcript';
  if (kind === 'topic') return 'Chapter notes';
  if (kind === 'overview') return 'Overview';
  return 'Index';
}

export function tagLabel(tag: string): string {
  const acronyms = new Set(['ai', 'llm', 'sql', 'ui', 'rag']);
  return tag.split('-').map((word, index) => acronyms.has(word) ? word.toUpperCase() : index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word).join(' ');
}

