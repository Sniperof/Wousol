import type { Locale } from '../i18n';
import { pricingFeatures, pricingWords } from '../i18n/pricing';

const visibleFeatureCount = 4;

function labelled(labels: readonly string[], name: string): HTMLUListElement {
  const node = document.createElement('ul');
  node.setAttribute('role', 'list');
  node.setAttribute('aria-label', name);
  for (const label of labels) {
    const item = document.createElement('li');
    item.textContent = label;
    node.append(item);
  }
  return node;
}
export function fullFeatureList(ids: readonly string[], locale: Locale): HTMLUListElement {
  const labels = pricingFeatures(locale);
  return labelled(
    ids.filter((id) => labels[id]).map((id) => labels[id] ?? ''),
    pricingWords(locale).features,
  );
}
/** What a custom plan adds, in words: services and limits rather than preferences, so no id lookup and no "more". */
export function perkList(locale: Locale): HTMLElement {
  const words = pricingWords(locale);
  const container = document.createElement('div');
  container.className = 'plan-features';
  container.append(labelled(words.customPerks, words.customPerksLabel));
  return container;
}
export function featureList(ids: readonly string[], locale: Locale): HTMLElement {
  const known = ids.filter((id) => pricingFeatures(locale)[id]);
  const container = document.createElement('div');
  container.className = 'plan-features';
  container.append(fullFeatureList(known.slice(0, visibleFeatureCount), locale));
  if (known.length <= visibleFeatureCount) return container;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'plan-features-button';
  button.dataset.planFeatures = '';
  button.setAttribute('aria-haspopup', 'dialog');
  button.setAttribute('aria-controls', 'plan-features-dialog');
  button.textContent = pricingWords(locale).moreFeatures;
  container.append(button);
  return container;
}
