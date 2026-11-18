import type { PublicPlanCatalog, PublicPlan } from '../api/generated';
import type { Locale } from '../i18n';
import { pricingWords } from '../i18n/pricing';
import { featureList, perkList } from './feature-list';
import { formatPrice } from './format-price';
import { sitesLabel } from './sites';
import { setBrandText } from '../brand/dom';
export type Period = 'monthly' | 'yearly';
function element(tag: string, text: string, className = ''): HTMLElement {
  const node = document.createElement(tag);
  node.textContent = text;
  if (className) node.className = className;
  return node;
}
function brandedElement(tag: string, text: string, locale: Locale): HTMLElement {
  const node = element(tag, '');
  setBrandText(node, text, locale);
  return node;
}
/**
 * A link to the request form. It names what was chosen in attributes, and the form (which sits outside the cards, so
 * rebuilding them keeps what a visitor typed) reads them from a click; without scripts it is a plain link to the form.
 */
/** Every card says the same words, so the plan's name follows them for screen readers. */
function requestLink(
  label: string,
  planName: string,
  choice: { readonly plan: string; readonly period: Period } | { readonly kind: 'custom' },
  featured = false,
): HTMLAnchorElement {
  const link = document.createElement('a');
  // Only the featured plan's button is filled, so it leads; the others are outlined.
  link.className = featured ? 'button' : 'button secondary';
  link.href = '#request-demo';
  const name = document.createElement('span');
  name.className = 'visually-hidden';
  name.textContent = ` · ${planName}`;
  link.append(label, name);
  if ('plan' in choice) {
    link.dataset.requestPlan = choice.plan;
    link.dataset.requestPeriod = choice.period;
  } else {
    link.dataset.requestKind = choice.kind;
  }
  return link;
}
function standard(plan: PublicPlan, locale: Locale, period: Period): HTMLElement {
  const words = pricingWords(locale);
  const card = element('article', '', 'price-card aligned-card');
  card.dataset.highlighted = String(plan.isFeatured);
  card.append(badgeSlot(plan.isFeatured, locale), brandedElement('h3', plan.name, locale));
  const amount = period === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  const action = element('div', '', 'plan-action');
  if (amount !== null || plan.priceHidden)
    action.append(
      requestLink(words.choose, plan.name, { plan: plan.name, period }, plan.isFeatured),
    );
  const offer = offerOf(plan, amount, locale, period);
  const sites = sitesLabel(plan.siteLimit, locale);
  if (sites) offer.prepend(element('p', sites, 'plan-sites'));
  card.append(offer, featureList(plan.features, locale), action);
  return card;
}
/** The amount and its note. A hidden price is a dash the screen reader skips, with the words "Price on request" beside it. */
function offerOf(
  plan: PublicPlan,
  amount: PublicPlan['monthlyPrice'],
  locale: Locale,
  period: Period,
): HTMLElement {
  const words = pricingWords(locale);
  const offer = element('div', '', 'plan-offer');
  if (plan.priceHidden) {
    offer.append(element('p', words.priceOnRequest, 'price price-on-request'));
    return offer;
  }
  offer.append(
    element(
      'p',
      amount === null ? words.notOffered : formatPrice(Number(amount), plan.currency, locale),
      'price',
    ),
  );
  if (amount !== null)
    offer.append(
      element('p', period === 'monthly' ? words.monthSuffix : words.yearSuffix, 'price-note'),
    );
  return offer;
}
function customCard(locale: Locale, custom: PublicPlanCatalog['custom']): HTMLElement {
  const words = pricingWords(locale);
  const card = element('article', '', 'price-card custom-card aligned-card');
  card.dataset.highlighted = 'false';
  const offer = element('div', '', 'plan-offer');
  const action = element('div', '', 'plan-action');
  const customTitle = (locale === 'ar' ? custom.titleAr : custom.titleEn) || words.customTitle;
  offer.append(
    brandedElement(
      'p',
      (locale === 'ar' ? custom.descriptionAr : custom.descriptionEn) || words.customBody,
      locale,
    ),
  );
  card.append(
    badgeSlot(false, locale),
    brandedElement('h3', customTitle, locale),
    offer,
    perkList(locale),
    action,
  );
  action.append(requestLink(words.choose, customTitle, { kind: 'custom' }));
  return card;
}
function badgeSlot(featured: boolean, locale: Locale): HTMLElement {
  const slot = element('div', '', 'plan-badge-slot');
  if (featured) slot.append(element('span', pricingWords(locale).mostPopular, 'plan-badge'));
  return slot;
}
export function renderCards(
  container: HTMLElement,
  data: PublicPlanCatalog,
  locale: Locale,
  period: Period,
): void {
  const cards = [
    ...data.plans.map((plan, index) => {
      const card = standard(plan, locale, period);
      card.dataset.planIndex = String(index);
      return card;
    }),
    customCard(locale, data.custom),
  ];
  container.dataset.count = String(cards.length);
  container.replaceChildren(...cards);
}
