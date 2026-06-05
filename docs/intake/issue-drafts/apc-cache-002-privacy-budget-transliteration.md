# APC-CACHE-002: Privacy Budget Discipline for Transliteration Layer

**Issue prefix:** APC-CACHE-002
**Type:** implementation
**Status:** draft
**Source:** docs/chats/20260411 - Chat GPT - API-driven Cache Management.md (Finding APC-006)
**Extracted:** 2026-06-05

---

## Problem Statement

Entif's privacy membrane replaces private specifics with normalized placeholders (e.g., soybeans → gidgets, $3.95/bushel → 1975 credits/quatloo) before sending queries to external inference providers. However, this transliteration can still leak information through join inference: when correlated fields travel together (crop type + geography + market timing), even anonymized values can reconstruct the original private data.

## Specific Risk

The example from the source: replacing soybeans with gidgets is insufficient if:
- The set of correlated fields (crop type, geography, market timing) all travel together
- The anonymization is consistent across fields
- An adversary (including the inference provider) can observe the residual structure

This is a known class of privacy attack (differential privacy, linkage attack). Simple field-level redaction is insufficient.

## Required Solution

1. **Privacy budget discipline**: Define what field combinations may cross the on-prem boundary and under what conditions. Some combinations may be disallowed entirely.

2. **Field correlation analysis**: Before any transliteration pass, analyze which fields are correlated. Fields with high mutual information should be processed together under a shared privacy budget.

3. **Noise injection or generalization**: Consider adding controlled noise or generalization (e.g., bucketing) to field values to break correlation without destroying utility.

4. **Schema-driven normalization**: Entif's normalized schema for multi-provider composition must account for which fields can appear in outputs vs. which must be redacted.

## Alignment with Existing Work

- The transliteration strategy (encrypt/hash private blocks, substitute placeholders, return equivalent structure) is already described in the source
- The privacy membrane as a component is referenced in the v0 spec and NOT LAME PRD
- This issue extends the privacy membrane spec to address join inference risk explicitly

## Confidence

HIGH — Explicit from source document's "dragons" section, second response block.

## References

- docs/chats/20260411 - Chat GPT - API-driven Cache Management.md
- docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md (Privacy membrane requirements)
