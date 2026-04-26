# Issue Draft: REE-002 — Build Semantic Layer First, Custom Tokenizer Second

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Three distinct things are conflated: (1) custom tokenizer, (2) custom embedding model, (3) custom concept protocol/semantic IR. Value rankings differ dramatically. The semantic IR is the crown jewel; tokenizer is lowest near-term ROI.

## Key Findings

**Value ranking:**
1. **Custom concept protocol / semantic IR** (extremely valuable) — language-neutral graph of disambiguated concepts, structured bundles, adapter interfaces. Supports auditability, interoperability, multimodal extension.
2. **Custom embedding model** (valuable, conditional) — only if trained to embed concepts, frames, relations, bundles, multimodal prototypes. NOT Yet Another Sentence Vector.
3. **Custom tokenizer** (lower ROI at first) — burns months building new alphabet for brain that still thinks in prose.

**Why embedding works despite host using ambiguous tokens:**
Acts as semantic control layer / exoskeleton around host model. Host = "messy genius in attic"; embedding = "librarian, catalog, interpreter, customs checkpoint."

**Proposed Phase Roadmap:**
- Phase 1: Build registry — stable IDs for concepts, frames, roles, relations, modality hooks
- Phase 2: Build prototype embeddings — text prototypes from glosses/aliases/examples
- Phase 3: Build graph-aware selector — lexical candidates + graph priors + MCDA scoring
- Phase 4: Build projection heads — map host hidden states into Rosetta space and back
- Phase 5: Only then test custom tokenization — after measuring KPI lift from semantic layer

## Core Principle

> "Do not build a new mouth before you build the skeleton. Build the skeleton first."

## Confidence

HIGH — Clear technical breakdown with alignment to Rosetta architecture.

## Tags

- semantic-layer
- embeddings
- tokenization
- architecture
- roadmap
- phase-priority