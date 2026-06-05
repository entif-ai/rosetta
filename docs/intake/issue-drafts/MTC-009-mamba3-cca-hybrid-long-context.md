# MTC-009: Mamba-3 + CCA Hybrid for Long-Context State Tracking

## Issue Metadata

- **Type**: architecture
- **Status**: draft
- **Labels**: architecture, mamba3, cca, long-context
- **Depends on**: MTC-006 (depth-routing phase), MTC-003 (ablation-first methodology)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document proposes a hybrid architecture combining Mamba-3 (state space model for long-sequence state handling) with CCA (Compressed Convolutional Attention) for the decoder. Mamba-3 provides efficient long-sequence state tracking and reportedly improves accuracy by 1.8 points at 1.5B scale (with MIMO variant adding another 1.2 points). CCA compresses attention compute and KV burden with comparable quality up to 3x faster.

This combination addresses both long-context state tracking (Mamba-3) and attention efficiency (CCA) simultaneously. However, the document also notes that Mamba-3 was not recommended for Phase 1 due to higher risk — it was recommended for v0 alongside other architectural choices.

## Proposed Action

1. **Design Mamba-3 + CCA hybrid architecture** for the RosettaGen-S decoder: Mamba-3 blocks for state tracking + periodic CCA attention blocks for global refresh
2. **Reference Mamba-3 from state-spaces/mamba** (open-source) — no official training-from-scratch reference found
3. **Reference CCA from arXiv 2510.04476** (Zyphra) and the Zyphra blog post on CCA
4. **Evaluate Mamba-3 + CCA interaction** in the ablation framework — does CCA improve or degrade Mamba-3 state tracking?
5. **Do NOT include both mHC and AttnRes alongside Mamba-3 + CCA in v0** — too many confounded variables

## Relevant Findings

- Mamba-3: openreview.net HwCvaJOiCj — "Improved Sequence Modeling using State Space Principles"
- Mamba-3: 1.8 point accuracy improvement at 1.5B; MIMO version adds another 1.2 points
- CCA: arXiv 2510.04476 — "Compressed Convolutional Attention: Efficient Attention in a Compressed Latent"
- CCA: comparable quality up to 3x faster; trims attention compute and KV burden
- Mamba-3 targets "cheaper long-sequence state handling and better state tracking"

## Open Questions

- Does Mamba-3 + CCA interact with the parse-only-default constraint? (SSM/CCA may have different inference characteristics)
- Is there any existing Mamba-3 integration work in Rosetta?
- Does the MIMO variant (additional 1.2 points) justify the added complexity in v0?
