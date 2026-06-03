# SDF-002: Factor Graph Estimator for Multi-Modal Venue Localization

## Status
draft

## Type
implementation

## Summary
Design and implement a factor graph estimator for spatial localization using multi-modal sensor fusion: UWB ranges, WiFi RTT, BLE proximity, inertial odometry, barometer floor inference, RF fingerprint similarity constraints, and anchor observations.

## Problem

SDF requires robust estimation of device pose over time in RF-challenging venues (multipath, NLoS, duty-cycle limits). Naive triangulation fails; a factor graph with robust loss functions is needed.

## Proposed Solution

### Nodes
- Device pose over time: (x, y, z, yaw, velocity)
- Per-device clock state: offset(t), drift(t), pipeline_latency(t)

### Edges / Factors
- UWB range edges (when available)
- WiFi RTT range edges (when available)
- BLE proximity constraints (weak)
- Inertial dead-reckoning constraints (medium, drifting)
- Barometer floor constraints (medium)
- RF fingerprint similarity constraints (weak, useful for clustering)
- Known anchor constraints (strong)

### Solver
- Incremental smoothing (iSAM2-style)
- Outlier rejection: RANSAC, Huber loss, Cauchy loss
- NLoS detection heuristics
- Per-device clock bias/drift estimated as part of graph

### Robustness
- Use only "good edges" when available; fall back to weaker modalities
- Detect and downweight correlated multipath bias
- Model selection: "this edge is garbage" before solving

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "factor graph localization + factor graphs"
- Reference: iSAM2, GTSAM or G2O implementation
- CMU DensePose-from-WiFi: same-layout assumption doing heavy work — similar generalization risk applies

## Depends On

- SDF-001 (tile_kind for SSIE output)

## Labels

spatial-fabric, estimator, factor-graph, robust-optimization, isam2

## Priority

high