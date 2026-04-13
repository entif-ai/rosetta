# 2026-04-13 Bootstrap Handoff

## Purpose

This is the compact baton-pass for the next agent session. It preserves governing decisions, current repo state, validated outcomes, known gaps, and explicit operator instructions without spending tokens rediscovering settled context.

## Governing Instructions Still In Force

- Treat `/Users/emilie/.openclaw/workspace/open-brain/NEXT-SESSION-BOOTSTRAP-v0.1.md` as the primary handoff artifact.
- Treat the prerequisite Markdown authorities named near the top of that bootstrap document, plus the three later-added source-substrate/source-registry resources, as governing inputs.
- Preserve the Rosetta/Entif doctrine.
- Keep OB1 running as an already-live donor sidecar.
- Evaluate Prism in shadow mode only.
- Do not perform large-scale corpus ingest until the Ingress Refinery and canonical corpus cache exist.
- Do not copy donor tarball contents directly into `entif-ai`; use the fresh Nx harness/CLI path and prefer Nx tooling over manual “Nx theater.”
- Use Node `24.14.1` unless fresh local receipts justify change.
- Going forward, checkpoint validated self-contained slices with local Conventional Commits only. No push unless explicitly requested.

## Repo State As Of 2026-04-13

- Path: `/Users/emilie/Code/entif-ai`
- Git: local repository initialized with `git init -b main`
- Remote/auth: not required for local commits; no push performed
- Current history: no commits yet
- Workspace style: fresh Nx-based TypeScript monorepo, not donor-tarball import

## Implemented So Far

### Constitutional and governance layer

- Repo-local governance docs exist under `/Users/emilie/Code/entif-ai/docs/governance`.
- Bootstrap backlog tracking exists under `/Users/emilie/Code/entif-ai/docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`.
- Pack suite index and initial pack manifests/schemas/examples exist under `/Users/emilie/Code/entif-ai/packs`.

### Rosetta kernel slice

- Canonicalization, CID generation, tile envelopes, schema/conformance helpers, receipt creation/signing/bundling, store rights checks, tapestry compilation, and guard logic are implemented in packages.

### Source-aware bootstrap slice

- Source system, record, manifestation, and trust-matrix modeling are implemented.
- Tier 0 and Tier 1 bootstrap source registry entries are present.
- Parse-only Ingress Refinery and four-layer Canonical Cache clustering exist.
- Read-only projection adapters for OB1, Prism, and Mission Control views exist.

### App surfaces

- `rosetta-cli` produces a bootstrap snapshot plus verification/projection output.
- `rosetta-api` exposes `/health`, `/registry`, and `/demo`.
- `rosetta-operator` remains present as a future shell surface, not constitutional authority.

## Validation Status

### Confirmed

- Spec/test files are now excluded from library and app build outputs by dedicated `tsconfig.spec.json` lanes and `exclude` rules.
- A direct search of `packages/*/dist` and app `dist` directories found no emitted `*.spec.js`, `*.spec.d.ts`, or `*.spec.d.ts.map` artifacts after rebuild checks.
- Nx is already configured to use cache-aware production inputs for build targets in `nx.json`.
- The workspace scripts already run `nx sync` before key operations.
- The local Git repository is working.
- Husky and commitlint are installed at the workspace root, with Conventional Commit enforcement wired through `.husky/commit-msg`.

### Shift-left outcome discovered during validation

- A newly added API acceptance test exposed a route-shape mismatch in the `/demo` expectations.
- The mismatch was in the test, not the route implementation; the spec has been corrected to assert the actual bootstrap snapshot contract.

### Still true and important

- Current tests are materially stronger than before and now cover more user-facing and contract-facing slices.
- That said, “comprehensive” should be stated carefully:
  - coverage is broad for the current bootstrap kernel/refinery/projection slice
  - coverage is not yet quantitatively enforced via coverage thresholds
  - real external source adapters are not implemented yet, so there is no adapter-level acceptance coverage yet
  - release/versioning workflows are not yet wired through `nx release`

## Current Technical Nuances

### Dist pollution fix

- The root issue was that `tsconfig.lib.json` and `tsconfig.app.json` inputs included `src/**/*.spec.ts`, so test code could be emitted into `dist`.
- The fix was to split build-time and spec-time TypeScript lanes:
  - build configs exclude spec/test files
  - spec configs use `noEmit: true`
  - project references include both lib/app and spec configs so tests are still linted and type-checked in the workspace graph

### Nx typecheck behavior

- Nx currently prints that certain generated `typecheck` targets are “disabled” because one or more referenced configs use `noEmit: true`.
- Despite the wording, the workspace typecheck command still completes successfully because Nx falls through to the relevant build/reference behavior.
- This is not yet ideal ergonomically, but it is not currently a failing condition.

### Token-economy guidance

- Prefer targeted affected/cached commands once commit history exists.
- Avoid full unfiltered test/build output in future agent runs unless a broad validation pass is necessary.
- Once commits exist, use Nx affected/cached execution to keep output narrow and token-cheap.

## Recommended Command Style For Future Sessions

- Prefer:
  - `pnpm exec nx sync`
  - `pnpm exec nx affected -t lint,test,build`
  - `pnpm exec nx affected -t typecheck`
  - `pnpm exec nx run <project>:<target>`
- Avoid defaulting to full-workspace runs when only a bounded slice changed.

## Conventional Commits / Release Tooling Findings

- As of 2026-04-13, official Nx documentation supports Conventional Commits through `Nx Release`, specifically `release.version.conventionalCommits` in `nx.json`, and uses commit history to drive version bumps and changelog generation: [Nx automatic versioning docs](https://nx.dev/docs/guides/nx-release/automatically-version-with-conventional-commits).
- Official Nx docs also recommend installing official Nx plugins via `nx add <plugin>` and updating with `nx migrate <version>` rather than hand-editing versions: [Nx keep versions in sync](https://nx.dev/docs/guides/tips-n-tricks/keep-nx-versions-in-sync).
- I did not find an official Nx plugin whose job is “enforce Conventional Commit format via Husky hook.”
- The current primary-source path for commit-message enforcement is still the standard `commitlint` plus `husky` `commit-msg` hook approach, not a dedicated official Nx commit-protocol plugin:
  - [commitlint local setup](https://commitlint.js.org/guides/local-setup.html)
  - [Husky get started](https://typicode.github.io/husky/get-started.html)

## Immediate Next Moves

1. Re-run the lean validation loop after the API spec correction:
   - `pnpm exec nx sync`
   - `pnpm run verify`
2. If green, write the first local Conventional Commits in small validated slices instead of one omnibus commit.
3. Configure `nx release` only when we are ready to formalize changelog/version behavior.
4. Before “real source adapters,” decide whether to add:
   - coverage reporting and thresholds
   - targeted acceptance matrices for each bootstrap package/app
   - affected-only local verification scripts optimized for token thrift

## Known Non-Goals For The Next Agent Unless Explicitly Requested

- No donor tarball import into `entif-ai`
- No Prism promotion out of shadow mode
- No OB1 replacement
- No large-scale corpus ingest
- No push to remote

## One-Sentence Mental Model

The repo is now a fresh Nx-built frame with the Rosetta engine, provenance plumbing, and source-aware intake skeleton in place; the next agent should finish tightening the bolts, start recording clean Git receipts, and keep every expensive move behind cache-aware, test-first gates.
