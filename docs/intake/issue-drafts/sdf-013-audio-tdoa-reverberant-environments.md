# SDF-013: Audio TDOA in Reverberant Multi-Source Environments — Anchor Pilot Required

## Status
draft

## Type
technology

## Summary
Document why naive waveform correlation for audio TDOA fails in real venues (reverberation, multiple simultaneous sources, AGC/noise suppression, sample rate drift), and why anchor time-pilots with continuous drift modeling is the correct approach.

## Problem

SDF Guardian Mode proposes using audio from multiple devices to assist spatial localization. Naive "just correlate waveforms" works in controlled lab conditions but fails in real venues (stadium, transit concourse, gym). Understanding why is critical for estimator design.

## Why Natural Audio Correlation Fails

### 1. Reverberation
Sound reflects off walls, floors, ceilings, crowds. Cross-correlation sees multiple delayed versions of the same event, each with different amplitude and phase. The "correct" arrival is buried in the first few strongest paths, not always the first-timestamped sample.

### 2. Multiple Simultaneous Sources
A stadium has dozens of overlapping sound sources (voices, footsteps, announcements, music). Correlation finds "something similar between two recordings" — not necessarily the same source. With 3+ concurrent sources, waveform matching becomes ambiguous.

### 3. Automatic Gain Control (AGC) and Noise Suppression
Consumer device OS applies AGC to microphone input, which alters waveform amplitude and potentially phase relationships. Device-level noise suppression further warps the signal. The "same sound" looks different on different devices.

### 4. Sample Rate Drift
Consumer audio clocks are not phase-locked. Sample rate can drift over time (not just constant offset), meaning a 5-second recording on Device A may represent 5.003 seconds of physical time on Device B. One-time correlation with a constant offset doesn't capture drift.

### 5. Body Blocking and Orientation
Microphone is in someone's pocket or hand; orientation changes frequency response. Head and body partially block and diffract sound. Two devices capturing the same event may see dramatically different spectral signatures.

## What DOES Work

### Anchor Time-Pilots (the robust approach)
1. Anchors broadcast a known acoustic or ultrasonic pilot sequence on a scheduled basis
2. Each device records the pilot and estimates: (a) clock offset to anchor time, (b) clock drift rate, (c) device-specific capture latency
3. With known pilots, correlation is applied to a known signal, not chaotic crowd audio
4. Devices map their audio timeline into a shared anchor time base
5. Drift is modeled as a continuous function (not constant offset), updated with each pilot

### Practical Timing Requirements

| Timing Error | Position Error | Use Case |
|---|---|---|
| 1ms | 0.343m | Coarse zone classification |
| 0.1ms | 3.43cm | Crowd flow tracking |
| 10μs | 3.43mm | Micro-gesture localization (requires radar, not audio) |

48kHz audio: one sample ≈ 20.8μs ≈ 7mm timing resolution (if perfect). Sub-sample interpolation (GCC-PHAT) improves resolution but not if AGC/waveform warping is severe.

### Alternative: Event-Based Audio TDOA

Instead of continuous audio, detect discrete acoustic events:
- Gunshot (sharp transient, easy to time)
- Shout/scream (onset detection)
- Structural sounds (door, alarm)

Events have clear onset that survives some reverberation. Multiple devices hearing the same event can triangulate via TDOA. This is more robust than continuous correlation.

## Integration with Factor Graph

- Audio TDOA edges feed into factor graph as range constraints (with uncertainty bounds)
- Per-device clock model (offset(t), drift(t)) is solved alongside pose
- Audio TDOA is a weak-to-medium constraint; geometry comes from UWB/WiFi ranging, not audio
- NLoS-like classifier for audio: detect when an audio edge is multipath-contaminated vs direct-path

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "audio TDOA and clock sync"
- GCC-PHAT: standard audio TDOA algorithm; works on known signals, struggles with reverberation

## Labels

audio, tdoa, anchor-pilot, reverberation, clock-sync, spatial-fabric

## Priority

medium