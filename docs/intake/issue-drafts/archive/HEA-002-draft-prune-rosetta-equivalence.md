# HEA-002: Draft-and-Prune Equivalence Gap — Rosetta as Canonical Aggregation Substrate

## Type
Enhancement / Research Gap

## Priority
HIGH

## Hypothesis
Draft-and-Prune (arXiv 2603.17233) explicitly admits it lacks equivalence-aware aggregation — it currently aggregates by majority vote over surface text strings, not by semantic identity. Rosetta's canonical object model (tiles, bundles, CIDs, frame URIs, role bindings) can fill this gap directly.

## Rationale

Source transcript explicitly states:
- "The authors explicitly note that they do **not** yet do equivalence-aware aggregation"
- Draft-and-Prune prunes by solver-based well-definedness and aggregates at answer level
- Remaining bottleneck: "searching for **semantically correct** formalizations rather than merely executable ones"

Rosetta provides:
- Canonical semantic objects with stable URIs
- Content-addressed tiles identified by CIDs
- Frame bindings with role constraints
- Bundle structures with `core` + ranked `halo`
- Provenance-bound objects

The fix: aggregate surviving candidates not by "did two text strings vote the same" but by:
- Same concept URI
- Same frame URI
- Same role bindings
- Same contradiction/ambiguity state
- Same or equivalent CID-normalized semantic object

This transforms Draft-and-Prune from text-voting to canonical-semantic aggregation.

## Expected Outcome

Draft-and-Prune Lite implementation in Phase 0 uses Rosetta bundle candidates and aggregates by CID/frame-equivalence rather than string majority vote.

## Status
OPEN