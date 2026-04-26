# Issue Draft: REE-008 — Semantic Exoskeleton vs Host Model Internals

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Custom embedding models work as semantic exoskeletons around host models, NOT by fixing the host model's internal reasoning. The host can remain internally ambiguous while system-level inputs/outputs become structured.

## The Architecture Split

**Host LLM:** "messy genius in the attic" — internally ambiguous prose-soaked reasoning  
**Embedding model:** "librarian, catalog, interpreter, and customs checkpoint" — semantic control layer

## What This Means

1. Host model can remain internally ambiguous for a while
2. What matters is that inputs, retrieval, intermediate representations, and outputs become less ambiguous
3. Once scaffolding works, THEN train host deeper into it
4. Custom embedding is NOT the new brain — it is the **first artificial skeleton** the future brain grows around

## Migration Path (Staged)

1. Natural-language host model
2. Host wrapped by Rosetta codec and concept embedding layer
3. Host lightly adapted to consume/emit Rosetta bundles
4. Continued training on mixed corpora
5. Eventually: more deeply Rosetta-native models

## Project A vs Project B

- **Project A:** "Fix the model's soul directly" (impossible without full retraining)
- **Project B:** "Build a semantic exoskeleton around the model, then gradually train the model to inhabit it" ✓

## Confidence

HIGH — Core architectural concept clearly articulated.

## Tags

- architecture
- semantic-layer
- exoskeleton
- host-model
- abstraction