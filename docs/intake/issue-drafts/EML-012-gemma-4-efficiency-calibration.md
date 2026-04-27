# EML-012: Gemma 4 as Calibration Point for Intelligence-per-Parameter Efficiency

**Status:** issue-candidate
**Priority:** MEDIUM-HIGH
**Type:** research/ml-training/benchmarking
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F012

---

## Problem Statement

Gemma 4 provides a concrete proof-of-possibility that the pattern of "larger total model, much smaller active runtime footprint" is already real in production systems. It is the right calibration point for Rosetta-native efficiency claims.

## Gemma 4 Benchmark Data

**Gemma 4 31B (dense):**
- #3 on Arena AI open-model text leaderboard
- 85.2% MMLU-Pro
- 89.2% AIME 2026 (no tools)
- 80.0% LiveCodeBench v6
- 84.3% GPQA Diamond
- 76.9 Tau2
- 74.4% BigBench Extra Hard

**Gemma 4 26B A4B (MoE, latency-oriented):**
- #6 on Arena AI open-model text leaderboard
- Activates only **3.8B parameters per inference step** (out of 26B total)
- 82.6% MMLU-Pro
- 88.3% AIME 2026 (no tools)
- 77.1% LiveCodeBench v6
- Google claims "outperforms models 20x its size"

**Comparison: gpt-oss-120b (OpenAI):**
- 117B total parameters, 5.1B active per token (MoE)
- 21B variant activates 3.6B per token
- Designed to fit on single 80GB H100

## What This Proves

The pattern of "bigger total model, much smaller active slice = very capable results" is already demonstrated in production:
- Better routing + better architecture + better training = better intelligence-per-active-parameter
- Gemma 4 is the right supporting example for the thesis that "smaller active footprint, larger effective intelligence" is achievable

## Implication for Rosetta-Native Design

Rosetta aims to add another layer of efficiency on top of backbone architecture gains:
- Not just fewer active parameters
- Fewer active parameters doing less semantically stupid work
- Semantic efficiency + memory efficiency + reliability efficiency stacking on top of backbone efficiency

## Notes

Gemma 4 demonstrates that "intelligence-per-parameter" has not been saturated. The field has room to move further in this direction.
