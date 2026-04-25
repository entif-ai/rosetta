# Issue: memory-adapter-certification-harness

## Metadata

- ID: 
- Title: Memory Adapter Certification Harness — Before Any Adapter Gets Power
- Type: reliability
- Severity: critical
- Tags: adapter-certification, ob1, qmd, honcho, graphiti, muninndb, memory-stack
- Created: 2026-04-24
- Source: docs/chats/20260423 - Chat GPT - Agentic Orchestration Failures.md

## Summary

All six memory adapters (OB1, QMD, Honcho, Graphiti, MuninnDB, Markdown) completely failed. None should get authority until an 8-class certification harness is built and each passes. This is the piece the whole ecosystem keeps skipping.

## Problem Statement

**OB1 (OpenBrain):**
- Extraction path broken: 1000 "thoughts" stored, all got identical quality score of 60
- Zero tags assigned
- Documents of varying size collapsed into single <100-word "thoughts"
- System logs and noise stored regardless → noise without signal
- "Every thought got identical quality score of 60" = extraction is broken at the input layer

**QMD:**
- Semantic vector-based search completely broken
- Nothing in Markdown repository indexed
- Nothing works

**Honcho:**
- Persona-driven semantic vector-based search broken
- Nothing stored or retrieved correctly
- Nothing works even in the slightest

**Graphiti:**
- Never worked in the setup
- Time-sequenced graph database never stood up

**MuninnDB:**
- Never set up despite being requested
- Neurologically-inspired memory system aspirational only

**Markdown-based memory:**
- Flaky, never summoned (even in supposedly constitutional files like SOUL.md, HEARTBEAT.md)
- Duplicative, nonsensical, poorly-organized storage
- Deviating ways across sessions

**Summary:** "NONE of them even REMOTELY work, at ALL"

## Certification Harness Design

Every candidate memory adapter must pass this 8-class test pack before entering the stack:

### Test 1: Ingest Test
Feed it:
- 3 high-value docs
- 3 medium-value notes
- 2 noisy/log files
- 2 short adages or maxims

Must:
- reject or down-rank the logs
- preserve provenance
- not collapse everything to one generic blob
- scores must vary meaningfully across content classes

### Test 2: Retrieval Test
Ask 10 known questions with known answers.

Must retrieve the correct source or derived record.

### Test 3: Tag Test
Tags must be:
- non-empty
- differ across content classes
- no universal fallback tag

### Test 4: Score Test
Scores must vary meaningfully:
- junk → low
- ordinary notes → medium
- high-value material → high

Uniform scores = fail.

### Test 5: Noise Test
System logs and junk text must NOT flood top results.

If noise appears in top-k, fail.

### Test 6: Round-Trip Test
A derived "thought" or projection must link back to exact supporting source spans.

If provenance pointer is missing, fail.

### Test 7: Replay Test
Survive restart / replay:
- state must be reconstructable from receipts + source
- no state lost on restart

### Test 8: Policy Test
Must:
- emit receipts for all operations
- respect declared scopes
- no undeclared side effects

## Resolution Required

1. Build certification harness before reconnecting any adapter
2. OB1 stays broken extractor only (not authority) until it passes
3. QMD, Honcho, Graphiti stay unplugged until they pass
4. MuninnDB remains aspirational until installed and certified
5. "If it fails, it does not enter the stack. Period."

## Related Issues

- six-layer-memory-model-federated-jurisdiction
- adapter-certification-eight-test-classes
- source-preservation-doctrine-vs-state-vs-evidence-vs-reflection
- projection-rebuildability-derived-layers-not-truth