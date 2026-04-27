# Issue Draft: Swarm Federation Governance Complexity

**Doc intelligence source:** `docs/RFCs/20260412 - Rosetta - Ontological Mixture of Concepts (OMOC) - Swarm Gnosis Protocol Spec.md`

**Extraction timestamp:** 2026-04-24

**Status:** open — risk identified, no resolution proposed

---

## Problem Statement

Section 10.1 of the OMOC spec proposes a 5-layer staged federation progression:

1. Single-tenant local
2. Multi-agent local
3. Org-scoped federation
4. Trusted inter-org exchange
5. Public commons / open swarm

**Each layer requires stronger proof, rights, and abuse-handling than the last.**

Managing these 5 layers simultaneously — with their distinct governance requirements, trust models, rights scopes, and abuse-handling mechanisms — creates substantial complexity that the spec acknowledges but does not scope.

This is a risk because:
1. Governance requirements for layer 4 (inter-org) and layer 5 (public) are fundamentally different from layers 1-3
2. Abuse-handling at the public commons layer requires legal, technical, and social mechanisms beyond what internal org-scoped systems need
3. Rights-preserving exchange bundles and selective disclosure requirements multiply with each additional trust boundary crossed

## Evidence from Source

**Section 10.1:**
> "Federation should proceed in layers: single-tenant local → multi-agent local → org-scoped federation → trusted inter-org exchange → public commons / open swarm. Each layer requires stronger proof, rights, and abuse-handling than the last."

**Section 10.2:**
> "The public or federated substrate should exchange: tiles, tapestries, skills/operators, archetype or lens packs, ontology packs, schema profiles, receipts and attestations, and, where appropriate, slugs plus witness packs. It should NOT assume that raw session history, private context, or sensitive prompt scaffolds are the exchange default."

**Section 10.4:**
> "The 'public library' vision is strongest when framed as: an Entif Commons of signed packs, tiles, tapestries, skills, and validators; a Rosetta verifier surface so third parties can validate signatures, histories, and pack provenance; and a commons route to interoperability where adoption grows because verification and reuse are easier than siloing."

**Section 15.3:**
> "A public or federated artifact should be able to prove integrity without oversharing sensitive content. That implies: commitments and hashes, witness packs, redaction-friendly receipt design, and forkable policy profiles."

**Section 18 (Open Question 6):**
> "What is the right public-commons licensing and governance model for Swarm Gnosis artifacts?"

The spec explicitly identifies public commons licensing/governance as an open question (not resolved).

## Specific Concerns

### 1. Rights Scoping Across Trust Boundaries

At layer 3 (org-scoped), rights-scoping is an intra-org problem. At layers 4-5, rights-scoping crosses org boundaries with different legal jurisdictions, legal entities, and policy frameworks. A tile that is rights-scope-compatible with Org A's policy may not be compatible with Org B's.

### 2. Abuse-Handling Asymmetry

At layers 1-3, abuse (malicious tiles, fraudulent attestations, policy violations) can be handled by a central authority (the org). At layer 5, there is no central authority. Abuse-handling requires decentralized mechanisms (slashing, reputation systems, legal recourse) that are not specified.

### 3. Receipt Chain Integrity Across Federation Boundaries

Receipts attest to processes within a single trust context. When a tile moves from Org A's runtime to Org B's runtime (layer 4) or to the public commons (layer 5), the receipt chain must remain verifiable. But Org A's Guard may not be trusted by Org B. This requires cross-verification mechanisms not described in the spec.

### 4. Witness Pack Complexity

Section 15.3 mentions "witness packs" for selective disclosure, but no schema, no definition of what constitutes a valid witness, and no protocol for witness verification by third parties. At layer 5, this is a hard problem.

### 5. Forkable Policy Profiles

Section 15.3 mentions "forkable policy profiles" — the ability for a public artifact's policy to be forked (copied and modified) by downstream consumers. This creates policy drift risk: an artifact published with a specific policy may be forked into a variant that violates the original publisher's intent.

## Risk Assessment

- **Likelihood:** High — the 5-layer model is explicitly proposed; governance complexity is inherent in multi-layer federation
- **Impact:** High — governance failures at layers 4-5 could compromise the integrity of public artifacts and undermine trust in the Rosetta/Entif ecosystem
- **Mitigation:** Each layer needs a distinct governance spec before that layer is activated; do not attempt to build public commons governance until org-scoped federation is proven

## Recommendation

1. **Add a governance layer spec per federation stage** — each stage (3, 4, 5) should have a distinct governance model documented before activation
2. **Layer 5 (public commons) should be gated behind a separate RFC** — this is not something to design in the same document as the technical exchange layer
3. **Define "abuse" taxonomy first** — before designing abuse-handling, enumerate the abuse classes (fraudulent attestations, policy violation, malicious tiles, etc.)
4. **Rights-preserving exchange should be a standalone spec** — not part of the general Swarm Gnosis spec

**This issue is a risk** that should be tracked, not a blocker for layers 1-3.

---

## Related Issues

- omoc-lean-vs-learned-routing-paradigm.md (same source doc)
- Public commons licensing/governance (Open Question 6 from same doc)
- Selective disclosure for commercial multi-tenant (Open Question 8 from same doc)