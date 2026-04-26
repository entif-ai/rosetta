# Issue Draft: OMOC Lean vs Learned — Routing Mechanism Unresolved Before Tack 3

## Metadata

- **drafted:** 2026-04-25T00:30:00Z
- **source:** docs/RFCs/20260412 - Rosetta - OMOC - Swarm Gnosis Protocol Spec.md §18 OQ-1; §8.1-8.5
- **extracted by:** subagent c15f0ba4-d823-45dd-a20d-8705a94da346

---

## Problem Statement

OMOC (Ontological Mixture of Concepts) is the routing doctrine at the core of the Entif/Rosetta architecture. It is scheduled as **Tack 3** deliverable: a concept signature extractor, delegate schema, route-plan compiler, and cross-context survivorship logic.

However, the document explicitly leaves unresolved the fundamental question:

> **"How much of OMOC routing should be deterministic, and how much learned?"** (§18, OQ-1)

This is not a minor footnote. The routing mechanism choice fundamentally shapes:
- Whether the system can explain its routing decisions
- How adaptive the system is to novel crossover problems
- Whether session-resume and survivorship scoring can be implemented reliably
- The testing and verification surface for the entire cognitive routing layer

---

## Evidence

1. **OMOC routing prototype is Tack 3** (§16.4): Acceptance gate is that "the system chooses different conceptual delegate sets for different tasks without manual persona curation." No determination of mechanism.

2. **OMOC is described as a doctrine, not an implementation** (§8): The document describes concept tranches, simplexes, delegate profiles, survivorship scoring — but always in terms of "should" and "recommends," never as a committed mechanism. The Utility function in §8.4 uses parameterized weights (aN, aR, aV, aS, aC, aK) — where do these come from? Learned? Hand-tuned? Both?

3. **Session resumption requirement** (§8.5): "If a previous task already created a high-value crossover region, the system SHOULD be able to resume that conceptual room rather than recreate from scratch." Whether this is learnable or requires deterministic signatures is unresolved.

4. **Survivorship scoring** (§8.4): "Cross-context survivorship across adjacent or known relevant contexts." The `max Utility_i(c)` for adjacent contexts implies the system needs to track and compare across contexts — but whether this is a learned scoring function or a deterministic rule-base is unstated.

5. **Open research questions explicitly include this** (§18 OQ-1): The document itself flags this as unresolved.

---

## Impact if Unresolved

- Tack 3 acceptance gate cannot be passed cleanly — the team will have to make the mechanism choice without architectural guidance
- Route plan compilation could be under- or over-engineered depending on whether the mechanism is simple rules or learned
- Survivorship scoring implementation will be blocked
- Session resumption capability cannot be specified
- The eight companion specs (ROCK-3201 through ROCK-3207) cannot be finalized without this choice propagating through

---

## Options

### Option A: Purely deterministic (rule-based)
- OMOC routing uses explicit rule engines over concept signatures
- Fixed utility function with hand-tuned weights
- Explainable, auditable, testable
- Risk: may not handle novel crossover problems well
- Likely simpler to implement for Tack 3 MVP

### Option B: Purely learned
- OMOC routing uses a learned model to score concept tranches and select delegates
- Weights learned from experience
- Risk: harder to audit; may fail silently on novel domains; needs training data pipeline
- More powerful for edge cases

### Option C: Hybrid (deterministic with learned refinement)
- Baseline rule-based routing with learned weight adjustment over time
- Preserves auditability for core decisions while enabling adaptation
- More complex to implement but more robust

### Option D: Defer to evaluation — build both, compare
- Implement deterministic baseline for Tack 3
- Build learnable layer as a parallel experiment
- Decide after empirical comparison on a benchmark suite

---

## Recommendation

Resolve this as an architectural decision before proceeding with OMOC spec finalization (which feeds into ROCK-3201 and the Tack 3 acceptance gate). 

The document's own principle in §3.8 (build order follows epistemic sequencing) argues for resolving OQ-1 before building Tack 3.

Recommend **Option D (defer to evaluation)** — deterministic baseline for Tack 3, parallel learnable experiment — because:
1. Keeps Tack 3 on schedule
2. Generates empirical data for the decision
3. Avoids blocking OMOC prototype on an unresolved research question
4. Consistent with the phased build philosophy in §11.6

---

## Labels

`omoc`, `routing`, `deterministic`, `learned`, `build-order`, `tack-3`, `open-question`

---

## Depends On

- OQ-1 resolution (research question)
- ROCK-3201 (OMOC Core Pack Specification) — cannot be finalized without this
- Tack 3 acceptance gate — blocked until mechanism chosen