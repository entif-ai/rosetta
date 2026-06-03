# SDF-010: VSV Output Wire Format — Compression Ratio and Update Rate Targets

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — "Define the v1 output as a Venue State Vector updated at 10–30 Hz: occupancy grid + flow field + tracked entities + event map + health metrics." No compression targets defined.

## Summary
Define performance targets for VSV wire format: compression ratio, update rate (10 Hz vs 30 Hz), end-to-end latency from sensor ingestion to VSV delivery, and bandwidth per venue size.

## Motivation

SDF's value proposition includes "low-bandwidth, low-latency" spatial state delivery to downstream systems. VSV is the canonical output artifact. Compression ratio and latency SLA are critical for: (1) real-time delivery to edge servers, (2) viable bandwidth economics for cloud-backhauled venues, (3) comparison against alternative spatial telemetry approaches.

## VSV Components to Characterize

| Component | Data Type | Per-Update Size Estimate | Compression Sensitivity |
|---|---|---|---|
| Occupancy grid | Float/cell or binary | ~1KB for 50×50 grid | High; sparse representation wins |
| Flow field | Vector/region | ~500B for 20×20 field | Medium; delta coding works |
| Tracked entities | ID + pose + velocity | ~100B per entity; 0–1000 entities | High; position delta + prediction residual |
| Event map | Event + location + confidence | ~50B per event; sparse | Low; events are rare |
| Health metrics | Scalar/anchor | ~200B | Low; already compact |

## Target Metrics

- **Update rate**: 10 Hz (crowd flow) vs 30 Hz (fine-grained motion) selectable per deployment
- **End-to-end latency**: < 200ms from sensor input to VSV delivery at edge
- **Bandwidth per venue**: < 50kbps sustained for mid-size stadium at 10Hz
- **Compression ratio**: > 20:1 vs raw sensor bandwidth

## Open Questions

- What is the achievable compression ratio for occupancy grid using sparse/zonal representation?
- Does VSV need backward-compatible versioning for deployed venues?
- Should VSV use a binary encoding (protobuf/cbor) or is JSON acceptable for first version?

## Labels
`sdf`, `vsv`, `compression`, `latency`, `bandwidth`, `wire-format`

## Depends On
SDF-002 (VSV schema)
