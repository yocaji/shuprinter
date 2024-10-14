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
  readonly area: Locator;
  readonly prompt: Locator;
  readonly textbox: Locator;
  readonly startButton: Locator;

  constructor(page: Page) {
    this.area = page.locator('main');
    this.prompt = this.area.getByTestId('prompt');
    this.textbox = this.area.getByRole('textbox');
    this.startButton = this.area.getByRole('button', { name: 'Start' });
  }

  async inputSubject(subject: string) {
    await this.textbox.fill(subject);
  }
}

export class Notes {
  readonly area: Locator;
  readonly notes: Locator;

  constructor(page: Page) {
    this.area = page.getByTestId('notes');
    this.notes = this.area.getByRole('listitem');
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
  readonly area: Locator;
  readonly textbox: Locator;
  readonly cancelButton: Locator;
  readonly saveButton: Locator;

  constructor(page: Page) {
    this.area = page.locator('[id^=headlessui-dialog-panel-]');
    this.textbox = this.area.getByRole('textbox');
    this.cancelButton = this.area.getByRole('button', { name: '閉じる' });
    this.saveButton = this.area.getByRole('button', { name: '保存' });
  }
}

export class Footer {
  readonly area: Locator;
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
    this.area = page.locator('footer');
    this.loginButton = this.area.getByRole('button', { name: 'ログイン' });
    this.logoutButton = this.area.getByRole('button', { name: 'ログアウト' });
    this.userIcon = this.area.getByTestId('user-icon');
    this.deleteAccountLink = this.area.getByRole('link', {
      name: 'アカウント削除',
    });
    this.darkModeButton = this.area.getByRole('button', { name: 'Dark mode' });
    this.lightModeButton = this.area.getByRole('button', {
      name: 'Light mode',
    });
    this.logoLink = this.area.getByText('Shuprinter');
    this.termsLink = this.area.getByRole('link', { name: '規約とポリシー' });
    this.githubLink = this.area.getByRole('link', { name: 'GitHub' });
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
