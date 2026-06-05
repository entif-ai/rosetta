# 2026-06-05 — Governance Addendum: Personhood, Provenance and Cognitive Twin Risk

## Metadata
- **Source:** docs/governance/rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Boundary
This artifact is docs-intelligence output for planning and orchestration. Not runtime ingestion.

## Summary
This governance addendum extends Rosetta's provenance and receipt framework from content-level integrity to personhood-level integrity. It introduces a new threat model for cognitive fingerprint extraction, digital twinning, identity simulation, and predictive exploitation; defines five new policy classes; specifies ten new RRP receipt families; establishes three RRP-Identity conformance levels; and provides a 15-section normative specification governing identity-sensitive operations, simulation restrictions, correlation/tracking limits, and retention controls — all defaulting to deny.

## Findings

### [F1] Identity Synthesis Asymmetry Thesis
**Confidence:** high
**Reference:** Core Thesis, lines 33-40
**Content:** A sufficiently capable Rosetta/RPP stack could extract longitudinal cognitive fingerprints, infer probabilistic lineage and cohort data, build predictive digital twins of communicative and behavioral style, perform identity-faithful impersonation, and use person models to predict reactions, choices, and vulnerabilities. These capabilities are characterized as catastrophic-leverage multipliers when compounded with market exploitation, cyber operations, influence operations, and automated targeting.

### [F2] Core Non-Negotiable Principle
**Confidence:** high
**Reference:** Non-Negotiable Principle, lines 42-49
**Content:** "Identity becomes cheap to synthesize long before it becomes easy to verify." Rosetta must be designed so no actor can silently move from observing a person, to modeling a person, to simulating a person, to acting as that person, without crossing explicit technical, governance, and audit boundaries.

### [F3] Seven Expanded Threat Classes
**Confidence:** high
**Reference:** Threat Model Expansion, lines 52-75
**Content:** The addendum adds seven explicit abuse classes to Rosetta's threat model: (1) Cognitive Fingerprint Extraction — deriving stable signatures from language, timing, preferences, discourse structure, correction patterns, and multimodal traces; (2) Personhood Correlation — linking separate accounts, corpora, voices, or behaviors to the same human source; (3) Digital Twinning — building a predictive representation of a person's beliefs, responses, preferences, vulnerabilities, and stylistic habits; (4) Identity Simulation — generating outputs that present as authored, spoken, endorsed, or behaviorally enacted by a target person; (5) Invisible Tracking — treating cognitive or linguistic patterning as a quasi-biometric signal for persistent cross-platform surveillance; (6) Narrative Substitution — inducing public acceptance of a synthetic replacement narrative about a real person through fabricated multimodal and behavioral continuity; (7) Predictive Exploitation — using person models to forecast reactions, identify pressure points, and optimize persuasion, coercion, or neutralization.

### [F4] Five New Policy Classes
**Confidence:** high
**Reference:** New Policy Classes, lines 95-136
**Content:** Five distinct policy classes are specified: (A) Identity-Sensitive Data Policy — defines which signals count as identity-grade or quasi-biometric, including voice features, facial embeddings, stylometric traces, longitudinal behavioral signatures, response-pattern fingerprints, social graph patterns, and cross-modal identity linkages; (B) Person-Model Authorization Policy — defines who or what may create, update, compare, export, execute against, or deploy person models or cognitive fingerprints; (C) Simulation Disclosure Policy — defines required disclosures when output is inspired by, calibrated on, simulating, or materially shaped by an identifiable person's corpus or behavioral model; (D) High-Fidelity Impersonation Prohibition Policy — defaults to deny for systems attempting to reproduce a living person's voice, likeness, style, reasoning pattern, or decision pattern beyond approved boundaries; (E) Predictive Manipulation Policy — defines forbidden or escalated uses of person models for persuasion optimization, coercion modeling, exploit targeting, or reputation warfare.

### [F5] Ten New RRP Receipt Families
**Confidence:** high
**Reference:** Receipt and Bundle Extensions, lines 138-153
**Content:** Ten new RRP receipt families are specified for identity-sensitive operations: rrp:identity.feature_extraction, rrp:identity.correlation, rrp:person_model.creation, rrp:person_model.update, rrp:person_model.similarity_assessment, rrp:simulation.authorization, rrp:simulation.disclosure_attestation, rrp:impersonation.risk_assessment, rrp:identity.export_authorization, and rrp:predictive_manipulation.block. Each must bind to: subject identities or pseudonymous handles, feature classes used, provenance inputs, policy references, authorization chain, verifier outcome, disclosure requirements, retention/expiry constraints, and risk score or matrix reference.

### [F6] Three RRP-Identity Conformance Levels
**Confidence:** high
**Reference:** New Conformance Expectations / RRP-Identity-Aware, lines 160-186
**Content:** Three identity-aware conformance profiles are defined: (RRP-Identity-Aware) the system can detect and label workflows that touch personhood provenance or quasi-biometric features; (RRP-Identity-Restricted) the system enforces policy gates before any person-model creation, update, comparison, export, or simulation — and must enforce default-deny for unauthorized creation and undeclared high-fidelity simulation; (RRP-Identity-Auditor) the system can answer whether a person model was created, from what source material, under what authorization, with what intended use, with what similarity or impersonation risk, what disclosures were attached, what retention and deletion constraints applied — and must reconstruct the authorization and policy chain for authorized reviewers.

