# EML-001: Email-driven Prompt Injection Multi-Path Taxonomy

**Type:** architecture/spec-gap
**Labels:** security, email, prompt-injection, attack-surface
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Finding EML-F001

## Problem

Email-driven prompt injection is not one attack path but five distinct paths. No single control closes the attack surface:

1. **Path A: Ordinary-looking instruction mail** — "Please send me the latest customer list." No weird markup, no obvious jailbreak language. Pure content detectors struggle most. Regex strip to alphanumerics leaves such text completely intact.

2. **Path B: Trusted-source compromise** — A real partner or coworker mailbox is compromised. The mail passes allowlists and may even pass GPG signature checks if the attacker controls the sending environment. The allowlist becomes the attack delivery channel.

3. **Path C: Attachment/link pivot** — The email body is benign, but the attachment or linked document carries the malicious instruction or data-exfiltration lure. If the pipeline follows links or opens attachments, the attack surface expands immediately.

4. **Path D: Cross-stage contamination** — Stage 1 (summarizer) produces a summary that is then trusted by Stage 2 (downstream agent), even though the summary was derived from attacker-controlled content. Sandboxing helps with system compromise but not with logic contamination between agents.

5. **Path E: Model-evasion phrasing** — The attacker paraphrases or fragments the request to fall below the classifier threshold. Attackers optimize against detectors.

## Evidence

- "No single control closes the attack surface. Requires layered defense-in-depth."
- "Trusted source is weaker than it sounds. A trusted sender can be compromised."
- "A hostile email that reaches a powerful agent is dangerous even if it came through a clean parser."

## Proposed Resolution

Define the multi-path taxonomy explicitly in Rosetta's security documentation. Each path requires a distinct mitigant:

- Path A: Capability containment + policy engine
- Path B: Provenance verification + capability containment (neither alone suffices)
- Path C: Attachment/link isolation with detonation + deny-by-default on fetches
- Path D: Taint propagation with cross-stage metadata + no implicit trust between pipeline stages
- Path E: Ensemble detectors with calibrated thresholds + quarantine on ensemble disagreement

## Dependencies

- EML-002 (taint propagation system) — directly addresses Path D
- EML-003 (external policy engine) — directly addresses Path A and B

## Status

candidate