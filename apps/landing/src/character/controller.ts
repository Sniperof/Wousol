import { watchMotionPreference } from '../preview/motion';
import { updateScene, type SceneState } from './scene-state';

function createSceneObserver(
  scenes: ReadonlyMap<Element, SceneState>,
  refresh: () => void,
): IntersectionObserver | undefined {
  if (typeof IntersectionObserver === 'undefined') return undefined;
  return new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const scene = scenes.get(entry.target);
        if (scene) scene.visible = entry.isIntersecting;
      }
      refresh();
    },
    { threshold: 0.2 },
  );
}

export function startCharacterScenes(document: Document): () => void {
  const scope = new AbortController();
  const scenes = new Map<Element, SceneState>();
  let reduced = false;
  const refresh = (): void => {
    for (const scene of scenes.values()) updateScene(scene, reduced, document.hidden);
  };
  const observer = createSceneObserver(scenes, refresh);
  for (const root of document.querySelectorAll<HTMLElement>('[data-character]')) {
    const scene: SceneState = { root, visible: false };
    scenes.set(root, scene);
    // The pointer does not touch the scenes: they play on their own while in view.
    observer?.observe(root);
  }
  const stopMotion = watchMotionPreference(document.documentElement, (value) => {
    reduced = value;
    refresh();
  });
  document.addEventListener('visibilitychange', refresh, { signal: scope.signal });
  return () => {
    scope.abort();
    observer?.disconnect();
    stopMotion();
    for (const { root } of scenes.values()) root.dataset.playing = 'false';
  };
}
