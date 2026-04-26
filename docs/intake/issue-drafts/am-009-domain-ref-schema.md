# AM-009: Domain Ref Schema — tenant_id, Classification, ABAC Format

## Status

draft — `docs/intake/issue-drafts/am-009-domain-ref-schema.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 2.1, Section 5.1
- **Confidence:** high

## Problem

The spec defines domain as: `domain = tenant_id × classification × ABAC labels × vendor_route(optional)` (Section 2.1). The `domain_ref` (or `domain tags`) field appears in the envelope (Section 5.1). However, no structural schema is provided for any of the four components:

- **tenant_id:** What format? UUID? String? Who assigns it?
- **classification:** What taxonomy? Open vocabulary? Controlled vocabulary? Who governs it?
- **ABAC labels:** Arbitrary key-value pairs? Array of strings? Semicolon-delimited?
- **vendor_route:** Optional string? Format unspecified.

Without a formal schema:
- Domain matching at validation (Section 5.2: "verify sender is authorized for domain") cannot be automated
- Cross-domain authorization decisions cannot be made programmatically
- The "cross-domain reuse forbidden" rule (Section 2.1) cannot be enforced without a domain comparison algorithm
- Multi-tenancy isolation cannot be verified

## Evidence

> "domain = tenant_id × classification × ABAC labels × vendor_route(optional)" — Section 2.1 (formula only, no schema)

> "domain_ref (or domain tags)" — Section 5.1 (no format specified)

> "Verify sender is authorized for domain" — Section 5.2 Step 5 (cannot be automated without schema)

## Required Deliverables

1. `tenant_id` format: UUID v7 (recommended for time-ordering and uniqueness)
2. `classification` taxonomy: closed enum (e.g., `public`, `internal`, `confidential`, `restricted`) with governance for additions
3. `abac_labels` format: array of strings in `key:value` format (e.g., `["role:admin", "team:infra", "env:prod"]`) or structured object — decide and document
4. `vendor_route` format: string, optional, dot-separated (e.g., `vendor.aws.us-east-1`)
5. `domain_ref` composite format: how are the four components assembled into a single string or object? (recommend: structured object, not concatenated string)
6. Domain comparison algorithm: exact match? Subset match? (e.g., does `tenant_id + internal + role:infra` authorize for `tenant_id + internal`?)
7. Authorization rule: "cross-domain reuse forbidden" — formalize as: a sender's authorized domains must be an exact match or explicit whitelist for cross-domain use

## Acceptance Criteria

- [ ] `domain_ref` JSON Schema defined
- [ ] Tenant, classification, ABAC, and vendor_route components are each independently specifiable
- [ ] Domain authorization check (Section 5.2 Step 5) is automatable
- [ ] "Cross-domain reuse forbidden" is formally defined and enforceable
- [ ] Multi-tenant isolation can be verified by audit

## Dependencies

- AM-001 (domain_ref field must be in the envelope schema)
- Multi-tenancy requirements from NOT LAME PRD (if any)

## Labels

`agentic-messaging`, `security`, `multi-tenancy`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 2.1, 5.1, 5.2
- Related: AM-001 (envelope schema), multi-tenancy
