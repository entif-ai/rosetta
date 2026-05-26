# TRIP-003: Federated Cross-Org Validator Pool Registry and Communication Protocol

## Metadata

- **Type**: architecture
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, federated-pools, cross-org, interop
- **Depends on**: TRIP-001, TRIP-002

## Problem Statement

Single-organization validator pools are vulnerable to:
- Insufficient size / diversity (small pool → rubber-stamping)
- Collusion within the org
- Geographic or cultural blind spots
- Coverage gaps during off-hours across time zones

Federated cross-organization validator pools address all of these.

## Proposed Solution

### Federation Registry

Each member organization maintains a signed manifest of its eligible validators:
```
ValidatorManifest {
  org_id: string,
  timestamp: ISO8601,
  validators: [
    {
      validator_id: string,
      attestation: AttestationRecord,
      domains: string[],         // e.g., ["mental_health", "fraud", "legal"]
      public_key: string,
      last_renewal: ISO8601
    }
  ],
  signature: org_signing_key
}
```

Manifests are published to a shared registry (can be decentralized: ENS, IPFS + DID, or a dedicated service).

### Shared Protocol Standards

All federated pools agree on:
1. Minimum qualification bar for validator entry
2. Selection algorithm (TRIP-002 implementation)
3. Blinding/anonymization protocol for vote aggregation
4. Quorum size and threshold for their domain
5. Communication channel (mTLS or equivalent)
6. Conflict-of-interest rules (e.g., validators from same org as event originator are excluded from that event)

### Cross-Org Selection

When an event triggers in Org A:
1. Org A requests cohort from federation registry
2. Registry VRF-selects from: N from Org A's local pool + (quorum_size - N) from federated partners
3. Or: all from global pool if Org A opts into full federation
4. Selected validators receive encrypted envelopes via secure channel
5. Votes aggregated without any org knowing who responded

### Cross-Org Incentives

- Validators from partner orgs receive: cross-platform reputation badges, micro-payments, or reciprocal review credit
- Pool participation incentivizes/orgs with reciprocal coverage (e.g., EU orgs covering APAC off-hours)
- Fraudulent or malicious validators shared (securely) across orgs for rapid blacklisting

### Dispute Resolution

If quorum disagreement or cross-cultural dispute:
- Escalation to "meta-panel" — broader, more diverse representation, including neutral third parties
- Final recourse: legal arbitration if required

## Implementation Notes

- **Registry location**: `src/ethics/federation/registry.mjs`
- **Protocol standard**: Define once; reuse across all federation members
- **Inter-pool comms**: Mutual TLS (mTLS) with client certificates per validator
- **Manifest format**: JSON Schema with JWS signatures
- **Minimum for federation**: Need at least 3 orgs with 20+ validators each for meaningful cross-selection

## Acceptance Criteria

1. Each org can publish its validator manifest with valid org signature
2. Federation registry can be queried for current eligible validators
3. Cross-org selection uses VRF (TRIP-002) across combined pool
4. No single org can determine who else is in the quorum before votes are aggregated
5. Votes are aggregated using threshold crypto; only quorum result is revealed
6. Cross-org validator incentives tracked (badge or credit ledger per org)
7. Test cases: cross-org selection, conflict-of-interest filtering, manifest refresh

## Dependencies

- TRIP-001 (envelope format)
- TRIP-002 (VRF selection)
