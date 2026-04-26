# Issue Draft: REE-011 — KV Cache Growth and Long-Context Inference Economics

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

KV cache dynamics during autoregressive generation: every generated token adds a new K/V pair to cached history. Longer context = more memory = higher attention cost per step. This is why long-context inference is expensive.

## Key Mechanics

**Without cache:** At step N, recompute K and V for all N tokens  
**With cache:** Reuse stored K/V, only compute fresh K/V for new token  
**Result:** Generation is "vastly faster"

**Growth:** Every generated token adds K/V pair → longer context = more memory = higher attention cost. This is why long-context inference is expensive.

## Hardware Implication (ROMA)

- Base model weights (don't change) → ROM
- KV cache (grows) → SRAM
- LoRA adapters (task-specific) → SRAM

## For Entif/Rosetta Design

- Long-context applications need explicit KV cache management strategy
- Tiles and tapestries as cached semantic structures map onto this problem
- Structured semantic cache vs raw token KV cache: potentially much more efficient

## Confidence

HIGH — Fundamental inference mechanics clearly explained.

## Tags

- kv-cache
- inference
- long-context
- memory
- performance