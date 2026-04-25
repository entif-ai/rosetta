# Issue Draft: OQ-4 — Slug Adoption Timing vs Hydration Quality Unresolved

## Metadata

- **drafted:** 2026-04-25T00:45:00Z
- **source:** docs/RFCs/20260412 - Rosetta - OMOC - Swarm Gnosis Protocol Spec.md §18 OQ-4; §9.4
- **extracted by:** docs-intelligence agent (heartbeat cycle)

---

## Problem Statement

The OMOC-Swarm Gnosis RFC introduces the **slug** concept ( §9.4) as the semantic latticing primitive:

- **Optical slugs** represent visually compressed or rendered evidence
- **Symbolic slugs** represent high-density conceptual bundles, route plans, or semantic subgraphs
- A slug is not merely a hash — it is a compact, addressable, provenance-linked handle into a rehydratable semantic or evidential structure

The document explicitly commits to the slug doctrine:

> "This is how context grows without dragging raw prose through every pass."

However, the document also explicitly defers the operational question:

> **"How aggressively should symbolic/optical slugs be adopted before hydration quality becomes a bottleneck?"** (§18, OQ-4)

Hydration quality refers to the fidelity and latency of reconstructing a full semantic context from a compact slug at retrieval time. If slugs are adopted too aggressively before the hydration pipeline is mature, the system may experience:
- Loss of nuance or precision when decompressing slugs
- Latency spikes during context reconstruction
- brittleness if slug format evolves but older slugs cannot be reliably hydrated

This is a classic early-adoption vs. infrastructure-maturity tension.

---

## Evidence

1. **Slug doctrine is normative in §9.4**: "A slug is not merely a hash. It is a compact, addressable, provenance-linked handle into a rehydratable semantic or evidential structure." The document treats slugs as a first-class architectural primitive, not an experimental idea.

2. **Tack 1 (context compiler + stable bands)** is the natural home for slug adoption — it is about "compiled context object / stable/semi-stable/dynamic bands / cache-domain tagging / measurable cache-hit improvement." Slugs are directly relevant to context compilation and compression.

3. **Hydration quality risk**: §9.4 does not define a hydration fidelity metric, a latency SLO, or a decompression error rate threshold. These are needed before slugs can be adopted in production.

4. **Open question explicitly flagged** (§18 OQ-4): The document itself identifies this as a performance and quality risk that requires empirical resolution.

5. **Slug adoption interacts with Tack 4 (memory substrate integration)** and **Tack 5 (MR TECH LEAD reliability lane)** — slugs stored in memory must be reliably retrievable and rehydratable across all memory planes.

6. **Stable prompt bands (§9.3)** provide an alternative to slugs for cache efficiency — the four-band model (Band 1 constitutional / Band 2 domain primitives / Band 3 session-local / Band 4 turn-local) allows context compiler to minimize edits to higher bands and push volatility downward. This is a complementary mechanism that may reduce pressure to adopt slugs early.

---

## Impact if Unresolved

- Tack 1 context compiler may over-invest in slug infrastructure before hydration is proven
- Memory substrate (Tack 4) may design slug storage before hydration quality is measured
- Systems that adopt slugs aggressively may experience context reconstruction failures or latency spikes in production
- The compression ratio KPI (§14.2 — "compiled context compression ratio") cannot be cleanly measured if the boundary between slugs and prose is undefined

---

## Options

### Option A: Defer slug adoption to Tack 4 (memory substrate integration)
- Implement context compiler (Tack 1) using stable bands only, no slugs
- Reserve slug adoption for Tack 4 when memory substrate is integrated and hydration can be measured
- Conservative; ensures hydration maturity before slug investment

### Option B: Adopt slugs in Tack 1 with explicit hydration quality gates
- Adopt slugs in Tack 1 as the primary context compression mechanism
- Define explicit hydration quality metrics (fidelity score, decompression latency, error rate)
- Instrument hydration quality from day one; abort slug adoption if quality gates fail
- Aggressive but controlled

### Option C: Dual-track — use stable bands as primary, slugs as experimental lane
- Implement Tack 1 context compiler using stable bands as the primary mechanism
- Run slugs as a parallel experimental track with separate instrumentation
- Decide between bands and slugs based on empirical comparison after Tack 1
- Aligns with Option D for OMOC routing (deterministic baseline + parallel experiment)

### Option D: Hybrid — slugs for Band 3-4 (session/turn-local) only; Band 1-2 use canonical references
- Adopt slugs only for volatile, frequently-recompiled context (Band 3-4)
- Keep constitutional (Band 1) and stable domain primitives (Band 2) as canonical references with no slug abstraction
- Limits hydration risk to session-local material; constitutional context remains stable and directly addressable

### Option E: Research-first — define hydration quality benchmarks before any adoption decision
- Do not implement slugs in any tack until hydration quality benchmarks are defined and measured
- Use Tack 1 to establish baseline compression metrics with prose-only context
- Design slug format and hydration pipeline as a prerequisite to adoption
- Maximum caution; may delay context compiler optimization

---

## Recommendation

**Option C (dual-track)** is the most aligned with the document's own epistemic sequencing principles:

1. Implement Tack 1 context compiler with stable bands as the primary mechanism (no slugs as default)
2. Run slugs as a parallel experimental track within Tack 1, instrumented separately
3. Define and track hydration quality metrics from the start: fidelity score, decompression latency, error rate
4. After Tack 1 completes (or at Tack 4 when memory substrate is integrated), compare:
   - Stable bands only → compression ratio, cache-hit rate
   - Bands + slugs → compression ratio, cache-hit rate, hydration quality
5. Make slug adoption decision based on empirical comparison, not speculation

This approach:
- Keeps Tack 1 on schedule (bands work, proven mechanism)
- Generates empirical data for the OQ-4 decision
- Does not block Tack 4 (slug design can proceed in parallel)
- Aligns with the document's preference for staged, evidence-driven decisions

The document's own principle: "How aggressively should symbolic/optical slugs be adopted before hydration quality becomes a bottleneck?" — the answer is "measure hydration quality first."

---

## Labels

`slugs`, `hydration`, `context-compiler`, `tack-1`, `tack-4`, `open-question`, `performance`, `compression`, `stable-bands`

---

## Depends On

- OQ-4 resolution (open question — empirical)
- Tack 1 (context compiler + stable bands) — slug adoption timing is a Tack 1 output decision
- Tack 4 (memory substrate integration) — slug storage and hydration in memory planes
- Hydration quality benchmark definition (required before any adoption decision)
- No hard technical blockers — this is a timing and risk management decision