# Docs Intelligence Extraction

## Source

- **Path:** `docs/PRDs/20260426 - Entif - PRD - Context CLI and Memory Services.md`
- **Title:** Entif SDK CLI and Service Platform PRD
- **Date evidence:** 2026-04-26 (filename prefix); references to RFC 8785, OpenAPI 3.1.1, AsyncAPI 3.1.0 as current standards
- **Authority tier:** governing / architectural
- **Freshness:** current (2026-04-26)
- **Word count:** ~6,800 (389 lines × ~17 words/line estimated)
- **Extractor:** subagent B1
- **Extraction date:** 2026-04-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This PRD defines Entif as a receipt-bound, source-aware, rights-scoped cognitive operating layer above Rosetta's constitutional substrate. It specifies datasource ingestion, memory operations, context compilation, retrieval/correlation, operator inspection, and policy-governed agent orchestration. The document is the primary architectural authority for the Entif SDK (TypeScript-first), CLI (summary/explain/audit modes), service APIs (OpenAPI + AsyncAPI dual contracts), three memory planes (truth/provenance, temporal, activation), canonical artifact families (source envelope, assimilation packet, compiled context bundle), multi-axis evaluation vectors, guardrails, and a five-phase delivery order. Key non-goals eliminate mutable memory blobs, autonomous side-effects, post-hoc authorization, vendor-locked prompt wrappers, pure vector retrieval, and scalar ranking of heterogeneous decision dimensions.

---

## Goals And Intent

