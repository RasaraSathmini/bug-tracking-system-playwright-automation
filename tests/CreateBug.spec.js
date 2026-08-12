import { test, expect } from '../fixtures/test-fixtures.js';
import { BugPage } from '../pages/BugPage.js';

test.describe('Create Bug', () => {

  test('Create a new bug', async ({ loggedInPage }) => {

    const bugPage = new BugPage(loggedInPage);

    // Verify login
    await expect(loggedInPage).toHaveURL(/.*dashboard/);

    await expect(
      loggedInPage.getByRole('heading', {
        name: 'Dashboard'
      })
    ).toBeVisible();

    // Navigate to Bugs
    await bugPage.navigateToBugs();

    await expect(loggedInPage).toHaveURL(/.*bugs/);

    console.log('Navigated to Bugs page');
    await loggedInPage.waitForTimeout(2000);

    // Navigate to Create Bug
    await bugPage.navigateToCreateBug();

    await expect(
      bugPage.createBugHeading
    ).toBeVisible();

    await loggedInPage.waitForTimeout(2000);

    // Create bug
    const bugTitle = 'Sample Bug Title1';
    const bugDescription =
      'This is a sample bug description for testing purposes.';

    await bugPage.createBug(
      bugTitle,
      bugDescription,
      'High'
    );

    console.log('Bug created successfully');
    await loggedInPage.waitForTimeout(2000);

    // Navigate back to Bugs
    await bugPage.navigateToBugs();

    // Verify bug was created
    await expect(
      loggedInPage.getByText(bugTitle, { exact: true })
    ).toBeVisible();

    console.log('Bug verified on Bugs page');
    await loggedInPage.waitForTimeout(2000);

    // Open created bug
    await bugPage.openBug(bugTitle);

    // Verify details page
    await expect(
      loggedInPage
    ).toHaveURL(/.*bugs\/\d+/);

    console.log('Navigated to Bug details page');
    await loggedInPage.waitForTimeout(2000);

    // Delete bug
    await bugPage.deleteBug();

    // Verify redirect
    await expect(
      loggedInPage
    ).toHaveURL(/.*bugs/);

    // Verify bug was deleted
    await expect(
      loggedInPage.getByText(bugTitle, { exact: true })
    ).not.toBeVisible();

    console.log('Bug deleted successfully');
    await loggedInPage.waitForTimeout(2000);
  });

});