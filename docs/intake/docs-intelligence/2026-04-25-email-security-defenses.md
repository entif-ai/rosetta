# Extraction: Email-driven Security Defenses

**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`
**Date:** 2026-04-08 (exported 2026-04-08 23:33:11)
**Extracted by:** heartbeat subagent
**Confidence:** HIGH (primary source, well-structured dialogue with cited references)

---

## Document Overview

A dense, technically-rigorous conversation between Emilie Eudico and ChatGPT (with extended thinking enabled) covering email-driven prompt injection attack surfaces, defensive architecture design, content-risk scoring as a reusable middleware layer, and the implications for Rosetta-native model design and training. The conversation concludes with speculative discussion of compute efficiency, demoscene analogies, the Sapir-Whorf hypothesis applied to machine cognition, and a series of humorous exchanges about Nobel prizes and John Hopfield's relative lack of tabloid oxygen compared to Geoffrey Hinton.

---

## Findings

### EML-F001: Email-driven Prompt Injection Attack Surface is Multi-Path

**Confidence:** HIGH
**Source:** Primary analysis in the document

Email-driven prompt injection is not one attack but several distinct attack paths, none of which are closed by sender allowlisting or content normalization alone:

1. **Path A: Ordinary-looking instruction mail** — Requests that look like normal business communication ("Please send me the latest customer list"). No weird markup, no obvious jailbreak language. This is where pure content detectors struggle most. A regex strip to alphanumerics leaves such text completely intact.

2. **Path B: Trusted-source compromise** — A real partner or coworker mailbox is compromised. The mail passes allowlists and may even pass GPG signature checks if the attacker controls the sending environment. The allowlist becomes the attack delivery channel.

3. **Path C: Attachment/link pivot** — The email body is benign, but the attachment or linked document carries the malicious instruction or data-exfiltration lure. If the pipeline follows links or opens attachments, the attack surface expands immediately.

4. **Path D: Cross-stage contamination** — Stage 1 (summarizer) produces a summary that is then trusted by Stage 2 (downstream agent), even though the summary was derived from attacker-controlled content. Sandboxing helps with system compromise but not with logic contamination between agents.

5. **Path E: Model-evasion phrasing** — The attacker paraphrases or fragments the request to fall below the classifier threshold. Attackers optimize against detectors.

**Implication:** No single control closes the attack surface. Requires layered defense-in-depth.

---

### EML-F002: Bayesian Classifier for Email Triage is Useful but Not Sufficient

**Confidence:** HIGH
**Source:** Primary analysis, supported by OWASP LLM Prompt Injection Prevention Cheat Sheet

The Bayesian quarantine engine idea (seeded on pre-2020 professional corpus + public attack repositories like those from Pliny the Liberator, with webhook-triggered corpus refresh) is a strong and well-motivated direction. It would improve detection materially. However:

1. **Base-rate problem** — Legitimate business email contains instructions constantly ("please review," "send me the report," "approve this invoice"). If you quarantine most instruction-bearing emails, you either destroy workflow with false positives or loosen the threshold until sophisticated attacks pass through.

2. **Attackers optimize against detectors** — This is well-established in spam filtering and confirmed by recent prompt-injection research (USENIX Security 24). Statistical filters, including Bayesian ones, can be manipulated or evaded, and detectors/guardrails remain bypassable under adversarial transformations.

3. **Public repos are better for testing than for "covering the space"** — Public attack corpora are biased toward explicit, visible jailbreak styles. Real enterprise attacks can be quieter, domain-specific, and written to resemble ordinary process language.

4. **"Normal business language" is exactly where the danger lives** — The most dangerous messages often look perfectly ordinary: polite requests, escalations, follow-ups, approvals, meeting coordination.

**Implication:** Bayesian inference is excellent as one of several scoring layers, not as the final authorization gate. The correct framing: use Bayesian inference to decide how suspicious and action-like the email is; use external policy and approval logic to decide what happens next.

---

### EML-F003: Nine-Layer Email-to-Agent Defensive Architecture

**Confidence:** HIGH
**Source:** Fully specified in document with named components

The document contains a complete, concrete reference architecture for a secure email-to-agent pipeline:

**Layer 1: Mail Ingress / Provenance Gate**
- Postfix as MTA with before-queue Milter support
- Rspamd for scoring, regex rules, reputation, Bayes
- OpenDKIM/OpenDMARC for email authentication
- GnuPG/gpgv for narrow "trusted human command" lane only (provenance, not safety)
- Hard-drop obvious junk, quarantine high-risk mail, tag by trust tier

**Layer 2: Dual Representation**
- Pristine original stored for audit/replay
- Normalized analysis view for downstream classifiers
- Not "strip to alphanumerics" as canonical — multiple derived representations
- Apache Tika for MIME parsing, content extraction, attachment detonation sandbox
- ClamAV for attachment malware scanning

**Layer 3: Multi-Signal Classification**
- Provenance score (sender, signature, reply-chain anomalies, historical pattern)
- Content score (spam/phish/malware likelihood)
- Instruction-likeness score ("contains request to cause state change")
- Sensitivity score (money movement, credentials, secrets, data export, policy change, external fetch)
- Attachment/link score (presence of links, scripts, macros, PDFs, OCR-worthy images, archives)
- Bayesian matcher outputs used as feature producer (instruction_probability, urgency_probability, social_engineering_probability)

**Layer 4: Taint Propagation**
- Any fact, command, or recommendation derived from email carries an "untrusted/tainted" label all the way through the pipeline
- Summaries are tainted, extracted tasks are tainted, entities from attachments are tainted, links discovered in mail are tainted, any memory write based on mail is blocked or heavily reviewed

**Layer 5: Sandboxed LLM Extraction**
- gVisor or Firecracker container sandboxing
- Read-only, schema-constrained output only
- No external tools, no memory writes, no authority to send mail/fetch URLs/open attachments
- Structured JSON output: sender identity claims, topic, requested actions, deadlines, entities, confidence, risk labels, rationale snippets

**Layer 6: External Policy Engine (OPA)**
- LLM proposes; OPA decides
- Policy is authoritative, versioned in Git
- Example rules: email-originated content may never directly trigger credential changes; GPG-valid personal commands may create drafts but not bypass sensitive-action policy

**Layer 7: Draft/Approve/Execute Ladder**
- Level 0: summarize only
- Level 1: extract proposed task, do not create it
- Level 2: create draft in Jira/Asana/CRM, marked "untrusted email-derived"
- Level 3: human approves
- Level 4: executor service performs the narrow approved action

**Layer 8: Disable Default Attachment/URL Fetching**
- Malware scan first, MIME/type detect first, detonate risky content in isolated worker
- Only extract to text if policy says that type is allowed
- Never let extracted attachment text silently join long-term prompt memory

**Layer 9: Audit and Rollback**
- Every decision logged with original provenance facts, classifier outputs, policy inputs, policy result, drafts created, approvals, execution results

---

### EML-F004: Content Risk Middleware Generalizes Beyond Email

**Confidence:** HIGH
**Source:** Explicitly discussed in document

The same defensive pattern (normalize → enrich with provenance → score across multiple risk dimensions → route by policy → only then allow downstream model consumption) is applicable to:

1. **Email** — the primary discussed use case
2. **Repository-hosted skill/instruction markdown** (e.g., ClawHub) — files that mix documentation, executable commands, tool wiring, and agent directives
3. **Forum posts and private messages** (e.g., MoltBook) — with additional scoring for coordinated persuasion, reputation laundering, cross-post repetition
4. **Fetched web pages** — pre-screening before sending to a cheaper model for token parsimony
5. **Attached documents** — PDFs, Office files, archives
6. **Internal knowledge objects** — prompt templates, tool specs

**For skill markdown specifically:** Screen for attempts to redefine system boundaries, instructions to ignore host constraints, covert escalation language, hidden/encoded directives, references to unrestricted tool use, suspicious external fetch instructions.

**Implication:** Content-risk scoring is a reusable middleware layer applicable across all channels that feed content to agentic systems. Modularizing these components as skills enables reuse across tangential flows.

---

### EML-F005: Social Engineering Playbook as Explicit Feature Family

**Confidence:** HIGH
**Source:** Primary analysis, supported by OWASP and academic security literature

The document identifies a specific social-engineering-informed scoring dimension, distinct from prompt-injection risk:

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

**Key architectural insight:** Social engineering risk and prompt injection risk are separate scores. A message may have low attack-family similarity but high social-engineering manipulation risk. Both must feed routing and policy independently.

**Operational source material:** Mitnick's Art of Deception, government/institutional best practices, public handbooks on social engineering. These materials should be used as doctrine and labeling guidance, not merely as training text.

---

### EML-F006: Rosetta as Semantic OS for Content-Risk Pipeline

**Confidence:** HIGH
**Source:** Explicit discussion in document linking email security content-risk to Rosetta architecture

The document explicitly maps the content-risk pipeline to Rosetta's module architecture:

**Rosetta Core Tiles for Content-Risk Workflows:**

| Tile | Purpose in Content-Risk Pipeline |
|------|-----------------------------------|
| `rosetta.run` | One complete screening/verification episode |
| `rosetta.action` | Each stage in the pipeline |
| `rosetta.toolcall` | Fetches, parsers, OCR, embedder calls, classifier calls |
| `rosetta.observation` | Raw inbound content and raw tool outputs |
| `rosetta.conjecture` | Ambiguous mappings, rival readings, uncertainty distributions |
| `rosetta.concept` / `rosetta.frame` | Normalized semantic interpretation |
| `rosetta.matrix` | Scored multidimensional risk vectors |
| `rosetta.evaluation` | Assessment objects |
| `rosetta.episteme` | Compiled confidence/belief state |
| `rosetta.policy` | The policy profile in force |
| `rosetta.receipt` | Signed attestations for important events |
| `rosetta.tapestry` | Compiled receipt bundle/verification closure |

**Proposed Pack Families for Content-Risk:**

| Family | Purpose |
|--------|---------|
| `rrp.*` | Receipts, bundles, provenance-pathing, verifier semantics |
| `truthlint.*` | Claim extraction, assumption surfacing, source/evidence scoring |
| `risk.*` | Content-risk, SE-risk, anomaly, provenance-risk, model-suitability scoring |
| `ingress.*` | Source adapters (email, repo markdown, forum, web, docs, attachment) |
| `identity.*` | Personhood provenance, correlation, simulation-risk, person-model governance |
| `interop.*` | Projections to external standards (PROV-O, BPMN, DMN) |
| `gov.*` | Policy profiles, review workflows, retention/export controls |

**Stage-to-Receipt Mapping:**

| Stage | Rosetta Artifact | Receipt Family |
|-------|-----------------|---------------|
| 0: Ingest | `rosetta.run`, `rosetta.observation` | `rrp:ingest.capture` |
| 1: Normalize | Derived `rosetta.observation`, provenance edges | `rrp:normalization.transform` |
| 2: Interpret | `rosetta.concept`, `rosetta.frame`, `rosetta.conjecture` | `rrp:claim.extraction`, `rrp:assumption.extraction` |
| 3: Score | `rosetta.matrix`, `rosetta.evaluation` | `rrp:risk.scoring` |
| 4: Policy | `rosetta.policy`, `rosetta.receipt` | `rrp:policy.evaluation` |
| 5: Package | `rosetta.tapestry`, `rosetta.receipt` | `rrp:bundle.closure` |
| 6: Project | Interop artifacts | `rrp:export.projection` |

**Key architectural principle:** No module is allowed to mutate truth in place. All modules may only append new observations, interpretations, evaluations, policies, receipts, or projections, all content-addressed and provenance-linked.

---

### EML-F007: Ensemble Scoring Architecture for Content Risk

**Confidence:** HIGH
**Source:** Fully specified in document with model families, feature sets, and aggregation design

**Three-Tier Ensemble Model:**

**Tier 1: Cheap High-Recall Detectors**
- Multinomial Bayesian (TF-IDF features, instruction-bearing language, known lexical malicious patterns)
- Logistic regression on sparse features (TF-IDF word/char n-grams, metadata one-hots)
- Rule/signature engine (classic exploit patterns, hard policy triggers, "ignore previous instructions," credential/payment signals)

**Tier 2: Semantic Classifiers (non-generative, detached)**
- Embedding + linear SVM (margin-based separation in semantic space, paraphrase robustness)
- Embedding + gradient-boosted trees (reduced embeddings + metadata, nonlinear interactions)
- Nearest-neighbor / prototype similarity (similarity to benign cluster, similarity to malicious cluster, sender norm distance)

**Tier 3: Graph/Meta Anomaly Models**
- Isolation forest / one-class SVM for sender-thread anomaly
- Sender-conditioned statistical model for "operationally odd but semantically ordinary" cases

**Output Contract:** Downstream agents receive structured bounded outputs only:

```json
{
  "message_id": "abc123",
  "taint_status": "untrusted_email_derived",
  "sender_trust_tier": "allowlisted_internal",
  "instruction_probability": 0.86,
  "sensitive_action_probability": 0.79,
  "known_attack_probability": 0.22,
  "business_norm_similarity": 0.71,
  "thread_anomaly_probability": 0.41,
  "attachment_pivot_risk": 0.68,
  "ensemble_disagreement": 0.34,
  "routing_recommendation": "extract_only",
  "mandatory_controls": ["no_tool_use", "no_memory_write", "policy_review_if_action_extracted"],
  "hard_flags": ["contains_external_forwarding_request"]
}
```

**Routing Table:**
- `informational` → summary-only (no tools, no memory writes)
- `instructional` → extract-only (no execution, no outbound sending)
- `sensitive-instructional` → approval-required (draft only)
- `likely-attack` / `high disagreement in sensitive context` → quarantine

---

### EML-F008: Small-Model Suitability Routing

**Confidence:** HIGH
**Source:** Explicit in document

One underappreciated application: routing content to smaller/non-frontier models for token parsimony, based on risk profiles:

```json
{
  "content_risk": "medium",
  "small_model_safe": false,
  "requires_frontier_model": false,
  "requires_rule_based_processing": true,
  "requires_human_review": false
}
```

This means:
- High-risk content is rejected before reaching any model
- Medium-risk content goes to a robust model with constrained output schema
- Low-risk informational content can be handled by a smaller, cheaper model

This is directly applicable to web pre-screening pipelines and is relevant to the Rosetta `risk.small_model_suitability` pack.

---

### EML-F009: RBL/DNSBL and Infrastructure Reputation as Provenance Features

**Confidence:** MEDIUM-HIGH
**Source:** Primary analysis, standard anti-spam practice

Standard anti-spam infrastructure signals should feed provenance scoring:
- Source IP/domain reputation databases
- ASN / hosting-provider reputation
- Sender-domain age and registration anomalies
- SPF/DKIM/DMARC pass/fail/alignment
- HELO/EHLO oddities
- Reverse DNS consistency
- Historical sender frequency and first-seen timing
- Mismatch between visible sender identity and infrastructure footprint

**Limitation:** These signals help with compromised or spoof-adjacent inbound sources and low-effort opportunistic attacks. They help less with legitimate third-party SaaS senders, internal relays, and high-quality BEC-style attacks riding clean infrastructure.

---

### EML-F010: Draft-and-Prune + Rosetta as Foundation for a Rosetta-Native Cognitive Model

**Confidence:** HIGH
**Source:** Extended discussion linking to MR. TECH LEAD redesign notes and MegaTrain paper

The document discusses what is required to train a Rosetta-native cognitive model once foundational artifacts are available:

**Phase 1 (Build the Training Substrate):**
- Rosetta-native corpus: `rosetta.observation` pairs with derived `form`, `lexeme`, `concept`, `frame`, `conjecture` artifacts
- Canonical pasigram / concept targets for atomic and compositional meanings
- `tapestry` objects as compiled context bundles
- Provenance-rich positive and negative examples (correct mappings, ambiguous mappings, unsupported mappings, contradictory candidate bundles)
- Pack anchors into external references (WordNet, VerbAtlas, Ithkuil curriculum) for stabilization

**Recommended First Move (NOT scratch pretraining):**
- Externalize meaning into Rosetta bundles and tiles
- Align host model into Rosetta space via prototype embeddings + orthogonal Procrustes alignment
- First trainable Rosetta-native system = base model + Rosetta codec + projection head + disambiguator + bundle builder/verifier loop

**Four Training Waves:**
1. **Wave 1:** Rosetta-aware host model — structural tokens, projector head, adapters on output/selected attention layers, bundle emission/reading tasks. Goal: model can convert natural inputs into Rosetta candidate bundles and consume tapestries.
2. **Wave 2:** Rosetta-refined post-training — D&P-generated candidate bundles, Rosetta-pruned promoted cores, abstention examples, ambiguity-preserving examples.
3. **Wave 3:** Continued pretraining on mixed corpora — natural language + Rosetta bundles + HDS control markers + pasigraphic realizations + validated tapestries.
4. **Wave 4:** Deeper architecture adaptation — AttnRes, CCA, ENGRAM-like lookup memory, other sequence/backbone improvements.

**Evaluation Harness Requirements:**
- Semantic fidelity: Can model map inputs to correct Rosetta concepts/frames/roles?
- Bundle correctness: Valid, typed, contradiction-free, provenance-compatible, equivalent to gold even when surface wording differs
- Failure quality: Structured uncertainty, unresolved ambiguity, or unsupported candidate bundle — NOT confident fabrication

**What v1 Does NOT Need to Be:**
- Fully pasigraphic tokenizer replacing BPE on day one
- Trillion-token Rosetta pretraining run
- Bespoke from-scratch backbone
- Universal ontology

---

### EML-F011: MegaTrain Implications for Rosetta-Native Model Training Economics

**Confidence:** HIGH
**Source:** Document analysis of 2604.05091v1 (MegaTrain paper)

**MegaTrain Core Claims:**
- Current LLM development shifting toward post-training, alignment, domain adaptation, specialization — doable on single node
- Host memory is the authoritative parameter store; GPUs are transient compute engines
- Overlap parameter prefetch, compute, and gradient offload via double buffering + stateless layer-template model
- Reliable training up to 120B parameters on single H200 with 1.5TB host memory
- 1.84x ZeRO-3 offload throughput at 14B
- Training up to 14B even on A6000/3090-class hardware where ZeRO-3 OOMs

**Implications for Rosetta-Native Training:**
- **Small/mid runs:** Standard LoRA/QLoRA or continued pretraining on rented A100/H100 is sufficient
- **Larger deep adaptation:** MegaTrain-like memory-centric training relevant for pushing to larger open models without a cluster
- **True scaling boundary:** Host memory and memory orchestration, not just VRAM
- **Best-case cost envelope (Wave 1 skateboard v1):** ~$500–$3,000 in direct GPU spend (20–40 GPU-hours for early runs, 40–120 for follow-up tuning)
- **Best-case cost envelope (Wave 2 serious v1):** ~$2,500–$12,000 (100–300 GPU-hours total)

---

### EML-F012: Gemma 4 as Proof-of-Possibility for Intelligence-per-Parameter Efficiency

**Confidence:** HIGH
**Source:** Document analysis with cited web sources

**Gemma 4 Benchmark Data (as discussed):**
- Gemma 4 31B: #3 on Arena AI open-model text leaderboard; 85.2% MMLU-Pro, 89.2% AIME 2026, 80.0% LiveCodeBench v6, 84.3% GPQA Diamond
- Gemma 4 26B A4B MoE: #6 on Arena AI; activates only **3.8B parameters per inference step**; 82.6% MMLU-Pro, 88.3% AIME 2026
- Google claims Gemma 4 "outperforms models 20x its size" on benchmarks
- 26B A4B MoE positioned for latency-oriented deployments, fits consumer GPUs and local workstations

**gpt-oss-120b Comparison (OpenAI):**
- 117B total parameters, 5.1B active per token (MoE)
- 21B variant activates 3.6B per token
- Designed to fit on single 80GB H100

**Implication:** The pattern of "larger total model, much smaller active runtime footprint" is already demonstrated in production systems. Gemma 4 is the right calibration point for Rosetta-native efficiency claims.

---

### EML-F013: Semantic Efficiency vs. Parameter Efficiency — The Sapir-Whorf Argument

**Confidence:** MEDIUM-HIGH
**Source:** Extended philosophical discussion in document

**The Claim:** The representational regime a system is trained in changes what kinds of cognition are cheap, natural, composable, and stable for that system. This is the Sapir-Whorf hypothesis applied to machine cognition in practical engineering terms.

**The Core Delta:**
- Mainstream token-space training produces models that learn amid ambiguity, paraphrase drift, underspecified logic, weak type boundaries, and prose that contains valuable ideas but encodes them very inefficiently
- Rosetta-class training gives the model explicit objects, explicit relations, explicit frames, explicit uncertainty, explicit provenance, and eventually explicit meta-cognitive motifs
- The gain is not merely "fewer bytes" or "less re-disambiguation" — it is **better internal habits of thought**

**The Prep-School/PhD Analogy:**
- The model trained on dense semantic representations is like the disciplined scholar: cleaner distinctions, more explicit abstractions, more rigorous methods, better externalized tools of thought, more disciplined reflective loops
- The model trained on ambiguous token soup is like the streets-savvy dropout: valuable raw capacity exists, but the regime doesn't enforce disciplined cognitive habits

**The Strongest Version of the Claim:**
> "Rosetta doesn't just try to make the model 'smarter.' It tries to make the model do less stupid work."
>
> Less stupid semantic work + less repeated local-memory reconstruction + cheaper sequence/depth routing + compressed vector movement + cheaper adaptation = system that behaves like a much larger model than its active runtime footprint would suggest

**Key Architectural Implications:**
- Canonical tiles instead of repeated prose
- Tapestries instead of bloated chat histories
- Conjectures instead of premature collapse
- Semantic slugs instead of verbose re-description
- Retrieval over typed objects instead of fuzzy token recall
- Logical/methodological/planning/interpretive routines become typed reusable objects — a "strongly-typed atlas of meta-cognition"

---

### EML-F014: Compute Cost Trajectory and the Brute-Force Maximalism Risk

**Confidence:** MEDIUM-HIGH
**Source:** Document analysis with cited IEA and industry data

**Current Data:**
- IEA projects global data-center electricity demand to double to ~945 TWh by 2030, with AI as major driver
- ~50% of planned US data-center builds delayed or canceled due to transformer/switchgear/battery shortages and power infrastructure constraints
- xAI pursuing 200k GPU Colossus with roadmap to 1M GPUs; TeraFab/terawatt-scale compute ambition
- Epoch AI: algorithmic efficiency improving ~3x per year for equivalent performance

**The Strategic Tension:**
- Giant compute clusters remain relevant for frontier pretraining and industrial workloads
- But: the marginal value of each extra megawatt is falling while the value of better architecture, better semantics, and better memory organization is rising
- A model with dramatically better intelligence-per-active-parameter, per-watt, and per-dollar could undercut brute-force compute-maximalist strategies faster than incumbents expect

**The Optimistic Scenario:** A new class of models emerges that is dramatically more capable per active parameter, per watt, and per dollar than today's mainstream assumptions predict — making "planetary-scale compute or perish" look less like destiny and more like one strategic bet among several.

---

## Concept Cross-Reference

| Concept | Related Findings | Notes |
|---------|-----------------|-------|
| `content-risk-middleware` | EML-F004, EML-F005, EML-F007 | Reusable across email, repo markdown, forums, web |
| `taint-propagation` | EML-F003, EML-F004 | Email-derived content carries untrusted label |
| `bayesian-classifier` | EML-F002 | One scoring layer, not final gate |
| `social-engineering-scorer` | EML-F005 | Separate from prompt-injection scoring |
| `rosetta-as-semantic-os` | EML-F006 | Module map and pack families |
| `small-model-suitability` | EML-F008 | Risk-based routing to cheaper models |
| `draft-and-prune` | EML-F010 | Candidate generation + Rosetta pruning |
| `megatrain` | EML-F011 | Memory-centric single-node training |
| `gemma-4-efficiency` | EML-F012 | 3.8B active params from 26B total |
| `semantic-efficiency` | EML-F013 | Sapir-Whorf applied to machine cognition |

---

## Issue Candidates (to be drafted separately)

1. **EML-001:** Multi-path email-driven attack surface requires layered defense (no single control suffices)
2. **EML-002:** Bayesian email classifier useful as triage signal, not authorization gate
3. **EML-003:** Nine-layer email-to-agent defensive architecture fully specified
4. **EML-004:** Content-risk middleware generalizes beyond email — skill-pack modularization needed
5. **EML-005:** Social engineering playbook as explicit scoring dimension, distinct from prompt-injection
6. **EML-006:** Rosetta module map for content-risk pipelines with pack family structure
7. **EML-007:** Ensemble scoring architecture (3-tier: Bayes/linear, semantic, anomaly)
8. **EML-008:** Small-model suitability routing for token parsimony
9. **EML-009:** RBL/DNSBL/infrastructure reputation as provenance features
10. **EML-010:** Rosetta-native cognitive model training requirements and four-wave training ladder
11. **EML-011:** MegaTrain implications for training economics (~500–12K best-case envelope)
12. **EML-012:** Gemma 4 as calibration point for intelligence-per-parameter efficiency claims
13. **EML-013:** Semantic efficiency as distinct from parameter efficiency (Sapir-Whorf argument)
14. **EML-014:** Compute cost trajectory risk for brute-force maximalism strategies
