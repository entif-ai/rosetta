# Docs Intelligence Extraction — CHUNK 5/6

## Source

- Path: `~/.openclaw/workspace/Code/rosetta/docs/chats/20260426 - ChatGPT - Entif Memory Compiler.md`
- Title: ChatGPT — Entif Memory Compiler
- Date evidence: 2026-04-26
- Authority tier: primary-internal
- Freshness: high
- Word count: ~8,400 (full doc); this chunk ~4,800 words
- Extractor: subagent f0d25d77-5d99-49d5-8b53-fedfe2b2bd59
- Extraction date: 2026-04-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This chunk covers the storage architecture (relational/graph/vector/activation/cache stores), retrieval modes (passive/active), cognitive science separation (Ebbinghaus decay / ACT-R activation / Bayesian confidence), retention/pruning outcome taxonomy, multi-agent hive orchestration doctrine, idempotency/crash-survival patterns, adversarial eval lanes, dashboard projections, multi-tenancy enforcement, and the 20-kettle small-kettle build order with governing doctrine.

---

## Goals And Intent

- Clarify separation between recall metabolism (activation) and truth
- Establish retention/pruning as policy-plus-utility, not score-maximization
- Define multi-agent proposal/kernel/commit/receipt pattern
- Specify adversarial eval as first-class capability, not later garnish
- Ground build order in 20 scoped deliverable kettles

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Hebbian recall weights must not mutate truth | "Hebbian learning updates recall weights, not truth." | activation-memory | high | Critical safety constraint |
| Ebbinghaus decay, ACT-R activation, Bayesian confidence must be separate mechanisms | Three separate mechanisms with distinct semantics | memory-physics | high | Not one stew pot |
| Multi-agent mutation goes through kernel, not direct write | "Agent proposes -> Guard evaluates -> Kernel commits -> Receipt emitted -> Projections update" | hive-orchestration | high | Prevents everybody-scribbles-on-wall |
| All operations require idempotency_key | operation_id, idempotency_key, input_digest, expected_precondition_digest | idempotency | critical | Crash survival foundation |
| No tenantless data | "No tenantless data." | multi-tenancy | critical | Enforced at every layer |
| No retrieve-then-filter-later | "No 'retrieve everything then filter later.'" | retrieval-security | critical | Filter before retrieval |
| Cold storage is evidence preservation, not memory | "Cold storage is not memory. Cold storage is evidence preservation." | storage | high | Operational forget vs. legal preserve |
| Every deletion requires gravestone or receipt | "Every deletion has a gravestone or receipt." | retention | critical | No silent drop |
| Tenant-specific encryption keys for sensitive deployments | "Tenant-specific encryption keys for sensitive deployments" | multi-tenancy | medium | Enterprise/SaaS requirement |
| Dashboard projections over receipts/tiles, not independent truth stores | "Dashboards should be built as projections over receipts and tiles, not independent truth stores" | dashboard | medium | Ensures auditability |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Storage architecture | storage, architecture, seven-stores | storage layers | technology | Seven-layer storage architecture: (1) raw CAS, (2) canonical tiles, (3) relational/index (SQLite then Postgres JSONB), (4) graph store, (5) vector/embedding, (6) activation memory (Hebbian/ACT-R), (7) projection/cache | "For v0, this can still be tiny: CAS plus SQLite first; Postgres plus pgvector by the RC; graph and temporal/distributed layers as sidecars later." | Align Rosetta storage schema to this layer map; ensure CID-based addressing covers all layers | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Passive retrieval flow | retrieval, passive, policy | retrieval semantics | requirement | Passive retrieval follows: intent -> policy scope -> candidate sources -> ranking -> context bundle -> receipt, with mandatory explainability fields (why retrieved, policy allowed, exclusions, staleness, uncertainty, sensitivity) | "Why did I retrieve this? / What evidence supports it? / What policy allowed it? / What was excluded? / What is stale? / What is uncertain? / What was too sensitive to include?" | Implement explainability receipt fields for all retrieval ops | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Active retrieval wake-assemble-suggest-route | retrieval, active, event-driven | retrieval semantics | requirement | Active retrieval is wake-assemble-suggest-route, not autonomous execution. Triggers: contradiction detected, high-urgency task due, watched topic new evidence, gravestone invalidates summary, regulatory tag blocks export, project enters implementation, agent encounters known successful method | "Active retrieval should not mean autonomous execution. It should mean wake, assemble, suggest, and route." | Define active trigger taxonomy with event types | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | ACT-R activation is recall metabolism, not truth | activation-memory, truth-fp | memory physics | contradiction | ACT-R base-level activation gives recency/frequency/usefulness-based accessibility; unused memories decay into compaction/pruning candidates. CRITICAL: activation updates recall weights, NOT truth. System must not learn association as truth. | "Hebbian learning updates recall weights, not truth." / "If two bad claims are retrieved together often, the system may learn they are associated. It must not learn they are true." | Separate activation store from canonical store; add validation gate that blocks activation -> truth mutation | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Three separate cognitive mechanisms | memory-physics, decay, activation, confidence | cognitive science | requirement | Ebbinghaus decay (time-based recall fade), ACT-R activation (retrievability given recency/frequency/usefulness), Bayesian confidence (belief revision given new evidence) must be three distinct mechanisms with distinct outputs. | "Do not put these in one stew pot." | Design three separate data structures and update paths; do not conflate | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Confidence/truth separation examples | confidence, truth, recall | epistemology | requirement | Examples showing separation: (1) low recall + high confidence = proven lemma unused recently; (2) high recall + low confidence = alchemist gold pitch from broke kingdom; (3) high confidence + high decay = API endpoint in old version; (4) low truth-value + high historical value = failed architecture assumption explaining later design | JSON activation/decay/confidence object example | Encode these as canonical memory object fields | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Retention outcome taxonomy | retention, pruning, lifecycle | persistence | requirement | Ten retention outcomes: preserve_full, preserve_raw_cold_only, preserve_summary_plus_source, preserve_digest_plus_gravestone, redact_sensitive_fields, remove_from_hot_retrieval, remove_from_vector_index, recompute_without_source, delete_when_lawfully_permitted, seal_under_legal_hold | "A retention/pruning planner should classify each object into one of these outcomes" | Implement retention classifier as policy-driven planner | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Persistence policy factors | persistence, policy, utility | persistence | requirement | Persistence = policy + utility + reversibility + evidence burden. Factors: legal minimum/maximum retention, user preference, contractual tenant policy, evidence value, operational usefulness, source uniqueness, reconstruction cost, sensitivity, harm risk, storage cost, derivative dependencies | "Persistence should not be 'keep the highest score.' It should be policy plus utility plus reversibility plus evidence burden." | Build multi-factor retention scorer, not single score | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Cold storage = evidence preservation, not memory | cold-storage, evidence, memory-fp | storage | requirement | "Cold storage is not memory. Cold storage is evidence preservation." System can forget operationally while preserving lawful audit in glacier-tier. | "The system can 'forget' operationally while still preserving lawful audit material in glacier-tier storage." | Distinguish operational forget (pruning) from legal preserve (cold archive) at architecture level | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Multi-agent: agents own proposals and receipts, not truth | hive-orchestration, multi-agent, truth-ownership | agent architecture | requirement | Two laws: (1) Agents do not own truth — they own proposals and receipts; (2) Swarm exchange is delta capsules, not memory telepathy. Delta capsule contains: source evidence, scope, tenant eligibility, confidence, policy tags, tests, promotion status, rollback path. | "Agents do not own truth. They own proposals and receipts." / "Swarm exchange is delta capsules, not memory telepathy." | Implement proposal/receipt pattern; block direct canonical mutation by agents | critical |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Agent propose -> Guard -> Kernel -> Receipt -> Projections | hive-orchestration, kernel, guard | agent architecture | decision | Proposed pattern: Agent proposes -> Guard evaluates -> Kernel commits -> Receipt emitted -> Projections update | "Agent proposes -> Guard evaluates -> Kernel commits -> Receipt emitted -> Projections update" | Implement kernel commit as single canonical write path | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Transactional outbox pattern | idempotency, outbox, crash-survival | reliability | requirement | Pattern: (1) write mutation + event to local durable storage in one transaction; (2) publish event to bus; (3) consumers process idempotently; (4) receipts mark committed/skipped/failed/retried/compensated/dead-lettered | Every operation needs: operation_id, idempotency_key, input_digest, expected_precondition_digest, output_digest, status, attempt_count, receipt_id, replay_class, side_effect_class | Implement transactional outbox for all write operations | critical |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | RPO/RTO/MTTR/MTD targets per layer | durability, RPO, RTO, recovery | reliability | requirement | Set per layer: Receipts ledger near-zero RPO; raw accepted artifacts near-zero RPO after accepted upload; canonical tiles near-zero RPO; queue state near-zero or replayable; embeddings regenerable (higher RPO acceptable); dashboards regenerable; caches disposable; agent scratchpads disposable unless promoted; cold archive high durability/low retrieval speed | "For Entif, I'd set different durability targets per layer" | Define per-layer RPO/RTO targets in architecture doc | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | NIST contingency planning reference | NIST, contingency-planning, standards | compliance | technology | NIST SP 800-34 provides guidance for contingency planning, business impact analysis, resource recovery requirements, and recovery priorities | csrc.nist.gov reference | Align Entif contingency planning with NIST SP 800-34 | medium |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | CloudEvents + OpenTelemetry standards | CloudEvents, OpenTelemetry, standards | integration | technology | Message buses/im event specs should use CloudEvents (CNCF spec for event data) and OpenTelemetry semantic conventions (common names for operations/data across traces/metrics/logs/profiles/resources) | "Your standards map already points toward AsyncAPI, CloudEvents, OpenTelemetry semantic conventions" | Use CloudEvents + OTel for all event envelopes | medium |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Minimum adversarial eval lanes | adversarial-eval, security, eval | security | requirement | Minimum eight eval lanes: (1) prompt-injection (hostile docs/transcripts/web/Skill files/agent configs), (2) cross-tenant leakage, (3) retention/erasure (gravestone + prove derivatives deleted/redacted/invalidated), (4) staleness (stale claims demoted, not surfaced as current), (5) confidence (low-trust/high-value routes to verification not canon), (6) replay/idempotency (crash midway, no duplicate side effects), (7) swarm (malicious/low-quality proposals blocked), (8) dashboard audit (missing receipts, broken provenance, policy exceptions) | "Minimum eval lanes" list | Implement all eight lanes as conformance tests | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Dashboard = projection, not truth store | dashboard, projection, audit | visualization | requirement | "Dashboards should be built as projections over receipts and tiles, not independent truth stores." Dashboard views: run trace waterfall, provenance graph, retention/legal-hold queue, gravestone impact graph, memory heatmap (immediate/hot/warm/cool/cold/glacier), activation graph (why surfaced), claim confidence board, contradiction/supersession queue, tenant boundary audit, cost/token/cache, agent proposal review queue, DR posture, compliance posture | "Dashboards should be built as projections over receipts and tiles, not independent truth stores." | All dashboard data must be derived from receipts/tiles; no shadow truth stores | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | API endpoints for dashboard data | dashboard-api, export, audit | API | technology | Embeddable/exportable components via stable APIs: GET /v1/runs/:id/trace, GET /v1/tiles/:cid/provenance, GET /v1/claims/:id/confidence, GET /v1/retention/queue, GET /v1/dashboard/memory-heatmap, POST /v1/exports/audit-bundle | API endpoint list | Implement these API endpoints | medium |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Export formats: JSON, Markdown, CSV, Mermaid, PDF | export-formats, JSON, Markdown, CSV, Mermaid, PDF | export | requirement | "Exports should support JSON first, Markdown second, CSV for tabular views, Mermaid for graphs, and eventually PDF bundles for audit packets." | Prioritize JSON and Markdown; CSV for tables; Mermaid for graphs; PDF for compliance | medium |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Multi-tenancy enforcement rules | multi-tenancy, tenant-boundary, enforcement | multi-tenancy | requirement | Seven rules: no tenantless data, no retrieval before tenant filtering, no retrieve-then-filter-later, no shared cache unless authorization-compatible, no shared embeddings unless policy allows derived semantic leakage, tenant-specific encryption keys, tenant-specific retention/raw vault/audit exports/model-routing | "No tenantless data." / "No 'retrieve everything then filter later.'" | Enforce all seven rules in storage, retrieval, cache, queue, receipt layers | critical |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Integration strategy: boring on purpose | integration, OpenAPI, AsyncAPI, CloudEvents, MCP, OTel | integration | decision | "The integration strategy should be boring on purpose: OpenAPI for sync APIs, AsyncAPI for event contracts, CloudEvents for envelopes, MCP for tool invocation, OpenTelemetry for traces/metrics/logs, Policy packs for rights/compliance, Connector adapters" | Follow existing standards rather than inventing new ones | medium |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | 20-kettle build order | build-order, kettle, incremental | build | requirement | 20 kettles (scoped 4-hour-or-less deliverables): (1) GovernanceEnvelope schema, (2) RightsScope v0, (3) RetentionPolicy v0, (4) GravestoneTile v0, (5) RawArtifactVault v0, (6) Dependency graph v0, (7) Idempotency key v0, (8) Receipt ledger v0, (9) Hot/warm/cool/cold tiers v0, (10) Passive retrieval v0, (11) Active trigger v0, (12) Activation memory v0, (13) Bayesian confidence stub, (14) Ebbinghaus/decay stub, (15) Policy pack loader v0, (16) Message outbox v0, (17) Dashboard read API v0, (18) Inspector dashboard v0, (19) Adversarial eval v0, (20) API/event standards v0 | "Here is the practical ordering. Each one should be doable as a four-hour-or-less deliverable if scoped ruthlessly." | Use this as incremental delivery roadmap; each kettle is testable | high |
| 2026-04-26 | …/20260426-…-Memory-Compiler.md | Governing doctrine 13 laws | doctrine, memory-law, governance | governance | decision | 13 laws: (1) Every artifact has rights; (2) every interpretation has provenance; (3) every memory has a lifecycle; (4) every retrieval has a reason; (5) every mutation has an idempotency key; (6) every side effect has a guard decision; (7) every deletion has a gravestone or receipt; (8) every tenant boundary enforced before retrieval; (9) every cache authorization-aware; (10) every agent proposes, kernel disposes; (11) every dashboard is a projection; (12) every derived truth can be invalidated by ancestors; (13) every cold artifact may be forgotten operationally but preserved evidentially | "The doctrine I'd lock in" — 13 laws | Codify as architecture-level doctrine doc; cross-reference all 13 in implementation | high |

