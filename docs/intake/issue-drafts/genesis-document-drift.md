# Issue Draft: Build Genesis Document artifact and nightly drift detector

## Metadata
- **Extracted from:** `docs/external/Entif 2.0 - Enriched by External Advancements - 20251016.md`
- **Extraction date:** 2026-04-25
- **Status:** Draft

## Summary
Create the Genesis Document as an immutable root node in the knowledge graph, and implement a nightly drift detector that compares summaries and router policies against it. Deviations are flagged for human review.

## Details
Genesis Document role:
- Immutable root node in the graph
- Defines Entif's core architectural principles, operating constraints, and conceptual boundaries
- All summaries, routing policies, and architectural decisions are checked against it nightly
- Deviations flagged for review (not auto-corrected)

Nightly drift check:
- Compare: current summary text vs Genesis summary (conceptual drift)
- Compare: routing policy weights vs Genesis routing constraints
- Compare: agent role boundaries vs Genesis role fence definitions
- If drift > threshold: tag summaries for refresh, alert for review

The document says: "Genesis Document is an immutable root node in the graph. Nightly drift check compares summaries and router policies against Genesis; deviations flagged for review. Backups scheduled."

Genesis Document authorship: implied human-authored (architect/CEO Crates), not system-generated. Drift detection is system-owned.

## Acceptance Checks
- [ ] Genesis Document artifact created as a `.md` file in the repo
- [ ] Genesis Document loaded as root node in knowledge graph
- [ ] Nightly job compares current summaries against Genesis
- [ ] Nightly job compares routing policies against Genesis constraints
- [ ] Nightly job compares agent role boundaries against Genesis fence definitions
- [ ] Drift > threshold → flag for review + tag summaries for refresh
- [ ] Alert emitted (log entry or notification) on drift detection
- [ ] Genesis Document backup scheduled (git tag or blob store snapshot)
