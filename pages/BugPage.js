export class BugPage {
  constructor(page) {
    this.page = page;

    // Navigation
    this.bugsLink = page.getByRole('link', {
      name: 'Bugs',
      exact: true
    });

    this.createBugLink = page.getByRole('link', {
      name: /\+/i
    });

    // Create Bug page
    this.createBugHeading = page.getByRole('heading', {
      name: 'Create Bug'
    });

    this.titleInput = page.getByLabel('Title');
    this.descriptionInput = page.getByLabel('Description');
    this.prioritySelect = page.getByLabel('Priority');

    this.createBugButton = page.getByRole('button', {
      name: 'Create Bug'
    });

    // Bug details page
    this.deleteButton = page.getByRole('button', {
      name: 'Delete'
    });

    // Bugs list filters and rows
    this.statusFilter = page.locator('select').nth(0);
    this.bugRows = page.locator('table tbody tr');
  }

  async navigateToBugs() {
    await this.bugsLink.click();
    await this.page.waitForURL(/.*bugs/);
  }

  async navigateToCreateBug() {
    await this.createBugLink.click();
    await this.page.waitForURL(/.*bugs\/create/);
  }

  async createBug(title, description, priority) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.prioritySelect.selectOption(priority);
    await this.createBugButton.click();
  }

  getBugRows() {
    return this.bugRows;
  }

  async filterBugsByStatus(status) {
    await this.statusFilter.selectOption(status);
    await this.page.getByRole('button', { name: 'Filter' }).click();
  }

  async openBug(title) {
    await this.page.getByRole('link', {
      name: title,
      exact: true
    }).click();

    await this.page.waitForURL(/.*bugs\/\d+/);
  }

  async deleteBug() {
    this.page.once('dialog', async dialog => {
      console.log(`Dialog type: ${dialog.type()}`);
      console.log(`Dialog message: ${dialog.message()}`);

      await dialog.accept();
    });

    await this.deleteButton.click();

    await this.page.waitForURL(/.*bugs/);
  }
}