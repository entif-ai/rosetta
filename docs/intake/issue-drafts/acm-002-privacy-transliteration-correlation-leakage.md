# ACM-002: Transliteration Correlation Leakage — Joint-Distribution Constraints Needed

## Issue Metadata

| Field | Value |
|---|---|
| Title | ACM-002: Transliteration Correlation Leakage — Joint-Distribution Constraints Needed |
| Type | risk |
| Status | draft |
| Source doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-05-api-driven-cache-mgmt.md` |
| Confidence | high |
| Labels | privacy, anonymization, risk |
| Related concepts | privacy-membrane, transliteration, correlation, anonymization, pii |
| Depends on | — |

## Problem Statement

Rosetta's Entif privacy membrane proposes anonymizing domain-specific entities via transliteration — replacing real domain values with fictional equivalents that preserve arithmetic/structural relationships (the "soybeans→gidgets" pattern: "How many bushels of soybeans will $100 get me right now if soybeans cost $3.95/bushel?" → "How many quatloos of gidgets will 50000 credits purchase if gidgets are 1975 credits per quatloo?").

However, the document itself identifies a critical residual risk: when multiple correlated fields travel together in the same external query, even perfect per-field substitution can leak the original values through joint distribution.

**Example**: If a query contains both `salary` and `years_employed` for an employee, and both are transliterated independently, an adversary with knowledge of the salary distribution and the transliteration key could jointly infer the original salary from the transliterated values.

This is a known failure mode in anonymization literature: k-anonymity and differential privacy address single-table leakage, but cross-field correlation in structured multi-field queries is a harder problem.

## Evidence

From the source document (2026-04-11 chat):

> "Replacing soybeans with gidgets is nice, but the residual structure can still betray the original if enough correlated fields travel together. That means Entif needs not only redaction but **privacy budget discipline** and rules for what combinations may leave the on-prem boundary."

No mitigation is proposed in the source document. The risk is flagged but not resolved.

## Proposed Resolution

Define a formal model for what combinations of fields may travel together in external queries. At minimum:

1. **Correlation budget**: Track the joint entropy of field sets leaving the on-prem boundary. If combined entropy falls below a threshold (indicating re-identification risk), block or restructure the query.
2. **Field grouping by sensitivity class**: Classify fields into sensitivity tiers (PII, quasi-identifier, domain-internal, non-sensitive). Require that field groups above a sensitivity threshold not be combined in a single external call without additional noise/inflation.
3. **Structural sanitization**: Beyond per-field substitution, apply structural perturbations (adding decoy fields, aggregating ranges, swapping values within equivalence classes) to break cross-field correlations.
4. **Privacy budget accounting**: Track the cumulative privacy budget consumed by a principal's query history. Treat it as a consumable resource with replenish rules.

## Implementation Notes

- This is a privacy membrane concern; it applies before any cache lookup or inference routing
- The transliteration dictionary itself should not be transmitted to any external system
- Cross-field correlation analysis can be done statically (pre-flight) on the query structure, not requiring inference on content
- The sensitivity tier model should be defined per-domain (financial, medical, HR, etc.) — each domain has different quasi-identifier sets

## Open Questions

- What is the minimum viable privacy budget model for Entif's initial deployment? Is differential privacy required, or is a simpler correlation-threshold model sufficient?
- Who owns the sensitivity tier definitions — the enterprise customer or Entif?
- Does the transliteration dictionary need to be per-session, per-user, or per-domain? Does key rotation matter?

## Related Issues

- ACM-001 (composite cache key) — same correctness concern but at the cache layer
- ACM-006 (transliteration not specced) — the transliteration mechanism itself needs formal specification before this leakage risk can be addressed
