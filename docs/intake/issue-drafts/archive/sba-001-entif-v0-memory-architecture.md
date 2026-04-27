# SBA-001: Entif v0 Tri-Tier Memory Architecture — formal specification and implementation

## Status

draft — `docs/intake/issue-drafts/sba-001-entif-v0-memory-architecture.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 3 (The Digital Hippocampus and Personal Knowledge Management)
- **Confidence:** high

## Problem

Entif v0 defines a tri-tier memory architecture modeled on mammalian retention: Fast/Short-Term (Redis), Mid/Episodic (PostgreSQL), Slow/Long-Term (Turso or Qdrant + Neo4j GraphRAG). This architecture is described architecturally but the following are entirely underspecified:

1. **Redis key schema:** Session Key format, TTL values, Context Window Length enforcement, data structure (list? hash? what fields?)
2. **PostgreSQL schema:** Tables for sessions, messages, TTL index, context window trimming policy, retention schedule
3. **Turso vs Qdrant decision:** Binary choice stated as "arbitrary" with no evaluation criteria
4. **Neo4j property graph schema:** Node types (Concepts, People, Locations, Canonical Glyph IDs), Edge labels (DEPENDS_ON, WROTE, LOCATED_IN), index definitions, Cypher query library
5. **Cross-tier promotion/demotion policy:** When does data move from Redis to PostgreSQL to vector/graph? Staleness criteria per tier?
6. **Hybrid query routing:** When does the system query Redis vs PostgreSQL vs Turso/Qdrant vs Neo4j?

## Evidence

> "Deploy a Redis (Remote Dictionary Server) instance to act as the short-term working memory" — Phase 3

> "Configure the Postgres Chat Memory node with specific parameters: a unique Session Key to separate different topics, a defined Time to Live (TTL) to dictate when old, irrelevant messages are auto-deleted, and a Context Window Length to control how many past messages are fed to the LLM" — Phase 3

> "Deploy Turso (a distributed edge SQLite variant offering low latency) or Qdrant for high-performance vector search" — Phase 3

> "Implement a property graph schema within Neo4j that explicitly maps Nodes (Concepts, People, Locations, or Canonical Glyph IDs) and Edges (Relationships, utilizing labels like DEPENDS_ON, WROTE, or LOCATED_IN)" — Phase 3

> "When the Entif orchestrator queries its memory, the system executes a hybrid search. It first conducts a vector similarity search in Turso/Qdrant to find relevant starting points. It then executes Cypher queries (Neo4j's native graph language) to traverse the property graph" — Phase 3

## Required Deliverables

1. Redis schema: key naming convention, data structure per entry, TTL default/override, context window trimming algorithm
2. PostgreSQL schema: sessions table, messages table, TTL index strategy, context_window enforcement (hard trim vs weighted sampling)
3. Turso vs Qdrant decision document: explicit evaluation criteria (local-only operation, ARM64, single-node, licensing) and resolution
4. Neo4j schema: full node label set, relationship type taxonomy, property key conventions, index definitions (node labels, relationship types), constraint definitions (unique constraints, existence constraints)
5. Cypher query library: at minimum 10 common traversal patterns with parameterized queries
6. Cross-tier policy: tier promotion rules (time-based? size-based? importance-score-based?), demotion policy, staleness definition per tier
7. Query router: decision tree or routing rules for which tier(s) to query for a given request type

## Dependencies

- None (can start immediately)

## Labels

`memory-architecture`, `redis`, `postgres`, `graphrag`, `neo4j`, `turso`, `qdrant`, `vector-store`

## Notes

This is the foundational memory layer for Entif v0. All other systems (Coach Module, Guard/Majordomo, Media Engine) depend on memory being correctly structured and queryable. The Neo4j schema work should be coordinated with the Rosetta 2.0 tile schema work (SBA-003) to ensure consistent node/relationship type naming.
