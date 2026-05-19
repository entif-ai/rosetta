# Current Handoff

Status: active baton-pass for Codex and agent sessions
Date: 2026-05-04
Last updated: 2026-05-19
Current branch at time of update: `codex/rs-001-schema-catalog`
Current PR at time of update: pending publication

## Purpose

This file is the first document a fresh Codex session should read after `README.md`. It exists to reduce rediscovery cost when usage caps, accounts, machines, or sessions change.

Update this file whenever a branch reaches a stable state, especially before pushing a PR update or handing work to another session.

## Resume Protocol

1. Read `README.md`.
2. Read this file.
3. Check the active branch and worktree:
   - `git status --short --branch`
   - `git log --oneline --decorate -8`
4. If continuing merged work, sync `main` first:
   - `git switch main`
   - `git fetch origin`
   - `git pull --ff-only origin main`
5. Read the current issue/PR being worked.
6. Run the narrowest validation that matches the changed surface.
7. Before commit or merge, update this handoff and run `pnpm run docs:intake` if docs changed.

## Branch And PR Practice

- Use feature branches with the `codex/` prefix.
- Compartmentalize unrelated work into separate feature branches and separate PRs.
- Do not bundle independent fixes, planning docs, feature work, and cleanup unless one change is required to validate the other.
- Keep each branch scoped to one stable slice.
- Commit only after a stable state is reached.
- Follow Conventional Commits for every commit, with scopes where useful.
- Preserve commit semantics for future semantic versioning and changelog automation. `nx release` is not configured yet, but history should stay compatible with that future.
- Use red/green TDD for all code changes:
  - write or update failing tests first
  - run the focused test to confirm the red state
  - implement the smallest change that makes the test pass
  - keep the test in the normal validation path
- Do not add or refine functionality without tests covering the behavior and important failure/resilience cases.
- Every stable branch should update this handoff before final push.
- Every PR should identify:
  - source issue
  - changed files
  - validation run
  - known warnings or deferred risks
- After merge, close completed issues and update `docs/intake/github-issue-ledger.json` when issue states or URLs change.

## Documentation Intake Protocol

The docs corpus is indexed by:

- `pnpm run docs:intake`
- `tools/doc-intake/build-doc-intake.mjs`
- `docs/intake/doc-ledger.json`
- `docs/intake/doc-ledger.md`
- `docs/intake/github-issue-ledger.json`

Important rules:

- Do not perform large-scale Rosetta-native semantic corpus ingest yet.
- Do perform docs-intelligence extraction for planning now; repository source documents should be mined for requirements, intent, designs, priorities, and issue candidates without waiting for runtime ingestion readiness.
- The intake ledger fingerprints and orients docs; it is not the future canonical corpus cache.
- Top-matter dates are preferred over filename dates.
- Filename dates are preferred over filesystem mtime.
- Chat exports may include `Created`, `Updated`, and `Exported`; store those separately under `chronology.canonical`.
- Use `updatedAt` as the primary working date when present, but keep all chronology evidence.
- Local issue drafts are the review gate before creating remote GitHub issues.
- Active issue drafts are unpublished candidates.
- Published issue drafts must be archived under `docs/intake/issue-drafts/archive/`.
- `docs/intake/github-issue-ledger.json` must record published draft state with `draftStatus`, `activeDraftPath`, `archivedDraftPath`, issue number, state, and URL where known.

## GitHub State

Remote: `https://github.com/entif-ai/rosetta.git`

Merged:

- PR #1: `docs(intake): add documentation ledger and issue draft workflow`
- PR #5: `docs(backlog): define Text-Core MVP scope gate`
- PR #13: `feat(text-core): add source episode envelope`
- PR #18: `feat(text-core): add normalization fingerprints`
- PR #19: `feat(canonical-cache): add revision persistence`
- PR #20: `fix(rosetta-pipeline): stabilize pipeline slice`
- PR #21: `docs(intake): archive canonical cache draft`
- PR #22: `feat(text-core): add source observation transform receipts`

Open at time of update:

- Issue #33: `DI-009 Internal knowledge graph from DI extractions — cross-doc concept linking and issue refinement`
- Issue #69: `ROCK-3111-C: Define and enforce content-addressed pack_id algorithm`
- Issue #71: `ROCK-3111-C: Automated enforcement for the refinement-first rule`
- Issue #74: `ROCK-3111-C: Define and enforce dependency cycle detection for RRP packs`
- Issue #79: `RRP recipes/ and skills/ subtrees lack CI/schema enforcement`
- Issue #10: `TC-005 Promotion state machine and structured extracts`
- Issues #11, #12: follow-up Text-Core implementation issues
- Several newer docs-intelligence issues are also open from CT, OMOC, AC, and ROCK extractions; refresh with `gh issue list --repo entif-ai/rosetta --state open --limit 100` before selecting the next slice.

Closed at time of update:

