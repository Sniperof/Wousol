/**
 * A row of cards that a phone swipes through. The dots under it show how many cards there are and which one is in
 * view; they are a picture of the row's position only, so screen readers skip them and read the cards themselves.
 * The dots follow the row when its cards are rebuilt (pricing renders its cards after loading).
 */
function startEdge(rect: DOMRect, rtl: boolean): number {
  return rtl ? rect.right : rect.left;
}

function rowStart(scroller: HTMLElement): { readonly edge: number; readonly rtl: boolean } {
  const style = getComputedStyle(scroller);
  const rtl = style.direction === 'rtl';
  const padding = parseFloat(style.scrollPaddingInlineStart) || 0;
  const rect = scroller.getBoundingClientRect();
  return { edge: startEdge(rect, rtl) + (rtl ? -padding : padding), rtl };
}

function currentIndex(scroller: HTMLElement, list: HTMLElement): number {
  const { edge, rtl } = rowStart(scroller);
  const distances = [...list.children].map((card) =>
    Math.abs(startEdge(card.getBoundingClientRect(), rtl) - edge),
  );
  return distances.indexOf(Math.min(...distances));
}

/** Scrolls the row, and only the row, so the card sits at its start. */
export function bringToStart(scroller: HTMLElement, card: Element): void {
  const { edge, rtl } = rowStart(scroller);
  scroller.scrollBy({
    left: startEdge(card.getBoundingClientRect(), rtl) - edge,
    behavior: 'instant',
  });
}

export function startSwipeRow(scroller: HTMLElement, list: HTMLElement = scroller): void {
  const dots = document.createElement('div');
  dots.className = 'swipe-dots';
  dots.setAttribute('aria-hidden', 'true');
  scroller.after(dots);
  const mark = (): void => {
    const current = currentIndex(scroller, list);
    [...dots.children].forEach((dot, index) => {
      (dot as HTMLElement).dataset.current = String(index === current);
    });
  };
  const build = (): void => {
    dots.replaceChildren(...[...list.children].map(() => document.createElement('span')));
    mark();
  };
  let frame = 0;
  scroller.addEventListener(
    'scroll',
    () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(mark);
    },
    { passive: true },
  );
  new MutationObserver(build).observe(list, { childList: true });
  window.addEventListener('resize', mark, { passive: true });
  build();
}
