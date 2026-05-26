# TRIP-001: Tripwire Protocol v0.1 — Spec and API for Local Threat Detection + Encrypted Escalation Envelope

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, protocol, privacy-first, escalation

## Problem Statement

Entif AI and applications built on it (VieDay, etc.) need a mechanism to:
1. Detect imminent, catastrophic harm (violence, self-harm, major fraud) in real-time
2. React immediately without enabling ongoing surveillance
3. Escalate to human or AI reviewers only when quorum threshold is met
4. Preserve exactly one encrypted record on escalation, auto-shred otherwise

No existing solution provides this combination of live detection + privacy-preserving threshold escalation. This is the foundational spec for the Tripwire Protocol.

## Proposed Solution

### 1. Local Threat Detection (Pre-Dispatch)

A lightweight, local classifier runs **before** any inference, external call, memory write, or logging. Evaluates input for:
- Semantic risk score (intent to harm, target specificity, means, timeframe)
- Entropy deviation score (sudden use of tactical/violent/obscure language vs. baseline user behavior)

Both scores must cross threshold to fire tripwire.

### 2. Escalation Envelope Construction

On tripwire fire, client constructs encrypted JSON payload:
```json
{
  "query": "<dangerous prompt>",
  "timestamp": "<UTC ISO8601>",
  "temp_id": "<anonymized device fingerprint>",
  "tripwire_hash": "<SHA256 of query + timestamp>",
  "key_fingerprint": "<public key of quorum reviewer>"
}
```

This payload:
- Is encrypted with public key of quorum/escalation handler
- Stored only locally unless quorum approves unlock
- Tagged with TTL (e.g., expires in 72h or after 1 access)

### 3. User-Tunable Safety Profiles

- **Strict mode** (default): no triggers ever escalate — totally private
- **Guardian mode**: ripcord active; user-defined guardian/therapist in quorum
- **Dual quorum mode**: user notified if escalation occurs and can challenge/verify

### 4. Rate Limiting and Anti-Abuse

- Max 1 tripwire event per device per 10 minutes
- All envelopes signed by client's ephemeral key (prevents spoofing)
- No session linking; each event unique and untraceable beyond its context
- One-time decrypt access; record purged after read unless legally preserved

## Implementation Notes

- **Location**: `src/ethics/tripwire/` in Entif core
- **Classifier options**: DistilBERT fine-tuned for danger/risk, or self-hosted open-weight model
- **Entropy baseline**: Per-user rolling behavioral profile; deviations flagged as high-entropy
- **Encryption**: Standard public-key encryption (RSA-OAEP or ECIES); envelope tied to quorum public key
- **No external calls until tripwire clears**: None — detection is fully local

## Acceptance Criteria

1. Local classifier runs before ANY memory write, inference call, or external dispatch
2. Tripwire fires on combined semantic risk + entropy threshold only
3. Escalation envelope is encrypted at creation; only quorum-approved unlock decrypts
4. Rate limiting: max 1 fire per 10 min per device fingerprint
5. Every normal query is untouched, unobserved, transient — zero logging
6. User can configure Strict/Guardian/Dual quorum mode
7. Unit tests cover: fire/no-fire logic, envelope construction, TTL expiry, rate limiting

## Dependencies

- None — this is foundational new work

## Open Questions

- Which encryption standard (RSA-OAEP vs. ECIES vs. post-quantum alternative)?
- What is the minimum feature set for v0.1 MVP (classifier complexity vs. speed)?
- Should TTL be configurable per deployment context?
