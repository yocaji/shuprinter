import { type Page, type Locator } from '@playwright/test';
import { HomePage } from '../home';

export class ByePage {
  readonly page: Page;
  readonly header: Header;
  readonly main: Main;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.main = new Main(page);
    this.footer = page.locator('footer');
  }

  async goto() {
    const homePage = new HomePage(this.page);
    await homePage.goto();
    await homePage.footer.deleteAccountLink.click();
  }
}

export class Header {
  readonly backButton: Locator;

  constructor(page: Page) {
    this.backButton = page.getByRole('button', { name: 'Back' });
  }
}

export class Main {
  readonly heading: Locator;
  readonly explanation: Locator;
  readonly deleteButton: Locator;

  constructor(page: Page) {
    this.heading = page.getByRole('heading');
    this.explanation = page.getByTestId('explanation');
    this.deleteButton = page.getByRole('button', {
      name: 'アカウントを削除する',
    });
  }

  async googlePopup(page: Page) {
    await this.deleteButton.click();
    return page.waitForEvent('popup');
  }
}
