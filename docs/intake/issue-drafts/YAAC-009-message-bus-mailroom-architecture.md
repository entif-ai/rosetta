# YAAC-009: Message bus Mailroom gatekeeping architecture

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** message-bus, mailroom, quarantine, dlq  
**Depends On:** YAAC-007  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Adopt the Mailroom/DLQ/Quarantine pattern as the gatekeeping architecture for Rosetta's message bus, with header-first validation, security quarantine for suspicious messages, and operator triage for benign failures.

## Architecture Overview

```
Outer Perimeter (Firewall/WAF) → (VPN/WireGuard/Tailscale) → (Rate limits)
                                    ↓
                               MESSAGE BUS (NATS / Redis Streams)
                                    ↓
                         MAILROOM (Ingest Worker)
                         /    |      \    \
            A: header-only B: replay  C: body+sig D: domain/routing
                        \     |      |    /
                         v    v      v   v
                    +--------+  +--------+
                    |   DLQ  |  |QUARANT.|
                    |(benign)|  |(secure)|
                    +--------+  +--------+
                        |          |
                   operator    security agent
                   triage      sandbox analysis
                                |
                    (optional approved release)
                                ↓
                  CANONICAL ROSETTA STORE (tiles/tapestry)
                                    ↓
                         ROUTERS / DISPATCHERS
                              /          \
                         EXEC WORKERS   GUARD LAYER
                         (ZeroClaw,      (iam.decision)
                          NanoBot, etc.)
                              |          |
                              | receipts | decisions + constraints
                              v          v
                    MEMORY STORES (behind wall)
                    GraphRAG / VectorDB / Postgres
                    (writes only from canonical objs)
```

## Mailroom: Header-First Validation

Message arrives → read header first (before processing body):
- **A: header-only inspection:** routing key, sender key, domain, msg_type, schema version
- **B: replay detection:** check replay cache (timestamp + nonce or content hash)
- **C: body_hash + signature:** verify body hash against claimed; verify signature
- **D: domain/routing authorization:** does sender have right to publish to this routing key

Body is opaque until header passes validation.

## Quarantine Triggers (Security Agent Review)

Messages go to Quarantine (isolated store, security-only access) for:
- Signature failure
- Replay detected
- Body hash mismatch
- Domain mismatch / forbidden routing key
- Unknown sender key/node
- Suspicious size/shape anomalies

Quarantine store: isolated, ABAC-restricted (security-only), retention-limited.
Release back: requires explicit approval + new receipt.

## DLQ Triggers (Operator/Dev Triage)

Messages go to DLQ (operator triage) for:
- Schema version mismatch
- Unknown msg_type (if version skew expected)
- Benign schema violations
- Missing optional fields or type coercion failures

## Control Plane Routing

- ACTION_REQUEST → forward to Guard for decision
- ACTION_DECISION → store + notify requester
- approvals → route to approval service

## Key Properties

- Only canonical Rosetta objects feed "real" memory stores
- Control-plane actions require Guard-issued iam.decision references
- Quarantine is not "drop on floor": isolated store + security triage pipeline
- Mailroom decouples transport from validation from routing

## Status

Open.
