import { test, expect } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto('/');
  const title = await page.locator('h1').textContent();
  expect(title).toBe('Home Page');
});
