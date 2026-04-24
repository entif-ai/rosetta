# Swarm Federation Governance Complexity: Layering vs. Co-design

## Source Document
- RFC: 20260412 - Rosetta - Ontological Mixture of Concepts (OMOC) - Swarm Gnosis Protocol Spec
- Extraction: 2026-04-24-omoc-swarm-gnosis-protocol-spec.md

## Context

Section 10.1 of the source RFC establishes an explicit federation staging order:

1. single-tenant local
2. multi-agent local
3. org-scoped federation
4. trusted inter-org exchange
5. public commons / open swarm

Section 18, Question 6 and Question 8 surface the core unresolved questions about licensing, governance, and selective disclosure for multi-tenant use.

This issue draft addresses a structural architectural question that sits beneath those open questions:

> **Should org-scoped federation (Tack 7 scope) be designed in isolation from inter-org federation design, or should both layers be co-designed from the start to avoid expensive refactoring when the system scales from org-scoped to inter-org?**

The RFC treats these as sequential layers. The governance, rights-scoping, and selective disclosure requirements that work for org-scoped exchange may not survive inter-org scaling without structural redesign.

## The Tension

### Argument for Layer-by-Layer (Isolated org-scoped first)

- Org-scoped federation is the immediately actionable scope (Tack 7 acceptance gate)
- Inter-org exchange is further out; requirements are less mature
- Building for org-scoped first gets the system to a verifiable state faster
- Governance model for inter-org may be fundamentally different (different trust assumptions, different legal entities)
- Over-engineering for inter-org now risks adding complexity that slows org-scoped delivery

### Argument for Co-design from the Start

- Architecture choices made for org-scoped (rights-scoped retrieval, selective disclosure, proof-carrying bundles) may require breaking changes to support inter-org
- If the underlying schema does not anticipate multi-entity trust boundaries, migration to inter-org could require restructuring the exchange object schema, receipt binding, and verification surface
- Selective disclosure for commercial multi-tenant use (open question #8) is relevant to both org-scoped AND inter-org — solving it once in a generalized way may be cheaper than retrofitting
- The public commons vision (public library / Entif Commons) implies a specific licensing model that, if adopted at all, should be designed into the exchange object from the beginning rather than bolted on later

## Key Refactoring Risk Areas

The following are likely to require different designs for org-scoped vs. inter-org:

1. **Rights-scope granularity:** Org-scoped can rely on internal identity/property management. Inter-org requires cross-entity rights verification without a shared identity provider.
2. **Proof-carrying bundles:** Org-scoped can assume a shared verification surface. Inter-org requires third-party verifiable proofs without shared trust infrastructure.
3. **Selective disclosure:** Org-scoped can use policy-based filtering. Inter-org requires cryptographic selective disclosure (e.g., zero-knowledge proofs or commitment schemes) if commercial sensitivity applies.
4. **Receipt binding:** Org-scoped receipts can reference a shared ledger. Inter-org receipts require cross-ledger verification or a shared attestation registry.
5. **Licensing model:** Org-scoped can use bilateral agreements. Public commons requires a unilateral license grant that is automatically enforceable by verification surface.

## Decision Criteria

1. **Tack 7 acceptance gate scope:** Is the acceptance gate for Tack 7 explicitly limited to "third parties can verify what they receive without trusted-local-state assumptions," or does it imply "and this design scales to inter-org without refactoring"?
2. **Licensing model maturity:** Is the public commons licensing model sufficiently defined to influence schema design now? If not, org-scoped-first may be correct.
3. **Selective disclosure urgency:** Is commercial multi-tenant selective disclosure a near-term requirement (within 12 months) or a future consideration? If near-term, it should inform Tack 7 schema design.
4. **Migration cost estimate:** How costly is a breaking change to the exchange object schema once org-scoped federation is in production? If high, invest more in co-design now.

## Recommended Action

Before Tack 7 begins, clarify:

1. The Tack 7 acceptance gate language: is "org-scoped federation" explicitly scoped to single-organization trust boundaries, or does it imply inter-org-ready architecture?
2. Whether the licensing model for public commons is a stated near-term goal or a distant aspiration — if the former, design the exchange object to accommodate it
3. Whether commercial multi-tenant selective disclosure is a near-term requirement that should inform current schema design

If the answers suggest inter-org scale is genuinely distant and the licensing model is undefined, proceed with org-scoped-first design but document the schema extension points explicitly so inter-org design can be additive rather than migratory.

If inter-org is a stated 12-18 month goal, invest in co-designing the exchange object with multi-entity trust assumptions from the start.

## Labels
- `federation`
- `swarm-gnosis`
- `build-order`
- `governance`
- `architecture`

## Status
Open — awaiting clarification of Tack 7 acceptance gate scope and licensing model intent before kickoff.
