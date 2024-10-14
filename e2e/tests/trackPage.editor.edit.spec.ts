import { test, expect } from '../extendedTest';

test.beforeEach(async ({ homePage, auth }) => {
  await auth.login(homePage.page);
  await homePage.notes.note(0).click();
});

test.describe('表示', () => {
  test('クリックしたメモの件名が表示されること', async ({ trackPage }) => {
    expect(await trackPage.editor.subject.textContent()).toBe('星めぐりの歌');
  });

  test('クリックしたメモの本文が本文入力欄に表示されること', async ({
    trackPage,
  }) => {
    expect(await trackPage.editor.textarea.textContent()).toBe(
      'あかいめだまの　さそり',
    );
  });
});

test.describe('機能と遷移', () => {
  test('本文入力欄に入力すると、入力内容が反映されること', async ({
    trackPage,
  }) => {
    await trackPage.editor.textarea.press('@');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      `あかいめだまの　さそり@`,
    );
  });
});
