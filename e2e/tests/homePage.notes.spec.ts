import { test, expect } from '../extendedTest';

test.describe('表示', async () => {
  test.beforeEach(async ({ homePage, auth }) => {
    await auth.login(homePage.page);
    await homePage.notes.self.waitFor();
  });

  test('メモが3件表示されること', async ({ homePage, auth }) => {
    expect(await homePage.notes.getNotesCount()).toBe(3);
  });

  test('1件目のタイトルが登録したタイトルと一致すること', async ({
    homePage,
  }) => {
    expect(await homePage.notes.subject(0).textContent()).toBe(
      '『黒影集』の序詞',
    );
  });

  test('1件目の最終更新日時が登録した日時と一致すること', async ({
    homePage,
  }) => {
    expect(await homePage.notes.updatedAt(0).textContent()).toBe(
      '2024-10-13 21:15',
    );
  });

  test('1件目の編集ボタンが表示されること', async ({ homePage }) => {
    await expect(homePage.notes.editSubjectButton(0)).toBeVisible();
  });

  test('1件目の削除ボタンが表示されること', async ({ homePage }) => {
    await expect(homePage.notes.deleteNoteButton(0)).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test.beforeEach(async ({ homePage, auth }) => {
    await auth.login(homePage.page);
    await homePage.notes.self.waitFor();
  });

  test('メモをクリックするとメモ編集ページに遷移すること', async ({
    homePage,
  }) => {
    await homePage.notes.note(1).click();
    await expect(homePage.page).toHaveURL('/track');
  });

  test('メモのSubject編集ボタンをクリックするとSubject編集ダイアログが表示されること', async ({
    homePage,
  }) => {
    await homePage.notes.editSubjectButton(0).click();
    await expect(homePage.editSubjectDialog.self).toBeVisible();
  });

  test('メモの削除ボタンをクリックするとメモ削除確認ダイアログが表示されること', async ({
    homePage,
  }) => {
    homePage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('このメモを削除しますか？');
      await dialog.dismiss();
    });
    await homePage.notes.deleteNoteButton(0).click();
  });
});
