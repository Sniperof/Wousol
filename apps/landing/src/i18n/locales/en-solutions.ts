import type { Messages } from '../messages';

export const enSolutions: Messages['solutions'] = {
  title: 'Solutions that fit your website.',
  intro: 'Start with the widget, scale across your sites, and add expert support when you need it.',
  illustrations: {
    widget: 'Visitor preferences',
    services: 'Site & usage insights',
    tailored: 'Expert code review',
  },
  cards: [
    {
      kind: 'widget',
      title: 'Visitor widget controls',
      body: 'Give every visitor instant options for clearer reading, contrast, voice, and navigation.',
      action: 'Try live demo',
    },
    {
      kind: 'services',
      title: 'Plans and site insights',
      body: 'Manage widget rollout across your websites and track plan coverage from one dashboard.',
      action: 'Explore pricing',
    },
    {
      kind: 'tailored',
      title: 'Expert audit and support',
      body: 'Work with our team to review your code, fix barriers, and shape a plan around your goals.',
      action: 'Talk to us',
    },
  ],
};
