# Issue Draft: HF-008 — Discord Bulk-Ingest Server with Per-Channel Routing

## Metadata

- **Issue prefix:** HF-008
- **Title:** Implement Discord bulk-ingest server with per-channel routing
- **Confidence:** high (server design explicitly specified; not implemented)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-008, discord, bulk-ingest, venture-routing, bot
- **Status:** draft
- **Depends on:** HF-003 (intake envelope schema)
- **Blocks:** —

---

## Problem Statement

The Discord bulk-ingest server creates a single choke-point for "random stuff I found" — a private Discord server where Crates and his agents can drop links, documents, and resource suggestions. The server has a specific channel design: #bulk-ingest (general), #high-signal-now (urgent override), and per-venture channels. Each message becomes an item with link(s), a short "why it matters" note, and optional tags. This is not yet implemented.

---

## Proposed Approach

1. **Discord server setup:**
   - Private server (Entif Intelligence Hub or similar)
   - Bot account with appropriate permissions

2. **Minimum channel design:**
   - `#bulk-ingest` — general intake channel; anything goes; Mailroom bot sorts it later
   - `#high-signal-now` — manual override; anything dropped here is treated as urgent/important
   - `#ventif` — Entif-specific resources
   - `#vrosetta` — Rosetta-specific resources
   - `#vieday` — VieDay-specific resources
   - `#vgenoper` — GenOper-specific resources
   - `#vother` — other ventures / cross-venture

3. **Discord message item schema** (maps to IntakeEnvelope via HF-003):
   - `links[]` — one or more URLs
   - `why_it_matters` — short note (even 1 sentence helps scoring); manual tags boost triage score
   - `manual_tags[]` — optional explicit tags (e.g., `#security`, `#agents`); boosts relevant triage dimensions
   - `author` — Discord user who submitted
   - `submitted_at` — message timestamp
   - `channel` — which channel it came from (affects sphere tagging)

4. **Bot behavior:**
   - Listens to all configured channels
   - On message with link(s): extract URL(s), note, and tags
   - Emits IntakeEnvelope to downstream pipeline (via webhook or direct queue)
   - Responds in-thread with confirmation: "📥 Received — queued for triage"

5. **Per-channel sphere tagging:**
   - Messages in #vrosetta auto-tag `sphere:rosetta`
   - Messages in #ventif auto-tag `sphere:entify`
   - Messages in #high-signal-now auto-tag `escalation:immediate`

6. **Audit:**
   - All submitted items stored with Discord message link for provenance
   - Bot responses stored linked to original message

---

## Acceptance Criteria

- [ ] Discord server created with all required channels
- [ ] Bot account created and configured with required permissions
- [ ] Bot listens to all channels and extracts link(s), note, and tags from messages
- [ ] Each message with links emits an IntakeEnvelope to the downstream pipeline
- [ ] Bot confirms receipt in-thread
- [ ] Per-channel sphere tagging applied automatically
- [ ] #high-signal-now messages route to Immediate Escalation tier regardless of content
- [ ] Discord message link stored as provenance reference

---

## Dependencies

- HF-003 (intake envelope schema; Discord adapter emits IntakeEnvelope)
- Discord bot token and server setup (non-technical prerequisite)

---

## Estimated Complexity

**Medium.** Discord bot development is well-documented; main complexity is in the channel configuration and ensuring the bot handles edge cases (no links, multiple links, edited messages, threads).

---

## Notes

- The "why it matters" note is explicitly described as boosting the triage score — even 1 sentence from a human is high-signal
- Manual tags should be treated as soft labels that boost the relevant triage dimensions, not hard overrides
- The per-venture channels allow agents to post curated finds directly — this is a lightweight way to get venture-specific signal into the pipeline
- Discord message link as provenance: "I saw this on Discord on [date]" — useful for audit and for tracing back to original context