- Hardening the constitutional substrate (pack conformance, receipt semantics, guard hardening, deterministic CID parity)
- Completing Text-Core (structured extract emission, promotion-state machinery, durable canonical cache, explain/audit surfaces)
- Introducing live adapters behind the refinery boundary
- Expanding to temporal and activation memory planes
- Establishing docs intelligence and issue orchestration as a first-class product capability

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Ingestion subsystem is a compiler pipeline, not a brain | "not the brain. It is a compiler pipeline" | infrastructure / text-core | critical | Rejects memory-soup; requires separate immutable archive, canonical packet, projection stores, promotion layer, retrieval compiler |
| Canonical assimilation packet as first-class Entif artifact | "ratified as a first-class Entif artifact" | memory / storage | critical | Boundary object between intake and downstream memory/write/correlation |
| Deterministic CID parity across SDKs and services | "the same semantically identical envelope must hash to the same CID" | SDK / services / canonicalization | critical | RFC 8785 JCS-based determinism required |
| Every meaningful event emits or is bound into a receipt | "every cognitively meaningful event either emits a receipt or is provably bound into a receipt bundle" | receipts / provenance | critical | RRP pack manifest schema required |
| Rights-scoped, explainable, auditable context injection | "selective context injection must be rights-scoped, explainable, and auditable" | context / rights | critical | Not a prompt-building afterthought |
| Three memory planes: truth/provenance, temporal, activation | "shall implement three memory planes" | memory / architecture | critical | Separation prevents long-lived truth corruption by short-lived relevance |
| No scalar ranking collapse | "never reduce memory value, routing value, trust, urgency, novelty, and decay into one magical scalar" | evaluation / ranking | critical | Store vectors; apply decision-specific reducers |
| Guard decisions deny-by-default for all side-effecting operations | "deny-by-default and require fresh, explainable guard decisions" | guard / rights | critical | Even read operations should be rights-scoped at boundary |
| OpenAPI 3.1.1 for synchronous HTTP surface | "OpenAPI 3.1.1 is the relevant current HTTP contract reference" | services / API | high | REST-like request/response for developer ergonomics |
| AsyncAPI 3.1.0 for asynchronous event surface | "AsyncAPI 3.1.0 is the relevant machine-readable event-driven contract reference" | services / events | high | Event-driven contracts for long-running ingestion and workflow |
| TypeScript SDK as primary developer-facing abstraction | "exist first in TypeScript because the repo doctrine already leans TypeScript-first" | SDK | high | Python reserved for specialist lanes and evaluation harnesses |
| CLI with three primary modes: summary, explain, audit | "CLI should provide three primary modes—summary, explain, and audit" | CLI / operator | high | Treated as product surface, not temporary dev scaffold |
| Every CLI high-value artifact supports --json, --summary, --audit output modes | explicit requirement | CLI | high | Pipelines, quick comprehension, provenance inspection |
| OpenTelemetry semantic conventions for telemetry | "Entif should map runs, tool calls, cache hits, guard denials... into those conventions" | telemetry / observability | high | Shared semantic conventions rather than isolated naming |
| Multi-axis evaluation vector schema as normative | "schema should become normative for ranking, routing, promotion, and revisit decisions" | evaluation / storage | high | 11-dimension vector: novelty, relevance, valueAdd, resilience, urgency, trust, contradictionPressure, verificationCost, decayRate, revisitability, legalSensitivity |
| Source registry with platform-level and record-level facts separately modeled | "platform-level and record-level facts" modeled separately | sources / registry | high | Example: "Zenodo supports DOI issuance" (platform) vs "this deposition was corrected on date X" (record) |
| Late identity resolution as evidence-producing, receipted, revisable activity | "late identity resolution... as evidence-producing activities whose results are receipted and revisable" | sources / identity | medium | ORCID, ROR, DOI, SWHID, package hashes |
| Explicit state transitions: draft, promoted, cooled, quarantined, superseded, gravestoned, revisit-scheduled | "every candidate memory object shall be able to move through states" | memory / state | high | No delete primitive for truth/provenance plane; wrongness represented as new state |
| Differentiate: byte-identical duplicates, manifestation-equivalent duplicates, clustered semantic near-duplicates, true revisions/supersessions | "shall differentiate byte-identical duplicates, manifestation-equivalent duplicates..." | memory / dedupe | high | Retain revision chains; do not replace in place |
| Support and conflict edges both legitimate outputs of associative lane | "support and conflict edges are both legitimate outputs" | memory / associative | medium | No forced premature resolution of contradictions |
| Context compiler in two modes: fast compile and deep compile | "fast compile" and "deep compile" modes defined | context / compiler | high | Fast: under strict time/token budgets; Deep: may expand evidence closure with budget visibility |
| Subcalls return as bounded symbols or artifacts, not silently balloon parent context | "RLM note is directionally right... subcalls return as bounded symbols or artifacts" | context / subprocess | high | Rosetta protocol sheet RLM guidance |
| No arbitrary child-agent outputs loaded into parent context without policy and receipt controls | explicit prohibition | context / governance | high | Policy and receipt controls required |
| Compiled context bundle carries its own identity, receipt, constituent references, rights scope, compilation policy, excluded references, and English accompaniment | "compiled context is an artifact, not an invisible side effect" | context / artifact | high | For explain and audit views |
| Docs intelligence extraction artifacts routed through local issue-draft review | "standardize extraction artifacts, route them through local issue-draft review" | docs-intelligence | medium | Planning lane as first-class product capability |
| Operator shell: queue/runs view, packet/projections view, context compiler view, receipts graph view, source registry explorer, side-by-side summary/explain/audit panels | "required mode structure is already clear" | operator / UI | medium | Read-only and policy-gated inspection surface |
| Telemetry: runs, tool calls, cache hits, guard denials, context compiles, receipt verification outcomes mapped to OpenTelemetry conventions | "Entif should map... into those conventions" | telemetry | medium | Semantic conventions for traces, metrics, logs |
| Dedupe and revision handling: differentiated, revision chains retained, contradiction modeling without forced resolution | explicit hard requirements | memory / dedupe | high | Different from "delete and replace" |
| Standards: RFC 8785 (JSON canonicalization), OpenAPI 3.1.1, AsyncAPI 3.1.0, OpenTelemetry semantic conventions, PROV-O (OWL2) | external standards explicitly named | standards / compliance | medium | Binding; well-aligned with product needs |
| Domain-specific compliance pass required before production claims | "Before production claims, the platform should still undergo a dedicated pass" | compliance / governance | medium | Retention, privacy, sectoral compliance, connector-specific legal posture |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-26 | docs/PRDs/20260426 - Entif - PRD - Context CLI and Memory Services.md | Research basis and governing posture | text-core, docs-intelligence, constitutional | ingestion pipeline, Rosetta | requirement | Ingestion subsystem is a compiler pipeline converting raw source material into typed memory artifacts, receipts, projections, and retrieval-ready context bundles — not a brain | "the ingestion subsystem is not the brain. It is a compiler pipeline" | Treat as fundamental architectural division; do not blur into generic "memory bot" | high |
| 2026-04-26 | docs/PRDs/... | Research basis and governing posture | text-core, runtime-ingestion | assimilation packet | decision | Canonical assimilation packet is the most important conceptual contribution from transcript, now ratified as first-class Entif artifact | "ratified as a first-class Entif artifact" | Elevate assimilation packet to first-class artifact status in schema and tooling | high |
| 2026-04-26 | docs/PRDs/... | Product definition and non-goals | rights, governance, storage | mutable memory, autonomous side-effects | requirement | Non-goals: not a single mutable memory store; not an autonomous side-effect engine by default; not retrieval-first/authorization-after; not vendor-locked prompt wrapper; not purely vector-based; not a scalar collapse of truth/history/activation | enumerated non-goals | Validate each architectural decision against this non-goal list | high |
| 2026-04-26 | docs/PRDs/... | Product definition and non-goals | evaluation, storage | scalar ranking | requirement | Must never reduce memory value, routing value, trust, urgency, novelty, and decay into one magical scalar; store vectors and apply decision-specific reducers | "never reduce memory value... into one magical scalar" | Design multi-axis evaluation vectors; do not implement universal scalar ranking | high |
| 2026-04-26 | docs/PRDs/... | Constitutional architecture > Rosetta as constitutional core | constitutional, canonicalization, receipts | Rosetta, tiles, receipts, provenance | technology | Rosetta remains single source of truth for canonical identity, content addressing, receipts, provenance, and process; canonical tile/envelope model with deterministic canonicalization and digest computation; RFC 8785 JCS-based determinism | "across SDKs and services, the same semantically identical envelope must hash to the same CID" | Implement JCS-based canonicalization; validate CID parity across SDK/service boundary | high |
| 2026-04-26 | docs/PRDs/... | Constitutional architecture > Source substrate and ingress refinery | text-core, imports, storage | source substrate, ingress refinery | requirement | Source substrate models source systems, source records, manifestations, packages, acquisition acts, rights posture, lifecycle state, identifiers, and evidence-bearing validity changes; ingress refinery is parse-only by default, no external side effects until explicit policy says otherwise | "parse-only by default... must not initiate external side effects" | Implement parse-only ingress; require explicit policy to enable external effects | high |
| 2026-04-26 | docs/PRDs/... | Constitutional architecture > The canonical cache and memory planes | storage, retrieval, memory-planes | canonical cache, truth plane, temporal plane, activation plane | requirement | Canonical cache is first coherent working-set representation; three memory planes required: truth/provenance plane (immutable receipted artifacts), temporal plane (evolving state, episodic history, time-aware projections), activation plane (recency, frequency, association strength, contradiction pressure, revisit triggers) | "shall implement three memory planes... truth/provenance, temporal, activation" | Implement three-plane architecture; do not collapse planes into one store | high |
| 2026-04-26 | docs/PRDs/... | Constitutional architecture > The canonical cache and memory planes | memory-planes, state-machine | state transitions | requirement | Explicit state transitions: draft, promoted, cooled, quarantined, superseded, gravestoned, revisit-scheduled; "delete" not a permissible primitive for truth/provenance plane; wrongness represented as new provenance-bearing state | "no delete primitive for truth/provenance plane except through governance-preserving gravestoning" | Design state machine; represent wrongness as new state, not deletion | high |
| 2026-04-26 | docs/PRDs/... | Constitutional architecture > Context compilation and selective injection | tapestry, context, retrieval | context compilation, fast/deep compile | requirement | Selective context injection is central operational behavior; compile context bundle from truth-plane artifacts plus approved temporal and activation features; two modes: fast compile (strict time/token budgets) and deep compile (may expand evidence closure with budget visibility) | "fast compile... deep compile" modes defined | Implement both modes with budget visibility; bundle is an artifact not a side effect | high |
| 2026-04-26 | docs/PRDs/... | Constitutional architecture > Context compilation and selective injection | context, rights, governance | subcall bounding | requirement | Subcalls return as bounded symbols or artifacts; no arbitrary child-agent outputs loaded into parent context without policy and receipt controls | "RLM note is directionally right here in insisting that subcalls return as bounded symbols or artifacts" | Enforce bounded subprocess return; require policy/receipt for parent context injection | high |
| 2026-04-26 | docs/PRDs/... | Interface contracts and schemas > Canonical artifacts | schema, text-core | source envelope, assimilation packet, compiled context bundle | technology | Three canonical artifact families: source envelope (immutable source capture), assimilation packet (boundary object between intake and downstream), compiled context bundle / tapestry (what SDK/CLI/services consume) | JSON schemas provided for all three | Implement all three artifact families with schema fidelity | high |
| 2026-04-26 | docs/PRDs/... | Interface contracts and schemas > Receipt model | receipts, provenance | receipt schema | technology | Receipt system preserves receipted closure for every meaningful event; RRP pack manifest schema requires structured claims, digests, policy references, subjects, evidence-bearing entries | "ensure every cognitively meaningful event either emits a receipt or is provably bound into a receipt bundle" | Implement receipt schema as specified; validate coverage | high |
| 2026-04-26 | docs/PRDs/... | Interface contracts and schemas > Multi-axis evaluation vectors | evaluation, storage, retrieval | evaluation vector schema | technology | 11-dimension evaluation vector schema: novelty, relevance, valueAdd, resilience, urgency, trust, contradictionPressure, verificationCost, decayRate, revisitability, legalSensitivity; decision-specific reducers privilege different dimensions per decision type | "schema should become normative for ranking, routing, promotion, and revisit decisions" | Implement vector schema; define reducer policies per decision type | high |
| 2026-04-26 | docs/PRDs/... | Interface contracts and schemas > Service contracts | API, services | OpenAPI, AsyncAPI dual contracts | technology | Synchronous HTTP surface via OpenAPI 3.1.1; asynchronous event surface via AsyncAPI 3.1.0; minimal surface: /ingest/sources, /ingest/runs, /memory/packets/{packetId}, /memory/promotions, /context/compile, /context/bundles/{cid}, /receipts/{cid}, /explain/{subjectCid}, /audit/{subjectCid} | YAML contract provided | Implement dual-contract model; expose all listed endpoints | high |
| 2026-04-26 | docs/PRDs/... | Interface contracts and schemas > Service contracts | events, services | event surface | technology | Event surface includes: source.registered, ingest.started, observation.created, packet.emitted, promotion.changed, context.compiled, receipt.created, guard.denied, issue.draft.created | "event names should be stable, versioned, and discoverable through the AsyncAPI document" | Implement all event types; document in AsyncAPI | high |
| 2026-04-26 | docs/PRDs/... | SDK and CLI specification > SDK requirements | SDK, typescript | TypeScript SDK modules | requirement | TypeScript SDK as primary developer-facing abstraction; modules: Sources, Ingest, Memory, Context, Receipts, Guard, Explain, Audit; never silently stringify constitutional artifacts; return stable references, receipt references, policy/version info, differentiated error classes | "SDK shall never silently stringify away constitutional artifacts" | Build TypeScript SDK with all named modules; differentiate error classes | high |
| 2026-04-26 | docs/PRDs/... | SDK and CLI specification > CLI requirements | CLI, operator | CLI command surface | requirement | CLI with three primary modes (summary, explain, audit) plus explicit intake/memory/context commands; every high-value artifact supports --json, --summary, --audit; deterministic replay of fixture runs | "three primary modes—summary, explain, and audit" | Implement CLI with all modes and output format options | high |
| 2026-04-26 | docs/PRDs/... | SDK and CLI specification > CLI requirements | CLI, fixtures | deterministic replay | requirement | CLI must support deterministic replay of fixture runs; fixtures are the constitutional proving ground | "because the repo's bootstrap execution track already relies on fixtures" | Implement fixture replay capability | high |
| 2026-04-26 | docs/PRDs/... | SDK and CLI specification > Operator surfaces | operator, UI | operator shell requirements | requirement | Operator shell requires: queue/runs view, packet/projections view, context compiler view, receipts graph view, source registry explorer, side-by-side summary/explain/audit panels; read-only and policy-gated inspection surface | "required mode structure is already clear" | Implement operator shell; do not make it source of truth | medium |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Datasource ingestion and correlation | imports, storage | ingestion layers | requirement | Ingestion families introduced in layers; first production-worthy: text-dominant and policy-simple (local Markdown/plain text, cloud documents, repository metadata, API-delivered JSON records); every connector passes through refinery contract; never write directly to higher memory planes | "first production-worthy families should be text-dominant and policy-simple" | Phase connector development; enforce refinery contract | high |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Datasource ingestion and correlation | sources, identity | source registry, late identity resolution | requirement | Source registry supports platform-level and record-level facts separately; late identity resolution (ORCID, ROR, DOI, SWHID, package hashes) is evidence-producing activity, receipted and revisable | "late identity resolution... as evidence-producing activities whose results are receipted and revisable" | Model both fact levels; implement late resolution as receipted activity | high |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Memory operations and management | memory-planes, state-machine | memory operations | requirement | Mandatory memory operations: ingest, normalize, classify, correlate, dedupe, promote, cool, quarantine, supersede, gravestone, compile, retrieve, explain, audit, export; each reachable through SDK and service APIs; each has policy and receipt story | "Memory management without state transitions and receipts is disallowed" | Implement all operations with policy/receipt coverage | high |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Memory operations and management | memory, dedupe | dedupe and revision handling | requirement | Differentiate byte-identical duplicates, manifestation-equivalent duplicates, clustered semantic near-duplicates, true revisions/supersessions; retain revision chains; do not replace in place; support and conflict edges both legitimate outputs | "shall retain revision chains and correction events rather than replacing older artifacts in place" | Implement differentiated dedupe; preserve revision chains | high |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Guardrails, rights, and receipts | rights, guard, governance | deny-by-default guard | requirement | All side-effecting operations deny-by-default with fresh explainable guard decisions; even non-side-effecting retrieval rights-scoped at storage/boundary layer, not filtered after retrieval; read, compile, promotion, export paths preserve rights scope, audience, tenant, policy references | "deny-by-default and require fresh, explainable guard decisions" | Implement deny-by-default guards; scope rights at boundary not post-filter | high |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Guardrails, rights, and receipts | telemetry | OpenTelemetry semantic conventions | technology | Map runs, tool calls, cache hits, guard denials, context compiles, receipt verification outcomes to OpenTelemetry semantic conventions | "Entif should map... into those conventions rather than inventing isolated observability naming" | Align telemetry naming with OpenTelemetry conventions | medium |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Delivery order and acceptance gates | governance, delivery-order | five-phase delivery order | decision | Phase 1: Constitutional hardening (pack conformance, receipt semantics, guard hardening, CID parity); Phase 2: Text-Core completion (structured extract, promotion-state, canonical cache, explain/audit); Phase 3: Live adapter introduction (real source families through refinery); Phase 4: Memory-plane expansion (temporal, activation, revisit, route-plan); Phase 5: Docs intelligence and issue orchestration | explicit phases with acceptance criteria | Follow delivery order; gate each phase | high |
| 2026-04-26 | docs/PRDs/... | Service platform and operating model > Delivery order and acceptance gates | delivery-order, acceptance | exit criteria for next release family | requirement | Exit criteria: deterministic CID parity; receipted closure for compile/promotion/guard events; durable canonical cache with preserved revision semantics; at least one real source family through refinery; summary/explain/audit CLI views operable without repo spelunking; explicit separation between docs intelligence outputs and runtime memory-plane artifacts | "hard exit criteria should be these" | Define acceptance tests against these criteria | high |
| 2026-04-26 | docs/PRDs/... | Open questions and limitations | docs-intelligence, scope | evidence-scope limitation | open-question | Primary artifacts accessible: two uploaded files + accessible secondary constitutional corpus; user-referenced project compartment (~40 files) not directly enumerable in available file-search path; PRD strongly aligned with uploaded transcript and accessible corpus but not a line-by-line normalization of the broader project compartment | "scope-of-access limitation, not as a lack of architectural convergence" | Note as access scope limitation; architectural alignment is strong where accessible | high |
| 2026-04-26 | docs/PRDs/... | Open questions and limitations | compliance, governance | domain-specific compliance | open-question | Standards pass is intentionally focused on most load-bearing standards; before production claims, dedicated pass needed for domain-specific retention, privacy, sectoral compliance, connector-specific legal posture | "Before production claims, the platform should still undergo a dedicated pass" | Schedule domain-specific compliance pass before production | medium |

