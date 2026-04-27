# EML-003: Nine-Layer Email-to-Agent Defensive Architecture Fully Specified

**Status:** issue-candidate
**Priority:** HIGH
**Type:** architecture/security
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F003

---

## Problem Statement

A complete, concrete reference architecture for a secure email-to-agent pipeline is fully specified in the source document. It should be adopted as a design reference for Entif/Rosetta email ingestion security.

## Architecture Layers

| Layer | Component | Function |
|-------|-----------|----------|
| 1 | Postfix + Rspamd + OpenDKIM/OpenDMARC + GnuPG | Mail ingress, provenance gate, sender allowlisting, optional GPG for narrow privileged-command lane |
| 2 | Dual representation (pristine + normalized) | Store original for audit; normalize for analysis; use Apache Tika, ClamAV, MIME parser + HTML sanitizer |
| 3 | Multi-signal classification | Provenance score + content score + instruction-likeness score + sensitivity score + attachment/link score |
| 4 | Taint propagation | All email-derived content carries "untrusted/tainted" label throughout pipeline |
| 5 | Sandboxed LLM extraction | gVisor or Firecracker; read-only; schema-constrained JSON output; no tools, no memory writes |
| 6 | External policy engine (OPA) | LLM proposes; OPA decides; policy versioned in Git |
| 7 | Draft/Approve/Execute ladder | Level 0–4 from summarize-only to narrow executor; no direct privileged execution |
| 8 | Disable default attachment/URL fetching | Malware scan first, MIME/type detect, isolated detonation, never let attachment text join prompt memory |
| 9 | Audit and rollback | Full decision logging with provenance facts, classifier outputs, policy inputs/results, approvals, execution results |

## Policy Rule Examples

```
RULE 1: Any email-derived request for credential/token/secret changes denied for autonomous execution.
RULE 2: Any email-derived request for bulk data export or external forwarding requires out-of-band approval.
RULE 3: GPG-valid command from owner identity may create drafts/summaries but not bypass sensitive-action policy.
RULE 4: Any attachment-derived instruction is tainted and may not directly trigger tool use.
RULE 5: Any message with high instruction likelihood plus high anomaly score quarantined.
RULE 6: Any message with low anomaly but high sensitivity escalated, not executed.
```

## Recommended Action

- Adopt nine-layer architecture as design reference for Entif/Rosetta email ingestion security
- Implement OPA-based policy engine as the authoritative gatekeeper (not LLM)
- Ensure taint propagation is enforced at every stage
- Block direct privileged execution from email-derived content at all trust levels

## Notes

The document explicitly states: "The key architectural move: the LLM can propose; OPA decides."
