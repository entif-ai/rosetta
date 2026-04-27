# Issue Draft: PSD-002 — Implement Skill Broker Pipeline

**Source:** `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md`
**Confidence:** HIGH

---

## Problem Statement

Rosetta has no Skill Broker. The progressive-disclosure system requires a bouncer-with-clipboard component that, given a `need` (user ask + task context), returns a short targeted list of relevant skills ranked by confidence.

The extraction fully defines a 5-stage pipeline: Hard Filters → Lexical+Embedding Retrieval → Graph Boost+Penalties → Shortlist+Explain → Escalation.

---

## Desired Outcome

A Skill Broker that:
1. Accepts inputs: `need`, `mode` (Parse-Only/Command), `available_tools`, `budgets`, `history`
2. Runs the 5-stage pipeline (cheap → expensive ordering)
3. Returns top 3–7 skills with `why_selected`, expected cost band, risk band
4. Escalates to "extend existing skill" or "author new skill" only when confidence threshold isn't met

---

## References

- Extraction: `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md` — Section 3 (Skill Broker Pipeline)
- Bootstrap plan step 2: "Implement Broker v0" (hybrid search + top-5, no graph boosts initially)
- Broker pipeline stages defined in detail in extraction Section 3

---

## TODO

- [ ] Define broker input interfaces (`need`, `mode`, `available_tools`, `budgets`, `history`)
- [ ] Implement Hard Filters stage (mode gate, tool gate, domain gate)
- [ ] Implement Lexical+Embedding Retrieval stage (BM25 + vector hybrid, K=25)
- [ ] Implement Graph Boost+Penalties stage (linked tile boost, low pass-rate penalty)
- [ ] Implement Shortlist+Explain stage (top 3–7 with why_selected, cost, risk)
- [ ] Implement Escalation stage (extend vs. author new)
- [ ] Write benchmark receipts for broker invocations
- [ ] Integrate with Skill Registry (PSD-001 prerequisite)
