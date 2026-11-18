import { messagesFor, type Locale } from '../i18n';

export interface BrandPart {
  readonly text: string;
  readonly isBrand: boolean;
}

/** Include Arabic prepositions, while leaving suffixes such as وصولنا outside the emphasis. */
export function brandParts(text: string, locale: Locale): readonly BrandPart[] {
  const name = messagesFor(locale).siteName;
  const word = '[\\p{L}\\p{M}\\p{N}_]';
  const names = locale === 'ar' ? '[وف]?(?:[بك]?ال|لل|[بكل])?وصول' : name;
  const pattern = new RegExp(`(?<!${word})(${names})(?!${word})`, 'gu');
  return text.split(pattern).map((part, index) => ({ text: part, isBrand: index % 2 === 1 }));
}
