import type { Locale } from '../i18n';

/** The dollar is "$" in every language (Arabic's own label is "US$"); the Kuwaiti dinar loses its final dot in Arabic. */
function currencyLabel(currency: string, locale: Locale, label: string): string {
  if (currency === 'USD') return '$';
  return locale === 'ar' && currency === 'KWD' ? label.replace(/\.$/u, '') : label;
}

/** Keep the currency's minor-unit scale even when a whole price hides its decimal places. */
export function formatPrice(amount: number, currency: string, locale: Locale): string {
  const options = { style: 'currency', currency } as const;
  const digits =
    new Intl.NumberFormat(locale, options).resolvedOptions().maximumFractionDigits ?? 2;
  const scale = 10 ** digits;
  const formatter = new Intl.NumberFormat(locale, {
    ...options,
    minimumFractionDigits: amount % scale === 0 ? 0 : digits,
    maximumFractionDigits: digits,
  });
  return formatter
    .formatToParts(amount / scale)
    .map(({ type, value }) =>
      type === 'currency' ? currencyLabel(currency, locale, value) : value,
    )
    .join('');
}
