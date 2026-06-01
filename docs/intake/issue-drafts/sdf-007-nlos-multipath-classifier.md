# SDF-007: NLoS/Multipath Classifier Using CIR Features

## Status
draft

## Type
implementation

## Summary
Design and implement an NLoS/multipath classifier using Channel Impulse Response (CIR) features from UWB radar sensors and WiFi CSI, enabling the factor graph estimator to downweight corrupted range edges.

## Problem

Venues are RF multipath hell. Direct path vs NLoS detection is critical for estimator quality. Correlated multipath bias doesn't average away with sqrt(N) — it becomes "confidently wrong." Classifier enables estimator to identify and downweight bad edges.

## Proposed Solution

### CIR Features (when available)
- First path amplitude vs total CIR energy ratio (direct path dominance)
- RMS delay spread
- Number of significant paths
- Phase consistency over time
- First path delay vs expected geometry

### Classifier Design
- Binary classifier: direct-path vs NLoS/multipath
- Features: CIR-derived + geometric context (anchor geometry, device pose hypothesis)
- Training: labeled dataset from controlled environments with known NLoS conditions
- Generalization: venue-specific calibration required (CMU-style same-layout assumption)

### Integration with Estimator
- Per-edge confidence weight from classifier output
- Robust loss functions (Huber/Cauchy) absorb residual NLoS
- Explicit bias terms per anchor-region when detectable

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "NLoS/multipath classifiers using CIR features"
- Factor graph estimator (SDF-002) uses these weights

## Depends On

SDF-002 (factor graph estimator — classifier output feeds into robust loss weighting)

## Labels

nlos, multipath, cir, classifier, spatial-fabric, rf-channel

## Priority

medium