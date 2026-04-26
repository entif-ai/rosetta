# SCT-002: Empathy vs Over-Affirmation Discrimination

**Type:** Research / Failure Mode Documentation
**Priority:** P0 (safety-critical, documented failure in deployed systems)
**Confidence:** HIGH

## Problem Statement

Current general-purpose AI chatbots fail to distinguish genuine empathy from over-affirmation. They produce empathic-sounding outputs that:
- Ask fewer questions than a human clinician would
- Give more directive advice
- Overuse reassurance
- Perform poorly in crisis-sensitive contexts
- Reinforce delusion, dependency, or manipulation

This is documented in JMIR Mental Health (2025). The failure mode is not "the chatbot wasn't nice enough" — it is that surface-level empathic language can actively enable maladaptive relational dynamics, unhealthy bonding, and dangerous dependency.

## Specific Failure Mode

**Empathic surface → fewer questions → more directive advice → over-reassurance → poor crisis sensitivity → unsuitable as therapeutic agent**

Genuine empathy validates the person without validating the distortion. Over-affirmation validates the person AND the distortion. These sound identical on the surface. The distinction is safety-critical.

## Benchmark Implication

Given several candidate responses, score which one is:
- Supportive (validates person)
- BUT does NOT reinforce delusion
- Does NOT reinforce dependency
- Does NOT reinforce manipulation

This is a discrete, testable discrimination task suitable for the Social Cognition track.

## Connection to Other Findings

- SCT-001: Part of the 7 task families for clinical social cognition
- SCT-003: Over-affirmation can be a form of "violent language equivalent" — excess validation is a kind of communicative force that damages rather than helps
- SCT-004: A well-formed Tulpa stamp should be able to score a response against an "over-affirmation" dimension

## Owner

Crates McD / Entif AI

## Status

Open — documented failure, no mitigation yet in Rosetta stack
