# SDF-006: Per-Device Clock Offset/Drift as Latent Variable in SDF Estimator

## Status
Candidate

## Evidence
`docs/ideas/Chat GPT - UWB Devices Overview.md` — "Each device has: offset(t), drift(t), and pipeline_latency(l_i). Your estimator solves for these alongside device pose and scene state."

## Summary
Model per-device clock offset, drift rate, and audio pipeline latency as continuous hidden variables estimated jointly with pose in the factor-graph estimator, using anchor-broadcast time pilots as reference signals.

## Motivation

Consumer phones cannot be assumed to have synchronized clocks. GPS receiver timekeeping is sufficient for navigation but not for instrument-grade TDOA. Treating clock parameters as latent variables — estimated continuously alongside spatial pose — is the robust engineering approach.

## Latent Variable Model

Per device `i` at time `t`:
- `b_i(t)` — clock bias offset
- `d_i(t)` — clock drift rate
- `l_i` — audio capture pipeline latency (device-specific constant, slowly varying)

Combined: effective clock correction applied to all timestamped measurements from device `i`.

## Time Reference Strategy

**Anchor time pilots** (preferred):
- Anchors emit a known RF or acoustic chirp on a calibrated schedule
- Devices detect the pilot, estimate their offset to anchor time via correlation
- This becomes a constraint in the factor graph

**Audio-based reference** (secondary):
- For acoustic TDOA: use known anchor-emitted reference tones
- Cross-correlation against known signal, not natural audio (natural audio has AGC, reverberation, multi-source problems)

## AI's Role

AI is valuable for:
- Learning per-device latency priors (some phones have consistent ~20ms pipeline delay)
- Detecting when a device's clock model has drifted significantly
- Classifying which measurements are affected by clock instability

## Open Questions

- What is the achievable time synchronization accuracy using anchor pilots?
- Can AI learn device-class-specific latency priors from training data?
- How often must anchor pilots be emitted for stable estimation?

## Labels
`sdf`, `clock-sync`, `timing`, `estimation`, `latent-variable`

## Depends On
SDF-005 (factor-graph estimator)
