# Receipts Ledger Schema

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** receipts, storage, runtime-ingestion
**Depends on:** none

## Problem Statement

`Receipt.record(call, result)` appends a row to a receipts table, but the schema is only described in prose — no formal schema doc, no Typedoc, no JSON Schema. Receipt fields (session_id, task_id, step_id, actor, tool, input, output, success, tokens_used, latency, cost, timestamp) are named but not formally typed or constrained.

## Specific Findings from Extraction

- **F-REC-001** (confidence: high): Receipt schema fields exist only in prose; no formal schema doc, no Typedoc, no JSON Schema
- **F-REC-002** (confidence: high): `Receipt.record(call, result)` interface described but return type, success/error semantics, async behavior unspecified
- **F-REC-003** (confidence: medium): No mention of receiptGC (garbage collection/retainment policy); legal/tax retention requirements for all-tool-call logging
- **F-REC-004** (confidence: medium): No metrics instrumentation defined; telemetry for token usage, latency, cost aggregation implied but not specified
- **F-REC-005** (confidence: medium): Pasigraphy RPP uses Receipt.record but Receipt is a forward reference; no concrete API

## Action Required

1. Draft formal Receipt schema as a `.sql` or Typedoc file
2. Define `Receipt.record(call, result)` API signature with types and error handling
3. Specify retention policy (GC) and compliance requirements
4. Define telemetry/metrics instrumentation points
