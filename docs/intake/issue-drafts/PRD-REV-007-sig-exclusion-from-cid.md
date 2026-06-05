# Issue Draft — PRD-REV-007: Implement SIDL sig-exclusion-from-CID rule in receipt bundling

## Title

PRD-REV-007: Implement SIDL sig-exclusion-from-CID rule in receipt bundling

## Type

bug

## Labels

rrp-rule, cid-computation, receipt-bundling

## Depends On

PRD-REV-003

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "the signature hashing rule that excludes sig from CID computation and signs the CID or stable multihash commitment"

## Description

The RRP bundle rule for signature hashing:
1. The `sig` field must be **excluded** from CID computation
2. What gets signed is the CID (or stable multihash commitment) of the content, NOT the signed content itself
3. This ensures the signature is over the immutable content address, not over content that includes the signature

This is a critical security property: if the signature were included in the CID computation, an attacker who could add a signature could change the CID, making it a different content address entirely. By excluding `sig` from CID computation, the CID stable refers to the unsigned content, and the signature binds to that stable address.

This must be enforced in:
- `rosetta-cid` CID generation for receipts
- Receipt bundling in `rosetta-tapestry`
- Verification logic in the receipt bundle reader

## Proposed Action

- Document the SIDL sig-exclusion-from-CID rule in the RRP spec
- Add test case: sign content → verify CID unchanged vs signed version
- Add test case: tamper sig → verify CID unchanged ( tamper detection is via signature, not CID mismatch)
- Add CI test that CID(content_with_sig) ≠ CID(content_without_sig) for receipts
