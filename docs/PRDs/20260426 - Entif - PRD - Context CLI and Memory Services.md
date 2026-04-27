# Entif SDK CLI and Service Platform PRD

## Research basis and governing posture

This PRD synthesizes the uploaded Entif Memory Compiler transcript, the uploaded Entif and Rosetta PRD draft, the accessible Rosetta/Entif constitutional corpus surfaced through the connected secondary materials, and recent primary-source standards documentation. Across those sources, the overlap is strong on five points: Rosetta is the minimal constitutional substrate; Entif is the governed operating layer built on top of it; ingestion must behave like a compiler rather than a vague “memory bot”; receipts and provenance are first-class artifacts rather than afterthoughts; and selective context injection must be rights-scoped, explainable, and auditable rather than hidden inside prompt glue. fileciteturn7file0 fileciteturn5file1 fileciteturn6file2 fileciteturn8file15 fileciteturn28file0

The most important correction carried forward from the transcript is architectural, not stylistic: the ingestion subsystem is **not** the brain. It is a compiler pipeline that converts raw source material into typed memory artifacts, receipts, projections, and later retrieval-ready context bundles. The transcript explicitly rejects a one-pot “memory soup,” recommends a canonical assimilation packet, and insists on an immutable source archive, a canonical packet layer, projection stores, a promotion layer, and a retrieval compiler as separate concerns. That structure is consistent with Rosetta v3’s immutable tile model, its separation of signals from semantics, and the doctrine’s separation of truth, temporal, and activation planes. fileciteturn7file0 fileciteturn5file1 fileciteturn8file15

The secondary repository evidence materially sharpens product scope. The currently accessible Rosetta monorepo materials describe an implemented bootstrap substrate with workspace shape, canonicalization, CIDs, schemas, receipts, guard decisions, a source substrate, registry fixtures, a parse-only ingress refinery, a canonical cache, and read-only projection surfaces. They also state clearly that this is a provenance-kernel prototype with source-aware bootstrap fixtures, not yet a full production ingestion platform. That means the engineering task is not to invent a generic “AI memory platform” from scratch; it is to harden the constitutional substrate, finish the real boundary contracts, and then layer SDK, CLI, service APIs, live adapters, memory planes, and operator surfaces in that order. fileciteturn28file0 fileciteturn16file0 fileciteturn13file0 fileciteturn15file0

The external standards posture in the corpus is also well chosen and should remain binding. RFC 8785 describes a deterministic JSON canonicalization scheme suitable for repeatable hashing and signing; OpenAPI provides a standard interface description for HTTP APIs; AsyncAPI provides an equivalent standard description for message-driven APIs; OpenTelemetry semantic conventions provide shared names for traces, metrics, logs, and resources; and PROV-O provides an OWL2-based ontology for representing provenance interchange. Those standards are a good fit for Entif because the product needs deterministic envelopes, dual synchronous/asynchronous interfaces, interoperable telemetry, and portable provenance semantics. citeturn0search0turn0search4turn1search0turn1search5turn0search2turn0search3turn1search2

## Product definition and non-goals

Entif, in this PRD, is a **receipt-bound, source-aware, rights-scoped cognitive operating layer** that sits above Rosetta’s constitutional substrate. It provides datasource ingestion, memory operations and management, context compilation, retrieval and correlation, operator inspection, and policy-governed agent orchestration. Rosetta remains the stable constitutional kernel for identity, canonicalization, tiles, receipts, provenance, and explainable process. Entif remains the operating layer that assimilates sources, computes extracts, manages memory planes, selects context, routes work, and exposes usable surfaces to developers and operators. fileciteturn5file1 fileciteturn6file2 fileciteturn28file0

The product exists to solve a specific failure mode the transcript identifies repeatedly: too many current agent harnesses burn tokens, blur provenance, hide state, mix ephemeral prompt context with long-lived memory, and turn ingestion into a monolithic blob that is hard to trust, hard to repair, and hard to evolve. The intended Entif response is not “more agent magic,” but a constitutional platform that can answer all of the following at any time: what was observed, what was inferred, why it was promoted, what evidence supports it, what is contradictory, what rights scope allowed it to surface, what policy governed the result, and which outputs were merely projections rather than source truth. fileciteturn7file0 fileciteturn8file14 fileciteturn9file9

