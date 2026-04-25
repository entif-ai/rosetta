# AC-001: Attention Capital Platform — Integration Design Needed if Added to Rosetta/Entif Ecosystem

**Type:** architecture
**Status:** issue-candidate
**Labels:** docs-intelligence, integration, attention-capital
**Priority:** medium

---

## Problem Statement

The "Attention-as-Capital Analytics Platform" document (docs/ideas/Attention-as-Capital Analytics Platform.md) proposes a completely standalone technology stack:

- **Python** (ML/AI layer) + **Rust** (ingestion) + **Neo4j** (graph DB) + **Redpanda** (streaming) + **D3.js** (dashboard) + **self-hosted GPU**

This stack is entirely disjoint from the Rosetta/Entif technology stack documented in NOT LAME PRD and related governance docs:

- **TypeScript** / Nx monorepo / parse-only constraint / Rockette-based runtime / LangGraph / PostgreSQL / pgvector / SQLite (local shadow only)

There is no mention in the Attention Capital doc of any integration points, shared modules, common data models, or interoperability with Rosetta's sovereign-kernel, write-admission-gate, memory-sovereignty-map, or any other NOT LAME components.

---

## Evidence

- Attention Capital doc proposes Python+Rust+Neo4j+Redpanda+D3.js stack
- NOT LAME specifies TypeScript/Nx/PostgreSQL/pgvector/LangGraph stack
- No Rosetta artifact bindings found in the Attention Capital doc
- No shared concepts: the doc does not reference receipt-law, rights-scoped-retrieval, tapestry, source-episode, parse-only-default, sovereignty-kernel, write-gate, context-compiler, memory-sovereignty-map, or any NOT LAME component
- These are two entirely independent platform visions in the same workspace

---

## Implications

1. **Duplicate infrastructure:** Two independent tech stacks would require double the maintenance, DevOps, security hardening, and operational expertise
2. **Data sovereignty conflict:** Rosetta's memory-sovereignty-map (5-layer PostgreSQL-centric model) and Attention Capital's Neo4j-centric graph model have incompatible data architecture assumptions
3. **No unified governance:** Without integration design, there is no clear answer for which stack "owns" the data, which processes trigger receipts, or how rights-scoped retrieval applies
4. **Potential for re-architecture waste:** If Attention Capital ever moves toward implementation, a separate integration design effort would be required to align it with NOT LAME

---

## Resolution Options

**Option A — Formally decouple:** Mark Attention Capital as a fully standalone product line with its own repo, governance, and lifecycle — explicit that it shares no code or data with Rosetta/Entif

**Option B — Design integration from the start:** Before any implementation commitment, produce an integration design doc that maps:
- Which Attention Capital components could reuse NOT LAME infrastructure (e.g., shared Postgres for metrics storage, shared rights-scoped retrieval for influencer data)
- Which components are truly standalone (e.g., Python ML models, D3 dashboard)
- Protocol boundaries and data flow between the two systems
- Unified identity/auth model across both systems

**Option C — Defer to future decision:** Mark as "exploratory only — do not implement until integration with Rosetta is resolved" and close this issue

---

## Recommendation

**Assign to:** Architecture / Product  
**Label:** architecture, integration  
**Milestone:** Before any Attention Capital MVP commitment  
**Effort:** Medium (requires integration design doc + stakeholder alignment)

The decision hinges on whether Attention Capital is intended as:
- A **separate product** (→ Option A — formal decoupling)
- A **component within the Entif ecosystem** (→ Option B — integration design first)
- A **hypothetical future possibility** with no near-term commitment (→ Option C — defer)

Clarify intent before treating this as a real project.

---

## References

- Source: `docs/ideas/Attention-as-Capital Analytics Platform.md` (Batch 4)
- Related NOT LAME PRD: `docs/PRDs/20260423 - Entif.AI - NOT LAME (v0.1) - PRD - Neurologic Orchestration Topology for Layered Agentic Memory and Evolution.md`
- Ledger entry: DI-004 (Batch 4)
