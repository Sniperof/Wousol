import { defineConfig } from '@hey-api/openapi-ts';
export default defineConfig({
  input: '../backend/openapi/Dap.Api.json',
  output: { path: 'src/api/generated' },
  plugins: ['@hey-api/typescript'],
});
