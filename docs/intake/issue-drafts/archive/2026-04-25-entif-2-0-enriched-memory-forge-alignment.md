# Issue Draft: E2E-004 — Design MemoryForge Alignment with Rosetta 3-Memory-Plane + Memory-Sovereignty-Map

## Type
`architecture`

## Summary
Entif 2.0 Enriched proposes MemoryForge as a unified memory layer (KG entities + semantic bundles + vectors + episodic logs + scheduled consolidation). Rosetta already defines a 3-memory-plane model and a 5-layer memory-sovereignty-map. These two architectures need explicit alignment.

## Evidence
From Entif 2.0 Enriched: "MemoryForge: orchestrates hybrid memory stores (KG entities, semantic bundles, vectors, episodic logs); scheduled consolidation, dedupe, drift checks, 'forget by policy'"

From NOT LAME PRD: "5 layers: Constitutional(Git), Artifact(obj+PG), Vector(pgvector, nothing authoritative), Temporal(PG graph), Adaptive(PG+scheduled)"

From Rosetta Bootstrap: "3 memory planes: Plane 1=truth/provenance, Plane 2=temporal/history, Plane 3=activation/relevance"

## Potential Overlaps

| MemoryForge Component | Rosetta 3-Plane | Memory-Sovereignty Layer |
| --- | --- | --- |
| KG entities | Plane 1 (truth/provenance) | Artifact + Temporal (PG) |
| Semantic bundles (vectors) | Plane 3 (activation/relevance) | Vector (pgvector) |
| Episodic logs | Plane 2 (temporal/history) | Temporal (PG graph) |
| Scheduled consolidation | — | Adaptive (PG+scheduled) |
| Forget-by-policy | — | Constitutional (Git) |

## Key Decisions Needed
1. Are MemoryForge and memory-sovereignty-map describing the same system with different terminology?
2. If they diverge, which is canonical? Recommend: memory-sovereignty-map as canonical, MemoryForge as implementation.
3. Should the graph store be Neo4j (MemoryForge) or PostgreSQL with edge tables (memory-sovereignty-map)? PostgreSQL preferred for sovereignty.

## Relations
- Downstream of: NOT LAME memory-sovereignty-map design
- Upstream of: ResearchForge, DecisionForge, UIForge

## Labels
`docs-intelligence`, `memory`, `alignment`

## Status
`draft`
