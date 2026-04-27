# Define OMC four-zone compaction trigger thresholds

Issue draft id: `omc-four-zone-compaction-thresholds`
Priority: `P2`
Effort: `M`
Labels: `omc`, `compaction`, `cache`, `thresholds`

## Problem

The OMC research spec references token-pressure and cadence-threshold triggers for four-zone compaction, but does not define concrete values or measurement points.

## Scope

Specify trigger thresholds and receipts for compaction decisions in OMC planning.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for four-zone compaction trigger.
- Source spec section cited there: Section 8.3 references token pressure or cadence threshold triggers.

## Specific Findings

### Finding 1: Compaction cannot be tested without thresholds

The extraction identifies a planning gap: compaction behavior is described conceptually, but not as a deterministic decision.

## Acceptance Criteria

- [ ] Define token-pressure inputs and default threshold values.
- [ ] Define cadence-based trigger values.
- [ ] Specify what evidence a compaction receipt must contain.
- [ ] Include at least one fixture scenario for threshold crossing.
