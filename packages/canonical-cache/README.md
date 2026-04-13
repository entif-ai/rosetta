# canonical-cache

## Purpose

Provides the first canonical corpus cache behavior for clustering and lifecycle retention.

## Working Today

- ingests canonical artifacts into an in-memory cache
- indexes artifacts by byte identity, manifestation identity, record family, and conceptual cluster
- marks only byte and manifestation matches as merge-eligible
- retains correction events without deleting prior state

## Fixture Status

- executable
- currently in-memory and exercised through bootstrap fixtures

## Not Yet

- durable persistence
- retrieval APIs
- evidence-gated merge workflows
- large-scale corpus operations

## Roadmap

- back the cache with durable storage and richer query interfaces before bulk ingest begins
