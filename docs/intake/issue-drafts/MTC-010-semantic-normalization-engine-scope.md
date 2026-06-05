# MTC-010: Semantic Normalization Engine — Scope Definition vs. General Assistant

## Issue Metadata

- **Type**: scope/definition
- **Status**: draft
- **Labels**: scope, text-core, capability
- **Depends on**: MTC-008 (three-artifact stack)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document explicitly frames what the model is NOT and what it IS. This scope definition is critical for the Text-Core MVP gate and for managing expectations about what this training program can deliver.

**What it is NOT**: A general assistant, a tiny ChatGPT, a model that beats frontier models on MMLU, or a model for open-world chat, deep code synthesis, or open-ended reasoning.

**What it IS**: A compact semantic normalization and reasoning engine — unusually good at saying what something means, keeping ambiguity explicit, and reusing that structure later.

Testable capabilities (from the document):
- English↔Rosetta↔Ithkuil round-trips within grammar scope
- Semantic canonicalization and ambiguity handling
- Provenance-aware retrieval and tool reasoning
- Long-context structured prompts handled more economically than pure attention baseline

## Proposed Action

1. **Frame the scope explicitly** as "semantic normalization and reasoning engine" — not "general AI assistant"
2. **Define specific testable capabilities** for the Text-Core MVP gate:
   - Round-trip match on Ithkuil curriculum
   - Nearest-neighbor clustering of paraphrases
   - Long-context retrieval with provenance preservation
3. **Set expectations for what this is NOT** — no general chat, no code synthesis, no open-ended QA
4. **Align with Text-Core MVP gate requirements**: source→observation→interpretation→tapestry pipeline needs a model that can canonicalize and normalize, not a general model

## Relevant Findings

- "The first useful version is not 'a tiny ChatGPT.' It is 'a compact semantic normalization and reasoning engine that is unusually good at saying what something means, keeping the ambiguity explicit, and reusing that structure later'"
- "A 700M to 1.3B Rosetta-aware stack will NOT beat frontier chat models at broad general chat, broad coding, or open-ended knowledge QA"
- "Testable capabilities: English/Rosetta/Ithkuil round-trips within grammar scope; semantic canonicalization and ambiguity handling; provenance-aware retrieval"

## Open Questions

- How does this scope align with the Text-Core MVP's "deterministic refinery" requirement?
- Is there a Rosetta-specific benchmark set for semantic normalization quality, or does one need to be built?
- Should the scope include formal reasoning (AR-LSAT) or is that a later phase?
