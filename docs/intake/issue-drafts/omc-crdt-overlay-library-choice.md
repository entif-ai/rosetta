# Select CRDT strategy for OMC mutable overlays

Issue draft id: `omc-crdt-overlay-library-choice`
Priority: `P2`
Effort: `M`
Labels: `omc`, `crdt`, `distributed-state`, `infrastructure`

## Problem

The OMC research spec requires CRDT behavior for mutable overlays, but does not choose a library, data model, merge boundary, or persistence contract.

## Scope

Choose or defer the CRDT implementation strategy for mutable overlays. Keep this scoped to the overlay layer; do not imply core Rosetta storage is already implemented.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for CRDT implementation choice.
- Source spec section cited there: Section 6.4 requires CRDT for mutable overlays.

## Specific Findings

### Finding 1: Merge semantics are required before implementation can be assigned

The extraction flags that no concrete CRDT library or merge policy is named, which blocks reliable agent handoff.

## Acceptance Criteria

- [ ] Compare candidate approaches or libraries against local-first, auditability, and TypeScript support.
- [ ] Define the overlay data shape that must be mergeable.
- [ ] Define how conflicts emit receipts or review artifacts.
- [ ] Mark the chosen approach as experimental or accepted.
