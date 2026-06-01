# SEM-010: Context Weave CLI for Compact LLM Context Packs

## Type

`implementation`

## Summary

Build the Context Weave service/CLI that, given a target artifact ID and byte budget, walks the artifact graph outward, preferring public interfaces, and constructs the smallest unambiguous context pack for LLM consumption. Policy: types > contracts > tests > implementation.

## Problem

LLMs working on new tasks need context from the artifact graph, but dumping the entire corpus is too large. A context weaver must intelligently select the minimal set of artifacts needed to understand and safely extend the target, respecting a byte budget.

## Proposed Approach

### CLI interface

```bash
ATLAS_ENDPOINT=... ATLAS_TOKEN=... \
pnpm weave -- --id entif://vieday/tasks/startTimer@1.2.0 \
  --budget 120000 \
  --depth 2 \
  > context.md
```

### Behavior

1. Fetch target artifact via GraphQL with `$depth` parameter
2. Walk `dependsOn` edges outward to specified depth
3. Fetch all relation artifacts (IMPLEMENTS, VARIANT_OF, SUPERSEDES)
4. Render each artifact's FM as structured text (key fields first)
5. Apply byte budget trim from bottom (implementation over types)
6. Output compact Markdown document

### Render order per artifact

```
## {artifact.id} (v{version}, {kind})

**Contract**
```
{Inputs}
→ {Outputs}
Determinism: {Determinism}
Side-effects: {Side-effects}
Preconditions: {Preconditions}
Postconditions: {Postconditions}
```

**JSON-LD** (if applicable)
```json
{JSONLD block}
```

**MCP tools**
```json
{MCP tools block}
```

**Depends on**
- {dep.id} → see below

**Test coverage**: {Tests}
```

### Policy rules

1. **Types first**: Always include `Inputs`, `Outputs`, and `Surface` signature
2. **Contracts over implementation**: Include pre/postconditions before code
3. **Tests as evidence**: Include test names and coverage summary
4. **Implementation last**: Only include implementation code if budget allows
5. **Private helpers collapsed**: If private helpers are numerous, collapse to count summary

### Budget enforcement

```typescript
function budgetTrim(doc: string, limit: number): string {
  if (Buffer.byteLength(doc, "utf8") <= limit) return doc;
  const keep = Math.max(0, limit - 200);
  return doc.slice(0, keep) + "\n\n<!-- trimmed for budget -->";
}
```

### Integration points

- Claude/GPT code tools: invoke via `pnpm weave -- --id X --budget Y > /tmp/context.md` before starting a task
- VS Code extension: hover on artifact ID → "Build context pack" command
- CI: verify that context packs for new artifacts fit within budget before merge

## Dependencies

- SEM-009 (registry must exist)

## Labels

`context-weave`, `llm-context`, `context-compression`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "Context Weave service: given a target task, constructs the smallest unambiguous bundle... types > contracts > tests > implementation... enforces byte budget"

## Status

draft