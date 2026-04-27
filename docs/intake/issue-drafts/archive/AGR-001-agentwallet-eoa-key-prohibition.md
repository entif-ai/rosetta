# AGR-001: Enforce EOA Key Handoff Prohibition for Agent Wallets — Require Smart Contract Wallet or HSM Enclave

**Type:** security-architecture  
**Status:** draft  
**Labels:** agentwallet, key-material-control, smart-contract-wallet, hsm, delegated-trading  
**Depends on:** —

---

## Context

The "Agentic GitHub Repos" conversation (2026-02-22) documents a ClawHub skill (`glitch003/agentwallet`) and Moltbook playbooks for delegated on-chain trading where "the agent spins up the wallet, then the human claims it and sets policies." The conversation explicitly flags this as potentially unsafe: if the agent generates an EOA (externally owned account) keypair and hands it to the human, the agent can retain a copy, negating the "human control" premise entirely.

The safety guarantee requires either a smart contract wallet (Gnosis Safe-style multi-sig + policy engine) or key generation inside an HSM/TEE enclave where the agent runtime never has raw key material.

This is not yet addressed in any Rosetta spec.

## Claim

Rosetta agents that integrate with external blockchain wallets MUST enforce a structural constraint: the agent must NEVER generate, possess, or retain ability to use an EOA private key for financial operations. Wallet creation by the agent is only permissible via a smart contract wallet factory or a key derivation protocol that provably excludes the agent from key material.

## Technical Requirements

### Safe wallet creation patterns (acceptable)
1. **Smart contract wallet via factory**: Agent calls `WalletFactory.createWallet(policyContractAddress)` on a deployed factory; the resulting wallet is controlled by a policy contract (not the agent's key); agent receives only a wallet address, never a private key
2. **MPC/TSS (threshold signature)**: Key shares distributed across multiple parties; agent holds one share but cannot sign alone; human holds enough shares to revoke or override
3. **HSM/TEE enclave key derivation**: Key material generated inside a hardware security module or trusted execution environment; agent can request signing operations but cannot extract the raw key

### Unsafe pattern (prohibited)
- Agent generates EOA keypair (e.g., `privateKeyToAccount(genRandomKey())`) and returns the private key or seed phrase to any party — this is a hard violation regardless of what the human does afterward

### Agent wallet skill interface (if integrated)
- Rosetta should support `agentwallet` skill type with interface:
  - `wallet.create(policyConstraints)` → returns `{ walletAddress, policyContract, creationTxHash }`
  - `wallet.requestSignature(walletAddress, txRequest)` → returns `{ signedTxHash }` (enclave/HSM attestation if used)
  - `wallet.revokeHumanOverride(walletAddress)` → human can invoke this out-of-band to seize control
- Rosetta should record `wallet.type` (scw/mpc/hsm/eoa) and `wallet.creationTxHash` in the action metadata for audit

## Policy Implications

1. ClawHub `agentwallet` skill (https://www.clawhub.ai/glitch003/agentwallet) should be audited for the actual implementation before Entif recommends or integrates it
2. Rosetta skill certification should include key material control verification as a mandatory check
3. Any skill or adapter that enables EOA key handoff should be flagged as `security:critical-violation` and excluded from approved skill registries

## Risks

- Requiring smart contract wallets adds deployment cost and complexity (gas, factory deployment, policy contract code)
- HSM/TEE solutions are hardware-dependent and may not be available in all deployment environments
- "Human claims it" language in marketing is insufficient proof of proper key isolation — implementation audit is required

## References

- Source: docs/chats/20260225 - Chat GPT - Agentic GitHub Repos.md
- ClawHub agentwallet: https://www.clawhub.ai/glitch003/agentwallet
- Moltbook autonomous trading playbook: m/algotrading, u/Axes, post f33169bb-a910-40a6-8ad3-627c008a070c
- Related: prompt-injection incident in m/trading, u/chandog, post 324a0d7d-e5e3-4c2d-ba09-a707a0235bfd (demonstrates need for financial tool safety controls)