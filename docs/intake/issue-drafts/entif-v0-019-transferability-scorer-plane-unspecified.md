# ENTIF-v0-019: Transferability Scorer Plane — No API, Input Schema, or Output Schema Defined

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-019 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #27 in ledger |
| Confidence | `medium` |
| Depends On | — |

---

## Problem Statement

The spec names the Transferability Scorer Plane as: "the heart of your 'metacognitive transferable ideas' doctrine. It operationalizes transferability as a scored artifact, not a vibe."

**But the plane has no defined API, input schema, or output schema beyond the standalone transferability_score.v0 example.** What triggers a scoring run? Which artifacts are scored? What does the scorer consume as input? How is the score delivered to the caller?

The standalone schema example shows what a score looks like, but not how to request one or what the scoring contract is.

---

## Evidence

The spec says the Transferability Scorer consumes canonical knowledge objects and emits scored artifacts. The plane is shown in the architecture dependency graph as downstream of Domain Intelligence and Knowledge Topology.

But there is no: `POST /transferability/score` endpoint, no input schema (what artifact kinds are valid inputs), no scoring trigger definition (on-demand vs event-driven), no timeout specification.

---

## Impact

- The Transferability Scorer cannot be invoked — there is no defined API contract
- Domain Intelligence cannot feed the Scorer without an integration contract
- v0.1 (which adds Transferability scorer v1) is blocked on this gap

---

## Dependencies

- None (pure API gap)

---

## Suggested Resolution

1. Define the scoring API: `POST /transferability/score`
   - Input: `{ target_kind, target_id, snapshot_ref, optional_context }`
   - Output: `transferability_score.v0` schema
   - Timeout: 30 seconds default
2. Define input validation: which target_kind values are supported (repo, pattern, workflow, skill)
3. Define scoring trigger: event-driven (after Domain Intelligence emits novelty analysis) + on-demand (via API)
4. Define caching: score is cached; subsequent scoring requests for the same target within 24 hours return cached result unless `force: true`
5. Define error handling: what happens if scoring fails (return error to caller? emit DLQ? fall back to default score?)

---

## Open Questions

- Should the scorer produce a score asynchronously (return immediately, deliver result via callback/webhook)?
- Should there be a bulk scoring API for batch scoring of multiple artifacts?