# AIA-005: 8-Persona Advisory Council — Data Silos May Miss Cross-Domain Correlations

**Type:** architecture / design-tradeoff
**Confidence:** HIGH
**Severity:** medium
**Source:** `docs/external/Berman - AI Assistant.txt`, Finding AIA-005

## Problem

Berman's Business Advisory Council runs 8 specialist personas in parallel, each only seeing their domain data. The personas cannot influence each other. A synthesizer then merges findings, eliminates duplicates, and ranks recommendations.

The data-silo design has a structural blind spot: **cross-domain correlations that require comparing signals across persona data stores**.

## Examples of Missed Correlations

- **"RevenueGuardian"** sees declining Beehiiv open rates (low engagement signal)
- **"GrowthStrategist"** sees YouTube subscriber conversion dropping (low conversion signal)
- Neither persona alone can conclude: "declining email engagement correlates with declining video conversion — suggest content format pivot"
- Only a cross-persona synthesizer with access to both data stores can surface this

## Gap

The synthesizer is described as merging findings from personas, not comparing raw data across personas. If the synthesizer only sees the personas' final recommendations (not the underlying signals), it can't perform cross-domain correlation analysis.

## Question for Emilie

Does the synthesizer receive raw signal data from each persona, or only their final recommendations? If only recommendations, has cross-domain correlation ever been missed?

## Suggested Action

1. Design the synthesizer to receive signal-level data, not just persona conclusions
2. Add explicit cross-domain correlation rules (e.g., engagement-drop + conversion-drop = content format alert)
3. Document which cross-domain correlations have been surfaced vs. missed historically

**Labels:** multi-agent, data-silos, synthesis, cross-domain-correlation
**Related:** AIA-001 (Personal CRM scope)