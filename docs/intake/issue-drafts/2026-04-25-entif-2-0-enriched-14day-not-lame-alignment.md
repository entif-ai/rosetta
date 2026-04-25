# Issue Draft: E2E-002 — Align 14-Day Compounding Plan with NOT LAME PRD Milestone Gates

## Type
`alignment`

## Summary
The 14-day compounding plan (D1-D10) defines an implementation sequence for Entif orchestration capabilities. Some milestones map directly to NOT LAME PRD components (write-gate, context compiler, coach loop). We need explicit alignment to avoid duplicate work or gate conflicts.

## Evidence
From source: D7 ("Ada Routes a Micro-Spec") produces a closed loop: Sony scaffolds endpoint → Blink adds button → Browser Agent validates → receipt. This is equivalent to the NOT LAME write-admission gate + browser-verifier pattern.

D8 (Nightly Coach) maps to the ELIXIR loop described in NOT LAME's `weak-to-strong fine-tuning` section.

## Specific Alignment Items

| 14-Day Milestone | NOT LAME Component | Alignment Status |
| --- | --- | --- |
| D2: Receipts CLI | `receipts.sqlite` schema | Needs type alignment with NOT LAME receipt schema |
| D5: Browser Agent | Adapter Certification Harness (Playwright class) | Directly maps; share test harness |
| D7: Ada routes micro-spec | Write-Admission Gate (9-step state machine) | D7 is a subset; gate not fully implemented |
| D8: Nightly Coach | ELIXIR feedback tables + weak→strong routing | Directly maps; same coach table schema needed |
| D9: Glyph-ready graph | Memory-sovereignty-map (Plane 1/2/3) | Semantic layer overlap; needs KG schema alignment |

## Relations
- Blocked by: E2E-001 (receipt schema must be canonical first)
- Depends on: NOT LAME implementation roadmap (TC-005 through TC-010)

## Key Decisions Needed
1. Who owns the master milestone map — NOT LAME or 14-day plan? Need single source of truth.
2. D7's "Ada routes micro-spec" should formally implement the write-admission gate, not a simplified version. Confirm scope.
3. D9's "glyph-ready graph" overlaps with TC-006 (tapestry + rights + Postgres). Clarify scope boundary.

## Labels
`docs-intelligence`, `build-plan`, `alignment`

## Status
`draft`
