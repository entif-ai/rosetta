# Issue Draft: CT-004 — GDPR Right-to-Eraser Conflict with Immutable Content-Addressed Storage

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-004: GDPR right-to-erasure conflict with immutable content-addressed storage

**Type:** ethics

**Labels:** privacy, gdpr, immutability, legal

**Depends on:** — (standalone legal/ethical risk, potentially blocking for any EU or privacy-regulated deployment)

---

## Summary

The Swarm Gnosis framework uses content-addressed immutable storage (IPFS-style). The RFC explicitly identifies the conflict with GDPR right-to-erasure ("right to be forgotten") as unresolved. Once data is pinned in a content-addressed network, it cannot be technically deleted — only delisted. This is a fundamental architectural incompatibility with EU privacy regulations and potentially other privacy frameworks.

---

## Evidence

**From "Limitations and Future Work" — Privacy vs Transparency:**
> "The system leans towards transparency and sharing, which conflicts with privacy in some cases. We can encrypt tiles for confidentiality, but then verification gets complicated... In an open swarm, anything not encrypted is visible to all, so contributors need to be careful not to unintentionally expose sensitive info.
> ...
> Content-addressing is immutable and content can persist indefinitely if pinned. Removing data from a content-addressed network is hard; you can delist but not truly delete unless all nodes cooperate. This is a limitation for sensitive data. Perhaps the answer is: don't put what you might regret – but mistakes happen. This tension between immutability and the right to be forgotten is unresolved in such systems."

---

## Discussion

GDPR Article 17 "Right to Erasure" (aka "right to be forgotten") requires that data controllers erase personal data when there is no legitimate basis for processing. The technical mechanism of content-addressed storage makes this mechanically impossible — the content can still be retrieved by any node that pinned it, and content addressing means the address (CID) is derived from the content itself, so the content is permanently findable by its hash.

Encryption is offered as a mitigation — but encrypted content is still stored (merely not readable). If the decryption key is deleted, the content is unreadable but still present. This may not satisfy GDPR's requirement to actually erase the data.

The RFC's only response is: "don't put what you might regret" — which is not a compliance strategy.

Rosetta must address this if:
- It plans to operate in EU jurisdictions
- It handles personal data of EU citizens
- It wants to be used by enterprises subject to GDPR
- It wants to avoid legal risk as a platform

Possible approaches:
1. **Encryption-only + key destruction**: All personal data is encrypted; when erasure is required, encryption key is destroyed. Content remains but is unrecoverable. May satisfy GDPR if encryption renders data effectively erased.
2. **Private swarm only**: Restrict Rosetta to private/permissioned deployments where content can be controlled and deleted. Not applicable to public swarm.
3. **Data minimization**: Never put personal data on-chain; personal data stays in private systems, only non-personal metadata goes on the swarm. Aligns with privacy-by-design.
4. **Accept non-compliance**: If Rosetta is a research tool, GDPR may not apply. But if it becomes a production system handling real user data, this becomes a liability.

---

## Action Items

- [ ] Legal review: Does Rosetta plan to handle personal data subject to GDPR?
- [ ] If yes: Design privacy architecture that satisfies right-to-erasure before swarm deployment
- [ ] If using encryption-only mitigation: verify that destroying decryption key satisfies GDPR erasure standard (legal counsel required)
- [ ] Implement data minimization: personal data stays off-chain; swarm only holds non-personal metadata
- [ ] Document GDPR limitation in deployment guidance for enterprise/compliant use cases

---

## Related

- CT-001: If Rosetta adopts P2P swarm, this conflict becomes unavoidable
- Privacy-by-design principles (ROSEMARY/other governance docs if they exist)