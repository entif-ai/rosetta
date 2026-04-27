# Issue Draft: REE-003 — QLoRA/DoRA Infrastructure Clarification for Entif Stack

**Source:** `docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md`

## Summary

Clarification of LoRA, QLoRA, and DoRA for proper application in Entif/Rosetta infrastructure decisions.

## Key Definitions

**LoRA (Low-Rank Adaptation):** Freeze pretrained model weights (W), learn small low-rank update: W + BA where BA ≈ useful update. "Bolt on a lightweight corrective scaffold."

**QLoRA (Quantized LoRA):** Combine 4-bit quantization (NF4) with LoRA adapters. Base model: quantized, frozen. Only LoRA adapters trained. Uses double quantization and paged optimizers.

**DoRA (Weight-Decomposed LoRA):** Decomposes weights into direction AND magnitude. Like LoRA but with extra attention to norm/scale. Slightly more expressive.

## Critical Clarification: "Zeroing Out" Is NOT Full Model Zeroing

Full zeroing of model weights = catastrophic: all learned features gone, symmetry collapse, model "mostly shrugs." Worse than random initialization.

"Zeroing" in LoRA context means: adapters initialized as no-op, quantized storage replacing full-precision, NOT zeroing the backbone.

## Confidence

HIGH — Standard ML technical explanation.

## Tags

- lora
- qlora
- dora
- fine-tuning
- quantization
- adapter
- infrastructure