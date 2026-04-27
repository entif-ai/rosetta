# SLD-004: Extend vs Author-New Decision Policy

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 7)
- **Confidence:** HIGH
- **Labels:** skills, broker, decision-policy, extend, authoring, delta

## Summary

Define and implement the explicit decision policy that the broker returns alongside SkillCards: use-as-is, extend, or author-new. The policy must be deterministic, based on measurable signals (match score, receipt history, acceptance-check gap detection). Extensions must be stored as new version tiles with `supersedes` edges, not in-place mutations.

## Problem Statement

Without an explicit extend/author policy, the agent has no principled basis for deciding when to reuse an existing skill vs. creating a new one. This leads to either:
- Over-authoring: agents create new skills for every slight variation, leading to skill sprawl
- Under-extending: agents use imperfect skills because creating new ones is more effort

The policy must be embedded in the broker's output (as `extend_candidate`) and enforceable by the orchestrator.

## Decision Policy

### Use-As-Is

**Condition:** `match_score >= threshold` AND `receipts.show_reliability(intent_family)`

When to use:
- Broker match score is above threshold (configurable per agent template)
- Historical receipts show the skill works reliably in the same intent_family
- No missing capabilities detected

### Extend (Delta-Based)

**Condition:** `match_score >= threshold` BUT `acceptance_check_gap_detected`

When to extend:
- Skill is a close match but missing exactly one capability
- The gap is local/delta (new section, new example, new resource) — not a structural rewrite
- Extension is cheaper than authoring new from scratch

**Extension output:**
```typescript
interface ExtensionDelta {
  base_skill_id: string;
  missing_capability: string;     // which acceptance check is not met
  delta_type: 'new_section' | 'new_example' | 'new_resource' | 'new_trigger';
  delta_content: string;           // what to add
  supersedes: string;              // base_skill_id (edge in graph)
}
```

**Extension storage:** Extensions are stored as **new version tiles** with `supersedes` edges. No in-place mutation of existing skills. This preserves version lineage and enables rollback.

### Author New

**Condition:** `match_score < threshold` OR `risk_class/tool_constraints_require_clean_room`

When to author new:
- No existing skill clears the match threshold
- The required capability fundamentally conflicts with existing skill's risk_class or tool scopes
- A clean-room implementation is required for safety or correctness

**New skill output:** Full Tier 0 + Tier 1 + eval pack (see SLD-006 vetting pipeline)

## Acceptance Criteria

- [ ] Broker response includes `extend_candidate` with `missing_capability` and `extension_delta`
- [ ] `acceptance_check_gap_detection` is implemented: broker checks if selected skill's acceptance checks cover the current NeedSpec
- [ ] Extensions are stored as new version tiles with `supersedes` edges (no in-place mutation)
- [ ] `author_new` is only triggered when no candidate clears threshold OR constraints require clean-room
- [ ] Extension delta is recorded as a first-class artifact (not just a diff)
- [ ] Extension history is queryable: "show all extensions of skill X and their outcomes"
- [ ] Policy thresholds are configurable per agent template (Hot Skills Pack)

## Implementation Notes

- The decision policy should be encoded in `skill_broker_query_and_select` (SLD-003/SLD-009), not in the broker service itself.
- The broker service returns signals; the agent (guided by the hot skill) makes the final call.
- "Acceptance check gap detection" means comparing the skill's declared `acceptance_checks` against what the current task requires. If the skill's checks don't cover a required capability, it's an extend candidate.

## Dependencies

- SLD-001 (SkillCard and acceptance_checks)
- SLD-003 (broker output includes extend_candidate)
- SLD-005 (Hot Skills Pack with configurable thresholds)

## Status

issue-candidate
