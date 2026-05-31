# SRP-007: Zenodo repository adapter as first-priority adapter implementation

## Metadata

| Field | Value |
|---|---|
| Title | SRP-007: Zenodo repository adapter as first-priority adapter implementation |
| Type | implementation |
| Status | candidate |
| Labels | `source-substrate`, `adapter`, `zenodo`, `p0` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §2 (Zenodo row), §6 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

Zenodo is a P1 source in the ingestion priority matrix (§4) and the worked example in §6 provides a detailed capability profile. Zenodo is the reference generalist repository in the Rosetta ecosystem: it has DOI support, ORCID/GitHub/OpenAIRE account linking, version families, software archiving overlays (CodeMeta, CITATION.cff), and explicit bit-level preservation posture. It is the natural first repository adapter to implement after the source registry (SRP-001) and source-profile schema (SRP-002) are in place.

## Context

From §6 (Zenodo worked profile):
- Source role: generalist repository, software archiving bridge
- Identifiers: DOI, external DOI reuse, ORCID/GitHub/OpenAIRE linking in platform flows
- Lifecycle: draft → publish; metadata editable post-publication; files immutable per version; new version creates linked new record
- Access: public metadata always available; files may be open or restricted
- Software overlays: CodeMeta, CITATION.cff, .zenodo.json, GitHub release archiving
- Preservation: bit-level preservation posture stated
- Caution: generalist repository; deposition quality uneven

Zenodo's API (https://developers.zenodo.org/) provides:
- REST API for search, deposit, metadata update
- OAuth2 for authentication
- Version family support via `conceptdoi` / `conceptrecid`
- File management per version
- Metadata standards (Dublin Core, DataCite)

## Requirements

1. Implement Zenodo adapter only after SRP-001 (source registry) and SRP-002 (source-profile schema) are complete.
2. Adapter must look up Zenodo's source profile in the registry before ingesting.
3. Adapter must handle Zenodo's version family model: `conceptrecid` for the family, `recid` for each version.
4. Adapter must surface CodeMeta, CITATION.cff, and .zenodo.json overlays as first-class artifact metadata.
5. Adapter must handle the uneven deposition quality risk: each Zenodo record needs per-record trust scoring, not inherited repository-level trust.
6. Zenodo records must carry source attribution (`publishedInSourceSystem: zenodo`) per §10 predicates.
7. Adapter must emit receipts for every durable action (per receipt-law).

## Adapter Certification Harness

Per NOT LAME PRD, adapter certification requires 8 test classes: ingest, retrieval, tag, score, provenance, replay, policy, timeout. Zenodo adapter must pass all 8 before promotion.

## Scope

- New package: `packages/rosetta-adapter-zenodo`
- Interfaces: implements the generic RepositoryAdapter interface
- API calls: Zenodo REST API v1
- Data mapping: Zenodo metadata → Rosetta SourceRecord + Artifact
- Version handling: conceptrecid/recid family mapping
- Trust: per-record scoring, not per-repository scoring
- Receipts: all API reads and writes emit receipts

## Open Questions

1. Should the Zenodo adapter handle both read (ingestion) and write (deposit) flows, or read-only for MVP?
2. How should restricted files (not open access) be handled — skip, proxy, or error?
3. Should GitHub release archiving be treated as a separate artifact type or as a Zenodo manifestation?

## Depends On

- SRP-001 (source registry must exist)
- SRP-002 (source-profile schema must exist)
- SRP-008 (identity resolution — Zenodo DOIs link to DataCite DOIs which link to ORCID/ROR)
- Adapter certification harness (from NOT LAME PRD)

## Blocks

- Figshare adapter (SRP not yet written; follows Zenodo as second adapter)
- Dataverse adapter (SRP not yet written; third adapter)
