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

  test('Create a new user', async ({ page }) => {
    test.setTimeout(60000);
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await page.waitForTimeout(2000);
    
    await page.getByRole('link', { name: 'Users', exact: true }).click();
    await expect(page).toHaveURL(/.*users/);
    await page.waitForTimeout(2000);
    
    // Click the new user icon to ensure the "Create User" page is accessible
    await page.getByRole('link', { name: /\+/i }).click();
    await expect(page).toHaveURL(/.*users\/create/);
    await expect(page.getByRole('heading', { name: 'Create User' })).toBeVisible();
    await page.waitForTimeout(2000);

    console.log('✓ Navigated create user page successfully');
    await page.waitForTimeout(2000);

    // Fill in the user creation form
    await page.getByLabel('Username').fill('Sample User');
    await page.getByLabel('Email').fill('sampleuser@example.com');
    await page.getByLabel('Password').fill('Password123!');
    await page.getByLabel('Role').selectOption('Developer');
    await page.getByRole('button', { name: 'Create User' }).click();

    console.log('✓ New user added successfully');
    await page.waitForTimeout(2000);

    // Verify that the user was created successfully by checking the table
    await page.getByRole('link', { name: 'Users', exact: true }).click();
    await expect(page).toHaveURL(/.*users/);

    console.log('✓ Moved to user table successfully');
    await page.waitForTimeout(2000);
    
    // Find the user row and verify all values are present
    const userRow = page.locator('table tbody tr', { has: page.getByText('Sample User') });
    await userRow.waitFor({ state: 'visible' });
    
    // Verify all user details in specific table columns
    const cells = userRow.locator('td');
    
    // Verify Username (column 1)
    await expect(cells.nth(0)).toContainText('Sample User');
    
    // Verify Email (column 2)
    await expect(cells.nth(1)).toContainText('sampleuser@example.com');
    
    // Verify Role (column 3)
    await expect(cells.nth(2)).toContainText('developer');
    
    // Verify Status (column 4)
    await expect(cells.nth(3)).toContainText('Active');
    
    console.log('✓ User created successfully with all values verified in table');
    await page.waitForTimeout(2000);
    
    // Navigate to the edit user page by clicking Edit button in the row
    // Find the Edit button in the user row (it's in column 6)
    const editButton = userRow.locator('a, button').filter({ hasText: /edit/i }).first();
    await editButton.waitFor({ state: 'visible' });
    await editButton.scrollIntoViewIfNeeded();
    await editButton.click();

    console.log('✓ Clicked edit button successfully');
    await page.waitForTimeout(2000);
    
    // Verify we're on the edit user page
    await expect(page).toHaveURL(/.*users\/\d+\/edit/);
    await expect(page.getByRole('heading', { name: 'Edit User' })).toBeVisible();
    await page.waitForTimeout(2000);

    //Edit the user details
    await page.getByLabel('Username').fill('Updated Sample User');
    await page.getByRole('button', { name: 'Update User' }).click();
    await page.waitForTimeout(2000);

    console.log('✓ Updated the user successfully');
    await page.waitForTimeout(2000);

    // Verify that the user was updated successfully by checking the table
    await page.getByRole('link', { name: 'Users', exact: true }).click();
    await expect(page).toHaveURL(/.*users/);
    await page.waitForTimeout(2000);

    // Find the updated user row and verify all values are present
    const updatedUserRow = page.locator('table tbody tr', { has: page.getByText('Updated Sample User') });
    await updatedUserRow.waitFor({ state: 'visible' });

    console.log('✓ Verified the updated user details successfully');
    await page.waitForTimeout(2000);

    // Clean up: Delete the created user to maintain test isolation
    // Navigate back to users list if needed
    await page.getByRole('link', { name: 'Users', exact: true }).click();
    await expect(page).toHaveURL(/.*users/);
    await page.waitForTimeout(2000);

    // Find the updated user row
    const deleteUserRow = page.locator('table tbody tr', { has: page.getByText('Updated Sample User') });
    await deleteUserRow.waitFor({ state: 'visible' });
    await deleteUserRow.scrollIntoViewIfNeeded();
    
    // Handle any confirmation dialog before clicking delete
    page.once('dialog', dialog => {
      console.log(`Dialog type: ${dialog.type()}`);
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept(); // Click OK on the confirmation
    });

    // Click the delete button on the updated user row
    const deleteButton = deleteUserRow.locator('a, button').filter({ hasText: /delete/i }).first();
    await deleteButton.waitFor({ state: 'visible' });
    await deleteButton.click();

    // Wait for the deleted user row to disappear from the table
    await deleteUserRow.waitFor({ state: 'hidden' });

    console.log('✓ User deleted successfully');
    await page.waitForTimeout(2000);
 
  });

});