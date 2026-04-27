# Issue Draft: PRD-004 — Docs Intelligence Productization: Extraction Artifacts and Issue Promotion Pipeline

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-02, F-08, F-33, F-47 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The repo's intake policy explicitly treats docs intelligence as a separate planning lane from Rosetta-native runtime ingestion. Requirements mining, contradiction extraction, technology-choice capture, roadmap derivation, issue drafting, and orchestration notes are allowed and expected now; large-scale Rosetta-native semantic corpus ingest remains blocked until the Ingress Refinery and canonical cache are ready. This separation is sound — but the docs-intelligence workflow itself is not yet a formalized product capability.

The Entif and Rosetta PRD (2026-04-26) states that docs intelligence should become a first-class orchestration domain: structured extraction artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, and authority class; then a promotion pipeline from structured findings to candidate issue drafts to orchestration review to published GitHub issues with full provenance.

## Evidence

- **F-02**: "docs intelligence is an explicitly separate planning lane from Rosetta-native runtime ingestion" — `turn25file0`, `turn13file0`
- **F-08**: "128 documents, 24 current April 2026 docs, 36 governing/planning/live docs" — `turn25file0`
- **F-33**: "The repo intake README already defines the workflow: run `docs:intake`, inspect the ledger, prioritize documents, use extraction templates, emit structured findings with locators/tags/subjects/evidence/confidence/action recommendations, then promote selected findings into issue drafts or GitHub issues after orchestration review" — `turn25file0`
- **F-47**: Phase 4 is "Documentation-intelligence and issue-orchestration phase" — `turn25file0`
- Repo intake policy explicitly forbids calling docs-intelligence extraction "runtime Rosetta ingestion" — `turn25file0`, `turn13file0`

## Requirements

1. **Extraction template formalization**: Standard template for all docs intelligence outputs covering source path, locator, date evidence, concepts extracted, confidence rating, contradiction tags, candidate issue refs, authority class (governing/PRD/RFC/backlog/chat/external), action recommendation
2. **Ledger machine**: `docs/intake/docs-intelligence-ledger.mjs` tracks processed documents, extraction artifacts, issue drafts, GitHub issue promotions, findings count, issues drafted count — must support `complete` subcommand for post-PR updates
3. **Authority ranking**: live/governance/handoffs/backlog/PRDs/RFCs outrank chats and frontier notes — extraction artifacts should carry authority class so downstream can weight accordingly
4. **Issue draft promotion workflow**: structured findings → candidate issue drafts (one per distinct issue) → orchestration review → publish via `gh pr create` → record PR URL and issue state changes in ledger
5. **Contradiction mining**: When a new extraction contradicts an existing concept or decision, flag as contradiction and create a quarantine-tagged issue candidate for review
6. **Cycle tracking**: Increment cycle number (DI-009, DI-010, etc.) per run; update `CYCLE_SUMMARY.md`, `CONCEPT_INDEX.json`, `KNOWLEDGE_GRAPH.yaml` after each extraction
7. **No batching rule**: One document per cycle. Full extraction. No summarizing. No batching. Each document gets its own extraction artifact.

## Data Flow

```
Source Doc → Extraction Template → Extraction Artifact
                                              ↓
                                    Issue Candidate Check
                                              ↓
                    ┌─────────────────────────┴─────────────────────────┐
              No overlap found                                Overlap found → merged
                    ↓                                            ↓
          Write to docs/intake/issue-drafts/           Check existing draft for
          2026-04-26-<topic>.md                         updates/additions
                    ↓                                            ↓
          Update CONCEPT_INDEX.json + CYCLE_SUMMARY.md
                    ↓
          Create branch, commit, push, PR, Telegram DM, ledger update
```

## Acceptance Criteria

- [ ] `pnpm run docs:intelligence` processes exactly one document per run
- [ ] Each extraction artifact is EXTRACTION_TEMPLATE-compliant (all fields populated)
- [ ] Ledger correctly increments findings count and issues drafted count
- [ ] No two documents batched in one cycle
- [ ] Authority class (governing/PRD/RFC/backlog/chat/external) assigned to each extraction
- [ ] New extraction that contradicts existing concept triggers contradiction tag + quarantine label
- [ ] Post-PR: ledger updated with PR number, findings count, issues drafted count
- [ ] Telegram DM sent after each PR creation with correct counts

## Relationship to Other Issues

- Enables systematic requirements extraction from all 128 indexed documents
- Feeds into IC-01 (Pack Conformance) via requirements for CI gates
- Part of Phase 4 Documentation-Intelligence and Issue Orchestration (F-47)
- This is the meta-issue that enables all other product issues to be systematically discovered

## Recommended Labels

`docs-intelligence`, `orchestration`, `workflow`, `phase-4`, `governance`, `extraction`