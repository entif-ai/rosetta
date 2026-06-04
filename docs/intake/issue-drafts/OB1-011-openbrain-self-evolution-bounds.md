# Issue Draft: OB1-011 — OpenBrain Self-Evolution Bounds Risk

- Created: 2026-06-04
- Source doc: `docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-04-openbrain-project-analysis.md`
- Confidence: high

## Problem

OB1's self-evolution is bounded by the quality and diversity of telemetry collected. Without adversarial failure signals, the system converges on local optima rather than genuine improvement. This creates a silent failure mode: reliable skills that are wrong but consistent will be promoted, while edge-case failures get ignored.

## Evidence

- "evolution is only as good as the failure data it learns from"
- OB1 skill hardening promotes based on success rate over N iterations
- No documented adversarial input probing in the OB1 telemetry pipeline

## Risk

- Entif's bounded self-improvement doctrine relies on diverse failure receipts
- If OB1 is integrated as a skill source without adversarial probing requirements, faulty skills could be certified
- This is a threat-model gap in the NOT LAME threat model

## Requirements

- Document the self-evolution bounds risk in the NOT LAME threat model
- Require that OB1 telemetry includes adversarial/probing failure signals before skill promotion
- Rosetta receipt-law enforcement must include failure receipts as first-class evidence
- Add a "convergence check" to the skill hardening pipeline

## Labels

- `self-evolution`
- `convergence`
- `telemetry`
- `openbrain`
- `threat-model`

## Depends On

- MOL-003 (Moltron auto-repair self-evolution bounds)
- NOT LAME threat model

## Status

issue-candidate