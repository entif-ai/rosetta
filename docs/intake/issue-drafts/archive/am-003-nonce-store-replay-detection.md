# AM-003: Nonce Store Specification for Distributed Replay Protection

## Status

draft — `docs/intake/issue-drafts/am-003-nonce-store-replay-detection.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md`
- **Section:** Section 5.1, Section 5.2
- **Confidence:** high

## Problem

The signed envelope requires a `nonce` field that is "unique per sender" and is used for replay detection (Section 5.1). The validation step requires "verify nonce not seen before for sender" (Section 5.2). However, the spec provides no specification for the nonce store itself:

- **Storage backend:** Redis? PostgreSQL? In-memory? File-based?
- **Scope:** Is nonce uniqueness enforced per sender, per domain, or globally?
- **TTL / window:** How long must a nonce be retained? (`expires_at` covers message expiry but the nonce must survive at least until `expires_at` passes)
- **Consistency model:** In a multi-node deployment, if Node A accepts a nonce, Node B must also reject it — requires distributed consensus or a shared store
- **Write path:** Who writes confirmed nonces? The mailroom? The Guard? The sender?
- **Eviction:** How are old nonces purged to prevent unbounded storage growth?

This is a critical security primitive. Without it, replay attacks are theoretically possible.

## Evidence

> "nonce (unique per sender; replay detection)" — Section 5.1 (no store specification)

> "Verify nonce not seen before for sender (replay protection)" — Section 5.2 Step 3 (no store interface)

> Threat model: "Message interception, replay, and injection attempts will occur" — Section 2.2

## Required Deliverables

1. Nonce store interface: `nonce_store.add(sender, nonce, expires_at)` and `nonce_store.check(sender, nonce)` — returns bool
2. Backend recommendation: Redis (low latency, TTL support) or PostgreSQL (consistency, durability)
3. Scope definition: `(sender.node_id, nonce)` — uniqueness scoped to sender node
4. TTL policy: retain nonce until `max(expires_at)` + grace period (e.g., 24h buffer)
5. Eviction strategy: TTL-based automatic expiry; no manual deletion needed
6. Distributed consistency: if multi-node, use Redis Cluster or PostgreSQL with synchronous replication — or document single-node assumption
7. Monitoring: emit `replay_hits` metric when nonce check returns "already seen"

## Acceptance Criteria

- [ ] Nonce store interface defined and documented
- [ ] Implementation handles concurrent requests without race conditions
- [ ] Multi-node consistency model specified
- [ ] TTL policy aligns with `expires_at` semantics
- [ ] Replay attack with a captured message is blocked
- [ ] Section 10 `replay_hits` telemetry is instrumented

## Dependencies

- None (standalone infrastructure concern)

## Labels

`agentic-messaging`, `security`, `distributed`

## References

- Source: `docs/RFCs/20260228 - Entif v0 - Spec Proposal - Agentic Messaging.md` Section 2.2, 5.1, 5.2, 10
- Related: AM-001 (envelope schema)
