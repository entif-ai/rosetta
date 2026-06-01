# Docs Intelligence Extraction — 20260225 - Chat GPT - Web 3.0 and Semantic Web

## Source

- Path: `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md`
- Title: Web 3.0 and Semantic Web
- Date evidence: Chat export 2026-02-25; source content references Atlas browser (OpenAI), Comet (Perplexity), Copilot in Windows/Edge — all 2025-era announcements
- Authority tier: strategic exploration, product vision
- Freshness: stable (visionary, not time-sensitive)
- Word count: ~2,500
- Extractor: heartbeat subagent
- Extraction date: 2026-06-01

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

A strategic exploration between Crates and a ChatGPT instance on the convergence of Semantic Web ideals (JSON-LD, schema.org, RDF, W3C standards) with modern LLM-driven agentic consumption. Core argument: Entif's graph-native architecture already embodies semantic-by-default principles; operationalizing these across the product suite (VieDay, SAFE Inventory, These.Reviews, These.Tips, Interview Ace, FEZB.UK, Dollahs.com) via a semantic SDK and MCP server creates compound network effects and positions the ecosystem for AI-native browser ingestion (Atlas, Comet, Copilot). The document also introduces the "Code Atlas" concept: a graph-indexed artifact registry with Feature Map (FM) files, context weaver, and deterministic code reuse. Thin slice proposed: Dollahs.com + VieDay as beachhead.

---

## Goals And Intent

