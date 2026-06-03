# CRT-003: Personhood Provenance Receipt Vocabulary — 10 New Typed Receipt Families

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** rpp, receipts, personhood-provenance, vocabulary, typed-receipts, rrp-identity
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Governance Addendum §6)
- **Extracted:** 2026-06-01

## Summary

The Governance Addendum proposes 10 new typed receipt families for identity-sensitive operations. These must be formally defined as RPP receipt schemas, integrated into the existing RRP receipt framework, and covered by conformance test harnesses. Currently no such receipts exist in the receipt vocabulary.

## Evidence

From Governance Addendum §6, the 10 required receipt families:

1. `rrp:identity.feature_extraction` — binds: operation type, subject/pseudonymous handle, feature classes, input provenance, policy reference, authorization chain, verification outcome, disclosure obligations, retention/expiry, export restrictions
2. `rrp:identity.correlation` — same binding for cross-corpus or cross-context identity linkage operations
3. `rrp:person_model.creation` — for person-model creation events
4. `rrp:person_model.update` — for material updates to existing person models
5. `rrp:person_model.similarity_assessment` — for assessments of similarity between output and a protected person signature
6. `rrp:simulation.authorization` — for authorization of high-fidelity simulation of a living person
7. `rrp:simulation.disclosure_attestation` — for attestation that required simulation disclosures were attached
8. `rrp:impersonation.risk_assessment` — for risk scoring of impersonation similarity
9. `rrp:identity.export_authorization` — for authorization of person-model artifact export
10. `rrp:predictive_manipulation.block` — for records of blocked predictive manipulation workflows

Each receipt must bind the required fields as specified in §6.

## Implementation Requirements

### Schema Definition
For each receipt family:
- Define JSON schema or equivalent with required/optional field specifications
- Specify binding requirements per §6: operation type, subject handle, feature classes, provenance basis, policy profile, authorization chain, verifier outcome, disclosure state, retention/expiry, export restrictions
- Define protected pseudonymous reference format for cases where full subject exposure creates unacceptable risk

### Integration
- Add to existing RRP receipt framework (ROCK-31XX §receipts)
- Ensure backward compatibility with existing receipt types
- Emit from appropriate layer: Guard for authorization/rejection receipts; RPP Lens for identity-risk notes; Bundle Builder for disclosure attestations

### Test Coverage
- Positive path: valid identity-sensitive op produces correct typed receipt
- Negative path: missing required fields produces validation failure
- Pseudonymous subject handling: verify auditable reconstruction without exposing raw identity

## Dependencies

- RRP receipt framework (ROCK-31XX existing receipts) — must be understood before extension
- CRT-002 (conformance tiers): RRP-Identity-Auditor requires these receipts to reconstruct authorization chains
- CRT-011 (predictive manipulation block): blocked until this vocab is defined

## Response Options

1. **Define as RPP spec patch** — Add receipt schemas to ROCK-31XX normative section; coordinate with RRP spec owners
2. **Separate RPP-Identity receipt spec** — Define in isolation first, then reference from ROCK-31XX; cleaner review path
3. **Start with highest-risk receipts first** — Define rrp:person_model.creation, rrp:simulation.authorization, rrp:predictive_manipulation.block first; defer lower-risk correlation/similarity receipts
