import { test as base } from './auth.setup';
import { HomePage } from './pom/home';
import { ByePage } from './pom/bye';

type Fixtures = {
  homePage: HomePage;
  byePage: ByePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(homePage);
  },
  byePage: async ({ page, auth }, use) => {
    await auth.login(page);
    const byePage = new ByePage(page);
    await byePage.goto();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(byePage);
  },
});

export { expect } from '@playwright/test';