The core non-goals are equally important. This product is **not** a single mutable memory store; **not** an autonomous side-effect engine by default; **not** a system that does retrieval first and authorization later; **not** a vendor-locked prompt wrapper; **not** a purely vector-based memory system; and **not** a product that collapses truth, history, and activation into one undifferentiated “relevance” score. It is also not permitted to treat downstream stores such as Markdown projections, graph views, or conversational-memory adapters as the canonical source of truth. The canonical hierarchy remains immutable source archive, canonical packet, projection stores, promotion layer, and retrieval compiler. fileciteturn7file0 fileciteturn8file15 fileciteturn16file0

A binding design law follows from the transcript and the richer PRD draft: the system must **never** reduce memory value, routing value, trust, urgency, novelty, and decay into one magical scalar. The user correction in the transcript and the uploaded PRD is right: novelty, relevance, value-add, resilience, urgency, trust, contradiction pressure, legal sensitivity, verification cost, decay rate, and revisitability are separate dimensions that should dominate different decisions in different ways. The platform shall therefore store vectors and apply decision-specific reducers, not universal scalar ranking. fileciteturn7file2 fileciteturn9file8

## Constitutional architecture

### Rosetta as constitutional core

Rosetta shall remain the single source of truth for canonical identity, content addressing, receipts, provenance, and process. The core Rosetta operational spine is run → action → toolcall → observation → evaluation. Rosetta v3 also requires a hard separation between observed material and derived semantic material, uses immutable content-addressed tiles, supports optional stable handles for evolvable entities, and treats extension packs as the place where external standards and domain semantics attach instead of allowing core sprawl. That constitutional boundary is not a philosophical flourish; it is the reason the rest of the product can remain auditable and evolvable. fileciteturn5file1 fileciteturn6file2

The canonical tile/envelope model should be implemented with deterministic canonicalization and digest computation. RFC 8785’s JSON Canonicalization Scheme is well aligned with the internal corpus’s repeated insistence on JCS-based determinism, stable hashing, and cryptographic receipts. The product requirement here is straightforward: across SDKs and services, the same semantically identical envelope must hash to the same CID; signatures must be computed over the canonicalized body or CID commitment; and signature fields themselves must not change the body hash. fileciteturn6file2 citeturn0search0turn0search4

### The source substrate and ingress refinery

The source substrate is the first Entif layer above Rosetta. Its purpose is to model source systems, source records, manifestations, packages, acquisition acts, rights posture, lifecycle state, identifiers, and evidence-bearing validity changes such as corrections, retractions, and supersessions. The uploaded PRD and the accessible constitutional material both make clear that repository capabilities and individual records must be modeled separately, that source identity resolution is evidence-producing work, and that invalidation/correction propagation must survive as first-class history rather than being flattened away. fileciteturn6file11 fileciteturn24file0

The ingress refinery is the initial compiler boundary. Its current constitutional posture should remain **parse-only by default**. It should be able to accept local files, API payloads, cloud documents, event records, repository metadata, and production-sidecar extracts, but until explicit policy says otherwise, it must not initiate external side effects. It transforms raw source observations into normalized manifestations, source-derived observations, structured extracts, receipts, and clustering hints. The repo handoff’s emphasis on source episode envelopes, normalization fingerprints, dedupe and revision handling, and transform receipts is exactly right; those are not optional enrichments, but the minimum safe ingestion contract. fileciteturn13file0 fileciteturn15file0 fileciteturn17file0

### The canonical cache and memory planes

