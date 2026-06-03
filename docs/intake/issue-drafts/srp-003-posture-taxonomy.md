# SRP-003: Define posture taxonomy (curationPosture, reviewPosture, preservationPosture, rightsPosture)

## Metadata

| Field | Value |
|---|---|
| Title | SRP-003: Define posture taxonomy (curationPosture, reviewPosture, preservationPosture, rightsPosture) |
| Type | schema |
| Status | candidate |
| Labels | `source-substrate`, `posture`, `schema` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §3.1 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex (§3.1) lists four posture fields in the minimal source profile schema: `curationPosture`, `reviewPosture`, `preservationPosture`, and `rightsPosture`. These fields are referenced as structural elements of the source profile but are never defined — no valid values, no scale, no semantics. This is a schema gap that must be resolved before the source-profile schema (SRP-002) can be implemented.

## Context

Posture fields appear in the context of trust defaults (§5) where "curated repository" gets "high" retrieval priority, "high" citation weight, and "medium" automation weight — implying posture affects trust scoring. Posture is also implicated in the ingestion priority matrix (§4) where P0 includes "curated" sources like DataCite vs P3 includes "volatile" sources like social media.

Posture fields likely encode:
- **CurationPosture**: How rigorously is content reviewed before publication? (e.g., uncurated → curated → peer-reviewed)
- **ReviewPosture**: What review process exists for corrections/retractions? (e.g., none → editorial → peer-review)
- **PreservationPosture**: What long-term preservation commitment exists? (e.g., none → best-effort → bit-level → canonical)
- **RightsPosture**: What rights/licensing framework governs the content? (e.g., all-rights-reserved → CC-BY → public-domain → unknown)

## Requirements

1. Define valid value sets for each posture field (enumerated values, ordinal scales, or structured objects).
2. Map posture values to trust-vector inputs: posture should inform but not determine retrieval priority, citation weight, and automation weight.
3. Posture assignments must be evidence-based and stored as receipts (not subjective opinions).
4. Posture must be overridable by evidence (consistent with §5 trust defaults).
5. Document the relationship between posture and the trust-defaults table (§5).

## Scope

- Schema: define posture value vocabularies for all four posture fields
- Trust integration: define how posture feeds into trust-vector scoring
- Evidence: posture assignments require evidence references (evidenceRefs[])
- Override mechanism: SRP-006 defines how posture overrides work

## Open Questions

1. Should postures be ordinal scales (1–5), enumerated categories, or structured objects with multiple dimensions?
2. Who assigns posture — automated scoring, manual certification, or hybrid?
3. Should posture be assigned at the source-family level (e.g., all DataCite DOIs share a posture) or per-record?
4. How do posture values interact with the §5 trust defaults table?

## Depends On

- SRP-002 (source-profile schema — posture fields are in the minimal schema)
- SRP-006 (trust-override mechanism — posture overrides use this mechanism)

## Blocks

- SRP-002 (cannot finalize source-profile schema without posture definitions)
