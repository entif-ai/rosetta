# Issue Draft: JDL-004 — Per-Client Ceiling Alerts and Graph Divergence Detection

## Metadata

| field | value |
|---|---|
| title | JDL-004: Per-client ceiling alerts and graph divergence detection |
| type | safety |
| source | `docs/ideas/JSON Optimization for Data Lakes.md` (DI extraction: 2026-06-01) |
| confidence | high |
| labels | `operations`, `safety`, `cost` |

## Problem Statement

At multi-tenant scale, unchecked client behavior ( runaway queries, runaway graph sprawl, excessive compute) can create cost explosions that threaten platform economics. The system needs enforceable per-client resource ceilings and behavioral anomaly detection to catch graph divergence (e.g., a user accidentally creating 100k relationship nodes from a loop) before it impacts platform stability.

Additionally, enterprise clients require cost predictability; they need a way to simulate workflow costs before deployment to production.

## Relevant Findings from Source

- **F10 (high confidence)**: Three client-safety kill switches identified: (1) per-client ceiling alerts on compute/storage/query depth; (2) graph divergence detection to catch runaway sprawl (e.g., user looping 100k relationship nodes); (3) cost-simulation tool for new workflows before deployment (especially for enterprise clients).
- **F12 (high confidence)**: DR posture as enterprise qualifying criterion — enterprise buyers (DoD, McKinsey, Palantir, Point72) conduct rigorous due diligence; absence of cost controls is a disqualifier.

## Alignment with Existing Rosetta Work

- **NOT LAME threat model**: 14 threat categories defined; runaway compute/sprawl is a known risk but specific enforcement mechanisms not detailed.
- **TC-005 (Promotion state machine)**: Write admission gate exists; ceiling alerts and divergence detection are orthogonal but complementary enforcement mechanisms.
- **Entif 2.0 Berman-PRD**: Staleness warning flagged; resource tracking exists but ceiling enforcement is not specified.
- **DI-004**: Per-client cost management is a known gap in Entif 2.0 toolchain.

## Proposed Implementation

1. **Ceiling alerts**: Per-tenant configurable thresholds on: max nodes created per session, max storage bytes, max query compute units, max API calls/hour. Alert → log → optionally throttle.
2. **Graph divergence detection**: Detect exponential node/edge growth within a session or time window; flag and optionally halt the mutation creating the divergence.
3. **Cost simulation tool**: Pre-deployment dry-run that estimates: token costs, storage costs, compute costs for a given workflow against the client's current data graph state. Target: enterprise contract review / SOW stage.

## Proposed Action

Add to NOT LAME entitlements and cost management specification. Create engineering spec for ceiling enforcement in the write admission gate loop.

## Dependencies

- NOT LAME entitlements work (in progress)
- TC-005 write admission gate stabilization

## Status

candidate
