## Priority

Tier 1.

## Parent

Child of COG-000. Consumes COG-002 preflight artifacts and may feed COG-005 efficacy ledger.

## Problem

Major decisions in Rosetta/Entif need explicit weighted tradeoff reasoning. Otherwise the system will collapse decisions into persuasive prose, bury risk tolerance, and lose why rejected paths were rejected.

The January doctrine’s “weight your decisions matristically” should become a real artifact: a versioned decision matrix with criteria, weights, candidate options, evidence links, dissent, uncertainty, and score results.

## Goal

Define `DecisionMatrix`, `ScorecardDefinition`, and `ScoreResult` artifacts for matristic decisioning.

## Scope

In scope:

1. Define reusable scorecard/rubric definitions.
2. Define weighted decision matrix artifact.
3. Define decision criteria vocabulary.
4. Define score result artifact with uncertainty and dissent.
5. Add fixtures for architecture choice, backlog prioritization, operator selection, and build-vs-buy.
6. Add negative tests for missing weights, missing evidence, single-scalar overreach, and post-hoc rationalization.

## Suggested criteria vocabulary

```txt
truth_confidence
evidence_strength
reversibility
upside
downside
cost
latency
privacy_risk
security_risk
novelty_value
strategic_alignment
maintenance_burden
reuse_potential
human_preference
opportunity_decay
implementation_complexity
```

## Suggested artifact shape

```ts
DecisionMatrix {
  matrixId: string;
  decisionQuestion: string;
  options: Array<{ optionId: string; label: string; description?: string }>;
  criteria: Array<{
    criterionId: string;
    label: string;
    weight: number;
    direction: 'maximize' | 'minimize' | 'target';
    evidenceRequired: boolean;
  }>;
  scores: Array<{
    optionId: string;
    criterionId: string;
    score: number;
    confidence?: number;
    evidenceRefs?: string[];
    note?: string;
  }>;
  result: {
    selectedOptionId?: string;
    ranking: string[];
    dissentRefs?: string[];
    unresolvedRisks?: string[];
  };
  createdAt: string;
}
```

## Acceptance criteria

- [ ] `ScorecardDefinition` schema/model exists.
- [ ] `DecisionMatrix` schema/model exists.
- [ ] `ScoreResult` or embedded result shape exists.
- [ ] Criteria and weights are explicit and inspectable.
- [ ] Scores can include confidence and evidence refs.
- [ ] Matrix can preserve dissent and unresolved risks.
- [ ] Tests reject missing weights for weighted decisions.
- [ ] Tests reject unsupported evidence-required scores.
- [ ] Fixtures cover at least three decision classes.
- [ ] Docs explain that matrix output is a decision artifact, not objective truth.

## Non-goals

- Do not require matrix use for every trivial action.
- Do not collapse all scenario types into one universal score scalar.
- Do not make a decision matrix override Guard or policy gates.
- Do not hide qualitative dissent.

## Validation

- Schema tests.
- Deterministic fixture scoring.
- Negative tests for evidence gaps and malformed weights.
