# Cheap-Agent Docs Intelligence Runbook

Status: active operating contract
Date: 2026-04-24

## Purpose

This runbook lets lower-cost agents mine repository docs in parallel without confusing docs intelligence with Rosetta runtime ingestion.

The job is extraction, not invention. Read the assigned source, produce cited findings, and stop. A stronger orchestrator will dedupe, resolve conflicts, shape issues, and decide implementation priority.

## Hard Rules

- Do not claim a source document has been ingested into Rosetta.
- Do not create Rosetta tiles, tapestries, source episodes, observations, embeddings, or indexed corpus state.
- Do not rewrite source docs.
- Do not edit implementation code.
- Do not update GitHub issue bodies unless explicitly assigned.
- Do not create GitHub issues directly unless explicitly assigned.
- Do not combine unrelated documents into one batch just because they are nearby.
- Do not infer missing requirements without marking them as inference.
- Do not quote long passages; use path plus heading and short evidence snippets only when needed.

## Claim Protocol

Before starting a batch, comment on the active GitHub issue:

```md
Taking docs-intelligence batch:
- Sources:
  - `docs/...`
- Output:
  - `docs/intake/docs-intelligence/YYYY-MM-DD-short-name.md`
- Expected touches:
  - extraction artifact only
- Possible affected issues:
  - #...
```

If another agent has already claimed the same source, choose another source or ask the orchestrator.

## Batch Size

Default to one source document per agent.

Use a two-document batch only when the files are tightly coupled, such as a PRD plus its short companion note.

Do not process more than about 10,000 words in one low-cost-agent pass unless explicitly assigned.

## Output Path

Write extraction artifacts under:

```txt
docs/intake/docs-intelligence/
```

Use this filename shape:

```txt
YYYY-MM-DD-short-source-or-batch-name.md
```

Examples:

- `2026-04-24-batch-1-highest-authority-rosetta-direction.md`
- `2026-04-25-not-lame-prd-extraction.md`

## Required Reading

Read these first:

- `README.md`
- `docs/intake/DOCS_INTELLIGENCE_WORKFLOW.md`
- `docs/intake/docs-intelligence/PRIORITY_QUEUE.md`
- `docs/intake/docs-intelligence/EXTRACTION_TEMPLATE.md`

Then read only the assigned source document(s).

## Finding Rows

Every salient finding should become one row in the finding ledger.

Use these finding types:

- `requirement`
- `decision`
- `risk`
- `contradiction`
- `supersession`
- `issue-candidate`
- `dependency`
- `technology`
- `open-question`
- `ablation`

Use confidence values:

- `high`: directly stated by source text
- `medium`: strongly implied by source text
- `low`: weak implication, needs orchestrator review

Use lowercase kebab-case tags. Prefer stable tags:

- `text-core`
- `runtime-ingestion`
- `docs-intelligence`
- `storage`
- `retrieval`
- `tapestry`
- `rights`
- `importers`
- `english-accompaniment`
- `governance`
- `project-board`
- `parallelization`

## Recommendation Style

Recommendations should be operational and modest:

- `create issue draft`
- `update issue #10`
- `defer to later batch`
- `mark as superseded by newer doc`
- `ask orchestrator`
- `no action`

Avoid broad commands like "build this system" or "implement everything."

## Done Checklist

Before handing off:

- extraction file exists and uses the template
- source paths are exact
- every non-obvious claim has evidence
- low-confidence findings are marked `low`
- contradictions are recorded instead of resolved silently
- issue recommendations name specific issues when possible
- no runtime-ingestion claims are made
- `git diff --check` passes

## Completion Comment

After finishing, comment on the active GitHub issue:

```md
Completed docs-intelligence batch:
- Sources:
  - `docs/...`
- Output:
  - `docs/intake/docs-intelligence/YYYY-MM-DD-short-name.md`
- Findings:
  - N total
  - N requirements
  - N risks
  - N issue candidates
- Recommended issue actions:
  - #...
- Validation:
  - `git diff --check`
- Uncertainty:
  - ...
```

## Escalate Instead Of Guessing

Escalate to the orchestrator when:

- two docs conflict and neither is clearly higher authority
- a source appears obsolete but no replacement is obvious
- an implementation issue would change package ownership
- the source implies a new product surface or external dependency
- evidence is too vague to support an issue
