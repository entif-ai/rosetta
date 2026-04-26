# Issue Draft: HF-001 — HuggingFace Daily Trending-Papers Sweep Pipeline

## Metadata

- **Issue prefix:** HF-001
- **Title:** Implement HuggingFace daily trending-papers sweep pipeline
- **Confidence:** high (explicit user intent, first-priority scheduled task)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** huggingface, research-pipeline, daily-automation, entif, rosetta
- **Status:** draft
- **Depends on:** —
- **Blocks:** HF-002, HF-004, HF-005, HF-006, HF-007

---

## Problem Statement

Crates specified a daily HuggingFace trending-paper check as one of the first scheduled tasks for his Claw orchestration layer. The pipeline must: pull daily trending papers, extract title/URL/abstract, classify by subject matter and impacted spheres, score for Entif/Rosetta relevance, store all records append-only regardless of score, and escalate above-threshold papers to full ingestion and backlog ticketing. This is not yet implemented.

---

## Proposed Approach

1. **Source access:** Identify and implement access to the HuggingFace trending papers leaderboard (public endpoint; no auth expected for public leaderboard views). Evaluate HF Spaces API, scraping, or RSS alternatives.

2. **Daily storage artifact schema** (minimum fields):
   - `date_collected` (ISO date)
   - `paper_id` (stable ID from HF or hash of URL+title)
   - `title`
   - `url` (canonical HF paper URL)
   - `abstract`
   - `tags_subject[]` (subject matter tags: security, agents, HCI, governance, hardware, OSINT, etc.)
   - `tags_spheres[]` (impacted spheres: Entif core, Rosetta spine, OpenClaw/ZeroClaw, GenOper, VieDay, media ops, etc.)
   - `relevance_score` (0-100, plus optional score_vector breakdown)
   - `notes/summary` (short distillation)
   - `retrieved_at` (ISO timestamp)
   - `receipts` (hashes, request IDs, tokens/cost/runtime)

3. **Storage discipline:** All daily records stored append-only regardless of score. No deletion of below-threshold items. Audit-friendly.

4. **Escalation rule:** If `relevance_score >= threshold` (threshold TBD — see HF-002):
   - Download full paper (PDF/HTML)
   - Parse + ingest contents
   - Create backlog ticket for deconstructing and integrating into Entif/Rosetta

5. **Scheduling:** Daily cadence via Claw orchestration (cron or scheduled agent task).

---

## Acceptance Criteria

- [ ] Daily run produces a storage artifact with all minimum fields for each trending paper discovered
- [ ] All records stored append-only; no overwrite or deletion of prior records
- [ ] Above-threshold papers trigger full paper download + backlog ticket creation
- [ ] Receipts metadata (request IDs, timestamps) included in every record
- [ ] Run is automated and unattended; no manual trigger required for daily execution
- [ ] Pipeline is observable: logs, error handling, and delivery confirmation

---

## Dependencies

- HF-002 (threshold calibration) — threshold is TBD; pipeline can run with placeholder threshold initially
- Backlog system must exist (GitHub Issues, Linear, or Rosetta's own backlog)

---

## Estimated Complexity

**Medium.** Core data pipeline with external API dependency and structured storage. Main complexity is the triage gate and escalation flow.

---

## Notes

- The original spec defined the minimum schema explicitly; this issue should preserve those field names and semantics
- Threshold TBD: start permissive (low threshold) and tighten empirically after 2-4 weeks of scoring data
- "Above-threshold" backlog ticket format: problem statement + proposed approach + acceptance criteria + dependencies + estimated complexity class
