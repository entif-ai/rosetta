# Issue Draft: JDL-003 — Formalize "Deep Freeze" as a Third DR Storage Tier

## Metadata

| field | value |
|---|---|
| title | JDL-003: Formalize "deep freeze" as a third DR storage tier |
| type | architecture |
| source | `docs/ideas/JSON Optimization for Data Lakes.md` (DI extraction: 2026-06-01) |
| confidence | medium |
| labels | `storage`, `dr`, `disaster-recovery` |

## Problem Statement

Existing Rosetta/Entif storage taxonomy defines hot/warm/cold tiers but does not include an explicit "deep freeze" tier for DR scenarios — data that is not actively used but must be recoverable within minutes to hours (not the 12-hour SLA of Glacier Bulk, but also not the cost of keeping it warm).

Additionally, the DR conversation lacks a formal distinction between: (a) cold storage for cost optimization (infrequently accessed data) and (b) deep freeze for disaster recovery (rapidly recoverable replicas for outage scenarios). These are different requirements with different cost/performance tradeoffs.

## Relevant Findings from Source

- **F8 (medium confidence)**: "Deep Freeze" tier introduced between cold storage and tape archival as a distinct DR layer with RTO <<< cold storage retrieval times. Options: CloudEndure DR (continuous replication, near-zero RTO to AWS), Zerto (cross-platform CDP to AWS/Azure/GCP), Cohesity FortKnox (air-gapped immutable backup within AWS).
- **F9 (medium confidence)**: "Woolly Mammoth Storage" — offsite physical tape vaulting (Iron Mountain) for catastrophic scenarios where digital infrastructure is entirely compromised.
- **F10 (high confidence)**: Client-safety kill switches: per-client ceiling alerts, graph divergence detection, cost simulation tool.

## Proposed Three-Tier DR Model

1. **Cold Storage** (cost-optimized): S3 Glacier Deep Archive / Azure Archive — for infrequently accessed time-series, old snapshots. SLA: hours.
2. **Deep Freeze** (RTO-optimized): CloudEndure / Zerto / Cohesity FortKnox — continuous replication, rapid failover. SLA: minutes.
3. **Woolly Mammoth** (catastrophic recovery): Iron Mountain offsite tape / ioSafe NAS — for scenarios requiring physical infrastructure survival. SLA: days.

## Alignment with Existing Rosetta Work

- **NOT LAME storage schema**: No deep freeze tier defined.
- **BOOTSTRAP_EXECUTION_TRACK**: DR/recovery rule gap flagged (BE-001 related; "no recovery rule enforcement hook").
- **UPSTREAM_AND_BACKUP_PLAN**: Existing backup plan lacks explicit deep freeze specification.

## Proposed Action

Add explicit "deep freeze" tier to NOT LAME storage schema. Define RTO/RPO targets per tier. Evaluate CloudEndure/Zerto/Cohesity for the deep freeze implementation. Document tier boundaries and transition criteria.

## Dependencies

- NOT LAME storage schema finalization
- Cloud infrastructure decision (AWS vs. multi-cloud) — affects which deep freeze tools are viable

## Status

candidate
