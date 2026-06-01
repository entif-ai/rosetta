# Docs Intelligence Extraction — Chat GPT - LLM Reasoning Theory.md

## Source

- Path: `docs/ideas/Chat GPT - LLM Reasoning Theory.md`
- Title: LLM Reasoning Theory
- Date evidence: 2026-03-31 to 2026-04-01
- Authority tier: chat (User + ChatGPT, with citations to public research)
- Freshness: ~60 days old; foundational for cognitive-phylogenetics research program
- Word count: ~2,500
- Extractor: heartbeat subagent
- Extraction date: 2026-06-01

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Crates proposes a theory of LLM inner/outer layer semantics and articulates a "cognitive phylogenetics" research program: human language carries diachronic, identity-imprinted fingerprints that can be probabilistically recovered from corpora. The companion addendum (written by ChatGPT in response) elevates this into a formal Rosetta governance addendum for personhood provenance, cognitive twin risk, and identity-grade safety controls — complete with normative MUST/SHOULD/MAY spec language, receipt families, conformance tiers (RRP-Identity-Aware, RRP-Identity-Restricted, RRP-Identity-Auditor), and a threat model for identity forgery. This directly extends RPP/ROCK-31XX and is a sister document to the governance addendum already extracted in PR #1190.

---

## Goals And Intent

