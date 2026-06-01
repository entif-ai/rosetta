# TULP-007: SDialog Evaluation Hooks → Tripwire/Petri Audit Layer Alignment

## Meta

| Field | Value |
|---|---|
| Status | draft |
| Type | observability |
| Priority | medium |
| Area | Tulpamancy Protocol / Observability |
| Discovered in | `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-01-sdialog-tulpamancy.md` |

## Summary

SDialog provides built-in dialog evaluation metrics and LLM-judge style assessments. Tripwire/Petri requires an observability layer that can answer "did this tulpa behave as expected?" These must be aligned so that SDialog's eval outputs feed directly into Entif's audit trail, not requiring a separate logging/metrics pipeline.

## Problem Statement

- SDialog has its own evaluation layer: dialog metrics + LLM-judge evaluations + mechanistic interpretability hooks
- Tripwire/Petri in Entif has its own observability requirements: what events to emit, what to log, what triggers alerts
- If these are two separate pipelines, operators must maintain two sets of eval/audit configurations
- The doc claims SDialog's eval "maps to Tripwire / Petri 'observe & audit' layers" — but the mapping is not actually defined
- Without alignment, a persona could pass SDialog's internal eval but fail Tripwire requirements, and this mismatch would not be caught until runtime

## Evidence

From `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`:

> "SDialog explicitly targets **evaluation and interpretability**: Built-in dialog metrics & LLM-judge style evaluations. Mechanistic interpretability hooks to inspect attention/activation traces."

> "That maps beautifully to: Tripwire / Petri 'observe & audit' layers. ELIXIR feedback for 'did this tulpa behave as expected?' Longitudinal tracking: comparing a tulpa's behavior between versions / days."

Claims of mapping but no actual spec:
- What events does SDialog emit?
- What is the schema of the LLM-judge output?
- Does it satisfy Tripwire's audit requirements (tamper-evident, receipt-backed)?
- Does SDialog support custom evaluators, or only its built-in ones?

## Proposed Resolution

1. **Audit the SDialog eval output schema**: Document exactly what SDialog's eval hooks produce (metrics JSON structure, judge output format, trace data availability)
2. **Map SDialog eval outputs to Tripwire event types**:
   - `dialog.coherence_score` → Tripwire event: `persona.coherence.below_threshold`
   - `judge.output` → Tripwire event: `persona.judge.flagged`
   - `attention_trace.anomaly` → Tripwire event: `persona.interpretability.anomaly`
3. **Define minimum eval requirements for promotion gate (TULP-004)**:
   - Coherence score ≥ 0.85 per run
   - Judge alignment ≥ 0.80 per run
   - Zero `attention_trace.anomaly` flags in final 3 gym runs
4. **SDialog → Tripwire bridge**: Write a thin adapter that translates SDialog webhook/hook outputs into Tripwire event format
5. **Use ELIXIR as the feedback layer**: ELIXIR receives SDialog-derived signals and produces "did this tulpa behave as expected?" judgments
6. **Validate that SDialog eval is deterministic/reproducible**: If SDialog uses non-deterministic LLM judges, the eval results cannot be receipt-backed reliably — if so, use SDialog only for formative evaluation, not summative/gate decisions

## Dependencies

- TULP-001 (schema that includes eval output fields)
- TULP-003 (gym runs that produce eval data)
- Tripwire/Petri implementation (must exist to align with)
- ELIXIR implementation (feedback layer)

## Risks

- SDialog's LLM-judge may be non-deterministic (different scores on same dialog on different runs) — this would make it unsuitable as a promotion gate arbiter. Mitigate: test determinism empirically before relying on it for gates.
- Attention/activation trace hooks require access to model internals — hosted LLM APIs (OpenAI, Anthropic) do not expose these. Mitigate: focus on behavioral metrics (dialog outputs) rather than mechanistic ones for cloud-hosted models.
- Two eval pipelines (SDialog + Tripwire) increase complexity. Mitigate: SDialog is formative eval (exploratory, diagnostic); Tripwire is summative eval (gate decisions, audit trail).

## Labels

`evaluation` `tripwire` `petri` `observability` `sdialog` `elixir` `audit`

## Related Issues

- TULP-001 (eval output schema is part of persona schema)
- TULP-003 (gym generates eval data)
- TULP-004 (promotion gate uses eval data)
