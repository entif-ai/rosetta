# Docs Intelligence Extraction

## Source

- Path: `docs/external/DeerFlow Architecture.md`
- Title: DeerFlow Architecture
- Date evidence: Document is a CLAUDE.md guidance file; no explicit date; repo structure suggests active development
- Authority tier: technical architecture doc — implementation-level detail
- Freshness: high — active project, versioned config schema, CI regression tests
- Word count: ~3,500
- Extractor: subagent:ca4a88e3-d2ae-4387-95f4-f665948dbce9
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

DeerFlow is a production-grade LangGraph-based AI super-agent with full-stack architecture: LangGraph runtime (port 2024), Gateway REST API (port 8001), Next.js frontend (port 3000), nginx reverse proxy (port 2026). It demonstrates sandbox-per-thread isolation, persistent structured memory, subagent delegation, MCP tool integration, IM channel bridges (Feishu/Slack/Telegram), and an embedded client mode. Directly relevant to NOT LAME's multi-agent orchestration, skillpack adapter system, write-admission gate design, and context compiler pattern.

## Goals And Intent

- Provide a production-grade reference implementation for multi-agent orchestration
- Validate that LangGraph-as-workflow-layer (not constitutional layer) is a viable pattern
- Serve as concrete artifact for comparing against NOT LAME's sovereign kernel design

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| LangGraph for workflow only, not constitutional layer | Agent System section: "LangGraph Server — Agent runtime and workflow execution" | Architecture | high | NOT LAME adopts this position explicitly |
| Harness/App split with strict dependency direction | Architecture > Harness/App Split: "App imports deerflow, but deerflow never imports app" | boundary-enforcement | high | Enforced by CI test_harness_boundary.py |
| Per-thread sandbox isolation | ThreadDataMiddleware: "Creates per-thread directories" + Sandbox System | sandbox | high | Local provider uses singleton; Docker provider for isolation |
| Config versioning with auto-merge | Configuration System: config_version field + make config-upgrade | config | medium | Version 0 if missing; warns on outdated |
| Memory update with fact confidence scoring | Memory System: fact storage with confidence (0-1), category, createdAt, source | memory | medium | Structured store in backend/.deer-flow/memory.json |
| Subagent concurrency limit | Subagent System: MAX_CONCURRENT_SUBAGENTS=3 enforced by middleware | subagents | medium | 15-minute timeout, no re-queue on timeout |
| MCP runtime updates without restart | MCP System: mtime-based cache invalidation | mcp | medium | Saves to extensions_config.json; LangGraph reloads |
| Skills installation from .skill archive | Gateway Skills router: POST /api/skills/install accepts .skill ZIP | skills | medium | Extracts to custom/ directory; no signature verification |
| Documentation update policy | CLAUDE.md: "CRITICAL: Always update README.md and CLAUDE.md after every code change" | docs | low | Manual enforcement; no automation |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Architecture > Lead Agent | langgraph-workflow, sovereign-kernel, not-lame-reference | langgraph, agent-system, workflow-vs-constitutional | technology | LangGraph is explicitly the workflow runtime, not the constitutional layer. Lead Agent registers via `make_lead_agent(config: RunnableConfig)` in langgraph.json. The agent system builds on top of LangGraph; LangGraph is not trusted as the sovereign component. | "Entry point: `make_lead_agent(config: RunnableConfig)` registered in `langgraph.json`" — confirms LangGraph as execution substrate, not governance substrate | Align NOT LAME's LangGraph integration claim with this confirmed pattern | high |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Architecture > Harness/App Split | architecture-pattern, publishable-framework, boundary-enforcement, ci | harness-app-split, framework-design, dependency-direction | decision | The backend explicitly separates a publishable `deerflow-harness` package from unpublished `app.*` application code, with a strict dependency rule: App imports Harness, Harness never imports App. This is CI-enforced by `tests/test_harness_boundary.py`. | "Dependency rule: App imports deerflow, but deerflow never imports app. This boundary is enforced by `tests/test_harness_boundary.py`" | Use this as the canonical reference implementation for the NOT LAME framework/adapter split | high |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Middleware Chain (11 components) | middleware-chain, agent-composition, thread-state, plan-mode, memory-queue | middleware-composition, agent-system | technology | 11 middleware components execute in strict order: ThreadData, Uploads, Sandbox, DanglingToolCall, Summarization, TodoList, Title, Memory, ViewImage, SubagentLimit, Clarification. Each has a specific role (e.g., TodoList optional for plan_mode; SubagentLimit truncates excess task tool calls to enforce MAX_CONCURRENT_SUBAGENTS). | "Middlewares execute in strict order in `packages/harness/deerflow/agents/lead_agent/agent.py`" | Reference for multi-stage agent composition in NOT LAME | high |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Sandbox System > Virtual Path System | virtual-paths, sandbox-isolation, path-translation, local-sandbox | virtual-path-system, sandbox-isolation | technology | Virtual path system translates agent-visible paths (/mnt/user-data/{workspace,uploads,outputs}) to physical thread-specific directories. Local provider is a singleton; Docker provider uses aio_sandbox for isolation. `is_local_sandbox()` checks `sandbox_id == "local"`. | "Agent sees: `/mnt/user-data/{workspace,uploads,outputs}`, `/mnt/skills` Physical: `backend/.deer-flow/threads/{thread_id}/user-data/...`" | Concrete implementation of per-thread workspace isolation; compare to Rosetta's context isolation | high |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Memory System > Data Structure | memory-structured, fact-confidence, category-taxonomy, memory-injection | memory-system, fact-scoring | technology | Memory stores structured facts with: id, content, category (preference/knowledge/context/behavior/goal), confidence (0-1), createdAt, source. Top 15 facts injected into `<memory>` tags in system prompt. Whitespace-normalized deduplication (trim leading/trailing before comparing). | "Discrete facts with `id`, `content`, `category` (preference/knowledge/context/behavior/goal), `confidence` (0-1), `createdAt`, `source`" | Potential reference for NOT LAME's fact storage schema; Rosetta's memory planes lack explicit confidence scoring | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Subagent System | subagent-delegation, concurrency-limit, background-execution, sse-events | subagent-delegation, task-offloading | technology | Subagent system uses dual thread pools (_scheduler_pool + _execution_pool, 3 workers each), SSE events for real-time updates, 15-minute timeout, no retry on timeout. Built-in agents: `general-purpose` (all tools except task) and `bash` (command specialist). | "MAX_CONCURRENT_SUBAGENTS = 3 enforced by `SubagentLimitMiddleware` (truncates excess tool calls in `after_model`), 15-minute timeout" | Pattern for NOT LAME's subagent/skills delegation; timeout-without-retry is a gap | high |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | IM Channels System | im-channels, feishu, slack, telegram, streaming-updates, card-patching | im-channel-integration, streaming | technology | Feishu uses runs.stream() for incremental card updates (patches the same card with is_final=False until final, then is_final=True). Slack/Telegram use runs.wait() for final response only. Store maps channel:chat → thread_id. | "feishu.py tracks the running card `message_id` in memory and patches the same card in place" | Relevant for NOT LAME's connector adapter requirements | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Embedded Client | embedded-client, in-process, gateway-equivalent, conformance-tests | embedded-deployment, client-sdk | technology | DeerFlowClient provides in-process access to all capabilities without HTTP. All return types align with Gateway API schemas. Gateway conformance tests validate dict-returning methods against Pydantic models; non-dict returns (artifact bytes) are not covered. | "DeerFlowClient provides direct in-process access to all DeerFlow capabilities without HTTP services" | Reference for embedded mode; conformance gap on non-dict returns is a risk | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Configuration System > Config Versioning | config-versioning, auto-upgrade, mtime-reload | config-management, versioning | technology | config_version field in config.example.yaml. AppConfig.from_file() compares user version vs example and warns if outdated. Missing config_version = version 0. make config-upgrade auto-merges missing fields. Env var resolution for values starting with $. | "config_version field. On startup, `AppConfig.from_file()` compares user version vs example version and emits a warning if outdated" | Reference for NOT LAME config schema migration approach | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Gateway API > Skills Router | skill-install, skill-archive, skill-signature, skill-security | skills-installation, security | risk | POST /api/skills/install accepts .skill ZIP archive and extracts to custom/ directory. No signature verification or authenticity check on skill content. Skills gitignored in custom/ but this is convention, not enforcement. | "Installation: `POST /api/skills/install` extracts .skill ZIP archive to custom/ directory" | Add signature verification or content validation to skill installation before promoting to production | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Sandbox System > Local Provider | sandbox-singleton, local-filesystem, path-mappings | sandbox-isolation, singleton-pattern | risk | LocalSandboxProvider is a singleton that maps virtual paths to physical thread directories. This means multiple concurrent threads share the same provider instance. If the singleton maintains any mutable state beyond path mappings, this is a concurrency risk. | "LocalSandboxProvider - Singleton local filesystem execution with path mappings" | Audit LocalSandboxProvider for mutable state; add concurrency tests | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Config Caching | config-mtime-reload, cache-invalidation | config-caching, hot-reload | risk | get_app_config() caches parsed config but reloads when resolved config path changes or file mtime increases. Race condition possible: LangGraph and Gateway may reload at different times if mtime changes between their read and write, leading to inconsistent state. | "automatically reloads it when the resolved config path changes or the file's mtime increases" | Add file locking or atomic reload with validation | low |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Memory System > Dedup | memory-dedup-whitespace, fact-collision | memory-deduplication | risk | Memory updater deduplicates by trimming leading/trailing whitespace before comparing fact content. This approach could cause false collisions where semantically different facts differ only by whitespace. | "whitespace-normalized fact deduplication (trims leading/trailing whitespace before comparing)" | Consider content fingerprinting (hash) for dedup instead of pure string compare | low |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Embedded Client > Gateway Conformance | conformance-tests, dict-vs-non-dict, artifact-return | client-conformance, testing-gap | risk | Gateway conformance tests only cover dict-returning methods. Methods returning non-dict types (e.g., get_artifact returns tuple of bytes) are not tested for schema alignment. If Gateway changes artifact mime type handling, embedded client could drift. | "Covers: `ModelsListResponse`, `ModelResponse`, `SkillsListResponse`, `SkillResponse`, `SkillInstallResponse`, `McpConfigResponse`, `UploadResponse`, `MemoryConfigResponse`, `MemoryStatusResponse`" — no artifact coverage | Extend conformance tests to non-dict return types | low |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Subagent Timeout | subagent-timeout, no-retry, no-requeue | subagent-reliability | risk | Subagent tasks time out after 15 minutes with no retry or re-queue mechanism. Timed-out tasks are simply marked failed. This means long-running subagent tasks have no recovery path. | "15-minute timeout" in Subagent System | Add retry queue or dead-letter handling for timed-out subagent tasks | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Documentation Update Policy | docs-policy, manual-enforcement, claude-md-sync | documentation-discipline | risk | CLAUDE.md mandates updating README.md and CLAUDE.md after every code change. This is manually enforced with no automation or CI check. In a multi-contributor or fast-moving codebase, documentation drift is likely. | "CRITICAL: Always update README.md and CLAUDE.md after every code change" | Add a CI check that compares last-modified of code files against doc files | low |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Test Coverage | test-coverage, harness-boundary, client-conformance | testing-strategy | decision | CI runs three specific regression tests on every PR: test_docker_sandbox_mode_detection.py, test_provisioner_kubeconfig.py, test_harness_boundary.py. This is minimal but targeted. Backend test suite also has test_client.py (77 unit tests) and test_client_live.py (integration). | "CI runs these regression tests for every pull request" | NOT LAME should adopt targeted regression tests per architectural boundary | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | MCP System > OAuth | mcp-oauth, token-refresh, http-transport | mcp-integration, oauth | technology | MCP OAuth supports client_credentials and refresh_token flows with automatic token refresh + Authorization header injection. HTTP/SSE transports supported. Lazy initialization with mtime-based cache invalidation. | "Supports token endpoint flows (`client_credentials`, `refresh_token`) with automatic token refresh" | Reference for MCP adapter OAuth implementation | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Model Factory | model-factory, thinking-enabled, vision-support, env-var-resolution | model-selection, configuration | technology | create_chat_model(name, thinking_enabled) supports thinking_enabled flag with per-model when_thinking_enabled overrides, supports_vision flag. Missing provider modules surface actionable install hints (e.g., `uv add langchain-google-genai`). | "Config values starting with `$` resolved as environment variables" + "Missing provider modules surface actionable install hints from reflection resolvers" | Reference for model factory pattern in NOT LAME | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Tool System | tool-groups, mcp-tools, builtin-tools, community-tools | tool-architecture, plugin-system | technology | get_available_tools() assembles from: config-defined tools (resolved via resolve_variable), MCP tools (lazy, cached), built-in tools (present_files, ask_clarification, view_image), subagent tool (task). Community tools: tavily, jina_ai, firecrawl, image_search. | "Tool System assembles: 1. Config-defined tools, 2. MCP tools, 3. Built-in tools, 4. Subagent tool (if enabled)" | Reference for NOT LAME's skillpack adapter/plugin architecture | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | File Upload | file-upload, document-conversion, markitdown, thread-isolation | file-handling, document-processing | technology | Upload endpoint supports PDF, PPT, Excel, Word with markitdown conversion. Rejects directory inputs before copying (all-or-nothing semantics). Thread-isolated storage. Reuses one conversion worker per request when called from an active event loop. | "Supports: PDF, PPT, Excel, Word documents (converted via `markitdown`)" | Reference for document ingestion in Rosetta's intake pipeline | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Plan Mode | plan-mode, todo-list, is-plan-mode-flag | task-tracking, planning-mode | technology | TodoList middleware is optional, controlled by runtime config: `config.configurable.is_plan_mode = True`. Provides `write_todos` tool for task tracking. One task in_progress at a time, real-time updates. | "Controlled via runtime config: `config.configurable.is_plan_mode = True`" | Reference for plan mode implementation in NOT LAME | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Context Summarization | summarization, context-reduction, token-limits | context-management, summarization | technology | SummarizationMiddleware reduces context when approaching token limits. Trigger types: tokens, messages, or fraction of max input. Keeps recent messages while summarizing older ones. Configured in config.yaml under summarization key. | "Context reduction when approaching token limits (optional, if enabled)" | Reference for context window management in NOT LAME | medium |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Frontend Configuration | frontend-config, nginx-routing, base-urls | frontend-deployment, nginx | technology | Frontend uses NEXT_PUBLIC_LANGGRAPH_BASE_URL (default: /api/langgraph through nginx) and NEXT_PUBLIC_BACKEND_BASE_URL (default: empty — through nginx). make dev starts all services with nginx routing /api/langgraph/* → LangGraph (2024), /api/* → Gateway (8001), / → Frontend (3000). | "When using `make dev` from root, the frontend automatically connects through nginx" | Reference for multi-service deployment with nginx reverse proxy | low |
| 2026-04-25 | docs/external/DeerFlow Architecture.md | Im Channels > Store | channel-thread-mapping, json-persistence, root-vs-threaded | im-channels, thread-management | technology | Store.py persists mapping of channel_name:chat_id[:topic_id] → thread_id. Keys are channel:chat for root conversations, channel:chat:topic for threaded. Uses JSON file persistence. | "store.py - JSON-file persistence mapping `channel_name:chat_id[:topic_id]` → `thread_id`" | Reference for channel-to-thread mapping in NOT LAME's connector layer | low |

## Components And Technologies

- **LangGraph** (2024) — agent runtime and workflow execution
- **FastAPI** (8001) — Gateway REST API
- **Next.js** (3000) — frontend web interface
- **Nginx** (2026) — unified reverse proxy
- **deerflow-harness** — publishable Python package (import: deerflow.*)
- **app.gateway** — unpublished FastAPI application (import: app.*)
- **langchain-mcp-adapters** — MultiServerMCPClient for MCP tool integration
- **markitdown** — document conversion (PDF/PPT/Excel/Word → text)
- **JSON file store** — thread/channel persistence (no Redis)
- **aio_sandbox** (community) — Docker-based sandbox isolation
- **Python 3.12+** with type hints, double quotes, 240-char line length

## Conceptual Claims

- LangGraph is the execution/runtime layer for agents, not the constitutional/trust boundary
- A publishable framework package can be cleanly separated from unpublished application code via import-prefix conventions and CI enforcement
- Per-thread sandbox isolation via virtual path translation is viable and practical
- Multi-stage middleware composition is the right model for cross-cutting agent concerns (upload tracking, memory queuing, sandbox lifecycle, etc.)
- Structured memory with fact-level confidence scoring is achievable with simple JSON storage
- Subagent delegation with concurrency limits and timeouts is a valid pattern, though retry/requeue is needed for production
- Gateway API + embedded client duality provides both hosted and in-process deployment options

## Dependencies And Sequencing

- DeerFlow is an external reference, not a dependency of Rosetta
- NOT LAME's adapter certification harness (8 test classes) is analogous to DeerFlow's test_harness_boundary.py
- Rosetta's context compiler (bounded bundles by role/risk class) is not present in DeerFlow — gap
- NOT LAME's skillpack importer (parse→normalize→quarantine→certify→promote) has no equivalent in DeerFlow — DeerFlow's skills installation lacks quarantine/certification
- DeerFlow's JSON file persistence for thread/channel state differs from NOT LAME's PostgreSQL canonical registry requirement
- Memory fact deduplication via whitespace trim could collide with Rosetta's strict uniqueness requirements

## Contradictions Or Supersession

- NOT LAME's sovereign kernel demands PostgreSQL as canonical registry; DeerFlow uses JSON file persistence — this is a fundamental architectural difference, not a contradiction
- DeerFlow has no write-admission gate — all tool calls execute directly; NOT LAME requires a 9-step state machine for durable mutations
- DeerFlow has no source-provenance tracking for artifacts — NOT LAME requires receipt-law for every meaningful step
- DeerFlow's memory injection uses `<memory>` tags in system prompt; NOT LAME's memory sovereignty map specifies 5 distinct planes with different retention semantics

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| DF-001: Skill installation lacks signature verification and quarantine | security-gap | docs/intake/issue-drafts/df-001-skill-signature-gap.md | security, skills, quarantine | - | "POST /api/skills/install accepts .skill ZIP archive... No signature verification or authenticity check on skill content" |
| DF-002: Subagent timeout lacks retry/requeue mechanism | reliability-gap | docs/intake/issue-drafts/df-002-subagent-timeout-requeue.md | reliability, subagents, timeout | - | "15-minute timeout... no retry or re-queue mechanism. Timed-out tasks are simply marked failed" |
| DF-003: Local sandbox singleton may have mutable state concurrency risk | concurrency-risk | docs/intake/issue-drafts/df-003-sandbox-singleton-state.md | concurrency, sandbox, singleton | - | "LocalSandboxProvider - Singleton local filesystem execution with path mappings" — no mention of thread-safety of instance state |
| DF-004: Memory fact dedup via whitespace trim risks false collisions | correctness-risk | docs/intake/issue-drafts/df-004-memory-dedup-false-collisions.md | memory, deduplication, correctness | - | "whitespace-normalized fact deduplication (trims leading/trailing whitespace before comparing)" |
| DF-005: Config mtime reload race condition between LangGraph and Gateway | race-condition | docs/intake/issue-drafts/df-005-config-mtime-race-condition.md | config, concurrency, reload | - | "automatically reloads it when the resolved config path changes or the file's mtime increases" — no locking |
| DF-006: Documentation update policy has no CI enforcement | process-gap | docs/intake/issue-drafts/df-006-docs-policy-no-ci.md | documentation, ci, process | - | "CRITICAL: Always update README.md and CLAUDE.md after every code change" — manual enforcement only |
| DF-007: Embedded client artifact return not covered by conformance tests | testing-gap | docs/intake/issue-drafts/df-007-client-artifact-conformance.md | testing, client, conformance | - | "conformance tests only cover dict-returning methods. Methods returning non-dict types (e.g., get_artifact returns tuple of bytes) are not tested" |
| DF-008: Config auto-upgrade may silently drop fields if merge fails | robustness-gap | docs/intake/issue-drafts/df-008-config-upgrade-silent-fail.md | config, versioning, robustness | - | "make config-upgrade auto-merges missing fields" — no confirmation if merge partially fails |
| DF-009: No skill versioning or changelog; no API stability contract | api-stability | docs/intake/issue-drafts/df-009-skill-versioning-contract.md | skills, versioning, api-stability | - | "No version stability contract or changelog" found in architecture |
| DF-010: Redis-free JSON file persistence may bottleneck under high concurrency | scalability-risk | docs/intake/issue-drafts/df-010-json-store-scaling-bottleneck.md | scalability, persistence, concurrency | - | "JSON-file persistence mapping... no Redis" — JSON file writes are serializing under high thread creation rate |
| DF-011: No fact expiration or staleness mechanism in memory system | memory-gap | docs/intake/issue-drafts/df-011-memory-fact-expiration.md | memory, lifecycle, staleness | - | Memory stores facts with createdAt and confidence but no TTL or staleness detection |
| DF-012: No thread state persistence strategy documented for restarts | persistence-gap | docs/intake/issue-drafts/df-012-thread-state-restart-persistence.md | thread-state, persistence, restart | - | ThreadState schema documented but no mention of checkpoint persistence across agent restarts |
| DF-013: DanglingToolCall middleware marks interrupted tool calls but doesn't replay them | reliability-gap | docs/intake/issue-drafts/df-013-dangling-toolcall-no-replay.md | middleware, tool-calls, reliability | - | "Injects placeholder ToolMessages for AIMessage tool_calls that lack responses (e.g., due to user interruption)" — no replay mechanism |
| DF-014: MCP OAuth token refresh not validated against expiration time | oauth-gap | docs/intake/issue-drafts/df-014-mcp-oauth-refresh-timing.md | mcp, oauth, token-refresh | - | "automatic token refresh" mentioned but no specifics on refresh window or expiration detection |

## Project Board Suggestions

- Area: external-reference / not-lame-comparison
- Cycle: batch-5-external
- Status: extracted — 25 findings, 14 issue candidates
- Blocked by: none
- Parallelization notes: All findings are independent; issue drafts can be reviewed in parallel

## Open Questions

- Does DeerFlow's per-thread sandbox actually prevent a malicious agent from escaping to the host filesystem via the local provider, or is the singleton local provider a backdoor?
- What is the recovery path when a subagent task times out — is the main agent notified and can it retry, or is the failure silent?
- How does DeerFlow handle thread state persistence across LangGraph server restarts — is there a checkpointer configured?
- Does the config_version auto-merge have any rollback mechanism if the resulting config is invalid?
- Can two skills with identical content but different whitespace produce the same fact in memory and thus get deduplicated incorrectly?