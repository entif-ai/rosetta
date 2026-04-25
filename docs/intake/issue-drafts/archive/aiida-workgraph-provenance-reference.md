# Catalog AiiDA-WorkGraph as a provenance reference architecture

Issue draft id: `aiida-workgraph-provenance-reference`
Priority: `P3`
Effort: `S`
Labels: `provenance`, `workflow`, `reference-architecture`, `docs-intelligence`

## Problem

AiiDA-WorkGraph auto-generates provenance graphs from task wiring. That pattern is relevant to Rosetta's receipt law, but it should be catalogued as a reference architecture rather than mistaken for a system Rosetta should directly adopt.

## Scope

Record the specific WorkGraph provenance behaviors worth comparing against Rosetta receipts, transform receipts, and future tapestry visualization.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-25-aiida-workgraph.md` - Issue Candidates row: "AiiDA-WorkGraph provenance pattern as Rosetta receipt-law reference architecture."
- `docs/external/AiiDA-WorkGraph.md` - Automatic data provenance and provenance graph claims.

## Acceptance Criteria

- [ ] Identify which WorkGraph provenance behaviors map to Rosetta receipt-law concepts.
- [ ] Mark WorkGraph as external reference material, not an implementation dependency.
- [ ] Link any future issue back to the AiiDA extraction artifact.
