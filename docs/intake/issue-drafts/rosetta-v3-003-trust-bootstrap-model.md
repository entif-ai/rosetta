# ROSETTA-v3-003: Trust Bootstrap Model Undefined

**Type:** implementation  
**Priority:** P1  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

Receipts and Policy tiles require cryptographic signatures for authenticity verification, and the spec references genesis keys and attestation chains — but the trust bootstrap model (how a new node establishes trust before any receipts exist, and how genesis keys are initially trusted) is not defined. This is a foundational gap for any multi-node deployment.

## Evidence

From § TileEnvelope:

> **sig**: (Optional) A digital signature over the tile's content (or certain parts). Present for tiles that require integrity and authenticity verification (receipts, policies, important communications). The signature is typically produced by the creator's private key and can be verified by others using the known public key...

From § Policy:

> Policy tiles are signed (the TileEnvelope includes an attestation signature from a trusted key) so that nodes can verify the authenticity of rules.

No definition of how genesis public keys are initially distributed, verified, or rotated.

## Problem

A new node joining the network has no prior identity or attestation. Without a defined bootstrap model:
- Policy tile signatures cannot be verified on first boot
- Receipt signatures from unknown agents cannot be accepted or rejected systematically
- The authority hierarchy cannot be anchored to anything verifiable

## Recommendation

Define a trust bootstrap model:
1. **Genesis block:** Specify a set of bootstrap public keys trusted by default, possibly embedded in the implementation
2. **Trust-on-first-use (TOFU):** Allow new keys to be accepted on first sighting, with a warning/receipt
3. **External PKI:** Optionally integrate with an external PKI for key verification
4. **Key rotation:** Specify how keys are rotated and how deprecated keys are handled

## References

- Core Spine Spec § TileEnvelope (sig, auth)
- Core Spine Spec § Policy
- Cognitive Tiles RFC CT-002 (Swarm Gnosis trust bootstrap problem — related but separate)

## GitHub Issue

(`rosetta-v3-003-trust-bootstrap-model.md` — draft)
