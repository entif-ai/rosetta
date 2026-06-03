# CMT-006: Enforce Context Retrieval as Mandatory Policy, Not Advisory

## Metadata

- **Type:** requirement
- **Status:** draft
- **Labels:** `context-management`, `enforcement`, `orchestration`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Finding T11)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`
- **Depends on:** CMT-003 (Context Router must exist first)

## Summary

Context retrieval must be treated as mandatory policy — enforced at the orchestrator layer — rather than advisory prompts that agents may or may not follow. Retrieval failures must be treated as security-equivalent events, logged and escalated.

## Problem Statement

If context retrieval is advisory, agents will skip it when convenient or when under load. This creates invisible quality degradation: wrong assumptions, missed invariants, security vulnerabilities, and planner-coder drift accumulate silently.

## Proposed Resolution

1. **Orchestrator enforcement:**
   - Routing decisions are made at orchestrator layer (not agent discretion)
   - Retrieval is a mandatory step on high-risk paths (new module, high-risk file area, missing invariants)
   - Post-change review is automatic on sensitive paths

2. **Failure handling:**
   - When Context Router returns no relevant context for a high-risk task: halt and require explicit override
   - Context misses are logged as first-class receipts
   - Escalation path: context miss → GuardLayer alert → human review for repeated patterns

3. **Audit trail:**
   - Every retrieval event is logged with: task, context retrieved, agent, timestamp
   - Context misses are tracked separately as quality signals
   - Periodic review of context-miss patterns to drive Tier 3 doc creation

4. **In Practice (OpenClaw mapping):**
   - Retrieval happens at orchestrator layer before task dispatch
   - GuardLayer treats context misses as policy violations
   - "If you want this to actually stick, bake it into the same enforcement mindset as your GuardLayer"

## Acceptance Criteria

- [ ] Context retrieval is enforced at orchestrator layer, not advisory
- [ ] No-context result on high-risk task triggers halt/override flow
- [ ] All retrieval events are logged as receipts
- [ ] Context misses appear in GuardLayer alerts
- [ ] Periodic review of context-miss patterns is defined and scheduled

## Dependencies

- CMT-003 (Context Router)
- GuardLayer / orchestrator integration

## Related Issues

- CMT-003, CMT-004, CMT-007
- NOT LAME: Write-Admission Gate (retrieval enforcement may integrate with 9-step state machine)
