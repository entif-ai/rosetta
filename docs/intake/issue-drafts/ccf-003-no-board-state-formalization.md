# CCF-003: No Board State Formalization

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ccf-003 |
| Title | No Board State Formalization |
| Type | architecture |
| Priority | P1 |
| Source doc | `docs/PRDs/20260325 - Consensus-First Commitment Scoping Framework (v0.1).md` |
| Extraction date | 2026-04-25 |
| Status | draft |
| Depends on | ccf-002 (consensus protocol) |

## Problem Statement

The framework defines "Board State" as the central input for commitment sizing: "The current strategic situation characterized by opportunity magnitude, time sensitivity, competitive pressure, known edges, edge durability, resource posture, loss tolerance, regulatory/trust constraints, and ongoing portfolio opportunity cost." This concept is critical to every commitment decision in the framework, yet it has no formal data structure, schema, or tooling representation. The entire commitment sizing depends on a concept that exists only as prose.

## Evidence

> "Board state: The current strategic situation characterized by opportunity magnitude, time sensitivity, competitive pressure, known edges, edge durability, resource posture, loss tolerance, regulatory/trust constraints, and ongoing portfolio opportunity cost." — §Definitions

## Impact

Without a formal Board State structure:
- Agents cannot dynamically update or query the board state
- Commitment sizing cannot be automated or tool-assisted
- The calibration loop ("update board state → update commitment canvas") has no machine-readable substrate
- The framework cannot be integrated into existing project management or planning tooling

## Options

**Option A — Board State YAML schema:** Define a `board-state.yaml` schema with fields for each dimension (opportunity magnitude, edge durability, loss tolerance, etc.). Teams update it at each commitment gate.

**Option B — Integration with existing project board:** Model Board State dimensions as project metadata fields in the existing project board tooling, auto-derived from existing ticket metadata.

**Option C — Board State as a Tilt/Pulse-style signal system:** Formalize board state as a lightweight signal system (green/amber/red per dimension) updated at each phase gate, keeping complexity low while enabling tooling.

## Recommendation

Option A for full framework support; Option B if existing project board tooling is the constraint. Start with Option C for fast operationalization.

## Next Steps

- [ ] Draft `board-state.yaml` schema with all dimensions
- [ ] Evaluate integration with existing project board tooling
- [ ] Produce Board State update workflow
- [ ] Add Board State to phase-gate checklist inputs