# OB1-003: Contribution Folder Contract CI Not Enforcing metadata.json

## Meta

- **Type:** implementation
- **Severity:** medium
- **Confidence:** high
- **Tags:** governance, ci, contribution-contract, metadata-json, merge-gate
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §9
- **Extracted:** 2026-05-26

## Summary

Section 9 defines merge refusal conditions for non-core contributions: README.md absent, metadata.json absent or invalid, examples missing, acceptance conditions not defined, tool-heavy contribution expands surface without explicit budget note. No current CI validator enforces these conditions.

## Evidence

Section 9 merge refusal conditions defined but not enforced. The contribution folder contract (§2.1) specifies: README.md, metadata.json, acceptance.md, examples/, tests/ for every non-core contribution. REPO_SHAPE_AND_CONSTRAINTS defines the folder contract but CI does not validate contribution-class artifacts against this spec.

## Response Options

1. **Implement:** Add contribution folder contract checker to CI validators
2. **Scope:** Focus on metadata.json schema validation first, then other fields

## Preconditions for Resolution

- CI checks for README.md presence on all contribution-class artifacts
- CI validates metadata.json schema (id, title, kind, version, owner, depends_on, human_summary, agent_hints, status)
- CI checks for examples/ directory presence
- Merge is blocked when contract is violated

## Dependencies

- OB1-001 (tracking gap)
- REPO_SHAPE_AND_CONSTRAINTS (already defines folder contract)

## Labels

`governance` `ci` `contribution-contract`

## Status

open