# EML-011: MegaTrain Implications for Training Economics

**Status:** issue-candidate
**Priority:** MEDIUM-HIGH
**Type:** research/ml-training/hardware
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F011

---

## Problem Statement

MegaTrain (2604.05091v1) argues that the LLM development center of gravity has shifted from giant pretraining to post-training, alignment, domain adaptation, and specialization — which can in principle be done on a single node. This has direct implications for Rosetta-native model training economics.

## MegaTrain Core Claims

- Host memory is the authoritative parameter store; GPUs are transient compute engines
- Overlap parameter prefetch, compute, and gradient offload via double buffering + stateless layer-template model
- Reliable training up to 120B parameters on single H200 with 1.5TB host memory
- 1.84x ZeRO-3 offload throughput at 14B
- Training up to 14B even on A6000/3090-class hardware where ZeRO-3 OOMs
- Support for 512K context on a single GH200

## Practical Cost Envelope

**Wave 1 "skateboard v1" (20–40 GPU-hours for early runs, 40–120 for follow-up tuning, most data prep/eval local on Mac Studio):**
- Best-case: ~$500–$3,000 in direct GPU spend
- On bargain A100/H100 pricing

**Wave 2 "serious v1" (100–300 GPU-hours total, mix of A100/H100/GH200, several multi-day runs):**
- Best-case: ~$2,500–$12,000

## When MegaTrain Helps Most

- Relevant for pushing larger open models without a cluster
- Relevant when deciding to do heavier continued pretraining on a larger host model than ordinary PEFT comfortably allows
- NOT the first dollar to spend: prove semantic thesis first, then use MegaTrain-style engineering for deeper adaptation runs

## Hardware Strategy

- **Local Mac Studio:** Dataset construction, bundle generation, evaluation, quantized inference
- **Rented A100/H100:** Waves 1–3 (standard LoRA/QLoRA or continued pretraining)
- **MegaTrain-style:** Only if deciding to do heavier continued pretraining on larger host model

## Key Insight

The true scaling boundary becomes host memory and memory orchestration, not just VRAM. This means single-node large-model adaptation is more feasible than old assumptions implied.
