import type { Locale } from '../i18n';
import { pricingWords } from '../i18n/pricing';

/** "One website" or "Up to 3 websites", in the plural form the language needs. Empty when the plan sets no number. */
export function sitesLabel(limit: number | string, locale: Locale): string {
  const count = Number(limit);
  if (!Number.isFinite(count) || count <= 0) return '';
  const forms = pricingWords(locale).sites;
  const form = new Intl.PluralRules(locale).select(count);
  return forms[form].replace('{n}', new Intl.NumberFormat(locale).format(count));
}
