# ROSETTA-v3-008: Conjecture nonReplayable Edge Case Not Handled

**Type:** risk  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

The spec requires Conjecture tiles to track replayability, but does not define what constitutes acceptable justification for nonReplayable, nor how downstream systems should handle non-replayable conjectures when re-evaluating past reasoning.

## Evidence

From § Conjecture:

> Conjectures are **replayable** if marked so (all needed info to recompute is logged) or explicitly flagged as **non-replayable** with justification (e.g., if a randomness or external model was involved that can't be exactly reproduced).

## Problem

1. **Justification standard:** What counts as sufficient justification for nonReplayable? A bare "reason: external model" is insufficient for auditable reasoning.
2. **Handling non-replayable conjectures at re-evaluation:** Non-replayable Conjectures cannot be regenerated. How should the system handle this?
3. **Provenance chain for non-replayable conjectures:** If a decision was made based on a nonReplayable Conjecture, audit trails cannot regenerate it.

## Recommendation

Define nonReplayable handling:
1. **Justification standard:** Require: (a) reason code, (b) version/seed/salt used, (c) data snapshot that was input
2. **Re-evaluation protocol:** Non-replayable Conjectures preserved as immutable historical records but flagged as not subject to re-scoring
3. **Audit fallback:** Require that any decision based on a nonReplayable Conjecture also generate an Evaluation tile

## References

- Core Spine Spec § Conjecture
- Core Spine Spec § Non-collapse of uncertainty rule
- Core Spine Spec § Evaluation

## GitHub Issue

(`rosetta-v3-008-conjecture-nonreplayable-edge-case.md` — draft)
