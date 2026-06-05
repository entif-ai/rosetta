# API-CACHE-002: Privacy Budget Discipline for Transliteration

## Metadata

| Field | Value |
|---|---|
| Type | spec-gap |
| Status | draft |
| Labels | privacy-membrane, anonymization, join-correlation |
| Depends On | — |
| Evidence | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` Finding: "the residual structure can still betray the original if enough correlated fields travel together. That means Entif needs not only redaction but privacy budget discipline and rules for what combinations may leave the on-prem boundary" |

---

## Problem

The privacy membrane uses transliteration (e.g., replacing "soybeans at $3.95/bushel" → "gidgets at 1975 credits/quatloo") to prevent proprietary data from leaving on-prem. However, correlated fields can still leak the original meaning even without the specific values.

Example: "How many bushels of soybeans will $100 get me at $3.95/bushel?" → "How many quatloos of gidgets will 50000 credits get me at 1975 credits/quatloo?" The structure (dollar amount, unit price, unit type) still betrays the original domain. If enough correlated fields travel together, an adversary could reverse-engineer the original context.

This is a join-correlation attack: the anonymized fields individually look safe, but their combination reveals sensitive information.

---

## Scope

**In scope:**
- Formal privacy budget model for transliteration
- Rules for which field combinations may leave the on-prem boundary
- Join-correlation detection (structural leakage detection)
- Privacy budget discipline as a first-class policy concern

**Out of scope:**
- Token-level redaction (already handled by Guard)
- Formal differential privacy proofs
- Provider-side隐私 budget (not Entif's concern)

---

## Key Decisions Required

1. **Privacy budget model**: numeric bound on mutual information leakage (differential privacy style), or rule-based field-combination matrix (simpler, more auditable)?
2. **Threshold**: what is the maximum acceptable mutual information leakage before a composite query is blocked?
3. **Field combination rules**: is there a taxonomy of safe/unsafe combinations? Can this be pre-computed for common query patterns?
4. **Handling of structural hints**: what about implicitly revealing information via query structure (e.g., asking about "the company's stock price" reveals the company is public)?

---

## Relationship to Other Issues

- This issue blocks API-CACHE-001 indirectly (the rights_domain and data_classification dimensions are part of what Entif must protect from leakage)
- Privacy budget is orthogonal to cache key design but must be considered in parallel

---

## Open Questions

- Can we enumerate the dangerous field combinations ahead of time, or must leakage be detected dynamically?
- How is privacy budget communicated to the Guard layer? Is it a policy flag, a numeric threshold, or a rule set?
- What happens when a query exceeds the privacy budget — is it blocked, rewritten, or escalated?