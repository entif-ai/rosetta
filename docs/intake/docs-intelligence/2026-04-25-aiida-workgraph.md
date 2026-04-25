# Docs Intelligence Extraction

## Source

- Path: `docs/external/AiiDA-WorkGraph.md`
- Title: AiiDA-WorkGraph — Pythonic Scientific Workflow Management with Automatic Provenance
- Date evidence: README badge timestamps, PyPI badge references (public open-source project, no date in doc; last commit context from GitHub URL aiidateam/aiida-workgraph)
- Authority tier: External open-source project (MIT license)
- Freshness: Active project (latest CI badge, ReadTheDocs badge current)
- Word count: ~700
- Extractor: subagent di-aii-da-2026-04-25
- Extraction date: 2026-04-25T21:44:00Z

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

AiiDA-WorkGraph is a Python library for building, executing, and monitoring scalable scientific workflows with automatic data provenance tracking. It provides Pythonic decorators (`@task`, `@task.graph`), a web-based GUI, checkpointing, error handling, and remote/parallel execution. It is built on top of AiiDA (Automated Interactive Infrastructure and Database for Ab-initio), a well-established scientific workflow engine used in computational materials science and physics. The project is relevant to Rosetta as a reference architecture for: (1) graph-based workflow composition with Pythonic syntax, (2) automatic provenance tracking as a first-class feature, (3) checkpointing and error recovery for long-running workflows, and (4) remote/distributed execution.

## Goals And Intent

