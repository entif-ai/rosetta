# Issue Draft: AWM-002 — YouTube Upload Slot Scheduler: n8n Cron with 3/Day Hard Cap

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/ideas/20251004 - Agentic Workflow for Media Generation.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-agentic-workflow-media-generation.md`
- **Labels**: `youtube-api`, `scheduling`, `n8n`, `release-cadence`
- **Depends on**: AWM-001

## Summary

Implement n8n cron-triggered workflows that enforce YouTube's hard cap of 3 public uploads per 24-hour period by scheduling releases into fixed morning/afternoon/evening slots (09:00, 13:00, 17:00 ET). Upload is private first, then scheduled via `publishAt` to control exact publish time.

## Problem Statement

YouTube's algorithm meaningfully distributes at most 3 public uploads per channel per 24-hour period. Uploading more than 3 in a day causes the algorithm to stop distributing the excess. Additionally, flooding 3 videos within minutes of each other causes the algorithm to bury the second and third. The correct strategy is: 3 slots, spaced 4–6 hours apart, per day.

## Proposed Solution

### Slot Schedule

| Slot | Label | Cron (ET) | Spacing from previous |
|---|---|---|---|
| 1 | morning | `0 9 * * *` | — |
| 2 | afternoon | `0 13 * * *` | 4 hours |
| 3 | evening | `0 17 * * *` | 4 hours |

### n8n Workflow: Per-Slot Upload

```
Trigger: Cron (one workflow per slot)
  ↓
Google Sheets: SELECT next row WHERE Status=Ready AND Slot={current_slot}
  ↓
Mark row: Status=InProgress, RunId={uuid}  (idempotency key)
  ↓
Google Drive: fetch master_16x9.mp4, master_9x16.mp4, srt
  ↓
YouTube API: videos.insert (resumable upload, privacyStatus=private)
  ↓
YouTube API: videos.update (set publishAt = today {slot_time} ET)
  ↓
Sheets: Status=Scheduled, YT_ID={video_id}, PublishAt={timestamp}
  ↓
On failure: retry 3x with exponential backoff; then move to NeedsAttention, send alert
```

### Source-of-Truth Sheet Schema

| Column | Type | Notes |
|---|---|---|
| Artist | string | "SmaBoi" |
| TrackSlug | string | URL-safe identifier |
| AudioURL | Drive link | |
| ArtURL | Drive link | |
| VeoURL | Drive link | optional |
| LyricsURL | Drive link | lyrics.txt |
| SrtURL | Drive link | produced by aeneas |
| Title | string | |
| Tags | string | comma-separated |
| Description | string | LLM-drafted, human-approved |
| Slot | enum | morning / afternoon / evening / unassigned |
| Status | enum | Ready / InProgress / Scheduled / Published / NeedsAttention |
| RunId | string | idempotency key |
| YT_ID | string | YouTube video ID |
| PublishAt | ISO timestamp | |
| BlogPosted | boolean | |

### Idempotency

Each cron run uses `RunId` as an idempotency key. If a run crashes mid-way, the next cron tick will find the `InProgress` row and either retry or move to `NeedsAttention`.

### YouTube API Implementation

```javascript
// n8n HTTP Request node — YouTube Data API v3

// Step 1: Initialize resumable upload (returns upload URL)
POST https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable
Authorization: Bearer {{ $credentials.youtubeOAuth2.access_token }}
Content-Type: application/json

{
  "snippet": {
    "title": "{{ $json.title }}",
    "description": "{{ $json.description }}",
    "tags": {{ $json.tags | JSON.parse }},
    "categoryId": "10"  // Music
  },
  "status": {
    "privacyStatus": "private",
    "selfDeclaredMadeForKids": false
  }
}

// Step 2: Upload video bytes to the returned upload URL (chunked)

// Step 3: Schedule publish (after upload completes)
PUT https://www.googleapis.com/youtube/v3/videos?part=status
Authorization: Bearer {{ $credentials.youtubeOAuth2.access_token }}

{
  "id": "{{ $json.videoId }}",
  "status": {
    "privacyStatus": "private",
    "publishAt": "{{ $json.publishAt }}"  // ISO 8601
  }
}
```

### Pre-launch Validation

Before any public announcement:
- [ ] At least 1–2 weeks of videos pre-scheduled (Slot=morning/afternoon/evening, Status=Scheduled)
- [ ] Channel branding complete (banner, avatar, about section)
- [ ] OAuth2 token refresh cycle tested
- [ ] End screen template configured on first 10 videos

## Acceptance Criteria

- [ ] Exactly 3 videos published per 24-hour period, spaced 4 hours apart
- [ ] No video published without a corresponding `yt_id` and `PublishAt` in Sheets
- [ ] Retry logic fires correctly when YouTube API returns 5xx
- [ ] Token refresh works without manual intervention
- [ ] Flood-drop (3 videos < 1 hour) does not occur
- [ ] Channel session time increases week-over-week for the first 8 weeks
