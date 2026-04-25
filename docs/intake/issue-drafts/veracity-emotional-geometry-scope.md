# Issue Draft: Define Veracity Vectors and Emotional Geometry implementation scope

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
The document reserves protocol slots for "Veracity Vectors" and "Emotional Geometry" but provides no implementation path. This issue is to define scope and feasibility before indefinite deferral. High-value differentiators for Entif's epistemic layer.

## Details
From the document: "Veracity Vectors and Emotional Geometry slots reserved in protocol; not active yet."

What these likely mean:
- **Veracity Vectors**: per-statement truth confidence scores derived from evidence chain depth, source reliability, cross-source corroboration. Akin to epistemic probability vectors rather than binary true/false.
- **Emotional Geometry**: mapping of conversational/emotional tone to a geometric representation (valence/arousal/dominance or higher-dimensional emotional space) that can be tracked across sessions.

These are described as future capabilities reserved in protocol — not yet implemented.

Open questions to resolve:
1. Is this a Phase 5 research thread or a Phase 3+ planned item with a defined owner?
2. What data is needed to train/derive Veracity Vectors? (Evidence chain, source authority tiers, contradiction detection)
3. What model produces Emotional Geometry? (L Lloyd's emotional geometry, PAD model, or custom)
4. Should these slots be marked `experimental: true` in protocol to reserve them without committing to implementation?

## Acceptance Checks
- [ ] Document a clear definition for both terms (1-paragraph each)
- [ ] Identify minimum viable data/input requirements for each
- [ ] Decide: research thread vs planned feature with owner
- [ ] If planned: add to project board with phase assignment
- [ ] If deferred: document reason and review date
- [ ] Protocol types have reserved fields (empty/placeholder) so schema can evolve without breaking
