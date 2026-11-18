import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

/** The main repository's general rules, without its SDK and admin layer rules (those folders are not in this package). */
export default defineConfig([
  globalIgnores([
    '**/dist/',
    '**/node_modules/',
    '**/playwright-report/',
    '**/test-results/',
    '**/.astro/',
    'packages/sdk/',
    'packages/config-schema/',
    'apps/landing/src/api/generated/',
  ]),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, tseslint.configs.strictTypeChecked],
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      'no-console': 'error',
      'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }],
      'max-lines-per-function': ['error', { max: 50, skipBlankLines: true, skipComments: true }],
      'max-depth': ['error', 3],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
  },
  {
    files: ['**/*.{js,mjs}'],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['**/scripts/**'],
    rules: { 'no-console': 'off' },
  },
]);
