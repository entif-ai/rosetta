# Issue: video-transcript-dedup-playlist-tracking

## Metadata

- ID: 
- Title: Video Transcript Deduplication by Canonical Video ID + Playlist Attachment Tracking
- Type: implementation
- Severity: medium
- Tags: video-transcription, canonical-id, playlist-attachment, dedupe, youtube
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

YouTube video transcripts must be deduplicated by canonical video ID: transcribe once, never re-transcribe the same video. When a video is referenced from an additional playlist, add a note indicating it is attached to that playlist and its content realm — without re-transcribing.

## The Requirement

> "the ability to... YouTube videos automatically transcribed in a way that never runs the transcription twice for the same video if it's already correctly stored [but DOES add a note if it's being referenced from an additional playlist, to indicate that it's attached to that playlist and its realm of content as well, even if it's been transcribed before]"

## The Problem

Naive approach: store transcript keyed by URL. Problem: same video can appear in multiple playlists with different URLs → duplicate transcription.

Naive approach 2: store transcript keyed by content hash. Problem: content hash changes if video is re-uploaded with edits; also doesn't capture playlist context.

## The Solution

### Canonical Video ID

Use the video's stable YouTube video ID (e.g., `dQw4w9WgXcQ` from `youtube.com/watch?v=dQw4w9WgXcQ`) as the canonical ID.

Derivation:
- From watch URL: extract `v` parameter
- From youtu.be URL: extract path component
- From embed URL: extract video ID from path
- From playlist URL: extract video ID, treat playlist reference as separate relationship

This is stable across:
- Different URLs pointing to the same video
- Playlist embedding vs. direct link
- Share links vs. embed links

### Transcript Storage

```
transcript_artifact:
  canonical_video_id: string (YouTube video ID)
  artifact_id: string (Rosetta canonical ID)
  content_hash: string (SHA-256 of transcript text)
  source_url: string (original URL)
  transcribed_at: timestamp
  playlist_edges: []PlaylistAttachment (may be empty)
```

### Playlist Attachment

When a video is referenced from a playlist:

```
playlist_attachment:
  playlist_id: string
  playlist_name: string
  position_in_playlist: integer (optional)
  added_to_playlist_at: timestamp
  note: string ("attached to 'Course: Advanced Topics' playlist and its content realm")
```

The key insight: the transcript artifact already exists (by canonical video ID). Adding a playlist reference creates a NEW relationship edge, NOT a new transcript. The note explains the contextual attachment.

### Query Behavior

- "Get transcript for video X" → look up by canonical video ID → return existing or transcribe if missing
- "What playlists is video X in?" → return all playlist_edges for that canonical video ID
- "Get all transcripts from playlist Y" → query for all transcripts with playlist_edges.playlist_id = Y
- "Transcribe video X again" → reject if canonical video ID exists and current transcript is valid

### Transcript Validity

A transcript is "valid" unless:
- User explicitly requests re-transcription (override)
- The video content has materially changed (detected by re-checking video metadata)
- The transcript is marked as corrupted/incomplete

## Resolution Required

1. Build canonical video ID extraction from various YouTube URL formats
2. Store transcript keyed by canonical video ID, not URL
3. Store playlist attachment as separate relationship edge, not duplicate transcript
4. Implement "never re-transcribe same video" logic: check canonical ID first
5. When video appears in new playlist, add playlist_edge with explanatory note
6. Query APIs: by video ID, by playlist ID, with playlist context

## Edge Cases

- Video re-uploaded with edits → content hash changes; does transcript become invalid? User choice.
- Playlist link vs. video link with same ID → same canonical ID, no duplication
- Multiple transcripts per video (different language tracks) → use language as a dimension, but still deduplicate by video ID + language

## Related Issues

- source-preservation-doctrine-vs-state-vs-evidence-vs-reflection (transcript is evidence, not interpretation)
- projection-rebuildability-derived-layers-not-truth (transcript is source, not projection — derived layers rebuild from it)