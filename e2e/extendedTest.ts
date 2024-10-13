import { test as base } from './auth.setup';
import { HomePage } from './pom/home';

type Fixtures = {
  homePage: HomePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(homePage);
  },
});

export { expect } from '@playwright/test';
