import assert from 'node:assert/strict';
import test from 'node:test';
import {
  chapterIdsFor,
  describeChapter,
  describeLessons,
  describeSummary,
  parseRef,
  summarize,
  summarizeCourse,
  summarizeRef,
  toggleAction,
  toggleLabel,
} from './progress-derive';
import { buildManifest, chapterIdsOf } from './progress-manifest';
import type { ProgressRecords } from './progress-port';

const read = (...ids: string[]): ProgressRecords => Object.fromEntries(ids.map((id) => [id, { readAt: '2026-11-02T12:00:00.000Z' }]));

test('a video is pending, in progress or done depending on how many chapters are read', () => {
  const ids = ['a/01', 'a/02', 'a/03', 'a/04'];
  assert.deepEqual(summarize(ids, {}), { read: 0, total: 4, percent: 0, state: 'pending' });
  assert.deepEqual(summarize(ids, read('a/01')), { read: 1, total: 4, percent: 25, state: 'in-progress' });
  assert.deepEqual(summarize(ids, read(...ids)), { read: 4, total: 4, percent: 100, state: 'done' });
});

test('percent rounds down so 100 only means done', () => {
  const ids = Array.from({ length: 300 }, (_, index) => `a/${index}`);
  const summary = summarize(ids, read(...ids.slice(1)));
  assert.equal(summary.percent, 99);
  assert.equal(summary.state, 'in-progress');
});

test('a video without chapters stays pending and never divides by zero', () => {
  assert.deepEqual(summarize([], read('x')), { read: 0, total: 0, percent: 0, state: 'pending' });
});

test('records for chapters that no longer exist are ignored', () => {
  assert.equal(summarize(['a/01', 'a/02'], read('a/01', 'deleted/01', 'deleted/02')).read, 1);
});

test('a chapter added to a finished video makes it in progress again', () => {
  const before = ['a/01', 'a/02'];
  assert.equal(summarize(before, read(...before)).state, 'done');
  assert.equal(summarize([...before, 'a/03'], read(...before)).state, 'in-progress');
});

test('course progress is weighted by chapters, with a separate count of finished lessons', () => {
  const lessons = [['a/01', 'a/02', 'a/03', 'a/04', 'a/05', 'a/06', 'a/07', 'a/08'], ['b/01', 'b/02']];
  const summary = summarizeCourse(lessons, read('b/01', 'b/02', 'a/01'));
  assert.equal(summary.read, 3);
  assert.equal(summary.total, 10);
  assert.equal(summary.percent, 30);
  assert.equal(summary.state, 'in-progress');
  assert.equal(summary.lessonsDone, 1);
  assert.equal(summary.lessonsTotal, 2);
});

const manifest = buildManifest({
  videos: [
    { id: 'c/one', documents: [{ id: 'c/one/README', kind: 'overview' }, { id: 'c/one/02-b', kind: 'topic' }, { id: 'c/one/01-a', kind: 'topic' }, { id: 'c/one/transcript', kind: 'transcript' }] },
    { id: 'c/two', documents: [{ id: 'c/two/01-a', kind: 'topic' }] },
  ],
  courses: [{ id: 'c', videos: [{ id: 'c/one' }, { id: 'c/two' }] }],
} as unknown as Parameters<typeof buildManifest>[0]);

test('the manifest tracks only chapters, in reading order', () => {
  assert.deepEqual(manifest.videos['c/one'], ['c/one/01-a', 'c/one/02-b']);
  assert.deepEqual(manifest.courses.c, ['c/one', 'c/two']);
  assert.deepEqual(chapterIdsOf({ documents: [{ id: 'x/README', kind: 'overview' }] } as Parameters<typeof chapterIdsOf>[0]), []);
});

test('refs resolve to the chapters they cover', () => {
  assert.deepEqual(parseRef('video:c/one'), { kind: 'video', id: 'c/one' });
  assert.deepEqual(parseRef('chapter:c/one/01-a'), { kind: 'chapter', id: 'c/one/01-a' });
  assert.equal(parseRef('bogus:x'), undefined);
  assert.equal(parseRef('video:'), undefined);
  assert.equal(parseRef('nonsense'), undefined);
  assert.deepEqual(chapterIdsFor({ kind: 'chapter', id: 'q' }, undefined), ['q']);
  assert.deepEqual(chapterIdsFor({ kind: 'video', id: 'c/one' }, manifest), ['c/one/01-a', 'c/one/02-b']);
  assert.deepEqual(chapterIdsFor({ kind: 'course', id: 'c' }, manifest), ['c/one/01-a', 'c/one/02-b', 'c/two/01-a']);
  assert.deepEqual(chapterIdsFor({ kind: 'video', id: 'c/one' }, undefined), []);
});

test('summarizeRef rolls up chapters, videos and courses from the same records', () => {
  const records = read('c/one/01-a', 'c/one/02-b');
  assert.equal(summarizeRef({ kind: 'chapter', id: 'c/one/01-a' }, manifest, records).state, 'done');
  assert.equal(summarizeRef({ kind: 'chapter', id: 'c/two/01-a' }, manifest, records).state, 'pending');
  assert.equal(summarizeRef({ kind: 'video', id: 'c/one' }, manifest, records).state, 'done');
  const course = summarizeRef({ kind: 'course', id: 'c' }, manifest, records);
  assert.deepEqual([course.percent, course.lessonsDone, course.lessonsTotal], [66, 1, 2]);
  assert.equal(summarizeRef({ kind: 'video', id: 'c/one' }, undefined, records).state, 'pending');
});

test('labels describe each state in words', () => {
  assert.equal(describeChapter(undefined), 'Not read');
  assert.match(describeChapter('2026-11-02T12:00:00.000Z'), /^Read on \d{1,2} \w{3} 2026$/);
  assert.equal(describeSummary({ read: 0, total: 8, percent: 0, state: 'pending' }), 'Not started');
  assert.equal(describeSummary({ read: 6, total: 8, percent: 75, state: 'in-progress' }), '75% · 6 of 8 chapters');
  assert.equal(describeSummary({ read: 8, total: 8, percent: 100, state: 'done' }), 'Completed');
  assert.equal(describeLessons({ read: 0, total: 0, percent: 0, state: 'pending', lessonsDone: 3, lessonsTotal: 8 }), '3 of 8 lessons done');
});

test('the toggle completes anything unfinished and clears anything finished', () => {
  const base = { read: 0, total: 4, percent: 0 };
  assert.equal(toggleAction({ ...base, state: 'pending' }), 'read');
  assert.equal(toggleAction({ ...base, state: 'in-progress' }), 'read');
  assert.equal(toggleAction({ ...base, state: 'done' }), 'unread');
  assert.equal(toggleLabel('chapter', 'read'), 'Mark as read');
  assert.equal(toggleLabel('chapter', 'unread'), 'Mark as unread');
  assert.equal(toggleLabel('video', 'read'), 'Mark video as read');
  assert.equal(toggleLabel('video', 'unread'), 'Mark video as unread');
});
