import { messagesFor, type Locale } from '../i18n';
import { createEnquiryLink, enquiryHref } from './enquiry';
import { demoSalesEmail } from '../config/contact';

export function updateDemoContact(document: Document, locale: Locale, email = ''): void {
  const root = document.querySelector<HTMLElement>('[data-demo-contact]');
  const container = root?.querySelector<HTMLElement>('[data-demo-email]');
  if (!root || !container) return;
  const words = messagesFor(locale);
  const link = container.querySelector<HTMLAnchorElement>('a');
  if (link) {
    link.href = enquiryHref(email || demoSalesEmail, words.final.subject);
    link.textContent = words.final.contact;
    return;
  }
  container.append(
    createEnquiryLink(email || demoSalesEmail, words.final.subject, words.final.contact),
  );
}
