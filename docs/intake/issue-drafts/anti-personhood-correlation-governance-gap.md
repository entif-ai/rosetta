---
title: "Anti-Personhood-Correlation Constraint: Governance Gap in Identity Correlation Capabilities"
type: "ethics/governance"
status: "open"
evidence: "Finding 11 — 20260412 chat synthesis; Finding 7 — PID/identity infrastructure enables correlation"
---

## Context

As Entif's source handling improves — specifically its ability to connect authorship signals, discourse patterns, and identity signals across repositories and platforms via the PID/identity spine (DataCite, Crossref, ORCID, ROR, SWHID) — the system gains the technical capability to perform personhood correlation and cognitive fingerprinting at scale.

The 20260412 chat surfaces this concern but does not propose a concrete governance mechanism to prevent it:

> "It also keeps Entif from sleepwalking into personhood-correlation and cognitive-fingerprint abuse as it becomes better at connecting authorship, discourse, and identity signals across repositories and platforms."

This is not a hypothetical harm. If Entif successfully builds the Source Substrate as specified — with ORCID integration, authorship claim resolution, discourse and forum ingestion, and cross-repository identity reconciliation — the system will be technically capable of:
- Building comprehensive psychological/cognitive profiles of named individuals without their consent
- Correlating anonymous or pseudonymous discourse back to identified persons
- Inferring beliefs, opinions, reasoning patterns, and cognitive biases from authored corpus analysis
- Constructing identity graphs that could be used for manipulation, coercion, or surveillance

## Evidence

1. **Model synthesis (Finding 11):** "It also keeps Entif from sleepwalking into personhood-correlation and cognitive-fingerprint abuse as it becomes better at connecting authorship, discourse, and identity signals across repositories and platforms."
2. **Model synthesis (Finding 7):** "These are the systems that let Entif distinguish 'the repository says this,' 'the identifier authority says this,' 'the person self-asserted this,' and 'a graph enricher inferred this.' That distinction is exactly what the protocol needs." — The identity infrastructure that enables this distinction also enables correlation abuse if left unguarded.
3. **User request (20260412 prompt):** "over time... the confluence of confidence scoring we have on many different evaluation criteria... draw far more sophisticated conclusions about who's trustworthy, and about what." — Trust evaluation at scale across correlated identity graphs is precisely the capability vector that creates personhood-correlation risk.

## Analysis

The risk is not that Entif will intentionally harm individuals. The risk is:
1. **Capability-creep:** As identity resolution improves, the system's query surface for personhood correlation expands
2. **Third-party requests:** External parties may request identity-correlation outputs as a service
3. **Bystander harm:** Even if Entif itself doesn't use the capability unethically, architectural provisions for correlation could be misused by future operators, acquirers, or compromised processes
4. **Regulatory exposure:** GDPR, CCPA, and emerging AI governance frameworks increasingly regulate automated profiling of individuals; personhood-correlation outputs likely constitute regulated data

## Proposed Resolution

The Source Substrate addendum (see: `source-substrate-missing-protocol-domain.md`) must include explicit governance language:

1. **Prohibition language:** Identity-correlation outputs — defined as inferences that connect pseudonymized or anonymous discourse patterns to identified individuals, or that construct cognitive/psychological profiles of named individuals from their authored corpus — are prohibited uses of the Source Substrate infrastructure,除非 explicit individual consent is documented in the relevant `identity.record`.

2. **Audit trail requirement:** Any query to the Source Substrate that would produce cross-repository authorship correlation must be logged with: query rationale, requesting authority, output type, and downstream use case.

3. **Capability opt-out:** Repository and identity provider integrations (ORCID, ROR, DataCite bindings) must include configurable capability restrictions that can disable correlation-adjacent operations (e.g., ORCID-to-disclosure-cross-reference, authorship-graph traversal, cognitive fingerprint extraction).

4. **Constitutional rank:** The anti-personhood-correlation constraint must be at the constitutional level of the Source Substrate domain, not a footnote or implementation detail, because it constrains the scope of otherwise-useful identity resolution infrastructure.

## Relationship to Existing Rosetta Work

- **Distinct from governance addenda:** Existing governance addenda cover Rosetta-internal process. This issue covers the ethical boundary between legitimate source intelligence and prohibited profiling.
- **Related to Source Substrate addendum:** This is a sub-component of the Source Substrate governance layer.
- **Structural parallel to data retention constraints:** The constraint functions like a data sovereignty rule — it limits what can be done with certain data categories regardless of technical capability.

## Notes

This issue should be resolved in coordination with the Source Substrate addendum drafting. The constraint language must be concrete enough to be implementable and auditable, not merely aspirational.
