# AINL-004: Emit execution tape receipts for deterministic replay and evaluation

## Title

Emit execution tape receipts for deterministic replay, grading, and audit.

## Source Evidence Link/Path

- AINL repository README: https://github.com/sbhooley/ainativelang
- AINL whitepaper: https://www.ainativelang.com/whitepaper
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Related:

- #22 added source-to-observation transform receipts.
- `docs/intake/issue-drafts/archive/2026-04-26-prd-006-receipt-semantics-hardening.md` covers receipt semantics hardening.
- `docs/intake/issue-drafts/archive/RLM-001-TILES-rosetta-rlm-tile-extensions.md` discusses replayable RLM artifacts.
- `docs/intake/issue-drafts/archive/rosetta-v3-008-conjecture-nonreplayable-edge-case.md` covers non-replayable conjecture handling.

This candidate is a concrete execution-run artifact, not a general receipt hardening ticket.

## Entif/Rosetta Mapping

AINL's trace JSONL output maps to a Rosetta execution tape:

- Each run gets a content-addressed tape artifact.
- Each step records node id, input artifact refs, output artifact refs, guard decision refs, adapter capability id, start/end timestamps, status, and error details.
- The tape itself is bound into a receipt bundle so evaluation, replay, and audit modes can inspect it without replaying transcript history.

## Priority

P1 - execution tapes are the practical bridge between deterministic workflow claims and receipt-backed audit.

## Rationale

Rosetta cannot rely on conversation transcripts as the durable account of what happened. A run tape gives operators and validators a bounded, structured, replayable artifact. It also supports future pattern promotion, failure learning, and benchmark scoring without hidden prompt history.

## Acceptance Criteria

- [ ] Define `execution-tape-v1` schema or type.
- [ ] Define step event fields for inputs, outputs, guard decisions, adapter capability, timing, status, and errors.
- [ ] Add a fixture-backed run tape for a tiny deterministic workflow.
- [ ] Add verifier checks for step ordering, required refs, guard refs on side-effecting steps, and terminal status.
- [ ] Emit or model a receipt binding the execution tape to the workflow graph and produced artifacts.

## Test Strategy

- Add unit tests for valid tape verification.
- Add negative tests for missing guard refs, dangling output refs, impossible ordering, and terminal status mismatch.
- If implementation touches receipt packages, run targeted package tests in addition to docs-intake.

## Non-Goals

- Do not build distributed replay or a workflow scheduler.
- Do not require exact replay for external nondeterministic APIs in this issue.
- Do not store raw model scratchpads unless a separate policy issue authorizes that surface.
