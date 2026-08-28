# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: site.spec.ts >> homepage and article have no serious or critical axe findings
- Location: tests/features/site.spec.ts:89:1

# Error details

```
Error: expect(received).toEqual(expected) // deep equality

- Expected  -   1
+ Received  + 268

- Array []
+ Array [
+   Object {
+     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
+     "help": "Elements must meet minimum color contrast ratio thresholds",
+     "helpUrl": "https://dequeuniversity.com/rules/axe/4.13/color-contrast?application=playwright",
+     "id": "color-contrast",
+     "impact": "serious",
+     "nodes": Array [
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.2pt (12.32px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"content-card\">",
+                 "target": Array [
+                   "li:nth-child(1) > .content-card",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"eyebrow\">research</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(1) > .content-card > .card-meta > .eyebrow",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.2pt (12.32px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"content-card\">",
+                 "target": Array [
+                   "li:nth-child(2) > .content-card",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"eyebrow\">research</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(2) > .content-card > .card-meta > .eyebrow",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.2pt (12.32px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"content-card\">",
+                 "target": Array [
+                   "li:nth-child(3) > .content-card",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"eyebrow\">project</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(3) > .content-card > .card-meta > .eyebrow",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.2pt (12.32px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article class=\"content-card\">",
+                 "target": Array [
+                   "li:nth-child(4) > .content-card",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.2pt (12.32px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span class=\"eyebrow\">research</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "li:nth-child(4) > .content-card > .card-meta > .eyebrow",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.4pt (12.48px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.4pt (12.48px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article><span>01</span><h3>Receipts before rhetoric</h3><p>Claims should remain traceable to evidence, decisions, and the artifacts that produced them.</p></article>",
+                 "target": Array [
+                   ".principle-grid > article:nth-child(1)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.4pt (12.48px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span>01</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "article:nth-child(1) > span",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.4pt (12.48px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.4pt (12.48px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article><span>02</span><h3>Static where possible</h3><p>The public surface ships as durable HTML. JavaScript earns its place only when interaction needs it.</p></article>",
+                 "target": Array [
+                   "article:nth-child(2)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.4pt (12.48px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span>02</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "article:nth-child(2) > span",
+         ],
+       },
+       Object {
+         "all": Array [],
+         "any": Array [
+           Object {
+             "data": Object {
+               "bgColor": "#ffffff",
+               "contrastRatio": 3.01,
+               "expectedContrastRatio": "4.5:1",
+               "fgColor": "#f36c13",
+               "fontSize": "9.4pt (12.48px)",
+               "fontWeight": "bold",
+               "messageKey": null,
+             },
+             "id": "color-contrast",
+             "impact": "serious",
+             "message": "Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.4pt (12.48px), font weight: bold). Expected contrast ratio of 4.5:1",
+             "relatedNodes": Array [
+               Object {
+                 "html": "<article><span>03</span><h3>Humans own publication</h3><p>Automation may discover, draft, verify, and propose. Public truth changes only through reviewable repository history.</p></article>",
+                 "target": Array [
+                   "article:nth-child(3)",
+                 ],
+               },
+             ],
+           },
+         ],
+         "failureSummary": "Fix any of the following:
+   Element has insufficient color contrast of 3.01 (foreground color: #f36c13, background color: #ffffff, font size: 9.4pt (12.48px), font weight: bold). Expected contrast ratio of 4.5:1",
+         "html": "<span>03</span>",
+         "impact": "serious",
+         "none": Array [],
+         "target": Array [
+           "article:nth-child(3) > span",
+         ],
+       },
+     ],
+     "tags": Array [
+       "cat.color",
+       "wcag2aa",
+       "wcag143",
+       "TTv5",
+       "TT13.c",
+       "EN-301-549",
+       "EN-9.1.4.3",
+       "ACT",
+       "RGAAv4",
+       "RGAA-3.2.1",
+     ],
+   },
+ ]
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - link "Skip to main content" [ref=e3] [cursor=pointer]:
      - /url: "#main-content"
    - generic [ref=e4]:
      - link "Entif AI home" [ref=e5] [cursor=pointer]:
        - /url: /rosetta
        - generic [ref=e6]: Entif AI
      - navigation "Primary navigation" [ref=e7]:
        - list [ref=e8]:
          - listitem [ref=e9]:
            - link "Research" [ref=e10] [cursor=pointer]:
              - /url: /rosetta#research
          - listitem [ref=e11]:
            - link "Rosetta" [ref=e12] [cursor=pointer]:
              - /url: /rosettaprojects/rosetta/
          - listitem [ref=e13]:
            - link "Principles" [ref=e14] [cursor=pointer]:
              - /url: /rosetta#principles
          - listitem [ref=e15]:
            - link "GitHub" [ref=e16] [cursor=pointer]:
              - /url: https://github.com/entif-ai/rosetta
  - main [ref=e17]:
    - generic [ref=e19]:
      - paragraph [ref=e20]: Entif AI · Open research
      - heading "Meaning should survive the machine that reasons over it." [level=1] [ref=e21]
      - paragraph [ref=e22]: Entif AI develops Rosetta, an open research and engineering program for semantic representation, provenance, memory, and governed agentic systems.
      - generic [ref=e23]:
        - link "Explore the research" [ref=e24] [cursor=pointer]:
          - /url: "#research"
        - link "Meet Rosetta" [ref=e25] [cursor=pointer]:
          - /url: /rosettaprojects/rosetta/
    - region "Entif research focus" [ref=e31]:
      - generic [ref=e32]:
        - paragraph [ref=e33]:
          - strong [ref=e34]: Represent
          - generic [ref=e35]: meaning explicitly
        - paragraph [ref=e36]:
          - strong [ref=e37]: Remember
          - generic [ref=e38]: with provenance
        - paragraph [ref=e39]:
          - strong [ref=e40]: Reason
          - generic [ref=e41]: across bounded context
        - paragraph [ref=e42]:
          - strong [ref=e43]: Govern
          - generic [ref=e44]: before mutation
    - generic [ref=e45]:
      - generic [ref=e46]:
        - generic [ref=e47]:
          - paragraph [ref=e48]: Research lattice
          - heading "Ideas that connect instead of pile up." [level=2] [ref=e49]
        - paragraph [ref=e50]: Public pages are compiled from Markdown in the Rosetta repository and linked by shared projects and topics at build time.
      - region "Ideas that connect instead of pile up." [ref=e52]:
        - group "Filter research by topic" [ref=e53]:
          - button "All" [pressed] [ref=e54] [cursor=pointer]
          - button "agentic-systems" [ref=e55] [cursor=pointer]
          - button "context" [ref=e56] [cursor=pointer]
          - button "governance" [ref=e57] [cursor=pointer]
          - button "memory" [ref=e58] [cursor=pointer]
          - button "orchestration" [ref=e59] [cursor=pointer]
          - button "provenance" [ref=e60] [cursor=pointer]
          - button "semantic-representation" [ref=e61] [cursor=pointer]
        - status [ref=e62]: 4 results
        - list [ref=e63]:
          - listitem [ref=e64]:
            - article [ref=e65]:
              - generic [ref=e66]:
                - generic [ref=e67]: research
                - generic [ref=e68]: rosetta
              - heading [level=3] [ref=e69]:
                - link "Agentic memory needs more than retrieval↗" [ref=e70] [cursor=pointer]:
                  - /url: /rosettaresearch/agentic-memory/
              - paragraph [ref=e71]: A durable agent memory should preserve source identity, evidence, lifecycle, rights, and uncertainty instead of reducing memory to similarity search.
              - list "Topics for Agentic memory needs more than retrieval" [ref=e72]:
                - listitem [ref=e73]: agentic-systems
                - listitem [ref=e74]: memory
                - listitem [ref=e75]: provenance
          - listitem [ref=e76]:
            - article [ref=e77]:
              - generic [ref=e78]:
                - generic [ref=e79]: research
                - generic [ref=e80]: rosetta
              - heading [level=3] [ref=e81]:
                - link "Ontological Mixture of Concepts↗" [ref=e82] [cursor=pointer]:
                  - /url: /rosettaresearch/ontological-mixture-of-concepts/
              - paragraph [ref=e83]: OMOC explores routing reasoning work by problem-local concept signatures, ambiguity, evidence, and stakes instead of static agent identities.
              - list "Topics for Ontological Mixture of Concepts" [ref=e84]:
                - listitem [ref=e85]: semantic-representation
                - listitem [ref=e86]: agentic-systems
                - listitem [ref=e87]: orchestration
          - listitem [ref=e88]:
            - article [ref=e89]:
              - generic [ref=e90]:
                - generic [ref=e91]: project
                - generic [ref=e92]: rosetta
              - heading [level=3] [ref=e93]:
                - link "Rosetta↗" [ref=e94] [cursor=pointer]:
                  - /url: /rosettaprojects/rosetta/
              - paragraph [ref=e95]: Rosetta is Entif AI's open research program for machine-readable meaning, provenance, memory, and governed agentic computation.
              - list "Topics for Rosetta" [ref=e96]:
                - listitem [ref=e97]: semantic-representation
                - listitem [ref=e98]: provenance
                - listitem [ref=e99]: agentic-systems
                - listitem [ref=e100]: governance
          - listitem [ref=e101]:
            - article [ref=e102]:
              - generic [ref=e103]:
                - generic [ref=e104]: research
                - generic [ref=e105]: rosetta
              - heading [level=3] [ref=e106]:
                - link "Cognitive tapestries via semantic latticing↗" [ref=e107] [cursor=pointer]:
                  - /url: /rosettaresearch/semantic-latticing/
              - paragraph [ref=e108]: Semantic latticing treats context as a structured composition of concepts and relations rather than a flat accumulation of prose fragments.
              - list "Topics for Cognitive tapestries via semantic latticing" [ref=e109]:
                - listitem [ref=e110]: semantic-representation
                - listitem [ref=e111]: context
                - listitem [ref=e112]: agentic-systems
    - generic [ref=e114]:
      - generic [ref=e115]:
        - paragraph [ref=e116]: Current thread
        - heading "Rosetta" [level=2] [ref=e117]
      - generic [ref=e118]:
        - paragraph [ref=e119]: Rosetta is Entif AI's open research program for machine-readable meaning, provenance, memory, and governed agentic computation.
        - link "Read the work" [ref=e120] [cursor=pointer]:
          - /url: /rosettaprojects/rosetta/
          - text: Read the work →
    - generic [ref=e121]:
      - generic [ref=e123]:
        - paragraph [ref=e124]: Operating principles
        - heading "Build the proof into the shape of the system." [level=2] [ref=e125]
      - generic [ref=e126]:
        - article [ref=e127]:
          - text: "01"
          - heading "Receipts before rhetoric" [level=3] [ref=e128]
          - paragraph [ref=e129]: Claims should remain traceable to evidence, decisions, and the artifacts that produced them.
        - article [ref=e130]:
          - text: "02"
          - heading "Static where possible" [level=3] [ref=e131]
          - paragraph [ref=e132]: The public surface ships as durable HTML. JavaScript earns its place only when interaction needs it.
        - article [ref=e133]:
          - text: "03"
          - heading "Humans own publication" [level=3] [ref=e134]
          - paragraph [ref=e135]: Automation may discover, draft, verify, and propose. Public truth changes only through reviewable repository history.
  - contentinfo [ref=e136]:
    - generic [ref=e137]:
      - paragraph [ref=e138]:
        - strong [ref=e139]: Entif AI
        - text: · Open research, inspectable systems.
      - paragraph [ref=e140]: © 2026 Entif AI. Built from the Rosetta repository.
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
> 9  |   expect(serious).toEqual([]);
     |                   ^ Error: expect(received).toEqual(expected) // deep equality
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
  38 |   await expect(filter).toHaveAttribute('aria-pressed', 'true');
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