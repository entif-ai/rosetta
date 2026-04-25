# Docs Intake Issue Reconciliation

Date: 2026-04-25
Scope: reconcile GitHub issues, active Markdown issue drafts, and issue-candidate rows embedded in docs-intelligence extractions.

## Authority Rule

GitHub issues are the canonical work-order surface once a candidate is promoted. Until then, Markdown files under `docs/intake/issue-drafts/` are staging artifacts.

Extraction files under `docs/intake/docs-intelligence/` are evidence ledgers, not canonical issue stores. They may contain candidate rows, but every candidate row must either link to an issue draft file, link to an existing GitHub issue/comment target, or be explicitly marked folded/deferred.

The source docs under `docs/` outrank all intake artifacts. When intake output disagrees with source material, prefer the source. Within source material, RFCs are the highest-priority implementation authority for protocol/build sequencing unless a later explicit governance document supersedes them.

There is no `docs/intake/issues/` directory in the current repo. The active local issue queue is `docs/intake/issue-drafts/`.

## Current Canonical GitHub Surface

Open GitHub issues as of this pass:

| Issue | Canonical role | Notes |
| --- | --- | --- |
| #10 TC-005 Promotion state machine and structured extracts | Text-Core implementation | Still active; do not conflate with docs-intelligence extraction machinery. |
| #11 TC-006 Tapestry v1, rights retrieval, and Postgres/pgvector baseline | Text-Core implementation | Broad; storage/retrieval split draft exists if it needs decomposition. |
| #12 TC-007 Chat + arXiv importers and English accompaniment | Text-Core implementation | Broad; importer and English-accompaniment split drafts exist but real acquisition remains deferred. |
| #32 DI-008 Ledger locking mechanism | Docs-intelligence operations | Instruction-level lock protocol exists; real atomic lock/dead-letter implementation remains open. |
| #33 DI-009 Internal knowledge graph | Docs-intelligence operations | Manual YAML exists; graph-backed automation remains open. |
| #41 Authority-stack portability/integrity/Prism gaps | Published intake issue | Originated from archived `authority-stack-gaps`. |
| #42 Pack schemas and SHACL source artifacts | Published intake issue | Overlaps some source-substrate work; keep as schema/receipt surface, not full Source Substrate domain. |
| #43 Coverage reporting and package acceptance matrices | Published intake issue | Acceptance/reporting surface. |

Closed hygiene issues #31, #34, #39, and #45 are resolved by the merged sub-agent boot v2 work.

## Local Intake Inventory

| Bucket | Count | Location |
| --- | ---: | --- |
| Active issue drafts | 48 | `docs/intake/issue-drafts/*.md` |
| Archived/published drafts | 8 | `docs/intake/issue-drafts/archive/*.md` |
| Docs-intelligence Markdown files | 19 | `docs/intake/docs-intelligence/*.md` |

## Promotion Waves

### Wave 1: RFC-derived work orders

Promote these first because they are backed by `docs/RFCs/` and are granular enough to become GitHub issues with little synthesis.

| Draft | Recommended action |
| --- | --- |
| `rock-3111-c-pack-id-placeholder.md` | Promote. RRP pack identity needs a real content-addressed freeze algorithm. |
| `rock-3111-c-refinement-enforcement.md` | Promote. Refinement-first needs validator/CI enforcement. |
| `rock-3111-c-dependency-cycle-detection.md` | Promote. Pack dependency validation is narrow and testable. |
| `rock-3111-c-persona-pack-governance.md` | Promote as governance/spec work; lower implementation priority than validator issues. |
| `rock-3111-c-recipes-skills-ci.md` | Promote or fold into the RRP validator epic, depending on desired issue granularity. |
| `omoc-lean-vs-learned-dilemma.md` | Promote as the canonical OMOC routing ADR/research-spike issue. |
| `swarm-gnosis-public-commons-licensing-undefined.md` | Promote as a Swarm Gnosis governance research issue, gated before public commons work. |
| `swarm-federation-governance-complexity.md` | Keep staged behind the public commons issue unless it becomes a separate federation-layer ADR. |
| `omoc-slug-adoption-timing-hydration-quality.md` | Promote or fold into the Tack 1 context-compiler issue as the canonical OQ-4 hydration-quality research spike. |
| `omoc-swarm-gnosis-eight-spec-proposal-bloat.md` | Keep staged as an ADR/spec-sequencing issue; do not promote until OQ-1/OQ-6 blockers are explicitly linked to ROCK-3201 and ROCK-3205. |

Duplicates to fold before promotion:

| Keep | Fold into it |
| --- | --- |
| `omoc-lean-vs-learned-dilemma.md` | `omoc-lean-vs-learned.md`, `omoc-lean-vs-learned-routing-paradigm.md` |

