# SLD-009: skill_broker_query_and_select as First-Class Hot Skill

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 10)
- **Confidence:** HIGH
- **Labels:** skills, hot-skill, broker, query, select, agent-template

## Summary

Write `skill_broker_query_and_select` as a deterministic Tier 1 hot skill that encodes the full operational protocol: take a NeedSpec, query the broker, shortlist candidates, decide use-vs-extend-vs-author, then register any new/extended skill. This skill must be in every agent template's Hot Skills Pack because it is the gateway to the entire Cold Library.

## Problem Statement

Without `skill_broker_query_and_select` as an explicit hot skill, the agent has no standardized way to interact with the broker. Each agent might implement broker queries differently, leading to inconsistent selection behavior, missed extension opportunities, and no unified registration path for new skills.

This skill is the "how to use the skill library" manual — and it must be hot because the agent needs it on every interaction that the Hot Skills Pack doesn't directly cover.

## Skill Interface

**Name:** `skill_broker_query_and_select`

**Purpose:** Take a tightly-scoped NeedSpec, query the broker, shortlist candidates, decide use vs extend vs author, then register.

### Inputs

```typescript
interface BrokerQueryInput {
  need_spec: NeedSpec;           // canonical NeedSpec (see SLD-003)
  context_summary: string;      // what we already tried + results
  budget: {
    time_budget_ms: number;
    token_budget: number;
  };
}
```

### Outputs

```typescript
interface BrokerQueryOutput {
  decision: 'use_as_is' | 'extend' | 'new_skill';
  selected_skill_id?: string;   // for use_as_is
  extension_delta?: ExtensionDelta; // for extend
  new_skill_artifact?: SkillArtifact; // for new_skill
  broker_response_snapshot: BrokerResponse; // receipts: what broker returned
}
```

### Decision Policy (embedded in skill steps)

```
IF broker.best_pick.confidence > THRESHOLD AND receipts.win_rate > threshold:
    → use_as_is(broker.best_pick)

ELIF broker.extend_candidate exists:
    → extend(broker.extend_candidate)

ELSE:
    → new_skill(need_spec)
    → register(new_skill_artifact)  // submit to vetting pipeline (SLD-006)

THRESHOLD values are per-agent-template configuration.
```

## Skill Body (Structured Steps)

