# Issue: write-admission-gate-nine-step-state-machine

## Metadata

- ID: write-admission-gate-nine-step-state-machine
- Title: Write-Admission Gate — 9-Step State Machine, Fail-Closed
- Type: implementation
- Severity: critical
- Tags: write-gate, state-machine, fail-closed, receipts, admission-control
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

No harness, model, or plugin writes directly to any memory layer. Everything goes through a 9-step write-admission gate state machine that is fail-closed: Propose → Normalize → Authorize → Ground → Checkpoint → Apply → Observe → Receipt → Project.

## The Problem

Current harnesses (OpenClaw, Hermes, etc.) allowed direct writes from agents to canonical state. This produced:
- Destructive compaction (overwriting evidence)
- Split-brain state (multiple stores disagreeing)
- Silent state corruption
- Mechanism bypass (prose rules not wired to execution)
- Receipt absence on writes

The fix: every write must pass through a typed state machine with receipts at every step.

## The 9-Step State Machine

```
Propose → Normalize → Authorize → Ground → Checkpoint → Apply → Observe → Receipt → Project
```

### Step 1: Propose
- Who/what proposed this write?
- What is the target layer?
- What is the payload?
- What is the claimed justification?

### Step 2: Normalize
- Parse the payload into canonical schema
- Validate structure against target layer's schema
- Reject malformed writes early
- Normalize IDs to canonical scheme (artifact IDs, version IDs, chunk IDs, span IDs)

### Step 3: Authorize
- Does the proposer have write permission for this layer?
- Does this write conflict with any known constraints?
- Is the proposer operating within its declared scope?
- Bark if not: deny with reason

### Step 4: Ground
- Resolve all references to source artifacts/versions/spans
- Verify all referenced entities exist
- Compute derived values (hashes, sizes, relationships)
- Establish the full provenance chain for this write

### Step 5: Checkpoint
- Create a checkpoint before applying
- Record current state snapshot
- Make mutation reversible
- "No write command exists that can touch canonical state unless a checkpoint ref is present"

### Step 6: Apply
- Execute the normalized, authorized, grounded, checkpointed write
- Apply to the target layer only
- No side effects outside declared scope

### Step 7: Observe
- Verify the write was applied correctly
- Read back the result
- Check for any unexpected side effects
- Detect any drift from expected state

### Step 8: Receipt
- Emit a structured receipt for this operation
- Include: proposer, timestamp, payload summary, authorization path, checkpoint ref, observe result, any anomalies
- Receipt absence = failure condition
- Store receipt in append-only receipt ledger

### Step 9: Project
- If the write has downstream projection effects (e.g., new chunk → trigger embedding, new event → trigger graph update), queue those projections
- Projections are async and non-blocking
- Projection failures do NOT rollback the write (projections are derived, not canonical)

## Fail-Closed Behavior

- If any step fails, the state machine stops
- No state is modified
- A failure receipt is emitted
- The proposer is notified of the failure with reason
- "Deny by default" — if the gate cannot verify, it blocks

## Receipt Structure

Every receipt must include:
- Operation ID (canonical ID scheme)
- Proposer identity and role
- Timestamp
- Target layer
- Payload summary (not necessarily full payload — for large writes, a hash/chunk reference)
- Authorization path (which gate step passed)
- Checkpoint reference
- Observe result
- Any anomalies or warnings
- Projection queue (what was queued)

## Resolution Required

1. Design the 9-step state machine schema
2. Implement the write gate as the sole write path to any memory layer
3. Ensure fail-closed behavior: any step failure = no state mutation
4. Emit structured receipts at step 8 for every operation
5. Queue projections at step 9 without blocking on them

## Open Questions

1. How does the "Normalize" step handle writes to different layers with different schemas?
2. What is the timeout for each step?
3. How does the gate handle writes that span multiple layers (transactional vs. per-layer)?
4. How are projection failures detected and reported without blocking the write?

## Related Issues

- constitutional-primitives-prose-not-law
- receipt-ledger-every-durable-operation
- oracle-pattern-cognition-vs-enforcement-separation
- deterministic-bootstrap-gate-refuse-to-start
