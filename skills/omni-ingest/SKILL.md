---
name: omni-ingest
description: |
  Fault-tolerant, swappable, isolated multi-stage ingestion pipeline for converting raw content
  (emails, docs, web scrapes, video transcripts, chats, arXiv papers, RSS, webhooks, file uploads)
  into typed memory artifacts and distributing them across N stores.
  
  Six-stage event-driven architecture with per-stage queues, full ledger/ACK state machine,
  hot-swappable store registry, and notification on completion/partial-success/failure.
  
  Aligns with: Entif Context CLI PRD (source envelopes, assimilation packets, tapestry bundles),
  NOT LAME PRD (two-gate cognitive triage), Agentic Memory Doctrine (federated domain graphs,
  two-stage GraphRAG), OB1 Assimilation (receipts-first, multi-plane jurisdiction).
trigger-conditions:
  - Raw text content arrives from any source (email, scrape, upload, webhook, cron, arXiv alert)
  - User requests explicit ingest of a document, URL, transcript, or file
  - Automated sensor detects new content (RSS cron, webhook POST, file drop)
category: memory
tags: [ingest, pipeline, fault-tolerant, stores, memory, assimilation]
version: 0.1.0
---

# Omni-Ingest: Six-Stage Fault-Tolerant Ingestion Pipeline

## Overview

Omni-ingest is an event-driven workflow engine — not a linear pipeline. Every stage is
fire-and-forget with acknowledgment writes to a shared ledger. Stages communicate via
append-only queue files (bus). The ledger is the single source of truth for workflow
state, retry counts, and staleness detection.

```
[Detect] → [Normalize] → [Sanitize] → [Classify-Mine] → [Codify] → [Notify]
    ↓           ↓              ↓              ↓              ↓          ↓
  Ledger      Ledger         Ledger         Ledger         Ledger     Ledger
  + Bus       + Bus          + Bus          + Bus          + Bus      + Bus
```

## Architecture Principles (from Entif Docs)

1. **Receipts-first execution** — every operation emits a machine-readable receipt
2. **Deny-by-default gating** — Stage 3 (Sanitize) is the deterministic gate before LLM work
3. **Two-gate cognitive architecture** — deterministic triage (Stage 3) before expensive
   cognition (Stage 4)
4. **Multi-plane jurisdiction** — each store maps to one or more memory planes:
   Constitutional / Semantic / Episodic / Procedural / Prospective / Working / Activation
5. **Never collapse truth, history, and activation** into one scalar
6. **No delete primitive** — wrong facts get new provenance-bearing state (gravestoning)

## Six Stages

### Stage 1: Detect

**Responsibility:** Determine that new content exists to ingest. Emit a workflow manifest.

**Detectors (pluggable):**
- `webhook.py` — receives POST, extracts payload, validates signature
- `cron_rss.py` — polls RSS/Atom feeds, emits on new entries
- `file_drop.py` — watches a directory, emits on new files
- `email_sensor.py` — polls IMAP, emits on new unread
- `arxiv_watch.py` — polls arXiv via API, emits on new papers matching query
- `user_submit.py` — direct API call with raw content + metadata

**Output:** A `workflow_manifest.jsonl` entry appended to `bus/queue.01.<workflow_id>.jsonl`
and a ledger entry in `ledger/<workflow_id>.jsonl`.

**Manifest schema:**
```json
{
  "workflowId": "uuid",
  "stage": "01-detect",
  "triggeredAt": "2026-04-26T21:00:00Z",
  "trigger": {
    "type": "webhook| cron_rss| file_drop| email| arxiv| user_submit",
    "sourceRef": "https://...",
    "contentTypeHint": "text/html| application/pdf| text/plain| ...",
    "userInstructions": "optional: why this is being ingested"
  },
  "contentMeta": {
    "originalFilename": "...",
    "mtime": "...",
    "mimeType": "...",
    "sizeBytes": 12345
  }
}
```

### Stage 2: Normalize

**Responsibility:** Fetch raw content and convert to standardized Markdown and/or JSON/YAML.

