# SEC-003: Tokenomics Design Completely Absent

## Metadata
- **Type:** issue-draft
- **Domain:** tokenomics / governance
- **Source:** docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Description

PoS consensus, node incentivization, slashing for misbehavior, and anti-capture governance all depend on a defined token. The document explicitly says "native utility token" for staking and rewards but provides no: supply, distribution, inflation schedule, fee mechanisms, staking yield, slashing penalties, or token utility beyond staking. Without tokenomics design, the economic security model cannot be evaluated or implemented.

## Context

Section 4 — Node Incentivization via Tokenomics: "We introduce a native utility token or similar incentive mechanism. Node operators who contribute resources (compute, storage, validation work) are rewarded with tokens... Proof-of-Stake (PoS) model: prospective validators stake a certain amount of Entif tokens as collateral... Smart contracts on the blockchain can automatically slash a node's stake."

No token name, ticker, supply model, or initial distribution described.

## Impact

- Security model cannot be evaluated (no economic analysis possible)
- Validator recruitment cannot begin
- Anti-capture stake limits cannot be calibrated
- Governance voting power cannot be determined

## Related Findings
- [F5] Anti-capture design with multiple layers
- [F13] Tokenomics design completely absent

## Status
open