- Assess whether semantic-by-default UI markup is worth operationalizing across the Entif ecosystem
- Explore concrete UX and operational force multipliers app-by-app
- Define a reusable "Code Atlas" system for code reuse, context compression, and LLM ergonomics
- Identify first thin slice to validate compounding before full rollout

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-06-01 | docs/ideas/...Web 3.0...md | Semantic Web context | semantic-web, history, w3c, rdf, schema.org | Semantic Web vs modern Graph-RAG | technology | The Semantic Web vision (Berners-Lee, ~2000s) used RDF triples, OWL ontologies, SPARQL — never achieved everyday developer adoption due to high markup burden, low near-term ROI, and schema coordination problems | "The stack was RDF triples, URIs, OWL, SPARQL... Why it never became everyday Web 3.0" | Revisit intent; modern blend of JSON-LD + embeddings + LLMs achieves same interoperability goal via stats + symbols rather than pure ontology | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | AI browser landscape pivot | ai-browser, atlas, comet, copilot, competitive | AI-native browsers as new distribution channel | decision | OpenAI Atlas, Perplexity Comet (free), Microsoft Copilot in Edge/Windows all signal a pivot: AI agents are now primary consumers of web content, not just humans | "browser landscape pivoting toward AI-native consumption" | Build semantic-by-default surfaces now to be readable by these agents before standards solidify | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Two-layer UI contract | semantic-sdk, json-ld, aria, wcag, accessibility | Dual-output paradigm for human + machine | requirement | Every generated UI should emit: (1) accessible, WCAG 2.2 AA HTML for humans; (2) JSON-LD 1.1 blocks in `<script type="application/ld+json">` for agents | "make every generator and component emit two layers" | Add dual-output contract to component scaffold spec; enforce in CI | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | JSON-LD 1.1 with schema.org | json-ld, schema.org, context, content-negotiation | Standard machine-readable vocabulary | requirement | Default vocabulary = schema.org; map Entif ontology to it via an Entif context; internal URIs must be stable and dereferenceable | "Use schema.org types as the default vocabulary and map Entif's ontology to them via an Entif context" | Define public context (`https://entif.ai/contexts/app.jsonld`) before shipping any app | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Content negotiation for LD+JSON | content-negotiation, http-headers, application-ld+json | Agent discovery without scraping | requirement | Canonical resource URLs must support `Accept: application/ld+json` and emit `Link: <.../context.jsonld>; rel="http://www.w3.org/ns/json-ld#context"` headers | "add Link header so generic agents can discover context without scraping" | Add content-negotiation to all canonical resource endpoints in scaffold | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Semantic contract per component | semantic-contract, props, aria, json-ld, entity-id | Component-level semantic declarations | requirement | Each UI component declares: required ARIA roles, emitted JSON-LD types/properties, link back to Entif knowledge graph IDs; build system auto-injects ARIA and JSON-LD consistently | "Each component should declare a semantic contract alongside its props" | Codify `SemanticContract` interface in component scaffold; auto-inject via build plugin | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Stable entity IDs across apps | entity-id, cross-app, canonical-id, idempotency | Cross-app entity resolution | requirement | Each entity (e.g., Project) gets one canonical `@id`, stable across apps, resolved by ID not string; enables LLMs to traverse estate coherently | "one canonical @id for the thing, stable across apps, resolve relations by ID rather than by text strings" | Establish ID policy: `https://<app>.entif.ai/<entity>/<id>` format; enforce in scaffold | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Agent manifest per component | agent-manifest, affordances, typed-actions, mcp | Typed action declarations for agents | requirement | Components expose an "agent manifest" declaring typed actions and queries as MCP tools | "agent manifest that declares the component's affordances as typed actions and queries" | Define `AgentManifest` schema; map to MCP tool schema | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | sitemap-ld.json | sitemap-ld, machine-feed, discovery, entity-index | Machine-first sitemap variant | technology | Publish `sitemap-ld.json` listing canonical IDs and `lastModified` for all first-class entities, plus per-entity `Accept: application/ld+json` endpoints | "publish sitemap-ld.json that lists canonical IDs and last-modified for all first-class entities" | Implement `sitemap-ld.json` generator in scaffold; wire to CI | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Hydra for hypermedia | hydra, hypermedia, openapi, machine-actions | Hypermedia API for agent navigation | technology | Consider Hydra for describing affordances (operations, collections, pagination) in JSON-LD; dual-publish OpenAPI for human devs and Hydra for agents | "If you already ship OpenAPI, you can dual-publish: OpenAPI for human-devs and Hydra for semantically navigable hypermedia" | Evaluate Hydra vs pure MCP for action discovery; decide in architecture doc | low |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Verifiable Credentials for provenance | verifiable-credentials, data-integrity, jws, bbs+, signatures | Signing important JSON-LD documents | requirement | Sign important JSON-LD (prices, availability, policy statements) using W3C VC Data Integrity suites (JWS, then BBS+ for selective disclosure); expose verification hints in HTTP Link headers and embed `proof` blocks | "Sign important JSON-LD documents... using W3C Verifiable Credential Data Integrity suites" | Add VC signing support to semantic SDK; at minimum JWS for v1 | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | React JsonLd helper | json-ld-helper, react, component, sdk | Developer ergonomic for JSON-LD emission | technology | Proposed React helper: `<JsonLd data={{...}} />` that renders `<script type="application/ld+json">` in head; handles context merging and ID normalization | Code sample in response showing React component pattern | Implement `JsonLd` helper in semantic SDK; include context merge utility | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | useA11y() hook | usea11y, aria, accessibility, hook, ci | Auto-apply accessibility contracts | technology | Proposed `useA11y()` hook that auto-applies roles, labels, and focus management; paired with CI running axe-core and Rich Results Test on every PR | "Pair that with a useA11y() hook that auto-applies roles, labels, and focus management" | Implement `useA11y()` hook; add axe-core + Schema Validator to CI gates | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Public vs private context split | public-context, private-context, ip-protection, ontology | IP protection via context boundary | requirement | Public context maps primary entity types to schema.org (versioned, documented, safe to depend on); private context carries richer predicates and classifier outputs — open-source SDK projects public only | "Public context maps your primary entity types onto schema.org... Private context carries richer predicates" | Define boundary clearly; SDK only emits public context by default | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | MCP server as agent driver | mcp, agent-delegation, tool-schema, entity-tools, insight-tools | MCP server as universal agent doorway | decision | MCP server fronts the knowledge graph with three tool classes: Entity tools (fetch by ID, search by field, traverse typed relations), Insight tools (higher-order summaries open to open-sourcing), Action tools (narrow idempotent operations with dry-run) | "a read-mostly MCP server that fronts the knowledge graph and action surfaces without exposing internals" | Scope MCP server to public-facing tools only; internal topology stays closed | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Thin slice: Dollahs + VieDay | beachhead, dollahs, vieday, thin-slice, validation | First vertical slice for compounding | decision | First thin slice: Dollahs.com emits `Product`/`Offer` JSON-LD with prices signed, `GET /products/{id}` with content negotiation, MCP tools `dollahs.product.read` + `dollahs.cart.add`; VieDay emits `Task`/`Goal` with `StartAction`/`CompleteAction`, MCP tools `vieday.task.read` + `vieday.task.complete` | "thin vertical slice to prove it quickly: Dollahs.com and VieDay" | Prioritize Dollahs + VieDay as first semantic-by-default implementation | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Cross-app compounding | cross-app, compounding, knowledge-graph, portable-graph | Apps sharing entity IDs and contexts | requirement | Every app shares same entity ID scheme, contexts, and affordances; VieDay tasks can reference SAFE items; Dollahs order autocompletes VieDay budget; user gets portable personal knowledge graph | "the user effectively gets a portable personal knowledge graph" | Enforce cross-app ID policy from day one; document in architecture | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Code Atlas concept | code-atlas, artifact-registry, fm-files, context-weaver, graph-index | Graph-indexed artifact registry for reuse | technology | Code Atlas: graph + vector indexed registry of FM (Feature Map) files; each source file ships a `*.fm.md` with interfaces, contracts, effects, dependencies; context weaver builds smallest unambiguous context pack per task | Full architectural proposal including GraphQL schema, SQLite migration, sync script | Define Code Atlas spec; confirm against existing deepcode/code-wiki work (DI-009) | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Feature Map (FM) files | feature-map, fm-md, artifact-registry, contract, determinism | LLM-ready artifact summary format | requirement | Every source file and completed feature ships `*.fm.md` next to code; structured fields: ID, Kind, Surface, Inputs, Outputs, Determinsm, Side-effects, Preconditions, Postconditions, Complexity, Dependencies, Tests, Security, Telemetry, JSON-LD emitted, MCP tools, Routes | FM template proposed in code bundle | Define FM schema formally; add FM generation to scaffold | high |
| 2026-06-01 | docs/ideas/...Web 3.0...md | GraphQL registry schema | atlas-registry, graphql, sqlite, artifact-registry | Registry for artifact upsert and query | technology | Proposed GraphQL schema with Artifact type (id, kind, path, version, status, inputs, outputs, effects, provides, tags, fm, dependsOn), Relation type, Query (artifact, artifacts, search, neighbors), Mutation (upsertArtifact, upsertRelation) | Full SDL in the code bundle | Evaluate against existing code-wiki/graph work (DI-009); avoid duplicate registries | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Context Weave service | context-weave, context-compression, llm-context, budget | Building compact context for LLMs | technology | Context Weave service: given a target task, walks graph from target outward, prefers public interfaces, includes types > contracts > tests > implementation; enforces byte budget; trades breadth for depth by policy | "construct the smallest unambiguous bundle... types > contracts > tests > implementation" | Evaluate whether this belongs in Rosetta (memory plane 3?) or as separate tooling | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Effect modules as trust boundary | effect-modules, side-effects, trust-boundary, capability-tags | Isolating side effects from pure logic | architecture | Define "effect modules" as only places where side effects are allowed; labeled with capability tags (http:Payments, kv:Timers, queue:Events); registry enforces core logic cannot import effects | "Define 'effect modules' as the only place where side effects are allowed" | Align with Rosetta's parse-only-default and write-admission-gate; use as complementary pattern | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Design tokens and theming | design-tokens, theming, tokens-json, preference-set | Theme standardization across apps | technology | Standardize design tokens in cross-app `tokens.json`; generate platform bindings (CSS vars, TS enums) in CI; `PreferenceSet` as pure data objects with merge rules; views consume via pure selectors | "Standardize design tokens in a cross-app tokens.json" | Align with existing UI/component work; ensure accessibility contrast guarantees per token scale | low |
| 2026-06-01 | docs/ideas/...Web 3.0...md | SLSA / Sigstore for supply chain | slsa, sigstore, sbom, supply-chain, provenance | Supply chain integrity for artifacts | technology | Add SBOM in CI, signed artifacts with Sigstore, SLSA provenance attestations per release; SAST (Semgrep) profiles tuned to effect boundaries | "SBOM in CI, signed artifacts with Sigstore, and SLSA provenance attestations per release" | Add to security roadmap; coordinate with existing security work (email-driven defenses, prompt injection) | low |
| 2026-06-01 | docs/ideas/...Web 3.0...md | Entif as "one-person unicorn" platform | business-model, compounding, force-multiplier, one-person-unicorn | Business thesis for semantic-first strategy | decision | The semantic SDK + MCP flywheel: generate products faster, make them legible to agents, capture usage as graph deltas, reinvest to automate more; positions Entif as platform for "one-person unicorn" via coherence rather than headcount | "a tight flywheel: generate products faster than anyone, make them legible to agents and humans, capture usage as clean graph deltas" | Validate business model separately; technically the architecture is sound | medium |
| 2026-06-01 | docs/ideas/...Web 3.0...md | 90-day arc | 90-day-plan, rollout-phases, compounding | Phased rollout timeline | decision | 90-day arc: Month 1 (SDK spine, context v0, signed JSON-LD from one Dollahs route, 2 MCP tools), Month 2 (SAFE Inventory deltas, These.Reviews canonical IDs), Month 3 (checkout/refunds/shipping as actions, public offer feed, one external agent + one affiliate) | Detailed phased plan | Use as input to project planning; validate against current team capacity | medium |

