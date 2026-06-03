# Issue Draft: VM-002 — EECG/Affect Trace Has No Canonical Format Across Docs

## Metadata

| Field | Value |
|---|---|
| Issue ID | VM-002 |
| Type | architecture |
| Status | draft |
| Source doc | docs/ideas/Entif Viral Media Mirror Systems Diagram.md |
| Extraction date | 2026-06-01 |
| Confidence | high |

## Problem

The Viral Media Mirror spec defines an "Affect Trace" object:

> "time-series of emotions, intensity, coherence, entropy"

The Emotional-Cognitive Layer maps to EECG (Emoji-Grounded Cognitive Graph) which produces "affect vectors over time."

Separately, the Semantic Audio Cognition Framework (SAC) defines psychoacoustic affect mapping that produces emotional geometry from audio input.

And the Entif 2.0 docs define EECG as a first-class cognitive primitive.

Three different docs define emotional representation primitives with no shared schema.

## Evidence

**VMM Affect Trace:**
```
Affect Trace: time-series of emotions, intensity, coherence, entropy.
```
Fields: emotion categories, intensity (0-1?), coherence score, entropy score

**SAC Framework (docs/ideas/Semantic Audio Cognition Framework.md):**
- Emotional geometry: affect dimensions (valence, arousal, dominance) + coherence + entropy
- Prosodic signature as biometric-like emotional fingerprint
- No shared format with VMM

**Entif 2.0 (docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md):**
- EECG: maps emotions to emoji-grounded cognitive graph nodes
- Affect vector is the primary representation
- No shared format with VMM

**NOT LAME PRD:**
- Memory Plane 3 (activation/relevance) has activation scoring
- Novelty + trust scoring as the primary multi-axis scoring
- No affect representation defined

## Cross-Doc Collision

The same concept (emotional state representation) appears in at least 3 places with incompatible representations:

| Doc | Representation | Dimensions | Time-series? | Storage |
|---|---|---|---|---|
| VMM | Affect Trace | emotions + intensity + coherence + entropy | Yes | TSDB unnamed |
| SAC | Emotional Geometry | valence-arousal-dominance + coherence + entropy | Yes | unnamed |
| Entif 2.0 | EECG | emoji-tagged affect vectors | Yes | graph DB unnamed |
| NOT LAME | Activation scoring | novelty + trust | No (snapshot) | PG |

## Recommendation

1. Designate one canonical AffectRepresentation format as the standard
2. Produce a formal schema (AffetTrace v1 schema) with: timestamp, valence, arousal, dominance, intensity, coherence, entropy, modality_source
3. Map other representations to the canonical format via adapter
4. Add to cross-doc concept index under `affect-representation`
5. Document which plane of Rosetta memory system owns affect traces

## Labels

- affect-representation
- EECG
- data-model
- cross-doc-collision

## Depends On

(None — foundational; should be resolved before VM-003 cadence emulator)
