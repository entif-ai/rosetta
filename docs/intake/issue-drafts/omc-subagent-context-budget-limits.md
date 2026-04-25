# Define OMC sub-agent context budget limits by layer

Issue draft id: `omc-subagent-context-budget-limits`
Priority: `P2`
Effort: `M`
Labels: `omc`, `context-budget`, `routing`, `subagents`

## Problem

The OMC research spec describes an L1/L2/L3 context budget hierarchy, but does not set concrete token limits or escalation rules.

## Scope

Turn the context budget hierarchy into enforceable agent-handoff limits for planning and future tooling.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for sub-agent context budget limits.
- Source spec section cited there: Section 8.4 describes budget hierarchy but no concrete token limits per layer.

## Specific Findings

### Finding 1: Budget hierarchy lacks numbers

Agents cannot reliably decide whether to summarize, split, or escalate without layer-specific limits.

## Acceptance Criteria

- [ ] Define default L1, L2, and L3 token budgets.
- [ ] Define what evidence allows a budget override.
- [ ] Define when work must split into a new issue or PR.
- [ ] Add a handoff note format for budget exhaustion.
