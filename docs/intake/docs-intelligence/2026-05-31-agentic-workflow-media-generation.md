# Docs Intelligence Extraction — Agentic Workflow for Media Generation

## Source

- Path: `docs/ideas/20251004 - Agentic Workflow for Media Generation.md`
- Title: Agentic Workflow for Media Generation
- Date evidence: 2025-10-04
- Authority tier: persona voice (SmaBoi/llnnll Records creative ops sketch)
- Freshness: stale (historical; Oct 2025 planning session)
- Word count: ~4,500 (chat log)
- Extractor: heartbeat subagent
- Extraction date: 2026-05-31

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

This document is a persona-voice brainstorming chat log in which Crates/SmaBoi sketches a fully-automated personal video production and release pipeline for music (llnnll Records). It covers: Veo 3 Fast for animated backgrounds, ffmpeg reverse-looping, aeneas/WhisperX subtitle generation, n8n workflow automation, NAS watcher orchestration, blog auto-posting, newsletter digest, YouTube release cadence (3/day), and organic vs paid growth strategy. No Rosetta or Entif-specific concepts are introduced; this is a standalone personal ops sketch that could inform a media-factory pack or workflow tile.

## Goals And Intent

- Establish a repeatable, near-zero-human-effort pipeline for turning mastered audio + track art + lyric sheets into YouTube-ready lyric videos
- Maintain a 3-video-per-day release cadence on YouTube without burnout
- Automate blog autopost and weekly newsletter digest
- Minimize paid-ad dependency; maximize organic algorithmic signals
- Leverage SmaBoi persona and absurdist energy as primary differentiation vector

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| ffmpeg-based looping and audio mux | chat: reverse + concat commands | media-factory | required | core render primitive |
| SRT generation from lyrics.txt (aeneas) | chat: aeneas command syntax | media-factory | required | forced alignment; plain-text mode |
| YouTube 3/day hard cap | chat: "max that YouTube will continue to show" | release-ops | required | scheduling constraint |
| n8n as workflow orchestrator | chat: "n8n is the way to go" | media-factory | required | replaces Opal; queue mode + Redis |
| Synology NAS watcher for job intake | chat: "copy to dedicated folder on Synology" | media-factory | required | inotifywait; systemd service |
| Blog autopost per release | chat: JSON artifact + git commit or WP REST API | media-factory | required | track art as featured image |
| Weekly newsletter digest | chat: "anyone who has subscribed" | media-factory | required | HTML + plaintext; Mailgun/SES/Resend |
| YouTube OAuth2 upload via n8n | chat: videos.insert + publishAt scheduling | media-factory | required | YouTube Data API v3 |
| Veo 3 Fast via Gemini API (automated) | chat: "Veo generations...automated using Gemini API" | media-factory | optional-future | init_image from track art |
| loudnorm audio normalization | chat: -14 LUFS I, -1.5 TP, 11 LRA | media-factory | required | broadcast-ready output |
| 16x9 and 9:16 dual-output per release | chat: "long-form versions" + "crop...short form videos" | media-factory | required | ffmpeg center-crop for vertical |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 20251004 | docs/ideas/...Agentic Workflow... | VLC reverse filter | `ffmpeg`, `reverse-filter`, `vlc` | VLC's built-in reverse filter can corrupt output; ffmpeg is the reliable alternative | technology | `ffmpeg -i input.mp4 -vf reverse -af areverse output.mp4` is the reliable one-liner | prefer ffmpeg over VLC GUI for reverse | high |
| 20251004 | docs/ideas/...Agentic Workflow... | YouTube algo cap | `youtube-algorithm`, `release-cadence`, `3-per-day` | YouTube's algorithm stops meaningfully distributing a channel's uploads beyond 3 public videos per 24-hour period | requirement | "max that YouTube will continue to show to users before it stops distributing the following ones" | hard cap at 3/day; space across 3 slots (morning/afternoon/evening) | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Forward/reverse loop technique | `ffmpeg`, `loop`, `video-edit` | Forward + reversed duplicate concatenated to audio length creates seamless visual ping-pong without recompressing each round-trip; concat demuxer list avoids quality degradation | technology | `printf "file 'base.mp4'\nfile 'reverse.mp4'\n" > list.txt` then `ffmpeg -f concat -safe 0 -i list.txt -i audio -shortest` | use `-c:v copy` to avoid re-encode in concat; use `stream_loop -1` for muxing audio onto pre-rendered visual | high |
| 20251004 | docs/ideas/...Agentic Workflow... | aeneas forced alignment | `aeneas`, `srt-generation`, `lyrics-timing` | aeneas produces SRT timecodes from audio + lyrics.txt (one line per on-screen cue) via forced alignment; `is_text_type=plain` respects line breaks; `task_adjust_boundary_percent_value=15` adds forgiveness for fast passages | technology | `python3 -m aeneas.tools.execute_task audio.mp3 lyrics.txt "task_language=eng\|is_text_type=plain\|os_task_file_format=srt\|task_adjust_boundary_algorithm=percent\|task_adjust_boundary_percent_value=15" out.srt` | Docker-ize aeneas on Synology; watch for lyrics.txt + track.mp3 pair | high |
| 20251004 | docs/ideas/...Agentic Workflow... | n8n vs Opal decision | `n8n`, `workflow-automation`, `opal`, `mcp` | Opal does not reliably expose MCP client; n8n in queue mode with Redis is the recommended production orchestrator; Opal can be used for rapid prototyping only | decision | "n8n is the way to go" + evidence that Opal MCP support is undocumented/unreliable | n8n as production brain; Opal only for sketching flows | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Synology watcher script | `synology`, `nas`, `inotifywait`, `watcher` | inotifywait monitors `/volume1/mediafactory/incoming/` for `track.mp3` + `lyrics.txt` pairs; triggers aeneas + ffmpeg pipeline; runs as systemd service | technology | watcher script with `process_dir()` function; initial sweep + live watch mode | implement as systemd unit on Synology; idempotent via `track.srt` existence check | high |
| 20251004 | docs/ideas/...Agentic Workflow... | YouTube paid-ad retention cliff | `youtube-algorithm`, `paid-ads`, `organic-growth` | Paid traffic generates weak retention signals (skip reflex); video appears "shadowbanned" after ad spend stops because early retention data is poor — not malice, just math | risk | "anything beyond that goes into a kind of quiet limbo"; "the recommendation system is trained to maximize watch-time, and ad-traffic watch-time is weak" | If using ads, target narrowly for fan-like behavior; treat as one-time discovery kick, not sustained strategy | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Warm vs cold traffic signals | `youtube-algorithm`, `ctr`, `retention` | YouTube's algorithm reads CTR and watch-time at the video + channel level; warm traffic (newsletter, Discord, existing fans) generates stronger signals than cold paid clicks; consistency in posting builds channel-level session time | technology | "Once you have even a sliver of that — say a few dozen actual humans who click because they like the sound — then the algo will start testing it" | Seed each video with warm audience first (newsletter, blog, Shorts spillover) before letting it stand alone | high |
| 20251004 | docs/ideas/...Agentic Workflow... | loudnorm broadcast normalization | `ffmpeg`, `audio-normalization`, `loudnorm` | ffmpeg loudnorm filter for broadcast-ready output: I=-14 LUFS, TP=-1.5 true peak, LRA=11 loudness range; fade in/out 300ms prevents audio pops | technology | `-filter:a "loudnorm=I=-14:TP=-1.5:LRA=11"` | Apply loudnorm before YouTube upload; use afade for clean transitions | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Vertical crop for Shorts | `ffmpeg`, `9x16`, `shorts`, `crop` | `ffmpeg -i master_16x9.mp4 -vf "crop=1080:1920:(in_w-1080)/2:0,scale=1080:1920" -c:a copy` centers crop for vertical output | technology | "crop the view to create a vertical version, which I'll chop into multiple short form videos" | center-crop from 16:9 master for all vertical outputs | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Blog autopost via git or WP API | `blog`, `wordpress`, `hugo`, `jekyll`, `astro` | Blog autopost: Hugo/Jekyll/Astro via git commit+PR pipeline; WordPress via REST API POST with JWT auth; JSON-LD schema (MusicRecording, VideoObject) boosts SEO | technology | blog section: "git commit + push"; WP: `POST /wp-json/wp/v2/posts` | Use git-based static site for lowest maintenance; track art as featured image | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | Newsletter digest template | `newsletter`, `email`, `html-email`, `mailgun` | Weekly digest: query all `publish_at` in last 7 days; render HTML + plaintext from template; send via Mailgun/SES/Resend API; cross-post to blog as "Week N roundup" | technology | digest HTML skeleton with `{{#each releases}}` style templating | Keep subject lines rotating; 4-6h spacing between the 3 daily YouTube slots | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | Google Opal MCP limitations | `opal`, `mcp`, `google-opal` | Opal (withgoogle.com) does not reliably ship a first-class MCP client; ADK (Agent Development Kit) does support MCP to external servers, but Opal does not; HTTP webhook is the reliable interface | risk | "I don't see any reliable evidence that Google Opal ships a first-class MCP client today" | Do not assume Opal speaks MCP; use HTTP POST to ADK proxy or direct n8n webhook instead | high |
| 20251004 | docs/ideas/...Agentic Workflow... | NAS Synology as job broker | `synology`, `nas`, `job-broker`, `folder-watch` | Synology NAS is the physical job-broker: drop audio + art + lyrics into `/incoming/TrackSlug/` folder; watcher triggers entire pipeline; eliminates need for Google Form or Opal intake | architecture | "I can probably just copy the input material to my Synology NAS in a dedicated folder, and figure out some way to have that broker the scheduled jobs" | Design `/incoming/`, `/working/`, `/published/` folder contract; watcher is idempotent | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Veo init_image for track-art animation | `veo-3`, `gemini-api`, `video-generation`, `init-image` | Veo 3 Fast can accept an init_image (the existing track art) to generate subtle background animation; prompt guides "not too distracting"; effectively a video LoRA on the artwork | technology | "I tried Veo 3... add light background animation to the already stellar artwork I have for these tracks" | Automate via Gemini API: `gemini.video.generate(model="veo-3-fast", prompt=..., init_image=art_url)` | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | Canonical JSON artifact per release | `json-artifact`, `release-state`, `source-of-truth` | Each completed release emits a JSON file with: artist, title, slug, yt_id, publish_at, duration, aspect ratios, tags, description, asset URLs; Sheet/JSON is source of truth for all downstream steps (blog, newsletter, analytics) | architecture | JSON artifact structure in blog section | Emit this JSON at publish time; all downstream consumers (blog, newsletter, analytics) read from it | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Track art as newsletter/blog hero image | `track-art`, `newsletter`, `blog`, `featured-image` | Using existing track art as hero image for both blog posts and newsletter avoids need for OG image generation; LLM drafts title+description text, human approves | decision | "since it's NOT an animated GIF, I can also add the track art over each new release title and description shown in the newsletter and blog posts" | LLM drafts per-release copy; human thumbs-up approval gate before publish | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | YouTube upload scheduling via API | `youtube-api`, `n8n`, `scheduled-publish` | YouTube Data API v3: `videos.insert` (resumable upload) + `videos.update` to set `publishAt`; n8n HTTP Request node with OAuth2 creds handles both; slots at 09:00, 13:00, 17:00 ET | technology | "Create/refresh the token once in Credentials"; `privacyStatus="private"` then scheduled publish | OAuth2 token refresh lifecycle must be handled; set to private first, then schedule | high |
| 20251004 | docs/ideas/...Agentic Workflow... | Media factory folder structure | `folder-contract`, `media-factory`, `naming-hygiene` | Folder contract: `/audio/Artist/TrackSlug/`, `/art/Artist/TrackSlug/`, `/veo/Artist/TrackSlug/`, `/masters/Artist/TrackSlug/`, `/lyrics/Artist/TrackSlug/`, `/kits/`, `/published/` | architecture | folder structure in n8n section | This contract is the file-based API of the pipeline; all scripts reference it | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | "Shadowban after ads" phenomenon | `youtube-algorithm`, `paid-traffic`, `retention cliff` | Apparent "shadowban" after stopping paid ads is an artifact of poor retention signals from cold paid traffic; the algo has no concept of "paid" vs "organic" — only behavioral signals | technology | "YouTube's algo basically caps meaningful organic reach at three public uploads per 24-hour period" + "paid-traffic watch-time is weak" | Confirm: not shadowban, just weak behavioral data; fix is warm-seeding, not more ads | high |
| 20251004 | docs/ideas/...Agentic Workflow... | aeneas Docker on Synology | `docker`, `synology`, `aeneas`, `subtitle-alignment` | aeneas can run in Docker on Synology: `docker run --rm -v /volume1/mediafactory/...:/work aeneas-image python3 -m aeneas.tools.execute_task ...`; no native Python needed on NAS | technology | Docker approach in n8n section | Docker is the cleanest deployment unit for Synology; build/push aeneas image once | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | SRT per line vs word-level karaoke | `srt`, `karaoke`, `subtitle-granularity` | aeneas in plain-text mode produces one SRT cue per lyric line (video-ready); word-level karaoke requires aeneas in words mode + ASS/SSA post-processing; line-level is the practical sweet spot at 3/day cadence | decision | "keep SRT per line and add a simple wipe highlight in the editor"; "Per-word karaoke looks slick but costs more prep" | Default to line-level SRT; word-level only for special premium cuts | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | YouTube upload slot spacing | `youtube-algorithm`, `release-timing`, `slot-spacing` | 4–6 hour spacing between the 3 daily uploads keeps channel alive all day and avoids algo burying second/third video of a flood-drop; 09:00 / 13:00 / 17:00 ET is suggested | technology | "A 4–6 hour spacing keeps the channel alive all day" | Use fixed slot times; n8n cron trigger at each slot | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | Genre-community seeding | `community-seeding`, `organic-growth`, `warm-traffic` | Early traffic from genre-relevant Reddit, Discord, SoundCloud scenes drives better retention than cold paid; micro-influencer reaction channels (1–20k subs) provide authentic spillover | requirement | "Subreddits, small genre-specific Discords, BandLab/SoundCloud scenes" + "long tail of small YouTubers (1–20k subs) are hungry for things to react to" | Pre-seed each release in 2–3 communities before going wide | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | MCP supply-chain risk | `mcp`, `security`, `supply-chain` | A compromised MCP server package has been documented exfiltrating email data; MCP dependencies must be pinned and verified; mTLS or signed JWTs between MCP client and server | risk | "There's already a case of a compromised MCP server package exfiltrating email" (IT Pro) | Do not install unverified MCP packages; audit any homebrew MCP server dependencies | high |
| 20251004 | docs/ideas/...Agentic Workflow... | End screen + playlist chaining | `youtube`, `end-screen`, `playlist`, `session-chaining` | End screens pointing from Shorts → long-form, and song A → song B; playlists grouped by vibe cause algorithm to chain viewing sessions | technology | "End screens + pinned comments: always point from Shorts → long form, from song A → song B"; "Playlists: group songs by vibe; algorithm likes session chaining" | Build genre-themed playlists from week 1; always include end screen template | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | WhisperX as fallback for freestyle lyrics | `whisperx`, `asr`, `subtitle-alignment` | WhisperX uses ASR to generate timestamps from audio alone; useful when performed lyrics deviate from the lyric sheet (freestyle/ad-libs); fuzzy-match to sheet lines after | technology | "WhisperX (ASR + alignment) can generate timestamps from the audio alone, then you map to your lines by fuzzy matching" | Use WhisperX as fallback when aeneas alignment fails on freestyle sections | medium |
| 20251004 | docs/ideas/...Agentic Workflow... | Post-to-blog and cross-post digest | `blog`, `newsletter`, `weekly-digest` | Blog "Week NN, 2025: Releases & Notes" post is generated from the same template as the email digest; both consume the same JSON artifact; eliminates duplicate drafting | technology | "Cross-post the digest to the blog as 'Week NN, 2025: Releases & Notes' so it's web-discoverable" | Single template, two output channels; deduplicate content creation effort | medium |

