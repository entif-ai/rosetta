# Issue Draft: EDG-005 — Threat Monitor as Separate Future Workstream

## Metadata

| Field | Value |
|---|---|
| Issue ID | EDG-005 |
| Type | scoping |
| Status | draft |
| Source doc | docs/governance/Entif 2.0 - Decentralization and Governance.md |
| Extraction date | 2026-05-26 |
| Confidence | medium |

## Problem

Section 2 of the Entif 2.0 Decentralization & Governance doc describes a full Security Operations Center (SOC) capability that goes well beyond agent governance:

- **Threat Monitor service**: polls CVE/NVD feeds, vendor advisories, GitHub trackers, cybersecurity RSS
- **LLM-augmented triage**: RAG pipeline for CVE prioritization
- **SBOM cross-referencing**: component inventory for vulnerability matching
- **Automated response**: hot-patching, feature kill-switches, behavioral adjustments, system-wide halt
- **LLM-based action plan generation**: natural language response planning

This is described as part of the "real-time governance system" but is actually a separate subsystem with different data sources, different actors, and different operational cadence than the Guard Layer that monitors agent actions.

## Evidence

Section 2 intro: "In addition to governing its own actions, Entif 2.0 will continuously watch the external world for new security threats and vulnerabilities — and respond to them in real time."

This clearly distinguishes:
- **Threat Monitor**: watches external world (CVEs, vulnerabilities, threat intelligence)
- **Guard Layer**: watches internal agent behavior (anomaly detection, policy enforcement)

Conflating them creates scope creep that could derail Text-Core MVP.

## Scope Creep Risk

Adding Threat Monitor to the current roadmap would require:
- CVE/NVD feed integration infrastructure
- Vector DB + RAG pipeline for threat analysis
- SBOM maintenance process
- Automated patch deployment pipeline
- Hot-patching CI/CD integration
- Kill-switch infrastructure across all nodes

None of these are in NOT LAME, NOT LAME's 19-ticket roadmap, or any current sprint plan.

## Recommended Action

1. Explicitly scope Threat Monitor as **separate future workstream** — not part of Text-Core MVP or MVP Alpha RC
2. Add to EDG-001 (terminology mapping): "Threat Monitor is a separate security operations capability, not part of Guard Layer / write-admission-gate"
3. Flag in project board: Threat Monitor is a Phase 2 or later candidate, after MVP Alpha RC is stable
4. Do not include Threat Monitor requirements in any current sprint planning

## Labels

threat-intelligence, scope, future-work, threat-monitor, scoping, scope-creep

## Depends On

(None — can proceed immediately)

## Related Issues

- EDG-003 (Guard Layer alignment — Threat Monitor is not part of Guard Layer)
- EDG-006 (emergency halt — this is the one piece of Section 2 that IS relevant, but is a sovereign-kernel requirement, not a Threat Monitor requirement)