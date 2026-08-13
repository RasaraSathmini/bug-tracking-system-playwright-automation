import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { ChangePasswordPage } from '../pages/ChangePasswordPage.js';

export const test = base.extend({

  // login fixture that logs in before each test
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'admin@example.com',
      'password123'
    );

    await use(page);
  },

  // changePassword fixture that changes the password
  changePasswordPage: async ({ page }, use) => {
    const changePasswordPage = new ChangePasswordPage(page);

    await use(changePasswordPage);
}

});

export { expect };