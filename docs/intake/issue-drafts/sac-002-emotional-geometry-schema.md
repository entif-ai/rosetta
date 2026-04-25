# SAC-002: Emotional Geometry Schema — Formal Definition and Graph Integration

## Meta

- Type: specification
- Priority: high
- Status: draft
- Source: docs/ideas/Semantic Audio Cognition Framework.md — gap item 5

## Problem Statement

Crates describes wanting to capture "emotional geometry and clip's evolution over time" — an affective arc that tracks how emotion unfolds across an audio clip. "Emotional geometry" is invoked as a concept but is not formally defined in any existing Rosetta or Entif artifact.

The emotional geometry schema is a required output of audio cognition processing and must be representable as a first-class data structure that can be:
1. Stored and queried (PostgreSQL)
2. Embedded for similarity (pgvector)
3. Integrated into the semantic graph (as a node type or node property)
4. Compared across clips for affective pattern recognition

## Proposed Schema

**EmotionalGeometry v1:**

```
EmotionalGeometry {
  clip_id: uuid
  total_duration_ms: int

  segments: EmotionalSegment[]  # time-series array
}

EmotionalSegment {
  start_ms: int
  end_ms: int
  valence: float      # -1.0 (negative) to +1.0 (positive)
  arousal: float     #  0.0 (calm)    to  1.0 (intense)
  dominance: float   #  0.0 (submissive) to 1.0 (dominant)
  emotion_vector: float[16]  # learned embedding; interpretable labels derived from this
  primary_label: string       # dominant emotion: joy, sadness, anger, fear, surprise, disgust, anticipation, trust, etc.
  confidence: float           # model confidence 0.0–1.0
}
```

**Arc-level summary:**
```
AffectiveArc {
  clip_id: uuid
  arc_type: enum[build, release, oscillation, static, mixed]
  start_valence: float
  end_valence: float
  peak_arousal: float
  peak_arousal_timestamp_ms: int
  arc_coherence_score: float  # how smooth/continuous the arc is vs fragmented
  dominant_emotion: string
  secondary_emotion: string
}
```

## Graph Integration

The `AffectiveArc` should be stored as a node in the semantic graph:
- Node type: `affective_arc`
- Properties: all arc-level fields
- Edges: connects to source clip node, speaker prosodic signature node (no identity), and related concept nodes (thematic similarity via emotion vector similarity)

## Questions for Crates

- Is the VAD (Valence-Arousal-Dominance) model appropriate or should emotional geometry follow a different model (e.g., Plutchik's wheel, discrete emotions)?
- What arc_type taxonomy should be used? "build/release/oscillation/static/mixed" is one option but may not capture all patterns.
- What is the minimum segment duration? Audio is continuous; segmentation introduces quantization error.
- Should emotional geometry be computed at the stem level (per instrument/voice) or only at the composite clip level?