# Issue Draft: EDG-008 — Zero-Trust Node Design: Long-Horizon Infrastructure Requirements

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-008 |
| Type | infrastructure |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md |
| Extraction date | 2026-05-26 |
| Confidence | low |

## Problem

The Entif 2.0 governance doc (Section 5) describes a zero-trust node design with several infrastructure components that do not exist in the current Rosetta/Entif stack and have no near-term implementation path:

1. **TPM/SGX hardware attestation**: TPM or Intel SGX binds secrets to software measurement; node produces attestation quote for remote verification
2. **Signed Docker/VM images**: Node software distributed as signed images verified against Entif release keys
3. **Per-node Ed25519 identity**: Every node has a cryptographic keypair for message signing
4. **Linux namespaces + seccomp/BPF isolation**: Majordomo, Guard, and AI runtime run in separate containers with restricted syscalls
5. **mTLS between nodes**: Mutual TLS for all inter-node communication
6. **Monitoring agent per container**: Internal "mini-Guard" for component-level behavior monitoring

## Current Stack Gap

- No TPM/SGX infrastructure in any current environment
- No signed release image pipeline (Docker images are built and pushed but not cryptographically signed)
- No per-node identity system (nodes are not keyed independently)
- No container-level sandboxing between Majordomo, Guard, and runtime (they run in same process space)
- No mTLS between nodes (current inter-process communication is local)

## Verification Alternatives in Near-Term

The Entif 2.0 doc proposes four node-to-node verification mechanisms. Three are aspirational (ZKP, blockchain consensus, redundant computation), but one is near-term viable:

- **Strict API contracts with schema validation**: Already aligned with Rosetta's rights-scoped retrieval and receipt-law enforcement; can be implemented without TPM, signed images, or mTLS

## Recommended Action

1. **Do not include TPM/SGX attestation or signed image infrastructure in near-term roadmap** — requires separate hardware and release infrastructure projects
2. **Document zero-trust node design as long-horizon Phase 3+ infrastructure requirements**
3. **Near-term node security**: Focus on strict API contracts + schema validation + receipt verification as the verification mechanism
4. **Add to knowledge graph**: "zero-trust-node-tpm-sgx" as aspirational infrastructure concept, not current implementation
5. **EDG-004 (ZKP timing conflict)** already defers ZKP — this is consistent with not pursuing hardware attestation in near-term

## Labels

zero-trust, tpm, sgx, signed-images, infrastructure, future-work, aspirational, node-design

## Depends On

(None — aspirational, no near-term dependencies)

## Related Issues

- EDG-004 (ZKP timing — defers ZKP, consistent with deferring hardware attestation)
- EDG-007 (HSM multisig — both are aspirational long-horizon infrastructure, can be tracked together)
- EDG-003 (Guard Layer alignment — node internal isolation is a future Guard Layer concern, not current)