# 2026-06-05 — Email-driven Security Defenses + Rosetta Risk Middleware Integration

## Metadata
- **Source:** docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Boundary
This artifact is docs-intelligence output for planning and orchestration. Not runtime ingestion.

## Summary
A comprehensive design conversation covering email-driven security defenses, modular risk middleware architecture, ensemble classifier design (Bayesian + embedding + SVM + tree models), social-engineering risk scoring, and how these workflows integrate as Rosetta packs (rrp.*, truthlint.*, risk.*, identity.*, gov.*, interop.*). Also covers training strategy for Rosetta-native models via codec-and-alignment rather than scratch pretraining. Notable exchange on avoiding condescending framing when disagreeing with user input.

## Findings

### [F1] Email Security Architecture — Seven-Layer Pipeline
**Confidence:** high
**Reference:** Full document, architectural diagram
**Content:** Email security pipeline comprises: (1) Mail ingress/provenance gate with SPF/DKIM/DMARC, allowlists, GPG verification; (2) Dual representation with pristine original + normalized analysis views; (3) Multi-signal classification (Bayesian, heuristics, anomaly, sensitivity); (4) Taint propagation marking email-derived content as untrusted through all downstream stages; (5) LLM extraction in read-only sandbox (gVisor/Firecracker), schema-constrained output, no tools/memory writes; (6) Policy engine (OPA) as actual gatekeeper outside LLM; (7) Draft/approve/execute ladder for email-originated requests. Key principle: provenance and content classification do not answer authorization.

### [F2] Bayesian Quarantine Engine — Role and Limitations
**Confidence:** high
**Reference:** "On your Bayesian idea specifically" section
**Content:** Bayesian quarantine engine seeded on pre-2020 professional corpus + public attack corpora (Pliny the Liberator-style) can be highly effective as a classifier-and-routing layer for commodity attacks, but should not be trusted as sole authority for email-originated privileged actions. Attackers optimize against detectors; most dangerous messages resemble legitimate business instructions; public repos are biased toward explicit attacks; fresh updates don't close zero-day gap. The right design: Bayesian inference for routing/scoring decisions; external policy + approval logic for authorization.

### [F3] Ensemble Classifier Stack — Multi-Model Architecture
**Confidence:** high
**Reference:** "concrete ensemble design" section
**Content:** Four-tier ensemble: (Tier 1) cheap high-recall detectors — multinomial Bayes, logistic regression on sparse TF-IDF features, rule/signature engine for known exploit patterns; (Tier 2) semantic classifiers — embedding+SVM for paraphrase robustness, embedding+gradient-boosted trees for nonlinear metadata interactions, nearest-neighbor prototype similarity against benign/malicious exemplar banks; (Tier 3) graph/meta anomaly — isolation forest/one-class SVM on sender-thread patterns. Calibration via Platt scaling or isotonic regression. Output is structured risk vector, not narrative prose.

### [F4] Social-Engineering Risk Scoring — Separate Dimension from Prompt Injection
**Confidence:** high
**Reference:** "social engineering feature family" section
**Content:** Social engineering scoring is distinct from prompt-injection detection. Dimensions: urgency pressure, authority invocation, secrecy framing, artificial scarcity/deadline compression, procedural bypass language, reciprocity/manipulation, role impersonation, emotional destabilization, context borrowing, verification-suppression requests. Sources: Mitnick's Art of Deception, OWASP guidance, BEC corpora, government/institutional guidelines. Scoring feeds routing/policy independently from attack-family risk.

### [F5] Modular Content-Risk Middleware — Source-Agnostic Core
**Confidence:** high
**Reference:** "modular breakdown" and "generalized architecture" sections
**Content:** Reusable content-risk middleware layer applicable across email, repo skill markdown, forum posts, fetched web pages, documents. Common pattern: untrusted content → normalize → enrich with provenance/context → score across multiple risk dimensions → route by policy → downstream model consumption. Ingress adapters (email/repo/forum/web/docs) produce common normalized content objects; scorer packs are source-agnostic; policy adapters vary by use case while reusing same scoring outputs. Key abstraction: never let downstream models consume raw untrusted content directly — always pass normalized representation + bounded metadata + risk scores + policy constraints + taint state.