### PR #58 Salvage

PR #58 reprocessed the already-covered OMOC Swarm Gnosis RFC and was closed as superseded. Its only retained artifacts are:

| Retained draft | Reason |
| --- | --- |
| `omoc-slug-adoption-timing-hydration-quality.md` | Captures OQ-4 as a distinct hydration-quality research spike. |
| `omoc-swarm-gnosis-eight-spec-proposal-bloat.md` | Captures the unsequenced ROCK-3201 through ROCK-3207 / ENTIF-OMOC-001 spec-suite risk. |

### Wave 2: Text-Core split issues

These refine existing GitHub issues rather than replacing them.

| Draft | Recommended action |
| --- | --- |
| `text-core-postgres-pgvector-operational-baseline.md` | Promote only if #11 remains too broad; otherwise comment on #11. |
| `text-core-english-accompaniment-package-contract.md` | Promote only if #12 needs a separate acceptance surface; otherwise comment on #12. |
| `real-acquisition-adapters-behind-refinery-boundary.md` | Keep deferred. It overlaps #12 and should wait until #10 outputs plus #11 storage/retrieval boundaries are sharper. |

### Wave 3: Protocol/tooling scaffold issues

These are actionable but mostly PRD/chat-derived. Validate them against RFC/governance docs before promotion.

| Draft | Recommended action |
| --- | --- |
| `2026-04-25-pro-ext-research-cas-uri-missing.md` | Promote after checking whether any RFC already defines content-addressed IDs. |
| `2026-04-25-pro-ext-research-headers-check-missing.md` and `rosetta-traceability-header-enforcement.md` | Reconcile into one traceability-header issue. |
| `2026-04-25-pro-ext-research-python-boundary-enforcement-missing.md` and `python-module-boundary-contract.md` | Reconcile into one Python boundary issue. |
| `2026-04-25-pro-ext-research-known-red-tests-policy-missing.md` | Promote if CI work starts; otherwise keep staged. |
| `RPP-task-numbering-reference.md` | Promote as documentation/reference work before using numbered RPP tasks for sequencing. |

### Wave 4: Harness/kernel architecture issues

These are important but should be consolidated into a smaller set of architecture work orders before GitHub promotion because many came from chat extractions and overlap heavily.

Primary draft cluster:

| Candidate parent | Fold/relate |
| --- | --- |
| `constitutional-primitives-prose-not-law.md` | `harness-platform-mismatch-root-cause.md`, `langgraph-workflow-not-constitutional.md`, `write-admission-gate-nine-step-state-machine.md` |
| `six-layer-memory-model-federated-jurisdiction.md` | `memory-adapter-certification-harness.md`, `source-substrate-missing-protocol-domain.md`, `projection/rebuildability` rows still embedded in extraction |
| `skillpack-importer-quarantine-flow.md` | Keep as implementation issue once certification harness scope is clear. |
| `mac-studio-control-two-tier-guard.md` | Keep staged until local control adapters are in scope. |
| `video-transcript-dedup-playlist-tracking.md` | Keep staged until source adapter work resumes. |

## Remaining Purgatory

These extraction files still contain issue-candidate rows that are not fully normalized into draft files or explicit existing-issue targets:

| Extraction | Gap |
| --- | --- |
| `2026-04-24-agentic-orchestration-failures.md` | Many rows exist beyond the 9 active draft files. Fold repeated kernel/memory/receipt rows into parent drafts or create missing draft files. |
| `2026-04-25-entif-rosetta-prds-pro-extended-research.md` | Several candidates are covered by active drafts, but ACP adapter, ingress dedupe, promotion state machine, cache-prefix, memory taxonomy, Nx cache retention, and schema ID naming still need draft files or explicit folds into #10/#11. |
| `2026-04-25-omoc-ontologies-agentic-token-efficiency.md` | Candidate table needs draft backfill or explicit fold into existing OMC/Rosetta protocol drafts. |
| `2026-04-24-batch-2-governance-and-prd.md` | NOT LAME implementation rows overlap the harness/kernel cluster; resolve as folded or draft-backed. |

## Immediate Work Order

1. Salvage the safe parts of draft PR #52 into a clean PR: deferred-status preservation, blank ID fixes, and intake reconciliation.
2. Close or supersede draft PR #52 after the clean salvage PR lands.
3. Promote Wave 1 RFC-backed drafts to GitHub issues, archiving each promoted draft and updating `docs/intake/github-issue-ledger.json`.
4. Create a follow-up DI issue for automatic candidate-to-draft coverage checking, or extend #33 if the knowledge graph is meant to own this validation.
5. Run a second pass over the purgatory table to either create missing draft files or mark candidates as folded into promoted issues.
