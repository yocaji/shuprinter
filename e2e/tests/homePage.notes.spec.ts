import { test, expect } from '../extendedTest';

test.describe('表示', async () => {
  test.beforeEach(async ({ homePageAuthed, auth }) => {
    await auth.login(homePageAuthed.page);
    await homePageAuthed.notes.area.waitFor();
  });

  test('メモが3件表示されること', async ({ homePageAuthed }) => {
    expect(await homePageAuthed.notes.getNotesCount()).toBe(3);
  });

  test('1件目のメモの件名が表示されること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.notes.subject(0)).toBeVisible();
  });

  test.skip('1件目の最終更新日時が表示されること', async ({
    homePageAuthed,
  }) => {
    await expect(homePageAuthed.notes.updatedAt(0)).toBeVisible();
  });

  test('1件目の編集ボタンが表示されること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.notes.editSubjectButton(0)).toBeVisible();
  });

  test('1件目の削除ボタンが表示されること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.notes.deleteNoteButton(0)).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test.beforeEach(async ({ homePageAuthed, auth }) => {
    await auth.login(homePageAuthed.page);
    await homePageAuthed.notes.area.waitFor();
  });

  test('メモをクリックするとTrack画面に遷移すること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.notes.note(1).click();
    await expect(homePageAuthed.page).toHaveURL('/track');
  });

  test('メモのSubject編集ボタンをクリックするとSubject編集ダイアログが表示されること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.notes.editSubjectButton(0).click();
    await expect(homePageAuthed.editSubjectDialog.area).toBeVisible();
  });

  test('メモの削除ボタンをクリックするとメモ削除確認ダイアログが表示されること', async ({
    homePageAuthed,
  }) => {
    homePageAuthed.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('このメモを削除しますか？');
      await dialog.dismiss();
    });
    await homePageAuthed.notes.deleteNoteButton(0).click();
  });
});