**Normalizers (pluggable per content type):**
- `normalize_html.py` — strip HTML to Markdown, extract metadata
- `normalize_pdf.py` — extract text via pdfminer/pymupdf
- `normalize_email.py` — parse RFC 5322, extract body + headers
- `normalize_docx.py` — extract via python-docx
- `normalize_csv.py` — convert to Markdown tables
- `normalize_rss.py` — parse XML, extract entry titles/bodies
- `normalize_arxiv.py` — fetch via arXiv API, extract abstract + body

**Output:** Normalized content in `bus/content.<workflow_id>.md` + `bus/content.<workflow_id>.meta.json`.
Append ACK to `bus/queue.02.<workflow_id>.jsonl`.

**Schema:**
```json
{
  "workflowId": "uuid",
  "stage": "02-normalize",
  "normalizedAt": "2026-04-26T21:01:00Z",
  "contentRef": "bus/content.<workflow_id>.md",
  "metaRef": "bus/content.<workflow_id>.meta.json",
  "contentType": "text/markdown",
  "charCount": 12345,
  "chunkCount": 3,
  "chunkSize": 500
}
```

### Stage 3: Sanitize (First Gate — Deterministic, No LLM)

**Responsibility:** Pure functions only. No sub-agents, no async, no LLM calls.

**Checks (in order, all deterministic):**
1. UTF-8 normalization — reduce to Latin-1 subset, reject malformed sequences
2. Emoji/ZWSP strip — remove emojis, zero-width chars, bidirectional override chars
3. Malware heuristics — scan for known script patterns, obfuscated URLs, exfil beacons
4. Spam heuristics — Bayesian word frequency score (configurable threshold)
5. Content quality gate — reject if >80% non-alphabetic or <10 words total
6. Quarantine flag — if suspicious but not clearly malicious, flag for human review

**Output:** `bus/sanitization.<workflow_id>.json` with verdict + notes.
Append ACK to `bus/queue.03.<workflow_id>.jsonl`.

**Verdict values:** `benign` | `quarantine` | `reject`

**If reject:** Workflow terminates. Ledger updated with final state `rejected`.
Stage 6 fires notification (if enabled).

**If quarantine:** Workflow pauses. Ledger state = `quarantined`. Human review required
to unblock. Stage 6 fires alert.

**Schema:**
```json
{
  "workflowId": "uuid",
  "stage": "03-sanitize",
  "sanitizedAt": "2026-04-26T21:01:30Z",
  "verdict": "benign",
  "checks": {
    "utf8Normalize": "pass",
    "emojiStrip": "pass",
    "malwareHeuristics": "pass",
    "spamScore": 0.02,
    "qualityGate": "pass"
  },
  "notes": ["emoji count: 0", "suspicious_urls: 0"]
}
```

### Stage 4: Classify-Mine (Second Gate — LLM Sub-Agent Pool)

**Responsibility:** Chunk content (~500 lines each), fire leaf sub-agents per chunk for:
classification, entity extraction, concept tagging, multi-granularity summarization,
key observations, valuation/scoring, and associative connections to existing knowledge.

**Chunking:** Content is split into ~500-line chunks with 20-line overlap.
Each chunk gets a `chunkIndex` and `totalChunks` in its payload.

**Sub-agent payload (per chunk):**
```json
{
  "workflowId": "uuid",
  "stage": "04-classify-mine",
  "chunkIndex": 1,
  "totalChunks": 3,
  "chunkContent": "...",
  "manifest": { /* full workflow manifest from Stage 1 */ },
  "sanitization": { /* Stage 3 output */ },
  "memoryPlanes": ["semantic", "episodic"],
  "existingKnowledgeHint": "optional: results of prior omni-retrieve for this source"
}
```

**Sub-agent tasks per chunk:**
1. Classify into normalized tag taxonomy (prevent semantic duplicates)
2. Extract entities (people, projects, organizations, concepts)
3. Mine key observations and insights
4. Summarize at 3 granularities: abstract (1-2 sentences), executive (1 paragraph), detailed (3-5 paragraphs)
5. Score across 11 evaluation dimensions (from Context CLI PRD):
   novelty, relevance, valueAdd, resilience, urgency, trust, contradictionPressure,
   verificationCost, decayRate, revisitability, legalSensitivity
