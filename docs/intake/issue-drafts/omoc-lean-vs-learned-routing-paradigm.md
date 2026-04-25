# Issue Draft: OMOC Routing — Deterministic vs. Learned

**Doc intelligence source:** `docs/RFCs/20260412 - Rosetta - Ontological Mixture of Concepts (OMOC) - Swarm Gnosis Protocol Spec.md`

**Extraction timestamp:** 2026-04-24

**Status:** open — research spike required before OMOC can be fully specified

---

## Problem Statement

Section 8.1 of the OMOC spec raises the fundamental question: **how much of OMOC routing should be deterministic rule-based, and how much should be learned from patterns?**

This is not a minor parameterization question. The choice between deterministic and learned routing determines:

- whether OMOC can be audited and explained
- whether routing behavior can be reproduced across runs
- the failure modes when routing misses occur
- whether OMOC can be verified formally
- the latency profile of routing decisions

## Evidence from Source

**Section 8.1:**
> "The core objection to naive MoE framing is sound: 'expert' is both too broad and too brittle. Experts often contain internally mixed concepts already, while niche crossovers frequently appear exactly where no single named expert exists. OMOC therefore changes the routing primitive from expert identity to conceptual composition."

**Section 8.4 (utility formula):**
> `Utility_i(q) = aN*N_i(q) + aR*R_i(q) + aV*V_i(q) + aS*S_i(q) - aC*Cost_i(q) - aK*Risk_i(q)`

The formula is presented as normative, but the weights (aN, aR, aV, aS, aC, aK) are not specified — suggesting these could be learned, hand-tuned, or hybrid.

**Section 8.4 (survivorship):**
> `Survivorship_i = max Utility_i(c) for c in adjacent_contexts(q)`

Again, an aggregate over contexts — potentially learnable from observed utility across sessions.

**Section 18 (Open Question 1):**
> "How much of OMOC routing should be deterministic, and how much learned?"

The document explicitly refuses to resolve this.

## Three Candidate Positions

### Position A: Fully Deterministic

OMOC routing is a set of explicit rules over concept signatures, tranche weights, applicability scopes, and survivorship thresholds. No learned component.

**Pros:**
- Fully auditable and explainable
- Reproducible across runs
- Formally verifiable
- Simple failure modes (rule miss = explainable mismatch)

**Cons:**
- Cannot adapt to emergent concept crossover patterns not in the rule set
- Requires manual curation of all routing rules
- brittle at edges where concept intersections create novel problem types

### Position B: Fully Learned

OMOC routing is trained from observed concept-simplex → successful delegate mappings across sessions.

**Pros:**
- Adapts to emergent crossover patterns automatically
- Can discover routing strategies humans didn't explicitly encode
- Improves with scale

**Cons:**
- Opacity — routing decisions become hard to audit
- Non-deterministic — same input may route differently across model versions
- Requires training corpus of successful routing episodes
- Failure modes are less predictable

### Position C: Hybrid (Deterministic Core + Learned Adaptation Layer)

A deterministic routing engine handles the known tranche structure and explicit concept matching. A learned adaptation layer adjusts weights, survivorship scores, and applicability thresholds based on observed outcomes.

**Pros:**
- Audit trail for core routing logic
- Adaptive improvement over time
- Explainable base with learned refinement

**Cons:**
- More complex architecture
- Requires careful separation of what is deterministic vs. learned
- Still has some opacity in the adaptation layer

## Recommendation

This issue requires a dedicated research spike before OMOC routing can be fully specified.

The spike should produce:
1. A minimum viable deterministic routing baseline (concept signature matching + tranche selection)
2. An evaluation harness for measuring routing quality across a benchmark set of tasks
3. A clear definition of what "learned" means in this context (weight tuning? neural routing? both?)
4. A decision criteria document that can be reviewed by architecture governance

**This issue blocks:** OMOC routing prototype (Tack 3) — cannot finalize the route plan compiler without knowing the routing paradigm.

---

## Related Issues

- swarm-federation-governance-complexity.md (same source doc)
- ENGRAM + Rosetta pairing needs implementation clarity (same source doc)
- 7 ROCK-family companion specs proposed but not yet written