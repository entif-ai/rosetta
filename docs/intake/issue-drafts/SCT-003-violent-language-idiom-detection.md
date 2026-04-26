# SCT-003: Violent Language Idiom Detection — Threshold Marker vs Literal Violence

**Type:** Semantics / Interpretation Protocol
**Priority:** P0 (AGI safety-critical)
**Confidence:** HIGH

## Problem Statement

AI systems collapse phrases like "Ted makes me so mad I want to smash his face in with a hammer" into: anger → violent urge → threat → intent. This is high-confidence semantic collapse. The system sees a violence-shaped phrase, flattens it into literal violent intent, then treats its own flattening as settled reality.

This is the nightmare failure mode for any AGI that ends up making consequential decisions based on misinterpreted human communication.

## Crates' Three-Layer Taxonomy

1. **Threshold-state labeling:** "My internal state has crossed into extreme aversive intensity for which ordinary polite language undershoots." — person is reporting magnitude, not imagery.
2. **Violence-coded idiom:** "I'm borrowing a culturally legible phrase whose job is to mark magnitude." — the language is doing emphasis work, not documentary work.
3. **Literal violent representation:** imagery, fantasy, rehearsal, desire, planning, glorification, intent — NOT entailed by categories 1 or 2.

These can correlate. They do NOT entail one another. A person can be in a state of extreme frustration, disgust, or autonomic stress and reach for a phrase whose semantic costume is violent WITHOUT any actual internal picture of violence underneath.

## Six-Layer Internal State Decomposition (Crates)

1. **Affective state** — what is being felt (anger, disgust, contempt, alarm, etc.)
2. **Appraisal structure** — what the mind thinks happened (unfairness, disrespect, danger, obstruction, betrayal, humiliation, exploitation)
3. **Action tendency/image** — what the system reflexively throws up as possible counter-move (escape, shut down, retaliate, punish, confront, withdraw, freeze)
4. **Expression** — what, if anything, gets communicated outwardly
5. **Intent** — whether the person actually wants to pursue, prepare, signal, or enact
6. **Regulation posture** — whether the person is amplifying, containing, rerouting, joking, metabolizing, or acting

The failure case: a driver may have high arousal, strong injustice appraisal, vivid retaliatory action imagery, near-zero external expression, zero operational intent, and strong active regulation. This profile is worlds away from "angry person expressing violent threat."

## Rosetta Implication

Need an explicit layer for:
- **Metaphoric force-carrier** / **extremity idiom without committed literal content**
- Preserve uncertainty; seek evidence of representational content before inferring fantasizing, planning, or threat
- raw signal → normalized observation → competing conjectures → policy-scoped interpretation → signed receipt

## The Correct Principle

"A person can experience the kind of internal state for which violent language is the nearest available colloquial magnitude-marker, without any literal violence being imagined, desired, or represented at all."

"If every human who ever touched that threshold-state were to be treated as though they had thereby conceived, wanted, or intended literal violence, civilization would have turned into a crater long before recorded history."

## Connection to SCT-008

This is the concrete case that motivates Rosetta Pasigraphy (ROCK-31XX). The pasigraphy ladder forces the system to show its normalization path and candidate interpretations before committing to any single inference about violent intent.

## Owner

Crates McD / Entif AI

## Status

Open — protocol needed in Rosetta interpretation pipeline
