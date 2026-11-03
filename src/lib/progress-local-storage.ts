import { withRead, withoutRead, type ProgressListener, type ProgressRecords, type ProgressStore, type ReadRecord } from './progress-port';

/** The slice of the Web Storage API this adapter needs. */
export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export const PROGRESS_STORAGE_KEY = 'rewind:progress:v1';

export interface LocalStorageOptions {
  key?: string;
  /** Where `storage` events arrive (`window` in a browser). Enables cross-tab updates. */
  events?: EventTarget;
}

interface Parsed {
  records: ProgressRecords;
  /** True when the stored value was not valid, or had invalid entries we dropped. */
  lossy: boolean;
}

function isReadRecord(value: unknown): value is ReadRecord {
  return typeof value === 'object' && value !== null && 'readAt' in value
    && typeof value.readAt === 'string' && !Number.isNaN(Date.parse(value.readAt));
}

function parse(raw: string | null): Parsed {
  if (raw === null) return { records: {}, lossy: false };
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return { records: {}, lossy: true };
  }
  if (typeof value !== 'object' || value === null || Array.isArray(value)) return { records: {}, lossy: true };
  const records: Record<string, ReadRecord> = {};
  let lossy = false;
  for (const [id, entry] of Object.entries(value)) {
    if (isReadRecord(entry)) records[id] = { readAt: entry.readAt };
    else lossy = true;
  }
  return { records, lossy };
}

/**
 * Browser-storage adapter: one JSON entry, `{ [chapterId]: { readAt } }`.
 *
 * Reads never write. If the stored value is corrupt, reads see no progress, and
 * the first write copies the original text to `<key>:corrupt` before replacing
 * it, so a bad parse can't silently destroy history.
 */
export class LocalStorageProgressStore implements ProgressStore {
  readonly #storage: StorageLike;
  readonly #key: string;
  readonly #events: EventTarget | undefined;
  readonly #listeners = new Set<ProgressListener>();
  readonly #onStorage = (event: Event) => {
    const { key } = event as StorageEvent;
    if (key !== null && key !== this.#key) return;
    const { records } = this.#read();
    for (const listener of [...this.#listeners]) listener(records);
  };

  constructor(storage: StorageLike, { key = PROGRESS_STORAGE_KEY, events }: LocalStorageOptions = {}) {
    this.#storage = storage;
    this.#key = key;
    this.#events = events;
  }

  async load(): Promise<ProgressRecords> {
    return this.#read().records;
  }

  async markRead(chapterIds: readonly string[], at: Date): Promise<void> {
    this.#write((records) => withRead(records, chapterIds, at));
  }

  async markUnread(chapterIds: readonly string[]): Promise<void> {
    this.#write((records) => withoutRead(records, chapterIds));
  }

  subscribe(listener: ProgressListener): () => void {
    if (this.#listeners.size === 0) this.#events?.addEventListener('storage', this.#onStorage);
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
      if (this.#listeners.size === 0) this.#events?.removeEventListener('storage', this.#onStorage);
    };
  }

  #raw(): string | null {
    try {
      return this.#storage.getItem(this.#key);
    } catch {
      return null;
    }
  }

  #read(): Parsed {
    return parse(this.#raw());
  }

  /** Read-modify-write against the freshest stored value, so other tabs' writes are kept. */
  #write(change: (records: ProgressRecords) => ProgressRecords): void {
    const raw = this.#raw();
    const { records, lossy } = parse(raw);
    const next = change(records);
    if (next === records) return;
    if (lossy && raw !== null && this.#storage.getItem(`${this.#key}:corrupt`) === null) {
      this.#storage.setItem(`${this.#key}:corrupt`, raw);
    }
    this.#storage.setItem(this.#key, JSON.stringify(next));
    for (const listener of [...this.#listeners]) listener(next);
  }
}
