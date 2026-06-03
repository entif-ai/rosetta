# SDF-005: Factor-Graph Estimator for Crowd-SLAM Spatial Fabric

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — factor graph formalism described in detail; "Nodes: device pose over time; Edges: UWB/WiFi/BLE/IMU/barometer/RF-fingerprint constraints"

## Summary
Design a factor-graph estimator that fuses heterogeneous measurements from anchor infrastructure and phone swarms to produce a coherent spatial map of the venue, with robust outlier rejection, NLoS detection, and real-time incremental smoothing.

## Motivation

Crowd-SLAM requires solving for thousands of unknown device poses using heterogeneous, noisy, sometimes adversarial measurements. A factor-graph formulation cleanly represents this as nodes (poses) and edges (constraints) and enables robust optimization with principled outlier rejection.

## Factor Graph Structure

**Nodes:**
- Device pose over time: `(x, y, z, yaw, velocity)` per device
- Anchor poses (known or partially unknown if self-calibrating)
- Clock parameters per device: `offset(t)`, `drift(t)`, `pipeline_latency(t)` (see SDF-006)

**Edge Factors (constraints):**
- UWB range edges (strong when LoS available; downweighted under NLoS)
- WiFi RTT range edges (medium strength)
- BLE proximity constraints (weak; useful for clustering)
- Inertial dead-reckoning (medium; drifts over time)
- Barometer floor constraints (medium; floor inference)
- RF fingerprint similarity (weak; useful for zone clustering)
- Anchor constraints (strong; known positions)

## Robust Optimization Requirements

- Outlier rejection: RANSAC, Huber loss, Cauchy loss
- NLoS/multipath detection and downweighting using CIR features (where available)
- Incremental smoothing: iSAM2-style or equivalent for real-time performance with 10,000+ nodes
- Multi-target association: JPDA, MHT, or learned association

## Open Questions

- Can the estimator handle 10,000+ device nodes in real-time at 10–30 Hz?
- Does it require hierarchical/subgraph decomposition (e.g., per-zone)?
- What is the minimum anchor geometry (number, placement) to prevent drift?

## Labels
`sdf`, `factor-graph`, `estimator`, `slam`, `crowd-slam`, `optimization`

## Depends On
SDF-001 (Guardian Mode), SDF-002 (VSV schema)
