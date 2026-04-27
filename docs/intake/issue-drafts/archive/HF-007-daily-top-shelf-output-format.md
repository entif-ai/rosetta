# Issue Draft: HF-007 — Daily Top Shelf Action-Shaped Output Format

## Metadata

- **Issue prefix:** HF-007
- **Title:** Implement "daily top shelf" action-shaped output format (3/2/1/1)
- **Confidence:** high (output format explicitly defined; not implemented as formal template)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-007, output-format, daily-digest, action-shape, delivery
- **Status:** draft
- **Depends on:** HF-001, HF-006
- **Blocks:** —

---

## Problem Statement

The spec explicitly rejects "here are 30 links" as the output format. Instead, the required output is an action-shaped "daily top shelf" digest with a fixed format: 3 items to act on this week, 2 items to store for later, 1 item that changes a design decision, 1 risk to track. This format is not implemented as a formal template or delivery mechanism.

---

## Proposed Approach

1. **Daily top shelf format template:**

   ```
   ## Daily Top Shelf — [DATE]

   ### 3 to Act On This Week
   1. [Item title] ([source]) — [1-sentence why + proposed action]
   2. [Item title] ([source]) — [1-sentence why + proposed action]
   3. [Item title] ([source]) — [1-sentence why + proposed action]

   ### 2 to Store for Later
   1. [Item title] ([source]) — [1-sentence why it's relevant but not urgent]
   2. [Item title] ([source]) — [1-sentence why it's relevant but not urgent]

   ### 1 Design Decision Change
   - [Item title] ([source]) — [What decision this changes and why now]

   ### 1 Risk to Track
   - [Risk description] ([Source item]) — [Why this is a risk, what we're watching]
   ```

2. **Selection criteria:**
   - "3 to act on": items that score >= threshold and have concrete, actionable output from synthesis (action ideas, specific integration opportunities)
   - "2 to store": items that are interesting but not immediately actionable (good reference material, emerging trends)
   - "1 design decision change": item that either confirms a pending design decision, overturns one, or introduces a new consideration that should change a planned architecture
   - "1 risk to track": item that surfaces a threat, constraint, or external change that could affect Entif/Rosetta

3. **Delivery mechanism:**
   - Stored as a daily artifact in Rosetta's artifact store
   - Delivered via Telegram DM to Crates (or other configured channel)
   - Summary delivered within 2h of daily sweep completion

4. **Escalated items:**
   - Watchlist-escalated items appear at the top of the digest with an ⚠️ indicator
   - They do not count against the 3/2/1/1 slots

---

## Acceptance Criteria

- [ ] Daily digest produced with the 3/2/1/1 structure populated from synthesis outputs
- [ ] Digest is action-shaped, not a link list — each item has a 1-sentence "why" and a proposed action
- [ ] Design decision change slot has a clear statement of which decision changes
- [ ] Risk slot identifies what is being watched and why
- [ ] Digest delivered to configured channel (Telegram DM minimum) within 2h of daily sweep
- [ ] Escalated items appear with ⚠️ indicator separate from the main 3/2/1/1 slots
- [ ] Digest is stored as an artifact with date-based naming for audit trail

---

## Dependencies

- HF-001 (daily sweep provides the raw items)
- HF-006 (synthesis provides the action ideas, design decision implications, and risks that populate the slots)

---

## Estimated Complexity

**Low–Medium.** Primarily a templating and selection problem. Complexity is in the selection logic (which items go in which slot) and delivery mechanism.

---

## Notes

- The 3/2/1/1 format is intentionally constrained — it forces prioritization. If there are more than 3 actionable items, pick the top 3.
- The "design decision change" slot should be the hardest to fill — it requires synthesis to identify something that materially changes an existing plan
- "Risk to track" is not "risk to act on now" — it's something to watch. If it needs immediate action, it should be escalated separately.
- Digest should be skimmable: bold the action item, italicize the "why"
