# Entif Rosetta Product Requirements Document

## Executive synthesis

This PRD now incorporates the newly accessible `crates/rosetta` fork in addition to the indexed Entif 2.0 / Rosetta project-folder materials in Google Drive. Taken together, those sources paint a much clearer picture than the earlier Drive-only pass: Rosetta is no longer merely an abstract protocol concept in your corpus. In the fork, it now exists as a **constitutional monorepo** with implemented bootstrap packages for canonicalization, CIDs, tile construction, receipt creation and verification, guard decisions, source-substrate modeling, source-registry fixtures, a fixture-backed ingress refinery, and an in-memory canonical cache; the repo is explicit that this is a **working provenance-kernel prototype with source-aware bootstrap fixtures**, not yet a production ingestion platform. That concrete repo reality materially sharpens how the PRD should be written: the next stage is not “invent the architecture from scratch,” but “harden the already-emerging constitutional substrate, align the remaining PRD with the repo’s current surfaces, and sequence live adapters, durable storage, memory planes, and inspection UIs without violating the doctrine.” fileciteturn28file0

The core architectural split is consistent across both the repo and the Drive corpus. **Rosetta** is the minimal, stable, content-addressed semantic and provenance constitution. **Entif** is the governed execution, memory, orchestration, source assimilation, and evolutionary operating layer that compiles contexts, routes specialized agents, applies policy, and exposes useful read-only views to humans and sidecar systems. Rosetta v3.0.0 positions the core as a minimal and extensible spine with immutable tiles, explicit signal-vs-semantics separation, a universal operational trace, and pack-based extension rather than core sprawl; the repo README mirrors that posture almost verbatim in implementation form, describing the repo as the “shipyard, not a showroom,” where the hull and navigation rules come before the passenger cabins. fileciteturn5file1 fileciteturn28file0

The presently indexed repo state also answers a crucial scoping question. Your project is not at the “full omnivorous agent OS” stage yet, and it should not pretend to be. The repo’s own bootstrap track says the landed slice includes an Nx workspace, Rosetta kernel packages, RRP receipts, source substrate and registry bootstrap, parse-only refinery, canonical cache clustering, and read-only OB1, Prism, and Mission Control projections; its next execution order is to expand pack schemas and SHACL coverage, add real acquisition adapters behind the refinery boundary, harden cache persistence beyond in-memory state, and only then evaluate operator-shell surfaces. That ordering is excellent and should become binding product law in this PRD because it matches both the repo’s actual code surfaces and the Drive doctrine’s repeated warning not to boil the ocean or let side-effecting shells outrun the constitutional substrate. fileciteturn15file0 fileciteturn8file15

There is another especially important repo-derived clarification: **docs intelligence is an explicitly separate planning lane from Rosetta-native runtime ingestion**. The repository’s intake policy says requirements mining, contradiction extraction, technology-choice capture, roadmap derivation, issue drafting, and orchestration notes are allowed and expected now, while large-scale Rosetta-native semantic corpus ingest remains blocked until the Ingress Refinery and canonical cache are ready. That matters because it gives you a principled answer to the “hundreds of pages of canon” problem. The product should absolutely mine those pages aggressively for requirements and issue candidates, but it should not lie to itself and call that runtime Rosetta ingestion until the substrate is actually ready. fileciteturn25file0 fileciteturn13file0

This PRD therefore does five things at once. It codifies the constitutional boundary between Rosetta and Entif. It correlates today’s repo reality to the already extensive Drive canon. It converts the doctrinal ideas into **implementation-grade requirements**. It updates the roadmap so the repo’s current surfaces are treated as real constraints, not as optional garnish. And it adopts your scoring objection as a formal product law: **there will not be one master scalar score for memory, prioritization, routing, trust, or promotion.** Instead, the system will persist topic-local, lane-local, decision-specific vectors spanning novelty, relevance, value-add, resilience, urgency, trust, contradiction pressure, legal sensitivity, verification cost, decay rate, and revisitability, with different dominance rules for different kinds of decisions. That posture is already latent in the OMOC/token-efficiency notes, the doctrine, the source-registry annex, and your own session corrections; here it is promoted to explicit architectural law. fileciteturn8file3 fileciteturn9file16

The result is a product definition that is much more grounded than the earlier draft. This is not a generic “memory agent” PRD. It is a PRD for a **receipt-bound, source-aware, rights-scoped, content-addressed cognitive operating substrate** whose first commercial horizon is a text-first, provenance-first, parse-only-safe system that can ingest evidence, compile trustworthy context, support live issue-driven development, and progressively mature into a richer temporal + activation memory plane once the underlying constitutional contracts are stable. fileciteturn8file14 fileciteturn15file0

## Correlated source baseline

### What the Drive corpus says

The Drive corpus had already established the philosophical and doctrinal north star. Rosetta v3.0.0 defines the minimal stable core, with tiles, CIDs, optional RIDs, explicit observation/interpretation separation, and a universal spine built around Runs, Actions, ToolCalls, Observations, and Evaluations. Doctrine v0.2 then tightens operational law: every meaningful step must emit or be bound to a receipt artifact, verified claims must be supportable via bundle closure, the truth plane must remain immutable, the temporal and activation planes must be separate, text-only-first is binding for the first serious RC, ingress refinement is Pillar Zero, and rights must be enforced at the retrieval/storage boundary rather than after retrieval. The source-registry annex adds the other half of the worldview: source profiles should be versioned as receipts, identity resolution is evidence-producing work, repository capabilities must be separated from individual records, and invalidation/correction propagation has to be retained instead of being treated as an afterthought. fileciteturn5file1 fileciteturn8file15 fileciteturn9file16

The Google Drive doc ledger also showed that the current project-folder scope is not a loose pile of ideation anymore. It enumerates authoritative material across `docs/RFCs/`, `docs/governance/`, `docs/backlog/`, `docs/PRDs/`, `docs/live/`, and `docs/packs/`, including `Rosetta v3.0.0 Core Spine Specification`, `Normative Staging Doctrine`, `Source Registry and Repository Profile Annex`, `ROCK-3111-C-RRP-Pack-Filesystem-Contract`, current backlog docs, and PRDs around layered memory and neurologic orchestration. Even before the repo became available, that was enough to infer that the project had already crossed from ideation into codified constitutional design. fileciteturn6file2 fileciteturn6file11

### What the repo now confirms

The `crates/rosetta` fork confirms that those documents are not hypothetical. The repo README says, plainly, that the monorepo already contains the Rosetta provenance kernel, source substrate, ingress refinery, canonical corpus cache, and read-only projection adapters. It lists the package map explicitly: `rosetta-canon`, `rosetta-cid`, `rosetta-core`, `rosetta-schemas`, `rosetta-receipts`, `rosetta-guard`, `rosetta-tapestry`, `rosetta-store`, `source-substrate`, `source-registry`, `ingress-refinery`, `canonical-cache`, and `projection-adapters`; it also lists the current apps: `rosetta-cli`, `rosetta-api`, and `rosetta-operator`. That means the PRD can now name concrete package and app boundaries rather than only conceptual modules. fileciteturn28file0

