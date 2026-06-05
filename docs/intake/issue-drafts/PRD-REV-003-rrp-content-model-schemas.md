# Issue Draft — PRD-REV-003: Adopt RRP content model in rosetta.receipt and rosetta.tapestry schemas

## Title

PRD-REV-003: Adopt RRP content model in rosetta.receipt and rosetta.tapestry schemas

## Type

implementation

## Labels

rrp-content-model, receipt-schema, tapestry-schema

## Depends On

PRD-REV-001

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "RRP content model wins over generic receipts: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig`"

> "the signature hashing rule that excludes sig from CID computation and signs the CID or stable multihash commitment"

This supersedes any generic loose receipt/tapestry schemas from earlier runs.

## Description

The RRP content model for receipts uses a structured shape that includes:

- `subjects` — the entities the receipt concerns
- `claims` — what is being attested
- `digests` — content integrity hashes
- `policy_refs` — references to applicable policy
- `nonce` — replay protection
- `auth` — authorization metadata
- `sig` — signature object (excluded from CID computation)

The `rosetta.tapestry` receipt-bundle uses a profile (`rrp:tapestry.profile.receipt_bundle`) with `roots` (receipt CIDs) and `members` (all constituent CIDs).

Key implementation rules:
1. The `sig` field must be excluded from CID computation (SIDL rule)
2. The CID or stable multihash commitment is what gets signed
3. Receipt bundles must export `rrp:tapestry.profile.receipt_bundle` profile
4. Closure policy is `rrp.bundle.closure.v0`

This affects ROCK-3111-C which defines the formal schema specs.

## Proposed Action

- Update `rosetta.receipt` schema to RRP content model
- Update `rosetta.tapestry` schema to RRP receipt-bundle profile
- Implement SIDL sig-exclusion-from-CID rule in CID computation
- Add tamper-negative test vectors
- Align with ROCK-3111-C schema requirements
