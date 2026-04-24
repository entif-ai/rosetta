# Batch 1: Highest-Authority Rosetta Direction

## Source

- Path: `docs/intake/docs-intelligence/2026-04-24-batch-1-highest-authority-rosetta-direction.md`
- Title: Batch 1: Highest-Authority Rosetta Direction
- Date evidence: 2026-04-24 (extraction), docs dated 2026-04-10 through 2026-04-24
- Authority tier: governance / planning / live
- Freshness: current at time of extraction
- Word count: ~3,500 across 6 docs
- Extractor: Emilie (OpenClaw docs-intelligence agent)
- Extraction date: 2026-04-24

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source documents have been ingested into Rosetta's future semantic corpus.

---

## Summary

Batch 1 establishes the current build direction: a three-rung staircase (Bootstrap → Text-Core MVP → Alpha RC), explicit non-negotiable architectural law, package inventory, current implementation state vs. fixture-backed vs. not-yet-implemented, and a dependency graph that puts TC-001 through TC-004 as prerequisite gate before further Text-Core prioritization. Key insight: docs-intelligence is the enabler of evidence-driven scope decisions — the implementation issues TC-005 through TC-007 must not move forward until Batch 1 extraction clarifies priorities.

---

## Goals And Intent

- Extract the current intended build direction from governing docs
- Resolve what should be prioritized before more Text-Core implementation
- Build a current component and dependency map from extracted evidence
- Identify which open issues should pause or change priority until docs intelligence resolves scope
- Produce issue candidates, dependency graph, and project-board field recommendations

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24T19:52 | `README.md` | Package Map | `governance`, `text-core` | Package inventory, current scope | `decision` | Package map is authoritative inventory; `rosetta-store` and `rosetta-tapestry` are current minimums; larger packages (`ingest-core`, `source-normalizer`, etc.) are planned but not yet implemented | "Each package now has its own `README.md` describing purpose, current functionality, roadmap, and known limits." | no action | high |
| 2026-04-24T19:52 | `README.md` | What Exists Today | `runtime-ingestion` | Runtime vs bootstrap state | `decision` | Current state is "working provenance-kernel prototype with source-aware bootstrap fixtures" — live source adapters, durable DB, trust scoring engine, full SHACL, and OB1/Prism runtime are all NOT YET IMPLEMENTED | "This is not yet a production ingestion platform" | no action; this is the explicitly stated current posture | high |
| 2026-04-24T19:52 | `README.md` | Commit Protocol | `governance` | Commit hygiene, semantic versioning | `decision` | Conventional Commits required; `nx release` not configured but commit history shaped for future compatibility; local enforcement via Husky + commitlint | "Commit only coherent, validated slices" | no action | high |
| 2026-04-24T19:52 | `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md` | Decision | `text-core` | Text-Core MVP gate, exit criteria | `requirement` | Text-Core MVP is next rung after Bootstrap; requires two structurally different text-source families end-to-end, deterministic refinery, source→observation→interpretation→tapestry flow, rights-scoped retrieval, minimum English accompaniment, and Postgres/pgvector baseline | "Text-Core MVP is the next rung after the current bootstrap provenance kernel" | update issue #10, #11, #12 priorities based on this gate | high |
| 2026-04-24T19:52 | `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md` | Must-Have | `text-core`, `runtime-ingestion` | TC-001 through TC-010, scope classification | `requirement` | Ten Must-Have capabilities classified M1–M10; M1–M5 are source episode, normalization, dedupe, observation tiling, promotion state machine; M6–M10 are tapestry v1, rights retrieval, Postgres/pgvector, two text families, English accompaniment | "M1: Source episode envelope and family classification" → TC-001 | create issues for M6–M10 if not already covered by TC-006/TC-007 | high |
| 2026-04-24T19:52 | `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md` | Dependency Graph | `text-core`, `project-board` | Mermaid dependency graph | `dependency` | TC-001 → TC-002 → TC-003/TC-004 → TC-005 → TC-006/TC-007; TC-006+TC-007 → Text-Core Green; explicit graph shows TC-005 must follow both TC-003 and TC-004 | "C --> D['TC-005 Promotion State Machine']; C --> E['TC-004 Source to Observation + Receipts']" | use this dependency graph for project-board blocked-by fields | high |
| 2026-04-24T19:52 | `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md` | Follow-Up Implementation Issues | `text-core` | TC-001 through TC-007 detail | `issue-candidate` | Each TC issue has explicit targets, acceptance criteria, and priority; TC-001/002/003/004 are already merged (per CURRENT_HANDOFF); TC-005/006/007 are the remaining Text-Core implementation stack | "TC-005 Promotion state machine and structured extracts — Priority: P1" | coordinate with open issues #10, #11, #12 | high |
| 2026-04-24T19:52 | `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md` | Deferred | `text-core` | Deferred capabilities | `decision` | YouTube transcript, social-thread import, full Ithkuil corpus, multimodal semantics, voice daemon, swarm/DHT/marketplace, distributed anchoring are all explicitly deferred to later rungs | "YouTube transcript and social-thread import — Valid B-rung work, but not needed for the minimum two-family threshold" | mark these as deferred in project-board; do not schedule in current cycle | high |
| 2026-04-24T19:52 | `docs/backlog/20260411 - Rosetta Canonical Build Charter (v0.1).md` | Non-negotiable architectural law | `governance` | Architectural law, core vs non-core boundary | `decision` | Rosetta core owns: canonical tiles/CIDs/envelopes/lineage, meaning pipeline, run/action/toolcall/observation/evaluation spine, receipt law, pack boundary; Rosetta does NOT own: one true ontology, mutable blob store, truth oracle, monolithic product layer | "That separation is already core law in v3" | no action; this is governing constraint already captured | high |
| 2026-04-24T19:52 | `docs/backlog/20260411 - Rosetta Canonical Build Charter (v0.1).md` | Text-Core MVP exit criteria | `text-core` | Exit criteria for next rung | `requirement` | Text-Core is reached only when: multiple text-source families ingest end-to-end, deterministic ingress refinery exists, source→observation→interpretation→tapestry works, rights-scoped retrieval works, English accompaniment minimum exists, receipt emission for all promotions, Postgres/pgvector baseline before serious RC claims | "That is the real next rung, not hand-wavy 'alpha because we vibed hard enough.'" | use these as acceptance criteria for TC-006/TC-007 | high |
| 2026-04-24T19:52 | `docs/backlog/20260411 - Rosetta Canonical Build Charter (v0.1).md` | Storage and memory law | `storage` | Memory planes, storage migration path | `decision` | Three memory planes must remain separate; Bootstrap uses local CAS + SQLite; Text-Core and beyond graduate to Postgres JSONB + rights enforcement + pgvector | "Memory planes remain separate: Plane 1: Rosetta truth/provenance, Plane 2: temporal state/history, Plane 3: activation/relevance/recall" | no action; this is already in architecture docs | high |
| 2026-04-24T19:52 | `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md` | 0. Read this first | `governance` | Backlog governing rules | `decision` | Thin vertical slices beat fogbanks; every meaningful step emits receipts; raw signals never overwritten; parse-only default; tests are executable skeleton; deferred items exist as failing tests/stubs/explicit non-goals | "Cheap-first refinement happens before expensive semantic hydration" | no action; already in backlog governing rules | high |
| 2026-04-24T19:52 | `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md` | 2. Repo package target | `governance` | Planned package inventory | `technology` | Full package map includes `ingest-core`, `source-normalizer`, `refinery-dedupe`, `refinery-routing`, `tile-minting`, `lexical-anchor-mapper`, `english-accompaniment`, `memory-temporal-adapter`, `index-postgres`, `index-pgvector`, plus integrations for arxiv, chat, journal, questionnaire, github, youtube, social | "integrations/arxiv-import/ ... integrations/chat-import/ ... integrations/journal-import/" | defer package creation until TC-006+TC-007 are scoped; current packages are already defined in README | medium |
| 2026-04-24T19:52 | `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md` | 9. Exit gates | `text-core` | Bootstrap Green, Text-Core Green, Alpha RC Green definitions | `requirement` | Bootstrap Green: workspace boots, canon/CID/validate/verify/run-demo work, guarded echo path green, receipts, conformance, CI green; Text-Core Green: Bootstrap Green + two text families, deterministic refinery, source→obs→interp→tapestry, rights retrieval, English accompaniment, Postgres/pgvector; Alpha RC: Text-Core Green + Ithkuil threshold, lexical anchors, full accompaniment, temporal/activation planes, mission control | "Bootstrap is green only when the tiniest honest loop works" | use exit gate definitions for milestone tracking | high |
| 2026-04-24T19:52 | `docs/backlog/20260410 - Entif.AI - Rosetta - Phased Backlog (v0.1).md` | Effort model | `governance` | XS/S/M/L/XL effort scale | `decision` | XS <4h, S = 4h (1 micro-tier), M = 2-3 micro-tiers, L = 1-2 days, XL = multi-sprint | "Effort model: XS = under 4 hours, S = 1 micro-tier (4 hours)" | use effort model when estimating issue candidates | high |
| 2026-04-24T19:52 | `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md` | Layer Map | `governance` | Five-layer architecture | `decision` | Layer 1: Rosetta kernel (rosetta-canon/cid/core/schemas/receipts/guard/tapestry/store); Layer 2: Source substrate (source-substrate, source-registry); Layer 3: Refinery and cache (ingress-refinery, canonical-cache); Layer 4: Projection (projection-adapters); Layer 5: Apps (rosetta-cli, rosetta-api, rosetta-operator) | "Layer 4: Projection — projection-adapters — read-only views for OB1, Prism, and Mission Control" | no action; architecture already documented | high |
| 2026-04-24T19:52 | `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md` | What Is Not Yet Implemented | `runtime-ingestion` | Gap between current and production | `risk` | Live source adapters (DataCite, Crossref, OpenAlex, Zenodo, etc.), durable Postgres cache, full SHACL execution, evidence-driven trust scoring, real OB1/Prism runtime, large-scale corpus ingest are all NOT YET IMPLEMENTED | "live source adapters for DataCite, Crossref, OpenAlex, Zenodo... not yet implemented" | do not claim these capabilities; mark as future work | high |
| 2026-04-24T19:52 | `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md` | "Done" Language To Use Carefully | `governance` | Precise language guidance | `decision` | "implemented" = executable validated mechanism; "modeled" = shape/type/tile exists but live evidence absent; "fixture-backed" = real code over bootstrap data; "not yet implemented" = conceptual/deferred | "If a behavior signs, hashes, validates, clusters, or denies/allows via executable code, it is fair to call that implemented" | reinforce this language discipline in docs intelligence and implementation write-ups | high |
| 2026-04-24T19:52 | `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md` | (not yet read) | `governance` | Repo structure constraints | `ablation` | Not read — skip in this batch; add to Batch 2 priority queue | add to Batch 2 | low |
| 2026-04-24T19:52 | `docs/governance/SERVICE_INVENTORY.md` | (not yet read) | `governance` | Service inventory | `ablation` | Not read — skip in this batch; add to Batch 2 priority queue | add to Batch 2 | low |

