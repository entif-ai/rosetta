# BIP-008-1 — Word-List Detection Easily Evaded by Modern LLMs

**Use Case:** BIP-008 (AI Content Humanization)
**Confidence:** MEDIUM
**Type:** reliability

## Description

AI detection uses a word-list approach scanning for specific overuse indicators ("delve", "landscape", "leverage", "it's important to note", etc.). Modern LLMs, especially those trained with RLHF to avoid these exact tells, will not trigger these flags while still producing clearly machine-generated content through sentence rhythm, topic generality, and structural homogeneity.

## Specific Problem

1. **Trivially evaded:** A model that has learned to avoid "delve" and "landscape" produces AI text that this detector would rate as human.
2. **False negatives:** The best AI-generated content today (GPT-4 class and beyond) no longer exhibits these exact tells. A detector based on these words would miss the majority of sophisticated AI outputs.
3. **No confidence scoring:** The detection step does not produce a score, only a flag ("AI tells detected" or not). There is no threshold or confidence level.
4. **No adversarial robustness:** An adversarial user who wants to game the detector can trivially remove the flagged words and keep everything else AI-generated.

## Expected Behavior

Consider:
1. **Statistical detection:** Use a lightweight perplexity or entropy-based detector (like DetectGPT or a fine-tuned small classifier) rather than keyword matching.
2. **Multi-signal detection:** Combine word-list with structural analysis (sentence length variance, paragraph length variance, punctuation patterns) and use a weighted composite score.
3. **Confidence threshold:** Produce a detection confidence score, not a binary flag. Let the humanization rewrite only trigger when confidence exceeds a threshold.

At minimum, the word-list approach should be documented as a heuristic requiring supplementation.

## Source Reference

BIP-008, "Step 1 — Detection. Scan for common AI tells: overuse of: 'delve', 'landscape', 'leverage'..."
