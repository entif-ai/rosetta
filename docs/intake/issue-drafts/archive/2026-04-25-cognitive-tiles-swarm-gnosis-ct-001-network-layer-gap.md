# Issue Draft: CT-001 — Rosetta Network Layer Gap: Swarm Gnosis P2P vs Current SQLite/Bootstrap Architecture

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-001: Rosetta network layer gap — Swarm Gnosis P2P vs current SQLite/Bootstrap architecture

**Type:** architecture

**Labels:** network, p2p, swarm, gap

**Depends on:** CT-002 (trust bootstrap problem must also be addressed if adopting swarm model)

---

## Summary

The Swarm Gnosis RFC describes a full P2P decentralized knowledge swarm using Kademlia DHT + GossipSub for discovery, routing, and replication. The current Rosetta Bootstrap implementation uses SQLite as local storage with no P2P networking layer. This represents a fundamental architectural gap. If Rosetta adopts the Swarm Gnosis model, the network layer must be rearchitected from scratch. If not, the Swarm Gnosis RFC must be treated as a parallel exploratory design not currently actionable in the Rosetta pipeline.

---

## Evidence

**From "Swarm Design: Discovery, Routing and Replication":**
> "The **Swarm Gnosis** network is a decentralized peer-to-peer network where nodes (agents) cooperate to store and retrieve tiles. We leverage a hybrid of **Kademlia DHT** and gossip protocols for discovery and routing."

**Rosetta Bootstrap current state (from repo context):**
- Bootstrap uses SQLite as canonical registry (per NOT LAME PRD)
- No libp2p or P2P networking stack currently implemented
- No DHT or gossip protocol infrastructure present
- TC-005 (Promotion state machine) is the critical path for Text-Core MVP

---

## Discussion

The gap is not just implementation — it's architectural. The Swarm Gnosis RFC is a decentralized P2P system. Rosetta Bootstrap is a centralized (single-node) system with SQLite. These are fundamentally incompatible network topologies.

Possible resolutions:
1. **Adopt P2P swarm**: Rosetta roadmap must include a `swarm-network` package with libp2p, Kademlia, GossipSub. This is a major effort not currently scoped in TC-001 through TC-007.
2. **Reject P2P model**: Rosetta remains PostgreSQL-backed centralized architecture. Swarm Gnosis RFC becomes a research reference, not a planned feature.
3. **Hybrid**: Rosetta nodes can operate in "swarm mode" as an optional configuration, while default mode remains centralized. This adds complexity.
4. **Defer decision**: The Swarm Gnosis RFC is a design exploration; Rosetta proceeds with Bootstrap/Text-Core MVP and re-evaluates swarm model for Alpha RC phase.

The architectural decision gate must happen before any swarm-related work enters the sprint queue.

---

## Action Items

- [ ] Architectural decision: Does Rosetta adopt P2P swarm model or remain centralized?
- [ ] If yes: Create `swarm-network` package scoping document; assess dependency on TC-005 promotion state machine
- [ ] If no: Mark Swarm Gnosis RFC as "exploratory reference — not in current roadmap"
- [ ] Document decision in next Architecture decision record (ADR)

---

## Related

- CT-002: Trust bootstrap problem (depends on P2P adoption)
- CT-007: No arbitration mechanism for conflicting tile versions (deeper issue if decentralized)
- NOT LAME PRD: sovereign-kernel + PostgreSQL canonical (contradicts pure P2P model)