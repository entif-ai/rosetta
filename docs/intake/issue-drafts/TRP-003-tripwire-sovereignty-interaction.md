# TRP-003: EntEthos — Semantic Risk Graph, Trigger Entropy, and DCP-Inspired Quorum Mechanism

**Priority:** P1  
**Type:** epic  
**Status:** draft  
**Labels:** entethos, semantic-risk-graph, trigger-entropy, quorum, dcp  
**Depends on:** TRP-001 (threshold definitions), TRP-002 (escalation protocol)

---

## Summary

Design and specify the three core technical components of the EntEthos tripwire:
1. **Semantic Risk Graph** — explainable threat detection via concept nodes and relationship edges
2. **Trigger Entropy** — anomaly detection via complexity scoring against baseline behavior
3. **DCP-Inspired Quorum Signaling** — anonymous multi-validator confirmation without exposure

---

## Problem Statement

The tripwire requires multi-layered confirmation (2-of-3: semantic classifier, graph signal, entropy anomaly) to fire. This issue addresses the design and specification of each detection layer:

1. **Semantic Risk Graph**: How do we detect threat-relevant concepts and relationships in user input, in an explainable way, without building a surveillance system?

2. **Trigger Entropy**: How do we detect sudden anomalies in query complexity or language that deviate from the user's baseline — to catch "planning stage" language that a static classifier might miss?

3. **DCP-Inspired Quorum**: How do validators confirm a tripwire was correctly triggered without revealing who voted, how they voted, or exposing the user's identity?

---

## Part 1: Semantic Risk Graph

### Concept

User input is embedded into a **semantic graph**:
- **Nodes** = concepts (e.g., "airport", "explosive", "detonator", "Tuesday")
- **Edges** = relationships (temporal: "on Tuesday", causal: "so that", intent: "I plan to")
- **Scoring** = proximity of violent verbs to sensitive locations, first-person intent pronouns, future-oriented time indicators

### Detection Properties

| Property | Requirement |
| --- | --- |
| Explainable | Each trigger must cite specific node/edge that contributed |
| Auditable | Graph structure and scoring rules are versioned and reviewed |
| Non-surveillance | Graph is query-scoped, not persistent across sessions |
| Self-contained | Scoring happens on the query alone, not against user history |

### Scoring Factors

1. **Violence proximity score**: How close are violent concepts to specific targets/locations?
2. **Intent signal**: First-person pronouns + planning verbs ("I will", "I'm going to", "my plan is")
3. **Temporal specificity**: Future time markers + specific dates/times (higher risk than vague future)
4. **Means/occasion indicator**: Mentions method + location + timing together (highest risk pattern)
5. **Target specificity**: Named individuals, locations, institutions vs. generic references

### Output

```
{
  "semantic_risk_score": 0.XX,  // 0.0 - 1.0
  "triggered_nodes": ["airport", "detonator", "Tuesday"],
  "triggered_edges": [{"source": "I", "relation": "plan", "target": "detonate"}],
  "explanation": "High score due to: proximity of violent verb 'detonate' to sensitive location 'airport', combined with first-person intent + temporal specificity 'Tuesday'"
}
```

---

## Part 2: Trigger Entropy

### Concept

**Entropy** = surprise or complexity of a query relative to the user's established baseline behavior.

- **High entropy** = sudden use of rare, complex, tactical language inconsistent with previous context
  - e.g., "detonator rigging near substation ingress with 18-gauge wire"
- **Low entropy** = normal conversation, no anomaly

Combined with semantic risk score, high entropy raises tripwire confidence and reduces false positives.

### Baseline Model

- Baseline is computed per-deployment context (not per-user in EPS mode)
- For Guardian Mode enterprise: baseline can be organizational norms
- For EPS personal mode: baseline is generic human communication norms, not user-specific history
- Baseline is NOT stored persistently — computed fresh per query window

### Entropy Dimensions

1. **Lexical entropy**: Vocabulary complexity / rarity compared to norm
2. **Syntactic entropy**: Sentence structure complexity (subordinate clauses, conditional logic)
3. **Semantic entropy**: Topic deviation from expected domain (e.g., a cooking query suddenly discussing explosives)
4. **Pragmatic entropy**: Communication style shift (e.g., casual user suddenly uses tactical precision language)

### Output

