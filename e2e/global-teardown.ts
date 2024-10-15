import { request } from '@playwright/test';

async function globalTeardown() {
  const context = await request.newContext();
  await context.delete(
    `${process.env.VITE_API_URL}/users/${process.env.VITE_FIREBASE_USER_ID}/notes`,
  );
}

export default globalTeardown;
