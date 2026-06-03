# CMT-001: Adopt 3-tier Context Architecture as Explicit Rosetta Design Principle

## Metadata

- **Type:** architecture
- **Status:** draft
- **Labels:** `context-management`, `architecture`, `docs-intelligence`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Finding T1)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`

## Summary

Formalize the 3-tier context architecture (Constitution / Specialist Agents / Subsystem Knowledge Base) as an explicit, named design principle in Rosetta's architecture documentation. The white paper (2602.20478v1.pdf) reports this pattern growing to ~24% of a 108k-line codebase — context infrastructure at scale is a first-class architectural concern, not a prompt engineering afterthought.

## Problem Statement

Currently, Rosetta lacks an explicit first-class treatment of context management as infrastructure. Agentic runs rely on implicit context-gathering behavior, which is not versioned, not enforced, and not systematically maintained. This creates:
- Planner-coder drift
- Inter-agent misalignment
- Inconsistent rigor across runs
- No mechanism for targeted retrieval of subsystem knowledge

## Proposed Resolution

1. Add a named "3-Tier Context Architecture" section to Rosetta's architecture docs (target: `docs/live/` or `docs/RFCs/`)
2. Define the three tiers explicitly:
   - **Tier 1 — Constitution (hot memory):** Single concise file, hard dependency of every run
   - **Tier 2 — Specialist Agents (domain priming):** Constrained context bundles, not personas
   - **Tier 3 — Subsystem Knowledge Base (cold memory):** AI-readable, narrowly scoped, retrieved on demand
3. Add the 24% ratio finding as a sizing benchmark: context infrastructure should be planned as ~20-25% of total codebase effort at scale
4. Add this as an architectural invariant for any agentic run: "context must be available as structured infrastructure, not embedded in prompts"

## Dependencies

- None (foundation issue)

## Impact If Not Addressed

Context management continues to be treated as ad hoc. At scale, this creates fragile agentic behavior, inconsistent reasoning quality, and no recovery path when context is missing or wrong.

## Related Issues

- CMT-002 (Project Constitution)
- CMT-003 (Context Router)
- CMT-004 (Trigger Routing)
- NOT LAME: Context Compiler + Query Router
