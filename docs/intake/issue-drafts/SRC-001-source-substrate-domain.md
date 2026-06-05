# SRC-001 — Define Source Substrate Constitutional Domain

**Priority:** P1
**Labels:** docs-intake, governance, architecture, source-substrate
**Milestone:** TBD

## Problem

Rosetta/Entif currently has no architectural domain for representing source systems, repositories, registries, and the broader source ecology around artifacts. Ingestion collapses distinct concerns (record identity, platform hosting, custody, authorship claims, verified author identity) into flat source fields. This prevents the system from reasoning about trustworthiness, provenance quality, stewardship posture, and lifecycle state.

## Expected Output

1. New protocol text defining the Source Substrate as a constitutional domain in the Rosetta core spine
2. Statement of responsibilities: classify source systems by facet, preserve multiple provenance dimensions, bind external identifiers without collapsing them into Rosetta identity, separate record identity from artifact identity, support repository/registry/graph infrastructures, support machine-readable capability profiles, support trust scoring as a vector, track lifecycle events (retraction, supersession, embargo), expose all to retrieval/evaluation/guard/bundle systems
3. Explicit non-collapse rule and external-authority rule in protocol text

## Sources

- `docs/governance/20260412 - Entif Source Substrate and Repository Provenance Addendum.md` — Section 2 (Primary thesis), Section 4 (Source Substrate domain definition), Section 4.1–4.2 (responsibilities)
- `docs/intake/docs-intelligence/2026-06-05-source-substrate-provenance.md` — [F1], [F2]

## Related Issues

- Closes SRC-002 (multi-object source model is an instantiation of this domain)
- Blocks SRC-003 through SRC-008 (all depend on Source Substrate domain existing)
