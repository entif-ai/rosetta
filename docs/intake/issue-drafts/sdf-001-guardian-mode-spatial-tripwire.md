# SDF-001: Guardian Mode for Spatial Tripwire — SDF-GM v0.1

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — full SDF-GM v0.1 spec produced in conversation

## Summary
Guardian Mode is an SDF operational mode for real-time threat detection in controlled venues using multimodal telemetry (UWB ranging, WiFi CSI/RTT, BLE proximity, IMU, audio, cameras), with zero retention by default and quorum-gated minimal disclosure only when threats are confirmed.

## Motivation

Current Tripwire Protocol is designed for semantic/text incidents. Physical-space threat detection (stampede signatures, counterflow surges, acoustic shock events, suspicious RF occlusion) requires the same governance primitives applied to spatial telemetry — ephemeral feature extraction, sealed incident envelopes, quorum validation.

## Key Design Points

### Design Axioms
1. **Local-first inference**: compute risk as close to sensors as possible
2. **Default evaporation**: raw streams RAM-only, overwritten continuously unless Tripwire fires
3. **Minimal disclosure**: only smallest sufficient state sealed; quorum-gated unsealing
4. **No session linking**: events unlinkable unless explicitly escalated

### Non-goals
- Identity, attribution, or persistent tracking of individuals
- Storage of raw audio/video/radio streams outside a short ring buffer
- "Perfect reconstruction" of all geometry; target actionable _threat state_

### Components
- **SensoryForge**: ephemeral feature extraction → anonymous vector streams → VSV
- **Guard Layer**: per-node anomaly classifier; outputs `threat_class`, `confidence`, `severity`
- **Swarm Quorum**: blinded anomaly claims exchanged; validators vote with privacy-preserving commitments
- **SSIE**: one-time encrypted payload on Tripwire fire (see SDF-003)
- **Rosetta Sealing + Receipts**: sealed incident tile with policy constraints and audit receipts

## Implementation Notes

- Depends on Tripwire Protocol already being implemented
- Depends on Rosetta sealed incident tiles existing
- Anchor deployment capability assumed (not a blocker; anchor spine is a deployment input)

## Open Questions
- How does Guardian Mode policy engine interact with existing Tripwire policy engine?
- What is the false-positive/false-negative rate for Tier 1 threat classes?
- What minimum anchor density is required per venue type?

## Labels
`sdf`, `guardian-mode`, `spatial-threat-detection`, `tripwire`

## Depends On
None (standalone; Tripwire already assumed implemented)
