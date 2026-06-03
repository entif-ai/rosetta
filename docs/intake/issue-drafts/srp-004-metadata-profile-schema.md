# SRP-004: Define metadataProfile[] field schema and controlled vocabulary

## Metadata

| Field | Value |
|---|---|
| Title | SRP-004: Define metadataProfile[] field schema and controlled vocabulary |
| Type | schema |
| Status | candidate |
| Labels | `source-substrate`, `metadata-profile`, `schema` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §3.1 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex (§3.1) lists `metadataProfile[]` as one of the 22 minimal source profile fields but never defines its value schema. Is it a list of supported metadata standards? Schema URIs? Dublin Core terms? MARC formats? The field is a structural hole in the source-profile schema.

## Context

The Annex discusses metadata extensively in §2 and §6–8 through worked examples:
- Zenodo supports "CodeMeta-related software metadata support, CITATION.cff, .zenodo.json" (§6)
- Figshare surfaces "MD5 integrity checks" (§7)
- Dataverse supports "rich dataset metadata, some variable-level metadata, citation exports" (§8)
- The §10 predicate list includes `hasTrustAssessment`, `hasAccessPolicy` which are metadata-adjacent

The `metadataProfile[]` field needs to capture:
- Which metadata standards/schemas the source supports
- What serialization formats are available (JSON-LD, XML/MARC, Turtle, etc.)
- Whether the source produces or only consumes metadata
- Any source-specific metadata conventions

## Requirements

1. Define `metadataProfile[]` as a list of structured objects, not free text.
2. Each entry should capture: schema name, schema version, serialization formats supported, schema URI/URL, and scope (produced vs consumed vs both).
3. Define an initial controlled vocabulary of known metadata profiles: Dublin Core, DataCite, Crossref, MARC, CodeMeta, CITATION.cff, RO-Crate, Croissant, Dataverse JSON, Zenodo JSON.
4. Allow extension for source-specific profiles not in the controlled vocabulary.
5. Metadata profile information must be evidence-cited (which spec document defines the profile?).

## Scope

- Schema: define `MetadataProfileEntry` structure with fields: `profileName`, `profileVersion`, `serializationFormats[]`, `schemaUri`, `scope` (produced/consumed/both), `evidenceRefs[]`
- Vocabulary: register initial known profiles in a Rosetta metadata profile registry
- Source-profile integration: metadataProfile[] in SourceProfile uses this structure

## Open Questions

1. Should metadataProfile[] be a closed list (controlled vocabulary only) or open (allow any URI)?
2. Should the field distinguish between what a source produces vs what it consumes/imports?
3. How should profile versioning be handled — Rosetta tracks profile versions or just latest?
4. Is there an existing Rosetta schema for metadata standards that this should align with?

## Depends On

- SRP-002 (source-profile schema — metadataProfile[] is in the minimal schema)
- SRP-009 (evidenceRefs — metadata profile claims need evidence)

## Blocks

- SRP-002 (cannot finalize source-profile schema without metadataProfile[] definition)
