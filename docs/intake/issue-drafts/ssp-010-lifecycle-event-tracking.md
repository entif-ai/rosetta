# SSP-010: Implement Lifecycle Event Tracking and Invalidation Model

## Type
implementation / architecture

## Status
issue-candidate

## Priority
P1

## Labels
source-substrate, lifecycle, invalidation, architecture

## Evidence
docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md, Sections 9.1, 9.2

## Summary

The Source Substrate must track lifecycle events for all mutable sources and maintain explicit invalidation hooks for every trust-bearing object. This enables Rosetta to maintain currency and accuracy over time as external sources change.

Required lifecycle events:
- Create/publish
- Metadata update
- New version
- Supersession
- Correction
- Withdrawal
- Retraction
- Access change
- Rights change
- Mirror creation
- Re-hosting
- Repository migration
- Tombstone creation

Required invalidation hooks per trust-bearing object:
- Newer version exists
- Authorship disputed
- DOI reassigned or duplicated
- Repository record removed
- Legal hold
- Retraction or correction notice
- Broken checksum or mismatch
- Metadata no longer matches fetched manifestation
- Source policy changed

## Requirements

### MUST DO

1. **Lifecycle event model**: Define source.lifecycle_event object type capturing: event type (from the 13 events above), timestamp, source of event (which system reported it), evidence reference, and affected objects.

2. **Invalidation hook model**: Every source.evaluation_receipt and trust-bearing object MUST carry an invalidation_hooks list with: hook type, condition, trigger, and last-checked timestamp.

3. **Lifecycle watcher registration**: For mutable sources (Facet E values: version family, mutable metadata/immutable files, mutable both, append-only event stream, live continuously updated feed), the ingestion pipeline (SSP-009 Step 11) MUST register lifecycle watchers.

4. **Watcher implementation**: Implement watcher mechanisms for:
   - DOI status changes (via Crossref/DataCite event API)
   - New version alerts (via source system APIs or RSS/OAI-PMH)
   - Retraction watch (via Crossref, PubMed, source-specific channels)
   - Access/rights changes (via source system policy monitoring)

5. **Trust vector invalidation**: When lifecycle events fire invalidation hooks, the corresponding trust vector axes MUST be recalculated and a new source.evaluation_receipt emitted.

6. **Correction events**: source.correction_event objects (correction, retraction, withdrawal, supersession, versioning event, policy takedown, metadata update) MUST be linkable to the affected source.record and source.manifestation objects.

## Dependencies
- SSP-004 (trust vector — invalidation affects trust axes)
- SSP-009 (12-step pipeline — Step 11 attaches lifecycle watchers)
- stdpack.retraction-correction-supersession@0.1 (SSP-008)

## Open Questions
- What is the polling frequency for lifecycle watchers?
- How are watcher failures handled without creating cascading instability?
- How does lifecycle tracking interact with the append-only constraint on Rosetta tiles?

## Affects
- Source Substrate constitutional domain
- Trust vector maintenance
- Rights-scoped retrieval (invalidated sources may change retrieval eligibility)
- NOT LAME: sovereign kernel (lifecycle affects write decisions)
