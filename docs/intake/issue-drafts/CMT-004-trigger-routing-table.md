# CMT-004: Implement Trigger-Based Routing Table for Agent Dispatch

## Metadata

- **Type:** implementation
- **Status:** draft
- **Labels:** `context-management`, `orchestration`, `trigger-routing`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Finding T6)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`
- **Depends on:** CMT-003

## Summary

Implement a trigger table in the orchestrator that routes tasks to specialist agents based on observable signals — primarily file paths and modules touched. Routing is enforced redundantly: agents must consult the correct specialist before making changes to protected paths.

## Problem Statement

Without trigger-based routing, agents make decisions based on implicit context rather than structured expertise. This causes planner-coder drift, inter-agent misalignment, and expensive mistakes when domain-specific rules are violated.

## Proposed Resolution

1. Define a trigger table as a structured artifact (YAML/JSON):
   ```yaml
   triggers:
     - glob: "packages/*/network/**"
       must_consult: ["networking-agent"]
       post_change: ["code-review-agent"]
     - glob: "packages/*/auth/**"
       must_consult: ["security-agent"]
       post_change: ["security-review-agent"]
     - glob: "packages/*/storage/**"
       must_consult: ["storage-agent"]
     - glob: "packages/*/mcp/**"
       must_consult: ["orchestration-agent"]
   default_fallback:
     suggest_agent: true  # Call suggest_agent for unknown paths
   ```

2. Enforce at orchestrator layer:
   - Before executing on a matching path, require confirmation that specialist was consulted
   - After changes on sensitive paths, automatically invoke review agent
   - Log all routing decisions as receipts

3. Auto-suggest on unfamiliar code: "If you're exploring unfamiliar code, call suggest_agent(task)"

## Acceptance Criteria

- [ ] Trigger table exists as a versioned structured artifact
- [ ] Orchestrator enforces trigger table routing
- [ ] Specialist agent consultation is logged as a receipt
- [ ] Post-change review fires automatically on sensitive paths
- [ ] suggest_agent fires on unmapped paths

## Dependencies

- CMT-003 (Context Router)
- CMT-005 (Specialist Agents exist to route to)

## Related Issues

- CMT-003, CMT-005, CMT-006
- NOT LAME: Write-Admission Gate (trigger table may integrate with 9-step state machine)
