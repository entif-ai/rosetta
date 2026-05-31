# SRP-001: Define source-registry as a first-class Rosetta artifact before ingestion adapters

## Metadata

| Field | Value |
|---|---|
| Title | SRP-001: Define source-registry as a first-class Rosetta artifact before ingestion adapters |
| Type | architecture/spec-gap |
| Status | candidate |
| Labels | `source-substrate`, `source-registry`, `tc-005`, `priority:p0` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §11 advice #1 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex (§11, advice #1) explicitly states: "Build the source registry before broad ingestion." No existing Rosetta spec defines a source registry as a first-class artifact. This gap blocks all repository adapter implementation (Zenodo, Figshare, Dataverse, DataCite, Crossref, ORCID, ROR, etc.) because adapters require a registry to look up source profiles before they can ingest anything.

## Context

The companion doc — the Source Substrate Addendum (PR #1186) — defines Source Substrate as a new constitutional domain and defines the 12-element multi-object source model. However, it does not define a source registry artifact that tracks which sources are known, what their profiles are, and what their current trust/posture state is.

The Annex specifies 15 source families (§2), 22 minimal + 10 extended profile fields (§3.1–3.2), and a 4-tier ingestion priority matrix (§4). All of this data needs a home: the source registry.

Without a source registry artifact:
- Adapters cannot do source-profile lookups
- Ingestion priority cannot be enforced
- Trust defaults cannot be managed or overridden
- Source discovery cannot be distinguished from trust certification

## Requirements

1. Define `SourceRegistry` as a first-class Rosetta artifact type in the schema.
2. The registry must track: source family, canonical name, profile version, trust-vector state, posture state, ingestion priority tier (P0–P3).
3. The registry must be populated and queried before any adapter performs ingestion.
4. Registry entries must be stored as versioned receipts (per advice #2: "source profiles must be stored as versioned receipts").
5. Registry updates must emit receipts; there is no mutable blob for source profiles.

## Scope

- Schema: add `SourceRegistryEntry` artifact type
- Receipt structure: `SourceRegistryEntryReceipt` with profile snapshot
- Query interface: adapter must call registry before ingesting from a source
- Ingestion gate: Text-Core MVP gate criterion requires source registry before adapter promotion

## Open Questions

1. Does the source registry belong in the Constitutional plane (Git-backed) or the Artifact plane (PostgreSQL)?
2. Should the registry be populated manually, semi-automatically, or fully automatically from source-profile descriptors?
3. What is the naming convention for source families? (e.g., `datacite`, `crossref`, `orcid`, `ror`)

## Depends On

- None (this is the foundational artifact)

## Blocks

- SRP-002 (source-profile schema)
- SRP-007 (Zenodo adapter)
- SRP-010 (P0 ingestion priority matrix)
- Any future repository adapter

## Related Issues

- SSP-001 through SSP-013 (Source Substrate Addendum, PR #1186)
- DI-011 (Source Substrate missing as first-class protocol domain — already filed)
