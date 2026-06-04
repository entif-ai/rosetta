# MSR-003: Five-layer memory model — implement storage layer boundaries

## Issue Type
architecture

## Summary
Five-layer storage model defined in the cognitive loop architecture. Each layer has distinct semantics and promotion rules. Layer 5 (shared canon) requires explicit promotion gate.

## Evidence
- 20260401 - Chat GPT - Memory Stack Recommendations (Response section 4, "store: five-layer model"):

Layer definitions:
1. **Source archive**: immutable originals + normalized observation artifacts
2. **Working interpretations**: revisable classifications, summaries, extracted claims, hypotheses, candidate links
3. **Evaluated knowledge**: crossed threshold (benchmarked recipes, accepted skills, preferred heuristics, ranked option sets, stable concept mappings, architectural decision deltas)
4. **Agent-specific memory**: taste, role, style, local habits, recurring contexts, personal salience
5. **Shared canon**: promoted items only (org-wide heuristics, reusable skills, vetted patterns, accepted abstractions, canonical summaries, stable taxonomies)

## Implementation Questions
- How does this map to Rosetta's three memory planes (Plane 1 truth/provenance, Plane 2 temporal/history, Plane 3 activation/relevance)?
- What is the promotion gate for Layer 3 → Layer 4 → Layer 5?
- Are layers physically distinct stores or logical namespaces over one store?
- What is the invalidation/eviction policy per layer?

## Labels
memory-plane, storage-layers

## Depends On
(None)
