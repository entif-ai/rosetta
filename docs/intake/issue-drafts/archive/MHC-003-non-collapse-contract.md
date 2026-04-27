# MHC-003: Non-Collapse Contract at Spine Level

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `non-collapse`, `spine`, `rosetta`, `invariant`, `governance`
**Depends on:** MHC-001-translation-evidence-tile

## Problem Statement

"Translators and refiners are not allowed to emit singletons when ambiguity is unresolved" — enforced at the spine level as a hard invariant. No such invariant currently exists in Rosetta's Pasigraphy protocol. This is central to Entif's governance/auditability value proposition.

## Specific Findings

- **F-SYN-003** (confidence: high): Non-collapse contract enforced at spine level — translators/refiners cannot emit singletons when ambiguity unresolved

## Action Required

1. Define "ambiguity" formally: when does a tile's meaning count as ambiguous? (e.g., multiple valid translations with similar confidence, unresolved coreference, unresolved polysemy)
2. Define "singleton" formally: what counts as a singleton? (e.g., a tile with only one possible interpretation when ambiguity exists)
3. Spine-level enforcement: where in the tile pipeline does the check occur (pre-emit validation), what happens on violation (rejection, warning, fallback tile)
4. Ambiguity detection algorithm: how does Rosetta detect that ambiguity exists — reference to TranslationEvidence confidence mass, cross-tile consistency checks
5. Escape path: when ambiguity is detected, what tile type is emitted instead of a singleton (e.g., `ambiguous-variant` tile with multiple candidates)
6. Profile-level conformance: which Rosetta profiles (Light/Full/Auditor/Forge) require non-collapse enforcement — likely Auditor and Forge only
7. Exception mechanism: when is collapsing allowed (e.g., user explicitly disambiguated, downstream consumer confirmed tolerance)
