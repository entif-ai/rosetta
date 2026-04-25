# Docs Intelligence Extraction — 2026-04-25-code-wiki-integration

## Source

- Path: `docs/chats/20260225 - Chat GPT - Code Wiki integration.md`
- Title: Code Wiki integration
- Date evidence: Chat export dated 2026/2/25; conversation dated 2025/11/17
- Authority tier: ChatGPT with Entif AI Engine (g-p-68113a0ebebc819183ea60319883eb09)
- Freshness: Conversation from Nov 2025; Google Code Wiki was "newly-released" at time of conversation
- Word count: ~853 lines; 33KB
- Extractor: heartbeat subagent
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Crates explored integrating Google CodeWiki (newly-released per-repo auto-generated wiki + Gemini CLI extension) into Entif AI's architecture. The conversation identified CodeWiki as a strong per-repo code-understanding primitive but insufficient alone for Entif's cross-repo "never build twice" goal. The assistant proposed: (1) a Capability Tile schema (TypeScript, aligned with Cognitive Tiles Merkle-DAG pattern), (2) a CapabilityRegistry service with search_capabilities/get_capability MCP tools, and (3) a CodeWikiForge adapter. Key gaps identified: cross-repo capability view, maturity scoring, and reuse enforcement.

## Goals And Intent

