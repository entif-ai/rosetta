# SRP-009: evidenceRefs[] storage and invalidation semantics

## Metadata

| Field | Value |
|---|---|
| Title | SRP-009: evidenceRefs[] storage and invalidation semantics |
| Type | architecture/spec-gap |
| Status | candidate |
| Labels | `source-substrate`, `evidence`, `provenance`, `invalidation` |
| Evidence | `docs/governance/20260412 - Source Registry and Repository Profile Annex.md`, §3.1, §11 advice #6 |
| Extraction date | 2026-05-31 |
| Extraction artifact | `docs/intake/docs-intelligence/2026-05-31-source-registry-repository-profile-annex.md` |

## Summary

The Source Registry and Repository Profile Annex (§3.1) lists `evidenceRefs[]` as one of the 22 minimal source profile fields. This field appears to reference the evidence base for the source profile — what documents, specifications, or attestations support the profile's claims (e.g., that Zenodo has bit-level preservation posture). However, the Annex never defines how `evidenceRefs[]` is stored, retrieved, or invalidated. This is a data model gap and an implementation gap.

## Context

§11 advice #6 states: "Preserve invalidation hooks so later corrections can propagate without data amnesia." This is in the context of source profiles generally, but it applies directly to `evidenceRefs[]`: if an evidence document is retracted, updated, or superseded, the source profile that references it should receive that correction.

Example scenarios:
- DataCite publishes a new specification version that changes a previously stated capability → source profile references the old spec via evidenceRefs → old spec reference must be invalidated, new spec added
- A source's preservation posture claim was based on a vendor attestation that is later retracted → evidenceRef points to retracted attestation → profile's preservationPosture claim must be invalidated
- An ORCID profile completeness assessment was based on a sample study that is later shown to be unrepresentative → evidenceRef is outdated → reassessment required

## Requirements

1. Define `evidenceRefs[]` as a list of references to evidence artifacts, where each reference includes: evidence type (spec document, attestation, study, prior receipt, etc.), evidence URI or content hash, date added, and validity status.
2. Evidence references must be stored as receipts (per receipt-law and §11 advice #2).
3. Invalidation hooks must exist: when an evidence artifact is retracted or updated, all source profiles that reference it must receive an invalidation notification.
4. Invalidation must not cause data amnesia: prior evidence references must be preserved with a retraction marker, not deleted.
5. A source profile with an invalidated evidenceRef must be flagged for reassessment, not automatically rejected.
6. The invalidation pipeline must be integrated with the write-admission gate: any profile update triggered by invalidation must pass through the 9-step state machine.

## Scope

- Schema: define `EvidenceRef` structure with fields: `evidenceType`, `evidenceUri`, `contentHash`, `addedAt`, `validityStatus`, `retractedAt`, `supersededBy`
- Storage: evidence references are stored as receipts in the artifact plane
- Invalidation pipeline: event-driven invalidation from evidence sources → affected profiles
- Flagging: invalidated profiles get a `needsReassessment` flag set to true
- API: query all profiles that reference a given evidence artifact (reverse lookup)

## Open Questions

1. Should evidence references store the actual evidence content (e.g., spec text) or just a reference URI/content hash?
2. Who is authorized to mark an evidence reference as retracted or superseded — the evidence source, the Rosetta operator, or automated policy?
3. Should there be a TTL on evidence references (e.g., auto-flag for reassessment after 2 years)?
4. How does the evidenceRef invalidation interact with trust-override (SRP-006)? Are overrides a form of evidence that can invalidate prior evidence?

## Depends On

- SRP-002 (source-profile schema — evidenceRefs[] is a field in the minimal schema)
- Write-admission gate (from NOT LAME PRD)
- SRP-006 (trust-override may be a form of evidence)

## Blocks

- SRP-002 (cannot finalize source-profile schema without evidenceRefs[] definition)
- Any profile reassessment workflow triggered by invalidation
