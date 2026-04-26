# SLD-003: Skill Broker Middleware — Multi-Stage Retrieval Pipeline

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 6, 10)
- **Confidence:** HIGH
- **Labels:** skills, broker, middleware, retrieval, vector, graph, sql

## Summary

Implement the skill broker middleware: a multi-stage retrieval pipeline that takes a `NeedSpec` and returns the top 10–20 most relevant SkillCards. Stages: SQL prefilter → Vector recall → Graph re-rank → Receipt-aware final rank. This is the core of the skill library's usability — it must return relevant skills fast, and it must be observable via telemetry.

## Problem Statement

Without a broker, the agent has no way to efficiently discover relevant skills from an unbounded library. Without a multi-stage retrieval, any single-stage approach (pure SQL, pure vector, or pure graph) will be either too slow, too imprecise, or too blind to receipt history.

The broker is not just a search engine — it is a decision support system that considers risk posture, tool constraints, receipt history, and runtime context.

## Broker Input: NeedSpec

```typescript
interface NeedSpec {
  intent_family: string[];        // EGC / taxonomy tags
  constraints: {
    time_budget_ms?: number;
    token_budget?: number;
    offline_required?: boolean;
    data_sensitivity?: 'public' | 'internal' | 'confidential';
  };
  available_tools: string[];       // tool families available in current runtime
  desired_output_type: string;    // e.g., "transcript_tiles", "git_patch"
  risk_ceiling?: RiskClass;      // max risk class agent is authorized for
}
```

## Multi-Stage Retrieval Pipeline

### Stage 1: SQL Prefilter (Fast Faceting)

Fast elimination of non-candidates:
- `risk_class` compatible with agent's risk_ceiling?
- `tool_scopes` allowed by current runtime?
- `offline_compatible` if offline_required is true?
- Environment constraints (mac/linux only, etc.)

**Output:** ~500 candidate SkillCards (generous superset)

### Stage 2: Vector Recall (Top 200)

Embed the NeedSpec and search similarity over:
- `skill.card.one_line` (semantic similarity)
- `skill.card.triggers` (keyword match)
- `skill.spec.distilled_summary` (if available)

**Output:** Top 200 by cosine similarity

### Stage 3: Graph Re-Rank (Top 50)

Using the graph store, apply structural signals:
- Dependency edges: "uses tool X", "touches domain Y"
- Conflict edges: "superseded_by", "deprecated", "incompatible_with"
- Category edges: same intent_family

**Output:** Top 50 re-ranked

### Stage 4: Receipt-Aware Final Rank (Top 10–20)

Apply historical performance signals:
- `win_rate` for skills in this intent_family
- `avg_cost` (token + time)
- `avg_latency_ms`
- `last_used` timestamp
- Failure modes matched to current NeedSpec constraints

**Output:** Final 10–20 SkillCards, plus "best single pick" if confidence > threshold

## Broker Output

```typescript
interface BrokerResponse {
  skill_cards: SkillCard[];      // 10–20 Tier 0 stubs
  rationale: string;             // "why these" explanation
  best_pick?: SkillCard;        // one best if confidence > threshold
  extend_candidate?: {
    skill_id: string;
    missing_capability: string; // acceptance-check gap detected
    extension_delta: string;    // what the extension would add
  };
}
```

## skill_broker_query_and_select (The Operational Protocol)

Once broker returns cards, agent must decide: use-as-is, extend, or author new. The `skill_broker_query_and_select` skill is a first-class hot skill that encodes this decision protocol:

**Inputs:** NeedSpec, context_summary, budget

**Steps:**
1. Normalize NeedSpec into canonical schema
2. Call broker → get SkillCards + best_pick + extend_candidate
3. Decision policy:
   - `use_as_is`: confidence high + receipts strong
   - `extend`: one missing capability, gap is local/delta
   - `new_skill`: no candidate clears threshold
4. If extend/new: generate new skill artifact (Tier 0 + Tier 1 + eval pack), register it

## Acceptance Criteria

- [ ] NeedSpec schema is defined and validated
- [ ] SQL prefilter stage implemented (fast faceting on risk_class, tool_scopes, env)
- [ ] Vector recall stage implemented (embedding + cosine similarity, top 200)
- [ ] Graph re-rank stage implemented (dependency/conflict edges, top 50)
- [ ] Receipt-aware final rank implemented (win_rate, cost, latency, last_used)
- [ ] Broker response includes: skill_cards, rationale, best_pick, extend_candidate
- [ ] Broker latency < 500ms for cold query (target)
- [ ] skill_broker_query_and_select is written as a Tier 1 hot skill (in Hot Skills Pack)
- [ ] Broker is observable: all queries logged as receipts

## Implementation Notes

- The broker is a service (middleware), not part of the agent's prompt. It is called by the orchestrator.
- The 4-stage pipeline is cheap-first, expensive-last: SQL is O(1) indexed lookup; vector is O(n) embedding similarity; graph is O(n) traversal; receipt rank is O(n) but over small set.
- "Receipt-aware" means the broker queries the receipt store for historical performance data on each candidate skill.

## Dependencies

- SLD-001 (SkillCard schema)
- SLD-004 (extend vs author policy)
- SLD-007 (skill telemetry / receipts)

## Status

issue-candidate
