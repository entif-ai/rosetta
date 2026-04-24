# Current Handoff

Status: active baton-pass for Codex and agent sessions
Date: 2026-04-24
Last updated: 2026-04-24
Current branch at time of update: `codex/archive-promoted-issue-drafts`
Current PR at time of update: https://github.com/entif-ai/rosetta/pull/15

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
- Active issue drafts are unpublished candidates.
- Published issue drafts must be archived under `docs/intake/issue-drafts/archive/`.
- `docs/intake/github-issue-ledger.json` must record published draft state with `draftStatus`, `activeDraftPath`, `archivedDraftPath`, issue number, state, and URL where known.

## GitHub State

Remote: `https://github.com/entif-ai/rosetta.git`

Merged:

- PR #1: `docs(intake): add documentation ledger and issue draft workflow`
- PR #5: `docs(backlog): define Text-Core MVP scope gate`

Open at time of update:

- PR #13: `feat(text-core): add source episode envelope`
- Issue #6: `TC-001 Source episode envelope and family classification`
- Issue #14: `Archive published docs intake issue drafts`

Closed at time of update:

- Issue #2: `Build docs intake ledger and GitHub issue promotion workflow`
- Issue #3: `Re-run lean validation loop and checkpoint local receipts`
- Issue #4: `Define Text-Core MVP scope gate from governing docs`

Published Text-Core follow-up issues:

- Issue #7: `TC-002 Chronology-aware normalization and fingerprints`
- Issue #8: `TC-003 Dedupe, revision graph, and cache persistence`
- Issue #9: `TC-004 Source to observation tiling and transform receipts`
- Issue #10: `TC-005 Promotion state machine and structured extracts`
- Issue #11: `TC-006 Tapestry v1, rights retrieval, and Postgres/pgvector baseline`
- Issue #12: `TC-007 Chat + arXiv importers and English accompaniment`

## Current Work Product

Current branch: `codex/archive-promoted-issue-drafts`
Source issue: https://github.com/entif-ai/rosetta/issues/14

This branch updates the docs intake workflow so issue drafts that have already been promoted to GitHub are removed from the active candidate folder and regenerated under `docs/intake/issue-drafts/archive/`.

Changed behavior:

- `resolveIssueDraftState` maps drafts with a recorded GitHub issue URL to `published`.
- Published drafts render archive-oriented publishing notes and are removed from `docs/intake/issue-drafts/`.
- Unpublished drafts remain active candidates.
- `docs/intake/github-issue-ledger.json` records `draftStatus`, `activeDraftPath`, and `archivedDraftPath` for each generated draft.
- `docs/intake/README.md` documents the active-vs-archived draft policy.

## Validation State

Completed on this branch:

- `pnpm run docs:intake` passed
- `pnpm exec vitest run tools/doc-intake/build-doc-intake.spec.mjs` passed: 1 file, 6 tests
- `pnpm run test` passed: 18 files, 58 tests
- `pnpm run lint` passed
- `pnpm run typecheck` passed
- final post-handoff `pnpm run docs:intake` passed
- `git diff --check` passed

Previous validation for PR #13:

- `pnpm run test` passed: 18 files, 60 tests
- `pnpm run lint` passed
- `pnpm run typecheck` passed
- `pnpm run docs:intake` passed
- `git diff --check` passed

Known non-failing warnings:

- Nx/Node may emit `MaxListenersExceededWarning` during sequential package builds.
- React Router build may warn that `NO_COLOR` is ignored when `FORCE_COLOR` is set.

## Next Actions

For `codex/archive-promoted-issue-drafts`:

1. Run the focused doc-intake spec.
2. Run full test/lint checks appropriate for the branch.
3. Run `pnpm run docs:intake` again after handoff changes.
4. Run `git diff --check`.
5. Create a GitHub issue for this cleanup branch.
6. Commit with a Conventional Commit.
7. Push and open a PR.

For Text-Core after this cleanup branch:

1. Continue review/merge of PR #13.
2. After PR #13 merges, sync `main`.
3. Update the handoff and issue ledger for completed TC-001 state.
4. Start TC-002 on a new `codex/` feature branch.

## Current Technical Posture

- Bootstrap provenance kernel is implemented and tested.
- Source-aware refinery is fixture-backed, not live upstream acquisition.
- `docs:intake` indexes docs and issue drafts but does not semantically ingest the corpus.
- Text-Core source episode envelope work is in PR #13.
- Large-scale corpus ingest remains blocked until the Ingress Refinery and canonical corpus cache are ready.
