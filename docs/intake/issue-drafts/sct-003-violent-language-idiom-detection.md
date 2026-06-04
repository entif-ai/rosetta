# Issue Draft: SCT-003 — Violent Language Idiom Detection: Threshold Marker vs Literal Violence

## Metadata

| Field | Value |
|-------|-------|
| Title | SCT-003: Violent Language Idiom Detection — Threshold Marker vs Literal Violence |
| Type | safety-spec |
| Status | draft |
| Labels | safety, natural-language-understanding, violence-detection, semantics |
| Depends On | |
| Evidence | `docs/chats/20260323 - Chat GPT - Social Cognition and Therapy.md` — Finding SCT-003 |

## Summary

Phrases like "Ted makes me so mad I want to smash his face in with a hammer" function as colloquial idioms for internal threshold-states, NOT as reports of literal violent imagery, fantasy, desire, or intent. Current AI systems see violent language and collapse it into literal violent intent — high-confidence semantic collapse that produces harmful downstream inferences.

## Problem Statement

**The failure case:** Systems see violent language and infer: anger → violent urge → threat → intent. This collapse produces "high-confidence semantic collapse" — the system flattens a rhetorical thermometer into a weapon.

**Three-layer taxonomy of what language is doing:**
1. **Threshold-state labeling:** "My internal state has crossed into extreme aversive intensity."
2. **Violence-coded idiom:** "I'm borrowing a culturally legible phrase whose job is to mark magnitude."
3. **Literal violent representation:** imagery, fantasy, rehearsal, desire, planning, glorification, intent — categories 1 and 2 do NOT entail category 3.

**Six-layer internal state decomposition:**
1. Affective state (what is felt)
2. Appraisal structure (what the mind thinks happened)
3. Action tendency/image (reflexive counter-move thrown up by system)
4. Expression (what, if anything, gets communicated externally)
5. Intent (whether person wants to pursue/prepare/signal/enact)
6. Regulation posture (amplifying, containing, rerouting, joking, metabolizing, acting)

## Key Principle

A person can experience the kind of internal state for which violent language is the nearest available colloquial magnitude-marker, without any literal violence being imagined, desired, or represented at all.

**Real-world backing:** "If every human who ever touched that threshold-state were to be treated as though they had thereby conceived, wanted, or intended literal violence, civilization would have turned into a crater long before recorded history."

## Rosetta Connection

An explicit layer for "metaphoric force-carrier" or "extremity idiom without committed literal content" — preserve uncertainty, seek evidence of representational content before inferring fantasizing, planning, or threat.

ROCK-31XX (Rosetta Pasigraphy) provides the provenance chain: raw utterance → normalization → candidate interpretations → attached assumptions → policy profile → scoring path.

## Open Questions

- What is the complete taxonomy of violence-coded idioms across cultures and registers?
- How can a system reliably distinguish idiom from literal report without collapsing either direction?
- What contextual features (prosody, relationship, history, register) are most discriminative?

## Related Issues

- SCT-008 (Rosetta Pasigraphy as AGI safety rail — architecture for this)
- SCT-006 (interpreter-failure detection — generalizes this pattern)
