import { test, expect } from '../extendedTest';

test.describe('表示', () => {
  test.describe('未ログイン', () => {
    test('スタートエリアが表示されること', async ({ homePage }) => {
      await expect(homePage.starting.area).toBeVisible();
    });

    test('メモ一覧が表示されないこと', async ({ homePage }) => {
      await expect(homePage.notes.area).not.toBeVisible();
    });

    test('フッターが表示されること', async ({ homePage }) => {
      await expect(homePage.footer.area).toBeVisible();
    });
  });

  test.describe('ログイン済', () => {
    test.beforeEach(async ({ homePage, auth }) => {
      await auth.login(homePage.page);
    });

    test('スタートエリアが表示されること', async ({ homePage }) => {
      await expect(homePage.starting.area).toBeVisible();
    });

    test('メモ一覧が表示されること', async ({ homePage }) => {
      await expect(homePage.notes.area).toBeVisible();
    });

    test('フッターが表示されること', async ({ homePage }) => {
      await expect(homePage.footer.area).toBeVisible();
    });
  });

  test.describe('ログイン後ログアウト', () => {
    test.beforeEach(async ({ homePage, auth }) => {
      await auth.login(homePage.page);
      await homePage.notes.area.waitFor();
      await auth.logout(homePage.page);
    });

    test('メモ一覧が表示されないこと', async ({ homePage }) => {
      await expect(homePage.notes.area).not.toBeVisible();
    });
  });
});
