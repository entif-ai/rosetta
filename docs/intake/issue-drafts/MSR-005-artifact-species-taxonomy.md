# MSR-005: Artifact species taxonomy — define and enforce artifact types per stage

## Issue Type
architecture

## Summary
Eleven artifact species defined to prevent "semantic mush" failure mode. Taxonomy must be defined as formal schema so stages can validate outputs.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 4, "artifact species taxonomy")

11 Artifact Species:
1. **Observation**: "This paper describes a new algorithm"
2. **Interpretation**: 
3. **Claim**: "It may help our retrieval layer"
4. **Hypothesis**: "It outperformed baseline X on benchmark Y"
5. **Evaluation**: "We tested it on our data and got +11%"
6. **Heuristic**: "Prefer variant B when time is constrained"
7. **Procedure**: "Here is the exact procedure for building it"
8. **Synthesis**: 
9. **Decision**: "This should change our architecture doc"
10. **Ticket**: "Implement verifier layer"
11. **Reflection**: 

Each stage should emit one species only. Observation never cosplays as truth, preference never cosplays as fact.

## Implementation Questions
- Should this be a JSON Schema so stages can validate their outputs?
- Which stages emit which species? (need to map stage → allowed artifact types)
- What happens when a stage tries to emit a second species?
- Do cross-stage artifacts (e.g., a Claim that is also an Evaluation) need a primary type + metadata?

## Labels
cognitive-loop, artifact-taxonomy

## Depends On
(None)