---

## Components And Technologies

- SQLite (v0), Postgres JSONB + pgvector (RC+), graph store (sidecar), temporal/distributed layers (sidecar)
- CloudEvents (CNCF), OpenTelemetry semantic conventions, AsyncAPI, OpenAPI, PROV, MCP
- ACT-R base-level activation, Hebbian weights, Ebbinghaus forgetting curves
- Transactional outbox pattern, event bus, dead-letter queue (DLQ)
- NIST SP 800-34 contingency planning
- Content-addressable storage (CAS) for raw artifacts

---

## Conceptual Claims

- Activation (recency/frequency/association) is recall metabolism, not truth — must never be conflated with confidence or canonical state
- Cold storage = evidence preservation ≠ operational memory
- Multi-agent truth ownership: agents own proposals and receipts; kernel owns canonical commit
- All operations idempotent; crash survival via transactional outbox + receipt ledger
- Dashboard = projection over receipts/tiles; not independent truth store
- Tenant boundary enforcement before retrieval (no retrieve-then-filter)
- Retention = policy + utility + reversibility + evidence burden; not highest-score keep
- Ebbinghaus decay, ACT-R activation, Bayesian confidence are three distinct mechanisms

---

## Dependencies And Sequencing

- Kettle 1 (GovernanceEnvelope) must precede all other kettles (schema foundation)
- Kettle 2 (RightsScope) requires Kettle 1 envelope schema
- Kettle 6 (Dependency graph) requires Kettle 4 (GravestoneTile)
- Kettle 7 (Idempotency key) requires Kettle 6 (Dependency graph) for rollback paths
- Kettle 8 (Receipt ledger) requires Kettle 7 idempotency
- Kettle 16 (Message outbox) requires Kettle 8 receipt ledger
- Kettle 18 (Inspector dashboard) requires Kettle 17 API + Kettle 8 receipts
- Kettle 19 (Adversarial eval) requires most upstream kettles

