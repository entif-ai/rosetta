# ACM-004: Multi-Provider Fan-Out Composition Needs Its Own Provenance Spine

## Issue Metadata

| Field | Value |
|---|---|
| Title | ACM-004: Multi-Provider Fan-Out Composition Needs Its Own Provenance Spine |
| Type | risk |
| Status | draft |
| Source doc | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` |
| Extraction | `docs/intake/docs-intelligence/2026-06-05-api-driven-cache-mgmt.md` |
| Confidence | high |
| Labels | provenance, multi-provider, receipts |
| Related concepts | provenance, multi-provider, fan-out, receipts, composition |
| Depends on | — |

## Problem Statement

Rosetta's Entif architecture proposes a multi-provider composition pattern: when a user query requires information from multiple external sources (e.g., medical benefits from a health insurer API, dental coverage from a dental insurer API, life insurance from a separate provider, and the company's employee handbook from an internal system), Entif fans out structured sub-queries to each provider, retrieves scoped facts, and composes a unified answer locally.

This composed answer is a derived artifact. It has no single provider as its authority — it is Entif's synthesis. As such, it requires its own provenance spine: receipts, version references, and challengeability.

If a composed answer is wrong, the user (or an auditor) must be able to trace:
- Which providers contributed to the answer
- Which source content versions were used
- How the composition was performed
- What the confidence/uncertainty of the composition is

Without this, multi-provider composition is an untrustworthy black box.

## Evidence

From the source document (2026-04-11 chat):

> "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability."

No mechanism for multi-provider derived-artifact provenance is described in current Rosetta specs. The Receipt Law is defined for single-step operations. Multi-step fan-out composition is a different beast.

## Proposed Resolution

Design a federated provenance mechanism for multi-provider composition:

1. **Sub-receipts per provider call**: Each provider sub-query emits its own receipt recording the provider identity, query sent, response received, and response hash.
2. **Composition receipt**: The composition step emits a higher-order receipt referencing the sub-receipts, recording the composition logic (e.g., "joined on employee_id, projected benefits fields, gated by plan_tier").
3. **Version pinning**: Each sub-receipt pins the version of the provider's data at query time (if available via API headers, ETag, or snapshot).
4. **Challengeability interface**: The composed answer must expose a challenge operation: "show me the provenance of this answer" — returning the full receipt DAG for the composition.
5. **Uncertainty propagation**: If any sub-provider returned low-confidence or partial data, the composition receipt must record this and propagate uncertainty to the composed answer.

## Implementation Notes

- This builds on the existing Receipt Law: every durable step emits receipts
- The composition receipt is a second-order artifact: a receipt about other receipts
- Entif's Guard layer must validate the composition before returning it to the user
- The receipt DAG should be verifiable (content-addressed) to prevent post-hoc tampering

## Open Questions

- Is the composition receipt a Rosetta tile/tapestry, or a separate artifact type?
- How is uncertainty modeled in the receipt? Is there a confidence threshold below which composition is blocked?
- Does each provider need to support structured query/response for scoped fact retrieval, or can Entif use free-form queries with extraction + validation?
- What is the SLA for composing across providers vs. single-provider responses?

## Related Issues

- ACM-001 (composite cache key) — composed answers are also cached, requiring the multi-axis cache key
- ACM-005 (weak-to-strong handoff) — escalation between model tiers within a composition is a related handoff provenance problem
- DI-009 / DI-012 (provenance, anti-personhood-correlation) — this extends the provenance scope to cross-provider federated artifacts