```
{
  "entropy_score": 0.XX,  // 0.0 - 1.0
  "lexical_component": 0.XX,
  "syntactic_component": 0.XX,
  "semantic_component": 0.XX,
  "pragmatic_component": 0.XX,
  "anomaly_signature": "tactical precision language spike, domain deviation from expected context"
}
```

---

## Part 3: DCP-Inspired Quorum Mechanism

### Concept (from TRP-002 recap)

Multiple validators confirm a tripwire was correctly triggered WITHOUT revealing:
- Which validator flagged it
- Which validators voted yes vs no
- Any user identity or session data

The outcome is **verifiable** but **not attributable**.

### Cryptographic Design

**Primitives:**
1. **Threshold commitments**: Each validator produces a blinded commitment (cannot see others' votes)
2. **Ring signatures**: Validator anonymity in the set; can prove membership without revealing which member
3. **Shamir secret sharing**: Decrypt key is split into N shares; threshold K must combine to release
4. **BLS threshold signatures**: Cryptographically stable aggregation of masked votes

### Quorum Flow

```
1. Tripwire fires → encrypted incident created
        ↓
2. Encrypted challenge dispatched to validator group (e.g., 5 nodes)
        ↓
3. Each validator:
   - Receives: "Does this query represent an imminent credible threat to life?"
   - Does NOT see: user identity, device, who else is voting
   - Produces: blinded commitment (ring signature or threshold sig)
        ↓
4. Commitments submitted to aggregation layer
        ↓
5. Aggregation:
   - If threshold met (e.g., 3 of 5 confirm) → one-time decrypt key released
   - If not met → all data shredded, no trace
        ↓
6. Decrypt key enables record review by designated escalation handler
        ↓
7. Record is one-shot decrypt → then purged (unless legal preservation)
```

### Verification Properties

- **Completeness**: If all validators confirm, quorum is reached
- **Soundness**: Without threshold confirmations, no key is released
- **Anonymity**: No observer can trace which votes were yes or who voted
- **Non-repudiation**: Validators cannot later deny their commitment (but cannot be identified either)

### Formal Properties

| Property | How Achieved |
| --- | --- |
| Privacy | Ring signatures hide which validator voted |
| Verifiability | Threshold sigs can be checked against known public key |
| Irreversibility | Once quorum reached, key released cannot be reversed |
| Ephemerality | All data shredded if quorum not reached |
| Non-attribution | No link between validator identity and vote outcome |

---

## Integration: 2-of-3 Confirmation

The three layers combine as follows:

| Layer | Output | Threshold to count |
| --- | --- | --- |
| Semantic Risk Graph | score 0.0-1.0 | ≥ 0.75 |
| Graph Signal | boolean (escalation in violent sentiment) | true |
| Trigger Entropy | score 0.0-1.0 | ≥ 0.70 |

**Tripwire fires** when **at least 2 of 3** meet threshold.

Rationale: Semantic + Graph together is sufficient. Semantic + Entropy is sufficient. Graph + Entropy is sufficient. Any single layer alone is insufficient.

---

## Open Questions

1. **Graph training data**: What corpus is used to train the semantic risk graph without creating a surveillance training set?
2. **Entropy baseline calibration**: How is "normal" calibrated for EPS mode where no per-user history exists?
3. **Validator pool**: Who are the validators? (internal agents, external humans, hybrid?) What is the governance of the validator set?
4. **Quorum threshold justification**: Is 3-of-5 sufficient for legal defensibility? Should some deployments require unanimous consent?
5. **Escape hatch**: If quorum cannot be reached (all validators offline or deliberately withholding), what happens?
6. **Jurisdictional variance**: Do threshold scores need to vary by jurisdiction? How is that managed in a privacy-preserving way?

---

## Acceptance Criteria

- [ ] Semantic risk graph scoring model defined with explainable node/edge attribution
- [ ] Trigger entropy scoring model defined with per-dimension breakdown
- [ ] 2-of-3 confirmation logic documented and validated
- [ ] DCP quorum mechanism specified with cryptographic primitives
- [ ] Privacy/verifiability/non-attribution properties formally stated
- [ ] Integration with TRP-001 threshold definitions verified
- [ ] Open questions addressed or formally deferred

---

## References

- Source: docs/governance/20250710 - Tripwire Protocol - EntifAI.md
- Related: TRP-001 (threshold definitions), TRP-002 (escalation protocol)