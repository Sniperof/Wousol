import type { Locale } from '../i18n';
import type { EnquiryWords } from '../i18n/enquiry';
import { sendEnquiry, type Outcome } from './api';
import { parseChoice } from './choices';
import type { FormView } from './form-view';
import { newKey } from './key';
import { marketOf } from './markets';
import { buildRequest, problemsIn } from './payload';

export interface SubmitFlow {
  readonly submit: () => Promise<void>;
  readonly startAgain: () => void;
  readonly changeContext: () => void;
  readonly isSending: () => boolean;
}

/** What the visitor sees for each way a send can end. A refusal that names no field is shown as a failure. */
function finish(view: FormView, words: EnquiryWords, outcome: Outcome, email: string): void {
  if (outcome.kind === 'sent') view.showThanks(email);
  else if (outcome.kind === 'busy') view.setStatus(words.busy);
  else if (outcome.kind === 'refused' && outcome.fields.length > 0)
    view.showProblems(outcome.fields);
  else view.setStatus(words.failed);
}

/**
 * The key is kept on the form itself, not in the flow, so a page restored from the back/forward cache (which builds a
 * new flow around the same form) keeps sending the key the visitor's earlier tries used.
 */
function keyOf(form: HTMLFormElement): string {
  const key = form.dataset.requestKey ?? newKey();
  form.dataset.requestKey = key;
  return key;
}

/**
 * Sending, and starting over. One key belongs to one form: a retry after a failure sends the same key, so the server
 * stores one request however many times it arrives, and only starting over (a new request) makes a new key.
 */
export function createSubmitFlow(view: FormView, words: EnquiryWords, locale: Locale): SubmitFlow {
  const isSending = (): boolean => view.form.dataset.requestSending === 'true';
  const changeContext = (): void => {
    view.form.dataset.requestKey = newKey();
    view.clearProblems();
  };

  return {
    isSending,
    changeContext,
    startAgain: () => {
      if (isSending()) return;
      changeContext();
      view.showForm();
      view.focusFirst();
    },
    submit: async () => {
      if (isSending()) return;
      view.clearProblems();
      const values = view.values();
      const choice = parseChoice(values.choice);
      const country = marketOf(values.country);
      const problems = problemsIn(values, choice);
      if (choice === null || country === null || problems.length > 0) {
        view.showProblems(problems);
        return;
      }
      view.form.dataset.requestSending = 'true';
      view.setSending(true);
      const outcome = await sendEnquiry(
        buildRequest(values, choice, country, keyOf(view.form), locale),
      );
      view.form.dataset.requestSending = 'false';
      view.setSending(false);
      finish(view, words, outcome, values.email.trim());
    },
  };
}
