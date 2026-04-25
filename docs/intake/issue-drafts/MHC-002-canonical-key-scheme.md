# MHC-002: CanonicalKey Scheme for Semantic Identity Registry

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `engram`, `canonical-key`, `semantic-identity`, `deterministic-id`, `memory`
**Depends on:** none

## Problem Statement

Engram-style deterministic IDs for semantic identity. Every canonical concept needs: normalization rules, alias sets, ambiguity sets, provenance receipts, supersession chain. No such scheme exists in Rosetta — the identity layer of the semantic stack is undefined.

## Specific Findings

- **F-ENG-002** (confidence: high): Deterministic addressing for memory slots — reproducible attribution
- **F-ENG-003** (confidence: high): Tokenizer/ID pathologies where semantically equivalent terms have disjoint IDs — motivates canonical normalization
- **F-SYN-003** (confidence: high): CanonicalKey scheme where every concept has: normalization rules, alias sets, ambiguity sets, provenance receipts, supersession chain
- **F-ENG-004** (confidence: high): Retroactive refinement via versioned entries with supersession edges

## Action Required

1. Define `canonical-key` scheme: hash algorithm (e.g., SHA-256 of normalized form), namespace convention, version field, timestamp
2. Define `semantic-identity` tile type: canonicalKey, aliases[], ambiguitySets[], normalizationRules, provenanceReceipt, supersessionChain, confidenceScore
3. Deterministic lookup interface: given an input surface form, return canonical key (Engram-style prefetch)
4. Host memory management: strategy for large identity tables (billions of entries), tiered storage approach
5. Conflict resolution: hash collision handling, namespace collision handling
6. Normalization algorithm: what constitutes "semantically equivalent" — case, whitespace, punctuation, Unicode normalization, language
7. Provenance attachment: for each alias resolution, record which input produced which canonical key
