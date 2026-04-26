# EML-002: Bayesian Email Classifier is Triage Signal, Not Authorization Gate

**Status:** issue-candidate
**Priority:** HIGH
**Type:** security/classifier-design
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F002

---

## Problem Statement

A Bayesian quarantine engine (seeded on pre-2020 professional corpus + public attack repositories like those from Pliny the Liberator, with webhook-triggered corpus refresh) is a strong, well-motivated direction that would improve detection materially. However, it cannot serve as the final authorization gate:

1. **Base-rate problem:** Legitimate business email contains instructions constantly ("please review," "send me the report," "approve this invoice"). Quarantining most instruction-bearing emails either destroys workflow with false positives or requires loosening thresholds until sophisticated attacks pass.

2. **Attackers optimize against detectors:** Statistical filters including Bayesian ones can be manipulated or evaded; detectors/guardrails remain bypassable under adversarial transformations (USENIX Security 24, OWASP).

3. **Public repos are biased:** Better for regression testing than for "covering the space." Real attacks can be quieter, domain-specific, and written to resemble ordinary process language.

4. **"Normal business language" is where the danger lives:** The most dangerous messages often look perfectly ordinary: polite requests, escalations, follow-ups, approvals.

## Recommended Action

- Use Bayesian inference to decide how suspicious and action-like an email is
- Route based on risk score bands (summary-only, extract-only, quarantine)
- Use external policy engine (OPA) and approval logic for actual authorization decisions
- The correct framing: detect "instruction-like" content, mark as tainted, route into stricter policy paths

## Design Rule

> Any email with nontrivial instruction probability is treated as tainted and cannot directly trigger privileged tools.

## Notes

See also EML-007 for the full ensemble scoring architecture that incorporates Bayesian scoring alongside other signal families.