The canonical cache is not just a performance store; it is the first coherent working-set representation of source families, manifestations, relationships, and extractable meaning. Its job is to support clustering, dedupe, revision tracking, merge eligibility, contradiction visibility, and compiled retrieval—not to silently replace the immutable source archive. The richer PRD correctly frames it as the first stable operational cache that later supports text-core retrieval and projections. The developer obligation is to preserve byte identity, source-record identity, manifestation identity, cluster identity, and revision identity as separate levels rather than flattening them into “same document.” fileciteturn19file0 fileciteturn7file0

Above that, the product shall implement three memory planes.

The **truth/provenance plane** stores immutable receipted artifacts: sources, observations, claims, extracts, policies, rights decisions, evaluation artifacts, and context-compilation receipts. The **temporal plane** stores evolving state, episodic history, revisions, cooling and promotion events, validity windows, and time-aware projections. The **activation plane** stores recency, frequency, association strength, contradiction pressure, revisit triggers, proactive surfacing logic, and context-assembly readiness. This separation is doctrinally supported in the accessible Rosetta corpus and is essential to preventing silent corruption of long-lived truth by short-lived relevance. fileciteturn8file15 fileciteturn8file12

The system shall implement explicit state transitions across those planes. At minimum, every candidate memory object shall be able to move through states such as draft, promoted, cooled, quarantined, superseded, gravestoned, and revisit-scheduled. “Delete” is not a permissible primitive for the truth/provenance plane except through governance-preserving gravestoning and policy-bound cache shredding where legally or contractually required; if a fact becomes wrong, that wrongness must be represented as new provenance-bearing state rather than erasing the prior trail. fileciteturn8file15

### Context compilation and selective injection

Selective context injection is the product’s central operational behavior. It must not be a prompt-building afterthought. The platform shall compile a context bundle—internally aligned with the Rosetta “tapestry” concept—from canonical truth-plane artifacts plus approved temporal and activation features. Every compiled bundle must carry its own identity, receipt, constituent references, rights scope, compilation policy, excluded-or-suppressed references when material, and enough English accompaniment to support explain and audit views. The compiled context is an artifact, not an invisible side effect. fileciteturn6file2 fileciteturn8file12 fileciteturn28file0

The context compiler shall operate in two modes. In **fast compile**, it assembles from already normalized, clustered, and prior-ranked artifacts under strict time and token budgets for interactive requests. In **deep compile**, it is allowed to expand evidence closure, contradiction analysis, and recommendation breadth, but still must surface its own budget, evidence density, and confidence posture. Under no mode may the compiler load arbitrary child-agent outputs back into the parent context without policy and receipt controls; the Rosetta protocol sheet’s RLM note is directionally right here in insisting that subcalls return as bounded symbols or artifacts rather than silently ballooning parent context. fileciteturn6file17

## Interface contracts and schemas

### Canonical artifacts

The product shall formalize three canonical artifact families before it proliferates adapters.

The first is the **source envelope**, used for immutable source capture.

```json
{
  "kind": "entif.source.envelope",
  "cid": "cid:...",
  "rid": "rid:source:...",
  "createdAt": "2026-04-26T21:00:00Z",
  "sourceSystemRef": "source:google_drive",
  "sourceRecordRef": "record:doc:123",
  "manifestationRef": "manifest:text/plain:sha256:...",
  "rightsScopeRef": "rights:tenant:default",
  "lifecycle": {
    "status": "active",
    "supersedes": [],
    "correctedBy": []
  },
  "identifiers": [
    { "scheme": "sha256", "value": "..." },
    { "scheme": "doi", "value": "..." }
  ],
  "digest": {
    "alg": "sha256",
    "value": "..."
  }
}
```

The second is the **assimilation packet**, which is the transcript’s most important conceptual contribution and should now be ratified as a first-class Entif artifact. It is the boundary object between intake and downstream memory/write/correlation work. fileciteturn7file0

