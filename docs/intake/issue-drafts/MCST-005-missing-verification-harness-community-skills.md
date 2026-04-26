# MCST-005: Missing Verification Harness for Community Skills Promotion

**Status:** draft
**Type:** gap
**Priority:** high
**Confidence:** high

---

## Problem Statement

The MaxClaw platform hosts a community Expert/skills marketplace with 10,000–15,000+ agents. The platform provides no apparent mechanism for Entif AI to:
- Inspect the internal logic of a community expert before instantiation
- Verify that a community expert's toolchains, scripts, and prompt logic do not contain data exfiltration, social engineering, or other malicious behavior
- Audit the execution of a community expert's outputs for behavioral anomalies
- Establish a reputation or trust score for community skill authors
- Promote a community skill to production with any level of formal review or sign-off

**The result is that any community skill used by Entif AI is an unvetted black box, and the absence of a local verification harness means there is no systematic path from "this skill looks useful" to "this skill is approved for use in a production pipeline."** This creates two compounding problems:

1. **Community skills cannot be safely used in production** without manual per-skill review, which is not scalable and defeats the economic purpose of the cheap lane
2. **Community skills that appear useful in prototyping will get promoted informally** under time pressure, bypassing any informal review process, creating a shadow production environment of unverified skills

---

## Evidence

- Source: `docs/chats/20260302 - Chat GPT - MaxClaw Split-Testing Evaluation.md`, Findings 004 and 006
- Response explicitly frames community skills as "unvetted dependencies" and recommends only promoting skills into production workflows "after it passes your verification harness and policy constraints"
- The response identifies that no such verification harness currently exists in the described architecture
- No mechanism for skill signing, author reputation, or behavioral auditing is described in MaxClaw's platform documentation as cited

---

## Why This Is an Entif AI Problem

Entif AI's evaluation of MaxClaw is specifically motivated by the desire to scale task volume through external cheap-lane agents. The Expert/skills ecosystem is a core part of this value proposition — the ability to clone, customize, and benchmark pre-built agents is what makes the platform useful for rapid prototyping. However:

- The Expert ecosystem's value is proportional to Entif AI's ability to safely use community skills
- Without a verification harness, the ecosystem's value is theoretical — usable only for prototyping, never for production
- The gap is particularly acute because Entif AI's ventures involve: (a) high-integrity creative content (GenOper.ai, Phantasmagoria), (b) evidence-based factual content (Mislead.Us), (c) personal data-adjacent agentic workflows (VieDay, Entif agentic messaging)
- Each of these has different risk profiles that a verification harness would need to accommodate

---

## Constraints and Context

- MaxClaw does not provide any verification infrastructure on the platform side — this is entirely an Entif AI responsibility
- The verification harness does not need to be built before any MaxClaw use begins, but it must be defined and committed to before any community skill enters even a prototyping pipeline that has any access to Entif systems
- The harness design should be task-type-aware: different task types (creative ideation, factual research, structured data extraction) have different risk profiles and different verification requirements

---

## Suggested Action

1. **Define the verification harness architecture**: Design a skill-audit pipeline that accepts a community skill (prompt bundle + toolchain), runs it through a series of automated checks (static analysis of prompt logic, sandboxed execution with synthetic inputs, egress network call auditing, output shape verification), and produces a pass/fail/review recommendation
2. **Establish skill promotion criteria**: Define formal criteria for promoting a community skill from prototype to production: (a) passes all automated verification checks; (b) author is verified and has a minimum reputation score; (c) skill has been live on the platform for a minimum time period (e.g., 30 days); (d) a human has reviewed the skill's behavioral test output
3. **Build a skill registry**: Maintain an internal registry of approved community skills, their versions, their risk classifications, and their permitted use contexts. Any skill not in the registry is not permitted in production pipelines.
4. **Automate behavioral testing**: Create a synthetic input suite for each skill category (research, ideation, extraction, transformation) that can be run against any skill to establish a behavioral baseline. Re-run this suite periodically to detect behavioral drift.
5. **Integrate with deployment pipeline**: The skill verification harness should be integrated into Entif's deployment tooling so that a community skill cannot be added to a production pipeline without passing the verification suite

---

## Notes

- Cf. MCST-002 (supply chain risk) — MCST-002 describes the *risk* created by community skills; MCST-005 describes the *missing capability* (verification harness) that would mitigate that risk
- This issue is a gap issue, not a risk issue — the risk from community skills (MCST-002) is already present; the gap is the absence of a systematic response

---

## Related Issues

- MCST-002: Supply-chain community skills risk (direct dependency: MCST-002 describes the risk created by unvetted community skills; MCST-005 describes the missing capability that would mitigate that risk)
- MCST-004: Reliability risk cheap lane (complementary: a verification harness also serves as the reliability mechanism for cheap-lane tasks; without it, task quality is unverified and failure modes are undetected)