---

## Components And Technologies

- **TypeScript SDK** (`@entif/sdk`) — primary developer-facing abstraction; modules: Sources, Ingest, Memory, Context, Receipts, Guard, Explain, Audit
- **CLI** — operator bootstrap surface; commands: source register, ingest start/status, memory packet show/promote/quarantine, context compile/show, receipts show, explain, audit, docs extract
- **Service API** (OpenAPI 3.1.1) — synchronous HTTP surface for REST-like request/response
- **Event API** (AsyncAPI 3.1.0) — asynchronous event-driven contracts for long-running ingestion and workflow
- **Canonical cache** — first coherent working-set representation supporting clustering, dedupe, revision tracking, merge eligibility, contradiction visibility, compiled retrieval
- **Memory planes**: truth/provenance (immutable), temporal (evolving), activation (recency/frequency/association)
- **Evaluation vectors** — 11-dimension schema; decision-specific reducers per lane
- **Receipt system** — receipted closure for every meaningful event; RRP pack manifest compliant
- **OpenTelemetry** — semantic conventions for traces, metrics, logs, profiles, resources
- **RFC 8785** — JSON Canonicalization Scheme for deterministic hashing and signing
- **PROV-O** — OWL2-based ontology for provenance interchange

---

## Conceptual Claims

