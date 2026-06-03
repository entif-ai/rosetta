# SDF-008: CMU DensePose-from-WiFi Domain Generalization Gap

## Status
draft

## Type
risk

## Summary
CMU DensePose-from-WiFi demonstrates that learned CSI→pose mapping is feasible under fixed deployment conditions, but performance drops substantially on unseen layouts. This generalization gap is the primary architectural risk for any WiFi/RF-based pose inference system in SDF.

## Risk Description

### The Claim
CMU 2301.00250v1 shows that deep learning can map WiFi CSI (3×3 MIMO, 100Hz, 30 subcarriers, 2.4GHz) to DensePose-style UV coordinates for 24 body regions across multiple people.

### The Failure Mode
"Performance drops substantially when they test on a new unseen layout." Same-layout assumption is doing the work. Training data from Layout A does not transfer to Layout B without retraining or domain adaptation.

### Why It Matters for SDF
- Venue-scale deployment requires generalization across many different spaces
- Retraining per venue is operationally expensive and slow
- Domain shift in RF environment (different AP positions, different construction materials, different furniture/layout) corrupts learned mapping
- Concurrent subjects (3+) cause failure due to CSI tensor summarization

### Secondary Risk
CMU uses camera-based pseudo-ground-truth (pretrained image DensePose on synchronized RGB video). SDF may not have camera coverage everywhere; without camera supervision, RF→pose mapping quality degrades further.

## Mitigation Approaches

1. **Per-venue calibration**: train/pretrain on site-specific data. Works but doesn't scale.
2. **Domain adaptation**: finetune CMU-style model on new venue with limited labeled data. Reduces data requirements but still requires site visit.
3. **RF fingerprint clustering**: instead of pose inference, use CSI fingerprint clustering for coarse zone classification. More robust to layout change, less precise.
4. **Anchored RF sensing**: use infrastructure UWB radar nodes (not phone radios) as primary sensing; phone CSI as auxiliary context. Eliminates generalization problem but requires hardware investment.

## Related Constraints

- Consumer WiFi CSI access is limited; research-grade routers can capture CSI, consumer phones typically cannot
- WiFi RTT (802.11mc) provides ToF-based ranging but not phase/amplitude richness of full CSI
- Alternative: UWB ranging edges from anchors provide geometry directly; CSI inference is complementary, not primary

## References

- Source: `docs/intake/docs-intelligence/2026-06-01-uwb-sdf-non-profits.md` Finding: "CMU DensePose From WiFi"
- CMU 2301.00250v1: "when they test on a new unseen layout, performance drops substantially"

## Labels

wifi-sensing, densepose, domain-generalization, risk, cmU

## Priority

medium