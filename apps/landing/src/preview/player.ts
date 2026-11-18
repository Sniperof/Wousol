import { setAllPreferences, setPreference, togglePreference, type Preference } from './controls';

const steps = ['text', 'voice', 'guide'] as const;
interface State {
  readonly root: HTMLElement;
  readonly delay: number;
  readonly hold: number;
  timer: ReturnType<typeof setTimeout> | undefined;
  step: number;
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
function reset(state: State, final = false): void {
  setAllPreferences(state.root, final);
  state.root.dataset.voice = String(final);
  delete state.root.dataset.focus;
  state.step = final ? steps.length : 0;
}
function advance(state: State): void {
  state.timer = undefined;
  const name = steps[state.step];
  if (name) {
    if (name === 'voice') state.root.dataset.voice = 'true';
    else setPreference(state.root, name, true);
    // The step just shown is the one the art brings forward; the others rest.
    state.root.dataset.focus = name;
    state.step += 1;
  } else reset(state);
  schedule(state);
}
function schedule(state: State): void {
  sync(state);
  if (!state.active || !state.automatic || state.reduced || state.timer !== undefined) return;
  state.timer = setTimeout(
    () => {
      advance(state);
    },
    state.step === steps.length ? state.hold : state.delay,
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
    step: 0,
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
