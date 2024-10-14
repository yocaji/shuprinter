import { test, expect } from '../extendedTest';

test.beforeEach(async ({ homePage, auth }) => {
  await auth.login(homePage.page);
  await homePage.notes.self.waitFor();
  await homePage.notes.editSubjectButton(0).click();
});

test.describe('表示', () => {
  test('Subject編集欄が表示されること', async ({ homePage }) => {
    await expect(homePage.editSubjectDialog.textbox).toBeVisible();
  });

  test('閉じるボタンが表示されること', async ({ homePage }) => {
    await expect(homePage.editSubjectDialog.cancelButton).toBeVisible();
  });

  test('保存ボタンが表示されること', async ({ homePage }) => {
    await expect(homePage.editSubjectDialog.saveButton).toBeVisible();
  });
});

test.describe('機能と遷移', () => {
  test('閉じるボタンをクリックするとダイアログが非表示となること', async ({
    homePage,
  }) => {
    await homePage.editSubjectDialog.cancelButton.click();
    await expect(homePage.editSubjectDialog.self).not.toBeVisible();
  });

  test('Subject編集後に閉じるボタンをクリックすると編集前のSubjectが表示されること', async ({
    homePage,
  }) => {
    await homePage.editSubjectDialog.textbox.fill('春と修羅　宮沢賢治');
    await homePage.editSubjectDialog.cancelButton.click();
    expect(await homePage.notes.subject(0).textContent()).toBe(
      '『黒影集』の序詞',
    );
  });

  test('Subject編集後に保存ボタンをクリックすると編集前のSubjectが表示されること', async ({
    homePage,
  }) => {
    await homePage.editSubjectDialog.textbox.fill('春と修羅　宮沢賢治');
    await homePage.editSubjectDialog.saveButton.click();
    expect(await homePage.notes.subject(0).textContent()).toBe(
      '春と修羅　宮沢賢治',
    );
  });
});
