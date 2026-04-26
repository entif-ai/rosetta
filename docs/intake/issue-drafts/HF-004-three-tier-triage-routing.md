# Issue Draft: HF-004 — Implement Three-Tier Triage Routing

## Metadata

- **Issue prefix:** HF-004
- **Title:** Implement three-tier triage routing (archive-only / deep-ingest / immediate-escalation)
- **Confidence:** high (three tiers explicitly defined; implementation state unknown)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-004, triage, routing, deep-ingest, escalation
- **Status:** draft
- **Depends on:** HF-001, HF-003
- **Blocks:** HF-005

---

## Problem Statement

The spec defines three distinct triage routing outcomes for every ingested content item, based on its relevance score and watchlist topic match. Current Rosetta triage state is unknown; this functionality may not be implemented or may be implemented differently. The three tiers are: (1) Archive-only (stored metadata + excerpt + tags + score), (2) Queue deep ingest (fetch full content and parse), (3) Immediate escalation (very high score or watchlist topic hit).

---

## Proposed Approach

1. **Define routing logic:**

   ```
   IF item matches watchlist topic:
     → Immediate Escalation
   ELSE IF relevance_score >= threshold:
     → Queue Deep Ingest
   ELSE:
     → Archive-only
   ```

2. **Archive-only tier:**
   - Store metadata, excerpt, tags, score
   - No further action
   - Remains searchable/indexed for future re-scoring

3. **Queue Deep Ingest tier:**
   - Item enters deep ingest queue
   - Triggers full-text fetch → parse → chunk + embed → structured output
   - See HF-005 for deep ingest pipeline details

4. **Immediate Escalation tier:**
   - Item bypasses scoring threshold entirely
   - Flagged for urgent review
   - Delivery: push notification + daily digest highlight
   - Watchlist topics (examples): auth bypass, agent sandbox escape, memory leakage, copyright/ToS changes, new exploit disclosure

5. **Routing state tracking:**
   - Each item's triage decision tracked with timestamp and routing reason
   - Enables post-hoc audit of why items were routed as they were

---

## Acceptance Criteria

- [ ] Three-tier routing logic implemented and testable
- [ ] Watchlist topic matching triggers Immediate Escalation regardless of score
- [ ] Above-threshold items routed to deep ingest queue
- [ ] Below-threshold items stored as archive-only without deletion
- [ ] Routing decision (tier, reason, timestamp) stored per item
- [ ] Manual override possible: human can force any item to any tier

---

## Dependencies

- HF-001 (daily sweep pipeline triggers triage)
- HF-003 (intake envelope schema is the input to triage)
- HF-002 (threshold value comes from calibration)

---

## Estimated Complexity

**Medium.** Routing logic is straightforward conditional branching; complexity is in the queue management for deep-ingest items and the watchlist matching.

---

## Notes

- The watchlist should be treated as a living document reviewed monthly
- "Immediate escalation" does not mean "drop everything and handle now" — it means flagged for next digest cycle with high visibility
- Manual override is important: humans should be able to force any item into any tier
- Routing state tracking supports future analysis: "what % of items are archive-only vs. deep-ingest vs. escalation?"
