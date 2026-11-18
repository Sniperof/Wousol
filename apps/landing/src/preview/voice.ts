import { messagesFor } from '../i18n';
import { createSampleSpeech, type VoiceState } from './sample-speech';

interface VoiceView {
  readonly button: HTMLButtonElement;
  readonly render: (state: VoiceState) => void;
}
function createVoiceView(root: HTMLElement): VoiceView | undefined {
  const button = root.querySelector<HTMLButtonElement>('[data-voice-play]');
  const label = root.querySelector<HTMLElement>('[data-voice-button-label]');
  const status = root.querySelector<HTMLElement>('[data-voice-status]');
  const locale = root.dataset.locale === 'ar' ? 'ar' : 'en';
  const words = messagesFor(locale).preview.voice;
  if (!button || !label || !status) return undefined;
  const render = (state: VoiceState): void => {
    const active = state === 'loading' || state === 'speaking';
    root.dataset.speaking = String(state === 'speaking');
    root.dataset.voice = String(active);
    button.setAttribute('aria-pressed', String(active));
    label.textContent = active ? words.stop : words.play;
    status.textContent = state === 'idle' || state === 'speaking' ? '' : words[state];
  };
  return { button, render };
}
export function startVoiceSample(root: HTMLElement, stopPreview: () => void): () => void {
  const controls = createVoiceView(root);
  const view = root.ownerDocument.defaultView;
  if (!controls) return () => undefined;
  const { button, render } = controls;
  if (!view || !('speechSynthesis' in view) || !('SpeechSynthesisUtterance' in view)) {
    render('unavailable');
    return () => undefined;
  }
  const scope = new AbortController();
  const localeKey = root.dataset.locale === 'ar' ? 'ar' : 'en';
  const text = messagesFor(localeKey).preview.voice.sample;
  const locale = localeKey === 'ar' ? 'ar-SA' : 'en-US';
  const active = (): boolean => button.getAttribute('aria-pressed') === 'true';
  const speech = createSampleSpeech(view, locale, render);
  button.disabled = false;
  button.addEventListener(
    'click',
    () => {
      if (active()) {
        speech.stop();
        return;
      }
      stopPreview();
      speech.play(text);
    },
    { signal: scope.signal },
  );
  root.addEventListener(
    'keydown',
    (event) => {
      if (event.key === 'Escape') speech.stop();
    },
    { signal: scope.signal },
  );
  root.ownerDocument.addEventListener(
    'visibilitychange',
    () => {
      if (root.ownerDocument.hidden && active()) speech.stop();
    },
    { signal: scope.signal },
  );
  return () => {
    scope.abort();
    speech.stop();
  };
}