### [F6] Skill Markdown Screening — Same Properties as Risky Email
**Confidence:** high
**Reference:** "skill/repo markdown screening" section
**Content:** Instruction markdown has same risk properties as email: natural language mixed with operational directives, ambiguity between description and instruction, potential authority widening, downstream consequences if ingested naïvely. Screening module should score: attempts to redefine system boundaries, instructions to ignore host constraints, covert escalation language, hidden/encoded directives, unrestricted tool-use references, suspicious external fetch instructions, mismatch between claimed purpose and behavioral instructions.

### [F7] Rosetta Pack Namespace Architecture
**Confidence:** high
**Reference:** Pack namespace proposal sections
**Content:** Seven pack families proposed: rrp.* (receipts, bundles, provenance-pathing, verifier semantics — rrp.core, rrp.receipts, rrp.bundles, rrp.verifier, rrp.viewer, rrp.audit, rrp.incident); truthlint.* (claim extraction, assumption surfacing — truthlint.claims, truthlint.assumptions, truthlint.sources, truthlint.rewrites, truthlint.bundle_builder); risk.* (content-risk, SE-risk, provenance, anomaly, small-model suitability — risk.content, risk.social_engineering, risk.provenance, risk.anomaly, risk.small_model_suitability, risk.attack_family, risk.routing); ingress.* (source adapters — ingress.mail, ingress.repo_markdown, ingress.forum, ingress.web, ingress.document, ingress.attachment); identity.* (personhood provenance, correlation, simulation — identity.classification, identity.correlation, identity.person_model, identity.simulation, identity.export_controls, identity.viewer); gov.* (policy profiles, approval workflows, retention — gov.routing, gov.approvals, gov.retention, gov.export, gov.identity, gov.conformance); interop.* (external projections — interop.prov, interop.shacl, interop.bpmn, interop.dmn, interop.scxml, interop.cloudevents, interop.openapi).

### [F8] Rosetta-Native Model Training — Codec-and-Alignment Path
**Confidence:** high
**Reference:** Final sections on training strategy
**Content:** First Rosetta-native model is base model + projection head + disambiguator + bundle codec, not full scratch pretrain. Key alignment mechanism: prototype embeddings + orthogonal Procrustes alignment to map host model into Rosetta prototype space without full retraining. Training waves: (Wave 1) Rosetta-aware host model — structural tokens for bundle syntax, projector head, small adapters on output/selected attention layers, bundle emission and reading tasks; (Wave 2) Rosetta-refined post-training with D&P-generated candidate bundles, abstention examples, ambiguity-preserving examples; (Wave 3) Continued pretraining on mixed corpora. D&P becomes data refinery producing better pseudo-labels and bundle corpora. Foundation: locked Rosetta-native corpus including observation pairs, pasigram concept targets, tapestry objects, provenance-rich positive/negative examples.

### [F9] Three Canonical Deployment Lanes
**Confidence:** high
**Reference:** "three canonical deployment lanes" section
**Content:** (Lane 1) content-only provenance for TruthLint, claim provenance, scoring, web/email/forum screening using ordinary receipts, scoring packs, bundle viewer. (Lane 2) operational governance for enterprise workflows, agent outputs, approvals, audit trails, policy-gated actions — adds approval packs, DMN/BPMN projections, compliance receipts. (Lane 3) identity-sensitive provenance for stylometry, persona comparators, cognitive fingerprinting, same-author inference, simulation-risk — adds identity policy profile, guard/escalation path, simulation disclosure, stricter retention/export controls.

### [F10] Identity-Sensitive Operations Require Default-Deny Posture
**Confidence:** high
**Reference:** identity-sensitive add-on table, identity.* pack family
**Content:** Identity-sensitive workflows (stylometry, correlation, simulation) must be: classified, bound to identity policy profile, logged in receipts, routed through elevated authorization and verification controls. Content provenance must be separated from authorship evidence, identity continuity evidence, and simulation disclosure. Default-deny if policy profile absent. Extra receipt families: rrp:identity.feature_extraction, rrp:identity.correlation, rrp:person_model.creation, rrp:person_model.update, rrp:person_model.similarity_assessment, rrp:simulation.authorization, rrp:simulation.disclosure_attestation, rrp:impersonation.risk_assessment, rrp:identity.export_authorization, rrp:predictive_manipulation.block.

