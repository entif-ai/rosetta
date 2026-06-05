# Issue Draft: LLM-API-CACHE-004 — Deterministic Method Tile Promotion Criteria

**Type:** runtime-ingestion
**Confidence:** medium
**Extraction source:** `docs/chats/20260411 - Chat GPT - LLM API Cache Management.md`
**Extraction date:** 2026-06-05

## Problem Statement

The LLM API cache management dialogue describes a compounding flywheel: repeated successful cognition is promoted into deterministic reusable methods (tiles), eliminating vendor calls for those classes of work entirely. However, the promotion criteria ("repeated successful cognition") is undefined. This is closely related to TC-005 (Promotion state machine) and should be aligned with it.

## Evidence

- "convert repeated successful cognition into deterministic reusable methods over time" (source: 20260411 chat)
- "Once that happens, the vendor call disappears entirely for some classes of work" (source: 20260411 chat)
- The flywheel: compile budgeted context bundles → stable-prefix shaping → provider cache hits → repeated successful compositions → promotion to deterministic tiles (source: 20260411 chat, synthesizing ENTIF docs)

## Proposed Resolution

1. Define "repeated successful cognition" formally: is it N identical/variant queries with high similarity? Receipt chain length? VOI gate passes? User satisfaction signals?
2. Align promotion criteria with TC-005 state machine: what triggers promotion? What are the promotion gate conditions?
3. Define what "vendor call disappears" means: does the tile replace the vendor call? Is the vendor call still issued but short-circuited? Is it a pure local execution?
4. Track repeated-usage signals in telemetry: query similarity scores, composition success rates, tile hit rates
5. Define rollback conditions: when does a promoted tile get demoted?

## Labels

tapestry, runtime-ingestion, method-promotion, TC-005, docs-intelligence

## Depends On

TC-005 (Promotion state machine) — CRITICAL PATH
