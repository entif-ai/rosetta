# BIP-006-4 — Parallel Persona Review Cannot See Other Reviews

**Use Case:** BIP-006 (Nightly Business Briefing)
**Confidence:** MEDIUM
**Type:** design

## Description

Phase 2 runs 4 personas in parallel ("simultaneously via Promise.all"), meaning each reviewer only sees the LeadAnalyst draft recommendation, not the other 3 reviewers' outputs. In a real multi-persona review, each reviewer benefits from seeing critiques and alternative perspectives from other reviewers before finalizing their own response.

## Specific Problem

1. **Limited cross-review value:** If GrowthStrategist and RevenueGuardian disagree on the same recommendation, that tension is not visible to TeamDynamicsArchitect who only sees the draft, not the other reviews.
2. **Inconsistent information:** Each reviewer critiques the same draft, but because they run in parallel they cannot reference each other's critiques for context or build on them.
3. **Non-interactive consensus:** True deliberation requires multiple rounds. The current design is a parallel-first-pass, not a deliberative process.

## Expected Behavior

Consider a two-pass review:
1. Pass 1 (parallel): Each reviewer critiques the draft independently (as currently specced)
2. Pass 2 (sequential or narrow parallel): Each reviewer sees the synthesis of Pass 1 reviews and refines their position

Alternatively, use a sequential review chain where each reviewer sees all prior reviews before contributing their own. The additional latency cost should be weighed against the quality gain from cross-review.

## Source Reference

BIP-006, "Phase 2 — Parallel review (4 personas, run simultaneously via Promise.all)"
