---
title: Backup strategy lacks automation and freshness guarantees
type: governance
status: candidate
evidence: "The Markdown authority stack remains mirrored outside the repo in the local Open Brain and Drive-backed handoff corpus." — no mention of sync frequency, automated push, or freshness SLAs
priority: medium
---

## Problem

The UPSTREAM_AND_BACKUP_PLAN identifies Open Brain and Drive as the external mirror of the authority stack, but provides no specification for:
- How/when the mirror is synced to the external corpus
- Whether the sync is automated or manual
- What the freshness SLA is (e.g., "must be synced within N hours of a governance doc change")
- What happens if the external corpus is unavailable or stale

## Suggested Action

Add a sync cadence specification to the Backup Strategy section, e.g.:
- Automated push on governance doc commit (CI hook)
- Manual sync as a documented ritual (with frequency target, e.g., weekly)
- Staleness threshold defined (e.g., "if mirror is >72h stale, flag in heartbeat")

## Related Docs

- UPSTREAM_AND_BACKUP_PLAN (this doc)
- (cross-reference other backup/recovery docs as they are extracted)