The repo governance file `REPO_SHAPE_AND_CONSTRAINTS.md` adds another critical confirmation: it explicitly prohibits importing the donor tarball wholesale, requires Nx CLI and official plugins for workspace shape, preserves parse-only ingress until the canonical cache becomes the active source of truth, models source system / record / manifestation / package / acquisition / identity / rights / lifecycle / evaluation as separate layers, and keeps OB1, Prism, and Mission Control integrations read-only until constitutional contracts harden further. That is not just documentation; it is a living constraint declaration that should be elevated into this PRD’s normative requirements. fileciteturn16file0

The current handoff file does even more than that. It records the dated state of the repo as of 2026-04-25, including the current branch (`codex/pack-conformance-foundation`), the fact that several Text-Core issues have already landed, and the current work around ROCK-3111-C pack conformance. It explicitly says that TC-001 through TC-004 are merged: source episode envelope, normalization fingerprints, dedupe/revision/local persistence, and source-to-observation tiling with transform receipts. It also says the intended next planning lane is docs intelligence before broad additional Text-Core prioritization. That is enormously valuable because it turns vague “phase A / B / C” thinking into an actual, already-executing engineering lane that the PRD can align to instead of overriding. fileciteturn13file0

### Where the repo and Drive canon overlap cleanly

The overlap is remarkably strong. The Drive doctrine says truth, temporal, and activation planes must be separated; the repo implements the provenance kernel and canonical cache first, without pretending the later planes already exist. The Drive source-registry annex says to model source system, source record, manifestation, access policy, creator claims, identity evidence, version chains, corrections, and trust assessment as linked but distinct facts; the repo’s `source-substrate` package says it already models source-system profiles, records, manifestations, packages, trust matrices, and correction events as Rosetta tiles. The Drive doctrine says ingress refinery comes before semantic grandiosity; the repo’s `ingress-refinery` package describes itself as the component that turns source-aware inputs into canonical artifacts plus linked provenance receipts, while explicitly admitting it is still fixture-backed and not yet live-source-capable. The Drive doctrine says dedupe and revision detection should not auto-merge semantically broader matches; the repo’s `canonical-cache` explicitly says it indexes by byte identity, manifestation identity, record family, and conceptual cluster, while marking only byte and manifestation matches as merge-eligible. This is exactly the kind of cross-source consistency you wanted the PRD to correlate. fileciteturn18file0 fileciteturn17file0 fileciteturn19file0 fileciteturn8file15

### Where the repo usefully narrows the earlier PRD

The earlier prose-heavy PRD can now be narrowed in several very useful ways.

First, **bootstrap is intentionally headless**. The repo is not pretending to be a polished end-user product yet. It is proving the constitutional and conformance surfaces. That means the PRD should deprioritize “clever shell” work and explicitly delay showy UX beyond inspection and operator-read-only surfaces until the substrate hardens. fileciteturn28file0 fileciteturn15file0

Second, **fixture-backed is not fake**. Several packages are already executable even though they are still local-fixture-backed: the refinery, the source registry, the source substrate, the guard, the tile store, the receipts package, and the canonical cache. The PRD therefore should define a sharp distinction between “real cryptographic / structural mechanics” and “still-fixture-backed upstream acquisition or trust-value population.” The repo says, for example, that receipt signing and verification mechanics are real even though the flows using them are bootstrap/demo flows; likewise, the canonical cache is real but still in-memory, and the source registry model is real even though its entries are static fixtures. That distinction matters because it tells engineering where the actual leverage lies: not in rebuilding solved internals, but in replacing fixture-backed seams with live adapters and durable persistence. fileciteturn27file0 fileciteturn19file0 fileciteturn24file0

Third, **docs intelligence is now a first-class engineering lane**. This is one of the most strategically important repo discoveries. The PRD should no longer vaguely say “review the docs.” It should explicitly define a planning/intelligence subsystem, a documents intake ledger, draft issue promotion rules, extraction templates, contradiction and dependency mining, and authority weighting between live docs, governance docs, backlog docs, PRDs, RFCs, chats, and external notes. The repo’s intake README even tells you the current indexed corpus scale: 128 documents, 24 current April 2026 docs, 36 governing/planning/live docs, and policy that live/governance/handoffs/backlog/PRDs/RFCs outrank chats and frontier notes. That is already enough to define a formal requirements-mining lane in the product. fileciteturn25file0

## Product definition and non-goals

### Product definition

The product defined by this PRD is a **provenance-first, source-aware, rights-scoped, receipt-bound cognitive operating substrate** whose immediate deliverable is not “general AGI assistant magic,” but a text-first system that can safely ingest, normalize, structurally capture, dedupe, revise, cluster, and retrieve knowledge artifacts while keeping the entire chain of provenance inspectable and policy-gated. Rosetta is the constitutional layer that stores and verifies the meaning/process substrate. Entif is the orchestration and memory system that uses Rosetta as its source of truth for ingest, retrieval, agent routing, compiled context, evaluation, and evolutionary planning. fileciteturn5file1 fileciteturn28file0

In practical terms, the first serious product should do six things very well. It should ingest source-aware text evidence. It should preserve raw material while deriving canonical artifacts. It should mint receipts for meaningful processing steps. It should cluster and revise without dishonest auto-merges. It should retrieve only what policy and rights allow. And it should expose explanation and audit views good enough that operators stop having to trust vibes. Everything else is secondary to getting those six things right. fileciteturn17file0 fileciteturn19file0 fileciteturn20file0

### Why the product exists

The internal canon repeatedly frames existing agent stacks as brittle, token-wasteful, under-governed, weak on provenance, weak on rights separation, weak on replayability, and too eager to let shell surfaces outrun constitutional architecture. Your own notes across this session and the earlier repo/Drive material add the same critique from several angles: one-off workflows instead of repeatable flows, insufficient dedupe and revision awareness, simplistic or misleading scoring, poor memory hygiene, lack of explicit trust and provenance structures, and not enough separation between passive assimilation and side-effecting execution. The product exists to solve those gaps systematically rather than cosmetically. fileciteturn9file1 fileciteturn8file3 fileciteturn8file15

### Non-goals

The first major non-goal is **not** to become a full multimedia semantic universe on day one. Doctrine v0.2 is explicit that the first serious RC is text-first, and that non-text modalities participate by extracted text until later. The repo reinforces that reality by saying it does not yet perform HTML/PDF/document parsing, live upstream fetching, or durable job orchestration. The PRD should therefore reject any move that lets image/audio/video semantic ambition outrun the text-first refinery and cache substrate. fileciteturn8file15 fileciteturn17file0