## Components And Technologies

- **Veo 3 Fast** (Google): animated background generation from track art via `init_image` parameter
- **ffmpeg**: reverse filtering, concat demuxer looping, loudnorm audio normalization, center-crop for 9:16, stream_loop for audio mux
- **aeneas**: forced-alignment SRT generation from audio + lyrics.txt; Docker-ized on Synology
- **WhisperX**: ASR-based fallback subtitle generation for freestyle/deviated lyrics
- **n8n**: production workflow orchestrator; queue mode + Redis; handles YouTube API, Drive, Sheets, HTTP calls, email
- **Google Opal** (disqualified): MCP support unreliable; not suitable as production orchestrator
- **Synology NAS**: physical job broker; inotifywait watcher; systemd service; Docker for aeneas
- **YouTube Data API v3**: resumable upload (`videos.insert`), scheduled publish (`publishAt`), OAuth2 via n8n credentials
- **aeneas Docker image**: portable alignment service on NAS; no native Python dependency required
- **Google Sheets**: source-of-truth control sheet for release backlog and scheduling
- **Blog engine** (Hugo/Jekyll/Astro or WordPress): git-based static or WP REST API for autopost
- **Newsletter sender**: Mailgun / AWS SES / Resend API for weekly digest
- **ADK agent** (optional future): Cloud Run proxy if MCP semantics are needed from Opal; not required for current plan