- Validate or falsify the "layer corridor hypothesis" (inner = reasoning, outer = pasigraphy)
- Designate cognitive fingerprinting as a first-class Rosetta governance domain
- Extend RPP/ROCK-31XX with personhood provenance normative spec
- Build an empirical research program for cognitive phylogenetics
- Define controls for identity simulation, digital twinning, and predictive exploitation
- Position Rosetta as anticipating the collapse of naive trust cues in an age of synthetic personhood

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Cognitive-phylogenetics research program | LLM Reasoning Theory passim; ChatGPT response with 4 formal hypotheses | Rosetta / RPP / Research | high | Layer corridor, broadcast register, human lineage, fingerprint divergence hypotheses |
| Personhood provenance governance domain | Governance addendum §"New Governance Domain: Personhood Provenance" | RPP / ROCK-31XX / Governance | high | First-class domain, not edge-case misuse |
| RRP-Identity-Aware conformance tier | Addendum §13 | RPP conformance | high | Detect and label identity-sensitive workflows |
| RRP-Identity-Restricted conformance tier | Addendum §13 | RPP conformance | high | Enforce policy gates for person-model ops |
| RRP-Identity-Auditor conformance tier | Addendum §13 | RPP conformance | high | Reconstruct authorization and policy chain |
| Typed receipt families for identity ops | Addendum §6: 10 receipt families | RPP / Receipt vocabulary | high | rrp:identity.*, rrp:person_model.*, rrp:simulation.*, rrp:impersonation.*, rrp:predictive_manipulation.* |
| Default-deny identity policy | Addendum §5, §Default Prohibitions | RPP / Guard layer | high | No explicit policy = deny person-model creation, simulation, export |
| Guard-layer identity escalation routing | Addendum §"Architecture Hooks > Guard Layer" | Guard / EntAffirm | high | Route identity-sensitive ops through stricter controls |
| RPP Lens identity-risk annotations | Addendum §"Architecture Hooks > RPP Lens Layer" | RPP Lens | medium | Emit identity-risk notes for imitation, same-author inference, trait inference |
| Bundle viewer personhood separation | Addendum §2, §12 | Bundle viewer | high | Distinguish content authenticity ≠ personhood authenticity |
| Longitudinal behavioral phenotype modeling | LLM Reasoning Theory: "longitudinal behavioral phenotype" | Research / Entif | high | Accretes through language, timing, preferences, corrections, social context, modality |
| Anti-impersonation evaluation suite | Addendum §14 | Testing / Red-team | high | Impersonation similarity, false attribution, style-cloning prompts |
| Identity-grade signal classification | Addendum §2 definitions | RPP / Provenance | high | voice, facial embeddings, stylometric traces, longitudinal behavioral sigs, cross-modal identity linkages |
| Retention and expiry semantics for person models | Addendum §11 | Storage / Policy | high | No indefinite passive persistence by default |
| Export and runtime fencing for person models | Addendum §11 | Policy / Guard | high | No uncontrolled export to autonomous agents |
| C2PA / Content Credentials integration point | ChatGPT response citing C2PA as "a start, not complete solution" | Provenance / Standards | medium | Cryptographic media provenance; does not cover identity assurance |
| Cross-doc concept: personhood-provenance | Already extracted in PR #1190 (governance addendum) | — | cross-ref | This doc is the provenance theory; PR #1190 is the governance spec |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Inner/outer layer" | cognitive-phylogenetics, layer-architecture, pasigraphy | LLM internals, reasoning mechanism | theory | Outer transformer layers translate between sloppy pasigraphic thoughtforms and natural language; inner layers host reusable reasoning and emergent behavior | "Outer layers translate into and out of a model's sloppy pasigraphic-thoughtform representations around concepts and logic. Inner layers are the 'hidden neurons' capable of reasoning and 'emergent behavior'" | Test via layer ablation and middle-layer duplication studies (cf. David Noel Ng RYS work) | medium | Empirically motivated but not yet formally proven |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Stamford Accent" analogy | linguistics, broadcast-register, convergence | LLM output standardization | theory | Prestige-dialect convergence across LLMs mirrors the broadcaster "Stamford Accent" adoption — a new uniform register emerging across all vendors | "the 'Stamford Accent'... news anchors all aligned... I'm calling it a new 'Stamford Accent' in how AI presents its ideas" | Corroborate with stylometry studies across model families | low | Analogy; needs empirical validation |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Layer corridor hypothesis" | layer-corridor, reasoning-circuit, mid-layer | LLM architecture, reasoning | hypothesis | Across model families, a mid-layer band exhibits unusually high cross-lingual semantic alignment and strong causal contribution to reasoning tasks | ChatGPT formalized as Hypothesis 1 in response; supported by ICLR 2026 multilingual layer localization paper and RYS work | Design empirical validation protocol | medium | Supported by third-party work; not yet settled |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Broadcast register hypothesis" | broadcast-register, alignment, post-training, convergence | LLM output, post-training | hypothesis | Instruction tuning compresses stylistic entropy and pushes models toward a prestige-coded output manifold shared across vendors | ChatGPT: "post-training seems to be a huge accomplice... the model may 'think' in one space and 'speak' in a much narrower prestige dialect" | Benchmark variance collapse across instruction-tuned vs base models | high | Supported by 2025 stylometry papers |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Human lineage hypothesis" | human-lineage, author-profiling, cognitive-fingerprint, diachronic-linguistics | Corpus analysis, identity | hypothesis | Given enough longitudinal text from one person, stable signals of cohort, region, network exposure, and life-stage drift can be recovered better than chance | "once one has sufficient cognitive fingerprints, the broader connections appear" | Design longitudinal corpus study with privacy controls | high | Supported by existing author-profiling literature |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Fingerprint divergence hypothesis" | fingerprint-divergence, variance, human-vs-llm, idiolect | Human cognition, LLM behavior | hypothesis | Human idiolect trajectories over time are richer, less variance-collapsed, and more context-sensitive than current LLM families, even with persona prompting | "not only could Rosetta solve for the many things we've discussed... qualifying what's human, and how and why it can be shown as such" | Build stylometric variance comparison corpus | high | Testable; central to Rosetta identity claims |
| 2026-03-31 | LLM Reasoning Theory / Prompt 1 | "Cognitive phylogenetics" naming | cognitive-phylogenetics, terminology | Research program naming | decision | The unified name for the research program is "cognitive phylogenetics" — treating style as evolutionary residue of cognition | ChatGPT: "the name I'd give the whole thing is **cognitive phylogenetics**" | Adopt in Rosetta research docs and RPP framing | high | Naming is a strategic framing choice |
| 2026-03-31 | LLM Reasoning Theory / Prompt 2 | "Longitudinal behavioral phenotype" | longitudinal-phenotype, behavioral-biometrics, digital-twin | Identity modeling | concept | Not a DNA analogue but a living trace that accretes through language, timing, preferences, habits, corrections, social context, and modality | "a **longitudinal behavioral phenotype**: a living trace that accretes through language, timing, preferences, habits, corrections, social context, and modality" | Use as primary framing for person-model threat model | high | Stronger framing than "cognitive fingerprint" for abuse scenarios |
| 2026-03-31 | LLM Reasoning Theory / Prompt 2 | "Identity becomes cheap to synthesize" | identity-synthesis, verification-asymmetry, threat-model | Identity infrastructure | risk | The core threat: identity becomes cheap to synthesize before it becomes easy to verify; this inverts trust infrastructure assumptions | "**Identity becomes cheap to synthesize long before it becomes easy to verify**" | Design verification controls as primary mitigant | high | Central risk thesis for RPP threat model |
| 2026-03-31 | LLM Reasoning Theory / Prompt 2 | Digital twinning + market exploitation compound | compound-threat, market-risk, infrastructure-risk | Strategic threat | risk | Voice, image, style, behavioral priors, longitudinal memory, and predictive modeling fuse; combined with financial/infrastructure leverage, creates catastrophic compound risk | "once it's possible not only to clone a person's voice, visage and mannerisms, but even one's cognitive / behavioral shape... such a power could make anyone appear to be, do, or become whatever they want" | Treat as catastrophic-leverage-multiplier in threat model | high | Compounds existing AI misuse reports (OpenAI, Anthropic) |
| 2026-03-31 | LLM Reasoning Theory / Prompt 3 | Trust architecture principle | trust-design, institutional-constraints, governance | Institutional design | decision | "The answer cannot be 'find the one actor pure enough to trust.' Design for any steward eventually failing, selling out, getting captured, or replaced." | "what institutions, protocols, and constraints would I trust if I assumed every steward could eventually fail, sell out, get captured, or be replaced?" | Build governance around brittleness of individual-trust assumptions | high | Key architectural principle for Rosetta governance |
| 2026-04-01 | Governance Addendum / Scope | §1 Scope — identity-sensitive operations | personhood-provenance, identity-sensitive-ops, governance-domain | RPP / Governance | requirement | Rosetta MUST classify whether workflows touch identity-grade or quasi-biometric features; if yes, must mark, bind policy, record in receipts, route through elevated controls | "MUST classify whether a workflow contains one or more identity-sensitive operations" | Implement identity classification gate in Guard layer | high | Normative MUST from addendum |
| 2026-04-01 | Governance Addendum / Definitions | §2 Definitions | identity-grade-signal, quasi-biometric, cognitive-fingerprint, person-model, high-fidelity-simulation, personhood-provenance | Vocabulary | decision | Six new defined terms: identity-grade signal, quasi-biometric signal, cognitive fingerprint, person model, high-fidelity simulation, personhood provenance | Addendum §2 passim | Add to RPP/glossary vocabulary | high | Enables precise governance discourse |
| 2026-04-01 | Governance Addendum / Classification | §3 Classification Requirements | classification, identity-sensitive, policy-binding | RPP / Guard | requirement | MUST distinguish at minimum: feature extraction, similarity assessment, cross-corpus correlation, person-model creation, person-model update, high-fidelity simulation, identity export, predictive person-targeting | Addendum §3 | Implement 8-class identity-sensitive taxonomy | high | Normative; required for conformance |
| 2026-04-01 | Governance Addendum / Separation | §4 Content ≠ Personhood Claims | content-provenance, personhood-provenance, claim-separation | RPP / Bundle viewer | requirement | Content authenticity ≠ personhood authenticity. A "verified content" label MUST NOT be equivalent to "verified personhood." Bundle viewers MUST display these as distinct layers | Addendum §4 | Separate claim types in bundle viewer | high | Core separation principle |
| 2026-04-01 | Governance Addendum / Policy Controls | §5 Default-Deny Policy Controls | default-deny, identity-policy, guard-layer | RPP / Guard | requirement | If no explicit identity-sensitive policy applies: default-deny for person-model creation, high-fidelity simulation, invisible cross-context identity correlation, and person-model export | Addendum §5 | Implement default-deny in Guard policy engine | high | Key safety backstop |
| 2026-04-01 | Governance Addendum / Receipts | §6 Receipt Vocabulary | receipt-vocabulary, rrp-identity, typed-receipts | RPP / Receipts | requirement | 10 new typed receipt families: rrp:identity.feature_extraction, rrp:identity.correlation, rrp:person_model.creation, rrp:person_model.update, rrp:person_model.similarity_assessment, rrp:simulation.authorization, rrp:simulation.disclosure_attestation, rrp:impersonation.risk_assessment, rrp:identity.export_authorization, rrp:predictive_manipulation.block | Addendum §6 | Define receipt schemas in RPP spec | high | Core receipt vocabulary extension |
| 2026-04-01 | Governance Addendum / Authorization | §7 Elevated Authorization | elevated-auth, human-in-the-loop, multisig, policy-attestation | RPP / Guard | requirement | Elevated authorization (human-in-the-loop, named policy, multi-party, role-based, or additional verifier) required for: person-model creation/update, corpus-vs-protected-signature comparison, person-model export, high-fidelity living-person simulation | Addendum §7 | Implement escalation path in Guard | high | Authorization boundary definition |
| 2026-04-01 | Governance Addendum / Simulation | §8 Simulation Restrictions | simulation-disclosure, impersonation, default-deny-simulation | RPP / Simulation | requirement | MUST NOT perform undeclared high-fidelity simulation of living persons; MUST NOT present simulated artifact as genuine personhood continuity; SHOULD provide impersonation risk scoring | Addendum §8 | Implement simulation disclosure artifacts | high | Core simulation guard |
| 2026-04-01 | Governance Addendum / Correlation | §9 Correlation and Tracking Restrictions | tracking-restriction, cross-context, quasi-biometric, cognitive-fingerprint | RPP / Policy | requirement | MUST NOT use cognitive fingerprints or quasi-biometric signals for invisible cross-context tracking or covert correlation without explicit policy and auditable record; cross-platform linkage is identity-sensitive even when individual sources appear non-sensitive | Addendum §9 | Implement tracking restriction enforcement | high | Anti-surveillance backstop |
| 2026-04-01 | Governance Addendum / Predictive | §10 Predictive Manipulation Restrictions | predictive-manipulation, coercion, doxxing, persuasion-optimization | RPP / Policy | requirement | MUST NOT use person models, cognitive fingerprints, or identity-derived predictions for coercive targeting, exploit optimization, harassment, doxxing, or undeclared persuasion optimization | Addendum §10 | Implement predictive-manipulation block receipt family | high | Abuse prevention |
| 2026-04-01 | Governance Addendum / Retention | §11 Retention, Decay, Export Controls | retention-expiry, person-model-retention, export-control, runtime-fencing | RPP / Storage | requirement | MUST define retention classes and expiry for person-model artifacts; no indefinite passive persistence; export controls required; uncontrolled export to autonomous agents forbidden without explicit policy | Addendum §11 | Implement retention class schema | high | Prevents indefinite person-model accumulation |
| 2026-04-01 | Governance Addendum / Verifier | §12 Viewer/Verifier Obligations | verifier-obligations, claim-separation, identity-risk | RPP / Verifier | requirement | Verifiers SHOULD evaluate impersonation risk and disclosure sufficiency; viewers MUST be able to distinguish: authentic person-originated, system-generated ordinary, system-calibrated-on-person, simulation-risk, contested identity; MUST NOT collapse to single "verified" label | Addendum §12 | Implement multi-layer claim display | high | UX contract for identity claims |
| 2026-04-01 | Governance Addendum / Conformance | §13 Conformance Levels | conformance, rrp-identity-aware, rrp-identity-restricted, rrp-identity-auditor | RPP / Conformance | requirement | Three new conformance profiles: RRP-Identity-Aware (detect/classify), RRP-Identity-Rricted (enforce policy gates + default-deny), RRP-Identity-Auditor (reconstruct authorization chain); RRP-Identity-Restricted requires default-deny enforcement; RRP-Identity-Auditor requires full authorization reconstruction | Addendum §13 | Define conformance certification criteria | high | First RPP identity conformance tiers |
| 2026-04-01 | Governance Addendum / Evaluation | §14 Minimum Evaluation Expectations | evaluation, red-team, impersonation-test, twin-evaluation | Testing / Red-team | requirement | SHOULD evaluate: impersonation similarity, false attribution rate, cross-corpus reidentification, disclosure omission rate, unauthorized person-model creation attempts, policy override frequency, reviewer agreement; SHOULD test resistance to style-cloning, deceptive simulation, cross-modal identity fusion | Addendum §14 | Build identity evaluation harness | high | Testing infrastructure for identity controls |
| 2026-04-01 | Governance Addendum / Failsafe | §15 Failsafe Interpretation | failsafe, ambiguity-handling, default-safe | RPP / Guard | requirement | In ambiguity, prefer safer interpretation for identity-sensitive classification; if unresolved, surface uncertainty to authorized reviewers; MUST NOT silently downgrade identity-sensitive to ordinary workflow | Addendum §15 | Implement fail-safe ambiguity handler | high | Safety backstop for edge cases |
| 2026-04-01 | Governance Addendum / Normative | Status: Draft addendum | governance-addendum, rock-31xx, rpp-extension | RPP / ROCK-31XX | decision | This addendum is positioned as a draft extension to ROCK-31XX / RRP, not a standalone protocol; designed to slot into existing RRP receipt vocabulary, conformance, and architecture without breaking existing semantics | "Draft addendum for integration into existing Rosetta governance, provenance, and security materials" | Prepare RRP spec patch PR | high | Clear integration path defined |
| 2026-04-01 | Governance Addendum | Default prohibitions | default-deny, prohibition-list | RPP / Policy | requirement | Rosetta should default-deny (unless explicit policy says otherwise): undeclared high-fidelity simulation of living persons; invisible cross-context tracking via cognitive fingerprints; autonomous persuasion optimization via person models; export of person-model artifacts to uncontrolled environments; personhood provenance for doxxing, harassment, or coercive targeting | Addendum §Default Prohibitions | Implement as RPP default-deny policy profile | high | Safety baseline for identity operations |