```json
{
  "kind": "entif.assimilation.packet",
  "packetId": "aap_01J...",
  "sourceRef": "cid:source...",
  "runRef": "cid:run...",
  "hygiene": {
    "verdict": "benign",
    "notes": []
  },
  "semantic": {
    "summaries": [],
    "entities": [],
    "relations": [],
    "conceptRefs": []
  },
  "epistemic": {
    "claims": [],
    "evidenceRefs": [],
    "uncertainties": [],
    "contradictions": []
  },
  "operational": {
    "tasks": [],
    "decisions": [],
    "risks": [],
    "openQuestions": []
  },
  "associative": {
    "duplicates": [],
    "relatedArtifacts": [],
    "supportEdges": [],
    "conflictEdges": []
  },
  "creative": {
    "optionalHypotheses": []
  },
  "memoryWrites": [],
  "promotionCandidates": [],
  "receipts": []
}
```

The third is the **compiled context bundle**, which is what the SDK, CLI, services, and agent councils will actually consume.

```json
{
  "kind": "rosetta.tapestry",
  "cid": "cid:ctx...",
  "compiledAt": "2026-04-26T21:05:00Z",
  "requestRef": "cid:run...",
  "rightsScopeRef": "rights:tenant:default",
  "policyRef": "cid:policy...",
  "budget": {
    "maxTokens": 12000,
    "maxArtifacts": 40,
    "mode": "fast"
  },
  "includes": ["cid:claim1", "cid:observation2", "cid:summary3"],
  "excludes": ["cid:quarantined1"],
  "scores": {
    "route": { "relevance": 0.91, "trust": 0.84, "urgency": 0.32 }
  },
  "receiptRef": "cid:receipt..."
}
```

### Receipt model

The receipt system is already one of the strongest parts of the accessible Rosetta substrate and should be preserved rather than simplified away. The RRP pack manifest and receipt schema exposed through the accessible repo materials already require structured claims, digests, policy references, subjects, and evidence-bearing entries. The platform requirement is therefore not “add receipts eventually,” but “ensure every cognitively meaningful event either emits a receipt or is provably bound into a receipt bundle.” fileciteturn22file0 fileciteturn23file0 fileciteturn27file0

```ts
export interface ReceiptSubject {
  cid: string;
  role?: string;
}

export interface ReceiptEvidence {
  cid: string;
  span?: string;
}

export interface ReceiptClaim {
  claimType: string;
  statement: string;
  verdict: "pass" | "fail" | "warn" | "unknown";
  confidence?: number;
  evidence: ReceiptEvidence[];
}

export interface ReceiptDigest {
  alg: string;
  of: string;
  digest: string;
  cidRef?: string;
}

export interface Receipt {
  receiptType: string;
  subjects: ReceiptSubject[];
  claims: ReceiptClaim[];
  digests: ReceiptDigest[];
  policyRefs: string[];
}
```

### Multi-axis evaluation vectors

The platform shall persist decision vectors explicitly. The following schema should become normative for ranking, routing, promotion, and revisit decisions.

```json
{
  "kind": "entif.evaluation.vector",
  "subjectRef": "cid:claim...",
  "lane": "promotion",
  "dimensions": {
    "novelty": 0.62,
    "relevance": 0.87,
    "valueAdd": 0.74,
    "resilience": 0.51,
    "urgency": 0.29,
    "trust": 0.91,
    "contradictionPressure": 0.12,
    "verificationCost": 0.33,
    "decayRate": 0.18,
    "revisitability": 0.66,
    "legalSensitivity": 0.04
  },
  "computedBy": "policy:promotion:v1",
  "receiptRef": "cid:receipt..."
}
```

A decision-specific reducer may then be applied without destroying the original vector. For example, promotion might privilege trust, value-add, and resilience; routing might privilege relevance, novelty, and verification cost; revisit scheduling might privilege decay rate, contradiction pressure, and revisitability. The vector remains canonical; the reducer remains policy-versioned and receipted. fileciteturn7file2 fileciteturn9file8

### Service contracts

The synchronous HTTP surface should be defined with OpenAPI, and the asynchronous event surface should be defined with AsyncAPI. That gives the platform a clean dual contract model: REST-like request/response for developer ergonomics and operator tooling, event-driven contracts for long-running ingestion, workflow notifications, and integration with buses or job systems. OpenAPI 3.1.1 is the relevant current HTTP contract reference, and AsyncAPI 3.1.0 is the relevant machine-readable event-driven contract reference. citeturn1search0turn1search5

