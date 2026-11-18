import { setAllPreferences, setPreference, togglePreference, type Preference } from './controls';
import { setTextSize } from './text-size';

/**
 * One feature at a time: each step turns a single feature on (its row rises and its own animation plays for the
 * hold time), then everything rests for the short delay before the next. Steps never pile up.
 */
const steps = ['text', 'voice', 'sign'] as const;
type Step = (typeof steps)[number];
interface State {
  readonly root: HTMLElement;
  readonly delay: number;
  readonly hold: number;
  timer: ReturnType<typeof setTimeout> | undefined;
  /** Cues inside a step, such as flipping the switch before the text grows. */
  cues: ReturnType<typeof setTimeout>[];
  position: number;
  active: boolean;
  automatic: boolean;
  reduced: boolean;
}
export interface PreviewPlayer {
  readonly environment: (active: boolean, reduced: boolean) => void;
  readonly manual: (name: Preference) => void;
  readonly stop: () => void;
  readonly dispose: () => void;
}
function clearTimer(state: State): void {
  clearTimeout(state.timer);
  state.timer = undefined;
  clearCues(state);
}
function clearCues(state: State): void {
  for (const pending of state.cues) clearTimeout(pending);
  state.cues = [];
}
function cue(state: State, after: number, run: () => void): void {
  state.cues.push(setTimeout(run, after));
}
function sync(state: State): void {
  state.root.dataset.playing = String(state.automatic && state.active && !state.reduced);
  state.root.dataset.autoplay = state.automatic ? 'running' : 'stopped';
}
function stop(state: State): void {
  state.automatic = false;
  delete state.root.dataset.focus;
  clearTimer(state);
  sync(state);
}
function clear(state: State, final = false): void {
  setAllPreferences(state.root, final);
  state.root.dataset.voice = String(final);
  state.root.dataset.sign = String(final);
  delete state.root.dataset.focus;
}
function reset(state: State, final = false): void {
  clear(state, final);
  state.position = 0;
}
function show(state: State, name: Step | undefined): void {
  clearCues(state);
  clear(state);
  if (!name) return;
  const { root, delay } = state;
  root.dataset.focus = name;
  if (name === 'text') {
    // The row rises, the switch flips on, then the text grows in two steps.
    cue(state, delay, () => {
      setPreference(root, 'guide', true);
      setPreference(root, 'text', true);
    });
    cue(state, delay * 2.5, () => {
      setTextSize(root, 150);
    });
  } else if (name === 'voice') {
    // The play button is tapped (in CSS), then the wave starts and fills.
    cue(state, delay, () => {
      root.dataset.voice = 'true';
    });
  } else root.dataset[name] = 'true';
}
/** Even positions show a step, odd positions rest between steps. */
function advance(state: State): void {
  state.timer = undefined;
  const position = state.position;
  show(state, position % 2 === 0 ? steps[position / 2] : undefined);
  state.position = (position + 1) % (steps.length * 2);
  schedule(state);
}
function schedule(state: State): void {
  sync(state);
  if (!state.active || !state.automatic || state.reduced || state.timer !== undefined) return;
  state.timer = setTimeout(
    () => {
      advance(state);
    },
    state.position % 2 === 1 ? state.hold : state.delay,
  );
}
function environment(state: State, active: boolean, reduced: boolean): void {
  if (reduced !== state.reduced && state.automatic) reset(state, reduced);
  state.active = active;
  state.reduced = reduced;
  state.root.dataset.active = String(active);
  if (active || reduced) state.root.dataset.entered = 'true';
  if (!active || reduced) clearTimer(state);
  schedule(state);
}
function timing(root: HTMLElement, name: string, fallback: number): number {
  const value = Number(getComputedStyle(root).getPropertyValue(name));
  return Number.isFinite(value) && value > 0 ? value : fallback;
}
export function createPreviewPlayer(root: HTMLElement): PreviewPlayer {
  const state: State = {
    root,
    delay: timing(root, '--preview-step-ms', 1200),
    hold: timing(root, '--preview-hold-ms', 2400),
    timer: undefined,
    cues: [],
    position: 0,
    active: false,
    automatic: !root.dataset.autoplay || root.dataset.autoplay === 'running',
    reduced: false,
  };
  return {
    environment: (active, reduced) => {
      environment(state, active, reduced);
    },
    stop: () => {
      stop(state);
    },
    manual: (name) => {
      stop(state);
      togglePreference(root, name);
    },
    dispose: () => {
      stop(state);
      root.dataset.active = 'false';
    },
  };
}
