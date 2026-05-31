# Issue Draft: AWM-003 — aeneas Docker Service on Synology for SRT Generation

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/ideas/20251004 - Agentic Workflow for Media Generation.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-agentic-workflow-media-generation.md`
- **Labels**: `synology`, `docker`, `aeneas`, `subtitle`, `nas`
- **Depends on**: AWM-001

## Summary

Deploy aeneas as a Docker container on Synology NAS to perform forced-alignment SRT generation from audio + lyrics.txt. The container is triggered by an inotifywait watcher service and produces timecoded subtitle files for the downstream ffmpeg render pipeline.

## Problem Statement

Lyric videos require per-line timecodes for subtitle burn-in. Manual timing is too slow for a 3/day release cadence. aeneas performs forced alignment (synchronizing a known text transcript to audio) and outputs standard SRT format. Synology NAS does not have native Python, so aeneas must run inside Docker.

## What is aeneas?

aeneas is a forced-alignment tool: it takes an audio file and a text file (one line = one subtitle cue) and outputs an SRT with start/end timecodes for each line. It works by performing TTS synthesis internally and matching against the input audio using dynamic time warping.

```
audio.mp3 + lyrics.txt → [aeneas forced alignment] → track.srt
```

## Why Docker on Synology?

- Synology NAS runs Linux but typically lacks native Python package management
- Docker provides a clean, isolated runtime without polluting the NAS system
- The same Docker image can be rebuilt locally or on a build machine and pushed to Synology

## Dockerfile

```dockerfile
FROM python:3.11-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    espeak \
    && rm -rf /var/lib/apt/lists/*

RUN pip install aeneas==1.8.0.4

WORKDIR /work
CMD ["python3", "-m", "aeneas.tools.execute_task"]
```

Note: aeneas requires `espeak` for TTS synthesis used in the alignment process.

## Synology Watcher Service

### inotifywait watcher script

```bash
#!/bin/bash
# watcher.sh — runs on Synology as systemd service

ROOT="/volume1/mediafactory/incoming"

process_dir() {
  dir="$1"
  audio="$dir/track.mp3"
  text="$dir/lyrics.txt"
  srt="$dir/track.srt"

  # Skip if already processed
  [ -f "$audio" ] && [ -f "$text" ] || return 0
  [ -f "$srt" ] && return 0

  echo "[align] $dir"

  docker run --rm \
    -v "$dir:/work" \
    aeneas-service \
    python3 -m aeneas.tools.execute_task \
      /work/track.mp3 \
      /work/lyrics.txt \
      "task_language=eng|is_text_type=plain|os_task_file_format=srt|task_adjust_boundary_algorithm=percent|task_adjust_boundary_percent_value=15" \
      /work/track.srt \
    || { echo "[fail] aeneas in $dir"; return 1; }

  # Sanity check: last cue should be within 3s of audio duration
  dur=$(ffprobe -i "$audio" -show_entries format=duration -v quiet -of csv="p=0")
  last_cue_end=$(awk 'END { print $NF }' "$srt" | tr -d '\r' | awk -F' --> ' '{print $2}' | awk -F':' '{print ($1*3600)+($2*60)+$3}')
  delta=$(python3 -c "print(abs($last_cue_end - $dur))")
  if [ "$(python3 -c "print(1 if float('$delta') > 3 else 0)")" -eq 1 ]; then
    echo "[warn] last cue end delta=${delta}s > 3s in $dir"
  fi

  echo "[ok] $dir -> track.srt"
}

export -f process_dir

# Initial sweep (in case items were added while service was stopped)
find "$ROOT" -maxdepth 2 -type f -name lyrics.txt -printf '%h\0' \
  | xargs -0 -n1 -I{} bash -c 'process_dir "$@"' _ {}

# Live watch mode
inotifywait -m -r -e close_write,create,move "$ROOT" \
  | while read -r dir _ file; do
      case "$file" in
        track.mp3|lyrics.txt) process_dir "$dir" ;;
      esac
    done
```

### Systemd unit

```ini
[Unit]
Description=MediaFactory aeneas watcher
After=network.target docker.service

[Service]
Type=simple
ExecStart=/bin/bash /opt/mediafactory/watcher.sh
Restart=on-failure
RestartSec=10s
User=admin

[Install]
WantedBy=multi-user.target
```

### WhisperX fallback

When performed lyrics deviate significantly from the lyric sheet (freestyle, ad-libs, improvised sections), aeneas alignment can fail or produce large errors. In these cases, WhisperX provides ASR-based timestamps from the audio alone, which can then be fuzzy-matched to the lyric sheet lines.

```bash
# WhisperX fallback — run when aeneas fails or delta > 10s
docker run --rm \
  -v "$dir:/work" \
  whisperx-service \
  whisperx --audio /work/track.mp3 --align_model BASE \
  --output_dir /work --output_format srt
```

## Lyrics.txt Format Requirements

For best aeneas results:
- One line of sung/displayed text per line in `lyrics.txt`
- Remove stage directions, ad-libs in brackets, and narration not sung
- Minimal punctuation (aeneas does not need it)
- No empty lines (treated as empty subtitle cues)
- Maximum ~80 characters per line (the display width for 1080p at standard font size)

Example:
```
This is the very first line
And now the second line appears
Chorus time everybody sing along
```

NOT:
```
[Verse 1]
This is the very first line!
(Everyone: sing!)
And now the second line appears...
```

## SRT Output Validation

Before the render pipeline continues, validate:
1. File exists and is non-empty
2. Last cue end time ≤ audio duration + 3 seconds
3. No cue duration > 60 seconds (would indicate alignment failure)
4. Number of cues ≈ number of lines in lyrics.txt ± 1 (accounting for blank-line stripping)

## Acceptance Criteria

- [ ] `lyrics.txt` + `track.mp3` in a new folder triggers aeneas within 60 seconds of both files being present
- [ ] `track.srt` is produced with correct timecodes; last cue within 3s of audio duration on 95% of tracks
- [ ] Watcher is idempotent: re-running on an already-processed folder does not re-trigger
- [ ] Failure cases are logged and the folder is NOT marked as processed
- [ ] WhisperX fallback is triggered when aeneas delta > 10s
- [ ] Docker image is < 500MB and startup time < 10 seconds
