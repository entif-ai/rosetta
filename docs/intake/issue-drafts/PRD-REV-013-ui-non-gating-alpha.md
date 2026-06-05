# Issue Draft — PRD-REV-013: Operator UI must not gate alpha progression

## Title

PRD-REV-013: Operator UI must not gate alpha progression

## Type

docs

## Labels

operator-ui, alpha-gating

## Depends On

PRD-REV-001

## Evidence

Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`

> "UI is scaffolded, not alpha-gating. rosetta-operator can exist, but the alpha RC gates are CLI/API, conformance, guard, receipts, and replay."

This resolves a contradiction between the two synthesis runs: the alternate run correctly challenged the first run's early UI inclusion.

## Description

The `rosetta-operator` UI is a legitimate work product and can be scaffolded during the alpha phase, but it **must not** be a gating requirement for alpha RC progression.

The alpha RC gates are:
1. **CLI/API** — headless interface is operational
2. **Conformance** — RRP TV1/tamper-negative tests are green
3. **Guard** — admission control denies invalid/missing/expired tokens
4. **Receipts** — `rosetta.receipt` emission is verified
5. **Replay** — receipt bundles can be verified end-to-end

UI work (operator inspection, run visualization) can proceed in parallel but does not affect alpha RC status.

This is important for:
- Keeping the alpha proof-of-concept minimal and portable
- Avoiding a React/web UI dependency for a headless system
- Ensuring the constitutional loop is proven before UI polish

## Proposed Action

- Verify no alpha milestone definition includes operator UI as a gate
- Add explicit "UI is non-gating" note to the Alpha RC staircase spec
- Scope `rosetta-operator` as a P2 parallel track, not a prerequisite
- Add CI gate that prevents any alpha-required package from depending on `rosetta-operator`
