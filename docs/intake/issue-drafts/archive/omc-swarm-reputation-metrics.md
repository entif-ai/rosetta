# Define OMC swarm reputation metrics

Issue draft id: `omc-swarm-reputation-metrics`
Priority: `P3`
Effort: `M`
Labels: `omc`, `swarm`, `reputation`, `metrics`

## Problem

The OMC research spec says swarm reputation should rely on repeatable utility and low drift rather than popularity, but does not define those metrics.

## Scope

Create operational reputation metrics for future swarm coordination.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for swarm reputation.
- Source spec section cited there: Section 11.3 says use provenance/proof rather than popularity.

## Specific Findings

### Finding 1: Reputation terms need measurable definitions

The extraction identifies "repeatable utility" and "low drift" as important but not measurable yet.

## Acceptance Criteria

- [ ] Define repeatable utility as a measurable signal.
- [ ] Define low drift as a measurable signal.
- [ ] Define minimum provenance required for reputation updates.
- [ ] Add fixture examples for positive and negative reputation changes.
