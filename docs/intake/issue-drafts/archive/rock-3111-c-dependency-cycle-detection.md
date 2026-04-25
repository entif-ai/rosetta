# Pack dependency cycle detection not specified

Issue id: `rock-3111-c-dependency-cycle-detection`
Priority: `P2`
Effort: `M`
Labels: `packs`, `dependencies`, `validation`, `cycles`

## Problem

RRP packs declare dependencies via `depends_on` using `doc_id` references. The contract doesn't specify how cycle detection works — a pack A depending on B and B depending on A would create a circular dependency that could break resolution, promotion, or rendering.

## Source Evidence

- `docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md` — Section 6: depends_on uses doc_id but no cycle detection mechanism described
- Project Board Suggestions in extraction notes: "all nine actions are independently actionable by separate agents" — but circular deps between actions aren't addressed

## Specific Findings

### Finding 1: No cycle detection in spec
The depends_on field is documented but there's no mention of validating for circular dependencies before a pack is certified or promoted.

**Recommended action:** Add a cycle detection step to the pack certification process. Algorithm: build a directed graph of doc_id dependencies, run Tarjan's algorithm or similar to detect strongly connected components, flag any pack in a cycle as non-promotable.

### Finding 2: Self-referential depends_on not blocked
A pack could declare `depends_on` with its own doc_id, creating an immediate self-loop. This should be a validation failure, not a runtime error.

**Recommended action:** Add a self-reference check to the validator: if doc_id in depends_on matches the pack's own id, fail validation immediately.

## Acceptance Criteria

- [ ] Cycle detection algorithm is defined in RRP spec
- [ ] Self-referential depends_on fails validation
- [ ] Validator can handle deep dependency chains (100+ packs)
- [ ] Cycle detection runs as part of pack certification, not just at promotion

## Related Issues

- Related: rock-3111-c-refinement-enforcement (both require validator tooling)

## Status

candidate (from PR #37 extraction)