The second non-goal is **not** to collapse provenance, memory, and convenience into one undifferentiated store. Truth tiles are not the same as temporal projections, which are not the same as activation states, which are not the same as compiled contexts, which are not the same as docs-intelligence findings, which are not the same as operator dashboards. The repo’s `rosetta-store` even makes this clear at the smallest level: it is currently a simple in-memory tile store with rights checks and direct CID lookup, not a magical everything database. fileciteturn26file0 fileciteturn8file15

The third non-goal is **not** to implement one universal score that decides everything. The product will rank things, but it will do so through domain-local and decision-local vector comparisons, guardrails, and tie-breakers. Trust, relevance, urgency, novelty, contradiction pressure, and decay are not substitutable currencies. A high-value, urgent, novel claim with low trust does not deserve the same treatment as a well-supported but less urgent correction, and the system must represent that difference explicitly. fileciteturn8file3

The fourth non-goal is **not** to treat read-only projections as constitutional truth. The repo is very clear: OB1, Prism, and Mission Control are read-only sidecar, shadow, or operator-shell views right now. The constitutional center remains Rosetta tiles, receipts, source substrate, and canonical cache. The PRD therefore must forbid projection shells from becoming silent shadow authorities. fileciteturn28file0 fileciteturn16file0

The fifth non-goal is **not** to describe docs-intelligence extraction as if it were already runtime Rosetta ingestion. The repo intake policy explicitly forbids that conflation. This PRD adopts that prohibition because it is exactly the kind of semantic dishonesty that makes systems look farther along than they are, while quietly rotting the conceptual model underneath. fileciteturn25file0

## Constitutional architecture

### Rosetta as the constitutional core

Rosetta v3.0.0 says the core is intentionally minimal, stable, and extensible: content-addressed tiles, explicit provenance, distinct raw observations and interpretations, universal operational tracing, and attachable packs instead of core mutation. The repo confirms that this isn’t just doctrine; packages like `rosetta-canon`, `rosetta-cid`, `rosetta-core`, `rosetta-schemas`, `rosetta-receipts`, and `rosetta-tapestry` already exist as an implementation spine. That means the PRD should define Rosetta not as a future metaphor, but as a stabilized kernel around which Entif’s more volatile concerns can evolve. fileciteturn5file1 fileciteturn28file0

The Rosetta operational spine remains the familiar chain of `Run → Action → ToolCall → Observation → Evaluation`, but Doctrine v0.2 adds a stricter law: every meaningful step must emit or be bound to a receipt artifact, and every verified claim must be supportable through receipt-bundle closure. The current repo state makes that law highly actionable because `rosetta-receipts` already creates receipts as Rosetta tiles, derives digests from canonical bodies, signs CIDs using Ed25519 keypairs, verifies signed receipts cryptographically, and checks bundle closure against a tile store. That is a major implementation foothold. fileciteturn8file14 fileciteturn27file0

### The source substrate

One of the strongest themes in your broader canon is that “a source” is not a monolith. A single dataset or document may have a host system, a claimed creator, supporting identity evidence, one or more manifestations, one or more packages, one or more correction events, several access-policy surfaces, and several trust or moderation assumptions. The source-registry annex says Entif should store those as linked but distinct facts. The repo’s `source-substrate` package now confirms that this modelling intent is concrete: it already models source-system profiles, records, manifestations, packages, trust matrices, and correction events, and emits each of those as Rosetta tiles. That package should be treated as one of the constitutional pillars of Entif, not as an optional later enhancement. fileciteturn9file16 fileciteturn18file0

The `source-registry` package extends that by shipping curated source-system profiles and registry entries with trust class and priority tier, then emitting registry-entry tiles. The repo explicitly admits that it does **not** yet fetch from DataCite, Crossref, ORCID, ROR, OpenAlex, or repository registries, and that provenance receipts for registry refreshes do not exist yet. That gap should become an explicit product milestone rather than an implicit “someday” wish. The PRD should define registry refresh as a future acquisition lane with its own receipts, drift detection, and correction propagation. fileciteturn24file0

### The ingress refinery

Doctrine v0.2 calls the ingress refinery “Pillar Zero,” and the repo now gives us the exact package that must embody that principle. `ingress-refinery` turns source-aware inputs into canonical artifacts plus linked provenance receipts. It currently creates parse-only ingress jobs, normalizes supplied text, generates fetch/normalization/evaluation receipts, builds canonical artifacts with PID, rights, and dedupe metadata, and emits a bootstrap demo snapshot stitching the whole flow together. It is still fixture-backed and does not yet fetch live upstream sources or parse HTML/PDF/document content, but the core contract surface already exists. That is the right place to root all assimilation logic, and the PRD should insist that every new ingestion family plug in **behind** this boundary rather than inventing bespoke shadow pipelines. fileciteturn17file0

The refinery is also where several of your session concerns should become hard requirements: dedupe, prioritization, trust vectors, revision detection, decay hints, value estimates, rights classification, and raw-artifact preservation. In other words, if the source substrate is “what the world says exists,” the refinery is “what we can honestly promote from what the world supplied us.” That distinction needs to stay crisp because it protects the system against premature overinterpretation and against silently treating fetched data as if it were already settled internal truth. fileciteturn17file0 fileciteturn8file15

### The canonical corpus cache

The canonical cache is where Rosetta’s constitutional truth begins to acquire practical retrieval shape. The repo’s `canonical-cache` package already does several important things correctly: it ingests canonical artifacts into an in-memory cache; indexes by byte identity, manifestation identity, record family, and conceptual cluster; dedupes repeated normalized content by content fingerprint while retaining each raw evidence artifact CID; links materially changed content into a record-family revision chain; persists and reloads bootstrap cache state from a local JSON path; marks only byte and manifestation matches as merge-eligible; and retains correction events without deleting prior state. That is a sharply defined posture, and it should be preserved. fileciteturn19file0

The repo also says what the cache is **not** yet: it is not database-backed, it does not have rich retrieval APIs, it does not yet implement evidence-gated merge workflows, and it is not ready for large-scale corpus operations. This matches the doctrine’s staged-storage rule almost perfectly: bootstrap can be local content-addressed storage plus SQLite, while Text-Core / Alpha RC should shift to Postgres JSONB, row-level rights enforcement, pgvector, and later richer graph/activation planes. The PRD should therefore promote “replace or augment the in-memory canonical cache with durable queriable storage” into one of the highest-priority next slices, not because the current cache is bad, but because the repo itself makes clear that bulk ingest should remain blocked until that step happens. fileciteturn19file0 fileciteturn8file15

### Guard, store, and projections

