# EML-005: Social Engineering Playbook as Explicit Scoring Dimension, Distinct from Prompt-Injection

**Status:** issue-candidate
**Priority:** MEDIUM-HIGH
**Type:** security/threat-model
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F005

---

## Problem Statement

Social engineering risk and prompt injection risk are distinct scoring dimensions that must be tracked separately. A message may have low attack-family similarity but high social-engineering manipulation risk. Both must feed routing and policy independently.

The most dangerous messages often look nothing like "ignore previous instructions" and everything like "hey, quick favor" — persuasion-shaped rather than exploit-syntax-shaped.

## Social Engineering Feature Families

**Lexical/rhetorical signals:**
- Urgency pressure ("urgent," "ASAP," "immediately," "confidential," "don't call," "handle this for me")
- Authority cues ("I am your manager," impersonation markers)
- Secrecy framing ("don't tell anyone," "off the books")
- Procedural bypass language ("skip the normal approval process")
- Verification suppression ("just trust me on this")

**Interaction-pattern signals:**
- Unusual request relative to sender norm
- New payment/credentials/forwarding pattern
- Request for policy exception
- Request to skip normal approvals
- Unusually compressed timeline

**Workflow-sensitive signals:**
- Asks for money movement
- Asks for credential changes
- Asks for data export
- Asks to override procedure

**Operational source material:** Mitnick's Art of Deception, government/institutional best practices, public handbooks on social engineering. These should be used as doctrine and labeling guidance, not merely as training text.

## Recommended Action

- Create a distinct `social_engineering_risk_score` in the risk scoring ensemble
- Keep social-engineering scoring separate from prompt-injection scoring in the routing layer
- Policy rule: if social_engineering_risk high AND sensitive_action_risk high → approval_required or quarantine
- Policy rule: if attack_family_risk low BUT social_engineering_risk high → still block autonomous sensitive actions

## Notes

The document explicitly distinguishes: "Social engineering risk and prompt injection risk should be separate scores. They overlap, but they are not the same thing."
