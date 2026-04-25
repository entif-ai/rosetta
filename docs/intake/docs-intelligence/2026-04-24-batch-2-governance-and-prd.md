# Batch 2: Governance + PRD Extraction

## Source

- Path: `docs/intake/docs-intelligence/2026-04-24-batch-2-governance-and-prd.md`
- Title: Batch 2: Governance + PRD (NOT LAME)
- Date evidence: 2026-04-24 (extraction)
- Authority tier: governance + PRD (Tier 1)
- Freshness: current
- Word count: ~8,200 across 3 docs
- Extractor: Emilie (OpenClaw docs-intelligence agent)
- Extraction date: 2026-04-24

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source documents have been ingested into Rosetta's future semantic corpus.

---

## Summary

Governance docs establish repo shape constraints and service inventory as explicit definitions. The NOT LAME PRD is the most substantial document encountered so far: a full product specification for a sovereign agent system with five memory layers, PostgreSQL as canonical registry (SQLite as local shadow), LangGraph as workflow layer, and explicit threat model covering prompt injection, skill supply-chain compromise, split-brain state, replay side effects, tenant bleed, and desktop privilege escalation. Key recommendation: build the sovereign kernel first, use LangGraph for workflow, keep multi-layer memory design, and make every connector/harness/imported skill constitutionally subordinate to receipts, provenance, tenancy, and write admission.

---

## Goals And Intent

