# ACM-006: Prove 50-90% Token Cost Reduction Claim with Controlled Benchmark

## Issue

The operator repeatedly asserts 50-90% inference cost reduction from Entif-driven routing and caching for enterprise workflows. This claim is used as a key selling point in the go-to-market narrative.

No empirical evidence, measurement methodology, or controlled comparison is cited. The claim is repeated across multiple turns but has no supporting data.

## Why This Matters

Using an unsubstantiated cost-reduction claim in enterprise sales creates legal exposure (misleading advertising) and trust exposure (if buyers run their own numbers and find a different result). The claim must be verifiable before it is used in external-facing materials.

## Scope

1. Define a controlled benchmark protocol:
   - Select one well-defined workflow (company handbook Q&A — the canonical example from the dialogue is ideal)
   - Measure: (a) tokens sent per query via direct vendor API, (b) tokens sent per query via Entif (with cache warm/cold distinction), (c) cache hit rate
   - Normalize to per-query cost in USD
   - Repeat across at least 50 distinct query shapes for statistical significance

2. The benchmark must show both: (a) direct-to-vendor baseline cost, (b) Entif-path cost with the same queries, over the same period, with the same model selection policy.

3. Publish the benchmark methodology and raw data as an internal report (not external-facing until peer-reviewed).

4. Until the claim is substantiated, external-facing materials should use conservative language: "up to N% token reduction in benchmarks" with methodology disclosed.

5. A future issue: replicate benchmark across multiple workflow types (benefits, engineering knowledge, policy Q&A) to establish variance boundaries.

## References

- Source: docs/chats/20260411 - Chat GPT - API-driven Cache Management.md — multiple operator turns
- Related: go-to-market motion; ROI calculator requirement from belief-pack artifacts

## Labels

economics, measurement, claims

## Status

doc-candidate
