import { test, expect } from '../extendedTest';

test.describe('表示', () => {
  test.beforeEach(async ({ homePageAuthed }) => {
    await homePageAuthed.notes.editSubjectButton(0).click();
  });

  test('Subject編集欄が表示されること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.editSubjectDialog.textbox).toBeVisible();
  });

  test('閉じるボタンが表示されること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.editSubjectDialog.cancelButton).toBeVisible();
  });

  test('保存ボタンが表示されること', async ({ homePageAuthed }) => {
    await expect(homePageAuthed.editSubjectDialog.saveButton).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test('閉じるボタンをクリックするとダイアログが非表示となること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.notes.editSubjectButton(0).click();
    await homePageAuthed.editSubjectDialog.cancelButton.click();
    await expect(homePageAuthed.editSubjectDialog.area).not.toBeVisible();
  });

  test('Subject編集後に閉じるボタンをクリックすると編集前のSubjectが表示されること', async ({
    homePageAuthed,
  }) => {
    const currentSubject = await homePageAuthed.notes.subject(0).textContent();
    await homePageAuthed.notes.editSubjectButton(0).click();
    await homePageAuthed.editSubjectDialog.textbox.fill('星めぐりの歌');
    await homePageAuthed.editSubjectDialog.cancelButton.click();
    expect(await homePageAuthed.notes.subject(0).textContent()).toBe(
      currentSubject,
    );
  });

  test('Subject編集後に保存ボタンをクリックすると編集前のSubjectが表示されること', async ({
    homePageAuthed,
  }) => {
    await homePageAuthed.notes.editSubjectButton(0).click();
    await homePageAuthed.editSubjectDialog.textbox.fill('よだかの星');
    await homePageAuthed.editSubjectDialog.saveButton.click();
    expect(await homePageAuthed.notes.subject(0).textContent()).toBe(
      'よだかの星',
    );
  });
});
