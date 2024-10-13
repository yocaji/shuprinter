import { test, expect } from '../extendedTest';

test.beforeEach(async ({ homePage, auth }) => {
  await auth.login(homePage.page);
});

test.describe('初期表示', async () => {
  test('ユーザーアイコンが表示されていること', async ({ homePage }) => {
    await expect(homePage.footer.userIcon).toBeVisible();
  });

  test('ログアウトボタンが表示されていること', async ({ homePage }) => {
    await expect(homePage.footer.logoutButton).toBeVisible();
  });

  test('アカウント削除ページへのリンクが表示されていること', async ({
    homePage,
  }) => {
    await expect(homePage.footer.deleteAccountLink).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test('ログアウトボタンをクリックするとログアウトされること', async ({
    homePage,
  }) => {
    await homePage.footer.logoutButton.click();
    await expect(homePage.footer.userIcon).not.toBeVisible();
    await expect(homePage.footer.logoutButton).not.toBeVisible();
    await expect(homePage.footer.deleteAccountLink).not.toBeVisible();
    await expect(homePage.footer.loginButton).toBeVisible();
  });

  test('アカウント削除ページへのリンクをクリックするとアカウント削除ページに遷移すること', async ({
    homePage,
  }) => {
    await homePage.footer.deleteAccountLink.click();
    await expect(homePage.page).toHaveURL('/bye');
  });
});
