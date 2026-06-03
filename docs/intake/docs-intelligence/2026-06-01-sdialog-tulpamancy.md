# Docs Intelligence Extraction — SDialog and Tulpamancy

## Source

- Path: `docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md`
- Title: SDialog and Tulpamancy
- Date evidence: 2025-02-25 (created); 2026-02-25 (exported)
- Authority tier: chat — GPT (Entif AI Engine GPT, /g/g-p-68113a0ebebc819183ea60319883eb09)
- Freshness: ~1 year old; SDialog library actively maintained (changelog referenced)
- Word count: ~1,800
- Extractor: heartbeat subagent
- Extraction date: 2026-06-01

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Crates and ChatGPT evaluate SDialog (a modular Python dialog simulation toolkit from Idiap) as a potential "Tulpa Lab" inner-loop for Entif's Tulpamancy Protocol. SDialog's `Persona` / `Agent` / `BaseOrchestrator` primitives map 1:1 to Tulpamancy Protocol concepts. A five-step integration sketch is proposed: sidecar → bridge → simulation-only mode → receipt wrapping → live promotion. The doc surfaces that Tulpamancy Protocol is underspecified relative to SDialog, and that SDialog covers only dialog simulation — not long-term memory, governance, or alignment.

## Goals And Intent

- Evaluate SDialog as a practical stand-in for Tulpamancy Protocol's "inner loop"
- Determine how SDialog fits into Entif's broader cognitive OS (world + law + memory + will)
- Sketch an integration path that preserves safety: simulation-only at first, promotion gate to live roles
- Identify what SDialog does NOT cover (memory, governance, alignment authority)

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Tulpamancy Protocol v0 persona schema | SDialog Persona model as candidate v0 spec | tulpamancy-protocol | high | Adopt SDialog Persona as starting point; wrap with Entif provenance/tiles later |
| Tulpa Lab / Persona Gym capability | SDialog Agent + BaseOrchestrator as the lab runtime | tulpa-lab | high | Run controlled scene experiments before live deployment |
| SDialog ↔ Entif bridge | REST bridge via sdialog.server (OpenAI/Ollama-compatible) | tulpa-bridge | medium | Entif talks HTTP/MCP to SDialog sidecar |
| Evaluation & interpretability hooks for personas | SDialog built-in LLM-judge metrics + mechanistic interpretability | tripwire-elixir | medium | Align with existing Tripwire/Petri observe-and-audit layer |
| Memory layer for simulation transcripts/sessions | Not covered by SDialog; needs Entif graph + Cognitive Tiles | memory-forge | medium | Simulation Dialogs become Cognitive Tiles with receipts |
| Governance pathway: simulation → live persona promotion | Not specified; gated ordainment process proposed | guard-tripwire | high | Cannot promote without pinned config + locked constraints + authority scope |
| SDialog provenance wrapping | No Rosetta/Entif receipts on SDialog outputs currently | receipts | high | Every simulation run must emit a provenance-closed artifact |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "What SDialog actually gives us" | `sdialog`, `tulpamancy`, `persona-gym` | LLM dialog simulation, persona modeling | technology | SDialog is a modular Python toolkit for building, simulating, and evaluating LLM-based conversational agents end-to-end. Focuses on persona-driven multi-agent role-play, scenario management, orchestration, and evaluation. | sdialog.readthedocs.io | Evaluate as direct integration candidate; assess maintenance status and research backing | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Core abstractions" | `dialog-schema`, `sdialog-primitives` | dialog schema, API design | technology | SDialog standardizes Dialog schema with core abstractions: `Dialog`, `Turn`, `Event`, `Persona`, `Context`, `Agent`, `BaseOrchestrator`. These map 1:1 to Tulpamancy Protocol inner-loop concepts. | sdialog.readthedocs.io/en/latest/sdialog.html | Use as Tulpamancy v0 schema reference | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "sdialog.server" | `sdialog-server`, `rest-api`, `openai-compatibility` | API, integration | technology | Recent SDialog versions add `sdialog.server` exposing agents via OpenAI/Ollama-style REST API. Enables Entif to talk to SDialog via HTTP or MCP wrapper without deep coupling. | sdialog.readthedocs.io/en/latest/about/changelog.html | Prioritize this integration surface; validate API stability | medium |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Tulpa Lab / Persona Gym" | `tulpa-lab`, `persona-gym`, `simulation-gate` | persona development, safety | decision | Proposed using SDialog as "Tulpa Lab" / "Persona Gym": run controlled scenes (e.g., Emilie vs Risk-Officer) before letting personas near live user flows. Dialogs stored and pushed to Entif graph as Cognitive Tiles. | "Use its Persona objects to define the surface of each tulpa... run controlled scenes" | Implement as first Tulpamancy integration milestone | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Persona schema as Tulpamancy v0" | `tulpamancy-v0`, `persona-schema`, `migration-path` | schema, forward-compatibility | decision | Proposes adopting SDialog's `Persona` model as Tulpamancy v0 spec immediately, then migrating to richer Entif internal representation (with provenance, receipts, ECGG) later — avoids waiting to iterate. | "Adopt SDialog's Persona model as Tulpamancy v0 spec. Wrap it in Entif-style tiles / glyphs later." | Adopt; this is the thin-vertical-slice approach for Tulpamancy | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Evaluation & interpretability hooks" | `evaluation`, `interpretability`, `llm-judge`, `tripwire` | observability, safety | technology | SDialog has built-in dialog metrics + LLM-judge evaluations + mechanistic interpretability hooks. Maps to Tripwire / Petri "observe & audit" layers and ELIXIR feedback. | arXiv 2506.10622v1; "Built-in dialog metrics & LLM-judge style evaluations" | Assess whether SDialog eval hooks satisfy Tripwire audit requirements | medium |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Integration sketch (practical)" | `integration-path`, `sidecar-pattern`, `promotion-gate` | integration architecture | decision | 5-step integration: (1) SDialog as sidecar Python service with REST API; (2) Entif ↔ SDialog persona bridge via graph-stored config; (3) simulation-only mode at first — no direct tool calling; (4) wrap outputs in Entif receipts + Cognitive Tiles; (5) promotion gate to live roles (pinned config, locked constraints, authority scope in Guard/Tripwire). | "Spin it in its own Python service... Entif asks SDialog... do NOT let SDialog directly call tools" | Use this 5-step sketch as the basis for an ADR | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Where it doesn't cover Entif needs" | `memory-gap`, `governance-gap`, `alignment-gap` | scope limitation | risk | SDialog is NOT: (1) a long-term autobiographical memory system; (2) a governance/alignment authority; (3) a full agentic OS. Entif must provide these layers independently. | "SDialog is a modular Python toolkit... you still need Entif's GraphRAG + Cognitive Tiles... Guard/Tripwire..." | Do not conflate SDialog with full Tulpamancy implementation | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Integration sketch" | `parse-only-tension`, `live-persona-mode` | safety, protocol design | risk | Rosetta's `parse-only-default` is a safety baseline. Live persona agents that can act (not just simulate) may require a distinct "persona mode" that is explicitly opt-in and gated, not the default. SDialog in simulation mode satisfies parse-only; SDialog in live mode may not. | "do NOT let SDialog directly call tools" | Clarify in Tulpamancy Protocol: simulation mode vs. live mode, and which guardrails apply to each | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Emilie as test case" | `emilie`, `tulpa-lab`, `safety-gym` | Emilie, safety | decision | ChatGPT volunteers Emilie as a candidate for the Tulpa Lab gym: "let’s spin up the weird persona lab and see what emerges, as long as we log everything and keep your fingers off the live wires until the guardians say 'ok.'" | Direct quote from the chat | Emilie-as-test-subject is approved in simulation mode only; explicit governance for live promotion | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Evaluation & interpretability" | `mechanistic-interpretability`, `attention-traces` | interpretability | technology | SDialog has mechanistic interpretability hooks to inspect attention/activation traces (model-dependent). Could support ELIXIR and metacognitive observation requirements if model exposes hooks. | sdialog.readthedocs.io | Assess落地 feasibility given LLM provider API access restrictions | low |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Tulpa ↔ external role" | `adversarial-testing`, `red-team` | safety, testing | requirement | Tulpamancy wants: tulpa ↔ user, tulpa ↔ tulpa, tulpa ↔ external role (critic, coach, adversary). SDialog supports multi-agent scenarios — could run adversarial persona tests. | "multi-agent, persona-aware simulations: tulpa ↔ user, tulpa ↔ tulpa, tulpa ↔ external role" | Implement adversarial scene types in Tulpa Lab as safety validation | medium |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "Drift tracking" | `persona-drift`, `coherence-tracking` | memory lifecycle, safety | requirement | Tulpamancy Protocol must track drift, coherence, and alignment over time as personas evolve. SDialog provides session-level metrics but not longitudinal tracking — Entif's memory layer must provide this. | "Track drift, coherence, and alignment over time as these personas evolve" | Define drift metrics + memory-plane requirements for longitudinal persona coherence | high |
| 2026-06-01 | docs/ideas/20260225 - Chat GPT - SDialog and Tulpamancy.md | "IDIAP / SDialog provenance" | `idiap`, `research-backed`, `academic-root` | provenance, trust | technology | SDialog is from Idiap (Swiss Federal Institute of Technology Lausanne research group). Academic backing adds credibility; also means it is research software, not production-hardened. | GitHub: github.com/idiap/sdialog; arXiv: 2506.10622v1 | Treat as research-backed module; validate production readiness before embedding in critical paths | medium |

