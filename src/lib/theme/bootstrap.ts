// Inlined in the document head so the saved theme applies before first paint.
(() => {
  const storageKey = 'rewind-theme';
  type ThemePreference = 'system' | 'light' | 'dark';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const parse = (value: unknown): ThemePreference => value === 'light' || value === 'dark' ? value : 'system';
  let preference: ThemePreference = 'system';
  let activeTransition: ViewTransition | null = null;

  try {
    preference = parse(window.localStorage.getItem(storageKey));
  } catch {
    // Storage can be unavailable. The preference still works for this page.
  }

  function update() {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    const changed = document.documentElement.dataset.theme !== theme;
    document.documentElement.dataset.themePreference = preference;
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    for (const select of document.querySelectorAll<HTMLSelectElement>('[data-theme-select]')) {
      select.value = preference;
    }
    if (changed) window.dispatchEvent(new Event('theme-change'));
  }

  function apply(animate = false) {
    activeTransition?.skipTransition();
    activeTransition = null;
    delete document.documentElement.dataset.themeTransition;

    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    if (!animate || theme === document.documentElement.dataset.theme || reducedMotion.matches
      || typeof document.startViewTransition !== 'function' || document.visibilityState === 'hidden') {
      update();
      return;
    }

    document.documentElement.dataset.themeTransition = '';
    // Read the latest preference in the callback, even if choices change rapidly.
    const transition = document.startViewTransition(update);
    activeTransition = transition;
    const cleanup = () => {
      if (activeTransition !== transition) return;
      activeTransition = null;
      delete document.documentElement.dataset.themeTransition;
    };
    void transition.ready.catch(() => {});
    void transition.finished.then(cleanup, cleanup);
  }

  apply();
  document.addEventListener('DOMContentLoaded', () => apply(), { once: true });
  document.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLSelectElement) || !event.target.hasAttribute('data-theme-select')) return;
    preference = parse(event.target.value);
    try {
      window.localStorage.setItem(storageKey, preference);
    } catch {
      // Keep applying the choice even if it cannot be saved.
    }
    apply(true);
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
