# SRP-008: Identity resolution strategy for multi-source scholarly objects

## Metadata

| Field | Value |
|---|---|
| Title | SRP-008: Identity resolution strategy for multi-source scholarly objects |
| Type | architecture/spec-gap |
| Status | candidate |
| Labels | `source-substrate`, `identity`, `pid`, `dedupe` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §9; §2 DataCite and ORCID cautions |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

§9 of the Source Registry and Repository Profile Annex describes a single scholarly dataset that simultaneously has: a DataCite DOI minted through Zenodo, creators with ORCID IDs, institutions resolvable to ROR, a Zenodo landing page, OpenAIRE indexing, Crossref citation relationships, RO-Crate/Croissant package exports, and SWHIDs for software components. Entif must store all of these as linked-but-distinct facts. The Annex does not resolve the canonical identity binding question: when all these identifiers coexist for one logical object, what is the single canonical identity in Rosetta, and what rules govern the binding?

## Context

The DataCite row (§2) carries the caution: "DOI is not authorship proof." The ORCID row (§2) cautions that ORCID profile completeness varies and some assertions are self-controlled. Both cautions indicate that no single PID is sufficient for identity resolution — the identity binding must be multi-PID and evidence-graded.

The Source Substrate Addendum (PR #1186) defines a multi-object source model with 12 elements and a 15-axis trust vector. SRP-002's source-profile schema includes `supportsDOI`, `supportsORCID`, `supportsROR`, `supportsSWHID` as boolean flags. But the actual identity resolution strategy — how to bind multiple PIDs to one logical object — is not specified anywhere.

This is fundamentally a deduplication + identity linking problem. Existing approaches:
- **Primary key approach**: pick one PID as canonical (e.g., always use DOI as canonical key), store others as linked facts
- **Composite key approach**: construct a composite identity from a deterministic function of all PIDs
- **Graph approach**: no canonical key; all PIDs are nodes in a graph with evidence-weighted edges; identity is a query result, not a stored field

## Requirements

1. Define an identity resolution strategy: primary key, composite, or graph (or a defined hybrid).
2. If primary key: define the priority order of PID types (DOI > ORCID > ROR > SWHID > other).
3. If graph: define how evidence weights are assigned to edges between PID nodes.
4. Identity resolution must produce evidence receipts: what PIDs were examined, what bindings were formed, what confidence was assigned.
5. Corrections must propagate without data amnesia (per §11 advice #6): if a later correction invalidates a prior binding, the correction must emit a new receipt and the prior binding must be preserved (not deleted) with a retraction marker.
6. Rights-scoped retrieval must respect the identity resolution: a query for "all manifestations of DOI 10.1234/zenodo.12345" must return all versions and linked records.

## Scope

- Identity resolution engine: core algorithm for binding multiple PIDs to one logical object
- Receipt structure: `IdentityBindingReceipt` with PID set, strategy used, confidence, evidence
- Graph schema: extend Rosetta graph with PID-node and evidence-weighted-edge types
- Ingestion pipeline: identity resolution is a stage in the ingress-refinery pipeline
- Correction propagation: SRP-009 defines how invalidation hooks work

## Open Questions

1. Is a DOI always the primary key, or are there cases where another PID should take precedence (e.g., SWHID for software, ORCID for people)?
2. How should confidence be量化 — is it a numeric score, an ordinal level, or a Bayesian posterior?
3. Should identity bindings be considered authoritative only after a threshold confidence is reached, or should all bindings be stored with their confidence regardless?
4. How does identity resolution interact with the 8-provenance-lane model from SSP?

## Depends On

- SRP-001 (source registry)
- SRP-002 (source-profile schema with PID support flags)
- SSP (PR #1186, 12-element multi-object source model)
- SRP-009 (invalidation hooks for correction propagation)
- SRP-006 (trust-override mechanism — identity bindings can be overridden)

## Blocks

- SRP-007 (Zenodo adapter — Zenodo DOIs require identity resolution to link to DataCite and ORCID)
- SRP-010 (P0 ingestion priority matrix — P0 includes DataCite/Crossref ORCID/ROR which all require identity resolution)
- Any adapter that ingests objects with multiple PIDs
