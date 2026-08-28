import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

const assertNoSeriousA11yViolations = async (page: Page): Promise<void> => {
  const results = await new AxeBuilder({ page }).analyze();
  const serious = results.violations.filter(
    ({ impact }) => impact === 'serious' || impact === 'critical'
  );
  expect(serious).toEqual([]);
};

test('homepage renders the Entif identity and navigable research', async ({
  page,
}) => {
  await page.goto('./');

  await expect(page).toHaveTitle('Entif AI');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Meaning should survive'
  );
  await expect(page.getByRole('link', { name: 'Entif AI home' })).toBeVisible();
  await expect(page.locator('.hero-mark img')).toHaveAttribute(
    'src',
    /entif-logo\.webp/
  );
  await expect(
    page.getByRole('heading', {
      name: 'Ideas that connect instead of pile up.',
    })
  ).toBeVisible();
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

test('published article renders repository metadata and related work', async ({
  page,
}) => {
  await page.goto('./research/agentic-memory/');

  await expect(
    page.getByRole('heading', {
      level: 1,
      name: 'Agentic memory needs more than retrieval',
    })
  ).toBeVisible();
  await expect(page.getByText('entif.research.agentic-memory')).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'Continue through the lattice.' })
  ).toBeVisible();
});

test('draft content is not emitted as a public route', async ({ page }) => {
  const response = await page.goto('./research/editorial-pipeline-draft/');
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

  await page.goto('./research/agentic-memory/');
  await assertNoSeriousA11yViolations(page);
});