- Provide a Python-native workflow definition paradigm for scientific computation
- Guarantee automatic data provenance without manual instrumentation
- Enable scalable execution on remote supercomputers with concurrent task scheduling
- Offer interactive visualization, monitoring, and debugging of running workflows
- Build reusable sub-workflow components that compose into larger pipelines

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Why WorkGraph / Automatic Data Provenance | provenance, scientific-workflow, checkpointing | automatic-provenance, reproducibility, workflow-decorator | technology | AiiDA-WorkGraph treats provenance as a first-class output, not an afterthought — the provenance graph is automatically generated from task inputs/outputs without manual bookkeeping | "Guarantee scientific reproducibility with zero effort. The complete history of all data and calculations is automatically tracked." | Consider as reference architecture for Rosetta receipt emission pattern | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Getting Started / Quick Start Example | workflow-decorator, pythonic, task-graph | @task-decorator, @task-graph-decorator, data-flow-linking | technology | Workflows are defined using Python decorators (`@task`, `@task.graph`). Task outputs are linked to subsequent task inputs via `.result` attribute chaining | `sum_result = add(x, y).result; product_result = multiply(x=sum_result, y=z).result` | Rosetta skillpack importer or write-admission gate could use similar decorator-based API surface for defining processing steps | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Flexible Workflow Construction | workflow-construction, control-flow, zones | pythonic-workflows, visual-graph-zones, low-level-node-graph, adaptive-workflow | decision | Three complementary workflow construction approaches exist: (1) Pythonic `@task.graph` decorators (recommended), (2) Visual graph zones (If/While/Map) with explicit logic, (3) Low-level programmatic node-graph for maximum control and dynamic generation | "🐍 Pythonic Workflows (Recommended): Use @task.graph... 👁️ Visual Graph with Explicit Logic: Use zones like If, While, and Map... ⚙️ Low-Level Node-Graph Programming: Programmatically define each task" | Rosetta could offer multiple composition idioms (declarative vs imperative) — this three-tier pattern mirrors NOT LAME's context compiler + query router + adapter certification layers | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Why WorkGraph / Checkpointing & Error Handling | checkpointing, error-recovery, resilience | long-running-workflow, checkpoint-protection, failure-recovery | technology | Checkpointing is explicitly listed as a core feature: "Protect long-running workflows from interruptions and build resilient logic to recover from failures." This is a named feature, not an emergent property | "🛡️ Checkpointing & Error Handling: Protect long-running workflows from interruptions and build resilient logic to recover from failures." | Rosetta's write-admission gate checkpoint step maps directly to this pattern. Consider WorkGraph checkpoint design as a reference for receipt-based recovery | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Why WorkGraph / Remote & Parallel Execution | remote-execution, parallelization, supercomputing | remote-offload, concurrent-workflows, high-throughput | technology | WorkGraph supports seamless task offload to remote supercomputers with concurrent execution: "Seamlessly offload tasks to remote supercomputers and run them concurrently." Scale claim: "thousands of concurrent workflows" | "🚀 Remote & Parallel Execution: Seamlessly offload tasks to remote supercomputers and run them concurrently." + "⚡ High-Throughput Computing: Built to scale, AiiDA-WorkGraph can efficiently manage thousands of concurrent workflows." | Rosetta's parallelization goals (parallel ingestion adapters) could reference WorkGraph's remote execution model for the adapter certification harness | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Why WorkGraph / Reusable Components | reusability, sub-workflow, composition | encapsulation, sub-workflow-reuse, larger-pipelines | technology | Sub-workflows can be encapsulated as reusable components: "Encapsulate common routines as sub-workflows and easily reuse them in larger, more complex pipelines." This implies a component registry pattern | "🧩 Reusable Components: Encapsulate common routines as sub-workflows and easily reuse them in larger, more complex pipelines." | Rosetta skillpack importer → quarantine → certify → promote flow maps to this encapsulation model. Sub-workflow reuse → component marketplace pattern | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Interactive GUI | gui, visualization, monitoring | web-interface, real-time-monitoring, workflow-debugging | technology | GUI is provided as a separate package (`aiida-gui-workgraph`) with a web interface at `http://127.0.0.1:8000/workgraph`. It offers workflow visualization, monitoring, and debugging in real-time | "Navigate to http://127.0.0.1:8000/workgraph in your web browser. Note: The GUI is an experimental feature" | Rosetta Bootstrap or TC-007 (tapestry UI) could consider a similar lightweight web GUI for workflow visualization — but the experimental status is a cautionary data point | medium |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Why WorkGraph / Dynamic Control Flow | control-flow, adaptive-workflow, runtime-branching | runtime-data-response, if-else-loops, adaptive-execution | technology | Adaptive workflows respond to data at runtime using standard Python `if/else` statements and loops — no custom DSL required. This is presented as a feature differentiator | "🧠 Dynamic Control Flow: Build adaptive workflows that respond to data at runtime using standard Python if/else statements and loops." | Rosetta's write-admission gate is state-machine-based; the adaptive-if-else pattern suggests a complementary runtime branching capability for skillpack processing | medium |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Quick Start / Automatic Provenance Tracking | provenance-graph, data-lineage, traceability | provenance-graph-visualization, data-lineage, full-traceability | technology | The provenance graph is automatically generated from the task structure, showing complete data lineage from inputs through all intermediate calculations to outputs | "AiiDA-WorkGraph automatically generates a detailed provenance graph, tracking the full history of data and calculations to ensure full traceability and reproducibility." | Rosetta's receipt law (every step emits a receipt) is a similar goal. WorkGraph's visual provenance graph could be a reference for tapestry visualization | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Installation | dependency, aiida-presto, aiida-profile | aiida-dependency, aiida-profile-setup, verdi-cli | dependency | Requires a working AiiDA environment. Setup uses `verdi presto` or `verdi quicksetup`. This means WorkGraph is not standalone — it requires the full AiiDA stack (PostgreSQL + RabbitMQ typically) | "First, ensure you have a working AiiDA environment. verdi presto # Or 'verdi quicksetup'" | Rosetta should NOT model AiiDA-WorkGraph as standalone. It is a layer on AiiDA which itself requires a full server stack (PostgreSQL + message broker). This limits deployability for lightweight/single-node scenarios | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Useful Links | licensing, ecosystem | mit-license, aiida-ecosystem, workgraph-collections | decision | AiiDA-WorkGraph is MIT licensed. The broader AiiDA ecosystem includes the core `aiida-core` package, multiple plugin packages, and the `workgraph-collections` demo repository | License: MIT. Links: aiida-workgraph.readthedocs.io, github.com/superstar54/workgraph-collections | No licensing conflicts with Rosetta MIT/Apache/etc — confirm Rosetta's target license | high |
| 2026-04-25T21:44:00Z | docs/external/AiiDA-WorkGraph.md | Why WorkGraph / Interactive GUI | gui-experimental-status | experimental-feature, active-development | risk | The GUI is explicitly marked experimental: "Note: The GUI is an experimental feature and is under active development." This means API/stability of the web UI is not guaranteed | "Note: The GUI is an experimental feature and is under active development." | If Rosetta references or adopts the WorkGraph GUI pattern, this experimental status is a warning sign — do not build hard dependencies on GUI features without fallback | medium |

---

## Components And Technologies

- **Core library**: `aiida-workgraph` (pip package)
- **GUI package**: `aiida-gui-workgraph` (separate pip package)
- **AiiDA dependency**: Requires `aiida-core` environment with `verdi` CLI tooling
- **Runtime infrastructure**: AiiDA typically uses PostgreSQL + RabbitMQ (server stack)
- **Web interface**: HTTP server on port 8000 (`aiida-gui start`)
- **Python decorators**: `@task` (function → workflow component), `@task.graph` (function → workflow graph)
- **Language runtime**: Python 3.x
- **Execution targets**: Remote supercomputers, local execution
- **Provenance graph**: Auto-generated from task I/O wiring
- **MIT License**

---

## Conceptual Claims

