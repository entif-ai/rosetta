# MOL-004: OpenTelemetry Traces for Skill Execution Audit

## Metadata

- Type: enhancement
- Status: draft
- Labels: observability, telemetry, skill-audit, root-access
- Source doc: `docs/external/Moltron.md`
- Extraction date: 2026-04-25
- Evidence: "open telemetry out of the box"; "flight recorder for root access"

## Summary

Moltron emits OpenTelemetry traces for all skill executions, enabling replay of exact logic flows. Rosetta's adaptive plane needs explicit trace capture for skill execution to satisfy audit requirements, especially for root-access operations. This issue proposes adopting OpenTelemetry as the skill execution trace standard.

## Problem Statement

Moltron's "flight recorder" requires full replay capability for root-access actions: "You can replay the exact logic flow of any action — see why it deleted that file or why it emailed that person." Rosetta's current observability is limited to receipt emission (write-admission gate outputs). Receipts record outcome but not execution trace. For root-access operations (skill execution, adapter calls, file mutations), replay-level tracing is needed to satisfy audit requirements.

## Proposed Action

1. Add an OpenTelemetry span for each skillpack execution invocation: `skillpack_id`, `version`, `input`, `output`, `duration_ms`, `error` if any
2. Child spans for each step within a skill execution (Moltron's 6-step loop should produce 6 child spans)
3. Export traces to a configurable backend (OTLP exporter to OpenTelemetry collector)
4. Add a replay query: given a `skillpack_execution_id`, reconstruct the execution trace from spans
5. Align with adaptive plane metrics: execution count, success rate, average latency per skillpack

## Success Criteria

- [ ] Every skillpack invocation emits a root OpenTelemetry span
- [ ] Child spans capture each evolution loop step
- [ ] OTLP exporter is configurable (not hardcoded)
- [ ] Replay query returns full execution trace from spans
- [ ] Root-access operations are flagged with `span.kind = "root_access"`

## References

- Moltron: "comes with logs, scorecards, and open telemetry out of the box"
- OpenTelemetry spec: https://opentelemetry.io/docs/
- Rosetta receipt format: write-admission gate outputs
