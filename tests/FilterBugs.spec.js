import { test, expect } from '../fixtures/test-fixtures.js';
import { BugPage } from '../pages/BugPage.js';

test.describe('Filter Bugs', () => {

    test('filter bugs by status', async ({ loggedInPage}) => {

        const bugPage = new BugPage(loggedInPage);
        const bugDescription = 'This is a sample bug description for testing purposes.';

        // Verify login
        await expect(loggedInPage).toHaveURL(/.*dashboard/);

        // Navigate to Bugs
        await bugPage.navigateToBugs();
        await expect(loggedInPage).toHaveURL(/.*bugs/);

        console.log('Navigated to Bugs page');
        await loggedInPage.waitForTimeout(2000);

        // Create bug with status Open with High priority
        await bugPage.navigateToCreateBug();

        await expect(
        bugPage.createBugHeading
        ).toBeVisible();

        const openBugTitle = 'Sample Open Filter, High priority Bug';

        await bugPage.createBug(
            openBugTitle,
            bugDescription,
            'High'
        );

        console.log('Open test bug with High priority created successfully');

        // Navigate to Bugs to create 2nd bug
        await bugPage.navigateToBugs();

        // Create bug with status In Progress with Low priority
        await bugPage.navigateToCreateBug();

        await expect(
        bugPage.createBugHeading
        ).toBeVisible();

        const inProgressBugTitle = 'Sample In Progress Filter, Low priority Bug';

        await bugPage.createBug(
            inProgressBugTitle,
            bugDescription,
            'Low'
        );

        console.log('In Progress test bug with low priority created successfully');
        await loggedInPage.waitForTimeout(2000);

        // Edit bug to change status to In Progress
        await bugPage.changeStatus('in_progress');

        // Verify status update message
        await expect(loggedInPage.getByText('Status changed to in_progress.')).toBeVisible();

        console.log('Bug status changed to In Progress');

        // Navigate to Bugs to create 3rd bug
        await bugPage.navigateToBugs();

        // Create bug with status Closed with Medium priority
        await bugPage.navigateToCreateBug();

        await expect(
        bugPage.createBugHeading
        ).toBeVisible();

        const closedBugTitle = 'Sample Closed Filter, Medium priority Bug';

        await bugPage.createBug(
            closedBugTitle,
            bugDescription,
            'Medium'
        );

        console.log('Closed test bug with Medium priority created successfully');
        await loggedInPage.waitForTimeout(2000);

        // Edit bug to change status to Closed
        await bugPage.changeStatus('closed');

        // Verify that the status has been updated
        await expect(loggedInPage.getByText('Status changed to closed.')).toBeVisible();

        console.log('Bug status changed to Closed');

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

        // Create bug with Critical priority
        await bugPage.navigateToCreateBug();

        await expect(
        bugPage.createBugHeading
        ).toBeVisible();

        const criticalBugTitle = 'Sample Critical priority Bug';

        await bugPage.createBug(
            criticalBugTitle,
            bugDescription,
            'Critical'
        );

        console.log('Critical priority test bug created successfully');
        await loggedInPage.waitForTimeout(2000);

        // Navigate back to Bugs
        await bugPage.navigateToBugs();

        // Filter bugs by Priority
        const priorities = [
            { filter: 'Low',    value: 'low' },
            { filter: 'Medium', value: 'medium' },
            { filter: 'High',   value: 'high' },
            { filter: 'Critical', value: 'critical' }
        ];

        for (const p of priorities) {
        await bugPage.filterBugsByPriority(p.filter);

        const bugRows = bugPage.getBugRows();
        // Wait for at least one visible row 
        await expect(bugRows.first()).toBeVisible();

        const rowCount = await bugRows.count();
        expect(rowCount).toBeGreaterThan(0);

        for (let i = 0; i < rowCount; i++) {
            // Priority is in the 3rd column (td index 2)
        await expect(bugRows.nth(i).locator('td').nth(2)).toHaveText(p.value);
        }

        console.log('Found ' + rowCount + ' bugs with the priority: ' + p.filter);
        
        }
    });
});
