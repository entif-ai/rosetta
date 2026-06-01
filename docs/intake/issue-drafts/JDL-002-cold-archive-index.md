# Issue Draft: JDL-002 — Cold Archive Secondary Index and Bloom Filter Strategy

## Metadata

| field | value |
|---|---|
| title | JDL-002: Cold archive secondary index and bloom filter strategy |
| type | implementation |
| source | `docs/ideas/JSON Optimization for Data Lakes.md` (DI extraction: 2026-06-01) |
| confidence | medium |
| labels | `storage`, `archival`, `cold-storage` |

## Problem Statement

NOT LAME's storage schema defines hot/warm/cold tiers and the 3-plane memory model, but does not specify the secondary index strategy for cold archive lookup. When cold-archived data must be selectively rehydrated (e.g., for audit, replay, or cross-temporal analysis), the system needs a lightweight mechanism to determine whether a given user/date/entity exists in a cold archive without loading the archive itself.

The proposed solution: maintain lightweight secondary index maps (SQLite or radix tree) alongside raw cold dump files, augmented with Bloom filters for fast membership queries. Cold storage mounts lazily via FUSE or cloud blob-layer interface to simulate a larger graph than is memory-resident.

## Relevant Findings from Source

- **F5 (medium confidence)**: Time-Sliced JSON Capsules: schema-hinted JSON Lines tagged by node/edge type and date range; includes precomputed hashes or Bloom filters for fast membership lookup ("whether a user/date/entity is present in the file").
- **F6 (medium confidence)**: Secondary index maps stored next to raw dump files (SQLite or radix tree); used to resolve whether cold storage needs to be "thawed."
- **F7 (medium confidence)**: Graph walker cold archive: (1) sparse adjacency list sorted by node hash; (2) content summary map (top terms, entity tags, timestamps, usage types); (3) delta summary per time slice logging what changed and when; lazy rehydration of only slices matching the walk's path intent.
- **F16 (medium confidence)**: DuckDB for analytical querying of rollups; Apache Arrow for memory-compact intermediate formats; FlatBuffers/Cap'n Proto for future zero-copy archive rehydration.

## Alignment with Existing Rosetta Work

- **NOT LAME 3-plane memory model**: Cold plane is defined but secondary index strategy is not specified.
- **tapestry**: Cold archives are a form of compressed temporal tapestry; the delta summary concept parallels receipt chaining.
- **receipts**: The delta summary (what changed and when) is structurally similar to a changelog receipt.

## Implementation Notes

- Bloom filter: probabilistic membership test; acceptable false positives (may trigger unnecessary thaw) but zero false negatives (if it says no, it's definitely not present).
- Time-slice manifests should include: date range, top node/edge types, stats, content hashes — stored as a first-class artifact alongside the raw archive.
- FUSE mount: lazy containerized cold storage mount; only materializes data when accessed.

## Proposed Action

Extend NOT LAME storage schema to include cold archive secondary index specification. Add to storage design doc or ADR register.

## Dependencies

- NOT LAME storage schema finalization
- JDL-001 (simdjson two-stage ingest) as the indexing mechanism that generates the archive manifests

## Status

candidate
