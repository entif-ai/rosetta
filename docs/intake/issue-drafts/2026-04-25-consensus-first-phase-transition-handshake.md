# Issue Draft: Implement Phase Transition Handshake Protocol

**Draft date:** 2026-04-25
**Source doc:** docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md
**Extraction:** docs/intake/docs-intelligence/2026-04-25-consensus-first-commitment-scoping-framework.md

---

## Problem Statement

The Consensus-First Commitment Scoping Framework defines a hard rule: no workflow phase transition (ideation → spec, spec → build, build → GA, etc.) is automatic. At every transition point, four mandatory questions must be answered explicitly. No equivalent mechanism exists in the Rosetta workflow engine.

## Evidence

From the source PRD:

> "Hard rule: no transition (ideation → spec, spec → build, build → GA, etc.) is automatic."

> At every transition point, the agent must ask:
> 1. "Is the next artifact class ready to be created now?"
> 2. "What critical perspectives are missing?"
> 3. "What is the strongest informed objection? Has it been understood?"
> 4. "Is this a two-way or one-way door at this next step?"

> "Only after explicit 'yes' (or explicit 'yes, with reservations documented') does the agent produce the next artifact."

## Questions to Resolve Before Implementation

1. How is "explicit yes" recorded? Is this a guard token, a receipt, a sign-off field in the artifact?
2. Who has authority to answer "yes" — the agent, a human, a governance guard?
3. How does the workflow engine detect that a transition is being requested vs. general synthesis?
4. What happens when the answer to any of the four questions is "no" or "unknown"?
5. Does "yes with reservations documented" produce a special artifact variant (e.g., "provisional spec")?
6. How does this interact with existing Nx workspace phase definitions (TC-001 through TC-007)?

## Labels

governance, workflow, phase-transition

## Status

draft
