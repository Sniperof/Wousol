import type { PublicPlan, PublicPlanCatalog } from '../api/generated';

type IncomingPlan = Omit<PublicPlan, 'isFeatured' | 'priceHidden'> & {
  readonly isFeatured?: boolean;
  readonly priceHidden?: boolean;
};
type IncomingCatalog = Omit<PublicPlanCatalog, 'plans'> & { readonly plans: IncomingPlan[] };

const maximumStandardPlans = 3;
// Accept the previous catalogue during rollout; the public row still publishes only three plans.
const maximumLegacyStandardPlans = 4;
const catalogueTimeoutMs = 10_000;

function object(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
function price(value: unknown): boolean {
  return value === null || (Number.isSafeInteger(value) && Number(value) >= 0);
}
function plan(value: unknown): boolean {
  if (!object(value)) return false;
  return (
    typeof value.name === 'string' &&
    Number.isInteger(value.siteLimit) &&
    Number(value.siteLimit) > 0 &&
    Array.isArray(value.features) &&
    value.features.every((id: unknown) => typeof id === 'string') &&
    typeof value.currency === 'string' &&
    /^[A-Z]{3}$/.test(value.currency) &&
    (value.isFeatured === undefined || typeof value.isFeatured === 'boolean') &&
    (value.priceHidden === undefined || typeof value.priceHidden === 'boolean') &&
    price(value.monthlyPrice) &&
    price(value.yearlyPrice) &&
    (value.monthlyPrice !== null || value.yearlyPrice !== null || value.priceHidden === true)
  );
}
function valid(value: unknown): value is IncomingCatalog {
  if (
    !object(value) ||
    !Array.isArray(value.plans) ||
    value.plans.length > maximumLegacyStandardPlans ||
    !value.plans.every(plan) ||
    !object(value.custom)
  )
    return false;
  const card = value.custom;
  return (
    ['titleEn', 'titleAr', 'descriptionEn', 'descriptionAr', 'salesEmail'].every(
      (key) => typeof card[key] === 'string',
    ) &&
    typeof card.salesEmail === 'string' &&
    (card.salesEmail === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(card.salesEmail))
  );
}
export async function loadCatalog(): Promise<PublicPlanCatalog> {
  const response = await fetch('/api/public/plans', {
    credentials: 'omit',
    cache: 'no-store',
    signal: AbortSignal.timeout(catalogueTimeoutMs),
  });
  if (!response.ok) throw new Error('Pricing request failed');
  const body: unknown = await response.json();
  if (!valid(body)) throw new Error('Invalid pricing catalogue');
  return {
    ...body,
    plans: body.plans.slice(0, maximumStandardPlans).map((item) => ({
      ...item,
      isFeatured: item.isFeatured ?? false,
      priceHidden: item.priceHidden ?? false,
    })),
  };
}
