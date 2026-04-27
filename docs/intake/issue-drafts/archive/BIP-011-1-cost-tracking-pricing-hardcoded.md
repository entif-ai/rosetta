# BIP-011-1 — Pricing Table Hardcoded, Not Dynamically Updated

**Use Case:** BIP-011 (AI Usage and Cost Tracking)
**Confidence:** HIGH
**Type:** accuracy

## Description

AI provider pricing is hardcoded in the spec (Anthropic, OpenAI, Google, xAI per-1M-token prices). AI provider pricing changes multiple times per year. The spec provides no mechanism to keep this table current, making cost estimates increasingly inaccurate over time.

## Specific Problem

1. **Pricing changes not reflected:** OpenAI, Anthropic, and Google have changed pricing multiple times in the past 2 years. A static table will drift.
2. **New models not added:** New models (e.g., o1, GPT-4o, Gemini 1.5 Flash) appear regularly and should be logged at their correct rates, not the default $1/$3 fallback.
3. **No update mechanism:** The spec notes "keep this table in a config file so it's easy to update" but provides no update frequency, process, or automated check.
4. **Enterprise/custom pricing unhandled:** Enterprise agreements, volume discounts, and prompt caching discounts change effective prices substantially. The fixed table cannot represent these.

## Expected Behavior

Specify:
1. A config file (JSON or YAML) for the pricing table that is read at runtime, not hardcoded
2. A monthly review reminder or automated check against provider pricing pages
3. Documentation of how to handle enterprise/custom pricing (configurable per-installation)
4. Provider API integration where available (e.g., OpenAI provides a models endpoint with pricing)

## Source Reference

BIP-011, "Cost calculation — use a pricing lookup table (per 1M tokens, input/output)..."
