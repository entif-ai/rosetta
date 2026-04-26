# BIP-003-1 — 40% Similarity Threshold Not Validated

**Use Case:** BIP-003 (Content Idea Pipeline)
**Confidence:** HIGH
**Type:** reliability

## Description

A 40% combined similarity score (weighted hybrid of semantic 0.7 + keyword 0.3) is used as a hard gate to reject new content ideas as duplicates. This threshold is arbitrary and has not been validated against any ground-truth dataset of known duplicates and non-duplicates.

## Specific Risk

- **False positives (good ideas rejected):** A genuinely new angle on an old topic could score above 40% against the original idea due to semantic similarity of core concepts, even though the content would be substantially different.
- **False negatives (duplicate ideas accepted):** Two ideas with surface-level lexical differences but identical substance could score below 40% if the keyword weighting is low and the semantic embedding space is noisy for the specific domain.
- **No sensitivity analysis:** What happens at 39% vs. 41%? The boundary is sharp but unjustified. No A/B testing or offline evaluation is described.
- **Domain dependency:** 40% may be appropriate for some content domains (technical tutorials) but too strict for others (news commentary on the same event), but no domain adaptation is described.

## Expected Behavior

The threshold should be calibrated:
1. Build a labeled dataset of known duplicates (exact duplicates, rewrite of same story, same angle) and non-duplicates (same topic, different angle)
2. Sweep threshold values and plot precision/recall curves
3. Select threshold to optimize for the desired precision/recall tradeoff
4. Document the calibration dataset and methodology

At minimum, the spec should note this threshold as a starting point requiring calibration.

## Source Reference

BIP-003, "Semantic dedupe" section: "Hard gate: If any existing idea scores above 40% combined similarity, REJECT the new idea."