- **Provenance as first-class citizen**: Unlike general workflow engines where provenance tracking requires manual instrumentation, AiiDA-WorkGraph auto-generates the provenance graph from the structural wiring of tasks. This aligns with Rosetta's "receipt law" — every durable step emits a receipt.
- **Pythonic over DSL**: The recommended workflow definition uses standard Python constructs rather than a custom YAML/JSON/workflow-DSL. Control flow uses `if/else`/loops natively. This parallels Rosetta's `parse-only-default` safety baseline (standard tools over custom ones).
- **Three-tier construction flexibility**: WorkGraph offers three composition idioms (decorator, visual zones, low-level node programming) rather than forcing one paradigm. This is analogous to Rosetta's three-rung staircase (Bootstrap → Text-Core MVP → Alpha RC) — different fidelity levels for different contexts.
- **Checkpointing as named feature**: Long-running workflow protection is an explicit marketed feature, not an emergent property. Rosetta's write-admission gate has an explicit checkpoint step for the same reason.
- **GUI as experimental companion**: The web GUI is a separate package, opt-in, and explicitly experimental. This suggests the core value is in the library API, not the UI.

---

## Dependencies And Sequencing

- **Depends on**: `aiida-core` — WorkGraph is a plugin/extension layer on the AiiDA scientific workflow engine. Cannot be used standalone. AiiDA itself requires PostgreSQL + RabbitMQ (full server stack).
- **Installation order**: AiiDA environment first → `pip install aiida-workgraph` → optionally `pip install aiida-gui-workgraph`
- **Execution dependency**: Workflow execution requires AiiDA daemon (message broker-backed task queue)
- **Sequencing implication**: For Rosetta, if referencing WorkGraph as a workflow/reference architecture, the AiiDA dependency chain (PostgreSQL + RabbitMQ) must be explicitly modeled as a prerequisite — not a soft recommendation.

---

## Contradictions Or Supersession

- **Contradiction — Lightweight vs Full Stack**: Rosetta's NOT LAME specifies PostgreSQL as canonical registry (aligned with AiiDA), BUT AiiDA requires RabbitMQ in addition to PostgreSQL. Rosetta's NOT LAME does not mention a message broker. If AiiDA's execution model is referenced for Rosetta's adapter certification harness, the message broker requirement must be explicitly called out or reconciled.
- **Contradiction — GUI as core feature**: WorkGraph markets the GUI prominently but marks it experimental. Rosetta's Bootstrap phase should not reference WorkGraph GUI as a deployment target without a prominent "experimental" caveat.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| AiiDA-WorkGraph provenance pattern as Rosetta receipt-law reference architecture | research | `docs/intake/issue-drafts/aiida-workgraph-provenance-reference.md` | provenance, workflow, reference-architecture | — | WorkGraph auto-generates provenance graphs from task wiring. Rosetta's receipt law has the same goal. This doc could be catalogued as a reference architecture rather than a system to re-implement |
| AiiDA dependency chain (PostgreSQL + RabbitMQ) must be explicitly modeled in Rosetta infrastructure requirements | architecture | `docs/intake/issue-drafts/aiida-workgraph-infrastructure-dependencies.md` | infrastructure, dependencies, rabbitmq, postgresql | — | WorkGraph requires full AiiDA stack (PostgreSQL + RabbitMQ). Rosetta NOT LAME specifies PostgreSQL but omits message broker. If AiiDA execution model is borrowed, broker requirement must be explicit |
| WorkGraph GUI is experimental — do not build hard dependencies | risk | `docs/intake/issue-drafts/aiida-workgraph-gui-experimental.md` | gui, experimental, stability | — | "The GUI is an experimental feature and is under active development." Any Rosetta UI reference to WorkGraph GUI patterns should carry a prominent stability warning |

---

## Project Board Suggestions

- Area: `docs-intelligence`
- Cycle: `batch-5` (external/frontier docs)
- Status: `extracted`
- Blocked by: None
- Parallelization notes: This doc is independent of runtime Rosetta code. Extraction could have run in parallel with other batch-5 docs. This subagent followed the ledger lock correctly.

---

## Open Questions

- Does Rosetta need a message broker (RabbitMQ or equivalent) for its parallel adapter execution model? If AiiDA's async task distribution is used as a reference, the broker gap in NOT LAME's infrastructure spec needs resolution.
- Should Rosetta's workflow layer (LangGraph or equivalent) adopt a Python-decorator-based API surface similar to `@task`/`@task.graph`, or does the receipt-based state machine approach better serve the sovereignty goals?
- Is the WorkGraph GUI (even in experimental form) useful as a reference for Rosetta's TC-007 tapestry visualization? The auto-generated provenance graph visualization is the most concrete reference design available in this doc.
- Does the AiiDA ecosystem have a component marketplace or registry that could seed Rosetta's skillpack importer with pre-certified scientific workflow adapters?
