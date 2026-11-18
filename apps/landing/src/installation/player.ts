interface State {
  readonly root: HTMLElement;
  readonly steps: readonly HTMLButtonElement[];
  readonly scenes: readonly HTMLElement[];
  readonly delay: number;
  step: number;
  automatic: boolean;
  active: boolean;
  reduced: boolean;
  timer: ReturnType<typeof setTimeout> | undefined;
}
export interface InstallationPlayer {
  readonly environment: (active: boolean, reduced: boolean) => void;
  readonly select: (index: number) => void;
  readonly pause: () => void;
  readonly dispose: () => void;
}
function render(state: State): void {
  const { root, step, automatic, active, reduced } = state;
  root.dataset.step = String(step);
  root.dataset.autoplay = automatic ? 'running' : 'stopped';
  root.dataset.playing = String(automatic && active && !reduced);
  root.dataset.active = String(active);
  root.dataset.reduced = String(reduced);
  state.steps.forEach((button, index) => {
    if (index === step) button.setAttribute('aria-current', 'step');
    else button.removeAttribute('aria-current');
    const item = button.closest<HTMLElement>('.installation-step');
    if (item) item.dataset.current = String(index === step);
  });
  state.scenes.forEach((scene, index) => {
    scene.dataset.current = String(index === step);
    scene.inert = index !== step;
    scene.setAttribute('aria-hidden', String(index !== step));
  });
}
function refresh(state: State): void {
  clearTimeout(state.timer);
  state.timer = undefined;
  render(state);
  if (!state.automatic || !state.active || state.reduced) return;
  state.timer = setTimeout(() => {
    state.step = (state.step + 1) % state.scenes.length;
    refresh(state);
  }, state.delay);
}
function setAutomatic(state: State, automatic: boolean): void {
  state.automatic = automatic;
  refresh(state);
}
function playerActions(state: State): InstallationPlayer {
  const { root, scenes } = state;
  return {
    environment: (active, reduced) => {
      state.active = active;
      state.reduced = reduced;
      refresh(state);
    },
    select: (index) => {
      if (!Number.isInteger(index) || index < 0 || index >= scenes.length) return;
      state.step = index;
      setAutomatic(state, false);
    },
    pause: () => {
      setAutomatic(state, false);
    },
    dispose: () => {
      clearTimeout(state.timer);
      root.dataset.playing = 'false';
      root.dataset.active = 'false';
    },
  };
}
export function createInstallationPlayer(root: HTMLElement): InstallationPlayer | undefined {
  const steps = [...root.querySelectorAll<HTMLButtonElement>('[data-installation-step]')];
  const scenes = [...root.querySelectorAll<HTMLElement>('[data-installation-scene]')];
  const delay = Number(getComputedStyle(root).getPropertyValue('--installation-step-ms'));
  if (!scenes.length || steps.length !== scenes.length || delay <= 0 || !Number.isFinite(delay))
    return undefined;
  const savedStep = Number(root.dataset.step ?? 0);
  return playerActions({
    root,
    steps,
    scenes,
    delay,
    step:
      Number.isInteger(savedStep) && savedStep >= 0 && savedStep < scenes.length ? savedStep : 0,
    automatic: root.dataset.autoplay !== 'stopped',
    active: false,
    reduced: false,
    timer: undefined,
  });
}
