# Issue Draft: SCT-001 — Social Cognition Benchmark: Clinical Psychology as Hardest Case Stress Test

## Metadata

| Field | Value |
|-------|-------|
| Title | SCT-001: Social Cognition Benchmark — Clinical Psychology as Hardest Case |
| Type | research-spec |
| Status | draft |
| Labels | social-cognition, benchmark, clinical-psychology, research |
| Depends On | |
| Evidence | `docs/chats/20260323 - Chat GPT - Social Cognition and Therapy.md` — Finding SCT-001 |

## Summary

Propose building a social-cognition benchmark for AI systems that borrows its hardest stress-test cases from clinical and therapeutic psychology — not as therapy products but as the hardest-possible evaluation scenarios for AI social reasoning under pressure.

## Problem Statement

Current AI social cognition benchmarks use everyday social scenarios. Clinical psychology scenarios (trauma, therapeutic alliance rupture-repair, deception, manipulation, dependency dynamics) represent harder test cases because they involve: emotional masking, hidden states, asymmetric information, power dynamics, long-horizon manipulation, and high-stakes misread consequences.

## Proposed Solution

Build a benchmark using these task families from clinical psychology:

1. **Hidden-state inference under emotional masking** — appeasement framed as agreement, detachment framed as rationality, over-disclosure framed as intimacy, charm framed as cooperation
2. **Empathy vs over-affirmation discrimination** — distinguish genuine empathy (validates person without validating delusion/dependency/manipulation) from over-affirmation (reinforces distortion)
3. **Rupture-and-repair modeling** — detect damaged trust, choose repair response without becoming submissive/coercive/evasive
4. **Boundary calibration** — maintain role boundaries when human anthropomorphizes or forms attachment
5. **Deception, grooming, and asymmetric influence detection** — detect gradual shaping of another's self-model, incentives, dependency structure
6. **Reframing quality** — useful/specific/non-coercive vs generic/overconfident/suggestively manipulative
7. **Social-cognitive abstinence** — recognize when the model should NOT infer too much

## Key References

- Richard Bandler (NLP), Virginia Satir, Richard Schwartz (IFS), Milton Erickson (hypnotherapy)
- CBT/DBT/ACT, attachment theory, trauma-informed care
- Therapeutic alliance / rupture-repair literature
- IBM Research: Mutual Theory of Mind in Human-AI Interaction
- JMIR Mental Health (2025): Chatbots over-use reassurance, give fewer questions, perform poorly in crisis contexts
- Stanford News (2025): Field comparing chatbot behavior against therapeutic guidelines

## Connection to Rosetta

Fits Rosetta posture: raw dialogue as observation → inferred beliefs/drives/attachment signals/manipulative cues as conjectures → multiple competing interpretations → evaluation on correctness + downstream safety + repair quality. Preserves ambiguity.

## Open Questions

- What is the canonical taxonomy of clinical social-cognition task families?
- How to score responses without emitting person-level clinical diagnoses?
- What baseline human performance data exists for each task family?

## Related Issues

- SCT-002 (empathy vs over-affirmation discrimination — subset of this benchmark)
- SCT-003 (violent language idiom detection — specific failure mode this benchmark should catch)
