/**
 * The hero's feature strip moves by itself, and the visitor steers it: dragging it moves it by hand, and when the drag
 * ends it carries on in the direction it was dragged. The arrow keys do the same once it has focus. It holds still
 * while dragged or focused, and does not move on its own while motion is reduced (by the system or the widget's
 * "pause animations"), when it can still be dragged. Two copies of the list make the loop seamless.
 */
const SPEED = 36;
const KEY_STEP = 48;

interface Strip {
  offset: number;
  direction: number;
  held: boolean;
  dragX: number | null;
}

function reduced(root: HTMLElement): boolean {
  return root.ownerDocument.documentElement.dataset.reduceMotion === 'true';
}

/** Keeps the offset inside one list's width, so the second copy always fills the gap. */
function wrapped(offset: number, loop: number, rtl: boolean): number {
  const sign = rtl ? 1 : -1;
  const progress = (((offset * sign) % loop) + loop) % loop;
  return progress * sign;
}

function listenForDrag(area: HTMLElement, strip: Strip): void {
  area.addEventListener('pointerdown', (event) => {
    strip.dragX = event.clientX;
    strip.held = true;
    area.setPointerCapture(event.pointerId);
  });
  area.addEventListener('pointermove', (event) => {
    if (strip.dragX === null) return;
    const shift = event.clientX - strip.dragX;
    strip.offset += shift;
    if (shift !== 0) strip.direction = Math.sign(shift);
    strip.dragX = event.clientX;
  });
  const release = (): void => {
    strip.dragX = null;
    strip.held = area.matches(':focus-visible');
  };
  area.addEventListener('pointerup', release);
  area.addEventListener('pointercancel', release);
}

function listenForKeys(area: HTMLElement, strip: Strip): void {
  area.addEventListener('focusin', () => {
    strip.held = area.matches(':focus-visible');
  });
  area.addEventListener('focusout', () => {
    strip.held = false;
  });
  area.addEventListener('keydown', (event) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowRight' ? 1 : -1;
    strip.offset += direction * KEY_STEP;
    strip.direction = direction;
  });
}

export function startMarquee(root: HTMLElement): void {
  const area = root.querySelector<HTMLElement>('.marquee-window');
  const track = root.querySelector<HTMLElement>('.marquee-track');
  const list = track?.firstElementChild;
  if (!area || !track || !list) return;
  const rtl = getComputedStyle(root).direction === 'rtl';
  const strip: Strip = { offset: 0, direction: rtl ? 1 : -1, held: false, dragX: null };
  root.dataset.ready = 'true';
  listenForDrag(area, strip);
  listenForKeys(area, strip);
  let last = performance.now();
  const step = (now: number): void => {
    const seconds = Math.min((now - last) / 1000, 0.1);
    last = now;
    if (!strip.held && !reduced(root)) strip.offset += strip.direction * SPEED * seconds;
    strip.offset = wrapped(strip.offset, list.getBoundingClientRect().width, rtl);
    track.style.translate = `${String(strip.offset)}px`;
    requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