The repo’s `rosetta-guard` package offers the first honest minimum policy engine: simple action/resource-prefix matching, deny-side-effects-by-default in parse-only mode, allow read-like actions when rules permit, and emit guard decisions as tiles. The doctrine and spec material want much more over time—temporal or actor-aware authorization, decision tokens, policy version binding, replay refusal, and richer capability semantics—but the current minimum is already correctly shaped. The PRD should therefore keep the expanding policy engine on the roadmap while refusing to regress on the deny-by-default parse-only baseline. fileciteturn20file0 fileciteturn6file17

The `rosetta-store` package is similarly modest and similarly important. It is a simple in-memory tile store with rights checks, storing tiles by CID, guarding reads by right scopes, and resolving multiple tiles by CID. That might seem humble, but it is exactly the right constitutional posture: rights enforcement belongs at the storage/retrieval boundary. The doctrine explicitly forbids “retrieve then filter later” for sensitive or scoped data. The PRD should reinforce that rule and ensure that every future durable store inherits it. fileciteturn26file0 fileciteturn8file15

Finally, the projections posture must remain read-only until much later. The README and repo-shape doc both say that OB1, Prism, and Mission Control are projected read-only surfaces, not authorities. That should remain the rule in this PRD. Entif may expose many useful views—operator shells, dashboards, prioritization boards, knowledge maps, issue boards, and external read-like APIs—but none of those surfaces should become a shortcut around Rosetta’s constitutional truth and receipt rules. fileciteturn28file0 fileciteturn16file0

## Detailed functional requirements

### Source registry and evidence intake

The system shall maintain a **versioned source registry** as a first-class product surface. Every supported source family—Google Drive docs, GitHub repositories, scholarly repositories, blogs, news sites, email systems, discussion threads, internal wikis, future APIs—shall have a source-system profile describing identifiers, access properties, authority assumptions, lifecycle behavior, moderation expectations, rights posture, and refresh mechanics. These profiles must be versioned as receipted artifacts rather than mutable blobs. Identity resolution and source capability detection shall be represented as evidence-producing work, not silent side effects. fileciteturn9file16 fileciteturn24file0

The system shall support a separate **source record layer**, representing the individual fetched or discovered object under a source system, and a **manifestation layer**, representing concrete forms such as raw bytes, exported PDFs, normalized text, or structured packages. The source substrate already models source-system profiles, records, manifestations, packages, trust matrices, and correction events. The PRD therefore requires every new ingestion family to map cleanly into those existing layers rather than inventing its own shadow ontology. fileciteturn18file0

The system shall preserve **raw-artifact permanence** even when activation, retrieval, or operator surfaces gravestone or suppress derived views. That means raw bytes or equivalent immutable evidence handles must remain recoverable in cold or sealed storage, while downstream projections, embeddings, caches, summaries, or companion artifacts may be cooled, rebuilt, or suppressed under retention policy. This requirement is the cleanest implementation of your “gravestoned tiles but preserved provenance” concern and follows directly from the doctrine’s pruning law and raw-capture preservation law. fileciteturn8file15

### Refinery behavior

The system shall treat the ingress refinery as the **only approved promotion boundary** for new assimilation families. Every new source adapter—whether for GitHub, Google Drive, DataCite, Crossref, Zenodo, local markdown files, or future internal systems—shall emit parse-only ingress jobs into the refinery contract rather than writing straight into canonical cache or bypassing Rosetta receipts. This is already how the repo wants to evolve the fixture-backed refinery into live acquisition, and the PRD should make that invariant explicit. fileciteturn17file0

Within the refinery, the system shall perform deterministic low-cost work before expensive semantic work. At minimum, that includes canonical byte capture, timestamp and chronology normalization, dedupe fingerprint generation, revision detection, rights classification, source-family typing, claimed-author capture, identity-evidence linkage when present, policy screening, and candidate evaluation-vector initialization. Only after those steps pass should the system attempt more semantic extraction or promotion. fileciteturn8file15

The system shall generate **receipts for meaningful transform steps**. The repo already says the refinery can generate fetch, normalization, and evaluation receipts, and the handoff confirms that source-to-observation tiling and transform receipts are part of the merged Text-Core work. The PRD therefore requires each refinement stage—fetch, normalize, classify, dedupe decision, revision link, source-to-observation transform, extract, promote, compile—to either mint a receipt directly or become an explicit subject inside a receipt bundle. fileciteturn17file0 fileciteturn13file0

### Dedupe, revision, conflict, and trust

The system shall distinguish at least four related but non-identical relationships: **same bytes**, **same manifestation**, **same record family with material revision**, and **conceptually related but not merge-safe**. The canonical cache already operationalizes this by indexing across byte identity, manifestation identity, record-family identity, and conceptual cluster, while allowing merge eligibility only for the first two. That subtlety is exactly right and should be preserved in the product requirements. fileciteturn19file0

The system shall support explicit **correction events** and **non-destructive revision chains**. Corrections must not silently overwrite prior state. Materially changed content should create revision links; corrected or superseded records should remain traceable. This is already in the source substrate and canonical cache, and it should become part of the public product promise because it underpins trust and auditability. fileciteturn18file0 fileciteturn19file0

The system shall persist **candidate evaluation vectors** rather than one total score. At minimum, every promotable or retrievable candidate shall carry: relevance, novelty, value-add, resilience, urgency, trust, contradiction pressure, legal sensitivity, verification cost, dedupe confidence, expected decay, and revisit guidance. Different policy lanes will then use different ordering rules. For example, a “hot working context” lane may care more about urgency and marginal value-of-information; a “memory hardening” lane may care more about trust, corroboration, and stability; and a “quarantine review” lane may care most about contradiction pressure and legal sensitivity. This is the correct architectural answer to the earlier scoring objection, and the PRD adopts it fully. fileciteturn8file3

The system shall treat **trust** as an evidence-producing dimension, not a vibe. The repo README explicitly says no evidence-derived trust scoring engine exists yet; the trust matrix currently remains a formal model plus bootstrap fixture values. The source-substrate README similarly says live identity resolution and evidence-derived trust scoring do not yet exist. This PRD therefore treats trust as a staged implementation area: the schema and vector fields must exist now, bootstrap values may exist for fixtures and curated source profiles, but true trust scoring remains future work that depends on live evidence accumulation and adjudication. fileciteturn28file0 fileciteturn18file0

### Retrieval, memory, and compiled context

The system shall support three memory planes as doctrine requires: **truth/provenance**, **temporal state/history**, and **activation/recall**. The truth plane stores immutable receipted artifacts. The temporal plane stores historical state transitions and time-aware projections. The activation plane stores recency, frequency, association, and proactive trigger logic for “what should surface first.” That separation must survive all implementation detail, because it is the cleanest answer to your earlier questions about rate-of-decay, future prunability, revisit timing, and revisionary subject matter. Truth remains; temporal meaning evolves; activation cools and rewarms. fileciteturn8file15

