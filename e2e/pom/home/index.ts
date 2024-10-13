import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly htmlTag: Locator;
  readonly main: Main;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.htmlTag = page.locator('html');
    this.main = new Main(page);
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}

export class Main {
  readonly prompt: Locator;
  readonly textbox: Locator;
  readonly startButton: Locator;

  constructor(page: Page) {
    this.prompt = page.getByTestId('prompt');
    this.textbox = page.getByRole('textbox');
    this.startButton = page.getByRole('button', { name: 'Start' });
  }

  async inputSubject(subject: string) {
    await this.textbox.fill(subject);
  }
}

export class Footer {
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly userIcon: Locator;
  readonly deleteAccountLink: Locator;
  readonly darkModeButton: Locator;
  readonly lightModeButton: Locator;
  readonly logoLink: Locator;
  readonly termsLink: Locator;
  readonly githubLink: Locator;

  constructor(page: Page) {
    this.loginButton = page.getByRole('button', { name: 'ログイン' });
    this.logoutButton = page.getByRole('button', { name: 'ログアウト' });
    this.userIcon = page.getByTestId('user-icon');
    this.deleteAccountLink = page.getByRole('link', {
      name: 'アカウント削除',
    });
    this.darkModeButton = page.getByRole('button', { name: 'Dark mode' });
    this.lightModeButton = page.getByRole('button', { name: 'Light mode' });
    this.logoLink = page.getByText('Shuprinter');
    this.termsLink = page.getByRole('link', { name: '規約とポリシー' });
    this.githubLink = page.getByRole('link', { name: 'GitHub' });
  }

  async clickLoginButton(page: Page): Promise<Page> {
    await this.loginButton.click();
    return page.waitForEvent('popup');
  }

  async clickDarkModeButton() {
    await this.darkModeButton.click();
  }

  async clickLightModeButton() {
    await this.lightModeButton.click();
  }

  async clickLogoLink() {
    await this.logoLink.click();
  }

  async clickTermsLink() {
    await this.termsLink.click();
  }

  async clickGitHubLink(page: Page): Promise<Page> {
    await this.githubLink.click();
    return page.waitForEvent('popup');
  }
}
