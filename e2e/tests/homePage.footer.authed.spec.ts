import { test, expect } from '../extendedTest';

test.describe('ログイン済みの場合', () => {
  test.describe('表示', () => {
    test('ユーザーアイコンが表示されていること', async ({ homePageAuthed }) => {
      await expect(homePageAuthed.footer.userIcon).toBeVisible();
    });

    test('ログアウトボタンが表示されていること', async ({ homePageAuthed }) => {
      await expect(homePageAuthed.footer.logoutButton).toBeVisible();
    });

    test('アカウント削除ページへのリンクが表示されていること', async ({
      homePageAuthed,
    }) => {
      await expect(homePageAuthed.footer.deleteAccountLink).toBeVisible();
    });
  });

  test.describe('機能と遷移', () => {
    test('ログアウトボタンをクリックするとログアウトされること', async ({
      homePageAuthed,
    }) => {
      await homePageAuthed.footer.logoutButton.click();
      await expect(homePageAuthed.footer.userIcon).not.toBeVisible();
      await expect(homePageAuthed.footer.logoutButton).not.toBeVisible();
      await expect(homePageAuthed.footer.deleteAccountLink).not.toBeVisible();
      await expect(homePageAuthed.footer.loginButton).toBeVisible();
    });

    test('アカウント削除ページへのリンクをクリックするとアカウント削除ページに遷移すること', async ({
      homePageAuthed,
    }) => {
      await homePageAuthed.footer.deleteAccountLink.click();
      await expect(homePageAuthed.page).toHaveURL('/bye');
    });
  });
});
