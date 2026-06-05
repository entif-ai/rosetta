# IDI-002: Transliteration Alone Is Insufficient for Privacy Membrane — Join Attack Risk

## Metadata

- **Type**: security/privacy
- **Status**: draft
- **Source doc**: `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md`
- **Evidence**: "Replacing soybeans with gidgets is nice, but the residual structure can still betray the original if enough correlated fields travel together."
- **Confidence**: high

## Problem

Entif's privacy membrane is proposed to work by transliterating specific values into abstracted equivalents before sending prompts to external LLM providers (e.g., soybeans→gidgets, $3.95→1975 credits).

This field-level substitution does not guarantee privacy. An adversary with access to multiple correlated fields — or the ability to infer the substitution scheme from structural patterns — can reconstruct the original values via a join attack.

Example: if "crop=X" and "price_per_bushel=Y" are both transliterated but correlated (a large farm gets large values, a small farm gets small values), knowing the transliteration function for X reveals Y, or vice versa.

## Required

- Statistical disclosure control across correlated field groups
- K-anonymity or differential privacy budget analysis for the transliterated payload
- Explicit policy rules for what field combinations may travel together vs. must be suppressed
- EnrichmentContext schema that separates "safe to expose after anonymization" from "never expose"

## Connection to DI-006 (EnrichmentContext Policy Schema)

This issue is the privacy risk that motivates the EnrichmentContext schema. They should be developed together.

## TODO

- [ ] Define correlation analysis requirements for the privacy membrane
- [ ] Specify suppression rules for highly-correlated field groups
- [ ] Build or adopt a privacy budget calculator for transliteration decisions
- [ ] Add join-attack test cases to the adapter certification harness
