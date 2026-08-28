# Entif AI site

Static public site for Entif AI, compiled with Astro and deployed from the Rosetta monorepo.

## Design constraints

- Static HTML by default; React is reserved for interactive islands.
- Public content is authored in `docs/site/**/*.md` and validated at build time.
- `status: published` is required before a content entry receives a public route.
- Stable content IDs, topics, project references, and explicit relations are machine-readable frontmatter.
- Related-content links are generated deterministically from explicit relations, shared projects, and shared topics.
- The current Entif logo lives at `public/brand/entif-logo.webp` and is derived from the project-provided source artwork.
- Styling uses local CSS and system fonts. No UI framework or external font request is required.

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

## Deployment

The default canonical target is `https://entif-ai.github.io/rosetta/`. Set `ENTIF_SITE_URL` at build time when a custom domain becomes authoritative. Astro derives the required base path from that URL.
