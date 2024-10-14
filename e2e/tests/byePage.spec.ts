import { test, expect } from '../extendedTest';

test.describe('初期表示', async () => {
  test.beforeEach(async ({ homePage, auth }) => {
    await auth.login(homePage.page);
    await homePage.footer.deleteAccountLink.click();
  });

  test('戻るボタンが表示されていること', async ({ byePage }) => {
    await expect(byePage.header.backButton).toBeVisible();
  });

  test('見出しが表示されていること', async ({ byePage, auth }) => {
    await expect(byePage.main.heading).toHaveText('アカウントの削除');
  });

  test('説明文が表示されていること', async ({ byePage }) => {
    await expect(byePage.main.explanation).toBeVisible();
  });

  test('アカウント削除ボタンが表示されていること', async ({ byePage }) => {
    await expect(byePage.main.deleteButton).toBeVisible();
  });

  test('フッターが表示されていること', async ({ byePage }) => {
    await expect(byePage.footer).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test.beforeEach(async ({ homePage, auth }) => {
    await auth.login(homePage.page);
    await homePage.footer.deleteAccountLink.click();
  });

  test('戻るボタンをクリックするとトップページに遷移すること', async ({
    byePage,
  }) => {
    await byePage.header.backButton.click();
    await expect(byePage.page).toHaveURL('/');
  });

  test('アカウント削除ボタンをクリックすると確認ダイアログが表示されること', async ({
    byePage,
  }) => {
    byePage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('shuprinter.qa@gmail.com を削除しますか？');
      await dialog.dismiss();
    });
    await byePage.main.deleteButton.click();
  });

  test('確認ダイアログをキャンセルするとアカウント削除ページが表示されていること', async ({
    byePage,
  }) => {
    byePage.page.on('dialog', async (dialog) => {
      dialog.message();
      await dialog.dismiss();
    });
    await byePage.main.deleteButton.click();
    await expect(byePage.page).toHaveURL('/bye');
  });

  test('確認ダイアログに同意するとGoogleログインのポップアップが表示されること', async ({
    byePage,
  }) => {
    byePage.page.on('dialog', (dialog) => dialog.accept());
    const popup = await byePage.main.googlePopup(byePage.page);
    expect(popup.url()).toContain(
      'https://shuprinter-auth.firebaseapp.com/__/auth/handler',
    );
  });
});
