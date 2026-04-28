# AINL Competitor Intelligence - 2026-04-28

Status: docs-intake competitor synthesis
Extractor: Codex CLI worker
Sources fetched/read:

- https://www.ainativelang.com/whitepaper
- https://github.com/sbhooley/ainativelang
- https://github.com/sbhooley/ainativelang-claudecode

Boundary: this is planning intelligence. It is not Rosetta runtime ingestion, not tile generation, not a tapestry, and not evidence that competitor code or semantics were incorporated. No competitor source code was copied into this repository.

## Source Receipts

Shell clone attempts failed in this sandbox because `github.com` DNS resolution is unavailable from the terminal, so the read path used primary web pages and GitHub-rendered repository pages. Exact failed commands are recorded in the session receipts:

- `git clone --depth 1 https://github.com/sbhooley/ainativelang.git /tmp/ainl-sources/ainativelang` -> `Could not resolve host: github.com`
- `git clone --depth 1 https://github.com/sbhooley/ainativelang-claudecode.git /tmp/ainl-sources/ainativelang-claudecode` -> `Could not resolve host: github.com`

The web-fetched sources were still primary:

- AINL whitepaper: version 1.8.0, described as active human plus AI co-development, with primary implementation paths `compiler_v2.py`, `runtime/engine.py`, and `cli/main.py`; it positions AINL as graph-based orchestration, canonical IR, and compile-once/run-many execution.
- `sbhooley/ainativelang`: GitHub README describes `ainl check`, `ainl run`, `ainl emit`, `ainl serve`, `ainl inspect`, trace JSONL output, strict diagnostics, ecosystem importers, MCP tools, and include/module reuse.
- `sbhooley/ainativelang-claudecode`: GitHub README describes Claude Code graph memory, typed node classes, project isolation, context-aware retrieval, graceful hook degradation, trajectory capture, pattern promotion, adaptive compression, SQLite stores, and CLI inspection.

## High-Signal Readout

AINL is not mainly interesting as a syntax. The reusable signal is the product line around deterministic agent workflows: author once, validate into a canonical graph, run repeatedly under explicit adapters, and preserve enough trace state that repeated cognition becomes cheaper and auditable.

Rosetta already has stronger constitutional primitives than AINL's public materials in several places: content-addressed tiles, receipt law, guard posture, source-substrate modeling, pack conformance, and the three-plane memory doctrine. The competitor pressure is that AINL has packaged those ideas into operator-facing affordances: `validate/compile/run/inspect`, strict-valid profiles, execution tape output, adapter manifests, graph visualization, host installers, and agent-memory ergonomics.

The backlog value is therefore not "build AINL in Rosetta." It is to tighten Rosetta's own workflow, pack, guard, and memory surfaces so the same product affordances emerge from Rosetta-native concepts.

## Evidence Map

| Competitor evidence | Rosetta implication | Candidate |
| --- | --- | --- |
| Whitepaper frames canonical IR as nodes/edges and treats surface syntax and emitted targets as serializations. | Rosetta can define an agent-workflow graph profile whose nodes are receipt-bearing steps and whose edges are explicit data/control dependencies. | `docs/intake/issue-drafts/ainl-001-rosetta-agent-workflow-graph-ir.md` |
| Whitepaper and README emphasize strict validation, strict-valid example profiles, and machine-readable diagnostics. | Rosetta needs strict-valid profiles for workflow/agent artifacts, not only pack manifests and schemas. | `docs/intake/issue-drafts/ainl-002-strict-valid-workflow-profile.md` |
| Whitepaper adapter model lists concrete adapters and metadata such as privilege tiers and destructive/network-facing flags. | Rosetta Guard and source/refinery adapters should share a manifest vocabulary for effects, privileges, capability grants, and validation. | `docs/intake/issue-drafts/ainl-003-adapter-capability-privilege-manifest.md` |
| README exposes JSONL execution tape output for grading/evolution. | Rosetta can mint execution-tape receipts so replay/evaluation is traceable and independent of model transcript history. | `docs/intake/issue-drafts/ainl-004-execution-tape-receipts.md` |
| Whitepaper describes AINLBundle as one portable artifact containing workflow, memory, persona, and tools. | Rosetta should define a portable bundle manifest around workflow graph, receipts, policy refs, pack refs, and memory-plane references. | `docs/intake/issue-drafts/ainl-005-portable-agent-workflow-bundle.md` |
| README exposes `ainl serve` with `/validate`, `/compile`, `/run`, and `/health`; MCP tooling exposes validate/diff/fitness surfaces. | Existing MCP compliance issue #513 should be refined around Rosetta-native validate/compile/run/inspect contracts. | `docs/intake/issue-drafts/ainl-006-mcp-validate-compile-run-inspect.md` |
| Claude Code plugin describes graph memory with typed Episode/Semantic/Procedural/Persona/Failure nodes, project isolation, and SQLite stores. | Already represented by PRD-009, memory adapter certification, and MOL memory loop issues; record as mapping rather than duplicate publish. | `docs/intake/issue-drafts/ainl-007-graph-memory-project-isolation.md` |
| Claude Code plugin claims trajectory capture and promotion of successful workflows into reusable patterns. | Rosetta should require receipts and certification thresholds before procedural memories or skill patterns can be promoted. | `docs/intake/issue-drafts/ainl-008-trajectory-pattern-promotion.md` |
| AINL positions compile-once/run-many as token economics and the Claude plugin claims adaptive compression savings. | Rosetta has cheap-first routing, context compiler, and semantic efficiency issues; this adds a measurement harness angle. | `docs/intake/issue-drafts/ainl-009-token-economics-benchmark-harness.md` |
| README describes importers for Clawflows, Agency-Agents, and Markdown with fallback stubs. | Rosetta's skillpack/importer quarantine should cover external workflow and agent formats before certification. | `docs/intake/issue-drafts/ainl-010-external-workflow-import-quarantine.md` |

