import type { Messages } from '../messages';

export const enVisit: Messages['visit'] = {
  title: 'No visit is complete without the right access',
  intro:
    "Opening a page isn't the end of the road. A visitor opens the Wosoul menu and turns on what they need. The page changes right away, and goes back to how it was when they turn it off.",
  cards: [
    {
      title: 'Bigger, clearer text',
      body: 'Visitors make text bigger, widen the space between lines and words, and switch to a clearer font.',
      helps: 'Helps with low vision, dyslexia, and eye strain.',
    },
    {
      title: 'Color and contrast, as needed',
      body: 'Visitors change the contrast, turn colors down or up, and hide images or show their descriptions.',
      helps: 'Helps with low vision, color blindness, and light sensitivity.',
    },
    {
      title: 'A page read aloud',
      body: 'Visitors select text and the device reads it out, at the speed that suits them.',
      helps: "Helps with dyslexia, reading fatigue, and anyone who'd rather listen.",
    },
    {
      title: 'Easier navigation, calmer focus',
      body: 'Links, headings, and keyboard focus stand out. The cursor gets bigger, motion stops, and a page outline lets visitors jump to any section.',
      helps: 'Helps keyboard users, and with attention difficulties and motion sensitivity.',
    },
    {
      title: 'Sign language',
      body: 'A call with a sign language interpreter through MetaSign, plus videos that explain the page in sign language.',
      helps: 'For Deaf and hard of hearing visitors and sign language users.',
    },
  ],
  signLink: 'More about sign language',
};

export const enSign: Messages['sign'] = {
  title: 'Sign language, built into your website',
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
  note: "Calls are free for Deaf and hard of hearing visitors and available during working hours. They're provided by MetaSign and paid for by the site owner as part of the plan.",
};

export const enBenefits: Messages['benefits'] = {
  title: 'Bigger opportunities start with accessibility',
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
