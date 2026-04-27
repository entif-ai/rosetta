# canonical-cache

## Purpose

Provides the first canonical corpus cache behavior for clustering and lifecycle retention.

## Working Today

- ingests canonical artifacts into an in-memory cache
- indexes artifacts by byte identity, manifestation identity, record family, and conceptual cluster
- dedupes repeated normalized content by content fingerprint while retaining each raw evidence artifact CID
- links materially changed content into a record-family revision chain
- persists and reloads bootstrap cache state from a local JSON path
- marks only byte and manifestation matches as merge-eligible
- retains correction events without deleting prior state

## Fixture Status

- executable
- local-file persistence and in-memory operation are exercised through bootstrap fixtures

## Not Yet

- database-backed persistence
- rich retrieval APIs
- evidence-gated merge workflows
- large-scale corpus operations

## Roadmap

- back the cache with database storage and richer query interfaces before bulk ingest begins
