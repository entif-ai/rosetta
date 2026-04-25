# ROSETTA-v3-006: Episteme Layer 4 Scope Undefined

**Type:** open-question  
**Priority:** P3  
**Source document:** `docs/RFCs/Rosetta v3.0.0 Core Spine Specification.md`  
**Extraction date:** 2026-04-25  
**Confidence:** medium  

## Summary

The spec mentions an optional Layer 4 (Epistemic layer) for truth assessment via Episteme tiles, but does not define its scope, trigger conditions, or relationship to Evaluation tiles.

## Evidence

From § Meaning Pipeline: "Epistemic layer (optional formal layer 4)":

> You could consider: Layer 4: *Post-interpretation reasoning*, producing Episteme and Evaluation tiles. But those fit in Feedback and Conformance sections. The core pipeline focus is 0–3 as above.

The Episteme definition:

> An **Episteme** tile aggregates multiple evidence and evaluation matrices to summarize the state of belief about a particular assertion or question... The purpose is to avoid **collapse of nuance**.

## Problem

Layer 4 is described as "optional" but no criteria are given for when it should be invoked vs. when to use simple Evaluation tiles. Key questions:
- When does a concept/frame output trigger Episteme creation?
- What is the relationship between an Episteme and an Evaluation tile?
- Is Layer 4 required for any specific conformance profile?

## Recommendation

Clarify Layer 4 scope:
1. Define trigger conditions
2. Define the data flow between Episteme and Evaluation tiles
3. Map Layer 4 to specific conformance profiles
4. Provide a normative example of Episteme generation

## References

- Core Spine Spec § Meaning Pipeline (Epistemic layer)
- Core Spine Spec § Normative Glossary (Episteme, Matrix, Evaluation)

## GitHub Issue

(`rosetta-v3-006-episteme-layer-4-scope.md` — draft)
