# TXS-001: Rosetta DocID Registry Implementation

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `rosetta`, `documentation`, `registry`, `governance`
**Depends on:** none

## Problem Statement

ROCK-3001–3099 document registry exists as prose in `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md` with a markdown table and mermaid dependency graph. No machine-readable registry file (e.g., `doc-registry.json`, `doc-registry.yaml`) currently exists in the repository. DocID-to-URI mapping, file naming conventions, and stability rules are described in prose but not enforced by tooling.

## Specific Findings

- **F-TXS-011** (confidence: high): 11 DocIDs (ROCK-3001–3010, ROCK-3099) defined with titles, scopes, types, dependencies, and aligned standards — all in prose table
- **F-TXS-012** (confidence: high): DocID-to-URI mapping described (`https://spec.rosetta.org/ROCK-XXXX`) and file naming convention described (`ROCK-XXXX_Title_vX.X.X.ext`) — not encoded in tooling
- **F-TXS-013** (confidence: high): Machine-readable dependency adjacency list exists in prose but no JSON/YAML equivalent for tooling consumption
- **F-TXS-014** (confidence: high): Governance rules for DocID stability (patch-level errata vs. new DocID) described but not formalized as a policy file

## Action Required

1. Create `docs/rosetta/doc-registry.json` (or YAML) enumerating all 11 DocIDs with: id, title, scope, type (Normative/Informative/Artifact), dependencies[], alignedStandards[], version
2. Add DocID-to-canonical-URI mapping (e.g., `https://spec.rosetta.org/ROCK-{id}`)
3. Add file naming convention enforcement to `scripts/` or CI
4. Create `docs/rosetta/doc-governance.md` formalizing DocID stability rules
5. Consider a `scripts/validate-doc-registry.mjs` that checks: no duplicate DocIDs, all dependencies reference existing DocIDs, all referenced external standards have a citation