- Extract repo shape constraints and service inventory definitions
- Extract full PRD requirements for the NOT LAME system
- Build requirement matrix, threat model, architecture recommendations
- Identify issue candidates and cross-references to existing Rosetta/Text-Core work

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24T20:50 | `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md` | Shape | `governance` | repo structure | `decision` | Explicit folder contract: `apps/` (cli/api/operator), `packages/` (kernel + source + intake), `packs/` (rrp, stdpack, vocabpack), `docs/` | "Use Nx CLI and official Nx plugins" | no action | high |
| 2026-04-24T20:50 | `docs/governance/REPO_SHAPE_AND_CONSTRAINTS.md` | Constraints | `governance` | architectural constraints | `decision` | Five explicit constraints: Nx workspace, no donor tarball import, parse-only until canonical cache is active, separate modeled layers for source/record/manifestation/package/acquisition/identity/rights/lifecycle/evaluation, OB1/Prism/Mission Control read-only | "Preserve parse-only ingress until the canonical cache is the active source of truth" | no action | high |
| 2026-04-24T20:50 | `docs/governance/SERVICE_INVENTORY.md` | Apps | `governance` | app surfaces | `decision` | Three apps defined: rosetta-cli (bootstrap demo), rosetta-api (health/registry/demo), rosetta-operator (future) | "rosetta-operator — Reserved for future operator-shell evaluation" | no action | high |
| 2026-04-24T20:50 | `docs/governance/SERVICE_INVENTORY.md` | Packages | `governance` | package inventory | `decision` | 14 packages defined across kernel/source/intake/projection layers | Service inventory is authoritative package list | no action | high |
| 2026-04-24T20:50 | `docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md` | Executive Summary | `governance`, `memory` | sovereign kernel, memory layers, postgres vs sqlite | `decision` | **Sovereign kernel + workflow fabric** not harness-centered agent stack. Five memory layers under one governor: constitutional docs, artifact/source store, semantic recall, temporal graph, adaptive/prioritized. PostgreSQL as canonical registry (not SQLite). SQLite as edge cache/local shadow only. | "SQLite should be an edge cache, local shadow, or offline retrieval substrate, not the cross-device canonical registry" | create issue: postgres-first architecture decision | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Product Framing / Rosetta v3 Conventions | `governance` | typed spine, receipts-first, guard-enforced writes | `decision` | PRD explicitly adopts Rosetta conventions: Run→Action→ToolCall→Observation→Evaluation→Receipt, receipts-first, deny-by-default guarded execution, bounded compiled context bundles, pack/forge subsystems | "This PRD uses the Rosetta conventions already surfaced in prior project materials" | align with existing Rosetta docs | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Goals table | `governance` | 8 product goals | `requirement` | 8 goals: sovereign control, multi-layer memory, provenance-first cognition, durable orchestration, safe skill portability, local privileged automation, multi-device operability, autonomous improvement | Table has explicit metrics for each goal | map to Rosetta/Entif implementation issues | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Non-Goals table | `governance` | 6 non-goals | `decision` | No fully autonomous constitutional rewriting, no active-active multi-master canonical writes, no unscreened skill execution, no harness-led memory authority, no arbitrary desktop control without step-up, no universal memory god database | "No third-party harness may own canonical memory or policy" | no action; governing constraints | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Success Metrics table | `governance` | 10 measurable metrics | `requirement` | Metrics include: 0 unauthorized writes, 100% receipt coverage, 100% crash recovery, no silent gaps >1 interval, 100% provenance completeness, 100% adapter cert pass, ≥0.80 retrieval precision, 0 duplicate YouTube ingest, 0 desktop destructive ops without approval, <1 context budget violation per 100 runs | "These metrics are shaped by the concrete failures already documented" | use as acceptance criteria for implementation issues | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Assumptions table | `governance` | 8 assumptions | `decision` | Cloud provider unspecified, auth unspecified, user counts unspecified, latency targets provisional, embedding models unspecified, exact repo snapshot not enumerated, public distribution desired | "Keep control plane provider-neutral" | track as open questions | medium |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Recommended Topology | `governance`, `storage` | node types, authority map, hybrid topology | `decision` | Four node types: sovereign (high authority, Mac Studio), relay (low, cloud), worker (none over canonical, cloud/local), follower (limited, other devices). PostgreSQL as canonical registry. SQLite as local shadow only. | "Public ingress need not imply public authority" | align with storage law in Charter | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Connector Requirements table | `governance` | Telegram/Slack/Discord/Browser/Mac requirements | `requirement` | Telegram: HTTPS Bot API, webhooks for cloud relay, optional local Bot API server. Slack: Events API for public distribution (NOT Socket Mode). Discord: Interactions-first, Gateway only if message stream required. Browser: Playwright with isolated BrowserContexts per run. Mac: Shortcuts → Apple Events → Accessibility (safest order) | "Slack's docs say Socket Mode apps are not currently allowed in the public Slack Marketplace" | align with OpenClaw Telegram setup; create connector issues | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Memory Sovereignty Map | `governance`, `memory` | 5 memory layers with authority claims | `decision` | Constitutional (doctrine/policy, Git-backed), Artifact store (source bytes/text, object/file + Postgres), Vector (candidate retrieval, nothing authoritative, pgvector first), Temporal graph (modeled relations, Postgres graph tables), Adaptive (priority/ranking heuristics, Postgres + scheduled scoring), Local lexical (fast on-device fallback, SQLite FTS5) | "The point is not to simplify the ontology; it is to make each layer keep to one job and one truth claim" | align with Rosetta memory planes; this maps cleanly to Plane 1/2/3 | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Design Alternatives | `governance`, `storage` | PostgreSQL vs SQLite, pgvector vs Qdrant | `decision` | PostgreSQL recommended as canonical (RLS, logical replication, ACID); SQLite as local shadow only. pgvector recommended starting point; Qdrant when vector scale justifies it. | Table with explicit tradeoffs | no action; already aligned with Rosetta storage law | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Entity Relationship Model | `governance` | ER diagram for canonical schema | `technology` | WORKSPACE/SOURCE/ARTIFACT/ARTIFACT_VERSION/CHUNK/SPAN/RUN/ACTION/TOOL_CALL/OBSERVATION/EVALUATION/RECEIPT/DERIVED_RECORD/PROJECTION/SKILLPACK/CERTIFICATION_RUN entities | mermaid ER diagram in source | map to Rosetta schemas and existing package inventory | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Threat Model table | `governance` | 14 threat categories | `risk` | Prompt injection, skill supply-chain compromise, split-brain state, replay side effects, tenant bleed, Slack/Discord/Telegram request forgery, browser credential leakage, desktop privilege escalation, hallucinated promotion, silent operational failure | "This threat model is deliberately tied to the observed failure history" | create security/implementation issues from threat model | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Identity and Provenance Model | `governance` | UUIDv7 logical IDs, content proofs via digests | `decision` | Logical IDs: art_\<uuidv7\>, avr_, chk_, spn_, run_, act_, tc_, obs_, evl_, rcp_. Every derived item must carry supporting_span_ids or supporting_receipt_ids. | "A projection without a reversible line back to source spans is not promotable" | align with Rosetta CID/CID-based identity scheme | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Write-Admission Gate Design | `governance` | 9-step state machine for durable mutations | `requirement` | Propose → Normalize → Authorize → Ground → Checkpoint → Apply → Observe → Receipt → Project | "Any missing policy, missing provenance, or stale/ambiguous target must fail closed" | create implementation issue for write gate | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Context Compiler Specification | `governance` | bounded context bundles by role/risk | `requirement` | Bundle segments: task spec (600/900 tokens), constitutional constraints (800/1200), primary evidence (3000/10000), memory recall (1200/3000), tool policy (500/800), open questions (300/600) | "The compiler should emit bounded context bundles by role and risk class, not one giant monologue" | create issue for context compiler | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Query Router Rules table | `governance` | 7 query intent routing rules | `decision` | Doctrine → constitutional docs; source verification → artifact + spans; fuzzy recall → vector + FTS5 fallback; temporal → events + graph; relationship → graph → chunks; priority → adaptive + receipts; uploaded-doc → artifact + FTS/vector | "One governor that knows which memory layer is relevant for which question" | align with memory planes | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Certification Harness for Adapters and Skills | `governance` | 8 test classes for adapter certification | `requirement` | Ingest, retrieval, tagging, scoring, round-trip provenance, replay safety, policy compliance, timeout/health | "Broken adapters must not be 'helpfully' enabled" | create certification harness issue | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Skillpack Importer and Quarantine Flow | `governance` | skill import state machine | `requirement` | Src → Imp → Ana (static analysis) → Sand (sandbox dry-run) → Cert (harness tests) → Pol (trust tier request) → Reg (promote or quarantine) | "No imported skill should ever gain direct writes, unrestricted network, or unrestricted filesystem access on first import" | create skillpack importer issue | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Desktop and Browser Guardrails | `governance` | isolation/tracing/approval requirements | `decision` | Browser: context-per-run isolation, trace on risky flows, redaction, domain allowlists. Desktop: app allowlist, operator-visible mode, session recording, destructive-op step-up, kill switch. LangGraph interrupt for approval flows. | "LangGraph's interrupt model is a good fit here" | align with OpenClaw browser control | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | LangChain and LangGraph Integration | `governance` | orchestration layer contract | `decision` | LangGraph in workflow plane (never constitutional). LangChain for structured output/tool abstraction/model invocation. Adapters own narrow execution. Constitutional kernel owns receipts/write gate/policy/provenance/memory routing/certification/context compilation. | "LangGraph should sit in the workflow plane, never in the constitutional plane" | no action; aligns with Rosetta philosophy | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Model Role Taxonomy table | `governance` | 5 model roles with allowed/forbidden tasks | `decision` | Constitutional engineer (schema/migration/router/guard/review), Planner/reviewer (decompose/evaluate/write tests), Bounded worker (extract/classify/tag/summarize), Projection worker (embeddings/reranking/graph/salience), Connector responder (prepare payloads/drafts/safe actions) | Table defines role boundaries clearly | create implementation issues per role | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Sample Data Schema | `governance`, `storage` | full PostgreSQL schema with 12 tables | `technology` | workspaces, artifacts, artifact_versions, chunks, derived_records, derived_record_support, runs, actions, tool_calls, events, projections, receipts | "This relational schema is aligned to PostgreSQL's strengths" | map to Rosetta schemas; align with existing package structure | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Example JSON Receipt | `governance` | full receipt structure | `decision` | Receipt with receipt_id, workspace_id, run/action/tool_call IDs, actor, policy, input with context_bundle_id and supporting_span_ids, tool, observation with artifact_version_ids, evaluation, write with before/after digests, status | "Every run/action/tool/wire rejection emits a receipt" | aligns with existing Rosetta receipt schema | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | API Contracts table | `governance` | 12 API endpoints with purpose and enforcement | `requirement` | POST /v1/runs, /v1/context/compile, /v1/actions/propose, /v1/toolcalls/execute, /v1/writes/commit, /v1/query, /v1/ingest/artifacts, /v1/skillpacks/import, /v1/skillpacks/{id}/promote, GET /v1/receipts/{id}, POST /v1/replay/runs/{id} | "LangGraph nodes call the kernel APIs rather than writing state directly" | create API surface issue | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Core Run Lifecycle | `governance` | sequence diagram for sovereign kernel + LangGraph | `decision` | Trigger → LangGraph → Sovereign Kernel → Memory Router → Tool Adapter → Receipt Ledger → back to LangGraph → Trigger | "The flow above directly encodes the Rosetta spine" | no action; aligns with Rosetta architecture | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Migration Plan | `governance` | phased migration from OpenClaw/Hermes | `decision` | Phase 1: evidence salvage, Phase 2: kernel bootstrap, Phase 3: artifact/doctrine import, Phase 4: lexical/semantic retrieval, Phase 5: temporal graph + adaptive, Phase 6: connectors + tools, Phase 7: skillpack importer, Phase 8: public packaging | "OpenClaw/Hermes become evidence sources only" | track; this is the migration strategy | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Implementation Roadmap | `governance` | 19-ticket roadmap with priority/effort/acceptance | `requirement` | P0 tickets: monorepo bootstrap, Postgres schema/migrations, receipts/write gate, artifact ingestion service, YouTube dedupe, context compiler, query router, LangGraph integration, skillpack importer, certification harness, observability/alerts/replay. P1: SQLite FTS5, pgvector, temporal graph, adaptive memory, connector adapters, Playwright, Mac desktop, LangChain structured output. | "These are planning estimates only because exact staffing, existing infra, and repo maturity are unspecified" | map to existing Rosetta/Text-Core issues; create new implementation issues | high |
| 2026-04-24T20:50 | `docs/PRDs/...NOT LAME PRD.md` | Prioritized Source List | `governance` | internal + external references | `technology` | Internal: Rosetta architecture notes, OpenClaw/Hermes failure inventories. External: LangGraph/LangChain/Playwright/Apple/Slack/Discord/Telegram/PostgreSQL/SQLite/pgvector/Qdrant official docs. | "The bottom-line product decision is simple" | track for implementation reference | medium |

