export class UserPage {
    constructor(page) {
        this.page = page;

        // Navigation
        this.usersLink = page.getByRole('link', { 
            name: 'Users', 
            exact: true 
        });

        this.createUserLink = page.getByRole('link', { 
            name: /\+/i 
        });

        // Create User page
        this.createUserHeading = page.getByRole('heading', { 
            name: 'Create User' 
        });    

        this.usernameInput = page.getByLabel('Username');
        this.emailInput = page.getByLabel('Email');
        this.passwordInput = page.getByLabel('Password');
        this.roleSelect = page.getByLabel('Role');  

        this.createUserButton = page.getByRole('button', { 
            name: 'Create User' 
        });

        // User details page
        // const userRow = page.locator('table tbody tr', { has: page.getByText('Sample User') });
        // this.editButton = userRow.locator('a, button').filter({ hasText: /edit/i }).first();    

        // Edit User page
        this.editUserHeading = page.getByRole('heading', { 
            name: 'Edit User' 
        });

        this.updateUserButton = page.getByRole('button', { 
            name: 'Update User' 
        });

        // Delete User page
        this.deleteUserButton = page.getByRole('button', { 
            name: 'Delete' 
        });

        // User table
        // this.userTable = page.locator('table tbody');
}

        async navigateToUsers() {
            await this.usersLink.click();
            await this.page.waitForURL(/.*users/);
        }   

        async navigateToCreateUser() {
            await this.createUserLink.click();
            await this.page.waitForURL(/.*users\/create/);
        }   

        async createUser(username, email, password, role) {
            await this.usernameInput.fill(username);
            await this.emailInput.fill(email);
            await this.passwordInput.fill(password);
            await this.roleSelect.selectOption(role);

            await this.createUserButton.click();
        }

         getUserRow(username) {
            return this.page.locator('table tbody tr', {
                has: this.page.getByText(username, { exact: true })
    });
  }

        async editUser(username) {
            const userRow = this.getUserRow(username);

            await userRow.waitFor({ state: 'visible' });

            const editButton = userRow
                .locator('a, button')
                .filter({ hasText: /edit/i })
                .first();
                
            await editButton.click();
            await this.page.waitForURL(/.*users\/\d+\/edit/);
        }

        async updateUser(username) {
            await this.usernameInput.fill(username);
            await this.updateUserButton.click();
        }   

        async deleteUser(username) {
            const userRow = this.getUserRow(username);

            await userRow.waitFor({ state: 'visible' });

            this.page.once('dialog', async dialog => {
            console.log(`Dialog type: ${dialog.type()}`);
            console.log(`Dialog message: ${dialog.message()}`);
            await dialog.accept();
    });

            const deleteButton = userRow
                .locator('a, button')
                .filter({ hasText: /delete/i })
                .first();

            await deleteButton.click();
            await userRow.waitFor({
      state: 'hidden'
    });
  }
}