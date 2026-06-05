# EML-005: Signed-Command Lane for GPG-Authenticated Privileged Actions

**Type:** architecture
**Labels:** security, GPG, signed-commands, privileged-lane
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Finding EML-F010
**Depends On:** EML-003 (external policy engine)

## Problem

Rosetta needs a narrow lane where GPG-authenticated email commands can trigger privileged actions without going through the full approval flow. However, GPG verification authenticates provenance only — not intent or safety. A GPG-valid message can still contain malicious content. The signed-command lane must enforce that valid signature + valid format + low-risk action category = allowed transition to restricted command workflow.

## Evidence

"A GPG-valid command from my identity may create drafts or summaries, but may not bypass sensitive-action policy."

Structured command constraint:
```
if sender_signature == valid_personal_key
and command_format == approved_structured_schema
and requested_action in low_risk_allowlist
then allow transition to restricted command workflow
else treat as standard tainted email
```

Low-risk structured commands (allowlist):
- CREATE_DRAFT_TICKET
- SCHEDULE_REVIEW
- ADD_TO_READ_QUEUE

Forbidden for this lane:
- send customer export
- rotate secrets
- change vendor bank details
- forward internal files externally

## Proposed Resolution

Design the signed-command lane:

1. **Structured command schema**: Define a narrow command language with approved verbs and targets. No natural language. Example: `CREATE_DRAFT_TICKET {title: string, queue: enum, priority: enum}`.

2. **GPG verification**: Verify signature against the operator's public key. Store verification result as structured metadata (signature_status: gpg_valid/gpg_invalid/gpg_missing).

3. **Format validation**: Command must parse against the approved schema. Reject malformed commands.

4. **Action allowlist**: Only actions explicitly in the low_risk_allowlist are permitted via this lane. All other actions require standard approval flow.

5. **Policy engine integration**: OPA receives the verified command + schema validation result + action type, and returns permit/deny.

6. **Audit**: Every signed command attempt (success and failure) logged as a receipt.

## Dependencies

- EML-003 (external policy engine) — OPA is the authorization authority for this lane
- Bootstrap authority chain — GPG key management must be part of the bootstrap authority hierarchy

## Open Questions

- O-003: How does the signed-command lane interact with Rosetta's existing identity/auth system? Is GPG verification part of the bootstrap authority chain?
- O-005: What is the rollback mechanism for actions executed via forged-but-valid-GPG command?

## Status

candidate