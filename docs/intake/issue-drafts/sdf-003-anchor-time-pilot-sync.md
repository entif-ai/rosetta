# SDF-003: Anchor Time-Pilot System for Clock Synchronization

## Status
draft

## Type
implementation

## Summary
Implement anchor-side time-pilot broadcast system enabling per-device clock offset and drift estimation as latent variables in the factor graph estimator.

## Problem

Consumer device clocks are precise for comms/GPS but not instrument-grade for distributed radar. Per-device clock offset/drift must be modeled and corrected, not assumed synchronized.

## Proposed Solution

### Anchor-side
- Broadcast known pilot sequence on schedule (acoustic chirp / ultrasonic + RF beacon)
- Anchors are time authority; tightly synchronized with each other (wired/GNSS-disciplined)

### Device-side
- Listen for pilot; estimate: offset to anchor time, drift rate, pipeline latency
- Continuous estimation (not one-time calibration)
- Treat as latent variables in factor graph alongside pose

### Audio-specific
- 48kHz audio sample = ~20.8μs ≈ 7mm timing resolution (if perfect)
- Need sub-sample interpolation (GCC-PHAT on known signals)
- AGC/noise suppression complicates waveform matching; drift model required not constant offset
- Natural audio insufficient; anchor pilots required

### Sync accuracy target
- 1ms ≈ 0.343m (coarse)
- 0.1ms ≈ 3.43cm (good)
- 10μs ≈ 3.43mm (target)

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "clock synchronization"
- SDF-002 factor graph estimator (this design is part of SDF-002)

## Depends On

SDF-002 (factor graph estimator)

## Labels

timing, clock-sync, anchor, localization, audio-tdoa

## Priority

high