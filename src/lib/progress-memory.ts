import { withRead, withoutRead, type ProgressListener, type ProgressRecords, type ProgressStore } from './progress-port';

/**
 * In-memory adapter. Used by tests, and in the browser as a fallback when
 * `localStorage` is blocked (progress then lasts until the page is closed).
 */
export class MemoryProgressStore implements ProgressStore {
  #records: ProgressRecords;
  readonly #listeners = new Set<ProgressListener>();

  constructor(initial: ProgressRecords = {}) {
    this.#records = initial;
  }

  async load(): Promise<ProgressRecords> {
    return this.#records;
  }

  async markRead(chapterIds: readonly string[], at: Date): Promise<void> {
    this.#update(withRead(this.#records, chapterIds, at));
  }

  async markUnread(chapterIds: readonly string[]): Promise<void> {
    this.#update(withoutRead(this.#records, chapterIds));
  }

  subscribe(listener: ProgressListener): () => void {
    this.#listeners.add(listener);
    return () => {
      this.#listeners.delete(listener);
    };
  }

  #update(next: ProgressRecords): void {
    if (next === this.#records) return;
    this.#records = next;
    for (const listener of [...this.#listeners]) listener(next);
  }
}
