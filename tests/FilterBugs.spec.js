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

        // Filter bugs by status
        const statuses = [
            { filter: 'Open', expected: 'open' },
            { filter: 'In Progress', expected: 'in_progress' },
            { filter: 'Closed', expected: 'closed' }
        ];

        for (const status of statuses) {
            await bugPage.filterBugsByStatus(status.filter);

        const bugRows = bugPage.getBugRows();
        const rowCount = await bugRows.count();

        expect(rowCount).toBeGreaterThan(0);

        for (let i = 0; i < rowCount; i++) {
            await expect(
                bugRows.nth(i).locator('td').nth(1)
            ).toHaveText(status.expected);
        }

        console.log('Found ' + rowCount + ' bugs with the status: ' + status.filter);
        await loggedInPage.waitForTimeout(2000);}

    });
});
