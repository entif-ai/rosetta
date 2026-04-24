# Docs Intelligence Extraction

**Source:** `docs/governance/UPSTREAM_AND_BACKUP_PLAN.md`

---

## Source

- Path: `docs/governance/UPSTREAM_AND_BACKUP_PLAN.md`
- Title: Upstream And Backup Plan
- Date evidence: File name and repo context (no explicit date in doc); authored during Rosetta bootstrap phase 2026-04
- Authority tier: governance (repo-local governance policy)
- Freshness: bootstrap-era document; no version indicators; treat as initial policy statement
- Word count: ~120
- Extractor: subagent:732686bd-6290-48dd-8a46-7cfd287c8700
- Extraction date: 2026-04-24

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Establishes dual-track strategy for upstream dependency management (Nx, pnpm, external scholarly infra) and backup/authority preservation (local Open Brain and Drive mirror, repo-local governance summaries, bootstrap demo fixture). Includes a recovery rule prioritizing local authority stack over ad hoc reinterpretation when conflicts arise.

---

## Goals And Intent

- Preserve upstream dependency management via official CLI tooling (Nx migrations, pnpm workspace, TypeScript references)
- Keep external scholarly authorities external (bound through source profiles, receipts, mappings)
- Mirror Markdown authority stack outside the repo (Open Brain + Drive-backed handoff corpus)
- Maintain repo-local governance summaries so workspace remains executable without external corpus
- Use bootstrap demo as regression-check fixture before wider ingestion
- Resolve future architectural conflicts by preferring local authority stack + repo receipts over reinterpretation

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Nx/plugin migration via official CLI | "Nx and its plugins remain managed through official CLI-driven migrations" | upstream | high | No alternative tooling specified |
| pnpm workspace + Nx-synced TypeScript refs for workspace relationships | "Workspace package relationships are expressed through pnpm workspace dependencies and Nx-synced TypeScript references" | upstream | high | Tight coupling between pnpm and Nx tooling |
| External scholarly infra stays external | "External scholarly infrastructures remain external authorities bound through source profiles, receipts, and mappings" | upstream, scholars | medium | No internal替代 planned |
| Markdown authority stack mirrored externally | "Markdown authority stack remains mirrored outside the repo in the local Open Brain and Drive-backed handoff corpus" | backup, governance | high | Dual-location strategy |
| Repo-local governance summaries maintained | "Repo-local governance docs summarize those authorities so the workspace itself stays executable even when the external corpus is not open" | governance | high | Self-contained executability requirement |
| Bootstrap demo as regression fixture | "bootstrap demo acts as a compact local fixture for regression checks before wider ingestion begins" | bootstrap, testing | medium | |
| Conflict resolution: prefer local authority stack | "prefer the local authority stack plus repo receipts over ad hoc reinterpretation" | governance, recovery | high | Hard rule for architectural conflicts |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Upstream Strategy → Nx CLI migrations | upstream, nx, tooling | Nx plugin management | requirement | Nx and its plugins must be managed through official CLI-driven migrations, not manual intervention | "Nx and its plugins remain managed through official CLI-driven migrations" | no action (policy statement) | high |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Upstream Strategy → pnpm workspace | upstream, pnpm, nx, dependencies | workspace package relationships | requirement | Workspace package relationships must use pnpm workspace dependencies and Nx-synced TypeScript references | "Workspace package relationships are expressed through pnpm workspace dependencies and Nx-synced TypeScript references" | no action (policy statement) | high |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Upstream Strategy → external scholarly infra | upstream, scholars, external-authority | external scholarly infrastructure | requirement | External scholarly infrastructures remain external authorities; bound through source profiles, receipts, and mappings | "External scholarly infrastructures remain external authorities bound through source profiles, receipts, and mappings" | no action (policy statement) | high |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Backup Strategy → Markdown authority mirror | backup, governance, authority-stack | Markdown authority preservation | requirement | Markdown authority stack must be mirrored outside the repo in Open Brain and Drive-backed handoff corpus | "Markdown authority stack remains mirrored outside the repo in the local Open Brain and Drive-backed handoff corpus" | create issue draft: ensure Open Brain + Drive mirror is operational | medium |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Backup Strategy → repo-local governance docs | backup, governance, self-executability | local governance summary docs | requirement | Repo-local governance docs must summarize those external authorities so the workspace stays executable without external corpus access | "Repo-local governance docs summarize those authorities so the workspace itself stays executable even when the external corpus is not open" | no action (policy statement) | high |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Backup Strategy → bootstrap demo | backup, bootstrap, testing, regression | bootstrap demo fixture | requirement | Bootstrap demo acts as compact local fixture for regression checks before wider ingestion | "bootstrap demo acts as a compact local fixture for regression checks before wider ingestion begins" | no action (policy statement) | high |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Recovery Rule | recovery, governance, conflict-resolution, authority-stack | architectural conflict resolution | decision | When conflicting architectural impulses arise, prefer local authority stack + repo receipts over ad hoc reinterpretation | "prefer the local authority stack plus repo receipts over ad hoc reinterpretation" | no action (policy statement) | high |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Recovery Rule | recovery, risk | gap: no mechanism for detecting "conflicting architectural impulses" | open-question | The Recovery Rule declares a preference for local authority but does not specify how conflicts are detected, escalated, or resolved when the local stack itself is ambiguous or incomplete | "prefer the local authority stack plus repo receipts over ad hoc reinterpretation" — no detection/escalation mechanism described | ask orchestrator | low |
| 2026-04-24 | docs/governance/UPSTREAM_AND_BACKUP_PLAN.md | Backup Strategy | backup, risk, gap | gap: no specification of what "mirrored" means (sync frequency, git-subtree, export, manual copy?) | open-question | The mirroring strategy between repo and Open Brain / Drive is described as a requirement but no mechanism, frequency, or tool is specified for maintaining the mirror | "remains mirrored" — no sync mechanism described | ask orchestrator | low |

