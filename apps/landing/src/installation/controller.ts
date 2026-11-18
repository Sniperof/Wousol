import { watchPreviewVisibility } from '../preview/visibility';
import { createInstallationPlayer } from './player';
import { startLaptopVisitor } from './visitor';

export function startInstallation(root: HTMLElement): () => void {
  const player = createInstallationPlayer(root);
  if (!player) return () => undefined;
  const scope = new AbortController();
  root.querySelectorAll<HTMLButtonElement>('[data-installation-step]').forEach((button) => {
    button.disabled = false;
    button.addEventListener(
      'click',
      () => {
        player.select(Number(button.dataset.installationStep));
      },
      { signal: scope.signal },
    );
  });
  root.addEventListener(
    'focusin',
    () => {
      player.pause();
    },
    { signal: scope.signal },
  );
  const stopWatching = watchPreviewVisibility(
    root.querySelector('figure') ?? root,
    player.environment,
  );
  root.dataset.ready = 'true';
  const stopVisitor = startLaptopVisitor(root);
  return () => {
    scope.abort();
    stopWatching();
    stopVisitor();
    player.dispose();
  };
}
