# Issue Draft: REE-010 — Q/K/V Projection Specificity Across Layers and Heads

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Q/K/V are NOT one thing. They are a different family of projections at every layer, and multiple parallel families (heads) within each layer. This has major implications for "rational initialization" of attention.

## Key Points

**Layer-specific Q/K/V:**
- Each layer L has its own W_Q^(L), W_K^(L), W_V^(L)
- Layer 1 ≠ Layer 2 ≠ Layer N

**Head-specific subspaces within layers:**
- One layer might have 32 heads, each with own subspace
- One head tracks syntax, another entity coreference, another topic, another formatting
- Training discovers useful division of labor

**What this means for "rational initialization":**
- Cannot simply "initialize Q/K/V with semantics" as if attention were one knob
- It is a **field of knobs** — which heads, which layers, which types of prior
- Some heads should start more structured (morphology, local relation)
- Some heads should start more free

## For Rosetta/Entif

If you want semantically informed Q/K/V initialization, need to specify which heads and layers get which kinds of soft bias. The architecture is an orchestra, not a kazoo.

## Confidence

HIGH — Mechanically precise explanation.

## Tags

- attention
- qkv
- layers
- heads
- initialization
- architecture