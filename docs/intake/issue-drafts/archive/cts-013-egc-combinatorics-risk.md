# CTS-013: EGC Combinatorics/Esoteric Risk — Address Space Explosion Prevention

## Type
`risk`

## Labels
`egc`, `combinatorics`, `esoteric`, `rainbow-table`, `address-space`

## Depends On
`EGC spec (CTS-006)`

## Evidence
PRD Section: "address space must scale combinatorially without enumerating all combinations" (implied requirement from EGC design goals)

CT-003 from prior extraction: "EGC alphabet may be too esoteric/unimplementable without significant tooling investment"

Model thought: "Their insights regarding DeepSeek-OCR as a proof-of-concept for a machine-native visual language are also crucial to my understanding... I'm focusing on crafting the graphemic alphabet with stems (core concepts) derived from WordNet and BabelNet, and modifiers as logical operators."

## Problem Statement
EGC's compositional design (stems + modifiers + binders combining into graphemes) must scale combinatorially to cover all expressible concepts, but must not devolve into a rainbow table lookup (enumerating all valid combinations as explicit entries) or become computationally intractable for machines. The document asserts this is solvable but provides no mechanism. This is the residual risk from CT-003.

## Scope

### Must Include
- [ ] Combinatorics analysis: given N stems, M modifiers, B binders, how many unique graphemes?
- [ ] Address space calculation: minimal viable EGC vs full EGC-1000 vs EGC-10000
- [ ] Rainbow table risk assessment: under what conditions does EGC become a rainbow table?
- [ ] Deterministic encode/decode algorithm: proof that encoding/decoding is algorithmic (not lookup-based)
- [ ] Grammar complexity: parse tree size bounds for valid grapheme sequences
- [ ] Mitigation strategies if combinatorics is infeasible:
  - [ ] Hierarchical addressing (namespaces for stem families)
  - [ ] Compression at grapheme level (encode sequences, not individual graphemes)
  - [ ] Hybrid: compositional core + lookup for high-frequency patterns

### Should Include
- [ ] Comparison: EGC vs Ithkuil grammar complexity
- [ ] Implementation feasibility assessment for encode/decode algorithms
- [ ] Human-readability vs machine-optimization tradeoff analysis

### Could Include
- [ ] Prototype combinatorics calculator tool
- [ ] EGC complexity benchmarks

## Acceptance Criteria
- [ ] Address space sufficient for domain coverage (at minimum: Entif 2.0 concepts)
- [ ] No rainbow table risk: EGC is not stored as enumerated lookup table
- [ ] Encode/decode is O(n) or better on concept size
- [ ] Mitigation plan documented if current approach is infeasible

## Notes
This issue is the risk-specific follow-up to CT-003. It depends on CTS-006 (EGC spec) being complete. If the risk is unresolvable, EGC may need to be descoped or redesigned.

## Status
`draft`