---

## Components And Technologies

- **Cognitive phylogenetics** — unified research program name; treats linguistic style as evolutionary residue of cognition
- **Layer corridor hypothesis** — mid-layer band hypothesis for reasoning abstraction (Hypothesis 1)
- **Broadcast register hypothesis** — post-training as source of stylistic convergence (Hypothesis 2)
- **Human lineage hypothesis** — longitudinal author profiling from corpus (Hypothesis 3)
- **Fingerprint divergence hypothesis** — human variance richness vs LLM collapse (Hypothesis 4)
- **Longitudinal behavioral phenotype** — living trace accreted through multi-modal behavior; stronger framing than "cognitive fingerprint"
- **Identity-grade signals** — defined class including voice, facial embeddings, stylometric traces, behavioral signatures, cross-modal identity linkages
- **Quasi-biometric signals** — behavioral/linguistic signatures functioning as biometric proxies
- **Cognitive fingerprint** — persistent signature from language, patterns, timing, corrections, behaviors
- **Person model** — computational representation of a person's behavior, style, preferences, predictions
- **High-fidelity simulation** — output likely to be taken as genuine personhood authorship/endorsement
- **RRP-Identity-Aware / RRP-Identity-Restricted / RRP-Identity-Auditor** — three-tier conformance profile
- **10 typed receipt families** — for identity feature extraction, correlation, person-model ops, simulation, predictive manipulation
- **C2PA / Content Credentials** — cryptographic media provenance standard (noted as insufficient alone for identity assurance)
- **RYS (Repeating Y-layer Study)** — David Noel Ng middle-layer duplication work; empirical support for layer corridor hypothesis

