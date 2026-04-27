# SAC-001: Audio Source Identity — Prosodic Signature vs Biometric Fingerprinting

## Meta

- Type: architecture/spec-gap
- Priority: high
- Status: draft
- Source: docs/ideas/Semantic Audio Cognition Framework.md — gap item 1
- Related: DI-011 (Source Substrate domain gap), DI-012 (anti-personhood-correlation governance)

## Problem Statement

Crates identifies "speaker/singer diarization and fingerprinting of their dialect, tone; everything making them unique" as a required component of Semantic Audio Cognition.

However, voice biometric fingerprinting enables deterministic identification of a specific person from audio alone — which is the same ethical risk flagged in DI-012: PID/identity spine enabling personhood correlation. Voice is personally identifiable biometric data in many jurisdictions (GDPR Article 4(14), BIPA, CCPA).

Emilie's audio cognition must be able to attribute prosodic qualities to speakers without constructing or storing a biometric identity profile.

## Technical Resolution

Two distinct concepts must be separated:

**Prosodic signature (permissible):** Statistical characterization of how a person speaks — cadence, rhythm, pitch range, intonation patterns, voice texture. These are continuous-valued behavioral attributes, not discrete identity claims. Two prosodic signatures can be similar without claiming the same person. No biometric template is stored.

**Biometric fingerprinting (restricted):** Deterministic voice biometric models that produce a unique, reusable identifier for a specific individual. These can be matched against a database to identify who is speaking. This is what enables personhood correlation and must be prohibited.

## Proposed Approach

Define a `SpeakerAttributes` data structure that captures prosodic signature without biometric identity:

```
SpeakerAttributes {
  average_pitch_hz: float
  pitch_range_cents: float
  speech_rate_syllables_per_sec: float
  pause_frequency_per_minute: float
  rhythm_regularity_score: float
  timbre_texture_vector: float[32]  # learned embedding, not tied to identity
  dialect_region_probability: float  # dialect probability, not identity
  emotional_expressivity_profile: float[8]
}
```

Critically: no persistent speaker ID, no biometric template, no cross-clip linking of identity. Each clip is analyzed independently for prosodic signature. If two clips have similar prosodic signatures, we note "similar prosodic profile" — not "same person."

## Implementation Notes

- Diarization should use speaker embedding for separation (who said what) but NOT store or link embeddings to identity
- The 8-provenance-lane Source Substrate model should be extended to include an audio-prosodic lane that carries SpeakerAttributes without identity linkage
- Anti-personhood-correlation language from DI-012 must explicitly cover audio prosodic data, not just PID spines

## Questions for Crates

- Is the proposed separation (prosodic signature vs biometric fingerprint) aligned with the intent of "speaker uniqueness without identity tracking"?
- Should dialect_region be tagged with geographic confidence or just regional tendency?
- Is the 32-dim timbre_texture_vector appropriate or does it risk becoming a de facto biometric identifier?