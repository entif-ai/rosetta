# REE-003: Evaluate DoRA vs QLoRA vs LoRA for Structured Adaptation Scenarios

## Issue Metadata

- **Type:** evaluation / ml-fundamentals
- **Status:** draft
- **Created:** 2026-06-04
- **Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

DoRA, QLoRA, and LoRA represent different points in the trade-off space between parameter efficiency, representational expressiveness, and training stability. Rosetta's adapter certification harness and skillpack importer need a principled basis for choosing which adaptation method to support. No comparative evaluation for Rosetta-specific scenarios exists.

## Background

From the source document:
- **LoRA:** Freeze base W; learn low-rank update BA; trains few params; "bolt on lightweight corrective scaffold"
- **QLoRA:** Quantize frozen base to 4-bit NF4; double quantization; paged optimizers; only LoRA adapters trained; base model treated as fixed infrastructure
- **DoRA:** Decompose W into magnitude + direction; LoRA-style update on directional component only; better expressive power than plain LoRA

The ROMA paper (2503.12988v2) shows QLoRA as a hardware deployment pattern: quantized base in ROM, LoRA adapters in SRAM — stable heavy substrate + lightweight task-specific overlays.

## Evaluation Criteria for Rosetta

| Criterion | LoRA | QLoRA | DoRA |
|---|---|---|---|
| Parameter efficiency | high | very high | high |
| Training stability | good | moderate (quantization noise) | good |
| Expressive power | moderate (low-rank constraint) | moderate | better (direction+magnitude) |
| Hardware footprint for edge deploy | moderate | very low | moderate |
| Compatibility with structured base init (REE-001) | yes | yes (quantized base = stable) | yes |
| Adapter certification testability | straightforward | complex (quantization layer) | straightforward |
| Skillpack import compatibility | good | partial (needs quantized base) | good |

## Open Questions

1. For Rosetta's adapter certification harness (8 test classes): which adaptation method produces the most testable, auditable adapters?
2. For skillpack importer quarantine→certify→promote flow: does QLoRA's quantized base introduce unacceptable non-determinism in certification tests?
3. Does DoRA's magnitude+direction decomposition produce better-structured adapters for semantic concept alignment?
4. ROMA-style hardware deployment: is QLoRA the only viable path for on-device Rosetta adapters?

## Dependencies

- None — independent of REE-001 and REE-002

## Labels

- lora
- qlor
- dora
- parameter-efficient-tuning
- edge-deployment
- adapter-certification
- skillpack-importer