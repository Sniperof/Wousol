// Designer handoff only: runs the landing with no backend. `npm run dev` at the package root uses this file.
// It keeps everything in astro.config.mjs except the proxy to the backend, and answers the three backend routes
// the landing calls with sample data. Not part of the main repository; never merge it back.
import base from './astro.config.mjs';

/** True shows "Price on request" on every plan, as the live site does. False shows the sample prices. */
const PRICES_HIDDEN = true;

const FEATURES = [
  'text-size',
  'line-height',
  'text-spacing',
  'bold-text',
  'readable-font',
  'text-align',
  'highlight-links',
  'highlight-headings',
  'hide-images',
  'image-descriptions',
  'read-aloud',
  'contrast',
  'saturation',
  'focus-highlight',
  'big-cursor',
  'reading-guide',
  'pause-animations',
  'page-structure',
  'sign-videos',
  'sign-language',
];

/**
 * Sample sign-language videos, as plain text. On the real platform each row comes from the customer's account: a title,
 * the id of its video file, the page it belongs to (matched by path), and the id of the section it explains (null for
 * the whole page). There are no video files here, so pressing play shows the widget's own error message.
 */
const SIGN_VIDEOS = [
  {
    title: 'Welcome to Wosoul',
    file: '10000000-0000-4000-8000-000000000001',
    page: '/en/',
    section: null,
  },
  {
    title: 'Choose the plan that fits',
    file: '10000000-0000-4000-8000-000000000002',
    page: '/en/',
    section: 'pricing',
  },
  {
    title: 'Install it with one script tag',
    file: '10000000-0000-4000-8000-000000000003',
    page: '/en/',
    section: 'installation',
  },
  {
    title: 'مرحبًا بك في وصول',
    file: '10000000-0000-4000-8000-000000000004',
    page: '/ar/',
    section: null,
  },
  {
    title: 'اختر الباقة المناسبة',
    file: '10000000-0000-4000-8000-000000000005',
    page: '/ar/',
    section: 'pricing',
  },
  {
    title: 'ثبّته بسطر واحد',
    file: '10000000-0000-4000-8000-000000000006',
    page: '/ar/',
    section: 'installation',
  },
];

/** Prices are whole minor units (4900 is 49.00). */
function plan(name, siteLimit, monthly, yearly, isFeatured) {
  return {
    name,
    siteLimit,
    features: FEATURES,
    monthlyPrice: PRICES_HIDDEN ? null : monthly,
    yearlyPrice: PRICES_HIDDEN ? null : yearly,
    currency: 'SAR',
    isFeatured,
    priceHidden: PRICES_HIDDEN,
  };
}

const CATALOG = {
  plans: [plan('Starter', 1, 4900, 49000, false), plan('Business', 3, 12900, 129000, true)],
  custom: {
    titleEn: '',
    titleAr: '',
    descriptionEn: '',
    descriptionAr: '',
    salesEmail: 'sales@example.com',
  },
};

function send(response, status, body) {
  response.statusCode = status;
  response.setHeader('Cache-Control', 'no-store');
  if (body === undefined) {
    response.end();
    return;
  }
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

/** Calls `answer` once the request body has been read and thrown away; any other method falls through. */
function route(server, path, method, answer) {
  server.middlewares.use(path, (request, response, next) => {
    if (request.method !== method) {
      next();
      return;
    }
    request.on('end', () => {
      answer(response);
    });
    request.resume();
  });
}

function sampleApi() {
  return {
    name: 'designer-sample-api',
    hooks: {
      'astro:server:setup': ({ server }) => {
        route(server, '/api/public/plans', 'GET', (response) => {
          send(response, 200, CATALOG);
        });
        route(server, '/api/public/enquiries', 'POST', (response) => {
          send(response, 202);
        });
        route(server, '/widget/v1/config', 'POST', (response) => {
          send(response, 200, { enabled: true, features: FEATURES, signVideos: SIGN_VIDEOS });
        });
        route(server, '/widget/v1/videos', 'GET', (response) => {
          send(response, 404);
        });
      },
    },
  };
}

export default {
  ...base,
  integrations: [...(base.integrations ?? []), sampleApi()],
  vite: { ...base.vite, server: {} },
};
