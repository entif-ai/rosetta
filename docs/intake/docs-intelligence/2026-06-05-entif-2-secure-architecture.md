# 2026-06-05 — Entif 2.0 Secure Architecture Companion Paper

## Metadata
- **Source:** docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md
- **Extracted:** 2026-06-05
- **Confidence:** high
- **Authority tier:** governance — strategic / architectural

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ChatGPT dialogue (2025-10-26) providing a detailed technical companion to Entif 2.0 Comprehensive Action Plans. Covers five areas: (1) Guard Layer as real-time policy enforcement for Majordomo, (2) self-monitoring threat intelligence with LLM-augmented CVE triage, (3) Genesis Protocol with multi-sig HSM protection as immutable root of trust, (4) blockchain-based decentralization with tokenomics and anti-capture design, (5) zero-trust node packaging for local autonomy with cryptographic attestation.

## Findings

### [F1] Guard Layer as policy enforcement point for all Majordomo operations
**Confidence:** high
**Reference:** Section 1 — Guard Layer and Real-Time Governance System
**Content:** The Guard Layer intermediates ALL operations initiated by Majordomo or any agentic sub-process. Acts as a PEP (Policy Enforcement Point). Policy engine uses OPA/Rego with allowlist/denylist. Higher privilege than agents it oversees. Sandboxed execution (Firecracker, gVisor) for high-risk ops. Anomaly detection with execution halt. Active red-teaming embedded in the Guard. Immutable audit log chained like blockchain.

### [F2] LLM-augmented threat intelligence pipeline with automated response
**Confidence:** high
**Reference:** Section 2 — Self-Monitoring and Real-Time Threat Detection
**Content:** Threat Monitor service polls NVD CVE feeds, vendor advisories, CISA KEV, EPSS. LLM analysis pipeline uses RAG over SBOM to classify CVE applicability and severity. Four automated response paths: hot-patching CI/CD trigger, feature kill-switch via Guard, behavioral filter updates, full halt and isolation. Maintains SBOM (Software Bill of Materials) for cross-reference.

### [F3] Genesis Protocol as immutable root of trust with 5-of-7 multisig
**Confidence:** high
**Reference:** Section 3 — Genesis Protocol & Immutable Authority Hierarchy
**Content:** Genesis keypair is root of trust. Public hard-coded in all nodes. Private protected via 5-of-7 multisig among trusted human overseers. Air-gapped HSM devices used for key ceremonies (like ICANN DNSSEC). Update chain uses sequential numbering with previous state hash (chain of trust). Emergency Override mechanism: signed "PAUSE_ALL" broadcast, verified at low level (kernel extension or Guard check at top of Majordomo planning loop). Human governance remains at top of hierarchy.

### [F4] Blockchain-based audit trail and distributed consensus
**Confidence:** high
**Reference:** Section 4 — Decentralization, Node Incentivization, and Anti-Capture Design
**Content:** Permissioned (or public) blockchain ledger for immutable append-only audit. All Guard log entries also hashed on-chain. Validator nodes use PoS consensus. All on-chain activities transparent. Includes tokenomics: staking, rewards, slashing for misbehavior. Node reputation stored on-chain.

### [F5] Anti-capture design with multiple layers
**Confidence:** high
**Reference:** Section 4 — Decentralization, Node Incentivization, and Anti-Capture Design
**Content:** Anti-capture mechanisms: decentralized token distribution, stake/identity limits (capped voting power per identity), trusted setup ceremonies (multi-party computation for ZKP params), governance constraints (safety protocols cannot be disabled without unanimous multisig + long timelock), diverse global validator set, ZKP for privacy-preserving validation, community forkability as final backstop.

### [F6] Zero-trust node design with TPM/SGX attestation
**Confidence:** high
**Reference:** Section 5 — Zero-Trust Node Design and Local Autonomy
**Content:** Node installation as signed hardened bundle (Docker/VM). Own Ed25519 keypair identity. Internal compartmentalization via Linux namespaces, seccomp/BPF filters. TPM or SGX binds secrets to software measurement — attestation quote verifiable by other nodes. Zero-trust inter-node validation: consensus verification, redundant computation spot-checks, ZKP of computation, strict API contracts with signature authentication. Continuous cross-audit. No central server; node ejection on misbehavior.

