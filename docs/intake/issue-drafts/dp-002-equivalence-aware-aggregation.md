# D&P-002: Equivalence-Aware Aggregation for Draft-and-Prune

## Metadata

- **Type**: implementation
- **Status**: draft
- **Labels**: draft-and-prune, aggregation, canonicalization
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high
- **Depends on**: D&P-001

## Problem Statement

D&P's aggregation is currently answer-level majority voting over token strings. This fails when semantically identical formalizations use different surface wording. The D&P paper explicitly lists lack of equivalence-aware aggregation as future work.

Rosetta's content-addressed tile/tapestry machinery provides the blade needed here.

## Proposed Implementation

Replace D&P's string-voting aggregation with:

```
def aggregate(candidates: List[Bundle]) -> Bundle:
    # Group by canonical CID
    groups = defaultdict(list)
    for c in candidates:
        cid = c.canonical_id  # content-addressed identity
        groups[cid].append(c)
    
    # For each group, compute consensus bundle
    # - same concept URI
    # - same frame URI
    # - same role bindings
    # - same contradiction/ambiguity state
    
    # Preserve ambiguity: if multiple CID groups survive,
    # emit multi-bundle with ranked candidates
    
    # Only collapse to single bundle when one CID group 
    # has unambiguous majority
```

Key properties:
- equivalence based on CID normalization, not string comparison
- ambiguity preserved as multi-bundle when multiple concepts compete
- provenance tracked through aggregation process

## Expected Outcome

Semantically identical candidates using different surface wording aggregate correctly; ambiguity handled as first-class citizen rather than collapsed.

## Dependencies

- D&P-001 (D&P harness integration with Rosetta bundle space)
- Rosetta tile/tapestry content-addressing infrastructure (Phase A)

## Test Scenarios

1. Two candidates with same concept URI but different frame bindings → separate bundles
2. Two candidates with same concept URI + same frame bindings + same role bindings → merged
3. Three-way ambiguity where no single CID group has majority → multi-bundle output with ranked candidates
4. Aggregation provenance: each merged bundle tracks which candidates contributed

## Reference

"The paper explicitly lists lack of equivalence-aware aggregation as a current limitation, which is exactly where your content-addressed tile/tapestry machinery starts looking like a blade." — source doc