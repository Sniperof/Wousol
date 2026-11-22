import type { PublicPlan } from '../api/generated';
import { createDialog } from '../dialog/controller';
import { pricingWords } from '../i18n/pricing';
import { featureTiles } from './feature-tiles';
import { setBrandText } from '../brand/dom';

/** One dialog serves every card, including cards rebuilt after a billing-period change. */
export function startFeatureDialog(root: HTMLElement, plans: () => readonly PublicPlan[]): void {
  const element = root.querySelector<HTMLDialogElement>('[data-feature-dialog]');
  const title = element?.querySelector<HTMLElement>('[data-feature-title]');
  const content = element?.querySelector<HTMLElement>('[data-feature-content]');
  if (!element || !title || !content) return;
  const dialog = createDialog(element);
  if (!dialog) return;
  const locale = root.dataset.locale === 'ar' ? 'ar' : 'en';
  root.addEventListener('click', (event) => {
    const button =
      event.target instanceof Element
        ? event.target.closest<HTMLButtonElement>('[data-plan-features]')
        : null;
    if (!button) return;
    const index = Number(button.closest<HTMLElement>('[data-plan-index]')?.dataset.planIndex);
    const plan = plans()[index];
    if (!plan) return;
    const name = root.ownerDocument.createElement('bdi');
    setBrandText(name, plan.name, locale);
    const [before, after] = pricingWords(locale).featuresTitle.split('{plan}');
    title.replaceChildren(before ?? '', name, after ?? '');
    content.replaceChildren(featureTiles(plan.features, locale));
    dialog.open(button);
    title.focus();
  });
}
