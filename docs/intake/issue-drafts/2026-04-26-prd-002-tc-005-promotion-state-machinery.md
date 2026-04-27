# Issue Draft: PRD-002 — TC-005: Promotion State Machinery

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-16, F-25, F-30, F-37 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

TC-005, TC-006, and TC-007 remain open after TC-001 through TC-004 (source episode envelope, normalization fingerprints, dedupe/revision/local persistence, source-to-observation tiling with transform receipts) all merged. The Entif and Rosetta PRD (2026-04-26) explicitly defines TC-005 as the promotion state machinery slice: structured extracts, cooling/revisit/quarantine states, and extract receipts.

The system currently lacks an explicit state machine for promotion, cooling, revisit, and quarantine transitions. These are described in the PRD as explicit state transitions (not hidden behavior), but no implementation exists for the state machine itself, the transition logic, or the receipt issuance at each transition.

## Evidence

- **F-30**: "The system shall implement promotion, cooling, revisit scheduling, and quarantine as explicit state transitions, not hidden behavior. Promotion = item becomes reusable for compiled context. Cooling = remains true but loses hot-surface priority. Revisit = system believes item merits future re-checking. Quarantine = system refuses to promote until contradiction/legal/trust concerns are resolved." — `turn8file15`, `turn9file16`
- **F-25**: "The system shall distinguish at least four related but non-identical relationships: same bytes, same manifestation, same record family with material revision, and conceptually related but not merge-safe." — `turn19file0`
- **F-16**: "Within the refinery, the system shall perform deterministic low-cost work before expensive semantic work" — `turn8file15`
- Repo handoff: TC-005, TC-006, TC-007 are open candidates after TC-001-TC-004 — `turn13file0`

## Requirements

1. **State machine definition**: Define states `active`, `cooled`, `quarantined`, `superseded`, `promoted`, `pending_revisit`
2. **Transition functions**: `promote(item)`, `cool(item)`, `quarantine(item, reason)`, `revisit(item, by_date)`, `activate(item)` — each emits a receipt
3. **Gate logic**: Each transition is gated by policy evaluation, not automatic. Legal sensitivity + low trust = quarantine. High dedupe + low novelty = cool.
4. **Lane-specific routing**: Hot lane uses urgency+valueAdd ranking. Hardening lane uses trust+contradictionPressure ranking.
5. **Receipt subjects**: Each transition state change is a receipt subject. Item's identity persists through state transitions via CID continuity.
6. **CandidateEvaluationVector persistence**: Multi-vector scores (F-38) must travel with the item through state transitions.
7. **Source-to-observation tiling**: TC-004 already produces transform receipts for source→observation. TC-005 must connect those to promotion state transitions.

## Data Model

```ts
interface PromotionReceipt {
  receiptType: "promotion.state";
  subjects: [{ cid: CID, role: "item" }];
  claims: [
    {
      claimType: "state-transition";
      statement: "item transitioned from {prevState} to {newState}";
      verdict: "pass" | "fail";
      evidence: [{ cid: CID, span: "transition-params" }];
    }
  ];
  digests: [{ alg: "sha256", of: "body", digest: string }];
  policyRefs: [CID];
}
```

## Acceptance Criteria

- [ ] State machine can be initialized and transitions observed without errors
- [ ] `promote(item, vector)` returns a PromotionReceipt and updates item state
- [ ] `cool(item)` moves item to `cooled` state without loss of provenance
- [ ] `quarantine(item, reason)` requires reason and emits quarantine receipt
- [ ] Lane-specific ranking produces different orderings for hot vs hardening lanes
- [ ] All transitions are idempotent — calling `promote` twice has same effect as calling once
- [ ] Transition receipts are verifiable via `rosetta-receipts` package

## Relationship to Other Issues

- Depends on IC-01 (Pack Conformance) for verified pack IDs in promotion receipts
- IC-03 (Durable Canonical Cache) will store promotion state transitions
- IC-14 (Multi-Vector Scoring) is the ranking layer this state machine feeds into
- Part of Phase 2 Text-Core Completion (F-45)

## Recommended Labels

`text-core`, `state-machine`, `receipts`, `TC-005`, `phase-2`, `governance`