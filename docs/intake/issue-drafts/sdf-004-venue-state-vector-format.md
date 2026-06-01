# SDF-004: Venue State Vector (VSV) Compressed Output Format

## Status
draft

## Type
specification

## Summary
Formalize the Venue State Vector (VSV) as the primary low-bandwidth compressed output format for SDF Guardian Mode, updated at 10-30 Hz.

## Problem

SDF's value proposition is "vectorized for low bandwidth, low latency." VSV is the output format but lacks formal specification. CMU DensePose-from-WiFi demonstrates learned pose inference; SDF needs a concrete output schema that compresses venue state without losing actionable information.

## Proposed Solution

### VSV Update Rate
- Target: 10-30 Hz
- Configurable per venue / deployment

### Fields

```
{
  "kind": "sdf.vsv.v1",
  "timestamp_utc": "...",
  "anchor_time": { "t": "...", "sigma_ms": 0.3 },

  "occupancy": {
    "grid_resolution_m": 0.5,
    "grid_dimensions": [60, 40],
    "cells": [[0.0..1.0], ...]  // density per cell
  },

  "flow_field": {
    "vectors_per_m2": 0.25,
    "vectors": [
      { "xyz": [x,y,z], "velocity_ms": [vx,vy,vz], "sigma_ms": [sx,sy,sz] },
      ...
    ]
  },

  "tracked_entities": [
    {
      "id": "ephemeral-id",
      "pose_xyz": [x,y,z],
      "sigma_m": 0.8,
      "role": "robot|staff|participant",
      "opt_in_identity": false
    },
    ...
  ],

  "events": [
    {
      "class": "stampede|surge|congestion|acoustic_shock|other",
      "location_xyz": [x,y,z],
      "confidence": 0.86,
      "source_modality": "audio|visual|rf"
    },
    ...
  ],

  "health": {
    "coverage_pct": 0.94,
    "anchor_integrity": "green|yellow|red",
    "uncertainty_avg_m": 0.4,
    "active_nodes": 847
  }
}
```

## Design Notes

- `tracked_entities` opt-in only; no persistent identity
- `events` are anomaly detections from Guard Layer, not raw sensor data
- `health` enables real-time monitoring of the spatial fabric itself
- Compression: grid-based occupancy is O(n) in cells; flow vectors can be downsampled

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "venue state vector (VSV)"
- Aligns with "vectorized for low bandwidth, low latency" design goal

## Depends On

- SDF-001 (SSIE tile_kind for incident envelopes)
- SDF-002 (factor graph estimator produces pose output)

## Labels

spatial-fabric, vsv, output-format, compression, low-latency

## Priority

medium