# Define tiny specialist model selection criteria for OMC routing

Issue draft id: `omc-tiny-specialist-model-selection`
Priority: `P2`
Effort: `M`
Labels: `omc`, `tiny-specialists`, `routing`, `llm-selection`

## Problem

The OMC research spec describes conditions for spawning small specialist models, but does not provide a decision tree for when L3 should spawn a specialist versus delegate to L1/L2.

## Scope

Define routing criteria for tiny specialist model use in future OMC orchestration.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for tiny specialist model selection.
- Source spec section cited there: Section 9.5 gives necessary conditions but no decision tree.

## Specific Findings

### Finding 1: Necessary conditions are not enough for orchestration

The extraction flags that a model-selection rule needs thresholds, cost constraints, and fallback behavior.

## Acceptance Criteria

- [ ] Define the specialist-spawn decision tree.
- [ ] Define cost, latency, and confidence thresholds.
- [ ] Define fallback behavior when a specialist is unavailable.
- [ ] Require routing receipts for specialist-spawn decisions.