- Ingestion is a compiler pipeline, not a brain — separates raw source conversion from semantic interpretation
- Canonical assimilation packet is the boundary object between intake and downstream memory/write/correlation work
- Three memory planes (truth/provenance, temporal, activation) prevent long-lived truth corruption by short-lived relevance
- Compiled context bundle is an artifact with its own identity, receipt, and audit trail — not an invisible side effect
- Multi-axis evaluation vectors replace universal scalar ranking; decision-specific reducers apply per lane
- Rights scoping must happen at the storage/boundary layer, not post-retrieval
- State transitions are explicit and governed; "delete" is not a permissible primitive for truth/provenance plane
- Dedupe is differentiated: byte-identical, manifestation-equivalent, semantic near-duplicates, and true revisions are distinct cases
- Subcalls return as bounded symbols or artifacts; child-agent outputs require policy and receipt controls to surface in parent context
- Docs intelligence outputs are separate from runtime memory-plane artifacts; must not be conflated
- Delivery follows five phases: constitutional hardening → Text-Core completion → live adapter introduction → memory-plane expansion → docs intelligence orchestration

---

## Dependencies And Sequencing

- **Depends on Rosetta v3** — constitutional kernel for identity, canonicalization, tiles, receipts, provenance; immutable tile model; separation of signals from semantics; truth/temporal/activation plane doctrine
- **Phase 1 (Constitutional hardening)** is prerequisite for all subsequent phases
- **Phase 2 (Text-Core completion)** requires Phase 1 acceptance gates passed
- **Phase 3 (Live adapters)** requires both Phase 1 and Phase 2 acceptance
- **Phase 4 (Memory-plane expansion)** requires Phase 3 live adapter validation
- **Phase 5 (Docs intelligence)** requires Phase 2 Text-Core baseline; must remain separate from runtime memory-plane artifacts
- **SDK/service CID parity** is a cross-cutting requirement that must hold from Phase 1 onward
- **Receipt closure** must cover all compile/promotion/guard events from Phase 1 onward
- **Domain-specific compliance pass** is a prerequisite for production claims but can be run in parallel with later engineering phases once the platform shape is stable

