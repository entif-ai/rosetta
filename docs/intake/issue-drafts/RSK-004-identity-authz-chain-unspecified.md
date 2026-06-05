# RSK-004: Identity.* Packs — No Authorization Chain Specification

## Metadata
- **Issue:** RSK-004
- **Priority:** P1
- **Confidence:** high
- **Source:** docs/intake/docs-intelligence/2026-06-05-email-driven-security-defenses.md

## Boundary
Artifact is issue-draft output for planning. Not final specification.

## Problem

The identity-sensitive workflow specification requires:
- elevated authorization
- named policy attestation
- HITL or multi-party approval
- retention/export controls

However, it does not specify:
- what constitutes valid authorization (which authority signs, which key is trusted)
- how policy signatures are validated (which trust root, which verification algorithm)
- what the approval workflow looks like operationally (who approves, how, what triggers escalation)
- how the governance log integrates with the receipt system
- what happens when authorization is contested or absent

Default-deny without a concrete authorization chain is not implementable.

## Impact

The identity.* pack family (identity.classification, identity.correlation, identity.person_model, identity.simulation, identity.export_controls) cannot function without a defined authorization chain. Operations requiring elevated authorization will fail or be blocked arbitrarily. This is a hard dependency for all Lane 3 (identity-sensitive provenance) workflows.

## Suggested Approach

1. Define authorization model: who/what can authorize identity-sensitive operations (human principals, roles, multi-sig thresholds)
2. Specify policy signature format: which scheme (EdDSA, ECDSA), which key hierarchy, which trust root
3. Design approval workflow: reviewer assignment, notification, timeout, escalation, override conditions
4. Define governance log integration: how incidents and policy override events are recorded and linked to receipts
5. Specify contestability path: how subjects can challenge correlation results or person-model inferences
6. Add rrp:identity.authorization_chain receipt family to trace authorization decisions

## Related
- F10, F7
- gov.identity policy profiles
- identity.person_model, identity.simulation packs
- rosetta.governance_log module