- Assess Google CodeWiki as a primitive for Entif's "stop re-inventing solved problems" goal
- Design integration architecture for CodeWiki into Entif 2.0
- Sketch capability tile schema aligned with Cognitive Tiles / Swarm Gnosis
- Define shared MCP tool interface (search_capabilities + get_capability) usable by both Entif agents and Gemini CLI

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Cross-repo capability registry (global view across Entif, VieDay, Mislead.Us, etc.) | "What are all the auth implementations across Entif, VieDay, Mislead.Us, etc., and which is the canonical one?" | entif.core.capability-registry | high | CodeWiki alone is repo-scoped only |
| Maturity/sophistication scoring per capability | "how production-ready each unit is: test coverage, recency, LOC/change churn, open bugs, used in live system vs. abandoned" | entif.core.capability-registry | high | Not provided by CodeWiki; needs Entif layer |
| Reuse enforcement in planning loop | "never build twice" requires registry + equivalence/overlap detection | entif.core.roma-trm | high | Requires orchestrator integration |
| CodeWikiForge adapter (per-repo CodeWiki indexer) | "Add a CodeWikiForge adapter that knows how to call the Gemini CLI extension for a repo" | entif.forge.codewiki | medium | Future work; CodeWiki CLI extension not yet available |
| Structured output parsing for CodeWiki CLI | Unknown API/CLI output format from future Gemini CLI extension | entif.forge.codewiki | medium | May need OUTPUT_JSON_ONLY convention |
| Capability Tile schema (JSON Schema + TypeScript types) | Full schema defined with header+payload, maturity_level 0-5, domain, kind taxonomy | entif.core.capability-tiles | medium | Schema only; no implementation |
| search_capabilities MCP tool | Tool definition with query, k, filters (kind, status, min_maturity, domain_prefix, tags, repo, requires_tests, requires_prod_usage) | entif.mcp.capability-search | medium | Interface only; no implementation |
| get_capability MCP tool | Tool definition: fetch full tile by tile_id | entif.mcp.capability-search | medium | Interface only; no implementation |
| Planning rule: search_capabilities before new feature | "auto-insert a step: search_capabilities(feature_spec)" | entif.core.roma-trm | medium | Integration point in planning pipeline |
| Cached capability tiles per repo | "keep your own cached capability tiles per repo" to avoid latency/cost on every query | entif.core.capability-registry | low | Refresh on new commits or deep one-off checks |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §1 What Code Wiki gives you | code-wiki,per-repo-lens,gemini-cli,code-understanding | google-codewiki,gemini-cli,mcp | technology | CodeWiki provides per-repo auto-generated wiki, architecture diagrams, sequence diagrams, and a Gemini-chat-agent scoped to the repo. Runs as hosted public preview for public repos; Gemini CLI extension for private/internal repos is being built. | "keeps a continuously updated, structured wiki per repo, regenerated after each change" + "Gemini CLI extension so teams can run the system locally on internal repos" | Treat as the "code-understanding backend per repo"; plan adapter for when CLI extension is available. | high |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 What it doesn't solve | cross-repo-blindspot,capability-registry | code-wiki,architecture | risk | CodeWiki is strictly repo-scoped. Cannot answer cross-repo questions like "what are all auth implementations across Entif, VieDay, Mislead.Us and which is canonical?" | "Code Wiki is repo-scoped. You want 'What are all the auth implementations across Entif, VieDay, Mislead.Us, etc., and which is the canonical one?'" | Build cross-repo CapabilityRegistry above CodeWiki layer. | high |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 Maturity scoring gap | maturity-scoring,quality-signals | code-wiki,architecture | issue-candidate | CodeWiki does not provide maturity/quality signals: test coverage, recency, LOC churn, open bugs, production vs. experimental status. | "Code Wiki doesn't talk about these; its job is understanding and navigation, not lifecycle & quality metrics" | Attach maturity scoring as Entif-layer metadata on top of CodeWiki tiles. | high |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 Reuse enforcement gap | reuse-enforcement,never-build-twice | architecture,planning | issue-candidate | "Never build twice" enforcement (system autonomously prevents duplication) requires a capability registry + equivalence detection + planning-loop integration. CodeWiki alone is not that meta-layer. | "That requires a capability registry / graph above the repo level plus some notion of equivalence / overlap. Code Wiki alone is a very smart per-repo encyclopedia, not that meta-layer." | Design enforcement rule in ROMA/TRM before building. | high |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §3.1 CodeWikiForge adapter | codewikforge-adapter,forge-adapter | entif-forge,codewiki | technology | Proposed CodeWikiForge adapter: registers repo with CodeWiki, polls for top-level components/services/APIs, pulls summaries and diagram metadata, emits normalized "Capability tiles." | "CodeWikiForge would: 1. Register each repo with Code Wiki (via CLI). 2. On schedule or new commit: ask Code Wiki for top-level sections..." | Design adapter interface; defer implementation until CLI extension ships. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §3.2 CapabilityRegistry service | capability-registry,search-capabilities | entif-core,capability-tiles | requirement | Proposed CapabilityRegistry service: deduplicates capabilities by semantic name, groups tiles by capability not repo path, stores maturity signals, exposes MCP tool search_capabilities. Orchestrator calls this before accepting any new feature plan. | "CapabilityRegistry that: deduplicates capabilities with the same or similar name, groups tiles by semantic capability, stores maturity signals, exposes MCP tool: search_capabilities" | Define service spec; wire into planning loop as gate. | high |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §4 CodeWiki + maturity heuristics | maturity-heuristics,semantic-fit | quality-assessment,codewiki | open-question | Three maturity heuristics via CodeWiki: (1) structural richness (fan-in, interface clarity), (2) semantic fit (ask CodeWiki "does X support feature Y?"), (3) pattern alignment (hexagonal architecture, StandardHttpService). | "Use Code Wiki's docs + diagrams to estimate: Is this well-factored or 2000-line blob? Does it expose clear interfaces? How many components reference it?" | Prototype semantic-fit check via CodeWiki chat queries. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §5 Planning rule | planning-rule,reuse-gate | roma-trm,planning | decision | Proposed planning rule: before any new feature plan is accepted, auto-insert search_capabilities(feature_spec). If candidates with fit_score > threshold exist, plan must include Reuse vs Build justification. | "Before any 'new feature' implementation plan is accepted: auto-insert a step: search_capabilities(feature_spec)" | Implement as ROMA/TRM rule; track justification in receipts. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §5 Receipts extension | receipts,capability-id | receipts,capability-registry | decision | Extend receipts so each new module includes capability_id, existing_candidates_considered, decision (reused/extended/rebuilt), rationale. | "each significant new module includes: capability_id, existing_candidates_considered: [ids], decision: reused \| extended \| rebuilt, rationale" | Add to receipt schema; mine "oops duplicated anyway" cases. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §6 Unknown structured output format | api-unknown,cli-format | codewiki,integration-risk | risk | CodeWiki CLI extension structured output format is unknown. Blog promises CLI but no machine-readable API details. | "We don't yet know what structured outputs the Code Wiki CLI extension will expose." | Use OUTPUT_JSON_ONLY convention or wait for API spec before building parser. | high |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §6 Latency/cost of per-query refresh | cache-strategy,capability-tiles | performance,caching | decision | Routine "does this exist?" queries should not trigger full CodeWiki refresh. Keep cached tiles per repo; only re-hit CodeWiki on new commits or deep one-off checks. | "For routine commands, you don't want every 'does this exist?' query to trigger a full Code Wiki refresh. So: keep your own cached capability tiles per repo" | Implement cache invalidation on git webhook or schedule. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §1 Tile header (TypeScript schema) | tile-schema,cognitive-tiles | cognitive-tiles,tile-schema | technology | TileHeader interface: tile_id, tile_type="capability", title, summary, created_at, updated_at, created_by, license, tags, version, prev, supersedes, deprecated. Aligned with Cognitive Tiles Merkle-DAG pattern. | TileHeader schema defined in §1 | Align tile_id naming with existing Rosetta tile conventions. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §1 CapabilityTilePayload schema | capability-payload-schema,maturity-level | capability-tiles,schema | technology | Payload schema: kind (9 types: service/view/job/cli_command/schema/automation/library/infrastructure/other), domain/subdomain, status (5 states), maturity_level (0-5), owners, problem_statement, inputs/outputs, side_effects, implementation (repos, entrypoints, related_files, tests), quality, adoption, dependencies, interface (http_endpoints, cli_commands, ui_views), ecgg_links, telemetry. | Full CapabilityTilePayload schema in §1 | Validate against existing tile type registry; add to Rosetta type catalog. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §1 JSON canonical example | canonical-example,vieday-ingest | example,capability-tiles | technology | Full canonical JSON example for "VieDay Journal Log Ingestion" capability tile with all fields populated. tile_id: "cap:entif.vieday.v1.ingest_journal_logs". | Example tile in §1 | Use as test fixture for capability registry. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 search_capabilities tool schema | mcp-tool,search-capabilities | mcp,capability-search | technology | MCP tool schema: name=search_capabilities, input includes query (string), k (1-100), filters (kind[], status[], min_maturity_level, domain_prefix, tags[], requires_tests, requires_prod_usage, repo). Output: results[] with tile_id, title, summary, domain, kind, status, maturity_level, tags, owner, used_in_prod, primary_entrypoint, score. | Full tool schema in §2 | Implement MCP handler; back with vector + structured index. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 get_capability tool schema | mcp-tool,get-capability | mcp,capability-search | technology | MCP tool schema: name=get_capability, input: tile_id (required), output: capability (full CapabilityTile document). | Full tool schema in §2 | Simple JSON file or DB lookup; no vector search needed. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 Indexing pipeline architecture | indexing-pipeline,codewiki-indexer | codewiki,indexing | architecture | Proposed indexing pipeline: CodeWiki builds per-symbol/file docs + embeddings; small Entif-side indexer groups related symbols/files into capabilities, populates implementation/interface sections, fills quality/adoption fields from tests/CI/telemetry. | "CodeWiki builds per-symbol / per-file docs and embeddings. A small Entif-side 'capability indexer' walks the CodeWiki index and: groups related symbols / files into capabilities..." | Build indexer as part of CodeWikiForge. | medium |
| 2025-11-17 | docs/chats/20260225 - Chat GPT - Code Wiki integration.md | §2 Serving pipeline (MCP server) | mcp-server,serving-pipeline | mcp,capability-search | architecture | Proposed serving: expose capability registry as MCP server implementing search_capabilities + get_capability. Internally search_capabilities queries vector index (using CodeWiki embeddings) + structured filters. | "You expose the capability registry as an MCP server that implements search_capabilities and get_capability. Internally, search_capabilities can: query a vector index..." | Start with JSON file backend; upgrade to vector + structured later. | medium |

