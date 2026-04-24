# Build docs intake ledger and GitHub issue promotion workflow

Issue draft id: `docs-intake-ledger-and-issue-promotion`
Priority: `P0`
Effort: `S`
Labels: `docs-intake`, `governance`, `automation`

## Problem

The repo has a high-value documentation corpus, but no durable local map from parsed documents to issue candidates or published GitHub issues.

## Scope

- Maintain a generated manifest of docs with hashes, dates, freshness, authority tier, and parsing status.
- Preserve manual GitHub issue references across re-runs.
- Generate local issue drafts before creating remote issues.
- Keep the workflow cheap enough for repeated Codex sessions.

## Acceptance Criteria

- [ ] `pnpm run docs:intake` regenerates the ledger deterministically.
- [ ] The ledger excludes generated intake artifacts from source scanning.
- [ ] Existing `githubIssueRefs` and `status` fields are preserved when source hashes are unchanged.
- [ ] Generated issue drafts cite source documents and remain reviewable before publishing.

## Source Evidence

- `docs/handoffs/2026-04-13-bootstrap-handoff.md`; hash 27ff548837e0: Forbids large-scale corpus ingest before the refinery/cache exist and calls for token-economical future sessions.
- `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md`; hash 2baec5fab6f5: Defines cheap-first refinement, receipt discipline, and explicit backlog artifacts.
- `docs/chats/20260412 - Chat GPT - OMOC, Ontologies and Agentic Token Efficiency.md`; hash c196d4d9366e: Contains prior context on token economy, catalog validation, and backlog-as-tests behavior.

## Non-Goals

- No full semantic corpus ingestion.
- No automatic GitHub issue creation without an explicit publish step.
- No replacement for the future Ingress Refinery or canonical corpus cache.

## Publishing Notes

- Local status: `candidate`
- GitHub issue: `pending`
- Recommended publish command shape: `gh issue create --title "Build docs intake ledger and GitHub issue promotion workflow" --body-file docs/intake/issue-drafts/docs-intake-ledger-and-issue-promotion.md --label docs-intake,governance,automation`
