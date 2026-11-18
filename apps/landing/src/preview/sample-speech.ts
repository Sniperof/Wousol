import { sampleVoice } from './sample-voice';

export type VoiceState = 'idle' | 'loading' | 'speaking' | 'finished' | 'unavailable' | 'failed';
const voiceWaitMs = 1500;
const playbackTimeoutMs = 20_000;
const sampleRate = 0.94;
interface Session {
  readonly synth: SpeechSynthesis;
  readonly Utterance: typeof SpeechSynthesisUtterance;
  readonly language: string;
  readonly changed: (state: VoiceState) => void;
  utterance: SpeechSynthesisUtterance | undefined;
  timer: ReturnType<typeof setTimeout> | undefined;
  waiting: AbortController | undefined;
}
function clearWait(session: Session): void {
  clearTimeout(session.timer);
  session.timer = undefined;
  session.waiting?.abort();
  session.waiting = undefined;
}
function finish(session: Session, state: VoiceState): void {
  clearWait(session);
  if (session.utterance) {
    session.utterance.onstart = null;
    session.utterance.onend = null;
    session.utterance.onerror = null;
  }
  session.utterance = undefined;
  session.changed(state);
}
function stop(session: Session): void {
  const owned = session.utterance !== undefined;
  finish(session, 'idle');
  if (owned) session.synth.cancel();
}
function speak(session: Session, text: string, voice: SpeechSynthesisVoice): void {
  clearWait(session);
  const utterance = new session.Utterance(text);
  utterance.voice = voice;
  utterance.lang = voice.lang;
  utterance.rate = sampleRate;
  session.utterance = utterance;
  utterance.onstart = () => {
    if (session.utterance === utterance) session.changed('speaking');
  };
  utterance.onend = () => {
    if (session.utterance === utterance) finish(session, 'finished');
  };
  utterance.onerror = () => {
    if (session.utterance === utterance) finish(session, 'failed');
  };
  session.timer = setTimeout(() => {
    if (session.utterance !== utterance) return;
    finish(session, 'failed');
    session.synth.cancel();
  }, playbackTimeoutMs);
  try {
    session.synth.speak(utterance);
  } catch {
    finish(session, 'failed');
  }
}
function play(session: Session, text: string): void {
  stop(session);
  session.changed('loading');
  const voice = sampleVoice(session.synth, session.language);
  if (voice) {
    speak(session, text, voice);
    return;
  }
  session.waiting = new AbortController();
  session.synth.addEventListener(
    'voiceschanged',
    () => {
      const loaded = sampleVoice(session.synth, session.language);
      if (loaded) speak(session, text, loaded);
    },
    { signal: session.waiting.signal },
  );
  session.timer = setTimeout(() => {
    finish(session, 'unavailable');
  }, voiceWaitMs);
}
export function createSampleSpeech(
  view: Window & typeof globalThis,
  language: string,
  changed: (state: VoiceState) => void,
): { readonly play: (text: string) => void; readonly stop: () => void } {
  const session: Session = {
    synth: view.speechSynthesis,
    Utterance: view.SpeechSynthesisUtterance,
    language,
    changed,
    utterance: undefined,
    timer: undefined,
    waiting: undefined,
  };
  session.synth.getVoices();
  return {
    play: (text) => {
      play(session, text);
    },
    stop: () => {
      stop(session);
    },
  };
}
