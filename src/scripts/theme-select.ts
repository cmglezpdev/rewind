// Initialize during parsing, before deferred scripts or DOMContentLoaded.
{
  const select = document.currentScript?.previousElementSibling;
  if (select instanceof HTMLSelectElement) {
    select.value = document.documentElement.dataset.themePreference ?? 'system';
  }
}
