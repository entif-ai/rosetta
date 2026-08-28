# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> topic filter works without navigating away
- Location: tests/features/site.spec.ts:33:1

# Error details

```
Error: expect(locator).toHaveAttribute(expected) failed

Locator:  getByRole('button', { name: 'agentic-systems' })
Expected: "true"
Received: "false"
Timeout:  5000ms

Call log:
  - Expect "toHaveAttribute" with timeout 5000ms
  - waiting for getByRole('button', { name: 'agentic-systems' })
    14 × locator resolved to <button type="button" aria-pressed="false">agentic-systems</button>
       - unexpected value "false"

```

```yaml
- button "agentic-systems"
```

# Test source

```ts
  1  | import AxeBuilder from '@axe-core/playwright';
  2  | import { expect, test, type Page } from '@playwright/test';
  3  | 
  4  | const assertNoSeriousA11yViolations = async (page: Page): Promise<void> => {
  5  |   const results = await new AxeBuilder({ page }).analyze();
  6  |   const serious = results.violations.filter(
  7  |     ({ impact }) => impact === 'serious' || impact === 'critical'
  8  |   );
  9  |   expect(serious).toEqual([]);
  10 | };
  11 | 
  12 | test('homepage renders the Entif identity and navigable research', async ({
  13 |   page,
  14 | }) => {
  15 |   await page.goto('./');
  16 | 
  17 |   await expect(page).toHaveTitle('Entif AI');
  18 |   await expect(page.getByRole('heading', { level: 1 })).toContainText(
  19 |     'Meaning should survive'
  20 |   );
  21 |   await expect(page.getByRole('link', { name: 'Entif AI home' })).toBeVisible();
  22 |   await expect(page.locator('.hero-mark img')).toHaveAttribute(
  23 |     'src',
  24 |     /entif-logo\.webp/
  25 |   );
  26 |   await expect(
  27 |     page.getByRole('heading', {
  28 |       name: 'Ideas that connect instead of pile up.',
  29 |     })
  30 |   ).toBeVisible();
  31 | });
  32 | 
  33 | test('topic filter works without navigating away', async ({ page }) => {
  34 |   await page.goto('./');
  35 |   const filter = page.getByRole('button', { name: 'agentic-systems' });
  36 |   await filter.click();
  37 | 
> 38 |   await expect(filter).toHaveAttribute('aria-pressed', 'true');
     |                        ^ Error: expect(locator).toHaveAttribute(expected) failed
  39 |   await expect(page.getByRole('status')).toContainText(/result/);
  40 |   await expect(
  41 |     page.getByRole('article').filter({ hasText: 'Agentic memory' })
  42 |   ).toBeVisible();
  43 | });
  44 | 
  45 | test('published article renders repository metadata and related work', async ({
  46 |   page,
  47 | }) => {
  48 |   await page.goto('./research/agentic-memory/');
  49 | 
  50 |   await expect(
  51 |     page.getByRole('heading', {
  52 |       level: 1,
  53 |       name: 'Agentic memory needs more than retrieval',
  54 |     })
  55 |   ).toBeVisible();
  56 |   await expect(page.getByText('entif.research.agentic-memory')).toBeVisible();
  57 |   await expect(
  58 |     page.getByRole('heading', { name: 'Continue through the lattice.' })
  59 |   ).toBeVisible();
  60 | });
  61 | 
  62 | test('draft content is not emitted as a public route', async ({ page }) => {
  63 |   const response = await page.goto('./research/editorial-pipeline-draft/');
  64 |   expect(response?.status()).toBe(404);
  65 | });
  66 | 
  67 | test('keyboard users can reach the skip link first', async ({ page }) => {
  68 |   await page.goto('./');
  69 |   await page.keyboard.press('Tab');
  70 |   await expect(
  71 |     page.getByRole('link', { name: 'Skip to main content' })
  72 |   ).toBeFocused();
  73 | });
  74 | 
  75 | test('mobile viewport does not produce horizontal page overflow', async ({
  76 |   page,
  77 | }) => {
  78 |   await page.setViewportSize({ width: 390, height: 844 });
  79 |   await page.goto('./');
  80 | 
  81 |   const overflow = await page.evaluate(
  82 |     () =>
  83 |       document.documentElement.scrollWidth >
  84 |       document.documentElement.clientWidth
  85 |   );
  86 |   expect(overflow).toBe(false);
  87 | });
  88 | 
  89 | test('homepage and article have no serious or critical axe findings', async ({
  90 |   page,
  91 | }) => {
  92 |   await page.goto('./');
  93 |   await assertNoSeriousA11yViolations(page);
  94 | 
  95 |   await page.goto('./research/agentic-memory/');
  96 |   await assertNoSeriousA11yViolations(page);
  97 | });
  98 | 
```