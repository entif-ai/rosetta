# Current Handoff

Status: active baton-pass for Codex and agent sessions
Date: 2026-04-24
Last updated: 2026-04-24
Current branch at time of update: `codex/archive-cache-persistence-draft`
Current PR at time of update: https://github.com/entif-ai/rosetta/pull/21

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
- PR #13: `feat(text-core): add source episode envelope`
- PR #18: `feat(text-core): add normalization fingerprints`
- PR #19: `feat(canonical-cache): add revision persistence`
- PR #20: `fix(rosetta-pipeline): stabilize pipeline slice`

Open at time of update:

- PR #21: `docs(intake): archive canonical cache draft`
- Issue #10: `TC-005 Promotion state machine and structured extracts`
- Issue #9: `TC-004 Source to observation tiling and transform receipts` is claimed by another harness on `codex/tc-004-source-observation-receipts`
- Issues #11, #12: follow-up Text-Core implementation issues

Closed at time of update:

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
- Issue #14: `Archive published docs intake issue drafts`

## Current Work Product

Current branch: `codex/archive-cache-persistence-draft`
Source issue: none; docs/intake cleanup after issue #8 and PR #20 merges

This branch archives the stale `canonical-cache-persistence` local draft after TC-003 was completed through issue #8 / PR #19, and refreshes this handoff after PR #20 merged.

Changed behavior:

- `docs/intake/issue-drafts/canonical-cache-persistence.md` moved to `docs/intake/issue-drafts/archive/canonical-cache-persistence.md`.
- `docs/intake/github-issue-ledger.json` marks `canonical-cache-persistence` as published against closed issue #8.
- This handoff no longer lists merged PR #20 as open/current work.

## Validation State

- `pnpm run docs:intake` passed.
- `git diff --check` passed.

Known non-failing warnings:

- Nx/Vitest may warn that `NO_COLOR` is ignored when `FORCE_COLOR` is set.

## Next Actions

For this branch:

1. Keep PR #21 draft until GitHub reports it mergeable/green.

For Text-Core:

1. TC-003 is merged and issue #8 is closed.
2. TC-004 is in progress in another harness on issue #9.
3. TC-005 remains open after PR #20 stabilization.
4. TC-006 and TC-007 are unclaimed at this handoff.

## Current Technical Posture

- Bootstrap provenance kernel is implemented and tested.
- Source-aware refinery is fixture-backed, not live upstream acquisition.
- `docs:intake` indexes docs and issue drafts but does not semantically ingest the corpus.
- Text-Core TC-001 source episode envelope is merged.
- Text-Core TC-002 normalization fingerprints are merged.
- Text-Core TC-003 cache dedupe/revision/local persistence is merged.
- Large-scale corpus ingest remains blocked until the Ingress Refinery and canonical corpus cache are ready.