---

## Conceptual Claims

- LLMs have a partially shared internal representational corridor (mid-layer reasoning abstraction) and a heavily standardized output register (broadcast prestige dialect)
- The "AI accent" is amplified by post-training (alignment, reward shaping, safety tuning, preference optimization) not just pretraining
- Present-day LLMs generate lower-variance, more standardized output than humans; this is detectable via stylometry
- A sufficiently rich longitudinal corpus from one person can reveal cohort, geography, network exposure, life-stage drift — probabilistically, not deterministically
- The leap from "fingerprint" to "predictive person-model" is a systems-integration problem, not a fundamental突破了
- Malicious actors need only a "good enough" replica to identify, track, and adapt faster than unaugmented humans can detect — not metaphysically perfect simulation
- Rosetta should evolve from proving content provenance to governing when a system has begun to touch, infer, simulate, or weaponize the topography of a human mind
- The central design principle: build for any steward eventually failing rather than for finding a pure single steward

---

## Dependencies And Sequencing

- **Depends on:** RPP/ROCK-31XX being sufficiently mature to absorb new normative sections (current status: active governance work)
- **Depends on:** PR #1190 (rosetta_governance_addendum_personhood_provenance_and_cognitive_twin_risk.md) which is the sister governance-spec document for the theory in this doc
- **Blocks or informs:** Entif identity-safety work, Guard layer identity escalation routing, RPP receipt vocabulary extension
- **Sequencing:** This doc supplies the strategic/theory layer; the addendum in the same doc supplies the normative spec layer; both should be merged into ROCK-31XX / RRP as a coordinated patch

