# CMT-007: Treat Context Maintenance as Production Code — Versioned, Pruned, Governed

## Metadata

- **Type:** governance
- **Status:** draft
- **Labels:** `context-management`, `governance`, `lifecycle`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Finding T12)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`
- **Depends on:** CMT-002 (Constitution exists)

## Summary

Context infrastructure — Constitution, agent specs, Tier 3 docs — must be treated as production code: versioned in Git, reviewed on changes, routinely updated, and automatically enforced. This is not a one-time setup. Governance is the meta-requirement that makes all other context-management work stick.

## Problem Statement

Without explicit governance, context artifacts accumulate stale information, become inconsistent with actual system behavior, and eventually are ignored. The paper explicitly states: context infrastructure works because it is "versioned, intentionally scoped, routinely updated, used automatically through triggers and tooling."

## Proposed Resolution

1. **Versioning:** All context artifacts (Constitution, agent specs, Tier 3 docs) are versioned in Git. Changes require review.

2. **Definition of Done updates context:** Any significant architecture change (new package, new invariant, new subsystem) must update the relevant context artifact as part of its PR definition-of-done.

3. **Pruning policy:** Context artifacts have a staleness review cycle (quarterly or per-release). Items not referenced in the last N retrieval cycles are flagged for review or removal.

4. **Automatic usage enforcement:** Context artifacts are not optional. They are loaded automatically through trigger routing (CMT-004) and retrieval tools (CMT-003). Agents cannot opt out.

5. **Metrics:**
   - Track context retrieval hit rate (did retrieved context actually help?)
   - Track context-miss rate per subsystem (indicates Tier 3 doc gaps)
   - Track Constitution consultation rate
   - Flag agents that consistently bypass context retrieval

6. **Governance model:** Add context governance to the same enforcement mindset as GuardLayer. Context failures are architectural events, not advisory.

## Acceptance Criteria

- [ ] All context artifacts are versioned in Git
- [ ] Definition-of-done for architecture changes includes context artifact updates
- [ ] Staleness review process is defined and scheduled
- [ ] Context artifact usage is tracked via retrieval receipts
- [ ] Pruning policy is documented and active

## Dependencies

- CMT-002 (Constitution)
- CMT-003 (Context Router tracks retrieval events)
- CMT-004 (Trigger table enforces usage)

## Related Issues

- CMT-002, CMT-003, CMT-004
- NOT LAME: Context Compiler + Query Router
