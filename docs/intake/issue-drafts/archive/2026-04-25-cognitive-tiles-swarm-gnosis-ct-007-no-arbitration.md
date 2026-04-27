# Issue Draft: CT-007 — No Arbitration Mechanism for Conflicting Tile Versions: Fork Resolution Delegated to Social Process

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-007: No arbitration mechanism for conflicting tile versions — fork resolution delegated to social process

**Type:** process

**Labels:** versioning, governance, conflicts, decentralized

**Depends on:** — (process gap; amplified by decentralization goal in CT-001)

---

## Summary

The Swarm Gnosis version model is append-only and allows unlimited forks. When two or more tile branches represent contradictory knowledge with credible attestations on both sides, the technical system provides no arbitration mechanism — the RFC explicitly delegates conflict resolution to "a social process or an application layer decision." This creates a gap in the system's ability to guarantee convergence.

---

## Evidence

**From "Limitations and Future Work" — Merging Conflicts and Edit Wars:**
> "In the versioning model, if there's controversial content, many forked versions may appear. Our system doesn't enforce one truth – which is good for diversity, but also means knowledge consumers might get contradictory tiles. Resolving that is outside the technical system (it's a social process or an application layer decision which branch to follow). Without a central authority, consensus on which tile is 'the best current version' may not be reached in some cases. This could confuse agents or lead to duplicate effort (parallel versions). Some governance or convention (like majority acceptance or authoritative source) might be needed for coherence, which reintroduces some centralization."

---

## Discussion

The design philosophy is Git-like: forks are allowed, merge is explicit, no forced authority. This works well for code (Git has well-established merge workflows and conflict resolution tools), but knowledge has additional challenges:
- **Truth is not mergeable by algorithm**: If Tile A says "hypothesis X is true" and Tile B says "hypothesis X is false," no algorithmic merge can resolve this. It requires domain expertise and evidence evaluation.
- **Attestations can be wrong**: A tile can be signed by a credible identity and still be incorrect. Trust in the signer ≠ correctness of the content.
- **Agents may make different choices**: Without arbitration, different agents may follow different branches, leading to contradictory conclusions from the same knowledge base.

The RFC suggests possible mitigations:
- "majority acceptance" — but majority can be wrong (see: scientific consensus errors)
- "authoritative source" — reintroduces centralization (contradicts decentralized philosophy)
- "community governance" — requires agreed-upon governance body; doesn't exist yet

Rosetta implications:
- If Rosetta artifacts are promoted to tapestry (closure), the promotion process must include a conflict resolution mechanism
- If multiple conflicting versions of a source exist, which one gets the receipt trail?
- The receipt-law (every meaningful step emits receipts) may help — if conflicting tiles both have receipts, both can be traced to their origin. But this doesn't resolve the conflict, only documents it.

---

## Action Items

- [ ] Rosetta promotion gate (TC-005) must define conflict resolution for contradictory artifact versions
- [ ] Consider: when promoting to tapestry, is there a canonical "latest" version rule, or must all branches be preserved?
- [ ] Consider: community governance model for "authoritative version" determination in contested cases
- [ ] Document the limitation clearly: Rosetta can track conflicting versions but cannot algorithmically resolve substantive disagreements
- [ ] Align with NOT LAME query router: if multiple versions exist, does the router pick one arbitrarily or return all with confidence scores?

---

## Related

- CT-001: Network layer gap (decentralization amplifies this — no central authority to arbitrate)
- NOT LAME: Context Compiler + Query Router (must handle multi-version retrieval gracefully)