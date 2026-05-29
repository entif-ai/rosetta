# OB1-002: Tool-Budget CI Enforcement Missing

## Meta

- **Type:** implementation
- **Severity:** medium
- **Confidence:** high
- **Tags:** governance, ci, tool-surface, regression-tracking, tool-budget
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §6
- **Extracted:** 2026-05-26

## Summary

Section 6 of the OB1 addendum defines mandatory tool-budget governance for hot-tool roles. Every hot-tool role should ship routing ambiguity tests, false-positive tool selection tests, context-budget snapshots, and refusal tests. Recommended metrics are defined (hot-tool count, schema token count, routing disagreement rate, misfire rate, tool-selection latency, context consumed by tool manifests). A PR that materially increases tool-surface size should explain why consolidation was not appropriate. None of this is currently implemented in CI.

## Evidence

Section 6 explicit language: "A PR that materially increases tool-surface size SHOULD explain why consolidation was not appropriate." No CI check exists for this. No tool-budget snapshot mechanism exists in current CI eval harness. The metric list is well-defined but untracked.

## Response Options

1. **Implement:** Add tool-budget snapshot checker to CI, track tool-surface as a regression metric
2. **Defer:** Post-TC-005 when hot-tool roles are better defined

## Preconditions for Resolution

- CI runs tool-budget snapshot on every PR that touches tool manifests
- Tool-surface regression is a blocking merge condition for tool-heavy PRs
- Routing ambiguity test suite exists for tool-heavy roles

## Dependencies

- OB1-001 (tracking gap must be closed first)
- TC-005 (Promotion state machine defines hot-tool roles)

## Labels

`governance` `ci` `tool-surface`

## Status

open