---
title: "Source Substrate: Missing First-Class Protocol Domain"
type: "architecture/spec-gap"
status: "open"
evidence: "Finding 4 — 20260412 chat synthesis; Finding 5 — provenance lanes; Finding 6 — multidimensional trust"
---

## Context

The 20260412 ChatGPT session on ontologies and dataset repositories surfaces a structural gap in the Rosetta protocol suite: source handling is not a first-class protocol domain. The existing model collapses all external sources into a single undifferentiated `source` field, which is insufficient for the multi-layered, epistemically graded source model Entif requires.

This is not an optional enhancement. It is a constitutional gap. Without a formal Source Substrate domain, Rosetta cannot properly support:
- Multi-lane provenance (acquisition vs. publication vs. custody vs. authorship vs. identity-resolution vs. derivation vs. rights vs. evaluation)
- Multi-dimensional trust scoring (15 distinct axes)
- Source-family taxonomy (research repo, commercial repo, registry, identity provider, news, social, forum, blog, email, code, review, etc.)
- Tiered ingestion priority (Tier 0 identity spine → Tier 4 volatile discourse)

## Evidence

1. **User request (20260412 prompt):** "It's table-stakes here, too... we need to link the data obtained from these sources to _multiple_ provenance and trust related structural entities. That includes the place it was fetched from, the purported author... and all sorts of other bits of metadata that go along with the semantic analysis... we need to draw far more sophisticated conclusions about who's trustworthy, and about what."
2. **Model synthesis:** "Entif should add a first-class **Source Substrate** domain. Instead of a single `source` field, it separates source system, record identity, manifestation identity, acquisition event, hosting/custody, publication context, identifier bindings, authorship claims, identity evidence, rights context, lifecycle events, and evaluation receipts."
3. **Model synthesis (provenance lanes):** "It also formalizes multiple provenance lanes rather than one chain, because acquisition provenance, publication provenance, custody provenance, authorship provenance, identity-resolution provenance, derivation provenance, rights provenance, and evaluation provenance are not interchangeable."
4. **Model synthesis (trust axes):** "The new spec treats artifact integrity, record identity, authorship, institutional affiliation, stewardship quality, review rigor, metadata richness, license clarity, correction responsiveness, manipulation risk, identity risk, novelty yield, rarity yield, corroboration density, and invalidation sensitivity as separate axes."
5. **Model synthesis (priority tiers):** The model established a four-tier priority ordering; without Source Substrate as a formal domain, there is no protocol location for these tiering rules.

## Proposed Resolution

Author a **Rosetta Source Substrate Addendum** (constitutional-level spec) covering:
1. Source Substrate domain definition and scope
2. `source.record` schema: source system, record identity, manifestation identity, acquisition event, hosting/custody, publication context, identifier bindings, authorship claims, identity evidence, rights context, lifecycle events, evaluation receipts
3. Eight distinct provenance lane definitions and their non-interchangeability
4. Fifteen-axis trust vector model
5. Source-family taxonomy with per-family hydration policies
6. Tiered ingestion priority rules (Tier 0–4)
7. Anti-rot rule for source acquisition (content hashes + retrieval metadata + excerpts + snapshots alongside URLs)
8. External-standards binding posture (standards stay external; Rosetta provides profiles and mappings)
9. Ethical constraints: personhood-correlation and cognitive-fingerprint abuse prohibitions

This addendum should be numbered analogously to existing governance addenda (e.g., `rosetta_source_substrate_addendum_v0.1.0.md`).

## Relationship to Existing Rosetta Work

- **Distinct from ROCK provenance work:** ROCK handles provenance of derivations within Rosetta; Source Substrate handles provenance of external sources feeding into Rosetta.
- **Distinct from OMOC:** OMOC handles concept routing; Source Substrate handles source ingestion and trust evaluation.
- **Structural parallel to governance addenda:** The Source Substrate is a new major protocol section, comparable in scope to the governance layer.

## Notes

The 20260412 chat also produced three companion artifact concepts (Source Substrate Addendum draft, Source Taxonomy Matrix, Source Record Schema YAML) that were discussed but not committed to the corpus. Those files should be created as part of this work.