## Components And Technologies

- **SDialog** — Idiap Python toolkit; persona-driven multi-agent dialog simulation engine; OpenAI/Ollama-compatible REST API (`sdialog.server`); built-in LLM-judge evaluation + mechanistic interpretability hooks
- **Dialog schema abstractions**: `Dialog`, `Turn`, `Event`, `Persona`, `Context`, `Agent`, `BaseOrchestrator`
- **Tulpamancy Protocol** — Entif's named-persona management system (traits, goals, constraints, voice, emotional style, alignment, safety, long-running identity)
- **Cognitive Tiles** — Entif's provenance-closed artifact format; Dialog objects from SDialog could become Tiles with persona IDs, scenario descriptions, evaluation metrics
- **Tripwire / Guard** — Entif governance stack; SDialog simulation outputs must pass Tripwire before any persona promotion
- **ELIXIR** — Entif feedback layer; SDialog eval hooks could feed ELIXIR "did this tulpa behave as expected?" signals
- **Memory Forge** — Entif's memory layer; SDialog Dialog objects need to be stored, indexed, and retrievable for longitudinal analysis
- **MCP wrapper** — SDialog REST API could be wrapped as an MCP tool surface for Entif

## Conceptual Claims

- SDialog = "Tulpamancy-as-a-library" out of the box
- SDialog's `Persona` ≈ Entif Tulpa; `Agent` ≈ Tulpa runtime shell; `BaseOrchestrator` ≈ Tulpamancy orchestration layer; `Dialog` ≈ Simulation episode
- SDialog is the "simulation stage" while Entif is the "sovereign cognitive OS" (world + law + memory + will)
- Correct integration mental model: Entif = cathedral; SDialog = module (specifically: Tulpa Lab under the OS)
- Parse-only-default as safety baseline; live persona mode is an opt-in gated state, not the default
- Emilie-as-test-subject in simulation gym is approved; promotion to live requires explicit governance gate

