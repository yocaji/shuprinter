import { type Page, type Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly htmlTag: Locator;
  readonly starting: Starting;
  readonly notes: Notes;
  readonly editSubjectDialog: EditSubjectDialog;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.htmlTag = page.locator('html');
    this.starting = new Starting(page);
    this.notes = new Notes(page);
    this.editSubjectDialog = new EditSubjectDialog(page);
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto('/');
  }
}

export class Starting {
  readonly self: Locator;
  readonly prompt: Locator;
  readonly textbox: Locator;
  readonly startButton: Locator;

  constructor(page: Page) {
    this.self = page.locator('main');
    this.prompt = this.self.getByTestId('prompt');
    this.textbox = this.self.getByRole('textbox');
    this.startButton = this.self.getByRole('button', { name: 'Start' });
  }

  async inputSubject(subject: string) {
    await this.textbox.fill(subject);
  }
}

export class Notes {
  readonly self: Locator;
  readonly notes: Locator;

  constructor(page: Page) {
    this.self = page.getByTestId('notes');
    this.notes = this.self.getByRole('listitem');
  }

  async getNotesCount(): Promise<number> {
    return await this.notes.count();
  }

  note(i: number): Locator {
    return this.notes.nth(i);
  }

  subject(i: number): Locator {
    return this.notes.nth(i).getByRole('heading');
  }

  updatedAt(i: number): Locator {
    return this.notes.nth(i).getByTestId('updated-at');
  }

  editSubjectButton(i: number): Locator {
    return this.notes.nth(i).getByRole('button', { name: 'Edit title' });
  }

  deleteNoteButton(i: number): Locator {
    return this.notes.nth(i).getByRole('button', { name: 'Delete this note' });
  }
}

export class EditSubjectDialog {
  readonly self: Locator;
  readonly input: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.self = page.locator('[id^=headlessui-dialog-panel-]');
    this.input = this.self.getByRole('textbox');
    this.cancelButton = this.self.getByRole('button', { name: '閉じる' });
    this.saveButton = this.self.getByRole('button', { name: '保存' });
  }
}

export class Footer {
  readonly self: Locator;
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
    this.self = page.locator('footer');
    this.loginButton = this.self.getByRole('button', { name: 'ログイン' });
    this.logoutButton = this.self.getByRole('button', { name: 'ログアウト' });
    this.userIcon = this.self.getByTestId('user-icon');
    this.deleteAccountLink = this.self.getByRole('link', {
      name: 'アカウント削除',
    });
    this.darkModeButton = this.self.getByRole('button', { name: 'Dark mode' });
    this.lightModeButton = this.self.getByRole('button', {
      name: 'Light mode',
    });
    this.logoLink = this.self.getByText('Shuprinter');
    this.termsLink = this.self.getByRole('link', { name: '規約とポリシー' });
    this.githubLink = this.self.getByRole('link', { name: 'GitHub' });
  }

  async clickLoginButton(page: Page): Promise<Page> {
    await this.loginButton.click();
    return page.waitForEvent('popup');
  }

  async clickGitHubLink(page: Page): Promise<Page> {
    await this.githubLink.click();
    return page.waitForEvent('popup');
  }
}
