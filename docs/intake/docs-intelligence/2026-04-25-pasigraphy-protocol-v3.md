# Docs Intelligence Extraction: Pasigraphy Protocol v3 Architecture

## Source

- **Path:** `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md`
- **Title:** Entif.AI Rosetta Pasigraphy Protocol v3 — Architecture
- **Date evidence:** Document title implies v3; no explicit date field present
- **Authority tier:** `governance` / `architecture` — architecture reference for the Rosetta provenance kernel
- **Freshness:** Live source (not fixture)
- **Word count:** ~1,100
- **Extractor:** docs-intelligence subagent
- **Extraction date:** 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This document defines the five-layer architecture of the Rosetta provenance kernel and establishes the deliberate fixture-backed vs. implemented boundary that governs what contributors may claim as done. It is the authoritative reference for distinguishing executable contracts from bootstrap-stage approximations, and for enforcing precise "done" language across the project.

---

## Goals And Intent

- Provide a stable mental model for the Rosetta architecture as a "machine room with a test bench"
- Enumerate the five architectural layers and their constituent packages
- Catalog what mechanics are genuinely implemented vs. deliberately staged over fixture data
- Enumerate what is not yet implemented (live acquisition, durable persistence, evidence-driven trust)
- Establish precise vocabulary for "implemented", "modeled", "fixture-backed", and "not yet implemented"
- Guide contributors away from overclaiming during the bootstrap phase

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Mental Model | `architecture`, `governance`, `bootstrap` | mental model, provenance kernel, fixture-backed | decision | The canonical mental model is a "machine room with a test bench": real code proves contracts, but inputs are staged bootstrap data until live upstream adapters exist | "Think of it as a machine room with a test bench: the machine room is real code... the test bench is fixture-backed demo data" | Anchor all architectural descriptions to this model; use it to resolve "is this real?" disputes | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Layer Map — Layer 1: Rosetta kernel | `architecture`, `text-core` | kernel packages, cid, receipts, guard, tapestry, store | requirement | Layer 1 contains the deterministic core: rosetta-canon, rosetta-cid, rosetta-core, rosetta-schemas, rosetta-receipts, rosetta-guard, rosetta-tapestry, rosetta-store | "This layer handles deterministic representation, content identity, tile envelopes, receipt mechanics, lightweight conformance, minimal guard decisions, and in-memory rights-aware storage" | Treat Layer 1 packages as stable foundation; any change here has cascading effect | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Layer Map — Layer 2: Source substrate | `architecture`, `importers` | source-substrate, source-registry, tier-0, tier-1 | requirement | Layer 2 models source types and provides a bootstrap registry of Tier 0 and Tier 1 sources as curated constants — not live sync | "This layer models what kinds of source objects exist and provides the current bootstrap registry/profile dataset for Tier 0 and Tier 1 sources" | Layer 2 registry is intentionally static during bootstrap; do not treat as live-ingested until upstream adapters land | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Layer Map — Layer 3: Refinery and cache | `architecture`, `runtime-ingestion`, `storage` | ingress-refinery, canonical-cache, fixture-backed | requirement | Layer 3 turns source-aware fixture inputs into canonical artifacts + provenance receipts; clustering is done without premature broad-match merging | "This layer turns source-aware fixture inputs into canonical artifacts plus provenance receipts, then clusters those artifacts without prematurely merging broad matches" | Refinery currently accepts pre-constructed source tiles + caller-supplied text; live fetch/parse is a separate workstream | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Layer Map — Layer 4: Projection layer | `architecture`, `retrieval` | projection-adapters, OB1, Prism, Mission Control | requirement | Layer 4 exposes read-only views for OB1, Prism, and Mission Control; consumers have no constitutional ownership of the kernel | "This layer exposes read-only views for OB1, Prism, and Mission Control without granting them constitutional ownership" | Projection contracts must remain read-only; any write-back path requires architectural proposal | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Layer Map — Layer 5: App surfaces | `architecture`, `governance` | rosetta-cli, rosetta-api, rosetta-operator | requirement | Layer 5 surfaces the bootstrap slice for local verification and human inspection; not a production runtime surface | "These apps expose the bootstrap slice for local verification and human inspection" | CLI/API/Operator are development-facing; do not present as production-grade until runtime ingest is live | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | What Is Truly Functional | `architecture`, `runtime-ingestion` | SHA-256 CIDs, Ed25519 receipts, guard logic, clustering, projections | decision | Executable mechanics confirmed: JSON canonicalization, SHA-256 CIDs, tile-envelope construction, tile integrity verification, receipt creation, Ed25519 signing/verification, receipt-bundle closure, payload validation, in-memory rights checks, parse-only guard defaults, source-aware artifact/refinement flow, in-memory clustering, read-only projections | "The following are executable mechanics, not just concepts" | Use this list as the canonical reference for what is implemented; cross-reference before claiming new capabilities | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | What Is Fixture-Backed | `architecture`, `bootstrap` | source-registry, refinery, trust-matrix, CLI/API demo | decision | Four deliberate fixture-backed gaps: source registry is bootstrap-constant (no live sync), refinery accepts pre-constructed tiles (no live fetch/parse), trust matrices use bootstrap values (no evidence scoring), demo outputs built from bootstrap snapshot | "This is deliberate. The repo is proving internal contracts before large-scale live acquisition begins" | Every doc or PR that touches these areas must label them fixture-backed; this is intentional, not a bug | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | What Is Not Yet Implemented | `architecture`, `runtime-ingestion`, `storage`, `risk` | live adapters, Postgres, SHACL, trust scoring, OB1/Prism runtime, corpus ingest | risk | Seven categories of NOT YET IMPLEMENTED: live source adapters (DataCite, Crossref, OpenAlex, Zenodo, Figshare, Dataverse, SWISSUbase, DaSCH), durable cache (Postgres/object storage), full SHACL over RDF, evidence-driven trust scoring + multi-source arbitration, real OB1/Prism runtime, large-scale corpus ingest | "The following are not yet implemented: live source adapters... durable cache persistence... full standards-grade SHACL... evidence-driven trust scoring... real OB1/Prism runtime... large-scale corpus ingest" | These are the primary risk surface for anyone evaluating production readiness; all must appear on the project board as deferred or in-progress | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | "Done" Language To Use Carefully | `governance`, `docs-intelligence` | vocabulary, implemented, modeled, fixture-backed, not-yet | decision | Four-term vocabulary governs all Rosetta documentation: (1) implemented = executable validated mechanism in code; (2) modeled = shape/type/tile exists but live evidence absent; (3) fixture-backed = real code over bootstrap/demo data; (4) not yet implemented = conceptual/deferred | "Use these phrases precisely" | Enforce this vocabulary in all docs-intelligence extractions, PR descriptions, and project artifacts; divergence here is a quality issue | high |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Current Contributor Guidance | `governance`, `docs-intelligence` | contributor discipline, precise language | requirement | Contributors must: prefer precise over optimistic language; describe anything from `buildBootstrapDemoSnapshot()` as fixture-backed; treat signing/hashing/validating/clustering/denying as implemented only if executable | "If a behavior signs, hashes, validates, clusters, or denies/allows via executable code, it is fair to call that implemented" | Add this to CONTRIBUTING.md if not already present; link from extraction template | medium |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | Layer Map — cross-layer | `architecture`, `dependency` | layer ordering, dependency direction | open-question | No explicit dependency-direction rule is stated (e.g., whether Layer 4 projections may call into Layer 2). The "no constitutional ownership" framing implies a read-only contract, but dependency direction is not formally specified. | "without granting them constitutional ownership" | Does Layer 4 (projections) depend on Layer 2 (source-substrate) at runtime, or only at schema level? Clarify in architecture doc | medium |
| 2026-04-25 | Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md | What Is Fixture-Backed — trust matrix | `architecture`, `runtime-ingestion` | trust scoring, bootstrap values, evidence-driven | open-question | Trust matrices currently use bootstrap values. The document does not specify when evidence-driven scoring replaces bootstrap values, or what the transition criteria are. | "trust matrices currently use bootstrap values rather than evidence-derived scoring" | Define the trigger or milestone for migrating from bootstrap trust values to evidence-derived scoring | medium |

