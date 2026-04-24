# Expand pack schemas and SHACL coverage for receipts and source artifacts

Issue draft id: `expand-pack-schemas-and-shacl-source-artifacts`
Priority: `P1`
Effort: `M`
Labels: `schemas`, `shacl`, `receipts`, `source-substrate`

## Problem

The bootstrap slice has minimal conformance output, but pack-level receipt/source artifact shapes need broader, merge-blocking coverage.

## Scope

- Add or extend schemas for receipt bundles, source records, manifestations, trust matrices, and canonical artifacts.
- Expand SHACL emission for the same artifact families.
- Add focused tests for malformed source and receipt artifacts.

## Acceptance Criteria

- [ ] Representative valid receipt/source fixtures pass schema and SHACL checks.
- [ ] Malformed lineage, rights, or provenance fields fail with clear errors.
- [ ] Conformance output remains deterministic and small enough for CLI inspection.

## Source Evidence

- `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`; hash 530e57773eaf: Names this as the first next execution item.
- `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md`; hash 2baec5fab6f5: Makes schema validation, receipt tests, and conformance checks merge-blocking.
- `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md`; hash 2032238a2d2b: Provides source/provenance doctrine for artifact modeling.

## Non-Goals

- No new external acquisition adapters in this issue.

## Publishing Notes

- Local status: `published`
- Active draft path: `archived`
- Archived draft path: `docs/intake/issue-drafts/archive/expand-pack-schemas-and-shacl-source-artifacts.md`
- GitHub issue: `https://github.com/entif-ai/rosetta/issues/42`
- Recommended publish command shape: `not applicable; draft already published`
