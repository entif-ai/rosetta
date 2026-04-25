# ELIXIR Nightly Coach Loop

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** self-improvement, elixir, nightly-loop, telemetry
**Depends on:** receipts-ledger-schema.md

## Problem Statement

"ELIXIR goes through new failure receipts – any tool calls or tasks that failed or produced suboptimal results – and tries to analyze and rectify the causes" describes a self-improvement loop with no concrete taxonomy of failure types, no improvement generation algorithm, no policy weight update mechanism, and no coach report format.

## Specific Findings from Extraction

- **F-ELIX-001** (confidence: high): "Failure receipts" — no defined schema distinguishing failure types (crash, timeout, hallucination, miscoordinate, suboptimal)
- **F-ELIX-002** (confidence: high): "Analyze and rectify the causes" — no analysis algorithm, no root-cause taxonomy, no improvement generation strategy
- **F-ELIX-003** (confidence: high): "Policy weight updates" — no specification of what policies, what weights, or update algorithm
- **F-ELIX-004** (confidence: medium): No coach report format or delivery cadence defined
- **F-ELIX-005** (confidence: medium): No regression testing strategy after policy updates; what prevents a "fix" from breaking another capability?

## Action Required

1. Define failure receipt taxonomy with severity and type classification
2. Specify analysis algorithm for root-cause attribution
3. Design improvement generation strategy and policy weight update mechanism
4. Define coach report format, delivery channel, and cadence
5. Design regression testing strategy for policy updates
