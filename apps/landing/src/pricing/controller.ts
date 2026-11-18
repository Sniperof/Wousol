import type { PublicPlanCatalog } from '../api/generated';
import { loadCatalog } from './catalog';
import { updateDemoContact } from './demo-contact';
import { renderCards, type Period } from './cards';
import { startFeatureDialog } from './feature-dialog';

function keepFocusedCardVisible(cards: HTMLElement): void {
  cards.addEventListener('focusin', (event) => {
    if (!(event.target instanceof HTMLElement) || !event.target.matches(':focus-visible')) return;
    event.target
      .closest<HTMLElement>('.price-card')
      ?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'instant' });
  });
}

function updatePricingLinks(document: Document, available: boolean): void {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-pricing-nav]'))
    link.hidden = !available;
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-pricing-action]')) {
    link.href = available ? '#pricing' : '#request-demo';
    if (available) delete link.dataset.requestKind;
    else link.dataset.requestKind = 'demo';
  }
}

export function startPricing(root: HTMLElement): void {
  const locale = root.dataset.locale === 'ar' ? 'ar' : 'en';
  const cards = root.querySelector<HTMLElement>('[data-pricing-cards]');
  const billing = root.querySelector<HTMLFieldSetElement>('[data-pricing-period]');
  if (!cards || !billing) return;
  keepFocusedCardVisible(cards);
  let data: PublicPlanCatalog | undefined;
  let period: Period = 'monthly';
  startFeatureDialog(root, () => data?.plans ?? []);
  const refresh = async (): Promise<void> => {
    data = undefined;
    root.hidden = true;
    root.dataset.pricingState = 'loading';
    updatePricingLinks(root.ownerDocument, false);
    updateDemoContact(root.ownerDocument, locale);
    try {
      data = await loadCatalog();
      updateDemoContact(root.ownerDocument, locale, data.custom.salesEmail);
      const available = data.plans.length > 0;
      root.dataset.pricingState = available ? 'ready' : 'empty';
      if (available) renderCards(cards, data, locale, period);
      // Monthly and yearly only differ in price, so the switch goes when every price is on request.
      billing.hidden = !available || data.plans.every((plan) => plan.priceHidden);
      root.hidden = !available;
      updatePricingLinks(root.ownerDocument, available);
    } catch {
      root.dataset.pricingState = 'failed';
      cards.replaceChildren();
    }
  };
  root.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement) || event.target.name !== 'period') return;
    period = event.target.value === 'yearly' ? 'yearly' : 'monthly';
    if (data) renderCards(cards, data, locale, period);
  });
  void refresh();
}
