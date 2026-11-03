/**
 * Storage port for reading progress.
 *
 * The port stores one thing only: which chapters were marked as read, and when.
 * It knows nothing about videos, courses or percentages; those are derived from
 * these records in `progress-derive.ts`. Adapters (browser storage today, a
 * database later) implement `ProgressStore` and are picked in one place,
 * `progress-client.ts`.
 */

/** A chapter the reader marked as read. `readAt` is an ISO-8601 timestamp. */
export interface ReadRecord {
  readAt: string;
}

/** Every read chapter, keyed by the chapter's document id. Treat as immutable. */
export type ProgressRecords = Readonly<Record<string, ReadRecord>>;

export type ProgressListener = (records: ProgressRecords) => void;

/**
 * Contract every adapter must honour (see `progress-store.test.ts`, which runs
 * the same suite against each adapter):
 *
 * - All methods are async, even when the backend is synchronous, so a remote
 *   backend can replace a local one without touching callers.
 * - `markRead` keeps the existing `readAt` of a chapter that is already read.
 *   Marking a whole video therefore never rewrites earlier dates.
 * - `markRead` and `markUnread` take batches and apply them as one write.
 * - Ids the library no longer contains are stored and returned untouched.
 * - `subscribe` listeners receive the new records after any write that changed
 *   something, whether it came from this instance or from another tab/device.
 *   They are not called on subscribe, nor for writes that change nothing.
 * - `load` never rejects: if the backend is unreadable it resolves with `{}`.
 */
export interface ProgressStore {
  load(): Promise<ProgressRecords>;
  markRead(chapterIds: readonly string[], at: Date): Promise<void>;
  markUnread(chapterIds: readonly string[]): Promise<void>;
  subscribe(listener: ProgressListener): () => void;
}

/** Records after marking `ids` as read. Returns `records` itself if nothing changed. */
export function withRead(records: ProgressRecords, ids: readonly string[], at: Date): ProgressRecords {
  const readAt = at.toISOString();
  let next: Record<string, ReadRecord> | undefined;
  for (const id of ids) {
    if (id in (next ?? records)) continue;
    next ??= { ...records };
    next[id] = { readAt };
  }
  return next ?? records;
}

/** Records after clearing `ids`. Returns `records` itself if nothing changed. */
export function withoutRead(records: ProgressRecords, ids: readonly string[]): ProgressRecords {
  let next: Record<string, ReadRecord> | undefined;
  for (const id of ids) {
    if (!(id in (next ?? records))) continue;
    next ??= { ...records };
    delete next[id];
  }
  return next ?? records;
}
