import assert from 'node:assert/strict';
import test, { describe } from 'node:test';
import { LocalStorageProgressStore, PROGRESS_STORAGE_KEY, type StorageLike } from './progress-local-storage';
import { MemoryProgressStore } from './progress-memory';
import type { ProgressRecords, ProgressStore } from './progress-port';

class FakeStorage implements StorageLike {
  readonly items = new Map<string, string>();
  getItem(key: string): string | null {
    return this.items.get(key) ?? null;
  }
  setItem(key: string, value: string): void {
    this.items.set(key, value);
  }
}

const first = new Date('2026-11-02T10:00:00.000Z');
const later = new Date('2026-11-05T18:30:00.000Z');

const adapters: Array<[string, () => ProgressStore]> = [
  ['memory', () => new MemoryProgressStore()],
  ['local storage', () => new LocalStorageProgressStore(new FakeStorage())],
];

for (const [name, create] of adapters) {
  describe(`${name} adapter honours the ProgressStore contract`, () => {
    test('starts empty', async () => {
      assert.deepEqual(await create().load(), {});
    });

    test('markRead stores a batch with one timestamp', async () => {
      const store = create();
      await store.markRead(['v/01', 'v/02'], first);
      assert.deepEqual(await store.load(), { 'v/01': { readAt: first.toISOString() }, 'v/02': { readAt: first.toISOString() } });
    });

    test('markRead keeps the date of a chapter that was already read', async () => {
      const store = create();
      await store.markRead(['v/01'], first);
      await store.markRead(['v/01', 'v/02'], later);
      assert.deepEqual(await store.load(), { 'v/01': { readAt: first.toISOString() }, 'v/02': { readAt: later.toISOString() } });
    });

    test('markUnread clears a batch and ignores ids that were not read', async () => {
      const store = create();
      await store.markRead(['v/01', 'v/02', 'v/03'], first);
      await store.markUnread(['v/01', 'v/02', 'v/99']);
      assert.deepEqual(Object.keys(await store.load()), ['v/03']);
    });

    test('keeps records for ids the library no longer has', async () => {
      const store = create();
      await store.markRead(['gone/01'], first);
      await store.markRead(['v/01'], later);
      assert.ok('gone/01' in (await store.load()));
    });

    test('subscribe is told about real changes only, and unsubscribe stops it', async () => {
      const store = create();
      const seen: ProgressRecords[] = [];
      const unsubscribe = store.subscribe((records) => seen.push(records));
      await store.markRead(['v/01'], first);
      await store.markRead(['v/01'], later);
      await store.markUnread(['v/99']);
      assert.equal(seen.length, 1);
      assert.deepEqual(Object.keys(seen[0] ?? {}), ['v/01']);
      await store.markUnread(['v/01']);
      assert.equal(seen.length, 2);
      assert.deepEqual(seen[1], {});
      unsubscribe();
      await store.markRead(['v/02'], later);
      assert.equal(seen.length, 2);
    });
  });
}

describe('local storage adapter specifics', () => {
  test('persists under the versioned key as { chapterId: { readAt } }', async () => {
    const storage = new FakeStorage();
    await new LocalStorageProgressStore(storage).markRead(['v/01'], first);
    assert.equal(PROGRESS_STORAGE_KEY, 'rewind:progress:v1');
    assert.deepEqual(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? ''), { 'v/01': { readAt: first.toISOString() } });
    assert.deepEqual(await new LocalStorageProgressStore(storage).load(), { 'v/01': { readAt: first.toISOString() } });
  });

  test('corrupt JSON reads as empty without writing, and is backed up before the first write', async () => {
    const storage = new FakeStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, '{not json');
    const store = new LocalStorageProgressStore(storage);
    assert.deepEqual(await store.load(), {});
    assert.equal(storage.getItem(PROGRESS_STORAGE_KEY), '{not json');
    await store.markRead(['v/01'], first);
    assert.equal(storage.getItem(`${PROGRESS_STORAGE_KEY}:corrupt`), '{not json');
    assert.deepEqual(Object.keys(JSON.parse(storage.getItem(PROGRESS_STORAGE_KEY) ?? '')), ['v/01']);
  });

  test('an earlier corrupt backup is not overwritten by a later one', async () => {
    const storage = new FakeStorage();
    storage.setItem(`${PROGRESS_STORAGE_KEY}:corrupt`, 'first backup');
    storage.setItem(PROGRESS_STORAGE_KEY, '[1,2]');
    await new LocalStorageProgressStore(storage).markRead(['v/01'], first);
    assert.equal(storage.getItem(`${PROGRESS_STORAGE_KEY}:corrupt`), 'first backup');
  });

  test('drops invalid entries but keeps valid ones', async () => {
    const storage = new FakeStorage();
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ ok: { readAt: first.toISOString() }, bad: { readAt: 'yesterday' }, worse: 5 }));
    assert.deepEqual(Object.keys(await new LocalStorageProgressStore(storage).load()), ['ok']);
  });

  test('a storage that throws reads as empty', async () => {
    const broken: StorageLike = {
      getItem() {
        throw new Error('blocked');
      },
      setItem() {
        throw new Error('blocked');
      },
    };
    const store = new LocalStorageProgressStore(broken);
    assert.deepEqual(await store.load(), {});
    await assert.rejects(store.markRead(['v/01'], first), /blocked/);
  });

  test('writes merge with what another tab saved in the meantime', async () => {
    const storage = new FakeStorage();
    const store = new LocalStorageProgressStore(storage);
    await store.load();
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ 'other/01': { readAt: first.toISOString() } }));
    await store.markRead(['v/01'], later);
    assert.deepEqual(Object.keys(await store.load()).sort(), ['other/01', 'v/01']);
  });

  test('storage events from other tabs reach subscribers; unrelated keys do not', async () => {
    const storage = new FakeStorage();
    const events = new EventTarget();
    const store = new LocalStorageProgressStore(storage, { events });
    const seen: ProgressRecords[] = [];
    const unsubscribe = store.subscribe((records) => seen.push(records));
    storage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ 'v/01': { readAt: first.toISOString() } }));
    events.dispatchEvent(Object.assign(new Event('storage'), { key: PROGRESS_STORAGE_KEY }));
    events.dispatchEvent(Object.assign(new Event('storage'), { key: 'something-else' }));
    assert.equal(seen.length, 1);
    assert.deepEqual(Object.keys(seen[0] ?? {}), ['v/01']);
    unsubscribe();
    events.dispatchEvent(Object.assign(new Event('storage'), { key: PROGRESS_STORAGE_KEY }));
    assert.equal(seen.length, 1);
  });
});