The system shall implement **promotion**, **cooling**, **revisit scheduling**, and **quarantine** as explicit state transitions, not hidden behavior. Promotion means an item has become reusable enough to feed compiled context or higher-product artifacts. Cooling means it remains true but loses hot-surface priority. Revisit means the system believes the item’s topic, trust posture, or known revision velocity merits future re-checking. Quarantine means the system refuses to promote or act on the item until contradiction, legal, or trust concerns are resolved. This gives you a direct and honest mechanism for “how do we determine assumed prospective rate-of-decay, future prunability, when to revisit, and how revisions relate to what is already known.” fileciteturn8file15 fileciteturn9file16

The system shall compile **tapestries / context bundles** as traceable products. The README lists `rosetta-tapestry` as a package for receipt-bundle tapestry compilation; the doctrine and backlog also insist on English accompaniment and inspection surfaces. The PRD therefore requires compiled contexts to carry: participating artifact refs, excluded artifact refs where relevant, rights scope, policy refs, stable-prefix eligibility, evidence density summaries, uncertainty markers, and human-readable accompaniment sufficient for explain and audit interfaces. fileciteturn28file0 fileciteturn8file12

### Agent orchestration and workflows

The system shall treat **agent orchestration as a typed, replayable workflow system**, not as invisible prompt spaghetti. The orchestration design notes already specify tiered leadership, executor specialization, scoped reusable skills, immutable manifests, idempotent payloads, durable archival, replayability, and message-bus behavior with DLQ support. This PRD adopts that structure. The primary orchestrator should construct explicit workflows over typed tasks and skills, each with manifests, receipt subjects, validation expectations, and time/cost budgets. State should live in step-versioned manifests, not merely in growing prompt histories. fileciteturn9file1 fileciteturn9file2

The system shall treat **docs intelligence extraction** as a first-class orchestration domain. The repo intake README already defines the workflow: run `docs:intake`, inspect the ledger, prioritize documents, use extraction templates, emit structured findings with locators/tags/subjects/evidence/confidence/action recommendations, then promote selected findings into issue drafts or GitHub issues after orchestration review. This is a product requirement now, not just internal process. Entif must be able to use its own constitutional substrate to coordinate the extraction of requirements from its governing corpus without claiming that the runtime substrate is already fully semantically ingesting that corpus. fileciteturn25file0

### Inspection and operator surfaces

The system shall expose three mandatory operator modes: **summary**, **explain**, and **audit**.

Summary mode answers practical questions: what happened, what is most relevant, what changed, what is blocked, and what is next. Explain mode answers trust-building questions: why did this item surface, what evidence supports it, what alternatives were considered, what confidence and contradiction pressures exist, and what policy lane controlled it. Audit mode answers provenance and compliance questions: which receipts bind this decision, what bundle closure exists, which rights scope applied, which decision token or denial was involved, and what revision chain or correction events matter. The backlog’s English-accompaniment and inspector-web work, together with the repo apps map (`rosetta-cli`, `rosetta-api`, `rosetta-operator`), make this a very practical next product slice. fileciteturn8file12 fileciteturn28file0

## Data model and implementation scaffolding

### Current monorepo-aligned shape

The repo itself already provides the most honest near-term implementation scaffold. The monorepo has `apps/`, `packages/`, `packs/`, and `docs/`, with apps for CLI, API, and future operator shell; packages for the Rosetta kernel, source intelligence, intake/refinery/cache/projections; and packs for at least `rrp`, `stdpack-source-substrate`, and `vocabpack-source-taxonomy`. The PRD should lean into that shape rather than abstracting it away, because it is already the skeletal expression of the architecture. fileciteturn16file0 fileciteturn28file0

The following directory shape should therefore be considered normative for the next product stage:

```text
apps/
  rosetta-cli
  rosetta-api
  rosetta-operator

packages/
  rosetta-canon
  rosetta-cid
  rosetta-core
  rosetta-schemas
  rosetta-receipts
  rosetta-guard
  rosetta-tapestry
  rosetta-store
  source-substrate
  source-registry
  ingress-refinery
  canonical-cache
  projection-adapters

packs/
  rrp
  stdpack-source-substrate
  vocabpack-source-taxonomy

docs/
  governance/
  backlog/
  handoffs/
  intake/
  RFCs/
  PRDs/
  live/
```

That shape is already reflected in the repo’s README and governance constraints, and it is coherent with the Drive doc ledger, which enumerates the RFC/governance/backlog/live surfaces expected under `docs/`. fileciteturn28file0 fileciteturn16file0 fileciteturn6file11

### Canonical Rosetta envelope

The repo implementation status and the core spec jointly justify a strongly typed envelope-first approach. The code below is not a speculative fantasy; it is the natural product-facing formalization of what the repo packages and the Rosetta v3 doctrine already say they are doing.

```ts
export type CID = string;
export type RID = string;

export interface TileEnvelope {
  kind: string;                    // rosetta.run, rosetta.observation, etc.
  cid?: CID;                       // canonical body hash
  rid?: RID;                       // stable handle when warranted
  nonce: string;                   // signer / collision / issuance nonce
  createdAt: string;               // ISO-8601
  authorRef?: string;              // agent, user, service principal
  runRef?: CID;                    // parent run
  derivedFrom?: CID[];             // provenance lineage
  prev?: CID[];                    // superseded / replaced artifacts
  policyRef?: CID;                 // active policy or compliance profile
  rightsScopeRef?: CID;            // tenant / workspace / clearance boundary
  summaryRef?: CID;                // optional English accompaniment
}
```

This envelope model is consistent with Rosetta’s doctrinal distinction between CIDs and optional stable identity handles, with the repo’s explicit package split between canonicalization, CIDs, core tiles, receipts, schemas, and store behavior. fileciteturn5file1 fileciteturn28file0

### A receipt model that matches the real pack

The repo now gives us a stronger answer than the earlier synthetic draft because `packs/rrp/pack.json` and `packs/rrp/schema/receipt.schema.json` are accessible. The pack manifest is explicitly tied to `ROCK-3111-C`, advertises JSON Schema, SHACL, vocab, examples, and test vectors, and declares compatibility with Rosetta core versions `>=3.0.0` and `<4.0.0`. The receipt schema itself requires `claims`, `digests`, `policyRefs`, `receiptType`, and `subjects`, and then structures evidence as CID-linked objects with optional spans. That is strong enough to promote a more code-aligned baseline schema in the PRD. fileciteturn22file0 fileciteturn23file0

```ts
export interface ReceiptSubject {
  cid: CID;
  role?: string;
}

export interface ReceiptEvidenceRef {
  cid: CID;
  span?: string;
}

export interface ReceiptClaim {
  claimType: string;
  statement: string;
  verdict: string;
  confidence?: number;
  evidence: ReceiptEvidenceRef[];
}

export interface ReceiptDigest {
  alg: string;
  of: string;
  digest: string;
  cidRef?: CID;
}

export interface RRPPayload {
  receiptType: string;
  subjects: ReceiptSubject[];
  claims: ReceiptClaim[];
  digests: ReceiptDigest[];
  policyRefs: CID[];
}
```

