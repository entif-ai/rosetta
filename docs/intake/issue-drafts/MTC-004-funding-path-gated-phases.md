# MTC-004: Funding Path — $50k First Target, Gated Phases, Metric Thresholds

## Issue Metadata

- **Type**: planning/roadmap
- **Status**: draft
- **Labels**: funding, roadmap, planning
- **Depends on**: MTC-003 (ablation-first methodology)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document defines a phased funding strategy with four cost bands and explicit milestone gates. The recommended first target is $50,000 — enough to do something real without overcommitting. The path is explicitly gated: codec/tokenizer first, scratch embedder second, 700M generator third, 1.3B only after embedder and round-trip metrics show real lift.

| Phase | Scope | Budget |
| --- | --- | --- |
| Risk-retirement probe | tokenizer/codec, LoRA bundle tests on open model | $2k-$10k |
| Minimal falsifiable v0 | tokenizer + 100-150M embedder + 700M generator + eval harness | $10k-$35k |
| Useful v1 | tokenizer + 150-250M embedder + 1.3B + 3-5 ablations | $25k-$75k |
| Serious foundation | 1.3B-3B family, multiple seeds, full diagnostics | $100k-$300k |

## Proposed Action

1. **Adopt $50k as the first fundraising pitch** — covers minimal falsifiable v0 with runway
2. **Define explicit metric thresholds** for phase gates: embedder round-trip accuracy threshold before 700M decoder training; 700M semantic stability threshold before 1.3B expansion
3. **Track ablation results per phase** — each phase funds specific ablation runs, not a single monolithic experiment
4. **Budget 5x-10x over raw compute floor** — the theoretical GPU-hours floor is misleading; real costs include failed runs, data curation, synthetic pair generation, evals

## Relevant Findings

- $50k recommended as first clean target — "enough to do something real, not just make the PowerPoint purr"
- "Codec/tokenizer first, scratch embedder second, 700M hybrid generator third, 1.3B only after the embedder and round-trip metrics show real lift"
- Real cost is 5x-10x over theoretical compute floor due to failed runs, data curation, synthetic pair generation, evaluation harnesses

## Open Questions

- What are the specific metric thresholds for each phase gate? (e.g., round-trip semantic F1 > X%, paraphrase clustering purity > Y%)
- Is the $2k-$10k risk probe phase actually necessary, or can the full $50k cover tokenizer validation + minimal v0?
- What is the funding vehicle for this research — existing Entif/Rosetta budget, new grant, strategic investment?
