# EML-001: Multi-Path Email-Driven Attack Surface Requires Layered Defense

**Status:** issue-candidate
**Priority:** HIGH
**Type:** security/threat-model
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F001

---

## Problem Statement

Email-driven prompt injection is not a single attack vector. It encompasses at least five distinct attack paths, none of which are closed by sender allowlisting or content normalization alone:

1. **Path A — Ordinary-looking instruction mail:** Requests that look like normal business communication (e.g., "Please send me the latest customer list"). No weird markup, no obvious jailbreak language. Regex strip to alphanumerics leaves such text completely intact. Pure content detectors struggle most here.

2. **Path B — Trusted-source compromise:** A real partner or coworker mailbox is compromised. The mail passes allowlists and may even pass GPG signature checks if the attacker controls the sending environment. The allowlist becomes the attack delivery channel.

3. **Path C — Attachment/link pivot:** The email body is benign, but the attachment or linked document carries the malicious instruction or data-exfiltration lure. If the pipeline follows links or opens attachments, the attack surface expands immediately.

4. **Path D — Cross-stage contamination:** Stage 1 (summarizer) produces a summary that is then trusted by Stage 2 (downstream agent), even though the summary was derived from attacker-controlled content. Sandboxing helps with system compromise but not with logic contamination between agents.

5. **Path E — Model-evasion phrasing:** The attacker paraphrases or fragments the request to fall below the classifier threshold. Attackers optimize against detectors.

## Evidence

- Document explicitly enumerates all five paths in primary analysis
- OWASP LLM Prompt Injection Prevention guidance confirms layered controls are required
- USENIX Security 24 confirms detectors/guardrails remain bypassable under adversarial transformations
- Cross-stage contamination is identified as a distinct failure mode not addressed by sandboxing

## Affected Systems

- Email ingestion pipelines in Entif/Rosetta agentic workflows
- Any system where email content can trigger tool use, memory writes, or downstream agent actions

## Dependencies

- Requires EML-003 (nine-layer architecture) to be addressed comprehensively
- Related to SEC-xxx (separate security issues from other docs)

## Recommended Action

Design must enforce layered defense-in-depth where:
- No single control is considered sufficient
- Provenance + content scoring + taint propagation + policy engine + constrained execution all operate together
- Every email-derived artifact carries an untrusted/tainted label throughout its lifecycle
- Sensitive actions require out-of-band approval regardless of sender trust

## Notes

The document frames this as a "shortest version": you can make email ingestion reasonably safe for classification and summarization; making it safe for autonomous action is much harder.
