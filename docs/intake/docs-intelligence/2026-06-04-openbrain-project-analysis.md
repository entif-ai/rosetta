# Extraction: OpenBrain Project Analysis

- Path: `docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md`
- Title: Chat GPT - OpenBrain Project Analysis
- Date evidence: 2026/03/23 (chat export date)
- Authority tier: conversational research
- Freshness: 2026-03-23
- Word count: ~2400
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Crates McD researched the OpenBrain project (a self-hosted local AI assistant system) and explored its architecture, telemetry, self-evolution capabilities, and how to integrate it into Entif's ecosystem. Key themes: OB1 assimilation pipeline, telemetry-first design, adaptive memory layers, skill hardening, and the tension between open-source self-hosting and the convenience of cloud APIs.

## Goals And Intent

- Assess OpenBrain as a potential component in the Entif architecture
- Understand OB1's self-evolution engine and telemetry model
- Evaluate integration points with Rosetta's sovereign kernel and skill broker
- Explore whether OpenBrain's local-first model could serve as an alternative to cloud-dependent agentic stacks

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OpenBrain OB1 | openbrain, ob1, telemetry, self-evolution, skill-hardening | architecture | OpenBrain OB1 is a self-hosted AI assistant project with a focus on self-evolution via telemetry-driven feedback loops. The system monitors its own performance and adjusts behavior based on accumulated evidence. | chat export, OB1 described as "self-hosted, local AI assistant" | Assess for TC-007 memory-plane integration | high |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OB1 Telemetry Model | telemetry, receipts, self-evolution, receipts-law | architecture | OB1's self-evolution engine is telemetry-first: every action emits structured logs that feed back into the model's behavior profile. This mirrors Rosetta's receipts-first doctrine. | "every action logged, analyzed, and used to improve next decision" | Align OB1 telemetry schema with Rosetta receipt schema; consider OB1 as a validation harness for receipt-law | high |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | Skill Hardening Pipeline | skill-hardening, adaptive-memory, moltron, self-evolution | architecture | OpenBrain uses a "skill hardening" pipeline: skills that prove reliable are promoted, unstable skills are demoted or quarantined. This is analogous to memory-tier promotion in NOT LAME's 5-layer model. | skill hardening described as "skills that prove reliable over N iterations get promoted to stable tier" | Align with NOT LAME promotion ladder; OB1 skill hardening could validate the memory-sovereignty-map promotion logic | high |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | Local vs Cloud Tradeoff | local-first, cloud-api, telemetry, sovereignty | risk | OpenBrain's local-first model provides sovereignty advantages but introduces deployment complexity and limits access to frontier models. The telemetry benefits are real but require infrastructure investment. | "local-first means you own the data but you own the infrastructure too" | Model this as an explicit architectural decision in the NOT LAME threat model: local = sovereignty + ops cost, cloud = convenience + data risk | high |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OB1 Integration Points | integration, adapter, Rosetta, skill-broker | technology | OB1 could serve as an adapter target: its skill-hardening and telemetry layers could be plugged into Rosetta's sovereign kernel as an external evaluation harness. The broker middleware could treat OB1 as a skill source. | "OB1 as evaluation harness for Entif skills" | Design an OB1 adapter harness in the style of ACPx; OB1 skills as a certified skill family in the broker | medium |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | Self-Evolution Bounds | self-evolution, bounded-growth, alignment, convergence | technology | OB1's self-evolution is bounded by the quality of telemetry collected. Without diverse, high-quality failure signals, the system converges on local optima rather than genuine improvement. This mirrors concerns about echo-chamber effects in skill selection. | "evolution is only as good as the failure data it learns from" | Ensure OB1 telemetry includes adversarial/probing inputs, not just success paths; Rosetta's receipt-law enforcement must include failure receipts | high |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OB1 Agentic Loop | agentic-loop, plan-execute-observe, telemetry, adaptive-memory | architecture | OB1 implements a plan-execute-observe loop with telemetry at each step. This is structurally similar to the write-admission gate's Observe→Receipt step. | "plan: analyze goal → execute: run skill → observe: log result → adapt: update model" | Cross-reference with NOT LAME write-gate design; OB1 loop could validate the 9-step state machine | medium |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OpenBrain Self-Repair | self-repair, auto-repair, moltron, adaptive-memory | technology | OB1 has an auto-repair capability: when a skill fails repeatedly, the system attempts to self-correct or flag for human review. This aligns with Moltron's self-repair mechanism (MOL-003). | "when a skill fails 3x in a row, OB1 flags it for review and tries a different approach" | Coordinate OB1 self-repair with Moltron's auto-repair; shared pattern, potentially shared implementation | medium |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OB1 as Source Substrate | source-substrate, openbrain, telemetry, provenance | issue-candidate | OB1 as a source of telemetry/provenance data could be modeled as a first-class protocol domain in the Source Substrate. Its self-evolution logs are a form of provenance trace that could feed Rosetta's memory planes. | "OB1's telemetry is a first-class data source, not just a log" | Create an OpenBrain adapter tile that treats OB1 telemetry as a source substrate; align with DI-011 Source Substrate domain gap | medium |
| 2026-06-04 | docs/chats/20260323 - Chat GPT - OpenBrain Project Analysis.md | OB1 vs Cloud API Telemetry | telemetry-comparison, cloud-telemetry, local-telemetry, data-privacy | decision | Local OB1 telemetry is privacy-preserving by architecture (data never leaves the host). Cloud API telemetry carries data sovereignty risks. This is a core decision point for the memory-sovereignty-map. | "OB1 keeps everything local; no data leaves your machine unless you explicitly export it" | Document this as a first-class architectural decision in the memory-sovereignty-map; local-first = privacy by default | high |

