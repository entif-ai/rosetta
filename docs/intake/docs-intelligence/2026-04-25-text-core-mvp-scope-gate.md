# Docs Intelligence Extraction

## Source

- Path: `docs/backlog/20260424 - Rosetta Text-Core MVP Scope Gate (v0.1).md`
- Title: Rosetta Text-Core MVP Scope Gate v0.1
- Date evidence: 2026-04-24
- Authority tier: backbone (backlog, issue #4 work product)
- Freshness: current
- Word count: ~2,800
- Extractor: Emilie Eudico / docs-intelligence heartbeat
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

The Text-Core MVP Scope Gate v0.1 defines what "Text-Core Green" means: a receipt-bound text-ingest spine that proves source episodes can become observations, early interpretations, task-scoped tapestries, and rights-scoped retrieval results without losing raw provenance. It establishes ten Must-Have capabilities (M1–M10), a dependency graph (TC-001 through TC-007), and explicit exit criteria for graduating from Bootstrap. TC-005 (Promotion State Machine) is the critical path item. TC-006/TC-007 are blocked until TC-005 is green. This doc is the authoritative reference for what Text-Core must deliver before Alpha RC.

## Goals And Intent

- Define minimum viable Text-Core as a real rung, not an infinite horizon
- Classify capabilities as Must-Have, Should-Have, or Deferred to prevent scope creep
- Provide explicit dependency graph so project-board blocked-by fields are accurate
- Give implementation teams a TC-001 through TC-007 issue set to publish after this gate lands
- Separate Text-Core MVP gate from future Alpha RC ambitions

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Two structurally different text-source families ingest end-to-end | "minimum two-family threshold"; M9 | `integrations/chat-import`, `integrations/arxiv-import` | P0 | Chat + arXiv/paper text is the strongest first pair |
| Deterministic refinery behavior is green | M2, M3 scope | `packages/ingress-refinery`, `packages/rosetta-canon` | P0 | Chronology fingerprints must be stable |
| source → observation → interpretation → tapestry flow is green | M4, M6 | `packages/ingress-refinery`, `packages/rosetta-tapestry` | P0 | No interpretation overwrites source; transform receipts required |
| Rights-scoped retrieval is green | M7 | `packages/rosetta-store` | P0 | Enforce rights before return; no retrieve-then-filter |
| Minimum English accompaniment is green for promoted artifacts | M10 | future `packages/english-accompaniment` | P0 | Required: observation summaries, extract explanations, tapestry intros, refusal explanations |
| Postgres/pgvector operational baseline is green | M8 | future `packages/index-postgres`, `packages/index-pgvector` | P0 | Required before serious RC claims; can start with migration contracts |
| Source episode envelope and family classification | M1, TC-001 | `packages/source-substrate`, `packages/ingress-refinery`, `packages/rosetta-schemas` | P0 | Unknown source family becomes `unresolved`, not silently dropped |
| Promotion state machine with explicit routing states | M5, TC-005 | `packages/ingress-refinery`, `packages/rosetta-schemas` | P0 | Routing states must be explicit and replayable; ambiguous → pending-confirmation |
| Deferred: YouTube transcript, social-thread import, full Ithkuil corpus, multimodal, voice daemon | Deferred table | — | deferred | C-rung/Alpha RC; not needed for minimum two-family threshold |
| Deferred: Swarm replication, DHT, marketplace, distributed anchoring | Deferred table | — | deferred | Future ecosystem; not Text-Core MVP |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24 | Scope Gate §Decision | Text-Core MVP gate | `text-core` | scope-gate, text-core | decision | Text-Core MVP is the next rung after Bootstrap; requires two structurally different text-source families end-to-end, deterministic refinery, source→observation→interpretation→tapestry, rights-scoped retrieval, minimum English accompaniment, and Postgres/pgvector baseline | "Text-Core MVP is the next rung after the current bootstrap provenance kernel" | update issue #10, #11, #12 priorities based on this gate | high |
| 2026-04-24 | Scope Gate §Scope Classification | Must-Have M1-M10 | `text-core`, `runtime-ingestion` | scope-classification, M1-M10, tc-001-tc-007 | requirement | Ten Must-Have capabilities classified M1–M10; M1–M5 are source episode, normalization, dedupe, observation tiling, promotion state machine; M6–M10 are tapestry v1, rights retrieval, Postgres/pgvector, two text families, English accompaniment | "M1: Source episode envelope and family classification" → TC-001 | create issues for M6–M10 if not already covered by TC-006/TC-007 | high |
| 2026-04-24 | Scope Gate §Dependency Graph | Dependency graph | `text-core`, `project-board` | dependency-graph, mermaid | dependency | TC-001 → TC-002 → TC-003/TC-004 → TC-005 → TC-006/TC-007; TC-006+TC-007 → Text-Core Green; explicit graph shows TC-005 must follow both TC-003 and TC-004 | "C --> D['TC-005 Promotion State Machine']; C --> E['TC-004 Source to Observation + Receipts']" | use this dependency graph for project-board blocked-by fields | high |
| 2026-04-24 | Scope Gate §Follow-Up Issues | TC-001 through TC-007 | `text-core` | tc-001, tc-002, tc-003, tc-004, tc-005, tc-006, tc-007 | issue-candidate | Each TC issue has explicit targets, acceptance criteria, and priority; TC-001/002/003/004 are already merged (per CURRENT_HANDOFF); TC-005/006/007 are the remaining Text-Core implementation stack | "TC-005 Promotion state machine and structured extracts — Priority: P1" | coordinate with open issues #10, #11, #12 | high |
| 2026-04-24 | Scope Gate §Deferred | Deferred capabilities | `text-core` | deferred, scope-boundary | decision | YouTube transcript, social-thread import, full Ithkuil corpus, multimodal semantics, voice daemon, swarm/DHT/marketplace, distributed anchoring are all explicitly deferred to later rungs | "YouTube transcript and social-thread import — Valid B-rung work, but not needed for the minimum two-family threshold" | mark these as deferred in project-board; do not schedule in current cycle | high |
| 2026-04-24 | Scope Gate §Source Basis | Source docs cited | `text-core`, `docs-intelligence` | source-basis, backlog-refs | dependency | Relies on: Phased Backlog v0.1 (B-001–B-016), Canonical Build Charter v0.1 (exit criteria), Pasigraphy Protocol v3 (current implementation state), OMOC Research Spec (ingest pipeline design) | §Source Basis lists 4 source docs | ensure those 4 docs are extracted and cross-referenced before Alpha RC | high |
| 2026-04-24 | Scope Gate §Non-Goals | Non-goals | `text-core` | non-goals, scope-boundary | constraint | No implementation code changes; no large-scale docs corpus ingest; no live upstream fetchers until parse-only source episode contracts are green; no Alpha RC claim | §Non-Goals lists 4 non-goals | use non-goals as a filter when evaluating new proposals | high |
| 2026-04-24 | Scope Gate §M1 | Source episode envelope | `source-substrate`, `ingress-refinery` | source-episode, family-classification, unresolved-family | requirement | source episode type must capture family, locator, raw evidence refs, rights scope, chronology, and parse-only mode; unknown source family becomes `unresolved`, not silently dropped | "unknown source family becomes `unresolved`, not silently dropped" | verify TC-001 acceptance criteria covers the `unresolved` fallback | high |
| 2026-04-24 | Scope Gate §M2 | Chronology fingerprints | `rosetta-canon`, `ingress-refinery` | chronology, fingerprinting, content-fingerprint, revision-fingerprint | requirement | content fingerprint stable across formatting-only changes; revision fingerprint changes when materially relevant content changes; created/updated/exported/path/mtime evidence must stay distinct | "Content fingerprint and revision fingerprint must be distinct" | verify TC-002 covers both fingerprint types | high |
| 2026-04-24 | Scope Gate §M3 | Dedupe and revision graph | `canonical-cache` | dedupe, revision-graph, append-only, cache-persistence | requirement | raw source evidence remains append-only; cache/index state may change but must preserve supersession trace; repeated ingest of identical normalized content is idempotent | "Raw source evidence remains append-only" | verify TC-003 acceptance covers supersession trace | high |
| 2026-04-24 | Scope Gate §M4 | Source → observation tiling | `ingress-refinery`, `rosetta-core`, `rosetta-receipts` | observation-tiling, source-boundary, transform-receipts | requirement | source and observation tiles remain separate; observation tiles reference source spans; transform receipts are emitted and verifiable; derived summaries/extracts are separate artifacts | "No interpretation overwrites source" | verify TC-004 covers the source/observation boundary enforcement | high |
| 2026-04-24 | Scope Gate §M5 | Promotion state machine | `ingress-refinery`, `rosetta-schemas` | promotion-state-machine, routing-states, structured-extracts | requirement | routing states are explicit and replayable; ambiguous classification produces pending-confirmation; blocked promotion emits refusal receipt; entity/relationship extracts link to evidence spans | "Ambiguity creates pending-confirmation or conjecture, not silent promotion" | TC-005 is critical path; Refine TC-005 acceptance around replayable promotion states and refusal receipts | high |
| 2026-04-24 | Scope Gate §M6 | Tapestry v1 | `rosetta-tapestry`, `rosetta-store` | tapestry-v1, bounded-context, provenance-closure | requirement | task-scoped tapestry manifests have bounded members and provenance closure; context is a bounded compiled package, not raw prompt flooding; closure claims must be verifiable | "Context is a bounded compiled package, not raw prompt flooding" | verify TC-006 covers bounded manifest and closure verification | high |
| 2026-04-24 | Scope Gate §M7 | Rights-scoped retrieval | `rosetta-store` | rights-retrieval, rights-scoped, cache-domains | requirement | enforce rights before return; no retrieve-then-filter behavior; cache domains cannot leak across tenant/sensitivity/purpose scopes | "Enforce rights before return. No retrieve-then-filter behavior" | verify TC-006 covers rights-enforcement-at-boundary | high |
| 2026-04-24 | Scope Gate §M8 | Postgres/pgvector baseline | `index-postgres`, `index-pgvector` | postgres, pgvector, migration-contracts, storage-law | requirement | required before claiming Text-Core Green; can start with migration contracts and fixture-backed local DB tests; graduates beyond local CAS/SQLite toward Postgres JSONB, rights enforcement, pgvector baseline | "Can start with migration contracts and fixture-backed local DB tests" | TC-007 is the Postgres baseline ticket | high |
| 2026-04-24 | Scope Gate §M9 | Two text-source families | `chat-import`, `arxiv-import` | importers, two-family-threshold, chat-transcript, arxiv | requirement | minimum threshold is two structurally different families; chat transcript plus arXiv/paper text is the strongest first pair | "Minimum threshold is two structurally different families" | TC-007 covers the two-family requirement | high |
| 2026-04-24 | Scope Gate §M10 | English accompaniment | `english-accompaniment`, `rosetta-tapestry` | english-accompaniment, promoted-artifacts, uncertainty-markers | requirement | required for promoted artifacts: observation summaries, extract explanations, tapestry intros, refusal explanations; evidence refs or uncertainty markers required | "Required for promoted artifacts" | draft English accompaniment package contract | medium |
| 2026-04-24 | Scope Gate §Should-Have | Should-Have list | `text-core` | should-have, nice-to-have | decision | GitHub text import, journal/time-log import, inspector-web trace view, evidence-derived trust scoring, NERDm-style resource manifest adapter are all Should-Have (not blocking) | §Should-Have lists 5 items | keep should-have list as reference; do not elevate to Must-Have without explicit re-scoping | medium |
| 2026-04-24 | Scope Gate §Exit Criteria | Exit criteria for issue #4 | `text-core`, `project-board` | exit-criteria, definition-of-done | requirement | doc exists in repo, issue #4 links to it, follow-up TC-001–TC-007 issues are publishable, next branch can start TC-001 without rereading corpus | §Exit Criteria lists 4 criteria | verify all 4 exit criteria are met before closing issue #4 | high |

## Components And Technologies

- `packages/source-substrate` — source episode envelope, family classification
- `packages/ingress-refinery` — normalization, observation tiling, promotion state machine
- `packages/rosetta-canon` — chronology-aware fingerprinting
- `packages/canonical-cache` — dedupe, revision graph, cache persistence
- `packages/rosetta-core` — source/observation boundary
- `packages/rosetta-receipts` — transform receipts
- `packages/rosetta-schemas` — structured extract schemas
- `packages/rosetta-tapestry` — tapestry compiler v1
- `packages/rosetta-store` — rights-scoped retrieval, cache domains
- `packages/index-postgres` — future Postgres operational baseline
- `packages/index-pgvector` — future pgvector baseline
- `integrations/chat-import` — chat transcript importer
- `integrations/arxiv-import` — arXiv/paper text importer
- `future packages/english-accompaniment` — English accompaniment for promoted artifacts
- `future packages/rosetta-pipeline` — eventual pipeline orchestration

## Conceptual Claims

- Text-Core MVP is a real rung, not an infinite horizon — it has specific exit criteria
- Bootstrap proves provenance kernel works; Text-Core proves text-ingest spine works
- Minimum two-family threshold (chat + arXiv) provides structurally different input shapes
- Deterministic refinery + receipt-bound flow means any agent can replay the chain
- Rights-scoped retrieval must be enforced at boundary, not as a post-filter
- English accompaniment is required for promoted artifacts to be human-legible
- Postgres/pgvector baseline is a gate, not an aspiration — required before RC claims

## Dependencies And Sequencing

- Dependency chain: TC-001 → TC-002 → TC-003/TC-004 → TC-005 → TC-006/TC-007 → Text-Core Green
- TC-005 is the critical path (promotion state machine; both TC-003 and TC-004 must be green first)
- TC-006 and TC-007 are blocked until TC-005 is green
- TC-001/002/003/004 are already merged (per CURRENT_HANDOFF)
- Source-basis docs (Phased Backlog, Canonical Build Charter, Pasigraphy Protocol v3, OMOC Research Spec) should be extracted before treating this scope gate as fully validated

## Contradictions Or Supersession

- None currently identified — this is the governing scope gate doc
- Supersedes any prior backlog estimates that assumed a broader Text-Core scope

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| TC-005: Promotion state machine — critical path | implementation | `text-core`, `promotion-state-machine`, P1 | TC-003, TC-004 | Routing states must be explicit and replayable; ambiguous → pending-confirmation; blocked promotion emits refusal receipt |
| TC-006: Tapestry v1 + Rights retrieval + Postgres/pgvector split scope | implementation | `text-core`, `tapestry`, `storage`, P1 | TC-005 | TC-006 may need split into tapestry v1 plus rights retrieval/storage subtasks if implementation scope grows |
| TC-007: Chat + arXiv importers + English accompaniment | implementation | `text-core`, `importers`, `english-accompaniment`, P1 | TC-005 | Keep TC-007 to chat/arXiv plus English accompaniment; scope boundary matters |
| M10 gap: English accompaniment package contract undefined | requirement | `english-accompaniment`, `documentation`, `text-core` | TC-005 | No `packages/english-accompaniment` exists yet; acceptance criteria for M10 not formalized |
| M8 gap: Postgres/pgvector migration contracts not yet authored | storage | `postgres`, `pgvector`, `migration`, `text-core` | TC-005 | M8 requires migration contracts; current Bootstrap is SQLite — PostgreSQL canonical path undefined |
| Should-Have items lack implementation owners | backlog | `text-core`, `should-have` | none | GitHub text import, journal import, trust scoring, NERDm adapter all Should-Have with no owners assigned |

## Project Board Suggestions

- Area: Text-Core MVP
- Cycle: current sprint (TC-005 is critical path)
- Status: TC-001–TC-004 merged; TC-005 in progress; TC-006/TC-007 blocked
- Blocked by: TC-006/TC-007 blocked by TC-005; TC-005 blocked by TC-003 and TC-004
- Parallelization notes: TC-003 and TC-004 can proceed in parallel once TC-002 is merged; TC-006 and TC-007 are sequential post-TC-005

## Open Questions

- Does TC-006 scope need explicit split into tapestry v1 + rights retrieval + storage baseline?
- Are the four source-basis docs (Phased Backlog, Canonical Build Charter, Pasigraphy v3, OMOC Research Spec) fully extracted and cross-referenced?
- What is the PostgreSQL migration path from current Bootstrap SQLite to Postgres/pgvector canonical?
- Who owns the `packages/english-accompaniment` package contract?
