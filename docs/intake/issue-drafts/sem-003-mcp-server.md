# SEM-003: MCP Server — Public Tool Schema and Wire to Effect Modules

## Type

`implementation`

## Summary

Build a read-mostly MCP server that fronts the knowledge graph and action surfaces without exposing internal topology. Three tool classes: (1) Entity tools (fetch by ID, search by field, traverse typed relations), (2) Insight tools (higher-order summaries, safe to open-source), (3) Action tools (narrow idempotent operations with dry-run support).

## Problem

AI agents (Atlas, Comet, Copilot, custom LLMs) need a stable, typed interface to read Entif data and take safe actions — without scraping HTML or calling internal APIs. There is no MCP server today.

## Proposed Approach

### Tool schema

```json
{
  "tools": [
    {
      "name": "vieday.task.read",
      "description": "Fetch a task by its canonical ID",
      "args": { "type": "object", "properties": { "taskId": { "type": "string" } }, "required": ["taskId"] },
      "idempotent": true,
      "dryRun": "supported"
    },
    {
      "name": "vieday.task.complete",
      "description": "Mark a task as completed",
      "args": { "type": "object", "properties": { "taskId": { "type": "string" }, "completedAt": { "type": "string" } }, "required": ["taskId"] },
      "idempotent": true,
      "dryRun": "supported"
    },
    {
      "name": "dollahs.product.read",
      "description": "Fetch a product by its canonical ID with signed offer",
      "args": { "type": "object", "properties": { "productId": { "type": "string" } }, "required": ["productId"] },
      "idempotent": true,
      "dryRun": "supported"
    },
    {
      "name": "dollahs.cart.add",
      "description": "Add an item to a cart (dry-run available)",
      "args": { "type": "object", "properties": { "cartId": { "type": "string" }, "productId": { "type": "string" }, "quantity": { "type": "integer", "minimum": 1 } }, "required": ["cartId", "productId"] },
      "idempotent": true,
      "dryRun": "supported"
    }
  ]
}
```

### Architecture

- MCP server translates tool calls to internal orchestration APIs
- Internal topology never exposed; only public contract
- All write operations require `idempotency-key` header
- Dry-run mode: executes in shadow, returns predicted state without committing
- Rate-limiting: per `@id` + `lastModified` caching to minimize redundant calls

### Security

- PII behind scope-gated parameters
- Redaction policies enforced at edge
- Tamper-evident audit trail for all tool invocations
- Supply-chain: SBOM, Sigstore signatures, SLSA provenance per release

### Open-source split

- Public: SDK, MCP server, public contexts, validators, reference agent
- Closed: full ontology, ranking/recommendation logic, risk models, cross-app decision policies

## Dependencies

- SEM-001 (public context), SEM-002 (SDK)

## Labels

`mcp`, `agent-tooling`, `public-context`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "a read-mostly MCP server that fronts the knowledge graph and action surfaces without exposing internals" and three tool classes description

## Status

draft