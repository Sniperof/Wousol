import type { EnquiryWords } from '../i18n/enquiry';
import { planValue, type PlanPeriod } from './choices';
import type { FieldName } from './field-problems';
import { clearProblems, field, readValues, showProblems, syncWebsites } from './form-fields';
import type { FormValues } from './payload';

/** What the controller may do to the form. Every handle is looked up once, by the `data-` attributes in the markup. */
export interface FormView {
  readonly form: HTMLFormElement;
  readonly again: HTMLButtonElement;
  values(): FormValues;
  syncWebsites(): void;
  chooseKind(kind: 'demo' | 'custom'): void;
  choosePlan(label: string, name: string, period: PlanPeriod): void;
  focusFirst(): void;
  clearProblems(): void;
  showProblems(fields: readonly FieldName[]): void;
  setStatus(message: string): void;
  setSending(sending: boolean): void;
  showThanks(email: string): void;
  showForm(): void;
  isThanksShown(): boolean;
}

interface Handles {
  readonly form: HTMLFormElement;
  readonly thanks: HTMLElement;
  readonly body: HTMLElement;
  readonly title: HTMLElement;
  readonly again: HTMLButtonElement;
  readonly send: HTMLButtonElement;
  readonly choice: HTMLInputElement;
  readonly summary: HTMLInputElement;
  readonly status: HTMLElement;
}

/** Every element the view drives, or `null` when the markup is not the form's (so the page is left as it is). */
function handlesOf(root: HTMLElement): Handles | null {
  const form = root.querySelector<HTMLFormElement>('[data-form]');
  const thanks = root.querySelector<HTMLElement>('[data-thanks]');
  const body = thanks?.querySelector<HTMLElement>('[data-thanks-body]');
  const title = thanks?.querySelector<HTMLElement>('[data-thanks-title]');
  const again = thanks?.querySelector<HTMLButtonElement>('[data-again]');
  const send = form?.querySelector<HTMLButtonElement>('[data-send]');
  const choice = form?.querySelector<HTMLInputElement>('[data-field="choice"]');
  const summary = form?.querySelector<HTMLInputElement>('[data-choice-summary]');
  const status = form?.querySelector<HTMLElement>('[data-status]');
  if (!form || !thanks || !body || !title || !again || !send || !choice || !summary || !status)
    return null;
  return { form, thanks, body, title, again, send, choice, summary, status };
}

function choiceActions(
  { form, choice, summary }: Handles,
  words: EnquiryWords,
): Pick<FormView, 'chooseKind' | 'choosePlan' | 'syncWebsites'> {
  return {
    syncWebsites: () => {
      syncWebsites(form);
    },
    chooseKind: (kind) => {
      choice.value = kind;
      summary.value = words[kind];
      syncWebsites(form);
    },
    choosePlan: (label, name, period) => {
      choice.value = planValue(name, period);
      summary.value = label;
      syncWebsites(form);
    },
  };
}

function sendActions(
  { form, send, status }: Handles,
  words: EnquiryWords,
): Pick<FormView, 'clearProblems' | 'showProblems' | 'setStatus' | 'setSending'> {
  const sendLabel = send.textContent;
  return {
    clearProblems: () => {
      clearProblems(form);
      status.textContent = '';
    },
    showProblems: (fields) => {
      showProblems(form, words, fields);
    },
    setStatus: (message) => {
      status.textContent = message;
    },
    setSending: (sending) => {
      send.setAttribute('aria-disabled', String(sending));
      send.textContent = sending ? (send.dataset.sendingLabel ?? sendLabel) : sendLabel;
    },
  };
}

function thanksActions(
  { form, thanks, body, title }: Handles,
  words: EnquiryWords,
): Pick<FormView, 'showThanks' | 'showForm' | 'isThanksShown'> {
  return {
    showThanks: (email) => {
      const [before = '', after = ''] = words.thanksBody.split('{email}');
      const address = document.createElement('bdi');
      address.dir = 'ltr';
      address.textContent = email;
      body.replaceChildren(before, address, after);
      form.hidden = true;
      thanks.hidden = false;
      title.focus();
    },
    showForm: () => {
      for (const name of ['message', 'trap']) {
        const control = field(form, name);
        if (control) control.value = '';
      }
      syncWebsites(form);
      thanks.hidden = true;
      form.hidden = false;
    },
    isThanksShown: () => !thanks.hidden,
  };
}

export function createView(root: HTMLElement, words: EnquiryWords): FormView | null {
  const handles = handlesOf(root);
  if (!handles) return null;
  const { form, again } = handles;
  return {
    form,
    again,
    values: () => readValues(form),
    focusFirst: () => {
      field(form, 'name')?.focus();
    },
    ...choiceActions(handles, words),
    ...sendActions(handles, words),
    ...thanksActions(handles, words),
  };
}