---

## Components And Technologies

- **Canonical registry:** PostgreSQL with pgcrypto, RLS, logical replication — NOT SQLite as canonical
- **Local shadow:** SQLite with FTS5 (BM25 ranking, snippets, highlighting)
- **Vector store:** pgvector first; Qdrant when scale justifies
- **Orchestration:** LangGraph (workflow plane, not constitutional); LangChain (structured output, tool abstraction)
- **Browser:** Playwright with isolated BrowserContexts per run, trace capture
- **Desktop:** Shortcuts → Apple Events → Accessibility ladder; step-up approval for destructive ops
- **Memory layers:** Constitutional (Git), Artifact (object/file + Postgres), Vector (pgvector), Temporal (Postgres graph tables), Adaptive (Postgres + scheduled scoring), Local lexical (SQLite FTS5)

---

## Conceptual Claims

- Sovereign kernel owns receipts, write gate, policy, provenance, memory routing, adapter certification, context compilation — LangGraph is a workflow layer, not a constitutional authority
- PostgreSQL as canonical registry with RLS default-deny; SQLite only as local edge cache/shadow
- Every durable mutation follows Propose → Normalize → Authorize → Ground → Checkpoint → Apply → Observe → Receipt → Project state machine, fail-closed on any missing policy/provenance
- Context compiler emits bounded bundles by role and risk class, not unbounded prompt floods
- Memory sovereignty map: each layer keeps one job and one truth claim; no "universal memory god" database
- Skillpack importer: parse → normalize → quarantine → certify → promote flow; no imported skill gets direct writes on first import
- Certification harness required before any adapter or skillpack promotion

