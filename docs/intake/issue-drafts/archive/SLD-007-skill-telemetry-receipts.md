# SLD-007: Skill Telemetry and SkillReceipts as First-Class Query Surface

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 12)
- **Confidence:** HIGH
- **Labels:** skills, telemetry, receipts, metrics, broker, observability

## Summary

Implement SkillReceipts as a first-class telemetry surface: every skill invocation emits a receipt recording what was chosen, what it cost, whether it succeeded, why it failed, and what should be edited. These receipts feed back into the broker's receipt-aware ranking stage and enable organizational learning queries like "top skills by win_rate in this domain."

## Problem Statement

A skill library doesn't get good because it has 15k skills. It gets good because every run produces signal about what works, what fails, and what needs fixing. Without telemetry, the broker is blind — it can't distinguish a well-performing skill from a broken one.

SkillReceipts are the feedback loop that makes the broker improve over time.

## SkillReceipt Schema

Every skill invocation produces one receipt:

```typescript
interface SkillReceipt {
  receipt_id: string;              // unique ID
  skill_id: string;                // which skill was invoked
  version: string;                 // skill version at invocation time
  invoked_at: string;              // ISO timestamp
  agent_template: string;          // which agent template

  // Invocation context
  intent_family: string[];         // what the agent was trying to do
  need_spec_snapshot: NeedSpec;   // the NeedSpec that triggered selection

  // Outcome
  outcome: 'success' | 'failure' | 'partial';
  success_mechanism?: string;      // how it succeeded (for success)
  failure_reason?: string;         // why it failed (for failure)
  acceptance_checks_passed?: boolean;

  // Cost
  tokens_spent: number;
  latency_ms: number;
  tool_calls_made: string[];        // actual tools called

  // Improvement signals
  extend_recommended?: boolean;
  extend_reason?: string;          // "missing capability X"
  deprecate_recommended?: boolean;
  deprecate_reason?: string;
}
```

## Telemetry Queries (First-Class Surfaces)

The receipt store must support these queries:

1. **"Top skills by win_rate in this domain"**
   ```sql
   SELECT skill_id, intent_family,
          COUNT(*) FILTER (WHERE outcome = 'success') * 1.0 / COUNT(*) as win_rate
   FROM skill_receipts
   WHERE intent_family = $1
   GROUP BY skill_id
   ORDER BY win_rate DESC
   LIMIT 10;
   ```

2. **"Skills that fail under offline constraint"**
   ```sql
   SELECT skill_id, COUNT(*) as failure_count
   FROM skill_receipts
   WHERE outcome = 'failure'
     AND need_spec_snapshot @> '{"offline_required": true}'
   GROUP BY skill_id
   HAVING COUNT(*) > 3;
   ```

3. **"Skills trending toward prompt-injection incidents"**
   ```sql
   SELECT skill_id, COUNT(*) as incident_count
   FROM skill_receipts
   WHERE failure_reason ILIKE '%injection%'
   GROUP BY skill_id;
   ```

4. **"Avg cost per skill"**
   - For broker cost-aware ranking

5. **"Last used per skill per agent template"**
   - For staleness detection

## Broker Integration

Receipt data feeds into the broker's Stage 4 (Receipt-Aware Final Rank):

- `win_rate` boosts high-performing skills
- `avg_cost` and `avg_latency_ms` enable cost-aware selection
- `failure_reason` matching against current NeedSpec constraints filters out inappropriate skills
- `last_used` enables recency-weighted ranking

## Acceptance Criteria

- [ ] SkillReceipt schema is defined and validated
- [ ] Every skill invocation emits a receipt (no receipts = suspicious — flag in audit)
- [ ] Receipt store is queryable via SQL (structured queries above)
- [ ] Broker Stage 4 consumes receipt data for final ranking
- [ ] Telemetry queries (win_rate, failure patterns, cost, staleness) are implemented
- [ ] Extend/deprecate recommendations from receipts feed into skill lifecycle management
- [ ] Receipt data is immutable (append-only log)
- [ ] "No receipts for this skill" is a warning signal (possible ghost skill)

## Implementation Notes

- SkillReceipts are append-only logs (immutable). Corrections come from new receipts, not edits.
- The receipt store can be PostgreSQL (aligned with Rosetta's pgvector baseline) or a dedicated time-series DB.
- Telemetry should be high-volume friendly: batch writes, efficient storage.
- The `extend_recommended` and `deprecate_recommended` fields create a feedback loop to SLD-004 (extend/author policy) and the deprecation workflow.

## Dependencies

- SLD-003 (broker Stage 4 uses receipt data)
- SLD-004 (extend recommendations from receipts)
- Receipt system (general Rosetta receipt infrastructure)
- PostgreSQL (skill receipts table)

## Status

issue-candidate
