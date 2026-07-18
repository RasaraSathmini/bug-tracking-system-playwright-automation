import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

const VALID_EMAIL = 'admin@example.com';
const VALID_PASSWORD = 'password123';

test.describe('Login', () => {
  test('login form renders as expected', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await expect(loginPage.heading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.rememberMeCheckbox).not.toBeChecked();
    await expect(loginPage.submitButton).toBeVisible();
  });

  test('shows the dashboard after a valid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

});