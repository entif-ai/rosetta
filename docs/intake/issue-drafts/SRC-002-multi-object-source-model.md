# SRC-002 — Design Multi-Object Source Model for Artifact Representation

**Priority:** P1
**Labels:** docs-intake, architecture, source-substrate, object-model
**Milestone:** TBD

## Problem

Current artifact ingestion model conflates record, bytes, platform, publisher, custodian, claimed author, and verified author identity into single flat source fields. This violates the non-collapse rule and prevents downstream reasoning about trustworthiness, provenance quality, and identity evidence.

## Expected Output

Design of a multi-object source model implementing the 12-component minimum from Section 2.1:
1. `source.artifact` — artifact identity
2. `source.manifestation` — specific downloadable/viewable embodiment
3. `source.fetch_event` — acquisition event (when, how, under what conditions)
4. `source.custody_context` — hosting/custody context
5. `source.publication_context` — publication surface
6. `source.identifier_bindings` — DOI, Handle, ORCID, ROR, SWHID, URL, local record ID
7. `source.authorship_claim` — claimed authorship/agency
8. `source.identity_evidence` — what supports or weakens identity claims
9. `source.stewardship_posture` — curation, moderation, peer review, screening
10. `source.rights_context` — licensing, embargoes, usage constraints
11. `source.lifecycle_event` — corrections, retractions, supersessions, new versions
12. `source.evaluation_receipt` — trust, risk, validity analysis

Plus the following structural rules:
- Non-collapse rule: no single object may simultaneously represent the record, bytes, platform, publisher, custodian, claimed author, and verified author identity
- External-authority rule: external identifiers remain anchored to external authorities; Entif stores mappings and judgments, not replacements
- Multi-provenance rule: provenance for every non-trivial artifact is represented in 8 dimensions (acquisition, derivation, authorship, custody, publication, licensing, identity-resolution, evaluation)

## Sources

- `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md` — Section 2.1 (Primary thesis — multi-object model), Section 2.2 (Non-collapse rule), Section 2.3 (External-authority rule), Section 2.4 (Multi-provenance rule), Section 5.2–5.4 (object type specifications)
- `docs/intake/docs-intelligence/2026-06-05-source-substrate-provenance.md` — [F2], [F5], [F9]
