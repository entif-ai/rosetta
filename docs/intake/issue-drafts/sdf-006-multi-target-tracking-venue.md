# SDF-006: Multi-Target Tracking and Association for Venue Occupancy

## Status
draft

## Type
implementation

## Summary
Implement multi-target tracking and data association for venue occupancy using JPDA (Joint Probability Data Association) or MHT (Multiple Hypothesis Tracking) to handle NLoS, clutter, and measurement origin uncertainty in dense crowd environments.

## Problem

Venue-scale tracking with many nodes faces: measurement-to-track association ambiguity, NLoS spurious readings, multipath ghosts, birth/death of tracks in dense crowds. CMU DensePose fails with 3+ concurrent subjects due to CSI tensor summarization; SDF needs robust multi-target tracking.

## Proposed Solution

### Algorithm Selection
- JPDA: good for moderate density, tractable compute
- MHT: better for ambiguous association, more robust but heavier
- Alternative: learned association (graph neural network on measurement features)

### Track Management
- Birth: new track when measurement not associated to existing track with sufficient confidence
- Death: track pruned after N missed detections or max age
- Maintenance: track quality score (measured via recent innovation magnitudes)

### Association Features
- Range + angle to anchors
- RF fingerprint similarity
- Inertial odometry consistency
- Spatial proximity in state space

### NLoS Handling
- Innovation-based NLoS detection (large residuals)
- Measurement validation gate (Mahalanobis distance)
- CIR-derived features when available from anchor sensors

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "multi-target tracking and association (JPDA/MHT)"
- Aliro standard: UWB anchor density may increase; more tracks expected

## Depends On

SDF-002 (factor graph estimator — tracking is built on pose estimates)

## Labels

tracking, jpda, mht, occupancy, spatial-fabric, data-association

## Priority

medium