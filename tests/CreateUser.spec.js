import {test, expect} from '../fixtures/test-fixtures.js';
import {UserPage} from '../pages/UserPage.js';

test.describe('Create User', () => {

  test('Create, update and delete a new user', async ({loggedInPage}) => { 

    const userPage = new UserPage(loggedInPage);

    const username = 'Sample User';
    const updatedUsername = 'Updated Sample User';
    const email = 'sampleuser@example.com';
    const password = 'Password123!';
    const role = 'Developer';

    // Verify login
    await expect(loggedInPage).toHaveURL(/.*dashboard/);

    await expect(
      loggedInPage.getByRole('heading', {
        name: 'Dashboard'
      })
    ).toBeVisible();

    // Navigate to Users
    await userPage.navigateToUsers();

    await expect(loggedInPage).toHaveURL(/.*users/);

    console.log('Navigated to Users page');
    await loggedInPage.waitForTimeout(2000);  

    // Navigate to Create User
    await userPage.navigateToCreateUser();

    await expect(
      userPage.createUserHeading
    ).toBeVisible();

    // Create user
    await userPage.createUser(
      username,
      email,
      password,
      role,
    );

    console.log('User created successfully');
    await loggedInPage.waitForTimeout(2000);

    // Navigate back to Users
    await userPage.navigateToUsers(); 

    // Verify user was created
    const userRow = userPage.getUserRow(username);

    await expect(userRow).toBeVisible();

    // Verify Username
    const cells = userRow.locator('td');

    await expect(cells.nth(0))
      .toContainText(username);

    // Verify Email
    await expect(cells.nth(1))
      .toContainText(email);

    // Verify Role
    await expect(cells.nth(2))
      .toContainText('developer');

    // Verify Status
    await expect(cells.nth(3))
      .toContainText('Active');

    console.log('User created successfully with all values verified in table');
    await loggedInPage.waitForTimeout(2000);

    // Edit created user
    await userPage.editUser(username);

    await expect(loggedInPage)
      .toHaveURL(/.*users\/\d+\/edit/);

    await expect(
      userPage.editUserHeading
    ).toBeVisible();

    // Update user
    await userPage.updateUser(updatedUsername);

    console.log('User updated successfully');
    await loggedInPage.waitForTimeout(2000);

    // Navigate back to Users
    await userPage.navigateToUsers(); 

    // Verify user was updated
    const updatedUserRow = userPage.getUserRow(updatedUsername);

    await expect(updatedUserRow).toBeVisible();

    await expect(updatedUserRow.locator('td').nth(0))
      .toContainText(updatedUsername);

    console.log('User updated successfully with all values verified in table');
    await loggedInPage.waitForTimeout(2000);

    // Delete user
    await userPage.deleteUser(updatedUsername);

    // Verify user was deleted
    await expect(
      loggedInPage.getByText(updatedUsername, { exact: true })
    ).not.toBeVisible();

    console.log('User deleted successfully');
    await loggedInPage.waitForTimeout(2000);


  });
} );