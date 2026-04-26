# ENTIF-v0-018: Signal Event Idempotency — No Dedup Window, Polling Interval, or Idempotency Key Defined

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-018 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #4 in ledger |
| Confidence | `medium` |
| Depends On | `ENTIF-v0-001` |

---

## Problem Statement

The spec defines two sensing classes:

1. **Bulk trend sensors**: "low-cost daily/interval pulls (GitHub trending, package registry deltas, arXiv categories, security advisories). These emit normalized SignalEvents."
2. **Outlier path sensors**: "event-driven follow chains from a discovered seed (paper, repo) to its neighborhood (contributors, org, dependency graph)."

**But no implementation schema for signal event deduplication, idempotency keys, or polling intervals is provided.** Without idempotency guarantees, bulk polling will produce duplicate signal events (re-fetching the same repo within a poll window produces the same result), causing redundant processing and potentially inflated VOI estimates.

---

## Evidence

The Signal/Sensing Plane description mentions "cron and event-driven" feeds and "SignalEvents" but:
- No idempotency key field in the signal_event.v0 schema
- No dedup window specified (how far back does deduplication look?)
- No minimum polling interval per sensor type
- No statement on whether bulk sensors are append-only or upsert

The `signal_event.v0` schema has `event_id: "sig_01JABC..."` but this is the event identifier, not an idempotency key (event_id is unique per event, not stable across re-emissions of the same logical event).

---

## Impact

- Duplicate signal events cause redundant processing in the deterministic middleware
- VOI estimates are inflated if the same signal is counted multiple times
- Contributor graph edges could be duplicated if the same signal is processed twice
- Cost control (a core doctrine) is undermined by redundant processing

---

## Dependencies

- `ENTIF-v0-001` (VOI estimation depends on signal quality; duplicates inflate VOI)

---

## Suggested Resolution

1. Define an idempotency key field in signal_event.v0: `idempotency_key` (string) — computed as SHA-256 of (source.kind + subject.id + time_bucket), where time_bucket is a time window (e.g., hourly for bulk sensors, per-event for outlier sensors)
2. Define deduplication window: 1 hour for bulk trend sensors (same idempotency key within 1 hour = skip); 0 for outlier path sensors (exact dedup not required; they are event-driven)
3. Define minimum polling intervals per sensor type: GitHub trending = 6 hours; package registry = 12 hours; arXiv = 24 hours; security advisories = 1 hour
4. Define the dedup procedure: before processing, check if an event with the same idempotency_key was processed within the dedup window; if yes, skip and log

---

## Open Questions

- Who owns the idempotency key computation — the sensor or the middleware?
- Should bulk sensors emit upsert events (same key updates the prior event) or skip events (dedup)?