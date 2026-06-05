# 2026-06-05 — Tripwire Protocol — EntifAI

## Metadata
- **Source:** docs/governance/20250710 - Tripwire Protocol - EntifAI.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ChatGPT dialogue (2025-07-10) exploring Entif's provider strategy (OpenRouter vs ai-sdk-providers vs Cohere), enterprise dual-track deployment, and the novel "EntEthos" tripwire architecture. The document defines a privacy-preserving ethical firewall with DCP-inspired quorum validation, semantic risk graphs, trigger entropy scoring, and client-side + server-side ephemeral logging for rare catastrophic-harm events only. Introduces concepts of "sovereign personal" (EPS mode) vs "enterprise" (Guardian mode) deployment tracks. Positions Entif as ethical AGI that outcompetes unethical alternatives by delivering superior ROI while enforcing ethical constraints.

## Source
- **Path:** docs/governance/20250710 - Tripwire Protocol - EntifAI.md
- **Title:** Tripwire Protocol - Entif.ai
- **Date evidence:** 2025-07-10 (filename prefix)
- **Authority tier:** governance — strategic / architectural
- **Freshness:** mature — discussion concluded, protocol sketches exist
- **Word count:** ~15,341 (long conversation document)
- **Extractor:** heartbeat:tripwire (DI cycle 2026-06-05)
- **Extraction date:** 2026-06-05

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | OpenRouter vs ai-sdk-providers | provider-strategy, privacy, sovereignty, architecture | openrouter, ai-sdk-providers, abstraction-layer | decision | OpenRouter is useful for benchmarking and rapid prototyping but violates EPS principles (data passes through OpenRouter infra, non-transparent logging). Not suitable for core architecture. | "OpenRouter is excellent scaffolding, not cathedral stone." | Use OpenRouter for dev/QA lanes only; core architecture uses FOSS abstraction (ai-sdk-providers or custom router) | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Cohere positioning | provider-strategy, benchmark, embedding, enterprise | cohere, command-r-plus, embedding, rag | decision | Cohere is a competitor to Entif, not a vendor. Use for benchmarking against only. Open-weight Command R+ has non-commercial license for research; not suitable for productized Entif without negotiated terms. | "Entif will be a direct competitor to Cohere." | Use Cohere only as performance floor/accuracy baseline; do not build dependencies; self-host for production | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Enterprise dual-track strategy | enterprise-strategy, guardian-mode, roi, ethics | enterprise, dual-track, sovereign-personal, guardian-mode | decision | Entif serves enterprise clients via "Guardian Mode" — on-prem/deployed agents that optimize operations via anonymized behavioral archetypes, not employee surveillance. Deliver superior ROI + ethical constraints. If Entif doesn't serve them, a less ethical competitor will. | "We DO serve those customers. Without taking their business, they'll just solicit someone else's." | Build dual-track architecture supporting both EPS (personal) and Guardian (enterprise) modes; frame as ethical AGI outcompeting alternatives | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Tripwire ripcord requirement | tripwire, safety, ethical-firewall, intervention | tripwire, ripcord, live-classifier, ephemeral-logging | requirement | When a query suggests imminent catastrophic harm (murder, terrorism, mass violence), system must: detect in real-time, halt execution, log only that query (not history), escalate to emergency endpoint, preserve minimal record client-side + server-side. No ongoing surveillance. No traceback store. Only triggering query is preserved, encrypted, TTL-bound. | "No traceback store — we're not archiving the data, because that defeats all of the other privacy and security measures." | Implement client-side tripwire classifier before any inference/dispatch; ephemeral encrypted record only on trigger; TTL auto-shred | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Client-side anonymizer co-save requirement | tripwire, client-side, co-save, anonymizer | client-side-anonymizer, co-save, encrypted-record | requirement | When tripwire fires, client-side anonymizer must also save the encrypted record — not just server-side. Prevents single-point-of-failure in escalation. Must be designed to prevent exploitation by malicious actors (rate-limiting, cooldown, one-shot review, anti-spoofing via signing). | "When the tripwire fires, we need the client-side anonymizer to save JUST that record, too" | Add client-side encrypted cache to tripwire design; include rate-limit (max 1 per 10min per device), record signing with Entif client private key, TTL auto-shred | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | EntEthos protocol layer | entethos, protocol-layer, distributed-ethics | entethos, protocol-layer, quorum, distributed | technology | EntEthos — new protocol layer within Entif governing: tripwire signaling, multi-agent ethical validation, distributed escalation, quorum-bound access to trace data, irrefutable but untraceable verification. Treats moral escalation as cryptographic primitive. | "You are not just building the ethical AGI. You are inventing the first real ethics OS." | Define EntEthos as formal protocol spec; treat as foundational social technology beyond software feature | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | DCP-inspired quorum mechanism | dcp, quorum, anonymous-vote, cryptographic | dcp, quorum, anonymous-vote, homomorphic, threshold-signatures | technology | DCP-inspired mechanism: validators receive encrypted challenge, respond with blinded commitment (ring signatures / Shamir secret sharing / BLS threshold signatures), aggregated only if quorum reached. Reveals outcome without attributing votes. Prevents exposure of which validators flagged or confirmed. | "DCP-inspired signaling logic where multiple validators confirm without exposure" | Prototype DCP-style quorum vote using threshold cryptography; validate privacy properties before production | medium |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Semantic risk graph + trigger entropy | semantic-risk-graph, trigger-entropy, entropy-score | semantic-risk-graph, trigger-entropy, entropy-spike, explainable-detection | technology | Semantic risk graph: nodes = concepts, edges = relationships (temporal, causal, intent). Scoring for violent verb proximity to sensitive locations, first-person intent pronouns, future time indicators. Trigger entropy: query complexity vs baseline behavior. High entropy = sudden use of rare, tactical language. Combined score raises tripwire confidence, reduces false positives. | "Mapping between semantic risk graphs and trigger entropy" | Research/build semantic risk graph scoring layer; validate against false-positive rate before deployment | medium |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Multi-layered confirmation for tripwire | tripwire, multi-layer-confirmation, classifiers | tripwire, multi-layer, semantic-classifier, graph-signal, entropy-anomaly | requirement | Tripwire must pass at least 2 of 3: semantic threat classifier (LLM-based), contextual graph signal (rapid escalation in violent sentiment over time), entropy signature anomaly (info-dense tactical language inconsistent with growth trajectory). | "Must pass at least two of: Semantic threat classifier, Contextual graph signal, Entropy signature anomaly" | Implement 2-of-3 confirmation requirement; define threshold scores for each layer | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | User notification and due process | tripwire, user-notification, due-process | tripwire, user-notification, guardian-mode, dual-quorum | requirement | Where feasible and safe, user is alerted when tripwire fires: "Your recent input may indicate imminent danger to life. This has triggered a safety protocol." Optional modes: Strict (no triggers), Guardian (ripcord active), Dual Quorum (user can challenge/verify escalation). | "User Notification and Due Process (If Possible)" | Design user notification flow; make modes configurable per deployment context | medium |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | Anti-exploitation protections | tripwire, anti-exploit, rate-limit, spoofing-prevention | tripwire, anti-exploit, rate-limit, cooldown, anti-spoofing | risk | Tripwire must resist: malicious spam (rate-limit: max 1 fire per 10min per device), injection of dangerous queries to log others' data (detection is client-side, before dispatch), insider attacks on log store (dual-key encryption), record exfiltration (save only sanitized content + hash). | "figure out how to do that without opening up a vulnerability to being exploitable by malicious actors" | Implement explicit anti-abuse mitigations: cooldown, record signing, one-shot decrypt, client lockout on repeated fires | high |
| 2025-07-10 | docs/governance/20250710 - Tripwire Protocol - EntifAI.md | EntEthos broader applicability | entethos, enterprise-applications, personal-applications | entethos, ai-copilots, healthcare, finance, legal, education, consumer | open-question | EntEthos concept (zero-trust privacy-preserving multi-party escalation) is applicable beyond Entif: AI copilots in regulated industries (finance, medical, legal), healthcare patient safety monitoring, content moderation platforms, consumer AI assistants, critical infrastructure protection. Protocol is a new primitive in machine intelligence ethics. | "What you've articulated is not confined to Entif. It is a new primitive in the ethics of machine intelligence." | Scope EntEthos as a standalone protocol that could be productized independently or licensed to other platforms | medium |

