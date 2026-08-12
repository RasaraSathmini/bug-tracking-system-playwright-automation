import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { log } from 'node:console';

const VALID_EMAIL = 'rasara@example.com';
const VALID_PASSWORD = 'Test@123';
const NEW_PASSWORD = 'NewPassword123!';
const USERNAME = 'Rasara';

test.describe('Change Password', () => {

  test('change password and verify login with new password', async ({ page }) => {

    // Login with existing credentials
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await expect(page).toHaveURL(/.*dashboard/);
    await page.waitForTimeout(2000);

    console.log('Logged in successfully with existing credentials');
    await page.waitForTimeout(2000);

    // Navigate to Change Password page
    await page.locator('button.dropdown-btn').click();
    await page.getByRole('link', {
        name: 'Change Password'
        }).click();

    await expect(page).toHaveURL(/.*change-password/);
    await page.waitForTimeout(2000);

    console.log('Navigated to Change Password page');
    await page.waitForTimeout(2000);

    // Change password
    await page.getByLabel('Current Password:', { exact: false }).fill(VALID_PASSWORD);
    await page.getByLabel('New Password:', { exact: false }).fill(NEW_PASSWORD);
    await page.getByLabel('Confirm Password:', { exact: false }).fill(NEW_PASSWORD);
    await page.getByRole('button', { name: 'Change Password' }).click();

    console.log('Password changed');
    await page.waitForTimeout(2000);

    // Verify password change success message   
    await expect(
        page.locator('.alert.alert-success')
        ).toHaveText(/Password changed successfully\./);

    console.log('Password change success message verified');
    await page.waitForTimeout(2000);

    // Logout
    await page.locator('button.dropdown-btn').click();
        await page.getByRole('link', {
            name: 'Logout'
            }).click();

    await expect(page).toHaveURL(/.*login/);
    await page.waitForTimeout(2000);

    console.log('Logged out successfully');
    await page.waitForTimeout(2000);

    // Login with new password
    await loginPage.login(VALID_EMAIL, NEW_PASSWORD);
    await expect(page).toHaveURL(/.*dashboard/);

    console.log('Logged in successfully with new password');
    await page.waitForTimeout(2000);

    // Revert password back to original for future tests
    await page.locator('button.dropdown-btn').click();
    await page.getByRole('link', { name: 'Change Password' }).click();
    await expect(page).toHaveURL(/.*change-password/);
    await page.waitForTimeout(2000);

    await page.getByLabel('Current Password:', { exact: false }).fill(NEW_PASSWORD);
    await page.getByLabel('New Password:', { exact: false }).fill(VALID_PASSWORD);
    await page.getByLabel('Confirm Password:', { exact: false }).fill(VALID_PASSWORD);
    await page.getByRole('button', { name: 'Change Password' }).click();

    console.log('Password reverted back to original');
    await page.waitForTimeout(2000);

    // Verify password revert success message
    await expect(
        page.locator('.alert.alert-success')
        ).toHaveText(/Password changed successfully\./);
    await page.waitForTimeout(2000);
    
    console.log('Password revert success message verified');

  });
})

