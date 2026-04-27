# Define governance for OMC constitutional memory mutation

Issue draft id: `omc-constitutional-memory-mutation-policy`
Priority: `P1`
Effort: `M`
Labels: `omc`, `self-improvement`, `constitutional-memory`, `governance`

## Problem

The OMC research spec says nightly self-improvement may not silently mutate constitutional memory, but does not define enforcement mechanics.

## Scope

Define the policy and review path for any self-improvement loop that proposes changes to constitutional memory.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-24-ontological-mixture-of-concepts-research-spec.md` - Issue Candidates row for nightly self-improvement mutation policy.
- Source spec section cited there: Section 10.4 says constitutional memory may not be silently mutated.

## Specific Findings

### Finding 1: "Not silently" needs an operational gate

The extraction flags a governance gap: the spec prohibits silent mutation but does not define who approves changes, what receipt is required, or where proposals live.

## Acceptance Criteria

- [ ] Define what counts as constitutional memory for this workflow.
- [ ] Define the proposal, review, and acceptance path for mutations.
- [ ] Require receipts for proposed, accepted, rejected, and reverted mutations.
- [ ] State that automated loops may draft changes but may not apply them silently.
