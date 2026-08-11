import { test, expect } from '../fixtures/test-fixtures.js';

  test('navigate through headers after a valid login', async ({ page }) => {

    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await page.waitForTimeout(2000);
    
    await page.getByRole('link', { name: /bugs/i }).click();
    await expect(page).toHaveURL(/.*bugs/);
    await page.waitForTimeout(2000);
    
    await page.getByRole('link', { name: /users/i }).click();
    await expect(page).toHaveURL(/.*users/);
    await page.waitForTimeout(2000);

});