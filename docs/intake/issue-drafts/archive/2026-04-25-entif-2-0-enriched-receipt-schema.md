# Issue Draft: E2E-001 — Adopt Canonical Receipt Schema

## Type
`decision`

## Summary
Entif 2.0 Enriched establishes a canonical data shape: `session → task → step → artifact → check → outcome → receipt`. This should be adopted as the universal receipt contract across all Rosetta components, replacing any ad-hoc logging formats.

## Evidence
From the source doc: "Canonical data shape: `session → task → step → artifact → check → outcome → receipt` — single source of truth for router, coach, and pane."

Also: "Every model/tool action emits a cost/latency/model/verdict; receipts are the fundamental evidence unit."

## Relations
- Directly supports NOT LAME's `write-admission-gate` receipt requirement
- Aligns with Rosetta `receipt-law` concept
- Downstream of: receipt-law concept in existing Rosetta docs
- Upstream of: EconomyForge, EvalForge, Coach loop

## Key Decisions Needed
1. Which package owns the canonical receipt type definition? (`@rosetta/protocol`?)
2. Does `outcome` include partial/failed states, or only terminal ones?
3. Should `session` be a first-class type with its own ID lifecycle, or a derived grouping?

## Labels
`docs-intelligence`, `receipts`, `data-model`

## Status
`draft`
