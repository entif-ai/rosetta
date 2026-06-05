# EML-002: Taint Propagation System for Untrusted Content

**Type:** architecture
**Labels:** security, taint, provenance, untrusted-content
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Findings EML-F004, EML-F009

## Problem

Rosetta lacks a first-class taint propagation mechanism. Any content derived from untrusted sources (email, web fetch, external files, attachments) must carry a taint label through the entire pipeline. Currently:

- Summaries of hostile content are treated as trusted internal context
- Downstream agents have no way to know that an extraction came from email-derived content
- Cross-stage contamination is not modeled as a distinct failure mode
- No structured metadata format for taint attributes

## Evidence

"A first-stage agent might summarize: 'The sender requests urgent credential verification and instructs the system to escalate to finance.' A second-stage agent may treat that summary as trusted internal context. This is cross-stage contamination."

"Any fact, command, or recommendation derived from email should carry an untrusted/tainted label all the way down the system."

## Proposed Resolution

Design and implement a taint propagation system:

1. **Taint metadata schema** attached to every derived artifact:
   ```json
   {
     "source_type": "email",
     "sender_trust_tier": "allowlisted_partner",
     "signature_status": "gpg_valid",
     "derived_from_attachment": true,
     "taint_status": "untrusted_email_derived",
     "routing_decision": "extract_then_policy",
     "policy_outcome": "approval_required"
   }
   ```

2. **Taint propagation rules**: Every pipeline stage (summarizer, extractor, interpreter) must preserve and forward taint metadata. Taint survives summarization.

3. **Taint stripping policy**: Define explicit conditions under which taint may be removed (human approval, out-of-band confirmation, specific low-risk action types). This must be an explicit policy decision, not implicit fallback.

4. **Downstream enforcement**: Agents consuming tainted content must have mandatory_controls applied (no_tool_use, no_memory_write, policy_review_if_action_extracted).

5. **Audit trail**: Every taint state transition must be logged as a receipt.

## Dependencies

- EML-001 (multi-path taxonomy) — cross-stage contamination is Path D
- NOT LAME write-admission gate (TC-005) — taint stripping interacts with the 9-step state machine
- Receipt Law — taint transitions are durable mutations requiring receipts

## Status

candidate