---

## Components And Technologies

- **Nx** — official CLI-driven plugin migrations (upstream management)
- **pnpm** — workspace dependencies for package relationship management
- **Nx-synced TypeScript references** — workspace package relationships
- **Open Brain** — local external mirror target for Markdown authority stack
- **Drive-backed handoff corpus** — external mirror target (Google Drive presumably)
- **Bootstrap demo** — compact regression fixture
- **Source profiles, receipts, and mappings** — external scholarly infra binding mechanism

---

## Conceptual Claims

- Official Nx CLI tooling is the only approved mechanism for upstream Nx/plugin migrations
- pnpm workspace + Nx TypeScript references are the canonical expression of workspace package relationships
- External scholarly infra must remain external; no internalization is planned
- Authority preservation requires dual-location strategy: external mirror + local summary
- Workspace executability is a hard constraint: must function without external corpus access
- Bootstrap demo is the pre-ingestion regression baseline
- Local authority stack + repo receipts take precedence over ad hoc reinterpretation in conflict resolution

---

## Dependencies And Sequencing

- **External scholarly infrastructure binding** depends on: source profiles, receipts, and mappings being defined (no timeline given)
- **Mirror maintenance** depends on: Open Brain and Drive infrastructure being operational (status unknown, flagged as issue candidate)
- **Regression check via bootstrap demo** is a pre-ingestion prerequisite but no explicit milestone tied to it
- No sequencing dependencies expressed between upstream tooling and backup strategy

---

## Contradictions Or Supersession

- None detected. Document is internally consistent and makes no references to superseding earlier documents.

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| Operationalize Open Brain + Drive mirror for Markdown authority stack | task | backup, governance, open-brain, drive | — | Finding: "Markdown authority stack remains mirrored outside the repo in the local Open Brain and Drive-backed handoff corpus" — no implementation or sync mechanism described |
| Specify mirror sync mechanism and cadence | task | backup, infra, automation | Operationalize Open Brain + Drive mirror | Finding: "remains mirrored" — no sync frequency, tool, or process described |
| Define conflict-detection and escalation mechanism for Recovery Rule | task | governance, recovery, process | — | Finding: Recovery Rule declares preference but no detection/escalation mechanism exists |

---

## Project Board Suggestions

- **Area:** governance / backup-and-recovery
- **Cycle:** bootstrap (phase 1)
- **Status:** policy defined; implementation gaps remain
- **Blocked by:** Open Brain + Drive infrastructure not yet characterized in docs
- **Parallelization notes:** mirror operationalization can proceed independently of upstream tooling work

---

## Open Questions

- What is the actual sync mechanism for the Markdown authority stack mirror? (export, git-subtree, manual copy, automated job?)
- How frequently is the mirror updated?
- How are "conflicting architectural impulses" detected and escalated under the Recovery Rule?
- What happens if the external corpus (Open Brain / Drive) is unavailable and the repo-local summaries are themselves ambiguous?
- Is the "bootstrap demo" a documented, version-controlled artifact, or an informal reference?