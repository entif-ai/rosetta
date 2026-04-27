# Issue Draft: PSD-005 — Route Skills Through Guard + Receipts

**Source:** `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md`
**Confidence:** HIGH

---

## Problem Statement

In the progressive-disclosure model, skill selection is advisory — not permission. Tool invocation must always be mediated by Guard policy, and every skill run must emit a receipt. The extraction states this is a non-negotiable safety architecture, but it's not yet enforced in code.

---

## Desired Outcome

Enforce for all skill executions:
1. **Deny-by-default** capability execution through Guard gateway (skill selection ≠ permission)
2. **Parse-Only as default mode**; Command mode explicitly invoked
3. **Receipts for every step**: selected skill IDs, versions, resources loaded, tools called, costs
4. Provable chain: "why did we choose this skill, what did it do, what evidence did it produce"

This is required by Rosetta's existing architecture and is the audit backbone of the Skill Economy concept.

---

## References

- Extraction: `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md` — Section 5 (Safety Architecture)
- Bootstrap plan step 4 (every skill run writes benchmark receipt)
- Extracted safety principles: deny-by-default Guard, Parse-Only default, receipts for every step

---

## TODO

- [ ] Audit existing Guard implementation for skill-execution mediation
- [ ] Enforce Parse-Only as default; Command mode requires explicit Guard pass
- [ ] Define skill execution receipt schema (skill IDs, versions, resources loaded, tools called, costs)
- [ ] Instrument all skill runs to emit receipts
- [ ] Verify provable chain: broker selection reason → skill execution → output evidence
