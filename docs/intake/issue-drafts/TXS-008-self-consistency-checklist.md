# TXS-008: Self-Consistency Checklist for Rosetta Profile Implementers

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `profiles`, `conformance`, `self-check`, `testing`
**Depends on:** TXS-004-schema-pack-artifact

## Problem Statement

ROCK-3005 Conformance & Compliance Profiles promises a "Self-Consistency Checklist" for implementers of the four profiles (Light, Full, Auditor, Forge). SHACL-based test cases are described as the validation mechanism. Neither the checklist nor the SHACL shapes exist. Implementers have no way to self-certify against a profile.

## Specific Findings

- **F-TXS-022** (confidence: high): Four profiles with SHACL-based test cases and a "Self-Consistency Checklist" — described in ROCK-3005 but not written
- **F-TXS-011** (confidence: high): ROCK-3005 is part of the normative standards track but is incomplete without the checklist
- **F-TXS-015** (confidence: high): JSON Schema and SHACL are the machine-readable compliance formats

## Action Required

1. Write human-readable `docs/profiles/checklist-light.md`, `checklist-full.md`, `checklist-auditor.md`, `checklist-forge.md` — each with MUST/SHOULD items grouped by tile category
2. Generate SHACL shapes for each profile: `schema/profiles/shapes-light.ttl`, etc. — SHACL constraints that validate a tile stream against profile requirements
3. Create `scripts/run-profile-check.mjs profile-name tile-stream-file` that runs SHACL validation and outputs a compliance report
4. Define what "Self-Consistency" means: internal tile coherence (no contradictory constraints), referential integrity (all referenced DocIDs exist), profile ordering (Forge ⊇ Full ⊇ Light)
5. Write a self-certification HOWTO: how an implementer uses the checklist + SHACL to claim compliance with a profile
