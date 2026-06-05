# ACM-002: Transliteration Join-Leakage Protection

## Metadata

| Field | Value |
| --- | --- |
| type | issue-candidate |
| source_doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| finding | "Replacing soybeans with gidgets is nice, but the residual structure can still betray the original if enough correlated fields travel together" |
| confidence | high |
| draft_created | 2026-06-05 |

## Problem Statement

Entif's privacy membrane uses entity transliteration (e.g., soybeans → gidgets, $3.95 → 1975 credits) to prevent proprietary data from reaching external inference providers. However, if multiple correlated fields are transliterated together, an adversary with knowledge of the transformation could reconstruct the original values through join-based inference.

Example: A query containing both "soybeans at $3.95/bushel" and "750 bushels" transliterated separately to "gidgets at 1975 credits/quatloo" and "37500 quatloos" still preserves the arithmetic relationship. With enough correlated fields, the transformation becomes reversible.

## Root Cause

Transliteration applied field-by-field without accounting for inter-field relationships preserves structural information that can be exploited.

## Required Solution

Define a privacy budget discipline for transliteration:

1. **Combination rules** — define which field combinations may travel together vs. must be aggregated/anonymized before leaving on-prem boundary
2. **Differential privacy considerations** — where structural relationships are critical, apply noise or aggregation before translocation
3. **Cross-field correlation audit** — log which field combinations are transliterated together; flag high-correlation sets for review
4. **Transform isolation** — for high-risk queries, apply one-way transforms (e.g., semantic role masking) rather than literal substitution

## Acceptance Criteria

1. Transliteration layer must log which field combinations travel together in any outbound query
2. High-correlation field sets (e.g., price × quantity → can reconstruct total cost) must be flagged or aggregated
3. Privacy budget must be queryable — operators can see how much "uniqueness" a given query releases
4. Transform strategy must be selectable per query based on data classification (not all fields need the same protection level)

## Priority

high

## Related Issues

- Informs the `data_classification` axis of ACM-001 (multi-axis cache key)
- ACM-001 is prerequisite to enforcement

## Notes

This is especially critical for financial, healthcare, and legal enterprise customers where regulatory constraints (HIPAA, GDPR) apply to the structural information itself, not just the raw values.