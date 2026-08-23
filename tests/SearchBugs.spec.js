import { test, expect } from '../fixtures/test-fixtures.js';
import { BugPage } from '../pages/BugPage.js';

test.describe('Filter Bugs', () => {

    test('filter bugs by status', async ({ loggedInPage}) => {

        const bugPage = new BugPage(loggedInPage);

        // Verify login
        await expect(loggedInPage).toHaveURL(/.*dashboard/);

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

        // create a new bug to ensure there is at least one bug to filter
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

        // Search bugs 
        await loggedInPage.getByPlaceholder('Search bugs...').fill(bugTitle);
        await loggedInPage.waitForTimeout(2000);
        await loggedInPage.getByRole('button', { name: 'Filter' }).click();

        console.log('Searched for bugs with title: ' + bugTitle);
        await loggedInPage.waitForTimeout(2000);

        // verify search results
        const bugRows = bugPage.getBugRows();
        const rowCount = await bugRows.count();
        expect(rowCount).toBeGreaterThan(0);

        console.log('Found ' + rowCount + ' bugs with title: ' + bugTitle);
        await loggedInPage.waitForTimeout(2000);

        // Clear search input
        await loggedInPage.getByPlaceholder('Search bugs...').fill('');
        await loggedInPage.waitForTimeout(2000);
        await loggedInPage.getByRole('button', { name: 'Filter' }).click();

        console.log('Cleared search input and filtered bugs');
        await loggedInPage.waitForTimeout(2000);

    });
});