---

## Contradictions Or Supersession

- No internal contradictions detected within this document
- Supersedes: earlier Entif memory compiler transcript's implied "memory soup" approach; replaced by canonical assimilation packet model and three-plane separation
- Supersedes: generic "AI memory platform" approach; replaced by constitutional platform with specific non-goals and receipt-bound architecture
- Supersedes: universal scalar relevance scoring; replaced by multi-axis vectors with decision-specific reducers

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| Implement TypeScript SDK (@entif/sdk) with Sources, Ingest, Memory, Context, Receipts, Guard, Explain, Audit modules | feature | — | SDK, typescript, docs-intelligence-output | — | "TypeScript SDK shall be the primary developer-facing abstraction" |
| Implement CLI with summary/explain/audit modes and --json/--summary/--audit output formats | feature | — | CLI, operator, docs-intelligence-output | — | "CLI should provide three primary modes—summary, explain, and audit" |
| Implement three memory planes (truth/provenance, temporal, activation) with explicit state transitions | feature | — | memory-planes, storage, docs-intelligence-output | — | "shall implement three memory planes" |
| Implement multi-axis evaluation vector schema with 11 dimensions and decision-specific reducers | feature | — | evaluation, storage, docs-intelligence-output | — | "schema should become normative for ranking, routing, promotion, and revisit decisions" |
| Implement OpenAPI 3.1.1 and AsyncAPI 3.1.0 dual-contract service surface | feature | — | services, API, docs-intelligence-output | — | "synchronous HTTP surface should be defined with OpenAPI" and "asynchronous event surface should be defined with AsyncAPI" |
| Implement canonical assimilation packet as first-class Entif artifact | feature | — | memory, storage, docs-intelligence-output | — | "ratified as a first-class Entif artifact" |
| Implement RFC 8785 JCS-based deterministic canonicalization and CID parity across SDK/service boundary | feature | — | canonicalization, SDK, services, docs-intelligence-output | — | "across SDKs and services, the same semantically identical envelope must hash to the same CID" |
| Implement deny-by-default guard system with fresh explainable decisions for all side-effecting operations | feature | — | guard, rights, governance, docs-intelligence-output | — | "deny-by-default and require fresh, explainable guard decisions" |
| Implement parse-only ingress refinery with explicit policy gates for external side effects | feature | — | text-core, imports, docs-intelligence-output | — | "parse-only by default... must not initiate external side effects until explicit policy says otherwise" |
| Implement differentiated dedupe and revision handling preserving revision chains | feature | — | memory, dedupe, docs-intelligence-output | — | "shall retain revision chains and correction events rather than replacing older artifacts in place" |
| Implement context compiler with fast/deep modes and budget visibility | feature | — | context, tapestry, docs-intelligence-output | — | "fast compile... deep compile" modes defined |
| Implement bounded subcall returns requiring policy/receipt controls for parent context injection | feature | — | context, governance, docs-intelligence-output | — | "no arbitrary child-agent outputs loaded into parent context without policy and receipt controls" |
| Implement five-phase delivery with acceptance gates: constitutional hardening → text-core → live adapters → memory-plane expansion → docs intelligence | process | — | delivery-order, governance, docs-intelligence-output | — | "next engineering order should be ratified as follows" |

