# MTC-003: Ablation-First Methodology — Every Primitive Earns Its Calories

## Issue Metadata

- **Type**: process/methodology
- **Status**: draft
- **Labels**: methodology, research, ablation
- **Depends on**: (none — foundational methodology)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document emphasizes that the custom model training experiment "lives or dies on ablation honesty." Every added primitive (Mamba-3, CCA, Engram, AttnRes, etc.) must earn its place through controlled ablation against iso-parameter and iso-FLOPs baselines. The document explicitly frames the key question:

> "The question is not 'is the full fancy model better than a random baseline?' The question is 'does each added primitive earn its calories?'"

Without this discipline, the result is a "glitter-bomb model" — impressive-looking but unfalsifiable and impossible to debug.

## Proposed Action

1. **Establish ablation methodology as a first-class constraint** in the research planning for Text-Core Phase 0
2. **Define baseline variants explicitly**: (A) baseline Transformer, (B) with AttnRes, (C) with Engram, (D) with Mamba-3, etc. — each variant independently evaluable
3. **Require iso-parameter AND iso-FLOPs comparisons** — not just parameter count but actual compute
4. **Pre-register metrics before each ablation run** to prevent p-hacking and motivated reasoning
5. **Document the ablation tree** in the research plan so the contribution of each primitive is traceable

## Relevant Findings

- "This experiment lives or dies on ablation honesty"
- "The question is not 'is the full fancy model better than a random baseline?' The question is 'does each added primitive earn its calories?'"
- "Glitter-bomb model" risk — want "a courtroom exhibit, not a glitter bomb"
- Engram paper explicitly frames comparisons that way

## Related Issues

- MTC-004 (funding path) depends on this for honest milestone definition
- MTC-005 (eval harness) depends on this for pre-registered metric design
- MTC-006 (depth-routing phase) is a concrete example of ablation-first sequencing
