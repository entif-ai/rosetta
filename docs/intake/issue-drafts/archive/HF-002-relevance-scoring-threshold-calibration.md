# Issue Draft: HF-002 — Relevance Scoring Threshold and Six-Dimension Score Vector Calibration

## Metadata

- **Issue prefix:** HF-002
- **Title:** Define and calibrate relevance scoring threshold and six-dimension score vector
- **Confidence:** high (six dimensions and escalation threshold defined; calibration not yet done)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-002, scoring, triage, calibration, relevance
- **Status:** draft
- **Depends on:** HF-001
- **Blocks:** HF-001 (threshold is TBD — run with placeholder initially)

---

## Problem Statement

The six relevance score dimensions are defined (Stack impact, Time-to-value, Novelty, Credibility, Leverage, Risk relevance) and the three-tier triage routing is specified (Archive-only / Queue deep ingest / Immediate escalation), but the threshold value is explicitly TBD and has never been calibrated against actual paper data. Without calibration, the triage gate is arbitrary and likely misfires.

---

## Proposed Approach

1. **Define the six score dimensions formally:**
   - **Stack impact** — touches architecture / orchestration / security / memory components of Entif or Rosetta
   - **Time-to-value** — actionable within 1–30 days
   - **Novelty** — not already in the internal knowledge base
   - **Credibility** — source signal and citation quality
   - **Leverage** — compounding benefit across multiple ventures
   - **Risk relevance** — threat intel, safety, legal/compliance relevance

2. **Build a calibration reference set:**
   - Curate a set of 20–30 papers that are KNOWN to be relevant or irrelevant to Entif/Rosetta (ground truth from Crates or prior analysis)
   - Score the calibration set manually using the six dimensions
   - Use the distribution of calibration scores to set the threshold empirically

3. **Threshold strategy:**
   - Start permissive (e.g., score >= 40 triggers deep ingest)
   - Track precision/recall informally: are above-threshold papers actually getting used?
   - Tighten after 2–4 weeks of scoring data

4. **Score vector implementation:**
   - Each dimension scored 0–20 (six dimensions × max 20 = max 120, normalized to 0–100 for total)
   - Score vector stored as named dimensions alongside total score
   - Score vector enables post-hoc explanation of "why it scored high"

5. **Watchlist topics:**
   - Define a watchlist of topics that always trigger Immediate Escalation regardless of score (e.g., "new auth bypass vector", "agent sandbox escape", "memory leakage", "copyright/ToS changes affecting AI systems")

---

## Acceptance Criteria

- [ ] Six-dimension score vector formally defined in code/schema
- [ ] Calibration reference set of 20–30 papers established with ground-truth labels
- [ ] Threshold set empirically from calibration set distribution
- [ ] Watchlist topics defined and implemented as score-independent escalation triggers
- [ ] Threshold is adjustable without code changes (config/environment variable)

---

## Dependencies

- HF-001 (pipeline must be running to generate scoring data for calibration)
- Calibration reference set requires Crates input or prior known-paper analysis

---

## Estimated Complexity

**Low–Medium.** Primarily a scoring schema and calibration exercise. Main work is defining the reference set and building the adjustment mechanism.

---

## Notes

- Threshold calibration should be revisited quarterly as Entif/Rosetta priorities evolve
- The "immediate escalation" watchlist topics should be reviewed monthly
- Score vector provides explainability: "why did this paper score 78?" — this is critical for user trust and iteration
