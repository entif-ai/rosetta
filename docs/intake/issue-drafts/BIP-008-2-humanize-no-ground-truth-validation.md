# BIP-008-2 — No Ground Truth Validation of Humanization Quality

**Use Case:** BIP-008 (AI Content Humanization)
**Confidence:** HIGH
**Type:** spec-gap

## Description

The spec describes the desired output ("sounds like a real person wrote it") but provides no methodology to validate that the rewritten text actually achieves that goal. No automated metric is described to measure AI detection score reduction, perplexity improvement, or human preference rating.

## Specific Problem

1. **No evaluation harness:** The humanization step has no acceptance criteria. A rewrite could make content sound more AI-like and the system would have no way to detect it.
2. **No baseline:** There is no pre-humanization measurement of AI detection score to compare against post-humanization score.
3. **No feedback loop:** The system cannot improve over time. Each run is independent with no learning.
4. **No ground-truth dataset:** There is no labeled set of AI-generated texts and their human-written counterparts to validate the humanization quality.

## Expected Behavior

Define an evaluation methodology:
1. **Before/after AI detection score:** Measure with a third-party AI detector (e.g., GPTZero, Originality.ai) before and after humanization. Target: reduction in detection confidence.
2. **Perplexity check:** Run the output through a perplexity model. Target: score within the range of human-written text for the domain.
3. **Human preference pilot:** For the first 20 outputs, ask a human to rate which version (pre or post humanization) sounds more human. Use this to calibrate the rewrite strength.

## Source Reference

BIP-008, "Step 2 — Rewrite" and "Output: Return the revised text. Optionally highlight what changed and why."
