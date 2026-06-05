# ACM-006: Privacy Membrane Transliteration Not Yet Specified in Rosetta

## Issue Metadata

| Field | Value |
|---|---|
| Title | ACM-006: Privacy Membrane Transliteration Not Yet Specified in Rosetta |
| Type | requirement |
| Status | draft |
| Source doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-05-api-driven-cache-mgmt.md` |
| Confidence | high |
| Labels | privacy, anonymization, entif, transliteration |
| Related concepts | privacy-membrane, transliteration, anonymization, entif, pii |
| Depends on | — |

## Problem Statement

The "soybeans→gidgets" transliteration pattern is proposed in this document as a core Entif privacy mechanism: instead of redacting domain-specific entities before sending queries to external inference providers, Entif substitutes them with fictional equivalents that preserve the query's arithmetic structure and logical relationships.

This allows external inference on meaningfully structured queries without exposing proprietary or PII-laden domain values (e.g., an employee's exact salary, the company's specific contract terms, patient medical data).

However, this pattern has not been formally specified in any existing Rosetta document. It appears here as an informal example in a chat log. Without formal specification, it cannot be implemented, tested, or verified.

This is a requirement gap: transliteration is a core Entif privacy mechanism but is not yet a Rosetta requirement.

## Evidence

From the source document (2026-04-11 chat):

> "How many bushels of soybeans will $100 get me right now if the soybeans cost $3.95 per bushel? ... [transliterated to] How many quatloos of gidgets will 50000 credits purchase, if gidgets are 1975 credits per quatloo?"

The example is presented as the Entif privacy approach but no Rosetta spec defines:
- The transliteration dictionary format
- Who maintains and provisions the substitution mappings per domain
- How structural relationships (arithmetic, comparative) are preserved during substitution
- The boundary between transliteration and redaction (when to substitute vs. when to redact)

## Proposed Resolution

Formalize transliteration as a named Privacy Membrane component in the Entif/Rosetta architecture:

### Transliteration Registry

Define a per-domain substitution registry:
```
TransliterationDomain {
  domain_id: string
  entity_schema: EntitySchema  # what fields exist in this domain
  substitution_strategy: SubstitutionStrategy  # 1:1, n:1, structural-preserving
  dictionary: Map[OriginalTerm, FictionalTerm]
}
```

### Substitution Strategies

1. **1:1 direct substitution**: Each domain term maps to one fictional term. Preserves structure, leaks frequency if adversarial.
2. **Structural preservation**: Preserve arithmetic relationships (if A=2*B and B=3*C, maintain those ratios in fictional space). This is the soybeans→gidgets pattern.
3. **Class-group substitution**: Replace with class representative (all salary values → a randomly sampled value from the same pay band).

### Pipeline

1. **Entity extraction**: Identify domain entities in the query (using NER or schema matching)
2. **Domain classification**: Classify which domain(s) the entities belong to
3. **Substitution**: Apply the domain's substitution dictionary with the appropriate strategy
4. **Integrity check**: Verify the substituted query is structurally coherent and arithmetically consistent
5. **Audit**: Record the substitution in the query receipt (without recording the actual substitution mapping — that is sensitive)

### Privacy Budget Integration

Transliteration should be tracked as a privacy-preserving operation in the privacy budget (per ACM-002). Each substitution reduces the remaining privacy budget for that query session.

## Implementation Notes

- The substitution dictionary must never leave the on-prem Entif box
- The fictional domain values should be semantically plausible to the external LLM (to preserve query coherence) but meaningless to the provider
- Transliteration is distinct from redaction: redaction removes information; transliteration replaces with structurally equivalent but non-identical information
- For high-sensitivity domains (medical, financial), redaction may be preferred over transliteration; the choice should be configurable per domain and per field

## Open Questions

- How is the substitution dictionary provisioned per enterprise customer? Manual curation? Automated extraction from domain corpora?
- Does transliteration preserve enough semantic context for the external LLM to answer correctly? The soybeans→gidgets example works for arithmetic; does it work for complex relational queries?
- Is there a risk that the fictional terms are still recognizable as fictional (e.g., "quatloo" is obviously not a real unit), reducing the LLM's answer quality?
- Should transliteration apply to both the query AND the response? If the external LLM returns a value, does Entif re-translate back to original domain units?

## Related Issues

- ACM-002 (transliteration correlation leakage) — joint-distribution constraints are a follow-on requirement for the same transliteration mechanism
- ACM-001 (composite cache key) — cache keys must not include transliterated values (since the substitution is non-deterministic), only original domain + substitution context
