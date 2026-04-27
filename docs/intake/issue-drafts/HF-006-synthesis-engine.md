# Issue Draft: HF-006 — Synthesis Engine: Entif/Rosetta Mapping, Backlog Generator, Cross-Linker

## Metadata

- **Issue prefix:** HF-006
- **Title:** Implement synthesis engine: Entif/Rosetta mapping, backlog generator, cross-linker
- **Confidence:** high (three synthesizers explicitly defined; implementation not started)
- **Authority:** primary (sovereign user request)
- **Extraction source:** `docs/chats/20260301 - Chat GPT - HuggingFace Research Integration.md`
- **Labels:** HF-006, synthesis, cross-linker, backlog-generator, knowledge-graph
- **Status:** draft
- **Depends on:** HF-005
- **Blocks:** HF-007

---

## Problem Statement

Synthesis is where "reading becomes compounding." After deep ingest produces structured output, synthesis runs at least one of three synthesizers: (1) Entif/Rosetta mapping (which modules does this touch, which design docs does it strengthen/contradict, what new primitives should we add to the Rosetta schema?), (2) Backlog generator (emits 1–5 formal tickets), (3) Cross-linker (connects item to prior papers, notes, active projects). Synthesis is the mechanism that converts consumed content into actionable next steps. Not implemented.

---

## Proposed Approach

1. **Entif/Rosetta Mapping Synthesizer:**

   For each deeply ingested item, answer:
   - Which Rosetta modules does this touch? (spine, doc-intake, synthesis, tasking, memory, etc.)
   - Which existing design docs does this strengthen or contradict?
   - What new primitives (data types, interfaces, patterns) should be added to the Rosetta schema or ontology?
   - Output: structured mapping record with confidence levels per answer

2. **Backlog Generator Synthesizer:**

   Emit 1–5 formal backlog tickets per deeply ingested item. Each ticket includes:
   - `problem_statement` — what this paper/article enables or improves
   - `proposed_approach` — how to integrate this into Entif/Rosetta
   - `acceptance_criteria` — what "done" looks like
   - `dependencies` — what must be in place first
   - `estimated_complexity` — Small / Medium / Large / Unknown
   - `source_item_ref` — reference back to the ingested item

3. **Cross-Linker Synthesizer:**

   Connect the ingested item to:
   - Prior papers/articles in the knowledge base (by shared tags, shared concepts, shared authors)
   - Own notes (by semantic similarity to embeddings)
   - Active projects (by sphere tags matching project scope)
   - Output: list of connection records with similarity/confidence scores

4. **Trigger conditions:**
   - All three synthesizers run on every deeply ingested item (above-threshold routing from HF-004)
   - Watchlist-escalated items get priority synthesis (run within 24h)
   - Archive-only items do NOT trigger synthesis

---

## Acceptance Criteria

- [ ] All three synthesizers implemented and runnable on any deeply ingested item
   - [ ] Entif/Rosetta mapper outputs structured mapping with module touch points, design doc impacts, and new primitive suggestions
   - [ ] Backlog generator emits 1–5 formal tickets with all required fields
   - [ ] Cross-linker returns connections to prior items, notes, and active projects with confidence scores
- [ ] Synthesis is triggered automatically after deep ingest completes
- [ ] Escalated items get synthesized within 24h
- [ ] Synthesis outputs stored linked to source item

---

## Dependencies

- HF-005 (deep ingest produces the structured outputs that synthesis consumes)
- HF-004 (triage routing determines which items are deeply ingested)
- Knowledge graph / note system must exist or be built (cross-linker dependency)

---

## Estimated Complexity

**High.** Three distinct synthesizers with different internal logic; cross-linker requires a knowledge graph or similarity search infrastructure.

---

## Notes

- The cross-linker's value is in making "reading become compounding" — each new item connected to prior work means knowledge grows superlinearly
- Backlog tickets from synthesis should be reviewed by a human before entering the actual backlog (synthesis is suggestion, not commitment)
- The Entif/Rosetta mapper's "new primitives" output is the most speculative synthesizer — it requires the system to have enough self-awareness to know what primitives already exist
- Complexity class (Small/Medium/Large/Unknown) should map to time estimates: 1d / 3d / 1w+ / TBD