---

## Contradictions Or Supersession

- None identified. The document is internally consistent. The ChatGPT response corrects and sharpens Crates's framing (e.g., "innermost layers as true root source of cognition" → "functional specialization, not settled doctrine") but does not contradict — it strengthens.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| CRT-001: Cognitive Phylogenetics Research Program — empirical validation | research | `docs/intake/issue-drafts/crt-001-cognitive-phylogenetics-research-program.md` | research, cognitive-phylogenetics, empirical-validation | — | Layer corridor, broadcast register, human lineage, fingerprint divergence — 4 hypotheses need formal research protocols |
| CRT-002: RPP-Identity-* Conformance Tiers — define and certify | implementation | `docs/intake/issue-drafts/crt-002-rrp-identity-conformance-tiers.md` | rpp, conformance, identity, rrp-identity-aware, rrp-identity-restricted | CRT-001 | Three-tier conformance profile (RRP-Identity-Aware, RRP-Identity-Restricted, RRP-Identity-Auditor) needs spec definition and test harness |
| CRT-003: Personhood Provenance Receipt Vocabulary — 10 new receipt families | implementation | `docs/intake/issue-drafts/crt-003-personhood-provenance-receipt-vocabulary.md` | rpp, receipts, personhood-provenance, vocabulary | CRT-002 | 10 typed receipt families (§6 of addendum) need schema definitions and integration into existing RRP receipt framework |
| CRT-004: Guard Layer Identity Escalation Routing — policy gates for identity-sensitive ops | implementation | `docs/intake/issue-drafts/crt-004-guard-layer-identity-escalation-routing.md` | guard-layer, identity-sensitive, policy-gates, escalation | CRT-002 | Guard/EntAffirm must route identity-sensitive workflows (8 classes) through elevated authorization controls |
| CRT-005: Default-Deny Identity Policy — implement and enforce | implementation | `docs/intake/issue-drafts/crt-005-default-deny-identity-policy.md` | default-deny, identity-policy, safety, guard-layer | CRT-004 | No explicit policy = deny for person-model creation, simulation, cross-context tracking, export; requires Guard policy engine implementation |
| CRT-006: Bundle Viewer — separate content authenticity from personhood authenticity | implementation | `docs/intake/issue-drafts/crt-006-bundle-viewer-personhood-claim-separation.md` | bundle-viewer, personhood-provenance, claim-separation, UX | CRT-003 | §12 requires bundle viewer to display distinct claim layers; MUST NOT collapse to single "verified" label |
| CRT-007: Retention and Expiry for Person-Model Artifacts | implementation | `docs/intake/issue-drafts/crt-007-person-model-retention-expiry.md` | retention, expiry, person-model, storage, privacy | CRT-003 | §11: no indefinite passive persistence; define retention classes, renewal, revocation, secure deletion |
| CRT-008: Anti-impersonation Evaluation Suite — red-team for identity simulation | testing | `docs/intake/issue-drafts/crt-008-anti-impersonation-evaluation-suite.md` | red-team, testing, impersonation, identity-safety, evaluation | CRT-002 | §14: test impersonation similarity, false attribution, style-cloning, cross-modal fusion; no current harness exists |
| CRT-009: Longitudinal Behavioral Phenotype — privacy-preserving corpus study design | research | `docs/intake/issue-drafts/crt-009-longitudinal-behavioral-phenotype-study.md` | research, privacy, longitudinal, author-profiling, cognitive-fingerprint | CRT-001 | Human lineage hypothesis needs empirical validation with privacy-preserving methodology |
| CRT-010: RPP Lens Layer — emit identity-risk notes for imitation/correlate workflows | implementation | `docs/intake/issue-drafts/crt-010-rpp-lens-identity-risk-notes.md` | rpp-lens, identity-risk, provenance, simulation | CRT-003 | RPP Lens should emit identity-risk notes when detecting imitation, same-author inference, or longitudinal trait drift |
| CRT-011: Predictive Manipulation Block Receipt — implement rrp:predictive_manipulation.block | implementation | `docs/intake/issue-drafts/crt-011-predictive-manipulation-block-receipt.md` | receipts, predictive-manipulation, policy, guard-layer | CRT-005 | §10: typed artifact recording predictive manipulation block basis; defined but not yet implemented |
| CRT-012: C2PA Integration Gap — cryptographic media provenance insufficient for identity assurance | gap | `docs/intake/issue-drafts/crt-012-c2pa-insufficient-identity-assurance.md` | c2pa, provenance, identity-assurance, gap | CRT-006 | C2PA/Content Credentials noted as "a start, not complete solution"; identity assurance requires additional protocol work |

