# Docs Intake

This folder tracks local documentation parsing and issue-draft promotion without performing large-scale semantic corpus ingest.

## Workflow

1. Run `pnpm run docs:intake`.
2. Review `docs/intake/doc-ledger.md` for corpus shape.
3. Review candidate issues under `docs/intake/issue-drafts/`.
4. Publish only the chosen issue drafts to GitHub, then record the issue URL/number in `docs/intake/github-issue-ledger.json`.

## Current Snapshot

- Documents indexed: 128
- Current April 2026 docs: 24
- Governing/planning/live docs: 36
- Docs dated by canonical top matter: 73
- Generated at: 2026-04-24T06:06:37.766Z

## Policy

- Newer files supersede older files by default when they conflict.
- Top-matter dates are preferred over filename dates; filename dates are preferred over filesystem mtime.
- Chat-style `Created`, `Updated`, and `Exported` stamps are stored separately under each document's `chronology.canonical` object.
- `docs/live/`, `docs/governance/`, `docs/handoffs/`, `docs/backlog/`, `docs/PRDs/`, and `docs/RFCs/` carry higher authority than chats, ideas, external notes, or frontier research.
- Local issue drafts are the review gate before GitHub issue creation.
- The ledger is a map, not the canonical corpus cache promised by the architecture.
