# Docs Intelligence Extraction Template

Use this template for one document or a tightly related batch.

## Source

- Path: `docs/governance/DONOR_FIT_MAP.md`
- Title: Donor Fit Map
- Date evidence: none present; inferred from governance context and batch assignment
- Authority tier: governance — defines accepted/non-transfer boundaries for donor pattern integration
- Freshness: fresh (part of batch-1)
- Word count: ~92
- Extractor: di-donor-fit-map subagent
- Extraction date: 2026-04-24

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

This governance doc defines what is and is not transferred from a "donor" reference pattern into Rosetta. It accepts the monorepo structure, package topology, and Nx orchestration harness, but explicitly rejects donor ontology import, donor tarball direct import, and donor memory stack replacement. The donor is positioned as an anatomical reference skeleton, not a transplant source.

## Goals And Intent

- Establish clear boundaries for donor pattern integration so teams know what is "in" vs. "out"
- Prevent ontology and memory-stack authority drift from a donor source into Rosetta
- Preserve Rosetta's own constitutional cache and receipt bundle logic as sovereign
- Guide lower-level implementation docs (e.g., package architecture, intake wiring) against false donor analogies

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Monorepo as central operating surface | "Monorepo as the central operating surface" — Accepted From Donor Pattern | architecture / structural | high | Rosetta adopts monorepo topology; donor provided the pattern |
| Separate packages for kernel, intake, memory-facing projections, and operator surfaces | "Separate packages for kernel, intake, memory-facing projections, and operator surfaces" — Accepted From Donor Pattern | architecture / packages | high | Package boundary logic is accepted from donor; verify existing Rosetta package naming aligns |
| Nx as the orchestration harness | "Nx as the orchestration harness" — Accepted From Donor Pattern | tooling / build | high | Verify Nx is present in Rosetta workspace config |
| No direct donor tarball import into `entif-ai` | "No direct donor tarball import into `entif-ai`" — Explicit Non-Transfers | intake / integration | high | Any tarball-based import path must be re-engineered as a Rosetta-native equivalent |
| No donor ontology promoted over Rosetta | "No donor ontology promoted over Rosetta" — Explicit Non-Transfers | ontology / governance | critical | Rosetta's ontology must be original or explicitly licensed; donor ontology is reference only |
| No donor memory stack replacing constitutional cache or receipt bundle logic | "No donor memory stack replacing the constitutional cache or receipt bundle logic" — Explicit Non-Transfers | memory / constitutional | critical | Rosetta's constitutional cache and receipt bundle are sovereign; donor memory stack is not imported |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Accepted From Donor Pattern | governance, architecture | monorepo, package-topology | decision | Rosetta accepts monorepo as central operating surface, per donor pattern | "Monorepo as the central operating surface" | verify Rosetta workspace config reflects monorepo; update if not yet present | high |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Accepted From Donor Pattern | governance, architecture, packages | kernel, intake, projections, operator-surfaces | requirement | Separate packages required for kernel, intake, memory-facing projections, and operator surfaces | "Separate packages for kernel, intake, memory-facing projections, and operator surfaces" | confirm Rosetta already has these packages or create issue for package topology | high |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Accepted From Donor Pattern | governance, tooling | nx, orchestration | technology | Nx accepted as orchestration harness for the monorepo | "Nx as the orchestration harness" | verify Nx is wired in Rosetta build system | high |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Explicit Non-Transfers | governance, imports | tarball, donor-import | risk | Explicit prohibition: no direct donor tarball import into entif-ai | "No direct donor tarball import into `entif-ai`" | audit any active import paths for tarball-based donor ingestion; reroute to Rosetta-native | high |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Explicit Non-Transfers | governance, ontology | ontology, donor-ontology | risk | Explicit prohibition: donor ontology must not be promoted over Rosetta ontology | "No donor ontology promoted over Rosetta" | audit ontology docs for any donor-origin claims; flag for review | high |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Explicit Non-Transfers | governance, memory, constitutional | memory-stack, constitutional-cache, receipt-bundle | risk | Explicit prohibition: donor memory stack cannot replace Rosetta's constitutional cache or receipt bundle logic | "No donor memory stack replacing the constitutional cache or receipt bundle logic" | confirm Rosetta constitutional cache and receipt bundle are Rosetta-native; not donor-derived | high |
| 2026-04-24 | docs/governance/DONOR_FIT_MAP.md | Working Rule | governance, analogy | donor-as-reference | decision | Donor is defined as an anatomical reference skeleton — useful for proportion and placement, not the living body being constructed | "The donor is treated like a reference skeleton in anatomy class: useful for proportion and placement, but not the living body we are constructing here" | propagate this framing to all docs that reference the donor; prevents false transplant analogies | high |

## Components And Technologies

- Monorepo structure (Nx-orchestrated)
- Package types: kernel, intake, memory-facing projections, operator surfaces
- Nx (orchestration harness)
- Constitutional cache (Rosetta-native, not donor)
- Receipt bundle logic (Rosetta-native, not donor)
- Donor memory stack (reference only, not imported)

## Conceptual Claims

- Donor pattern is a reference skeleton for Rosetta architecture, not a source for direct transplant of code, ontology, or memory systems
- Rosetta's constitutional cache and receipt bundle logic are sovereign — they are not replaced by donor equivalents
- All donor-derived decisions must be re-articulated in Rosetta's own terminology and authority

## Dependencies And Sequencing

- Package topology decisions from this doc will cascade into `docs/intake/package-architecture.md` (if it exists) and implementation package specs
- The three Explicit Non-Transfers create hard constraints that any intake/importer docs must respect — verify those docs do not claim donor authority

## Contradictions Or Supersession

- No contradictions detected within this doc; the three non-transfer rules are internally consistent
- If other docs (e.g., intake/importer docs) assert donor ontology or memory stack authority, those conflict with this doc — flag as contradiction

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| Audit donor-import paths for tarball ingestion | issue-candidate | intake, imports, governance | — | DONOR_FIT_MAP.md Explicit Non-Transfers: "No direct donor tarball import into entif-ai" — no evidence of active audit in this doc |
| Verify Rosetta package topology matches donor-accepted split (kernel / intake / projections / operator surfaces) | issue-candidate | architecture, packages, governance | — | DONOR_FIT_MAP.md Accepted From Donor Pattern: requires separate packages for four stated types — no evidence of Rosetta package alignment in this doc |
| Confirm constitutional cache and receipt bundle are Rosetta-native (not donor-derived) | issue-candidate | memory, constitutional, governance | — | DONOR_FIT_MAP.md Explicit Non-Transfers: explicit prohibition on donor memory stack replacement — no confirmation doc exists in this batch |

## Project Board Suggestions

- Area: architecture / governance
- Cycle: current (batch-1)
- Status: ready — this doc defines constraints, no direct implementation actions here
- Blocked by: none within this doc
- Parallelization notes: non-transfer rules should be propagated to all intake and importer docs in parallel batches; package topology findings may parallel with package-architecture doc

## Open Questions

- What is the donor? The document refers to a "donor" as a reference source but does not name it. If other docs identify the donor by name, cross-reference here to establish traceability.
- Are there additional donor pattern elements beyond the three accepted (monorepo, package split, Nx) that should be evaluated for inclusion or non-transfer status?
- Does Rosetta have an existing constitutional cache and receipt bundle specification, or is that still to be defined? The non-transfer rule assumes these exist.
