# Issue Draft: PPN-010 — Governance Log: Personhood Provenance Event Class

## Metadata

- **Type**: governance-log, audit, personhood-provenance
- **Status**: draft
- **Source doc**: `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`
- **Extraction**: `docs/intake/docs-intelligence/2026-05-31-rosetta-governance-addendum-personhood-provenance-cognitive-twin-risk.md`
- **Labels**: governance-log, audit, personhood-provenance, events
- **Confidence**: medium

## Problem Statement

The governance log currently has no event class for personhood provenance auditable events. The addendum requires recording creation, update, acceptance, revocation, and export attempts for person models and identity-sensitive signatures as separate auditable events. Without this, authorized reviewers cannot reconstruct the full person-model lifecycle.

## Evidence

From "Architecture Hooks / Governance Log":

> "Record creation, update, acceptance, revocation, and export attempts for person models and identity-sensitive signatures as separate auditable events."

## Required Actions

1. Define new governance log event class for personhood provenance
2. Define event types:
   - `person_model.created`
   - `person_model.updated`
   - `person_model.accepted` (accepted into production use)
   - `person_model.revoked`
   - `person_model.export_attempted`
   - `person_model.export_denied`
   - `person_model.export_approved`
   - `identity_fingerprint.created`
   - `identity_fingerprint.used`
   - `simulation.authorized`
   - `simulation.disclosed`
   - `default_deny.triggered` (for identity-sensitive ops)
   - `policy.relaxation_declared`
3. Define event schema with required fields (operator, timestamp, subject handle, policy basis, outcome)
4. Integrate with existing governance log infrastructure
5. Add access controls: authorized reviewers can reconstruct identity → subject mapping
6. Define retention for governance log events (longer than operational data)

## Event Schema Sketch

```json
{
  "eventType": "person_model.created",
  "timestamp": "2026-05-31T18:00:00Z",
  "operator": "principal:op/main/123",
  "subjectPseudonym": "pseudonym:h/abc123",
  "featureClasses": ["stylometric", "temporal_patterns"],
  "policyProfile": "policy:identity/person_model/default",
  "authorizationChain": ["principal:op/main/123"],
  "retentionClass": "P2",
  "outcome": "success",
  "governanceDomain": "personhood_provenance"
}
```

## Dependencies

- PPN-001: Governance domain must define event class authority
- PPN-002: Pseudonymous subject handles needed for event schema
- PPN-003: Guard-layer must emit events when identity-sensitive ops execute
- Existing governance log infrastructure

## Notes

- Governance log events are distinct from RRP receipts (receipts are content-provenance artifacts; governance log events are meta-governance audit trail)
- Access controls for authorized reviewers must be defined — not everyone can map pseudonymous handles to real identities
