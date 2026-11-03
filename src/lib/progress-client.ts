import {
  chapterIdsFor,
  describeChapter,
  describeLessons,
  describeSummary,
  parseRef,
  summarizeRef,
  toggleAction,
  toggleLabel,
  type ProgressState,
} from './progress-derive';
import { LocalStorageProgressStore, PROGRESS_STORAGE_KEY } from './progress-local-storage';
import type { ProgressManifest } from './progress-manifest';
import { MemoryProgressStore } from './progress-memory';
import type { ProgressRecords, ProgressStore } from './progress-port';

/**
 * Composition root and DOM binding for reading progress. This is the only file
 * that chooses a storage adapter: to move progress to a database, return a
 * different `ProgressStore` from `createStore`.
 *
 * Markup contract (see ProgressMark.astro / ProgressToggle.astro):
 * - `[data-progress-ref="chapter|video|course:<id>"]` gets `data-state`, `--p`,
 *   a tooltip, its `[data-progress-text]` children and its `.progress-bar-fill`.
 * - `[data-progress-toggle="chapter|video:<id>"]` is the mark-as-read button.
 * - the closest `[data-progress-scope]` ancestor gets `data-progress-state`.
 */

function createStore(): ProgressStore {
  try {
    const storage = window.localStorage;
    storage.getItem(PROGRESS_STORAGE_KEY);
    return new LocalStorageProgressStore(storage, { events: window });
  } catch {
    return new MemoryProgressStore();
  }
}

async function fetchManifest(): Promise<ProgressManifest | undefined> {
  try {
    const response = await fetch('/progress-manifest.json', { cache: 'no-cache' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return (await response.json()) as ProgressManifest;
  } catch (error) {
    console.warn('Reading progress: video and course totals are unavailable.', error);
    return undefined;
  }
}

/** Keep the arc visible at low percentages and open at high ones. */
function arcLength(state: ProgressState, percent: number): number {
  if (state === 'pending') return 0;
  if (state === 'done') return 100;
  return Math.min(94, Math.max(10, percent));
}

export async function startProgress(): Promise<void> {
  const store = createStore();
  const [initial, manifest] = await Promise.all([store.load(), fetchManifest()]);
  let records: ProgressRecords = initial;

  function render(): void {
    for (const element of document.querySelectorAll<HTMLElement>('[data-progress-ref]')) {
      const ref = parseRef(element.dataset.progressRef ?? '');
      if (!ref) continue;
      const summary = summarizeRef(ref, manifest, records);
      const readAt = ref.kind === 'chapter' ? records[ref.id]?.readAt : undefined;
      const description = ref.kind === 'chapter' ? describeChapter(readAt) : describeSummary(summary);
      element.dataset.state = summary.state;
      element.style.setProperty('--p', String(arcLength(summary.state, summary.percent)));
      element.title = description;
      for (const text of element.querySelectorAll<HTMLElement>('[data-progress-text]')) {
        text.textContent = text.dataset.progressText === 'lessons' ? describeLessons(summary) : description;
      }
      const fill = element.querySelector<HTMLElement>('.progress-bar-fill');
      if (fill) fill.style.width = `${summary.percent}%`;
      const scope = element.closest<HTMLElement>('[data-progress-scope]');
      if (scope) scope.dataset.progressState = summary.state;
    }

    for (const button of document.querySelectorAll<HTMLButtonElement>('[data-progress-toggle]')) {
      const ref = parseRef(button.dataset.progressToggle ?? '');
      if (!ref) continue;
      const summary = summarizeRef(ref, manifest, records);
      const label = button.querySelector('[data-progress-toggle-label]');
      if (label) label.textContent = toggleLabel(ref.kind, toggleAction(summary));
      button.dataset.state = summary.state;
      button.disabled = chapterIdsFor(ref, manifest).length === 0;
    }
  }

  async function toggle(button: HTMLButtonElement): Promise<void> {
    const ref = parseRef(button.dataset.progressToggle ?? '');
    if (!ref) return;
    const ids = chapterIdsFor(ref, manifest);
    if (ids.length === 0) return;
    const action = toggleAction(summarizeRef(ref, manifest, records));
    if (action === 'unread' && ref.kind === 'video'
      && !window.confirm('Mark every chapter of this video as unread? Their read dates will be cleared.')) return;
    button.disabled = true;
    try {
      if (action === 'read') await store.markRead(ids, new Date());
      else await store.markUnread(ids);
    } catch (error) {
      console.error('Reading progress could not be saved.', error);
    } finally {
      render();
    }
  }

  store.subscribe((next) => {
    records = next;
    render();
  });
  document.addEventListener('click', (event) => {
    const button = (event.target as Element | null)?.closest<HTMLButtonElement>('[data-progress-toggle]');
    if (button && !button.disabled) void toggle(button);
  });
  render();
}