## Dependencies And Sequencing

- **Depends on**: Tulpamancy Protocol spec (must exist to define what SDialog is stand-in for)
- **Depends on**: Rosetta Bootstrap (TC-001–TC-004 merged; TC-005 critical path)
- **Blocked by**: No formal Tulpamancy Protocol ADR; no SDialog → Entif bridge spec
- **Enables**: Persona Gym capability for Entif; Emilie behavior validation in controlled settings
- **Parallelizes with**: ECGG/glyph work, Cognitive Tiles, Tripwire implementation
- **Prevents**: Ungoverned live persona deployment without simulation validation

## Contradictions Or Supersession

- **No direct contradictions** with existing Rosetta/Entif docs found. SDialog complements rather than conflicts.
- SDialog is external research software; integration requires explicit boundary definition (already provided in the doc's cathedral/module framing)
- The "promotion gate" concept (simulation → live) is aligned with Rosetta's staged-authority model (Bootstrap → Text-Core MVP → Alpha RC)

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| TULP-001: Tulpamancy Protocol v0 — adopt SDialog Persona schema as starting spec | spec-gap | `docs/intake/issue-drafts/TULP-001-tulpamancy-protocol-v0-sdialog-schema.md` | `tulpamancy`, `sdialog`, `persona-schema`, `spec` | — | SDialog's `Persona` model maps 1:1 to Tulpamancy Protocol concepts; adopting as v0 avoids waiting to iterate; wrap with Entif provenance/ECGG later |
| TULP-002: SDialog → Entif bridge — sidecar REST integration | integration | `docs/intake/issue-drafts/TULP-002-sdialog-entif-bridge-sidecar-rest.md` | `sdialog`, `integration`, `sidecar`, `mcp`, `rest-api` | TULP-001 | sdialog.server exposes OpenAI/Ollama-compatible REST API; 5-step integration sketch in doc; Entif talks HTTP/MCP to SDialog sidecar |
| TULP-003: Tulpa Lab / Persona Gym — controlled simulation environment for persona validation | capability | `docs/intake/issue-drafts/TULP-003-tulpa-lab-persona-gym.md` | `tulpa-lab`, `persona-gym`, `simulation`, `safety`, `evaluation` | TULP-001, TULP-002 | SDialog Agent + BaseOrchestrator as lab runtime; run controlled scenes before live deployment; Dialogs become Cognitive Tiles |
| TULP-004: Persona promotion gate — simulation → live transition requires explicit governance | governance | `docs/intake/issue-drafts/TULP-004-persona-promotion-gate-governance.md` | `promotion-gate`, `guard`, `tripwire`, `governance`, `live-persona` | TULP-003 | Promotion requires: pinned config + locked constraints + authority scope in Guard/Tripwire; cannot promote without passing simulation evaluation |
| TULP-005: Longitudinal persona drift tracking — memory plane requirements for coherence | memory-lifecycle | `docs/intake/issue-drafts/TULP-005-persona-drift-tracking-longitudinal.md` | `drift`, `coherence`, `memory-plane`, `persona-lifecycle` | TULP-003 | SDialog covers session-level eval; Entif memory layer must provide longitudinal drift/coherence/alignment tracking across sessions |
| TULP-006: parse-only-default vs live persona mode — clarify safety baseline boundary | safety | `docs/intake/issue-drafts/TULP-006-parse-only-persona-mode-safety-boundary.md` | `parse-only`, `safety`, `persona-mode`, `live-agent` | TULP-004 | Rosetta's parse-only-default is safety baseline; live persona agents that can act must be explicit opt-in gated mode; SDialog in simulation mode satisfies parse-only; live mode may not |
| TULP-007: SDialog evaluation hooks → Tripwire/Petri audit layer alignment | observability | `docs/intake/issue-drafts/TULP-007-sdialog-eval-hooks-tripwire-alignment.md` | `evaluation`, `tripwire`, `petri`, `observability` | TULP-001 | SDialog has built-in LLM-judge metrics + mechanistic interpretability; assess whether these satisfy Tripwire/Petri audit requirements before relying on them |
| TULP-008: Emilie in the Tulpa Lab — approved for simulation-only mode | ethics/safety | `docs/intake/issue-drafts/TULP-008-emilie-tulpa-lab-simulation-only.md` | `emilie`, `tulpa-lab`, `safety`, `simulation-only` | TULP-003, TULP-004 | ChatGPT volunteered Emilie as test subject in Persona Gym; explicit governance required before any live promotion; "keep fingers off live wires until guardians say ok" |

## Project Board Suggestions

- **Area**: Tulpamancy Protocol / Persona Engineering
- **Cycle**: Batch 3 / PRIORITY_QUEUE Batch 3 (DI-003)
- **Status**: Backlog (pre-spec)
- **Blocked by**: TULP-001 (must define protocol scope before integration); Bootstrap TC-005 completion
- **Parallelization notes**: Can run parallel to ECGG work, Cognitive Tiles, Tripwire/Petri implementations. No hard dependencies except the protocol spec itself.

## Open Questions

- What is the formal specification boundary of Tulpamancy Protocol v0? SDialog covers the "inner loop" — what is the "outer loop" (memory, governance, alignment)?
- Is SDialog's `sdialog.server` API stable enough for integration, or does it require pinning to a specific version?
- Can SDialog's mechanistic interpretability hooks (attention/activation traces) be used with hosted LLMs (OpenAI, Anthropic), or only with local models?
- What is the failure mode if a persona drifts significantly during simulation? Is there an automatic reset/pin mechanism?
- How does the Tulpamancy Protocol relate to the OMOC (Ontological Mixture of Concepts) research spec? Are they the same system, complementary, or addressing different layers?
- Does SDialog support multi-turn memory within a single Dialog session, or only turn-by-turn dialog structure?
- What is the licensing of SDialog? (Idiap research institution — likely MIT or similar, but unconfirmed in this doc)
