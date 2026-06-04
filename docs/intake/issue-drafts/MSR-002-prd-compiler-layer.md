# MSR-002: Custom PRD compiler layer — requirements extraction from large PRDs

## Issue Type
implementation

## Summary
The A→B gap (PRD to change package) is identified as the critical missing piece. None of the spec frameworks (OpenSpec, SpecKit, BMAD, GasTown) can ingest a 50-80 page PRD and produce high-quality parallel work without a custom decomposition layer. Embarrassingly simple first version needed.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 3): "none of these is sophisticated enough, by itself, to ingest a 50 to 80 page PRD... without a custom decomposition layer"
- Custom PRD compiler layer requirements: (1) extract requirements from prose, (2) separate by change surface (UI, API, data model, infra, security, analytics, content, ops), (3) build dependency graph (blocks, parallel, review gates), (4) classify uncertainty (locked/exploratory/design-freedom areas), (5) emit bounded packets

## Embarrassingly Simple First Version Scope
1. PRD section parser
2. Requirement extractor (prose → atomic requirement statements)
3. Dependency mapper (what blocks what, what can run in parallel)
4. Packet emitter (OpenSpec change package or worker brief)
5. Reviewer loop

## Labels
spec-framework, prd-compiler

## Depends On
(None)
