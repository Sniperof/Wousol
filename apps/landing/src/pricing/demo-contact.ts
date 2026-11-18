import { messagesFor, type Locale } from '../i18n';
import { enquiryHref } from './enquiry';
import { demoSalesEmail } from '../config/contact';

/** Points the email fallback beside the request form at the catalogue's sales address, shown as the address itself. */
export function updateDemoContact(document: Document, locale: Locale, email = ''): void {
  const root = document.querySelector<HTMLElement>('[data-demo-contact]');
  const container = root?.querySelector<HTMLElement>('[data-demo-email]');
  if (!root || !container) return;
  const address = email || demoSalesEmail;
  const link = container.querySelector<HTMLAnchorElement>('a') ?? document.createElement('a');
  link.href = enquiryHref(address, messagesFor(locale).final.subject);
  link.textContent = address;
  link.dir = 'ltr';
  if (!link.isConnected) container.append(link);
}
