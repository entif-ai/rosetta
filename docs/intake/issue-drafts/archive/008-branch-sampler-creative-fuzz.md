## Priority

Tier 2.

## Parent

Child of COG-000. Consumes COG-003 registry, COG-004 router, and COG-005 efficacy ledger.

## Problem

The doctrine includes two powerful but dangerous ideas:

- fuzz out random creativity automatically;
- mark off random forest trails.

Unbounded creativity becomes token confetti. Unrecorded branch exploration creates repeated rediscovery and forgotten dead ends. The system needs bounded stochastic exploration that preserves branch rationale, novelty value, and rejection reasons.

## Goal

Define `CreativeFuzzPass` and `BranchSampler` artifacts for bounded stochastic exploration, MCTS-lite/random-forest-style strategy trail marking, and novelty scoring.

## Scope

In scope:

1. Define `CreativeFuzzPass` artifact.
2. Define `BranchSampler` artifact.
3. Define `NoveltyScore` fields.
4. Define branch lifecycle states: proposed, explored, promising, rejected, parked, promoted.
5. Add fixtures for product strategy, architecture alternatives, and debugging hypotheses.
6. Add cost/limit controls: max branches, max depth, max tokens, risk tier.
7. Feed selected branch outcomes into COG-005 efficacy ledger.

## Suggested NoveltyScore dimensions

```txt
originality
germane_relevance
implementation_plausibility
strategic_fit
cost_to_test
risk_introduced
reuse_potential
dependency_burden
```

## Acceptance criteria

- [ ] `CreativeFuzzPass` schema/model exists.
- [ ] `BranchSampler` schema/model exists.
- [ ] Branch states and rejection reasons are explicit.
- [ ] Novelty score dimensions are documented.
- [ ] Cost/limit controls are explicit.
- [ ] Fixtures show multiple branch candidates, one selected path, and rejected/parked trails.
- [ ] Branch results can reference assumptions, evidence, and strategy episode refs.
- [ ] Negative tests prevent unbounded branch generation.

## Non-goals

- Do not implement full MCTS in first pass.
- Do not require stochastic exploration on every task.
- Do not treat high novelty as high utility automatically.
- Do not allow creative branch output to bypass evidence or Guard requirements.

## Validation

- Schema tests.
- Deterministic seeded fixture for branch sampling.
- Negative tests for too many branches / missing rejection reasons / unsupported novelty claims.
