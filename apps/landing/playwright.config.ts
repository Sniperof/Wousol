import { defineConfig, devices } from '@playwright/test';

const PORT = 4322;

/** End-to-end tests against `astro preview` of the built site (run `npm run test:e2e` at the root). */
export default defineConfig({
  testDir: 'e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL: `http://localhost:${String(PORT)}`, trace: 'retain-on-failure' },
  webServer: {
    // Under a coding agent, Astro backgrounds `preview` and exits, which Playwright reads as a crash.
    // `--ignore-lock` keeps it a foreground server that Playwright owns and stops.
    command: `npx astro preview --port ${String(PORT)} --ignore-lock`,
    url: `http://localhost:${String(PORT)}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
