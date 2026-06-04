# PRDS-004: RRP Test Vector Coverage — tv1 and Tamper-Negative Vectors Unspecified

## Summary

The ROCK-3111-C draft lists `test-vectors/tv1.hash-input.json`, `tv1.expected.json`, and `tv1.tampered.json` as required files, but the actual test vector content is not defined anywhere. The tamper-negative vectors are also referenced but not specified. Without test vectors, RRP conformance cannot be validated.

## Problem

ROCK-3111-C requires that "test vectors MUST include at least one positive and one tamper-negative case" but provides no actual content. TV1 presumably tests the JCS/CID canonicalization, but:
- What is the exact input to TV1?
- What is the expected canonical output?
- What specific tampering (mutated field, reordered keys, extra whitespace) does `tv1.tampered.json` test?

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "New work product 2: ROCK-3111-C draft"
- Required files listed: `test-vectors/tv1.hash-input.json`, `tv1.expected.json`, `tv1.tampered.json`
- Requirement: "test vectors MUST include at least one positive and one tamper-negative case"

## Criteria for Closing

- [ ] `packs/rrp/test-vectors/tv1.hash-input.json` contains a valid receipt content object as JCS input
- [ ] `packs/rrp/test-vectors/tv1.expected.json` contains the expected CID/hash output
- [ ] `packs/rrp/test-vectors/tv1.tampered.json` contains a mutated version that must produce a different CID
- [ ] Tamper-negative test documents which specific field was changed
- [ ] CI test exists that verifies tv1.expected matches canonicalization of tv1.hash-input
- [ ] CI test exists that verifies tv1.tampered produces a different CID than tv1.hash-input

## Labels

rrp, test-vectors, conformance, ci

## Depends On

PRDS-002 (ROCK-3111-C formalization)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
