# HybridArch-002: AttnRes Retrofit Procedure (Zero-Init + Direct Training)

## Metadata

- **Type**: implementation
- **Status**: draft
- **Labels**: hybrid-architecture, attnres, training
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high

## Problem Statement

Earlier thinking may have assumed LoRA for AttnRes retrofit. This is incorrect. The AttnRes pseudo-query vectors are standalone parameter vectors too small for LoRA utility; PEFT modules_to_save does not cover standalone parameter vectors. AttnRes retrofit requires direct training of the new parameters.

## AttnRes Mechanism (from paper)

Each layer `l` gets a single learned pseudo-query vector `w_l ∈ R^d`:
- Initialized to **zero** so the model starts as an equal-weight average (avoids training volatility)
- Computes softmax attention over prior layer/block outputs with learned weights
- RMSNorm applied to keys and values across depth
- Block AttnRes groups layers into blocks; summed within block, attended at block level

## Retrofit Procedure

1. **Select base model**: supported dense model family on MLX-LM (Llama/Qwen/Mistral/Gemma 1B-3B class) for clean tooling
2. **Add AttnRes parameters**:
   - Add zero-initialized pseudo-query vectors `w_l ∈ R^d` per layer
   - Add RMSNorm layers on K/V across depth
   - Add block-level summary storage and attention mechanism
3. **Freeze base model**: do NOT unfreeze base model weights during AttnRes training
4. **Train AttnRes parameters directly**: NOT via LoRA — train pseudo-query vectors and RMSNorms directly with standard optimizer
5. **Validate**: training loss at matched params; depth gradient distribution; residual output magnitude growth across blocks bounded
6. **Merge**: fuse trained AttnRes parameters into base weights
7. **Quantize**: quantized inference test on M3 Ultra Mac Studio
8. **Local eval**: full evaluation harness on Mac Studio

## Why Not LoRA

- PEFT modules_to_save supports Linear, Embedding, Conv2d, Conv1d — NOT standalone parameter vectors
- Pseudo-query vectors are tiny (one vector per layer per head); LoRA overhead exceeds parameter count
- Direct training is simpler and cleaner

## Expected Outcome

AttnRes retrofit works correctly with zero-init stability; validated on Mac Studio after merging and quantizing.

## Test Scenarios

1. Zero-init validation: model starts as equal-weight average (verified by inspecting attention weights early in training)
2. Training stability: loss converges without volatility from frozen base
3. Depth gradient distribution: more uniform across layers vs baseline
4. Residual magnitude growth: bounded within blocks, not exploding
5. Post-merge quality: merged model performs identically to pre-merge in eval
6. Post-quantize quality: 4-bit quantized model retains AttnRes gains within expected tolerance

## Reference

"For those pseudo-query vectors, I would not bother wrapping them in LoRA. They are already tiny. Train them directly, along with the new RMSNorms." — source doc
"AttnRes paper explicitly says each layer gets a single learned pseudo-query vector... that these vectors are a negligible fraction of total parameters, and that they must be initialized to zero so the model starts as an equal-weight average and avoids training volatility."