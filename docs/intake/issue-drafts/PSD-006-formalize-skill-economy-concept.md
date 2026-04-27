# Issue Draft: PSD-006 — Formalize "Skill Economy" Concept

**Source:** `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md`
**Confidence:** MEDIUM

---

## Problem Statement

The extraction crystallizes a "Skill Economy" framing: "knowledge is a tiny ad and execution is an audited transaction." This is a compelling conceptual model that ties together progressive disclosure (economic trick), Rosetta ledger (audit backbone), and broker (selection intelligence) into a single coherent vision. However, this framing exists only in the chat — it's not formalized as a Rosetta design artifact.

---

## Desired Outcome

Formalize the Skill Economy concept as a Rosetta design document that:
1. Defines the economic metaphor precisely (what is "knowledge as ad", "execution as transaction")
2. Maps Rosetta components to economy roles (broker=bouncer, registry=market, receipts=ledger, Guard=regulator)
3. Specifies the transactions that constitute the skill economy (skill selection, skill loading, skill execution, eval scoring)
4. Links to existing Rosetta patterns (content-addressed tiles, receipts for every step, selection-first cognition)
5. Serves as a north-star reference for all skill-related implementation decisions

---

## References

- Extraction: `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md` — Section 7 (Skill Economy)
- Selection-first cognition principle from extraction Section 1: "intelligence is largely 'refuse to consider most of the space'"
- Rosetta spine: content-addressed, semantically typed tiles
- This framing should guide PSD-001 through PSD-005 implementation decisions

---

## TODO

- [ ] Write Skill Economy design doc under `docs/design/`
- [ ] Map economy metaphor to Rosetta component roles
- [ ] Specify economy transaction types and their audit requirements
- [ ] Align PSD-001 through PSD-005 implementation specs against this formalization
