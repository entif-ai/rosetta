# REE-003: Migration path to Rosetta-native models has no evaluation criteria

## Status
draft

## Type
architecture

## Labels
- future-model-design
- architecture
- evaluation

## Evidence
"natural-language host model → host wrapped by Rosetta codec → host lightly adapted to consume and emit Rosetta bundles → continued training on mixed corpora → eventually, maybe, more deeply Rosetta-native models" — from docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md

## Problem

The source document describes a staged migration path from a natural-language host model toward a Rosetta-native model. This path has 5 stages but no milestones, success criteria, or evaluation gates. Without such criteria, there is no way to know when to advance from one stage to the next or when the model has achieved "Rosetta-native" status.

## Proposed Solution

Define evaluation criteria for each stage of the migration:

**Stage 1 — Baseline (natural-language host)**:
- Establish baseline metrics on the reasoning-surface evaluation rig (REE-001)

**Stage 2 — Rosetta codec wrapped**:
- Measure overhead of codec wrapping on accuracy, latency, token cost
- Define acceptable overhead threshold (e.g., <5% accuracy degradation, <10% latency increase)

**Stage 3 — Host lightly adapted (bundle consume/emit)**:
- Measure structured output parse rate (what fraction of model outputs are valid bundles)
- Measure hallucination reduction vs Stage 1 baseline
- Define success threshold for bundle parse rate (e.g., >95% valid parses)

**Stage 4 — Continued training on mixed corpora**:
- Measure lift vs Stage 3 on accuracy and token efficiency
- Define criteria for "Rosetta-fluent" vs "Rosetta-competent"

**Stage 5 — Rosetta-native**:
- Define what "native" means operationally: model can natively consume/emit's Rosetta structures without adapters? Tokenizer is Rosetta-aware?
- Define final success criteria in terms of the reasoning-surface evaluation rig

## Dependencies
- REE-001 (evaluation rig) is a prerequisite for defining baselines
- REE-002 (concept registry) is a prerequisite for Stage 3+ bundle evaluation

## Priority
medium

## Notes
- This is a forward-looking planning issue; no immediate implementation required
- The staged path is already a valuable framing — the gap is in the evaluation criteria
- Consider whether "Rosetta-native" is achievable or whether the ceiling is a well-adapted host