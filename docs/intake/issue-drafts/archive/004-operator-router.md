## Priority

Tier 1 / Tier 2 bridge.

## Parent

Child of COG-000. Consumes COG-003 registry. Coordinates with OMOC doctrine and #1125/#1126 semantic hypothesis work.

## Problem

A reasoning system should not apply every lens to every problem. That creates slow, expensive analysis theater.

It should select operators based on the problem’s concept signature, risk tier, ambiguity, evidence density, stakes, and expected value. This is the OMOC move applied to reasoning: route by task-local concept mixtures and cognitive transformations, not static expert identities.

Rosetta needs an operator router that can choose which reasoning operators are apropos before the main model synthesizes a plan.

## Goal

Define and implement the first OMOC-compatible Cognitive Operator Router that maps problem context to candidate operators using concept signatures and applicability scoring.

## Scope

In scope:

1. Define `ProblemSignature` or reuse existing semantic substrate fields where appropriate.
2. Define `OperatorApplicabilityScore` artifact.
3. Define deterministic scoring inputs before ML/bandit learning.
4. Define router output shape: selected operators, order hints, skipped operators, and rationale.
5. Add fixtures for architecture planning, adversarial rhetoric analysis, code repair, ambiguous product strategy, and low-risk mechanical tasks.
6. Add negative fixtures where expensive or irrelevant operators are skipped.
7. Document future contextual-bandit upgrade path without requiring it in v1.

## Suggested ProblemSignature fields

```ts
ProblemSignature {
  domain: string[];
  novelty: number;
  ambiguity: number;
  riskTier: 'low' | 'medium' | 'high' | 'critical';
  evidenceDensity: number;
  conflictLevel?: number;
  implementationComplexity?: number;
  reversibility?: number;
  securitySensitivity?: number;
  emotionalCharge?: number;
  stakeholderCount?: number;
  conceptRefs?: string[];
  sourceRefs?: string[];
}
```

## Suggested router output

```ts
OperatorSelectionPlan {
  planId: string;
  problemSignatureRef: string;
  selected: Array<{
    operatorId: string;
    applicabilityScore: number;
    expectedValue: number;
    proposedOrder: number;
    rationale: string;
    requiredBeforeAction: boolean;
  }>;
  skipped: Array<{
    operatorId: string;
    reason: string;
  }>;
  createdAt: string;
}
```

## Acceptance criteria

- [ ] Problem signature shape exists or is mapped to existing schema surfaces.
- [ ] Operator applicability score shape exists.
- [ ] Router can select a bounded set of operators from the registry.
- [ ] Router can explicitly skip irrelevant operators with reason codes.
- [ ] Fixtures prove different selections for architecture planning, code repair, adversarial rhetoric, product strategy, and low-risk tasks.
- [ ] Router output includes order hints and `requiredBeforeAction` flags.
- [ ] Docs explain that the router may later become contextual-bandit-backed, but v1 may be deterministic/scored heuristics.
- [ ] Router does not authorize tool calls or canonical writes.

## Non-goals

- Do not train a bandit policy in this issue.
- Do not make router output a Guard decision.
- Do not use “always apply everything” as default.
- Do not collapse problem signature into a single opaque classifier label.

## Validation

- Unit tests over fixture problem signatures.
- Negative test where low-risk mechanical task does not trigger heavy philosophical analysis.
- Snapshot tests for selected/skipped operator lists.
