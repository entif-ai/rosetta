# SRP-002: Define source-profile schema (22 minimal + 10 extended fields) in Rosetta schema

## Metadata

| Field | Value |
|---|---|
| Title | SRP-002: Define source-profile schema (22 minimal + 10 extended fields) in Rosetta schema |
| Type | schema |
| Status | candidate |
| Labels | `source-substrate`, `schema`, `metadata-profile` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §3.1 + §3.2 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex specifies 22 minimal and 10 extended source system profile fields (§3.1–3.2). These fields constitute the canonical data model for source profiles in Rosetta. No existing Rosetta schema defines this data model. This schema is the foundation for SRP-001 (source registry) and SRP-003–SRP-009.

## Minimal Profile Fields (22)

From §3.1:
- `sourceSystemId` — unique identifier for the source system
- `canonicalName` — canonical name
- `sourceRole[]` — roles the source plays
- `operatorOrg[]` — organizations operating the source
- `jurisdiction[]` — jurisdictions applicable
- `supportsDOI` — boolean
- `supportsORCID` — boolean
- `supportsROR` — boolean
- `supportsSWHID` — boolean
- `supportsVersionFamilies` — boolean
- `supportsOpenMetadataWhenFilesRestricted` — boolean
- `supportsAPI` — boolean
- `supportsBulkExport` — boolean
- `supportsOaiPmh` — boolean
- `supportsRdfOrLinkedData` — boolean
- `supportsPackageExport` — boolean
- `curationPosture` — posture value (see SRP-003)
- `reviewPosture` — posture value (see SRP-003)
- `preservationPosture` — posture value (see SRP-003)
- `rightsPosture` — posture value (see SRP-003)
- `identitySupportNotes` — free text
- `correctionRetractionSupport` — boolean or enum
- `metadataProfile[]` — see SRP-004
- `evidenceRefs[]` — see SRP-009

## Extended Profile Fields (10)

From §3.2:
- `repositorySelectionCriteria[]`
- `funderAcceptance[]`
- `disciplineCoverage[]`
- `languageSupport[]`
- `contractualObjectsSupported[]`
- `sourceScoreDefaults`
- `knownMirrors[]`
- `knownGraphIndexers[]`
- `knownRegistryListings[]`
- `knownPackageProfiles[]`
- `knownSoftwareMetadataProfiles[]`

## Requirements

1. Define `SourceProfile` schema with all 22 minimal fields as required or optional as indicated.
2. Define `SourceProfileExtended` as a Phase 2 extension of the base schema with the 10 extended fields.
3. Profile fields must be nullable where not universally applicable (e.g., `supportsSWHID` may not apply to non-software sources).
4. Posture fields (curationPosture, reviewPosture, preservationPosture, rightsPosture) must have defined value vocabularies — see SRP-003.
5. `metadataProfile[]` schema must be defined — see SRP-004.
6. `evidenceRefs[]` semantics must be defined — see SRP-009.
7. Source profiles must be stored as versioned receipts, not mutable records.

## Scope

- Schema: add `SourceProfile` artifact type (22 minimal fields)
- Schema: add `SourceProfileExtended` extension (10 extended fields)
- Receipt: `SourceProfileReceipt` with full snapshot and version
- API: profile read/update/query interfaces
- Posture: SRP-003 (separate issue for posture taxonomy)

## Open Questions

1. Which fields should be required vs optional in the minimal schema?
2. Should `sourceScoreDefaults` be a structured score object or a free-text note?
3. Should `knownMirrors[]` / `knownGraphIndexers[]` reference other `SourceProfile` entries or be standalone URIs?
4. Should profile schemas be typed per source family (e.g., `ZenodoProfile extends SourceProfile`)?

## Depends On

- SRP-001 (source registry must exist before profiles can be stored)
- SRP-003 (posture taxonomy — posture fields are in minimal schema)
- SRP-004 (metadataProfile schema — field is in minimal schema)
- SRP-009 (evidenceRefs semantics — field is in minimal schema)

## Blocks

- SRP-003, SRP-004, SRP-005, SRP-006, SRP-007, SRP-008, SRP-009, SRP-010
