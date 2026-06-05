# BVR-003: PRD-First Rule Doesn't Address Staleness or Conflicts

**Type:** process/gap
**Status:** draft
**Confidence:** low
**Source:** docs/external/Berman - Vibe Coding Rules.txt

## Problem

The "vibe coding" rules require following the PRD closely before starting any task, but do not address what happens when:
1. The PRD is stale (outdated relative to current implementation)
2. The PRD has missing sections or ambiguity
3. The PRD conflicts with other project documentation (e.g., a README, a spec, a chat decision)

In a project like Rosetta with many living documents, this creates a gap where an AI assistant following the PRD could implement something that contradicts a later architectural decision captured elsewhere.

## Evidence

- Rule: "look for comprehensive project documentation to understand requirements before making changes"
- No staleness check
- No conflict resolution protocol
- No PRD version or date tracking mentioned

## Impact

AI-assisted implementation may follow an outdated PRD and conflict with current project state. No mechanism to surface PRD inconsistencies before implementation begins.

## Suggested Action

Add a lightweight staleness check to the PRD-first rule:
- Require PRD to have a "last reviewed" date
- If PRD is older than N days, flag it for human review before proceeding
- If PRD conflicts with other documentation, surface the conflict to the human before proceeding

Alternatively, tie the PRD to a version tag that can be compared against the project's current commit, making staleness mechanically detectable.

## Related

- BVR-001 (300-line limit unenforced)
- BVR-002 (fixes folder unstructured)