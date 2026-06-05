# BIP-009: Cron-log DB Pattern for Rosetta Observability

## Type
implementation

## Summary

OpenClaw's HEARTBEAT.md and AGENTS.md specify a cron-log SQLite database that records every cron job run (both success and failure), with failures routed to a dedicated cron-updates channel and success output delivered to the job's relevant channel. Rosetta lacks an equivalent structured logging mechanism for its own heartbeat, cron, and background task executions.

## Evidence

**OpenClaw cron-log pattern (from Berman-all_files.md, AGENTS.md):**
- "Every cron job logs its run to the cron-log DB (both success and failure)."
- "Only failures are notified to the cron-updates channel."
- "Success notifications go to the job's relevant channel, not cron-updates, because the job's actual output is already delivered there."

**OpenClaw heartbeat state (from HEARTBEAT.md):**
- Heartbeat state stored in `memory/heartbeat-state.json`
- Corruption recovery: replace with `{"lastChecks": {"errorLog": null, "securityAudit": null, "lastDailyChecks": null}}`
- State file tracks timestamps per check type

**Rosetta's current heartbeat/cron handling:**
- HEARTBEAT.md in the workspace defines periodic checks
- `memory/heartbeat-state.json` exists and tracks last check timestamps (per AGENTS.md pattern)
- No structured cron-log DB; heartbeat events are not persisted to a queryable store

## Finding

Rosetta's heartbeat system lacks structured persistent logging analogous to OpenClaw's cron-log DB. The heartbeat-state.json tracks timestamps but not the outcomes or outputs of individual heartbeat cycles.

## Proposal

Adopt the cron-log DB pattern for Rosetta:
1. Create a `rosetta-cron-log.db` (SQLite with WAL mode, following Berman's pattern)
2. Log every heartbeat cycle: timestamp, cycle_id, checks_performed, outcomes, duration_ms, errors
3. Failure-only routing: failed cycles → dedicated heartbeat-failures channel; successful cycles → no notification (output delivered normally)
4. Retention: configurable TTL (e.g., 30 days for operational logs)

Alternative: extend the existing `memory/heartbeat-state.json` with structured entries per cycle rather than a full DB. This is lighter weight but less queryable.

**Labels:** observability, cron, operational

**Status:** open

**Created:** 2026-06-05

**Source:** docs/external/Berman-all_files.md (OpenClaw System Prompt File Templates, Berman extraction, 2026-06-05)

**Related:** heartbeat-state.json (existing), AGENTS.md cron standards (Berman context)