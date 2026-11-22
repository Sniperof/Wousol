import type { Locale } from '../i18n';
import { pricingFeatures, pricingWords } from '../i18n/pricing';
import { featureIcons } from '../features/icons';

const SVG = 'http://www.w3.org/2000/svg';

function icon(path: string): SVGSVGElement {
  const svg = document.createElementNS(SVG, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  const line = document.createElementNS(SVG, 'path');
  line.setAttribute('d', path);
  svg.append(line);
  return svg;
}

/** A plan's full list for the features dialog: each preference as a tile with the same icon the hero strip uses. */
export function featureTiles(ids: readonly string[], locale: Locale): HTMLUListElement {
  const labels = pricingFeatures(locale);
  const paths = new Map(featureIcons);
  const list = document.createElement('ul');
  list.className = 'feature-tiles';
  list.setAttribute('role', 'list');
  list.setAttribute('aria-label', pricingWords(locale).features);
  for (const id of ids) {
    const label = labels[id];
    if (!label) continue;
    const item = document.createElement('li');
    const path = paths.get(id);
    if (path) item.append(icon(path));
    item.append(label);
    list.append(item);
  }
  return list;
}
