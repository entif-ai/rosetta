# ENTIF-v0-016: Domain Intelligence Plane — Zero Analysis Algorithms Named or Specified

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-016 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #25 in ledger |
| Confidence | `medium` |
| Depends On | `ENTIF-v0-001` |

---

## Problem Statement

The spec defines the Domain Intelligence Plane as: "where 'analysis algorithms' live: repo novelty analysis, architectural pattern mining, security reviews, etc."

**But none of these algorithms are named, specified, or referenced.** The plane is defined as an architectural surface with no actual implementations. "Repo novelty analysis" — what does this mean operationally? How is novelty scored? What are the inputs and outputs?

---

## Evidence

The Plane map shows Domain Intelligence Plane (J) consuming canonical knowledge objects and emitting new ones, strictly downstream of the deterministic gate.

The spec says "Domain Intelligence is where analysis algorithms live" but provides zero algorithm specifications.

---

## Impact

- The Domain Intelligence Plane cannot be implemented without algorithm specifications
- Downstream planes (Transferability Scorer, High-Signal Contributor Registry) depend on Domain Intelligence outputs — they are all blocked
- The v0 slice cannot include Domain Intelligence functionality without these specs

---

## Dependencies

- `ENTIF-v0-001` (VOI estimation for escalation depends on Domain Intelligence analysis output quality)

---

## Suggested Resolution

1. Name and spec the initial three analysis algorithms:
   - **Repo novelty analysis**: input = repo metadata + commit history; output = novelty_score (0-1) + novelty_dimension_breakdown; procedure = compare commit pattern entropy, language diversity, dependency graph depth against known distribution
   - **Architectural pattern mining**: input = source code structure; output = detected_patterns (array) + pattern_confidence; procedure = AST-based pattern matching against known architectural signatures
   - **Security review**: input = code + dependencies; output = security_flags (array) + risk_score; procedure = signature-based CVE matching + dependency vulnerability scanning + privilege escalation pattern detection
2. Define the input schema for each algorithm
3. Define the output schema for each algorithm (required for downstream consumption)
4. Define which algorithm results contribute to the VOI estimate used by the deterministic middleware gate

---

## Open Questions

- Should Domain Intelligence algorithms be skill-pack loadable (extendable without core changes)?
- Are these algorithms deterministic or model-powered?