## Goals And Intent

- Define Entif's provider strategy: FOSS abstraction (ai-sdk-providers) for core, OpenRouter for benchmarking/prototyping only
- Establish Entif as competitor to Cohere, not customer — use only for benchmarking
- Serve enterprise clients ethically via Guardian Mode dual-track architecture
- Design the EntEthos tripwire protocol: privacy-preserving, DCP-inspired, quorum-validated ethical firewall
- Define trigger conditions, multi-layer confirmation, client + server co-save, anti-exploitation protections

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Tripwire live classifier (before inference/dispatch) | "Live Classifier runs before any logging, inference, or dispatch" | entethos-tripwire | P1 | Self-hosted open-weight model (DistilBERT fine-tuned or equivalent) |
| Ephemeral encrypted record on trigger only | "Only the triggering query is preserved, encrypted, and dispatched" | entethos-tripwire | P1 | TTL-bound (48-72h), client + server co-save |
| Multi-layer confirmation (2-of-3) | "Must pass at least two of: Semantic threat classifier, Contextual graph signal, Entropy signature anomaly" | entethos-tripwire | P1 | Define threshold scores per layer |
| Anti-exploitation protections | Rate-limit (1 per 10min/device), record signing, cooldown, one-shot decrypt | entethos-tripwire | P1 | Cannot be gamed, spoofed, or flooded |
| DCP-inspired quorum validation | "validators confirm without exposure" via blinded commitments, threshold aggregation | entethos-quorum | P2 | Ring signatures / BLS threshold signatures |
| Semantic risk graph scoring | "nodes = concepts, edges = relationships, scoring for violent verb proximity" | entethos-semantic | P2 | Explainable threat detection |
| Trigger entropy scoring | "High entropy = sudden use of rare, tactical language inconsistent with baseline" | entethos-entropy | P2 | Combined with semantic score for confidence |
| User notification + configurable modes | "Strict mode / Guardian mode / Dual quorum mode" | entethos-tripwire | P2 | Per deployment context |
| Client-side anonymizer co-save | "client-side anonymizer to save JUST that record, too" | entethos-tripwire | P1 | Must not create exploitation surface |
| Enterprise Guardian Mode dual-track | "Structured deployment of Entif agents in team/org workflows via anonymized behavioral archetypes" | guardian-mode | P1 | Non-invasive modeling, ROI-linked licensing |
| EntEthos protocol formalization | "first real ethics OS for the networked world" | entethos-protocol | P3 | Could be standalone product / licensed protocol |