## Conceptual Claims

- YouTube's organic distribution cap is 3 public uploads per 24-hour period; beyond this, videos enter algorithmic limbo
- Paid-traffic "shadowban" is a retention-signal artifact, not deliberate suppression; the fix is warm-seeding, not more paid spend
- A NAS folder-drop is a sufficient and superior intake mechanism to Google Form or Opal for this pipeline
- Track art used as newsletter/blog hero image eliminates OG image generation step entirely
- aeneas forced alignment in plain-text mode is the right default for line-synced lyric videos at 3/day scale
- n8n in queue mode replaces Opal entirely for production workflows
- Word-level karaoke styling (ASS/SSA) is premium/premium-only; line-level SRT is the sustainable default

## Dependencies And Sequencing

1. **Folder contract defined** → all scripts reference `/incoming/`, `/working/`, `/published/` structure
2. **Synology watcher deployed** → inotifywait + systemd service; idempotent via `track.srt` existence check
3. **aeneas Docker image built/pushed** → alignment service available on NAS
4. **n8n queue + Redis deployed** → workflow engine operational
5. **YouTube OAuth2 credentials configured** → n8n HTTP Request node authorized
6. **Blog engine chosen and templated** → git pipeline or WP REST API integration in n8n
7. **Newsletter sender API configured** → Mailgun/SES/Resend in n8n
8. **Weekly digest cron wired** → queries last-7-days from Sheets/JSON; renders template; sends + posts
9. **Veo API automation (optional-future)** → Gemini API wrapper for init_image animation; currently manual
10. **Pre-launch content backlog** → at least 1–2 weeks of videos pre-scheduled before any public announcement

