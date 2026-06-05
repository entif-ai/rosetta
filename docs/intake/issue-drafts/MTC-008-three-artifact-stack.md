# MTC-008: Three-Artifact Stack Over Unified Model — Architectural Decision

## Issue Metadata

- **Type**: architecture
- **Status**: draft
- **Labels**: architecture, text-core, tokenizer, embedder
- **Depends on**: MTC-001 (tokenizer identity constraint), MTC-007 (Ithkuil curriculum boundary)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document argues against a single unified model and instead proposes a three-artifact stack: (1) tokenizer/codec, (2) embedder, and (3) generator/decoder. Each artifact is independently evaluable. This is a fundamental architectural decision that affects how the training pipeline is structured and how components can be swapped or upgraded independently.

The document is explicit: "The smallest stack I would actually call useful is NOT one glorious everything-model" — it is a triad where each component earns its place through ablation.

Below 700M parameters, the model is described as a "semantic scalpel, not a general assistant." This scope framing is important for the Text-Core MVP gate.

## Proposed Action

1. **Adopt three-artifact stack as the Text-Core architecture**: tokenizer + embedder + decoder, NOT a single unified model
2. **Define each artifact's interface contract** so they can be evaluated and upgraded independently
3. **Set 700M as the minimum decoder size** for a generally useful experiment; below that is a "semantic scalpel"
4. **Plan each artifact as a separate ablation unit** — the tokenizer and embedder are as important as the decoder
5. **Map to existing Rosetta package structure** — which NX package owns each artifact?

## Relevant Findings

- "The smallest stack I would actually call useful is: RosettaCodec tokenizer + RosettaEmbed-S 100-150M + RosettaGen-S 700M decoder"
- "Below that [700M], the experiment can still prove the thesis, but the model becomes more of a semantic scalpel than a general assistant"
- Each artifact independently evaluable — not one monolithic model
- "Not one glorious everything-model" — triad architecture with controlled ablations

## Open Questions

- How does the three-artifact stack map to existing Rosetta package structure (NX workspace)?
- Is there an existing tokenizer implementation to build on, or is this starting from scratch?
- What is the interface contract between the embedder and decoder? (Shared vocabulary? Separate?)
