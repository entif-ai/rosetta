# entif-ai

`entif-ai` is the constitutional monorepo for the Rosetta provenance kernel, the Source Substrate, the Ingress Refinery, the canonical corpus cache, and read-only projection adapters.

## What This Bootstrap Proves

This first slice is intentionally headless and receipts-first:

- Rosetta tiles are canonicalized and content-addressed.
- RRP receipts can be signed, bundled, and zero-trust verified.
- Source systems, records, manifestations, packages, and trust matrices are first-class artifacts.
- The refinery begins with source intelligence, not just document chunks.
- The canonical cache clusters across byte, manifestation, record-family, and conceptual lanes without auto-merging.
- OB1, Prism, and Mission Control projections stay read-only.

Think of this repo like a shipyard, not a showroom. We are laying keel, bulkheads, and navigation law before we bolt on glamorous decks.

## Workspace Commands

```bash
pnpm install --no-frozen-lockfile
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run demo
```

## Governing Local Docs

- `docs/governance/AUTHORITY_STACK.md`
- `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md`
- `docs/governance/DONOR_FIT_MAP.md`
- `docs/governance/SERVICE_INVENTORY.md`
- `docs/governance/UPSTREAM_AND_BACKUP_PLAN.md`
- `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`
- `docs/packs/PACK_SUITE_INDEX.md`

## Current Packages

- `packages/rosetta-canon`
- `packages/rosetta-cid`
- `packages/rosetta-core`
- `packages/rosetta-schemas`
- `packages/rosetta-receipts`
- `packages/rosetta-guard`
- `packages/rosetta-tapestry`
- `packages/rosetta-store`
- `packages/source-substrate`
- `packages/source-registry`
- `packages/ingress-refinery`
- `packages/canonical-cache`
- `packages/projection-adapters`

## Current Apps

- `apps/rosetta-cli`
- `apps/rosetta-api`
- `apps/rosetta-operator`

The operator app is present as a future shell surface, but the governing semantic center remains Rosetta plus its packs and receipts.
