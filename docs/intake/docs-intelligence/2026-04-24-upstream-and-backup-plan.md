---
doc: upstream-and-backup-plan
source: docs/governance/UPSTREAM_AND_BACKUP_PLAN.md
extracted: 2026-04-24
findings: 4
---

# Extraction: Upstream And Backup Plan

## Metadata
- **Source:** `docs/governance/UPSTREAM_AND_BACKUP_PLAN.md`
- **Type:** Governance / Architecture
- **Extracted:** 2026-04-24

## Document Structure
The document is terse (one page or less) and has three numbered structural units:
1. **Upstream Strategy** — bullet list, 3 items
2. **Backup Strategy** — bullet list, 3 items
3. **Recovery Rule** — single declarative rule governing conflict resolution

No metadata, no dates, no author, no version. Pure authority statement.

---

## Findings (full detail)

### Finding 1 — Nx/CLI Plugin Management
- **Concept:** Nx and its plugins remain managed through official CLI-driven migrations.
- **Evidence:** "Nx and its plugins remain managed through official CLI-driven migrations." (Upstream Strategy, item 1)
- **Implication:** Plugin upgrades and migrations must go through Nx's native CLI tooling. Ad hoc manual migrations are out of scope. This enforces deterministic, repeatable upgrade paths.

### Finding 2 — pnpm Workspace + TypeScript References
- **Concept:** Workspace package relationships are expressed through `pnpm` workspace dependencies and Nx-synced TypeScript references.
- **Evidence:** "Workspace package relationships are expressed through `pnpm` workspace dependencies and Nx-synced TypeScript references." (Upstream Strategy, item 2)
- **Implication:** The polyrepo/Nx monorepo boundary is managed via pnpm workspaces and Nx's TypeScript plugin sync. This is the enforceable machine-readable contract for package graph topology.

### Finding 3 — External Scholarly Infrastructure as External Authority
- **Concept:** External scholarly infrastructures (sources, profiles, receipts, mappings) remain external and are bound through source profiles, receipts, and mappings.
- **Evidence:** "External scholarly infrastructures remain external authorities bound through source profiles, receipts, and mappings." (Upstream Strategy, item 3)
- **Implication:** The repo does not own or internalize external scholarly data. It holds only the binding metadata (profiles, receipts, mappings). This preserves upstream authority and reduces data staleness risk.

### Finding 4 — Recovery Rule: Local Authority Stack Wins
- **Concept:** When future sessions encounter conflicting architectural impulses, the local authority stack plus repo receipts take precedence over ad hoc reinterpretation.
- **Evidence:** "If later sessions encounter conflicting architectural impulses, prefer the local authority stack plus repo receipts over ad hoc reinterpretation." (Recovery Rule)
- **Implication:** This is a versioning/conflict-resolution protocol for agentic sessions. It establishes that local docs + receipts are the ground truth, not LLM-generated re-interpretations. It anti-entropic: it resists drift and fragmentation across sessions.

---

## Concept Cross-Reference
- **Authority Stack** — referenced here as the combination of repo-local governance docs + external Open Brain/Drive corpus. This is the single source of truth hierarchy.
- **Receipts** — mentioned as the artifact of record for external bindings. Aligns with the broader receipt/tracking system used in the governance corpus.
- **Bootstrap Demo** — referenced as a regression fixture. Sits in the backup strategy layer.
- **Open Brain + Drive handoff corpus** — the external mirror of the authority stack. Not previously observed in extractions; marks this as a new concept entry point.

---

## Issue Candidates

### Issue 1 — No External Backup Automation Specified
- **title:** Backup strategy lacks automation and freshness guarantees
- **type:** governance
- **status:** candidate
- **evidence:** "The Markdown authority stack remains mirrored outside the repo in the local Open Brain and Drive-backed handoff corpus." — no mention of sync frequency, automated push, or freshness SLAs for the external mirror.
- **priority:** medium

### Issue 2 — Recovery Rule Has No Enforcement Mechanism
- **title:** Recovery rule is a declaration with no enforcement hook
- **type:** governance
- **status:** candidate
- **evidence:** "If later sessions encounter conflicting architectural impulses, prefer..." — this is advisory, not machine-enforced. Future sessions could still override.
- **priority:** low

---

## Summary
The UPSTREAM_AND_BACKUP_PLAN establishes three layers of architectural governance: (1) how upstream dependencies (Nx, pnpm, external scholarly infra) are managed, (2) how the authority stack is backed up externally via Open Brain and Drive, and (3) a recovery rule that grants repo-local authority precedence over ad hoc reinterpretation in future sessions. The document is authoritative but intentionally thin on implementation detail, treating enforcement as a session-level obligation rather than an automated mechanism.
