# Issue Draft: OB1-010 — OpenBrain Telemetry Schema Alignment with Rosetta Receipt Schema

- Created: 2026-06-04
- Source doc: `docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md`
- Extraction: `docs/intake/docs-intelligence/2026-06-04-openbrain-project-analysis.md`
- Confidence: high

## Problem

OpenBrain OB1 implements a telemetry-first self-evolution engine. Every action emits structured logs that feed back into the model's behavior profile. This mirrors Rosetta's receipts-first doctrine, but the two schemas are not aligned. Without schema alignment, OB1 cannot serve as a certified skill source or evaluation harness for Rosetta.

## Evidence

- OB1 "every action logged, analyzed, and used to improve next decision"
- Rosetta receipt schema expects: action, timestamp, actor, inputs, outputs, provenance, verification
- No documented mapping between OB1 telemetry fields and Rosetta receipt fields

## Requirements

- Map OB1 telemetry events to Rosetta receipt schema
- Ensure OB1 skill hardening pipeline emits receipts in Rosetta receipt format
- Validate with a test harness: run 10 OB1 skills, capture receipts, verify schema compliance

## Labels

- `integration`
- `telemetry`
- `receipts`
- `openbrain`
- `schema`

## Depends On

- DI-011 (Source Substrate domain gap)
- TC-005 (write-admission gate — receipt step is part of the 9-step machine)

## Status

issue-candidate