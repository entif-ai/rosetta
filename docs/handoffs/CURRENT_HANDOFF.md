# Current Handoff

Status: active baton-pass for Codex and agent sessions  
Date: 2026-04-24  
Last updated: 2026-04-24  
Current branch at time of update: `codex/text-core-mvp-scope-gate`  
Current PR at time of update: https://github.com/entif-ai/rosetta/pull/5

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

- Do not perform large-scale semantic corpus ingest yet.
- The intake ledger fingerprints and orients docs; it is not the future canonical corpus cache.
- Top-matter dates are preferred over filename dates.
- Filename dates are preferred over filesystem mtime.
- Chat exports may include `Created`, `Updated`, and `Exported`; store those separately under `chronology.canonical`.
- Use `updatedAt` as the primary working date when present, but keep all chronology evidence.
- Local issue drafts are the review gate before creating remote GitHub issues.
- After publishing issues, record the URLs in `docs/intake/github-issue-ledger.json`.

## GitHub State

Remote: `https://github.com/entif-ai/rosetta.git`

Merged:

- PR #1: `docs(intake): add documentation ledger and issue draft workflow`

Open at time of update:

- PR #5: `docs(backlog): define Text-Core MVP scope gate`
- Issue #4: `Define Text-Core MVP scope gate from governing docs`

Closed at time of update:

- Issue #2: `Build docs intake ledger and GitHub issue promotion workflow`
- Issue #3: `Re-run lean validation loop and checkpoint local receipts`

## Current Work Product

PR #5 adds:

- `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md`
- regenerated docs intake ledger files
- updated issue ledger state for issues #2 and #3

Scope gate summary:

- Text-Core MVP should start as a small, receipt-bound text-ingest spine.
- Minimum Text-Core Green requires:
  - two structurally different text-source families end to end
  - deterministic refinery
  - source -> observation -> interpretation -> tapestry flow
  - rights-scoped retrieval
  - minimum English accompaniment
  - Postgres/pgvector baseline before serious RC claims

Follow-up implementation issue candidates from the scope gate:

- TC-001 Source episode envelope and family classification
- TC-002 Chronology-aware normalization and fingerprints
- TC-003 Dedupe, revision graph, and cache persistence
- TC-004 Source to observation tiling and transform receipts
- TC-005 Promotion state machine and structured extracts
- TC-006 Tapestry v1, rights retrieval, and Postgres/pgvector baseline
- TC-007 Chat + arXiv importers and English accompaniment

## Validation State

Latest completed validation on `main` after PR #1:

- `pnpm exec nx sync` passed
- `pnpm run verify` passed
- tests: 17 files passed, 52 tests passed
- build passed

Known non-failing warnings:

- Nx/Node may emit `MaxListenersExceededWarning` during sequential package builds.
- React Router build may warn that `NO_COLOR` is ignored when `FORCE_COLOR` is set.

Latest validation on `codex/text-core-mvp-scope-gate`:

- `pnpm run docs:intake` passed
- `git diff --check` passed

Additional test coverage added on this branch:

- `tools/doc-intake/build-doc-intake.spec.mjs`
- covers chat top-matter chronology parsing, primary date precedence, fallback evidence retention, stable intake timestamps, and filesystem-only undated import classification
- `vitest.config.ts` now includes `tools/**/*.spec.mjs`

## Next Actions

If PR #5 is not merged:

1. Review/merge PR #5.
2. After merge, sync `main`.
3. Close issue #4 with a comment referencing the scope gate document.
4. Publish TC-001 through TC-007 follow-up issues, or at minimum TC-001 first.

If PR #5 is merged:

1. Sync `main`.
2. Close issue #4 if still open.
3. Create branch `codex/tc-001-source-episode-envelope`.
4. Implement TC-001 using existing packages first:
   - `packages/source-substrate`
   - `packages/ingress-refinery`
   - `packages/rosetta-schemas`
5. Avoid creating a new `packages/ingest-core` until the source episode API has enough real pressure to justify the split.

## Current Technical Posture

- Bootstrap provenance kernel is implemented and tested.
- Source-aware refinery is fixture-backed, not live upstream acquisition.
- `docs:intake` indexes docs and issue drafts but does not semantically ingest the corpus.
- Text-Core has now been scoped, but implementation has not started.
- Large-scale corpus ingest remains blocked until the Ingress Refinery and canonical corpus cache are ready.
