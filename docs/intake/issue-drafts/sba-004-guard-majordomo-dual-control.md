# SBA-004: Guard vs Majordomo dual-control — Capability Envelope schema and veto protocol

## Status

draft — `docs/intake/issue-drafts/sba-004-guard-majordomo-dual-control.md`

## Metadata

- **Type:** implementation
- **Priority:** P1
- **Source doc:** `docs/backlog/Entif v0 Second Brain Architecture Plan.md`
- **Section:** Phase 5 (Separation of Powers: Guard vs Majordomo)
- **Confidence:** high

## Problem

The Guard vs Majordomo dual-control pattern is architecturally compelling but entirely unimplemented. The document describes:

- **Majordomo:** Generative agent that creates plans, writes code, synthesizes content. **Structurally and cryptographically denied direct I/O execution authority**
- **Guard:** Read-only observer/enforcer. Cannot generate ideas or plans. Compares submitted Capability Envelopes against rosetta.policy constraints. Vetoes unauthorized actions
- **Capability Envelope:** JSON-formatted package containing proposed actions with "strict JSON schemas and authentication tokens"

The following are entirely undescribed:

1. **Capability Envelope JSON Schema:** What are the required fields? Action type? Resource targets? Permission scope? Expiry? Signature/attestation format?
2. **Guard veto protocol:** Sync or async? Blocking or non-blocking? What does a veto return (error code? exception? human notification)? Can a veto be appealed?
3. **Cryptographic denial mechanism:** How is the Majordomo "cryptographically denied" I/O? Is this enforced by the OS kernel (SELinux/AppArmor policy)? WASM capability revocation? Something else?
4. **Communication channel:** How do Capability Envelopes travel from Majordomo to Guard? IPC? gRPC? HTTP? Message queue?
5. **Relationship to Agentic Messaging GuardLayer:** The `am-005` issue draft covers a different Guard named entity (GuardLayer in the Agentic Messaging system that issues `iam.decision` refs for inter-agent control plane messages). This Guard enforces rosetta.policy on Majordomo capability envelopes. Both named "Guard" with different enforcement domains. No relationship is defined.

## Evidence

> "The primary orchestration agent (internally nicknamed the 'Majordomo') is granted the cognitive freedom to generate complex plans, write software code, and synthesize creative data. However, the Majordomo is structurally and cryptographically denied direct Input/Output (I/O) execution authority for any sensitive operations" — Phase 5

> "When the Majordomo wishes to act, all proposed actions are packaged into a 'Capability Envelope' containing strict JSON schemas and authentication tokens. This envelope is submitted to a secondary process known as the 'Guard'" — Phase 5

> "The Guard is a highly restricted, read-only entity; it cannot generate ideas or new plans. It functions solely as an observer and enforcer, comparing the Capability Envelope against the immutable rosetta.policy constraints established in the Genesis document. If the action violates user privacy, attempts to access unauthorized directories, or tries to execute unapproved system commands, the Guard vetoes and blocks the action" — Phase 5

## Required Deliverables

1. **Capability Envelope JSON Schema:** Define the complete schema including: envelope ID, timestamp, Majordomo instance ID, proposed actions list (action type, target resource, parameters, permission scope, TTL), authentication tokens (JWT? signed blob?), envelope signature
2. **Guard API:** Define Guard service interface: `POST /guard/evaluate` (submit envelope) → returns `APPROVED` or `VETOED(reason_code, human_notification_required)`; define reason codes taxonomy
3. **Cryptographic denial mechanism design:** Select enforcement layer (recommend: AppArmor profile for Majordomo process denying all I/O syscalls except IPC to Guard; or ZeroClaw WASM capability revocation as fallback); document how this is bypassed for non-sensitive operations
4. **IPC/channel design:** Define how Capability Envelopes are transmitted (recommend: Unix domain socket with mTLS; avoid HTTP to prevent accidental external exposure)
5. **Architectural reconciliation with Agentic Messaging GuardLayer:** Produce ADR defining the two-Guard model: GuardLayer (inter-agent control plane, `iam.decision` refs) vs Guard (Majordomo execution enforcement, rosetta.policy compliance). Define if they share code, share policies, or are entirely separate components

## Dependencies

- SBA-003 (Rosetta 2.0 Protocol) — Guard depends on rosetta.policy schema being defined
- am-005 (Guard Decision API) — coordinate schema design to avoid overlap

## Labels

`guard`, `majordomo`, `capability-envelope`, `security`, `dual-control`, `capability-security`, `apparmor`, `wasm`

## Notes

This pattern is architecturally novel and high-value. If implemented correctly, it provides a strong defense against rouge-agent scenarios. If implemented incorrectly, it creates a false sense of security. Prototype in isolation before integrating with production agent workloads.
