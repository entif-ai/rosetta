# REE-002: Tokenization Quality as Blocker for Semantic Initialization

## Issue Metadata

- **Type:** risk / infrastructure
- **Status:** draft
- **Created:** 2026-06-04
- **Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Normal tokenization produces units that are poorly aligned with semantic meaning. This is a substrate-level blocker for any structured semantic initialization work. Until tokenization quality is improved or worked around, mapping structured priors to token IDs produces awkward, lossy representations.

## Evidence

From the source document: "Token 48172 might mean 'bank', or 'ank', or '##ation', or '(' followed by a space and three letters. So the first obstacle is not that your idea is wrong. It is that the substrate being initialized is already kind of stupid."

## Problem Statement

Rosetta's architecture bets heavily on semantic primitives and structured representations. But if the tokenization substrate chops text into semantically incoherent units, then:

1. **Embedding initialization** — even a semantically perfect embedding prototype can't cleanly map to a token ID that is a partial morpheme or formatting artifact
2. **Structured priors in Q/K/V** — the projection matrices operate on token vectors, not concept vectors; if token vectors are semantically incoherent, structured prior information gets diluted
3. **Inter-model alignment** — different tokenizers produce different token ID spaces; a Rosetta concept prototype trained against one tokenizer's vocabulary won't map cleanly to another

## Three Mitigation Paths

### Path A: Improve Tokenizer

Build a tokenizer whose vocabulary units are more semantically coherent:
- Word-level or subword tokens that align with morpheme boundaries
- Consistent handling of punctuation and formatting
- Cross-lingual coherence (same concept gets same or comparable token across languages)
- Cost: significant retraining of tokenizer; potential vocabulary size inflation

### Path B: Add Semantic Layer Above Tokenizer

Accept crude tokens but add a second layer above them:
- Map crude token IDs to concept IDs via learned projection
- Operate at concept level for structured priors, reasoning, retrieval
- Map back to token space for generation
- Cost: additional model component; introduces multi-stage translation overhead

### Path C: Joint Tokenizer-Concept Awareness

Train the model to be jointly aware of both:
- Token-level operations (for efficient compute)
- Concept-level operations (for semantic structure)
- Routing mechanism: when structured reasoning is needed, route to concept layer; when efficient generation is needed, route to token layer
- Cost: more complex architecture; routing logic must be learned or engineered

## Decision Criteria

Path A (improve tokenizer) is cleanest but highest cost.  
Path B (semantic layer) is most practical near-term — aligns with "build semantic layer first" principle already in Rosetta's architecture.  
Path C (joint awareness) is most ambitious — could become the "Rosetta-native" approach.

## Dependencies

- None — this is a prerequisite blocker, not blocked by anything
- Blocks: REE-001 (structured init experiment), REE-005 (multi-dimensional semantic representation for concept space)

## Labels

- tokenization
- semantic-anchoring
- vocabulary-design
- infrastructure
- prerequisite