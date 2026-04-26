# MCST-003: Blast Radius Expansion from External Agent Plane Integration

**Status:** draft
**Type:** risk
**Priority:** high
**Confidence:** high

---

## Problem Statement

Adding MaxClaw as an external agent plane introduces new, tangible attack surface to Entif AI's overall system architecture, even though it *reduces* attack surface on the on-prem mesh through logical isolation. **The isolation from the on-prem network is real, but it does not reduce Entif AI's aggregate attack surface — it relocates and expands it.** Specifically, integrating MaxClaw creates:

1. **Additional identity surfaces**: MaxClaw accounts, API tokens, OAuth bindings to Telegram/Discord/Slack, and any session credentials represent new authentication surfaces that can be compromised, brute-forced, or socially engineered
2. **External memory stores**: MaxClaw's persistent memory (200k+ tokens) stores Entif AI's task history, preferences, and interaction patterns outside the on-prem security perimeter — a breach of MaxClaw's systems exposes this data directly
3. **Additional control endpoints**: Each MaxClaw integration (Telegram bot, Discord server, Slack workspace) is a channel through which an attacker could send prompt injection, manipulate agent behavior, or harvest outputs
4. **Compounded blast radius via OAuth**: OAuth integrations with chat platforms mean that a MaxClaw account compromise could potentially pivot into the chat platform's API, expanding the impact beyond MaxClaw itself

The response to Crates framed this as: "Yes, it's separated from your on-prem agent mesh. But now you have: another identity surface, another memory store, another place an attacker can steer outputs and workflows."

---

## Evidence

- Source: `docs/chats/20260302 - Chat GPT - MaxClaw Split-Testing Evaluation.md`, Finding 007
- Direct response quote: "Yes, it's separated from your on-prem agent mesh. But now you have: another identity surface (accounts, tokens, OAuth bindings to chat apps), another memory store, another place an attacker can steer outputs and workflows"
- MaxClaw's native connectors (Telegram, Discord, Slack) are explicitly identified as new attack vectors

---

## Why This Is an Entif AI Problem

Entif AI's security posture for its on-prem agentic mesh is built on the assumption that the mesh is the single control plane — secrets, identity, memory, and execution are all contained within the perimeter. MaxClaw integration violates this assumption by creating a parallel control plane with:
- Its own authentication (distinct from Entif's internal identity system)
- Its own memory (distinct from Entif's memory graph)
- Its own tool access (including chat platforms that may also be used for other Entif operations)
- Its own data retention policies (cf. MCST-001)

If an attacker compromises the MaxClaw plane, they gain:
- Operational intelligence about Entif's task routing patterns and priorities
- Access to any task artifacts that flowed through MaxClaw (even if sanitized at input, outputs may reveal context)
- A pivot point into Entif's chat platform integrations (Slack, Discord, Telegram)
- Potentially, a stepping stone for more sophisticated attacks on the on-prem mesh if any implicit trust relationships exist

---

## Constraints and Context

- The blast radius expansion is a structural consequence of the external integration and cannot be fully eliminated — only minimized and monitored
- The risk is asymmetric: the isolation that protects the on-prem mesh does nothing to protect the MaxClaw plane itself
- The risk is compounded by Entif AI's planned future architecture: "with guard rails and spend budgeting, of course" and "our primary agents spin up these sorts of external specialized agents ad-hoc, on demand" — as automation scales, the MaxClaw plane becomes more consequential

---

## Suggested Action

1. **Identity hardening**: Apply the principle of least privilege to all MaxClaw accounts and OAuth integrations. Use dedicated, scoped credentials for each integration. Enable MFA on all MaxClaw accounts. Audit MaxClaw OAuth permissions quarterly and revoke any not strictly required.
2. **Network isolation for MaxClaw egress**: Route all MaxClaw-initiated outbound calls through a dedicated, monitored egress proxy with allowlist-only permissions. No MaxClaw egress to internal Entif network ranges.
3. **Chat platform segregation**: Do not reuse chat platform credentials/integrations between MaxClaw and Entif's primary operations. Create separate bot instances or OAuth apps for MaxClaw and for direct Entif operations.
4. **External memory surface minimization**: Treat MaxClaw's persistent memory as untrusted — do not allow MaxClaw to store session context that could be recombined to reconstruct sensitive operational patterns. The "sanitized task spec only" input rule (MCST-010) directly limits what MaxClaw's memory can contain.
5. **Active monitoring**: Set up alerting on MaxClaw account logins, OAuth token usage, API call volumes, and egress network patterns. Anomalous activity on the MaxClaw plane should trigger an alert even if it doesn't represent a direct threat to the on-prem mesh.

---

## Notes

- Cf. MCST-001 (data retention) — MCST-001 is a specific consequence of the external memory store created by MaxClaw's persistent memory feature
- Cf. MCST-007 (recommended architecture) — the untrusted external plane pattern is the primary mitigation for blast radius expansion; MCST-003 identifies the risk, MCST-007 specifies the mitigation architecture

---

## Related Issues

- MCST-001: Data retention ambiguity risk (compound: the external memory store created by MaxClaw's persistent memory is the specific data surface subject to the retention risk in MCST-001)
- MCST-002: Supply-chain community skills risk (adjacent: the OAuth and identity surfaces introduced by community skills are a subset of the broader blast radius)
- MCST-004: Reliability risk cheap lane (adjacent: both risks are compounded by the cheap-lane economic model; blast radius determines attack impact, reliability determines operational cost)
