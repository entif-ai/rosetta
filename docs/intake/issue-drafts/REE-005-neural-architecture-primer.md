# Issue Draft: REE-005 — Neural Network Architecture Primer Completeness

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Comprehensive tutorial on transformer architecture delivered to Crates. Educational/reference material.

## Topics Covered

### Tokenization and Embedding
- Tokenizer → integer IDs → embedding matrix lookup
- Position must be added (positional encoding or rotary)
- Initial embeddings: learned, context-independent, "crude"

### Q/K/V Mechanics
- Derived on-the-fly at each layer via learned projection matrices
- Q = "what am I looking for?", K = "what kind of thing am I?", V = "if relevant, what do I contribute?"
- Different layers have DIFFERENT W_Q/W_K/W_V matrices; different heads have different subspaces

### Transformer Block
- Layer norm → self-attention → residual → layer norm → MLP → residual
- Attention = context routing; MLP = token-wise feature transformation

### Training vs Inference
- Training: weights updated via gradient descent
- Inference: weights FIXED, only activations change

### LoRA/QLoRA
- LoRA: freeze backbone, learn low-rank update (W + BA)
- QLoRA: quantize base to 4-bit NF4, only train LoRA adapters

## Key Quote

> "The transformer is not a thing the model uses. The transformer is what the model fundamentally is."

## Confidence

HIGH — Educational reference material, mechanically accurate.

## Tags

- education
- reference
- transformer
- qkv
- architecture
- knowledge-base