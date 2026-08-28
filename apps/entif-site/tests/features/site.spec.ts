import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const articlePath = './tags/rosetta/2026/08/28/agentic-memory/index.html';

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

  await expect(page).toHaveTitle('Entif AI');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Meaning should survive'
  );
  await expect(
    page.getByRole('link', { name: 'Entif AI home' })
  ).toHaveAttribute('href', '/');
  await expect(page.locator('.hero-mark img')).toHaveAttribute(
    'src',
    '/brand/entif-logo.webp'
  );
  await expect(page.getByRole('link', { name: 'Tags' })).toHaveAttribute(
    'href',
    '/tags/'
  );
  await expect(page.getByRole('link', { name: 'Projects' })).toHaveAttribute(
    'href',
    '/projects/'
  );
});

test('topic filter works without navigating away', async ({ page }) => {
  await page.goto('./');
  const filter = page.getByRole('button', { name: 'agentic-systems' });
  await filter.click();

  await expect(filter).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByRole('status')).toContainText(/result/);
  await expect(
    page.getByRole('article').filter({ hasText: 'Agentic memory' })
  ).toBeVisible();
});

test('published post uses date-stamped tag routing and renders related work', async ({
  page,
}) => {
  await page.goto(articlePath);

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Agentic memory needs more than retrieval',
    })
  ).toBeVisible();
  await expect(page.getByText('entif.research.agentic-memory')).toBeVisible();
  await expect(
    page.getByRole('link', { name: 'rosetta' }).first()
  ).toHaveAttribute('href', '/tags/rosetta/');
  await expect(
    page.getByRole('heading', { name: 'Continue through the lattice.' })
  ).toBeVisible();
});

test('project, tag, team, and contact routes are generated at the site root', async ({
  page,
}) => {
  for (const route of [
    './projects/rosetta/',
    './tags/',
    './team/',
    './contact/',
  ]) {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  }
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
  await expect(
    page.getByRole('link', { name: 'Skip to main content' })
  ).toBeFocused();
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