## Components And Technologies

- Google CodeWiki (per-repo auto-generated wiki, architecture diagrams, sequence diagrams)
- Gemini CLI (open-source AI agent in terminal with ReAct loop, tools, MCP support)
- CodeWikiForge (proposed Entif adapter for CodeWiki)
- CapabilityTile (header+payload Merkle-DAG object; specialized from Cognitive Tiles)
- CapabilityRegistry (proposed service for cross-repo deduplication + search)
- search_capabilities MCP tool
- get_capability MCP tool
- maturity_level (0-5 scale: 0=stub, 1=PoC, 2=working fragile, 3=usable by me, 4=team-ready, 5=hardened/prod)
- kind taxonomy: service, view, job, cli_command, schema, automation, library, infrastructure, other

## Conceptual Claims

- CodeWiki = "code-understanding backend per repo"; Entif = "cross-repo capability and decision engine"
- CodeWiki alone covers ~70% of "grunt work" (parsing trees, diagrams, explaining legacy code) but not cross-repo deduplication or maturity scoring
- Capability tiles slide into Cognitive Tiles / Swarm Gnosis graph as code-backed tiles
- "Never build twice" requires both (a) capability registry + (b) planning-loop integration + (c) receipt audit trail
- maturity_level is orthogonal to CodeWiki's responsibility; must live in Entif layer
- Canonical tile_id naming: "cap:{domain}.{name}.v{version}.{capability_name}" (e.g., "cap:entif.vieday.v1.ingest_journal_logs")