---

## Project Board Suggestions

- **Area:** Entif Core / Platform
- **Cycle:** 2026-Q2 (Phase 1-2 focus)
- **Status:** Active development (constitutional hardening underway per repo evidence around ROCK-3111-C)
- **Blocked by:** Rosetta v3 constitutional substrate stability (prerequisite)
- **Parallelization notes:** Domain-specific compliance pass can run parallel to Phase 2-4 engineering once platform shape is stable; TypeScript SDK and CLI can be developed in parallel after Phase 1 gates pass; live adapter introduction is gated behind both Phase 1 and Phase 2 acceptance

---

## Open Questions

- How should the assimilation packet versioning be handled when source normalization rules change?
- What is the precise boundary at which a "read" operation crosses from "no guard required" to "rights-scoped at boundary"? (Document says even reads should be rights-scoped at boundary, but the threshold is implied, not stated)
- How should docs intelligence extraction artifacts be distinguished from runtime memory-plane artifacts at the artifact kind level? (Explicit separation required, but kind schema differentiation not specified)
- What is the required precision for the "English accompaniment" in compiled context bundles — is it a summary, a narrative, or a structured description?
- How does the Phase 5 docs intelligence orchestration interact with existing issue-draft workflow described in ISSUE_RECONCILIATION.md?
- Should the operator shell be a separate repository/service or part of the Entif monorepo?
- What is the fallback behavior when a guard decision cannot be produced (e.g., policy not found, computation timeout)?