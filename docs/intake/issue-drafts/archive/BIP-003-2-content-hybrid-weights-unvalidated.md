# BIP-003-2 — Hybrid Score Weights Not Grounded in Evidence

**Use Case:** BIP-003 (Content Idea Pipeline)
**Confidence:** MEDIUM
**Type:** spec-gap

## Description

The hybrid dedupe score formula `(semantic × 0.7) + (keyword × 0.3)` uses fixed weights of 0.7 for semantic similarity and 0.3 for keyword matching. These weights are provided without justification and without any description of how they were determined or how they should be validated.

## Specific Problems

1. **No optimality claim:** Why 70/30 and not 50/50 or 80/20? Different weight ratios will produce different dedupe behaviors, especially near the 40% gate threshold.
2. **Semantic similarity is embedding-model-dependent:** If the embedding model is changed (e.g., from Gemini to OpenAI), the cosine similarity distributions change, requiring weight re-calibration. The spec does not acknowledge this dependency.
3. **Keyword matching is fragile:** Keyword matching against title (30%), summary (20%), and tags (20%) is sensitive to stopword removal, stemming, and term frequency. Small changes in the idea's wording could shift keyword matching scores substantially without semantic change.
4. **No cross-validation described:** The weights should be validated via cross-validation against a held-out set of known duplicate/non-duplicate pairs.

## Expected Behavior

The spec should either:
1. Provide a methodology for calibrating these weights (e.g., logistic regression on a labeled dataset)
2. Make the weights configurable at runtime (not hardcoded) with documented default values
3. Reference a specific embedding model whose similarity distribution was used to calibrate the 0.7 weight

## Source Reference

BIP-003, "Semantic dedupe" section: "Hybrid score: (semantic × 0.7) + (keyword × 0.3)"
