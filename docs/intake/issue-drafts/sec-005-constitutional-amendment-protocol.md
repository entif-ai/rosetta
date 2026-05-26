# SEC-005: Constitutional amendment protocol not defined in Bootstrap

## Type
`spec-gap`

## Problem

The Secure Architecture Companion Paper defines a Genesis Protocol requiring M-of-N multisig human authorization for any changes to the constitutional rules. The current Rosetta Bootstrap defines constitutional storage (Git), but has no explicit protocol for how those rules are changed. Without an explicit amendment protocol, the Genesis Protocol design is incomplete.

## Evidence

From `docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md`, Section 3:

> "The Genesis Protocol is Entif's inviolable constitution... multi-signature (multi-sig) scheme where the authority is split among a group of trusted human overseers... e.g., 5-out-of-7 signing keys required to approve any Genesis-level change"

From `docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md`: anti-personhood-correlation is a constitutional constraint requiring explicit prohibition language. How that constraint gets added post-Bootstrap is undefined.

## Acceptance Criteria

- [ ] Define constitutional amendment protocol: proposal → review period → M-of-N multisig approval → state hash chain update
- [ ] Document which rules are "immutable by design" vs. "amendable by multisig"
- [ ] Map against Git signed commits + GitOps workflow as concrete OSS implementation of immutable genesis
- [ ] Constitutional hard-stops (safety-critical rules that require unanimous consent to modify) identified
- [ ] Bootstrap docs updated to reference the amendment protocol

## Priority
`P1`

## Labels
`genesis`, `governance`, `bootstrap`, `constitutional`

## Depends On
None (can proceed in parallel with SEC-001)