### [F11] Small-Model Suitability Scoring for Token Parsimony
**Confidence:** high
**Reference:** "downstream suitability scoring" section
**Content:** Additional scoring dimension: is content safe enough for a smaller model? does it need a stronger model with better refusal/parsing? does it need deterministic parser vs LLM? should it be truncated/segmented/rewritten before model exposure? Output: {content_risk, small_model_safe, requires_frontier_model, requires_rule_based_processing, requires_human_review}. Enables routing to small-model summarization lane for low-risk content while reserving frontier models for high-risk cases.

### [F12] Three-Layer Scoring Architecture
**Confidence:** high
**Reference:** "stacked risk model with three layers" section
**Content:** (Layer 1) lexical/statistical — Bayes, n-gram features, header/metadata heuristics, thread anomaly. (Layer 2) semantic — embeddings, SVM/logistic/tree ensemble over embedding vectors or reduced dimensions, similarity against benign/malicious corpora. (Layer 3) policy aggregation — combine scores, calibrate confidence, map to routes: summarize, extract-only, quarantine, approval-required.

## Issue Candidates

### [RSK-001] Risk Scoring — Missing Provenance Signal Integration
**Priority:** P2
**Description:** The ensemble classifier design includes metadata features (sender, domain, thread history) but there is no explicit integration point for external RBL/DNSBL reputation signals as provenance features. Should add: source IP/domain reputation, ASN/hosting-provider reputation, sender-domain age, HELO/EHLO anomalies, reverse DNS consistency to the provenance risk axis. This is a gap between the stated metadata feature list and the anti-spam infrastructure the user explicitly mentioned.

### [RSK-002] Risk Scoring — Social Engineering Literature Not Operationalized
**Priority:** P2
**Description:** User explicitly proposed using Mitnick's Art of Deception, government guidelines, and public social engineering handbooks as scoring inputs via SE-risk playbook heuristics, but the conversation only generates a feature family list without specifying: (a) how to convert literature into explicit feature rules, (b) benchmark/evaluation corpora derived from those sources, (c) labeling guidance for training. This is partially implemented intent — needs a concrete conversion methodology.

### [RSK-003] Rosetta Integration — No Implementation Path for Codec-and-Alignment
**Priority:** P1
**Description:** The Rosetta-native model training section describes codec-and-alignment (prototype embeddings + orthogonal Procrustes) as the first implementation step, but there is no concrete spec for: how to build the prototype bank of Rosetta concept/frame embeddings, what base model to use, how to handle the Procrustes alignment training loop, and what the bundle codec interface looks like. This is high-value but ungrounded — needs a technical implementation plan before any training can begin.

### [RSK-004] Identity.* Packs — No Authorization Chain Specification
**Priority:** P1
**Description:** The identity-sensitive workflow specification (person-model creation, correlation, simulation) calls for elevated authorization, named policy attestation, HITL or multi-party approval, but does not specify: what constitutes valid authorization, how policy signatures are validated, what the approval workflow looks like operationally, and how the governance log integrates with the receipt system. Default-deny without a concrete authorization chain is not implementable.

### [RSK-005] Content-Risk Middleware — No Schema for Bounded Structured Outputs
**Priority:** P2
**Description:** The architecture specifies that downstream agents should receive structured bounded outputs (not narrative prose), and the scoring packs produce risk vectors, but there is no canonical schema defining the exact shape of those outputs — what fields, what types, what calibration expectations. The risk.scorecard payload example exists but there is no formal schema that all scoring packs must conform to. Needed: JSON Schema for risk.scorecard, truthlint.claim, identity.sensitivity_classification, gov.policy_profile, rrp.bundle_profile as the conversation itself proposed but never delivered.