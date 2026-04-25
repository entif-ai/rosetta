# Issue: six-layer-memory-model-federated-jurisdiction

## Metadata

- ID: 
- Title: Six-Layer Memory Model with Federated Jurisdiction (NOT Collapsed Store)
- Type: architecture
- Severity: critical
- Tags: memory-architecture, federated-memory, layer-jurisdiction, sovereignty-map, multi-layer
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

The correct memory architecture is federated multi-layer with hard jurisdiction per layer, NOT a collapsed single store. Crates explicitly rejected the initial "simplify to one store" proposal. Multi-layer by design: each layer has different value-add, different jurisdiction, different authority scope. The fix is constitutionalize them, not collapse them.

## Problem Statement

Initial proposal suggested collapsing to a two-layer kernel (canonical evidence store + derived projections). Crates rejected this:

> "I _want_ the multi-layered memory; that's by design. There are different value-adds in having one semantic vector-search store, one constitutional document store, one indexed repository for uploaded documents, one neurological self-pruned and self-prioritized memory, and one time-series-based graph database."

> "Dumbing the design down hardly solves ANY of my problems in a way that meets my design needs."

The correct framing: **federated memory with strict sovereignty rules**, NOT "one universal truth store" and NOT "all stores are peers."

## The Five Memory Layers (with Jurisdiction)

### Layer 1: Constitutional Document Store
- **Purpose**: doctrine, stable policy, authored constitutional documents
- **Authoritative for**: doctrine and policy only
- **NOT authoritative for**: semantic ranking, "thoughts," mutations by agents
- **Write permissions**: human and Codex only; no agent direct write
- **Derivation inputs**: none (source, not projection)
- **Provenance requirements**: versioned Git, explicit edit permissions logged
- **Certification tests**: doctrine integrity, no unauthorized mutation

### Layer 2: Artifact / Document Store
- **Purpose**: raw uploaded artifacts, source documents, file metadata
- **Authoritative for**: "what file exists, where, when, from whom, of what type, with what hash"
- **NOT authoritative for**: epistemic truth beyond existence/metadata
- **Write permissions**: ingestion pipeline only; no agent direct write
- **Derivation inputs**: uploaded files, transcribed content, scraped content
- **Provenance requirements**: stable artifact ID, content hash, source path/type, timestamps
- **Certification tests**: ingest dedup, hash verification, provenance preservation

### Layer 3: Semantic Vector Recall Layer
- **Purpose**: approximate/fuzzy recall, candidate retrieval
- **Authoritative for**: NOTHING — recall aid only, not epistemic authority
- **Write permissions**: embedding pipeline under schema; no agent direct write
- **Derivation inputs**: chunks from artifact store
- **Provenance requirements**: every chunk embedding must link back to artifact version and source span
- **Certification tests**: retrieval precision on known Q&A, span-level round-trip

### Layer 4: Temporal / Time-Series Graph Layer
- **Purpose**: events, entities, relationships, temporal ordering
- **Authoritative for**: modeled relations and temporal structure derived from source
- **NOT authoritative for**: underlying facts (source wins in conflict)
- **Write permissions**: graph enrichment pipeline under schema; no agent direct write
- **Derivation inputs**: source spans, event logs, receipts
- **Provenance requirements**: every edge must cite source spans; temporal ordering derived from evidence
- **Certification tests**: edge round-trip to source spans, temporal consistency

### Layer 5: Adaptive / Self-Pruned / Self-Prioritized Memory
- **Purpose**: salience, resurfacing, reinforcement, pruning heuristics
- **Authoritative for**: prioritization and resurfacing suggestions only, not epistemic truth
- **Write permissions**: salience engine under schema; no agent direct write
- **Derivation inputs**: events, receipts, retrieval stats, interaction logs
- **Provenance requirements**: salience score must cite events and decay rules
- **Certification tests**: score variance across junk/ordinary/high-value, no noise flooding

## Critical Rules

1. **No destructive recoding of authored source** — Markdown, PDFs, notes, transcripts remain intact and versioned. "You do not 'learn' by destructively rewriting authored documents into glib paraphrases."
2. **Every projection must point back to preserved source spans** — graph edge → source spans; vector chunk → artifact version; salience → events + decay rules; extracted "thought" → exact passages
3. **Without provenance, layered design is decorative metaphysics** — with provenance, it becomes a real system
4. **Authority by domain, query-dependent** — constitutional query → doctrine; "what happened when" → graph/logs; fuzzy recall → vector; salience → adaptive; verification → raw artifacts
5. **All five layers are projections EXCEPT the constitutional layer in its own domain and the artifact layer in its own domain**

## Resolution Required

1. Preserve the federated multi-layer design — do NOT collapse
2. Assign explicit jurisdiction to each layer: purpose, authority scope, write permissions, derivation inputs, provenance requirements, certification tests
3. Implement query-type → layer authority routing as core routing logic
4. Build adapter certification harness before any layer gets power

## Related Issues

- memory-adapter-certification-harness
- memory-sovereignty-query-routing-by-authority
- source-preservation-doctrine-vs-state-vs-evidence-vs-reflection
- adapter-certification-eight-test-classes