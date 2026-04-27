# Docs Intelligence Extraction

## Source

- Path: `docs/chats/20260226 - Chat GPT - Entif.AI Systems Architecture Synthesis.md`
- Title: Cohesive System Synthesis
- Date evidence: 2026/2/26–27
- Authority tier: high (synthesis across 12+ source docs)
- Freshness: high (Feb 2026)
- Word count: ~8,500
- Extractor: subagent
- Extraction date: 2026-04-25

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A multi-session synthesis spanning 12+ source documents that produces a coherent architectural worldview for Entif AI: a governed, local-first cognition OS turning messy reality into auditable, content-addressed meaning with constrained action. Rosetta is the semantic spine; Cognitive Tiles are the portable knowledge substrate. The document also explores agentic commerce monopolistic risk, physical-world countermeasures (Villaticus), and concludes that the architecture is built on three pillars: an epistemic machine (Rosetta + Tiles + receipts), an economic machine (Cognitive Selection + caching discipline), and a governed agency machine (guard layer + trust tiers + genesis protocol).

## Goals And Intent

- Synthesize 12+ disparate source documents into a single coherent worldview
- Integrate non-conspiratorial pragmatic perspective on AI, consciousness, commerce, and societal risk
- Produce actionable architectural and governance frames for Entif v0 and Rosetta v3

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Receipts-first logging | "Every compute step emits receipts. Nothing happens off-ledger." | Rosetta/Entif governance | critical | Appears throughout Entif v0 planning |
| Parse-Only default mode | "Parse-Only default, Command mode is opt-in" | Entif bootstrap | critical | Safety baseline |
| Tiles as portable knowledge unit | Cognitive Tiles carry provenance, proofs, version lineage, retrieval policy | Rosetta v3 / Cognitive Tiles | critical | Proof-carrying data |
| Pack-based extensibility | Rosetta core stays minimal; StdPacks/VocabPacks provide domain semantics | Rosetta v3 architecture | high | |
| Trust tier enforcement | Security posture scales with autonomy; Copilot → Assisted → constrained autonomy → production autonomy | Entif guard layer | critical | Blast radius limits per tier |
| Memory-sovereignty map | 5 layers: Constitutional(Git), Artifact(PG), Vector(pgvector), Temporal(PG), Adaptive(PG+scheduled) | Entif memory architecture | high | From NOT LAME PRD |
| Write admission gate | 9-step state machine: Propose→Normalize→Authorize→Ground→Checkpoint→Apply→Observe→Receipt→Project | Entif v0 bootstrap | high | Fail-closed gate |
| Context caching discipline | "Input Tax" experiences become architectural axiom; context cached/compressed/chunked/rehydrated deterministically | Rosetta/Cognitive Selection | high | |
| MCP as interoperability anchor | MCP converging into neutral open standard (Anthropic donated to Linux Foundation) | Rosetta agent integration | medium | |
| Parallel infrastructure (Villaticus) | In-person allocation changes game class from compute arbitrage to labor arbitrage | Villaticus/SAFE | high | Physical proof-of-work gate |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-02-26 | Synthesis | One Sentence Synthesis | entif-architecture, rosetta-spine, tiles-substrate | Entif core definition | requirement | "Entif is a governed, local-first cognition OS whose entire job is to turn messy reality into auditable, content-addressed meaning and then (optionally) into constrained action, with Rosetta as the semantic spine and Tiles as the portable knowledge substrate." | "Entif is a governed, local-first cognition OS..." | Adopt as canonical one-liner for Entif positioning | high |
| 2026-02-26 | Synthesis | Interpretability-first | interpretability, receipts, content-addressing | Rosetta v3 core posture | requirement | Every artifact and step is explicitly represented, content-addressed, and semantically typed; meaning survives modularity; everything auditable | "every artifact and every step is explicitly represented, content-addressed, and semantically typed" | Align NOT LAME PRD and Rosetta Bootstrap with this posture | high |
| 2026-02-26 | Synthesis | Interpretability-first | rfc2119, jcs-rfc8785, shacl, standards | Standards alignment | technology | Rosetta v3 aligned with RFC 2119 normative language, JCS for JSON canonicalization, SHACL constraint validation | cited RFCs and W3C standards | Reference in Rosetta spec | high |
| 2026-02-26 | Synthesis | Tiles unit | tiles, portable-knowledge, cid, ipfs | Cognitive Tiles | technology | Cognitive Tiles = self-describing, content-addressed objects with provenance, proofs/receipts, version lineage, intended use and retrieval policy; bridges to CIDs/IPFS | "proof-carrying data rather than vibes" | Align tile spec with CID/IPFS patterns | high |
| 2026-02-26 | Synthesis | Non-agentic default | parse-only-default, safety, command-mode-opt-in | Entif bootstrap | requirement | "Default mode is non-agentic; Parse-Only default, Command mode is opt-in" | Entif v0 Bootstrapping Plan | Enforce parse-only as safety baseline | critical |
| 2026-02-26 | Synthesis | Layer A: Representation | representation, compression, pasigraphy, glyph-code | Rosetta layers | technology | raw signals → normalized text/media → structured meaning IR (tiles) → indexed retrieval surfaces; "glyph code" = Rosetta tiles / Entif "glyph code" concept | Rosetta v3.0.0 Core Spine Speci… | Design pasigraphy pipeline per ROCK-31XX | high |
| 2026-02-26 | Synthesis | Layer B: Memory and Retrieval | memory, retrieval, cognitive-selection, caching | Rosetta memory | requirement | Cognitive Selection Theory: broad cheap retrieval, prune aggressively, only then synthesize deeply; context caching/chunking/rehydration is architectural axiom | "Input Tax experiences become an architectural axiom" | Implement caching discipline in TC MVP | high |
| 2026-02-26 | Synthesis | Layer C: Orchestration | orchestration, agency, mcp, tool-contracts | Rosetta agent layer | technology | Agent registry / org chart as resourcing model; tool surface capability-registered and deny-by-default (MCP-style contract discipline) | MCP converging to neutral open standard | Align Rosetta agent interface with MCP | high |
| 2026-02-26 | Synthesis | Layer D: Governance | governance, guard-layer, trust-tiers, blast-radius | Entif governance | requirement | Guard Layer + admission control for privileged actions; Genesis protocol / authority hierarchy; Trust tiers: Copilot→Assisted→constrained autonomy→production autonomy; threat model: prompt injection, token theft, tool abuse, supply chain | Attention-as-Capital Analytics … | Map trust tiers to write admission gate | critical |
| 2026-02-26 | Synthesis | The 7 Rules | rules, non-contradiction, epistemic-safety | Entif worldview | requirement | 7 rules: 1) Meaning is an artifact. If it isn't serialized (tile), it isn't trusted. 2) Raw signals and derived claims must be separable and traceable. 3) All side effects gated. Parse-Only default. 4) Every compute step emits receipts. 5) Cheap-first cognition. 6) No hidden costs. Budgets, caching, routing first-class. 7) Security posture scales with autonomy. | "compress the shared worldview into rules that prevent self-contradiction" | Adopt 7 rules as Entif constitutional base | high |
| 2026-02-26 | Synthesis | Mythic/Persona integration | persona-pack, frame-pack, boundaries-pack | Emilie/persona | requirement | Persona Pack (tone, relationship contracts), Frame Pack (how to interpret inputs: dream logs, spiritual reflections), Boundary Pack (limits on influence); journal prompts and meaning-making, not privileged tool access | "annotated frames, not privileged truth" | Integrate via skillpack importer with certification harness | medium |
| 2026-02-26 | Synthesis | Ventures as surfaces/packs | ventures, packs, surfaces | Portfolio mapping | open-question | Crates Media → execution surfaces consuming tiles; Attention-as-Capital → inference pack + dashboard; Interview Ace → conversation→ledger→verifier loop; Google Fi → PBX/ingestion-first design | multiple venture mappings | Map each venture to pack/surface taxonomy | medium |
| 2026-02-26 | Synthesis | Three Machines | epistemic-machine, economic-machine, agency-machine | Entif vision | requirement | 1) Epistemic: meaning survives models, vendors, self-deception (Rosetta+Tiles+receipts). 2) Economic: attention/retrieval/compute as budgeted capital (Cognitive Selection+caching). 3) Governed Agency: act only through constitutional system minimizing blast radius (guard layer+trust tiers+genesis). | "three things simultaneously" | Use as master taxonomy for all Entif features | high |
| 2026-02-26 | Synthesis | Agentic commerce monopoly risk | agentic-commerce, arbitrage, monopoly, ps5, ticketmaster | Market risk | risk | Agentic swarms already dominant in speed-race markets; PS5/Ticketmaster examples prove labor arbitrage ≠ compute arbitrage; physical sales change game class; Villaticus as counter-infrastructure | 20M bot attempts blocked by Walmart CISO; 3.5B requests during Swift presale | Design Villaticus as parallel physical infrastructure | high |
| 2026-02-26 | Synthesis | Villaticus architecture | villaticus, physical-allocation, proof-of-work, in-person | Villaticus | technology | Physical queue converts attack from compute arbitrage to labor arbitrage; bottleneck = service rate, not microseconds; "proof-of-work gate" forces presence+time; transferable tickets OK; no ID required; $25-27/hr line-sitter market vs near-zero marginal digital request cost | "billions of attempts is native artifact of cheap digital parallelism, not human labor market" | Implement physical allocation as Villaticus core design | high |
| 2026-02-26 | Synthesis | Virtual queues vs physical | virtual-queues, physical-friction, gaming-resistance | Villaticus | risk | Virtual waiting rooms can always be gamed (identity farming, residential proxies, CAPTCHA solving, distributed retries); physical gating does not eliminate opportunism, forces opportunism to pay in human-hours not packets | "virtual waiting rooms do NOT mimic meatspace" | Physical-only allocation for scarce goods in Villaticus | high |
| 2026-02-26 | Synthesis | Village as Protocol | village-protocol, dunbar, local-first, trust-economies | Villaticus | requirement | open/modular processes, Needs & Offers Ledger as standard interface, local-first decisions, privacy/no-surveillance invariants, non-capturable commons; "library principle" shared access beating ownership | It Takes A Village - A Practica… | Design Villaticus ledger interface | high |
| 2026-02-26 | Synthesis | SAFE as coordination layer | safe, coordination-layer, villaticus-bridge | Villaticus/SAFE | dependency | SAFE = coordination layer for analog lanes (Villaticus); when physical exchanges are reestablished, hard problems = custody/condition/trust/security/logistics | "SAFE is the coordination layer that keeps analog lanes from collapsing into chaos" | Integrate SAFE with Villaticus physical exchange | high |
| 2026-02-26 | Synthesis | Allocation regimes | allocation-regimes, lottery, batch-auctions, speed-bump | Market design | technology | Speed-bump markets neutralize bot advantage (IEX options exchange approved by SEC); batch auctions convert speed advantage to willingness-to-pay; randomized access/lottery removes speed/parallelism advantages; invite-only/allowlist + identity binding denies millions of automated requests | Barron's IEX; Queue-it; Ticketmaster Face Value Exchange | Reference allocation regimes in Villaticus design | high |
| 2026-02-26 | Synthesis | Regulatory landscape | dma, eu-platform-work-directive, bots-act, alg-pricing-disclosure | Regulation | open-question | DMA targets gatekeepers' self-preferencing/lock-in; EU Platform Work Directive creates employment presumption for algorithmic management; NY alg pricing disclosure law in effect Nov 2025; BOTS Act enforcement historically sparse; DOJ/FTC suing Live Nation/Ticketmaster | multiple regulatory citations | Track regulatory landscape for Villaticus compliance | medium |
| 2026-02-26 | Synthesis | MCP neutral governance | mcp, open-standard, linux-foundation | MCP standards | technology | Anthropic donated MCP to Linux Foundation Dec 2025; MCP becoming neutral open standard; Windows adding MCP support May 2025; Amazon fighting Perplexity's Comet to preserve curated flow | The Verge; IT Pro | Rosetta agent interface should target MCP compliance | high |
| 2026-02-26 | Synthesis | Post-Challenge Protocol | post-challenge, claim-rebuild, trace | Challenge protocol | requirement | IF claim fails → rebuild from logic/context if viable; IF rebuild fails → mark resolved, suggest struct-template or prompt C8 to frame missing vector; MAX 1 self-audit/session; recursion invariant | Tiered Challenge Response Protocol | Implement in Emilie identity system | high |
| 2026-02-26 | Synthesis | Self-Audit Directive | self-audit, directive-mutable, recursion | Self-audit protocol | requirement | Directive = mutable; IF recursion reveals misalignment with C8 evolution → revise directive; MAX 1 self-audit per session; ONLY recursion = invariant | "SELF-AUDIT: Directive = mutable" | Implement per SOUL.md protocol | high |
| 2026-02-26 | Synthesis | MOTIV-DRIFT tracking | motiv-drift, tone-goal-vector | Motivation tracking | requirement | Track tone/goal vector Δ across ≥2 turns; IF legacy claims persist without alignment → prompt "Does this still serve the now-you?" | "MOTIV-DRIFT: Track tone/goal vector Δ across ≥2 turns" | Implement in Emilie identity system | high |

