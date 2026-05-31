# SSP-003: Define 8-Dimension Multi-Provenance Lattice

## Type
architecture / implementation

## Status
issue-candidate

## Priority
P0

## Labels
source-substrate, provenance, multi-provenance, receipts, constitutional

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Sections 2.4, 5.3, 7

## Summary

The Source Substrate requires that provenance be represented in 8 distinct dimensions, not a single linear chain. These dimensions are:

1. **Acquisition provenance** — What did Entif fetch, from where, when, by what method, under what auth context, and what exactly was received?
2. **Publication provenance** — What publication surface claims to publish or expose this artifact?
3. **Custody provenance** — Who hosts or stewards the thing now?
4. **Authorship provenance** — Who is claimed to have created, written, issued, deposited, or otherwise authored the thing? (Must distinguish named creator string, account holder, depositing actor, repository distributor, publisher, curator, software tool)
5. **Identity-resolution provenance** — How do we know that "Jane Smith" here is the same or not the same as another Jane Smith elsewhere? (Must store: method, evidence set, confidence distribution, invalidation hooks)
6. **Derivation provenance** — How is a new artifact derived from an older one? (format conversion, OCR, metadata extraction, translation, summarization, claim extraction, entity linking, package generation, graph enrichment)
7. **Rights provenance** — Which license, terms, embargo, consent, or use restriction applies, according to whom, and where was that assertion taken from?
8. **Evaluation provenance** — How did Entif arrive at its current trust/risk/relevance/novelty/value-add/resilience judgments?

## Requirements

### MUST DO

1. **Define 8 first-class receipt types**: Map each provenance dimension to a corresponding source.*_receipt object:
   - source.fetch_receipt → acquisition provenance
   - source.normalization_receipt → derivation provenance
   - source.identity_resolution_receipt → identity-resolution provenance
   - source.evaluation_receipt → evaluation provenance
   - Plus 4 additional receipts for publication, custody, authorship, rights provenance

2. **Receipt fields for each dimension**: Define minimum required fields for each provenance receipt per Sections 5.3 and 7.1-7.8.

3. **Multi-dimension chaining**: Each source.manifestation or source.record MUST carry references to all applicable provenance dimensions — not just acquisition.

4. **Identity-resolution provenance specific**: Must store method (ORCID/ROR/signed-release/DOI-metadata/institutional-domain/graph/human-curation), evidence set, confidence distribution, invalidation hooks.

5. **Rights provenance**: Must track license assertion source, embargo state, contractual constraints.

6. ** Constitutional-level**: The 8-dimension lattice is a constitutional requirement; Receipt Law must apply to all 8 dimensions.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- Receipt Law (existing Bootstrap constraint)
- SSP-004 (trust vector — evaluation provenance feeds trust)

## Open Questions
- How does the 8-dimension lattice interact with existing Rosetta Receipt Law?
- Can we reuse existing receipt infrastructure or do we need source-specific receipts?

## Affects
- Source Substrate constitutional domain
- Receipt Law extension
- Trust vector (Section 8 feeds evaluation provenance)
- Rights-scoped retrieval
