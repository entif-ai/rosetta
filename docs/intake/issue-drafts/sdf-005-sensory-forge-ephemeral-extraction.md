# SDF-005: SensoryForge — Ephemeral Feature Extraction Module

## Status
draft

## Type
architecture

## Summary
Design and implement SensoryForge: the module that converts raw sensor streams (UWB, WiFi CSI, BLE, IMU, cameras, microphones) into anonymous, low-retention feature tensors and VSV inputs without persisting raw data.

## Problem

SDF Guardian Mode requires "local-first inference" with "default evaporation." Raw sensor streams must not be archived; only sufficient statistics and feature tensors may be retained. This module is the ingestion boundary.

## Design Principles

1. **RAM-only by default**: no raw audio/video/radio persistence outside short ring buffer
2. **Feature extraction over raw storage**: convert to anonymous vectors immediately
3. **Hard TTL**: configurable retention (e.g., 5-30s ring buffer) with automatic overwrite
4. **No identity capture by default**: entropy profile computed on crowd state, not individuals
5. **Threshold-gated escalation**: only beyond-anomaly features retained longer (SSIE path)

### Ring Buffer
- Short RAM buffer for local feature continuity (5-30s configurable)
- Overwritten continuously unless Tripwire fires
- Not disk-backed; evaporates on process restart

### Feature Extraction Outputs
- Anonymous feature tensors (not raw feeds)
- Compressed VSV inputs
- Threat confidence + uncertainty bounds (from Guard Layer)
- Evidence digests (CID-style content addressing for SSIE)

## Module Architecture

```
SensoryForge
├── RadioIngestion
│   ├── UWB ranging edge extractor
│   ├── WiFi CSI extractor (if available)
│   ├── BLE proximity extractor
│   └── Anchor time-pilot listener
├── MotionIngestion
│   ├── IMU odometry delta calculator
│   ├── Barometer floor inference
│   └── Pose estimator integration
├── AudioIngestion (local only)
│   ├── Acoustic event detector (not raw streaming)
│   └── Anchor pilot correlator → clock offset
├── VisualIngestion (venue cameras)
│   ├── Occupancy grid producer
│   ├── Flow vector extractor
│   └── Event detector (anomaly flag only)
└── FeatureMux
    └── Combines all streams → VSV builder + Guard Layer input
```

## Privacy Constraints

- No raw audio/video written to disk
- No identity linking across events
- SSIE only includes minimal spatial metadata (no media)
- If raw snippets absolutely required for SSIE: encrypted, TTL-bound, last resort only

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "SensoryForge (Ephemeral Feature Extraction)"
- Guardian Mode spec: "convert sensor firehose into low-bandwidth latent state"

## Depends On

- SDF-001 (SSIE tile_kind for sealed incident output)
- SDF-002 (factor graph estimator for pose estimation)

## Labels

sensory-forge, privacy, feature-extraction, ram-only, ingestion

## Priority

high