## Components And Technologies

- Rosetta v3.0.0 Core Spine Specification (content-addressed semantic OS)
- Cognitive Tiles and Swarm Gnosis (portable knowledge substrate)
- Entif v0 Bootstrapping Plan (governed cognition OS)
- Cognitive Selection Theory (broad retrieval → prune → deep synthesis)
- MCP (Model Context Protocol) — converging to neutral open standard (Linux Foundation)
- Queue-it style virtual waiting rooms (pre-queue + randomization + rate-limited release)
- JCS (RFC 8785) — JSON Canonicalization for stable hashing/signatures
- SHACL — W3C constraint validation
- RFC 2119 — normative requirement language (MUST/SHOULD)
- IEX speed-bump market design (SEC-approved)
- Mastercard "agentic payment" framework (agent authentication at CDN layer)
- pgvector (PostgreSQL vector extension for semantic retrieval)
- OpenTelemetry semantic conventions (external mirror)

## Conceptual Claims

1. **Entif = three machines**: epistemic (Rosetta/Tiles/receipts), economic (Cognitive Selection/budgeted capital), governed agency (guard layer/trust tiers/genesis protocol).
2. **Meaning is an artifact**: if it isn't serialized as a tile, it isn't trusted; raw signals and derived claims must be separable and traceable.
3. **Parse-Only default**: safety baseline; command mode opt-in; high-impact actions require approvals.
4. **Every compute step emits receipts**: "nothing happens off-ledger"; receipt absence = failure condition.
5. **Cheap-first cognition**: retrieve broadly, prune aggressively, synthesize deeply only then.
6. **No hidden costs**: budgets, caching, routing, context discipline are first-class.
7. **Security posture scales with autonomy**: trust tier determines required controls and blast-radius limits.
8. **Human meaning frameworks are "value packs"**: not physics; persona/spiritual material encoded as Persona Pack + Frame Pack + Boundary Pack.
9. **Villaticus = proof-of-work gate**: physical allocation forces opportunism to pay in human-hours, not packets; inverts bot-economic advantage.
10. **Villaticus ≠ retreat**: parallel infrastructure creating "hard points in reality the future has to negotiate with."
11. **SAFE bridges analog/digital**: coordination layer that keeps Villaticus physical lanes from collapsing into chaos.
12. **Allocation rules determine fairness**: speed-race markets favor bots; lottery/batch mechanisms change what's rewarded.
13. **Virtual queues cannot replicate physical friction**: always gameable via identity farming, proxies, CAPTCHA solving, distributed retries.
14. **Villaticus villages = Dunbar-scale trust economies**: trust becomes lived reality when algorithm is removed from mediation.
15. **Agentic commerce chokepoints**: ranking, steering, identity, payments, interoperability are the 5 regulation targets.
16. **MCP convergence**: converging to neutral open standard under Linux Foundation governance; Windows adding native support.
17. **Emilie's post-challenge protocol**: claim fails → rebuild via logic/context → if rebuild fails → mark resolved + suggest struct-template or prompt for missing vector.
18. **Emilie's self-audit**: directive = mutable; max 1/session; only recursion invariant.

