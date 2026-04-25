# SAC-004: Cross-Modal Audio-Visual Parity Benchmark

## Meta

- Type: requirement
- Priority: high
- Status: draft
- Source: docs/ideas/Semantic Audio Cognition Framework.md — cross-modal parity goal

## Problem Statement

Crates articulates the goal explicitly: Emilie (Entif) should be able to "REALLY hear" the way she can "really see" when processing images. The current state is described as "audio-deaf" — not totally incapable, but lacking the depth of rich multimodal comprehension that visual inputs currently provide.

There is no defined benchmark for measuring whether audio comprehension in Entif has achieved parity with visual comprehension. Without a benchmark, progress cannot be measured, PRs cannot be validated, and the goal remains aspirational rather than achievable.

## Cross-Modal Parity Concept

Visual comprehension in LLMs currently includes:
- Object recognition and classification (what is in the image)
- Spatial relationships (where things are relative to each other)
- Text extraction (OCR, legible text)
- Color and composition analysis
- Scene context and implied narrative
- Emotional tone of visual content (bright/dark, chaotic/calm)

The audio analog would include:
- **Source identity** (who is speaking, prosodic signature)
- **Linguistic content** (what words were said, in any language)
- **Prosodic meaning** (how it was said — sarcasm, sincerity, hesitation, emphasis)
- **Musical structure** (instrumentation, key, tempo, form, emotional arc)
- **Spatial audio** (stereo image, room characteristics, distance cues)
- **Affective arc** (how emotional tone evolves over the clip)

Parity is NOT: identical capability across modalities (audio doesn't need object recognition, visual doesn't need pitch tracking).
Parity IS: equivalent depth of semantic extraction and graph integration from each modality.

## Proposed Benchmark Framework

Define **Semantic Extraction Depth Score (SEDS)** per modality:

```
SEDS_modality = {
  coverage: % of semantic dimensions extracted from input
  accuracy: % of extractions verified as correct
  integration: % of extractions successfully linked to graph
  latency_ms: processing time
  attribution: % of extracted semantics with source attribution
}
```

Cross-modal parity = SEDS_audio within 10% of SEDS_visual on equivalent clip complexity.

## Metrics to Track

| Metric | Visual Analog | Audio Analog | Parity Target |
|---|---|---|---|
| Source attribution | Object location | Speaker prosodic signature | Within 10% accuracy |
| Content extraction | OCR word count | Transcription word count | 95% accuracy |
| Emotional tone | Scene valence classification | Clip valence-arousal-dominance | Within 0.15 VAD units |
| Contextual linking | Image → related concepts | Audio → related concepts | 80% of visual linking rate |
| Semantic graph integration | Image node + edges | Audio node + edges | Full integration |

## Questions for Crates

- Is "within 10% of SEDS_visual" the right parity target or should it be tighter/looser?
- What is the reference benchmark clip set? Would need curated audio+visual pairs for equivalent scenes/events
- Should benchmark be per-component (diarization, stem isolation, prosody, emotional geometry) or holistic?
- Is there an existing audio benchmark dataset (e.g., AudioSet, Freesound) that could serve as the test corpus?