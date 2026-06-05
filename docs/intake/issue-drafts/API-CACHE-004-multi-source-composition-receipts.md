# API-CACHE-004: Multi-source Composition Provenance Spine

## Metadata

| Field | Value |
|---|---|
| Type | spec-gap |
| Status | draft |
| Labels | provenance, context-fabric, multi-provider |
| Depends On | — |
| Evidence | `docs/chats/20260411 - Chat GPT - API-driven Cache Management.md` Finding: "Once Entif fans out to medical, dental, life, disability, and local handbook sources, the merged answer itself becomes a derived artifact that needs receipts, version references, and challengeability" |

---

## Problem

When Entif answers "What are my health benefits?" it may need to fan out to multiple downstream providers:
- Medical insurance provider (benefits details)
- Dental insurance provider (benefits details)
- Life insurance provider (benefits details)
- Disability insurance provider (benefits details)
- Local handbook (company-specific policy)

Each individual provider call can produce its own receipt. But the merged answer — assembled from these heterogeneous sources — is a derived artifact that currently has no provenance spine. If a user challenges "your answer about my life insurance is wrong," there is no auditable trail of which sources were consulted, in what order, with what trust weights, and what the composition logic was.

---

## Scope

**In scope:**
- Multi-source composition receipt model (what does a receipt for a composed answer look like?)
- Source attribution chain (which sub-receipts contributed to the final answer?)
- Version references per source
- Challengeability interface (how does a user query "why did you answer X?")
- Trust weight / confidence per source

**Out of scope:**
- Individual provider receipt format (that's the RRP receipt spec)
- Multi-dim cache key (API-CACHE-001) — composition receipts may be cacheable
- Privacy budget (API-CACHE-002) — orthogonal

---

## Key Decisions Required

1. **Composition receipt structure**: is it a nested receipt bundle (wrapper over individual source receipts) or a higher-order receipt that references individual receipts by CID?
2. **Source attribution format**: for each component of the composed answer, which source provided that component? Inline citation or reference?
3. **Challengeability**: when a user challenges an answer, can they ask "which sources contributed to the answer about X?" and get a source trace?
4. **Temporal validity**: if one source is fresh (handbook, today) and another is cached (medical provider, 24h old), does the composition receipt express a freshness window?
5. **Conflict resolution**: if two sources give conflicting answers for the same query (e.g., handbook says plan A covers $500, medical provider says plan A covers $300), what is the resolution rule?

---

## Relationship to Other Issues

- Ties to `receipts-law` (receipts for every durable mutation) — a composed answer is a durable derived artifact
- Ties to `provenance` concept in Rosetta
- Depends on RRP receipt content model for individual source receipts

---

## Open Questions

- Is the composition receipt itself cacheable (can we cache composed answers keyed on the multi-dim cache key)?
- How does composition interact with the privacy membrane — does Entif reveal to the user which external providers were consulted?
- What is the latency budget for multi-source composition? Is there a timeout cascade?