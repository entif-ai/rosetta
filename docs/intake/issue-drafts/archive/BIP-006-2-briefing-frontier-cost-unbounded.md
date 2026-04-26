# BIP-006-2 — Nightly Frontier Model Cost Is Unbounded

**Use Case:** BIP-006 (Nightly Business Briefing)
**Confidence:** HIGH
**Type:** cost

## Description

The nightly briefing runs three phases with a frontier model (Claude Opus or GPT-4) for all council members. Phase 2 runs 4 personas in parallel. Each phase processes 200 signals with up to 4 sample events. At frontier model pricing (Opus at $15/$75 per 1M input/output tokens), a single nightly run could cost $10–50 or more, depending on token counts and context sizes.

## Specific Problem

1. **No per-run budget cap:** There is no maximum spend per night or per week for this system.
2. **No adaptive frequency:** If cost is a concern, lower-priority nights could use a cheaper model (Sonnet-class) or skip certain phases.
3. **Context size unbounded:** 200 signals × 4 sample events × frontier model context = potentially large input tokens. No context window budget management.
4. **No cost tracking integration with BIP-011:** BIP-011 (AI Usage and Cost Tracking) would logically track this spending, but BIP-006 does not reference it or route its API calls through the cost logger.
5. **Multi-persona parallel calls multiply cost:** 4 parallel persona calls × Phase 2 calls = 4× the cost of a single sequential review.

## Expected Behavior

Specify:
1. Maximum cost per nightly run (e.g., cap at $5/run)
2. Model fallback: if cost exceeds threshold, fall back to a mid-tier model (e.g., Sonnet or GPT-4 Turbo)
3. Integrate with BIP-011's cost logging pipeline
4. Adaptive frequency: run full council weekly, lighter nightly digest on other days

## Source Reference

BIP-006, "Three-phase AI review council (all phases use a frontier model like Claude Opus or GPT-4)"
