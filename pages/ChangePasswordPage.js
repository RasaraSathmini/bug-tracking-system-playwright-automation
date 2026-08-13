import { expect } from '@playwright/test';

export class ChangePasswordPage {
    constructor(page) {
        this.page = page;

        this.dropdownButton = page.locator('button.dropdown-btn');

        this.changePasswordLink = page.getByRole('link', {
            name: 'Change Password'
        });

        this.currentPasswordInput = page.getByLabel(
            'Current Password:',
            { exact: false }
        );

        this.newPasswordInput = page.getByLabel(
            'New Password:',
            { exact: false }
        );

        this.confirmPasswordInput = page.getByLabel(
            'Confirm Password:',
            { exact: false }
        );

        this.changePasswordButton = page.getByRole(
            'button',
            { name: 'Change Password' }
        );

        this.successMessage = page.locator(
            '.alert.alert-success'
        );

        this.logoutLink = page.getByRole(
            'link',
            { name: 'Logout' }
        );
    }

    async openChangePassword() {
        await this.dropdownButton.click();
        await this.changePasswordLink.click();

        await this.page.waitForURL(/.*change-password/);
    }

    async changePassword(currentPassword, newPassword) {
        await this.currentPasswordInput.fill(currentPassword);
        await this.newPasswordInput.fill(newPassword);
        await this.confirmPasswordInput.fill(newPassword);

        await this.changePasswordButton.click();
    }

    async verifySuccessMessage() {
        await expect(
            this.successMessage
        ).toHaveText(/Password changed successfully\./);
    }

    async logout() {
        await this.dropdownButton.click();
        await this.logoutLink.click();

        await this.page.waitForURL(/.*login/);
    }
}