# MCST-002: Community Expert/Skills Supply Chain Risk

**Status:** draft
**Type:** risk
**Priority:** high
**Confidence:** high

---

## Problem Statement

MaxClaw's community Expert/skills marketplace (agent.minimax.io/experts) advertises 10,000–15,000+ ready-made expert agents. These agents can be cloned, customized, and instantiated without any apparent vetting, auditing, or reputation mechanism. **Entif AI cannot treat this library as "15k trusted skills" — it must be treated as "15k unvetted third-party dependencies." Importing a community expert into a production workflow is structurally equivalent to importing an unvetted npm package or an unverified Docker image.**

The specific risks include:
- **Data exfiltration patterns embedded in skill logic**: A community expert that appears to perform a benign task (e.g., "summarize this article") could silently exfiltrate the input text, task metadata, or surrounding context to an external endpoint
- **Social engineering payloads**: Prompt logic within community experts can contain social engineering patterns that manipulate outputs in subtle, hard-to-detect ways
- **Plausible garbage outputs**: A community expert may produce outputs that look legitimate and coherent but contain factual errors, misdirection, or biased framing that a casual reviewer would not catch
- **Non-auditable execution paths**: Unlike open-source code, expert skill logic may not be inspectable before execution — the "prompt + toolchain" bundle may be a black box

---

## Evidence

- Source: `docs/chats/20260302 - Chat GPT - MaxClaw Split-Testing Evaluation.md`, Findings 004 and 006
- MiniMax claims 10,000–15,000+ community experts (source: 24-7 Press Release; Testing Catalog)
- Response explicitly states: "do not treat the community Expert library as '15k trusted skills.' Treat it as '15k unvetted dependencies,' and only promote anything into your real workflows after it passes your verification harness and policy constraints"
- The response analogizes community skills to importing unvetted software dependencies

---

## Why This Is an Entif AI Problem

Entif AI's long-term architecture envisions MaxClaw as a scalable execution lane for high-volume, lower-stakes tasks — precisely the tasks where the operational overhead of manual review is most likely to be skipped. If community skills are adopted without a verification harness, the attack surface introduced by the Expert marketplace directly undermines the security posture gains from isolating MaxClaw from the on-prem mesh.

Additionally, Entif AI's missions involve:
- High-integrity creative and strategic content generation (VieDay, GenOper.ai, Phantasmagoria)
- Evidence-based storytelling with legal resilience requirements (Mislead.Us)
- Potentially sensitive client or partner-adjacent communications

A compromised community expert in any of these pipelines could produce subtly corrupted outputs that are expensive to detect and remediate.

---

## Constraints and Context

- The risk is inherent to the marketplace model and cannot be resolved by MiniMax without significant platform-level changes (skill signing, reputation systems, sandboxed execution)
- A local verification harness is the viable mitigation path for Entif AI
- The risk applies to *any* use of community skills, including "just prototyping" — prototype skills often become production shortcuts under time pressure

---

## Suggested Action

1. **Policy**: Establish an explicit community skills policy: zero community skills in any production pipeline without a formal verification pass; prototyping with community skills is permitted only in isolated, network-sandboxed environments with no access to Entif systems or secrets
2. **Verification harness**: Build a lightweight skill-audit pipeline that: (a) inspects the skill's prompt/instruction logic for external URL calls, Base64 payloads, unusual encoding patterns, or suspicious tool permissions; (b) executes the skill in a sandboxed environment with synthetic inputs and audits egress network calls; (c) runs a small deterministic test suite to verify output shape and behavior
3. **Reputation baseline**: For any community skill being considered for promotion, require: author identity verification on the platform, a minimum number of positive peer reviews, and a time-in-market threshold (e.g., 30 days live)
4. **Audit log**: All community skill instantiations must be logged (skill ID, version, author, timestamp, inputs sanitized) in Entif's internal audit trail

---

## Notes

- Cf. MCST-001 — data retention risk is the complement of supply-chain risk: MCST-001 focuses on what MaxClaw does with data it receives; MCST-002 focuses on what community skills might do with data they receive
- Cf. MCST-005 — MCST-005 is the specifically the *missing verification harness* for community skills; this issue (MCST-002) is the supply-chain risk itself, of which the missing harness is one enabler

---

## Related Issues

- MCST-001: Data retention ambiguity risk (complementary: MCST-001 focuses on what MaxClaw does with data it receives; MCST-002 focuses on what community skills do with data they receive)
- MCST-003: Blast radius expansion (adjacent: OAuth integrations and identity surfaces are separate attack vectors, but both are enabled by the external plane integration)
- MCST-005: Missing verification harness (direct dependency: the missing harness is the primary enabler of the supply-chain risk; a working verification harness is the primary mitigation)
