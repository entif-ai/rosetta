# SEM-008: Feature Map (FM) File Schema and atlas-sync.ts

## Type

`implementation`

## Summary

Define the formal Feature Map (FM) file schema as a structured Markdown format for LLM-ready artifact summaries, and implement `atlas-sync.ts` to parse `*.fm.md` files and upsert them into the Code Atlas registry via GraphQL.

## Problem

LLMs working on new code need compact, precise summaries of existing artifacts — interfaces, contracts, effects, dependencies, tests. Without a standard format, engineers write inconsistent summaries that can't be reliably parsed by tooling.

## Proposed Approach

### FM file format

Every source file and completed feature ships a `*.fm.md` file in the same directory:

```
# FM: packages/vieday/tasks/startTimer.ts

ID: entif://vieday/tasks/startTimer@1.2.0
Kind: function
Surface: (taskId: TaskId, now: Instant) => Effect<Clock, Err, StartedTimer>
Inputs: TaskId, Instant
Outputs: StartedTimer
Determinism: referential (effects isolated via Clock)
Side-effects: reads Clock.now, writes KV: timers/{taskId}
Preconditions: task exists, not already running
Postconditions: timers/{taskId}.status == "running"
Complexity: O(1)
Dependencies: kv:Timers, module:tasks.repo
Tests: tests/startTimer.spec.ts (15 cases, 100% branch)
Security: id scoped to owner; auth: session->ownerOf(taskId)
Telemetry: event:TaskTimerStarted v2
JSON-LD emitted:
  @context: ["https://schema.org", "https://enti.ai/contexts/app.jsonld"]
  @type: Action
  @id: https://vieday.enti.ai/action/{taskId}/start
  properties:
    - startTime: Instant
MCP tools:
  - name: vieday.timer.start
    args: { taskId: string }
    idempotent: true
    dryRun: supported
Routes:
  - POST /tasks/{taskId}/start (idempotency-key required)
```

### atlas-sync.ts

```typescript
// Parses *.fm.md files and upserts to registry via GraphQL
// Env: ATLAS_ENDPOINT, ATLAS_TOKEN
// Run: pnpm atlas:sync (also in CI on push to main)
```

Key parsing logic:
- YAML-like structured fields (key: value)
- JSON-LD and MCP tools sections use indentation-based block capture
- Minimal YAML-to-JSON converter for JSON-LD blocks
- Upsert via GraphQL `upsertArtifact` mutation

### CI integration

```yaml
# .github/workflows/atlas-sync.yml
on:
  push:
    branches: [main]
    paths: ["**/*.fm.md"]
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm i -g corepack && corepack enable
      - run: pnpm install
      - run: pnpm atlas:sync
        env:
          ATLAS_ENDPOINT: ${{ secrets.ATLAS_ENDPOINT }}
          ATLAS_TOKEN: ${{ secrets.ATLAS_TOKEN }}
```

## Dependencies

- SEM-009 (Code Atlas registry must exist to upsert to)

## Labels

`feature-map`, `code-atlas`, `artifact-registry`, `fm-md`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — FM template with 16 structured fields; atlas-sync.ts code listing; GitHub Action yaml

## Status

draft