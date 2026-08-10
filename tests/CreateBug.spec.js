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

  test('Create a new bug', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await page.waitForTimeout(2000);
    
    await page.getByRole('link', { name: 'Bugs', exact: true }).click();
    await expect(page).toHaveURL(/.*bugs/);
    await page.waitForTimeout(2000);
    
    // Click the new bug icon to ensure the "Create Bug" page is accessible
    await page.getByRole('link', { name: /\+/i }).click();
    await expect(page).toHaveURL(/.*bugs\/create/);
    await expect(page.getByRole('heading', { name: 'Create Bug' })).toBeVisible();
    await page.waitForTimeout(2000);

    // Fill in the bug creation form
    await page.getByLabel('Title').fill('Sample Bug Title1');
    await page.getByLabel('Description').fill('This is a sample bug description for testing purposes.');
    await page.getByLabel('Priority').selectOption('High');
    await page.getByRole('button', { name: 'Create Bug' }).click();

    await page.waitForTimeout(2000);

    // Verify that the bug was created successfully
    await page.getByRole('link', { name: 'Bugs', exact: true }).click();
    await expect(page).toHaveURL(/.*bugs/);
    await expect(page.getByText('Sample Bug Title1')).toBeVisible();
    await page.waitForTimeout(2000);

    // view the details of the created bug
    await page.getByRole('link', { name: 'Sample Bug Title1' }).click();
    await expect(page).toHaveURL(/.*bugs\/\d+/);
    await page.waitForTimeout(2000);

    // Clean up: Delete the created bug to maintain test isolation
    // Handle any confirmation dialog
    page.once('dialog', dialog => {
      console.log(`Dialog type ${dialog.type()}`);
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept(); // Click OK on the confirmation
    });

    await page.getByRole('button', { name: 'Delete' }).click();
    await page.waitForTimeout(2000);
    
    // Wait for the page to redirect back to bugs list after deletion
    await page.waitForURL(/.*bugs/);
    await page.waitForTimeout(1000);
    
    // Verify the bug was deleted
    await expect(page.getByText('Sample Bug Title1')).not.toBeVisible();
    
  });

});