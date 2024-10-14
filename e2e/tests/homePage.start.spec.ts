import { test, expect } from '../extendedTest';

test.describe('初期表示', () => {
  test('Subjectの入力を促すメッセージが表示されていること', async ({
    homePage,
  }) => {
    await expect(homePage.starting.prompt).toBeVisible();
  });

  test('Subjectの入力欄が表示されていること', async ({ homePage }) => {
    await expect(homePage.starting.textbox).toBeVisible();
  });

  test('送信ボタンが表示されていること', async ({ homePage }) => {
    await expect(homePage.starting.startButton).toBeVisible();
  });

  test('Subjectが未入力の場合、送信ボタンが非活性となっていること', async ({
    homePage,
  }) => {
    await expect(homePage.starting.startButton).toBeDisabled();
  });
});

test.describe('機能と遷移', () => {
  test('Subjectにテキストを入力すると送信ボタンが活性となること', async ({
    homePage,
  }) => {
    await homePage.starting.inputSubject('テスト');
    await expect(homePage.starting.startButton).toBeEnabled();
  });

  test('Subjectにテキストを入力した後に削除すると送信ボタンが非活性となること', async ({
    homePage,
  }) => {
    await homePage.starting.inputSubject('テスト');
    await homePage.starting.inputSubject('');
    await expect(homePage.starting.startButton).toBeDisabled();
  });

  test('送信ボタンをクリックするとメモの入力画面に遷移すること', async ({
    homePage,
  }) => {
    await homePage.starting.inputSubject('テスト');
    await homePage.starting.startButton.click();
    await expect(homePage.page).toHaveURL('/track');
  });
});
