# PhaseRent-001: Cloud Rental Strategy for Phase C and Phase D with Mac Studio Local Eval

## Metadata

- **Type**: infrastructure
- **Status**: draft
- **Labels**: infrastructure, cloud, hardware
- **Created**: 2026-06-04
- **Source doc**: `docs/chats/20260325 - Chat GPT - Holistic Entif AI Redesign (MR. TECH LEAD).md`
- **Confidence**: high

## Problem Statement

Phase C and D require training compute that M3 Ultra Mac Studio cannot provide (PyTorch MPS experimental single-device only; custom attention kernels are CUDA-first). Need a rental strategy that validates quickly without overspending.

## Hardware Roles

### M3 Ultra Mac Studio (Local)
- Dataset construction
- Rosetta bundle generation
- Tokenizer / HDS experiments
- Quantized inference
- Eval harnesses
- Tiny pilot fine-tunes via MLX-LM
- Merged-weight testing and quantization
- Local eval and prompt/task analysis
- **Truth booth**: "does this actually feel better in practice?"

### NVIDIA Cloud Rentals (Training Bursts)
For anything involving:
- Custom attention kernels
- Architecture surgery
- FlashAttention-ish code paths
- CCA experiments
- CUDA-first stacks
- AttnRes retrofit with custom ops

## Phase C Rental Strategy

**Target**: 1x A100 80GB or 1x H100 80GB

**Duration**: Start with 4-8 hour burst (NOT days)
- Answer: (1) stable training, (2) Rosetta/HDS metrics, (3) bottleneck ID
- If answers are bad: expensive weekend becomes very pricey incense ritual
- If answers are good: scale up with confidence

**Budget reference** (on-demand rates, verify before use):
- Runpod A100 PCIe 80GB: ~$1.39/hr
- Runpod H100 PCIe 80GB: ~$1.99/hr
- Lambda H100 PCIe 80GB: ~$2.49/hr
- Lambda H100 SXM 80GB: ~$3.29/hr

**48hr cost estimates**:
- A100 80GB: ~$33-67
- H100 PCIe: ~$48-120

## Phase D Rental Strategy

**Target**: 1x H100 80GB minimum; 2x H100 for useful batch size
**Scale up**: Only after Phase C proves working loss curve and experiment deserves feast

Phase D = continued pretraining, longer contexts, more tokens, custom AttnRes/CCA ablations, throughput/VRAM intensive work.

## Key Principle

**Short rentals first, scale after validation.**

Do not start by renting for days. Start by renting for 4-8 hours.

## Expected Outcome

Efficient use of cloud budget with rapid validation loop; Mac Studio handles everything it can; NVIDIA used only for compute-intensive training that requires it.

## Test Scenarios

1. 4-8hr A100 rental validates: stable training + Rosetta/HDS metrics + bottleneck ID
2. Phase C adapter training completes successfully on rented GPU
3. Merged weights transferred to Mac Studio for local eval
4. Phase D scaled up to 1x-2x H100 after Phase C success

## Reference

"Do not start by renting for days. Start by renting for 4 to 8 hours." — source doc
"Rent NVIDIA for training-heavy bursts. Use the Mac Studio for local eval, quantized inference, dataset prep, and sanity checks." — source doc
"your hardware is absolutely in the 'serious experiment box', not the 'toy demo box'" — source doc