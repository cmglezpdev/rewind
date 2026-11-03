// Run in the browser console on any Rewind page at the viewport being checked.
// Returns measurements and throws if the page overflows or a primary touch target is too small.
(() => {
  const width = document.documentElement.clientWidth;
  const scrollWidth = document.documentElement.scrollWidth;
  const selectors = 'a.chip, button.chip, .btn-primary, .btn-ghost, summary, [data-site-header] > div a, [data-filter-search], [data-filter-course], [data-filter-language]';
  const targets = [...document.querySelectorAll(selectors)].filter((element) => element.getClientRects().length > 0);
  const undersized = targets.filter((element) => {
    const box = element.getBoundingClientRect();
    return box.height < 44 || box.width < 44;
  }).map((element) => element.textContent.trim() || element.getAttribute('name') || element.tagName);
  const result = { path: location.pathname, width, scrollWidth, targets: targets.length, undersized };
  if (scrollWidth > width || undersized.length) throw new Error(JSON.stringify(result));
  return result;
})();
