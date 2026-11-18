import type { SubmitEnquiryRequest } from '../api/generated';
import type { Locale } from '../i18n';
import type { Choice } from './choices';
import { FIELD_ORDER, type FieldName } from './field-problems';
import { marketOf, type MarketCode } from './markets';

export interface FormValues {
  readonly choice: string;
  readonly websites: string;
  readonly name: string;
  readonly email: string;
  readonly organization: string;
  readonly country: string;
  readonly phone: string;
  readonly website: string;
  readonly message: string;
  readonly trap: string;
}

const MIN_NAME_LENGTH = 2;
const MIN_WEBSITES = 1;
const MAX_WEBSITES = 1000;
const MAX_WEBSITE_LENGTH = 2048;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function optional(text: string): string | null {
  const trimmed = text.trim();
  return trimmed === '' ? null : trimmed;
}

/** A site address typed without its scheme still means https, which the API requires. */
function withScheme(text: string): string | null {
  const url = optional(text);
  return url !== null && !/^[a-z][a-z0-9+.-]*:/i.test(url) ? `https://${url}` : url;
}

/** The address the API accepts: https, a host, no credentials, and not longer than it allows. */
function isHttpsAddress(text: string): boolean {
  const address = withScheme(text);
  if (address === null || address.length > MAX_WEBSITE_LENGTH) return false;
  try {
    const url = new URL(address);
    return (
      url.protocol === 'https:' && url.hostname !== '' && url.username === '' && url.password === ''
    );
  } catch {
    return false;
  }
}

/** What can be judged before sending. The API judges the rest, and its answer is shown the same way. */
export function problemsIn(values: FormValues, choice: Choice | null): FieldName[] {
  const websites = Number(values.websites);
  const wrong: Record<FieldName, boolean> = {
    choice: choice === null,
    websites:
      choice?.kind === 'custom' &&
      !(Number.isInteger(websites) && websites >= MIN_WEBSITES && websites <= MAX_WEBSITES),
    name: values.name.trim().length < MIN_NAME_LENGTH,
    email: !EMAIL.test(values.email.trim()),
    organization: values.organization.trim().length < MIN_NAME_LENGTH,
    country: marketOf(values.country) === null,
    phone: false,
    website: !isHttpsAddress(values.website),
    message: false,
  };
  return FIELD_ORDER.filter((field) => wrong[field]);
}

export function buildRequest(
  values: FormValues,
  choice: Choice,
  country: MarketCode,
  key: string,
  locale: Locale,
): SubmitEnquiryRequest {
  return {
    idempotencyKey: key,
    kind: choice.kind,
    name: values.name.trim(),
    email: values.email.trim(),
    organization: values.organization.trim(),
    country,
    phone: optional(values.phone),
    website: withScheme(values.website) ?? '',
    language: locale,
    websites: choice.kind === 'custom' ? Number(values.websites) : null,
    message: optional(values.message),
    plan: choice.kind === 'plan' ? { name: choice.name, period: choice.period } : null,
    leaveBlank: optional(values.trap),
  };
}
