# Issue Draft: E2E-005 — Deprecate Ithkuil Semantics — Migrate to WordNet/BabelNet/SyntagNet/VerbAtlas

## Type
`migration`

## Summary
Entif 2.0 Enriched explicitly deprecates the Ithkuil-based semantic engine in favor of standards-based resources: WordNet, BabelNet (multilingual), SyntagNet (collocation constraints), and VerbAtlas (argument structure). A migration plan is documented. This issue tracks formal deprecation and implementation.

## Evidence
From source: "Standards-based semantics: WordNet/BabelNet/SyntagNet/VerbAtlas replaces Ithkuil; produces Halo (distribution over senses/frames) + Core (projected single choice) with MCDA scoring"

Migration plan:
1. New tables: `sense_halo` and `frame_halo` (per-span distributions)
2. Add `synset_ids` and `frame_ids` columns to prior glyph tables
3. Codemods: `CoreGlyph` → `LexicalCore`
4. Pipeline swap: "Ithkuil parse" → tokenize → POS/lemmatize → dep-parse → WSD → Frame-ID

## Why This Matters
- Ithkuil has no standard NLP tooling ecosystem; WordNet/BabelNet have decades of tooling
- Ithkuil has unknown maintenance status; standards-based resources are maintained by large communities
- BabelNet enables multilingual support impossible with Ithkuil
- SyntagNet provides collocation edges beyond Ithkuil's case markers
- VerbAtlas frames provide richer action-semantics

## Migration Risks
- All existing glyphs with hand-entered semantics need provenance annotations
- Halo preservation requires new `sense_halo`/`frame_halo` tables
- MCDA weight schema must be defined before Core projection can work
- Truth fences during migration must prevent Ithkuil-only code paths from activating

## Key Decisions Needed
1. What is the migration order? Recommend: (a) define new tables, (b) implement WSD pipeline, (c) implement Frame-ID, (d) wire Halo→Core, (e) delete Ithkuil code paths
2. Who owns the MCDA weight configuration? Per-domain or global?
3. Should the Halo be stored persistently or recomputed on demand?

## Relations
- Upstream of: DecisionForge (needs Halo uncertainty), ResearchForge (VOI probes)
- Downstream of: semantic pipeline (tokenize→POS→dep→WSD→FrameID)

## Labels
`docs-intelligence`, `migration`, `semantics`

## Status
`draft`
