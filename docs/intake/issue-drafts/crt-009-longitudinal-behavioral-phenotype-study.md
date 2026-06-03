# CRT-009: Longitudinal Behavioral Phenotype — Privacy-Preserving Corpus Study Design

## Meta

- **Type:** research
- **Severity:** medium
- **Confidence:** medium
- **Tags:** research, privacy, longitudinal, author-profiling, cognitive-fingerprint, identity-safety
- **Source doc:** `docs/ideas/Chat GPT - LLM Reasoning Theory.md` (Hypothesis H3)
- **Extracted:** 2026-06-01

## Summary

The "human lineage hypothesis" (H3) — that given enough longitudinal text from one person, stable signals of cohort, region, network exposure, and life-stage drift can be recovered — needs empirical validation. However, conducting this research risks creating the very surveillance infrastructure it warns against. A privacy-preserving methodology is essential before any corpus collection begins.

## Evidence

From the source document (H3):

> Given enough longitudinal text from one person, you can recover stable signals of cohort, region, network exposure, and life-stage drift better than chance.

From the same document:

> "What I see which differentiates the cognitive fingerprint I'm referring to here is, unlike DNA, it's a trail carved throughout one's life."

From the threat model (H2 expansion):

> A malicious system does not need a metaphysically perfect replica of a person to become overwhelming. It only needs a model that is good enough to identify them, track drift, mimic their trust cues, and adapt faster than any unaugmented human can notice.

The tension: validating H3 requires longitudinal personal corpora, but that corpus is itself the dangerous artifact.

## Research Design Constraints

### Privacy-Preserving Methodology

1. **Synthetic subjects only for initial validation** — Use LLM-generated synthetic person corpora that simulate longitudinal drift patterns without real human data
2. **Pseudonymized real subjects (if needed)** — Only with explicit informed consent; data minimization; no raw corpus storage
3. **Federated analysis** — Compute over distributed data without centralizing corpus
4. **Adversarial review** — Ethics board or external reviewer evaluates whether the methodology itself creates surveillance risk
5. **No indefinite retention** — Research corpus deleted after validation is complete

### Minimum Viable Study Design

**Phase 1 — Synthetic Corpus Validation (no real human data)**
- Generate synthetic longitudinal corpora with embedded cohort/geography/life-stage signals
- Test whether author-profiling classifiers can recover these signals
- Establish baseline accuracy rates

**Phase 2 — Controlled Real-Human Pilot (small N)**
- 5-10 consenting volunteers with full transparency on methodology
- Pseudonymized corpus; no cross-corpus linkage
- Results published; corpus deleted immediately after

**Phase 3 — Longitudinal Deployment (if Phase 2 validated)**
- Larger cohort with formal ethics review
- Federated or secure enclave analysis only

### Threat Model Cross-Check

Before Phase 2, the research team must answer:
- Could the methodology be repurposed for covert surveillance?
- Are the mitigations (pseudonymization, deletion, consent) sufficient given the adversarial context?
- Who has access to the pseudonymization keys?

## Dependencies

- CRT-001 (research program): This is the H3 validation track of the cognitive-phylogenetics research program
- CRT-005 (default-deny identity policy): Default-deny should make the research environment safer by default
- CRT-007 (person-model retention): Research corpus retention controls must be in place before any real-human data

## Response Options

1. **Start with synthetic corpus only** — Phase 1 only; no real human data until methodology is proven safe
2. **Commission privacy review first** — Before any corpus work, get external ethics review of the research methodology
3. **Defer until governance is mature** — The research is most dangerous before the governance framework is in place; wait for CRT-005 and CRT-007
