# SDF-002: Venue State Vector (VSV) Schema and Wire Format

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — "Define the v1 output as a Venue State Vector updated at 10–30 Hz: occupancy grid + flow field + tracked entities + event map + health metrics."

## Summary
Define the canonical compressed wire format for SDF output: Venue State Vector (VSV), a low-bandwidth, low-latency representation of spatial state for downstream robotics, security, and emergency response consumers.

## Motivation

SDF ingest pipeline (SensoryForge, factor-graph estimator) must output a defined, compressible format. Raw sensor streams are too large for real-time delivery to edge servers and downstream systems. VSV is the Rosetta-passable artifact representing "what is happening in the space."

## Proposed VSV Components

- **Occupancy grid**: coarse-to-fine spatial occupancy (cells = zones or voxels)
- **Flow field**: velocity vectors per region (crowd motion direction + speed)
- **Tracked entities**: robots/staff with opt-in identities (not crowd participants)
- **Event map**: visual + audio events with location and confidence scores
- **Health metrics**: sensor coverage, estimator uncertainty bounds, anchor integrity

## Open Questions

- What compression ratio is achievable at 10 Hz vs 30 Hz update rate?
- What is the latency budget from sensor input to VSV output?
- Should VSV be a Rosetta tile_kind, a tapasco artifact, or a separate wire protocol?

## Labels
`sdf`, `vsv`, `output-format`, `compression`, `wire-format`

## Depends On
None
