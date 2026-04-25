# ROSETTA-v3-005: Delta Capsule Propagation Protocol Incomplete

**Type:** implementation  
**Priority:** P2  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** high  

## Summary

Delta Capsule (rosetta.delta_capsule) is defined as the unit of change propagation across peers, but the protocol for propagating it — discovery, validation, application, and conflict resolution — is unspecified.

## Evidence

From § Delta definition:

> A **Delta Capsule** (tile kind rosetta.delta_capsule) is defined as the unit of change propagation... Delta capsules include metadata about prerequisites and possible migration steps. They are signed and versioned. This allows safe, governed propagation of updates across a swarm...

## Problem

Key questions unanswered:
- **Push vs. pull:** Does a peer broadcast deltas or poll/pull?
- **Prerequisite validation:** What happens if a peer receives a delta but lacks prerequisites?
- **Conflict resolution:** How are competing deltas (same RID, different content) detected and resolved?
- **Delta signing:** Who signs a delta capsule?

## Recommendation

Specify the delta propagation protocol:
1. **Propagation model:** Choose push (gossip) or pull (sync-based)
2. **Prerequisite chain:** Define how prerequisites are encoded and validated before application
3. **Conflict detection:** Define how competing deltas are identified
4. **Resolution strategy:** Define conflict resolution approach

## References

- Core Spine Spec § Delta
- Cognitive Tiles RFC (P2P propagation context)
- OMOC Swarm Gnosis RFC (federation propagation context)

## GitHub Issue

(`rosetta-v3-005-delta-capsule-propagation.md` — draft)
