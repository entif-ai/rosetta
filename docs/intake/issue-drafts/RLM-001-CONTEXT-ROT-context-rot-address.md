# Issue Draft: RLM-001-CONTEXT-ROT

**Prefix:** RLM-001
**Title:** Address context rot in agentic sessions — evaluate RLM approach for memory/orchestration layer

## Problem Statement

Context rot degrades agentic performance over long sessions as irrelevant tokens accumulate in the context window. Standard mitigation (lossy compaction or brittle retrieval heuristics) either destroys information or fails under distribution shift. The problem is empirically confirmed and specifically impacts Entif's long-horizon agentic scenarios (building/maintaining large software projects across sessions).

## Evidence

- Source doc (Finding RLM-001-M):
  > "Context rot research and practitioner writeups converge on the same empirical truth: as irrelevant tokens increase, retrieval accuracy and reasoning fidelity degrade in non-obvious ways."
  > Attribution: research.trychroma.com/context-rot

- Finding RLM-001-M:
  > "RLMs solve it by refusing to make the neural net attend over 10M tokens at once: the 'long prompt' becomes an external memory substrate; the model uses programmatic attention (search + decomposition + targeted subcalls); the final answer is assembled from a controlled set of evidence snippets."

## Proposed Resolution

Evaluate integrating RLM-style programmatic attention into the Entif memory/orchestration layer:
- Replace or supplement memory compaction with offloaded history + pointered access (CID/query-based)
- Working memory stays small; everything else becomes addressable tiles
- RLM program pulls needed context by pointer, not by stuffing summaries back into context window
- Run the proposed vertical slice experiment (see RLM-001-SLICE) to validate the approach on a real corpus (monorepo docs + issues + receipts)

## Entif Alignment

- Validates the problem space for long-horizon agents
- Proposes Rosetta as the external memory substrate
- Challenges the current memory management approach

## Confidence

MEDIUM — context rot characterization is attributed to cited source; the RLM solution framing is attributed to the paper. Not direct quotes from primary sources.

## Status

DRAFT