---
name: omni-ingest-stage-04
description: |
  Stage 4 (Classify-Mine) of the omni-ingest pipeline. LLM sub-agent pool for
  classification, entity extraction, summarization, observation mining, valuation,
  and associative linking.
category: omni-ingest
---

# Stage 4: Classify-Mine — LLM Sub-Agent Pool

## Purpose

Stage 4 is the **second cognitive gate** — expensive LLM work only fires after Stage 3
passes. Content is chunked (~500 lines), and each chunk is dispatched to a leaf
sub-agent. Sub-agents are fire-and-forget leaves that write their output to bus files
and ACK to the ledger.

## Principles

1. **Leaf sub-agents only** — cannot delegate further (role='leaf')
2. **Max 500 lines per chunk** — enforced by chunker, not left to sub-agents
3. **Chunk overlap** — 20 lines of overlap for context continuity
4. **Sub-agents write JSON** — primary agent handles storage decisions
5. **All chunks must ACK** — primary monitors before firing Stage 5

## Sub-Agent Payload

Each sub-agent receives:
```json
{
  "workflowId": "uuid",
  "stage": "04-classify-mine",
  "chunkId": "chunk_0001",
  "chunkIndex": 0,
  "totalChunks": 5,
  "chunkContent": "...",
  "chunkMeta": { "lineStart": 1, "lineEnd": 500, "charCount": 12345 },
  "manifest": { /* full workflow manifest from Stage 1 */ },
  "sanitization": { /* Stage 3 output */ },
  "memoryPlanes": ["semantic", "episodic"],
  "taskInstructions": "..."
}
```

## Sub-Agent Output Schema

Each sub-agent writes to `bus/chunk.<workflow_id>.<N>.json`:
```json
{
  "workflowId": "uuid",
  "chunkId": "chunk_0001",
  "status": "completed",
  "tags": ["tag1", "tag2"],
  "entities": [
    { "name": "Entity Name", "type": "person|org|project|concept" }
  ],
  "semantic": {
    "summaries": {
      "abstract": "1-2 sentence summary",
      "executive": "1 paragraph summary",
      "detailed": "3-5 paragraph summary"
    },
    "conceptRefs": ["normalized", "tag", "list"]
  },
  "epistemic": {
    "claims": ["claim 1", "claim 2"],
    "evidenceRefs": ["cid:evidence1"],
    "uncertainties": ["what we don't know"],
    "contradictions": []
  },
  "operational": {
    "tasks": [],
    "decisions": [],
    "risks": [],
    "openQuestions": []
  },
  "associative": {
    "duplicates": [],
    "relatedArtifacts": [],
    "supportEdges": [],
    "conflictEdges": []
  },
  "creative": {
    "optionalHypotheses": []
  },
  "scores": {
    "novelty": 0.5,
    "relevance": 0.7,
    "valueAdd": 0.6,
    "resilience": 0.5,
    "urgency": 0.3,
    "trust": 0.8,
    "contradictionPressure": 0.1,
    "verificationCost": 0.4,
    "decayRate": 0.2,
    "revisitability": 0.5,
    "legalSensitivity": 0.0
  },
  "promotionCandidate": true,
  "reason": "high trust + novelty + value-add"
}
```

## Evaluation Dimensions (from Context CLI PRD)

Each sub-agent MUST score every chunk on all 11 dimensions (0.0–1.0):

| Dimension | Description | High When |
|-----------|-------------|-----------|
| novelty | New information vs known | Fresh data, new entities |
| relevance | Relevance to active projects | Directly applicable |
| valueAdd | Processing insight vs raw data | Synthesis, connections |
| resilience | Stability over time | Lasting truths |
| urgency | Time-sensitive | Deadline-driven |
| trust | Source reliability | High-credibility sources |
| contradictionPressure | Signs of conflict with known | Anomalies, corrections |
| verificationCost | Cost to verify claims | Cheap = low score |
| decayRate | How fast info ages | Slowly aging = low |
| revisitability | Worth revisiting later | Yes = high |
| legalSensitivity | Legal/compliance risk | Zero = 0.0 |

## Sub-Agent Prompt Template

```
You are processing chunk {chunkIndex+1}/{totalChunks} of a document.
This chunk covers lines {lineStart}–{lineEnd}.

Analyze the content and produce structured output with these fields:
- tags: normalized tag list (lowercase, underscores, no duplicates)
- entities: [{name, type}] for people, orgs, projects, concepts
- semantic.summaries: {abstract(1-2s), executive(1p), detailed(3-5p)}
- epistemic: claims, evidenceRefs, uncertainties, contradictions
- operational: tasks, decisions, risks, openQuestions from this chunk
- associative: duplicates, relatedArtifacts, supportEdges, conflictEdges
- creative: optionalHypotheses (speculative connections worth exploring)
- scores: all 11 dimensions (0.0-1.0)
- promotionCandidate: bool + reason

Return ONLY valid JSON matching the schema.
```

## Primary Agent: Consolidation

After all chunk sub-agents ACK (or max retries exhausted), primary agent:
1. Reads all `bus/chunk.<workflow_id>.<N>.json` files
2. Deduplicates tags (by normalized key), entities, claims
3. Averages scores across chunks
4. Assembles `bus/consolidated.<workflow_id>.json` — the assimilation packet

## Throttling

- Max 3 concurrent sub-agents at a time
- Configurable via `max_concurrent` in pipeline config
- If content has >10 chunks, use `max_concurrent: 3` with 10s stagger between waves

## Running Stage 4

```bash
# Standalone
cd ~/.hermes/skills/omni-ingest
python -c "
from stages.04_classify_mine.chunker import chunk_text, build_sub_agent_payload
chunks = chunk_text(open('bus/content.<workflow_id>.md').read())
for c in chunks:
    print(build_sub_agent_payload('workflow_id', c, manifest, sanitization, ['semantic', 'episodic']))
"
```

## Testing

```bash
cd ~/.hermes/skills/omni-ingest
python -m pytest tests/test_chunker.py -v
python -m pytest tests/test_consolidation.py -v
```