## Duplicate Search Summary

Local `gh` issue search could not complete because the CLI token/network path is unavailable in this sandbox. I used the repository ledger and archived issue drafts as the duplicate-check source of truth, with `rg` over `docs/intake/github-issue-ledger.json`, `docs/intake/issue-drafts/archive/`, and related docs.

Already represented or adjacent:

- MCP compliance: issue #513 (`ESA-006: Target MCP compliance for Rosetta agent interface layer`).
- Three memory planes: issue #807 (`PRD-009: Three Memory Planes - Truth / Temporal / Activation Separation and Implementation`).
- Memory adapter certification: issue #361.
- Adaptive memory loop: issue #171.
- Pack conformance and strict pack validation: issues #69, #74, #79, #240, and #43.
- Cheap-first routing and token economics: issue #254 plus related context/compiler and semantic-efficiency drafts.
- Skillpack importer quarantine: `skillpack-importer-quarantine-flow` exists as a published draft/issue entry.

Highest-leverage candidates that appear distinct enough to publish:

1. AINL-001 - Rosetta agent workflow graph IR profile.
2. AINL-002 - Strict-valid workflow/agent artifact profile.
3. AINL-003 - Adapter capability and privilege manifest.
4. AINL-004 - Execution tape receipts.
5. AINL-005 - Portable agent workflow bundle manifest.

The remaining candidates should stay local for now because they are refinements of existing issues rather than clean new backlog items.

## Rosetta-Native Design Pressure

The useful novelty is packaging, not authority. Rosetta should preserve its own invariants:

- Every meaningful step emits or binds a receipt.
- Side effects remain denied by default unless a guard decision authorizes them.
- Packs extend behavior; they do not become a second constitutional center.
- Truth, temporal, and activation planes stay separated even when graph memory becomes ergonomic.
- External workflow formats enter through quarantine and certification, not direct trust.

Where AINL says "canonical IR = nodes/edges," Rosetta should say "workflow graph = receiptable steps plus explicit dependency edges over content-addressed artifacts." Where AINL says "strict-valid," Rosetta should define named conformance profiles tied to packs, guard policy, schema validation, and replay receipts. Where AINL says "graph memory," Rosetta should bind each memory operation to the three-plane doctrine and admission policy.

## Recommended Next Slice

Start with AINL-001 and AINL-004 together only if the implementation is still small: the graph IR profile should be validated by producing an execution tape receipt for a tiny deterministic workflow. If that expands beyond docs/spec work, split them:

1. Spec the graph IR profile and strict validation errors.
2. Add execution tape receipt schema and a fixture-backed verifier.
3. Only then build any operator API or MCP surface.

Do not implement external AINL import, graph-memory promotion, or compression claims first. Those are more likely to duplicate existing issues or overfit competitor packaging before Rosetta's own conformance spine is sharp enough.
