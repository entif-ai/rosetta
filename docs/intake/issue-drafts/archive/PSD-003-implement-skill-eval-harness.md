# Issue Draft: PSD-003 — Implement Eval Harness for Skills

**Source:** `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md`
**Confidence:** HIGH

---

## Problem Statement

Skills in the progressive-disclosure system have no quality gate. The extraction specifies that every skill should have a first-class eval harness (matching Anthropic's skill-creator iterative loop: draft → run evals → grade → benchmark → improve), but no such harness exists in Rosetta.

---

## Desired Outcome

An eval harness where:
1. Each skill has 2–5 canonical eval prompts
2. Assertions are defined where objectives are objective: file exists, schema validates, diff matches patterns
3. A grading harness runs and saves benchmark reports as receipts
4. Broker uses those stats for ranking (pass/fail, tokens, latency, tool errors)

---

## References

- Extraction: `docs/intake/docs-intelligence/2026-04-25-progressive-disclosure-skill-system.md` — Section 4C (Evals are first-class)
- Anthropic skill-creator playbook: https://raw.githubusercontent.com/anthropics/skills/main/skills/skill-creator/SKILL.md
- Bootstrap plan step 4: "Wire eval harness"

---

## TODO

- [ ] Define eval harness data model (eval prompts, assertions, benchmark receipts)
- [ ] Implement grading harness execution engine
- [ ] Define benchmark receipt schema (pass/fail, tokens, latency, tool errors)
- [ ] Integrate benchmark receipts into broker ranking (skill pass-rate stats)
- [ ] Ensure every skill run writes a benchmark receipt
