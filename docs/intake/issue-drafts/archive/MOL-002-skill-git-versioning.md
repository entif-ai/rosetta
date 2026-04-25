# MOL-002: Rosetta Skill-Packs Need Git-Backed Version Control

## Metadata

- Type: enhancement
- Status: draft
- Labels: skill-versioning, git, constitutional-layer
- Source doc: `docs/external/Moltron.md`
- Extraction date: 2026-04-25
- Evidence: "backs up versions with git"

## Summary

Moltron versions skill artifacts in Git for rollback, audit, and cross-agent replication. Rosetta's constitutional layer is Git-backed, but skill-pack artifacts have no explicit versioning strategy. This issue proposes adding Git-backed version control to skill-pack promotion and storage.

## Problem Statement

Moltron uses Git as its skill artifact store: "backs up versions with git." Rosetta has a constitutional layer stored in Git (the Bootstrap's source-of-truth), but skill-packs promoted via the skillpack-importer have no specified versioning or rollback mechanism. Without version control, skills cannot be rolled back after regression, audited across versions, or reliably replicated across agents.

## Proposed Action

1. Add a `skill_versions` table in PostgreSQL keyed by `(skillpack_id, version_id)` with a foreign key to Git commit SHA
2. On skillpack promotion, record the Git commit SHA of the skill-pack source at promotion time
3. On skillpack invocation, record the version used in the execution receipt
4. Implement a rollback primitive: `skillpack_id → previous_version_id` that reverts the active version pointer

## Success Criteria

- [ ] Each skillpack promotion links to a Git commit SHA
- [ ] Execution receipts include the skillpack version ID
- [ ] Rollback primitive available via adapter certification harness
- [ ] Git history is the source of truth for skillpack artifact diffs

## References

- Moltron: "backs up versions with git"
- Rosetta constitutional layer (Git)
- NOT LAME skillpack-importer: parse→normalize→quarantine→certify→promote
