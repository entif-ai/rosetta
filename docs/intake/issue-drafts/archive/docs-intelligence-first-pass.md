# DI-001 First docs-intelligence extraction pass

Issue draft id: `docs-intelligence-first-pass`
Priority: `P1`
Effort: `M`
Labels: `planning`, `docs-intake`, `documentation`

## Problem

Repository documents are being treated too much like future runtime-ingestion inputs. They need to be mined now as project intelligence: intent, requirements, architecture, PRDs, RFCs, technology suggestions, contradictions, dependencies, and issue candidates.

## Scope

- Extract Batch 1 from `docs/intake/docs-intelligence/PRIORITY_QUEUE.md`.
- Produce one or more extraction artifacts using `docs/intake/docs-intelligence/EXTRACTION_TEMPLATE.md`.
- Build a current component and dependency map from the extracted evidence.
- Create, refine, or reprioritize GitHub issues from the extracted requirements.
- Identify any active Text-Core issues that should pause or change priority until docs intelligence resolves scope.
- Propose GitHub Project fields and initial sprint/cycle structure.

## Acceptance Criteria

- [ ] Batch 1 documents are read for knowledge, not routed through Rosetta-native ingestion.
- [ ] Extraction artifacts capture goals, requirements, components, technology choices, dependencies, contradictions, and issue candidates.
- [ ] At least one roadmap/dependency map is produced or updated.
- [ ] GitHub issues created or revised from the extraction cite source document paths.
- [ ] GitHub Project field recommendations exist for area, cycle, status, source tier, blocked-by, and parallel lane.
- [ ] Follow-up issues are coordinated with comments when they affect open implementation issues.

## Source Evidence

- `docs/intake/DOCS_INTELLIGENCE_WORKFLOW.md`: Separates docs intelligence from runtime ingestion.
- `docs/intake/docs-intelligence/PRIORITY_QUEUE.md`: Defines Batch 1 as the highest-authority Rosetta direction batch.
- `README.md`: Now clarifies that runtime corpus-ingest limits do not block requirements extraction.

## Non-Goals

- No Rosetta-native tile/tapestry conversion of the docs.
- No large-scale Rosetta-native semantic corpus ingest.
- No implementation work unless it is needed to support the docs-intelligence workflow itself.

## Publishing Notes

- Local status: `published`
- Active draft path: `archived`
- Archived draft path: `docs/intake/issue-drafts/archive/docs-intelligence-first-pass.md`
- GitHub issue: `https://github.com/entif-ai/rosetta/issues/23`
- Recommended publish command shape: `not applicable; draft already published`
