# Treat AiiDA-WorkGraph GUI as experimental reference only

Issue draft id: `aiida-workgraph-gui-experimental`
Priority: `P3`
Effort: `XS`
Labels: `gui`, `experimental`, `stability`, `workflow-visualization`

## Problem

The AiiDA-WorkGraph GUI is explicitly experimental. Rosetta may still learn from its provenance graph visualization, but should not build hard dependencies on the GUI surface.

## Scope

Record the GUI as a low-authority reference for future workflow or tapestry visualization while preserving a stability warning.

## Source Evidence

- `docs/intake/docs-intelligence/2026-04-25-aiida-workgraph.md` - Issue Candidates row: "WorkGraph GUI is experimental — do not build hard dependencies."
- `docs/external/AiiDA-WorkGraph.md` - GUI experimental-status note.

## Acceptance Criteria

- [ ] Any future Rosetta UI issue that cites WorkGraph GUI includes the experimental caveat.
- [ ] No core Rosetta workflow acceptance criterion depends on WorkGraph GUI behavior.
- [ ] Capture only reusable visualization lessons, not a GUI adoption commitment.
