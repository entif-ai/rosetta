# AINL-009: Add token-economics benchmark harness for compile-once/run-many workflows

## Title

Add a token-economics benchmark harness for compile-once/run-many Rosetta workflows.

## Source Evidence Link/Path

- AINL whitepaper: https://www.ainativelang.com/whitepaper
- AINL repository README: https://github.com/sbhooley/ainativelang
- AINL Claude Code plugin repository: https://github.com/sbhooley/ainativelang-claudecode
- Existing Rosetta issue: https://github.com/entif-ai/rosetta/issues/254
- Local synthesis: `docs/intake/competitor-intelligence/ainativelang-2026-04-28.md`

## Existing Representation Check

Related:

- #254 covers cheap-first routing with budget headers.
- `docs/intake/issue-drafts/archive/REE-011-kv-cache-long-context-economics.md` covers long-context economics.
- `docs/intake/issue-drafts/archive/LSC-005-reflective-density-instrumentation.md` covers reflective density instrumentation.
- Several context compiler and compression drafts already exist.

This draft should become a measurement refinement, not a new product claim.

## Entif/Rosetta Mapping

AINL's compile-once/run-many and token-saving claims should map to a Rosetta benchmark harness that compares:

- prompt-loop baseline
- Rosetta validated workflow graph
- workflow graph plus execution tape replay
- workflow graph plus context compiler or semantic bundle

Metrics should include input tokens, output tokens, tool calls, latency, cost estimate, replay success, receipt completeness, and failure rate.

## Priority

P2 - useful after graph/tape primitives exist.

## Rationale

Competitor claims around 90-95 percent savings and adaptive compression are attractive but must not become Rosetta claims without local measurement. A benchmark harness turns the claim into a falsifiable engineering receipt.

## Acceptance Criteria

- [ ] Define benchmark scenarios for at least three repeated workflows.
- [ ] Record prompt-loop baseline token/cost estimates.
- [ ] Record Rosetta workflow graph token/cost estimates.
- [ ] Emit results as a versioned benchmark artifact with source fixtures and assumptions.
- [ ] Include failure and quality metrics, not just token savings.
- [ ] Document that competitor savings are unverified for Rosetta until this harness runs.

## Test Strategy

- Add deterministic benchmark fixture tests where possible.
- Mock model pricing and tokenization assumptions so CI does not depend on live APIs.
- Add regression threshold checks only after baseline variance is understood.

## Non-Goals

- Do not claim AINL's savings as Rosetta savings.
- Do not require live model calls in default CI.
- Do not optimize compression before correctness and receipt completeness are measured.
