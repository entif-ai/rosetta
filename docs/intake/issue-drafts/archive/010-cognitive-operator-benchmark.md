## Priority

Tier 2.

## Parent

Child of COG-000. Coordinates with #1089 compile-once/run-many benchmark harness and COG-005 efficacy ledger.

## Problem

Rosetta needs to know whether cognitive operators improve outcomes enough to justify their token, latency, complexity, and review costs.

Without a benchmark harness, “apply more sophisticated reasoning” can become slower but not better. Conversely, high-value operator sequences may remain anecdotal and fail to become reusable recipes.

## Goal

Define a Cognitive Operator Benchmark Harness that compares operator sequences against baselines across cost, quality, correctness, replayability, and downstream usefulness.

## Scope

In scope:

1. Define benchmark fixture families.
2. Define baseline strategies.
3. Define operator-sequence strategies.
4. Define metrics and result artifact.
5. Define deterministic CI posture with mocked provider costs/tokenization where needed.
6. Define relationship to COG-005 efficacy ledger and #1089 benchmark harness.
7. Add first fixtures for architecture planning, code repair, adversarial argument analysis, and ambiguous requirements.

## Benchmark strategies

At minimum compare:

```txt
baseline.direct_answer
baseline.single_general_reasoning_pass
operator.preflight_only
operator.router_selected_sequence
operator.full_doctrine_sequence
operator.creative_branch_sequence
```

## Required metrics

```txt
correctness
human_review_score
assumptions_corrected
contradictions_found
rework_required
time_to_useful_result
tokens_in
tokens_out
latency_ms
usd_estimate
replay_success
receipt_completeness
novelty_quality
risk_avoidance
```

## Acceptance criteria

- [ ] Benchmark fixture format is defined.
- [ ] Baseline strategies are explicit.
- [ ] Operator-sequence strategies are explicit.
- [ ] Benchmark result artifact exists.
- [ ] Metrics include quality, correctness, replayability, and cost.
- [ ] Default CI does not require live provider calls.
- [ ] Fixtures include at least four problem classes.
- [ ] Results can feed `StrategyEpisode` / operator efficacy artifacts.
- [ ] Docs warn that lower cost is not a win if quality/replayability fail.

## Non-goals

- Do not replace #1089's compile-once/run-many benchmark harness.
- Do not make a single scalar score the only success criterion.
- Do not require every operator to beat baseline globally.
- Do not publish broad performance claims before reproducible runs exist.

## Validation

- Fixture tests.
- Deterministic mocked benchmark output.
- Negative test where a cheap low-quality run is not classified as a win.
