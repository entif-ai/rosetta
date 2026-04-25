# Issue Draft: Implement cheap-first routing policy with budget header

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Implement model routing policy: cheap-first by default, escalate to mid-tier only when planner signals low confidence, escalate to heavy only when mid-tier signals low confidence. Every call must have a budget header attached, tokens metered, and cost recorded per outcome.

## Details
Routing tiers:
1. **Cheap/fast** (default): intent parsing, tool-arg extraction. Temperature=0, structured JSON output required.
2. **Mid-tier**: code planning, diffs, summarization. Used when cheap model signals uncertainty.
3. **Heavy**: complex reasoning, novel problems, policy evolution. Only when mid-tier low-confidence.

Policy-encoded constraints:
- Max tokens per task type
- Preferred models per task
- Backoff rules (exponential backoff on errors)
- Budget header attached to every LLM call

Budget enforcement:
- If budget would be exceeded: downgrade model, chunk request, OR ask targeted user confirmation
- Meter tokens in and out per call
- Record cost per outcome

Router must log every routing decision (model selected, reason, confidence signal that triggered escalation/de-escalation).

Coach table stores model → accuracy × cost for bandit reward learning.

## Acceptance Checks
- [ ] Default route: cheap model for intent parsing
- [ ] Escalation triggers when cheap model confidence < threshold
- [ ] Budget header attached to every LLM API call
- [ ] Token count (in/out) metered per call
- [ ] Cost per outcome recorded in receipt
- [ ] Over-budget: router downgrades, chunks, or requests confirmation
- [ ] Routing decision logged: model selected + reason
- [ ] All routing decisions queryable from ledger
