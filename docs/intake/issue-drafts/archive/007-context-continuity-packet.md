## Priority

Tier 1.

## Parent

Child of COG-000. Coordinates with #1042 context compiler, #1110 memory explorer, and #1119 promotion state machine.

## Problem

Compaction and handoff are major failure points in agentic systems. A summary that omits active assumptions, rejected branches, decision state, unresolved risks, and current constraints can cause the next agent/model to confidently resume the wrong task.

Rosetta needs a `ContextContinuityPacket` that preserves the living joints of a reasoning run through compaction, handoff, replay, and recovery.

## Goal

Define a compaction-safe packet that preserves decision state, assumptions, evidence refs, branch history, risk posture, and next allowed/blocked actions.

## Scope

In scope:

1. Define `ContextContinuityPacket` schema/model.
2. Define mandatory fields for non-trivial handoffs.
3. Define compression/summary requirements that preserve uncertainty and branch rationale.
4. Define negative tests for destructive compaction.
5. Add fixtures for long architecture planning, repo work interrupted midstream, and hallucination recovery.
6. Document relationship to context compiler (#1042) and read-only memory explorer (#1110).

## Suggested packet fields

```ts
ContextContinuityPacket {
  packetId: string;
  sourceRunRef: string;
  currentObjective: string;
  activeConstraints: string[];
  activeAssumptionLedgerRefs: string[];
  unknownsPacketRefs: string[];
  decisionStateRefs: string[];
  selectedPath?: string;
  rejectedBranches: Array<{
    branchId: string;
    summary: string;
    rejectionReason: string;
    evidenceRefs?: string[];
  }>;
  openRisks: string[];
  canonicalSourceRefs: string[];
  latestReceiptRefs: string[];
  nextAllowedActions: string[];
  blockedActions: Array<{ action: string; reason: string }>;
  compactionNotes?: string;
  createdAt: string;
}
```

## Acceptance criteria

- [ ] `ContextContinuityPacket` schema/model exists.
- [ ] Packet preserves objective, constraints, assumptions, unknowns, decisions, branches, risks, source refs, receipts, allowed actions, and blocked actions.
- [ ] Fixtures show packet generation from a multi-step reasoning run.
- [ ] Negative tests detect summaries that omit active assumptions or rejected branch rationale.
- [ ] Packet distinguishes “selected current path” from “truth.”
- [ ] Docs state how packets are produced before compaction/handoff and consumed after restoration.
- [ ] Relationship to #1042 and #1110 is explicit.

## Non-goals

- Do not build a full context compiler in this issue.
- Do not require raw prompt history to be preserved in every packet.
- Do not allow packet summaries to override source/evidence refs.
- Do not make the packet a memory write authority.

## Validation

- Schema tests.
- Round-trip fixture: run state -> packet -> restored summary shape.
- Negative fixture for context rot / lost assumption state.