---

## Components And Technologies

- **rosetta-canon** — deterministic JSON canonicalization and plain-text normalization
- **rosetta-cid** — SHA-256-based content identifiers
- **rosetta-core** — tile-envelope construction with stable parent ordering
- **rosetta-schemas** — schema definitions for tile types
- **rosetta-receipts** — receipt creation as typed tiles; Ed25519 signing and verification of receipt CIDs
- **rosetta-guard** — parse-only guard defaults and explicit allow rules; in-memory rights checks
- **rosetta-tapestry** — minimal guard decisions (clustering)
- **rosetta-store** — in-memory rights-aware storage
- **source-substrate** — models source object kinds
- **source-registry** — bootstrap registry/profile dataset (Tier 0 and Tier 1 sources)
- **ingress-refinery** — fixture-backed tile refinement
- **canonical-cache** — in-memory canonical artifact cache
- **projection-adapters** — read-only views for OB1, Prism, Mission Control
- **rosetta-cli** — local verification and inspection CLI
- **rosetta-api** — API surface for bootstrap slice
- **rosetta-operator** — Kubernetes operator for bootstrap slice

---

## Conceptual Claims

1. **Provenance kernel as machine room:** Rosetta is a provenance kernel prototype — the "machine room" of real code that canonicalizes, hashes, signs, validates, clusters, and projects artifacts — backed by a "test bench" of fixture data that proves contracts before live upstream adapters exist.