---

## Components And Technologies

- **Current packages (implemented):** `rosetta-canon`, `rosetta-cid`, `rosetta-core`, `rosetta-schemas`, `rosetta-receipts`, `rosetta-guard`, `rosetta-tapestry`, `rosetta-store`, `source-substrate`, `source-registry`, `ingress-refinery`, `canonical-cache`, `projection-adapters`
- **Planned packages (not yet created):** `ingest-core`, `source-normalizer`, `refinery-dedupe`, `refinery-routing`, `tile-minting`, `lexical-anchor-mapper`, `english-accompaniment`, `memory-temporal-adapter`, `memory-activation-adapter`, `index-postgres`, `index-pgvector`
- **Apps:** `rosetta-cli`, `rosetta-api`, `rosetta-operator` (Mission Control is future)
- **Integrations (planned):** `arxiv-import`, `chat-import`, `journal-import`, `questionnaire-import`, `github-text-import`, `youtube-transcript-import`, `social-thread-import`
- **Storage:** Bootstrap = local CAS + SQLite; Text-Core = Postgres JSONB + pgvector
- **Languages/infra:** TypeScript (primary), Python for eval harness
- **Tooling:** Nx + pnpm workspace, Vitest, Husky/commitlint, ESLint

---

## Conceptual Claims

