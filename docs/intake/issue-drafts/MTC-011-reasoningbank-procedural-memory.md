# MTC-011: ReasoningBank Integration — Procedural Memory Without Weight Updates

## Issue Metadata

- **Type**: architecture
- **Status**: draft
- **Labels**: memory, reasoning, memory-planes
- **Depends on**: MTC-002 (Engram memory plane)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document identifies ReasoningBank (Google, arXiv 2509.25140 "ReasoningBank: Scaling Agent Self-Evolving with Reasoning Memory") as "extremely on-theme" for the Rosetta architecture. The key value proposition is that it externalizes procedural knowledge — rather than requiring all improvement to come from weight updates, ReasoningBank enables reuse of reasoning strategies at test-time through a memory framework.

This aligns with Rosetta's memory sovereignty map (5-layer model) and the concept that memory planes should handle different types of knowledge. ReasoningBank is particularly relevant to the "strategic/procedural" memory layer.

> "Reasoning Memory / ReasoningBank... externalizes procedural knowledge rather than pretending all improvement must be weight updates."

## Proposed Action

1. **Pull and evaluate ReasoningBank paper (arXiv 2509.25140)** for architecture fit with Rosetta's memory planes
2. **Map ReasoningBank to the appropriate memory plane** — likely Plane 3 (activation/relevance) or a new procedural/strategic layer
3. **Evaluate interaction with Engram (MTC-002)** — both address external memory but at different levels (Engram = static/O(1) lookup; ReasoningBank = procedural/strategic reasoning reuse)
4. **Consider as complement to Engram** in the memory architecture rather than replacement

## Relevant Findings

- ReasoningBank: Google, arXiv 2509.25140 "ReasoningBank: Scaling Agent Self-Evolving with Reasoning Memory"
- Strategy-level agent memory framework enabling test-time self-evolution via reasoning memory
- Externalizes procedural knowledge rather than requiring weight updates
- "Extremely on-theme" for Rosetta — aligns with memory sovereignty map
- Also relevant: "Reasoning Memory" — same family as ReasoningBank

## Open Questions

- How does ReasoningBank interact with the receipt law — does it emit receipts for reasoning steps?
- Is ReasoningBank compatible with the PostgreSQL canonical storage model, or does it require a separate reasoning memory store?
- What is the relationship between ReasoningBank and the existing "reasoning-bank" concept in the Entif/Rosetta materials?
