# Issue Draft: RLM-001-TILES

**Prefix:** RLM-001
**Title:** Extend Rosetta/Tiles to support RLM operation emits

## Problem Statement

If Rosetta is the content-addressed truth spine for Entif, RLM operations need to emit structured, replayable artifacts rather than opaque outputs. The current tile type taxonomy may not capture RLM-specific operations (subcall metadata, verification scores, REPL program steps).

## Evidence

- Source doc (Finding RLM-001-M):
  > "If Rosetta is your content-addressed truth spine, then every RLM operation should emit:
  > - `Observation` tiles: the snippet spans pulled from the mounted corpus
  > - `Action/ToolCall` tiles: REPL program steps + subcall metadata
  > - `Derived` tiles: intermediate summaries, indexes, maps, diffs
  > - `Evaluation` tiles: verifier scores (did this step actually support the claim?)"
  > "This gives you reproducibility: the RLM 'answer' becomes a replayable DAG, not a mystical blob."

## Proposed Resolution

Define and spec the following tile type extensions for RLM operations:
1. `Observation` tile — captures snippet spans pulled from the mounted corpus (source citation + exact span + query used)
2. `Action/ToolCall` tile — captures REPL program steps, subcall metadata, depth/call budget consumed
3. `Derived` tile — captures intermediate summaries, indexes, maps, diffs generated during recursion
4. `Evaluation` tile — captures verifier scores (span supports claim? agent inferred ungrounded content?)

Ensure the RLM ContextRuntime (RLM-001-ARCH) emits these tiles natively on every operation.

## Entif Alignment

- Directly extends the Rosetta spine for RLM compatibility
- Makes RLM outputs first-class Rosetta citizens
- Enables reproducibility and replay of RLM "answers" as DAGs

## Confidence

MEDIUM — tile type mapping is explicitly suggested in source, but tile type definitions are proposed extensions, not documented existing schema.

## Status

DRAFT