# Issue Draft: AWM-001 — Media Factory Pack: n8n + Synology Video Pipeline

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/ideas/20251004 - Agentic Workflow for Media Generation.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-agentic-workflow-media-generation.md`
- **Labels**: `media-factory`, `n8n`, `workflow`, `youtube`, `automation`
- **Depends on**: —

## Summary

Design and implement a full automated video production pipeline ("Media Factory") for turning mastered audio + track art + lyric sheets into YouTube-ready lyric videos with 3/day release cadence, blog autopost, and weekly newsletter digest. n8n is the workflow orchestrator; Synology NAS is the job broker; ffmpeg and aeneas handle media processing.

## Problem Statement

Manual video production and release is the primary bottleneck preventing sustainable 3/day YouTube cadence. Every step (render → upload → schedule → blog → newsletter) requires human intervention. At 3/day, that is not sustainable.

## Proposed Solution

```
/incoming/TrackSlug/        ← drop zone: track.mp3 + lyrics.txt + art.jpg
     ↓ (Synology watcher: inotifywait + systemd service)
/working/TrackSlug/         ← aeneas SRT, ffmpeg master renders
     ↓ (n8n workflow picks up)
/published/TrackSlug/       ← final 16x9 + 9x16 masters + JSON artifact
     ↓ (n8n continues)
/uploads/                   ← YouTube API (private → scheduled publish)
     ↓ (post-publish)
/blog/                      ← git commit or WP REST API autopost
/newsletter/                ← weekly digest queued
```

### Key Components

1. **Synology watcher service** (`inotifywait` + systemd): monitors `/incoming/*/` for `track.mp3` + `lyrics.txt` pair; runs aeneas; produces `track.srt`; signals n8n
2. **aeneas Docker service**: forced alignment; plain-text mode; `task_adjust_boundary_percent_value=15`; Docker image hosted on Synology
3. **n8n (queue mode + Redis)**: workflow engine for all orchestration; handles YouTube API, Drive, Sheets, HTTP, email
4. **ffmpeg pipeline**: forward/reverse looping (`-vf reverse`), concat demuxer, loudnorm (`I=-14:TP=-1.5:LRA=11`), 9:16 center-crop
5. **YouTube Data API v3**: resumable upload (`videos.insert`), private → scheduled publish (`publishAt`); OAuth2 via n8n credentials; 3 slots: 09:00 / 13:00 / 17:00 ET
6. **Blog autopost**: git commit/PR pipeline (Hugo/Jekyll/Astro) or WP REST API; track art as featured image; JSON-LD schema
7. **Newsletter digest**: weekly cron; query last-7-days from Sheets/JSON; HTML + plaintext; Mailgun/SES/Resend API; cross-post to blog

### n8n Workflow Triggers

| Trigger | Frequency | Action |
|---|---|---|
| Synology webhook | on new folder | fetch assets, run ffmpeg pipeline |
| Cron | 09:00 ET | pick next `Status=Ready, Slot=morning`, upload to YT private, set `publishAt` |
| Cron | 13:00 ET | same, Slot=afternoon |
| Cron | 17:00 ET | same, Slot=evening |
| Cron (weekly) | Monday 08:00 ET | render digest, send email, cross-post to blog |
| Cron (hourly) | every hour | for any row `publish_at <= now AND blog_posted=false`: blog autopost |

### ffmpeg Core Commands

```bash
# Forward loop from still art with Ken Burns zoom
ffmpeg -loop 1 -i art.jpg -t "$dur" \
  -vf "scale=1920:1080,zoompan=z='1+0.00008*t':d=1" \
  -r 30 -pix_fmt yuv420p -c:v libx264 base.mp4

# Reverse twin
ffmpeg -i base.mp4 -vf reverse -af anull reverse.mp4

# Concat to audio length (without re-encode)
printf "file 'base.mp4'\nfile 'reverse.mp4'\n" > list.txt
ffmpeg -f concat -safe 0 -i list.txt -i track.mp3 -shortest \
  -c:v copy -c:a aac -b:a 192k -movflags +faststart master_16x9.mp4

# Vertical crop for Shorts
ffmpeg -i master_16x9.mp4 \
  -vf "crop=1080:1920:(in_w-1080)/2:0,scale=1080:1920" -c:a copy master_9x16.mp4

# Add audio with loudnorm normalization
ffmpeg -stream_loop -1 -i veo_loop.mp4 -i track.wav -shortest \
  -filter:a "loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:ss=0:d=0.3,afade=t=out:st=$(ffprobe -i track.wav -show_entries format=duration -v quiet -of csv=p=0 | awk '{print $1-0.3}'):d=0.3" \
  -c:v copy -c:a aac -b:a 192k -movflags +faststart out.mp4
```

### aeneas Command

```bash
python3 -m aeneas.tools.execute_task \
  track.mp3 lyrics.txt \
  "task_language=eng|is_text_type=plain|os_task_file_format=srt|task_adjust_boundary_algorithm=percent|task_adjust_boundary_percent_value=15" \
  track.srt
```

### Release Artifact (JSON — source of truth)

```json
{
  "artist": "SmaBoi",
  "title": "Track Title",
  "slug": "track-title",
  "yt_id": "YOUTUBE_VIDEO_ID",
  "publish_at": "2025-10-01T13:00:00-04:00",
  "duration_sec": 213,
  "aspect": ["16x9", "9x16"],
  "tags": ["synthwave", "lyric-video"],
  "description": "Short blurb...",
  "audio_url": "drive://...",
  "art_url": "drive://...",
  "thumb_url": "drive://...",
  "srt_url": "drive://..."
}
```

## Acceptance Criteria

- [ ] Synology watcher detects new `track.mp3` + `lyrics.txt` pair and triggers aeneas within 60 seconds
- [ ] aeneas produces valid SRT with one cue per lyric line; last cue ends within 3 seconds of audio duration
- [ ] ffmpeg pipeline produces broadcast-normalized 16x9 and 9x16 masters from Veo loop or still art
- [ ] n8n successfully uploads to YouTube, sets private → scheduled publish, and updates Sheets with `yt_id`
- [ ] Blog post is created within 1 hour of YouTube publish time
- [ ] Weekly digest email is sent every Monday and cross-posted to blog
- [ ] All steps are idempotent (re-running watcher on already-processed folder does nothing)

## Open Questions

- Is there a Rosetta/Entif integration point (e.g., receipts for each render job)?
- Should this be packaged as a ROCK-family pack for reuse?
