import type { SubmitEnquiryRequest } from '../api/generated';
import type { Locale } from '../i18n';

export type MarketCode = SubmitEnquiryRequest['country'];

/**
 * The countries IT Land sells in, in the order the admin offers them (ADR 0024, `MARKET_CODES` in the admin's
 * `shared/i18n/countries.ts`). The API accepts every assigned code; the form offers only these, so a visitor elsewhere
 * writes to us by email instead.
 */
export const MARKET_CODES = [
  'SA',
  'AE',
  'KW',
  'QA',
  'BH',
  'OM',
  'LB',
] as const satisfies readonly MarketCode[];

export interface MarketOption {
  readonly code: MarketCode;
  readonly name: string;
}

/** The market a select value names, or `null` for anything else, including the empty "choose" option. */
export function marketOf(value: string): MarketCode | null {
  return MARKET_CODES.find((code) => code === value) ?? null;
}

/** The markets named for a reader of `locale` by the platform's `Intl.DisplayNames`, so no name is written by hand. */
export function marketOptions(locale: Locale): readonly MarketOption[] {
  const names = new Intl.DisplayNames([locale], { type: 'region', fallback: 'code' });
  return MARKET_CODES.map((code) => ({ code, name: names.of(code) ?? code }));
}
