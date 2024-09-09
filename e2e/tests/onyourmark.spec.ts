import { test, expect } from '@playwright/test';

test.describe('表示', () => {
  test('主題入力欄が表示されていること', async ({ page }) => {
    await page.goto('/onyourmark');
    const input = await page.locator('input').textContent();
    expect(input).toBe('');
  });
  test('スタートボタンが表示されていること', async ({ page }) => {
    await page.goto('/onyourmark');
    const button = await page.locator('button').textContent();
    expect(button).toBe('スタート');
  });
});

test.describe('操作', () => {
  test('スタートボタンをクリックすると、/notes に遷移すること', async ({
    page,
  }) => {
    await page.goto('/onyourmark');
    await page.locator('button').click();
    expect(page.url()).toBe('/notes');
  });
});
