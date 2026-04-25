# Issue Draft: CT-002 — Trust Bootstrap Problem: New Nodes Have No Reputation in Fully Open Network

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-002: Trust bootstrap problem — new nodes have no reputation in fully open network

**Type:** risk

**Labels:** trust, bootstrap, sybil

**Depends on:** — (standalone risk, but amplified if CT-001 network layer gap is resolved by adopting P2P)

---

## Summary

The Swarm Gnosis system assumes initial trust seeds exist before new nodes can establish credibility. In a completely open network, new nodes with no prior identity or attestation have no path to trust — creating a bootstrapping paradox that favors early participants and disadvantages newcomers. This is a known limitation acknowledged in the RFC's "Limitations and Future Work" section.

---

## Evidence

**From "Limitations and Future Work" — Bootstrapping Trust:**
> "The system assumes some initial trust seeds (trusted identities or attestations) to get started. In a completely open network, new users might struggle to know which tiles or signers to trust. Web-of-trust can take time to grow, and there is a risk of echo chambers if trust networks don't interconnect."

**From "Trust, Provenance, and Verification":**
> "If a tile comes from a highly trusted source (e.g. signed by a reputable authority) and carries attestations, an agent might accept it on trust without re-running all proofs."

---

## Discussion

The trust model has a chicken-and-egg structure:
1. To gain reputation, a node must produce trusted content
2. To produce trusted content, the node must be trusted enough that others accept its tiles
3. New nodes with zero reputation have no mechanism to enter the trust graph

Mitigations mentioned in the RFC:
- Integration with existing identity systems (ORCiD for researchers, Web PKI, government IDs)
- Proof-of-personhood tokens
- Introduction from established nodes (web-of-trust)
- Token stake mechanism (economic cost to participate)

Rosetta must decide:
- What are Rosetta's trust seeds? (Institutional anchors? Existing contributors? something else?)
- Should Rosetta require identity verification before nodes can publish artifacts?
- Is a web-of-trust model compatible with Rosetta's open participation goals?

If Rosetta adopts swarm P2P (CT-001), trust bootstrap becomes a gating concern. If Rosetta remains centralized (PostgreSQL-backed), this risk is less acute since the canonical registry is controlled.

---

## Action Items

- [ ] Define Rosetta's trust seed strategy (institutional anchors, identity verification, or open?)
- [ ] Decide whether open participation is a hard requirement or enterprise/private swarm is the primary deployment model
- [ ] If P2P adoption proceeds: design trust bootstrap protocol with initial seed identities
- [ ] Consider integration with ORCiD, GitHub, or other verifiable identity systems
- [ ] Assess echo chamber risk for trust network fragmentation

---

## Related

- CT-001: Network layer gap (if P2P adopted, this becomes critical)
- CT-007: No arbitration mechanism for conflicting tile versions (social process is the fallback, but requires trust to exist first)