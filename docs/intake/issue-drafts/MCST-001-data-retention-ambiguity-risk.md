# MCST-001: MaxClaw Data Retention & Training Ambiguity Risk

**Status:** draft
**Type:** risk
**Priority:** high
**Confidence:** high

---

## Problem Statement

MaxClaw's privacy policy language permits retention of personal data "as long as necessary/permitted" and describes data destruction/anonymization as subject to "commercially reasonable terms." This framing is typical SaaS boilerplate but creates a concrete risk for Entif AI's use case: **anything transmitted to MaxClaw — including sanitized task specs, public data queries, and non-sensitive artifacts — could persist in MaxClaw's systems longer than intuitively expected, and potentially be used in ways not covered by Entif AI's data handling policies.**

The risk is not hypothetical. Even when the input appears innocuous (a task spec with no PII, a public URL to research, a generic prompt), the *combination* of inputs over time can constitute sensitive operational intelligence. Additionally, MiniMax's relationship to Chinese regulatory frameworks (given MiniMax's legal jurisdiction) may impose data retention obligations that are not visible in the English-language privacy policy.

---

## Evidence

- Source: `docs/chats/20260302 - Chat GPT - MaxClaw Split-Testing Evaluation.md`, Finding 005
- Direct citation from MaxClaw privacy policy (agent.minimax.io/doc/en/privacy-policy.html): data retained "as long as necessary/permitted"; destruction/anonymization in "commercially reasonable terms"
- Response recommendation: "your architecture should assume: anything you send could persist longer than you'd intuitively want"

---

## Why This Is an Entif AI Problem

Entif AI operates at the intersection of agentic memory, identity continuity, and sensitive decision-support systems. The long-horizon vision for Entif's on-prem mesh includes:

- Persistent memory graphs with high informational density about Crates's projects, decisions, and communications
- Potentially sensitive strategic planning and venture intelligence
- Agentic workflows that emit intermediate artifacts which, over time, reveal operational patterns

If any of this information is inadvertently routed to MaxClaw (even through a "sanitized" task spec), the retentive privacy policy means that information could outlive the task, the session, and potentially Entif AI's relationship with MiniMax.

---

## Constraints and Context

- This risk applies *even when no PII is explicitly sent*
- The risk is amplified by MaxClaw's persistent memory feature (200k+ tokens) — the architecture is explicitly designed to retain information long-term
- Risk applies to the production and pilot phases equally
- The risk cannot be fully mitigated by redaction alone (metadata, timing patterns, and query shapes can be intelligence-revealing)

---

## Suggested Action

1. **Architectural**: Implement a zero-retention boundary at the redaction gateway — MaxClaw inputs must be transmittal-only (fire-and-forget at the token level), with no expectation of retrieval or deletion rights
2. **Legal/Policy**: Engage MiniMax directly for a Data Processing Agreement (DPA) that specifies: (a) defined retention periods, (b) guaranteed deletion on request, (c) exclusion from model training
3. **Operational**: Treat the MaxClaw channel as permanently read-only from Entif's side — no task that generates entropy (creative drafts, research threads, iterative refinement) that touches a MaxClaw session should be resumed or revisited in a subsequent session without assuming the prior context is retained
4. **Instrumentation**: Log all MaxClaw inputs at the gateway level with timestamps and hashes for audit purposes, independent of MaxClaw's own retention

---

## Notes

- Cf. MCST-003 (blast radius expansion) — data retention risk is one specific manifestation of the broader attack surface increase from external agent integration
- Cf. MCST-005 (verification harness) — a verification harness for community skills would also need to verify data handling compliance of any skills that emit external API calls

---

## Related Issues

- MCST-002: Supply-chain risk from community skills (complementary: data retention risk is what MaxClaw does with received data; supply-chain risk is what community skills do with received data)
- MCST-003: Blast radius expansion (complementary: blast radius includes external memory stores that are subject to the retention risk identified here)
- MCST-005: Missing verification harness (partial: a verification harness would also need to verify data handling compliance of community skills)
