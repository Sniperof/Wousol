import { enPricing, enPricingFeatures } from './locales/en-pricing';
import { arPricing, arPricingFeatures } from './locales/ar-pricing';
import type { Locale } from './index';
export function pricingWords(locale: Locale): typeof enPricing {
  return locale === 'ar' ? arPricing : enPricing;
}
export function pricingFeatures(locale: Locale): Readonly<Record<string, string>> {
  return locale === 'ar' ? arPricingFeatures : enPricingFeatures;
}
