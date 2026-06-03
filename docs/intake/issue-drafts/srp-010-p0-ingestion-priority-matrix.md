# SRP-010: Implement P0 ingestion priority matrix (DataCite/Crossref/ORCID/ROR/re3data as identity spine)

## Metadata

| Field | Value |
|---|---|
| Title | SRP-010: Implement P0 ingestion priority matrix (DataCite/Crossref/ORCID/ROR/re3data as identity spine) |
| Type | implementation |
| Status | candidate |
| Labels | `source-substrate`, `ingestion-priority`, `p0`, `tc-005` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §4 priority matrix |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

§4 establishes a 4-tier ingestion priority matrix. P0 sources are DataCite, Crossref, ORCID, ROR, and re3data — described as the "identity and relationship spine." The Text-Core MVP gate criteria explicitly require two text-source families. This issue covers the implementation of P0 ingestion priority enforcement: the gate that ensures P0 sources are ingested before P1, P1 before P2, P2 before P3.

## Context

Priority matrix from §4:

| Priority | Source family | Primary use in Entif | Suggested first products |
|---|---|---|---|
| P0 | DataCite / Crossref / ORCID / ROR / re3data | identity and relationship spine | source registry, PID bindings, author-org-work graph |
| P1 | Zenodo / Figshare / Dataverse / OpenAIRE / OpenAlex / SWHID | structured research object ingestion | repository adapters, manifestation mapping, version family mapping |
| P2 | RO-Crate / Croissant / SWISSUbase / DaSCH | portable package interchange | package import/export profiles |
| P3 | blogs / forums / comments / social | novelty and discourse mining | volatile source pack, lower-trust retrieval profiles |

The identity spine is the foundation: DataCite provides DOIs and metadata, Crossref provides work-to-work citation relations, ORCID provides author disambiguation, ROR provides institution normalization, and re3data provides repository capability intelligence. All other ingestion depends on these PIDs being in place first.

Text-Core MVP gate M10 requires: "Two text-source families delivering source → observation → interpretation → tapestry with rights-scoped retrieval, deterministic refinery, and minimum English accompaniment."

## Requirements

1. Implement an ingestion priority gate in the ingress-refinery pipeline: no P1 ingestion can begin until P0 ingestion is complete.
2. P0 ingestion is considered complete when: all P0 source profiles are in the registry (SRP-001), DataCite/Crossref adapters are certified, ORCID/ROR resolution is operational, and re3data integration is live.
3. The priority gate must be visible and auditable: it emits receipts indicating which priority tier is open.
4. Adapter certification for P0 adapters (DataCite, Crossref, ORCID, ROR) must follow the 8-test-class adapter certification harness from NOT LAME PRD.
5. re3data adapter must be treated as a source-of-sources intelligence adapter, not a content-ingestion adapter (per §2 re3data caution).
6. The priority matrix itself must be stored as a versioned receipt so that changes to priority assignments are auditable.

## Scope

- Ingress gate: implement P0-gate in the refinery pipeline
- P0 adapters: DataCite adapter, Crossref adapter, ORCID adapter, ROR adapter, re3data adapter
- PID binding pipeline: SRP-008 (identity resolution) must be operational before P0 ingestion is considered complete
- Receipts: `IngestionTierOpenReceipt` for each tier
- Text-Core MVP integration: TC-005/TC-006 gate criteria must reference P0 completion

## Open Questions

1. What does "P0 ingestion is complete" mean operationally — a Boolean flag, a percentage, a receipt count threshold?
2. Should P1 ingestion be partially allowed while P0 is still in progress (e.g., for sources that don't depend on P0 PIDs)?
3. Should the priority matrix be operator-configurable or fixed?
4. How should the pipeline handle P0 source failures — block all downstream ingestion or continue with best-effort?

## Depends On

- SRP-001 (source registry — must exist before P0 ingestion can be tracked)
- SRP-002 (source-profile schema — P0 sources need profiles before ingestion)
- SRP-008 (identity resolution — P0 completion depends on PID binding)
- TC-005 (Text-Core MVP — P0 ingestion is on the critical path)

## Blocks

- P1 ingestion (Zenodo, Figshare, Dataverse — SRP-007 and Figshare/Dataverse adapters)
- P2 ingestion (RO-Crate, Croissant — portable package adapters)
- Text-Core MVP gate completion
