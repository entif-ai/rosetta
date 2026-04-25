# MHC-001: TranslationEvidence Tile Type (Doubly Stochastic Transport Plans)

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `mhc`, `translation-evidence`, `transport-plan`, `rosetta`, `tile-types`
**Depends on:** none

## Problem Statement

ChatGPT proposes mHC-style doubly stochastic matrices as "TranslationEvidence" objects — transport plans with constraints, confidence mass, and versioning. Rosetta has no tile type for representing soft mappings between concept spaces with preserved uncertainty and stability constraints.

## Specific Findings

- **F-MHC-003** (confidence: high): Birkhoff polytope provides non-expansive bound, closure under composition, and convex combination of soft permutations
- **F-SYN-003** (confidence: high): TranslationEvidence objects as mHC-style doubly stochastic matrices with constraints, confidence mass, and versioning
- **F-MHC-002** (confidence: high): Doubly stochastic constraint (nonnegative entries; row and column sums to 1) via Sinkhorn-Knopp

## Action Required

1. Define `translation-evidence` tile type with properties: sourceConcept, targetConcept, transportMatrix (doubly stochastic), confidenceMass, version, supersession-edge, entropy
2. Write JSON Schema for the tile type with doubly-stochastic constraint validation
3. Birkhoff polytope constraint: verify matrix is doubly stochastic at tile creation time (Sinkhorn-Knopp iteration check)
4. Version lineage and supersession chain tracking
5. Interaction with Pasigraphy meaning pipeline: where does TranslationEvidence enter/exit, what tile types can reference it
6. Profile conformance: which Rosetta profiles require TranslationEvidence tile support
