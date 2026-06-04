# MSR-008: S-Path-RAG / NSGD correlate stage — bounded path retrieval with diagnostic refinement

## Issue Type
research

## Summary
Three-pass correlate design references S-Path-RAG (arXiv 2603.23512) and NSGD-like diagnostic refinement. Research needed to determine implementation approach.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 4, "correlate: three-pass approach" and "S-Path-RAG / NSGD reference")

S-Path-RAG paper (arXiv 2603.23512): semantic-aware path retrieval strategy for multi-hop KGQA, combining bounded path search, semantic weighting, and iterative Neural-Socratic Graph Dialogue loop where model emits diagnostic messages that trigger graph edits or seed expansion under uncertainty

Three-pass correlate:
1. **Pass 1: cheap local correlation**: embedding neighbors, lexical overlaps, shared entities, shared venture/project tags
2. **Pass 2: graph/path correlation**: shortest/top-k semantically weighted paths, contradiction/support relationships, prerequisite chains, analogy candidates, reusable method patterns
3. **Pass 3: dialogic refinement**: internal diagnostic when confidence is low — missing prerequisite, likely duplicate, probable contradiction, needs benchmark, needs human arbitration, likely belongs to another venture/domain

## Research Questions
- Is arXiv 2603.23512 publicly accessible and what is the full implementation approach?
- How does NSGD (Neural-Socratic Graph Dialogue) work in practice for triggering targeted expansion?
- What is the bounded path search strategy and how is it different from standard KGQA?
- How does this integrate with Graphiti's existing temporal KG capabilities?
- What are the computational costs of the three-pass approach at scale?

## Labels
cognitive-loop, s-path-rag, kgqa

## Depends On
MSR-003 (five-layer memory model), MSR-004 (cognitive loop implementation)
