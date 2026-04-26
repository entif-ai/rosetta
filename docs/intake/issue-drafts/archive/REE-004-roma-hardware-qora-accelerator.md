# Issue Draft: REE-004 — ROMA Hardware Accelerator for QLoRA Inference

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md` (references 2503.12988v2.pdf)

## Summary

ROMA is a hardware accelerator for QLoRA inference using hybrid ROM + SRAM architecture. Stores quantized frozen base model in ROM, LoRA weights + KV cache in SRAM.

## Architecture

- **ROM**: Quantized frozen base model (stable, converged)
- **SRAM**: LoRA adapters + KV cache (flexible, grows)
- **B-ROM**: Custom design reducing ROM area
- **Fused cell layout**: Combines B-ROM and compute cells

## Reported Performance

- Full on-chip storage: 4-bit 3B LLaMA or 2-bit 8B LLaMA
- Throughput: >20,000 tokens/s (peak 31.8K tokens/s)
- Massively outpaces CPU/GPU baselines

## Architectural Principle Validated

**Stable heavy substrate + lightweight task-specific overlays** — aligns with Rosetta/Entif design:
- Frozen base cognition = ROM
- Specialized adapters = SRAM
- Supports edge deployment of Rosetta-wrapped models

## Confidence

HIGH — Specific paper with concrete performance numbers.

## Tags

- hardware
- qora
- edge-deployment
- inference-optimization
- roma
- memory-architecture