6. Identify promotion candidates (high trust + valueAdd + novelty)
7. Flag contradictions or uncertainties
8. Find associative connections to existing knowledge (cross-ref to known projects/entities)

**Output per sub-agent:** `bus/chunk.<workflow_id>.<chunkIndex>.json`
Append ACK to `bus/queue.04.<workflow_id>.jsonl`.

**Primary agent consolidation:** Waits for all chunk ACKs (or max retries exhausted).
Produces `bus/consolidated.<workflow_id>.json` — the assimilation packet precursor.

**Assimilation packet precursor schema** (matches `entif.assimilation.packet` from Context CLI PRD):
```json
{
  "kind": "entif.assimilation.packet",
  "packetId": "aap_<uuid>",
  "sourceRef": "cid:source...",
  "runRef": "cid:run...",
  "hygiene": { "verdict": "benign", "notes": [] },
  "semantic": {
    "summaries": { "abstract": "", "executive": "", "detailed": "" },
    "entities": [],
    "relations": [],
    "conceptRefs": []
  },
  "epistemic": {
    "claims": [],
    "evidenceRefs": [],
    "uncertainties": [],
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
  "creative": { "optionalHypotheses": [] },
  "memoryWrites": [],
  "promotionCandidates": [],
  "receipts": []
}
```

### Stage 5: Codify (Fan-Out to N Stores)

**Responsibility:** Read `stores.json`, fire one leaf sub-agent per enabled store.
Each sub-agent writes independently. No cross-store dependency.

**Store registry (`stores.json`):**
```json
{
  "stores": [
    {
      "name": "markdown",
      "enabled": true,
      "planes": ["semantic", "episodic"],
      "handler": "store_markdown.py",
      "config": {
        "basePath": "~/.hermes/memory",
        "dateBasedDirs": true
      }
    },
    {
      "name": "qmd",
      "enabled": true,
      "planes": ["semantic"],
      "handler": "store_qmd.py",
      "config": { "corpusPath": "~/.hermes/QMD" }
    },
    {
      "name": "hindsight",
      "enabled": true,
      "planes": ["semantic", "episodic", "procedural"],
      "handler": "store_hindsight.py",
      "config": { "bankId": "hermes" }
    },
    {
      "name": "openbrain_ob1",
      "enabled": true,
      "planes": ["semantic", "episodic"],
      "handler": "store_ob1.py",
      "config": { "endpoint": "http://localhost:8080" }
    },
    {
      "name": "honcho",
      "enabled": false,
      "planes": ["truth", "temporal"],
      "handler": "store_honcho.py",
      "config": { "daemonEndpoint": "http://localhost:8977" }
    }
  ]
}
```

**Adding a new store:** Append an entry to `stores.json`. No code changes to pipeline.

**Each store sub-agent receives:**
- Full assimilation packet (from Stage 4 consolidated output)
- Store config from `stores.json`
- Workflow manifest

**Store sub-agents write independently. Failures are scoped to individual stores.**

**Output:** Each store sub-agent writes to its target and appends ACK to
`bus/queue.05.<workflow_id>.jsonl`.

### Stage 6: Notify

**Responsibility:** Deliver status notification when workflow reaches terminal state.

**Terminal states:** `completed` | `partially_completed` | `failed` | `rejected` | `quarantined`

**Notification channels (pluggable):**
- `notify_discord.py` — webhook POST to Discord channel
- `notify_email.py` — SMTP send to configured address
- `notify_console.py` — write to terminal output (default for CLI invocations)
- `notify_telegram.py` — Telegram bot message

**Notification payload:**
```json
{
  "workflowId": "uuid",
  "status": "completed",
  "completedAt": "2026-04-26T21:05:00Z",
  "stages": {
    "01-detect": "completed",
    "02-normalize": "completed",
    "03-sanitize": "completed",
    "04-classify-mine": "completed",
    "05-codify": { "markdown": "ok", "hindsight": "ok", "openbrain_ob1": "ok", "honcho": "skipped" },
    "06-notify": "completed"
  },
  "packetRef": "bus/consolidated.<workflow_id>.json",
  "receiptsRef": "bus/receipts.<workflow_id>.json"
}
```