---

## Components And Technologies

- **Semantic SDK**: React helper (`<JsonLd>`), `useA11y()` hook, context merge utility, ID normalization — bundled as npm package linked at build time
- **MCP server**: Read-mostly; three tool classes (entity, insight, action); fronted by typed tool schema; dry-run mode for all write operations
- **JSON-LD renderer**: Renders `<script type="application/ld+json">` per route with stable `@id` and schema.org vocabulary
- **Content negotiation handler**: `Accept: application/ld+json` on canonical resource URLs; `Link` headers for context discovery
- **Code Atlas registry**: GraphQL API over SQLite (WAL mode); artifact upsert + relation management + vector index sync
- **Feature Map (`*.fm.md`)**: LLM-ready artifact summary; parsed by `atlas-sync.ts` and upserted to registry
- **Context Weave CLI**: Builds compact context packs from artifact graph; enforces byte budget; types-first policy
- **Design tokens (`tokens.json`)**: Cross-app token标准化; CSS vars + TS enums generated in CI
- **VC signing**: JWS-based JSON-LD document signatures; BBS+ for selective disclosure in later phase

---

## Conceptual Claims

1. **Semantic-by-default is a compound force multiplier**: Each app that emits valid JSON-LD with stable IDs and provenance signs improves not only its own agent-readability but the entire ecosystem's coherence — cross-app traversal becomes possible without scraping.
2. **AI browsers are new distribution channels**: OpenAI Atlas, Perplexity Comet, and Microsoft Copilot in Edge signal that AI agents will be primary consumers of web content. Pages not emitting structured data will be invisible to these agents; pages emitting semantically rich, provenance-signed data will become default sources.
3. **Public/private context split protects IP while enabling open-source**: Open-sourcing SDK, MCP shell, public contexts, and validators while keeping ranking heuristics, risk models, and private predicates closed is a viable strategy that buys adoption without sacrificing moat.
4. **Code Atlas enables the "one-person unicorn" flywheel**: A graph-indexed artifact registry with deterministic context compression makes reuse the default, not the exception — LLMs ingest exact contracts rather than brittle blobs, and new work starts by pulling proven parts.
5. **Effect modules enforce the parse-only-default at architecture level**: By labeling side-effecting modules with capability tags and enforcing that core logic cannot import them, the system achieves structural guarantees that a vendor-default parse-only rule cannot.

