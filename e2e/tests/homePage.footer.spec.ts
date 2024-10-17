import { test, expect } from '../extendedTest';

test.describe('初期表示', () => {
  test('ログインボタンが表示されていること', async ({ homePage }) => {
    await expect(homePage.footer.loginButton).toBeVisible();
  });

  test('ダークモードへの切り替えボタンが表示されていること', async ({
    homePage,
  }) => {
    await expect(homePage.footer.darkModeButton).toBeVisible();
  });

  test('ユーザーアイコンが表示されていないこと', async ({ homePage }) => {
    await expect(homePage.footer.userIcon).not.toBeVisible();
  });

  test('ログアウトボタンが表示されていないこと', async ({ homePage }) => {
    await expect(homePage.footer.logoutButton).not.toBeVisible();
  });

  test('アカウント削除ページへのリンクが表示されていないこと', async ({
    homePage,
  }) => {
    await expect(homePage.footer.deleteAccountLink).not.toBeVisible();
  });

  test('ロゴが表示されていること', async ({ homePage }) => {
    await expect(homePage.footer.logoLink).toBeVisible();
  });

  test('規約とポリシーへのリンクが表示されていること', async ({ homePage }) => {
    await expect(homePage.footer.termsLink).toBeVisible();
  });

  test('GitHubへのリンクが表示されていること', async ({ homePage }) => {
    await expect(homePage.footer.githubLink).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test('ログインボタンをクリックするとGoogleログインのポップアップが表示されること', async ({
    homePage,
  }) => {
    const popup = await homePage.footer.clickLoginButton(homePage.page);
    expect(popup.url()).toContain(
      'https://shuprinter-auth.firebaseapp.com/__/auth/handler',
    );
  });

  test('ダークモードへの切り替えボタンをクリックするとダークモードになること', async ({
    homePage,
  }) => {
    await homePage.footer.darkModeButton.click();
    // 何をもってダークモードになったと判定するか要検討
    await expect(homePage.htmlTag).toHaveClass('dark');
  });

  test('ライトモードへの切り替えボタンをクリックするとライトモードになること', async ({
    homePage,
  }) => {
    await homePage.footer.darkModeButton.click();
    await homePage.footer.lightModeButton.click();
    await expect(homePage.htmlTag).not.toHaveClass('dark');
  });

  test('ロゴをクリックするとトップページに遷移すること', async ({
    homePage,
  }) => {
    await homePage.footer.logoLink.click();
    await expect(homePage.page).toHaveURL('/');
  });

  test('規約とポリシーへのリンクをクリックすると規約とポリシーページに遷移すること', async ({
    homePage,
  }) => {
    await homePage.footer.termsLink.click();
    await expect(homePage.page).toHaveURL('/terms');
  });

  test('GitHubへのリンクをクリックするとGitHubページに遷移すること', async ({
    homePage,
  }) => {
    const newPage = await homePage.footer.clickGitHubLink(homePage.page);
    await expect(newPage).toHaveURL('https://github.com/yocaji/shuprinter');
  });
});
