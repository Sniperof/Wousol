export type FieldName =
  | 'choice'
  | 'websites'
  | 'name'
  | 'email'
  | 'organization'
  | 'country'
  | 'phone'
  | 'website'
  | 'message';

/** The order the fields appear in, so the first problem is the first one a reader meets. */
export const FIELD_ORDER: readonly FieldName[] = [
  'choice',
  'websites',
  'name',
  'email',
  'organization',
  'country',
  'phone',
  'website',
  'message',
];

/** The form field behind each key the API names a problem by (its C# path), compared without regard to case. */
const FIELD_OF_KEY: Readonly<Record<string, FieldName>> = {
  kind: 'choice',
  plan: 'choice',
  'plan.name': 'choice',
  'plan.period': 'choice',
  websites: 'websites',
  name: 'name',
  email: 'email',
  organization: 'organization',
  country: 'country',
  phone: 'phone',
  website: 'website',
  message: 'message',
};

/**
 * The fields a refusal names. Only its keys are read: the page explains each problem in its own words, never the
 * server's, and a key that belongs to no field (the hidden key, the language) is left out.
 */
export function fieldsRefused(problem: unknown): FieldName[] {
  if (typeof problem !== 'object' || problem === null || !('errors' in problem)) return [];
  const { errors } = problem;
  if (typeof errors !== 'object' || errors === null) return [];
  const named = new Set<FieldName>();
  for (const key of Object.keys(errors)) {
    const field = FIELD_OF_KEY[key.toLowerCase()];
    if (field) named.add(field);
  }
  return FIELD_ORDER.filter((field) => named.has(field));
}
