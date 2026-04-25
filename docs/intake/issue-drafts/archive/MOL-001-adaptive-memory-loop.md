# MOL-001: Moltron's Self-Evolution Loop Should Inform the Adaptive Memory Plane

## Metadata

- Type: enhancement
- Status: draft
- Labels: adaptive-memory, skill-hardening, self-repair
- Source doc: `docs/external/Moltron.md`
- Extraction date: 2026-04-25
- Evidence: Moltron evolution graph (6-step loop)
- Depends on: NOT LAME skillpack-importer (not yet merged)

## Summary

Moltron defines a concrete 6-step self-evolution loop for skills: Trigger → Research & Build → Test in Sandbox → (Fail → Auto-Repair → Test again) → Crystallize → Execute. This loop should directly inform the Rosetta adaptive memory plane design, specifically the skill-hardening, self-repair, and promotion criteria.

## Problem Statement

Rosetta's NOT LAME defines 5 memory planes and a write-admission gate, but the adaptive plane lacks a concrete self-evolution mechanism. Skills are promoted from quarantine via 8 test classes but there is no feedback loop for post-promotion hardening, auto-repair, or score-based skill improvement.

Moltron's evolution engine provides a production-tested template for this loop. The 6 steps map cleanly to Rosetta concepts:

| Moltron step | Rosetta equivalent | Gap |
|---|---|---|
| ⚡ Trigger | Skillpack importer invoke | Exists as ingestion entry point |
| Research & Build | Quarantine → Normalize | Exists in importer pipeline |
| Test in Sandbox | 8 test classes (adapter certification harness) | Exists as gate |
| Fail → Auto-Repair | Apply → Observe → Receipt → Project (write-gate loop) | No explicit auto-repair; receipts only record outcomes |
| Crystallize | Artifact storage (Git + PostgreSQL) | No explicit crystallization with threshold tracking |
| Execute | Skillpack invocation | Exists via SKILL.md |

The adaptive plane needs to close the loop: execute → score → repair → crystallize → re-promote.

## Proposed Action

1. Add explicit **hardening threshold** criteria to the skillpack promotion flow (see MOL-005)
2. Define an **auto-repair trigger** condition: when a skill's execution score drops below threshold, re-enter quarantine
3. Extend the write-admission gate's receipt mechanism to emit a **skill scorecard** (not just outcome receipts)
4. Add a **Crystallize step** to the skillpack lifecycle: successful execution at threshold triggers versioned artifact promotion

## Success Criteria

- [ ] Adaptive plane can detect skill regression (score below threshold)
- [ ] Regression triggers re-entry into quarantine with existing test class suite
- [ ] Skill scorecards are persisted as receipts in PostgreSQL
- [ ] Hardening threshold (e.g., 3 consecutive successful runs at ≥95%) is tracked per skill version

## References

- Moltron evolution graph: `docs/external/Moltron.md` — "The Evolution Engine for OpenClaw" section
- NOT LAME write-admission gate: `docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md`
- Rosetta adaptive memory plane: `memory-planes` concept (Plane 3)
