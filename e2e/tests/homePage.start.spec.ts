import { test, expect } from '../extendedTest';

test.describe('初期表示', () => {
  test('Subjectの入力を促すメッセージが表示されていること', async ({
    homePageAuthed,
  }) => {
    await expect(homePageAuthed.starting.prompt).toBeVisible();
  });

  test('Subjectの入力欄が表示されていること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.starting.textbox).toBeVisible();
  });

  test('送信ボタンが表示されていること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.starting.startButton).toBeVisible();
  });

  test('Subjectが未入力の場合、送信ボタンが非活性となっていること', async ({
    homePageAuthed,
  }) => {
    await expect(homePageAuthed.starting.startButton).toBeDisabled();
  });
});

test.describe('機能と遷移', () => {
  test('Subjectにテキストを入力すると送信ボタンが活性となること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.starting.inputSubject('テスト');
    await expect(homePageAuthed.starting.startButton).toBeEnabled();
  });

  test('Subjectにテキストを入力した後に削除すると送信ボタンが非活性となること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.starting.inputSubject('テスト');
    await homePageAuthed.starting.inputSubject('');
    await expect(homePageAuthed.starting.startButton).toBeDisabled();
  });

  test('送信ボタンをクリックするとメモの入力画面に遷移すること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.starting.inputSubject('テスト');
    await homePageAuthed.starting.startButton.click();
    await expect(homePageAuthed.page).toHaveURL('/track');
  });
});
