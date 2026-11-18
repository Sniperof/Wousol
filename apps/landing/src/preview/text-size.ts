import { messagesFor } from '../i18n';

const levels = [100, 125, 150] as const;
export type TextSize = (typeof levels)[number];
export const defaultTextSize: TextSize = 100;
export const automaticTextSize: TextSize = 125;

export function textSizeOf(root: HTMLElement): TextSize {
  return levels.find((level) => String(level) === root.dataset.textSize) ?? defaultTextSize;
}

function nextSize(value: TextSize): TextSize {
  return levels[(levels.indexOf(value) + 1) % levels.length] ?? defaultTextSize;
}

export function setTextSize(root: HTMLElement, value: TextSize): void {
  const locale = root.dataset.locale === 'ar' ? 'ar' : 'en';
  const formatter = new Intl.NumberFormat(locale, { style: 'percent' });
  const percent = formatter.format(value / defaultTextSize);
  const next = formatter.format(nextSize(value) / defaultTextSize);
  root.dataset.textSize = String(value);
  root.dataset.text = String(value !== defaultTextSize);
  const button = root.querySelector<HTMLButtonElement>('[data-preference="text"]');
  const hint = root.querySelector<HTMLElement>('[data-text-size-hint]');
  if (hint) hint.textContent = messagesFor(locale).preview.textSizeHint.replace('{next}', next);
  const label = button?.querySelector<HTMLElement>('[data-text-size-value]');
  if (label) label.textContent = percent;
}

export function advanceTextSize(root: HTMLElement): void {
  setTextSize(root, nextSize(textSizeOf(root)));
}
