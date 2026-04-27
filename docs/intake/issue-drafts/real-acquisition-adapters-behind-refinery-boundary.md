# Add real acquisition adapters behind the refinery boundary

Issue draft id: `real-acquisition-adapters-behind-refinery-boundary`
Priority: `P1`
Effort: `L`
Labels: `ingress-refinery`, `adapters`, `source-registry`
Status: `deferred`

## Deferral Note

Overlaps TC-007 and should wait until TC-005 promotion outputs and TC-006 storage/retrieval boundaries are explicit.

## Problem

The current refinery is parse-only and demo-backed; Text-Core needs real text-source families while preserving parse-only safety.

## Scope

- Implement one or two bounded read-only text acquisition adapters first.
- Route adapter output through existing source record, manifestation, normalization, and receipt paths.
- Keep network and side-effect behavior explicit and guardable.

## Acceptance Criteria

- [ ] At least one real adapter produces source records and manifestations from a local or read-only source.
- [ ] Fetch and normalization receipts are emitted for acquired text.
- [ ] Adapter tests do not require live network by default.

## Source Evidence

- `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`; hash 530e57773eaf: Names real acquisition adapters as the next step after schema/SHACL expansion.
- `docs/handoffs/2026-04-13-bootstrap-handoff.md`; hash 27ff548837e0: Notes real external source adapters are not implemented yet.
- `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`; hash c46da83e0f00: Lists source systems and repository profile expectations.

## Non-Goals

- No bulk corpus import.
- No side-effecting execution adapters.

## Publishing Notes

- Local status: `deferred`
- Active draft path: `docs/intake/issue-drafts/real-acquisition-adapters-behind-refinery-boundary.md`
- Archived draft path: `not archived`
- GitHub issue: `pending`
- Recommended publish command shape: `not applicable; draft deferred`