## Dependencies And Sequencing

- CodeWikiForge blocked on: Gemini CLI CodeWiki extension shipping (not yet available as of Nov 2025)
- CapabilityRegistry depends on: CodeWikiForge (or manual tile authoring as interim)
- Planning-rule (reuse gate) depends on: CapabilityRegistry being populated with tiles
- MCP serving layer can start immediately with JSON file backend (no CodeWiki dependency)
- Maturity scoring heuristics can be prototyped independently using CodeWiki's hosted preview

## Contradictions Or Supersession

- No direct contradictions found in this document
- Supersedes: earlier Entif thinking that treated code search/discovery as a solved problem (this doc clarifies CodeWiki is necessary but not sufficient)
- Related to: Cognitive Tiles / Swarm Gnosis (CW tiles are a specialization of Cognitive Tiles); NOT LAME PRD (which defines the 5 memory layers including capability registry)

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| CW-001: Cross-repo CapabilityRegistry is undefined | issue-candidate | `docs/intake/issue-drafts/CW-001-cross-repo-capability-registry-undefined.md` | enhancement,capability-registry,cross-repo | CW-003 (CodeWikiForge) | "What are all the auth implementations across Entif, VieDay, Mislead.Us, and which is canonical?" — no system answers this |
| CW-002: CodeWikiForge adapter not specced | issue-candidate | `docs/intake/issue-drafts/CW-002-codewikforge-adapter-not-specced.md` | enhancement,forge,codewiki | — | "Add a CodeWikiForge adapter that knows how to call the Gemini CLI extension for a repo" — no implementation or spec exists |
| CW-003: Structured output format for CodeWiki CLI unknown | issue-candidate | `docs/intake/issue-drafts/CW-003-structured-output-format-unknown.md` | documentation,codewiki,integration-risk | — | "We don't yet know what structured outputs the Code Wiki CLI extension will expose" |
| CW-004: Reuse enforcement not wired into planning loop | issue-candidate | `docs/intake/issue-drafts/CW-004-reuse-enforcement-not-wired.md` | enhancement,planning,roma-trm | CW-001 | "auto-insert a step: search_capabilities(feature_spec)" — not implemented; without it, no enforcement |
| CW-005: Maturity scoring system not defined | issue-candidate | `docs/intake/issue-drafts/CW-005-maturity-scoring-not-defined.md` | enhancement,quality,maturity | CW-001 | "how production-ready each unit is" — no schema or implementation for maturity_level scoring |
| CW-006: Capability Tile schema needs Rosetta type catalog entry | issue-candidate | `docs/intake/issue-drafts/CW-006-capability-tile-schema-rosetta-catalog.md` | documentation,schema,capability-tiles | — | Full TypeScript schema defined in chat but not entered into Rosetta type catalog |
| CW-007: search_capabilities MCP tool interface only, no implementation | issue-candidate | `docs/intake/issue-drafts/CW-007-search-capabilities-mcp-unimplemented.md` | enhancement,mcp,capability-search | CW-001 | "exposes an MCP tool: search_capabilities" — tool schema defined but no server implementation |
| CW-008: Capability tiles not cached/invalidated on git changes | issue-candidate | `docs/intake/issue-drafts/CW-008-capability-tiles-cache-invalidation-missing.md` | enhancement,caching,performance | CW-002 | "keep your own cached capability tiles per repo" — no cache invalidation strategy defined |

## Project Board Suggestions

- Area: entif-core / entif-forge
- Cycle: Backlog (no CodeWiki CLI yet; planning only)
- Status: Discovery/Architecture
- Blocked by: Gemini CLI CodeWiki extension not yet available; CodeWiki public preview is for public repos only
- Parallelization notes: CW-006 (schema docs) can proceed immediately; CW-007 (MCP stub) can proceed with JSON backend; CW-001/CW-002/CW-005 depend on CLI extension availability

## Open Questions

- When will Gemini CLI CodeWiki extension ship? What API/surface will it expose?
- Should maturity_level be computed automatically (from test coverage, changelog churn, etc.) or declared by human owners?
- How is equivalence/overlap between capabilities detected? Semantic similarity? Explicit declares? Manual curation?
- Should CapabilityRegistry use Neo4j (ECGG) for graph traversal or a separate PostgreSQL table?
- Does CodeWiki expose embeddings that can seed the vector search layer for search_capabilities?