- Rosetta is the semantic operating system; Entif is the governed execution and evolution layer built on top; everything else is an attachable organ, not the constitution (Charter)
- Three-rung staircase is the governing build order: Bootstrap → Text-Core MVP → Alpha RC (Backlog v0.1)
- Receipt absence is a failure condition, not a logging oversight (Charter)
- No retrieve-then-filter pattern — rights enforced at boundary (Charter, Backlog)
- Raw signals never get overwritten by interpretations (Backlog v0.1 governing rule)
- The test suite is the backlog's executable skeleton (Backlog v0.1)

---

## Dependencies And Sequencing

1. **TC-001 (merged):** Source episode envelope → TC-002, TC-003
2. **TC-002 (merged):** Normalization + fingerprints → TC-003, TC-004, tools/doc-intake
3. **TC-003 (merged):** Dedup + revision persistence → TC-005
4. **TC-004 (merged):** Source to observation + receipts → TC-005
5. **TC-005 (OPEN):** Promotion state machine → TC-006, TC-007
6. **TC-006 (OPEN):** Tapestry v1 + rights retrieval + Postgres/pgvector → Text-Core Green
7. **TC-007 (OPEN):** Chat + arXiv importers + English accompaniment → Text-Core Green
- **Blocked:** TC-005+ should not proceed until TC-001 through TC-004 are verified against the scope gate doc
- **Blocked:** Batch 1 extraction must complete before TC-006/TC-007 priorities can be confirmed