---

## Dependencies And Sequencing

- NOT LAME PRD is the governing product spec for Entif; Rosetta is the provenance kernel layer underneath it
- Migration from OpenClaw/Hermes proceeds in 8 phases, starting with evidence salvage
- LangGraph integration is P0 but must never write canonical state directly
- All connector adapters must pass certification harness before promotion
- Write-admission gate is the "constitutional heart of the system"

---

## Contradictions Or Supersession

- NOT LAME PRD references "forge-like subsystems" for files/authorization/metadata/archiving/versioning — Rosetta docs use "pack" terminology; these are the same concept, different naming
- NOT LAME PRD assumes PostgreSQL as canonical; Rosetta Bootstrap currently uses local CAS + SQLite — the migration path from SQLite-first to PostgreSQL-first needs explicit tracking

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| NOT LAME: Write-Admission Gate implementation | implementation | `governance`, `kernel` | None | 9-step state machine, fail-closed posture, receipts for every durable mutation |
| NOT LAME: Context Compiler and Query Router | implementation | `governance`, `kernel` | Write gate | Bounded context bundles by role/risk class, 7-intent query routing |
| NOT LAME: PostgreSQL Schema and Migrations | implementation | `storage`, `postgres` | Write gate | 12-table canonical schema, RLS, migrations reversible |
| NOT LAME: Skillpack Importer and Quarantine | implementation | `governance`, `skills` | None | Parse → normalize → quarantine → certify → promote flow |
| NOT LAME: Adapter Certification Harness | implementation | `governance`, `testing` | None | 8 test classes: ingest, retrieval, tagging, scoring, provenance, replay, policy, timeout |
| NOT LAME: Memory Sovereignty Map implementation | implementation | `memory`, `storage` | Schema + write gate | 5-layer map with authority claims; align with Rosetta memory planes |
| NOT LAME: LangGraph Integration | implementation | `orchestration`, `langgraph` | Write gate + context compiler | Workflow plane, not constitutional; nodes call kernel APIs |
| NOT LAME: Connector Adapters (Telegram/Slack/Discord) | implementation | `integrations` | Certification harness | Signature verification, webhook deadlines, platform-native security |
| NOT LAME: Playwright Browser Adapter | implementation | `browser`, `integrations` | Certification harness | Context-per-run isolation, trace capture, auth-state segregation |
| NOT LAME: Mac Desktop Adapter | implementation | `desktop`, `integrations` | Certification harness | Shortcuts → Apple Events → Accessibility ladder, step-up approval |
| NOT LAME: Migration from OpenClaw/Hermes | implementation | `migration` | Kernel bootstrap + connectors | 8-phase plan; legacy systems become evidence sources only |
| Clarify Rosetta Bootstrap storage migration path | issue-candidate | `storage`, `postgres` | TC-006 (Postgres/pgvector) | Current Bootstrap uses SQLite; NOT LAME specifies PostgreSQL as canonical; gap needs explicit resolution |

---

## Project Board Suggestions

- **Area:** `governance`, `memory`, `storage`, `kernel`, `orchestration`, `integrations`
- **Cycle:** discovery → bootstrap (complete) → text-core (active) → not-lame (in PRD)
- **Status:** NOT LAME PRD is Tier 1 governing document; implementation issues should be created from roadmap table
- **Blocked by:** NOT LAME implementation depends on Text-Core MVP being green first
- **Parallelization notes:** Governance docs (REPO_SHAPE, SERVICE_INVENTORY) can be processed immediately; NOT LAME PRD implies a full product layer above Rosetta; Rosetta + Text-Core MVP must come first

---

## Open Questions

- How does the SQLite-first Bootstrap path migrate to PostgreSQL as canonical? TC-006 covers Postgres/pgvector baseline — does that implicitly handle the migration?
- NOT LAME PRD references 19 implementation tickets; should these become GitHub issues against the rosetta repo, or a separate entif-ai/not-lame repo?
- The memory sovereignty map (5 layers) maps to Rosetta's 3 memory planes — is this a superset expansion or a different framing of the same concept?