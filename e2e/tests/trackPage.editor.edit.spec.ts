import { test, expect } from '../extendedTest';

test.describe('表示', () => {
  test('クリックしたメモの件名が表示されること', async ({
    homePageAuthed,
    trackPage,
  }) => {
    const clickedSubject = await homePageAuthed.notes.subject(1).textContent();
    await homePageAuthed.notes.note(1).click();
    expect(await trackPage.editor.subject.textContent()).toBe(clickedSubject);
  });

  test('クリックしたメモの本文が本文入力欄に表示されること', async ({
    homePageAuthed,
    trackPage,
  }) => {
    const clickedSubject = await homePageAuthed.notes.subject(1).textContent();
    await homePageAuthed.notes.note(1).click();
    expect(await trackPage.editor.textarea.textContent()).toBe(
      `${clickedSubject}の本文`,
    );
  });
});

test.describe('機能と遷移', () => {
  test('本文入力欄に入力すると、入力内容が反映されること', async ({
    homePageAuthed,
    trackPage,
  }) => {
    const clickedSubject = await homePageAuthed.notes.subject(1).textContent();
    await homePageAuthed.notes.note(1).click();
    await trackPage.editor.textarea.press('@');
    expect(await trackPage.editor.textarea.inputValue()).toBe(
      `${clickedSubject}の本文@`,
    );
  });
});
