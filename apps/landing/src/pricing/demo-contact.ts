import { messagesFor, type Locale } from '../i18n';
import { enquiryHref } from './enquiry';
import { demoSalesEmail } from '../config/contact';

/** Points every email fallback beside the request form (the closing call and the dialog) at the catalogue's sales address. */
export function updateDemoContact(document: Document, locale: Locale, email = ''): void {
  const root = document.querySelector<HTMLElement>('[data-demo-contact]');
  const address = email || demoSalesEmail;
  for (const container of root?.querySelectorAll<HTMLElement>('[data-demo-email]') ?? []) {
    const link = container.querySelector<HTMLAnchorElement>('a') ?? document.createElement('a');
    link.href = enquiryHref(address, messagesFor(locale).final.subject);
    link.textContent = address;
    link.dir = 'ltr';
    if (!link.isConnected) container.append(link);
  }
}
