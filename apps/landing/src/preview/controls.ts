export const preferences = ['text', 'guide'] as const;
export type Preference = (typeof preferences)[number];

export function setPreference(root: HTMLElement, name: Preference, enabled: boolean): void {
  if (name === 'text') {
    setTextSize(root, enabled ? automaticTextSize : defaultTextSize);
    return;
  }
  root.setAttribute('data-' + name, String(enabled));
  root
    .querySelector<HTMLButtonElement>('[data-preference="' + name + '"]')
    ?.setAttribute('aria-pressed', String(enabled));
}

export function setAllPreferences(root: HTMLElement, enabled: boolean): void {
  for (const name of preferences) setPreference(root, name, enabled);
}

export function togglePreference(root: HTMLElement, name: Preference): void {
  if (name === 'text') {
    advanceTextSize(root);
    return;
  }
  setPreference(root, name, root.getAttribute('data-' + name) !== 'true');
}
import { advanceTextSize, automaticTextSize, defaultTextSize, setTextSize } from './text-size';
