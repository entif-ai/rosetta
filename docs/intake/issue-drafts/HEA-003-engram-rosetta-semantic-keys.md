# HEA-003: ENGRAM + Rosetta — Semantic Slugs as Conditional Memory Lookup Keys

## Type
Enhancement / Architecture Alignment

## Priority
HIGH

## Hypothesis
ENGRAM (arXiv 2601.07372) uses token N-grams as deterministic lookup keys into static memory. Rosetta's canonical semantic identities (tile IDs, frame bindings, slug sequences) are the natural upgrade path for ENGRAM's key space, making the lookup substrate philosophically and functionally aligned with Entif's semantic OS.

## Rationale

ENGRAM mechanism:
- Compresses tokenizer IDs into canonical forms
- Extracts suffix N-grams
- Hashes deterministically into embedding tables
- Retrieves static memory vectors
- Gates against current hidden state
- Refines with depthwise causal convolution
- Injects residually at selected layers

ENGRAM's value proposition: offload static/local knowledge instead of reconstructing it through expensive runtime compute.

Rosetta's value proposition: canonical semantic identities that are stable, content-addressed, and composable.

The synergy:
- Current ENGRAM: lookup key = token N-grams (surface, ambiguous)
- Future ENGRAM: lookup key = semantic slug sequences, tile IDs, frame composites (canonical, unambiguous)

Source explicitly states: "lookup keys could eventually be semantic slug sequences, tile IDs, frame bindings, or compact canonical composites" rather than raw token neighborhoods.

Additional alignment: ENGRAM's deterministic address computation enables host-memory prefetch and overlap with compute — Rosetta's CID-based content addressing could enable similar prefetch patterns for semantic tile assemblies.

## Expected Outcome

Design doc for future ENGRAM integration specifying Rosetta-native lookup keys. Not Phase 0 but architecturally tracked as a high-value upgrade path.

## Status
OPEN