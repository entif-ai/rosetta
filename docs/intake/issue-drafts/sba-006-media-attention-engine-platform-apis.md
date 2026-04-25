# SBA-006: Media & Attention Engine M1–M6 — platform API integration design and phased build plan

## Status

draft — `docs/intake/issue-drafts/sba-006-media-attention-engine-platform-apis.md`

## Metadata

- **Type:** implementation
- **Priority:** P2
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 6 (Content Automation: The Media & Attention Engine)
- **Confidence:** high

## Problem

The Media & Attention Engine is described as a six-module content flywheel (M1–M6) that operates in "suggestion and simulation mode" with a Human-in-the-Loop approval gate before live API calls. The M5 module (Distribution Simulation) explicitly dry-runs logic without calling live APIs. However:

1. **No platform API coverage design:** The engines for YouTube, TikTok, Facebook, Instagram, and newsletters are mentioned but no API integration design exists for any of them
2. **M6 Metrics Ingestion has no platform API design:** Platform API availability, rate limits, OAuth token management, and graceful degradation are all absent
3. **Large implementation gap:** M1–M6 represents a very large project. The document provides a module taxonomy but no phased build plan
4. **Simulation-to-live handoff protocol missing:** How does a module transition from simulation mode (no live API calls) to live mode (with HITL approval)?
5. **EDL format undefined:** M4 generates Edit Decision Lists (EDLs) with timestamps but no format specification (EDL is a well-known format but which variant? CMX 3600? Avid ALE? Custom JSON?)
6. **JSON scene card schema undefined:** M1 outputs "JSON scene cards" but no schema is defined

## Evidence

> "The v0 initial build, this engine operates strictly in a suggestion and simulation mode. It prepares all creative assets and schedules, but requires a 'Human-in-the-Loop' approval node in n8n before actually executing live API posts to the internet" — Phase 6

> "M4 (Short-Form Planning): The orchestrator algorithmically generates Edit Decision Lists (EDLs). This automates the grueling process of finding the most engaging 60-second highlights from a 20-minute video, providing timestamps and instructing the user exactly where to cut the video" — Phase 6

> "M5 (Distribution Simulation): The system formulates a comprehensive multi-platform distribution plan (written in YAML or JSON) and dry-runs the logic. It verifies that all generated assets meet platform-specific requirements (character limits, aspect ratios, file sizes) without actually calling live APIs" — Phase 6

> "M6 (Metrics Ingestion): Automated cron jobs routinely pull engagement statistics (watch time, impressions, click-through rates) from the various platforms via API into a localized metrics warehouse. If the data triggers a statistical 'trend alert,' the Ada orchestrator proactively suggests a follow-up action" — Phase 6

## Required Deliverables

1. **Platform API database:** Per platform (YouTube Data API v3, TikTok API, Facebook Graph API, Instagram Graph API, newsletter providers), document: OAuth scopes required, rate limits, API availability (some platforms restrict third-party access), retry/backoff strategy
2. **Phased build plan:** M1 → M2/M3 → M4 → M5 → M6. Define exit criteria for each phase before advancing
3. **Simulation-to-live handoff protocol:** Define how n8n approval workflow transitions a module from dry-run to live; implement audit trail for all live API calls
4. **EDL format specification:** Adopt CMX 3600 EDL format (industry standard) or define a custom JSON schema; specify fields: clip name, source file, timecode in, timecode out, transition
5. **JSON scene card schema:** Define required/optional fields: scene_id, narrative_hook, emotional_beat, pull_quotes[], factual_claims[], b-roll_hints[], confidence_scores
6. **M6 metrics warehouse schema:** Define metrics tables per platform; specify trend alert algorithm (simple threshold? time-series anomaly detection? ARIMA?)
7. **n8n approval workflow design:** Implement Human-in-the-Loop approval nodes in n8n per platform; define escalation if human doesn't respond within SLA

## Dependencies

- n8n deployment (Phase 4 prerequisite)
- Vault and memory infrastructure (Phase 2–3 prerequisite)
- OAuth credentials management design

## Labels

`media-pipeline`, `content-automation`, `multi-platform`, `youtube`, `tiktok`, `instagram`, `facebook`, `n8n`, `edl`, `scene-cards`, `metrics`, `simulation`

## Notes

This is a P2 because the document explicitly defers live API calls to v1. The v0 build should implement M1 (scene card generation from transcripts) in isolation without requiring M3–M6. Prioritize M1 + M2 as the v0 deliverable.