---

## Dependencies And Sequencing

- Semantic SDK and MCP server depend on: public context definition (schema.org mapping), entity ID policy
- Code Atlas depends on: FM file schema, registry GraphQL schema, CI action
- Cross-app compounding depends on: stable cross-app ID scheme established in bootstrap
- VC signing depends on: crypto library selection (JWS / BBS+), key management strategy
- Context Weave depends on: Atlas registry being live; could be implemented as a separate service
- All of the above depends on: component scaffold (generators and templates) being modified to emit dual-output

---

## Contradictions Or Supersession

- The document proposes a new artifact registry (Code Atlas) that may overlap with the DeepCode/Code Wiki integration already explored in prior DI extractions. DI-009 (Internal knowledge graph — cross-doc concept linking, upgrade to Graphiti) is the open issue that should resolve whether these are the same system or complementary.
- The document's "Code Atlas" GraphQL schema is more targeted than the full Entif memory graph design (NOT LAME PRD); it is a specific thin slice for code reuse, not the general knowledge graph. These should be treated as separate concerns with a clear mapping.
- The FM file format (`.fm.md`) is Markdown with YAML-like structured fields — not a formal schema. This is pragmatic but may need formalization before it can be reliably parsed by automated tools without custom parsers per format variant.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| SEM-001: Define Entif public JSON-LD context (schema.org mapping) | architecture/spec-gap | `docs/intake/issue-drafts/sem-001-public-context.md` | semantic-web, json-ld, schema.org, public-context | — | Finding: "Public context maps primary entity types to schema.org... define before shipping any app" |
| SEM-002: Semantic SDK — React JsonLd helper and useA11y hook | implementation | `docs/intake/issue-drafts/sem-002-semantic-sdk.md` | semantic-sdk, react, json-ld, accessibility | SEM-001 | Finding: React helper pattern + useA11y hook; CI gates with axe-core + Schema Validator |
| SEM-003: MCP server — public tool schema and wire to effect modules | implementation | `docs/intake/issue-drafts/sem-003-mcp-server.md` | mcp, agent-tooling, public-context | SEM-001, SEM-002 | Finding: three tool classes (entity/insight/action); dry-run; no internal topology exposed |
| SEM-004: Entity ID policy across apps — canonical @id scheme | architecture | `docs/intake/issue-drafts/sem-004-entity-id-policy.md` | entity-id, cross-app, canonical-id | SEM-001 | Finding: "one canonical @id, stable across apps, resolve relations by ID not string" |
| SEM-005: Content negotiation on canonical resource URLs | implementation | `docs/intake/issue-drafts/sem-005-content-negotiation.md` | content-negotiation, http, application-ld+json, discovery | SEM-001 | Finding: `Accept: application/ld+json` + Link headers for context discovery |
| SEM-006: sitemap-ld.json generator | implementation | `docs/intake/issue-drafts/sem-006-sitemap-ld.md` | sitemap-ld, machine-feed, discovery | SEM-001, SEM-004 | Finding: machine-first sitemap variant; per-entity LD+JSON endpoints |
| SEM-007: VC signing for JSON-LD provenance | implementation | `docs/intake/issue-drafts/sem-007-vc-signing.md` | verifiable-credentials, data-integrity, provenance, jws | SEM-001 | Finding: JWS-based signing for prices/availability; BBS+ for selective disclosure in v2 |
| SEM-008: Feature Map (FM) file schema and atlas-sync.ts | implementation | `docs/intake/issue-drafts/sem-008-feature-map.md` | feature-map, code-atlas, artifact-registry, fm-md | — | Finding: FM template with structured fields; parse and upsert to GraphQL registry |
| SEM-009: Code Atlas registry — GraphQL schema + SQLite migration | implementation | `docs/intake/issue-drafts/sem-009-code-atlas-registry.md` | code-atlas, graphql, sqlite, artifact-registry | DI-009 | Finding: Full GraphQL SDL + SQLite migration proposed; overlaps with DI-009 (code-wiki/graph) |
| SEM-010: Context Weave CLI for compact LLM context packs | implementation | `docs/intake/issue-drafts/sem-010-context-weave.md` | context-weave, llm-context, context-compression | SEM-009 | Finding: types > contracts > tests > implementation policy; byte budget enforcement |
| SEM-011: Thin slice — Dollahs Product/Offer + VieDay Task/Goal semantic emission | implementation | `docs/intake/issue-drafts/sem-011-dollahs-vieday-thin-slice.md` | beachhead, dollahs, vieday, thin-slice, semantic-default | SEM-001, SEM-002, SEM-003, SEM-004, SEM-005 | Finding: "Pick Dollahs.com and VieDay as first thin slice" |
| SEM-012: Effect modules as architectural trust boundary pattern | architecture | `docs/intake/issue-drafts/sem-012-effect-modules.md` | effect-modules, side-effects, trust-boundary, architecture | — | Finding: "Define 'effect modules' as only place where side effects are allowed"; aligns with parse-only-default |
| SEM-013: Design tokens and PreferenceSet for cross-app theming | implementation | `docs/intake/issue-drafts/sem-013-design-tokens.md` | design-tokens, theming, preferences, cross-app | — | Finding: `tokens.json` cross-app; `PreferenceSet` as pure data objects with merge rules |

