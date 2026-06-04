# HybridArch-001: Block AttnRes + CCA/CCGQA Hybrid Architecture Spec

## Metadata

- **Type**: architecture
- **Status**: draft
- **Labels**: hybrid-architecture, text-core, attnres, cca
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high

## Problem Statement

AttnRes and CCA attack different axes of the efficiency problem: AttnRes fixes depth-axis routing (which earlier states matter); CCA fixes sequence/channel-axis compression and mixing (token attention cost inside each layer). Fusing them into the same attention primitive risks losing what makes each useful. The correct composition is separate mechanisms composing cleanly.

## Proposed Architecture

```
input
  ->
token/block embedding
  ->
[ Block AttnRes: selects useful prior depth summaries ]
  ->
[ CCA/CCGQA: cheap token mixing in compressed latent space ]
  ->
[ MLP / MoE ]
  ->
repeat for N blocks
```

**Depth routing**: Block AttnRes over prior block summaries + embedding source
**Sequence mixing**: CCA/CCGQA inside self-attention sublayers

Key constraints:
- Do NOT compress AttnRes's block attention with CCA — Block AttnRes already operates over a small depth source set; compression there is polishing the door hinge while the furnace is on fire
- CCA wins: sequence attention inside each block is the expensive place; CCA makes that cheaper
- AttnRes wins: cross-depth access and selective retrieval of earlier representations; fixed residual accumulation is the pathology being fixed
- Block AttnRes residual I/O: 5.5d vs 34d for mHC under typical settings; long-context prefilling cache: 15GB → 1.9GB/device (sharding) → 0.3GB/device (chunked)

## AttnRes Retrofit Requirements

- Zero-initialize pseudo-query vectors per layer (`w_l ∈ R^d`)
- RMSNorm on keys/values across depth
- Two-phase inference: blockwise summary → block-level attention
- Direct training (NOT LoRA — pseudo-query vectors are standalone parameters too small for LoRA utility)

## CCA Retrofit Requirements

- Full compressed Q/K/V/O projection path must be trainable (NOT conv-only LoRA)
- Naive latent attention hurts quality; convs (sequence + channel mixing on compressed Q/K) recover expressivity
- Fused kernels for production efficiency (CUDA-first; MLX support TBD)
- CCGQA variant for parameter sharing across heads

## Ablation Plan

Run 2x2 before attempting full fusion:
1. baseline
2. baseline + Block AttnRes
3. baseline + CCA/CCGQA
4. baseline + both

Sweep: CCA compression factor C or C1/C2; Block AttnRes block count N; conv depth 0/1/2

Measure: training loss at matched params/activated params; long-context prefill latency; decode throughput; KV/cache footprint; gradient magnitude distribution across depth; hidden/output magnitude growth across blocks; pipeline comm overhead

## Expected Outcome

Additive or synergistic gains from composing two mechanisms that attack orthogonal bottlenecks. Not a glamorous tax audit — real architectural complement.

## Test Scenarios

1. Block AttnRes alone vs baseline → validates depth routing value
2. CCA alone vs baseline → validates sequence compression value
3. Both combined vs each alone → additive, synergistic, or no additional gain
4. Block AttnRes + CCA vs deeper vanilla stack at same FLOP budget → quality comparison

## Reference

"The highest-probability hybrid is: (1) Use CCA or CCGQA inside the self-attention sublayers. (2) Use Block AttnRes on the residual pathway across layers/blocks. That separation is elegant because it preserves each method's reason for existing." — source doc