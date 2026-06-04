# PRS-003: Python Boundary Enforcement — Specialist Lane Only

## Metadata

| Field | Value |
| --- | --- |
| Title | Python Boundary Enforcement — Specialist Lane Only |
| Type | governance |
| Status | candidate |
| Source doc | `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md` |
| Extraction | `2026-06-05-entif-rosetta-prds-revisions-synthesis.md` |
| Labels | python, architecture, boundary |
| Confidence | high |

## Problem

Python has been used for both prototype exploration and production constitutional logic, creating ambiguity about when Python is appropriate. The synthesis clarifies Python is "a specialist lane only" — but this boundary needs explicit enforcement to prevent mission creep back into Python-for-everything.

## Evidence

From the source document:
> "Python as a specialist lane only. Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic."

## Approved Python Use Cases

| Use Case | Justification | Location |
| --- | --- | --- |
| Eval harnesses | Testing, benchmarking — appropriate for Python's data science ecosystem | `tools/eval/` |
| Embeddings generation | Numerical computation, numpy/sklearn compatibility | `tools/embeddings/` |
| OCR / ASR | Pre-trained model integrations (Tesseract, Whisper) | `tools/ingest/` |
| Graph experimentation | Neo4j/NetworkX exploratory work before TypeScript port | `tools/graph/` |
| Research notebooks | Jupyter-style exploration that may or may not ship | `research/` |

## Prohibited Python Use Cases

- Core constitutional logic (guard, receipts, tapestry, CID computation)
- Protocol tile definitions
- Nx workspace build tooling
- CI/CD scripts (prefer TypeScript or shell)
- Production adapters that require high availability guarantees

## Enforcement Mechanism

1. **Nx project graph labeling**: Mark Python projects with `python-specialist: true`
2. **Import restriction**: TypeScript core packages must not import from `python-*` workspace projects
3. **Documentation**: Architecture docs explicitly list approved Python boundaries
4. **Code review**: PR reviewer checks for Python in core constitutional packages

## Migration of Existing Python Code

If any existing Python currently sits in core constitutional packages, it should be:
1. Evaluated for porting to TypeScript
2. If not ported, moved to `tools/` with explicit specialist-label
3. Flagged in the project board as technical debt

## Related Issues

- Existing Python in core packages should be inventoried
- May conflict with legacy Python scripts in `tools/` that should be TypeScript

## Notes

This is a governance issue, not a technical blocker. The main risk is organic Python expansion in early exploration phases without subsequent cleanup.