# SSP-008: Define and Implement Source Substrate Pack Suite (11 Packs)

## Type
implementation / pack-suite

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, pack-suite, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Section 12

## Summary

The Source Substrate requires 11 pack suites to be defined and eventually implemented. These packs define the canonical object model, vocabulary, and workflows for external source representation.

The 11 proposed packs:

1. **stdpack.source-substrate@0.1**: Core source object model — source.system, source.registry, source.graph_infrastructure, source.record, source.manifestation, source.package, source.fetch_receipt, source.normalization_receipt, source.identity_resolution_receipt, source.evaluation_receipt, and agency/claim objects.

2. **stdpack.scholarly-infrastructure@0.1**: Crosswalk Rosetta/Entif source objects to scholarly infrastructure patterns — DataCite, Crossref, ORCID, ROR, OpenAIRE, OpenAlex, Scholix/ScholeXplorer, re3data.

3. **stdpack.repository-capability-profile@0.1**: Machine-readable repository capability profiles — PID support, metadata schema support, API support, OAI-PMH/SPARQL/bulk availability, curation posture, preservation posture, access modes, correction/retraction support.

4. **vocabpack.source-taxonomy@0.1**: Facet-based classification vocabularies — Facet A (role, 20 values), Facet B (stewardship, 10 values), Facet C (access, 8 values), Facet D (identifier, 9 values), Facet E (lifecycle, 6 values), Facet F (machine affordance, 9 values), Facet G (trust/review, 7 values), Facet H (preservation, 5 values), Facet I (legal/rights, 6 values).

5. **stdpack.identity-and-authorship-provenance@0.1**: Authorship claims, depositor roles, institution claims, ORCID/ROR bindings, ambiguous/disputed identity states, personhood-sensitive identity escalation hooks.

6. **stdpack.retraction-correction-supersession@0.1**: Corrections, retractions, withdrawals, new versions, supersessions, invalidation signals.

7. **stdpack.portable-source-packaging@0.1**: How Rosetta tiles/tapestries can import from or export to RO-Crate and Croissant packaging profiles.

8-11. **4 additional packs** implied but not named in Section 12 (likely: stdpack.trust-vector@0.1, stdpack.lifecycle-events@0.1, stdpack.dedupe@0.1, vocabpack.repository-taxonomy@0.1 or similar).

## Requirements

### MUST DO

1. **ROCK-31YA**: Author stdpack.source-substrate@0.1 as the first pack in the suite (Section 17 recommends ROCK-31YA through 31YG).

2. **Pack dependency ordering**: Define the dependency graph among the 11 packs. Core object model must precede vocabulary, vocabulary must precede capability profiles.

3. **Scholarly infrastructure alignment**: stdpack.scholarly-infrastructure@0.1 maps Crossref/DataCite/ORCID/ROR/OpenAIRE/OpenAlex/Scholix/re3data to Rosetta source objects.

4. **Repository capability profile**: stdpack.repository-capability-profile@0.1 encodes machine-readable profiles per repository (Zenodo, Figshare, Dataverse, re3data, etc.).

5. **Pack versioning**: Each pack must follow semantic versioning with clear upgrade paths.

6. **Conformance testing**: Each pack must have conformance tests verifying that implementations satisfy the spec.

## Dependencies
- SSP-001 (Source Substrate constitutional domain)
- SSP-003 (provenance receipt types → stdpack.source-substrate)
- SSP-005 (facets → vocabpack.source-taxonomy)
- SSP-011 (repository profiles → stdpack.repository-capability-profile)
- Existing ROCK-31XX pack framework

## Open Questions
- What is the minimum viable pack subset for Text-Core MVP?
- How do Source Substrate packs interact with existing Rosetta packs (ROCK-3111, etc.)?
- What is the governance for pack additions/modifications after initial release?

## Affects
- Rosetta pack ecosystem
- Text-Core MVP scope gate
- Source Substrate constitutional domain
