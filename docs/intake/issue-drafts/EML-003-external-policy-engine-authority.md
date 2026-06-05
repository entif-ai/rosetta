# EML-003: External Policy Engine (OPA) as Write Gate Authority

**Type:** architecture
**Labels:** security, policy-engine, OPA, write-gate, authorization
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Finding EML-F005

## Problem

Rosetta's write-admission gate (NOT LAME, TC-005) must have an external authorization layer. The LLM proposes; the policy engine decides. Currently the model is expected to self-govern its own actions, which is insufficient for email-derived or otherwise taint-carried content.

## Evidence

"The core architectural move is separating LLM interpretation from authorization. The LLM can propose what appears to be requested; an external policy engine (e.g., Open Policy Agent / OPA) decides whether it is permitted."

OPA is "explicitly designed as a general-purpose policy engine with declarative policy and deployment patterns for external enforcement points."

Example policy logic from the document:
- If source is unsigned or not allowlisted, deny any state-changing action
- If message originated from email content at all, deny credential changes and secret access
- If requested action involves payment, vendor changes, data export, or forwarding sensitive docs, require out-of-band approval
- If the request is signed by your GPG identity, still require policy checks; only then permit limited actions like "create a draft task"

## Proposed Resolution

Integrate OPA (Open Policy Agent) as the policy decision point (PDP) for Rosetta's write gate:

1. **Policy bundle structure**: Define Rego policies for each action category (read, write, execute, approve). Bundle versioned in Git.

2. **Input contract**: OPA receives structured inputs including taint metadata, source_type, action_type, sender_trust_tier, and capability_scopes.

3. **Output contract**: OPA returns permit/deny/draft/approve-only with required_controls.

4. **Integration point**: OPA is called by the write gate after LLM proposes and before the Apply step in the 9-step state machine.

5. **Escalation path**: Denied actions can be escalated for human approval (maps to draft/approve ladder in EML-001).

## Dependencies

- NOT LAME write-admission gate (TC-005) — OPA integration point is the authorization step
- EML-002 (taint propagation) — taint metadata is the input to policy decisions
- EML-001 (multi-path taxonomy) — policy rules must address all 5 attack paths

## Status

candidate