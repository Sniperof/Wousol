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
