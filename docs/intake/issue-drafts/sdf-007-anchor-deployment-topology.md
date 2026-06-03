# SDF-007: Anchor Deployment Minimal Topology for Venue SDF

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — "With anchors available and thousands of devices, you can very plausibly build a high-quality, low-bandwidth spatial state of a venue." "A handful of UWB anchors per concourse."

## Summary
Define the minimum anchor count, placement pattern, and update rate for SDF to achieve Tier 1–2 accuracy (crowd flow, occupancy, meter-ish relative geometry) across venue types: transit station, arena bowl, warehouse, outdoor plaza.

## Motivation

SDF's "less hardware" thesis rests on the claim that phone swarms can reduce anchor density compared to traditional instrumentation. This needs to be quantified per venue type before the thesis can be validated or marketed.

## Proposed Approach

**Per-venue-type minimum topology:**
- Transit concourse: sparse anchor grid covering chokepoints and junctions; estimate ~8–12 anchors for a mid-size station
- Arena bowl: anchor ring around perimeter + key access corridors; estimate ~20–40 anchors for MSG-scale
- Warehouse: existing UWB radar infrastructure may already exist; SDF adds phone-swarm constraint layer
- Outdoor plaza: GPS + anchor hybrid; crowd density typically lower

**Key variables:**
- Target accuracy tier (Tier 1: crowd flow; Tier 2: meter-ish relative geometry)
- Expected phone participation rate (10%, 30%, 70%)
- NLoS environment severity (open plaza vs. dense urban canyon)

## Success Criteria

Define minimum anchor topology that achieves:
- Flow field accuracy: crowd direction correct >90% of time
- Occupancy accuracy: zone-level density within 20% of ground truth
- Localization error: median device position error < 1.5m at Tier 2

## Open Questions

- What is the minimum anchor count per venue type?
- How does anchor density interact with phone participation rate?
- Are Aliro-equipped smart locks viable as a distributed anchor layer?

## Labels
`sdf`, `anchors`, `deployment`, `localization`, `topology`

## Depends On
SDF-005 (factor-graph estimator)
