# MHC-005: mHC Stability Properties as Rosetta Tile Invariants

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `mhc`, `stability`, `invariant`, `rosetta`, `tile-constraints`
**Depends on:** none

## Problem Statement

mHC's Birkhoff polytope constraint provides three stability properties (non-expansive bound, closure under composition, soft-permutation convex combination) that are directly analogous to desirable tile pipeline properties. Rosetta has no mechanism to encode these as tile-level invariants, and the stability properties that make mHC work are not currently modeled in Pasigraphy.

## Specific Findings

- **F-MHC-002** (confidence: high): Doubly stochastic constraint via Sinkhorn-Knopp — spectral norm bounded by 1
- **F-MHC-003** (confidence: high): Three stability properties: non-expansive bound, closure under composition, Birkhoff polytope = convex hull of permutation matrices
- **F-MHC-004** (confidence: high): Composite max gain ~1.6 vs. ~3000 in unconstrained HC — three orders of magnitude better stability

## Action Required

1. Define "doubly-stochastic" tile constraint in Rosetta's JSON Schema / SHACL — nonnegative entries, row sum = 1, column sum = 1
2. Composite stability invariant: tile pipeline stages composed must preserve spectral norm ≤ 1 (non-expansive bound)
3. Closure under composition: verify that composing two doubly-stochastic tiles produces a doubly-stochastic result (or a validated sub-type)
4. Soft-permutation interpretation: can a tile's cross-stream mixing be expressed as convex combination of permutation tiles? Define permutation tile type
5. Integration with existing Pasigraphy tile type system — are stability-constrained tiles a subtype of existing tiles or a new category
6. Validation test suite: generate random tile sequences, verify stability properties hold across compositions
7. Empirical benchmark: compare tile pipeline stability with/without doubly-stochastic constraints
