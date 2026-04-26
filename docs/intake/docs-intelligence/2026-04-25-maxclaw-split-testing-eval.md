# DI: MaxClaw Split-Testing Evaluation
**Source:** `docs/chats/20260302 - Chat GPT - MaxClaw Split-Testing Evaluation.md`
**Extracted:** 2026-04-25
**Branch:** `docs-intelligence/2026-04-25-maxclaw-split-testing-eval`
**Issue Prefix:** MCST-XXX

---

## Document Metadata

| Field | Value |
|-------|-------|
| Platform | ChatGPT (chatgpt.com) |
| Agent/GPT | g-p-69299306a6408191947092cdf41148f0-entif-2-0 |
| Conversation ID | 69a59451-6ff4-832d-b2db-d1c81c4a870a |
| User | Crates McD (mcdade@gmail.com) |
| Created | 2026/3/2 8:44:53 |
| Updated | 2026/3/2 8:49:22 |
| Exported | 2026/3/2 11:44:47 |
| Line Count | 141 |
| Think Time Noted | 3m 23s |

---

## Document Summary

Crates McD, CEO of Entif AI, engaged a ChatGPT instance to evaluate split-testing MiniMax's MaxClaw — a hosted, always-on, one-click agent platform built on the OpenClaw framework — as a cheap external execution lane for discrete, low-stakes, non-urgent tasks. The response covers: (1) MaxClaw's value proposition and pricing; (2) concrete benefits; (3) risks; (4) a proposed split-test methodology; and (5) a guardrail architecture for treating MaxClaw as an untrusted external plane. Key sources cited: agent.minimax.io, maxclaw.ai, MiniMax API pricing docs, MiniMax privacy policy, 24-7 Press Release.

---

## Findings

### Finding 001 — MaxClaw Product Positioning (Confidence: HIGH)

MaxClaw is MiniMax's hosted, always-on agent platform, positioned as a "one-click" alternative to self-hosted OpenClaw instances. It provides persistent long-term memory spanning 200k+ tokens and native connectors for Telegram, Discord, and Slack. It requires no servers and no Docker — removing all hosting friction. The platform also hosts a community Expert/skills marketplace. MiniMax's own materials advertise 10,000+ (and later 15,000+) community experts available for use and publication. Sources: maxclaw.ai landing page; 24-7 Press Release on MaxClaw launch.

**Confidence: HIGH** — Direct citations from primary product pages and press releases.

---

### Finding 002 — MiniMax M2.5 Pricing (Confidence: HIGH)

MiniMax's published pay-as-you-go pricing for the M2.5 model is approximately $0.30 per million input tokens and $1.20 per million output tokens, with separate prompt caching rates. This price envelope is characterized as specifically aimed at "run lots of agent steps without crying." The cost profile makes high-frequency, low-stakes task delegation economically viable in ways that are not viable against other hosted model providers at comparable quality levels.

**Confidence: HIGH** — Directly cited from MiniMax Platform API documentation (platform.minimax.io/docs/guides/pricing-paygo).

---

### Finding 003 — Persistent Memory Capability Claim (Confidence: HIGH)

MaxClaw explicitly claims persistent memory spanning 200k+ tokens, described as enabling long-term continuity across sessions and supporting "always-on" availability for background chores, recurring monitoring, ongoing research threads, and iterative drafts. This persistent memory capability is framed as a key differentiator for the "always-on" use case.

**Confidence: HIGH** — Directly stated on maxclaw.ai and in product press materials.

---

### Finding 004 — Community Expert/Skills Ecosystem Scale (Confidence: MEDIUM-HIGH)

MiniMax claims a library of 10,000+ to 15,000+ ready-made expert agents ("experts") available through their community marketplace at agent.minimax.io/experts. These experts can be cloned, customized, and benchmarked. However, the response explicitly notes that these community-contributed agents constitute "unvetted dependencies," and the response's author recommends against treating them as trusted skills without a verification harness.

**Confidence: MEDIUM-HIGH** — Numbers cited from press releases; vetting status assessed by the responding model based on platform architecture analysis.

---

### Finding 005 — Data Retention & Training Ambiguity Risk (Confidence: HIGH)

MaxClaw's privacy policy language includes retention of personal data "as long as necessary/permitted" and discusses destruction/anonymization in "commercially reasonable terms." This is described as "normal for SaaS," but the response recommends that any architecture assume anything sent to MaxClaw could persist longer than intuitively expected. This applies even to tasks that appear non-sensitive (e.g., sanitized task specs, public data queries).

**Confidence: HIGH** — Directly cited from agent.minimax.io privacy policy page.

---

### Finding 006 — Supply-Chain Risk from Community Experts/Skills (Confidence: HIGH)

The response identifies a concrete supply-chain risk: community agents may include toolchains, scripts, or prompt logic authored by third parties that could smuggle bad behavior — specifically: data exfiltration patterns, social engineering payloads, or plausible-but-wrong outputs. Even when the agent "looks" legitimate, the underlying implementation may not be auditable. This is structurally analogous to importing unvetted npm packages or Docker images.

