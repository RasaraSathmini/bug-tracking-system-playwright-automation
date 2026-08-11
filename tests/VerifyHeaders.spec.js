import { test, expect } from '../fixtures/test-fixtures.js';

  test('navigate through headers after a valid login', async ({ loggedInPage }) => {

    await expect(loggedInPage).toHaveURL(/.*dashboard/);
    await expect(loggedInPage.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await loggedInPage.waitForTimeout(2000);

    await loggedInPage.getByRole('link', { name: /bugs/i }).click();
    await expect(loggedInPage).toHaveURL(/.*bugs/);
    await loggedInPage.waitForTimeout(2000);

    await loggedInPage.getByRole('link', { name: /users/i }).click();
    await expect(loggedInPage).toHaveURL(/.*users/);
    await loggedInPage.waitForTimeout(2000);

});