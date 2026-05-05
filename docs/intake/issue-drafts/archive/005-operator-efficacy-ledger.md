## Priority

Tier 1.

## Parent

Child of COG-000. Consumes COG-003 and COG-004. Coordinates with #1089 benchmark harness and #1110 memory explorer.

## Problem

The major compounding advantage comes from measuring not just what the system knows, but **how well its thinking strategies perform**.

Every use of a cognitive operator should be recorded with problem context, operator sequence, cost, output, outcome, downstream validation, and later utility. Without this, Rosetta cannot learn which lenses work, in what order, for which problem classes, at what cost, and with what contraindications.

## Goal

Define an `OperatorEfficacyLedger` and `StrategyEpisode` receipt family for outcome-scored cognition.

The system should preserve:

```txt
problem shape -> selected operators -> sequence -> cost -> output quality -> downstream outcome -> later validation
```

## Scope

In scope:

1. Define `StrategyEpisode` artifact.
2. Define `OperatorApplicationReceipt` artifact or receipt type.
3. Define outcome metric vector fields.
4. Define cost fields: tokens, latency, estimated USD, tool calls, human review burden.
5. Define later-validation fields: accepted, corrected, contradicted, reworked, useful later.
6. Define aggregation posture for operator efficacy by problem signature.
7. Add fixtures showing operator promotion, demotion, and contraindication discovery.
8. Add inspection hooks for future memory explorer surfaces.

## Suggested StrategyEpisode shape

```ts
StrategyEpisode {
  episodeId: string;
  runRef: string;
  problemSignatureRef: string;
  operatorSequence: Array<{
    operatorId: string;
    order: number;
    inputRefs: string[];
    outputRefs: string[];
    receiptRefs: string[];
  }>;
  cost: {
    tokensIn?: number;
    tokensOut?: number;
    latencyMs?: number;
    usdEstimate?: number;
    toolCallCount?: number;
    humanReviewMinutes?: number;
  };
  outcome: {
    taskSuccess?: number;
    humanRating?: number;
    correctness?: number;
    contradictionsFound?: number;
    assumptionsCorrected?: number;
    reworkRequired?: boolean;
    incidentAvoided?: boolean;
    noveltyProduced?: number;
  };
  laterValidation?: {
    status: 'unvalidated' | 'confirmed' | 'corrected' | 'contradicted' | 'superseded' | 'useful_later';
    evidenceRefs?: string[];
    note?: string;
  };
  createdAt: string;
}
```

## Acceptance criteria

- [ ] `StrategyEpisode` schema/model exists.
- [ ] Operator application receipt or receipt-adjacent artifact exists.
- [ ] Metric vector includes quality and replay/correctness, not only token cost.
- [ ] Cost fields are versioned and allowed to be estimated.
- [ ] Later validation status can update by superseding, not mutating, prior history silently.
- [ ] Fixtures show at least one useful operator sequence, one wasted operator, and one harmful/misapplied operator.
- [ ] Docs explain how this feeds future contextual bandit / portfolio policy learning.
- [ ] Docs warn against a single god-score / Goodhart failure.

## Non-goals

- Do not train the policy in this issue.
- Do not require live provider pricing in default tests.
- Do not make human rating the only outcome signal.
- Do not let lower token cost count as success if quality/replayability fails.

## Validation

- Schema tests.
- Fixture tests for outcome-vector completeness.
- Negative test where a “successful” low-cost run lacks correctness/replay evidence and cannot be promoted as a win.
