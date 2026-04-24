# Docs Intelligence Workflow

Status: active planning doctrine
Date: 2026-04-24

## Purpose

Docs intelligence turns the repository's planning, PRD, RFC, governance, chat, idea, external, and frontier documents into engineering knowledge. The output is a clearer roadmap, issue backlog, dependency map, project-board structure, and implementation sequence.

This workflow is not runtime ingestion. Do not block it on Ingress Refinery, canonical cache, Rosetta-native tiles, pasigraphy translation, or tapestry generation. Those systems may eventually process arbitrary documents as product behavior, but the repository's own source documents must be mined now as project intelligence.

## Hard Boundary

Docs intelligence is an agent operations loop over the repo's `docs/` folder. It is not Rosetta Protocol product behavior.

Current docs-intelligence outputs are plain Markdown, issue drafts, GitHub issue comments, labels, source citations, and orchestration notes. They are not Rosetta tiles, tapestries, protocol-native observations, semantic corpus entries, or claims that Rosetta has ingested the documents.

Use product terms such as source episodes, observations, tapestries, rights-scoped retrieval, Postgres/pgvector, and English accompaniment only when describing future Rosetta/Entif implementation work extracted from the documents. Do not use those terms to describe the current docs-mining loop.

## Cheap-Agent Extraction Loop

This workflow should be decomposable for low-cost round-the-clock agents such as MiniMax, Qwen, or similar models.

Assign those agents small batches, preferably one document or one tightly related document pair at a time. Each batch should produce findings that include:

- extraction timestamp
- source path
- title or nearest heading
- date evidence from top matter, filename, or ledger
- classification tags
- subjects and components mentioned
- salient requirement, decision, risk, contradiction, or outdated claim
- citation to the source path and heading or short excerpt
- issue-draft candidate, refinement, or ablation recommendation
- confidence and uncertainty notes

Cheap-agent outputs are raw planning intelligence. They should be handed back to a stronger orchestrator for deduplication, conflict resolution, issue shaping, sequencing, and final build decisions.

## Boundary

Use docs intelligence for:

- goals, intent, problem statements, and success criteria
- architecture, components, package boundaries, and service boundaries
- PRD and RFC requirements
- technology suggestions and integration candidates
- conceptual value and product theses
- dependencies, contradictions, risks, and open questions
- issue candidates, epics, milestones, and project-board fields
- sprint/cycle planning and parallel-agent coordination

Do not use this workflow for:

- claiming the docs have been ingested into Rosetta's runtime corpus
- translating source docs into canonical Rosetta tiles unless an explicit implementation issue asks for that
- large-scale Rosetta-native semantic corpus ingest
- overwriting higher-authority docs with lower-authority chat or idea material

## Agent Startup

An agent assigned to docs intelligence should:

1. Read `README.md`, `docs/handoffs/CURRENT_HANDOFF.md`, this file, and `docs/intake/docs-intelligence/PRIORITY_QUEUE.md`.
2. Run `git status --short --branch`.
3. Inspect open GitHub issues and recent comments before taking a batch.
4. Comment on the GitHub issue it is taking, including document paths and expected output files.
5. Work on a focused `codex/` branch.
6. Produce extraction artifacts before creating or revising implementation issues.
7. Link every issue candidate to source document paths and, where useful, specific headings or quoted short excerpts.

## Extraction Output

Use `docs/intake/docs-intelligence/EXTRACTION_TEMPLATE.md` for each document or tightly related batch.

Every extraction should capture:

- source identity: path, title, date evidence, authority tier, and freshness
- extraction timestamp
- short source summary
- goals and intent
- requirements and acceptance candidates
- components, technologies, APIs, packages, apps, or data stores named or implied
- conceptual claims and product value
- dependencies and sequencing constraints
- contradictions, tensions, or supersession notes
- finding-level classification tags, subjects, citations, confidence, and action recommendations
- issue candidates with labels, likely owners/packages, dependencies, and priority rationale
- project-board fields such as area, cycle, status, blocked-by, and parallelization notes

## Priority Rules

Prefer documents in this order unless a GitHub issue says otherwise:

1. Current coordination and governing docs: `README.md`, `docs/handoffs/CURRENT_HANDOFF.md`, `docs/governance/`, and `docs/live/`.
2. Current planning docs: `docs/backlog/`, `docs/PRDs/`, and `docs/RFCs/` dated 2026-04 or newer.
3. Recent source-dialogue docs in `docs/chats/` that directly explain Rosetta, Entif, agent orchestration, memory, ontologies, or engineering process.
4. Exploratory `docs/ideas/` docs that propose product lines, platform capabilities, analytics, or data pipelines.
5. External and frontier research docs, used as supporting inspiration unless promoted by higher-authority docs.

Within a tier, prefer newer dated docs, then filenames and directories that name Rosetta, Entif, PRD, RFC, architecture, backlog, memory, ontology, project orchestration, or ingestion.

## GitHub Workflow

Docs intelligence should create and refine issues, not just notes.

Use this ladder:

1. Extract source facts into an artifact.
2. Draft candidate issues under `docs/intake/issue-drafts/` when the work is not yet ready for GitHub.
3. Publish high-confidence issues to GitHub after review.
4. Update `docs/intake/github-issue-ledger.json`.
5. Rerun `pnpm run docs:intake`.
6. Archive published drafts.
7. Add GitHub comments when work affects other active issues.

When GitHub Projects are available, use fields like:

- Area: docs-intelligence, runtime-ingestion, kernel, cache, tapestry, store, UI, integrations
- Cycle: discovery, bootstrap, text-core, alpha-rc
- Status: candidate, ready, active, blocked, review, done
- Source tier: governance, live, backlog, PRD, RFC, chat, idea, external, frontier
- Blocked by: issue or document dependency
- Parallel lane: safe agent ownership boundary

## Definition Of Done

A docs-intelligence batch is done when:

- extraction artifacts exist for the selected docs
- contradictions and supersession notes are recorded
- issue candidates are either drafted, published, or explicitly deferred
- GitHub issue comments identify ownership and impact
- `docs/intake/github-issue-ledger.json` reflects published issue state
- `pnpm run docs:intake` and `git diff --check` pass

## Explicit Non-Blocker

The statement "do not perform large-scale Rosetta-native semantic corpus ingest" only blocks Rosetta runtime/native corpus ingestion. It does not block reading repository docs and extracting project requirements for planning.
