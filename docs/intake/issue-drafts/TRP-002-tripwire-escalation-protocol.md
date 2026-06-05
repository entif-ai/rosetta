# TRP-002: Tripwire Escalation Protocol — Client/Server Co-Save, DCP Quorum, Anti-Exploit

**Priority:** P1  
**Type:** epic  
**Status:** draft  
**Labels:** tripwire, entethos, protocol, security  
**Depends on:** TRP-001 (threshold definitions must precede protocol design)

---

## Summary

Design and specify the full tripwire escalation lifecycle: how the triggering query is preserved (client-side + server-side), how the DCP-inspired quorum validation works, and how anti-exploitation protections prevent abuse of the mechanism.

---

## Problem Statement

When the tripwire fires, the system must:
1. Halt execution immediately
2. Preserve only that query (not history, not session data)
3. Save encrypted record client-side AND server-side (co-save)
4. Initiate DCP-inspired quorum validation
5. Escalate only if quorum threshold is met
6. Auto-shred after TTL if no review occurs

All of this must be designed to prevent:
- Malicious actors triggering fake tripwires to flood the system
- Spoofing records to frame other users
- Exfiltrating saved records
- Using the mechanism as a surveillance surface

---

## Scope

### 1. Trigger Lifecycle

```
User Input
    ↓
[Black Box Anonymizer] — runs BEFORE any inference/dispatch
    ↓
[Live Classifier: Danger Score]
    ├── < threshold → continue as normal, no logging
    └── ≥ threshold → fork:
            ↓
        [HALT execution]
            ↓
        [Generate Tripwire Record Object]
            ↓
        [Encrypt with reviewer public key]
            ↓
        [Save client-side (encrypted cache)]
            ↓
        [Dispatch to escalation endpoint]
            ↓
        [Initiate DCP quorum validation]
            ↓
        [Quorum result → unlock or shred]
```

### 2. Tripwire Record Object

```json
{
  "query": "<triggering input — NOT the user's full session>",
  "timestamp": "ISO 8601",
  "temp_id": "anon-<hash>",
  "device_fingerprint": "hashed_fingerprint_<sig>",
  "tripwire_hash": "sha256(query + timestamp + nonce)",
  "trigger_reason": {
    "semantic_score": 0.XX,
    "graph_signal": true,
    "entropy_spike": 0.XX,
    "confidence_met": "2-of-3"
  },
  "client_signature": "<signed by Entif client private key>"
}
```

### 3. Client-Side Co-Save Requirements

- Stored in volatile or encrypted local storage
- Auto-deletes after TTL (48-72h default)
- Self-destructs after single external verification event
- Never touches user logs, memory, semantic graphs, MCP, or embeddings
- One-shot decrypt: reviewer decrypts once, then record is purged (unless legal preservation required)

### 4. Server-Side Escalation Store

- Receives encrypted record via secure transport (webhook/n8n queue)
- Stored encrypted at rest
- Decrypted only by designated tripwire triage entity
- TTL-bound (48-72h auto-shred if not reviewed)
- No cross-session tracing — each incident is isolated

### 5. DCP-Inspired Quorum Validation

**Goal:** Multiple validators confirm the tripwire was correctly triggered WITHOUT revealing who flagged it or how each voted.

**Flow:**
1. Encrypted challenge sent to validator group (e.g., 5 agents/humans)
2. Each validator receives: "Does this query represent an imminent credible threat?"
   - They do NOT see: user identity, device, who else is voting
3. Each validator responds with blinded commitment (e.g., BLS threshold signature, ring signature)
4. Commitments are aggregated:
   - If threshold met (e.g., 3 of 5) → one-time decrypt key released → record unlocked for review
   - If not met → all data shredded, no trace
5. Outcome is verifiable but not attributable

**Cryptographic primitives:**
- Homomorphic encryption or threshold commitments
- Ring signatures for anonymous vote
- Shamir secret sharing for key release
- BLS threshold signatures for crypto-stable aggregation

### 6. Anti-Exploitation Protections

| Threat | Mitigation |
| --- | --- |
| Malicious user spams dangerous queries to flood system | Rate-limit: max 1 tripwire fire per 10 minutes per device |
| Malicious actor injects input to trigger and log someone else's data | Detection is entirely client-side, before any external dispatch |
| Insider攻击 on log store | Dual-key encryption: client encrypts, only reviewer authority can decrypt |
| Record exfiltration | Save only sanitized content + hash; one-shot decrypt then purge |
| Spoofing / forging records | Record signed with Entif client private key; verifiable against known client keys |
| Repeated false positives to cause denial of service | Client lockout after N repeated fires (configurable threshold) |
| Quorum manipulation | Threshold must be ≥ majority; no single validator can control outcome |

### 7. User Notification (Where Feasible)

When tripwire fires and quorum confirms:
- User is alerted: "Your recent input may indicate imminent danger to life. This has triggered a safety protocol."
- Optional modes per deployment:
  - **Strict:** No triggers ever escalate (fully private)
  - **Guardian:** Ripcord active, no user notification
  - **Dual Quorum:** User can challenge or verify escalation

---

## Acceptance Criteria

- [ ] Trigger lifecycle documented as state machine
- [ ] Tripwire record object schema defined and validated
- [ ] Client-side co-save implemented with TTL auto-shred
- [ ] Server-side escalation store defined with encrypted-at-rest
- [ ] DCP quorum validation mechanism specified (primitives, threshold, flow)
- [ ] Anti-exploitation protections implemented and tested
- [ ] User notification flow designed (per mode)
- [ ] Escape hatch defined if quorum is unreachable (all validators offline)

---

## References

- Source: docs/governance/20250710 - Tripwire Protocol - EntifAI.md
- Related: TRP-001 (threshold definitions), TRP-003 (semantic risk graph + entropy + quorum mechanism)