**Confidence: HIGH** — Risk identified and characterized by the responding model based on platform analysis; no specific malicious expert instance cited, but the structural vulnerability is well-grounded.

---

### Finding 007 — Blast Radius Expansion via External Agent Plane (Confidence: HIGH)

Introducing MaxClaw as an external agent plane creates new attack surface including: (a) additional identity surfaces (accounts, API tokens, OAuth bindings to chat platforms); (b) an external memory store outside the on-prem security perimeter; (c) an additional locus where an attacker could steer outputs and workflows. The response frames the separation from the on-prem mesh as beneficial to on-prem security posture but notes that it does not reduce overall organizational attack surface — it relocates and expands it.

**Confidence: HIGH** — Directly argued in the response with explicit enumeration of the new attack surfaces introduced.

---

### Finding 008 — Reliability Risk in High-Volume Cheap Lane (Confidence: HIGH)

The response identifies a behavioral risk: the "cheap lane" (low-cost MaxClaw tier) is precisely where operational teams will be tempted to route high volumes of automation. This is dangerous because cheap-tier services tend to exhibit higher failure rates (hallucination, tool failure, looping, silent partial completions, hallucinated "done" states). The operational cost of these failures — retries, manual verification, silent data corruption — can exceed the cost savings from cheap routing.

**Confidence: HIGH** — Directly identified by the responding model based on economic and reliability analysis.

---

### Finding 009 — Proposed Split-Testing Methodology (Confidence: N/A — Process Proposal)

The response proposes a specific split-test methodology:

**Recommended task types for MaxClaw pilot:**
- Summarize public articles/papers; produce bullet takeaways + citations
- Generate first-draft outlines, checklists, SOPs, runbooks
- Web research → extract structured facts (with later verification)
- Bulk transformations of non-sensitive text (formatting, tagging, dedupe)
- Creative ideation where correctness is not binary

**Explicitly avoided in pilot:**
- Anything touching credentials, internal repos, personal inboxes, customer data
- Anything that can execute side effects in real systems

**Instrumentation recommended:**
- Cost (tokens, $), latency, completion rate
- Verifier pass rate (acceptance checks)
- Human edit distance (修复 effort required)
- Failure mode taxonomy: hallucination, refusal, tool failure, looping

**Confidence: N/A** — This is a process proposal, not a factual finding.

---

### Finding 010 — Recommended Architecture: Untrusted External Plane Pattern (Confidence: HIGH — Recommended Design)

The response proposes a specific architectural pattern for safely integrating MaxClaw:

**Untrusted External Agent Plane (MaxClaw):**
- Inputs: sanitized task spec only (no raw context, no identifiers)
- Tools: limited to what can be tolerated running externally
- Outputs: artifacts only (JSON payloads, drafts, diffs, structured research notes with evidence links)

**Trusted Internal Control Plane (on-prem mesh):**
- Owns: secrets, identity, real integrations, final commits, irreversible actions
- Runs: policy enforcement, redaction, verification, budgeting, audit logging

**Five concrete guardrails specified:**
1. Redaction gateway (always on) — strip identifiers, internal URLs, customer names, proprietary text
2. Egress allowlist — only explicitly permitted outbound data types
3. No direct credentials — MaxClaw uses scoped, disposable credentials only, for non-sensitive scopes
4. One-way proposal channel — MaxClaw can propose actions; internal plane executes after verification
5. Spend governor — hard caps per task and per day; circuit breaker on looping

**Confidence: HIGH** — Design recommendation with specific mechanisms enumerated by the responding model.

---

## Source Links

| # | URL | Description |
|---|-----|-------------|
| S1 | https://maxclaw.ai/ | MaxClaw product landing page |
| S2 | https://agent.minimax.io/experts | MaxClaw community Expert/skills marketplace |
| S3 | https://platform.minimax.io/docs/guides/pricing-paygo | MiniMax API pay-as-you-go pricing |
| S4 | https://agent.minimax.io/doc/en/privacy-policy.html | MaxClaw privacy policy |
| S5 | https://www.24-7pressrelease.com/press-release/532213/minimax-launches-maxclaw-a-one-click-agent-system-powered-by-minimax-25-with-built-in-long-term-memory | Press release on MaxClaw launch |
| S6 | https://www.testingcatalog.com/minimax-launches-managed-always-on-maxclaw-ai-agent/ | MaxClaw launch coverage on Testing Catalog |
| S7 | https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0-entif-2-0/c/69a59451-6ff4-832d-b2db-d1c81c4a870a | Source conversation URL |

---

## Related Documents

*(To be populated by graph script)*

---

## Confidence Summary

| Finding | Confidence | Topic |
|---------|------------|-------|
| 001 | HIGH | MaxClaw product positioning |
| 002 | HIGH | M2.5 pricing |
| 003 | HIGH | Persistent memory claims |
| 004 | MEDIUM-HIGH | Community ecosystem scale |
| 005 | HIGH | Data retention ambiguity risk |
| 006 | HIGH | Supply-chain risk community skills |
| 007 | HIGH | Blast radius expansion |
| 008 | HIGH | Reliability risk cheap lane |
| 009 | N/A | Split-test methodology |
| 010 | HIGH | Untrusted plane architecture pattern |