### [F7] Guard Layer red-teaming operates invisibly to Majordomo
**Confidence:** high
**Reference:** Section 1 — Guard Layer, subsection "Active Red-Teaming & Fuzz Testing"
**Content:** Red-team module injects test scenarios invisibly — agent cannot distinguish test inputs from real. Simulates prompt injection, fuzzes tool APIs, simulates malicious plugin. Failures logged as vulnerabilities. Aligns with NIST AI risk management guidance for ongoing penetration testing of AI decision loop.

### [F8] Entif 2.0 references EntEthos tripwire from earlier doc (2025-07-10)
**Confidence:** high
**Reference:** Section 1 — text mentions threat-intel and automated tripwires; Section 4 — mentions cryptographic separation of duties; Section 5 — mentions ZKP for privacy-preserving validation
**Content:** The document cross-references the Tripwire Protocol ( EntEthos zero-trust classifier that fires only on imminent catastrophic harm) as a component being integrated into the Guard Layer's threat-intel framework. DCP-inspired quorum and semantic risk graph concepts appear as design precedents.

### [F9] Blockchain type not specified — "permissioned or public" left ambiguous
**Confidence:** medium
**Reference:** Section 4 — Decentralization
**Content:** The document states "We may implement a custom Entif blockchain or use an existing platform (like an Ethereum sidechain or Cosmos/Tendermint chain)". This leaves the chain type undefined — a critical architectural decision unresolved.

### [F10] Hot-patching automated response assumes CI/CD exists
**Confidence:** high
**Reference:** Section 2 — Automated Threat Response Workflow
**Content:** The hot-patching workflow requires an existing automated CI/CD pipeline to trigger patch releases. No details on what system handles this (ArgoCD, Jenkins, custom) or how the Guard communicates with it. The SBOM cross-reference also assumes SBOM is continuously maintained — no process defined for keeping SBOM updated as dependencies change.

### [F11] Emergency halt check at top of Majordomo planning loop — race condition risk
**Confidence:** medium
**Reference:** Section 3 — Emergency Override
**Content:** The emergency halt is checked "at the top of each planning loop iteration" — this means if the agent is mid-operation when the signal arrives, it only halts after current iteration completes. No interrupt-style mechanism described. Could allow one more action before halt.

### [F12] ZKP for computation verification — no implementation pathway described
**Confidence:** medium
**Reference:** Section 4 — Use of Zero-Knowledge Proofs; Section 5 — ZKP of computation
**Content:** The document calls for ZKP of computation (proving correct AI model execution) but provides no circuit definition, trusted setup timeline, or proof generation/verification cost analysis. No mention of which ZKP system (zk-SNARK, zk-STARK, PLONK, etc.).

### [F13] Node incentivization via tokenomics — token design completely absent
**Confidence:** high
**Reference:** Section 4 — Node Incentivization via Tokenomics
**Content:** The document references a "native utility token" for staking and rewards but does not define token supply, distribution, inflation schedule, or fee mechanisms. Without this, the economic security model is incomplete.

### [F14] Guard Layer implementation notes are high-level only
**Confidence:** medium
**Reference:** Section 1 — Implementation Notes
**Content:** Guard Layer implementation described as "embedded security daemon + instrumentation hooks" but no actual code structure, IPC protocol, or Guard-to-Majordomo API contract specified. The example of "function wrapper when opening a file" implies code-level instrumentation — no guidance on how this integrates with actual Majordomo codebase.

### [F15] Local node update mechanism assumes voluntary compliance
**Confidence:** medium
**Reference:** Section 5 — Autonomy and Updates
**Content:** Nodes that fall out-of-date "may start to be distrusted" but no enforcement mechanism for critical security patches. A node running a vulnerable version could continue participating in non-sensitive tasks, potentially exposing the network to lateral risk.

### [F16] Trusted setup ceremony for ZKP params — no participants identified
**Confidence:** low
**Reference:** Section 4 — Trusted Setup Ceremonies
**Content:** States trusted setup will involve "many independent people" but no process for selecting participants, no timeline, no contingency if participants become unavailable. Describes it as "similar to Zcash" but Zcash's ceremony had specific known participants.

