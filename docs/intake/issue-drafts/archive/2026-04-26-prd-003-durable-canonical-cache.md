# Issue Draft: PRD-003 — Durable Canonical Cache: Postgres JSONB + pgvector Migration

## Metadata

| Field | Value |
|---|---|
| **Source document** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted by** | DI-009 subagent |
| **Findings basis** | F-17, F-18, F-45 |
| **Confidence** | HIGH |
| **Status** | draft |

## Problem Statement

The `canonical-cache` package currently operates as an in-memory cache with local JSON file persistence (`canonical-cache.json`). The Entif and Rosetta PRD (2026-04-26) and Doctrine v0.2 both explicitly state that this posture is appropriate for bootstrap but inappropriate for any real scale or broad ingest. The staged-storage rule is: Bootstrap = SQLite (current), Text-Core/Alpha RC = Postgres JSONB + row-level rights enforcement + pgvector (required), later richer graph/activation planes.

The current cache correctly implements four-index semantics (byte identity, manifestation identity, record family, conceptual cluster) with merge-eligibility only for byte and manifestation matches. The migration must preserve those semantics exactly while adding durable storage, query APIs, rights enforcement at storage boundary, and vector search capability.

## Evidence

- **F-17**: "The `canonical-cache` package already does several important things correctly: it ingests canonical artifacts into an in-memory cache; indexes by byte identity, manifestation identity, record family, and conceptual cluster; dedupes repeated normalized content by content fingerprint while retaining each raw evidence artifact CID; links materially changed content into a record-family revision chain" — `turn19file0`
- **F-18**: "The current cache is in-memory with local JSON persistence. That is exactly the right bootstrap posture and exactly the wrong long-term scale posture. Move the cache to durable storage—per doctrine, Postgres JSONB plus row-level rights enforcement is the clearest baseline" — `turn19file0`, `turn8file15`
- Doctrine staged-storage rule explicitly mandates Postgres for Text-Core RC — `turn8file15`
- Bulk ingest remains blocked until this step completes — `turn8file15`

## Requirements

1. **Postgres JSONB canonical-cache table** preserving byte identity, manifestation identity, record-family, conceptual-cluster indexing
2. **Row-level rights enforcement** at storage boundary — `rightsScopeRef` enforced on every query, not post-retrieval filter
3. **pgvector integration** for semantic similarity search on normalized text content
4. **Dedup semantics preserved**: only byte identity and manifestation identity are merge-eligible; conceptual cluster matches are NOT auto-merged
5. **Record-family revision chains** preserved — `prev` links maintained, corrections retained without deletion
6. **Bootstrap fixture replay**: existing fixtures must replay into durable storage with identical semantic outcomes
7. **Index strategy**: B-tree on byte identity + manifestation identity; GIN on record family; pgvector index on normalized text for semantic search
8. **Migration path**: existing in-memory cache state serialized to Postgres without data loss or semantic change

## Schema Sketch

```sql
CREATE TABLE canonical_artifacts (
  cid          TEXT PRIMARY KEY,        -- byte identity
  manifest_id  TEXT NOT NULL,          -- manifestation identity
  record_family TEXT NOT NULL,         -- revision chain identifier
  conceptual_cluster TEXT,             -- NOT merge-eligible cluster key
  payload      JSONB NOT NULL,         -- full artifact body
  rights_scope TEXT NOT NULL,          -- enforced at query time
  policy_ref   TEXT,
  created_at   TIMESTAMPTZ NOT NULL,
  cooled_at    TIMESTAMPTZ,
  quarantined  BOOLEAN DEFAULT false,
  quarantine_reason TEXT
);

CREATE INDEX idx_manifestation ON canonical_artifacts (manifest_id);
CREATE INDEX idx_record_family ON canonical_artifacts (record_family);
CREATE INDEX idx_conceptual_cluster ON canonical_artifacts (conceptual_cluster);
CREATE INDEX idx_rights_scope ON canonical_artifacts (rights_scope);

-- pgvector for semantic similarity
ALTER TABLE canonical_artifacts ADD COLUMN embedding vector(1536);
CREATE INDEX idx_embedding ON canonical_artifacts USING ivfflat (embedding vector_cosine_ops);
```

## Acceptance Criteria

- [ ] `rosetta-store` reads from Postgres canonical-cache with identical semantics to in-memory version
- [ ] Rights scope filter applied at query time — items outside user's rights scope never loaded into response
- [ ] Semantic similarity search returns relevant candidates via pgvector
- [ ] Bootstrap fixtures load into Postgres and produce identical dedupe decisions as in-memory version
- [ ] Record-family revision chains intact — corrections visible, prior state traceable
- [ ] Merge-eligibility unchanged: byte+manifestation merge-eligible, conceptual-cluster NOT
- [ ] Bulk ingest can proceed after this migration (unblocks IC-05)
- [ ] Performance: cold-start cache reload < 5s for 10K artifact fixture set

## Relationship to Other Issues

- Unblocks IC-05 (Live-Source Adapter) — bulk ingest blocked until durable storage ready
- Depends on IC-01 (Pack Conformance) for package-level CI
- IC-02 (Promotion State) will store transitions in this durable cache
- Part of Phase 2 Text-Core Completion (F-45)

## Recommended Labels

`storage`, `postgres`, `pgvector`, `text-core`, `migration`, `phase-2`, `canonical-cache`