# APC-006: Transliteration Can Leak by Joins — Privacy Budget Discipline Required

**Status:** draft
**Priority:** high
**Type:** security/privacy
**Confidence:** HIGH

## Problem Statement

Entif's transliteration strategy (replacing soybeans → quatloos, $3.95/bushel → 1975 credits/quatloo) is insufficient if the residual structure can still betray the original.

**The join-leakage failure mode:**

When multiple correlated fields travel together through the anonymization layer, statistical join inference can reconstruct originals:

Example:
- Input: crop_type=soybeans, geography=Iowa, market_time=Q2-2026, price=$3.95/bushel
- Transliterated: crop_type=gidgets, geography=[REDACTED], market_time=[REDACTED], price=1975 credits/quatloo
- Even with some fields redacted, the price + crop_type correlation might be statistically unique
- An adversary with access to public commodity data could correlate "1975 credits" with "soybeans at $3.95"

The problem: **replacing tokens is not the same as anonymizing the information content**.

## Required Controls

1. **Privacy budget discipline**: Track cumulative disclosure risk across fields; block requests that exceed a disclosure threshold
2. **Correlation-aware field grouping**: Fields that are jointly unique must be treated as a single disclosure unit, not independently
3. **Rules for cross-boundary travel**: Define what field combinations may cross the on-prem boundary
4. **k-anonymity or differential privacy** considerations for structured data leaving the boundary
5. **Traffic analysis resistance**: Even if individual fields are transliterated, request frequency and pattern can leak information

## The Transliteration Use Case (from Source)

> "How many bushels of soybeans will $100 get me right now if the soybeans cost $3.95 per bushel?" → "How many quatloos of gidgets will 50000 credits purchase, if gidgets are 1975 credits per quatloo?"

This works as an example but the privacy engineering to make it provably safe across all enterprise data classes requires formal treatment.

## Source

`docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` (ChatGPT conversation, 4/11/2026), second response block ("2. Transliteration can leak by joins")

## Requirements

- Entif's Guard layer needs a privacy budget accountant that tracks cumulative disclosure risk
- Transliteration rules must account for correlation across fields, not just per-field replacement
- Cross-boundary field combination rules must be spec'd per data class (PHI, PII, financial, proprietary)
- The transliteration strategy should be formally modeled as information-theoretic reduction, not just string substitution

## See Also

- `APC-004` (Entif product category — privacy membrane)
- `ESA-003-trust-tiers-write-admission-gate.md`
- `MCST-001-data-retention-ambiguity-risk.md`
- `am-008-data-plane-prompt-injection-mitigation.md` (related: input sanitization)
