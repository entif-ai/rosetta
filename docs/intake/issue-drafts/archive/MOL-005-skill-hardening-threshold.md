# MOL-005: Skill Hardening Threshold Criteria

## Metadata

- Type: enhancement
- Status: draft
- Labels: skill-hardening, promotion-criteria, adaptive-plane
- Source doc: `docs/external/Moltron.md`
- Extraction date: 2026-04-25
- Evidence: "Day 1: Success rate 60%. Day 2: Moltron Auto-Repairs… 95%. Day 3: The skill is marked Production Ready"

## Summary

Moltron's hardening narrative uses explicit success-rate thresholds across a 3-day timeline to promote skills from "draft" to "production ready." Rosetta's skillpack-importer has 8 test classes as promotion gates but no hardening timeline or threshold tracking. This issue proposes adding explicit success-rate and consecutive-run thresholds to the skillpack promotion criteria.

## Problem Statement

NOT LAME's skillpack-importer defines 8 test classes as the certification gate before promotion. However, it does not define: (1) how many consecutive successful runs are required post-certification, (2) what success-rate threshold triggers promotion, or (3) how to handle skill regression post-promotion.

Moltron's 3-day narrative provides a concrete model: Day 1 baseline (60%), Day 2 auto-repair (95%), Day 3 production ready. Rosetta needs an analogous hardening path.

## Proposed Action

1. Define a `hardening_threshold` in the skillpack metadata: e.g., `consecutive_successes >= 3 AND success_rate >= 95%`
2. Track `execution_count`, `success_count`, `last_success_at` per skillpack version in PostgreSQL
3. Auto-promote to "active" when hardening threshold is met; before threshold, skillpack is "draft"
4. Implement regression detection: if success_rate drops below 80% for an active skillpack, demote to "draft" and trigger quarantine re-entry
5. Add a `skillpack_state` enum: `quarantine → draft → hardening → active → deprecated`

## Success Criteria

- [ ] Hardening threshold configurable per skillpack type
- [ ] Execution metrics tracked in `skillpack_metrics` table
- [ ] Auto-demotion to draft on regression
- [ ] Hardening duration visible in skillpack metadata (time-to-production metric)
- [ ] 8 test classes run in quarantine; hardening happens post-certification

## References

- Moltron hardening: "Day 1: Success rate 60%. Day 2: Moltron Auto-Repairs… 95%. Day 3: The skill is marked Production Ready"
- NOT LAME skillpack-importer: 8 test classes in adapter certification harness
- Write-admission gate: Apply→Observe→Receipt loop
