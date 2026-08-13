import { test, expect } from '../fixtures/test-fixtures.js';
import { LoginPage } from '../pages/LoginPage.js';

const VALID_EMAIL = 'tester@example.com';
const VALID_PASSWORD = 'password123';
const NEW_PASSWORD = 'NewPassword123!';

test.describe('Change Password', () => {
    
  test('change password and verify login with new password', async ({ 
    page, 
    changePasswordPage 
}) => {

    const loginPage = new LoginPage(page);

    // Step 1: Log in with existing credentials
    await loginPage.goto();
    await loginPage.login(VALID_EMAIL, VALID_PASSWORD);

    await expect(page).toHaveURL(/.*dashboard/);

    console.log('Logged in successfully with existing credentials');

    // Step 2: Navigate to Change Password page
    await changePasswordPage.openChangePassword();

    console.log('Navigated to Change Password page');

    // Step 3: Change the password
    await changePasswordPage.changePassword(VALID_PASSWORD, NEW_PASSWORD);

    console.log('Password changed successfully');
    await page.waitForTimeout(2000);

    // Step 4: Verify success message
    await changePasswordPage.verifySuccessMessage();
    
    console.log('Success message verified: Password changed successfully');
    await page.waitForTimeout(2000);

    // Step 5: Log out
    await changePasswordPage.logout();

    console.log('Logged out successfully');
    await page.waitForTimeout(2000);

    // Step 6: Attempt to log in with the new password
    await loginPage.login(VALID_EMAIL, NEW_PASSWORD);
    await expect(page).toHaveURL(/.*dashboard/);

    console.log('Logged in successfully with new password');
    await page.waitForTimeout(2000);

    // Step 7: Navigate back to Change Password page to reset the password
    await changePasswordPage.openChangePassword();

    console.log('Navigated to Change Password page to reset the password');

    // Step 8: Change the password back to the original
    await changePasswordPage.changePassword(NEW_PASSWORD, VALID_PASSWORD);

    console.log('Password reset successfully');
    await page.waitForTimeout(2000);

    // Step 9: Verify success message
    await changePasswordPage.verifySuccessMessage();

    console.log('Success message verified: Password reset successfully');

     });

});
