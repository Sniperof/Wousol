import type { SubmitEnquiryRequest } from '../api/generated';
import { fieldsRefused, type FieldName } from './field-problems';

/** Same origin as the page, through the reverse proxy, like the public pricing it sits beside. */
const ENQUIRY_URL = '/api/public/enquiries';
const TIMEOUT_MS = 10_000;
const ACCEPTED = 202;
const REFUSED = 400;
const TOO_MANY = 429;

export type Outcome =
  | { readonly kind: 'sent' }
  | { readonly kind: 'refused'; readonly fields: readonly FieldName[] }
  | { readonly kind: 'busy' }
  | { readonly kind: 'failed' };

/** Sends one request. No cookie, no referrer, nothing cached, and every way it can fail is an `Outcome`, never a throw. */
export async function sendEnquiry(request: SubmitEnquiryRequest): Promise<Outcome> {
  try {
    const response = await fetch(ENQUIRY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      credentials: 'omit',
      cache: 'no-store',
      referrerPolicy: 'no-referrer',
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (response.status === ACCEPTED) return { kind: 'sent' };
    if (response.status === TOO_MANY) return { kind: 'busy' };
    if (response.status !== REFUSED) return { kind: 'failed' };
    return { kind: 'refused', fields: fieldsRefused(await response.json().catch(() => null)) };
  } catch {
    return { kind: 'failed' };
  }
}
