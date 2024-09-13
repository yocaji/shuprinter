import { test, expect } from '@playwright/test';

test.describe('表示', () => {
  test('主題入力欄が表示されていること', async ({ page }) => {
    await page.goto('/ready');
    const input = await page.locator('input').textContent();
    expect(input).toBe('');
  });
  test('スタートボタンが表示されていること', async ({ page }) => {
    await page.goto('/ready');
    const button = await page.locator('button').textContent();
    expect(button).toBe('スタート');
  });
  test('履歴一覧の見出しが表示されていること', async ({ page }) => {
    await page.goto('/ready');
    const title = page.getByText('最近このブラウザで作成したメモ');
    await expect(title).toBeVisible();
  });
  test('履歴が3件表示されていること', async ({ page }) => {
    await page.goto('/ready');
    const recordsTitle = page.locator('.record').count();
    expect(recordsTitle).toBe(3);
  });
  test('履歴の主題が表示されていること', async ({ page }) => {
    await page.goto('/ready');
    // 全ての.record要素のテキストを取得
    const subjects = await page.locator('.record > h2').allInnerTexts();
    expect(subjects).toEqual(['ぴよぴよ', 'ふかふか', 'ぱやぱや']);
  });
});

test.describe('操作', () => {
  test('スタートボタンをクリックすると、/notes に遷移すること', async ({
    page,
  }) => {
    await page.goto('/ready');
    await page.locator('button').click();
    expect(page.url()).toBe('/notes');
  });
});
