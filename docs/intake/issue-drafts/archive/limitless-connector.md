# Issue Draft: Implement Limitless connector with cursor polling and idempotency

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Build the Limitless API connector: poll/stream Limitless API, cursor-based backfill, retries with exponential backoff, idempotency guarantees. Emits diarized segments with speaker, channel, timestamp, and text. First ingest node in the pipeline.

## Details
Connector responsibilities:
- Poll Limitless API by cursor or timebox
- Deduplicate by segment ID (idempotency)
- Persist cursor for resumable backfill
- Handle rate limits with backpressure + retries
- Emit segments: `{id, ts, speaker, channel, text, source: "limitless"}`

Channel inference:
- If Limitless tag contains `call`, map to participant set
- If YouTube player active, channel `yt` with URL in metadata
- Default channel: `other`

The connector does NOT redact or classify — that happens downstream in ingest.pipe.

## Acceptance Checks
- [ ] `limitless_pull` MCP tool: pull by cursor/timebox, dedupe, emit segments
- [ ] Idempotent: re-running with same cursor does not duplicate segments
- [ ] Cursor persisted between runs
- [ ] Retry with exponential backoff on 429/5xx
- [ ] Segments have required fields: id, ts, speaker (optional), channel, text, source
- [ ] CLI smoke test: `ingest limitless --since 2h --mode ambient` prints segments