## Ledger Schema

Every stage writes to `ledger/<workflow_id>.jsonl`. Each entry:
```json
{
  "workflowId": "uuid",
  "stage": "04-classify-mine",
  "subAgentId": "leaf.<workflow_id>.chunk.1",
  "status": "completed",
  "attempts": 1,
  "createdAt": "2026-04-26T21:02:00Z",
  "updatedAt": "2026-04-26T21:02:45Z",
  "outputRef": "bus/chunk.<workflow_id>.1.json"
}
```

**Status transitions:** `fired` → `acknowledged` → `completed` | `failed` | `stale`

**Staleness:** If no ACK within `stage_timeout_seconds`, mark `stale` and increment `attempts`.
After `max_attempts`, transition to `failed` and stop retrying.

**Workflow state derivation:**
- All stages complete + all stores write → `completed`
- Some stores fail → `partially_completed`
- Stage 3 reject/quarantine → `rejected` | `quarantined`
- Max retries exhausted at any stage → `failed`

## File Layout

```
~/.hermes/skills/omni-ingest/
  SKILL.md                          ← this file
  stores.json                       ← hot-swap store registry
  manifest.schema.json              ← JSON Schema for workflow manifest
  bus/
    queue.<stage>.<workflow_id>.jsonl   ← per-stage ACKs
    content.<workflow_id>.md             ← normalized content
    content.<workflow_id>.meta.json      ← content metadata
    sanitization.<workflow_id>.json      ← Stage 3 output
    chunk.<workflow_id>.<N>.json         ← per-chunk Stage 4 output
    consolidated.<workflow_id>.json      ← assimilation packet
    receipts.<workflow_id>.json         ← all receipts for workflow
  ledger/
    <workflow_id>.jsonl             ← full operation ledger
  stages/
    01-detect/
      SKILL.md                      ← Stage 1 spec
      detectors/
        webhook.py
        cron_rss.py
        file_drop.py
        email_sensor.py
        arxiv_watch.py
        user_submit.py
    02-normalize/
      SKILL.md                      ← Stage 2 spec
      normalizers/
        normalize_html.py
        normalize_pdf.py
        normalize_email.py
        normalize_docx.py
        normalize_csv.py
        normalize_rss.py
        normalize_arxiv.py
    03-sanitize/
      SKILL.md                      ← Stage 3 spec (pure functions)
      sanitize.py                  ← deterministic hygiene pipeline
    04-classify-mine/
      SKILL.md                      ← Stage 4 spec
      chunker.py                   ← split content into ~500-line chunks
    05-codify/
      SKILL.md                      ← Stage 5 spec
      store_registry.py            ← load stores.json, resolve handlers
      handlers/
        store_markdown.py
        store_qmd.py
        store_hindsight.py
        store_ob1.py
        store_honcho.py
    06-notify/
      SKILL.md                      ← Stage 6 spec
      channels/
        notify_discord.py
        notify_email.py
        notify_console.py
        notify_telegram.py
  lib/
    bus.py                         ← append/read queue files
    ledger.py                      ← write/ACK/stale detection
    manifest.py                    ← validate + enrich manifest
    workflow_state.py              ← derive workflow state from ledger
    receipts.py                    ← emit receipt for any operation
```

## Usage

### Trigger via user submission
```bash
# Direct CLI submission (text content)
omni-ingest submit --content "Raw text content here" \
  --trigger user_submit \
  --user-instructions "Check if relevant to Rosetta v3"

# File upload
omni-ingest submit --file ./path/to/document.pdf \
  --trigger file_drop \
  --content-type-hint application/pdf

# Webhook delivery (POST body)
curl -X POST https://your-host/ingest/webhook \
  -H "Content-Type: application/json" \
  -H "X-Signature: <hmac>" \
  -d '{"source": "...", "content": "..."}'
```

### Trigger via cron sensor (RSS, arXiv, email)
```bash
# Add to crontab for RSS polling every 30 min
*/30 * * * * omni-ingest run --detector cron_rss --feed https://example.com/rss.xml

# arXiv watch
omni-ingest run --detector arxiv_watch \
  --query "tit AND rosetta" \
  --days-back 7
```

