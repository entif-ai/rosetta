# MTC-005: Eval Harness Before Training — 4-6 Week Pre-Training Preparation Phase

## Issue Metadata

- **Type**: process/methodology
- **Status**: draft
- **Labels**: methodology, evaluation, research
- **Depends on**: MTC-003 (ablation-first methodology)
- **Evidence source**: `docs/chats/20260413 - Chat GPT - Model Training Cost and Design.md`

## Problem Statement

The source document allocates 4-6 weeks specifically for building the evaluation harness, tokenizer, and corpus preparation BEFORE model training begins. This is a critical methodological requirement: the eval harness must be capable of measuring semantic stability, round-trip fidelity, cost-quality advantage, static lookup offload, long-context structure, formal reasoning reliability, and hallucination diagnostics — before any training run starts.

The document also specifies that metrics must be pre-registered and statistical tests with confidence intervals must be used.

## Proposed Action

1. **Plan a 4-6 week pre-training phase** dedicated to: corpus curation, tokenizer training, and evaluation harness construction
2. **Define the seven core proof targets** in the eval harness: (1) semantic stability, (2) round-trip fidelity, (3) cost-quality advantage, (4) static lookup offload, (5) long-context structure, (6) formal reasoning reliability, (7) hallucination diagnostics
3. **Require pre-registered metrics** — no post-hoc metric selection allowed to prevent p-hacking
4. **Build iso-parameter and iso-FLOPs baselines** into the harness so every run automatically compares against the right controls
5. **Use statistical tests with confidence intervals** — avoid single-point comparisons that mask variance

## Relevant Findings

- "4-6 weeks for corpus, tokenizer, and evaluation harness" before model training
- Seven core proof targets: semantic stability, round-trip fidelity, cost-quality advantage, static lookup offload, long-context structure, formal reasoning reliability, hallucination diagnostics
- "Use statistical tests with confidence intervals and pre-registered metrics"
- AR-LSAT and PrOntoQA for formal reasoning; focus on hallucination rates, provenance integrity, sample efficiency

## Related Issues

- MTC-003 (ablation-first) depends on this for proper metric design
- MTC-004 (funding path) must budget for this pre-training phase explicitly
- MTC-010 (semantic normalization engine scope) depends on the eval harness to actually measure semantic normalization quality

## Open Questions

- Does the existing Rosetta eval harness (if any) cover these seven proof targets, or does a new one need to be built?
- What is the baseline model for iso-parameter comparisons? (Same-size standard transformer with standard tokenizer?)
- Is Mac Studio appropriate for running the eval harness locally, or does it require GPU compute?
