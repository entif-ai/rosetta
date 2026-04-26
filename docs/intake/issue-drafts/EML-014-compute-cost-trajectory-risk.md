# EML-014: Compute Cost Trajectory Risk for Brute-Force Maximalism Strategies

**Status:** issue-candidate
**Priority:** MEDIUM
**Type:** strategy/industry-analysis
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F014

---

## Problem Statement

There is a strategic tension between two paths:

**Path A — Brute-force maximalism:** Build ever-larger compute clusters (xAI's 200k GPU Colossus with roadmap to 1M GPUs, TeraFab/terawatt-scale ambition). Assumption: cognition cost can only fall by pouring in more power and capex.

**Path B — Architectural efficiency:** Improve intelligence-per-active-parameter through better architecture, better representation, better memory, and better reliability.

The tension is real because both paths can be true simultaneously, but the marginal value of each extra megawatt of brute-force compute may be falling while the value of efficiency gains is rising.

## Current Data Points

- IEA projects global data-center electricity demand to double to ~945 TWh by 2030, with AI as major driver
- ~50% of planned US data-center builds delayed or canceled due to transformer/switchgear/battery shortages and power infrastructure constraints
- Epoch AI: algorithmic efficiency improving ~3x per year for equivalent performance
- xAI pursuing 200k GPU Colossus → 1M GPU roadmap; TeraFab/terawatt-scale ambition
- Gemma 4 26B A4B: 3.8B active params from 26B total, very strong benchmarks
- gpt-oss-120b: 117B total, 5.1B active per token (MoE)

## The Strategic Risk

If efficiency improvements (architectural + representational + reliability) compound faster than the industry expects, "build skillions of server farms or perish" could look less like destiny and more like one strategic bet among several. xAI-style compute-maximalism bets could be undercut by systems that achieve comparable capability at a fraction of the active compute and energy cost.

## The Optimistic Scenario

A new class of models emerges that is dramatically more capable per active parameter, per watt, and per dollar than today's mainstream assumptions would predict — making "planetary-scale compute or perish" look less inevitable.

## Recommended Action

- Continue developing Rosetta as a semantic efficiency stack
- Track intelligence-per-parameter benchmarks as a leading indicator
- Do not assume brute-force compute will always be the dominant factor in AI capability improvement
- Monitor data-center build-out constraints as a tailwind for efficiency-focused approaches
