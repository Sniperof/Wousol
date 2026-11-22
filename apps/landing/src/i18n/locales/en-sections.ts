import type { Messages } from '../messages';

export const enVisit: Messages['visit'] = {
  title: 'No visit is complete without the right access',
  cards: [
    {
      title: 'Bigger, clearer text',
      body: 'Text gets bigger, lines and words get more room, and the font gets clearer.',
      helps: 'For people with low vision or dyslexia, and anyone whose eyes tire quickly.',
    },
    {
      title: 'Color and contrast, as needed',
      body: 'Contrast changes, colors soften or deepen, and images hide or show their descriptions.',
      helps: 'For people with low vision, color blindness, or light sensitivity.',
    },
    {
      title: 'A page read aloud',
      body: "Selected text is read in the device's voice, at a comfortable speed.",
      helps:
        "For people with dyslexia, anyone tired by long reading, and those who'd rather listen.",
    },
    {
      title: 'Easier navigation, calmer focus',
      body: 'Links, headings, and keyboard focus stand out. The cursor gets bigger, motion stops, and a page outline lets visitors jump to any section.',
      helps:
        'For keyboard users, people who get distracted easily, and anyone bothered by motion on screen.',
    },
    {
      title: 'Sign language',
      body: 'A call with a sign language interpreter through MetaSign, plus videos that explain the page in sign language.',
      helps: 'For Deaf and hard of hearing visitors and sign language users.',
    },
  ],
};

export const enSign: Messages['sign'] = {
  title: 'Sign language, built into your website',
  live: 'Live',
  intro:
    "For many Deaf people, sign language is their first language, and written text doesn't always replace it. So Wosoul adds two ways to communicate in sign language, through MetaSign.",
  cards: [
    {
      title: 'A call with an interpreter',
      body: 'A Deaf visitor presses a button in the Wosoul menu, and a video call with a sign language interpreter opens in a new tab.',
    },
    {
      title: 'Sign language videos',
      body: 'A video explains the page in sign language and jumps to the section it covers.',
    },
  ],
};

export const enBenefits: Messages['benefits'] = {
  title: 'Bigger opportunities start with accessibility',
  stat: '1.3 billion',
  statCaption: 'One in six people worldwide lives with a disability',
  cards: [
    {
      title: 'More visitors finish what they came for',
      body: 'About 1.3 billion people worldwide live with a disability, one in six people. When a website works for them, they stay and finish what they came for.',
    },
    {
      title: 'Easier for everyone',
      body: 'What helps people with disabilities helps others too: older adults, and anyone browsing in sunlight, on a small screen, or with tired eyes.',
    },
    {
      title: 'A step toward the standard',
      body: 'The path to WCAG 2.2 starts with options for visitors and ends with a website built to the standard. The Wosoul team works with you on both.',
    },
    {
      title: 'A commitment visitors notice',
      body: 'Accessibility is part of digital social responsibility, and your website reflects it on every page.',
    },
  ],
  source: 'Source: World Health Organization, 2023',
};