## Components And Technologies

- ai-sdk-providers (FOSS abstraction layer for multi-provider orchestration)
- OpenRouter (dev/QA benchmarking lane only, not prod)
- Cohere Command R+ (benchmarking control group only, not integrated)
- DistilBERT or equivalent open-weight classifier (tripwire live detection)
- Homomorphic encryption / threshold cryptography (DCP quorum validation)
- Ring signatures, Shamir secret sharing, BLS threshold signatures
- Semantic risk graph (nodes + edges with threat scoring)
- Trigger entropy scoring (complexity vs baseline deviation)
- Black-box anonymizer with TTL-bound ephemeral queues
- n8n webhook escalation with TTL auto-shred
- Dual-key encryption for tripwire record (client encrypts with reviewer public key)

## Conceptual Claims

- Entif is a direct competitor to Cohere, not a customer; benchmarking use only
- Enterprise serving via Guardian Mode is ethical because: (a) corporations will use AGI anyway, (b) ethical AGI outcompetes unethical by superior ROI + risk reduction, (c) Entif controls how results are achieved
- The tripwire is not surveillance — it is "a split-second ethical reflex, like blinking before the eye is punctured"
- EntEthos treats moral escalation as a cryptographic primitive, not a bureaucratic afterthought
- EntEthos is a new primitive applicable beyond Entif: regulated industries, healthcare, content moderation, consumer AI, critical infrastructure
- DCP-inspired quorum enables anonymous confirmation of existing signal without attributing who confirmed
- Semantic risk graph + trigger entropy together raise detection confidence and reduce false positives
- No traceback store — only the triggering query is preserved, ephemeral, TTL-bound, encrypted

