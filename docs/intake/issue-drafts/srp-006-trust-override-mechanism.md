# SRP-006: Define trust-override mechanism (who authorizes, what evidence, scope)

## Metadata

| Field | Value |
|---|---|
| Title | SRP-006: Define trust-override mechanism (who authorizes, what evidence, scope) |
| Type | architecture/spec-gap |
| Status | candidate |
| Labels | `source-substrate`, `trust-vector`, `rights`, `governance` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §5 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex (§5) establishes trust defaults by source class (PID authority, curated repository, graph aggregator, funder/library guidance, self-publish platform, moderated forum, standards body) and states that "all are overridable by evidence." The override mechanism is never defined. This is a critical gap: without a defined override mechanism, trust cannot be systematically upgraded or downgraded, and rights-scoped retrieval cannot function reliably.

## Context

§5 establishes the following trust-defaults table:

| Class | Retrieval priority | Citation weight | Automation weight |
|---|---|---|---|
| PID authority / metadata registry | High | Medium | High |
| curated repository | High | High | Medium |
| graph aggregator | High | Medium | High for discovery |
| funder / library repository guidance | Medium | Low for content claims | High for repository selection |
| self-publish platform | Medium | Low to Medium | Low |
| moderated discussion forum | Medium | Low | Low |
| standards body | High | High | High |

These defaults are used by the trust-vector system (per SSP) to assign initial trust scores to ingested records. But §5 explicitly says they are "overridable by evidence" — meaning that a record from a low-trust source can be upgraded if evidence supports it, and a record from a high-trust source can be downgraded if evidence contradicts it.

The override mechanism question has three dimensions:
1. **Authorization**: Who can authorize an override? (operator, automated policy, governance body?)
2. **Evidence**: What evidence is required to justify an override? (receipt chain, attestation, contradiction proof?)
3. **Scope**: Is an override per-record, per-source, per-family, or time-bounded?

## Requirements

1. Define the trust-override authorization model: operator-initiated, automated-policy-initiated, or governance-body-initiated, or some combination.
2. Define the evidence standard for overrides: what makes override evidence sufficient vs insufficient?
3. Define override scope: per-record (single DOI), per-source-instance (specific Dataverse deployment), per-source-family (all Dataverse instances), or time-bounded (until [date] or until revoked)?
4. Override events must emit receipts (consistent with receipt-law): every override is a durable, auditable event.
5. Overrides must be reversible: a later override can revoke a prior one, with full chain preserved.
6. Override history must be queryable: what overrides have been applied to this source/record?

## Scope

- Trust-vector system: implement override mechanism in the trust scoring pipeline
- Receipt structure: `TrustOverrideReceipt` with authorization, evidence, scope, and timestamp
- API: endpoints for requesting, approving, revoking trust overrides
- Governance: define authorization policy for who can initiate overrides at what scope
- Rights: override scope must be compatible with rights-scoped retrieval (a downstream consumer must be able to see that an override was applied)

## Open Questions

1. Should trust overrides require a formal governance proposal (like an ADR) or a lighter-weight evidence submission?
2. Can automated systems initiate overrides (e.g., based on retraction notices from Crossref), or must all overrides be operator-approved?
3. How should the scope of an override interact with inheritance — if a source family override is applied, does it cascade to all sources in that family?
4. Is there a maximum number of overrides per record before the record should be flagged for manual review?

## Depends On

- SRP-002 (source-profile schema — trust overrides apply to source profile fields)
- Trust-vector system (from SSP, PR #1186)
- Write-admission gate (from NOT LAME PRD)

## Blocks

- Rights-scoped retrieval (cannot reliably scope rights without trust override mechanism)
- Any trust-vector implementation that claims to support overridable defaults
