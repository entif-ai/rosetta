# Issue Draft: JDL-001 — simdjson-style Two-Stage Ingest Pipeline for Rosetta

## Metadata

| field | value |
|---|---|
| title | JDL-001: simdjson-style two-stage ingest pipeline |
| type | implementation |
| source | `docs/ideas/JSON Optimization for Data Lakes.md` (DI extraction: 2026-06-01) |
| confidence | high |
| labels | `storage`, `ingest`, `performance` |

## Problem Statement

Rosetta's ingest pipeline currently lacks a documented model for high-throughput, low-memory-overhead parsing of bulk JSON data streams. The `simdjson` library (arXiv:2312.17149v3) demonstrates that a two-stage architecture — (1) SIMD-accelerated structural indexing and (2) On-Demand lazy iteration over the index without building a full DOM — can achieve ~1GB/s JSON parsing at dramatically lower memory cost than DOM-based approaches.

This approach directly maps to Rosetta's parse-only-default safety posture and supports the source→observation→interpretation pipeline with lazy field-level access.

## Relevant Findings from Source

- **F1 (high confidence)**: simdjson two-stage: Stage 1 uses SIMD (64-byte chunks, bitset) to index all structural characters (`{`, `}`, `[`, `]`, `:`, `,`) and token locations; Stage 2 uses On-Demand iterator that walks the index without building a full DOM, enabling lazy evaluation and selective parsing.
- **F2 (high confidence)**: Pointer-based json_iterator references unescaped string buffer and indexed structural positions; irrelevant data is never parsed — dramatically lower memory footprint vs. DOM-based.
- **F3 (high confidence)**: Field-level access without traversing entire substructures; enables skipping irrelevant branches (like database projection) and jumping directly to relevant keys/values — directly maps to rights-scoped retrieval (retrieve-without-filter, not filter-after-retrieve).
- **F4 (medium confidence)**: Runtime CPU feature detection (AVX2 vs. SSE pipelines); reusable parser instances across documents for optimal memory locality.

## Alignment with Existing Rosetta Work

- **TC-001/TC-002** (text source families): This is the ingest optimization pattern to apply once source families are established.
- **parse-only-default**: Index-first, interpret-second aligns with not side-effecting during ingest.
- **rights-scoped-retrieval**: Pre-indexing structural positions enables retrieve-without-filter at the boundary.
- **NOT LAME ingress-refinery**: Pre-indexing is the natural Stage 0 of the ingress refinery pipeline.

## Implementation Notes

- Not recommending full simdjson port; recommending the architectural pattern: index-first, parse-later, lazy iteration.
- Python/Cython or numpy-based SIMD-adjacent tokenizer is a viable prototyping path before a full C extension.
- The On-Demand iterator pattern is the key design primitive: the graph walker loads only the slice it needs, references indexed positions, does not build intermediate DOM.

## Proposed Action

Evaluate existing ingest pipeline for two-stage pattern introduction. Create TC-xxx epic or extend TC-006 scope to include pre-index/lazy-parse ingest optimization.

## Dependencies

- None blocking; can proceed once TC-001/002 are green.

## Status

candidate
