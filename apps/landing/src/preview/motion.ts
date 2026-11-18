export function watchMotionPreference(
  root: HTMLElement,
  changed: (reduced: boolean) => void,
): () => void {
  const scope = new AbortController();
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  const document = root.ownerDocument;
  const publish = (): void => {
    const reduced =
      media.matches || document.documentElement.hasAttribute('data-dap-pause-animations');
    document.documentElement.dataset.reduceMotion = String(reduced);
    changed(reduced);
  };
  const observer = new MutationObserver(publish);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-dap-pause-animations'],
  });
  media.addEventListener('change', publish, { signal: scope.signal });
  publish();
  return () => {
    scope.abort();
    observer.disconnect();
  };
}
