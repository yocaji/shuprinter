import { test, expect } from '../extendedTest';
import { beforeAll } from 'vitest';

test.describe('初期表示', () => {
  test('Subjectの入力を促すメッセージが表示されていること', async ({
    homePage,
  }) => {
    await expect(homePage.main.prompt).toBeVisible();
  });

  test('Subjectの入力欄が表示されていること', async ({ homePage }) => {
    await expect(homePage.main.textbox).toBeVisible();
  });

  test('送信ボタンが表示されていること', async ({ homePage }) => {
    await expect(homePage.main.startButton).toBeVisible();
  });

  test('Subjectが未入力の場合、送信ボタンが非活性となっていること', async ({
    homePage,
  }) => {
    await expect(homePage.main.startButton).toBeDisabled();
  });
});

test.describe('機能と遷移', () => {
  test('Subjectにテキストを入力すると送信ボタンが活性となること', async ({
    homePage,
  }) => {
    await homePage.main.inputSubject('テスト');
    await expect(homePage.main.startButton).toBeEnabled();
  });

  test('Subjectにテキストを入力した後に削除すると送信ボタンが非活性となること', async ({
    homePage,
  }) => {
    await homePage.main.inputSubject('テスト');
    await homePage.main.inputSubject('');
    await expect(homePage.main.startButton).toBeDisabled();
  });

  test('送信ボタンをクリックするとメモの入力画面に遷移すること', async ({
    homePage,
  }) => {
    await homePage.main.inputSubject('テスト');
    await homePage.main.startButton.click();
    await expect(homePage.page).toHaveURL('/track');
  });
});
