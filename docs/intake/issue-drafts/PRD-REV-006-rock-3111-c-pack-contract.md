# Issue Draft — PRD-REV-006: Formalize ROCK-3111-C as RRP Pack Filesystem Contract RFC

## Title

PRD-REV-006: Formalize ROCK-3111-C as RRP Pack Filesystem Contract RFC

## Type

rfc

## Labels

rock-3111-c, rrp-pack, pack-filesystem-contract

## Depends On

—

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

The synthesis doc produces a draft spec for ROCK-3111-C: RRP Pack Filesystem Contract v0.1.0.

Key elements:
- Pack root: `packs/rrp/`
- Required files: `pack.json`, `CHANGELOG.md`, `README.md`, schemas, SHACL shapes, vocab, test vectors, examples
- Required exports for schema, SHACL, vocab, test vectors
- cid_profile = "sha2-256-multihash-base58btc"
- Three conformance tiers: RRP-Light, RRP-Full, RRP-Auditor
- Filesystem rules: schemas immutable once published; new semantics via vocab/shapes not core redefinition; test vectors need positive + tamper-negative

## Description

ROCK-3111-C is the missing bridge between "we have RRP ideas" and "the repo knows exactly how to lay them down." This doc proposes a concrete filesystem contract for RRP packs that:

1. Defines the required directory structure under `packs/rrp/`
2. Specifies the required `pack.json` fields with types
3. Enumerates required exports (schema, SHACL, vocab, test vectors)
4. Defines three conformance tiers with gradated requirements
5. Establishes filesystem immutability rules for published schemas
6. Mandates tamper-negative test vectors for any bundle claiming "verified"

## Proposed Action

- Formalize the draft ROCK-3111-C spec into a proper RFC document at `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.1.0.md`
- Align required files with existing `packs/` structure in the repo
- Add formal CID profile definition
- Define three conformance tiers in detail
- Create the required test vectors