### Check workflow status
```bash
omni-ingest status <workflow_id>
omni-ingest ledger <workflow_id>   # full ledger dump
omni-ingest packet <workflow_id>  # show assimilation packet
```

### Hot-swap stores (no restart needed)
```bash
# Disable Honcho, add a new store
patch ~/.hermes/skills/omni-ingest/stores.json << 'EOF'
{
  "name": "honcho",
  "enabled": false,
  ...
}
EOF

# Next workflow uses new config automatically
```

## Design Laws (Non-Negotiable)

1. **Receipts-first** — every operation emits a receipt or is provably bound into one
2. **Stage 3 is the deterministic gate** — no LLM calls until sanitization passes
3. **No cross-stage blocking** — each stage writes its output and ACKs independently
4. **No cross-store dependency** — Stage 5 sub-agents are fully isolated
5. **Ledger is the source of truth** — workflow state is derived from ledger entries
6. **Hot-swap stores via config** — no code changes to add/remove stores
7. **No delete primitive** — wrong content gets quarantined/gravestoned, not erased
8. **Vector CIDs required** — normalize content to Markdown before any sub-agent work
9. **Max 500 lines per chunk** — enforced by chunker, not left to sub-agents
10. **Sub-agents are leaves** — no recursive delegation within a stage

## File Layout

```
~/.hermes/skills/omni-ingest/
  SKILL.md                          ← this file
  stores.json                       ← hot-swap store registry
  manifest.schema.json              ← JSON Schema for workflow manifest (Stage 1)
  bus/
    queue.<stage>.<workflow_id>.jsonl   ← per-stage ACKs
    content.<workflow_id>.md             ← normalized content
    content.<workflow_id>.meta.json      ← content metadata
    sanitization.<workflow_id>.json      ← Stage 3 output
    chunk.<workflow_id>.<N>.json         ← per-chunk Stage 4 output
    consolidated.<workflow_id>.json       ← assimilation packet
    receipts.<workflow_id>.json          ← all receipts for workflow
  ledger/
    <workflow_id>.jsonl             ← full operation ledger
  stages/
    01-detect/
      SKILL.md                      ← Stage 1 spec
      detectors/
        webhook.py
        cron_rss.py
        file_drop.py
        email_sensor.py
        arxiv_watch.py
        user_submit.py
    02-normalize/
      SKILL.md                      ← Stage 2 spec
      normalizers/
        normalize_html.py
        normalize_pdf.py
        normalize_email.py
        normalize_docx.py
        normalize_csv.py
        normalize_rss.py
        normalize_arxiv.py
    03-sanitize/
      SKILL.md                      ← Stage 3 spec (pure functions)
      sanitize.py                   ← deterministic hygiene pipeline
    04-classify-mine/
      SKILL.md                      ← Stage 4 spec
      chunker.py                    ← split content into ~500-line chunks
    05-codify/
      SKILL.md                      ← Stage 5 spec
      dispatch.py                   ← fan-out dispatcher to store sub-agents
      handlers/
        store_markdown.py
        store_qmd.py
        store_hindsight.py
        store_ob1.py
        store_honcho.py
    06-notify/
      SKILL.md                      ← Stage 6 spec
      channels/
        notify_discord.py
        notify_email.py
        notify_console.py
        notify_telegram.py
  lib/
    bus.py                         ← append/read queue files
    ledger.py                      ← write/ACK/stale detection
    manifest.py                    ← validate + enrich manifest
    workflow_state.py              ← derive workflow state from ledger
    receipts.py                    ← emit receipt for any operation
```

## Usage
- [x] Write `stages/05-codify/handlers/store_hindsight.py`
- [x] Write `stages/05-codify/handlers/store_markdown.py`
- [x] Write `stages/05-codify/handlers/store_ob1.py`
- [x] Write `stages/06-notify/channels/notify_console.py`
- [ ] Write the `omni-ingest` CLI entry point wrapping all stages
- [x] Write `tests/test_sanitize.py` — deterministic test suite for Stage 3
- [x] Write `tests/test_ledger.py` — staleness + state derivation tests
