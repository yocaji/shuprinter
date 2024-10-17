import { test as base } from './auth.setup';
import { HomePage } from './pom/home';
import { TrackPage } from './pom/track';
import { ByePage } from './pom/bye';

type Fixtures = {
  homePage: HomePage;
  homePageAuthed: HomePage;
  trackPage: TrackPage;
  trackPageAuthed: TrackPage;
  byePage: ByePage;
};

export const test = base.extend<Fixtures>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(homePage);
  },
  homePageAuthed: async ({ page, auth }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await auth.login(homePage.page);
    await homePage.notes.note(0).waitFor();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(homePage);
  },
  trackPage: async ({ page }, use) => {
    const trackPage = new TrackPage(page);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await use(trackPage);
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