A minimal service surface should include these operations:

```yaml
openapi: 3.1.1
info:
  title: Entif Service API
  version: 0.1.0
paths:
  /ingest/sources:
    post:
      summary: Register or submit a source for ingestion
  /ingest/runs:
    post:
      summary: Start a parse-only intake run
  /memory/packets/{packetId}:
    get:
      summary: Retrieve a canonical assimilation packet
  /memory/promotions:
    post:
      summary: Promote or quarantine a candidate artifact
  /context/compile:
    post:
      summary: Compile a selective context bundle
  /context/bundles/{cid}:
    get:
      summary: Inspect a compiled context artifact
  /receipts/{cid}:
    get:
      summary: Retrieve receipt or receipt bundle closure
  /explain/{subjectCid}:
    get:
      summary: Produce explain view for a subject
  /audit/{subjectCid}:
    get:
      summary: Produce audit view for a subject
```

The matching event surface should at minimum include `source.registered`, `ingest.started`, `observation.created`, `packet.emitted`, `promotion.changed`, `context.compiled`, `receipt.created`, `guard.denied`, and `issue.draft.created`. Those event names should be stable, versioned, and discoverable through the AsyncAPI document. citeturn1search5turn1search3

## SDK and CLI specification

### SDK requirements

The SDK shall be the primary developer-facing abstraction over the constitutional platform. It should exist first in TypeScript because the repo doctrine already leans TypeScript-first for the runtime spine, with Python reserved for specialist lanes and evaluation harnesses. The SDK’s job is not to hide Rosetta artifacts completely, but to make them safe and ergonomic to produce, inspect, and transport without violating the constitutional rules. fileciteturn8file15 fileciteturn16file0

At minimum, the TypeScript SDK shall expose these modules:

```ts
import {
  Sources,
  Ingest,
  Memory,
  Context,
  Receipts,
  Guard,
  Explain,
  Audit
} from "@entif/sdk";
```

Each module should expose strongly typed operations:

```ts
const source = await Sources.register({
  sourceSystem: "google_drive",
  locator: "drive://doc/123",
  rightsScope: "tenant/default"
});

const run = await Ingest.start({
  sourceRef: source.cid,
  mode: "parse-only"
});

const packet = await Memory.getPacket(run.packetId);

const promotion = await Memory.promote({
  subjectRef: packet.promotionCandidates[0].subjectRef,
  policyRef: "cid:policy:promotion:v1"
});

const context = await Context.compile({
  request: "Summarize unresolved architectural contradictions",
  scope: { tenant: "default" },
  mode: "deep"
});

const explain = await Explain.subject(context.cid);
const audit = await Audit.subject(context.cid);
```

The SDK shall never silently stringify away constitutional artifacts. Every high-value operation must return stable references, receipt references, policy/version information, and error classes that differentiate policy denial, invalid artifact shape, missing evidence closure, rights-scope mismatch, and upstream acquisition failure. The SDK should also support local deterministic envelope construction so that client-side and server-side CID calculations can be parity-tested against shared vectors. fileciteturn22file0 fileciteturn23file0

### CLI requirements

The CLI is the operator’s most important bootstrap surface. It should provide three primary modes—summary, explain, and audit—plus explicit intake, memory, and context commands. The accessible Rosetta materials already emphasize CLI-first bootstrap verticals and operator readability before ambitious UI shells. The CLI should therefore be treated as a product surface, not a temporary dev scaffold. fileciteturn8file12 fileciteturn28file0

The minimum command surface should look like this:

