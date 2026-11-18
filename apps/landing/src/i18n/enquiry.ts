import { arEnquiry } from './locales/ar-enquiry';
import { enEnquiry } from './locales/en-enquiry';
import type { Locale } from './index';

export type EnquiryWords = typeof enEnquiry;

export function enquiryWords(locale: Locale): EnquiryWords {
  return locale === 'ar' ? arEnquiry : enEnquiry;
}