The more important implementation point is not the interface shape itself, but the **receipt discipline** it encodes: all nontrivial assertions should be able to point back to subject CIDs, evidence CIDs, digest material, and active policy refs. The receipts package already signs receipt CIDs and verifies bundle closure, which means the next leap in product value comes not from reinventing schema, but from deepening evidence semantics, policy resolution, and trust-chain management around the already-working mechanics. fileciteturn27file0

### Source-aware artifact model

The source-substrate and source-registry packages justify formalizing a product-wide source model. The following schema is the minimum honest version of that model.

```ts
export interface SourceSystemProfile {
  sourceId: string;                // e.g. source:zenodo
  displayName: string;
  roles: string[];                 // repository_platform, registry, publisher, etc.
  identifiersSupported: string[];  // doi, orcid, ror, swhid, md5...
  moderationDepth?: "low" | "medium" | "high";
  peerReviewEquivalent?: boolean;
  rightsDefaults?: string[];
  lifecycleSignals?: string[];     // correction, retraction, supersession...
  refreshStrategy?: "manual" | "scheduled" | "event-driven";
}

export interface SourceRecord {
  recordId: string;
  sourceId: string;
  claimsCreator?: string[];
  identityEvidenceRefs?: CID[];
  versionLabel?: string;
  sourceUrl?: string;
  correctionRefs?: CID[];
  trustVector?: Record<string, number>;
}

export interface Manifestation {
  manifestationId: string;
  recordId: string;
  mediaType: string;
  contentDigest?: string;
  byteCid?: CID;
  normalizedTextCid?: CID;
  accessPolicyRef?: CID;
}
```

This shape deliberately preserves the repo and annex distinction between **source-system profile**, **record**, **manifestation**, **identity evidence**, **correction**, and **trust posture** instead of collapsing them into one pseudo-document blob. That separation is one of the most important anti-fuckery choices in the whole architecture. fileciteturn18file0 fileciteturn24file0 fileciteturn9file16

### Candidate evaluation vectors

Your scoring objection deserves to be encoded, not merely discussed. The runtime needs a formal vector that is rich enough to survive different decision types.

```ts
export interface CandidateEvaluationVector {
  subjectRef: CID;
  topicRef?: RID;
  lane: "hot" | "warm" | "cool" | "cold" | "quarantine";

  relevance: number;               // 0..1
  novelty: number;                 // 0..1
  valueAdd: number;                // 0..1
  resilience: number;              // 0..1
  urgency: number;                 // 0..1
  trust: number;                   // 0..1

  contradictionPressure: number;   // 0..1
  legalSensitivity: number;        // 0..1
  verificationCost: number;        // 0..1
  dedupeConfidence: number;        // 0..1

  expectedDecayDays?: number;
  revisitBy?: string;              // ISO-8601
  revisionVelocity?: "slow" | "medium" | "fast";
  decisionBasis: string[];
}
```

The policy engine should then apply **gates first, ranking second**. That means the runtime does not compute one total score and hope for the best. Instead, it hard-fails illegal or rights-violating items, quarantines low-trust/high-urgency contradictions that need review, and only then ranks survivors according to the lane-specific decision. That is a direct implementation of the “no single master score” doctrine implied by your corrections and the OMOC/token-efficiency discussion. fileciteturn8file3

A simple version of that logic looks like this:

```ts
function placeCandidate(v: CandidateEvaluationVector): "reject" | "quarantine" | "promote" | "cool" {
  if (v.legalSensitivity > 0.8 && v.trust < 0.6) return "quarantine";
  if (v.dedupeConfidence > 0.98 && v.novelty < 0.1) return "cool";
  if (v.trust < 0.35 && v.urgency < 0.4) return "cool";
  if (v.contradictionPressure > 0.7 && v.trust < 0.7) return "quarantine";
  if (v.relevance > 0.75 && v.valueAdd > 0.6 && v.trust > 0.55) return "promote";
  return "cool";
}
```

Then each lane can sort on its own terms:

```ts
function rankHotLane(a: CandidateEvaluationVector, b: CandidateEvaluationVector) {
  return (
    (b.urgency - a.urgency) ||
    (b.valueAdd - a.valueAdd) ||
    (b.relevance - a.relevance) ||
    (a.verificationCost - b.verificationCost)
  );
}

function rankHardeningLane(a: CandidateEvaluationVector, b: CandidateEvaluationVector) {
  return (
    (b.trust - a.trust) ||
    (b.contradictionPressure - a.contradictionPressure) ||
    (b.relevance - a.relevance) ||
    (b.resilience - a.resilience)
  );
}
```

This is not meant to be the final math. It is meant to lock in the correct decision-theoretic shape: **context-local policy, hard gates, and lane-specific orderings instead of one false universal metric**. fileciteturn8file3

### Pack conformance as a live implementation axis

One of the most important repo-specific discoveries is that pack conformance is not merely theoretical anymore. The current handoff says the active branch computes deterministic `rosetta-pack-id-v1` values from pack metadata plus sorted file hashes, verifies declared `pack_id`, checks declared entrypoint/export paths, and rejects self/cyclic `depends_on` relationships. The existing `packs/rrp/pack.json` shows what that looks like in practice: schema pointer, pack id, doc id (`ROCK-3111-C`), category, namespace, entrypoints, exports, compatibility range, ownership, and traceability metadata. That means the PRD should elevate pack conformance from “good hygiene” to “release-gating requirement.” fileciteturn13file0 fileciteturn22file0

A normalized pack manifest baseline should look like this:

```json
{
  "$schema": "../_schemas/pack-manifest.schema.json",
  "id": "rrp",
  "pack_id": "cidv1-sha256-...",
  "kind": "pack",
  "category": "SchemaPack",
  "namespace": "rrp",
  "doc_id": "ROCK-3111-C",
  "version": "0.1.0",
  "status": "draft",
  "title": "Rosetta Receipt Pack",
  "compatible_core": {
    "min": "3.0.0",
    "max_exclusive": "4.0.0"
  },
  "entrypoints": {
    "schema": ["schema/receipt.schema.json"],
    "shacl": ["shacl/receipt.shacl.ttl"],
    "tests": ["test-vectors/receipt-pass.json"]
  },
  "depends_on": [],
  "exports": [
    { "kind": "json-schema", "id": "rrp.receipt", "path": "schema/receipt.schema.json", "version": "0.1.0" }
  ],
  "source_of_truth": {
    "doctrine": "Doctrine v0.2",
    "traceability_required": true
  }
}
```