---

## Contradictions Or Supersession

- Confirms/consolidates `20260410 - Entif and Rosetta PRDs - ChatGPT - Consolidated Blueprint.md` storage staging plan (SQLite first, Postgres+pgvector by RC, graph/temporal as sidecars)
- Confirms `20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` hot/warm/cool/cold tiering and ACT-R activation pattern
- Supersedes generic "memory" notion with precise seven-store architecture

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
|---|---|---|---|---|
| `[mc-chunk5]` Separate activation store from canonical truth store | architecture | storage, activation-memory, truth-fp | Kettle 1-3 | "Hebbian learning updates recall weights, not truth" — system must not learn association as truth |
| `[mc-chunk5]` Implement 20-kettle build order as incremental delivery roadmap | process | build-order, incremental-delivery | Kettle 1 (governance envelope) | 20 scoped ~4-hour deliverables; each testable independently |
| `[mc-chunk5]` Tenant boundary enforcement before retrieval — no retrieve-then-filter | security | multi-tenancy, retrieval-security | Kettle 2 (RightsScope) | "No 'retrieve everything then filter later'" — filter before retrieval |
| `[mc-chunk5]` Implement transactional outbox for all write operations | reliability | idempotency, crash-survival, outbox | Kettle 7-8 | Every operation needs idempotency_key; outbox pattern for crash survival |
| `[mc-chunk5]` Dashboard must be projection, not independent truth store | dashboard | dashboard, receipts, projection | Kettle 17-18 | "Dashboards should be built as projections over receipts and tiles, not independent truth stores" |
| `[mc-chunk5]` Implement eight adversarial eval lanes as conformance tests | security | adversarial-eval, testing | Kettle 19 | Minimum eight lanes: prompt-injection, cross-tenant, retention/erasure, staleness, confidence, replay/idempotency, swarm, dashboard audit |

