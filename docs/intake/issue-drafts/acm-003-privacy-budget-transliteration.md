# ACM-003: Privacy Budget Schema for Transliteration Field Combinations

## Issue

Entif's transliteration pattern replaces sensitive domain-specific entities with fictional analogues (soybeans → quatloos, gidgets) to prevent proprietary information from leaving the on-premise boundary. However, the operator acknowledges: "the residual structure can still betray the original if enough correlated fields travel together."

Example: "How many bushels of soybeans will $100 get me right now if soybeans cost $3.95 per bushel?" → "How many quatloos of gidgets will 50000 credits purchase, if gidgets are 1975 credits per quatloo?" Even with perfect transliteration, the numeric structure ($100 / $3.95 = 25.3 bushels and 50000 / 1975 = 25.3 quatloos) is preserved. A sufficiently sophisticated observer could infer the exchange rate between soybeans and credits.

This is a join-residual leak: individual fields are protected, but combinations reveal relationships.

## Scope

1. Define a `privacy_budget_constraint` schema:
   - `field_class`: enum grouping (e.g., `financial_ratio`, `quantity`, `price`, `temporal`, `geographic`)
   - `leak_risk`: low / medium / high / catastrophic
   - `combination_rule`: what other field classes this may not travel with in a single outbound call

2. Establish a `transliteration_lexicon_per_client` model: 
   - Each client gets a generated fictional vocabulary (not a shared lexicon)
   - The lexicon is governed client-side, never transmitted off-prem
   - Entif's on-prem box generates the substitution in real time

3. Define prohibited combination rules:
   - A `price` field-class cannot travel in the same provider call as a `quantity` field-class if both originate from the same source record
   - A `temporal` field cannot travel with a `geographic` field from the same record
   - General rule: entropy-preserving transformations (any transformation that preserves the information-theoretic entropy of the original data) cannot leave the boundary

4. Implement a `privacy_check` gate in the Guard layer: before any off-prem call, evaluate whether the proposed field set violates a combination rule. If violated, return a structured refusal with a `PRIVACY_BUDGET_VIOLATION` reason code.

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (operator: "the prospect of that cache becoming the source of a data leak or permissions failure is a big deal")
- Related: DI-012 anti-personhood-correlation; Entif 2.0 Secure Architecture; Guard as PEP

## Labels

privacy, security, entif

## Status

doc-candidate
