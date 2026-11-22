import type { Messages } from '../messages';
import { enBenefits, enSign, enVisit } from './en-sections';
import { enDashboard, enInstallation } from './en-how';
import { enVoice } from './en-voice';

export const en: Messages = {
  languageName: 'English',
  siteName: 'Wosoul',
  skipToContent: 'Skip to content',
  nav: {
    menu: 'Menu',
    features: 'Features',
    signLanguage: 'Sign language',
    installation: 'How it works',
    dashboard: 'Dashboard',
    liveDemo: 'Live demo',
    demo: 'Try Wosoul now',
    contact: 'Contact us',
    label: 'Main navigation',
  },
  meta: {
    title: 'Wosoul | Website accessibility widget with sign language',
    description:
      'Wosoul is a website accessibility widget: visitors adjust text, colors, sound, and navigation, and reach a sign language interpreter through MetaSign.',
  },
  hero: {
    title: 'With Wosoul\nyour website is closer to everyone',
    lede: 'Wosoul is a widget dedicated to digital accessibility. It makes websites and online services easier for everyone to use, including people with disabilities and older adults.',
  },
  preview: {
    textSize: 'Bigger text',
    textSizeHint: 'Next text size: {next}.',
    title: 'A page that feels right.',
    body: 'Bigger text and wider spacing for comfortable reading',
    label: 'Preview of Wosoul features: bigger text, read aloud, and a sign language call',
    voice: enVoice,
    signTitle: 'Live call',
    signBody: 'A sign language interpreter through MetaSign',
  },
  visit: enVisit,
  sign: enSign,
  benefits: enBenefits,
  installation: enInstallation,
  dashboard: enDashboard,
  final: {
    title: 'Your journey with Wosoul starts here',
    reply: 'The Wosoul team replies within one business day.',
    email: 'Email:',
    subject: 'Contact request about Wosoul',
  },
  footer: {
    about: 'Wosoul · The accessibility widget for websites, with sign language through MetaSign.',
    navLabel: 'Footer',
    badge: 'No tracking. No cookies.',
    note: "Wosoul is a preferences tool for visitors. It doesn't make a website compliant with any law or standard by itself.",
    byline: 'Wosoul by MetaSign',
    copyright: '© 2026 Wosoul',
  },
};
