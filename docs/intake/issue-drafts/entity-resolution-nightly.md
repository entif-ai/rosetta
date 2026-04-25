# Issue Draft: Implement nightly entity resolution (MinHash/LSH + embeddings)

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Implement nightly entity resolution job: MinHash/LSH on name+context + cosine on dense embeddings + rule assist (emails, phones) → produce `same_as` merges with reversible records. Core knowledge-graph normalization job.

## Details
Entity resolution pipeline:
1. **MinHash/LSH** on entity name + context string → candidate pairs with Jaccard similarity threshold
2. **Dense embedding cosine similarity** on full description fields → re-score candidates
3. **Rule assist** for easy cases: exact email match, exact phone match → auto-link
4. **Reversible merge records**: before merging, store original entity state for undo

Output: `same_as` edges in the graph, with confidence scores and method (LSH/embedding/rule).

Reversibility: every merge must be undoable. Store before-state in an `entity_merge_log` table.

Prerequisites: receipt_ledger (for metrics), glyph_schema_design (for entity type definitions).

## Acceptance Checks
- [ ] Nightly cron or async job callable standalone
- [ ] MinHash/LSH produces candidate pairs above Jaccard threshold
- [ ] Embedding cosine similarity re-ranks candidates
- [ ] Rule-based matches for email/phone fire correctly
- [ ] `same_as` edges written to graph with confidence + method
- [ ] Merge is reversible: entity_merge_log enables undo
- [ ] Metrics: dedup rate (% of overlapping evidence collapsed) logged
