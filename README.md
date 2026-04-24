# entif-ai

`entif-ai` is the constitutional monorepo for the Rosetta provenance kernel, the Source Substrate, the Ingress Refinery, the canonical corpus cache, and read-only projection adapters.

Think of this repo like a shipyard, not a showroom. The hull, engine mounts, and navigation rules matter first. Pretty passenger cabins come later.

## What Exists Today

This bootstrap is intentionally headless and receipts-first:

- Rosetta tiles are canonicalized, hashed, and given stable content IDs.
- RRP receipts can be created, signed, bundled, and verified.
- Source systems, records, manifestations, packages, corrections, and trust matrices are modeled as first-class artifacts.
- The refinery turns fixture-backed source artifacts plus raw text into a canonical artifact and linked provenance receipts.
- The canonical cache clusters artifacts across byte, manifestation, record-family, and conceptual lanes without auto-merging the broader matches.
- OB1, Prism, and Mission Control are projected as read-only sidecar, shadow, and operator-shell views.

## What Does Not Exist Yet

This is not yet a production ingestion platform:

- No live source adapters are fetching from DataCite, Crossref, Zenodo, or other upstream systems yet.
- No durable database-backed cache exists yet.
- No evidence-derived trust scoring engine exists yet; the trust matrix is currently a formal model plus bootstrap fixture values.
- No full SHACL or RDF execution engine is running yet; conformance is currently a lightweight required-field validator plus emitted SHACL-like shapes.
- No real OB1 or Prism runtime integration exists yet beyond projection contracts.

The honest label is: a working provenance-kernel prototype with source-aware bootstrap fixtures.

## Workspace Commands

```bash
pnpm install --no-frozen-lockfile
pnpm run sync
pnpm run lint
pnpm run typecheck
pnpm run test
pnpm run build
pnpm run verify
pnpm run demo
pnpm run api
```

## Starting A New Agent Session

New Codex or agent sessions should start here:

1. Read this `README.md`.
2. Read `docs/handoffs/CURRENT_HANDOFF.md`.
3. Check branch state with `git status --short --branch`.
4. If continuing merged work, sync `main` with `git fetch origin` and `git pull --ff-only origin main`.
5. Read the active GitHub issue/PR named in the handoff.
6. Run the narrowest validation that matches the changed surface.

Every stable branch should update `docs/handoffs/CURRENT_HANDOFF.md` before its final push. If documentation changed, also run `pnpm run docs:intake` so the intake ledger stays current.

## Handoff And Branch Protocol

- Work on focused `codex/` feature branches.
- Treat each stable branch as a handoff boundary.
- Commit only coherent, validated slices.
- Keep `docs/handoffs/CURRENT_HANDOFF.md` current enough that a new account or machine can resume without rereading the whole docs corpus.
- Record published GitHub issue URLs and state changes in `docs/intake/github-issue-ledger.json`.
- Use local issue drafts under `docs/intake/issue-drafts/` as the review gate before creating remote GitHub issues.
- Do not perform large-scale semantic corpus ingest until the Ingress Refinery and canonical corpus cache are ready.
- Prefer targeted validation during development; use `pnpm run verify` when a branch changes shared contracts or before claiming a broad green state.

## Repository Guide

- `docs/ARCHITECTURE.md`
  Brief layer map, current execution model, and explicit "real vs fixture-backed vs not yet" status.
- `docs/governance/AUTHORITY_STACK.md`
  Governing handoff stack and repo-state doctrine.
- `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md`
  Monorepo structure and boundaries.
- `docs/governance/DONOR_FIT_MAP.md`
  What was seeded from donor patterns and what was not.
- `docs/governance/SERVICE_INVENTORY.md`
  Current services, packages, and roles.
- `docs/governance/UPSTREAM_AND_BACKUP_PLAN.md`
  Upstream authority posture and backup expectations.
- `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`
  Bootstrap execution spine.
- `docs/packs/PACK_SUITE_INDEX.md`
  Pack inventory.
- `docs/handoffs/2026-04-13-bootstrap-handoff.md`
  Historical bootstrap baton-pass receipt.
- `docs/handoffs/CURRENT_HANDOFF.md`
  Active baton-pass receipt for future Codex and agent sessions.
- `docs/intake/README.md`
  Documentation intake workflow, local issue drafts, and GitHub issue ledger policy.

## Package Map

- `packages/rosetta-canon`
  Deterministic JSON and text normalization helpers.
- `packages/rosetta-cid`
  Content hashing and CID string helpers.
- `packages/rosetta-core`
  Tile envelope construction and integrity verification.
- `packages/rosetta-schemas`
  Lightweight payload validation and conformance bundle emission.
- `packages/rosetta-receipts`
  Receipt creation, signing, bundle construction, and verification.
- `packages/rosetta-guard`
  Minimal parse-only policy evaluator.
- `packages/rosetta-tapestry`
  Receipt-bundle tapestry compilation.
- `packages/rosetta-store`
  In-memory tile store with rights checks.
- `packages/source-substrate`
  Source-system, record, manifestation, package, correction, and trust-matrix models.
- `packages/source-registry`
  Bootstrap registry/profile fixtures for Tier 0 and Tier 1 sources.
- `packages/ingress-refinery`
  Fixture-backed parse-only refinement from source artifacts plus raw text into canonical artifacts and receipts.
- `packages/canonical-cache`
  In-memory clustering and lifecycle event retention.
- `packages/projection-adapters`
  Read-only OB1, Prism, and Mission Control projection contracts.

Each package now has its own `README.md` describing purpose, current functionality, roadmap, and known limits.

## Current Apps

- `apps/rosetta-cli`
  Emits a bootstrap snapshot and verification report.
- `apps/rosetta-api`
  Serves `/health`, `/registry`, and `/demo` for the current bootstrap slice.
- `apps/rosetta-operator`
  Placeholder operator-shell surface, not the constitutional center.

## Commit Protocol

- Local commits follow Conventional Commits.
- Commit-message enforcement is wired through Husky and commitlint.
- `nx release` is not configured yet, but the commit history is being shaped so changelog/release automation can land cleanly later.
