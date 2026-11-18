import type { EnquiryWords } from '../i18n/enquiry';

export interface TextField {
  readonly name: 'name' | 'email' | 'organization' | 'phone' | 'website';
  readonly label: string;
  readonly type: 'text' | 'email' | 'tel' | 'url';
  readonly autocomplete: string;
  readonly dir: 'auto' | 'ltr';
  readonly required: boolean;
}

/** Who is asking: the fields before the country. Email reads left to right. */
export function identityFields(words: EnquiryWords): readonly TextField[] {
  return [
    {
      name: 'name',
      label: words.name,
      type: 'text',
      autocomplete: 'name',
      dir: 'auto',
      required: true,
    },
    {
      name: 'email',
      label: words.email,
      type: 'email',
      autocomplete: 'email',
      dir: 'ltr',
      required: true,
    },
    {
      name: 'organization',
      label: words.organization,
      type: 'text',
      autocomplete: 'organization',
      dir: 'auto',
      required: true,
    },
  ];
}

/** How to reach them: the fields after the country. Phone and URL read left to right. */
export function reachFields(words: EnquiryWords): readonly TextField[] {
  return [
    {
      name: 'phone',
      label: words.phone,
      type: 'tel',
      autocomplete: 'tel',
      dir: 'ltr',
      required: false,
    },
    {
      name: 'website',
      label: words.website,
      type: 'url',
      autocomplete: 'url',
      dir: 'ltr',
      required: true,
    },
  ];
}
