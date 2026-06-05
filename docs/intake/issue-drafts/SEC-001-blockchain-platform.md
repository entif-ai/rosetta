# SEC-001: Blockchain Platform Decision Unresolved

## Metadata
- **Type:** issue-draft
- **Domain:** architecture
- **Source:** docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Description

The Secure Architecture Companion Paper explicitly leaves blockchain platform type as "custom Entif blockchain vs Ethereum sidechain vs Cosmos/Tendermint chain" undefined. This is a foundational architectural gate — consensus algorithm, tokenomics design, governance smart contracts, and inter-node communication protocol all depend on this choice.

## Context

Section 4 states: "We may implement a custom Entif blockchain or use an existing platform (like an Ethereum sidechain or Cosmos/Tendermint chain) tailored for logging and governance transactions."

No criteria, timeline, or owner for this decision is given.

## Impact

Without this decision:
- Tokenomics (PoS, staking, slashing) cannot be specified
- Validator selection criteria cannot be finalized
- Governance smart contracts cannot be designed
- Blockchain-based audit trail cannot be implemented
- ZKP integration pathway cannot be determined

## Related Findings
- [F4] Blockchain-based audit trail and distributed consensus
- [F13] Tokenomics design completely absent

## Status
open