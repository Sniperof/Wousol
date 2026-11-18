import type { EnquiryWords } from '../i18n/enquiry';
import { FIELD_ORDER, type FieldName } from './field-problems';
import type { FormValues } from './payload';

export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export function field(form: HTMLFormElement, name: string): FieldElement | null {
  if (name === 'choice') return form.querySelector<HTMLInputElement>('[data-choice-summary]');
  return form.querySelector<FieldElement>(`[data-field="${name}"]`);
}

export function problem(form: HTMLFormElement, name: string): HTMLElement | null {
  return form.querySelector<HTMLElement>(`[data-problem="${name}"]`);
}

export function text(form: HTMLFormElement, name: string): string {
  return form.querySelector<FieldElement>(`[data-field="${name}"]`)?.value ?? '';
}

export function readValues(form: HTMLFormElement): FormValues {
  return {
    choice: text(form, 'choice'),
    websites: text(form, 'websites'),
    name: text(form, 'name'),
    email: text(form, 'email'),
    organization: text(form, 'organization'),
    country: text(form, 'country'),
    phone: text(form, 'phone'),
    website: text(form, 'website'),
    message: text(form, 'message'),
    trap: text(form, 'trap'),
  };
}

export function clearProblems(form: HTMLFormElement): void {
  for (const name of FIELD_ORDER) {
    field(form, name)?.removeAttribute('aria-invalid');
    field(form, name)?.removeAttribute('aria-describedby');
    const note = problem(form, name);
    if (note) {
      note.textContent = '';
      note.hidden = true;
    }
  }
}

/** Marks each field, ties its words to it, and moves focus to the first, which is the first a reader meets. */
export function showProblems(
  form: HTMLFormElement,
  words: EnquiryWords,
  fields: readonly FieldName[],
): void {
  for (const name of fields) {
    const control = field(form, name);
    const note = problem(form, name);
    if (!control || !note) continue;
    note.textContent = words.problems[name];
    note.hidden = false;
    control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', note.id);
  }
  const [first] = fields;
  if (first) field(form, first)?.focus();
}

export function syncWebsites(form: HTMLFormElement): void {
  const wrapper = form.querySelector<HTMLElement>('[data-websites-field]');
  const custom = text(form, 'choice') === 'custom';
  if (wrapper) wrapper.hidden = !custom;
  field(form, 'websites')?.toggleAttribute('required', custom);
}