## Contradictions Or Supersession

- None. This is a personal ops sketch; no prior Rosetta/Entif docs are contradicted. The document predates all Rosetta Bootstrap and NOT LAME PRD work.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| AWM-001: Media Factory Pack — n8n + Synology video pipeline | implementation | `docs/intake/issue-drafts/awm-001-media-factory-pack.md` | `media-factory`, `n8n`, `workflow`, `youtube`, `automation` | — | Full production pipeline defined in doc: aeneas + ffmpeg + n8n + YouTube API + blog + newsletter |
| AWM-002: YouTube upload slot scheduling — n8n cron with 3/day hard cap | implementation | `docs/intake/issue-drafts/awm-002-youtube-slot-scheduler.md` | `youtube-api`, `scheduling`, `n8n`, `release-cadence` | AWM-001 | YouTube 3/day cap and 09:00/13:00/17:00 slot pattern explicitly defined |
| AWM-003: aeneas Docker service on Synology for SRT generation | implementation | `docs/intake/issue-drafts/awm-003-aeneas-synology-docker.md` | `synology`, `docker`, `aeneas`, `subtitle`, `nas` | AWM-001 | inotifywait watcher + aeneas Docker on Synology; forced alignment pipeline |
| AWM-004: Newsletter digest automation — n8n weekly cron + blog cross-post | implementation | `docs/intake/issue-drafts/awm-004-newsletter-digest-automation.md` | `newsletter`, `n8n`, `email`, `blog`, `automation` | AWM-001 | Weekly digest from JSON artifact; HTML + plaintext; cross-post to blog |
| AWM-005: Blog autopost per release — git pipeline or WP REST API | implementation | `docs/intake/issue-drafts/awm-005-blog-autopost-pipeline.md` | `blog`, `wordpress`, `hugo`, `jekyll`, `automation` | AWM-001 | Blog autopost using JSON artifact; git-based static or WP REST API |

## Project Board Suggestions

- Area: Tools / Media Factory
- Cycle: This is a personal llnnll Records pipeline; not a Rosetta/Entif project — recommend archiving under `docs/ideas/` extraction with AWM-* issues raised if the media-factory approach is adopted as a shared module
- Status: extracted
- Blocked by: None; all findings are independent
- Parallelization notes: AWM-001 through AWM-005 are sequential (AWM-001 is the umbrella; 002-005 are components) but AWM-003 (aeneas Docker) could be built independently as a proof-of-concept

## Open Questions

- What is the actual YouTube API quota headroom for a 3/day upload cadence at scale (100+ tracks)? Resumable upload vs simple upload tradeoffs?
- Should the media-factory pipeline be packaged as a Rosetta pack (ROCK-family) for reuse by other Entif projects, or kept as SmaBoi/llnnll-specific?
- Is there a use case for integrating Rosetta's provenance/receipt system into the media-factory pipeline (e.g., receipts for every render job, signed attestations for upload authenticity)?
- What is the failure/retry policy for the Synology watcher when aeneas alignment fails on a difficult audio track?
