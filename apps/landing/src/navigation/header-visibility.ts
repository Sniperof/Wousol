/**
 * The floating header steps out of the way while the visitor reads down the page and comes back as soon as they
 * scroll up. It always shows near the top of the page, while the phone menu is open, and whenever focus is inside it,
 * so keyboard users never tab into a hidden bar. Small movements are ignored so the bar does not flicker.
 */
const THRESHOLD = 10;
const TOP_ZONE = 160;

function mustShow(root: HTMLElement, y: number): boolean {
  return y < TOP_ZONE || root.hasAttribute('data-menu-open') || root.matches(':focus-within');
}

export function autoHideHeader(root: HTMLElement): void {
  let lastY = window.scrollY;
  let frame = 0;
  const show = (): void => {
    root.dataset.hidden = 'false';
  };
  const update = (): void => {
    const y = window.scrollY;
    if (mustShow(root, y)) {
      show();
      lastY = y;
      return;
    }
    if (Math.abs(y - lastY) < THRESHOLD) return;
    root.dataset.hidden = String(y > lastY);
    lastY = y;
  };
  window.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    },
    { passive: true },
  );
  root.addEventListener('focusin', show);
  show();
}