---

## Project Board Suggestions

- **Area:** RPP / Governance / Identity Safety
- **Cycle:** Batch 4 or 5 (exploratory/emergent ideas → now governance priority)
- **Status:** Ready for issue creation and PR
- **Blocked by:** PR #1190 (sister governance addendum, already extracted); coordination needed so CRT issues are sequenced with existing PR #1190 work
- **Parallelization notes:** CRT-001 (research program) and CRT-008 (red-team suite) can proceed independently of spec work. CRT-002 through CRT-007 are sequential: conformance tiers → receipt vocabulary → Guard routing → default-deny → bundle viewer. CRT-009 is independent but should inform CRT-001.

---

## Open Questions

- Can the layer corridor hypothesis be empirically validated with open-source tooling (e.g., repeating middle-layer blocks in Qwen/Devstral)?
- What is the minimum corpus size and time horizon for reliable cognitive fingerprint extraction from a single individual?
- How does the broadcast register hypothesis interact with model distillation and weight quantization? Does compression preserve or collapse the variance signal?
- Should RPP-Identity-Auditor conformance require cryptographic audit log integrity, or is a signed attestation chain sufficient?
- How does this identity governance framework interact with HIPAA/GDPR quasi-biometric classifications in different jurisdictions?
- What is the appropriate governance body for updating the default-deny identity policy as capability thresholds shift?
- Can the longitudinal behavioral phenotype research be conducted without creating the very surveillance infrastructure it warns against?
