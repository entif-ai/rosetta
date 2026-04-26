# YAAC-003: SOW shield for agentic AI consulting

**Type:** docs-intelligence  
**Draft or Existing Issue:** draft  
**Labels:** consulting, sow, contract  
**Depends On:** —  
**Evidence:** `docs/chats/20260226 - Chat GPT - YT, Agents, Auth and Cache.md`

## Summary

Adopt the 6-section SOW shield structure for all Entif consulting engagements instead of selling "outcomes." This indemnifies against scope creep and transforms "shitstorms" into billable change orders.

## The 6 Sections

### 1) Deliverables (tangible artifacts)
- List things that can be handed over: code, configs, runbooks, diagrams, logs, test reports, training session, handoff notes
- Each deliverable is concrete and verifiable

### 2) Acceptance criteria (binary, testable)
- Each deliverable has "Done when…" criteria that can be verified
- Avoid "improves productivity" language
- Use: "pipeline runs end-to-end on provided dataset," "audit log emits X events," "tool policy denies Y"

### 3) Assumptions and client responsibilities
- Access, data quality, SME availability, environment readiness, accounts, approvals, security exceptions
- If they fail here: timeline shifts and/or change order triggers

### 4) Out of scope
- Explicitly list what will be attempted to smuggle in later
- Essential for AI agent work where "obvious" asks proliferate

### 5) Change control
- "Any work outside scope requires a written change request and approval"
- Single sentence that makes scope creep billable

### 6) Limitations and disclaimers (AI-specific)
- Model behavior is probabilistic: "Client acknowledges LLM outputs may be incomplete or incorrect"
- Third-party dependencies not under consultant control
- Security is risk reduction, not risk elimination

## AI Agent Work Extra Contract Armor

- **Probabilistic outputs:** "Consultant will implement guardrails and evaluation procedures; does not warrant accuracy of model-generated content"
- **Third-party deps:** "Delays from LLM API changes, rate limits, vendor outages excluded from acceptance timelines"
- **Security:** "Best-practice controls implemented; does not guarantee absence of vulnerabilities"

## Rate Structure

- $700/hr standard
- 50-hour block prepaid at $490/hr effective (30% discount)
- Block expires in 90 days
- Unused hours roll to advisory-only scope
- Minimum engagement: 20 hours

## Productized Offer Ladder

1. **AI Readiness Assessment (2-3 days, fixed fee):** Decision memo + risk register + pilot design + cost model
2. **Two-Week Pilot Sprint (fixed fee, 50-70 hrs):** Working workflow + metrics + governance + handoff
3. **Platform Hardening Retainer (50-hour block):** Prepaid priority capacity

## Status

Open.
