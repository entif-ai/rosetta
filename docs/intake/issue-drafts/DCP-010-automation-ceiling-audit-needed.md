# DCP-010: Automation ceiling audit not done for existing specs

**Type:** issue-candidate  
**Confidence:** medium  
**Source:** `docs/chats/20260225 - Chat GPT - DeepCode prototype potential.md` §2

## Problem

The conversation identified automation ceilings per project (VieDay: 60-90% backend, 20-50% behavioral; SAFE: 60-90% data model/API, 20-50% CV; Entif: 20-50% infra, ~0% core epistemic engine) but these are rough estimates. No formal audit of existing specs for DeepCode-readiness exists.

## Evidence

"VieDay: Backend & admin UI: high automation. Behavioral intelligence: medium. Deep behavioral ML: low unless spelled out." "SAFE: Data model, APIs, admin, import/export: high. Hardware + advanced CV: medium-low." "Entif: Infra/services/pipelines: medium-high. Core epistemic engine: firmly human."

## Required

1. Audit existing specs for DeepCode-readiness: section structure, component boundaries, pseudo-code/workflows, success criteria
2. Score each subsystem: what % is spec'd well enough for doc→repo?
3. Identify gaps: what needs to be added to specs to raise automation ceiling?
4. Prioritize: which subsystem has highest automation ceiling → first experiment target
5. Produce a "spec readiness matrix" as living document

## Notes

- No technical dependencies; can proceed independently
- Output informs which project to use for first hello-world experiment
