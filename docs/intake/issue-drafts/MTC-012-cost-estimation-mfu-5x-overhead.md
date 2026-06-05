# MTC-012: Cost Estimation Methodology — MFU 0.15 + 5x Overhead for Realistic Budgets

## Issue Metadata

- **Type**: planning
- **Status**: draft
- **Labels**: planning, cost, methodology
- **Depends on**: MTC-004 (funding path)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document provides a realistic cost estimation methodology that corrects for the common mistake of quoting only the theoretical GPU-hour floor. The document recommends using a conservative MFU (Model FLOPs Utilization) of 0.15 (15%) plus a 5x experimentation overhead factor to get realistic budgets.

The raw compute floor for a 700M decoder is "few hundred GPU-hours"; for a 1.3B decoder "high-hundreds to low-thousands GPU-hours." But the real bill is the "graveyard behind it": failed runs, data curation, synthetic pair generation, evaluation harnesses, checkpoint storage, kernel weirdness, and ablations.

This means the actual budget is 5x-10x over the theoretical floor.

## Proposed Action

1. **Use conservative MFU of 0.15** for cost estimates — not the optimistic 0.3-0.4 often used
2. **Apply 5x experimentation overhead** over the theoretical compute floor
3. **Include in the overhead**: failed runs, data curation, synthetic pair generation, evaluation harnesses, checkpoint storage, networking, egress
4. **Present two numbers** in any budget: theoretical floor (GPU-hours × $/hr) and realistic budget (floor × 5-10x)
5. **Use Vast.ai for cost optimization** — consistently cheaper than RunPod; A100 at ~$0.77/hr vs $1.39/hr on RunPod

## Relevant Findings

- "Compute-only costs are pretty low, but should probably be more conservative with a lower MFU of 0.15, plus a 5x factor for experimentation"
- "The real bill... is the graveyard behind it: failed runs, data curation, synthetic-pair generation, evaluation harnesses, checkpoint storage, kernel weirdness, and ablations"
- Raw floor for 700M: "few hundred GPU-hours"; for 1.3B: "high-hundreds to low-thousands GPU-hours"
- Real budget: 5x-10x over theoretical floor
- A100 80GB: ~$0.77/hr on Vast.ai vs ~$1.39/hr on RunPod
- H100: ~$1.13/hr on Vast.ai vs ~$2.39/hr on RunPod
- H200: ~$2.06/hr on Vast.ai

## Open Questions

- What is the actual MFU observed in comparable training runs (Lambda, Vast.ai, RunPod)?
- Are there spot/interruptible pricing options that could further reduce costs?
- What is the data egress cost for checkpoint storage and transfer?