---

## Project Board Suggestions

- **Area:** Semantic SDK + MCP layer (cross-cutting; enables all apps)
- **Cycle:** batch-6 or纳入 NOT LAME implementation roadmap
- **Status:** candidate — requires SEM-001 (public context) before any code is written
- **Blocked by:** public context definition; entity ID policy (SEM-001 + SEM-004)
- **Parallelization notes:** SEM-001 through SEM-005 are sequential (context → SDK → MCP → ID policy → content negotiation); SEM-008 through SEM-010 (Code Atlas) can run in parallel as a separate concern; SEM-011 (thin slice) is the validation milestone after the foundation is laid

---

## Open Questions

1. Does the Code Atlas registry (SEM-009) duplicate or complement the knowledge graph work in DI-009? Should they be unified or kept separate?
2. Is Hydra necessary for v1, or is pure MCP sufficient for agent action discovery? When would hypermedia add value over typed MCP tools?
3. The FM parser is "intentionally strict and tiny" per the document — what are the failure modes when FM files deviate from the template?
4. Should the semantic SDK be a separate npm package (`@entifs/semantic-sdk`) or baked into the component scaffold generation?
5. For BBS+ selective disclosure VC signing — is this in scope for v1 or deferred?
6. The document proposes "one-person unicorn" as the business model — has this been validated against actual market sizing for any of the apps?