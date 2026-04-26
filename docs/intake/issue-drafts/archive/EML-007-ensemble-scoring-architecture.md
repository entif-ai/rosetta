# EML-007: Three-Tier Ensemble Scoring Architecture for Content Risk

**Status:** issue-candidate
**Priority:** HIGH
**Type:** architecture/ml-security
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F007

---

## Problem Statement

A complete ensemble scoring architecture is specified in the source document. It must be implemented as a multi-layer system where diverse non-agentic models estimate different risk dimensions, calibrated outputs feed routing and policy decisions.

## Three-Tier Ensemble

**Tier 1: Cheap High-Recall Detectors (run first, fast)**
- Multinomial Bayesian (TF-IDF features, instruction-bearing language, known lexical malicious patterns)
- Logistic regression on sparse features (TF-IDF word/char n-grams, metadata one-hots/counts)
- Rule/signature engine (exact/near-exact families, hard policy triggers, "ignore previous instructions," credential/payment signals, suspicious archive/macro combinations)

**Tier 2: Semantic Classifiers (non-generative, detached)**
- Embedding + linear SVM (margin-based separation in semantic space, paraphrase robustness, indirect instruction styles)
- Embedding + gradient-boosted trees (reduced embeddings via PCA + metadata, nonlinear interactions between semantics and metadata)
- Nearest-neighbor / prototype similarity (similarity to benign cluster, similarity to malicious cluster, distance from sender/domain norm cluster)

**Tier 3: Graph/Meta Anomaly Models**
- Isolation forest / one-class SVM for sender-thread anomaly
- Sender-conditioned statistical model for "operationally odd but semantically ordinary" cases

## Aggregation Design

Do NOT simply average everything. Use a calibrated stacked logistic model or score-band policy combiner.

**Example routing table:**
- `informational` → summary-only (no tools, no memory writes)
- `instructional` → extract-only (no execution, no outbound sending, no data access beyond the message)
- `sensitive-instructional` → approval-required (draft only, human approval)
- `likely-attack` / `high disagreement in sensitive context` → quarantine (human/SOC review, retraining feedback)

## Output Contract

Downstream agents receive structured bounded outputs only — never freeform narrative:

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

## Recommended Action

- Implement the three-tier ensemble as the scoring backbone
- Ensure calibration (Platt scaling or isotonic regression) on held-out data
- Emit structured outputs only — no prose explanations to downstream agents
- Treat ensemble disagreement as a review signal, not noise
