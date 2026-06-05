# REE-004: KV cache management for long-context scenarios not addressed

## Status
draft

## Type
implementation

## Labels
- memory
- inference
- optimization
- long-context

## Evidence
KV cache stores key and value projections from prior tokens during autoregressive decoding so each new token can attend to full context without recomputing from scratch — from docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md

The source document identifies KV cache as a key component of transformer inference but notes it creates memory management challenges at long context windows. The ROMA paper also treats KV cache as a critical on-chip SRAM resource. Rosetta's architecture does not currently document a strategy for KV cache management, particularly for long-context scenarios relevant to tapestry-based reasoning.

## Problem

When a transformer model generates text autoregressively, it must attend to all previously generated tokens. Without a KV cache, each new token would require recomputing the attention over the full context from scratch, which is computationally prohibitive. The KV cache stores key and value projections so each step only needs to attend to cached values plus the new token's projection.

However, KV cache memory grows linearly with context length. For long documents, multi-document synthesis, or tapestry-based reasoning (which compiles receipts into bounded but potentially large packages), this creates real memory pressure. The ROMA paper specifically keeps KV cache in SRAM for this reason.

Rosetta has no documented approach for:
1. Managing KV cache size during long-context inference
2. Evicting or compressing KV cache entries
3. Routing queries to models based on context length vs cache capacity
4. Offloading KV cache to persistent storage for later retrieval

## Proposed Solution

Scope KV cache strategy as a discrete investigation:

1. **Survey state of the art**: Paged attention (vLLM), streamingLLM, LLM-decoding optimizations, KV cache compression techniques
2. **Model behavior**: Document KV cache growth curves for models likely to be used in Rosetta's runtime
3. **Architectural response**: Define limits (e.g., "tapestry with >X tokens triggers eviction or chunking strategy"), offload policy, and any Rosetta-level abstractions over KV cache management
4. **Integration with memory planes**: KV cache is effectively a transient Plane 2 (temporal) artifact — should it be treated as such in the memory sovereignty map?

## Dependencies
- None

## Priority
medium

## Notes
- This is particularly relevant for TC-006 (tapestry v1) which compiles receipt bundles — potentially large contexts
- The ROMA paper's approach (SRAM for KV cache, ROM for base model) is a hardware solution; Rosetta needs a software/architectural strategy
- Consider whether KV cache management falls under the "compute plane" in the NOT LAME architecture