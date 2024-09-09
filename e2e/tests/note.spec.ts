import { test, expect } from '@playwright/test';

test.describe('表示', () => {
  test('Subjectが表示されていること', async ({ page }) => {
    await page.goto('/note?subject=ぴよぴよ');
    const subject = await page.locator('h2').textContent();
    expect(subject).toBe('ぴよぴよ');
  });
  test('Content入力欄が表示されていること', async ({ page }) => {
    await page.goto('/note');
    const content = await page.locator('textarea').textContent();
    expect(content).toBe('');
  });
  test('保存ボタンが表示されていること', async ({ page }) => {
    await page.goto('/note');
    const button = page.getByText('保存');
    await expect(button).toBeVisible();
  });
  test('コピーボタンが表示されていること', async ({ page }) => {
    await page.goto('/note');
    const button = page.getByText('コピー');
    await expect(button).toBeVisible();
  });
});

test.describe('操作', () => {
  test('Content入力欄に入力すると、Contentが更新されること', async ({
    page,
  }) => {
    await page.goto('/note');
    const textarea = page.locator('textarea');
    await textarea.fill('ぴよぴよ');
    expect(await textarea.inputValue()).toBe('ぴよぴよ');
  });
  test('保存ボタンをクリックすると、Contentが保存されること', async ({
    page,
  }) => {
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toBe('ぴよぴよ');
      await dialog.accept();
    });
    await page.goto('/note');
    await page.locator('textarea').fill('ぴよぴよ');
    await page.getByText('保存').click();
  });
  test('コピーボタンをクリックすると、Contentがクリップボードにコピーされること', async ({
    context,
    page,
  }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.goto('/note');
    await page.locator('textarea').fill('ぴよぴよ');
    await page.getByText('コピー').click();

    const clipboard = await page.evaluate(async () => {
      return navigator.clipboard.readText();
    });
    expect(clipboard).toBe('ぴよぴよ');
  });
});
