# Docs Intelligence Extraction — AUTHORITY_STACK.md

## Source

- Path: `docs/governance/AUTHORITY_STACK.md`
- Title: Authority Stack
- Date evidence: April 12, 2026 (added authorities); general bootstrap context implies early 2026
- Authority tier: governance / constitutional
- Freshness: current
- Word count: ~180
- Extractor: Emilie Eudico (Rosetta DI Agent)
- Extraction date: 2026-04-24T21:05:00Z

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

AUTHORITY_STACK defines the governing document hierarchy for the bootstrap phase and locks down local execution constraints. It establishes which documents have semantic authority, pins Node to 24.14.1, preserves parse-only ingress as default, and hard-pauses large-scale corpus ingest until the Ingress Refinery and canonical corpus cache are both live. It also records the repo receipt confirming the Nx workspace was generated through official CLI tooling.

## Goals And Intent

- Establish a hardwired authority chain so bootstrap decisions are traceable to named documents, not implicit consensus.
- Prevent drift by pinning execution constraints (Node version, ingress posture, Prism shadow mode) in a receipt-grade document.
- Record the Nx CLI generation event as a first-class repo artifact (not a tarball import).
- Block premature corpus-scale ingest until infrastructure prerequisites are satisfied.

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Node 24.14.1 pinned as bootstrap maintenance lane | "Node 24.14.1 is the pinned maintenance lane for this bootstrap" | Bootstrap / runtime | mandatory | No other Node version authorized for bootstrap |
| Parse-only ingress remains default posture | "Parse-only ingress preserved as the default posture" | Ingress / refinery | mandatory | No side-effecting imports without guard token |
| Large-scale corpus ingest blocked until Ingress Refinery + canonical corpus cache are both present | "Large-scale corpus ingest stays paused until the Ingress Refinery and canonical corpus cache are both present" | Ingress / cache | mandatory | Hard gate — ingest blocked, not slowed |
| Nx 22.6.x workspace generated via official CLI | "Nx 22.6.x workspace generated through official Nx CLI and plugins" | Bootstrap / repo-shape | mandatory | Explicitly not a donor tarball import |
| Prism evaluated in shadow mode only | "Prism is evaluated in shadow mode only" | Prism / evaluation | mandatory | No production semantic authority for Prism yet |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Primary Authorities | bootstrap, authority-chain, constitutional | bootstrap authority hierarchy | decision | Primary semantic authority for bootstrap is a hardcoded path: `/Users/emilie/.openclaw/workspace/open-brain/NEXT-SESSION-BOOTSTRAP-v0.1.md` | "Primary Authorities: 1. `/Users/emilie/.openclaw/workspace/open-brain/NEXT-SESSION-BOOTSTRAP-v0.1.md`" | Path contains a username (emilie) — may not resolve on other devs' machines; consider whether this is a local absolute path that should be relative or env-var anchored | high |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Local Execution Constraints | node-version, bootstrap-constraints | node version pinning | requirement | Node 24.14.1 is explicitly pinned as the maintenance lane for bootstrap | "Node 24.14.1 is the pinned maintenance lane for this bootstrap" | Enforce via `.nvmrc` and CI check; do not let this drift | high |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Local Execution Constraints | parse-only, ingress, safety | ingress safety posture | decision | Parse-only ingress is the hardcoded default; side-effecting imports require a guard token | "Parse-only ingress preserved as the default posture" | Align Ingress Refinery implementation with this constraint; ensure guard token mechanism is designed before any promote path | high |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Local Execution Constraints | corpus-ingest, ingress-refinery, cache | ingest gate | risk | Large-scale corpus ingest is hard-paused until both Ingress Refinery AND canonical corpus cache are present. Both prerequisites are required, not either/or | "Large-scale corpus ingest stays paused until the Ingress Refinery and canonical corpus cache are both present" | These two components (Ingress Refinery + canonical corpus cache) are a blocking dependency for any corpus-scale work; track as explicit milestones | high |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Local Execution Constraints | prism, shadow-mode, evaluation | Prism evaluation constraint | decision | Prism is only to be evaluated in shadow mode — no production semantic authority | "Prism is evaluated in shadow mode only" | Do not route Prism output into any authoritative path until shadow mode is formally lifted | medium |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Local Execution Constraints | mission-control, operator-shell | Mission Control classification | decision | Mission Control is classified as an operator shell candidate, not a semantic authority | "Mission Control is an operator shell candidate, not a semantic authority" | Keep Mission Control out of any semantic/routing decisions; it operates at the orchestration layer only | medium |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Repo Receipts | nx-cli, repo-shape, bootstrap | Nx workspace origin | decision | The entif-ai workspace was generated fresh via Nx CLI (22.6.x), not imported from a donor tarball | "Local Execution Constraints: entif-ai is a fresh Nx CLI workspace, not a donor tarball import" | Confirms the bootstrap is greenfield; no legacy SQLite from a donor context unless explicitly added post-bootstrap | high |
| 2026-04-24T21:05 | docs/governance/AUTHORITY_STACK.md | Repo Receipts | parse-only, receipt-law | receipt law compliance | decision | Rosetta core, receipt, source-substrate, source-registry, refinery, cache, and projection packages are all present as first-class artifacts | "Rosetta core, receipt, source-substrate, source-registry, refinery, cache, and projection packages present" | Verify packages are present and not empty; cross-check against SERVICE_INVENTORY | medium |