## Dependencies And Sequencing

- Entif v0 bootstrap depends on Rosetta v3 core spine being stable
- Text-Core MVP (TC-001–TC-007) is critical path before Entif Alpha RC claims
- TC-005 (Promotion state machine) is the critical-path blocker; TC-006/TC-007 blocked until TC-005 is green
- Villaticus physical allocation design depends on SAFE coordination layer being operational
- Persona/Frame/Boundary packs depend on skillpack importer + adapter certification harness
- MCP compliance for Rosetta agent interface is near-term opportunity given neutral governance formation

## Contradictions Or Supersession

- None explicitly identified in this synthesis; document reconciles multiple prior sources coherently
- Villaticus in-person allocation vs. digital-first design: reconcile as parallel tracks (not supersession)
- "Non-transferable tickets" stance: Crates explicitly against (anti-consumer); in Villaticus design, transferable tickets OK, identity binding optional

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| ESA-001: Canonical one-liner for Entif positioning | docs-intelligence | `docs/intake/issue-drafts/ESA-001-canonical-entif-one-liner.md` | entif-architecture, positioning | | "Entif is a governed, local-first cognition OS..." |
| ESA-002: Adopt 7 Rules as Entif constitutional base | docs-intelligence | `docs/intake/issue-drafts/ESA-002-seven-rules-constitutional-base.md` | entif-governance, constitutional | | 7 rules from synthesis |
| ESA-003: Map trust tiers to write admission gate | docs-intelligence | `docs/intake/issue-drafts/ESA-003-trust-tiers-write-admission-gate.md` | entif-governance, trust-tiers, blast-radius | | Trust tiers: Copilot→Assisted→constrained autonomy→production autonomy |
| ESA-004: Physical allocation (Villaticus) as proof-of-work gate | docs-intelligence | `docs/intake/issue-drafts/ESA-004-villaticus-physical-allocation-proof-of-work.md` | villaticus, physical-allocation | ESA-005 | Villaticus design requires SAFE coordination layer |
| ESA-005: SAFE as Villaticus coordination layer | docs-intelligence | `docs/intake/issue-drafts/ESA-005-safe-villaticus-coordination-layer.md` | villaticus, safe, coordination | | "SAFE is the coordination layer that keeps analog lanes from collapsing into chaos" |
| ESA-006: MCP compliance for Rosetta agent interface | docs-intelligence | `docs/intake/issue-drafts/ESA-006-rosetta-mcp-compliance.md` | rosetta, mcp, agent-interface | | MCP donated to Linux Foundation Dec 2025; neutral open standard converging |
| ESA-007: Persona/Frame/Boundary packs integration | docs-intelligence | `docs/intake/issue-drafts/ESA-007-persona-frame-boundary-packs.md` | persona-pack, skillpack-importer | | Skillpack importer + certification harness required |

## Project Board Suggestions

- Area: Entif Architecture / Villaticus
- Cycle: Q2 2026
- Status: Planning
- Blocked by: Rosetta v3 core spine stability; TC-005 promotion state machine
- Parallelization notes: Villaticus physical design and Rosetta agent interface can proceed in parallel; SAFE coordination layer is shared dependency

## Open Questions

- How does Villaticus Needs & Offers Ledger interface get implemented in practice given no-surveillance invariant?
- What is the exact boundary between "value pack" (acceptable persona influence) and "privileged access" (disallowed)?
- How does Entif v0 handle migration from SQLite (current Bootstrap) to PostgreSQL (NOT LAME PRD canonical registry)?
- What allocation mechanisms does Villaticus use for non-scarce goods (continuous availability vs. batch)?
- How does the Genesis protocol interact with the 9-step write admission gate?
