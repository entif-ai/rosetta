# SEC-004: ZKP Computation Verification Has No Implementation Pathway

## Metadata
- **Type:** issue-draft
- **Domain:** cryptography / implementation
- **Source:** docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md
- **Extracted:** 2026-06-05
- **Confidence:** medium

## Description

ZKP of AI model execution is cited as a key mechanism for zero-trust node validation in both Section 4 and Section 5. The document calls for nodes to provide cryptographic proof that they correctly executed an AI model on given inputs, without revealing proprietary model details. No proof system specified (zk-SNARK vs zk-STARK vs PLONK etc.), no circuit defined, no proof generation/verification cost analysis, no trusted setup timeline or participant list.

## Context

Section 4 — Use of Zero-Knowledge Proofs: "a node could generate a ZKP that it executed a certain AI model with given inputs and got output Y, without revealing proprietary model details... This prevents a malicious node from submitting a bogus result; without a valid proof, the network rejects it."

Section 5 — Mutual Validation: "ZK proof of computation... proves correct execution... mathematically guarantees the computation was done correctly without B having to run the model itself."

No mention of which ZKP system, Groth16, PLONK, Marlin, STARK, or constraint generation approach.

## Impact
- Trust model formalization blocked
- Cannot evaluate computational overhead vs benefit
- No basis for trusted setup ceremony planning
- ZKP integration into node software cannot begin

## Related Findings
- [F6] Zero-trust node design with TPM/SGX attestation
- [F12] ZKP for computation verification — no implementation pathway described
- [F16] Trusted setup ceremony for ZKP params — no participants identified

## Status
open