# OB1-005: Pending-Confirmation State Machine Undefined for Schema-Aware Routing

## Meta

- **Type:** architecture
- **Severity:** medium
- **Confidence:** high
- **Tags:** routing, ingress, pending-confirmation, state-machine
- **Source doc:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md` §1.6, §5
- **Extracted:** 2026-05-26

## Summary

The OB1 Assimilation Addendum specifies that schema-aware routing must support "pending-confirmation" states for ambiguous routing decisions. Section 1.6 states that ambiguity is flagged not guessed, and Section 5 lists pending-confirmation states as an approved target. However, no formal state machine has been defined for these states, and no implementation exists in the routing package.

## Evidence

From §1.6: "Schema-aware routing translates into a six-step pipeline... ambiguity is flagged not guessed."

From §5 (approved pending-confirmation states): The addendum lists pending-confirmation as a routing policy target, but no formal state machine definition exists in the codebase.

No TC-005 issue or state machine definition found in the repo for pending-confirmation routing states.

## Response Options

### Option A: Define state machine in TC-005 (Promotion state machine)
Expand TC-005 to include pending-confirmation as part of the promotion state machine. This would integrate routing ambiguity handling with the existing TC workstream.

**Pros:** Aligns with existing TC-005 workstream; maintains single source of truth for state transitions.

**Cons:** TC-005 may already have a full scope; adding routing states may dilute its focus.

### Option B: Create separate routing state machine spec
Create a dedicated routing state machine document in the routing package that defines pending-confirmation, confirmed, rejected, and escalation states.

**Pros:** Clean separation of concerns; routing-specific state machine can evolve independently.

**Cons:** Another artifact to maintain; potential drift from TC-005 if both handle similar state transitions.

### Option C: Defer pending-confirmation until routing package is mature
Mark OB1-005 as deferred until the schema-aware routing package has stabilized.

**Pros:** Avoids premature architectural commitment.

**Cons:** OB1 addendum requirements remain unfulfilled; potential for requirements drift over time.

## Recommended Response

Option A (expand TC-005) is recommended if TC-005 is still in early design phase. If TC-005 is already committed to a specific scope, Option B (separate state machine) provides cleaner separation.

## Dependencies

- Blocked by: TC-005 (Promotion state machine)
