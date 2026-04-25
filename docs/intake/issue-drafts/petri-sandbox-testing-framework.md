# Petri Sandbox Testing Framework

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** safety, petri, alignment, self-improvement
**Depends on:** none

## Problem Statement

"Petri can automatically generate or retrieve test cases … block promotion of that new feature" and "New capabilities are gated behind passing alignment tests" are described as design goals, but no concrete test harness, adversarial scenario taxonomy, capability promotion criteria, or sandbox execution environment is specified.

## Specific Findings from Extraction

- **F-PETRI-001** (confidence: high): Petri sandbox described as concept but no concrete architecture, execution environment, or isolation spec
- **F-PETRI-002** (confidence: high): "Automatically generate test cases" — no generator architecture, no coverage criteria, no mutation strategy
- **F-PETRI-003** (confidence: high): Capability promotion gates mentioned but no numeric/pass criteria defined
- **F-PETRI-004** (confidence: medium): No definition of what "alignment tests" consist of; is it unit tests, integration tests, red-team scenarios?
- **F-PETRI-005** (confidence: medium): No mention of rollback or containment strategy if a capability test passes but the capability is later found to be unsafe

## Action Required

1. Design Petri sandbox execution environment and isolation model
2. Define adversarial test case generator architecture
3. Specify capability promotion gate criteria (numeric thresholds, evaluator model)
4. Define "alignment test" suite scope and passing criteria
