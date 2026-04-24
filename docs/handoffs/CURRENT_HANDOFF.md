# Current Handoff

Status: active baton-pass for Codex and agent sessions
Date: 2026-04-24
Last updated: 2026-04-24
Current branch at time of update: `codex/tc-003-cache-persistence`
Current PR at time of update: https://github.com/entif-ai/rosetta/pull/19

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

Open at time of update:

- PR #19: `feat(canonical-cache): add revision persistence`
- Issue #8: `TC-003 Dedupe, revision graph, and cache persistence`
- Issues #9-#12: follow-up Text-Core implementation issues

Closed at time of update:

- PR #18: `feat(text-core): add normalization fingerprints`
- Issue #7: `TC-002 Chronology-aware normalization and fingerprints`
- PR #17: `chore(nx): use affected validation by default`
- PR #15: `fix(doc-intake): archive published issue drafts`
- Issue #2: `Build docs intake ledger and GitHub issue promotion workflow`
- Issue #3: `Re-run lean validation loop and checkpoint local receipts`
- Issue #4: `Define Text-Core MVP scope gate from governing docs`
- Issue #6: `TC-001 Source episode envelope and family classification`
- Issue #14: `Archive published docs intake issue drafts`

## Current Work Product

Current branch: `codex/tc-003-cache-persistence`
Source issue: https://github.com/entif-ai/rosetta/issues/8

This branch implements TC-003 dedupe, revision graph, and local cache persistence.

Changed behavior:

- `canonical-cache` dedupes repeated normalized content by content fingerprint while retaining every raw evidence artifact CID.
- Materially changed content in the same record family is linked into a revision chain instead of being treated as an unrelated duplicate.
- Cache state can be saved to and reloaded from a local JSON persistence path for bootstrap development.

## Validation State

- Red state confirmed: `pnpm exec vitest run packages/canonical-cache/src/lib/canonical-cache.spec.ts` failed before implementation because TC-003 APIs did not exist.
- Green focused test: `pnpm exec vitest run packages/canonical-cache/src/lib/canonical-cache.spec.ts` passed: 1 file, 6 tests.
- `pnpm exec eslint packages/canonical-cache/src/lib/canonical-cache.ts packages/canonical-cache/src/lib/canonical-cache.spec.ts` passed.
- `pnpm exec tsc -p packages/canonical-cache/tsconfig.spec.json --noEmit` passed.
- `pnpm exec nx run-many -t typecheck test build -p canonical-cache --skip-nx-cache --outputStyle=static` passed.
- `pnpm run docs:intake` passed.
- `git diff --check` passed.

Known non-failing warnings:

- Nx/Node may emit `MaxListenersExceededWarning` during sequential package builds.
- React Router build may warn that `NO_COLOR` is ignored when `FORCE_COLOR` is set.

## Next Actions

For this branch:

1. Keep PR #19 draft until GitHub reports it mergeable/green.
2. Close issue #8 after merge.

For Text-Core:

1. After TC-003 merges, continue with TC-004 source to observation tiling and transform receipts.

## Current Technical Posture

- Bootstrap provenance kernel is implemented and tested.
- Source-aware refinery is fixture-backed, not live upstream acquisition.
- `docs:intake` indexes docs and issue drafts but does not semantically ingest the corpus.
- Text-Core TC-001 source episode envelope is merged.
- Text-Core TC-002 normalization fingerprints are merged.
- Text-Core TC-003 cache dedupe/revision/local persistence is in progress.
- Large-scale corpus ingest remains blocked until the Ingress Refinery and canonical corpus cache are ready.