- PR #61: `docs(intake): salvage unique PR 58 drafts`
- PR #59: `docs(intake): refresh docs intelligence graph state`
- PR #58: superseded duplicate OMOC extraction, closed without merge
- PR #56: `docs(attention-as-capital): extract Attention-as-Capital Analytics Platform`
- PR #55: `docs(rosetta-prd): pro-ext-research extraction v2`
- PR #54: `docs(intake): 20260410 Entif Rosetta PRDs Pro-Extended Research`
- PR #53: `docs(intelligence): extract omoc-swarm-gnosis-protocol`
- PR #22: `feat(text-core): add source observation transform receipts`
- PR #21: `docs(intake): archive canonical cache draft`
- PR #20: `fix(rosetta-pipeline): stabilize pipeline slice`
- PR #19: `feat(canonical-cache): add revision persistence`
- PR #18: `feat(text-core): add normalization fingerprints`
- PR #17: `chore(nx): use affected validation by default`
- PR #15: `fix(doc-intake): archive published issue drafts`
- Issue #2: `Build docs intake ledger and GitHub issue promotion workflow`
- Issue #3: `Re-run lean validation loop and checkpoint local receipts`
- Issue #4: `Define Text-Core MVP scope gate from governing docs`
- Issue #6: `TC-001 Source episode envelope and family classification`
- Issue #7: `TC-002 Chronology-aware normalization and fingerprints`
- Issue #8: `TC-003 Dedupe, revision graph, and cache persistence`
- Issue #9: `TC-004 Source to observation tiling and transform receipts`
- Issue #14: `Archive published docs intake issue drafts`

## Current Work Product

Current branch: `codex/rs-001-schema-catalog`
Source issues:

- https://github.com/entif-ai/rosetta/issues/1114

This branch implements the package-local `rosetta-schemas` schema catalog and authority map. The slice is code-backed and visibility-focused: it catalogs the existing schema families, validators, Agentic Messaging registry entries, conformance emitters, and downstream ownership boundaries without promoting reserved interfaces into runtime support.

Changed behavior:

- `packages/rosetta-schemas/src/lib/schema-catalog.ts` exports typed catalog entries plus `listSchemaCatalogEntries()`, `getSchemaCatalogEntry()`, and `validateSchemaCatalogCoverage()`.
- `packages/rosetta-schemas/src/lib/rosetta-schemas.ts` exports `SUPPORTED_TILE_KIND_REQUIRED_FIELDS` so catalog coverage checks follow the active validator surface.
- Catalog tests fail when supported tile-kind validators or registered Agentic Messaging profiles are missing, or when non-reserved entries lack docs/tests.
- `packages/rosetta-schemas/docs/schema-authority-map.md` and the package README document authority tiers, exposure statuses, and ownership boundaries for `domain_ref`, IAM, Guard, mailroom, and execution admission.

## Validation State

- `npx -y node@22 node_modules/vitest/vitest.mjs run packages/rosetta-schemas/src/lib/rosetta-schemas.spec.ts` passed.
- `NX_DAEMON=false pnpm exec nx run rosetta-schemas:test --skip-nx-cache` passed.
- `NX_DAEMON=false pnpm exec nx run rosetta-schemas:typecheck --skip-nx-cache` passed.
- `NX_DAEMON=false pnpm exec nx run rosetta-schemas:build --skip-nx-cache` passed.
- `NX_DAEMON=false pnpm exec nx run rosetta-schemas:lint --skip-nx-cache` passed.
- `NX_DAEMON=false pnpm run docs:intake` passed, but generated broad unrelated intake-ledger churn; those generated intake changes were intentionally not kept in this branch.

Known non-failing warnings:

- Nx/Vitest may warn that `NO_COLOR` is ignored when `FORCE_COLOR` is set.

## Next Actions

For this branch:

1. Run affected validation before publishing.
2. Publish a ready PR for issue #1114.
3. Follow with issue #1115 to expose the catalog through API and CLI inspection surfaces.

For Text-Core:

1. TC-001 through TC-004 are merged.
2. Pause additional Text-Core implementation by default unless explicitly selected; issue #23 should mine the highest-authority docs first so TC-005+ priorities are evidence-driven.
3. TC-005, TC-006, and TC-007 remain open implementation candidates.

## Current Technical Posture

- Bootstrap provenance kernel is implemented and tested.
- Source-aware refinery is fixture-backed, not live upstream acquisition.
- `docs:intake` indexes docs and issue drafts but does not semantically ingest the corpus.
- Text-Core TC-001 source episode envelope is merged.
- Text-Core TC-002 normalization fingerprints are merged.
- Text-Core TC-003 cache dedupe/revision/local persistence is merged.
- Text-Core TC-004 source-to-observation tiling and transform receipts is merged.
- Internal Agentic Messaging schema registry now exists in `packages/rosetta-schemas`, and the same package now defines fail-closed anti-spoofing admission rules for data-plane vs control-plane routing.
- Docs intelligence is now the intended next planning lane before further broad Text-Core prioritization.
- Large-scale corpus ingest remains blocked until the Ingress Refinery and canonical corpus cache are ready.
