import { ar } from './locales/ar';
import { en } from './locales/en';
import type { Messages } from './messages';

export type Locale = 'en' | 'ar';

const CATALOGS: Readonly<Record<Locale, Messages>> = { en, ar };
const HOME_PATHS: Readonly<Record<Locale, string>> = { en: '/en/', ar: '/' };

export function messagesFor(locale: Locale): Messages {
  return CATALOGS[locale];
}

export function directionOf(locale: Locale): 'ltr' | 'rtl' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function homePathOf(locale: Locale): string {
  return HOME_PATHS[locale];
}

/** The site speaks two languages, so the header always links to the other one. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'ar' : 'en';
}
