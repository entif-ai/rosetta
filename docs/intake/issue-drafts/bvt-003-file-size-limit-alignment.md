# BVT-003: Align File-Size Limits with Existing Architectural Constraints

## Type
architecture

## Summary

Berman's Vibe Coding Rules enforce a hard ceiling of 300 lines per file: "Keep files under 300 lines of code; refactor when approaching this limit." Rosetta currently has no documented file-size limit for source files, packs, or modules. This finding checks whether existing Rosetta specs (Nx workspace, pack contracts, ROCK-3111-C RRPs) already define size/complexity constraints that should be reconciled with this rule.

## Evidence

**Berman rule:** "Keep files under 300 lines of code; refactor when approaching this limit."

**Rosetta pack structure (from CONCEPT_INDEX and prior extractions):**
- Pack files are content-addressed artifacts with manifest contracts (ROCK-3111-C RRPs)
- Nx workspace enforces module boundaries but not file size
- No explicit line-count or file-size limit in current spec documentation

**Prior related finding (from ROCK-3111-C extraction):**
- "Refinement-first rule: each pack refines its predecessor without tearing down the contract" — suggests incremental growth but no size ceiling
- "Conformance testing enforces the filesystem contract" — focuses on structure, not content size

**Other references:**
- Berman-PRD mentions "14 databases, cron-log, logs" as part of the workspace state, but no file-size guidance
- BOOTSTRAP_EXECUTION_TRACK has no file-size constraints documented

## Finding

No explicit file-size limit exists in current Rosetta specs. Berman's 300-line rule is not reflected in any architectural constraint document.

## Options

1. **Adopt Berman's 300-line ceiling** — add to REPO_SHAPE_AND_CONSTRAINTS.md as an explicit design constraint. Enforce via lint rule (e.g., ESLint max-lines or similar).

2. **Define a Rosetta-specific ceiling** — research existing pack/module sizes in the codebase, set a data-driven limit (e.g., 500 lines for source files, 200 for configs), document rationale.

3. **No hard ceiling, enforce via review** — file size is a code review concern, not a hard constraint. Receipt-chain includes review sign-off but no automated lint.

4. **Supersede: packs/files are content-addressed by hash — size is irrelevant to the protocol** — content-addressed artifacts don't need size limits; complexity management is handled by pack boundaries and module encapsulation.

## Recommendation

Option 4 is architecturally correct for content-addressed artifacts. However, source files (TypeScript, YAML, etc.) that are NOT content-addressed artifacts should have a documented size limit. Recommend option 1: adopt the 300-line ceiling for non-artifact source files and add it to REPO_SHAPE_AND_CONSTRAINTS.md. This aligns with Berman's discipline and supports code reviewability.

**Labels:** architecture, constraints, composability

**Status:** open

**Created:** 2026-06-05

**Source:** docs/external/Berman - Vibe Coding Rules.txt (Berman Vibe Coding Rules extraction, 2026-06-05)

**Related:** REPO_SHAPE_AND_CONSTRAINTS.md, ROCK-3111-C-RRP-Pack-Filesystem-Contract