This is precisely the kind of package discipline that will keep the wider Rosetta/Entif universe from dissolving into hand-wavy attachment culture. fileciteturn22file0

## Security, compliance, retention, and operating economics

### Guardrails and rights enforcement

The repo and doctrine are aligned on the most important safety baseline: **deny-by-default parse-only execution**. The current `rosetta-guard` package already denies side effects by default, allows explicitly permitted read-like actions in parse-only mode, and emits guard decisions as tiles. The doctrine wants that to grow into short-lived decision tokens, policy-version binding, subject/tool/resource caps, and replay refusal; the spec sheet also says side-effecting operations require fresh guard decisions. The PRD therefore makes the following rule non-negotiable: no side effects are permitted from passive or ambient lanes, and every transition into action-authorized mode must be explicitly receipted. fileciteturn20file0 fileciteturn6file17 fileciteturn8file15

Rights enforcement belongs **before retrieval**, not after it. The doctrine states this directly, and the current `rosetta-store` package already embodies it in miniature by guarding reads by rights scopes. In production form, this must carry through to durable storage, compiled contexts, projections, and operator surfaces: a forbidden tile should never be loaded into a context bundle in the first place just so a later filter can hide it. That is both a security requirement and an architectural cleanliness requirement. fileciteturn26file0 fileciteturn8file15

### HIPAA, HITECH, and policy-pack posture

On the external standards side, the most relevant current official check in this pass is HHS’s HIPAA Security Rule guidance. HHS states that the Security Rule establishes national standards to protect electronic protected health information, applies to covered entities and business associates, and requires appropriate administrative, physical, and technical safeguards. HHS also emphasizes that the rule is designed to be **flexible, scalable, and technology neutral**, and OCR notes that a proposed rule update was issued in late 2024 to strengthen cybersecurity protections for ePHI. The implication for this PRD is straightforward: any HIPAA/HITECH profile should be implemented as a **policy-pack overlay** on the Rosetta/Entif substrate, not as a brittle one-off hard-coded branch. The substrate must be able to carry stricter audit, access, incident, and retention behaviors per data class and tenant without changing the constitutional core. citeturn3search0turn3search1turn3search5

The same architectural stance should be applied to privacy-regime and financial-record overlays more broadly, even where this pass has not done a full official-source deep dive for every cited regime. In other words: GDPR-ish minimization/erasure expectations, SEC/WORM-style retention expectations, and sector-specific constraints should be expressed through policy packs, retention packs, and profile-bound workflow rules that attach to Rosetta’s constitutional substrate rather than fork it. That is not a legal opinion; it is the most robust engineering posture given the doctrine, source-registry annex, and repo’s clear pack-orientation. fileciteturn6file17 fileciteturn13file0

### Retention, gravestoning, and provenance continuity

Your retention concern deserves a cleaner product answer than “append-only forever” or “delete everything on request.” The right model is a **layered lifecycle state machine**:

- truth-plane artifact state
- projection visibility state
- activation heat state
- legal/tenant retention state
- correction/supersession state

In practice, an artifact may remain constitutionally present while simultaneously being cooled out of hot retrieval, hidden from a tenant view, retracted by correction, or replaced in a compiled context. That means the product should support states such as `active`, `restricted`, `superseded`, `sealed`, `hidden_from_projection`, `legally_retained`, and `pending_erasure_review`, rather than forcing one binary present/deleted model. This is the only clean way to respect both provenance continuity and lawful/tenant-sensitive suppression behaviors. It follows directly from the doctrine’s pruning law, the source-registry invalidation posture, and your gravestone concern. fileciteturn8file15 fileciteturn9file16

### Prompt economics and stable-prefix strategy

The architecture also needs an explicit cost posture. OpenAI’s current prompt-caching documentation says prompt caching works automatically on recent models, depends on exact prompt-prefix reuse, begins at 1,024 tokens in 128-token increments, exposes a `cached_tokens` field, and isolates caches across organizations. That has a direct design consequence for Entif: static, high-value, reused content—core instructions, pack manifests, schemas, stable routing rules, fixed tool contracts, invariant domain scaffolding—should be compiled into reusable prefix blocks, while dynamic task/user/tenant/context deltas should be appended near the tail. This is not a minor optimization; it is a first-class runtime design principle if you want to avoid hemorrhaging spend in multi-agent loops. citeturn3search3turn3search4

This cost posture also reinforces your earlier insight that novelty, relevance, value-add, and resilience are not only business-selection axes but also **token-selection axes**. Every retrieval candidate and every compiled-context element should answer: why are you here, what marginal value do you add, how likely are you to decay quickly, and can you be kept out of the hot path without harming task quality? That is the right place to operationalize token discipline—not as hand-wavy pruning, but as lane-specific promotion, cooling, and stable-prefix design. fileciteturn8file3

### Message buses, idempotency, and durability

The repo itself is not yet at durable job orchestration, but your orchestration notes already say the workflow substrate should use immutable manifests, message-bus semantics, dead-letter handling, replayability, and durable archival. The PRD adopts that design because it aligns perfectly with the constitutional receipt posture. The high-level rule should be: workflows are replayable and idempotent because the manifest, receipts, and state transitions are explicit, not because the system relies on operator memory or lucky context retention. Side effects should key off idempotency identifiers and receipt subjects so that retries, partial failures, and resumptions do not silently duplicate work. fileciteturn9file1 fileciteturn13file0

## Phased roadmap, acceptance criteria, and limitations

### Immediate baseline after incorporating `crates/rosetta`

The most important update from the fork is that the earliest roadmap stage is no longer “build the kernel.” The kernel exists. The correct next stage is **finish hardening and boundary enforcement around what already exists**. Specifically: keep pack conformance and receipt-pack correctness moving, preserve docs intelligence as the active planning lane, avoid major shell/UI creep, and do not begin broad live-source ingestion until the refinery boundary and canonical cache durability are ready. That is exactly what the current handoff and bootstrap execution track already say, and the PRD should follow them rather than competing with them. fileciteturn13file0 fileciteturn15file0

### Constitutional hardening phase

The first phase should harden the constitutional surfaces that are already in the repo.

The first slice is **pack conformance completion**. You already have active work around ROCK-3111-C pack IDs and dependency cycle detection. Finish that, then add required root-file enforcement, traceability-header enforcement, and broader CI enforcement across packs. The RRP pack manifest and schema should become the exemplar template every future pack must satisfy. Acceptance means deterministic pack IDs, conformance tests passing, cycle detection enforced, and pack metadata sufficient to support automated documentation and compatibility reasoning. fileciteturn13file0 fileciteturn22file0 fileciteturn23file0

The second slice is **receipt semantics hardening**. The mechanics are already real: creation, signing, bundling, and closure verification. The next work is semantic hardening: richer evidence typing, stronger policy artifact linkage, key lifecycle posture, and deeper validation around evidence claim semantics. Acceptance means not only structural closure but also policy/evidence interpretability sufficient for real explain/audit views. fileciteturn27file0

