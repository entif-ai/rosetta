# Entif AI site

Static public site for Entif AI, compiled with Astro and deployed from the Rosetta monorepo.

## Design constraints

- Static HTML by default; React is reserved for interactive islands.
- Public content is authored in `apps/entif-site/content/**/*.md` and validated at build time.
- Homepage narrative copy lives in `apps/entif-site/content/pages/home.md`; research and project entries remain in their dedicated content subdirectories.
- `status: published` is required before a content entry receives a public route or homepage publication.
- Stable content IDs, topics, project references, and explicit relations are machine-readable frontmatter for routed research/project entries.
- Related-content links are generated deterministically from explicit relations, shared projects, and shared topics.
- Common index/informational page anatomy is owned by `src/layouts/ContentPageLayout.astro`; individual pages compose content into that shared shell rather than copy its heading, spacing, and responsive structure.
- The current Entif logo lives at `public/brand/entif-logo.webp` and is derived from the project-provided source artwork.
- Styling uses local CSS and system fonts. No UI framework or external font request is required.

Cross-project design priorities come from [`../../docs/governance/Genesis.md`](../../docs/governance/Genesis.md) and [`../../docs/governance/genesis/INTERFACE_AND_ACCESSIBILITY.md`](../../docs/governance/genesis/INTERFACE_AND_ACCESSIBILITY.md). Site-specific tokens, breakpoints, component decisions, and future light/dark `design.md` artifacts remain local to this application.

## Quality gates

From the repository root:

```sh
pnpm exec nx run entif-site:format:check
pnpm exec nx run entif-site:lint
pnpm exec nx run entif-site:typecheck
pnpm exec nx run entif-site:test
pnpm exec nx run entif-site:build
pnpm exec nx run entif-site:e2e
```

`verify` runs every non-browser gate. The feature suite uses Playwright plus axe and checks publication behavior, interactive filtering, keyboard access, responsive overflow, and serious/critical automated accessibility findings.

Project-owned UI tests locate rendered elements through stable `data-test-id` attributes. Test IDs describe semantic responsibility rather than localized copy, CSS, DOM position, or visual treatment. Accessibility semantics remain user-facing contracts and are tested independently; test hooks do not replace them. The cross-project rule is defined in [`../../docs/governance/genesis/ASSURANCE_AND_OPERATIONS.md`](../../docs/governance/genesis/ASSURANCE_AND_OPERATIONS.md).

## Deployment

The intended production target is the custom-domain root. Set `ENTIF_SITE_URL` to the authoritative origin, such as `https://entif.ai/`; Astro derives the correct base path from that origin. Repository-subpath URLs are staging/fallback behavior, not the canonical production route model.
