# EML-006: Ensemble Scoring Architecture with Routing Table

**Type:** architecture
**Labels:** security, ensemble, routing, calibration, classification
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Findings EML-F011, EML-F016
**Depends On:** EML-003 (external policy engine), EML-004 (embedding+classifier scoring layer)

## Problem

Rosetta needs a coherent scoring and routing architecture that combines multiple detector families (Bayesian, linear, semantic, anomaly) into a calibrated decision system. The output must feed into the policy engine and the draft/approve/execute ladder, not produce a single binary "malicious/not malicious" verdict.

## Evidence

"I would not simply average everything. Use a small calibrated meta-model or policy-aware score combiner."

"Use a calibrated stacked logistic model or score-band policy combiner."

Routing table outcomes:
- **Summary-only**: low instruction + low sensitive-action + low attack + no hard flags → summarize, classify topic, extract non-action informational. Forbidden: tools, memory writes, external fetches.
- **Extract-only**: moderate/high instruction + low/moderate attack + no critical sensitivity → extract requested actions into schema. Forbidden: execution, outbound sending, data access beyond message.
- **Approval-required**: high sensitive-action + export/forward/payment/credential semantics → draft only, approval request generation.
- **Quarantine**: hard flags OR high attack probability OR high anomaly with action intent OR dangerous attachment/link pivot profile OR strong ensemble disagreement in high-risk context → human review, offline analysis only.

## Proposed Resolution

Build the four-tier ensemble:

1. **Tier 1 — Cheap high-recall detectors**:
   - Bayesian lexical model (instruction-bearing, benign deviation, known lexical patterns)
   - Logistic regression on sparse TF-IDF features
   - Rule/signature engine for hard policy triggers (explicit exploit phrases, credential/payment/export lexicons, macro/archive combinations)

2. **Tier 2 — Semantic classifiers** (requires EML-004):
   - Embedding + linear SVM (margin-based separation in semantic space)
   - Embedding + gradient-boosted trees over combined embedding+metadata features

3. **Tier 3 — Graph/meta anomaly models**:
   - Isolation forest or one-class SVM on sender-thread features
   - Detects compromised-trusted-sender cases and contextually strange requests

4. **Tier 4 — Aggregator**:
   - Calibrated stacked logistic model (inputs: all model scores, key metadata, hard flags, disagreement metrics → p_instruction, p_sensitive_action, p_requires_review, p_quarantine)
   - OR score-band policy combiner if governance simplicity is preferred
   - Calibration via Platt scaling or isotonic regression on held-out data

5. **Routing table**: Implement the four outcomes with score-band thresholds. Thresholds are per-metric (instruction_probability, sensitive_action_probability, known_attack_probability, thread_anomaly_probability, attachment_pivot_risk, ensemble_disagreement).

6. **Mandatory controls per route**: Each routing outcome enforces specific mandatory_controls (e.g., extract_only: [no_tool_use, no_memory_write, policy_review_if_action_extracted]).

## Evaluation

Evaluate by scenario slices, not only aggregate AUROC:
- trusted sender vs unknown sender
- attachment vs no attachment
- sensitive-action vs non-sensitive-action
- explicit vs indirect instructions
- public exploit style vs normal-business-language adversarial mail
- current vs older corpora

Metrics: precision/recall by route, calibration error, false-positive rate on normal instruction-bearing mail, false-negative rate on sensitive-action and exfiltration cases, review load per day, model disagreement rate, drift over time.

## Dependencies

- EML-003 (external policy engine) — aggregator outputs feed into OPA
- EML-004 (embedding+classifier scoring layer) — Tier 2 depends on it

## Status

candidate