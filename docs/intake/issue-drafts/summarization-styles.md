# Issue Draft: Implement summarization style templates (Family/MoM/YT)

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Implement domain-specific summarization templates: Family call (brief + tone markers + commitments + next check-in), Client meeting (MoM: agenda + decisions + requirements + risks + next steps), YouTube learning (bullets + claims + methods + links + hypotheses to test).

## Details
Three summarization styles, each with distinct output format and trigger conditions:

**Family call style:**
- Trigger: channel = "family" (inferred from contact/relation mapping)
- Output: brief narrative, tone markers (warm/concerned/excited/etc.), explicit commitments with owners, next check-in date
- Tone: warm, personal, not corporate

**Client meeting (MoM) style:**
- Trigger: channel = "client" (inferred from contact/relation mapping)
- Output: Agenda bullets, Decisions made (with rationale), Requirements (with owners), Risks identified, Next steps (with owners/dates)
- Tone: professional, structured, decision-centric

**YouTube learning style:**
- Trigger: channel = "yt" (inferred from YouTube player state)
- Output: Key claims (bullet list), Methods/techniques described, Links/resources cited, Hypotheses to test
- Tone: analytical, curious, actionable

Implementation: map-reduce summary pyramid:
- Level 1: chunk → section summary
- Level 2: section → document summary
- Level 3: document → topic/entity rollup
- Both abstractive and extractive variants stored with freshness windows and drift scores

## Acceptance Checks
- [ ] Summarizer accepts `style: "family" | "mom" | "yt"` parameter
- [ ] Family style output: brief narrative + tone markers + commitments + next_check_in
- [ ] MoM style output: agenda + decisions + requirements + risks + next_steps
- [ ] YT style output: claims + methods + links + hypotheses_to_test
- [ ] Both abstractive and extractive variants generated
- [ ] Output carries evidence spans for auditability
- [ ] Drift score attached: summary freshness tracked
