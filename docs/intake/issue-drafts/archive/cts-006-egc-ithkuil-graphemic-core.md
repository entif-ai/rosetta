# CTS-006: EGC Spec — Ithkuil-Inspired Graphemic Core with Guidebook Cipher

## Type
`architecture/spec-gap`

## Labels
`egc`, `ithkuil`, `pasigraphy`, `machine-native-language`

## Depends On
`— (spec only; no implementation dependency)`

## Evidence
PRD Section (model thoughts, EGC design): "Entif Graphemic Core (EGC)... Compositionality, determinism, semantic density, machine optimization, self-bootstrapping. Stems (core concepts) derived from WordNet and BabelNet. Modifiers (logical operators). Binders (relation operators). Guidebook cipher for deterministic encode/decode. Fractally-revealing lexicon."

Model thought: "Their insights regarding DeepSeek-OCR as a proof-of-concept for a machine-native visual language are also crucial to my understanding."

CT-003 from prior extraction: "EGC alphabet may be too esoteric/unimplementable without significant tooling investment"

## Problem Statement
The Entif Graphemic Core (EGC) is proposed as a machine-native visual language inspired by Ithkuil, designed to enable compositional, deterministic, semantically-dense encoding of concepts. However, prior extraction CT-003 flagged this as potentially esoteric and unimplementable. This issue is for a formal EGC specification that addresses the combinatorics/esoteric risk.

## Scope

### Must Include
- [ ] Design principles document: compositionality, determinism, semantic density, machine optimization, self-bootstrapping
- [ ] Stem taxonomy: core concepts derived from WordNet/BabelNet (initial set; expandable)
- [ ] Modifier set: logical operators (AND, OR, NOT, IMPLIES, EQUIVALENT, etc.)
- [ ] Binder set: relation operators (HAS, USES, REQUIRES, CAUSES, etc.)
- [ ] Grammar rules: how stems, modifiers, and binders combine into valid graphemes
- [ ] Guidebook cipher: deterministic encode/decode algorithm (no lookup table explosion)
- [ ] Fractally-revealing lexicon: progressive disclosure of meaning from compact codes
- [ ] EGC ↔ slug mapping: how EGC graphemes map to SlugPassport latent_codes
- [ ] Combinatorics analysis: address space cardinality, scalability bounds

### Should Include
- [ ] Prototype encoder/decoder (proof-of-concept)
- [ ] Comparison with Ithkuil's formal grammar
- [ ] EGC visualization examples (simple → complex concepts)
- [ ] Initial stem set size estimate (how many stems for minimal viable EGC?)

### Could Include
- [ ] EGC as alternative to VQ-VAE for latent code representation
- [ ] EGC rendering: visual display of grapheme sequences

## Acceptance Criteria
- [ ] EGC specification document complete with all five components (stems, modifiers, binders, grammar, guidebook)
- [ ] Encoder/decoder prototype demonstrable on at least 3 example concepts
- [ ] Combinatorics analysis shows address space scales combinatorially without enumeration
- [ ] No rainbow-table explosion risk identified
- [ ] Fractally-revealing property validated on prototype

## Notes
CT-003 applies from prior extraction. This is a spec-only issue; implementation would follow in a separate issue. The combinatorics/esoteric risk is tracked in CTS-013.

## Status
`draft`