The third slice is **rights and guard hardening**. Today’s parse-only rule engine is correct but intentionally minimal. The next work is actor-aware or tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, and audience binding. Acceptance means the system can prove, with receipts, why a read-like action was allowed, why a side effect was denied, and under which policy scope that happened. fileciteturn20file0 fileciteturn6file17

### Text-Core completion phase

The second phase should complete the Text-Core MVP gate around what the repo handoff already calls TC-001 through TC-004 and their follow-ons.

The first slice is **TC-005 and promotion state machinery**. The handoff explicitly says TC-005, TC-006, and TC-007 remain open implementation candidates after TC-001 through TC-004 landed. The PRD should define TC-005 around promotion states, structured extracts, cooling/revisit/quarantine states, and extract receipts. Acceptance means the refinery can produce source observations and structured extracts without pretending those extracts are the same thing as raw evidence. fileciteturn13file0

The second slice is **durable canonical cache**. The current cache is in-memory with local JSON persistence. That is exactly the right bootstrap posture and exactly the wrong long-term scale posture. Move the cache to durable storage—per doctrine, Postgres JSONB plus row-level rights enforcement is the clearest baseline—and preserve byte identity, manifestation identity, record-family revision chains, conceptual clustering, correction retention, and merge-eligibility rules. Acceptance means bootstrap fixtures can be replayed into durable storage with identical semantic outcomes, and the cache no longer blocks broader ingest on durability grounds. fileciteturn19file0 fileciteturn8file15

The third slice is **English accompaniment and inspecting surfaces**. The backlog has already named this, and it should happen before large-scale operator rollout. Build summary/explain/audit views over runs, receipts, registry entries, cache clusters, and promotion decisions. Acceptance means a human can inspect a promoted claim or compiled context without spelunking raw JSON or repo docs. fileciteturn8file12

The fourth slice is **live-source adapter introduction behind the refinery boundary**. The bootstrap execution track explicitly says to add real acquisition adapters behind the refinery boundary after pack/schema hardening. Start with one or two high-value families that match your near-term workflow needs and the source-registry doctrine—likely GitHub metadata/files and Google Drive documents already in your active scope—then later branch outward into repository registries such as DataCite or Crossref. Acceptance means the same refinery contracts and receipts are used for live-acquired artifacts as for fixtures. fileciteturn15file0 fileciteturn24file0

### Memory-plane expansion phase

The third phase should add deeper memory behavior only after Text-Core is honestly useful.

The first slice is **temporal plane implementation**. The doctrine and phased backlog already imagine temporal adapters / native temporal plane work with episodic ingest, temporal edges, evolving-state projection, and time-aware retrieval APIs. Acceptance means the system can answer questions where past and present truths must not collapse into one undifferentiated memory mass. fileciteturn8file12 fileciteturn8file15

The second slice is **activation plane implementation**. This is where recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, and proactive reminder policies live. Acceptance means the system can surface the right memory first without deleting colder truths, and can explain why something surfaced now. fileciteturn8file12 fileciteturn8file15

The third slice is **route-plan and conceptual mixture integration**. The protocol sheet and OMOC notes already argue for an ontology/concept-mixture-aware routing layer rather than simplistic role-expert routing. Acceptance means compiled routes can explain conceptual overlaps, specializations, and why a certain council or skill set was invoked. fileciteturn6file17

### Documentation-intelligence and issue-orchestration phase

The fourth phase should make the repo’s docs-intelligence lane part of the actual product.

The first slice is **extraction artifact standardization**. Use the repo’s docs-intelligence workflow to formalize extraction outputs as structured artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, and authority class. Acceptance means those extractions are easy to promote into issue drafts, project-board views, or roadmap maps without being mislabeled as runtime Rosetta ingestion. fileciteturn25file0

The second slice is **issue-promotion pipeline**. The repo already uses local issue drafts as a review gate before publishing GitHub issues, then records issue URLs and state changes in a ledger. Productize that. Acceptance means the system can take structured findings from docs intelligence, group them into candidate issue drafts, request orchestration review, and publish/track them with full provenance. fileciteturn25file0 fileciteturn13file0

### Explicit acceptance criteria for the next release family

A serious “next green state” should require all of the following.

Rosetta receipts and pack conformance are green for the core packs and test vectors. The handoff already shows focused validation targets and pack-conformance checks in flight; keep that rigor. fileciteturn13file0

The canonical cache works against durable storage without violating current match/merge semantics. fileciteturn19file0

At least one live source family runs through the same refinery contract that fixtures currently use. fileciteturn17file0 fileciteturn15file0

Read-like retrieval stays rights-scoped at the storage boundary and guard decisions are receipted. fileciteturn20file0 fileciteturn26file0

The operator can inspect summary, explain, and audit surfaces without rereading the entire docs corpus or spelunking the whole repo. fileciteturn8file12 fileciteturn28file0

Docs intelligence remains clearly separated from runtime Rosetta-native ingestion, but issue extraction and planning artifacts become genuinely useful and current. fileciteturn25file0

### Open questions and limitations

This updated PRD is materially stronger than the prior draft because it now includes the actual `crates/rosetta` fork and correlates it to the Drive canon. Even so, a few boundaries remain.

The repo fetches in this pass were targeted rather than exhaustive. I pulled and correlated the repo README, current handoff, bootstrap execution track, repo shape constraints, intake policy, the ingress-refinery/source-substrate/source-registry/canonical-cache/guard/store/receipts package READMEs, and the live RRP pack manifest plus receipt schema. That is enough to anchor the product architecture very strongly, but it is not the same as a full file-by-file audit of every package implementation. The PRD is therefore **code-aligned**, but not yet a comprehensive source-code commentary. fileciteturn28file0 fileciteturn13file0

The external web-check portion of this pass is deliberately narrow: it verifies key current guidance from HHS on HIPAA/HITECH Security Rule posture and from OpenAI on modern prompt caching. Those are trustworthy and recent anchors, but they are not yet a full official-source pass across every standard you named earlier, such as broader privacy regimes, SEC retention specifics, or additional ontology/provenance standards. Those should be expanded in a later compliance-focused pass before production deployment claims are made. citeturn3search0turn3search1turn3search5turn3search3turn3search4

The biggest strategic takeaway, though, is not an uncertainty. It is a confirmation: the repo and the Drive canon are now sufficiently aligned that you can stop treating Rosetta as a purely speculative superstructure and start treating it as a real constitutional kernel whose next job is disciplined hardening, live-adapter replacement of fixture seams, durable cache maturation, and enforceable pack/receipt/rights discipline. That is a much better problem to have than “we still don’t know what Rosetta is.” fileciteturn28file0 fileciteturn15file0