---

## Contradictions Or Supersession

- `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md` and `docs/governance/SERVICE_INVENTORY.md` were listed in Batch 1 priority queue but not yet read; extracted as deferred to Batch 2
- No direct contradictions found among the six documents — they are consistent and mutually reinforcing

---

## Issue Candidates

| Title | Type | Draft Or Target | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| Refine TC-005 acceptance around replayable promotion states and refusal receipts | issue update/comment | Existing issue target: #10 | `text-core`, `implementation`, `ingress-refinery`, `schemas` | TC-001 through TC-004 | Scope Gate M5; Phased Backlog B-007/B-008 |
| Split TC-006 into tapestry v1 plus rights retrieval/storage subtasks if implementation scope grows | issue update/comment | Existing issue target: #11 | `text-core`, `tapestry`, `storage` | TC-005 | Scope Gate M6/M7/M8; Phased Backlog B-009/B-011 |
| Keep TC-007 to chat/arXiv plus English accompaniment, not all importers | issue update/comment | Existing issue target: #12 | `text-core`, `integrations`, `english-accompaniment` | TC-006 and storage baseline | Scope Gate M9/M10; Phased Backlog B-012/B-015 |
| Draft Postgres/pgvector operational baseline issue if TC-006 remains too broad | draft candidate | `docs/intake/issue-drafts/text-core-postgres-pgvector-operational-baseline.md` | `storage`, `retrieval`, `text-core` | rights retrieval contracts | Charter Text-Core exit criteria; Phased Backlog B-011/9.2 |
| Draft English accompaniment package contract | draft candidate | `docs/intake/issue-drafts/text-core-english-accompaniment-package-contract.md` | `english-accompaniment`, `documentation`, `text-core` | structured extracts and tapestry intros | Scope Gate M10; Phased Backlog B-015 |
| DI-002 Batch 2: Current PRD/RFC Product Shape | docs-intelligence | `/docs/intake/` | `planning`, `docs-intake` | DI-001 complete | PRIORITY_QUEUE.md Batch 2 definition |
| DI-003 Batch 3: Source Dialogue About Rosetta and Agent Orchestration | docs-intelligence | `/docs/intake/` | `planning`, `docs-intake` | DI-001 complete | PRIORITY_QUEUE.md Batch 3 definition |
| DI-004 Read REPO_SHAPE_AND_CONSTRAINTS.md and SERVICE_INVENTORY.md | docs-intelligence | `/docs/intake/` | `planning`, `docs-intake` | DI-001 complete | Not yet read in Batch 1 |
| TC-006 scope clarification: tapestry v1 + rights + Postgres vs separate issues | implementation | Existing issue target: #11 | `text-core`, `tapestry`, `storage` | TC-005 green | Scope gate M6/M7/M8 may need split into separate issues; current TC-006 covers all three |
| TC-006 blocked by: confirm TC-001 through TC-004 integration against scope gate | blocker | Existing issue target: #11 |`text-core` | TC-001 through TC-004 | "Pause additional Text-Core implementation by default unless explicitly selected" — CURRENT_HANDOFF.md |

---

## Project Board Suggestions

- **Area:** `text-core`, `docs-intelligence`
- **Cycle:** discovery → bootstrap (complete) → text-core (active)
- **Status:** active (TC-001 through TC-004 merged; TC-005/006/007 open)
- **Blocked by:** TC-005 cannot start until TC-001–TC-004 integration verified; TC-006/TC-007 cannot start until TC-005 is green
- **Parallelization notes:** TC-005 is the current critical path; TC-006 and TC-007 can be planned in parallel but not implemented until TC-005 is green; Batch 2/3 docs intelligence can proceed in parallel with implementation

---

## Open Questions

- Does TC-006 need to be split into separate issues for tapestry v1, rights retrieval, and Postgres/pgvector baseline, or kept as one issue with three scope areas?
- Should Batch 2 (PRD/RFC extraction) begin immediately in a parallel agent, or wait for DI-001 to be fully reviewed and merged?
- Should `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md` and `docs/governance/SERVICE_INVENTORY.md` be added to Batch 1 or treated as a separate governance batch?