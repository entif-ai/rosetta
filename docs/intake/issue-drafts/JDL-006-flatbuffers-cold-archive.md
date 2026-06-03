# Issue Draft: JDL-006 — Evaluate FlatBuffers/Cap'n Proto for Zero-Copy Cold Archive Rehydration

## Metadata

| field | value |
|---|---|
| title | JDL-006: Evaluate FlatBuffers/Cap'n Proto for zero-copy cold archive rehydration |
| type | research |
| source | `docs/ideas/JSON Optimization for Data Lakes.md` (DI extraction: 2026-06-01) |
| confidence | medium |
| labels | `storage`, `codec`, `archival` |

## Problem Statement

Cold archive rehydration (loading cold data back into active memory/state) is a bottleneck in lazy-load storage architectures. JSON parsing (even SIMD-accelerated) involves deserialization overhead. FlatBuffers (Google) and Cap'n Proto offer zero-copy deserialization: memory is accessed directly from serialized form without a parsing/transformation step, reducing rehydration latency and compute cost.

The chat suggests evaluating these as future options for the cold archive rehydration pipeline. This is speculative (not near-term) but worth tracking against existing codec work in Rosetta.

## Relevant Findings from Source

- **F16 (medium confidence)**: "FlatBuffers or Cap'n Proto for future zero-copy archive rehydration" — mentioned as the next step beyond DuckDB (analytical querying) and Apache Arrow (memory-compact intermediate format).
- **F5-F7**: Time-sliced capsules and graph walker cold archive design would benefit from faster rehydration; the secondary index enables skipping irrelevant archives, but when an archive must be loaded, deserialization is the remaining cost.

## Alignment with Existing Rosetta Work

- **Rosetta pasigraphy / EGC**: Rosetta already has a representation codec floor (EGC — Entif Graphemic Core) and slug representation work. FlatBuffers/Cap'n Proto would be a cold-archive-specific representation, potentially distinct from the active-memory representation.
- **NOT LAME**: Canonical representation formats are defined for hot/warm storage; cold archive format is not specified.
- **Cognitive Tapestries / Semantic Latticing PRD**: Proposes VQ-VAE, GNN-encoded symbolic codecs; zero-copy cold archive formats may complement or compete with these representation choices.

## Proposed Evaluation Criteria

1. **Zero-copy deserialization**: Does the format allow direct memory access without parsing? (Yes for both FlatBuffers and Cap'n Proto.)
2. **Schema evolution**: Can schemas change over time without breaking existing archives? (Cap'n Proto has better forward/back compatibility.)
3. **Cross-language support**: Required for multi-platform Entif deployments (Rust/Python/TypeScript).
4. **Size efficiency**: How do serialized sizes compare to compressed JSON/Zstandard?
5. **Integration with Arrow**: Both FlatBuffers and Cap'n Proto can be used with Arrow as an intermediate format; evaluate composite pipeline.
6. **Alignment with EGC/pasigraphy**: Does a zero-copy cold archive codec complement or conflict with the active-memory representation strategy?

## Proposed Action

Add FlatBuffers and Cap'n Proto to the codec evaluation backlog. Schedule a comparison against existing EGC/UGC work. Do not prioritize over current TC-001 through TC-005 milestones.

## Dependencies

- NOT LAME storage schema finalization
- pasigraphy/EGC codec work completion (to understand the active-memory representation baseline)

## Status

candidate