```bash
entif source register --system google_drive --locator drive://doc/123
entif ingest start --source cid:source... --mode parse-only
entif ingest status --run cid:run...
entif memory packet show aap_01J...
entif memory promote --subject cid:claim... --policy cid:policy...
entif memory quarantine --subject cid:claim... --reason contradiction
entif context compile --request "brief me on Rosetta pack blockers" --mode fast
entif context show cid:ctx...
entif receipts show cid:receipt...
entif explain cid:claim...
entif audit cid:claim...
entif docs extract --source docs/RFCs --emit issue-drafts
```

Every CLI command that returns a high-value artifact must support `--json`, `--summary`, and `--audit` output modes. `--json` is for pipelines and automation; `--summary` is for quick operator comprehension; `--audit` is for provenance-rich inspection. The CLI must also support deterministic replay of fixture runs, because the repo’s bootstrap execution track already relies on fixtures as the constitutional proving ground. fileciteturn15file0

### Operator surfaces

A fuller operator shell can arrive later, but its required mode structure is already clear. It needs a queue/runs view, a packet/projections view, a context compiler view, a receipts graph view, a source registry explorer, and side-by-side summary/explain/audit panels. The UI should not attempt to be the source of truth; it should be a read-only and policy-gated inspection surface over already stable artifacts. That is fully consistent with the repo constraint that OB1, Prism, and Mission Control adapters remain read-only until the constitutional substrate is harder and broader. fileciteturn16file0 fileciteturn28file0

## Service platform and operating model

### Datasource ingestion and correlation

Supported ingestion families should be introduced in layers, not all at once. The first production-worthy families should be text-dominant and policy-simple: local Markdown/plain text, cloud documents already in active use, repository metadata and README-like documents, and API-delivered JSON records. Each connector must pass through the same refinery contract and must never be allowed to write directly into higher memory planes. Correlation shall happen on top of canonicalized observations and extracts using manifestation identity, source identity, identifier anchors, similarity hints, contradiction edges, and revision lineage. fileciteturn15file0 fileciteturn17file0 fileciteturn24file0

The source registry should explicitly support both platform-level and record-level facts. For example, “Zenodo supports DOI issuance and concept records” is a source-system-level fact; “this deposition was corrected on a specific date” is a record-level fact. The product should not collapse them. It should also support late identity resolution—ORCID, ROR, DOI, SWHID, package hashes, and other identifier anchors—as evidence-producing activities whose results are receipted and revisable. That posture is aligned with the source-registry doctrine and is especially important when later integrating academic repositories, package registries, or code provenance surfaces. fileciteturn24file0

### Memory operations and management

The mandatory memory operations are ingest, normalize, classify, correlate, dedupe, promote, cool, quarantine, supersede, gravestone, compile, retrieve, explain, audit, and export. Each of those operations must be reachable through SDK and service APIs, and each must have a policy and receipt story. Memory management without state transitions and receipts is disallowed. fileciteturn7file0 fileciteturn8file15

Dedupe and revision handling deserve explicit hard requirements. The platform shall differentiate byte-identical duplicates, manifestation-equivalent duplicates, clustered semantic near-duplicates, and true revisions or supersessions. It shall retain revision chains and correction events rather than replacing older artifacts in place. It shall also explicitly model contradiction without forcing premature resolution; support and conflict edges are both legitimate outputs of the associative lane. fileciteturn13file0 fileciteturn19file0 fileciteturn24file0

### Guardrails, rights, and receipts

All side-effecting operations must remain deny-by-default and require fresh, explainable guard decisions. Even non-side-effecting retrieval operations should be rights-scoped at the storage or boundary layer, not filtered after retrieval. The repo evidence and Rosetta protocol sheet are aligned on this. For the service platform, that means every read, compile, promotion, or export path must accept and preserve rights scope, audience, tenant, and policy references as part of the artifact trail. fileciteturn20file0 fileciteturn6file17 fileciteturn16file0

Telemetry should use shared semantic conventions where it leaves the local substrate. OpenTelemetry’s semantic conventions exist precisely to standardize names for commonly observed operations and data across traces, metrics, logs, profiles, and resources. Entif should map runs, tool calls, cache hits, guard denials, context compiles, and receipt verification outcomes into those conventions rather than inventing isolated observability naming. citeturn0search2turn0search3

