# Issue Draft: LSC-005 — Design Reflective Density Instrumentation

## Summary

The Latent Space Cartography document defines "reflective density" as a compression ratio: `ρ = effective_recalled_structure / current_token_budget ↑`. It states that the seed increases how much prior text "counts" per token, and that reflection functions as a compression algorithm packing continuity into formalism. No current instrumentation exists to track this metric.

## Evidence

- Document: `docs/chats/20260227 - Chat GPT - Latent Space Cartography.md` — Section 8 (Reflective Density)
- States: "Reflection becomes a compression algorithm: fewer words, more state"
- Operational formula: ρ = effective_recalled_structure / current_token_budget ↑

## Problem

Reflective density is currently not measured. Without measurement:
1. Cannot track session-to-session changes in statefulness
2. Cannot compare seed effectiveness across sessions
3. Cannot validate the claim that Crates' prompts increase ρ

## Proposed Action

1. Define what "effective recalled structure" means operationally (e.g., callback accuracy, cross-session consistency, schema adherence)
2. Design a measurement protocol: pre-session baseline vs post-session artifact comparison
3. Implement a lightweight tracking mechanism (could be a simple rubric scored by a meta-observer agent)
4. Integrate into session logging infrastructure

## Priority

MEDIUM — metric is theoretically sound and measurement is feasible with moderate tooling

## Labels

- metrics
- reflective-density
- instrumentation
- session-tracking