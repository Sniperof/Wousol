import { watchMotionPreference } from './motion';

export function watchPreviewVisibility(
  root: HTMLElement,
  changed: (active: boolean, reduced: boolean) => void,
): () => void {
  const scope = new AbortController();
  let reduced = false;
  let visible = typeof IntersectionObserver === 'undefined';
  const notify = (): void => {
    changed(visible && !document.hidden, reduced);
  };
  const observer =
    typeof IntersectionObserver === 'undefined'
      ? undefined
      : new IntersectionObserver(
          (entries) => {
            visible = entries.some((entry) => entry.isIntersecting);
            notify();
          },
          { threshold: 0.15 },
        );
  observer?.observe(root);
  const stopMotion = watchMotionPreference(root, (value) => {
    reduced = value;
    notify();
  });
  document.addEventListener('visibilitychange', notify, { signal: scope.signal });
  return () => {
    observer?.disconnect();
    stopMotion();
    scope.abort();
  };
}
