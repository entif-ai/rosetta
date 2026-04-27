# Issue Draft: 7 Proposed ROCK Specs + 1 Playbook — Uncommitted, Proposal Bloat Risk

## Metadata

- **drafted:** 2026-04-25T00:45:00Z
- **source:** docs/RFCs/20260412 - Rosetta - OMOC - Swarm Gnosis Protocol Spec.md §17
- **extracted by:** docs-intelligence agent (heartbeat cycle)

---

## Problem Statement

Section 17 of the OMOC-Swarm Gnosis RFC proposes a suite of 8 companion documents:

- **ROCK-3201** — OMOC Core Pack Specification
- **ROCK-3202** — Epistemic Provenance and Allowed Use Profile
- **ROCK-3203** — Semantic Gauge Blocks and Alignment Fixtures
- **ROCK-3204** — Compiled Context and Tapestry Runtime Profiles
- **ROCK-3205** — Swarm Gnosis Federation Profile
- **ROCK-3206** — Cognitive Operators and Razors Pack
- **ROCK-3207** — MR TECH LEAD Compute Integration Guide
- **ENTIF-OMOC-001** — Implementation Playbook

**None of these documents have been written.** The section proposes IDs and scope but provides no content, no authors, no timelines, no acceptance criteria, and no prioritization.

This is a classic proposal-bloat pattern: a working draft that generates a list of future work without committing to a specific sequence, resource allocation, or first-deliverable selection. The risk is that the spec suite becomes a deferred obligation that crowds out actual implementation.

---

## Evidence

1. **Section 17 is a list of titles and one-line descriptions** — no document body, no scope detail, no author assignment, no dependencies mapped beyond the vague "all as packs, profiles, or implementation guides rather than Rosetta-core revisions."

2. **No prioritization within the 8 items** — ROCK-3201 (OMOC Core Pack) is directly on the critical path for Tack 3 (§16.4). ROCK-3207 (MR TECH LEAD Compute Integration Guide) is largely informative. No ordering is given.

3. **Existing extraction already identified 2 open issues (IC-OMOC-001, IC-OMOC-002)** that block ROCK-3201 and ROCK-3205 specifically — but the document does not link those blockers to the spec list.

4. **The document's own build methodology (§3.8 / §16)** argues for epistemic sequencing: build what resolves the most dangerous uncertainty and unlocks the next decision. Section 17 does not apply this filter to its own spec list.

5. **ENTIF-OMOC-001 (Implementation Playbook)** is described as "thin vertical slices, repo structure, test harnesses, acceptance gates, and microtiers" — this is a significant deliverable with no owner, no scope definition, and no relationship to the 8-tack build order.

---

## Impact if Unaddressed

- The 8-item list becomes a vague backlog that no one owns
- Implementers may attempt to write specs out-of-sequence, causing dependency confusion
- No clear first deliverable; no pressure on a specific spec to be completed before another
- Risk that proposal bloat signals insufficient commitment to actual build
- The build order (Tack 0-7) cannot be cleanly mapped to the spec suite without prioritization

---

## Options

### Option A: Commit to a sequenced spec plan with owners and dates
- Define a delivery sequence for the 8 specs aligned to the 8-tack build order
- Assign owners or agentic responsibility per spec
- Set explicit dependencies: ROCK-3201 must precede Tack 3; ROCK-3205 must follow OQ-6 resolution
- Produce a project board that maps specs to tacks

### Option B: Treat section 17 as aspirational — remove from formal spec record
- Accept that §17 is a sketch, not a commitment
- Remove the spec IDs from the formal document record
- Let spec production be demand-driven from the tack execution
- Risk: no forward-looking spec roadmap

### Option C: Down-select to the 2-3 highest-priority specs and write those first
- Prioritize ROCK-3201 (OMOC Core Pack — on Tack 3 critical path) and ROCK-3205 (Swarm Gnosis Federation Profile — on Tack 7 critical path)
- Write those first; treat the rest as future work
- Reduces proposal bloat while keeping the roadmap visible

### Option D: Convert section 17 into a formal ADR (Architecture Decision Record)
- Treat the spec suite as an ADR: "Should we produce these 8 companion specs?"
- ADR process forces explicit decision, ownership, and consequences
- Aligns with the architecture's own preference for explicit decision records over implicit deferrals

---

## Recommendation

**Option D (convert to ADR)** combined with a sequenced first-deliverable commitment:

1. Convert the §17 spec list into a formal ADR: "ADR-OMOC-001: Produce 8 companion specs for OMOC-Swarm Gnosis doctrine"
2. The ADR must state which specs are on critical path (ROCK-3201 for Tack 3, ROCK-3205 for Tack 7)
3. The ADR must identify the first spec to be written (ROCK-3201, per Tack 3 dependency)
4. Remaining specs are sequenced by build-order dependencies and tracked as future work
5. ENTIF-OMOC-001 (Implementation Playbook) should be scoped separately — it is a deliverable, not a specification, and belongs in the project plan rather than the spec suite

The document's own principles (§3.8, §16) demand epistemic sequencing. Apply it to the spec suite itself.

---

## Labels

`rock-specs`, `proposal-bloat`, `spec-suite`, `implementation-commitment`, `adr`, `build-order`, `tack-3`, `tack-7`

---

## Depends On

- OQ-1 resolution (ROCK-3201 blocked on routing mechanism choice)
- OQ-6 resolution (ROCK-3205 blocked on public commons governance)
- Tack 0 completion (all specs require Rosetta stable foundation)
- No other specs depend on this issue — it is a coordination risk, not a technical blocker