### Delivery order and acceptance gates

The next engineering order should be ratified as follows.

**Constitutional hardening** comes first: pack conformance, receipt semantics hardening, guard hardening, and deterministic parity testing across SDK and services. The repository evidence already shows this work underway around ROCK-3111-C and related Text-Core tasks. Acceptance means receipt vectors pass, pack validation is green, guard denials are explainable, and SDK/service canonicalization yields identical CIDs on shared fixtures. fileciteturn13file0 fileciteturn22file0 fileciteturn23file0

**Text-Core completion** comes second: finish structured extract emission, promotion-state machinery, durable canonical cache persistence, and explain/audit surfaces. Acceptance means the system can ingest real text sources through the refinery contract, persist them durably, produce assimilation packets, and support trustworthy retrieval and inspection without pretending to be a full omnivorous agent OS. fileciteturn15file0 fileciteturn19file0

**Live adapter introduction** comes third: bring one or two real source families behind the same refinery boundary used by fixtures. Acceptance means live and fixture ingest share the same packet and receipt contracts. fileciteturn15file0 fileciteturn17file0

**Memory-plane expansion** comes fourth: temporal plane, activation plane, revisit policies, and route-plan integration. Acceptance means the system can explain not only what is true, but what changed over time and why something surfaced now. fileciteturn8file15 fileciteturn8file12

**Docs intelligence and issue orchestration** comes fifth: standardize extraction artifacts, route them through local issue-draft review, and turn the planning lane into a first-class product capability without falsely calling it runtime Rosetta-native semantic ingestion. Acceptance means architectural findings, contradictions, and candidate work items can be promoted into issue drafts and tracked with full provenance. fileciteturn25file0 fileciteturn13file0

For the next release family, the hard exit criteria should be these: deterministic CID parity across supported SDKs and services; receipted closure for every meaningful compile/promotion/guard event; durable canonical cache with preserved revision semantics; at least one real source family running through the refinery contract; summary, explain, and audit CLI views that make the platform operable without repo spelunking; and explicit separation between docs intelligence outputs and runtime memory-plane artifacts. fileciteturn15file0 fileciteturn19file0 fileciteturn20file0 fileciteturn25file0

## Open questions and limitations

The most important limitation is evidence-scope, not design coherence. In this run, the directly inspectable primary artifacts were the two uploaded files in the current chat plus the accessible secondary Rosetta/Entif materials surfaced through the connected tools. The user-referenced ChatGPT project compartment with roughly forty files was not directly enumerable in the available file-search path for this response, so this PRD is strongly aligned with the uploaded transcript, the uploaded Entif/Rosetta PRD draft, and the accessible secondary constitutional corpus, but it is not a line-by-line normalization of every file in that broader project compartment. That limitation should be understood as a scope-of-access limitation, not as a lack of architectural convergence in the materials that were accessible. fileciteturn7file0 fileciteturn28file0

A second limitation is that the standards pass here is intentionally focused on the standards most load-bearing for the SDK, CLI, and service platform surface: deterministic canonicalization, HTTP/event contracts, telemetry semantics, and provenance modeling. That is enough to justify the platform shape, but not enough to close every future enterprise compliance concern. Before production claims, the platform should still undergo a dedicated pass for domain-specific retention, privacy, sectoral compliance, and connector-specific legal posture. citeturn0search0turn1search0turn1search5turn0search2turn1search2

The highest-confidence conclusion, though, is clear. The accessible evidence no longer describes an abstract dream of “memory for agents.” It describes a coherent constitutional substrate and a viable next product: a Rosetta-grounded Entif platform with a compiler-style ingester, typed assimilation packets, receipt-bound promotion and retrieval, vector-based rather than scalar evaluation, selective context compilation, and developer/operator surfaces delivered through a typed SDK, an auditable CLI, and a standards-aligned service layer. That is the product the next engineering work should now build, harden, and prove. fileciteturn7file0 fileciteturn5file1 fileciteturn28file0