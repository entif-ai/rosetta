# SSP-002: Implement Non-Collapse Rule for Source Objects

## Type
implementation / architecture

## Status
issue-candidate

## Priority
P0

## Labels
source-substrate, non-collapse-rule, architecture, constitutional

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 2.2

## Summary

The non-collapse rule is a core architectural constraint that prevents Rosetta from conflating distinct source concepts into single identifier fields. The rule states:

> "No single object SHALL simultaneously stand in for all of the following: the record, the bytes, the platform, the publisher, the custodian, the claimed author, and the verified identity of that author."

This issue is about implementing and enforcing this rule in the architecture and code.

## Requirements

### MUST DO

1. **Rejection criteria at ingestion gate**: The ingestion/refinery pipeline MUST reject any source representation that collapses the 12 elements of the multi-object source model (Section 2.1) into fewer objects than required by the non-collapse rule.

2. **Object model enforcement**: Define minimum object separation:
   - source.record (record in source system) is NOT source.manifestation (concrete embodiment)
   - source.record is NOT source.system (platform/repository)
   - source.authorship_claim is NOT source.identity_evidence
   - source.custody_claim is NOT source.publication_claim
   - source.system is NOT source.graph_infrastructure
   - source.graph_infrastructure is NOT source.registry

3. **Anti-conflation validation**: Write validation that any proposed source representation does not merge roles that the non-collapse rule requires to remain distinct.

4. **SHACL shapes**: Define SHACL shapes that enforce the non-collapse rule constraints on source object structures.

5. **Ingestion gate test**: Write tests that attempt to submit conflated source objects and verify they are rejected.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- Bootstrap ingest gate

## Open Questions
- What is the minimum viable object separation for the Text-Core MVP gate?
- How does the non-collapse rule interact with existing Rosetta tile kinds?

## Affects
- Ingestion/refinery pipeline
- Source Substrate constitutional domain
- Rights-scoped retrieval
