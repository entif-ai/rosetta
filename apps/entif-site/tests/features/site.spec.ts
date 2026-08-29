import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const articlePath = './tags/rosetta/2026/08/28/agentic-memory/index.html';

const byTestId = (page: Page, id: string) =>
  page.locator(`[data-test-id="${id}"]`);

const assertNoSeriousA11yViolations = async (page: Page): Promise<void> => {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    ({ impact }) => impact === 'serious' || impact === 'critical'
  );
  expect(serious).toEqual([]);
};

test('homepage renders the Entif identity and root navigation', async ({
  page,
}) => {
  await page.goto('./');

  await expect(byTestId(page, 'home-hero-heading')).toBeVisible();
  await expect(byTestId(page, 'home-philosophy-heading')).toBeVisible();
  await expect(byTestId(page, 'home-philosophy-body')).toBeVisible();
  await expect(byTestId(page, 'site-brand-home')).toHaveAttribute('href', '/');
  await expect(byTestId(page, 'home-hero-logo')).toHaveAttribute(
    'src',
    '/brand/entif-logo.webp'
  );
  await expect(byTestId(page, 'site-nav-tags')).toHaveAttribute(
    'href',
    '/tags/'
  );
  await expect(byTestId(page, 'site-nav-projects')).toHaveAttribute(
    'href',
    '/projects/'
  );
});

test('topic filter works without navigating away', async ({ page }) => {
  await page.goto('./');
  const initialUrl = page.url();
  const filter = byTestId(page, 'topic-filter-agentic-systems');

  await filter.click();

  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  expect(page.url()).toBe(initialUrl);
  await expect(byTestId(page, 'topic-result-count')).toBeVisible();
  await expect(
    byTestId(page, 'topic-card-entif.research.agentic-memory')
  ).toBeVisible();
});

test('published post uses date-stamped tag routing and renders related work', async ({
  page,
}) => {
  await page.goto(articlePath);

  await expect(byTestId(page, 'published-entry')).toHaveAttribute(
    'data-content-id',
    'entif.research.agentic-memory'
  );
  await expect(byTestId(page, 'published-entry-heading')).toBeVisible();
  await expect(byTestId(page, 'published-entry-content-id')).toBeVisible();
  await expect(byTestId(page, 'published-entry-route-tag')).toHaveAttribute(
    'href',
    '/tags/rosetta/'
  );
  await expect(byTestId(page, 'related-content')).toBeVisible();
});

test('shared index pages use the common content-page layout', async ({
  page,
}) => {
  for (const route of [
    './projects/',
    './tags/',
    './tags/rosetta/',
    './team/',
    './contact/',
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(byTestId(page, 'content-page-shell')).toBeVisible();
    await expect(byTestId(page, 'content-page-heading')).toBeVisible();
  }

  const projectResponse = await page.goto('./projects/rosetta/');
  expect(projectResponse?.status()).toBe(200);
  await expect(byTestId(page, 'published-entry')).toBeVisible();
});

test('draft content is not emitted as a public post route', async ({
  page,
}) => {
  const response = await page.goto(
    './tags/rosetta/2026/08/28/editorial-pipeline-draft/index.html'
  );
  expect(response?.status()).toBe(404);
});

test('keyboard users can reach the skip link first', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');
  await expect(byTestId(page, 'site-skip-link')).toBeFocused();
});

test('mobile viewport does not produce horizontal page overflow', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');

  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth >
      document.documentElement.clientWidth
  );
  expect(overflow).toBe(false);
});

test('homepage and article have no serious or critical axe findings', async ({
  page,
}) => {
  await page.goto('./');
  await assertNoSeriousA11yViolations(page);

  await page.goto(articlePath);
  await assertNoSeriousA11yViolations(page);
});
