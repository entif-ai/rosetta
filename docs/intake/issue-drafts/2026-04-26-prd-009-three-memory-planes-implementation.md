# Issue Draft: PRD-009 — Three Memory Planes: Truth / Temporal / Activation Separation and Implementation

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-29, F-46 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

Doctrine v0.2 and the Entif and Rosetta PRD (2026-04-26) both require three distinct memory planes: **truth** (immutable receipted artifacts), **temporal** (historical state transitions and time-aware projections), and **activation** (recency, frequency, association, proactive trigger logic). The separation must survive all implementation detail.

Currently, the system has a single in-memory canonical cache that conflates truth and activation concerns. There is no separate temporal plane, no time-aware projection system, and no activation scoring mechanism. The PRD states this explicitly: "truth remains; temporal meaning evolves; activation cools and rewarms."

The Phase 3 roadmap calls for implementing these planes only after Text-Core is "honestly useful" — but the separation principle must be baked into the architecture now so that later implementation doesn't accidentally collapse the planes back together.

## Evidence

- **F-29**: "The system shall support three memory planes as doctrine requires: truth/provenance, temporal state/history, and activation/recall. The truth plane stores immutable receipted artifacts. The temporal plane stores historical state transitions and time-aware projections. The activation plane stores recency, frequency, association, and proactive trigger logic." — `turn8file15`
- **F-29**: "That separation must survive all implementation detail, because it is the cleanest answer to your earlier questions about rate-of-decay, future prunability, revisit timing, and revisionary subject matter. Truth remains; temporal meaning evolves; activation cools and rewarms." — `turn8file15`
- **F-46**: "Phase 3 — Memory plane expansion: temporal plane (episodic ingest, temporal edges, evolving-state projection, time-aware retrieval APIs), activation plane (recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, proactive reminder policies)" — `turn8file12`, `turn8file15`

## Requirements

1. **Truth plane interface**: Read-only immutable artifacts keyed by CID. No updates, only new artifacts. Corrections create new artifacts with `prev` links, not mutations of existing artifacts. Interface: `getTruth(cid): Promise<ReceiptedTile>`, `listTruthByRecordFamily(family): Promise<CID[]>`.
2. **Temporal plane design**: Stores historical state transitions — what changed, when, why, and what the prior state was. Keyed by `(recordFamily, timestamp)`. Must support time-range queries and "state at time T" reconstruction. Interface: `getTemporalState(recordFamily, asOf): Promise<StateSnapshot>`, `queryTemporalRange(recordFamily, from, to): Promise<Transition[]>`.
3. **Activation plane design**: Stores recency/frequency/association scores and proactive trigger policies. Not immutable — scores update on each access. Must support "top K by activation score" and "items with revisitBy <= now" queries. Interface: `getActivationScore(cid): Promise<ActivationScore>`, `bumpActivation(cid): void`, `getOverdueRevisits(): Promise<CID[]>`.
4. **Plane separation enforcement**: Each plane has its own storage namespace, no cross-plane mutations. A promotion transition in the temporal plane creates an artifact in the truth plane — the temporal plane records the transition, the truth plane records the resulting artifact.
5. **Cross-plane queries**: "Show me all truth artifacts about topic X, ordered by temporal relevance, filtered by activation heat" requires coordinated query across planes. This is the compiled context / tapestry compilation requirement.
6. **Revisit scheduling**: Activation plane stores `revisitBy` timestamps from CandidateEvaluationVector. System queries for `revisitBy <= now` and triggers re-evaluation workflow.
7. **Conflict-aware confidence**: When temporal plane shows a revision event and activation plane shows high confidence in the prior version, the system must flag contradiction pressure and trigger review.

## Plane Interface Summary

```ts
// Truth Plane — immutable receipted artifacts
interface TruthPlane {
  get(cid: CID): Promise<ReceiptedTile>;
  listByRecordFamily(family: string): Promise<CID[]>;
  query(selector: TruthSelector): Promise<ReceiptedTile[]>;
}

// Temporal Plane — state transitions and history
interface TemporalPlane {
  getStateAsOf(family: string, asOf: Date): Promise<StateSnapshot>;
  queryRange(family: string, from: Date, to: Date): Promise<Transition[]>;
  recordTransition(transition: Transition): Promise<CID>;
}

// Activation Plane — recency, frequency, triggers
interface ActivationPlane {
  getScore(cid: CID): Promise<ActivationScore>;
  bump(cid: CID): Promise<void>;
  cool(cid: CID, byAmount: number): Promise<void>;
  getOverdueRevisits(): Promise<CID[]>;
  getTopK(k: number, lane: Lane): Promise<CID[]>;
}
```

## Acceptance Criteria

- [ ] Truth plane serves as the immutable source of record — no API allows mutation of stored artifacts
- [ ] Temporal plane can reconstruct state as of any past timestamp from stored transitions
- [ ] Activation plane correctly bumps scores on access and cools scores over time
- [ ] Revisit scheduling works — items with `revisitBy <= now` surface in queries
- [ ] Plane separation is enforced — temporal plane transitions create truth artifacts, not vice versa
- [ ] Cross-plane query (truth + temporal + activation) produces coherent compiled context without collapsing plane boundaries
- [ ] Conflict-aware confidence: when temporal revision exists but activation confidence is high, contradiction pressure is raised

## Relationship to Other Issues

- IC-02 (TC-005 Promotion State) creates the transitions that the temporal plane records
- IC-03 (Durable Canonical Cache) is the Postgres backing store for truth plane artifacts
- IC-07 (Trust Scoring) depends on temporal plane for tracking trust decay over time
- Part of Phase 3 Memory Plane Expansion (F-46)

## Recommended Labels

`memory-planes`, `truth-plane`, `temporal-plane`, `activation-plane`, `phase-3`, `architecture`