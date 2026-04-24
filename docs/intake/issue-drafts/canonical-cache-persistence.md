# Persist canonical corpus cache beyond the in-memory slice

Issue draft id: `canonical-cache-persistence`
Priority: `P1`
Effort: `M`
Labels: `canonical-cache`, `storage`, `dedupe`

## Problem

The cache currently clusters artifacts in memory, so dedupe/lifecycle state disappears across runs.

## Scope

- Add a minimal local persistence backend suited to bootstrap usage.
- Preserve byte, manifestation, record-family, and conceptual cluster indexes.
- Keep append-only lifecycle/correction events separate from mutable cache indexes.

## Acceptance Criteria

- [ ] Cache state survives process restart in a local development path.
- [ ] Persistence round-trips do not alter artifact CIDs or canonical payloads.
- [ ] Tests cover dedupe proposal continuity before and after reload.

## Source Evidence

- `docs/backlog/BOOTSTRAP_EXECUTION_TRACK.md`; hash 530e57773eaf: Names cache persistence as the third next execution item.
- `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md`; hash 2baec5fab6f5: Separates truth/provenance from cache/index and calls for Postgres/pgvector later.
- `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`; hash c14775852b6b: Defines storage and memory-plane separation doctrine.

## Non-Goals

- No production Postgres migration in this issue unless explicitly pulled forward.

## Publishing Notes

- Local status: `candidate`
- Active draft path: `docs/intake/issue-drafts/canonical-cache-persistence.md`
- Archived draft path: `not archived`
- GitHub issue: `pending`
- Recommended publish command shape: `gh issue create --title "Persist canonical corpus cache beyond the in-memory slice" --body-file docs/intake/issue-drafts/canonical-cache-persistence.md --label canonical-cache,storage,dedupe`
