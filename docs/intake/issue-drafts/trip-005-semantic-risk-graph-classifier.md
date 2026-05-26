# TRIP-005: Semantic Risk Graph + Entropy Spike Tripwire Classifier

## Metadata

- **Type**: implementation
- **Status**: draft
- **Confidence**: high
- **Source**: `docs/governance/20250710 - Tripwire Protocol - EntifAI.md`
- **Extraction date**: 2026-05-26
- **Labels**: tripwire, classifier, semantic-graph, entropy, risk-scoring
- **Depends on**: TRIP-001

## Problem Statement

Tripwire detection must be accurate enough to catch genuine threats while minimizing false positives that could overwhelm quorums or erode user trust. Two complementary signals are required: (1) semantic risk — does the content map to known threat structures?, and (2) entropy spike — does this represent a sudden unexplained departure from the user's behavioral baseline?

## Proposed Solution

### Semantic Risk Graph

Every input is embedded into a directed semantic graph:
- **Nodes**: concepts, entities, and intent markers (e.g., "airport", "explosive", "detonation", "Tuesday")
- **Edges**: relationships — temporal ("before", "after"), causal ("to", "using"), intent ("I will", "plan to")
- **Risk scoring rules**: 
  - Proximity of violent verbs ("detonate", "kill", "attack") to sensitive targets (locations, people, infrastructure)
  - First-person singular pronouns indicating personal intent ("I will", "I'm going to")
  - Future time markers ("tomorrow", "tonight", "at 8am") in threat context
  - Specificity of means ("pressure cooker bomb", "insulin overdose")
- **Explainability requirement**: Each activation must be traceable to a specific graph structure ("This phrase maps to known attack planning structures")

### Entropy Spike Detection

Entropy measures how surprising/complex the current query is compared to the user's rolling behavioral profile:
- **Baseline**: User's last N interactions form a behavioral embedding (vector centroid)
- **High entropy markers**: Sudden use of rare vocabulary, technical/tactical language, narrative structure inconsistent with prior usage
- **Combined scoring**: semantic_risk_score × entropy_multiplier = tripwire_confidence
- **False positive suppression**: No tripwire if entropy is high but semantic risk is low (e.g., creative fiction writing); no tripwire if semantic risk is high but entropy is normal (e.g., discussing a movie plot)

### Classifier Implementation

- **Model options**: DistilBERT fine-tuned for threat classification, or instruction-tuned open-weight model
- **Deployment**: Local-first (on-device inference when possible)
- **Threshold tuning**: Quorum-reported false positives used to recalibrate thresholds over time
- **Cultural/contextual tuning**: Different threshold profiles for different deployment contexts (enterprise healthcare vs. personal wellness vs. creative tooling)

## Acceptance Criteria

1. Semantic risk graph produces top-k relevant concept nodes and edges for any input
2. Entropy spike detection identifies statistically significant deviations from user baseline
3. Combined scoring rule fires correctly on known threat patterns (test set to be built)
4. False-positive rate < 0.1% on benign conversational corpus
5. Classifier inference completes in < 50ms on target hardware
6. Explainability output (graph path + entropy delta) accompanies every tripwire fire
7. Unit and integration tests: risk graph construction, entropy baseline updates, threshold crossing

## Dependencies

- TRIP-001 (envelope and fire logic)
