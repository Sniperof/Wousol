import type { Locale } from '../i18n';
import { brandParts } from './text';

/** Catalogue strings stay text, including anything resembling HTML. */
export function setBrandText(node: HTMLElement, text: string, locale: Locale): void {
  const document = node.ownerDocument;
  const parts = brandParts(text, locale).map((part) => {
    if (!part.isBrand) return document.createTextNode(part.text);
    const span = document.createElement('span');
    span.className = 'brand-word';
    span.dir = 'auto';
    span.textContent = part.text;
    return span;
  });
  node.replaceChildren(...parts);
}
