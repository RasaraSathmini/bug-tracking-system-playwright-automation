export class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Labels render as "Email:" / "Password:" (with trailing colon), so
    // getByLabel needs exact: false to match on the visible text.
    this.heading = page.getByRole('heading', { name: 'Login' });
    this.emailInput = page.getByLabel('Email:', { exact: false });
    this.passwordInput = page.getByLabel('Password:', { exact: false });
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('auth/login');
  }

  async login(email, password, rememberMe = false) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    if (rememberMe) {
      await this.rememberMeCheckbox.check();
    }
    await this.submitButton.click();
  }
}