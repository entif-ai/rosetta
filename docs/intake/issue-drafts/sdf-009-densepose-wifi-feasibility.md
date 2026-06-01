# SDF-009: CMU DensePose-from-WiFi as SDF Sensing Modality — Feasibility and Constraints

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — CMU DensePose From WiFi (arXiv:2301.00250); "DensePose-style UV map over 24 body regions for multiple people" from WiFi CSI; requires 3×3 MIMO, 100Hz, 30 subcarriers; degrades on unseen layouts and with 3+ subjects

## Summary
Assess whether CMU's learned WiFi pose inference approach (CSI → dense body pose) is feasible as an SDF sensing modality, given its hardware requirements (fixed 3×3 MIMO, CSI access), generalization limitations (unseen layouts, multi-person), and training data dependencies (camera pseudo-ground-truth).

## Motivation

CMU DensePose-from-WiFi is the strongest known result for "fine-grain human pose inference from commodity WiFi." If it can be adapted for SDF Guardian Mode, it would enable privacy-preserving body pose detection via venue WiFi infrastructure. However, the requirements are substantial.

## Key Findings from Literature

- **Hardware**: 3 transmit × 3 receive antennas (9 MIMO links), 100Hz sampling, 30 subcarriers, 2.4GHz 40MHz span
- **Training**: Pseudo-ground-truth from camera DensePose; same-layout performance >> cross-layout performance
- **Multi-person**: Degrades substantially with 3+ concurrent subjects
- **Generalization**: "When they test on a new unseen layout, performance drops substantially"
- **Classical WiFi ToF limit**: ~0.5m localization due to random phase behavior in standard 802.11n/ac; learned approach circumvents this via supervised mapping

## SDF Relevance

- Not achievable from phones alone (no CSI exposure at OS level)
- Requires venue-fixed WiFi APs that expose CSI (enterprise-grade; not consumer routers)
- Per-venue calibration/training needed
- Useful for: pose inference in security-relevant zones (concourse chokepoints, platform edges)

## Research Tasks

- Replicate CMU experimental setup in a controlled venue
- Assess cross-layout generalization with domain adaptation techniques
- Determine whether venue APs (e.g., Cisco, Aruba, Ubiquiti) expose CSI at the needed fidelity
- Evaluate multi-person performance at realistic crowd densities

## Open Questions

- Can venue WiFi APs provide CSI at 100Hz across 30 subcarriers?
- What domain adaptation approach minimizes per-venue training overhead?
- Is pose-level inference (vs. occupancy-level) worth the additional complexity for Guardian Mode?

## Labels
`sdf`, `wifi`, `csi`, `pose-inference`, `cmv`, `research`, `densepose`

## Depends On
SDF-001 (Guardian Mode)
