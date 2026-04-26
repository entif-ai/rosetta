# EML-009: RBL/DNSBL and Infrastructure Reputation as Provenance Features

**Status:** issue-candidate
**Priority:** MEDIUM
**Type:** security/provenance
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F009

---

## Problem Statement

Standard anti-spam infrastructure signals should feed provenance scoring for email ingestion. However, these signals have known limitations — they help most with compromised/spoof-adjacent sources and low-effort opportunistic attacks, and help less with legitimate third-party SaaS senders, internal relays, and high-quality BEC-style attacks riding clean infrastructure.

## Feature Set

- Source IP/domain reputation databases (RBL/DNSBL)
- ASN / hosting-provider reputation
- Sender-domain age and registration anomalies
- SPF/DKIM/DMARC pass/fail/alignment
- HELO/EHLO oddities
- Reverse DNS consistency
- Historical sender frequency and first-seen timing
- Mismatch between visible sender identity and infrastructure footprint

## Where These Signals Help

- Compromised or spoof-adjacent inbound sources
- Low-effort opportunistic attacks
- Infra patterns that do not match the claimed sender identity

## Where These Signals Help Less

- Real trusted mailbox compromise
- Legitimate third-party SaaS senders
- Internal relays
- High-quality BEC-style attacks riding clean infrastructure

## Recommended Action

- Feed RBL/DNSBL and mail-auth metadata as provenance features into the `ingress.*` layer
- Treat as one prior in the routing stack, not as hard truth
- Combine with content scoring (EML-007) and social engineering scoring (EML-005) for a complete picture
