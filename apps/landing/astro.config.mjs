import { copyFileSync, createReadStream, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';

const SDK_DIST = new URL('../../packages/sdk/dist/', import.meta.url);
// Only the script: the source map holds the SDK's original source, so no site serves or ships it (spec 027).
const FILES = ['dap.js'];

function dapWidget() {
  return {
    name: 'dap-landing-widget',
    hooks: {
      'astro:server:setup': ({ server }) => {
        server.middlewares.use('/sdk/', (request, response, next) => {
          const name = (request.url ?? '').split('?')[0]?.replace(/^\//, '') ?? '';
          if (!FILES.includes(name)) return next();
          const file = new URL(name, SDK_DIST);
          if (!existsSync(file)) {
            response.statusCode = 503;
            response.end('Build @dap/sdk first.');
            return;
          }
          response.setHeader('Content-Type', 'text/javascript');
          response.setHeader('Cache-Control', 'no-store');
          createReadStream(file).pipe(response);
        });
      },
      'astro:build:done': ({ dir }) => {
        const outDir = new URL('sdk/', dir);
        mkdirSync(fileURLToPath(outDir), { recursive: true });
        for (const file of FILES) {
          const source = new URL(file, SDK_DIST);
          if (existsSync(source)) copyFileSync(source, new URL(file, outDir));
        }
      },
    },
  };
}

export default defineConfig({
  integrations: [dapWidget()],
  vite: {
    server: {
      proxy: {
        '/api/public/plans': 'http://localhost:5080',
        '/api/public/enquiries': 'http://localhost:5080',
        '/widget/v1/config': {
          target: 'http://localhost:5080',
          headers: { origin: 'http://localhost:5173' },
        },
        '/widget/v1/videos': 'http://localhost:5080',
      },
    },
    ssr: { noExternal: ['@dap/design-tokens'] },
  },
});
