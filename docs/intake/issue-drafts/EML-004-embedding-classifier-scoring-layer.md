# EML-004: Non-Agentic Embedding+Classifier Scoring Layer

**Type:** architecture
**Labels:** security, embeddings, SVM, random-forest, non-agentic
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Finding EML-F007

## Problem

Rosetta needs a scoring layer that can assess email content risk without becoming an injection surface itself. An embedding model feeding floats into classical classifiers (ID3/Random Forest/SVM) achieves this because it has no instruction-following capability and downstream agents cannot be "persuaded" by its structured numeric output.

## Evidence

"A non-agentic embedding-plus-classifier stack is a good way to add another scoring layer precisely because it is not doing instruction following, not choosing tools, and not semantically 'obeying' the input in the way an LLM might."

Model families to combine:
- Linear SVM for margin-based separation in semantic space
- Random forest for nonlinear partitioning
- Logistic regression as interpretable baseline
- Gradient-boosted trees for strong tabular learning over combined features

Use multiple classifier families for model diversity. If Bayes says benign and semantic model says risky, that is exactly when you want extract-only or review.

## Proposed Resolution

Design and implement a non-agentic scoring layer:

1. **Embedding model**: Text → dense vector. Options: sentence-transformers (e.g., all-MiniLM-L6-v2), or Rosetta's own embedding pipeline.

2. **Classifier stack**:
   - Tier 1: Bayesian lexical + logistic regression on TF-IDF n-grams (cheap, interpretable)
   - Tier 2: Embedding + SVM for semantic separation; Embedding + gradient-boosted trees over combined embedding+metadata
   - Tier 3: Isolation forest or one-class SVM on sender-thread features for anomaly detection

3. **Output**: Typed features only, no prose. Example: `{instruction_probability: 0.86, sensitive_action_probability: 0.79, routing_recommendation: extract_only, mandatory_controls: [no_tool_use, no_memory_write]}`.

4. **Calibration**: Platt scaling or isotonic regression on held-out data. Evaluate by scenario slices, not aggregate AUROC.

5. **Routing integration**: Score bands feed into routing table (EML-006).

## Dependencies

- EML-006 (ensemble scoring architecture) — uses output from this layer
- EML-003 (external policy engine) — routing recommendations feed into OPA inputs

## Status

candidate