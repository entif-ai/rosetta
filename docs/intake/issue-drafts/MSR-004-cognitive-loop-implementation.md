# MSR-004: Cognitive loop implementation — frame→intake→distill→score→route→store→correlate→appropriate→integrate→consolidate

## Issue Type
implementation

## Summary
Full cognitive loop architecture defined. Thin v0 slice scoped as MVP. Full cathedral deferred.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 4, "concrete revised loop" and "thin vertical slice for v0")

Revised operational loop:
frame → intake → normalize → distill (classify/summarize/extract claims/hypothesize/ideate/benchmark-candidate/contradiction-check) → score → route → store → correlate → appropriate → integrate → consolidate (merge/compact/decay/re-rank/promote/demote/dream)

## v0 Thin Slice Scope

### Per Item (mandatory v0)
- source envelope (canonical source ID, provenance pointer, timestamps, access scope, content hash)
- normalized text/chunks
- tags
- score vector (multi-dimensional: relevance, quality, cost, adoption fitness)
- short summary
- extracted claims
- action ideas
- route decision (which layer/actor/context)

### Per Promoted Concept (v0 target)
- concept card
- evidence links
- competing options
- preference ranking
- heuristic
- last reviewed timestamp

### Per Nightly Cycle (v0 target)
- top deltas
- contradictions surfaced
- heuristics updated
- candidate promotions
- stale canon flagged

## Dependencies
- MSR-003 (five-layer memory model) must be defined before loop can store to layers
- Artifact species taxonomy (MSR-005) must be defined before stages emit correctly-typed outputs

## Labels
cognitive-loop, pipeline

## Depends On
MSR-003, MSR-005
