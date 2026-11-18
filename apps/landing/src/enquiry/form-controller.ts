import type { Locale } from '../i18n';
import { enquiryWords } from '../i18n/enquiry';
import { pricingWords } from '../i18n/pricing';
import { planValue, type PlanPeriod } from './choices';
import { createDialog, type ModalDialog } from '../dialog/controller';
import { createView, type FormView } from './form-view';
import { createSubmitFlow, type SubmitFlow } from './submit-flow';

function periodOf(value: string | undefined): PlanPeriod {
  return value === 'yearly' ? 'yearly' : 'monthly';
}

/**
 * The request form, which lives in a dialog that stays closed until a visitor asks for it, so a page without scripts
 * shows only the `mailto:` link. Any link that carries `data-request-plan` or `data-request-kind` opens it: a card's
 * "Request this plan" link names the plan and period, and a click is caught here at the document, so the form needs no
 * catalogue and the cards (which are rebuilt whenever the billing period changes) need no handle on the form.
 */
export function startEnquiry(root: HTMLElement): () => void {
  const locale: Locale = root.dataset.locale === 'ar' ? 'ar' : 'en';
  const words = enquiryWords(locale);
  const view = createView(root, words);
  if (!view) return () => undefined;
  const listeners = new AbortController();
  const { signal } = listeners;
  const element = root.querySelector<HTMLDialogElement>('[data-dialog]');
  const dialog = element ? createDialog(element, signal) : null;
  if (!dialog) return () => undefined;
  for (const control of document.querySelectorAll<HTMLElement>('[data-needs-dialog]'))
    control.hidden = false;
  const flow = createSubmitFlow(view, words, locale);

  document.addEventListener(
    'click',
    (event) => {
      handleRequestClick(event, { view, dialog, locale }, flow);
    },
    { signal },
  );
  view.form.addEventListener(
    'submit',
    (event) => {
      event.preventDefault();
      void flow.submit();
    },
    { signal },
  );
  view.again.addEventListener('click', flow.startAgain, { signal });
  view.syncWebsites();
  return () => {
    listeners.abort();
  };
}

interface Request {
  readonly view: FormView;
  readonly dialog: ModalDialog;
  readonly locale: Locale;
}

function handleRequestClick(event: MouseEvent, request: Request, flow: SubmitFlow): void {
  const { view, dialog, locale } = request;
  const link =
    event.target instanceof Element
      ? event.target.closest<HTMLElement>('[data-request-plan], [data-request-kind]')
      : null;
  if (!link) return;
  event.preventDefault();
  dialog.open(link);
  if (flow.isSending()) return;
  if (view.isThanksShown()) flow.startAgain();
  const { requestPlan, requestPeriod, requestKind } = link.dataset;
  const period = periodOf(requestPeriod);
  const context = requestPlan
    ? planValue(requestPlan, period)
    : requestKind === 'custom'
      ? 'custom'
      : 'demo';
  if (view.values().choice !== context) flow.changeContext();
  if (requestPlan) {
    const words = pricingWords(locale);
    view.choosePlan(
      `${requestPlan} · ${period === 'yearly' ? words.yearly : words.monthly}`,
      requestPlan,
      period,
    );
  } else {
    view.chooseKind(requestKind === 'custom' ? 'custom' : 'demo');
  }
  view.focusFirst();
}
