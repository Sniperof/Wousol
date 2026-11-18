import type { Messages } from '../messages';
import { enSolutions } from './en-solutions';
import { enVoice } from './en-voice';

export const en: Messages = {
  languageName: 'English',
  siteName: 'Wosoul',
  skipToContent: 'Skip to content',
  nav: {
    menu: 'Menu',
    features: 'Features',
    installation: 'How it works',
    demo: 'Try live demo',
    requestDemo: 'Request a demo',
    signLanguage: 'Sign language',
    label: 'Main navigation',
  },
  preview: {
    textSizeHint: 'Next text size: {next}.',
    title: 'A page that feels right.',
    body: 'A clearer view. A calmer place to read.',
    label: 'Interactive reading preferences preview',
    voice: enVoice,
    signTitle: 'Sign-language support',
    signBody: 'Live interpreter support via MetaSign.',
  },
  solutions: enSolutions,
  installation: {
    title: 'One script. A better reading experience.',
    intro:
      'Add Wosoul to your website and let visitors choose the reading experience that suits them.',
    steps: [
      {
        title: 'Add the script',
        body: 'Add the supplied script to your website, with its SDK URL and site key.',
      },
      {
        title: 'Let visitors decide',
        body: 'Visitors choose their preferences and can reset them at any time.',
      },
    ],
    snippet: '<script\n  src="…/dap.js"\n  data-site-key="dap_…"\n  defer\n></script>',
    caption:
      'Example only. Replace the SDK URL and site key with the values supplied for your website.',
    previewLabel: 'Installation walkthrough preview',
    preferencesTitle: 'Reading preferences',
  },
  privacy: {
    title: 'Their preferences. Their choice.',
    body: 'Wosoul changes how a page looks and reads at the visitor’s request. It does not rewrite the site’s semantics or replace accessible design.',
    points: [
      'No tracking or cookies',
      'Network requests check the site licence and count anonymous usage.',
      'Preferences stay in this browser',
    ],
  },
  final: {
    contact: 'Contact us',
    title: 'Find the right fit for your website.',
    body: 'Walk through Wosoul with our team. Explore the widget, expert services, or a setup shaped around your websites.',
    subject: 'Wosoul guided demo request',
  },
  meta: {
    title: 'Wosoul — accessibility preferences for any website',
    description:
      'Wosoul lets visitors adjust any website to the way they read, added with one script tag.',
  },
  hero: {
    title: 'Your website\nTheir way',
    lede: 'Give every visitor a more comfortable way to read. Text, contrast and focus, adapted to their needs. All with one script.',
  },
  features: {
    intro: 'Support for clearer communication, easier reading, and more comfortable browsing.',
    title: 'What visitors get',
    groups: [
      {
        title: 'Sign-language support',
        body: 'Connect with a live sign-language interpreter through MetaSign, a separate service for clearer communication and more comfortable conversations.',
      },
      {
        title: 'Read aloud',
        body: 'Listen to page content with read-aloud controls and follow along without having to read every word on screen.',
      },
      {
        title: 'Reading that fits you',
        body: 'Adjust text size, spacing, and readable fonts, or choose a ready-made comfort profile for a more personal experience.',
      },
      {
        title: 'Focus and contrast',
        body: 'Adjust contrast, highlight focus, enlarge the cursor, follow a reading guide, or pause motion for more comfortable browsing.',
      },
    ],
  },
  footer: {
    byline: 'Wosoul by MetaSign',
    navLabel: 'Footer',
    note: 'Wosoul is a preference tool for visitors. It does not claim to make a site compliant with any law or standard.',
  },
};
