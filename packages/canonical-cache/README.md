# canonical-cache

## Purpose

Provides the first canonical corpus cache behavior for clustering and lifecycle retention.

## Working Today

- ingests canonical artifacts into an in-memory cache
- indexes artifacts by byte identity, manifestation identity, record family, and conceptual cluster
- dedupes repeated normalized content by content fingerprint while retaining each raw evidence artifact CID
- links materially changed content into a record-family revision chain
- persists and reloads bootstrap cache state through a narrow backend interface
- ships a deterministic JSON-file backend for local/dev durability and fixture replay
- marks only byte and manifestation matches as merge-eligible
- retains correction events without deleting prior state

## Fixture Status

- executable
- in-memory operation, backend-backed persistence, and legacy local-path persistence are exercised through bootstrap fixtures

## Not Yet

- database-backed persistence
- rich retrieval APIs
- evidence-gated merge workflows
- large-scale corpus operations

## Roadmap

- add a database-backed backend behind the same adapter boundary before bulk ingest begins
- add richer query interfaces once durable storage semantics are broader than bootstrap replay
