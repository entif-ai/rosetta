## Priority

Tier 1.

## Parent

Child of COG-000. Depends conceptually on COG-001.

Related neighbors: #1126 EpistemeTile, #1125 Sense+Frame hypotheses, #1114 schema catalog, #1119 promotion state machine.

## Problem

Many agentic failures begin before tool use: the model assumes the wrong repo state, invents missing dependencies, fails to notice ambiguity, collapses uncertainty, or treats speculation as observation.

The system needs mandatory preflight artifacts before non-trivial planning or execution:

- Assumption Ledger
- Evidence Class assignment
- Unknowns Packet / Shadow Scan
- optional Falsification Packet for medium/high-risk work

Without these artifacts, Rosetta cannot later explain why a bad path was taken, which assumptions should have been verified, or which missing information was ignored.

## Goal

Define and implement first-wave preflight reasoning artifacts that can be produced before tool calls, referenced by plans, and later evaluated against outcomes.

## Scope

In scope:

1. Define `AssumptionLedger` schema/model.
2. Define `EvidenceClass` taxonomy for claims and operator outputs.
3. Define `UnknownsPacket` / `ShadowScan` schema/model.
4. Define `FalsificationPacket` schema/model for risk-tiered challenge passes.
5. Add validation helpers that reject incomplete or unsupported preflight artifacts.
6. Add fixtures for common failure modes: invented repo state, unverified dependency, ambiguous request, unsupported certainty, and omitted unknowns.
7. Document risk-tier requirements for which artifacts are mandatory.

## Suggested EvidenceClass values

```txt
observed
inferred
hypothesized
speculative
creative
borrowed
derived
unverified
contradicted
deprecated
```

## Suggested AssumptionLedger shape

```ts
AssumptionLedger {
  ledgerId: string;
  runRef?: string;
  assumptions: Array<{
    assumptionId: string;
    statement: string;
    basis: 'user_statement' | 'source_artifact' | 'tool_observation' | 'repo_inspection' | 'inference' | 'model_prior';
    confidence: number;
    verificationMethod?: string;
    riskIfWrong: string;
    mustVerifyBeforeAction: boolean;
    evidenceRefs?: string[];
  }>;
  createdAt: string;
}
```

## Suggested UnknownsPacket shape

```ts
UnknownsPacket {
  packetId: string;
  runRef?: string;
  unknowns: Array<{
    unknownId: string;
    question: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    canProceedWithoutAnswer: boolean;
    suggestedProbe?: string;
    relatedAssumptionRefs?: string[];
  }>;
  blindSpots?: string[];
  omittedPerspectives?: string[];
  createdAt: string;
}
```

## Acceptance criteria

- [ ] `AssumptionLedger` schema/model exists.
- [ ] `EvidenceClass` vocabulary exists and is documented.
- [ ] `UnknownsPacket` / `ShadowScan` schema/model exists.
- [ ] `FalsificationPacket` schema/model exists or is scaffolded with fixtures.
- [ ] Risk-tier rules document when each artifact is required.
- [ ] Negative tests fail unsupported certainty, missing evidence class, missing must-verify assumption, and empty unknowns packet where risk tier requires one.
- [ ] Positive tests show a simple architecture decision can carry assumptions, evidence classes, unknowns, and falsification notes.
- [ ] Artifacts link to source/evidence refs rather than relying only on prose.
- [ ] Docs explain relationship to #1126 epistemic state and #1119 promotion lifecycle.

## Non-goals

- Do not build the full runtime middleware in this issue.
- Do not require all trivial tasks to emit heavyweight preflight packets.
- Do not make a model confidence score sufficient evidence.
- Do not promote hypotheses to Rosetta-grade knowledge in this issue.

## Validation

- Focused schema tests.
- Fixtures for ambiguous and high-risk reasoning tasks.
- Negative tests for unsupported claims and missing assumption verification posture.
