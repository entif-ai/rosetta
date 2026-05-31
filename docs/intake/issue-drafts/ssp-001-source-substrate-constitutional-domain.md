# SSP-001: Define Source Substrate as a Constitutional Protocol Domain

## Type
architecture / spec-gap / constitutional

## Status
issue-candidate

## Priority
P0

## Labels
source-substrate, constitutional-domain, architecture, DI-011

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 4

## Summary

The Source Substrate addendum (2026-04-13) defines a new constitutional domain that is currently missing from Rosetta's protocol architecture. Source Substrate is the domain concerned with the representation, classification, acquisition, linking, evaluation, packaging, retention, and governance of all external and internal information sources, source systems, source records, manifestations, and source-derived claims.

This is distinct from the runtime ingestion layer (refinery) and from the existing content-addressed tile model. It is a first-class constitutional layer that the addendum explicitly identifies as missing.

DI-011 already flagged Source Substrate as a missing protocol domain (Finding 4 from the 20260412 chat on Ontologies and Dataset Repositories). This issue covers the full constitutional definition.

## Requirements

### MUST DO

1. **Constitutional domain definition**: Define Source Substrate as a distinct constitutional protocol domain in the Rosetta governing docs. The domain boundary: source systems, repositories, registries, identifier authorities, indexers, mirrors, and stewardship frameworks — modeled as distinct first-class protocol objects, not ingestion afterthoughts.

2. **Responsibilities enumeration**: Codify the Source Substrate responsibilities from Section 4.1:
   - Classify source systems by facet (not rigid tree)
   - Preserve multiple provenance dimensions
   - Bind external identifiers without collapsing into Rosetta-native identity
   - Separate record identity from artifact identity
   - Support repository, registry, and graph infrastructures
   - Support machine-readable capability profiles for sources
   - Support trust scoring as a vector (not scalar)
   - Track lifecycle events (retraction, supersession, embargo, access changes)
   - Expose all of the above to retrieval, evaluation, guard, and bundle systems

3. **Prohibitions enumeration**: Codify the Source Substrate SHALL NOT rules from Section 4.2:
   - SHALL NOT claim DOI alone proves truth
   - SHALL NOT equate platform account name with verified real-person identity
   - SHALL NOT equate repository hosting with authorship
   - SHALL NOT treat mirrors and canonical records as identical without explicit relation
   - SHALL NOT silently merge conflicting identity claims

4. **Non-collapse rule constitutional**: The non-collapse rule (Section 2.2) must be a constitutional constraint: no single object shall simultaneously stand in for record, bytes, platform, publisher, custodian, claimed author, and verified author identity.

5. **External-authority rule constitutional**: External identifiers remain anchored to external authorities; external repositories remain external authorities; Rosetta/Entif stores mappings and judgments but does not silently replace those authorities.

6. **ROCK-31YA spec**: Author the Source Substrate Core Pack specification as the first concrete artifact of this domain.

## Dependencies
- DI-011 (already filed)
- SSP-002 (non-collapse rule)
- SSP-003 (provenance lattice)
- SSP-004 (trust vector)
- SSP-005 (facet classification)

## Open Questions
- Should Source Substrate be a standalone governing document or a section of Rosetta v3.0 Core Spine?
- How does Source Substrate interact with existing Bootstrap ingest gate?
- What is the minimum viable Source Substrate for Text-Core MVP gate?

## Affects
- Text-Core MVP scope
- Bootstrap ingest pipeline
- Rights-scoped retrieval
- NOT LAME: write-admission gate (source provenance chain)
