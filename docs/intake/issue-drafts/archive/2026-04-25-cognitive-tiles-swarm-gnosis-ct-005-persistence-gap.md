# Issue Draft: CT-005 — Economic Persistence Gap: No Token/Payment System; Unpopular Data May Disappear

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-005: Economic persistence gap — no token/payment system; unpopular data may disappear

**Type:** risk

**Labels:** persistence, incentives, economics

**Depends on:** — (standalone risk; amplified if P2P swarm model adopted per CT-001)

---

## Summary

The Swarm Gnosis framework has no economic incentives for node operators to persist data. The RFC explicitly acknowledges that without a token/payment system, the network relies on "altruistic nodes" — and that unpopular data will be garbage-collected. This creates a persistence risk where important but low-demand knowledge may vanish from the network despite being content-addressed and technically recoverable.

---

## Evidence

**From "Limitations and Future Work" — Economic Incentives:**
> "We have not implemented a real token or payment system (we mentioned it conceptually). Without economic incentives, altruistic nodes must store and serve data. This works to some extent (like IPFS exists without built-in crypto incentives, relying on goodwill or external incentives). But at larger scale, ensuring persistence and availability might require incentivization (like Filecoin or etc.). We leave integration with such incentive layers as future extension. In absence, there is a risk that unpopular data gets garbage-collected everywhere (so even though content addressing can preserve history, if no one pins a particular old version, it may disappear)."

---

## Discussion

The situation:
- Content-addressing means data *can* be persisted indefinitely if nodes choose to pin it
- Without economic incentive, nodes will pin popular/high-demand content (for cache hits, reputation)
- Unpopular content (older versions, niche knowledge, minority viewpoints) will be dropped during garbage collection
- This creates a "popularity bias" where the network amplifies already-popular knowledge and marginalizes unpopular knowledge

Historical parallel: IPFS without Filecoin faces this exact problem. Popular content stays available; less-popular content disappears when no altruistic node is caching it.

The RFC suggests Filecoin integration as the future solution — but that is explicitly deferred. In the meantime, the system is vulnerable.

Rosetta's options:
1. **Institutional archivists**: Libraries, universities, or organizations run pinning nodes for long-term preservation. Requires institutional commitment, not technical mechanism.
2. **Internal persistence guarantee**: Rosetta itself runs pinning infrastructure for all artifacts, ensuring nothing disappears. Changes swarm from "anyone can participate" to "Rosetta Foundation controls persistence."
3. **Accept best-effort**: Acknowledge that persistence is best-effort; Rosetta artifacts may disappear if unpinned. Unacceptable for audit/trail requirements.
4. **Implement token incentive**: Build economic layer (Filecoin or similar). Major scope addition; not currently in roadmap.
5. **Content evaluation + mandatory pinning**: For artifacts above a certain importance threshold (e.g., promoted to tapestry), mandatory pinning is enforced. Partial solution.

---

## Action Items

- [ ] Rosetta must decide: what is the persistence guarantee for promoted artifacts?
- [ ] If institutional archivists: identify partner institutions; define pinning responsibilities
- [ ] If internal pinning: scope the operational cost; integrate into deployment model
- [ ] If best-effort: document the limitation; ensure receipts/trails can survive content loss
- [ ] Track Filecoin integration as future research when economics become a production concern

---

## Related

- CT-001: Network layer gap (if P2P adopted, persistence becomes a swarm-wide concern)
- NOT LAME: PostgreSQL canonical registry (if Rosetta uses PostgreSQL for persistence, this risk is partially mitigated — but the swarm itself remains vulnerable)