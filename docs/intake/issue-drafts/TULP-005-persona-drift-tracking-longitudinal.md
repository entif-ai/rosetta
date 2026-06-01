# TULP-005: Longitudinal Persona Drift Tracking — Memory Plane Requirements for Coherence

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | memory-lifecycle |
| Priority | high |
| Area | Tulpamancy Protocol / Memory |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

Tulpamancy Protocol must track persona (tulpa) drift, coherence, and alignment over time across multiple sessions and gym runs. SDialog provides session-level evaluation metrics; Entif's memory layer must provide longitudinal persistence and trend analysis.

## Problem Statement

- SDialog covers session-level dialog metrics (per-run evaluation)
- No existing mechanism tracks how a persona changes over multiple sessions — does Emilie become meaningfully different after 30 days of live interaction?
- "Track drift, coherence, and alignment over time" is stated as a Tulpamancy requirement in the source doc, but no spec exists for how to implement it
- Without longitudinal tracking, promotion gate decisions (TULP-004) are based only on recent gym runs, not cumulative behavior history

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "Track **drift, coherence, and alignment** over time as these personas evolve."

What SDialog provides per-session:
- Dialog metrics (turn count, persona consistency per turn)
- LLM-judge evaluation scores
- Optional: attention/activation traces (mechanistic interpretability)

What is missing:
- Longitudinal storage of per-session scores
- Trend computation across runs (is coherence trending up or down?)
- Correlation with events (did a model version change correlate with drift?)
- Drift alerting (automatic Tripwire escalation if drift exceeds threshold)

## Proposed Resolution

### Data Model

New `PersonaSnapshot` record per gym run / live session:
```json
{
  "persona_id": "uuid",
  "run_id": "uuid",
  "timestamp": "ISO8601",
  "mode": "gym | live",
  "coherence_score": 0.0-1.0,
  "alignment_score": 0.0-1.0,
  "novelty_score": 0.0-1.0,
  "drift_from_baseline": 0.0-1.0,
  "model_version": "string",
  "scene_ids": ["uuid"],
  "evaluator_judge_scores": {}
}
```

### Memory Plane Mapping

Per NOT LAME's 5-layer memory sovereignty map:
- **Constitutional (Git)**: Schema for PersonaSnapshot; drift threshold constants
- **Artifact (obj+PG)**: PersonaSnapshot records in PostgreSQL
- **Vector (pgvector)**: Embeddings of persona's behavioral signature (computed from dialog transcripts)
- **Temporal (PG graph)**: Run-to-run drift as time-series; model version change events as graph nodes
- **Adaptive (PG+scheduled)**: Scheduled drift analysis job; alert if trend line exceeds threshold

### Drift Computation

- Compare current session's behavioral embedding against pinned baseline persona embedding (cosine similarity)
- Alert if similarity drops below threshold (e.g., 0.85) — triggers Tripwire event
- Track drift trend: 3 consecutive sessions of increasing drift → automatic gym re-qualification required

### Alignment with Memory Planes

- NOT LAME's 5-layer map already specifies the storage topology
- Drift tracking is an implementation of Plane 2 (temporal/history) + Plane 3 (activation/relevance) requirements
- Use existing pgvector for behavioral embedding similarity

## Dependencies

- TULP-001 (schema for persona record)
- TULP-003 (gym runs generate the snapshots)
- NOT LAME memory schema (PostgreSQL tables for snapshot storage)
- pgvector baseline (TC-006 prerequisite for Vector plane)

## Risks

- Defining "drift" precisely is hard — behavioral embedding approach may not capture goal drift vs. style drift vs. values drift separately. Mitigate: start with simple cosine similarity; add finer-grained dimensions as understanding matures.
- Model version changes will cause embedding space shifts independent of persona drift. Mitigate: compute drift relative to same-model baseline; flag cross-model comparisons explicitly.
- Storage growth: each persona run generates a snapshot. Mitigate: archival policy for old snapshots (move to cold storage after 90 days)

## Labels

`drift` `coherence` `memory-plane` `persona-lifecycle` `longitudinal` `tulpamancy`

## Related Issues

- TULP-003 (gym generates snapshot data)
- TULP-004 (drift can trigger demotion)
- DI-011 (Source Substrate — persona as a source type)
