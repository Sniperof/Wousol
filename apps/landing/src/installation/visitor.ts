import lottie, { type AnimationItem } from 'lottie-web/build/player/lottie_light';
import artwork from '../assets/laptop-visitor.json';

export function startLaptopVisitor(root: HTMLElement): () => void {
  const host = root.querySelector<HTMLElement>('[data-laptop-visitor]');
  const container = host?.querySelector<HTMLElement>('[data-laptop-player]');
  if (!host || !container) return () => undefined;
  let animation: AnimationItem | undefined;
  let loaded = false;
  const refresh = (): void => {
    const current = root.dataset.step === '1';
    const reduced = root.dataset.reduced === 'true';
    const playing = current && root.dataset.active === 'true' && !reduced;
    if (playing && !animation) {
      animation = lottie.loadAnimation({
        container,
        renderer: 'svg',
        autoplay: false,
        loop: true,
        animationData: structuredClone(artwork),
      });
      animation.addEventListener('DOMLoaded', () => {
        loaded = true;
        refresh();
      });
    }
    host.dataset.ready = String(loaded && !reduced);
    host.dataset.playing = String(playing);
    if (!current) animation?.stop();
    else if (playing) animation?.play();
    else animation?.pause();
  };
  const observer = new MutationObserver(refresh);
  observer.observe(root, {
    attributes: true,
    attributeFilter: ['data-active', 'data-step', 'data-reduced'],
  });
  refresh();
  return () => {
    observer.disconnect();
    animation?.destroy();
    delete host.dataset.ready;
    host.dataset.playing = 'false';
  };
}
