# Issue Draft: CT-006 — ZK Proof Integration Not Near-Term Viable: Heavy Proof Generation Cost

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-006: ZK proof integration not near-term viable — heavy ZK proof generation cost limits adoption

**Type:** technology

**Labels:** zk-proofs, snarks, future-work

**Depends on:** — (future/optional; not blocking for current implementation)

---

## Summary

Zero-knowledge proofs (ZK-SNARKs) are proposed in the Swarm Gnosis RFC as a mechanism for privacy-preserving verification — proving that a computation was performed correctly without revealing the input data. However, the RFC acknowledges that ZK proof generation is currently expensive and slow, limiting practical adoption. This is classified as an optional future feature, not a near-term implementation target.

---

## Evidence

**From "Limitations and Future Work" — Scalability of Meta-Data:**
> "Similarly, heavy use of ZK proofs is currently limited by proof generation cost – producing proofs for arbitrary computations can be very slow, which might limit adoption of that feature until ZK tech improves."

**From "Trust, Provenance, and Verification" — ZK Proofs:**
> "A tile can carry a ZK-proof that a certain property holds without revealing all details. For example, a tile might state a conclusion that depends on some confidential data; it could include a ZK proof that 'I applied algorithm A to dataset committed in hash H and got result R' without revealing the dataset itself."

---

## Discussion

ZK proof characteristics in 2025:
- **Proving time**: Generating a SNARK proof for a non-trivial computation takes seconds to minutes on modern hardware. For complex computations, it can take hours.
- **Verification time**: Verifying a SNARK is fast — typically 10ms or less, which is the key advantage. The expensive work is done once by the prover.
- **Setup requirements**: Most ZK systems require a trusted setup ceremony for circuit-specific parameters.
- **Circuit complexity**: ZK proofs are practical for bounded computation; they don't scale well to arbitrary arbitrary code execution.

The RFC's use case ("I applied algorithm A to dataset H and got result R") could be expressed as a ZK circuit — but only if algorithm A is a known, bounded computation. Unbounded code (like general Python scripts in witness packages) cannot be efficiently proven.

Current ZK proof adoption in production systems:
- Ethereum uses ZK-SNARKs for zkRollups (proof generation done off-chain, verification on-chain)
- Filecoin uses ZK proofs for storage proofs
- zkSync, StarkNet for EVM scaling

Rosetta relevance:
- If witness code execution (CT-009) is implemented via ZK proofs instead of WASM sandboxing, ZK becomes a requirement
- If privacy-preserving attestation is required for sensitive data, ZK is the primary technical approach
- Otherwise, ZK is optional enhancement

---

## Action Items

- [ ] Do not plan ZK proof integration as part of current Text-Core MVP or Alpha RC
- [ ] If ZK is required later: monitor ZK technology development (2025-2026 is a fast-moving space)
- [ ] If ZK becomes relevant: evaluate Circom/Plonk Noir.js tooling; plan trusted setup ceremony
- [ ] For near-term: use WASM sandbox (CT-009) for witness code execution; ZK proofs are a future optimization path
- [ ] Track ZK tech maturity; reassess in 6 months

---

## Related

- CT-009: WASM sandbox for witness code execution (near-term replacement for ZK)
- Security/abuse resistance section: ZK as optional verification enhancement