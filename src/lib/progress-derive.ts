import type { ProgressManifest } from './progress-manifest';
import type { ProgressRecords } from './progress-port';

/** Pure roll-ups from chapter records to video and course progress. No storage, no DOM. */

export type ProgressState = 'pending' | 'in-progress' | 'done';
export type ProgressKind = 'chapter' | 'video' | 'course';

export interface Summary {
  read: number;
  total: number;
  /** Whole percent, rounded down so 100 only ever means done. */
  percent: number;
  state: ProgressState;
}

export interface CourseSummary extends Summary {
  lessonsDone: number;
  lessonsTotal: number;
}

export function summarize(chapterIds: readonly string[], records: ProgressRecords): Summary {
  const total = chapterIds.length;
  const read = chapterIds.reduce((count, id) => (id in records ? count + 1 : count), 0);
  const state: ProgressState = total === 0 || read === 0 ? 'pending' : read === total ? 'done' : 'in-progress';
  return { read, total, percent: total === 0 ? 0 : Math.floor((read / total) * 100), state };
}

/** Chapter-weighted: every chapter in the course counts the same, whichever lesson it is in. */
export function summarizeCourse(lessons: readonly (readonly string[])[], records: ProgressRecords): CourseSummary {
  const overall = summarize(lessons.flat(), records);
  return {
    ...overall,
    lessonsDone: lessons.filter((chapters) => summarize(chapters, records).state === 'done').length,
    lessonsTotal: lessons.length,
  };
}

export interface ProgressRef {
  kind: ProgressKind;
  id: string;
}

export function parseRef(value: string): ProgressRef | undefined {
  const split = value.indexOf(':');
  if (split < 1 || split === value.length - 1) return undefined;
  const kind = value.slice(0, split);
  if (kind !== 'chapter' && kind !== 'video' && kind !== 'course') return undefined;
  return { kind, id: value.slice(split + 1) };
}

/** Chapter ids a ref covers: itself, its video's chapters, or all chapters of its course. */
export function chapterIdsFor(ref: ProgressRef, manifest: ProgressManifest | undefined): string[] {
  if (ref.kind === 'chapter') return [ref.id];
  if (!manifest) return [];
  if (ref.kind === 'video') return manifest.videos[ref.id] ?? [];
  return (manifest.courses[ref.id] ?? []).flatMap((videoId) => manifest.videos[videoId] ?? []);
}

export function summarizeRef(ref: ProgressRef, manifest: ProgressManifest | undefined, records: ProgressRecords): CourseSummary {
  if (ref.kind === 'course') {
    const lessons = (manifest?.courses[ref.id] ?? []).map((videoId) => manifest?.videos[videoId] ?? []);
    return summarizeCourse(lessons, records);
  }
  const summary = summarize(chapterIdsFor(ref, manifest), records);
  return { ...summary, lessonsDone: 0, lessonsTotal: 0 };
}

const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export function describeChapter(readAt: string | undefined): string {
  return readAt ? `Read on ${dateFormat.format(new Date(readAt))}` : 'Not read';
}

export function describeSummary(summary: Summary): string {
  if (summary.state === 'done') return 'Completed';
  if (summary.state === 'pending') return 'Not started';
  return `${summary.percent}% · ${summary.read} of ${summary.total} chapters`;
}

export function describeLessons(summary: CourseSummary): string {
  return `${summary.lessonsDone} of ${summary.lessonsTotal} lessons done`;
}

export type ToggleAction = 'read' | 'unread';

/** What the toggle button does next: a finished chapter or video is cleared, anything else is completed. */
export function toggleAction(summary: Summary): ToggleAction {
  return summary.state === 'done' ? 'unread' : 'read';
}

export function toggleLabel(kind: ProgressKind, action: ToggleAction): string {
  const subject = kind === 'chapter' ? '' : ` ${kind}`;
  return `Mark${subject} as ${action}`;
}