### [F7] Separation of Content and Personhood Claims Requirement
**Confidence:** high
**Reference:** Technical Control Objective 1 / Section 4, lines 189-191 and 317-329
**Content:** A claim that content is authentic is not equivalent to a claim that the represented personhood is authentic. A compliant implementation MUST treat content authenticity, authorship attribution, identity continuity, and simulation disclosure as distinct claim classes. A verifier, viewer, or bundle consumer MUST NOT treat proof that content was generated by a known system, pipeline, or signer as equivalent to proof that a represented person genuinely authored, endorsed, or behaviorally originated that content.

### [F8] Failsafe Interpretation Rule
**Confidence:** high
**Reference:** Section 15, lines 478-480
**Content:** In cases of ambiguity, a compliant implementation MUST prefer the safer interpretation when determining whether an operation is identity-sensitive. Where uncertainty remains unresolved, the implementation MUST surface that uncertainty to authorized reviewers and MUST NOT silently downgrade an identity-sensitive workflow to an ordinary provenance workflow.

### [F9] Default-Deny Enumerations
**Confidence:** high
**Reference:** Default Prohibitions, lines 276-284
**Content:** Unless an explicit approved policy says otherwise, Rosetta should default-deny: undeclared high-fidelity simulation of living persons; invisible cross-context tracking using cognitive fingerprints; autonomous use of person models for persuasion optimization; export of person-model artifacts to uncontrolled environments; and use of personhood provenance for doxxing, harassment, or coercive targeting.

### [F10] Cross-Platform Identity Linkage as Identity-Sensitive Even When Sources Are Isolated Non-Sensitive
**Confidence:** high
**Reference:** Section 9, lines 409-414
**Content:** A compliant implementation MUST treat cross-platform or cross-corpus identity linkage as identity-sensitive even when each individual source appears non-sensitive in isolation. Linkage confidence, uncertainty, and contestability should be exposed rather than presenting inferred same-person conclusions as categorical fact.

### [F11] Viewer Must Not Collapse Identity States Into Single "Verified" Indicator
**Confidence:** high
**Reference:** Section 12, lines 456-461
**Content:** A compliant viewer or downstream consumer MUST be able to distinguish: authentic person-originated content, system-generated content with ordinary provenance, system-generated content calibrated on a person corpus, simulated or impersonation-risk content, and unresolved or contested identity claims. A compliant implementation MUST NOT collapse these states into a single "verified" or "authentic" indicator.

### [F12] Evaluation Metrics — Identity Risk, Governance, and Safety
**Confidence:** high
**Reference:** Evaluation Metrics, lines 285-313
**Content:** Three metric categories are specified beyond ordinary provenance and truth metrics. Identity Risk Metrics: impersonation similarity score, false attribution rate, cross-corpus reidentification rate, hidden identity linkage rate, disclosure omission rate. Governance Metrics: blocked identity-sensitive action rate, unauthorized person-model creation attempts, policy override frequency, time-to-revoke unsafe person-model artifacts, audit completeness for identity-sensitive runs. Safety Metrics: deceptive simulation success in red-team trials, resistance to style-cloning prompts, robustness of continuity proofs, reviewer agreement on identity-risk classification.

## Issue Candidates

### [GAP-001] Guard Layer Missing Identity-Sensitive Operation Classification
**Priority:** P1
**Description:** The Guard/EntAffirm layer lacks identity-sensitive operation classification. The addendum requires that any operation involving identity-grade signals (cognitive fingerprints, stylometric traces, behavioral signatures, cross-modal identity linkages) must be routed through stricter verification and approval paths. No current implementation of the Guard layer classifies identity-sensitive operations or enforces elevated authorization controls. This is a protocol-level gap: without Guard-level classification, no downstream component can reliably apply the identity policy classes.

### [GAP-002] No Simulation Disclosure Attestation Receipt Type
**Priority:** P1
**Description:** Rosetta's RRP receipt vocabulary lacks the simulation disclosure attestation family (rrp:simulation.disclosure_attestation) and the rrp:impersonation.risk_assessment receipt type specified in the addendum. Without typed attestation receipts for simulation events, there is no auditable record of when content was calibrated on, inspired by, or simulating a real person's corpus — making disclosure enforcement and auditor reconstruction impossible.

### [GAP-003] No Person-Model Retention or Expiry Semantics
**Priority:** P1
**Description:** Rosetta currently has no defined retention classes or expiry semantics for person-model artifacts, cognitive fingerprints, or identity-sensitive derived features. The addendum (Section 11) mandates that compliant implementations MUST NOT retain such artifacts indefinitely by default and MUST define conditions for renewal, revocation, archival, secure deletion, and downstream propagation constraints. Absent these semantics, person models persist indefinitely by default — in direct conflict with the addendum's default-deny posture.

### [GAP-004] Viewer Collapses Content Authenticity and Personhood Authenticity Into a Single Indicator
**Priority:** P2
**Description:** The addendum (Section 12) explicitly requires that a compliant viewer MUST be able to distinguish between authentic person-originated content, system-generated content with ordinary provenance, system-generated content calibrated on a person corpus, simulated or impersonation-risk content, and unresolved or contested identity claims — and MUST NOT collapse these into a single "verified" or "authentic" indicator. Current bundle viewers do not expose this distinction, making it impossible for downstream consumers to assess personhood provenance without out-of-band inspection.

### [GAP-005] Missing Cross-Corpus Correlation Controls
**Priority:** P2
**Description:** The addendum (Section 9) requires that cross-platform or cross-corpus identity linkage be treated as identity-sensitive even when individual sources appear non-sensitive in isolation. Rosetta currently has no policy controls preventing invisible cross-context tracking using cognitive fingerprints or quasi-biometric signals. This is especially acute because the threat class (Invisible Tracking) is specifically about treating linguistic patterns as quasi-biometric signals for persistent surveillance — a capability that compounds silently unless explicitly gated.
