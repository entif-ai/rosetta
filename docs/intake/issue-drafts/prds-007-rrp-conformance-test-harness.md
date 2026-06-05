# PRDS-007: RRP Conformance Test Harness for CI

## Summary

ROCK-3111-C defines three conformance tiers (RRP-Light, RRP-Full, RRP-Auditor) but no automated test harness is specified to validate conformance. Without automated CI gates, conformance is aspirational rather than enforced.

## Problem

The three conformance tiers imply different levels of compliance:
- **RRP-Light**: minimal receipt format compliance
- **RRP-Full**: full receipt + tapestry + SHACL validation
- **RRP-Auditor**: cryptographic signature verification + audit trail completeness

But there is no automated test harness that:
1. Loads a pack's test vectors
2. Validates each receipt against the RRP schema
3. Validates each tapestry bundle against SHACL shapes
4. Verifies cryptographic signatures (RRP-Auditor only)
5. Reports conformance tier achievement per package

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "New work product 2: ROCK-3111-C draft"
- Quote: "Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor"
- Quote: "Filesystem rules: ... test vectors MUST include at least one positive and one tamper-negative case"

## Criteria for Closing

- [ ] Test harness exists at `tools/rrp-conformance/` or similar
- [ ] Harness accepts a pack path and conformance tier as input
- [ ] Harness validates receipts against `receipt-content.schema.json`
- [ ] Harness validates tapestries against SHACL shapes
- [ ] Harness runs tv1 and tamper-negative vectors
- [ ] RRP-Auditor mode includes signature verification
- [ ] Harness exits non-zero if any conformance check fails
- [ ] Harness is integrated as a CI gate for pack publication
- [ ] Existing packs (rrp, and any future packs) validated through harness

## Labels

rrp, conformance, ci, test-harness

## Depends On

PRDS-002 (ROCK-3111-C formalization), PRDS-004 (test vector coverage)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