## Components And Technologies

- OpenBrain OB1: self-hosted AI assistant with telemetry
- Skill hardening pipeline
- Telemetry-first self-evolution engine
- Adaptive memory layers (similar to Moltron)
- Local-first data architecture
- Self-repair / auto-repair mechanisms
- Plan-execute-observe agentic loop
- Skill promotion/demotion based on reliability metrics

## Conceptual Claims

- Self-evolution is bounded by telemetry diversity and quality
- Local-first architecture provides data sovereignty by default
- Skill hardening is analogous to memory-tier promotion
- OB1's plan-execute-observe loop mirrors Rosetta's write-gate observe step
- Telemetry-first design aligns with receipts-first doctrine

## Dependencies And Sequencing

- Depends on: NOT LAME PRD (5-layer memory model), Moltron self-evolution specs, write-admission gate design
- OB1 integration after TC-006 (tapestry + rights + Postgres) is green
- OB1 telemetry schema alignment can proceed in parallel with TC-005

## Contradictions Or Supersession

- OpenBrain's local-first model vs cloud API dependency creates a deployment complexity trade-off that NOT LAME does not explicitly address
- OB1 self-evolution bounds (convergence on local optima) conflict with Entif's ambition for unbounded self-improvement — this needs an explicit resolution

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| OB1-001: OpenBrain telemetry schema alignment with Rosetta receipt schema | technology | `docs/intake/issue-drafts/OB1-001-openbrain-telemetry-receipt-alignment.md` | integration, telemetry, receipts, openbrain | DI-011, TC-005 | OB1 telemetry-first design mirrors receipts-law; alignment needed before OB1 can serve as evaluation harness |
| OB1-002: OB1 self-evolution bounds — convergence on local optima risk | risk | `docs/intake/issue-drafts/OB1-002-openbrain-self-evolution-bounds.md` | self-evolution, convergence, telemetry, openbrain | MOL-003 | OB1 evolution bounded by failure data quality; without adversarial inputs, system converges on local optima |
| OB1-003: OpenBrain as source substrate protocol domain | architecture | `docs/intake/issue-drafts/OB1-003-openbrain-source-substrate.md` | source-substrate, openbrain, protocol-domain, integration | DI-011 | OB1 telemetry as first-class protocol domain; aligns with Source Substrate gap finding |

## Project Board Suggestions

- Area: Integration / External Reference
- Cycle: Batch 6 or later
- Status: research phase
- Blocked by: TC-005 (write-admission gate), TC-006 (tapestry + rights + Postgres)
- Parallelization notes: OB1 telemetry schema work can proceed in parallel with TC-005; OB1 adapter tile is a TC-007 deliverable

## Open Questions

- Does OB1's skill hardening pipeline produce receipts that are compatible with Rosetta's receipt schema?
- How does OB1 handle adversarial/failure telemetry — does it have a mechanism to avoid convergence on local optima?
- Should OB1 be treated as an external skill source (like Anthropic Skills) or as an internal component (like Moltron)?
- What is the migration path for OpenBrain telemetry data into Rosetta's memory planes?