## Components And Technologies

- **Nx 22.6.x** — official CLI workspace generation (not a donor tarball)
- **Node 24.14.1** — pinned maintenance lane
- **Parse-only ingress** — default safety posture
- **Ingress Refinery** — required before corpus-scale ingest
- **Canonical corpus cache** — required before corpus-scale ingest (paired prerequisite with Ingress Refinery)
- **Prism** — shadow mode evaluation only
- **Mission Control** — operator shell, not semantic authority

## Conceptual Claims

1. **Authority hierarchy is linear and traceable**: Primary authority flows from a named bootstrap document, not from convention or implicit consensus.
2. **Execution constraints are receipt-grade**: Pinning Node version, ingress posture, and Prism mode in a governance document makes violations detectable and auditable.
3. **Ingest pause is a hard gate, not advisory**: "Stays paused until… both present" is a binary block, not a suggestion to go slowly.
4. **Nx CLI provenance matters**: A fresh CLI workspace vs. a donor tarball import has different trust assumptions (no hidden state).

## Dependencies And Sequencing

- **Ingress Refinery** → a prerequisite for large-scale corpus ingest (and therefore for any batch import from docs-intelligence into the runtime corpus)
- **Canonical corpus cache** → paired prerequisite with Ingress Refinery; both required simultaneously
- **Prism shadow mode lift** → requires formal evaluation completion before Prism can hold semantic authority
- **NEXT-SESSION-BOOTSTRAP-v0.1.md** → top of authority chain; if this file is lost or stale, the authority stack has a single point of failure

## Contradictions Or Supersession

- No direct contradictions detected in this document.
- This document does not supersede any prior governance; it establishes new constraints on top of existing ones (the added April 12 authorities supplement the original bootstrap chain).
- Relationship to REPO_SHAPE_AND_CONSTRAINTS: Both are governance docs; REPO_SHAPE defines the folder contract, while AUTHORITY_STACK defines the document authority chain. They are complementary.

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
|---|---|---|---|---|
| AUTHORITY_STACK: hardcoded absolute path with username for primary authority document | issue-candidate | bootstrap, authority-chain, paths | — | Primary authority path `/Users/emilie/.openclaw/workspace/open-brain/NEXT-SESSION-BOOTSTRAP-v0.1.md` contains hardcoded username "emilie"; will not resolve on other devs' machines | high |
| Ingress Refinery + canonical corpus cache are a paired blocking dependency for corpus-scale ingest | issue-candidate | ingress, cache, blocking-dependency | — | Both must be present simultaneously to unblock large-scale ingest; neither alone is sufficient | medium |
| Prism shadow-mode lift criteria not defined | issue-candidate | prism, evaluation, shadow-mode | — | Document states Prism is shadow-mode only but defines no criteria for graduating out of shadow mode | low |

## Project Board Suggestions

- Area: Bootstrap / Governance
- Cycle: Current
- Status: Constraint document — informational for board, not a deliverable itself
- Blocked by: N/A (this is a constraint document, not a feature)
- Parallelization notes: Authoritative path resolution (hardcoded emilie path) should be cleaned up as a separate housekeeping task independent of any feature work

## Open Questions

- What are the explicit criteria for lifting Prism out of shadow mode? Who approves that?
- Is there a backup/alternative authority document if NEXT-SESSION-BOOTSTRAP-v0.1.md is unavailable?
- Who owns the authority stack? Is there a review/approval process when new authorities are added (as was done April 12)?
