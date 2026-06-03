# CRT-001: Cognitive Phylogenetics Research Program — Empirical Validation

## Meta

- **Type:** research
- **Severity:** high
- **Confidence:** high
- **Tags:** research, cognitive-phylogenetics, empirical-validation, layer-corridor, broadcast-register
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md`
- **Extracted:** 2026-06-01

## Summary

Crates's theory of LLM reasoning and human linguistic fingerprints rests on four formal hypotheses that have varying degrees of public empirical support but no unified validation program within Rosetta/Entif. A structured research protocol is needed to test, refine, or falsify each hypothesis before committing engineering resources to the cognitive-phylogenetics research program.

## Evidence

Four formal hypotheses articulated in the source document:

1. **Layer corridor hypothesis** (H1): Across model families, a mid-layer band exhibits unusually high cross-lingual semantic alignment and strong causal contribution to reasoning tasks. Supported by ICLR 2026 multilingual layer localization paper and David Noel Ng's RYS (Repeating Y-layer Study) middle-layer duplication work.

2. **Broadcast register hypothesis** (H2): Instruction tuning compresses stylistic entropy and pushes models toward a prestige-coded output manifold shared across vendors. Supported by 2025 stylometry papers finding lower variance in LLM outputs vs human writing.

3. **Human lineage hypothesis** (H3): Given enough longitudinal text from one person, stable signals of cohort, region, network exposure, and life-stage drift can be recovered better than chance. Supported by existing author-profiling literature (Cambridge, OUP).

4. **Fingerprint divergence hypothesis** (H4): Human idiolect trajectories over time are richer, less variance-collapsed, and more context-sensitive than current LLM families, even with persona prompting. Central to Rosetta's claim that human cognition leaves recoverable evolutionary-style residue in corpora.

## Research Protocol Design

### H1 — Layer Corridor
- **Method:** Replicate RYS-style middle-layer duplication in Qwen2.5 and Devstral; measure benchmark deltas (MMLU, MATH, ARC-C)
- **Tooling:** TransformerLens or equivalent hook infrastructure
- **Deliverable:** Benchmark report + causal analysis of which layer positions contribute most to reasoning tasks
- **Owner:** Research / Entif

### H2 — Broadcast Register
- **Method:** Collect stylometric variance corpus across 5+ model families (base vs instruction-tuned); compare entropy, n-gram diversity, and syntactic variation against human baseline (published corpora)
- **Tooling:** stylometric analysis pipeline; existing 2025 papers as baseline
- **Deliverable:** Variance comparison report across base/instruction-tuned models and human writing
- **Owner:** Research

### H3 — Human Lineage
- **Method:** With explicit consent, collect longitudinal corpus from a small cohort; apply author-profiling classifiers to recover demographic and behavioral traits; measure accuracy vs null baseline
- **Privacy:** All data pseudonymized; ethics review required; no indefinite retention
- **Deliverable:** Feasibility study with privacy-preserving methodology
- **Owner:** Research / Legal

### H4 — Fingerprint Divergence
- **Method:** Prompt 5+ LLM families for persona imitation of specific human corpora; measure divergence between persona output and actual human baseline; design Turing-style discrimination protocol
- **Deliverable:** Fingerprint divergence benchmark and discrimination accuracy report
- **Owner:** Research

## Dependencies

- None. This research program can proceed independently of spec work.
- Informed by PR #1190 (personhood provenance governance addendum) for privacy/safety guardrails

## Response Options

1. **Fund full research program** — Commission all 4 hypothesis validation tracks with dedicated resources
2. **Start with H1 replication** — Validate layer corridor hypothesis first (most concrete, lowest privacy risk)
3. **Commission H2 stylometry study** — Lowest cost, high strategic value for understanding LLM standardization
4. **Defer until governance framework is mature** — Research program creates data that could itself be identity-infrastructure; wait for CRT-005 (default-deny identity policy) and CRT-008 (anti-impersonation red-team)
