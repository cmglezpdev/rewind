// Inlined in the document head so the saved theme applies before first paint.
(() => {
  const storageKey = 'rewind-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const parse = (value) => value === 'light' || value === 'dark' ? value : 'system';
  let preference = 'system';

  try {
    preference = parse(window.localStorage.getItem(storageKey));
  } catch {
    // Storage can be unavailable. The preference still works for this page.
  }

  function apply() {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    const changed = document.documentElement.dataset.theme !== theme;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    for (const select of document.querySelectorAll('[data-theme-select]')) {
      select.value = preference;
    }
    if (changed) window.dispatchEvent(new Event('theme-change'));
  }

  apply();
  document.addEventListener('DOMContentLoaded', apply, { once: true });
  document.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLSelectElement) || !event.target.hasAttribute('data-theme-select')) return;
    preference = parse(event.target.value);
    try {
      window.localStorage.setItem(storageKey, preference);
    } catch {
      // Keep applying the choice even if it cannot be saved.
    }
    apply();
  });
  system.addEventListener('change', () => {
    if (preference === 'system') apply();
  });
  window.addEventListener('storage', (event) => {
    if (event.storageArea !== window.localStorage || (event.key !== storageKey && event.key !== null)) return;
    preference = parse(event.newValue);
    apply();
  });
})();
