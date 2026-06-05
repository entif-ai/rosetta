# REE-004: KV Cache Growth Cost Model for Rosetta Inference

## Issue Metadata

- **Type:** engineering / inference-optimization
- **Status:** draft
- **Created:** 2026-06-04
- **Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

KV cache grows linearly with context length during autoregressive generation. No documented cost model exists for Rosetta's expected context lengths and memory budgets. This is needed to make informed decisions about context compilation, retrieval truncation, and tapestry vs raw context trade-offs.

## Background

From the source document: "KV cache stores previously computed K and V vectors for prior tokens. Avoids recomputing attention over full context at each step. New token generates fresh Q, compares against cached K, pulls from cached V. Cache grows linearly with context length — long-context inference expensive."

For a transformer with d_model hidden dimension, n heads, and sequence length L:
- Each K/V vector: d_model dimensions
- Per token per layer: n heads × d_model per head = d_model total (same as hidden)
- Cache per layer: O(L × d_model) per layer × n_layers

For a 7B model with d_model=4096, 32 layers, generating 8192 tokens:
- KV cache per token per layer ≈ 4096 floats × 2 (K+V) × 2 bytes (fp16) = ~16KB
- Total KV cache: ~16KB × 8192 tokens × 32 layers ≈ 4GB

This is per-sequence. Concurrent sequences multiply this.

## Rosetta-Specific Questions

1. **Tapestry vs raw context:** Rosetta's tapestries are bounded compiled packages. Does their bounded nature inherently limit KV cache growth? Or can a tapestry still cause unbounded cache growth if generated as raw context?
2. **Context compiler bounded bundles:** The context compiler produces bounded bundles by role/risk class. What is the maximum context length before KV cache cost becomes prohibitive for the target deployment hardware?
3. **Retrieval truncation:** Rights-scoped retrieval currently specifies minimum English accompaniment. Is there a token budget that must be respected to keep KV cache manageable?
4. **Multi-agent concurrent contexts:** If multiple agents run concurrently, KV cache memory is per-context. What is the maximum concurrent contexts supported on typical hardware?

## Required Deliverables

1.KV cache memory formula parameterized by: d_model, n_layers, sequence_length, precision (fp16/int4/int8)
2. Table of KV cache sizes for common model sizes: 1B, 3B, 7B, 13B, 70B
3. Maximum context lengths before hitting 1GB, 4GB, 16GB KV cache budgets
4. Rosetta-specific guidance: what context lengths are safe for typical deployment configurations?

## Dependencies

- None — independent work

## Labels

- kv-cache
- inference-optimization
- memory-management
- context-compiler
- tapestry