---

## Project Board Suggestions

- Area: Rosetta / Entif Memory Compiler / Architecture
- Cycle: 2026-Q2
- Status: chunk-5-of-6 extraction complete; remaining chunk covers final 36 lines
- Blocked by: none for extraction; build requires Kettle 1 governance envelope first
- Parallelization notes: The 20-kettle order is naturally sequential for foundation layers but Kettles 10-15 (retrieval, activation, confidence, decay, policy, outbox) can be parallelized after Kettle 9 storage tiers

---

## Open Questions

- The Temporal Kinematics Layer concept mentioned in the task description does not appear explicitly in this chunk — is it covered in an earlier chunk or in a different source document?
- Volatility class, consensus stability, consequence class, revision likelihood/urgency, prunability, revisit policy — these terms from the task description are not present in this chunk. May appear in a later chunk or prior document.
- Milk label/passport/leash/tripwire model — not present in this chunk. May appear in other Entif/Rosetta documents.
- Invalidation graph — partially referenced via "derived_from" and "gravestone impact graph" but full model not detailed here.
- Kettle 14 (Ebbinghaus/decay stub) references revisit scheduling but does not define revisit policy in detail.
- Confidence calibration methodology (Bayesian update mechanics) not specified beyond stub fields.

---

*Extraction complete for CHUNK 5/6. Output written to `2026-04-26-entif-memory-compiler-CHUNK_5.md`.*