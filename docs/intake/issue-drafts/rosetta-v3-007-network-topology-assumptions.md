# ROSETTA-v3-007: Network Topology Assumptions Undeclared

**Type:** architecture  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

The spec explicitly avoids prescribing network topology and supports both single-node and p2p federated deployments equally. However, it never declares which topology is assumed as the near-term default for implementation.

## Evidence

From § Non-Goals: "Monolithic or Centralized Implementation":

> It is designed to work in decentralized or federated environments (p2p swarms) just as well as in a single-node context.

No subsequent section declares a default or near-term target topology.

## Problem

Architectural decisions for storage, peer discovery, tile routing, consensus, and latency all differ dramatically between single-node and multi-node deployments. Without a declared default:
- Implementers may make incompatible assumptions
- The NOT LAME PRD's architecture (PostgreSQL canonical registry) assumes single-node or tightly coupled deployment
- Swarm Gnosis/Cognitive Tiles RFC's P2P model may conflict with the NOT LAME deployment model

## Recommendation

Add an explicit declaration in the spec:
1. **Declare a default topology** for the reference implementation
2. **Separate core from deployment-specific concerns**
3. **Document deployment profiles:** Single-node vs. Federated profile

## References

- Core Spine Spec § Non-Goals
- NOT LAME PRD (PostgreSQL canonical registry assumption)
- Cognitive Tiles RFC CT-001 (network layer gap)

## GitHub Issue

(`rosetta-v3-007-network-topology-assumptions.md` — draft)
