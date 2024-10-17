import { type Page, type Locator } from '@playwright/test';

export class TrackPage {
  readonly page: Page;
  readonly header: Header;
  readonly editor: Editor;

  constructor(page: Page) {
    this.page = page;
    this.header = new Header(page);
    this.editor = new Editor(page);
  }
}

export class Editor {
  readonly subject: Locator;
  readonly textarea: Locator;

  constructor(page: Page) {
    this.subject = page.getByRole('heading');
    this.textarea = page.getByRole('textbox');
  }
}

export class Header {
  readonly area: Locator;
  readonly backButton: Locator;
  readonly loginButton: Locator;
  readonly saveButton: Locator;
  readonly copyButton: Locator;

  constructor(page: Page) {
    this.area = page.locator('header');
    this.backButton = this.area.getByRole('button', { name: 'Back' });
    this.loginButton = this.area.getByTestId('login-button');
    this.saveButton = this.area.getByTestId('save-button');
    this.copyButton = this.area.getByRole('button', { name: 'Copy' });
  }

  async googlePopup(page: Page) {
    await this.loginButton.click();
    return page.waitForEvent('popup');
  }
}
