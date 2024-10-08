import { test, expect } from '@playwright/test';
import { HomePage } from '../pom/home';

let homePage: HomePage;

test.beforeEach(async ({ page }) => {
  homePage = new HomePage(page);
  await homePage.goto();
});

test.describe('Subject入力エリア', () => {
  test.describe('初期表示', () => {
    test('Subjectの入力を促すメッセージが表示されていること', async () => {
      await expect(homePage.main.prompt).toBeVisible();
    });

    test('Subjectの入力欄が表示されていること', async () => {
      await expect(homePage.main.textbox).toBeVisible();
    });

    test('送信ボタンが表示されていること', async () => {
      await expect(homePage.main.startButton).toBeVisible();
    });

    test('Subjectが未入力の場合、送信ボタンが非活性となっていること', async () => {
      await expect(homePage.main.startButton).toBeDisabled();
    });
  });

  test.describe('機能と遷移', () => {
    test('Subjectにテキストを入力すると送信ボタンが活性となること', async () => {
      await homePage.main.inputSubject('テスト');
      await expect(homePage.main.startButton).toBeEnabled();
    });

    test('Subjectにテキストを入力した後に削除すると送信ボタンが非活性となること', async () => {
      await homePage.main.inputSubject('テスト');
      await homePage.main.inputSubject('');
      await expect(homePage.main.startButton).toBeDisabled();
    });

    // prettier-ignore
    test('送信ボタンをクリックするとメモの入力画面に遷移すること', async () => {
      await homePage.main.inputSubject('テスト');
      await homePage.main.startButton.click();
      await expect(homePage.page).toHaveURL('/track');
    });
  });
});

test.describe('フッター', () => {
  test.describe('初期表示', () => {
    test('ログインボタンが表示されていること', async () => {
      await expect(homePage.footer.loginButton).toBeVisible();
    });

    test('ダークモードへの切り替えボタンが表示されていること', async () => {
      await expect(homePage.footer.darkModeButton).toBeVisible();
    });

    test('ロゴが表示されていること', async () => {
      await expect(homePage.footer.logoLink).toBeVisible();
    });

    test('規約とポリシーへのリンクが表示されていること', async () => {
      await expect(homePage.footer.termsLink).toBeVisible();
    });

    test('GitHubへのリンクが表示されていること', async () => {
      await expect(homePage.footer.githubLink).toBeVisible();
    });
  });

  test.describe('機能と遷移', () => {
    test('ログインボタンをクリックするとGoogleログインのポップアップウィンドウが表示されること', async () => {
      const popup = await homePage.footer.clickLoginButton(homePage.page);
      await expect(popup).toHaveURL(/accounts.google.com/);
    });

    test('ダークモードへの切り替えボタンをクリックするとダークモードになること', async () => {
      await homePage.footer.clickDarkModeButton();
      // 何をもってダークモードになったと判定するか要検討
      await expect(homePage.htmlTag).toHaveClass('dark');
    });

    test('ライトモードへの切り替えボタンをクリックするとライトモードになること', async () => {
      await homePage.footer.clickDarkModeButton();
      await homePage.footer.clickLightModeButton();
      await expect(homePage.htmlTag).not.toHaveClass('dark');
    });

    test('ロゴをクリックするとトップページに遷移すること', async () => {
      await homePage.footer.clickLogoLink();
      await expect(homePage.page).toHaveURL('/');
    });

    test('規約とポリシーへのリンクをクリックすると規約とポリシーページに遷移すること', async () => {
      await homePage.footer.clickTermsLink();
      await expect(homePage.page).toHaveURL('/terms');
    });

    test('GitHubへのリンクをクリックするとGitHubページに遷移すること', async () => {
      const newPage = await homePage.footer.clickGitHubLink(homePage.page);
      await expect(newPage).toHaveURL('https://github.com/yocaji/shuprinter');
    });
  });
});