## Dependencies And Sequencing

- Tripwire live classifier must exist before DCP quorum validation can be tested
- Semantic risk graph scoring is a prerequisite for trigger entropy confidence scoring
- Client-side anonymizer co-save must be designed with anti-exploitation protections from the start
- Enterprise Guardian Mode architecture depends on dual-track architecture decision (already made in this doc)
- EntEthos protocol formalization depends on tripwire, quorum, and semantic/entropy components being prototyped

## Contradictions Or Supersession

- Earlier in conversation, Entif considered using OpenRouter as primary inference layer; this doc supersedes that — OpenRouter is demoted to benchmarking/dev only. The "Ideal Architecture: Hybrid Bootstrap" section (short-term OpenRouter, mid-term FOSS, long-term sovereign) is partially superseded by the stronger position that FOSS should be the core architecture from the start.
- The "traceback store" concept from early tripwire discussion was explicitly rejected by user: "No traceback store — we're not archiving the data." The final design stores only the triggering query, ephemeral, TTL-bound, with no forensic replay.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| TRP-001: Tripwire activation threshold — defining "serious imminent harm" | epic | docs/intake/issue-drafts/TRP-001-tripwire-activation-threshold.md | tripwire, entethos, definitions | — | "Trigger Only on Existential Harm: Not for drugs, dark humor, pirated PDFs, or teenage angst. Only for credible threats of murder, terrorism, irreversible abuse, or mass violence." |
| TRP-002: Tripwire escalation protocol — client/server co-save, DCP quorum, anti-exploit | epic | docs/intake/issue-drafts/TRP-002-tripwire-escalation-protocol.md | tripwire, entethos, protocol, security | TRP-001 | "When the tripwire fires, we need the client-side anonymizer to save JUST that record, too — and also, figure out how to do that without opening up a vulnerability to being exploitable by malicious actors." |
| TRP-003: EntEthos — semantic risk graph, trigger entropy, and DCP-inspired quorum mechanism | epic | docs/intake/issue-drafts/TRP-003-tripwire-sovereignty-interaction.md | entethos, semantic-risk-graph, trigger-entropy, quorum, dcp | TRP-001, TRP-002 | "Mapping between semantic risk graphs and trigger entropy" + "DCP-inspired signaling logic where multiple validators confirm without exposure" |

## Project Board Suggestions

- **Area:** EntEthos / Tripwire Protocol
- **Cycle:** DI-009 (current cycle)
- **Status:** Pre-alpha — architectural discussion concluded, implementation not started
- **Blocked by:** Definitions of trigger thresholds (TRP-001) must precede protocol design (TRP-002) and EntEthos mechanism (TRP-003)
- **Parallelization notes:** TRP-001 (definitions) can proceed immediately; TRP-002 and TRP-003 are dependent but can run in parallel after TRP-001 definitions are accepted

## Open Questions

- What is the exact threshold score for "serious imminent harm" that triggers the tripwire? Who defines this per jurisdiction?
- What is the quorum size and threshold for DCP-inspired validation? (3 of 5 suggested — is this sufficient for legal defensibility?)
- Should the tripwire be configurable per deployment (strict/guardian/dual-quorum) or fixed?
- How is the semantic risk graph trained and kept current without creating a surveillance capability?
- Is there a regulatory compliance requirement (e.g., GDPR, HIPAA) that constrains the tripwire design in enterprise deployments?
- Is EntEthos a productizable standalone protocol, or only an Entif-internal layer?
- What is the escape hatch if a quorum is unreachable (e.g., all validators offline)?