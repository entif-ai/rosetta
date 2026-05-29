# OB1-004: OB1 Exclusion List Not Enforced in CI

## Meta

- **Type:** implementation
- **Severity:** high
- **Confidence:** high
- **Tags:** governance, ci, ob1-exclusions, architectural-boundary
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §7
- **Extracted:** 2026-05-26

## Summary

Section 7 defines an explicit exclusion list of items that must NOT be imported from OB1: (1) central "thoughts table" gravity as constitutional model; (2) storage stack as mandatory law; (3) MCP edge-function assumptions as mandatory; (4) license-sensitive direct code/text transplantation; (5) any ontology that displaces Rosetta/ROCK pack law. This exclusion list has no automated enforcement.

## Evidence

Section 7 explicit exclusion list. No lint, no CI check, no architectural boundary enforcement exists for these items. An agent or contributor could inadvertently import OB1 ontology or storage assumptions without detection.

## Response Options

1. **Implement:** Add OB1 exclusion lint rule to CI validators
2. **Scope:** Create a simple deny-list check for known-exclusion terms/phrases from OB1

## Preconditions for Resolution

- CI lint exists for the 5 OB1 exclusion categories
- Architectural boundary documentation references the exclusion list
- New contributors are informed of the exclusion via CONTRIBUTING.md

## Dependencies

- OB1-001 (tracking gap)

## Labels

`governance` `ci` `ob1-exclusions`

## Status

open