2. **Layered constitutional separation:** The five layers are intentionally separated so that Layer 4 projections (OB1, Prism, Mission Control) have no constitutional ownership of the kernel, and Layer 5 app surfaces are development-facing only during bootstrap.

3. **Fixture-backed is not broken:** The gap between fixture inputs and live acquisition is a deliberate phase, not a deficit. The repo is proving internal contracts before large-scale live acquisition.

4. **Precise done vocabulary is a governance tool:** "Implemented", "modeled", "fixture-backed", and "not yet implemented" are not stylistic suggestions — they are the project's language boundary between verified and aspirational.

---

## Dependencies And Sequencing

- **Layer 1 → Layer 2:** Layer 1 (kernel) must be stable before Layer 2 (source-substrate) registry profiles can be reliably defined against it.
- **Layer 2 → Layer 3:** Layer 2 source types feed Layer 3 refinery; any change to source type modeling ripples into refinement logic.
- **Layer 3 → Layer 4:** Layer 4 projections consume Layer 3 canonical artifacts; projection contracts depend on artifact shape stability.
- **Layer 4 → Layer 5:** App surfaces (Layer 5) surface Layer 4 projections for human inspection.
- **Live source adapters** are downstream of all five layers; they cannot land until the Layer 2 source-substrate model and Layer 3 refinery contracts are stable.
- **Durable cache (Postgres)** is a prerequisite for large-scale corpus ingest — in-memory store is insufficient at production scale.
- **SHACL execution** depends on RDF graph production from the refinery, which depends on live source adapters.

---

## Contradictions Or Supersession

- **None identified.** The document is internally consistent. It supersedes informal verbal descriptions of the architecture by establishing the canonical five-layer model and the implemented/fixture-backed boundary in writing.

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| Define Layer 4 projection dependency direction on Layer 2 source-substrate | `open-question` | `architecture`, `runtime-ingestion` | Layer 2 and Layer 3 stability | Document states projections are read-only but does not specify whether they depend on source-substrate at runtime or only at schema level |
| Define trigger for migrating trust matrices from bootstrap values to evidence-driven scoring | `open-question` | `runtime-ingestion`, `governance` | Live source adapters, evidence accumulation | Document states trust matrices use bootstrap values; no transition criteria or milestone defined |
| CONTRIBUTING.md does not reference "Done Language" vocabulary | `issue-candidate` | `docs-intelligence`, `governance` | None | The four-term vocabulary in this doc is not linked from CONTRIBUTING.md or extraction template; contributors may not find it |
| No explicit layer-dependency directional rule documented | `issue-candidate` | `architecture` | None | The document describes layers but never states whether upward-only dependencies are enforced, architectural convention or hard rule |

---

## Project Board Suggestions

- **Area:** Architecture / Governance
- **Cycle:** Current (bootstrap phase)
- **Status:** Reference document — architecture is stable for bootstrap phase
- **Blocked by:** Nothing; this doc is an authority reference, not a work item
- **Parallelization notes:**
  - Live source adapter work (DataCite, Crossref, OpenAlex, etc.) can proceed in parallel once Layer 2 source-substrate model is frozen
  - SHACL execution depends on RDF graph production from Layer 3
  - Durable cache (Postgres) is independent of Layer 1–2 core contracts and can be explored in parallel

---

## Open Questions

1. Does Layer 4 (projection-adapters) depend on Layer 2 (source-substrate) at runtime, or only at schema level? What is the formal dependency direction rule across layers?
2. What are the explicit transition criteria for moving from bootstrap trust values to evidence-driven trust scoring?
3. Is the "no constitutional ownership" constraint for Layer 4 consumers enforced technically (code), architecturally (convention), or constitutionally (governance policy)?
4. What is the expected timeline or milestone for the first live source adapter to replace a fixture input?
5. Is there a formal review cycle for this architecture document as the codebase evolves?
