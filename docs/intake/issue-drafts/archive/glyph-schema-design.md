# Issue Draft: Design glyph schema (LABEL/DEFINITION/RELATIONS + WordNet synset IDs)

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Design and document the canonical Glyph schema: LABEL, DEFINITION, RELATIONS using WordNet synset IDs as semantic grounding. This is the primary data contract between ingest, graph store, and reasoning layers. Prerequisite for glyph_mapper, nightly dedup, and scene card parsing.

## Details
Glyph schema is the canonical node/edge contract for GraphRAG:
- **LABEL**: canonical name / heading (e.g., "recursive_self_improvement")
- **DEFINITION**: one-paragraph semantic definition (what it IS, not just what it's called)
- **RELATIONS**: array of typed edges to other glyphs or external references

WordNet/BabelNet synset IDs provide semantic grounding:
- Every glyph carries one or more WordNet synset IDs
- BabelNet for multilingual coverage
- VerbAtlas for verb-argument structure

Glyph dedup: nightly merge by hash + embedding cosine similarity.

The document also references "Veracity Vectors" and "Emotional Geometry" as future protocol slots — the glyph schema should leave room for these fields (even if inactive).

## Acceptance Checks
- [ ] Glyph type defined in `packages/protocol/src/types.ts`
- [ ] JSON schema generated from zod type
- [ ] WordNet synset ID field present (or placeholder for BabelNet)
- [ ] Relations field typed as array of {type, target_glyph_id} edges
- [ ] Schema is extendable for future fields (Veracity Vectors, Emotional Geometry)
- [ ] Schema documented in README with examples