### [F17] No discussion of how Guard Layer updates are themselves governed
**Confidence:** medium
**Reference:** Section 3 — Genesis Protocol
**Content:** The Genesis Protocol governs updates to core code and policies, but the Guard Layer policies (the allowlist/denylist rules) are likely updated more frequently. No mechanism described for how Guard policy updates are authorized, versioned, and rolled out without genesis-level multisig each time.

### [F18] Entif 2.0 references earlier PRD documents as architectural foundation
**Confidence:** high
**Reference:** Abstract and throughout
**Content:** Document explicitly references "Entif 2.0 Comprehensive Action Plans" as the primary document this companions. Section 4 references "Structural Non-Capturability" design from an earlier version. Implies this doc is an architectural delta applied on top of existing Entif 2.0 documentation, not standalone.

## Issue Candidates

### [SEC-001] Blockchain platform decision is unresolved
**Priority:** P1
**Description:** The document explicitly leaves blockchain type as "custom vs Ethereum sidechain vs Cosmos/Tendermint" undefined. This is a foundational architectural decision that gates all other design (consensus algorithm, tokenomics, governance smart contracts). No criteria given for making this choice.

### [SEC-002] Guard Layer implementation lacks code-level integration plan
**Priority:** P1
**Description:** Implementation notes describe Guard as "embedded security daemon + hooks" but no IPC protocol, no API contract with Majordomo, no code examples. The description implies code modification to Majordomo ("function wrapper when opening a file") — no guidance on which files/functions need wrapping. Blocks implementation estimate.

### [SEC-003] Tokenomics design completely absent
**Priority:** P1
**Description:** PoS security model, node incentivization, and slashing all depend on a defined token. The document explicitly says "native utility token" without supply, distribution, inflation, or fee model. Anti-capture design (stake-weighted voting, identity limits) cannot be evaluated without token design.

### [SEC-004] ZKP computation verification has no implementation pathway
**Priority:** P2
**Description:** ZKP of AI model execution cited as a key mechanism for zero-trust node validation (Section 4 and Section 5) but no proof system specified (zk-SNARK/STARK/PLONK), no circuit defined, no cost analysis, no trusted setup plan. Blocks trust model formalization.

### [SEC-005] Guard policy update lifecycle not governed
**Priority:** P2
**Description:** Guard Layer policies (allowlist/denylist, anomaly thresholds) need frequent updates as new threat patterns emerge. No mechanism described for authorizing and rolling out Guard policy updates without requiring genesis-level multisig each time. Risk of policy update becoming a bottleneck or being neglected.

### [SEC-006] Emergency halt has no defined delivery channels or latency target
**Priority:** P2
**Description:** Emergency override described as "signed broadcast via on-chain message or local network broadcast" — but multi-channel delivery strategy not specified. No latency target for halt propagation. No specification of what happens if network partition occurs during emergency.

### [SEC-007] SBOM maintenance process undefined
**Priority:** P2
**Description:** The LLM-augmented threat analysis pipeline depends on a current SBOM for cross-referencing CVEs against Entif components. No process described for keeping SBOM updated as dependencies change. Without current SBOM, CVE triage produces false negatives.

### [SEC-008] Trusted setup ceremony has no defined participants or timeline
**Priority:** P3
**Description:** Section 4 references trusted setup for ZKP parameters as a mitigation against single-party backdoor but gives no participants, no process for selection, no timeline. Cannot be executed as described.

### [SEC-009] Air-gapped HSM key ceremonies require physical co-location — no remote alternative described
**Priority:** P3
**Description:** Section 3 describes key ceremonies requiring physical HSM devices. For globally distributed key-holders, this creates operational bottleneck and single point of failure (physical security of ceremony). No description of whether a remote HSM / MPC threshold scheme could substitute for physical co-location.

### [SEC-010] Node software attestation creates boot lock-in — no revocation grace period defined
**Priority:** P3
**Description:** Section 5 describes TPM/SGX binding that refuses to release secrets if code hash doesn't match expected value. This creates a hard boot lock-in if a node needs to temporarily run modified code (e.g., emergency patch before official release). No grace period or override mechanism defined for legitimate code changes.