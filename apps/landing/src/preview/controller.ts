import { preferences } from './controls';
import { createPreviewPlayer } from './player';
import { watchPreviewVisibility } from './visibility';
import { startVoiceSample } from './voice';
import { setTextSize, textSizeOf } from './text-size';

export function startReadingPreview(root: HTMLElement): () => void {
  const scope = new AbortController();
  const player = createPreviewPlayer(root);
  setTextSize(root, textSizeOf(root));
  const buttons = root.querySelectorAll<HTMLButtonElement>('button[data-preference]');
  for (const button of buttons) button.disabled = false;
  root.dataset.ready = 'true';
  root.addEventListener(
    'click',
    (event) => {
      if (!(event.target instanceof Element)) return;
      const button = event.target.closest<HTMLButtonElement>('button');
      const name = preferences.find((value) => value === button?.dataset.preference);
      if (name) player.manual(name);
    },
    { signal: scope.signal },
  );
  const stopVoice = startVoiceSample(root, player.stop);
  const stopWatching = watchPreviewVisibility(root, player.environment);
  return () => {
    scope.abort();
    stopWatching();
    stopVoice();
    player.dispose();
  };
}
