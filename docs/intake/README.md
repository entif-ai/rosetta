# Docs Intake

This folder tracks two separate workflows:

- docs-intake ledgering: shallow indexing, chronology, hashes, issue drafts, and GitHub issue state
- docs intelligence: human/agent extraction of requirements, intent, designs, technology choices, relationships, contradictions, and issue candidates from repository documents

Docs intelligence is planning work. It is not Rosetta runtime ingestion, and it is not blocked by Ingress Refinery or canonical cache readiness. Its outputs are extraction artifacts, finding rows, issue drafts, GitHub comments, tags, subjects, and orchestration notes, not Rosetta Protocol tiles or tapestries.

## Workflow

### Ledger Workflow

1. Run `pnpm run docs:intake`.
2. Review `docs/intake/doc-ledger.md` for corpus shape.
3. Review candidate issues under `docs/intake/issue-drafts/`.
4. Publish only the chosen issue drafts to GitHub, then record the issue URL/number in `docs/intake/github-issue-ledger.json`.
5. Rerun `pnpm run docs:intake`; published drafts move to `docs/intake/issue-drafts/archive/`.

### Docs Intelligence Workflow

1. Read `docs/intake/DOCS_INTELLIGENCE_WORKFLOW.md`.
2. Read `docs/intake/docs-intelligence/CHEAP_AGENT_RUNBOOK.md` when assigning low-cost or parallel agents.
3. Fetch current GitHub/repo state and read relevant accepted drafts under `docs/intake/issue-drafts/archive/`.
4. Select the next document or batch from `docs/intake/docs-intelligence/PRIORITY_QUEUE.md`.
5. Use `docs/intake/docs-intelligence/EXTRACTION_TEMPLATE.md` for each extraction artifact.
6. For cheap-agent batches, emit finding rows with timestamps, source paths, locators, tags, subjects, evidence citations, confidence, and action recommendations.
7. Convert extracted requirements and decisions into issue drafts or GitHub issues only after orchestration review.
8. Update GitHub issue comments and, when available, project-board metadata so parallel agents can see ownership and dependencies.

## Current Snapshot

- Documents indexed: 128
- Current April 2026 docs: 24
- Governing/planning/live docs: 36
- Docs dated by canonical top matter: 73
- Generated at: 2026-04-26T00:29:48.146Z

## Policy

- Newer files supersede older files by default when they conflict.
- Top-matter dates are preferred over filename dates; filename dates are preferred over filesystem mtime.
- Chat-style `Created`, `Updated`, and `Exported` stamps are stored separately under each document's `chronology.canonical` object.
- `docs/live/`, `docs/governance/`, `docs/handoffs/`, `docs/backlog/`, `docs/PRDs/`, and `docs/RFCs/` carry higher authority than chats, ideas, external notes, or frontier research.
- Local issue drafts are the review gate before GitHub issue creation.
- Active issue drafts are unpublished candidates; published drafts are archived and tracked in `docs/intake/github-issue-ledger.json`.
- The ledger is a map, not the canonical corpus cache promised by the architecture.
- Requirements extraction is allowed and expected before Rosetta-native ingestion exists.
- Do not describe docs-intelligence findings as source episodes, observations, tapestries, indexed corpus state, or protocol-native ingestion.
