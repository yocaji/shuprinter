import { test, expect } from '../extendedTest';

test.beforeEach(async ({ homePage }) => {
  await homePage.starting.textbox.fill('星めぐりの歌');
  await homePage.starting.startButton.click();
});

test.describe('表示', () => {
  test('戻るボタンが表示されること', async ({ trackPage }) => {
    await expect(trackPage.header.backButton).toBeVisible();
  });

  test('ログインボタンが 1) 表示されること 2) ラベルが「ログインして保存する」であること', async ({
    trackPage,
  }) => {
    await expect(trackPage.header.loginButton).toBeVisible();
    await expect(trackPage.header.loginButton).toHaveText(
      'ログインして保存する',
    );
  });

  test('保存ボタンが表示されないこと', async ({ trackPage }) => {
    await expect(trackPage.header.saveButton).not.toBeVisible();
  });

  test('コピーボタンが表示されること', async ({ trackPage }) => {
    await expect(trackPage.header.copyButton).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test('ログインボタンをクリックするとGoogleログインのポップアップが表示されること', async ({
    trackPage,
  }) => {
    await trackPage.header.loginButton.click();
    const popup = await trackPage.header.googlePopup(trackPage.page);
    expect(popup.url()).toContain(
      'https://shuprinter-auth.firebaseapp.com/__/auth/handler',
    );
  });

  test('ログインすると保存ボタンが表示されること', async ({
    trackPage,
    auth,
  }) => {
    await auth.login(trackPage.page);
    await expect(trackPage.header.saveButton).toBeVisible();
  });

  test('本文入力後にログインするとログイン前の入力内容が保持されていること', async ({
    trackPage,
    auth,
  }) => {
    await trackPage.editor.textarea.fill('あかいめだまの　さそり');
    await auth.login(trackPage.page);
    expect(await trackPage.editor.subject.textContent()).toBe('星めぐりの歌');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      'あかいめだまの　さそり',
    );
  });

  test('コピーボタンをクリックすると、件名と本文を結合した文字列がクリップボードにコピーされること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.fill('あかいめだまの　さそり');
    await trackPage.header.copyButton.click();
    const clipboard = await trackPage.page.evaluate(async () => {
      return navigator.clipboard.readText();
    });
    expect(clipboard).toBe(`星めぐりの歌\n\nあかいめだまの　さそり`);
  });
});
