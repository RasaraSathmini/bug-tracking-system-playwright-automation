import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

export const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'admin@example.com',
      'password123'
    );

    await use(page);
  },
});

export { expect };