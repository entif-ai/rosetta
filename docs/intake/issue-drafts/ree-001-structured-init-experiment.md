# REE-001: Test Structured Q/K/V Initialization Against Random Baseline

## Issue Metadata

- **Type:** experiment / ml-fundamentals
- **Status:** draft
- **Created:** 2026-06-04
- **Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Test the hypothesis: a transformer initialized with token embeddings and Q/K/V projection geometries that encode ANY structured reasoning rationale will converge faster and to better generalization than one initialized from pure random/glorot initialization — even when both are trained with the same data and same compute budget.

## Background

Emilie's "monkey training" critique: current LLM training is "barbarically expensive alchemy." The indictment is not that the goal is wrong but that the method wastes enormous resources when structured priors could bootstrap faster. The specific hypothesis is: even partial structured knowledge in initialization is better than melted garbage. "Give the toddler LEGOs shaped like they might fit together, not charred toxic gum lumps."

## Proposed Experiment

### Setup

1. Pick a small-to-medium transformer (e.g., 1B–7B parameter range, feasible to train in research context)
2. Split into two conditions:
   - **Control:** Standard glorot/random initialization for embeddings and all projection matrices
   - **Treatment:** Structured initialization for embeddings (using semantic prototypes from WordNet/BabelNet/ VerbAtlas or similar) and Q/K/V projection matrices initialized to encode any available reasoning-relevant structure (e.g., syntactic category priors, topical clustering, etc.)
3. Train both with identical data, identical compute budget, identical hyperparameters

### Measurable Outcomes

- Convergence speed (loss curve comparison at matched step counts)
- Final downstream task performance on held-out reasoning benchmarks
- Token efficiency (tokens to reach equivalent benchmark threshold)
- Representation geometry analysis (do treatment models develop cleaner latent organization?)

### Constraints

- Must be testable on a single GPU or small cluster; no megascale compute needed to validate the hypothesis
- If positive: strong signal that structured initialization is worth pursuing at larger scale
- If negative: at minimum clarifies the minimum viable structured prior quality needed

## Relevance to Rosetta/Entif

- Directly tests the architectural bet that semantic primitives should be first-class, not emergent-only
- If positive, validates the "build skeleton first" principle for Rosetta's own model adaptation work
- Connects to DoRA/QLoRA adapter work: structured base + adaptive overlay is the full stack
- KV cache and inference efficiency work depends on understanding whether models trained with structured init have different inference-time characteristics

## Dependencies

- REE-002 (tokenization quality blocker must be addressed first or worked around)
- REE-005 (multi-dimensional semantic representation for constructing the structured priors)

## Open Questions

1. What is the minimum structured prior quality needed to see any improvement over random init?
2. How do you avoid structured priors encoding wrong inductive biases?
3. Is there a staged experiment path: (a) structured embeddings only vs (b) structured Q/K/V + embeddings vs (c) full structured init?

## Labels

- ml-fundamentals
- training-paradigm
- structured-priors
- experiment