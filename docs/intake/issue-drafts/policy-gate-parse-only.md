# Issue Draft: Implement policy gate for parse-only enforcement

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Build the policy gate that enforces parse-only ambient mode as default. Any MCP tool with side effects must be gated behind a mode check. Three modes: Ambient (parse-only, no actions), Spotlight (summaries + suggested intents), Command (actions permitted with one-shot approval).

## Details
The policy gate is the first line of defense for safety:
- Ambient mode: policy gate rejects any tool with side effects; ingest may write graph/summaries but not call action tools
- Spotlight mode: same as Ambient + route summaries to daily brief + pin top tasks as suggested intents
- Command mode: explicit one-shot approval required before destructive shell or network actions
- Red Zones: geofence or calendar-based hard blocks; ingest off or on-device discard; no storage

Per-contact consent and redaction profiles must be checked at ingest time:
- Phone, email, address, payment strings, sensitive terms masked at ingest
- Retention tiers: raw audio short (or never stored), transcripts N days, summaries/tasks longer
- One-click purge by entity with cascade

## Acceptance Checks
- [ ] In Ambient mode, calling any MCP tool with side_effects=true throws PolicyViolation error
- [ ] In Command mode, first call to a side-effecting tool requires explicit user confirmation
- [ ] PII regex redaction fires on ingest (phones, emails, addresses, payment strings)
- [ ] Consent list per contact is respected (store/redact/ignore per contact)
- [ ] Purge by entity cascades: entity row deleted + all linked evidence spans removed
- [ ] Red zone detection: geofence/calendar-based blocks prevent ingest or force discard
