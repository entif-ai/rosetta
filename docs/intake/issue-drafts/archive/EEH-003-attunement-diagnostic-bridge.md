# EEH-003: Attunement Axis Diagnostic Bridge

## Type
architecture/spec-gap

## Status
issue-candidate

## Priority
MEDIUM

## Evidence
docs/intake/docs-intelligence/2026-04-25-empathy-eval-harness.md — Finding 7

## Problem Statement

Finding 7 establishes that when Attunement (A) drops, it signals one of three internal failures: (1) retrieval is noisy, (2) salience model is wrong, (3) emotional state estimator not binding to correct evidence. No diagnostic bridge currently exists connecting A-axis behavioral signal to internal system state. This is a spec gap.

Additionally, "emotional state estimator" is mentioned as a distinct internal component — the first mention of such a component in the corpus. This may represent a new architectural element requiring explicit specification.

## Detail

From Finding 7:
"If A drops, your retrieval is noisy, your salience model is wrong, or your 'emotional state estimator' isn't binding to the right evidence"

Three diagnostic paths when A-axis declines:

Path 1: Retrieval noise
- Vector store returning irrelevant or tangentially-related memories
- Symptoms: A drops for conversations with long history; user references something from >7 days ago and gets wrong context
- Diagnostic: measure retrieval precision@k for attunement-relevant queries

Path 2: Salience model failure
- System fails to weight recent high-importance events correctly
- Symptoms: A drops when user情绪 is elevated but recent events are mixed
- Diagnostic: compare A scores with explicit user importance signals

Path 3: Emotional state estimator misbinding
- "Emotional state estimator" is a new architectural component referenced but not specified
- Symptoms: A drops when user emotional state shifts mid-conversation; model responds to wrong emotional signal
- Diagnostic: track emotional state estimator output vs user signal correlation

## Implementation Notes

- Requires defining "emotional state estimator" as an architectural component (if it doesn't exist yet)
- Diagnostic bridge must translate A-axis behavioral failures into actionable system-level alerts
- Consider: A-axis score as a composite health metric for memory subsystem
- Connection to memory planes (Plane 2 = temporal/history, Plane 3 = activation/relevance) — A likely touches all three planes

## Dependencies
- Memory planes specification (Plane 1/2/3 from NOT LAME)
- Source episode + observation separation (per Rosetta Bootstrap)
- Salience model (not yet specified in current corpus)

## New Architectural Element

"Emotional state estimator" — first mention in corpus. Needs specification:
- What signals does it bind to?
- How does it differ from salience model?
- What is its input/output interface?
- How does it handle rapid emotional shifts?
- What is its failure mode taxonomy?

## Labels
attunement, diagnostic-bridge, memory-discipline, emotional-state-estimator, spec-gap, architecture