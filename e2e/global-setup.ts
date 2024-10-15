import { request } from '@playwright/test';
import { expect } from './extendedTest';

async function globalSetup() {
  const context = await request.newContext();
  await context.delete(
    `${process.env.VITE_API_URL}/users/${process.env.VITE_FIREBASE_USER_ID}/notes`,
  );

  [...Array(3)].map(async (_, i) => {
    const id = `00000000-0000-0000-0000-00000000000${i + 1}`;
    const response = await context.put(
      `${process.env.VITE_API_URL}/notes/${id}`,
      {
        data: {
          id,
          subject: `メモ${i + 1}`,
          content: `メモ${i + 1}の本文`,
          userId: process.env.VITE_FIREBASE_USER_ID,
        },
        headers: { 'Content-Type': 'application/json' },
      },
    );
    expect(response.ok()).toBeTruthy();
  });
}

export default globalSetup;
