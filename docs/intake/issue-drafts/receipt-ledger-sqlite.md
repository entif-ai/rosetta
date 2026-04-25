# Issue Draft: Implement receipt ledger (SQLite + Console sink)

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Implement the canonical receipt ledger: SQLite + Console sink, storing run entries with ts/intent/tool/tokens/$_latency/success. This is the foundation for ELIXIR, coach loop, and all self-improvement machinery.

## Details
Every model/tool action must emit a receipt. The document specifies:
- `ts`: ISO timestamp
- `user_said`: original utterance
- `intent`: parsed intent name
- `tool_invocations`: array of tool calls made
- `tokens_in`, `tokens_out`, `usd`, `latency_ms`: cost metrics
- `success_label`: pass/fail boolean

Console sink format: `[run] ${ts} tool=${tool} ok=${success} $${usd.toFixed(4)} ${latency_ms}ms`

SQLite sink: write to a `receipts` table with those columns. Add index on `ts` and `intent`.

This is prerequisite for: coach_loop thin stub, ELIXIR engine, policy_optimizer, evaluation loop, nightly batch mining.

## Acceptance Checks
- [ ] Running any tool call produces a Console sink log line
- [ ] Running any tool call writes a row to SQLite `receipts` table
- [ ] Receipt fields match the protocol types defined in `packages/protocol/src/types.ts`
- [ ] Ledger is queryable: `SELECT * FROM receipts ORDER BY ts DESC LIMIT 10`
- [ ] Schema includes `test_failures` table for ELIXIR seed
