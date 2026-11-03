import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { runInNewContext } from 'node:vm';

const script = readFileSync(new URL('../scripts/theme.js', import.meta.url), 'utf8');
const selectMarkup = readFileSync(new URL('../components/ThemeSelect.astro', import.meta.url), 'utf8');
const selectScript = selectMarkup.match(/<script is:inline>([\s\S]*?)<\/script>/)?.[1];

function setup({ saved = null, dark = false, blocked = false }: {
  saved?: string | null; dark?: boolean; blocked?: boolean;
} = {}) {
  class Select extends EventTarget {
    value = 'system';
    hasAttribute(name: string) { return name === 'data-theme-select'; }
  }
  const select = new Select();
  const document = Object.assign(new EventTarget(), {
    documentElement: { dataset: { theme: '', themePreference: '' }, style: { colorScheme: '' } },
    currentScript: { previousElementSibling: select },
    querySelectorAll: () => [select],
  });
  const system = Object.assign(new EventTarget(), { matches: dark });
  const storage = new Map<string, string>();
  if (saved !== null) storage.set('rewind-theme', saved);
  const localStorage = {
    getItem(key: string) { if (blocked) throw new Error('blocked'); return storage.get(key) ?? null; },
    setItem(key: string, value: string) { if (blocked) throw new Error('blocked'); storage.set(key, value); },
  };
  const window = Object.assign(new EventTarget(), { localStorage, matchMedia: () => system });
  let themeChanges = 0;
  window.addEventListener('theme-change', () => themeChanges++);
  // Capture the delegated change handler while exercising the real head script.
  const addEventListener = document.addEventListener.bind(document);
  let change: EventListener | undefined;
  document.addEventListener = (type, listener, options) => {
    if (type === 'change' && typeof listener === 'function') change = listener;
    addEventListener(type, listener, options);
  };
  runInNewContext(script, { window, document, Event, HTMLSelectElement: Select });
  return {
    document, select, storage,
    theme: () => document.documentElement.dataset.theme,
    changes: () => themeChanges,
    ready: () => document.dispatchEvent(new Event('DOMContentLoaded')),
    parseSelect() {
      if (!selectScript) throw new Error('Missing theme selector initialization script');
      // The static select is parsed after the head script and starts at System.
      select.value = 'system';
      runInNewContext(selectScript, { document, HTMLSelectElement: Select });
    },
    choose(value: string) {
      select.value = value;
      const event = new Event('change');
      Object.defineProperty(event, 'target', { value: select });
      change?.(event);
    },
    systemDark(value: boolean) {
      system.matches = value;
      system.dispatchEvent(new Event('change'));
    },
    otherTab(value: string | null, key: string | null = 'rewind-theme') {
      const event = Object.assign(new Event('storage'), { storageArea: localStorage, key, newValue: value });
      window.dispatchEvent(event);
    },
  };
}

test('the parsed dropdown shows the saved preference before DOMContentLoaded', () => {
  for (const saved of ['light', 'dark', 'system']) {
    const app = setup({ saved, dark: true });
    app.parseSelect();
    assert.equal(app.select.value, saved);
    assert.equal(app.document.documentElement.dataset.themePreference, saved);
  }
});

test('system default applies before DOM ready and follows OS changes', () => {
  const app = setup({ dark: true });
  assert.equal(app.theme(), 'dark');
  assert.equal(app.document.documentElement.style.colorScheme, 'dark');
  app.ready();
  assert.equal(app.select.value, 'system');
  app.systemDark(false);
  assert.equal(app.theme(), 'light');
});

test('saved explicit themes override the OS and synchronize the selector', () => {
  for (const saved of ['light', 'dark']) {
    const app = setup({ saved, dark: saved === 'light' });
    assert.equal(app.theme(), saved);
    app.ready();
    assert.equal(app.select.value, saved);
    app.systemDark(true);
    app.systemDark(false);
    assert.equal(app.theme(), saved);
  }
});

test('selecting each preference persists it and System resumes OS tracking', () => {
  const app = setup();
  for (const value of ['dark', 'light', 'system']) {
    app.choose(value);
    assert.equal(app.storage.get('rewind-theme'), value);
    assert.equal(app.theme(), value === 'system' ? 'light' : value);
  }
  app.systemDark(true);
  assert.equal(app.theme(), 'dark');
});

test('invalid preferences and unavailable storage fall back safely', () => {
  for (const options of [{ saved: 'invalid' }, { blocked: true }]) {
    const app = setup({ ...options, dark: true });
    app.ready();
    assert.equal(app.select.value, 'system');
    assert.equal(app.theme(), 'dark');
    app.choose('light');
    assert.equal(app.theme(), 'light');
  }
});

test('other tabs synchronize choices, removal and clearing without feedback writes', () => {
  const app = setup({ saved: 'light', dark: true });
  app.otherTab('dark');
  assert.equal(app.theme(), 'dark');
  assert.equal(app.select.value, 'dark');
  assert.equal(app.storage.get('rewind-theme'), 'light');
  app.otherTab('light', 'unrelated');
  assert.equal(app.theme(), 'dark');
  app.otherTab(null);
  assert.equal(app.select.value, 'system');
  app.otherTab('light');
  app.otherTab(null, null);
  assert.equal(app.select.value, 'system');
  assert.equal(app.theme(), 'dark');
});

test('theme events fire only when the resolved appearance changes', () => {
  const app = setup();
  assert.equal(app.changes(), 1);
  app.ready();
  app.choose('light');
  assert.equal(app.changes(), 1);
  app.choose('dark');
  assert.equal(app.changes(), 2);
});
