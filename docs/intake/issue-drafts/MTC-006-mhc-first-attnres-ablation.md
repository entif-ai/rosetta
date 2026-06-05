# MTC-006: Depth-Routing Phase — mHC First, AttnRes as Controlled Ablation

## Issue Metadata

- **Type**: architecture
- **Status**: draft
- **Labels**: architecture, ablation, depth-routing
- **Depends on**: MTC-003 (ablation-first methodology)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document specifies that v0 should pick ONE depth-routing family — either mHC (multi-branch mixing/hypothesis circuits) or AttnRes (Attention Residuals) — not both. The rationale for choosing mHC over AttnRes for v0 is that Engram already has a demonstrated mHC integration path, making the combined mHC+Engram baseline more coherent. AttnRes should be an ablation after the mHC+Engram baseline is established.

> "For v0, I would choose mHC-style multibranch mixing over AttnRes because Engram already has a demonstrated mHC integration path; AttnRes should be an ablation, not part of the first confounded stew."

The document also proposes three explicit architecture branches for ablation: (A) Transformer + tokenizer + embedder simplicity baseline, (B) with AttnRes, (C) with Engram memory.

## Proposed Action

1. **Define mHC as the v0 depth-routing choice** with explicit rationale tied to Engram integration path
2. **Plan AttnRes as the first controlled ablation** after mHC+Engram baseline is validated
3. **Design the three-branch ablation tree**: Branch A = vanilla Transformer baseline, Branch B = AttnRes added, Branch C = Engram memory added
4. **Track each branch independently** with pre-registered metrics
5. **Do NOT add both mHC and AttnRes in the same v0 run** — confounded results are not publishable or falsifiable

## Relevant Findings

- "Choose one depth-routing family at first: mHC or AttnRes, not both"
- mHC chosen for v0 because Engram has demonstrated mHC integration path
- AttnRes: arXiv 2603.15031 — drop-in replacement with minimal overhead
- AttnRes should be an ablation after establishing baseline
- Three architecture branches proposed: simplicity baseline, AttnRes, Engram

## Open Questions

- What is the specific mHC architecture to use? Is there a reference implementation?
- Does mHC have any interaction with the parse-only-default constraint?
- Is there existing Rosetta work on mHC or hypothesis circuits that needs to be cross-referenced?
