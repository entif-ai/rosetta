# elal-003: Entif 2.0 — Rollback and Recovery Procedures

## Metadata

- **Type**: issue-candidate
- **Extraction**: `docs/backlog/Entif 2.0 - Comprehensive Action Plans.md`
- **Confidence**: medium
- **Finding type**: issue-candidate / gap

## Summary

The blueprint mentions rollback capability ("voice 'Ada, rollback that change'") and backup/DR in BackupForge, but does not define actual rollback or recovery procedures for any Forge operation. Without documented rollback paths, failed deployments or corrupted state could cause data loss or extended downtime.

## What's Needed

1. **Rollback triggers**: What failure conditions (threshold crossings, quarantine status, failed QC) should trigger rollback?
2. **Artifact rollback**: How to revert a FileForge artifact to a previous version? Does ArchiveForge manifest contain enough to regenerate, or must we store actual backup copies?
3. **State rollback**: For receipts.sqlite (state store), how to roll back a bad Coach run that updated routing thresholds incorrectly?
4. **Deployment rollback**: If a new Forge version breaks existing functionality (e.g., MediaForge transform graph output format changes), what is the rollback procedure?
5. **Genesis drift rollback**: If nightly drift detection finds misalignment, what is the rollback — revert to last-known-good genesis? Alert and pause?
6. **Recovery Time Objectives**: What are the RTOs for each Forge? Have they been agreed with stakeholders?
7. **DR drill schedule**: BackupForge mentions DR drills; what is the cadence and what is tested?

## Specific Gaps by Forge

| Forge | Rollback Concern |
| --- | --- |
| MediaForge | If export encoding produces wrong format, how to roll back? Is the source MediaPassport enough to regenerate? |
| SocialForge | If a post is published incorrectly (wrong channel, wrong content), can it be unpublished? Platform APIs vary on delete. |
| ArticleForge | If published article is wrong, can it be unpublished/updated? Does the ArticlePassport track revision history? |
| LyricsForge | If an aligned caption has errors, can we regenerate from LyricPassport without re-running alignment? |
| AuthForge | If a policy change locks out the owner, what is the emergency access path? |

## Recommendation

Create a `docs/RFCs/Rollback-Recovery-Procedures.md` that defines:

- Standardized rollback procedure template (applicable to all Forges)
- Specific rollback steps per Forge type
- RTO/RPO definitions per data class
- Emergency access procedure for AuthForge (break-glass scenario)
- DR drill runbook and cadence

## Evidence

From source document:
- BackupForge "DR drills" mentioned but no runbook content
- "If something is going awry, the user can pause the system (e.g., a voice command 'Ada, pause operations' could stop background processes)" — pause, but not rollback
- "Because ReasoningBank influences decisions, we also ensure it doesn't introduce bias or error... The Coach uses not just pass/fail but also how confidently it passed" — if it does, no rollback described

## Labels

- rollback
- recovery
- backupforge
- entropy-2
- safety

## Status

open
