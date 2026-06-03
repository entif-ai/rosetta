# SDF-004: SensoryForge — Ephemeral Sensor Ingestion Module

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — Gemini's "SensoryForge" concept adopted and formalized in SDF-GM v0.1

## Summary
SensoryForge is the SDF module responsible for ingesting multimodal sensor telemetry (UWB, WiFi CSI/RTT, BLE, IMU, audio, cameras) and converting it to anonymous, lossy feature tensors in RAM-only ring buffers, with no persistent writes unless Tripwire fires.

## Motivation

The Guardian Mode design axiom is "default evaporation": raw streams must never be written to disk unless a threat is confirmed via quorum. SensoryForge enforces this at the ingestion boundary. It also provides the transform from heterogeneous sensor modalities into the VSV feature space.

## Input Modalities

- UWB ranging (distance, angle when available)
- WiFi CSI/RTT (phase+amplitude across subcarriers where OS exposes; RSSI as fallback)
- BLE proximity (coarse)
- IMU (inertial odometry deltas)
- GPS coarse (outdoor, optional)
- Anchor time-pilots (acoustic or RF reference signals for clock sync)
- Venue cameras/mics (fixed infrastructure, not phones)

## Key Design Constraints

- **RAM-only ring buffer**: configurable TTL (e.g., 5–30s); overwritten continuously
- **No disk writes by default**: unless Tripwire fires
- **Anonymous feature extraction**: output is feature tensors, not raw streams
- **Local-first**: feature extraction runs on-node where possible; only compressed summaries transmitted
- **No identity binding**: feature tensors must not enable re-identification of individuals

## Open Questions

- What is the minimum viable ring buffer TTL for local feature continuity?
- Which sensor modalities require edge preprocessing vs centralized fusion?
- How is SensoryForge isolated from other SDF modules for security/composability?

## Labels
`sdf`, `sensory-forge`, `ephemeral`, `privacy-by-default`, `sensor-ingestion`

## Depends On
SDF-001 (Guardian Mode), SDF-002 (VSV schema)
