# ROSETTA-v3-009: Profile Negotiation Protocol Not Specified

**Type:** implementation  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

The spec defines four conformance profiles and mentions that nodes may declare their profile via a DocID or handshake, but does not specify the protocol for profile negotiation — how nodes discover each other's profile or agree on interoperable exchanges.

## Evidence

From § Profiles Definition:

> **Profile negotiation:** In a network, nodes might declare their profile via a DocID perhaps or a handshake. E.g., one node knows that another is Light so it will send it pre-digested context because it might not derive it itself.

The phrase "might declare" and "perhaps" indicates no normative protocol is defined.

## Problem

Without a profile negotiation protocol:
- A Full node has no standard way to discover the peer is Light
- An Auditor node cannot automatically adjust its ingestion strategy
- Profile mismatches may cause silent failures
- No standard handshake message format exists

## Recommendation

Specify profile negotiation:
1. **Handshake message:** Define a standard capability announcement message
2. **Capability registry:** Define which capabilities map to which profile
3. **Fallback behavior:** Define what a Full node should do when communicating with an unknown-profile peer
4. **Version negotiation:** Add version compatibility check

## References

- Core Spine Spec § Profiles Definition
- Core Spine Spec § Non-Goals (network topology)

## GitHub Issue

(`rosetta-v3-009-profile-negotiation-protocol.md` — draft)
