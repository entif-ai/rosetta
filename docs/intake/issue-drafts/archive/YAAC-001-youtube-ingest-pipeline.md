# YAAC-001: YouTube ingest pipeline (Fabric + ASR fallback)

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** yt-ingest, pipeline, fabric  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Design and implement a YouTube transcript ingestion pipeline for Entif's graph DB using Fabric's yt-dlp-based transcript extraction, with ASR/Whisper fallback for videos lacking captions, idempotency by video_id, and checkpointing for resumable batch processing.

## Recommended Pipeline Design

### 1) URL extraction (pre-step, already complete)
- Playlist URLs extracted to JSON array (already done by Crates)
- video_id normalization to canonical form

### 2) Ingest loop per URL
```
For each URL:
  1. Normalize → canonical video_id
  2. Skip if already ingested (video_id + method + language + updated_at)
  3. Attempt captions-first via Fabric:
     - Use --transcript-with-timestamps for evidence anchoring
     - Use --sleep-requests N for throttling
     - Store language_requested + language_actual as provenance
  4. On "no subtitles" or persistent 429s:
     - Mark video as needs_asr=true, move on
     - Later: run ASR lane (Whisper) on downloaded audio
  5. Store provenance per transcript node:
     - source_url, video_id, channel_id, retrieved_at
     - method = captions | auto_captions | asr_whisper | ...
     - language_requested, language_actual
     - has_timestamps, caption_track_id
     - hash of raw transcript text
```

### 3) Rate limiting
- yt-dlp --sleep-requests with jittered backoff
- Low concurrency (1-3 workers beats 20 workers on 429s)
- Checkpointing after each video

### 4) Idempotency
- Deduplicate by video_id + transcript method + language + updated_at
- On restart, resume from last checkpoint

## Evidence

- Fabric uses yt-dlp to extract subtitles/transcripts (no API key required)
- HTTP 429 "Too Many Requests" increasingly common
- Fabric doc recommends --sleep-requests, waiting, jittered backoff
- Some videos have no subs (auto-subs attempted, fails gracefully)
- Age-restricted/unlisted videos: --cookies-from-browser support exists
- Language track weirdness: store actual track, not just requested

## Status

Open.
