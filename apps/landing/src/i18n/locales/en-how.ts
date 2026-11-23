import type { Messages } from '../messages';

export const enInstallation: Messages['installation'] = {
  title: 'From request to access',
  intro:
    "Your website stays as designed. Wosoul works on top of it and puts the page back when it's turned off.",
  request: {
    title: 'Send a request',
    body: 'Send a request and the Wosoul team gets in touch within one business day.',
  },
  steps: [
    {
      title: 'Add the line of code',
      body: 'The team sends your site key and dashboard access. Add the line, with your key, to your pages.',
    },
    {
      title: 'Then visitors choose',
      body: 'The Wosoul button appears on the page. Visitors open the Wosoul menu, turn on what they need, and reset whenever they like.',
    },
  ],
  snippet: '<script\n  src="…/dap.js"\n  data-site-key="dap_…"\n  defer\n></script>',
  caption: 'Example only. Your actual line arrives with your site key from the Wosoul team.',
  previewLabel: 'Installation walkthrough preview',
  preferencesTitle: 'Reading preferences',
};

export const enDashboard: Messages['dashboard'] = {
  title: 'Access to every detail, from one dashboard',
  intro:
    'Everything about Wosoul in one place. Your access arrives with your site key from the Wosoul team.',
  cards: [
    {
      title: 'Plan and websites',
      body: 'Track your plan, the websites it covers, its features, and its renewal date.',
    },
    {
      title: 'Usage',
      body: 'How often Wosoul is used and which features are used most, without identifying any visitor.',
    },
    {
      title: 'Sign language',
      body: 'Add sign language videos to your pages and manage interpreter calls.',
    },
  ],
};
