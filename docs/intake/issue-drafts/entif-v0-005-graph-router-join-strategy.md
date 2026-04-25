# ENTIF-v0-005: Graph Router Join Strategy Enumeration Incomplete and Cache TTL Unjustified

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-005 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #10 in ledger |
| Confidence | `medium` |

---

## Problem Statement

The graph-router API response schema shows:

```json
"decision": {
  "targets": [
    {"store": "graph:contributors.neo4j", "reason": "domain=contributors"},
    {"store": "vec:pgvector", "reason": "pattern=similarity needs embedding"}
  ],
  "join_strategy": "application_layer",
  "cache": {"policy": "read_through", "ttl_sec": 900}
}
```

**Two problems:**

1. `join_strategy: "application_layer"` is a singular example — the full enumeration of possible join strategies is not provided. What are the alternatives? (`database_federation`? `distributed_query`? `post_query_merge`?)

2. The `ttl_sec: 900` cache TTL (15 minutes) has no stated rationale. Why 900 seconds? Too short for some workloads (causes redundant fetches), too long for others (serves stale data).

---

## Evidence

The spec defines the routing decision logic in prose ("based on: domain, confidence tier, TTL, privacy class, and query pattern") but does not enumerate the possible values for `join_strategy` or justify the TTL default.

The response schema is the only place `join_strategy` appears — there is no table or enumeration showing the available strategies and when each applies.

---

## Impact

- The graph router cannot be deterministically implemented without a complete join strategy enumeration
- Cache TTL without justification means teams will set it arbitrarily, leading to inconsistent cache behavior
- The router's explain field (`explain: [...]`) would be unverifiable — different implementations would give different routing decisions

---

## Dependencies

- None (routing logic is independent)

---

## Suggested Resolution

1. Define the complete join strategy enumeration:
   - `application_layer`: fetch from each target store separately, merge in application code
   - `database_federation`: push-down join to federated query engine (if available)
   - `post_query_merge`: sequential fetch with client-side join after both return
   - `cache_only`: serve from cache without hitting underlying stores (for read-through policy)
2. Define the decision rule: which join strategy applies given which combination of (store count, pattern, TTL class)
3. Justify the cache TTL: 900 seconds ≈ 15 minutes; provide the reasoning and define it as a configurable default
4. Add a routing decision log to the telemetry minimum

---

## Open Questions

- Should the join strategy be configurable per query, or is it always determined by the router based on the query pattern?
- Should there be a `bypass_cache` flag in the request context?