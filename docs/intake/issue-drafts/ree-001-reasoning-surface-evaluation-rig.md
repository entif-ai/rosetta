# REE-001: Rosetta needs an empirical reasoning-surface evaluation rig

## Status
draft

## Type
implementation

## Labels
- evaluation
- text-core
- benchmark

## Evidence
"take one fixed problem set and compare four reasoning surfaces on the same underlying model stack" — from docs/chats/20260411 - Chat GPT - Reasoning, Efficiency and Encoding.md

## Problem

Rosetta's architecture makes a foundational bet that reasoning efficiency is not tied to natural language surface — that a designed semantic medium (pasigraphy, slugs, concept bundles) can outperform ordinary prose. However, there is no empirical evaluation rig to test this claim. Claims about representation efficiency and multilingual reasoning advantages remain vibes until a controlled comparison exists.

## Proposed Solution

Build a minimal evaluation rig:

1. **Fixed problem set**: Select a diverse, non-trivial task suite (logical deduction, multi-hop QA, constraint satisfaction, code generation, translation)
2. **Four surfaces tested on identical model stack**:
   - Surface A: ordinary English
   - Surface B: Chinese (where relevant)
   - Surface C: compressed symbolic slugs (Rosetta-style)
   - Surface D: controlled semantic form (bundle/frame-based structured IR)
3. **Metrics captured**:
   - Accuracy / correctness
   - Token cost (total tokens consumed + generated)
   - Latency (time to first token, time to completion)
   - Stability (variance across multiple runs with same surface)
   - Intermediate structure fidelity (can the output be parsed back into valid bundles?)

4. **Automation**: Script the evaluation so it can be re-run against future model releases

## Dependencies
- None (can be scoped independently)

## Priority
high

## Notes
- This is the metrology rig that turns "encouraging signal" into "actual KPI lift"
- Surface D requires a working bundle encoder/decoder; may need to be simulated initially
- Surface B (Chinese) is relevant for cross-lingual efficiency claims already supported by the source document
- Run at minimum 3 trials per surface per problem to capture stability variance