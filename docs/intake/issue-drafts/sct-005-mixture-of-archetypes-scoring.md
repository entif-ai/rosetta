# Issue Draft: SCT-005 — Mixture-of-Archetypes Scoring for Diluted Composite Cases

## Metadata

| Field | Value |
|-------|-------|
| Title | SCT-005: Mixture-of-Archetypes Scoring for Diluted Composite Cases |
| Type | research-spec |
| Status | draft |
| Labels | social-cognition, archetypes, scoring, mixture-models |
| Depends On | SCT-004 (Tulpa Stamp Architecture) |
| Evidence | `docs/chats/20260323 - Chat GPT - Social Cognition and Therapy.md` — Finding SCT-005 |

## Summary

Most real-world cases are NOT cleanly matched to single archetypes. They are diluted composites, partial borrowings, opportunistic hybrids, softened shadows of more distinct attractors. The benchmark should score cases as weighted mixtures across archetypal attractors rather than forcing single-label classification.

## Problem Statement

**The key insight:** The operational target is the muddy middle, not the extreme archetypes (which serve as boundary stones).

Most cases in which antisocial, manipulative, maladjusted, deceptive, dysfunctional behaviors manifest are varied-gradient degrees of muted shadows of several archetypal DSM-catalogued conditions. Common, harder to detect, more frequently encountered. This is the "copycat/correlative/corrupt/composite" category.

**Type 1 — Extreme, archetypal, highly-representative:** Largely agreed-upon in the psychological community (e.g., Dahmer for cannibalistic tendencies). One-in-a-million. Serve as boundary-defining comparators.

**Type 2 — Muted gradient composites (main operational target):** The primary evaluation target for the benchmark.

## Benchmark Question Formulation

"What weighted mixture of coercive, exploitative, dissociative, seductive, dependency-seeking, or genuinely reparative patterns best explains this interaction trace, and what is the confidence and counter-evidence for each?"

## Pipeline

Archetype Corpus → Tulpa Stamp → Comparator Engine → Conjecture Bundle → Episteme / Scorecard

## Key Properties

- Mixture weights sum to 1 (or to a normalized confidence budget)
- Counter-evidence for each mixture component must be explicitly tracked
- Confidence bands around each mixture weight
- Rejection of all archetypes (genuinely novel case) must be an explicit output option

## Arms Race Consideration

The ecosystem of manipulation tactics evolves:
- Initially fewer distinct archetypal luminaries (Bandler, Erickson, Satir) vs more imitators (Mystery/Ross Jeffries/PUA ecosystem)
- Over time, as this becomes more important, the arms race between manipulators and defenders accelerates
- Stamp library must be continuously updated with new archetype variants

## Open Questions

- How to determine the optimal number of mixture components?
- How to handle cases where multiple archetypes fire strongly but contradict each other?
- What is the minimum evidence threshold for including an archetype in the mixture?

## Related Issues

- SCT-004 (Tulpa Stamp five-layer architecture — provides the stamps being mixed)
- SCT-001 (benchmark framework — SCT-005 provides the scoring methodology)
