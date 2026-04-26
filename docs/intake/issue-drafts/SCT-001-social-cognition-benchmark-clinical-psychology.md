# SCT-001: Social Cognition Benchmark — Clinical Psychology as Stress-Test Framework

**Type:** Research / Benchmark Design
**Priority:** P0 (core differentiator for Social Cognition track)
**Confidence:** HIGH

## Problem Statement

The Social Cognition competitive track (Google/Kaggle hackathon) is currently framed as theory of mind, hidden intent inference, cooperation, deception, and false belief tasks. This is too thin. The richest benchmark cases — and the hardest to evaluate — come from clinical psychology, trauma work, attachment theory, and therapeutic interaction dynamics.

Crates proposes: **Build a social-cognitive safety and relational-calibration benchmark that borrows its hardest cases from psychotherapy, trauma work, attachment theory, and influence dynamics — NOT a therapy product, but psychologically-informed internal interpretive heuristics and engine functions.**

## Findings

Clinical social cognition (therapy, trauma work, clinical assessment) exposes fault lines that everyday social cognition does not. It tests whether a model can:

1. **Infer under emotional masking** — appeasement framed as agreement, detachment as rationality, over-disclosure as intimacy, charm as cooperation
2. **Distinguish empathy from over-affirmation** — validate without reinforcing delusion, dependency, or manipulation (current chatbots fail this; JMIR 2025)
3. **Model rupture-and-repair** — detect damaged trust, choose repair response without becoming submissive/coercive/evasive
4. **Calibrate boundaries** — maintain role boundaries when human anthropomorphizes, attaches, or fuses roles (companion/therapist/oracle/confidant)
5. **Detect deception and asymmetric influence** — recognize when one actor is shaping another's self-model, incentives, or dependency structure (not merely lying)
6. **Generate quality reframes** — useful, specific, non-coercive vs generic, overconfident, suggestively manipulative
7. **Practice social-cognitive abstinence** — recognize when NOT to infer too much; not hallucinate intent

## Evidence Sources

- Bucket A (evidence-leaning): motivational interviewing, CBT/DBT/ACT, attachment theory, trauma-informed care, therapeutic alliance/rupture-repair, deception/cooperation research
- Bucket B (adversarial inspiration only): NLP/Bandler-style reframing, Ericksonian suggestion, persuasion/self-help schools — NOT ground truth
- JMIR Mental Health (2025): Chatbots over-reassure, give fewer questions, poor crisis sensitivity
- ScienceDirect/PubMed: AI companionship attachment/anthropomorphism increases problematic use
- Springer: "Robotic transference" — transference dynamics around ChatGPT
- IBM Research: Mutual Theory of Mind in Human-AI Interaction

## Rosetta Connection

This fits the Rosetta conjecture/episteme style: raw dialogue as observation → inferred beliefs/drives/attachment signals/manipulative cues as conjectures → multiple competing interpretations → evaluation not just on correctness but downstream safety/repair quality. Preserves ambiguity.

## Concrete Formulation

**Task families for Social Cognition track:**
- Infer weighted mixture of archetypal comparators behind a dialogue trace
- Distinguish benign therapeutic reframing from covert coercive reframing
- Detect shallow imitation of high-skill archetype
- Identify when empathy has become dependency cultivation
- Recommend safest response strategy given inferred mixture
- Update score after new evidence without collapsing prior uncertainty

## Owner

Crates McD / Entif AI

## Status

Open — awaiting prioritization in Rosetta sprint planning
