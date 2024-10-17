import { test, expect } from '../extendedTest';

test.beforeEach(async ({ homePageAuthed }) => {
  await homePageAuthed.starting.textbox.fill('星めぐりの歌');
  await homePageAuthed.starting.startButton.click();
});

test.describe('表示', () => {
  test('スタートエリアで入力した件名が表示されること', async ({
    trackPage,
  }) => {
    expect(await trackPage.editor.subject.textContent()).toBe('星めぐりの歌');
  });

  test('本文入力欄が表示されること', async ({ trackPage }) => {
    await expect(trackPage.editor.textarea).toBeVisible();
  });

  test('本文入力欄が空欄であること', async ({ trackPage }) => {
    expect(await trackPage.editor.textarea.textContent()).toBe('');
  });
});

test.describe('機能と遷移', () => {
  test('本文入力欄に入力すると、入力内容が反映されること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.fill('あかいめだまの　さそり');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      'あかいめだまの　さそり',
    );
  });

  test('本文入力欄でBackspaceキーを押下すると、入力済の文字は削除されず末尾に🐾が入力されること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.fill('あかいめだまの　さそり');
    await trackPage.editor.textarea.press('Backspace');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      'あかいめだまの　さそり🐾',
    );
  });

  test('本文入力欄でDeleteキーを押下すると、入力済の文字は削除されず末尾に🐾が入力されること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.fill('あかいめだまの　さそり');
    await trackPage.editor.textarea.press('Delete');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      'あかいめだまの　さそり🐾',
    );
  });

  test.skip('本文入力欄でCtrl+zキーを押下すると、入力済の文字は削除されず末尾に🐾が入力されること', async ({
    trackPage,
  }) => {
    // テスト環境ではCtrl+zが動作しているため対応保留
    await trackPage.editor.textarea.fill('あかいめだまの　さそり');
    await trackPage.editor.textarea.press('Control+Z');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      'あかいめだまの　さそり🐾',
    );
  });
});
