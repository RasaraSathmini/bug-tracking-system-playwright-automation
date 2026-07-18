import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // fail CI if a test.only was left in
  retries: process.env.CI ? 2 : 0, // retry flaky tests in CI, not locally
  workers: process.env.CI ? 4 : undefined,
  reporter: [['html'], ['list']],

  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:5000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Add these once the core suite is stable, if you need cross-browser coverage:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],

  // Uncomment once you have a reliable local start command for the app.
  // Playwright will boot it before tests and reuse it locally between runs.
  // webServer: {
  //   command: 'npm run dev', // <-- replace with your app's actual start command
  //   url: 'http://localhost:5000',
  //   reuseExistingServer: !process.env.CI,
  // },
});