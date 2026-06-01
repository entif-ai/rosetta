# SEM-011: Thin Slice — Dollahs Product/Offer + VieDay Task/Goal Semantic Emission

## Type

`implementation`

## Summary

Implement the first validation slice: Dollahs.com emits `Product`/`Offer` JSON-LD with signed prices, `GET /products/{id}` with content negotiation, and MCP tools `dollahs.product.read` + `dollahs.cart.add`. VieDay emits `Task`/`Goal` JSON-LD with `StartAction`/`CompleteAction`, and MCP tools `vieday.task.read` + `vieday.task.complete`. This validates the compounding thesis before full rollout.

## Problem

The semantic SDK and MCP server are untested. A focused first slice on two apps (Dollahs for commerce, VieDay for productivity) proves the technical approach and validates the business thesis before committing engineering resources to a full rollout.

## Proposed Approach

### Dollahs.com slice

1. **Product entity**
   - `GET /products/{id}` returns JSON-LD with `Content-Type: application/ld+json`
   - `@type: Product`, `@id: https://dollahs.enti.ai/product/{id}`
   - Includes: name, description, image, sku
   - Link header: `Link: <https://enti.ai/contexts/app.jsonld>; rel="http://www.w3.org/ns/json-ld#context"`

2. **Offer entity** (nested in Product or standalone)
   - `@type: Offer`
   - `price`, `priceCurrency`, `availability` — all signed (SEM-007)
   - `proof` block with JWS signature

3. **MCP tools**
   - `dollahs.product.read`: fetch Product by ID, returns signed JSON-LD
   - `dollahs.cart.add`: add item to cart, idempotent, dry-run supported

4. **sitemap-ld.json**
   - Lists all products and offers with `lastModified`
   - Agent polls for changes

### VieDay slice

1. **Task entity**
   - `GET /tasks/{id}` returns JSON-LD with `Content-Type: application/ld+json`
   - `@type: Action` (with `ToDo` classification)
   - State machine: `created → started → completed` with typed transitions

2. **Goal entity**
   - `GET /goals/{id}` returns JSON-LD
   - `@type: Plan` or goal schema

3. **MCP tools**
   - `vieday.task.read`: fetch Task by ID
   - `vieday.task.complete`: mark task done, idempotent, dry-run supported

4. **sitemap-ld.json**
   - Lists all tasks/goals with `lastModified`

### Cross-app demo (validation scenario)

The reference agent demonstrates:
1. Given a user goal (e.g., "track my project management tasks and order supplies")
2. Finds needed items on Dollahs via `dollahs.product.read`
3. Creates scheduled tasks in VieDay via `vieday.task.complete`
4. All via semantic links and MCP tools — no HTML scraping

### Success metrics

- % routes emitting valid JSON-LD: target 100%
- Accessibility pass rate: target 100% (WCAG 2.2 AA)
- Agent fetch ratio vs page scrapes: measure from pilot agent
- Token spend per resolved query: measure before/after
- MCP tool call success rate: target > 95%

## Dependencies

- SEM-001, SEM-002, SEM-003, SEM-004, SEM-005 (all foundation pieces must be ready)

## Labels

`beachhead`, `dollahs`, `vieday`, `thin-slice`, `semantic-default`, `implementation`

## Evidence

- `docs/ideas/20260225 - Chat GPT - Web 3.0 and Semantic Web.md` — "thin vertical slice to prove it quickly: Dollahs.com and VieDay"; full implementation plan for both apps with MCP tools listed

## Status

draft