export interface SceneState {
  readonly root: HTMLElement;
  visible: boolean;
}

export function updateScene(scene: SceneState, reduced: boolean, hidden: boolean): void {
  const { root } = scene;
  if (reduced) {
    root.dataset.started = 'false';
    root.dataset.playing = 'false';
    return;
  }
  const playing = scene.visible && !hidden;
  if (playing) root.dataset.started = 'true';
  root.dataset.playing = String(playing);
}

export function replayScene(scene: SceneState, reduced: boolean, hidden: boolean): void {
  if (!scene.visible || reduced || hidden) return;
  scene.root.dataset.started = 'false';
  // A deliberate hover restarts the choreographed CSS loop without timers.
  scene.root.getBoundingClientRect();
  updateScene(scene, reduced, hidden);
}
