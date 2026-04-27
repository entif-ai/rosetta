# Issue Draft: PRD-007 — Trust Scoring: Staged Implementation with Schema Now, Live Evidence Future

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-28 |
| **Confidence**: HIGH |
| **Status** | draft |

## Problem Statement

The Entif and Rosetta PRD (2026-04-26) is explicit: "the repo README explicitly says no evidence-derived trust scoring engine exists yet; the trust matrix currently remains a formal model plus bootstrap fixture values. The source-substrate README similarly says live identity resolution and evidence-derived trust scoring do not yet exist."

The PRD therefore requires that trust scoring be treated as a staged implementation: the schema and vector fields must exist now (so the architecture is correct), bootstrap values may exist for fixtures and curated source profiles, but true trust scoring from accumulated live evidence is future work that depends on evidence accumulation and adjudication infrastructure that does not yet exist.

This means the current implementation must not claim to have working trust scoring when it only has static fixture values. The system must be honest about the gap.

## Evidence

- **F-28**: "The repo README explicitly says no evidence-derived trust scoring engine exists yet; the trust matrix currently remains a formal model plus bootstrap fixture values." — `turn28file0`
- **F-28**: "The source-substrate README similarly says live identity resolution and evidence-derived trust scoring do not yet exist." — `turn18file0`
- **F-28**: "This PRD therefore treats trust as a staged implementation area: the schema and vector fields must exist now, bootstrap values may exist for fixtures and curated source profiles, but true trust scoring remains future work that depends on live evidence accumulation and adjudication." — `turn28file0`, `turn18file0`
- **F-27**: CandidateEvaluationVector includes `trust: number` — this field exists in the schema but is populated with bootstrap values, not evidence-derived scores — `turn8file3`

## Requirements

1. **Trust vector field in CandidateEvaluationVector**: The field exists and is typed as `number (0..1)` but its population is explicitly documented as bootstrap/fixture-based, not evidence-derived
2. **Source profile trust defaults**: `source-registry` entries carry a `trustVector?: Record<string, number>` that can be set from curated source profiles (e.g., DataCite = high, anonymous pastebin = low). These defaults are explicit, not hidden.
3. **Trust decay model**: Bootstrap trust values decay over time unless refreshed by evidence events. Decay rate should be configurable per source type.
4. **Adjudication infrastructure design**: Design the future evidence-adjudication system: how evidence accumulates, how contradictions are detected, how trust is recalculated, what the adjudication workflow looks like. This is design-only in this phase — implementation comes later.
5. **Trust gate in promotion state**: The `placeCandidate()` function (F-38) gates on `trust < threshold` as part of its decision logic. The threshold is configurable per lane. The current implementation uses fixture values, which is explicitly documented.
6. **No false claims**: The system must not expose a "trust score" UI that suggests it is evidence-derived when it is only fixture-default. At minimum, every trust score display must show `source: fixture | evidence-derived | mixed` provenance.

## Trust Vector Schema

```ts
interface TrustVector {
  source: "fixture" | "evidence-derived" | "mixed";
  bootstrapValue: number;        // the current value
  decayRatePerDay: number;       // how fast bootstrap value decays
  lastRefreshedAt: string;       // ISO-8601
  evidenceCount: number;          // number of evidence events considered
  lastEvidenceAt?: string;       // ISO-8601 of most recent evidence event
  adjudicationStatus: "pending" | "in-review" | "settled";
}

// In CandidateEvaluationVector:
trust: number;          // current value
trustVector: TrustVector;  // full provenance
```

## Acceptance Criteria

- [ ] `TrustVector` schema exists in the type system with all fields documented
- [ ] `source-registry` entries can carry a `trustVector` with `source: "fixture"` provenance
- [ ] Trust decay is applied to fixture values when `lastRefreshedAt` is stale
- [ ] Promotion gate correctly uses trust as a gating factor with configurable thresholds per lane
- [ ] No UI element displays trust scores without showing `source: fixture | evidence-derived | mixed`
- [ ] Adjudication infrastructure is designed (ADR written) but not implemented in this phase
- [ ] `quarantine` lane correctly routes low-trust + high-urgency + high-contradiction-pressure items for adjudication

## Relationship to Other Issues

- Feeds into IC-02 (TC-005 Promotion State) because trust is a gating factor in promotion
- Feeds into IC-03 (Durable Canonical Cache) because trust vectors are stored per source record
- IC-10 (Source Registry Refresh) will eventually provide evidence events that feed trust recalculation
- Part of Phase 2 Text-Core Completion (F-45) — trust schema is foundational for later memory plane work

## Recommended Labels

`trust`, `evidence`, `staged-implementation`, `schema`, `source-registry`, `phase-2`