```
---
name: "skill_broker_query_and_select"
description: "Query the skill broker with a NeedSpec, select or extend a skill, or author a new one, then register."
version: "0.1.0"
risk_class: "read_only"
tool_scopes: ["net.http", "broker.query"]
triggers: ["skill", "broker", "query", "select", "extend", "author"]
io: "NeedSpec + context -> skill_id | ExtensionDelta | new_skill_artifact"
---

# Purpose
Query the skill broker with a structured NeedSpec and make a deterministic decision:
use an existing skill as-is, extend an existing skill with a delta, or author a new skill.

# Non-Goals
- This skill does NOT execute the selected skill (that's a separate invocation)
- This skill does NOT bypass Guard enforcement (Guard still adjudicates execution)
- This skill does NOT certify new skills (certification happens in the vetting pipeline)

# Preconditions
- Broker service is available (if broker is down: use Hot Skills Pack only, fail gracefully)
- NeedSpec is normalized (intent_family, constraints, available_tools, desired_output_type all present)
- Agent has valid risk ceiling for the intent_family

# Steps

## Step 1: Normalize NeedSpec
If NeedSpec is not in canonical form:
- Ensure intent_family is EGC taxonomy tags
- Ensure constraints has time_budget_ms and token_budget
- Ensure available_tools is a list of tool family strings
- Fail if normalization impossible

## Step 2: Query Broker
Call broker service with:
- intent_family / taxonomy tags
- constraints (offline/online, privacy class, tool scopes, deadlines)
- desired_output_type

Broker returns:
- top N SkillCards (N=5-15)
- best_single_pick (if confidence > threshold)
- extend_candidate (if gap is small)

## Step 3: Apply Decision Policy

### Use-As-Is Path
IF best_single_pick exists AND best_single_pick.confidence > THRESHOLD:
    - Retrieve full Tier 1 spec for selected skill_id
    - Return { decision: 'use_as_is', selected_skill_id, broker_response_snapshot }
    - Emit receipt: { skill_id, decision: 'use_as_is', why: 'confidence_threshold_met' }

### Extend Path
ELIF extend_candidate exists:
    - Identify missing capability (from extend_candidate.missing_capability)
    - Generate ExtensionDelta (see SLD-004)
    - Return { decision: 'extend', extension_delta }
    - Emit receipt: { skill_id, decision: 'extend', missing_capability }

### New Skill Path
ELSE:
    - Generate new skill artifact: Tier 0 card + Tier 1 spec + eval pack stub
    - Submit to vetting pipeline (SLD-006) for async certification
    - Return { decision: 'new_skill', new_skill_artifact }
    - Emit receipt: { skill_id, decision: 'new_skill', reason: 'no_candidate_threshold_met' }

## Step 4: Register (for extend/new only)
If decision is 'extend' or 'new_skill':
    - Register the new artifact in the skill registry
    - Tag as 'pending_certification' until vetting pipeline clears
    - Emit registration receipt

# Tool Usage Rules
- ONLY call broker service (no direct SQL/vector/graph access — go through broker API)
- ONLY call receipt_emit for logging decisions
- NO execution of the selected skill (that's a separate step)

# Acceptance Checks
- [ ] broker is called with valid NeedSpec
- [ ] decision is one of: use_as_is, extend, new_skill
- [ ] receipt is emitted for every invocation
- [ ] new/extended skills are registered (pending certification)
- [ ] broker service unavailability triggers graceful degradation (Hot Skills Pack fallback)

# Failure Modes
- Broker timeout: use Hot Skills Pack only, emit failure receipt
- NeedSpec invalid: emit failure receipt, do not proceed
- Extension generation fails: fall back to new_skill decision
- Registration fails: emit failure receipt, skill is not available until registered

# Examples

## Example 1: Use-As-Is
Input: { need_spec: { intent_family: ['transcript', 'yt'], constraints: {}, ... }, context_summary: '...', budget: {...} }
Broker returns: { best_pick: yt_transcript_ingest, confidence: 0.92 }
Decision: use_as_is
Output: { decision: 'use_as_is', selected_skill_id: 'Qm...abc123' }

## Example 2: Extend
Input: { need_spec: { intent_family: ['transcript', 'yt', 'multilang'], ... }, ... }
Broker returns: { best_pick: yt_transcript_ingest, confidence: 0.7, extend_candidate: { missing_capability: 'multilang_transcription' } }
Decision: extend
Output: { decision: 'extend', extension_delta: { base_skill_id: 'Qm...abc123', missing_capability: 'multilang_transcription', ... } }

## Example 3: New Skill
Input: { need_spec: { intent_family: ['novel_domain'], ... }, ... }
Broker returns: { best_pick: null, confidence: 0.1 }
Decision: new_skill
Output: { decision: 'new_skill', new_skill_artifact: { tier0: {...}, tier1: {...} } }
```

## Acceptance Criteria

- [ ] `skill_broker_query_and_select` is written as a Tier 1 spec in the hot skill format
- [ ] This skill is included in EVERY agent template's Hot Skills Pack (SLD-005)
- [ ] Decision policy is deterministic: same inputs → same decision (no non-determinism)
- [ ] broker is called via API (not direct DB access)
- [ ] All decisions emit receipts
- [ ] Graceful degradation when broker is unavailable (fallback to Hot Skills Pack)
- [ ] New/extended skills are registered pending certification
- [ ] Acceptance checks are testable (can verify behavior programmatically)

## Implementation Notes

- This is a "meta-skill": it operates on skills, it doesn't implement a domain task.
- It should be the most-tested skill in the library because every other skill discovery depends on it.
- The decision thresholds (use_as_is confidence, extend gap threshold) should be configurable per agent template, but the decision algorithm itself is fixed.

## Dependencies

- SLD-001 (SkillCard schema)
- SLD-003 (broker service API)
- SLD-004 (extend vs author decision policy)
- SLD-005 (Hot Skills Pack)
- SLD-006 (vetting pipeline for new/extended skill registration)
- SLD-007 (receipts)

## Status

issue-candidate
