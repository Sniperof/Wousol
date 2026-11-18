export type PlanPeriod = 'monthly' | 'yearly';

export type Choice =
  | { readonly kind: 'demo' }
  | { readonly kind: 'custom' }
  | { readonly kind: 'plan'; readonly name: string; readonly period: PlanPeriod };

const SEPARATOR = '|';

export function planValue(name: string, period: PlanPeriod): string {
  return ['plan', period, name].join(SEPARATOR);
}

/** The opener's canonical request context, or null for a value the page never wrote. */
export function parseChoice(value: string): Choice | null {
  if (value === 'demo') return { kind: 'demo' };
  if (value === 'custom') return { kind: 'custom' };
  const [tag, period, ...name] = value.split(SEPARATOR);
  const isPeriod = period === 'monthly' || period === 'yearly';
  return tag === 'plan' && isPeriod && name.length > 0
    ? { kind: 'plan', name: name.join(SEPARATOR), period }
    : null;
}
