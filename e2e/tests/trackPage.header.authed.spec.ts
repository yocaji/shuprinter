import { test, expect } from '../extendedTest';

test.describe('表示', () => {
  test.beforeEach(async ({ homePageAuthed }) => {
    await homePageAuthed.notes.note(0).click();
  });

  test('戻るボタンが表示されること', async ({ trackPage }) => {
    await expect(trackPage.header.backButton).toBeVisible();
  });

  test('保存ボタンが表示されること', async ({ trackPage }) => {
    await expect(trackPage.header.saveButton).toBeVisible();
  });

  test('ログインボタンが表示されないこと', async ({ trackPage }) => {
    await expect(trackPage.header.loginButton).not.toBeVisible();
  });

  test('コピーボタンが表示されること', async ({ trackPage }) => {
    await expect(trackPage.header.copyButton).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test.beforeEach(async ({ homePageAuthed }) => {
    await homePageAuthed.notes.area
      .getByText('Loading...')
      .waitFor({ state: 'hidden' });
    await homePageAuthed.notes.note(0).click();
  });

  test('保存済みの状態で戻るボタンをクリックすると、Home画面に遷移すること', async ({
    trackPage,
  }) => {
    await trackPage.header.backButton.click();
    await expect(trackPage.page).toHaveURL('/');
  });

  test('未保存の状態で戻るボタンをクリックすると確認ダイアログが表示されること', async ({
    trackPage,
  }) => {
    trackPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('変更を保存せずに戻りますか？');
      await dialog.dismiss();
    });
    await trackPage.editor.textarea.fill('星めぐりの歌');
    await trackPage.header.saveButton.getByText('保存する').waitFor();
    await trackPage.header.backButton.click();
  });

  test('確認ダイアログのキャンセルボタンをクリックするとTrack画面が表示されること', async ({
    trackPage,
  }) => {
    trackPage.page.on('dialog', (dialog) => dialog.dismiss());
    await trackPage.editor.textarea.press('@');
    await trackPage.header.saveButton.getByText('保存する').waitFor();
    await trackPage.header.backButton.click();
    await expect(trackPage.page).toHaveURL('/track');
  });

  test('確認ダイアログのOKボタンをクリックするとHome画面が表示されること', async ({
    trackPage,
  }) => {
    trackPage.page.on('dialog', (dialog) => dialog.accept());
    await trackPage.editor.textarea.press('@');
    await trackPage.header.saveButton.getByText('保存する').waitFor();
    await trackPage.header.backButton.click();
    await expect(trackPage.page).toHaveURL('/');
  });

  test('保存ボタンをクリックすると 1) 保存ボタンのラベルが「Loading...」となること 2) 非活性となること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.press('@');
    await trackPage.header.saveButton.getByText('保存する').waitFor();
    await trackPage.header.saveButton.click();
    expect(await trackPage.header.saveButton.textContent()).toBe('Loading...');
    await expect(trackPage.header.saveButton).toBeDisabled();
  });

  test('保存ボタンをクリック後、Loadingが完了すると 1) 保存ボタンのラベルが「保存済み」となること 2) 非活性であること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.press('@');
    await trackPage.header.saveButton.getByText('保存する').waitFor();
    await trackPage.header.saveButton.click();
    await trackPage.header.saveButton
      .getByText('Loading...')
      .waitFor({ state: 'hidden' });
    expect(await trackPage.header.saveButton.textContent()).toBe('保存済み');
    await expect(trackPage.header.saveButton).toBeDisabled();
  });
});
