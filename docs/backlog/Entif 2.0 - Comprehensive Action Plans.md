# Entif 2.0 Architecture & Development Plan

# 

[North Star & Core Principles	5](#north-star-&-core-principles)

[Layered System Architecture Overview	6](#layered-system-architecture-overview)

[Input & Ambient Ingestion (Limitless Feed)	8](#input-&-ambient-ingestion-\(limitless-feed\))

[Voice-First Orchestrator (“Ada”)	12](#voice-first-orchestrator-\(“ada”\))

[Sub-Agents and Tool Ecosystem	19](#sub-agents-and-tool-ecosystem)

[Knowledge Core: GraphRAG Store & Glyph Engine	20](#knowledge-core:-graphrag-store-&-glyph-engine)

[Advanced Reasoning Modules (TRM, ROMA, ReasoningBank)	27](#advanced-reasoning-modules-\(trm,-roma,-reasoningbank\))

[Tiny Recursive Model (TRM) – Deep Reasoning Engine	27](#tiny-recursive-model-\(trm\)-–-deep-reasoning-engine)

[ROMA – Recursive Task Decomposition Planner	30](#roma-–-recursive-task-decomposition-planner)

[ReasoningBank – Strategy Memory	35](#reasoningbank-–-strategy-memory)

[Evaluation & Adaptation: ELIXIR Feedback Loop and Coach	40](#evaluation-&-adaptation:-elixir-feedback-loop-and-coach)

[Safety & Alignment System: Petri \+ Tripwire	47](#safety-&-alignment-system:-petri-+-tripwire)

[Media & Attention Engine (Content Creation Flywheel)	53](#media-&-attention-engine-\(content-creation-flywheel\))

[System Integration & Flow Summary	62](#system-integration-&-flow-summary)

[Development Plan (Incremental Micro-Tiers)	64](#development-plan-\(incremental-micro-tiers\))

[Workstream 1 — Core Orchestration & Knowledge Loop	65](#workstream-1-—-core-orchestration-&-knowledge-loop)

[Workstream 2 — Media Engine & Attention Flywheel	72](#workstream-2-—-media-engine-&-attention-flywheel)

[Minimal Schemas Reference	78](#minimal-schemas-reference)

[Guardrails & Ethical Considerations	80](#guardrails-&-ethical-considerations)

[What “Done” Looks Like (Entif 2.0 Minimum Viable Product)	82](#what-“done”-looks-like-\(entif-2.0-minimum-viable-product\))

[Next Waves and Future Enhancements	83](#next-waves-and-future-enhancements)

[**Entif 2.0 — Forge Catalog & Architecture (Receipts-First, MCP-Native)	85**](#entif-2.0-—-forge-catalog-&-architecture-\(receipts-first,-mcp-native\))

[Cross-cutting invariants	85](#cross-cutting-invariants)

[Forge Registry (names & one-liners)	86](#forge-registry-\(names-&-one-liners\))

[1\) MediaForge	89](#1\)-mediaforge)

[2\) SocialForge	90](#2\)-socialforge)

[3\) ArticleForge	91](#3\)-articleforge)

[4\) LyricsForge	91](#4\)-lyricsforge)

[5\) WordForge	92](#5\)-wordforge)

[6\) FileForge	92](#6\)-fileforge)

[7\) ArchiveForge	93](#7\)-archiveforge)

[8\) MetadataForge	93](#8\)-metadataforge)

[9\) VersionForge	93](#9\)-versionforge)

[10\) VizForge	93](#10\)-vizforge)

[11\) AuthForge	94](#11\)-authforge)

[12\) BackupForge	94](#12\)-backupforge)

[13\) UIForge	95](#13\)-uiforge)

[14\) APIForge	96](#14\)-apiforge)

[15\) LLM Model Planes (OllamaForge \+ LLMForge) — supporting planes	96](#15\)-llm-model-planes-\(ollamaforge-+-llmforge\)-—-supporting-planes)

[Wiring overview (how these parts see each other)	97](#wiring-overview-\(how-these-parts-see-each-other\))

[Minimal vertical slices (per Forge) to land confidently	97](#minimal-vertical-slices-\(per-forge\)-to-land-confidently)

[Notes on naming	98](#notes-on-naming)

[**Entif 2.0 Forges Architectural Blueprint	100**](#entif-2.0-forges-architectural-blueprint)  
[MediaForge	100](#mediaforge)  
[Purpose & Responsibilities	100](#purpose-&-responsibilities)  
[Architecture & Components	101](#architecture-&-components)  
[Implementation Plan (MediaForge)	106](#implementation-plan-\(mediaforge\))  
[SocialForge	110](#socialforge)  
[Purpose & Responsibilities	110](#purpose-&-responsibilities-1)  
[Architecture & Components	110](#architecture-&-components-1)  
[Implementation Plan (SocialForge)	119](#implementation-plan-\(socialforge\))  
[ArticleForge	125](#articleforge)  
[Purpose & Responsibilities	125](#purpose-&-responsibilities-2)  
[Architecture & Components	126](#architecture-&-components-2)  
[Implementation Plan (ArticleForge)	132](#implementation-plan-\(articleforge\))  
[LyricsForge	139](#lyricsforge)  
[Purpose & Responsibilities	139](#purpose-&-responsibilities-3)  
[Architecture & Components	139](#architecture-&-components-3)  
[Implementation Plan (LyricsForge)	147](#implementation-plan-\(lyricsforge\))  
[MediaForge	161](#mediaforge-1)  
[Purpose & Responsibilities	161](#purpose-&-responsibilities-4)  
[Architecture & Components	162](#architecture-&-components-4)  
[Implementation Plan (MediaForge)	171](#implementation-plan-\(mediaforge\)-1)  
[SocialForge	182](#socialforge-1)  
[Purpose & Responsibilities	182](#purpose-&-responsibilities-5)  
[Architecture & Components	183](#architecture-&-components-5)  
[Implementation Plan (SocialForge)	200](#implementation-plan-\(socialforge\)-1)  
[ArticleForge	209](#articleforge-1)  
[Purpose & Responsibilities	209](#purpose-&-responsibilities-6)  
[Architecture & Components	211](#architecture-&-components-6)  
[Implementation Plan (ArticleForge)	225](#implementation-plan-\(articleforge\)-1)  
[Net Effect of Forges Working Together	235](#net-effect-of-forges-working-together)

## **North Star & Core Principles** {#north-star-&-core-principles}

**North Star:** *Entif 2.0* is envisioned as a *voice-driven cognitive command center* that allows a single developer to operate at “vibe speed” – i.e. speak complex requests and have the system deliver verified results with minimal friction. The system prioritizes sub-second acknowledgment of voice commands and end-to-end task completion within a few seconds for simple requests. Every action is logged and evaluated, enabling continuous self-improvement. Key operating principles include:

* **One Truth, Many Views:** All activities share a unified lifecycle: **session → task → step → artifact → check → outcome → receipt**. This means every task is broken into discrete steps with explicit outputs (artifacts) and acceptance checks, producing a final outcome and a logged receipt. Multiple interface views (voice, dashboards, etc.) present this single source of truth.

* **“Receipts or It Didn’t Happen”:** *Every* tool invocation or model inference yields a **receipt** record capturing the model/tool used, tokens consumed, latency, cost, and a pass/fail verdict. These receipts provide full auditability and traceability for each action.

* **Cheap-First, Verify-Then-Escalate:** The system always attempts the lowest-cost, fastest reasoning or generation approach first, then escalates to larger models or more complex strategies only if a **verifier** flags uncertainty. This keeps latency and expense low while still achieving accuracy by using heavier resources only when needed.

* **Ambient Capture, Explicit Action:** Entif continuously **ingests ambient data in parse-only mode by default** – meaning it will listen, transcribe, and understand context from the environment (meetings, notes, feeds) but **perform no side-effectful actions unless explicitly commanded**. All autonomous suggestions (e.g. proposed tasks from new information) require user confirmation (“command mode”) before execution. This ensures **consent and safety**: a “recording” indicator is present when listening, and a configurable “do-not-ingest” list is honored to skip private or sensitive inputs.

* **Genesis Anchor & Alignment:** The system’s purpose and constraints are encoded in a **genesis document** that serves as an alignment anchor. Nightly processes compare the system’s evolving knowledge and behavior against this anchor to detect drift or policy violations, ensuring the system remains true to the owner’s intent. Any divergence triggers alerts or corrective action.

* **Four-Hour Micro-Tiers:** Development is structured into bite-sized **4-hour deliverable units**, each producing a tangible improvement or feature. Every micro-tier build delivers immediate utility and lays groundwork for subsequent tiers, creating *compounding returns* on development effort. High leverage is achieved by prioritizing tasks that maximize **(Impact × Urgency × Reusability × Compounding)** value.

With these principles in mind, the following sections detail Entif 2.0’s layered architecture – from input to output – and a phased implementation plan that achieves rapid, compounding progress toward a self-sustaining, evolving system.

## **Layered System Architecture Overview** {#layered-system-architecture-overview}

Entif 2.0 is structured as a **multi-layer cognitive architecture**. Each layer comprises distinct modules with clear responsibilities, interfaces, and data contracts, and each layer feeds the next in a pipeline from sensory input to intelligent action to feedback. Below is a high-level of the layers and components:

* **Input & Ingestion Layer:** Always-on sensors and connectors that capture raw inputs (voice audio, files, realtime data feeds) and convert them into structured information. Key components: the **“Limitless” Ambient Ingestion** pipeline for audio and text, and related connectors for various data sources.

* **Orchestration & Agency Layer:** The core decision-making engine that interprets user intent and orchestrates tools/agents to fulfill tasks. Central component: **“Ada” Voice-First Orchestrator**, a Model-Context-Protocol (MCP) driven agent coordinator. It delegates work to specialized sub-agents (code generation agents “Sony” and “Blink”, a browser verification agent, etc.) and manages the flow of each task.

* **Knowledge & Memory Layer:** A hybrid symbolic-vector knowledge base that stores and retrieves facts, context, and learnings. Key components: **GraphRAG** (Graph-based Retrieval-Augmented-Generation store) combined with a **Glyph Engine** for semantic representation. This layer also includes a **Vector Index** for embeddings and an **Artifact Store** for files/evidence, providing long-term memory and context for reasoning.

* **Reasoning & Planning Layer:** Advanced reasoning modules that can be invoked for complex tasks or optimizations. This includes **TRM (Tiny Recursive Model)** for intensive stepwise reasoning, **ROMA (Recursive Open Meta-Agent)** for task decomposition and parallelization, and the **ReasoningBank** for memory of successful reasoning strategies. These modules enhance the orchestrator’s capabilities for difficult or non-atomic tasks.

* **Evaluation & Adaptation Layer:** Systems for *feedback, safety, and self-improvement*. Core components: **ELIXIR** feedback loop that logs outcomes (receipts) and performance metrics, the **Coach** module for nightly self-tuning using those logs, and the **Petri \+ Tripwire Safety System** that provides automated auditing and guardrails. This layer continuously evaluates actions (via acceptance tests, receipts, guardrails) and adjusts policies (model routing, retry logic, safety rules) to improve reliability and alignment.

* **Output & Interface Layer:** Channels through which Entif delivers results and interacts with the user or external systems. This includes the **Voice interface** (speech confirmations or clarifications from Ada), a **Receipts Console/Dashboard** for real-time monitoring of actions and metrics, and the **Media & Attention Engine** which produces external content (like videos or posts) and monitors their engagement. Outputs from Entif are not only immediate task results (code, documents, etc.) but also ongoing media artifacts and analytics that close the learning loop.

All layers communicate through well-defined interfaces (often via the **Model Context Protocol (MCP)** for tool/agent calls). The design ensures **separation of concerns** (each module has a focused role and boundaries) while enabling tight **integration via shared data models** (e.g. a common **Receipt** schema for logging, a unified **Task/Step** structure for plans, etc.). Safety and observability measures pervade every layer – from input filtering to output verification – such that the system is *fully instrumented* and *alignable* at each step.

Below, we break down each major module in the architecture, detailing its responsibilities, interfaces, data schemas, execution flow, and the safety/observability measures that govern it.

## **Input & Ambient Ingestion (Limitless Feed)** {#input-&-ambient-ingestion-(limitless-feed)}

This layer is responsible for capturing raw information from the user’s environment continuously and transforming it into structured knowledge without initiating any actions on its own. It ensures Entif has up-to-date context and memory to draw upon, while respecting privacy and staying in a passive mode unless commanded.

* **Responsibilities & Boundaries:** The Ambient Ingestion module listens to **audio streams (“Limitless” audio feed)**, monitors **watched folders** for new files/notes, and connects to **realtime data APIs** (e.g. market or social feeds). Its sole job is to *ingest and comprehend*; it does **not** execute commands or make changes to the external world. By default it operates in **parse-only mode**, meaning it will transcribe and semantically analyze inputs but will never generate actions, code, or outputs from them without explicit user instruction. This boundary guarantees that passive listening cannot cause side-effects.

* **Key Interfaces & Events:**

  * *Audio Input:* A microphone or audio stream is processed via Voice Activity Detection (VAD) and wake-word detection. When the user has not invoked the wake word, all speech is treated as ambient and routed to ingestion. The ingestion pipeline raises events like **`TranscriptSegment`** events containing partial text and metadata as the user (or others) speak.

  * *File/Document Watcher:* A file system watcher monitors designated folders (e.g. a `watch/` directory) or cloud drives. When new notes, transcripts (e.g. from meetings or YouTube videos), or documents appear, an **`IngestFile`** event triggers processing of that content.

  * *Realtime API Feeds:* Connectors (possibly orchestrated via an automation tool like n8n) push external data (e.g. live market data, RSS feeds, emails) into the ingestion pipeline via webhook events. Each feed event includes metadata (source, timestamp, type) which is used to classify and route the content appropriately (for example, some items might be tagged as ‘Realtime market data’ vs. ‘Personal note’).

* **Data Models & Schemas:** Ingested data is normalized into a structured form:

  * **ASR Transcript Segment:** Each audio segment is represented with fields `{start_time, end_time, text, speaker, confidence, is_final}`. Segments accumulate into an interaction transcript.

  * **Ingested Document:** Textual files or transcripts are broken into smaller chunks (e.g. paragraphs or utterances) and annotated. Each chunk is converted into a **Glyph JSON** structure – with a **label** (a canonical concept identifier, often a WordNet/BabelNet synset), a short **definition or summary**, and any **relations** (links to other concepts) found in the text. For example, a paragraph about a project requirement might yield a glyph with label “health\_check\_endpoint” and relations to concepts like “API” or “database”, plus references to the source text.

  * **Provenance & Metadata:** Every piece of ingested data is tagged with provenance info: source identifier, timestamp, and span references. In the **GraphRAG** store, this manifests as an **Evidence node** connected to concept nodes (glyphs), capturing exactly which source and snippet support a fact.

  * **Micro-Spec (Suggested Task):** The ingestion layer can also produce *suggested tasks* (in **Spotlight**) by detecting actionable items in the content. For instance, if a meeting transcript says *“We should create an API health check”*, the system may generate a **micro-spec** JSON: `{ intent: "create health check endpoint", acceptance_checks: [...], artifacts: [...] }` describing a potential task and how to verify it. These suggestions are marked as *non-executable until confirmed by the user*.

* **Execution Flow & Dependencies:** The ingestion flow is largely *pipeline-automated*:

  * **Capture:** Audio enters via the microphone. A local VAD and wake-word detector (`"Ada"`) ensure minimal latency – if the wake-word is not detected, the audio is treated as ambient. Otherwise it is diverted to the orchestrator (see Orchestrator below). Non-command speech is continuously transcribed by an ASR engine (preferrably a fast local model for privacy and speed). Partial transcripts stream out every few hundred milliseconds.

  * **Chunk & Classify:** As transcripts or text files come in, the system classifies them by context (e.g. “casual conversation”, “client meeting”, “YouTube tutorial”) and sensitivity. This classification can use simple rules or ML and is used to decide if any redaction is needed (e.g. scrub phone numbers) and how to prioritize processing.

  * **Glyph Mapping:** The text content is passed to the **Glyph Mapper**, which looks up key terms in ontologies (WordNet, BabelNet, domain dictionaries) to attach stable IDs and semantic relationships. The output is a set of **Glyph nodes** and **relations**. For example, a sentence “API health check endpoint returning 200 OK” might yield a Glyph node for *“health check”* linked to a broader concept *“API endpoint”*, plus an attribute that *200 OK* is a success status.

  * **Graph Update:** The Glyphs and associated evidence are upserted into the **GraphRAG** knowledge graph. If an entity already exists (duplicate), the system will *merge nodes* rather than create duplicates, incrementing a reference count or linking the new evidence. Basic data cleaning (deduplication, merging of equivalent concepts) might occur here or in a nightly maintenance job. Redacted content (if any) is omitted from storage. This process yields a continuously growing, cross-linked graph of knowledge the system has encountered.

  * **Suggestion Extraction:** Optionally, an NLP pass looks for imperative statements or open questions in the content. These are turned into *micro-spec suggestions* (with no side-effects). For instance, seeing “We need to draft the Q3 report” in notes could prompt the system to create a micro-spec for that task in a backlog. These suggestions are visible to the user (e.g. in a “Spotlight” or backlog list) but **not executed without approval**.

  * **Logging:** All ingestion events are logged. A lightweight event ledger (e.g. an `events` table in SQLite) records each ingestion with metadata like source, bytes processed, and any tasks or nodes produced. This allows monitoring of what data has been absorbed.

* Dependencies in this layer include the ASR engine (for transcripts), possibly a diarization component (to separate speakers in audio), and connectors or APIs for external sources. An automation tool (like **n8n**) is used to handle webhooks and scheduling for some inputs – e.g., Limitless audio might feed into an n8n workflow that calls an MCP file server tool to save transcripts and triggers the glyph mapper.

* **Safety & Observability:** The ingestion layer’s foremost safety rule is **“listen before acting”** – it imposes a strict separation between capturing data and acting on it. All side-effectual operations (like running code or modifying files) are disabled in this layer. Additionally, **privacy filters** can be applied: e.g., if certain keywords or participants are detected, the transcript can be flagged or not stored at all. A **“Recording On” indicator** provides transparency when ambient listening is active.

  * On the observability side, the system provides a **Realtime ingestion dashboard** (or console output) that streams summaries of ingested content (e.g. “Added node: *Project X requirement* (3 relations, 2 evidence segments)”). This corresponds to an **observability pane** which is a simple web UI or CLI showing new graph nodes and receipts as they arrive.

  * The ingestion outputs (glyph nodes, micro-specs) also include provenance links, so the user or system can later retrieve *why* a certain piece of knowledge exists (e.g. “Concept *Y* came from *Meeting Transcript Oct 17, 2025*”). A command like `entif show-justification <node_id>` can list all source documents for a piece of knowledge, supporting trust and auditability.

  * Finally, ingestion is subject to **tripwire checks** for sensitive content: integrated guardrails scan incoming text for disallowed or high-risk content (e.g. credentials, or instructions that sound like a prompt injection). If detected, those inputs are quarantined or tagged so that even if later commanded, they require extra confirmation or are refused. All such events are recorded (e.g., incrementing a counter of “ingestion safety strikes”) as part of safety monitoring.

## **Voice-First Orchestrator (“Ada”)** {#voice-first-orchestrator-(“ada”)}

The **Ada Orchestrator** is the heart of Entif 2.0’s interactive loop – a voice-activated cognitive controller that interprets user commands and coordinates the appropriate agents/tools to fulfill them. It operates as an event-driven **MCP** orchestrator, meaning it follows the *Model-Context-Protocol* standard for tool/agent interactions, ensuring a consistent interface to all capabilities.

* **Responsibilities & Boundaries:** Ada’s primary responsibility is to convert *natural-language voice commands* into concrete, executable plans and to carry out those plans by invoking sub-agents or tools. It maintains the conversational context and short-term working memory for the current session (e.g. remembering what the user just asked, or referring to recently created artifacts by name). Ada does **not** do heavy computation or long-form generation itself; instead it delegates such tasks to specialist modules (LLMs, code agents, verifiers, etc.). It also does not bypass safety protocols – every action Ada orchestrates goes through validation and the receipt logging process. In essence, Ada is the *conductor*, not the entire orchestra: it knows which “instrument” (agent) to cue for each part of the task, and when to pause, retry, or escalate. It never directly modifies files or external state on its own; it always goes through an authorized tool interface (e.g. file writes via an FS tool). This enforces separation of concerns and the guardrails around each tool.

* **Key Interfaces & Events:** Ada interacts via several interfaces:

  * **Voice I/O:** On the input side, Ada subscribes to the microphone stream for any utterance preceded by the wake-word (e.g. "Ada"). When the wake-word is detected, Ada’s pipeline takes control of the ASR output (which now is treated as a *command*, not just ambient text). Ada can handle **barge-in** events – if the user interrupts Ada’s spoken response mid-stream, Ada will immediately stop speaking and listen (allowing fluid back-and-forth control). On the output side, Ada provides immediate vocal feedback: for example, after understanding a command, it may respond with a brief confirmation via Text-to-Speech (“On it, creating the service…”) and later announce the outcome (“Service created successfully.”).

  * **MCP Tool/Agent Interface:** Ada issues commands to tools and agents using the **MCP** protocol. MCP defines a structured JSON format for requests and responses, enabling consistent calling conventions across diverse tools. For instance, Ada might send a JSON command `{"tool": "code_scaffold", "args": {"language": "Python", "endpoint": "healthcheck"}}` to the Code Scaffold tool. The MCP interface standardizes how Ada passes arguments and receives results (including errors). Under the hood, this might be implemented via local function calls, HTTP requests, or message bus events, but always adhering to a uniform schema. **Sub-agents** like Sony or Blink (described later) are also addressed through MCP, often as separate processes or services registered with Ada.

  * **Event Bus & Workflow:** Internally, Ada can utilize a workflow engine to manage multi-step tasks. The orchestrator’s design is compatible with a *workflow/agent framework* such as Google’s **Agent Development Kit (ADK)**. In such a case, Ada’s logic can be partially defined in a YAML or code describing a **SequentialAgent** (for step-by-step plan→act→verify sequences) and a **ParallelAgent** (to run sub-tasks concurrently). Key events in Ada’s loop include:

    * *Intent Hypothesis Events:* As the user is speaking a command, Ada receives incremental transcripts. A lightweight **Intent Parser** (possibly an LLM call to a fast model) updates an *intent hypothesis*. This might produce events like `IntentDetected(name="scaffold_service", confidence=0.8, args={"lang": "Python", "name": "MyAPI"})` which Ada refines as more speech arrives.

    * *Command Finalized:* When the utterance ends (silence detected) or confidence is high, Ada finalizes the intent. An event `IntentFinalized` triggers Ada to proceed with execution if the intent is clear. If parsing was uncertain or missing info, Ada may instead trigger a **Clarification Request** event – prompting the user, e.g. “Did you mean a Python FastAPI service named MyAPI?”.

    * *Tool Invocation:* Ada emits a `ToolInvocation` event when it calls an agent/tool. This includes tool name, arguments, and a unique call ID for tracking. Tools respond with `ToolResult` events (or Ada polls them if synchronous).

    * *Turn Completion:* After executing the needed steps and verifying outcomes, Ada emits a `TurnCompleted` (or `TaskCompleted`) event containing a summary of the results, which could be used to inform the user interface (e.g. update a dashboard or simply signal Ada to await the next voice command).

    * *Error/Exception:* If anything goes wrong (tool error, failed verification), Ada raises an `ExecutionFailed` event. Ada’s policy then is to either attempt a fix (if possible) or ask the user for guidance, depending on the nature of the error and what the **Cheap-Judge** or other evaluators suggest.

* **Data Models & Schemas:** Ada employs strict schemas for the data it handles, to maintain structure and enable logging/learning:

  * **Intent Schema:** Represents a parsed user intent. For example: `{ "name": "scaffold_service", "args": {"language": "Python", "endpoint": "healthcheck"}, "confidence": 0.95, "source": "voice" }`. It may also include `evidence_spans` referencing the parts of the utterance that indicate each argument.

  * **Tool Call Schema:** As used in MCP, a tool invocation might be represented as `{ "tool": "repo_init", "args": {...}, "session_id": "...", "dry_run": false }`. `dry_run` may be set true for previewing changes (Ada often runs in a non-destructive mode unless confirmed).

  * **Tool Result Schema:** A standardized result object from any tool/agent: `{ "ok": true, "summary": "Repository initialized.", "artifacts": ["repo/"], "diffs": [], "logs": "...", "metrics": {...} }`. This includes a human-readable `summary` for quick TTS readout, any output artifacts or diffs produced, and machine `logs` or raw data for deeper inspection. The `metrics` sub-object captures performance info like tokens used, time taken, etc.

  * **Receipt Schema:** Every completed task or sub-task yields a **receipt** entry (see *Evaluation & Adaptation* layer for full details). At a high level, Ada collects data like `{ session_id, task_id, step, actor, tool, model, tokens_in, tokens_out, latency_ms, cost_usd, verdict, timestamp }` for each step. Notably, fields like `actor` indicate which agent performed the step (e.g. `ada` for orchestrator decisions, `sony` for backend code, `browser` for verification), and `verdict` records pass/fail status of verification.

* **Execution Flow & Dependencies:** Ada’s operation can be understood as a continuous loop waiting for voice commands, and a structured sub-loop for each command:

  * **Wake & Listen:** Ada stays in a listening state, with VAD and wake-word detection active. When the wake word (“Ada”) is heard, Ada engages and begins buffering the user’s speech, streaming partial transcripts.

  * **Parse Intent:** Ada invokes a fast LLM or a deterministic parser to interpret the partial transcript in real-time. For example, if the user says “Ada, create a FastAPI health check endpoint named MyAPI,” Ada’s intent parser (using perhaps a small model or regex templates for known commands) identifies the intent `scaffold_service` with args. As the user speaks, Ada might whisper a *proposed action* on-screen or in logs, updating as needed. It does not yet act.

  * **Confirm & Plan:** Once the user stops speaking or Ada is confident, it finalizes the intent. Ada may quickly *validate* the intent – ensuring required args are present and sane. It then formulates a plan: many simple intents map 1:1 to a single tool call (here, `code_scaffold` tool). More complex tasks might require Ada to create a multi-step plan: for example, “build a web service and UI” would involve orchestrating both backend (Sony) and frontend (Blink) agents and then verifying with the browser. Ada uses either built-in rules or a **planner model** to break down such tasks. (If the task is recognized as non-atomic and complex, Ada might delegate planning to **ROMA** – see Reasoning Modules – which returns a structured subtask list.)

  * **Announce Action:** Before executing, Ada provides a concise confirmation to the user. E.g. “Okay, creating a new FastAPI service called ‘MyAPI’...” This gives the user a chance to abort if the intent was misunderstood. Ada waits a brief moment for an interjection (or listens for a “no, stop” barge-in).

  * **Invoke Tools/Agents:** Ada now orchestrates the steps. In a simple case, it calls `repo_init` (to initialize a project) then `code_scaffold` with given parameters. For each call, Ada sets a budget and model routing preference. For instance, it may attach a header like `max_tokens:1000, prefer_model:fast` to the request, following the routing policy. The tools execute (either locally via an SDK call or remotely) and return results. If tasks can be parallelized (e.g. building backend and frontend concurrently), Ada uses a Parallel workflow, otherwise sequential. Ada ensures any file modifications happen in a controlled sandbox or repository (tools are confined to designated directories with write scopes).

  * **Verification:** After the main action(s), Ada triggers verification. For coding tasks, this often means running tests or using the **Browser Agent** to simulate user behavior. In our example, after scaffolding code, Ada calls the Browser Agent to load the local site and check for the health-check response. If all checks pass, great. If a check fails or any result seems off, Ada engages the **Cheap-Judge** (a lightweight evaluator agent) to summarize what went wrong and possibly suggest a fix or escalation. Ada may automatically attempt a simple fix or retry if the policy allows (e.g. “auto-repair once, then escalate with permission” is a rule in some contexts).

  * **Result & Teach-Back:** Once the task is completed (successfully or with failure), Ada provides an **output summary**. On success, it might say “Done – the endpoint is up and responded with 200 OK.” On failure or partial success, Ada might say “The endpoint code was created but the health-check test failed. I’ll need to investigate or you can check the logs.” Regardless of outcome, Ada logs a **receipt** for this entire task (aggregating the sub-step data).

  * **Short-Term Memory:** Ada appends this interaction (the user’s request and the outcome summary) to a session memory so that follow-up questions can be contextual. For example, the user might say next “Add authentication to that.” Ada will recall that “that” refers to the recently created service. This short-term memory lives in Ada’s session context and possibly also is encoded into the graph (tagged as a recent session artifact).

  * **Loop Reset:** Ada goes back to listening for the next command (with barge-in enabled in case the user started speaking even before Ada finished her sentence).

* Key dependencies of Ada include the underlying LLMs for parsing and planning. Ada uses a **Model Router** to choose models for different subtasks: e.g., a small rapid model for intent parsing, a medium model for code generation or complex reasoning, and only falling back to a large model if absolutely necessary. These models could be OpenAI, Anthropic, local, etc., but Ada remains *vendor-agnostic*. Indeed, by using the MCP interface and frameworks like ADK, the orchestrator can swap out model providers without code changes. Ada also relies on the presence of sub-agents (detailed below) and the knowledge store (GraphRAG) to enrich its context or fetch information relevant to the command (for instance, if the user asks “Summarize what I discussed with Client X yesterday,” Ada can query the graph for nodes related to that meeting).

* **Safety & Observability:** Ada implements multiple guardrails as part of its core logic:

  * **Dry-Run and Confirmation:** By default, Ada operates in a cautious mode – potentially destructive commands (like running shell scripts or deleting data) are either run in **dry-run** (no effect) or require an explicit verbal confirmation from the user. For example, if the user said “drop all database tables,” Ada would confirm “That will erase data, shall I proceed?” and only execute on affirmation.

  * **Capability Scoping:** Ada only has access to tools that are whitelisted and properly sandboxed. Each tool comes with a scope (for instance, the file system tool can only write to a certain project directory, the code execution agent runs in a container, etc.). Ada will *not* execute arbitrary code outside these scopes. Additionally, new tools or abilities added to the system automatically trigger safety tests (via **Petri**, see Safety section) before Ada trusts them fully.

  * **Live Metrics & Logs:** Every decision Ada makes is logged in detail. Ada’s console output or dashboard shows things like “(Ada) Plan: 2 steps \-\> \[Sony: create API\] then \[Browser: verify\]. Model route: fast model (90% confidence).” along with timing and token usage. This real-time trace is invaluable for debugging and is also stored to the receipts ledger. Ada also surfaces live **token and cost counters** to the user (e.g. showing how many tokens have been used in the current session and the estimated cost, so the user is always aware of resource consumption).

  * **Uncertainty Triggers:** If Ada’s Cheap-Judge evaluation reports low confidence in an outcome or if an important verification failed, Ada will not proceed silently. It will either attempt a safe recovery or explicitly ask for user intervention. For instance, “The test is still failing. Would you like me to try a different approach or should we debug together?” This prevents silent erroneous actions.

  * **Observability:** The orchestrator contributes heavily to the system’s observability. Ada populates the **receipts database** for each step and task. The receipts can be viewed via CLI (e.g. `entif receipts last 20` to see the last 20 actions with their status). Moreover, Ada’s integration with evaluation hooks means that after each task, relevant info is sent to the Coach/ELIXIR for analysis. There is also a web-based monitoring panel where one can see the state of Ada’s agents (running, idle), recent commands, and overall success rates.

  * **Auditability:** Thanks to the receipt logs and knowledge graph integration, any answer Ada gives that involves retrieved knowledge comes with a **justification chain**. For example, if Ada answers a question or makes a decision based on ingested notes, it can attach the source node IDs that informed that decision. The user can ask Ada “How do you know that?” and Ada (via a CLI or voice) can present the evidence from the graph or receipts. This chain-of-thought transparency acts as a safety check (detecting hallucinations) and an alignment tool (the user can spot if Ada is relying on outdated or irrelevant info).

In summary, Ada is the intelligent hub that connects voice commands to the rich ecosystem of Entif 2.0’s tools and knowledge. It strives to remain fast, safe, and transparent: fast by preferring cheap models and parallel execution, safe by confirm-before-commit behavior and sandboxing, and transparent by producing receipts and justification for everything it orchestrates.

### **Sub-Agents and Tool Ecosystem** {#sub-agents-and-tool-ecosystem}

Within the Orchestration layer, Ada commands a set of **sub-agents** (sometimes called “Workers” or “Specialists”) that carry out domain-specific tasks:

* **“Sony” – Backend Code Agent:** A coding agent specialized in backend development (named after the concept of “having a computer/console”). Sony can create and modify server-side code (e.g. Python FastAPI services, databases) within a restricted environment. It uses the **Claude Agent SDK** under the hood, giving it the ability to execute code, run a REPL or tests, and perform filesystem operations in a controlled manner. Sony has a workspace folder (e.g. `project/server/`) where it has write access. It is aware of project context (existing codebase) and can follow instructions to scaffold code or refactor. Sony’s outputs are code files and possibly console logs or test results.

* **“Blink” – Frontend Code Agent:** A complementary agent focused on frontend/UI tasks. Blink can generate web pages, UI components, or static assets. Like Sony, Blink runs via the Claude Agent SDK (or similar) and operates in its sandbox (e.g. `project/client/`). It can produce HTML/CSS/JS or use frameworks if directed. Both Sony and Blink are essentially powerful coding copilots that Ada can instruct (e.g. “Sony, create a REST endpoint” or “Blink, generate a basic HTML page with a button calling that endpoint”). They incorporate **write-scope security**, meaning they cannot write outside their designated directories or perform disallowed operations, which prevents one agent from accidentally or maliciously altering another’s domain.

* **Browser Verifier Agent:** A headless browser (e.g. using Playwright or Puppeteer via MCP) that Ada uses to perform end-to-end tests in a live application context. For example, after Sony and Blink produce a web service and page, the Browser agent can launch a browser, open the local URL, click a button, and check the result. It returns structured evidence: screenshots, HAR (network logs), or simply a pass/fail with any error text. The Browser agent only follows predefined test instructions (either generated from a micro-spec’s acceptance criteria or simple scripts for common checks). It does not roam freely – its actions are specified by Ada or a test script to ensure determinism.

* **Cheap-Judge (Evaluator):** A lightweight meta-agent that reviews outcomes. This could be a small language model that reads the summary or diff from a step and gives an opinion on success or quality. For instance, after code generation, Cheap-Judge might examine the code diff and test results to decide if the solution is likely correct. If it’s unsure or finds issues, it signals Ada to escalate (maybe try a larger model or different approach). The Cheap-Judge essentially automates the decision of “good enough or needs improvement?” using inexpensive computation. In Entif, Cheap-Judge is implemented as an ADK tool or a local model call for quick turnaround.

* **Model Router:** Not an agent per se, but a policy component Ada uses whenever calling an LLM. It selects which model to use (fast vs. medium vs. heavy) based on the task complexity and the current performance stats. It also enforces budgets (e.g. max tokens). The router’s decisions are logged, and over time updated by the Coach (via ELIXIR data) to improve cost/accuracy trade-offs.

* **Other Tools (MCP Servers):** Aside from intelligent agents, Ada can also call various **MCP-compliant tools** that wrap external services or utilities. Examples: a `fs` tool for file I/O, `git` tool for version control operations, `shell` tool for running sandboxed shell commands, `token_meter` for retrieving token usage stats, or connectors like `google_drive` or `asana` to interface with other apps. All these tools present a unified interface to Ada (they advertise an MCP contract like `tool_name.action` and required params). The MCP standard means Ada (and sub-agents) treat these tools like function calls, simplifying integration. Adding a new tool involves registering it with Ada’s context (and likely running Petri safety tests on it first).

Ada’s orchestration of these sub-agents and tools forms the core loop that, at runtime, takes a user’s voice command all the way to a verified outcome.

## **Knowledge Core: GraphRAG Store & Glyph Engine** {#knowledge-core:-graphrag-store-&-glyph-engine}

The **Knowledge & Memory layer** underpins Entif’s intelligence, providing a structured, queryable representation of everything the system learns or creates. It combines a **Graph-based knowledge base** with vector similarity search – known here as **GraphRAG** – and a semantic “glyph” system for symbolic grounding. This layer ensures that Entif’s reasoning is grounded in factual context and that it can justify its outputs by pointing to source knowledge.

* **Responsibilities & Boundaries:** The GraphRAG \+ Glyph Engine’s responsibility is to store information (facts, concepts, documents, code snippets, user notes, etc.) in a form that is both **human-interpretable (graph of concepts)** and **machine-usable (for retrieval-augmented generation and reasoning)**. It acts as the “long-term memory” of Entif. The boundaries: it does not execute logic or alter content on its own; it’s a passive store and retrieval system. It also does not itself decide truth vs. falsehood beyond recording what was ingested or inferred – higher-level reasoning (e.g. eliminating contradictory info) happens in the reasoning layer or nightly jobs. The knowledge store’s role is to provide relevant context efficiently when asked, and to maintain provenance for all stored data. It’s the *source of truth* that the orchestrator and agents rely on for context.

* **Key Interfaces & Events:**

  * **Ingestion API:** As described earlier, the ingestion layer uses an interface (could be a function call or HTTP API) like `GraphStore.add(node or glyph data)` to insert knowledge. This might be batch-oriented (ingest a whole document) or streaming (add a new sentence at a time).

  * **Query API (GraphRAG Gateway):** Other components, especially Ada and the reasoning modules, query the knowledge base via an interface that supports hybrid searches. For example, an orchestrator may call something like `GraphStore.query({ text: "health check endpoint", k: 5 })` to retrieve the top 5 related nodes or relevant facts. The GraphRAG gateway will likely:

    * Parse the query (which might be natural language or a structured query).

    * Perform a **vector similarity search** on embeddings to find nodes whose content is semantically similar to the query.

    * Traverse the graph around those nodes to collect connected information (e.g. related concepts, definitions, recent notes).

    * Return a **justification set**: a bundle of nodes and evidence that could answer the query, each with provenance links.

  * There may also be specialized query endpoints such as `GraphStore.find_by_id(node_id)` to retrieve a node by a stable ID, or `GraphStore.subgraph(entity)` to get all relationships for a given concept.

  * **Embedding Service:** When new content is added or when queries come in, the system uses an embedding model to vectorize text. This is typically a small Transformer (like MiniLM or similar) that produces a vector stored alongside each node. A sub-component might handle this: e.g. `VectorIndex.add(text, node_id)` and `VectorIndex.search(query_vector)` returning candidate node\_ids.

  * **Events:** The knowledge store might not emit many events on its own, but one can imagine events like `KnowledgeAdded` (so that perhaps a UI can update or the Coach can log that new knowledge was gained). During nightly maintenance, events like `NodesMerged` or `SummaryUpdated` can occur when it cleans or updates entries.

* **Data Models & Schemas:** The GraphRAG store likely uses a property graph model:

  * **Node Types:**

    * **Concept Nodes** (sometimes called *Glyph* nodes): Represent a normalized concept or entity. Each has an **ID** (which could be a WordNet synset id or a generated UUID), a human-readable **label** (e.g. “Health\_Check\_Endpoint”), and possibly a **type** (category/tag, e.g. “Task” vs “Concept” vs “Person” etc.). A concept node may also store a concise **definition or description** (like a gloss) and links to external ontologies or IDs (WordNet/BabelNet IDs).

    * **Relation Nodes/Edges:** In the graph, relations can be first-class nodes or edges with types. For example, a relation might be “depends\_on” or “mentions” connecting two concept nodes. They might also encode semantic roles (subject, action, object relationships extracted from a sentence).

    * **Evidence/Source Nodes:** These attach raw data to the graph. An evidence node could represent a snippet of text (e.g. a sentence or paragraph) with fields for the exact text, source reference (document name or transcript id), and timestamp. Evidence nodes link to the concept nodes they contain or relate to. Essentially, they answer *where did this information come from?*.

    * **Artifact/Memory Nodes:** Additionally, the graph can hold nodes for artifacts that the system created (code files, documents, media). For instance, after building a code module, an artifact node representing that module can be linked to the task that created it.

    * **Special Nodes:** Some special nodes could exist like a `Session` or `AgenticMemoryUnit` that encapsulate a snapshot of memory (like an archived state), but these are more advanced. At minimum, we have Concepts and Evidence.

**Glyph JSON Schema:** When text is parsed into the glyph format, it can be represented as JSON. For example:

 `{`  
  `"label": "API_Health_Check",`  
  `"definition": "An endpoint that returns a status to indicate if the service is healthy.",`  
  `"relations": [`  
    `{ "type": "isa", "target": "API_Endpoint" },`  
    `{ "type": "checks", "target": "Service_Health" }`  
  `]`  
`}`

*  This would later be stored as nodes and edges in the graph. Glyphs focus on identifying *meaning* (the above might correspond to a WordNet synset for “health check”).

  * **Provenance Schema:** Each evidence or artifact stored includes `source_uri` or `doc_id`, `created_at`, perhaps a hash or fingerprint of content, and `spans` indicating what part of the source is relevant. This ensures the system can later retrieve the original context and also avoid storing duplicates.

**Retrieval Result Schema:** When GraphRAG returns an answer to a query, it may provide a structured result:

 `{`  
  `"answer": "The health check endpoint returns status code 200 OK if the service is healthy.",`  
  `"evidence": [`  
     `{ "node_id": 123, "source": "MeetingNotesOct17", "span": "lines 10-12" }`  
  `],`  
  `"confidence": 0.92`  
`}`

*  Or if it’s feeding context into an LLM, it might just return a collection of relevant snippets or triples.

* **Execution Flow & Dependencies:** The knowledge layer works both in real-time for retrieval and offline for maintenance:

  * **Real-time retrieval:** Suppose Ada or a reasoning agent needs some context (e.g. Ada is asked a question: "Ada, what did I promise the client in yesterday’s call?"). Ada will call the GraphRAG query interface. The query might be formed from the user’s question directly. The GraphRAG service will vectorize the question, search the vector index to find candidate pieces of the call notes that match "promise" and "client". It finds maybe a glyph node "commitment" linked to an evidence node from "ClientCall 2025-10-16". It then returns the relevant snippet: "We promised to deliver a health check feature by next week." Ada can then use that snippet to answer the user, and importantly, include a reference (like “(from ClientCall Oct16)”).

    * In this step, dependencies include the embedding model (for similarity search) and possibly a graph database (like Neo4j or a Postgres with pgvector extension) for storing and querying. The *graph query* may also support more complex reasoning, e.g., find all tasks related to a certain project that are incomplete, by traversing "Project \-\> hasTask \-\> Task (status incomplete)" relationships.

    * Another retrieval pattern is in task execution: e.g., if Ada is asked to draft a proposal, Ada might retrieve relevant facts from the knowledge base (company info, requirements from previous notes) to feed into the drafting process.

  * **Nightly maintenance:** A lot of heavy lifting for the knowledge base is deferred to the Coach’s nightly run (see Coach section for details). Typical nightly tasks:

    * **Dedupe & Merge:** If multiple glyph nodes seem to refer to the same concept (e.g. "NYC" and "New York City"), an automated job merges them or links them as aliases. This may involve comparing definitions or using embedding clustering.

    * **Taxonomy Refinement:** It might promote certain frequently used concepts to have more links or to attach definitions via external ontology lookup. For example, if “GraphRAG” concept is frequently referenced, the system might fetch a proper definition for it and store that.

    * **Summary Generation:** For very active nodes (ones accumulating lots of evidence), the system can compute a summary and store it. E.g., if there were 50 notes under "Project X" concept, a summary node or property gives a tl;dr that Ada can use for quick context.

    * **Expiration/TTL:** Some knowledge might be set to expire (maybe ephemeral or outdated data). The system checks timestamps and can archive or tag stale info so it doesn’t pollute new queries.

    * These jobs rely on script or agent execution, possibly orchestrated by Ada’s scheduler at a low-traffic time (like 3am). They result in updated graph state and new receipts for changes (so we know what was updated).

  * **Integration with Other Data:** The knowledge layer isn’t only about ingested text. It can also store results from **ReasoningBank** (which are essentially strategies or patterns – those could be stored as nodes representing a plan and linked to tasks that used them). It also stores receipts or at least references to them (so one can query the graph for “last time this error happened” and find a node or entry). Code artifacts in Git can be linked via commit hashes in the graph, enabling provenance of code to design decisions.

* **Safety & Observability:** The knowledge base itself is read-only to most of the system at runtime (only the ingestion and maintenance processes write to it), so it’s inherently a bit safer. However, quality and safety of what’s stored is crucial:

  * **Redaction & Privacy:** As noted, ingestion will redact sensitive details before adding nodes. The graph might also store sensitivity levels on nodes (e.g. mark a node as containing personal data), and queries from certain agents might filter those out unless explicitly allowed.

  * **Provenance Enforcement:** The system never treats a piece of knowledge as valid unless it has provenance. This is why evidence nodes and source tracking are mandatory. If a node lacks provenance or appears without source (which could indicate an error or unauthorized insertion), the system can flag it. This reduces the chance of model hallucinations contaminating the knowledge base – since ideally only curated or real inputs become nodes.

  * **Observability:** There is a plan for a **live graph console** (e.g. Neo4j Bloom or custom UI) where the developer can inspect what’s in memory. For example, one could search the graph for a keyword and see related concepts and sources. This helps the developer ensure the system learned the right things and can manually remove any incorrect knowledge.

  * **Just-in-Time Justification:** When the graph is used to answer queries (especially user questions), the GraphRAG gateway includes evidence spans. This means any answer coming out of knowledge retrieval can be accompanied by citations (even internal ones) that Ada can present (or log) for verification. Essentially, it strives to avoid “answers with vibes” and instead provide **“answers with proof”**, increasing trust in the system’s outputs.

  * **Memory Bloat Control:** Over time, any long-running personal system can accumulate huge amounts of data. Entif includes policies for memory management – for instance, extremely old or rarely used nodes might be archived to a cold storage (or require explicit query to load). The Coach might track usage frequency of nodes (like a Least Recently Used metric) to suggest cleanup. All deletion or archiving actions are, of course, logged (so nothing quietly disappears without a receipt).

In summary, the GraphRAG and Glyph Engine provide a **robust knowledge substrate** for Entif 2.0. They blend the strengths of symbolic AI (explicit relationships, reasoning over a graph) with modern neural retrieval (vector similarity and dense knowledge). This ensures that Entif’s higher reasoning modules always have a rich context to work with and that any output can be traced back to real inputs, fulfilling the “show your work” principle.

## **Advanced Reasoning Modules (TRM, ROMA, ReasoningBank)** {#advanced-reasoning-modules-(trm,-roma,-reasoningbank)}

While the orchestrator can handle straightforward tasks directly, Entif 2.0 incorporates specialized reasoning components for complex scenarios. These modules allow the system to plan larger tasks, perform deep reasoning on problems, and reuse successful approaches, all while keeping the orchestrator’s core simple and general-purpose.

### **Tiny Recursive Model (TRM) – Deep Reasoning Engine** {#tiny-recursive-model-(trm)-–-deep-reasoning-engine}

* **Responsibilities & Boundaries:** **TRM** is a dedicated micro-service for *difficult reasoning tasks* that require iterative thinking or multi-step logical deduction beyond the capability of a single pass by a standard LLM. Its responsibility is to take a **provisional answer or problem state** and refine it through recursive reasoning cycles. Boundaries: TRM does not have authority to execute external actions (like tools); it works entirely in the conceptual/problem space. It’s essentially an “AI thinker” that Ada can call upon when needed, particularly for tasks labeled “reason.hard” (hard reasoning). TRM doesn’t initiate on its own; Ada or a workflow must invoke it with a prompt/problem.

* **Key Interfaces & Events:** TRM is typically exposed via an API endpoint (e.g. a local HTTP service). For instance, `POST /trm/improve` with a payload containing the current problem description and a draft solution (if one exists). The TRM service then engages in its internal recursive loop and returns an improved solution or a reasoning trace. Key events or signals include:

  * *Improve Request:* Contains inputs such as the question or task description and maybe a preliminary answer (`y`) to refine.

  * *Intermediate Iteration Events:* (Internal to TRM) TRM uses a dual-state approach: it maintains a *scratch pad state* (`z`) separate from the visible answer (`y`). It iterates, updating `z` with reasoning steps while adjusting `y`. These iterations might be logged or limited by a *halting condition* (like a learned halting classifier).

  * *Halting/Completion:* TRM decides it can’t improve further or a max iteration is reached, then returns the final answer `y` along with some metadata (e.g. number of iterations, a confidence or halting probability).

  * *TRM Result:* The output could include a reasoning trace or just an enhanced answer. If integrated with receipts, TRM would also output a receipt of its own reasoning process.

* **Data Models & Schemas:** TRM deals with:

  * **Problem Schema:** e.g. `{ "task": "Explain how module X works based on internal notes", "draft": "Module X does ...", "context": [ ... optional supporting info ...] }`.

  * **TRM Output:** e.g. `{ "revised_answer": "...", "steps": [ "thought1", "thought2", ... ], "halt_confidence": 0.98 }`. The `steps` might be a list of key reasoning insights (if needed for transparency).

  * Internally, TRM’s model likely has two input-output channels for the two states, but that’s an implementation detail not exposed.

* **Execution Flow & Dependencies:** When Ada or another agent faces a question that requires say mathematical reasoning, multi-hop logic, or just producing a very well-reasoned answer (like writing a complex explanation), it can hand it to TRM. TRM’s internal algorithm:

  * Initialize a solution guess (`y`) – possibly the draft provided or blank.

  * Encode the problem and current solution into its model, output a latent reasoning update (`z` – think of it as model’s scratch memory).

  * Use `z` to refine `y`. The architecture might be akin to a recurrent reasoning where the model’s output feeds back into input until a stopping criterion is met.

  * Monitor for convergence or halting via a specialized head of the model that predicts if the answer is “good enough”.

  * Return the final `y` as answer.

* TRM likely depends on a smaller transformer or custom network trained for this recursive reasoning pattern. Perhaps it’s a distilled model that is cheaper than using a GPT-4 for the same reasoning, giving Entif an in-house reasoning capability. It might be implemented in PyTorch with some FastAPI wrapper (as the content indicates). Another dependency is that TRM might be configured with certain *deep supervision* signals or knowledge of what constitutes a correct reasoning step (maybe via some training or heuristic). If TRM gets stuck or the halting head indicates low confidence in final answer, Ada can catch that (via the TRM response) and decide to escalate to a larger model outside or simply present the uncertainty to the user.

* **Safety & Observability:** TRM operates entirely on text in a controlled loop, which means it’s relatively sandboxed. However, to ensure it doesn’t run away or produce nonsense:

  * **Iteration Limits:** TRM has a cap on number of iterations or time spent, to prevent endless loops. If it hits a limit, it returns whatever it has with a flag that it may be incomplete.

  * **Validation of Output:** Ada might double-check TRM’s output via Cheap-Judge or by verifying against known data (if applicable). If TRM was reasoning about code, one might run tests on the output.

  * **Observability:** TRM logs its steps to the receipt system as a special kind of multi-step internal task. For transparency, we can store the intermediate steps in the ReasoningBank (so we could later analyze how TRM solved something). If TRM consistently fails on certain problems, those are noted so the system might escalate directly next time.

  * TRM has no direct side effects – it’s basically thinking – so its main safety concern is correctness and not injecting any hallucinated fact as truth. But since any factual content TRM uses should come from the knowledge graph or provided context, it stays anchored. If it somehow generates an assertion not supported, the Coach’s alignment checks could catch that (comparing TRM output with knowledge graph, for example, to see if it cites unknown facts).

### **ROMA – Recursive Task Decomposition Planner** {#roma-–-recursive-task-decomposition-planner}

* **Responsibilities & Boundaries:** **ROMA** (Recursive Open Meta-Agent) is integrated to handle tasks that are *composite or complex*, i.e., they need to be broken into multiple coordinated subtasks. Ada’s built-in planning is sufficient for simple tasks, but when a user request is large-scale (“build an entire app”, “research and compile a report on topic X”), ROMA can take over planning. ROMA’s responsibility is to produce a *task graph or tree* (a plan) that subdivides the big request into manageable steps, possibly to be executed in parallel, and then to coordinate their results. However, in Entif’s architecture, we use ROMA mainly as a **planning service** – once it outputs a plan, Ada (and the agents) carry out the steps. Boundaries: ROMA itself doesn’t execute the steps (other than perhaps calling sub-agents if it were fully running); in our integration, ROMA is embedded as a *“custom planning agent”* inside Ada’s environment.

* **Key Interfaces & Events:** ROMA is likely accessed via an API or internal call:

  * Ada can invoke something like `ROMA.plan(micro_spec)` or send an MCP command to a ROMA agent with the problem description. The input is often a **Micro-Spec** (intent with acceptance criteria) that defines what needs to be achieved and how success is checked.

  * ROMA returns a **Plan**: typically a list of steps with structure like `{step_id, tool/agent, args, acceptance_check}` for each step. For example, a ROMA plan for “health check endpoint \+ page” might be:

    * `{"actor": "sony", "action": "scaffold_api", "params": {...}, "acceptance": "endpoint returns 200"}`,

    * `{"actor": "blink", "action": "scaffold_ui", "params": {...}, "acceptance": "button calls endpoint"}`,

    * `{"actor": "browser", "action": "verify", "params": {...}, "acceptance": "page shows OK"}`.  
       (This is simplified pseudo-structure, but illustrates decomposing into backend, frontend, then verify.)

  * ROMA may also label certain steps as parallelizable or not. It might include dependencies (like step 3 depends on 1 and 2).

  * *Events:* If ROMA is an agent, Ada might treat it like a subordinate: sending a “complex task” event and waiting for a “plan ready” event. If the plan itself needs refinement, ROMA might engage its own sub-process (like an “Atomizer” splitting tasks and a “Planner” ordering them, per ROMA’s design). But these internal events are not exposed to Ada except as the final plan.

* **Data Models & Schemas:**

  * **Micro-Spec:** This is the input to ROMA. As previously defined in the Ingestion section and present in the user’s notes, a `micro_spec.json` contains an `intent` (goal description), a list of `acceptance_checks` (specific conditions/tests that must pass), and `artifacts` (expected outputs). This structured problem description helps ROMA formulate a concrete plan targeting those checks.

**Plan Schema:** Each step can be represented as a structured object. In logs and receipts, they envisioned something like:

 `{ "step": "2", "actor": "blink", "tool": "frontend_builder", "args": {...},`  
  `"checks": [{"name": "UI element exists", "pass": false}], "outcome": "FAIL" }`  
 in execution logs. For the plan itself, a simpler representation is likely:

 `{ "plan": [`  
    `{ "step": 1, "actor": "sony", "action": "create_api", "details": "FastAPI endpoint", "acceptance": "GET /health returns 200" },`  
    `{ "step": 2, "actor": "blink", "action": "create_ui", "details": "Button triggers /health", "acceptance": "Button click shows 'OK'" },`  
    `{ "step": 3, "actor": "browser", "action": "verify", "details": null, "acceptance": "All tests pass" }`  
`]}`

*  The *acceptance* can be a reference to the micro-spec’s acceptance criteria each step covers.

  * **Receipt Integration:** Once the plan is executed by Ada, the entire plan’s trace (each step’s execution result) is folded into the unified receipt format (with step numbers, actors, etc., as above). ROMA’s involvement can be noted in the receipt (like `plan.generated_by = ROMA`).

* **Execution Flow & Dependencies:** The usage of ROMA in Entif goes like this:

  * Ada’s Cheap-Judge or some heuristic detects that a user request is “non-atomic” or has multiple parts (for example, the presence of “and then” or a conjunction of distinct tasks in one command, or simply tasks known to be complex). Alternatively, the user might explicitly say “plan this out” which Ada knows to use ROMA.

  * Ada prepares a micro-spec if not already given (in many cases, user input might be freeform, so Ada converts it to the structured form needed – breaking out acceptance criteria either from context or by asking the user).

  * Ada calls ROMA (either as a function, or via ADK if ROMA is plugged in as a custom agent). ROMA processes the micro-spec. Possibly, ROMA uses its algorithm:

    * Atomizer: break the problem into sub-problems (e.g., identify the need for a backend and a frontend part).

    * Planner: decide the execution order (maybe parallel or sequential).

    * (ROMA may itself use an LLM or some pattern library for this; it’s noted that ROMA supports patterns and is LLM-agnostic, meaning it could run with any model or even rule-based).

    * Executors: ROMA could, in theory, run the steps itself, but in our use we want Ada to run them for consistency, so ROMA stops at planning.

    * Aggregator: ROMA would normally collect results if it executed them; here Ada will do that part.

  * ROMA returns the plan to Ada. Ada merges this plan into its workflow and begins executing step by step. Because Ada will record receipts for each step, the observability remains unified (this was a design consideration: keep ROMA’s contributions within the same logging structure).

  * If during execution a step fails, Ada can either: attempt the ROMA plan’s suggested recovery (if the plan included contingencies) or re-consult ROMA for a re-plan. Perhaps ROMA could incorporate branching: e.g., if a certain step fails, it might have suggested a fallback plan.

  * Once all steps are done, Ada reports success or failure of the overall task. ROMA’s job is done when the plan is delivered; it might not be active during step execution unless dynamic re-planning is needed.

* Dependencies: ROMA is an external project or library (possibly by Sentient AGI, per the reference). We likely integrate it by running it as a local service or embedding its code. It may require an LLM to do the actual decomposition (though it can interface with any, making it flexible). For now we can assume using one of our available models for ROMA’s internal logic.

* **Safety & Observability:**

  * **Plan Validation:** ROMA’s output plan is essentially a code that Ada will execute. We treat it like untrusted input initially – Ada (or Petri) reviews the plan before execution. For example, if ROMA suggested using a tool that’s not allowed or doing steps out of safe order, Ada can catch that. Ideally, though, ROMA being configured within our system knows the available tools and policies.

  * **Contained Complexity:** One risk of dynamic planning is generating too many steps or doing work that wasn’t requested. By giving ROMA the micro-spec with clear acceptance tests, we bound what it tries to achieve. ROMA shouldn’t add unrelated tasks. And if the plan is too large (exceeding some step count or estimated cost), Ada could decide to execute partially or ask for confirmation.

  * **Observability:** The important design is that ROMA’s plan and its execution are logged just like any Ada-handled task. That means when looking at receipts or the session log, one sees: “Plan generated: 3 steps (via ROMA)” then step1 receipt, step2 receipt, etc., then a final outcome. This unified receipt shape ensures we can evaluate performance even when ROMA is used. For instance, if tasks that used ROMA succeed more often or cheaper, the Coach can learn that pattern and prefer ROMA for those types in the future.

  * **Parallel Execution Safety:** ROMA might plan parallel steps (like “do A and B at the same time”). The orchestrator (with ADK’s help) handles parallelization. We ensure that parallel tasks don’t conflict (our sandboxing of agents helps – e.g., Sony and Blink operate on different directories, so they can run in parallel safely). Ada monitors resources to avoid e.g. saturating CPU or running out of memory if both heavy agents run concurrently. If needed, Ada could stagger them or limit concurrency (policy can be updated as the system learns).

  * **Audit & Reuse:** Each plan from ROMA, successful or not, is a candidate to store in the **ReasoningBank** if it solved a recurring class of problem. E.g., the plan for “health check \+ page” is generic; next time a similar request comes, Ada could bypass a full ROMA call and fetch the known plan template from ReasoningBank (if it was stored there after a success). This reuse improves efficiency and also means plans that are vetted get repeated, while poor plans die out. ROMA itself might be updated with new pattern “templates” (like how to split common tasks) as we encode them from experience.

### **ReasoningBank – Strategy Memory** {#reasoningbank-–-strategy-memory}

* **Responsibilities & Boundaries:** The **ReasoningBank** is a repository of **learned strategies, troubleshooting knowledge, and successful plans** that the system accumulates over time. Unlike the GraphRAG which stores facts and raw knowledge, ReasoningBank stores *process knowledge*: how did we solve similar problems before? what approach worked or failed for a given context? Its responsibility is to serve as a memory of reasoning and execution patterns that can be queried to inform new decisions. For example, if the system faces a coding task that it has solved in the past, ReasoningBank might recall “the last time we did something like this, using tool X with approach Y was successful.” The boundary is that ReasoningBank does not execute anything; it’s a passive knowledge base like the graph, but specifically for reasoning/meta information. Also, it intentionally *does not store raw chain-of-thought from LLMs* to avoid mining possibly incoherent or unsafe hidden thoughts. It focuses on **key decision and outcome data** – essentially a distilled “playbook” of past tasks.

* **Key Interfaces & Events:**

  * **Lookup by Problem Signature:** The main interface is something like `ReasoningBank.find(similar_task_signature)`. When a new task comes in, the orchestrator or router computes a signature (this could be a combination of the intent type, key parameters, maybe a embedding of the task description and constraints). The ReasoningBank is queried for entries with matching or nearest signatures.

  * **Store Outcome:** After a task completes, the orchestrator/coach calls `ReasoningBank.store(entry)` with details if this run produced a particularly useful strategy. An entry could include: problem signature, tools used, model chosen, success/failure, cost, and any step sequence or plan (in an abstract form) that was used.

  * **Update Statistics:** The ReasoningBank might also be used to update aggregate statistics of strategy efficacy – e.g., “Approach A succeeded 4 out of 5 times with average cost $0.02, Approach B succeeded 2/5 times, cost $0.01”. This could be part of the model routing policy update rather than the bank itself, but the data originates here.

  * *Events:* There isn’t a continuous event stream; rather, think of ReasoningBank queries happening at the start of a task (“Is there a known way to do this?”) and updates happening at the end (“Record how we did it.”). The Coach might also periodically prune or compress the ReasoningBank (removing outdated strategies or combining similar ones).

* **Data Models & Schemas:**

  * **Problem Signature:** This is a compact representation of a task context. It could be a hash or key like `("scaffold_service", {"language": "Python", "framework": "FastAPI"})` plus maybe a vector embedding of the detailed description. Or even an ID referencing a glyph node of a requirement. The exact schema might be something like:  
     `{ intent: "scaffold_service", context_tags: ["FastAPI", "DB:None"], complexity: 1 }`. Or a combination of textual and structured features. The goal is that similar tasks map to similar signatures (so it might use some canonicalization).

**Strategy Entry:** For each signature, store one or more past strategies:

 `{`  
  `"problem": <signature>,`  
  `"strategy": {`  
     `"plan_outline": ["sony.scaffold_api", "blink.make_ui", "browser.verify"],`  
     `"tools": ["fs.git", "graphrag.query", "browser.verify"],`  
     `"model_choice": "fast-model-only",`  
     `"verdict": "PASS",`  
     `"cost": 0.02,`  
     `"latency_ms": 1500`  
  `}`  
`}`

*  A strategy could also store the key differences: e.g., if a failure happened because of missing spec, that might be noted.

  * Perhaps the ReasoningBank is implemented as simply a set of tables in SQLite (for quick dev). It might have tables like `strategies(intent TEXT, context TEXT, plan TEXT, success BOOLEAN, cost REAL, timestamp DATE, notes TEXT)` for example. Over time, multiple entries for same `intent+context` accumulate.

  * **Reasoning Cache:** The bank might also store intermediate *insights* or results. For example, if in debugging a problem the system found a particular fix, it can store that as a Q\&A pair or a “If error X, do Y” mapping.

* **Execution Flow & Dependencies:**

  * **During Task Planning:** When Ada receives an intent and before it decides how to execute (which tools, which model), it queries the ReasoningBank. Let’s say the user asks to set up a new project repository and scaffold something, which we’ve done 3 times in the past. The bank returns one or more strategy entries. Ada (or the Router) will evaluate those: e.g. Strategy A used only a fast model and succeeded with low cost – great, try that approach first. Or maybe it finds a stored **“proven sketch”** – essentially a known good plan or even code snippet for this request. In that case, Ada could retrieve that and either use it directly or use it to guide the current run (for instance, if ReasoningBank has a stored template plan for "health check endpoint", Ada can follow that plan instead of asking ROMA or thinking anew).

  * **After Task Completion:** Once the task is done, Ada (via Coach logic) decides if the outcome is worth storing. If the approach was novel and successful (or even novel and failed interestingly), it records it. The Coach might filter to only keep strategies that have some generality or at least to update the success stats of known strategies. For example, if we tried a new verification method and it paid off, log that as an option next time.

  * **Learning Loop:** Over many tasks, ReasoningBank fills up. The Coach can perform maintenance here too: merging similar strategies, discarding those that consistently fail, and even generalizing strategies. For instance, if it notices a pattern that whenever we do a certain type of web app we always perform some similar steps, it might abstract that into a template entry. This is speculative but plausible for continuous improvement.

* Dependencies: ReasoningBank is mostly an internal database – likely can be implemented on SQLite or even as part of the GraphRAG (maybe certain nodes in the graph store strategies, but more likely a separate table for easier queries by code). It depends on consistent recording of receipts and context to identify what a “strategy” was, which is why having uniform receipt/plan logging is vital.

* **Safety & Observability:**

  * **No Blind Reuse:** While ReasoningBank suggests approaches, Ada won’t execute a cached plan blindly if context differs. It’s more of a hint. For safety, any retrieved plan or step from the bank goes through the normal verification (the acceptance checks still run, etc.). So if a strategy is no longer valid due to changed circumstances, it should be caught by failing a check, and Ada can then try a different approach.

  * **Staleness Management:** The bank entries might have a shelf-life or versioning. For example, if tools are upgraded or the codebase changes drastically, an old strategy might not apply. The system can tag strategies with relevant version info (like “works with Editor v1” etc.). The Coach or alignment checker might prune strategies that are obsolete or that conflict with the current **genesis alignment** (e.g., if a strategy was found to cause an alignment issue, drop it).

  * **Observability:** The contents of ReasoningBank can be introspected by the developer. Possibly via a CLI command like `entif reasoning-bank list <intent>` to see what strategies exist for an intent. This is useful to trust that the system isn’t learning something weird. Each entry is linked back to receipts or task IDs, so one can trace “why do we think this strategy works? – Ah, from that session on Oct 10th where it passed all checks.” That transparency is important for debugging learned behavior.

  * **Alignment & Bias:** Because ReasoningBank influences decisions, we also ensure it doesn’t introduce bias or error. For instance, if a flawed strategy managed to pass checks by luck, we don’t want it cemented. The Coach uses not just pass/fail but also how *confidently* it passed (if Cheap-Judge had doubts or multiple retries were needed, maybe don’t immediately trust that strategy). Over time, a kind of weighted trust is built: strategies that consistently succeed are weighted higher in decision making (this is akin to a bandit algorithm improving model routing too, see Evaluation section).

Together, TRM, ROMA, and ReasoningBank extend Entif’s capabilities beyond a single-step prompt-response paradigm. TRM gives it *depth of reasoning*, ROMA gives it *breadth and structure for complex tasks*, and ReasoningBank gives it *experience*. These modules are integrated such that they speak the same “language” of the architecture – they consume and produce the same kinds of artifacts (plans, receipts, etc.) so that the orchestrator can seamlessly incorporate their contributions into the workflow. Importantly, they are optional or on-demand: if not needed, Ada can handle tasks directly to save time/cost. But as Entif tackles more ambitious tasks, these advanced reasoners ensure it can scale its cognition effectively.

## **Evaluation & Adaptation: ELIXIR Feedback Loop and Coach** {#evaluation-&-adaptation:-elixir-feedback-loop-and-coach}

To make Entif not just automated but *self-improving*, the architecture includes an explicit evaluation layer named **ELIXIR** and a background learning process called **Coach**. These work together to constantly measure performance, enforce alignment, and tune the system’s behaviors over time – especially during off-peak hours (the “sleep compute” cycle).

* **Responsibilities & Boundaries:** The **ELIXIR** loop is responsible for collecting rich feedback from every operation: success/failure signals, costs, timing, and any deviations from expected behavior. It serves as an *epistemic engine* that evaluates how well the system is doing and identifies where adjustments are needed. ELIXIR itself doesn’t change system behavior on the fly (no direct self-modification during a user session); instead, it logs data and perhaps recommends changes. The **Coach** is the module that takes ELIXIR’s data (usually at night or in a maintenance window) and *applies updates* to the system’s models, prompts, or policies. The Coach’s boundary is that it runs these improvements in a controlled, often offline manner – it’s not interfering with live operations except to schedule retraining or to adjust config parameters for next runs. This ensures stability: any major change is introduced deliberately and often tested (Coach could even simulate some tasks with new settings before fully adopting them).

* **Key Interfaces & Events:**

  * **Receipt Logging:** The primary interface of ELIXIR is the writing of **receipt entries** to the **`receipts.sqlite` database** (or any chosen store). Every time a step or task completes, the orchestrator (Ada) or agents emit a receipt event that gets recorded. This includes the fields discussed: timestamps, task IDs, tool/model used, tokens, latency, cost, and a verdict (pass/fail). In some cases, additional notes or error messages are stored. The receipts DB schema is minimal but extensible for more metrics.

  * **Outcome Labeling:** ELIXIR also defines how to label outcomes. For instance, did the user’s request succeed (pass all acceptance checks)? If not, what type of failure (validation error, test failure, exception)? These labels are important for learning. The system might have a taxonomy of failure reasons (like “syntax\_error”, “assertion\_failed”, “timeout”, etc.). Each receipt carries a `verdict` and possibly a `notes` field where errors are categorized.

  * **Analysis Queries:** The Coach interacts by querying the receipts and other tables. It might query: “give me all instances in the last day where the Cheap-Judge was overruled” or “fetch all tasks with model=GPT3 that later required an escalation to GPT4”. To support this, ELIXIR may maintain some summary tables:

    1. **Model Routing Table:** tracking each model’s performance (accuracy rate vs cost).

    2. **Retry Policy Table:** tracking what kind of errors occurred and if retries fixed them.

    3. **Chunking/Prompting Table:** if the system had to chunk input (for large texts) or used different prompt strategies, which ones worked.

    4. These can be derived from receipts or stored explicitly as part of Coach state.

  * **Alignment Checks:** There is also an interface for **alignment/consistency checks**. One component mentioned is an **alignment\_checker** that compares the current state of the system (knowledge, recent outputs) with the “Genesis” alignment document. This might run as a batch job and produce a report (or if severe, an alert event). The interface could be a simple script that diffs expectation vs reality (like comparing the mission statement to any flagged deviations in content).

  * **Coach Execution:** The Coach can be implemented as a scheduled job (via cron or orchestrated by Ada’s scheduler). When triggered (say nightly at 2 AM), it runs through a series of routines. The interface here is internal: the Coach code will connect to the receipts DB, to any model training pipelines, etc. If using an orchestrator, Coach might be an Ada-managed “routine” agent with its own config (but likely simpler to implement as a Python script or notebook for now).

  * **Self-Improvement Actions:** The outputs of Coach include updated parameters or data:

    1. E.g., updating the **model routing policy** thresholds (stored in a config file or database): the Coach might raise or lower the confidence threshold at which Ada jumps to a larger model, based on observed accuracy.

    2. Updating **prompt exemplars or few-shot examples**: If a particular type of user query caused confusion, the Coach can add a Q\&A pair to Ada’s prompt or training data to handle it better next time.

    3. **Extending tool schemas**: If new arguments were discovered or frequently requested for a tool that weren’t originally in its schema, Coach can update the tool’s JSON schema to accommodate that.

    4. These actions might be done by writing to files, or calling a script to fine-tune a model, etc., all of which happen within the Coach run.

* **Data Models & Schemas:** We already covered the receipts schema. Additional tables for ELIXIR/Coach could be:

  * **Model\_Performance Table:** columns like `model_name, task_type, total_runs, success_rate, avg_cost, avg_latency, last_updated`. This collects stats which the Coach can use to adjust routing. For example, if `fast-model` has 80% success on coding tasks but those 20% failures always got fixed by `mid-model`, maybe we keep using fast-model first but ensure auto-retry with mid-model.

  * **Test\_Failures Table:** When the Petri system or guardrails catch an issue (like a new tool failing an audit), it logs to `test_failures` with `tool_name, scenario, timestamp, severity`. The Coach monitors this to ensure those issues are resolved (maybe requiring user intervention or a patch to the tool).

  * **ReasoningBank** might itself be part of adaptation, but we covered it prior.

  * The **Genesis Alignment Report** might be just a log output or a stored file with differences (e.g. listing any content produced in last day that violates a guideline, etc.).

  * **Coach Config:** The Coach might have a config (which things to update, how aggressive to adapt parameters, which data to use for fine-tuning if any). This could be a YAML or JSON file not unlike how one configures continuous integration pipelines.

* **Execution Flow & Dependencies:**

  * **During normal operation (Daytime Loop):** The system logs everything to receipts. There might also be real-time triggers for minor adaptations: e.g., if two quick successive failures occur, Ada could temporarily raise a flag to use the bigger model for the next similar request. But heavy analysis is deferred to Coach time.

  * **Coach nightly routine:** A possible flow:

    1. **Consolidate Data:** The Coach job starts by gathering all receipts since the last run (or the last N hours). It may also fetch any new entries from test\_failures, etc.

    2. **Identify Patterns:** It looks for specific patterns:

       * Did any task require multiple model escalations? (Opportunity to adjust threshold or to store a plan).

       * Did any new tool get introduced? If so, were there any Petri safety results? If a tool is failing tests, maybe disable it or mark as experimental.

       * Are there repeated failures in a specific domain? (Maybe signals a missing prompt piece or missing knowledge).

       * Summarize token and cost usage: detect if any usage is trending up unexpectedly (could indicate inefficient looping somewhere).

    3. **Update Routing Weights:** Using something like a multi-armed bandit logic (contextual bandit), adjust the “score” or weight of each model for each task type. For instance, if the cheap model did fine, maybe even lower the confidence threshold to use heavy model (to save cost). Or if certain tasks always fail with cheap model and need a rerun, perhaps raise threshold to escalate sooner.

    4. **Update Retry Policies:** If the receipts show that a single retry always fixes a certain error, we can codify that: e.g., “on timeout error, automatically retry once before asking user.” Conversely, if retries never help for a certain error, we might skip straight to escalation or user prompt next time. These rules might be stored in a policy file or table.

    5. **Incorporate ReasoningBank:** The coach will add any novel successful plan to the ReasoningBank as discussed, and perhaps also train a simple classifier to recognize when to apply it. But initially just storing is enough.

    6. **Prompt and Schema Refinements:** Based on failures, the coach may tweak Ada’s prompt or the tool schemas. For example, if Ada misunderstood a command phrasing, maybe add that phrasing as an example to the intent parser prompt. If a tool got an argument it didn’t expect (user said “create 5 endpoints” but code\_scaffold only accepted one at a time), maybe update the schema or at least log a note for developer to handle that (some things require manual dev too – Coach might just flag it in a report).

    7. **Model Fine-tuning (optional):** Over a longer term, Coach might accumulate enough labeled data (through receipts and outcomes) to fine-tune the models in use. For instance, fine-tune the cheap model on common prompts that it failed initially to improve it. However, this is advanced and likely out-of-scope for initial implementation. Still, the architecture makes it possible to slot this in later: e.g., weekly, run a script to fine-tune a small model on successful vs. failed reasoning cases to improve its judgment.

    8. **Alignment & Genesis Check:** The Coach runs the alignment\_checker. This could involve scanning recent outputs (perhaps all user-facing messages or content created) against the pinned policies in the genesis doc. If something is off (maybe the system started using an off-tone or made a decision contrary to user’s goals), it flags that. The result might be an alert or auto-correction (for example, if an important concept drifted, it could refresh the knowledge by re-reading the genesis doc into memory or adjusting some weight to that effect).

    9. **Generate Daily Brief:** As a final step, the Coach can compile a short report. Possibly Ada will use this to give the user a voice summary in the morning. Example: “Good morning\! While you were sleeping, I processed 12 new notes, updated my strategy for API testing (should save \~30% tokens), and cleaned up 3 duplicate concepts in the knowledge graph. Total spend yesterday was $0.05 with an 95% success rate on first tries.” This keeps the user informed and builds trust that the system is improving and not doing hidden changes.

* The Coach depends on having access to all the data stores (receipts DB, knowledge graph for alignment check, etc.). It may also call out to external APIs if needed (maybe to fetch latest versions of ontology for glyph improvements or do heavy compute like retraining on cloud resources). But largely, its brain is within the local environment for privacy and control.

* **Safety & Observability:**

  * **Controlled Self-Modification:** All changes the Coach makes are either incremental (tweaking a numeric threshold, adding a training example) or go through a validation. For instance, if Coach were to fine-tune a model, you might test the new model on a validation set (some stored recent tasks) before deploying it in Ada’s loop. If something seems off, revert. The architecture could support A/B testing of new strategies under the hood with guardrails – though initially, manual oversight by the developer is likely.

  * **Receipts of Coach Actions:** The Coach itself should log receipts or reports of what it did. If it updated routing and the threshold from 0.8 to 0.75, that action is recorded (maybe in a `coach_actions` table or simply as a diff in config under version control). This way, if a change causes issues the next day, one can trace back and see “ah, last night the policy changed, that’s why Ada is now using the smaller model too often.”

  * **Evaluation of Evaluator:** A bit meta, but we can also evaluate if Coach’s changes had positive effect. Over a week, do success rates improve? The system might measure that as well, and the developer can adjust the learning rate of these adaptations accordingly.

  * **Human Oversight:** For critical safety aspects (like alignment), the Coach might just produce a human-readable report rather than automatically alter things. E.g., “Alignment check: It seems the assistant gave financial advice which is against policy – please review.” Then the human can take action (maybe refining the prompt or rules). Over time, as trust grows, more can be automated.

  * **Observability Tools:** The dashboard in the Output layer likely includes metrics like token usage per day, success rates, average latency, etc. These are generated from the receipts and reflect the work of ELIXIR. The developer can monitor these to ensure everything is on track (for example, noticing a sudden drop in success rate could indicate a regression that Coach might not have fixed yet). The system logs trend alerts as receipts too – e.g., if attention metrics or usage metrics spike or drop beyond a threshold, an alert (possibly via an integration like email or just a loud notification through Ada) is produced.

In essence, the Evaluation & Adaptation layer closes the loop in Entif’s learning cycle – *every action yields feedback, and every feedback can yield improvement*. ELIXIR ensures *“receipts everywhere”* and the Coach uses those receipts to keep Entif efficient, accurate, and aligned with the user’s goals without requiring the user to manually fine-tune parameters. This approach, focusing on daily micro-improvements, turns Entif into a system that gets a little better with each use, with compounding benefits over time.

## **Safety & Alignment System: Petri \+ Tripwire** {#safety-&-alignment-system:-petri-+-tripwire}

Ensuring safety, security, and alignment in an autonomous system is paramount. Entif 2.0 employs a multi-pronged safety system, with **Petri** and **Tripwire** mechanisms at its core, to prevent bad actions and to test the system’s limits in a controlled way.

* **Responsibilities & Boundaries:** The **Petri** subsystem is essentially an *automated auditor and sandbox tester*. It is responsible for stress-testing new tools or flows in a safe environment before they’re fully deployed in Ada’s live loop. For example, if a new MCP tool for database access is added, Petri can run a suite of adversarial prompts or misuse attempts to see if the agent might do something unsafe (like dropping a table without confirmation). Petri’s boundary is that it never runs during normal user-initiated operations – it’s used in development cycles or triggered by certain events (like installation of new capability). It doesn’t generate user-facing outputs; it logs any issues to the test\_failures table and can gate deployment of that feature.  
   The **Tripwire** mechanisms are lightweight runtime guardrails. Their responsibility is to *monitor inputs and outputs in real-time* and catch any rule violations or high-risk content, stopping execution or routing as needed. Boundaries: Tripwires are not meant to be heavy evaluators (they should be cheap and fast, e.g., regex checks or small model classifiers on content). They won’t correct issues – just flag or halt them. They also operate at the “edges” of the system: on user input (to catch problematic requests early) and on final outputs (to ensure nothing unsafe leaves the system). They don’t deeply introspect the chain-of-thought (that’s beyond their scope and handled by Petri in offline tests or by model-internal alignment).

* **Key Interfaces & Events:**

  * **Petri Test Packs:** Petri uses **test scenarios (packs)** which are essentially collections of test cases. For each tool or agent behavior, Petri defines malicious or unusual input sequences. For instance, a `new_tool_safety` pack might include:

    * *Test 1:* Feed the agent a prompt trying to prompt-inject or break out of the tool’s intended use.

    * *Test 2:* Simulate a user command that could cause data loss with that tool and see if Ada properly asks for confirmation.

    * Petri executes these tests (maybe by simulating an Ada session with those inputs, but in a contained environment or with the tool in dry-run mode).

    * The interface is likely via some script or an extension of the agent frameworks used (Anthropic’s Alignment folks have a Petri framework that might be integrated).

  * **Tripwire Guardrails:** At runtime, tripwires can be implemented with libraries such as OpenAI’s Guardrails or custom checks. For example:

    * **Input Guardrails:** Before Ada processes a command, the raw text can be checked by a content filter model or regex for disallowed content (like violence, self-harm instructions, etc.). If found, Ada will refuse (and produce a polite refusal via TTS) *before* even invoking any tool.

    * **Output Guardrails:** After an LLM produces an output (like a code diff or a written answer), a quick check scans it. If it contains something suspicious (like it decided to output the user’s API key from memory or some defamatory statement), the system can truncate or modify that output. In many cases, the orchestrator’s structured approach prevents most wild output, but it’s a safety net.

    * **Tool Action Tripwires:** The orchestrator also sets tripwires for certain actions. For example, if a shell tool is about to execute `rm -rf /important`, a tripwire rule might catch the pattern “dangerous command” and require confirmation. These can be coded in a policy file or as code in Ada’s logic.

  * *Events:* When a tripwire triggers, it typically emits a *“GuardrailViolation”* or *“TripwireTriggered”* event. This could log to receipts (verdict \= FAIL with reason \= “Guardrail: disallowed content”) and prevent that action. The user might get a message, e.g. Ada saying “I’m sorry, I cannot assist with that request.” Likewise, Petri when running tests will emit events for any test failure, such as *“PetriTestFail: tool=browser, scenario=XSS\_test”*, logging details of what failed.

* **Data Models & Schemas:**

  * **Test Failure Log:** As mentioned, a `test_failures` table might capture Petri results: columns like `scenario_name, component, result, timestamp, details`. For each failing scenario, details might include what input triggered the failure and what the unwanted behavior was. Over time, we want this table empty (all tests passing), but it’s there to ensure issues are known.

**Guardrail Rules:** Could be represented in a config (YAML/JSON) if using a library like Guardrails. For instance:

 `forbidden_patterns:`  
  `- pattern: "DROP TABLE"`  
    `action: block`  
  `- pattern: "system.exit"`  
    `action: block`  
 Or for content categories, something like:

 `moderation:`  
  `disallowed: ["hate", "self-harm", "sexual"]`  
  `response: "Sorry, cannot continue."`

*  The OpenAI Guardrails system uses a JSON schema and Python validators; since we might integrate that, we could have a guardrails definition file for Ada’s outputs.

  * **Capability Metadata:** Each tool/agent might carry metadata like a risk level or privileges. Petri uses that to decide what tests to run. E.g., a tool flagged as “internet access” might have a set of tests related to not leaking private data externally.

  * **Tripwire Config:** The router or orchestrator could have a small table of threshold triggers. For example, `if tokens_out > 10000 and model=tiny and not finished -> likely runaway loop` as a rule to cut off a generation that's going too long.

* **Execution Flow & Dependencies:**

  * **Onboarding New Tools/Agents:** Whenever a new tool is integrated or a major change is made to the system’s prompts/policies, the developer (or automatically via CI) triggers Petri. Petri will:

    * Spin up the orchestrator or relevant component in a test mode.

    * Run a battery of test prompts/interactions.

    * Record any unexpected or unsafe outcomes.

    * If failures are found, those must be addressed (by improving prompts, adding guardrails, limiting the tool’s scope, etc.) before the change is considered production-ready (in the dev loop, the user might adjust things and re-run Petri until clean). This is analogous to running unit tests on software changes, but here for alignment/safety.

    * Petri may integrate with the frameworks mentioned: e.g., Anthropic’s Alignment Blog references Petri as a way to automate red-teaming. Possibly we use an open-source harness or write our own.

  * **Runtime Tripwires:** During live operation:

    * As soon as user speech is transcribed, but before parsing into an intent, Ada passes the transcript through an input filter (small model or regex rules). If it trips, Ada responds with a refusal and no further processing happens.

    * When a tool action is formulated, Ada checks if it’s destructive. By policy, Ada already asks confirmation for destructive actions, which is a kind of built-in tripwire (user acts as final guardrail). Some could be auto-blocked (e.g. Ada might completely forbid certain actions like network calls to unknown domains unless explicitly enabled).

    * If a guardrail triggers on model output (say the LLM tries to do something disallowed), Ada can catch it and either sanitize it or abort that step. This might involve patterns or using another classifier on the model’s output.

    * At the UI layer, if any content is to be posted publicly (via Media Engine), an additional check is prudent: e.g., scanning the video description or tags for problematic content to avoid posting anything that violates platform policies.

  * **Integration with ELIXIR:** All guardrail and safety events are fed back into the ELIXIR feedback loop. They are logged (so the Coach can see if we’re hitting a lot of guardrail triggers – perhaps meaning user is asking for out-of-scope stuff or an attacker might be probing). This can inform tightening or loosening some rules as needed (with caution).

* Dependencies: We’ll use known libraries or models for content filtering (OpenAI, HuggingFace moderation models, etc., local if possible). Petri depends on having a sandbox environment; perhaps it uses a separate instance of Ada that can run in test mode on dummy data.

* **Safety & Observability:**

  * **Defense in Depth:** Petri \+ Tripwire means we have layers: Petri finds issues preemptively in a controlled setting; Tripwires catch anything that slips through during live runs. This layered approach reduces risk significantly.

  * **Minimal Overhead:** Tripwires are designed to be cheap and not interfere with normal operation unless triggered. For example, the input content filter uses a tiny model or a simple lookup so it doesn’t add noticeable latency to voice commands. Output guardrails similarly are quick checks.

  * **Developer Visibility:** All Petri test results and guardrail triggers are surfaced to the developer. If something was blocked, the developer should find out either through the receipts or an alert. This prevents silent failures where, say, a user request is blocked and user gets a sorry – the developer can see that and consider if it was a false positive in the safety filter or intended.

  * **User Trust:** The system can also occasionally remind the user of safety status – e.g., “(All actions are running in safe mode; I will ask if something potentially destructive is about to happen.)”. The “recording light” we mentioned ensures the user knows when listening is active. Similarly, maybe a small indicator “sandbox” vs “live” mode can be present if we ever allow the user to toggle more autonomous behavior.

  * **Continuous Alignment Evaluation:** Petri isn’t one-and-done. Each time a new capability is added or a new risk is discovered, new Petri tests should be created. Over time the test suite grows (like a regression test suite for alignment). The Coach or a CI pipeline can run these regularly (even nightly) to ensure no regressions – e.g., after some model update, maybe a test that used to pass now fails (the model started giving a risky answer), we catch it.

  * **Fail-Safe:** If for any reason a part of the safety system fails (e.g., the guardrails model is unavailable), the system should default to a conservative posture: either use a backup set of static rules or reduce functionality (maybe not allow unknown commands). This way there's no window where safety is entirely off due to an internal error.

By incorporating Petri and Tripwire, Entif 2.0 aims to be **robust and alignment-friendly from day one**. This is particularly important as the system grows in autonomy (especially with the Media Engine producing external content). These safety systems ensure that autonomy doesn’t come at the expense of control or ethical compliance. As Anthropic’s approach suggests, automating alignment testing (Petri) and building guardrails at critical points is key to scaling safe AI – principles Entif adopts fully.

## **Media & Attention Engine (Content Creation Flywheel)** {#media-&-attention-engine-(content-creation-flywheel)}

In parallel to the core coding-and-reasoning workflow, Entif 2.0 includes a **Media & Attention Engine** – essentially a second workstream focused on turning the user’s knowledge and output into multimedia content, and leveraging audience feedback (attention) as a signal for improvement. This component treats “attention as capital,” meaning it views content dissemination and engagement analytics as another feedback loop to drive system growth.

* **Responsibilities & Boundaries:** The Media Engine’s responsibilities include:

  * **Corpus Analysis & Scene Creation:** Ingest long-form content (recorded talks, demos, articles) and break them into structured **scene cards** – self-contained segments suitable for video or post production.

  * **Content Generation:** Produce draft media assets (scripts, video clips, titles, descriptions, thumbnails) that can be turned into polished videos or blogs with minimal editing.

  * **Distribution Planning:** Formulate a multi-platform posting strategy (e.g. how to present content on YouTube vs TikTok) and (eventually) execute it.

  * **Attention Metrics Collection:** Gather data on how the content performs (views, clicks, retention, etc.) and feed that back to refine future content choices.

* The boundaries are that the Media Engine initially operates in a *suggestion/simulation mode*. It will prepare content and a “publishing plan” but **not actually post live without user approval** (at least in early phases). It also should not deviate from the user’s intended style/brand; it’s meant to amplify the user’s work, not create unrelated content on its own. Another boundary is working with available data: it won’t, for example, invent facts – it relies on the knowledge core (like transcripts and notes) to build content, ensuring authenticity.

* **Key Interfaces & Events:**

  * **Content Intake:** Similar to how notes are ingested, long transcripts (like an hour-long meeting or a YouTube video transcript) can be fed explicitly into the Media Engine (perhaps by placing a file in a specific folder or via a command to Ada like “Ingest this video for media output”). This triggers the **Scene Card Generator**.

  * **Scene Card Generator (M1):** The engine processes the text and emits a set of **scene cards**. Each scene card is a JSON object describing a segment of content suitable for, say, a short video chapter or a social media post. Fields include:

    * `hook`: a short, attention-grabbing summary of the scene (the opening line to entice viewers).

    * `beats`: the key points or subtopics in that scene (like a mini-outline).

    * `pull_quotes`: especially catchy or important quotes from that segment.

    * `claims`: any factual claims or important statements (could be used to double-check or highlight).

    * `refs`: references or sources mentioned (if any).

    * `broll_hints`: suggestions for visuals or b-roll footage to accompany this scene.

  * The generator likely uses the Glyph knowledge representation as well, tagging each scene with concepts (tone, persona, etc.). It might, for example, label a scene as “tone: motivational, persona: expert, tribe\_alignment: developer” etc., though the specifics given were more about scene content structure.

     The output event might be something like `ScenesGenerated(content_id=X, count=10)` meaning it created 10 scenes for a given input content.

  * **Title/Description/Tags Generator (M2):** For each piece of content (could be each scene or the whole video), the engine can produce candidate titles, a suggested description, and tags/keywords for SEO. Interface could be a function or just part of a pipeline after scene generation. Perhaps the user can also call this on demand like `generate_titles(scene_card)` to iterate options. The output is essentially text strings but structured (list of title options, plus a description blob, plus a list of tags).

  * **Thumbnail Prompt Forge (M3):** Instead of directly generating images (which might be computationally heavy), the system generates *prompts or design specs* for thumbnails. Interface: Given a scene or video, produce a prompt like “A close-up of a laptop with code and a big text ‘HEALTH CHECK SUCCESS’ – bright colors”. Also, produce simple layout suggestions (like where to place text or images). Possibly output a JSON that could be fed into a design tool (like a Canva or Photoshop template).

  * **Short-form Content Planner (M4):** Interface to repurpose content for various lengths/platforms. For example, generate an **Edit Decision List (EDL)**: basically instructions on how to cut the long content into a 60-second highlight for TikTok, or segment into chapters for YouTube. This could output something like: for TikTok, use scene 2 and 5, add captions (here’s the SRT captions file), and for YouTube, create chapters for scenes 1-8 each 1 minute.

  * **Distributor Orchestrator (M5):** This is like a dry-run multi-platform publisher. It takes a “publish plan” (maybe a YAML listing each platform, the content pieces to post, schedule times, etc.) and simulates posting them. It doesn’t actually call the APIs initially, but it goes through the motions: e.g., produce a checklist: “Ready to post on YouTube: Title A, Description ready, Scene1.mp4. Ready to post on TikTok: VideoClipB.mp4 with caption file.” It might also verify all required assets exist and meet platform specs.

    * In the future, toggling from dry-run to live would connect actual API calls (and of course, add another safety check at that time).

  * **Metrics Ingestion (M6):** An interface to pull engagement stats from each platform. This could be via official APIs or by consuming exported data. For example, a cron job might call YouTube API for latest video’s views, likes, average watch time; call TikTok’s stats, etc. It then writes these to a **metrics warehouse** – maybe a simple table: `metrics(platform, content_id, date, impressions, ctr, avg_watch, subs_gained, etc.)`. The engine can then analyze trends: e.g., computing velocity of views, retention rates.

    * There’s also mention of writing “trend alerts” as receipts. For instance, if a topic is suddenly gaining traction faster than usual, the system might log an alert (and possibly inform the user “Trend alert: ‘health check’ video is spiking in views after you tweeted it”). These alerts go into receipts or a separate attention log and can be considered by the orchestrator (for example, maybe Ada will bring it up proactively: “Noting that the ‘X’ video you posted is trending, we might want to produce a follow-up.”).

* **Data Models & Schemas:**

**Scene\_Card Schema:** As given, fields for scene cards. We might refine it as:

 `{`  
  `"id": "scene-3",`  
  `"hook": "Why Health Checks Matter for Your API",`  
  `"beats": ["What is a health check", "Real-world examples", "Implementation tips"],`  
  `"pull_quotes": ["\"Always monitor your API's health\""],`  
  `"claims": ["Frequent health checks improve uptime by 30%"],`  
  `"refs": ["ClientCall2025-10-16#paragraph5"],`  
  `"broll_hints": ["monitor screen with green checkmark", "success graph"]`  
`}`

*  The `id` links back to the source content (which itself might be a node in the graph or a file).

  * **Trend\_Signals Schema:** The content earlier described capturing topic metrics:  
     `{ topic, velocity, longevity, breadth, acceleration, cultural_impact }`. This suggests that as we ingest performance metrics, we also abstract them into conceptual trends. For example, if multiple videos on “AI coding” are doing well, we label that topic trending.

    * `velocity`: how fast interest is rising,

    * `longevity`: how sustained the interest might be,

    * `breadth`: how wide an audience or how many platforms,

    * `acceleration`: second derivative of interest (spiking or flattening),

    * `cultural_impact`: maybe a subjective measure or external indicator (like mainstream media mentions).  
       These are higher-level insights that could inform content planning (maybe integrated into ReasoningBank or Ada’s decision making for what to focus on).

  * **Metrics Tables:** Might have raw tables per platform or a unified table keyed by content. Example:  
     `content_stats(content_id, platform, date, impressions, clicks, ctr, avg_watch, likes, comments, shares)`.  
     Over time, Coach or some analytic function can derive the trend\_signals from these raw stats.

**Publish Plan Schema:** Could be a YAML or JSON enumerating posts:

 `schedule:`  
  `- platform: YouTube`  
    `time: "2025-10-20T10:00:00Z"`  
    `video: "projectX_overview.mp4"`  
    `title: "Project X Overview"`  
    `description: "..."`  
    `tags: ["ProjectX", "Overview"]`  
  `- platform: TikTok`  
    `time: "2025-10-20T10:30:00Z"`  
    `clip: "projectX_tip.mp4"`  
    `caption: "Quick tip from Project X..."`

*  This plan can be generated automatically after content is prepared. The Distributor Orchestrator reads this and simulates execution (and eventually will execute for real).

  * **SAFE-Checks:** Under "Guardrails & Ethics" in content, we have guidelines the media engine must follow:

    * Always ensure consent for any recorded individuals (so if content includes someone’s voice or image, have permission).

    * Privacy: maybe allow user to mark some ingested content as “do not use in public content”.

    * Compliance: make sure to follow each platform’s terms (no banned content, no unauthorized music, etc.).  
       These are not data schemas but policy rules. We might have a `content_metadata` where each content piece has flags like `allowed_use: internal_only | public_ok`.

* **Execution Flow & Dependencies:**

  * **Scene Generation (M1)**: Suppose the user recorded a 30-minute tech discussion. They drop the audio transcript into the watch folder and tag it for media. The ingestion pipeline adds it to the knowledge graph as usual, but additionally, the media engine picks it up. It uses the Glyph Engine to identify key segments – perhaps using the structure of the talk (pauses, topic shifts) plus semantic clustering to chunk it. It then generates scene cards as above. This likely uses an LLM (maybe a mid-tier model) that’s prompt-programmed to output structured JSON given a long text, identifying hooks and key points. The dependency is an NLP model with some fine-tuning or prompting for summarization and tagging. Also possibly uses sentiment or style analysis to classify tone for each scene.

  * **Packaging (M2, M3)**: Once scenes are ready, for each scene or for the whole content:

    * Titles and descriptions are generated by again using a prompt on a small LLM (like “Given this summary, suggest 5 catchy titles under 60 characters”).

    * For description, maybe combine the scene summaries into a cohesive paragraph.

    * Tags might come from the glyph concepts (e.g., the top 5 topics mentioned become tags).

    * Thumbnail prompt is likely templated: some vision of design but in text. Could involve a smaller diffusion model to test viability but likely just text output for now.

  * **Multi-Platform Planning (M4)**: The engine should know common video lengths and formats (e.g., TikTok \< 60s ideally, YouTube doesn’t mind length but benefits from chapters, etc.). It uses those rules to slice/dice content. Possibly no ML needed, just rules: e.g., pick the most high-level scene for a short teaser, ensure captions, etc. If needed an LLM might help condense further or pick highlights (like "choose the most exciting 15-second moment"). That could involve an algorithm scanning for emphatic speech or key phrases (if audio analysis is available), or simply trust the scene hooks rating (maybe each scene could have an “excitement score” and the highest becomes the short).

  * **Distribution Simulation (M5)**: With all pieces (scenes videos, which presumably could be created if we had text-to-video capabilities – likely using third-party like Runway ML as mentioned – but initially maybe we assume the user or a human in the loop will create the actual video from the script and scene card; the system automates planning around it), we create a schedule. The Distributor Orchestrator goes through each planned post in dry-run, logging “Ready to post X on Y platform at Z time.” If something is missing (say a thumbnail file not present), it would flag it. This acts as a checklist for the user to actually perform or to let the system do if the user flips a switch in future.

  * **Metrics & Attention Loop (M6)**: After content is posted (manually or later automatically), the engine periodically calls APIs to get performance. Dependencies: Many platforms have APIs or at least allows scraping. We might integrate official SDKs or use n8n nodes to fetch stats (e.g., YouTube Data API, TikTok’s API if available, or parse web pages if needed). The data is stored and analyzed. The key here is connecting it back to the core:

    * If a certain content does well, that topic might influence Ada’s prioritization (perhaps tasks related to that topic get higher urgency).

    * If some style of content flops, maybe avoid that style.

    * Over time, we basically treat trending topics like one would treat stock signals in trading – allocate “effort” or “focus” to areas yielding high return (growth in attention).

    * This could manifest as the system suggesting: “A lot of people are interested in X based on last video. Maybe write a blog or code example about X next.”

* Dependencies: The Media Engine uses various AI capabilities: summarization, style analysis, maybe generative video or at least integration with generation tools. Possibly a text-to-speech or avatar generator if making videos with narration. In initial implementation, those might be out-of-scope and we stick to script generation and rely on external tools for actual media rendering. Connectors via n8n or custom code to social platforms is another dependency.

* **Safety & Observability:**

  * **Ethical Content Generation:** The system must ensure that anything it generates is in line with user’s values and platform rules. For example, no copyrighted material usage without license, no offensive language, etc. We can run the same guardrails on generated content that we do on AI outputs in coding. Additionally, since this content is public-facing, a second layer of review by the user is advisable. In early versions, treat all Media Engine outputs as drafts that user reviews.

  * **Privacy Considerations:** If transcripts include sensitive info (client names, personal data), the scene generator should either omit or anonymize those in content. Perhaps we integrate a step to redact names or specifics in media output, unless the user explicitly wants them.

  * **Observability:** Provide a *Media Dashboard* where the user can see:

    * All generated scene cards and content drafts.

    * A timeline of scheduled posts (even if just simulated).

    * Engagement stats over time (graphs of views, likes, etc.).

    * This likely ties into the main observability pane or a separate section. Perhaps integrated with the receipts pane (like showing content-related receipts such as trend alerts).

  * **Feedback into Entif:** This engine is somewhat peripheral to the core coding assistant, but integrated at the data level. The results (like trending topics or widely asked questions gleaned from comments) can become knowledge in the graph. Also, successes here can motivate the core system’s focus (for example, if the user’s content on “GraphRAG” got huge attention, Entif could infer that the user might want to prioritize projects or follow-ups on that).

  * **Non-Interference:** The media engine runs in parallel so it shouldn’t slow down the core operations. If it’s doing heavy processing like video rendering or large model summarization, ideally that’s scheduled in background. We can leverage Ada’s scheduler to do content processing at a time the user is not actively coding, or throttle it to ensure CPU/GPU is free when needed for primary tasks.

  * **Monetization as Metric:** If applicable, the system could also track monetization metrics (like revenue from content if any), tying that in as a “return” metric. But that’s beyond initial scope; attention (views, growth) is the main proxy.

Ultimately, the Media & Attention Engine aims to **“monetize the learning process”** as was eloquently put. All the knowledge and skills the system accumulates while helping the user can be repurposed into content that builds an audience, and the feedback from that audience (what they engage with) in turn helps Entif focus and refine its knowledge. This creates a virtuous cycle: *build knowledge → create content → get attention → use attention data to guide building more knowledge*, and so on. Entif’s architecture is designed to tie these loops together while still keeping the core trustworthy and user-driven.

## **System Integration & Flow Summary** {#system-integration-&-flow-summary}

Bringing all the modules together, we can illustrate Entif 2.0’s end-to-end operation as a cohesive loop:

**Input → Ingestion → Knowledge Graph → Orchestrator & Agents → Outputs → Feedback Loop → (back to Knowledge & Orchestrator)**.

Concretely:

1. **User Input (Voice or Data):** The user says *“Ada, build a health check API and prove it works”*. Simultaneously, in the background, the system might be ingesting a design document from the watch folder.

2. **Intent & Plan:** Ada interprets the voice command as an intent to scaffold a service and test it. It retrieves any relevant info (maybe a requirement from yesterday’s notes about a health check) from the GraphRAG. Ada decides on a plan: code backend, code frontend, verify in browser. It consults ReasoningBank for similar past tasks – suppose it finds a matching strategy and thus proceeds confidently with the cheap model route.

3. **Execution with Agents:** Ada calls **Sony** to scaffold the backend FastAPI code, **Blink** to create a simple webpage, then **Browser Agent** to run the health check. Each step yields receipts and possibly artifacts (code files, screenshots). The Cheap-Judge reviews the browser outcome and deems it satisfactory (status 200 seen).

4. **Output to User:** Ada speaks a confirmation: “All set\! The health-check endpoint is up and responded with 200 OK. I’ve logged the outcome.” The receipts ledger now has an entry for this task, and the user can query `entif receipts last 1` to see the token cost and time.

5. **Knowledge Update:** The fact that this service was created is stored: e.g., GraphRAG gets a node for “HealthCheckService” linking to the project repository and to the request node. Also, the micro-spec for it and the verification steps are stored, so next time something similar is needed, it’s already partially known.

6. **Media Generation (parallel):** Suppose that interaction was recorded or the user wants to share it. The system might generate a scene card describing this feature creation. Later, the user can compile a “Dev Log Episode 1” video from the day’s interactions with Ada’s help. Scene cards and draft title (“How I Built a Health Check in 3 Minutes with AI”) might be produced.

7. **Feedback & Nightly Loop:** Overnight, the Coach runs:

   * It sees that on the first attempt, everything passed without needing GPT-4. It increments the success count for using only Claude instant (for example) on scaffold tasks.

   * It also notices from receipts that the database tool wasn’t used at all today, so maybe nothing to update there.

   * It merges a duplicate concept “healthcheck” and “health check” in the knowledge graph.

   * It generates a summary of the day’s achievements and metrics.

   * Petri had no new tools to test, so all clear.

   * Alignment check passes (system remained within allowed actions).

8. **User Briefing:** Next morning, Ada might say: “While you slept, I cleaned up some notes and learned from yesterday’s deployment. Our fast model handled everything with 100% success, so I’ll continue using it as first resort. I also drafted a blog outline for the health check feature if you’d like to review.”

Every cycle through this loop not only accomplishes user goals but strengthens Entif’s capabilities. Each new piece of knowledge improves retrievals, each new receipt refines the model routing and policies, each new content piece broadens feedback from the outside world, and each safety check builds trust that the system won’t go rogue. The layers – Input, Semantic Core, Orchestration, Evaluation, Safety, Media – are all wired together via the common data models (Glyphs, Receipts, Micro-specs, etc.), enabling seamless flow of information.

The design is such that **every output feeds back as an input** somewhere: code and answers feed the user and the media engine, receipts feed the coach, engagement feeds prioritization, and so on. This creates an **autopoietic system** – one that self-regulates and self-improves.

## **Development Plan (Incremental Micro-Tiers)** {#development-plan-(incremental-micro-tiers)}

Implementing Entif 2.0 from scratch is an ambitious endeavor, but by adhering to the 4-hour micro-tier philosophy, we can build it up step by step with compounding value at each step. The development plan is divided into two parallel workstreams:

* **Workstream 1: Core Orchestration & Knowledge Loop** – focusing on Ada, tool integration, knowledge ingestion, and self-improvement core features. This is the primary loop that makes the developer “faster at everything.”

* **Workstream 2: Media Engine & Attention Flywheel** – focusing on the content creation pipeline and attention feedback loop, which can run concurrently once the core loop is underway.

Each workstream is further broken into micro-tier deliverables (approximately 4 hours of effort each, though actual time may vary). Each deliverable is defined with a **Goal (Why), a specific outcome (Deliverable), and measurable acceptance criteria (Checks)** to ensure it’s done properly.

### **Workstream 1 — Core Orchestration & Knowledge Loop** {#workstream-1-—-core-orchestration-&-knowledge-loop}

**D1: Voice Orchestrator “Ada” (Hello World)**  
 **Why:** Establish the voice-driven loop end-to-end in simplest form – voice in, action out – to prove the concept.  
 **Deliverable:** A minimal real-time voice agent that can hear a simple command and record a result. Specifically, implement Ada’s audio pipeline (wake-word \+ streaming ASR) and connect it to one trivial tool. For example, a tool that logs a timestamp. When user says “Ada, log a health check,” Ada should register that and log a receipt entry.  
 **Checks:**

* Saying *“Ada, log a health check.”* triggers the system to insert a new row in `receipts.sqlite` with a timestamp and a message (e.g. `msg="health check logged"`).

* The voice acknowledgment is under 1 second (e.g., Ada immediately says “Logging now”).

* Verify that the receipt row contains reasonable data: model name, milliseconds, token counts (they might be small), etc., and that `verdict` is “PASS”.

*(This sets up core voice-\>MCP-\>log skeleton.)*

**D2: Receipts Everywhere (CLI \+ File Sink)**  
 **Why:** Ensure uniform accounting and observability from the start.  
 **Deliverable:** The **receipts.sqlite** database schema and a basic CLI tool `entif receipts` to query it. Ada (from D1) now writes all actions to this SQLite DB. Implement schema: an `actions` table with columns for id, timestamp, session, task, step, actor, model, tokens\_in, tokens\_out, latency\_ms, cost\_usd, verdict, notes. Also provide a command to view the last N receipts in a readable format.  
 **Checks:**

* After some dummy actions (like the D1 command), running `entif receipts last 20` shows those entries with all fields populated.

* Inserting a fake entry via CLI (for testing) and then retrieving it works.

* The receipts file persists between sessions.

* Also verify that multiple steps in a task would each get an entry (simulate by making Ada call two internal actions and see two entries).

*(This creates the backbone for logging and introspection.)*

**D3: Watched-Folder Ingestion (Parse-Only Memory)**  
 **Why:** Enable frictionless memory by automatically ingesting files/notes.  
 **Deliverable:** A background ingestion process that monitors a `watch/` folder. When a markdown file or text is added, it is parsed into the GraphRAG store. For now, implement a simple version: each file becomes a node in an in-memory graph or a JSON file representing the graph. Add minimal metadata (source filename, created\_at). No complex glyph mapping yet – just store content in chunks by heading or paragraph.  
 **Checks:**

* Dropping a file `meeting_notes.md` into `watch/` triggers the system to create an entry (e.g., print log "Ingested meeting\_notes.md").

* Querying the graph (via a simple CLI or script) shows nodes corresponding to the file’s sections, with `source = meeting_notes.md` and a timestamp.

* Confirm that ingestion did **not** execute any action beyond storing (check that receipts show no tool invoked due to ingestion, ensuring parse-only).

* The data is accessible: e.g., if Ada is asked “summarize meeting\_notes”, Ada can retrieve that content from this memory (this test might require hooking retrieval up to Ada, which might come later, but at least ensure data is there).

*(This provides a persistent memory of notes which later tasks will refine.)*

**D4: Micro-Spec Generator**  
 **Why:** Turn static notes into actionable tasks for Ada, bridging passive memory to active work.  
 **Deliverable:** A script or tool that scans a note (e.g., a markdown file) and looks for patterns like tasks or requirements, outputting a **micro\_spec.json** for each potential task. For instance, if a note says “We need to implement X by Y,” the generator would produce something like `{ intent: "implement X", acceptance_checks: [...], artifacts: [...] }`. Focus on a simple rule-based or prompt-based extraction to get one micro-spec from a sample note (like “create a health endpoint” spec).  
 **Checks:**

* Given a note file about a “health endpoint”, running the micro-spec generator yields a JSON file with at least one intent (e.g., “create health check API”) and a couple of acceptance checks (e.g., “GET /health returns 200”, “a timestamp is shown on webpage”).

* The JSON validates against the expected schema fields.

* If integrated, Ada could consume this spec (but integration comes later, for now just generation works and is saved to disk or printed).

*(This sets stage for Ada to auto-discover tasks and plan verification criteria.)*

**D5: Browser Agent (Verifier v0)**  
 **Why:** Use automated verification (clicks, assertions) instead of expensive LLM judgments whenever possible – “pay for clicks, not for GPT.”  
 **Deliverable:** A headless browser agent that can load a local web page, perform a simple action, and verify an outcome. For v0, implement using a framework like Playwright. Provide an MCP interface, e.g. `browser.verify({"url": "...", "check_text": "Hello World"})` which loads the page and checks if "Hello World" is visible. Save a screenshot and any relevant logs in an `evidence/` folder.  
 **Checks:**

* Create a trivial `index.html` page with “Hello World” text. Invoke the Browser agent with that page and a check for "Hello World". It returns a result with `pass:true` and paths to a screenshot and maybe HAR log.

* If check text is not found, result is `pass:false` and error is logged.

* The evidence files (screenshot etc.) are indeed saved and can be opened.

* The agent runs headless (no manual browser pop-up needed).

* Its result is logged to receipts with actor “browser” and verdict pass/fail.

*(This introduces the automated QA capability fundamental for the loop.)*

**D6: Code Builder Stubs (Sony & Blink)**  
 **Why:** Establish separate sandboxed coding agents with minimal capabilities and ensure they obey boundaries.  
 **Deliverable:** Two agent instances (processes or API endpoints) – one designated “Sony” for backend, one “Blink” for frontend. For now, they can be very simple: each can create a file with given content. Set up sandbox directories: e.g. `workspace/server/` for Sony and `workspace/client/` for Blink. Implement security checks such that Sony cannot write to client directory and vice versa (simulating write-scope guardrails). Each agent should accept an MCP call like `write_file(path, content)` within its scope. Possibly stub them to just echo success without actual AI code generation initially.  
 **Checks:**

* Calling Sony to write a file “server/app.py” with content “print('OK')” actually creates `workspace/server/app.py`. Sony’s receipt or log shows success.

* Calling Blink to write “client/index.html” similarly works in its folder.

* If Sony is instructed to write to "../client/hack.txt", it refuses (does nothing and returns an error). Similarly Blink cannot cross-write.

* Each action through these agents is recorded as a step with actor “sony” or “blink” in receipts.

*(This lays the groundwork for AI codegen in a controlled environment.)*

**D7: Ada Orchestrates a Micro-Spec (Closed Loop)**  
 **Why:** Achieve the first fully autonomous build/test loop with Ada using all pieces: plan, build, verify, feedback – demonstrating the core value in one integrated scenario.  
 **Deliverable:** The system should now be able to take a high-level request and execute it through completion. For example: *“Ada, build the health check endpoint and page.”* Ada will parse this, perhaps load a corresponding micro-spec from D4 if available, or default plan: instruct Sony to scaffold a simple FastAPI `/health` returning 200, instruct Blink to add a button on a page calling `/health`, then use Browser Agent to verify that clicking the button yields the expected result. Cheap-Judge can be a stub that just says “all good” if browser passes, or not needed because the browser result is clear. Essentially, Ada coordinates D5 and D6 agents to fulfill the task.  
 **Checks:**

* The voice command above results in actual creation of a small API file and an HTML file in the respective sandboxes.

* Running the resulting server (if applicable) and opening the page works (the Browser agent already simulated it as part of Ada’s run). For testing, perhaps after Ada finishes, manually run the FastAPI app to double-check it returns 200 – but Ada’s own verification should have done this.

* The final receipt for the task shows verdict “PASS” (assuming everything succeeded), with sub-steps (Sony, Blink, Browser) logged. If any step fails (e.g., forgot to import FastAPI), Ada logs a failure and ideally Cheap-Judge or Ada itself notes the failure (maybe auto-fix is later, but at least it doesn't silently succeed).

* Ada’s TTS or CLI output confirms success or gives the error it encountered.

*(This is the “skateboard” thin vertical slice: one use-case working fully.)*

**D8: Nightly Coach (Sleep Compute)**  
 **Why:** Implement the basic self-improvement cycle so the system starts learning from day one.  
 **Deliverable:** A scheduled job (or on-demand script) that processes the receipts and knowledge from the day and performs at least one improvement action. Focus on model routing weights for now. For example, have a simple file or table `model_routing` that tracks success counts. The Coach job updates this based on today’s receipts: it might reduce the threshold for using heavy model if heavy model was never needed, or vice versa. Also implement a simple “re-run failure” logic: the Coach picks any failed tasks from the day and reruns them (in a safe mode, e.g., with more logging or higher model) just to see if they would succeed on second try – logging the outcome (not to user, just in receipts for analysis).  
 **Checks:**

* Simulate a scenario in the day where a cheap model failed and heavy succeeded (can fake a receipt entry if needed). Run Coach: verify it updates a config (maybe `router.json`) to adjust thresholds or weights (like “for intent X, increase heavy\_model\_threshold to 0.7”).

* If there was a known failure (maybe break something intentionally or mark a receipt as fail), Coach tries it again (maybe it calls Ada or relevant agent in a test mode). If that succeed in the re-run, it logs something like “Failure X succeeded on retry in isolation” which could hint the issue was concurrency or prompt. If it fails again, it might flag it for manual review.

* Ensure Coach actions are themselves logged – perhaps as special receipts or at least console output.

* The next run of Ada should be able to pick up any changed policy (if we changed a threshold, verify Ada’s router is using the new value).

* Also include a simple summary output (could be just printed or written to a file) e.g., “Daily summary: 5 tasks, 4 passed, $0.04 spent, adjusted model routing for scaffold\_service.”

*(This brings learning into the system – even if primitive, the infrastructure is now there to expand on.)*

**D9: Glyph-Ready Knowledge Graph (Semantic Adapter)**  
 **Why:** Prepare to incorporate the semantic Glyph layer without yet overhauling storage – future-proofing the knowledge representation with minimal immediate effort.  
 **Deliverable:** Define and create a Neo4j (or similar) schema for representing `:Glyph` nodes and their relationships, and build a stub of the Glyph mapping. For now, the stub can be very simple: maybe map a dozen example terms to WordNet synsets or just assign IDs. Adjust the ingestion pipeline (from D3) to create nodes with a `:Concept` label and connect them. Essentially, ensure our in-memory or file-based graph can export or be swapped to Neo4j easily. Possibly stand up a local Neo4j instance or an embedded one and push one example node through to prove connectivity.  
 **Checks:**

* A sample concept, say "health check", is given an entry in a Glyph lookup table (just a fake WordNet ID if nothing else). After ingestion of a note containing "health check", the graph has a node with label `Glyph` or a property like `synset_id = XYZ`.

* Running a query in Neo4j Bloom or via a Cypher query shows that node and any relationship (like `(:Glyph)-[:MENTIONED_IN]->(:Document)` or `(:Glyph)-[:RELATED_TO]->(:Glyph)` if we add a related concept).

* If Neo4j is not fully set up due to time, an alternate check: our graph data structure can now handle a `glyph_id` field on concepts, and an export script dumps nodes with glyph info in a format ready for Neo4j import.

* The point is to validate the shape: one concept has a stable ID and possibly a link to an external lexicon. A round-trip gloss (definition) retrieval could be stubbed: if we have WordNet, fetch a definition for the synset. Check that we can retrieve that gloss via an API call. This tests that adding semantic grounding is feasible without breaking the current pipeline.

*(This is largely preparatory, but ensures the knowledge graph design can evolve.)*

**D10: Provenance & Justification Chain**  
 **Why:** Solidify trust by making it easy to trace every answer to its sources.  
 **Deliverable:** Extend the Q\&A or command results to include provenance metadata. Specifically, implement a CLI command (or voice command) `entif show-justification <task_id>` that prints which notes or data were used for that task’s result. This requires linking receipts or reasoning steps to knowledge nodes. A simple approach: whenever Ada retrieves from the graph, record the node IDs used in a `receipt.notes` field or a parallel table. Then implement the lookup for justification. Also, Ada’s verbal answers or outputs should contain reference markers (if applicable). For example, if Ada answered a question using info from a file, it might say “(source: meeting\_notes.md)”.  
 **Checks:**

* Execute a command that involves retrieval (like user asks “Ada, what is the health check endpoint status?” after we have that info in notes). Ada should answer and either in the TTS or on-screen output, reference the source.

* Running `entif show-justification <id>` for that Q\&A action shows the file name or node that provided the answer (e.g., "Answer based on: meeting\_notes.md lines 10-15").

* For a build task, maybe show-justification lists “Task was derived from micro-spec X and template code Y” if such were used. If no external info was needed (pure user command), it could say “User request direct, no external context used.”

* Ensure that storing these links doesn’t break anything (maybe receipts have a new JSON field for provenance, which is okay as we can extend schema).

*(This caps Phase 1 of development: by now the core system is usable and transparent.)*

These first 10 deliverables cover roughly the first two weeks of focused development (Workstream 1). By D10, we have a functioning Ada that can execute a basic dev task end-to-end, log everything, learn a bit each night, and justify its actions.

Now the focus can shift to parallel improvements and the media engine, while continuing to iterate on the core.

### **Workstream 2 — Media Engine & Attention Flywheel** {#workstream-2-—-media-engine-&-attention-flywheel}

**M1: Corpus Intake → Scene Cards**  
 **Why:** Leverage existing long-form content by breaking it into reusable, shareable pieces (“video atoms”).  
 **Deliverable:** Implement a content ingester specifically for media. For a given large text (e.g., a transcript in markdown or text), produce a set of **scene\_card.json** files capturing key segments. Use the structure defined earlier (hook, beats, etc.). A simple strategy is to split by top-level headings or time markers (if transcript has timestamps) and then summarize each chunk with an LLM. Identify 1-2 quotes and one “hook” sentence. This can be a standalone script first.  
 **Checks:**

* Input: a \~5-page text (could be a concatenation of a couple of our notes or a YouTube transcript). Running the scene cutter produces e.g. 10 JSON files or one JSON with an array of scenes.

* Each scene entry has at least a `hook` and 3-5 `beats`. They should be coherent and correspond to the content. (Manually verify that if scene 3 was about “Benefits of health checks”, the hook is indeed reflective and beats list those benefits).

* Ensure that no scene is overly long (target \~30-60 seconds of spoken content each, so maybe \~150 words summary).

* The process should be parse-only (don’t do anything with it yet, just save the output).

* If possible, also capture metadata like tone or emotional intensity per scene (this can be in `scene_card` as extra fields, e.g., `tone: 'excited'` if desired for future use).

*(Now we have the building blocks for content.)*

**M2: Title/Description/Tag Generator (Cheap-First)**  
 **Why:** Automatically package scenes or videos for posting, using inexpensive model prompts.  
 **Deliverable:** A function or tool that takes a scene (or full video’s worth of scenes) and generates 5 potential titles, a draft description, and a list of tags. Use a small language model or even a template approach to ensure low cost. For example, the title generator might use a few templates: “How to {topic} in {time}”, “{Number} Tips about {topic},” etc., combined with keywords from the content. The description can be a one-paragraph summary plus maybe a call to action. Tags can be extracted noun phrases.  
 **Checks:**

* Given a scene about "health check endpoint", the tool outputs something like: Titles: \["Building a Health Check API in 2 Minutes", "FastAPI Health Check Tutorial", ...\] (5 variations with different angles). Description: a 2-3 sentence blurb containing those keywords and context. Tags: \["FastAPI", "Health Check", "API Tutorial", ...\].

* Titles should meet typical constraints (not too long, include a hook).

* At least one title should be click-inviting (subjectively).

* Verify the model used is indeed the small one (or if using GPT-4, ensure we note this should be swapped with cheaper model later).

* No disallowed content or overly exaggerated claims in output (we may need to guardrail it lightly or just trust in careful prompting).

*(Now content is labeled and ready to present professionally.)*

**M3: Thumbnail Prompt Forge**  
 **Why:** Prepare for visual design without diving into graphic generation – outline thumbnails conceptually.  
 **Deliverable:** A routine that takes each scene or video and outputs a “thumbnail spec”. Possibly in two parts: (a) a text prompt that could be fed to an image generator describing an ideal thumbnail image; (b) a simple layout suggestion, like where to put title text, etc. Could use heuristics (like if hook contains a keyword, propose an image of that). For example, for "Health Check API" a prompt might be “An illustration of a computer screen with a big green checkmark, joyful mood, bold title text 'HEALTH OK'”. Also output a structure for layout: maybe an SVG or JSON with regions (but as a stub, maybe just textual: "Title text at top, image center, background green").  
 **Checks:**

* For a given scene or title, the prompt text is produced and seems relevant (we don't test generating the image now, just ensure it's descriptive and clear).

* Layout suggestions don't violate design basics (text not off-screen, safe margins for platform). Could verify by loading suggestions into a design tool or just eyeballing them.

* If multiple thumbnails are suggested, ensure variety (like 2-3 different concepts or color schemes). The task said 3 layout wireframes, so possibly output three variants with minor differences (text left vs right, etc.).

* Ensure output is in a format that designers or automated tools could pick up (maybe a JSON with coordinates for text boxes if we were thorough, but initial could be mock text).

*(Now we have everything to create a video: script from scenes, text for title/desc, and an idea for thumbnail.)*

**M4: Short-form Cutter Plan**  
 **Why:** Maximize reach by repurposing content for different formats (short clips, chaptered videos).  
 **Deliverable:** A tool that generates an **Edit Decision List (EDL)** and caption files for short versions of content. For example, from a full video’s scenes, pick 1-2 as a 60-second TikTok (vertical format maybe) – output a list like "Use scenes 2 and 5, total length \~60s; add captions from those scenes." Also output a .srt or .vtt file with timed captions for that short (the transcript of those scenes). Similarly, create a plan for a YouTube video with chapters (e.g., list chapters "Intro", "Part 1: ...", etc. with timestamps mapping to scene boundaries). Essentially, formalize how to slice the content for different platforms.  
 **Checks:**

For a \~10 scene input, output EDL for TikTok: maybe something like:

 `TikTok_EDL:`  
  `clips: [`  
     `{ scene: 3, start: 0, end: 15s },`  
     `{ scene: 5, start: 0, end: 40s }`  
  `]`  
  `total: 55s`  
  `aspect_ratio: 9:16`

*  and a caption file covering those lines (could be just the text from scene 3 and 5, as .srt with generic timings).

* Output a YouTube plan: e.g., chapters "00:00 Intro, 01:00 Health Checks, 02:30 Conclusion" derived from scene lengths. (The actual lengths can be estimated by word count of scenes if we assume a speaking rate).

* Ensure short form selection is logical (maybe picks the most dynamic or self-contained scene as a teaser).

* All this is dry-run info (we're not actually cutting video, just telling how to cut).

* If possible, test by manually editing according to plan to see if it makes sense (but that's beyond automated testing; at least verify the times add up and text matches segments).

*(Now we know how to adapt content to each platform’s preferred format.)*

**M5: Distributor Orchestrator (Dry-Run)**  
 **Why:** Simulate the publishing process and verify readiness without risk.  
 **Deliverable:** A system (could be an n8n workflow or a Python script) that reads a **Publish Plan** (like the YAML described earlier) and goes through the motions of publishing to each target, but instead of real posting, it generates a checklist and confirms everything is in place. For example, if plan says post to YouTube at 10am, it checks that the video file exists, the thumbnail image is ready, etc. If something is missing, it flags it. Then output a combined checklist for the user:

* YouTube: video "X.mp4" ready, Title: "Y" (OK), Description length OK, Thumbnail "Z.png" (OK).

* TikTok: video "X\_short.mp4" ready (OK), caption length OK, etc.  
   No actual API calls to YouTube/TikTok yet. The orchestrator could be implemented via Ada or separate, but likely separate since it's a different context (maybe easier as a script initially).  
   **Checks:**

* Create a dummy publish plan YAML for a hypothetical video (with placeholders for files and times). Run the distributor orchestrator in dry-run. Confirm it prints or logs a checklist for each platform as described.

* Intentionally remove one asset (like delete or rename a video file) and run it – it should flag "Error: file not found for TikTok clip" or similar.

* Check compliance: e.g., if a Title is too long or tags too many (some platforms have limits), it should warn (this implies we have some rules encoded for each platform’s requirements).

* Ensure no actual network activity is done (perhaps replace actual API calls with dummy calls logging “would upload now”).

* The output of this step is mostly for user confidence – treat the checklist itself as the artifact to verify.

*(Now user has a clear to-do list to actually publish content, reducing manual guesswork.)*

**M6: Attention Metrics Glue**  
 **Why:** Close the attention loop by capturing how content performs and feeding that data back into Entif.  
 **Deliverable:** Set up minimal data pipelines for metrics. Define a database or file (the “warehouse”) to store daily metrics for each piece of content. Implement either actual API calls or a placeholder: possibly use YouTube’s API for a known channel with a test video (or just simulate by reading a CSV). Also, create a simple dashboard or CLI output that aggregates key performance indicators (KPIs) – e.g., impressions, click-through rate (CTR), avg watch time – for last week per channel. Additionally, if any metric crosses a threshold (like CTR \> X% or a sudden spike in views), generate a **trend alert receipt** entry.  
 **Checks:**

* Populate the metrics store with sample data for two platforms (YouTube, TikTok) for a week (could be dummy numbers). Run the metrics job – it should produce a small table or chart of “YouTube: 1000 views, 50% avg watch; TikTok: 5000 views, 15% CTR” or whatever is appropriate.

* Verify that trend alerts work: for example, set one day’s growth abnormally high, and see that a receipt is logged: maybe `notes: "Trend: 'Health Check video' +300% views today"`.

* The dashboard could just be console logs or an actual small web page. If web, ensure it's accessible. If CLI, ensure formatting is readable.

* Also confirm that these metrics (particularly trend signals) are accessible to the core system: for instance, we might map a trending topic to a GraphRAG node or to an entry in ReasoningBank (like telling Ada "Focus on X, it's hot"). But hooking that in can be future work. At least ensure the data is stored where we can use it.

* Finally, ensure sensitive data isn't logged (if using real API keys, secure them) – but likely we are simulating or using public stats.

*(Now we have analytics feeding in, achieving a full media flywheel when combined with content generation.)*

By the end of M6, Workstream 2 has set up the pipeline from content ingestion to content planning to metrics. Initially, the actual content posting may still be manual (the user uses the outputs to publish), but everything else around it is automated. The system can now learn not only from its coding tasks but also from external reactions to content, which is unique and powerful.

### **Minimal Schemas Reference** {#minimal-schemas-reference}

For clarity, here are the key schemas defined throughout these tiers (compiled for quick reference):

* **`receipts.sqlite` schema:** (each row represents a tool/agent action or final task result)

  * `id` (int primary key)

  * `ts` (timestamp)

  * `session_id` (text, grouping a series of actions in one conversation/session)

  * `task_id` (text or int, an identifier for the user’s high-level request)

  * `step` (text or int, e.g., step number in a plan, or 0 for one-step tasks)

  * `actor` (text, which agent or component executed, e.g., "ada", "sony", "blink", "browser", "trm", "roma", "judge")

  * `model` (text, if an LLM was used, name of the model or tool variant, else NULL)

  * `tokens_in` (int)

  * `tokens_out` (int)

  * `ms` (int, milliseconds the action took)

  * `cost_usd` (real, cost estimation for that action)

  * `verdict` (text, "PASS"/"FAIL"/"WARN", etc., outcome status)

  * `notes` (text, additional info like error message or provenance links)

**`micro_spec.json` structure:** (for tasks extracted from notes or user stories)

 `{`  
  `"intent": "short description of goal",`  
  `"acceptance_checks": [`  
    `{`  
      `"kind": "browser" | "unit" | "api",`   
      `"target": "what to test (URL or function)",`   
      `"action": "perform this (click or call)",`   
      `"expect": "expected outcome"`  
    `},`  
    `... (multiple checks)`  
  `],`  
  `"artifacts": ["expected output artifacts (file names, etc.)"]`  
`}`

*  This defines what constitutes “done” for a task in a verifiable way.

**`scene_card.json` structure:** (for each segment of content for media)

 `{`  
  `"hook": "Short enticing summary of the scene",`  
  `"beats": ["Point 1", "Point 2", "..."],`  
  `"pull_quotes": ["memorable quote or phrase"],`  
  `"claims": ["important factual claims, if any"],`  
  `"refs": ["source references or context IDs"],`  
  `"broll_hints": ["ideas for visuals"]`  
`}`

*  This helps in video editing and script writing by encapsulating each scene's essence.

Having these schemas formalized ensures that all components speak a consistent language and can pass data between each other without ambiguity. It also makes it easier to expand or debug specific parts of the system (since we can inspect these JSON or DB entries to see if something went wrong).

### **Guardrails & Ethical Considerations** {#guardrails-&-ethical-considerations}

Throughout development and deployment, we adhere to strong **guardrails and ethical guidelines**:

* **Consent & Privacy:** All ambient ingestion is *parse-only* and requires opt-in for any further use. We will implement a visible indicator (like a recording light or icon) whenever audio is being captured. Users can designate certain sources or times as off-limits (a “do-not-ingest” list), which Ada will honor by pausing or filtering out those inputs. Any personal data captured inadvertently in notes will be either stored locally (never sent to external APIs without permission) or anonymized if used in content.

* **Security:** The system runs local-first; any integration with cloud services (for model inference or content posting) is done with caution and only when necessary. Credentials for APIs (like content platform APIs) are stored securely and calls are made through vetted SDKs.

* **Compliance:** For the Media Engine, we ensure that platform Terms of Service are respected. For example, we won't automate actions that violate rate limits or scraping rules. Content generated will avoid copyrighted material (e.g., the thumbnail prompts will not encourage using trademarked logos, etc., unless user has rights). Also, if posting eventually becomes automated, using official APIs (e.g., YouTube API) is preferred to ensure compliance.

* **AI Ethics:** Ada is instructed (via its prompts and possibly via integrated guardrails) to refuse any request that is clearly illegal, harmful, or against the user’s defined policies. Similarly, content generation avoids misinformation: e.g., if the system produces a "claim" in a scene card, that claim should be checkable against the knowledge base or it should be phrased cautiously if uncertain. Over time, integration with something like a fact-checker (maybe via Petri tests or queries to knowledge base) can be added for content that goes out.

* **User Control:** The user remains in control. They decide when to execute suggestions (no autonomous code deployments without approval, no publishing content without review). The Coach’s improvements are mostly under-the-hood, but if any big change occurs (like switching out a model), the user is informed via the daily brief. The architecture’s emphasis on receipts and justification means the user can audit and intervene at any point. If something is going awry, the user can pause the system (e.g., a voice command "Ada, pause operations" could stop background processes) and inspect logs.

By embedding these guardrails at design and implementation levels, we aim for an **agent that is safely helpful** – accelerating the user’s work and outreach, but always aligned and under control.

---

## **What “Done” Looks Like (Entif 2.0 Minimum Viable Product)** {#what-“done”-looks-like-(entif-2.0-minimum-viable-product)}

To conclude this plan, here’s a snapshot of the expected capabilities once the above deliverables are implemented (the v0.1 system):

* **Voice-Orchestrated Development:** You can speak a request like, *“Ada, build a health check and prove it.”* Ada will generate the code (through agents), run tests in a browser, and respond with a confirmation. You’ll see the code created, a screenshot of the test result, and a receipt entry with the cost and time. Essentially, a one-command, hands-free feature implementation is possible for a simple case.

* **Ambient Knowledge Capture:** If you drop a `.md` file into the watched folder (or finish a meeting that's recorded), shortly thereafter a new node appears in the knowledge graph representing that info. Moreover, the system might auto-generate a micro-spec from it. So your knowledge base and task backlog build themselves as you gather information.

* **Content Generation Drafts:** If you feed the system a long transcript (say of you explaining a concept), it can output scene cards, title suggestions, and thumbnail ideas. This means in an afternoon you could go from a brainstorming talk to an outlined video script with promotional materials, ready for polishing and publishing.

* **Receipts & Analytics:** There’s a unified receipts viewer to inspect recent actions – showing that every operation was accounted for (with token counts and pass/fail). Additionally, you have a basic dashboard for content performance: e.g., “YouTube: \+50 subscribers from last video, TikTok video \#3: 10k views in 24h.” From this, trend alerts might suggest where to focus next.

* **Self-Improving Core:** Each day, the system gets a little better. For instance, if a certain tool was slow or error-prone, the Coach might have adjusted Ada to use a different approach, which you’d see reflected in logs. The next morning summary gives you confidence the system is optimizing itself (e.g., “cost per task down 10% due to better model routing”).

* **Safe and Verified Operations:** By default, nothing dangerous happens without your knowledge. If you attempt something with side-effects, Ada asks for confirmation (e.g., “Shall I deploy this to production? (yes/no)”). All code changes come with a diff and test evidence, so you trust what Ada does. If you want to undo, you can voice “Ada, rollback that change,” and due to receipts and version control integration, it can do so reliably.

In short, *Entif 2.0 MVP* means **voice-first autonomous coding** augmented by a **knowledge brain** and an **attention engine**, all working in tandem and continuously improving. It’s a system where speaking to your computer yields tangible results (code written, tasks completed), and where your knowledge and work not only accumulate internally but also compound externally (through content and feedback loops). Crucially, everything is instrumented and auditable, so you can trust and verify each step.

---

## **Next Waves and Future Enhancements** {#next-waves-and-future-enhancements}

Beyond the initial 2-3 week build outlined above, the architecture is poised for many enhancements, for example:

* **Smarter Model Routing (Bandit Optimization):** Use multi-armed bandit algorithms on the model selection to more rigorously improve the cheap→mid→heavy decision policy. This could bring in dynamic experimentation (A/B testing models on similar queries to gather stats).

* **Richer Verifiers:** Expand beyond the simple Browser agent – e.g., add unit test agents for code (run test files with a testing framework), or an AI code reviewer to analyze diffs for potential issues.

* **Full Glyph Integration:** Implement the actual Glyph encoder that maps text to WordNet/BabelNet IDs and use it to enrich the GraphRAG nodes. This will allow more precise reasoning (e.g., understanding that "server" and "service" might be connected through an ontology, aiding queries).

* **Automated Asset Creation:** Integrate an API for image/video generation (like Runway ML or others) to go from scene cards to actual video clips (perhaps first as drafts). Eventually, Entif could generate an entire video (with synthesized voice or even avatar) automatically from a scene card script – that would truly realize the content foundry.

* **Live Distribution:** Once comfort with the system grows, allow the Distributor to actually post content via APIs, perhaps starting in a controlled manner (e.g., auto-post an unlisted video for review, or auto-post to a secondary/testing account).

* **“Attention-to-Backlog” Loop:** Use the attention metrics to automatically create tasks or suggestions in the core backlog. For instance, if “Topic X” is trending in your content, the system might suggest: “Perhaps build a demo project on Topic X” as a micro-spec for you to confirm.

* **Multi-user and Collaboration:** Adapt Ada to handle multiple voices (via diarization) and perhaps allow shared knowledge bases between a small team.

* **UI & UX Polishing:** Develop a slick web UI (maybe using OpenAI’s ChatUI or a custom Electron app) for interacting with Ada via voice and text, reviewing receipts, browsing the knowledge graph visually, and editing content. The groundwork is laid, but a unified interface would improve user experience significantly.

* **Petri Extensions:** Continuously add to the Petri test suite based on new tools and even user-defined policies. Also integrate OpenAI Guardrails more deeply for natural language responses (ensuring Ada’s own explanations never accidentally reveal sensitive info or stray off policy).

Each of these can be slotted into the architecture without fundamental changes, thanks to the layered and modular design. The **UltraThink** approach taken in designing Entif 2.0 means we have a strong foundation: a system that is already **internally consistent and wired for growth**, where adding a new capability is a matter of plugging into the appropriate layer (with MCP interfaces and JSON contracts to keep it consistent).

By steadily iterating in micro-tiers, always delivering immediate utility, Entif will evolve rapidly from the MVP into a powerful autonomous partner – one that not only accelerates coding tasks but also amplifies the impact of those tasks by learning, adapting, and broadcasting knowledge.

Entif 2.0 is not just an assembly of features, but an **organism of interlinked parts** that will increasingly handle the mundane so that the user (and their extended audience) can focus on creativity and high-level strategy. The architecture and plan above aim to achieve exactly that, one manageable step at a time.

Sources

##### **You said:**

What about all of the notes on the architecture for each of the forges? They weren't even named.

###### **ChatGPT said:**

Thought for 2m 17s

You’re right—I hadn’t explicitly named and spelled out every Forge. Below is a single, cohesive markdown spec that (a) names each Forge, and (b) gives a receipts-first, MCP-native architecture for each, wired into the shared Entif spine. I’ve anchored decisions to your source notes inline.

---

# **Entif 2.0 — Forge Catalog & Architecture (Receipts-First, MCP-Native)** {#entif-2.0-—-forge-catalog-&-architecture-(receipts-first,-mcp-native)}

## **Cross-cutting invariants** {#cross-cutting-invariants}

* **Spine:** ADK orchestrator; MCP at every boundary; **Receipts** as single evidence currency; `entif://…` resource URIs; ReasoningBank; TRM/ROMA; GraphRAG+Glyph; Petri/Tripwire; VersionForge; ArchiveForge; Nx/Nx Cloud.  
   Entif 2.0 \- Enriched by Externa…

* **Cache policy:** plan/draft/fx/export may cache (by spec/graph \+ input hashes); **evidence gates never cache** (store Receipts, not verdicts).  
   Entif 2.0 \- Enriched by Externa…

* **Auth everywhere:** PEP SDK guards sensitive ops; RABAC via Cedar/Rego (+ optional Zanzibar relations); receipts for decisions.  
   Entif 2.0 \- Enriched by Externa…

* **Tenancy & roles:** tenant→org→project→env; role templates \+ step-up for high-risk actions (publish, restore, immutability unlock).  
   Entif 2.0 \- Enriched by Externa…

   Entif 2.0 \- Enriched by Externa…

---

## **Forge Registry (names & one-liners)** {#forge-registry-(names-&-one-liners)}

| Forge | Purpose |
| ----- | ----- |
| **MediaForge** | Generate/transform/prepare media; typed **Filter Graph DSL** → ffmpeg, QC truth fences, provenance. Entif 2.0 \- Enriched by Externa… |
| **SocialForge** | Compose/validate/schedule/publish posts; inbox/replies/experiments; adapters per platform. Entif 2.0 \- Enriched by Externa… Entif 2.0 \- Enriched by Externa… |
| **ArticleForge** | Plan→draft→lint→render→publish longform with citation enforcement & doc-grade gates. Entif 2.0 \- Enriched by Externa… |
| **LyricsForge** | Prosody QA \+ forced alignment; export SRT/LRC/ASS; coverage gates & dashboards. Entif 2.0 \- Enriched by Externa… |
| **WordForge** | Prompt builders with **Glyph anchoring**; reusable style packs as glyph sets. Entif 2.0 \- Enriched by Externa… |
| **FileForge** | CAS store, extraction, quarantine; MIME/EXIF/OCR/AV unpackers; antivirus hook. Entif 2.0 \- Enriched by Externa… |
| **ArchiveForge** | Snapshot **manifests/capsules** for replayable workflows & artifacts. Entif 2.0 \- Enriched by Externa… |
| **MetadataForge** | Descriptors for MCP surfaces & `entif://` nodes; graph edges across artifacts. |
| **VersionForge** | Semver/CC rules; bump/diff/compat; release notes & migrations. |
| **VizForge** | Validated charts/sparklines/panels with truth fences; renderer backends. Entif 2.0 \- Enriched by Externa… |
| **AuthForge** | Identity \+ access (OIDC/SCIM/WebAuthn), PDP/PEP, audits, risk; receipts everywhere. Entif 2.0 \- Enriched by Externa… |
| **BackupForge** | Backup/restore/DR with typed plans, immutability, drills, RPO/RTO dashboards. Entif 2.0 \- Enriched by Externa… |
| **UIForge** | **Describe once, emit many** UIs (React MUI → Tailwind/Next/Remix); a11y/i18n/perf truth fences. Entif 2.0 \- Enriched by Externa… |
| **APIForge** | Language-agnostic API specs → TS/Py servers/clients/gateways/tests, governed by CC. Entif 2.0 \- Enriched by Externa… |

---

## **1\) MediaForge** {#1)-mediaforge}

**Intent.** Make/edit/prepare media via external generators and deterministic transforms; compile **Filter Graph DSL** to ffmpeg; QC & provenance assured.

Entif 2.0 \- Enriched by Externa…

**MCP surface (sketch).**  
 `media.gen.generate(spec)` • `media.fx.transform(graph)` • `captions.attach(...)` • `qc.analyze(...)` • `export.run(preset)` (all return Receipts)

Entif 2.0 \- Enriched by Externa…

**Filter Graph → ffmpeg.** Typed nodes (reframe, overlay, loudnorm, burn SRT) compile to safe CLI with policy-bounded params.

Entif 2.0 \- Enriched by Externa…

**Flows.** Short→plan→gen→fx→captions→QC→export→archive; image sets; podcast→audiogram.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

**Nx targets & cache.** `gen`, `fx`, `qc` (no cache), `export`; seed/spec-keyed caching; agents shard heavy batches.

Entif 2.0 \- Enriched by Externa…

**Truth fences.** Loudness, black/freeze, caption coverage, colorspace, bitrate envelopes; provenance (C2PA).

Entif 2.0 \- Enriched by Externa…

**Integrations.** FileForge (CAS), ArchiveForge (manifests), VizForge (QC dashboards), SocialForge (channel presets), Article/Lyrics.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

---

## **2\) SocialForge** {#2)-socialforge}

**Intent.** Compose/validate→schedule→publish; replies/inbox; experiments (bandits), slotting; adapters per platform.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

**MCP surface.** `compose.validate(postSpec)` • `schedule(...)` • `publish(...)` • `reply.suggest(...)` • `inbox.pull(...)` (Receipts).

Entif 2.0 \- Enriched by Externa…

**Governance & net effect.** Single governable rail from Media/Article/Lyrics to post & analytics; receipts trace *what/why/where*.

Entif 2.0 \- Enriched by Externa…

**Inbox & safety.** Auto-reply with ROMA; Tripwire blocks toxic/PII/medical/legal; VIP/harassment escalation.

Entif 2.0 \- Enriched by Externa…

**Integrations.** Pull presets from MediaForge; CAS via FileForge; manifests to ArchiveForge; policy packs in VersionForge; dashboards in VizForge; RB for strategy.

Entif 2.0 \- Enriched by Externa…

---

## **3\) ArticleForge** {#3)-articleforge}

**Intent & surface.** Types \+ MCP server with `plan|draft|citations.enforce|lint|render|publish`; doc-grade CI gates & release via VersionForge.

Entif 2.0 \- Enriched by Externa…

**Why better than “just writing”.** Build/lint/cite/fail-fast with receipts; plugs into graph, scheduling, and automation flywheel.

Entif 2.0 \- Enriched by Externa…

---

## **4\) LyricsForge** {#4)-lyricsforge}

**Scope.** Prosody QA → alignment → caption export; thin CLI & Nx generators; dashboards (prosody heatmap, coverage sparkline).

Entif 2.0 \- Enriched by Externa…

**MCP/CLI.** `lyrics.mcp qa.evaluate`, `draft`, `align.mcp align.run`; `entif lyrics draft|qa|align` with receipts.

Entif 2.0 \- Enriched by Externa…

**Net effect.** Governed, auditable, fast; reproducible end-to-end; coverage ≥ target.

Entif 2.0 \- Enriched by Externa…

---

## **5\) WordForge** {#5)-wordforge}

**Role.** Prompt builders with **Glyph anchoring**; style packs summarized as glyph sets; feeds titles/descriptions/tags and thumbnail prompt cards.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

**Integration.** Upstream to MediaForge (thumbnail prompt cards), ArticleForge planning, SocialForge copy variants.

Entif 2.0 \- Enriched by Externa…

---

## **6\) FileForge** {#6)-fileforge}

**What it brings.** CAS, strong MIME sniffing, resumable uploads, deterministic hashing, archive unpackers, EXIF/OCR, antivirus hook, policy engine.

Entif 2.0 \- Enriched by Externa…

**Policy note.** Secrets live in AuthForge vault, **not** FileForge; quarantine separate.

Entif 2.0 \- Enriched by Externa…

---

## **7\) ArchiveForge** {#7)-archiveforge}

**Function.** Create **Archive Manifests** & replayable capsules for runs/artifacts; bind receipts for provenance.

Entif 2.0 \- Enriched by Externa…

---

## **8\) MetadataForge** {#8)-metadataforge}

**Function.** Keep descriptors for MCP methods & resource nodes (`entif://…`), so relationships are queryable across forges.

---

## **9\) VersionForge** {#9)-versionforge}

**Function.** Semver & CC enforcement for packs (policies, presets, emitters); migration guides; compatibility reports.

---

## **10\) VizForge** {#10)-vizforge}

**MCP server.** `spec.validate`, `render.png/svg`, `sparkline.halting(trm_run_id)`, `panel.compose`, `snapshot.record` → Receipts.

Entif 2.0 \- Enriched by Externa…

**Truth fences.** Axis zero, log disclosure, units/denominator, uncertainty badge, contrast, palette, small-N warnings; quarantine on red.

Entif 2.0 \- Enriched by Externa…

**React kit.** ReceiptSparkline, PetriGrid, RBWinRate, ArchiveTree, NxAffectedGraph, etc.

Entif 2.0 \- Enriched by Externa…

---

## **11\) AuthForge** {#11)-authforge}

**Scope.** AuthN (OIDC/SAML/WebAuthn), AuthZ (RABAC \+ relations), lifecycle, tokens, risk, keys, audit—with Receipts.

Entif 2.0 \- Enriched by Externa…

**PDP/PEP architecture \+ MCP.** `authz.check/batch/explain`, tuples, policy eval; PEP caches short-TTL; decision\_id stamped into Receipts.

Entif 2.0 \- Enriched by Externa…

**Policies & roles (day-one).** org/project roles, action list (e.g., `media.export`, `social.post.publish`, `lyrics.align`), step-up rules.

Entif 2.0 \- Enriched by Externa…

**Integration edges.** Guard MediaForge export & SocialForge publish; FileForge quarantine reads; Archive/Version packs; PEP lint in Nx.

Entif 2.0 \- Enriched by Externa…

---

## **12\) BackupForge** {#12)-backupforge}

**Intent.** Protect•prove•restore all data forms; typed plans; immutability; **DR drills**; RPO/RTO dashboards.

Entif 2.0 \- Enriched by Externa…

**Integrations.** AuthForge roles (`backup.operator`, `dr.runner`), FileForge CAS dedup, Archive manifests, Versioned policy packs, Nx targets for `backup:*` & `restore:*`.

Entif 2.0 \- Enriched by Externa…

**Slices to ship.** CAS restic-style, Postgres PITR, Velero snapshots, catalog \+ dashboards, adapters (Redis→Kafka→Mongo).

Entif 2.0 \- Enriched by Externa…

---

## **13\) UIForge** {#13)-uiforge}

**Intent.** **Describe once, emit many**: framework-agnostic UISpec (+ tokens/behavior) → React/MUI first, Tailwind/Next/Remix later; strong truth fences.

Entif 2.0 \- Enriched by Externa…

**Integrations & cache.** CodeForge/RefactorForge/VersionForge/ArchiveForge/File\&Media/ Auth/Viz/Backup; cache by `(UISpec hash + tokens hash + emitter version)`; never cache validation.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

**Example emission.** Spec→Next+MUI page & guards; Storybook/Jest/Playwright; Receipts for `ui.emit` \+ `ui.validate`.

Entif 2.0 \- Enriched by Externa…

**Safety.** a11y/privacy/security/perf budgets; parity via Equivalence Graph; re-entrancy via Generated Region Map.

Entif 2.0 \- Enriched by Externa…

---

## **14\) APIForge** {#14)-apiforge}

**Intent.** Language-agnostic API taxonomy (endpoints/RPC/events/errors/policies/SLOs) → TS Fastify / Py FastAPI servers, gateway, SDKs, tests, receipts.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

**Emitters produce.** Zod/Pydantic validators, PEP guard calls, OpenTelemetry, k6/Pact, Docker/Helm; compat & ASVS receipts.

Entif 2.0 \- Enriched by Externa…

---

## **15\) LLM Model Planes (OllamaForge \+ LLMForge) — *supporting planes*** {#15)-llm-model-planes-(ollamaforge-+-llmforge)-—-supporting-planes}

**Two-tier router.** Local (Ollama) for cheap/short tasks; Cloud for heavy/uncertain; both emit uniform receipts; MCP servers `mcp.local_llm` & `mcp.cloud_llm`.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

**GraphRAG+Glyph.** Default local embeddings; cloud fallback; Glyph IDs are the spine.

Entif 2.0 \- Enriched by Externa…

---

## **Wiring overview (how these parts see each other)** {#wiring-overview-(how-these-parts-see-each-other)}

* **Media/Article/Lyrics → Social.** Export presets per platform; Social validates conformance; manifests logged.  
   Entif 2.0 \- Enriched by Externa…

* **Auth → everything.** PEP on export/publish/restore; policies versioned & simulated; audits to Viz.  
   Entif 2.0 \- Enriched by Externa…

* **Backup → estate.** File CAS \+ DB PITR \+ K8s snapshots; DR drills; policy packs in VersionForge.  
   Entif 2.0 \- Enriched by Externa…

* **Viz → receipts.** TRM halting sparklines, Petri heatmaps, RB win-rate; truth-fenced charts/quarantine.  
   Entif 2.0 \- Enriched by Externa…

   Entif 2.0 \- Enriched by Externa…

---

## **Minimal vertical slices (per Forge) to land confidently** {#minimal-vertical-slices-(per-forge)-to-land-confidently}

* **MediaForge:** Gen \+ Transform \+ QC \+ Export \+ ffmpeg compile path \+ archive manifest.  
   Entif 2.0 \- Enriched by Externa…

* **SocialForge:** `compose.validate` \+ `schedule/publish` \+ 2 adapters \+ velocity & slot vizzes.  
   Entif 2.0 \- Enriched by Externa…

* **ArticleForge:** Types \+ MCP \+ CLI \+ doc-grade CI \+ Versioned release.  
   Entif 2.0 \- Enriched by Externa…

* **LyricsForge:** `qa.evaluate` \+ `draft` \+ `align.run` \+ FileForge wiring \+ dashboard.  
   Entif 2.0 \- Enriched by Externa…

* **UIForge:** Tokens \+ UISpec \+ MUI emitter \+ validators \+ Archive capsule.  
   Entif 2.0 \- Enriched by Externa…

* **APIForge:** Spec → TS/Py emission \+ gateway \+ SDK \+ k6/Pact \+ PEP guards \+ receipts.  
   Entif 2.0 \- Enriched by Externa…

* **AuthForge:** Core AuthN \+ PDP/PEP \+ policy pack v1 \+ integrations to Media/Social.  
   Entif 2.0 \- Enriched by Externa…

* **BackupForge:** CAS \+ Postgres T0 \+ Velero \+ catalog & dashboards \+ policy packs.  
   Entif 2.0 \- Enriched by Externa…

---

### **Notes on naming** {#notes-on-naming}

Where the notes used lowercase handles (e.g., `api-forge`, `media-forge`), I’ve normalized public names to **PascalCase** (“APIForge”, “MediaForge”) while keeping package paths kebab-case under `/packages/*` as shown in the Nx examples.

Entif 2.0 \- Enriched by Externa…

Entif 2.0 \- Enriched by Externa…

---

If you want this merged back into the master blueprint as a new “**Forge Catalog**” chapter, I’ll also drop a tiny `packages/protocol/src/forge.ts` that enumerates the registry and resource URI patterns (`entif://media/*`, `entif://social/post/*`, …) so every Forge speaks the same language about addressability and authorization.

# **Entif 2.0 Forges Architectural Blueprint** {#entif-2.0-forges-architectural-blueprint}

**Entif 2.0** is structured as a collection of specialized “Forge” modules, each responsible for a particular domain of functionality in a unified architecture. All Forges share common architectural principles: an **ADK** orchestrator coordinates workflows, **MCP** (Micro Contract Protocol) interfaces expose each Forge’s capabilities (with parse-first, idempotent methods as a uniform API), and every operation produces a **Receipt** as evidence. Artifacts and resources are identified by stable `entif://` URIs and described via **MetadataForge** descriptors, making them queryable in the knowledge graph. Cross-cutting services like **ReasoningBank** (for strategy and routing), **GraphRAG/Glyph** (for semantic memory), **TRM/ROMA** (for reasoning and task decomposition), **Petri/Tripwire** (for safety testing and policy enforcement), **VersionForge** (for version control and releases), **ArchiveForge** (for manifesting reproducible snapshots), **FileForge** (for content-addressable storage and file quarantine), **VizForge** (for truth-fenced metrics dashboards), and **AuthForge** (for identity and access control) provide a **spine** of capabilities used by all Forges. Each Forge described below is an executable module in this stack, built to integrate cleanly with these core services and with each other.

Throughout the design, **security** and **observability** are first-class: each Forge enforces **“truth fences”** – objective acceptance criteria that must pass before outputs are considered valid – and emits Receipts containing detailed results of these checks. **Nx** (Nx workspace and Nx Cloud) is used as the build and task orchestration framework, ensuring tasks are cached or sharded appropriately and that each Forge’s operations are efficiently integrated into CI/CD. We break down each Forge’s purpose, architecture, integration points, and an implementation plan with milestones and tasks of roughly 4-hour effort each.

---

## **MediaForge** {#mediaforge}

### **Purpose & Responsibilities** {#purpose-&-responsibilities}

**MediaForge** is the *make/edit/prepare* module for all media artifacts (images, audio, video). It governs the generation of new media, deterministic transformations and edits, assembly of media components (like adding subtitles or changing formats), quality assurance of outputs, and provenance stamping. In short, MediaForge can **generate** media content via external AI models, **transform** media through a typed filter graph (compiling to FFmpeg and similar libraries), **assemble** outputs (combining tracks, resizing or reframing visuals, adding captions, etc.), **validate quality** against objective metrics (video black frames, audio loudness, sync, etc.), and **sign or watermark** outputs to mark provenance. MediaForge produces finalized, evidence-backed media assets ready for distribution (actual publishing to external platforms is handled by SocialForge or other distribution forges, keeping MediaForge focused on content creation).

### **Architecture & Components** {#architecture-&-components}

**Interfaces (MCP APIs):** MediaForge exposes a suite of MCP methods under a `media.*` namespace, each providing a specific media operation. Key interfaces include:

* **Generation** – `media.gen.mcp`: endpoints to generate media via external generative providers. For example, `generate(spec: GenSpec) → {media_passport, receipt_id}` takes a provider-agnostic generation spec (prompt, model, etc.) and returns a new media asset’s passport and a Receipt. MediaForge will route this to the appropriate model API (e.g. Runway, Midjourney, ElevenLabs) through connectors and log usage, seeds, and flags in the Receipt. There is also `upscale(image_id, mode) → MediaPassport` for image enhancement via providers.

* **Transformation** – `media.fx.mcp`: a core API that applies a **filter graph** of deterministic transformations to media. For example, `transform(graph: TransformGraph) → {outputs: MediaPassport[], receipt_id}` compiles a user-defined transformation graph (scale, crop, overlay, audio mixing, etc.) to one or more FFmpeg pipelines and executes them. The `TransformGraph` is a typed DSL representing a directed acyclic graph of operations (e.g. trim, concat, scale, reframe, color adjustments, overlay, encode) with specified inputs and outputs. The compiler ensures safety (no path traversal, allowed codecs only) and inserts guardrails (color space normalization, etc.). Other endpoints here include `probe(file_id) → tech_meta` to get media metadata (via ffprobe) and `thumbnail(file_id, time?, width?) → MediaPassport` to generate poster images.

* **Captions/Subtitles** – `media.captions.mcp`: for extracting and attaching subtitles or transcripts. For instance, `transcript.extract(file_id, lang_hint?) → {text, srt_file_id, receipt_id}` uses either LyricsForge’s alignment (if a script/lyrics exist) or automatic speech recognition to produce a transcript and caption file. There are also `captions.attach(file_id, srt_id, kind)` to attach or mux subtitles into a media file, and `captions.burn(file_id, srt_id, style?) → MediaPassport` to render open captions (burned-in) with styling. This integrates with LyricsForge for precise timing when available.

* **Quality Control (QC)** – `media.qc.mcp`: provides automated analysis of media for quality issues. `analyze(file_id) → findings` runs a battery of checks on the media: black frame and freeze detection, bitrate and compression quality, frame checksum stability, loudness levels (per EBU R128), true peak, A/V sync drift, color gamut and range, HDR metadata correctness, caption coverage, etc.. The result flags any issues as “red” (blocking) or “amber” (warning) findings. Red findings will flip the media’s status to *quarantine* (in its passport) and block publication or export.

* **Export & Finalization** – `media.export.mcp`: final packaging of media into deliverable formats. `export(file_id_or_graph_id, preset_id) → MediaPassport` will take either an existing media file or an intermediate graph output and encode it according to a named **ExportPreset** (which defines container format, codecs, resolutions, etc.). During export, it can optionally apply a C2PA digital signature or watermark, and runs the QC checks again on the final file, attaching the results to the output’s passport. This ensures that any exported asset meets the preset’s requirements.

* **Provenance** – `media.provenance.mcp`: methods to explicitly mark or audit provenance. For example, `c2pa.sign(file_id, profile) → MediaPassport` will cryptographically sign the media with a content provenance signature, and `watermark.apply(file_id, method) → MediaPassport` injects visible or invisible watermarks. A `license.audit(media_id, inputs[]) → findings` can evaluate licensing and usage rights by examining source assets and provider terms. All such operations are “parse-first” and any external calls (to signers, etc.) are guarded by policy (Tripwire rules).

**Data Models:** MediaForge defines canonical models for media artifacts and how transformations are described, enabling consistency across the system. The **MediaPassport** is a unified schema for any media file’s metadata and status. It includes identity fields (`id`, stable `artifact_uri`), type (`kind` – image, audio or video), a pointer to the raw file in FileForge (`file_id` and content hash), technical metadata (dimensions, duration, codecs, bitrate, color space, loudness stats, etc.), and provenance info (creation time, generator model/seed if AI-generated, license info, C2PA signature presence, any watermarks). It also holds arrays of **Receipt** IDs for all operations applied (generation, transforms, QC results) and any risk flags or status markers (like “quarantine” or “final”). This passport travels with the media and is updated through its lifecycle.

For guiding generation, a **GenSpec** structure captures a model-agnostic description of what to create – e.g. the kind of media, prompts, negative prompts, style packs, reference images or audio for conditioning, target duration or dimensions, etc.. This allows MediaForge to plug in different providers behind the same interface. Similarly, the **TransformGraph** JSON schema describes a sequence of filter operations and how media flows through them (with named input nodes, operations like `scale`, `overlay`, `loudnorm`, etc., and outputs). A library of reusable **ExportPreset** definitions defines standard output settings per platform or use-case (e.g. a preset for “YouTube 1080p video” or “JPEG thumbnail”) – including container format, codecs, resolution, bitrate or CRF, audio loudness targets, color profile, etc..

**Integration Points:** MediaForge is deeply integrated with other Forges to leverage system-wide capabilities:

* It relies on **FileForge** for all storage and retrieval of media bits. Every input or output file is stored content-addressably and scanned for safety in FileForge, and MediaForge methods just reference file IDs (MediaForge itself never handles raw file paths directly). This ensures virus scanning and PII checks are applied at ingest, and that content hashes are consistent. Media passports include references to FileForge records.

* **ArchiveForge** captures MediaForge’s work into replayable manifests. Each generation spec, filter graph, preset, and QC Receipt can be bundled into an **Archive Manifest** so that the exact process that produced a media asset is recorded and can be replayed or audited later. This is crucial for reproducibility – if a model or pipeline changes, one can use the archived manifest to regenerate or verify the media artifact.

* **MetadataForge** registers descriptors for media processes and artifacts. For example, every media asset gets an entry in the metadata graph (`entif://media/...`) with its relationships. Edges like `(:Media)-[:GENERATED_BY]->(:Receipt)` and `(:Media)-[:DERIVED_FROM]->(:Media)` trace provenance. Filter graph nodes and presets are also described so that documentation and queries can list, say, all operations applied to a video.

* **VersionForge** is used to version control any reusable media configurations: e.g. **style packs** (collections of prompts or model settings), libraries of filter graph templates, and export presets. These are versioned with semantic versioning (major/minor revisions when compatibility changes) and published via VersionForge so that changes are tracked. Breaking changes in these (say a preset change that could alter outputs) would require a new major version, with migration notes auto-generated.

* **VizForge** provides monitoring dashboards for MediaForge’s operations. Key metrics include throughput (jobs per time), error rates, quality metrics distributions (e.g. histogram of loudness or bitrate of outputs vs. targets), cache hit rates, and cost or latency by provider. These dashboards are truth-fenced, meaning the visualizations themselves are validated for correctness (no misleading scales) and attached to Receipts for traceability. For example, a “QC heatmap” might show which quality checks most often fail and for which content types.

* **LyricsForge** and **ArticleForge** tie in when media has a textual component. MediaForge uses LyricsForge for tight integration of captioning or lyrics: e.g. the `media.captions` service will call LyricsForge’s alignment if a lyric script is available. Also, when generating videos from scripts, WordForge/ArticleForge might provide the narrative text or overlays, and MediaForge will handle turning those into visual elements (like burning subtitles or generating images for an article’s illustrations).

* **ReasoningBank & Petri**: Media generation tasks are routed by the ReasoningBank’s strategy memory to the best provider. The system tracks prior outcomes (quality, speed, cost) from each model vendor for similar tasks – e.g. whether Runway or Veo performs better for “talking head video vs. cinematic b-roll” – and uses that data to choose a provider for a new generation request. Petri provides adversarial test packs for generation (to catch prompts that lead to bad artifacts or license issues) and gates model promotions. Budgeting and timeouts are also enforced at this level to avoid runaway costs.

* **AuthForge**: Any sensitive operation (like using certain provider APIs or exporting a watermarked final cut) can be protected by AuthForge’s policy enforcement point. Roles like `media.operator` or permissions like `media.export` are checked before MediaForge executes those actions. In particular, publishing-grade exports might require a multi-factor step-up auth per policy.

**Quality & Security (“Truth Fences”):** MediaForge employs objective acceptance criteria on all outputs, enforced via receipts in the QC steps. Some key **truth fences** for media: allowed codecs and containers (per preset policy), correct color space tagging (e.g. no mismatched HDR metadata), loudness within standard range (e.g. integrated LUFS near –14 for web audio) and no clipping beyond true-peak limit, bitrate not too low for the resolution (to avoid excessive compression artifacts), no long black frames or frozen video, A/V sync error less than a frame, captions covering \>95% of spoken words with no overlaps and acceptable readability, and watermark/provenance presence if required by content policy. Any *red* category failure triggers quarantine of the asset (it cannot be marked final), *amber* warnings require either automated fixes or explicit waivers via Tripwire policy, and *green* means all clear for release. Every QC run produces a Receipt detailing each check’s outcome for auditability. Additionally, **safety filters** (NSFW content detection, PII detection, copyright risk checks) are applied to generated content – these might mark the asset with risk flags or require interventions via Tripwire if something borderline is produced.

**Observability:** Besides the VizForge dashboards mentioned, MediaForge is instrumented to produce receipts at every step (each generation, transform, QC and export yields a structured log). These receipts feed into the graph and can be queried to answer questions like “how often do we see loudness warnings on videos exported for TikTok preset” or “which model produced asset X and was it watermarked”. The **Nx workspace** integration ensures deterministic tasks (like a given transform graph on the same inputs) are cached across runs to speed up builds, whereas evidence-producing tasks (like analysis) are always executed fresh (but their results are stored). MediaForge’s Nx `project.json` defines targets like `gen`, `fx`, `qc`, and `export` that map to running those operations with caching logic (only pure generation with identical seeds and specs can be cached; QC is never cached). Logging includes usage metrics (e.g. tokens or credits used on external APIs), and cost per minute per provider is tracked to help optimization.

### **Implementation Plan (MediaForge)** {#implementation-plan-(mediaforge)}

**Milestone 1: Core Media Transform & QC Engine**

* **Task 1.1: Define Media Contracts** – Create `packages/protocol/src/media.ts` with `MediaPassport`, `GenSpec`, `TransformGraph`, and `ExportPreset` types as specified. This provides the schema for media metadata, generation requests, filter graphs, and presets. Ensure TypeForge validations for these (e.g. allowed codec strings, container enums).

* **Task 1.2: Implement TransformGraph Compiler (`media.fx.mcp`)** – Develop the transform pipeline: parse a `TransformGraph` JSON into a sequence of FFmpeg (or equivalent) commands. Implement support for a core set of operations (e.g. trim, concat, scale, reframe with smart cropping, fps change, basic color adjust, audio loudness normalize, overlay image/text, encode). Each operation’s parameters must be validated against policy (e.g. resolution limits, allowed pixel formats). On execution, generate an artifact (file) and a Receipt logging the operation chain and timing.

* **Task 1.3: Implement QC Analyzer (`media.qc.mcp`)** – Build the quality check module that runs ffprobe or custom analyzers on a media file and computes all the objective metrics listed (black frame sequences, freeze frames, RMS loudness and peak, etc.). Map each metric to a pass/fail threshold or warning range. The result should be packaged into a Receipt with a summary verdict (pass/fail) and details for each check. Integrate with MediaPassport status: if any check is fatal, update the passport’s status to “quarantine”.

* **Task 1.4: Receipt & Passport Integration** – Whenever a transform or QC completes, have the service update or create a MediaPassport entry (in Metadata/graph) and emit a Receipt. Ensure the `receipts` list in the passport is appended, and for QC, apply any `risk_flags` or `status` changes (e.g. add “hdr-incorrect” flag, mark status quarantine on fail). Implement `media.export.passport()` to stamp or retrieve the current passport of an asset.

**Milestone 2: Caption and Subtitle Support**

* **Task 2.1: ASR Transcript Extraction (`media.captions.mcp`)** – Implement `transcript.extract` using an ASR engine (e.g. Whisper). If a given media has an associated LyricsForge transcript (i.e. known script), call LyricsForge’s alignment to get timings instead. Otherwise, perform speech-to-text on the audio track. Output the raw text and also generate a time-coded SRT (or LRC for lyrics) file. Store this caption file via FileForge and return its file\_id in the result.

* **Task 2.2: Caption Attachment and Burning** – Implement `captions.attach` to either attach a sidecar caption file or mux it into the media container (for formats that support closed captions). Also implement `captions.burn` to render subtitles onto video frames. This likely uses the TransformGraph under the hood (e.g. a filter that burns subtitles with a given font). Both operations produce new MediaPassports (for the muxed or burned variant). Ensure coverage metrics: e.g. after attaching, run a check that captions cover \>95% of audio speech, otherwise flag a warning (this ties into truth fences).

* **Task 2.3: LyricsForge Integration** – In the caption pipeline, integrate with **LyricsForge** for musical media. E.g., if a video or audio has a known song structure and lyrics text, use `lyrics.align` (via `align.mcp`) to precisely align lines to timestamps. Fetch the resulting SRT from LyricsForge and attach it to the media passport (ensuring no duplicate effort running ASR). Also, ensure the QC `caption_coverage` check uses either the ASR or the LyricsForge output to compute the coverage percentage.

**Milestone 3: External Provider Integration for Generation**

* **Task 3.1: Provider Adapter Stubs** – Set up the structure for external providers under `packages/media-providers/` (for example, modules like `runway.mcp`, `midjourney.mcp`, etc.). Implement at least one or two initial adapters: e.g. a **Runway** video generation call and a **StableDiffusion** or **Midjourney** image generation call. Use official APIs or SDKs where possible; for any that require browser automation or scraping, ensure to wrap calls with Tripwire checks (possibly marking them experimental). Each adapter should translate the provider-agnostic GenSpec into the specific API call and return either the raw file or a URL which can be fetched. Log model version, cost, and seed information into the Receipt.

* **Task 3.2: media.gen Routing Logic** – Implement logic in `media.gen.mcp generate` to choose a provider if not explicitly specified in the GenSpec. Use ReasoningBank data: for instance, design a simple strategy where each GenSpec (image vs video, content type gleaned from prompt) maps to a preferred provider unless overridden. This may involve a table of provider capabilities and an algorithm to pick one with highest expected quality given budget. Also integrate Petri tests for certain known failure modes (like too large resolution might cause some provider to fail – have Petri simulate and choose alternate if needed).

* **Task 3.3: Receipts & Cache for Generation** – When generation tasks complete, store the resulting media via FileForge (getting a file\_id and content hash) and create a MediaPassport for it. Include in the generation Receipt details like provider name, model, version, any prompt engineering done, random seed used, and cost/time. Implement caching for idempotent generation: if the same provider, prompt, and seed are used, and provider guarantees deterministic output, we can short-circuit and reuse the prior result (as long as it’s stored and accessible). Use Nx caching keyed by the hash of GenSpec \+ seed for those providers known to be deterministic given a seed.

**Milestone 4: Export Presets and Finalization Workflows**

* **Task 4.1: Define ExportPresets and Policies** – Create a registry (e.g. JSON files or code constants) for common `ExportPreset` definitions. Examples: `export_web_1080p` (MP4 H.264 1080p, AAC audio, target \-14 LUFS), `export_mobile_9x16` (vertical 9:16, possibly lower bitrate, burned-in captions), etc. Each preset includes constraints that must be validated (via QC) post-encode. Link these presets with SocialForge’s channel requirements (e.g. “YouTube short” preset, “Instagram post” preset) so SocialForge can request a specific preset and MediaForge knows what to do.

* **Task 4.2: Implement `media.export`** – In the `media.export.mcp export(...)` method, take the target preset and either a file or a transform graph reference. If a graph id is given, it implies we should run the transform pipeline first (if not already done) to get a file. Then apply encoding: map the preset’s parameters (codec, resolution, etc.) into FFmpeg encode settings. After encoding, run `media.qc.analyze` on the result to ensure it meets all preset criteria (this doubles as final gate). Attach C2PA signature or watermark if preset or policy demands it (these might be flags in the preset, e.g. `requires_provenance: true`). Save the final file to FileForge, update the MediaPassport (status to “final”, add receipts), and if all good, mark it ready.

* **Task 4.3: Platform Handoff Prep** – For each export, gather any sidecar files that SocialForge or others will need. E.g., if exporting a video, ensure a thumbnail image is generated (could use `thumbnail()` on a frame) and stored; ensure any caption files are linked. MediaForge should populate the MediaPassport with references to these (e.g. `passport.media_ids` listing file ids of associated thumbnails or caption files) so that SocialForge can easily retrieve them for publishing. Validate things like aspect ratio and duration against channel limits (SocialForge does secondary validation but MediaForge can embed known constraints – e.g. short video \< 60s).

**Milestone 5: Observability & Governance Enhancements**

* **Task 5.1: Dashboards for Media QC** – Using VizForge, create a couple of initial visualization specs to monitor MediaForge outputs. For example, a **QC Failure Heatmap** chart showing counts of each QC check failure (black frames, loudness issues, etc.) over time, and a **Loudness vs Bitrate scatter plot** to verify outputs cluster around desired ranges. Implement a small service or Nx target to regenerate these charts (via `viz.mcp render`) periodically or on demand, and attach them to relevant PRs or the Observatory UI.

* **Task 5.2: Policy Enforcement Hooks** – Integrate AuthForge and Petri for sensitive actions. Add checks in `media.gen` and `media.export` such that, for example, if a user without the “media.publisher” role attempts an export that is intended for public release, AuthForge’s PDP is consulted. Similarly, wire Tripwire so that if certain risky conditions occur (e.g. NSFW content flagged by QC), it can automatically quarantine or require a higher approval (Tripwire quorum to override). Test these flows with a policy pack (e.g. a default rule that all outputs must have a watermark for external use – try violating it and ensure Tripwire logs a warning).

* **Task 5.3: Caching & Performance Tuning** – Finalize Nx caching for MediaForge tasks. Ensure that `media.fx` and `media.gen` tasks cache hits work (e.g. identical filter graph and inputs yields same output hash, skip re-run), and that `media.qc` tasks are always executed (cache disabled). Setup Nx Cloud for distributed execution of heavy jobs (like parallelizing multiple `media.gen` calls if a batch generation is needed). Also implement a small **ReasoningBank feedback job**: on a schedule, analyze receipts to adjust provider routing weights (if one provider consistently faster or higher quality, update its priority for future tasks).

---

## **SocialForge** {#socialforge}

### **Purpose & Responsibilities** {#purpose-&-responsibilities-1}

**SocialForge** serves as Entif’s *bidirectional interface to social media platforms*. It provides a single governed pipeline for publishing content to multiple platforms and for ingesting interaction data back from those platforms. SocialForge’s responsibilities include: **Scheduling and publishing** posts (text, images, videos, links, etc.) across platforms like Reddit, LinkedIn, Facebook, YouTube, Instagram, TikTok, X (Twitter), etc., via a unified API; **Ingesting analytics** (views, likes, watch time, etc.) and consolidating them for analysis; **Handling conversations** by pulling comments, mentions, and direct messages and enabling responses or moderation; and **Optimizing content strategy** by running experiments (A/B tests on post content or timing) and recommending best posting times or content variants. In effect, SocialForge abstracts the differences of each social network behind a receipts-bearing, policy-controlled service so that Entif can post content widely, consistently enforce governance (like not violating platform policies), and learn from audience engagement.

### **Architecture & Components** {#architecture-&-components-1}

**Interfaces (Common MCP Facade):** SocialForge exposes a **common MCP facade** (`social.*`) that provides platform-agnostic operations, and delegates platform-specific details to internal **adapter MCPs** for each social network. The major facade interfaces include:

* **Authentication & Channel Management** – `social.auth.mcp`: Methods to connect and manage social accounts (channels). For example, `connect(platform, scopes) → ChannelPassport` initiates an OAuth2/OIDC handshake for the given platform and stores the resulting tokens (securely via AuthForge’s vault), returning a standardized ChannelPassport record. `status(channel_id) → ChannelPassport` checks if a channel’s auth is still valid (and refreshes tokens if needed). The **ChannelPassport** stores info about the social account: platform identifier, handle, granted permissions (e.g. post, read, analytics), rate-limit bucket info, and connection status. This uniform representation allows SocialForge to treat different platform accounts similarly.

* **Composition & Validation** – `social.compose.mcp`: High-level content preparation. `normalize(post_spec) → PostSpec` will take a user’s intended post specification and adjust it to each platform’s requirements (e.g. truncating text if over length, splitting a thread into multiple tweets). `validate(post_spec) → Receipt` runs all truth-fence checks on the draft post *without actually publishing*. This includes ensuring the content meets length limits, has required fields (like alt text for images), uses allowed media formats (via MediaForge presets), etc. `preview(post_spec) → { images | html }` can generate a preview of how the post will look (rendering a snippet of HTML or an image), to safely review formatting.

* **Scheduling & Publishing** – `social.schedule.mcp` and `social.publish.mcp`: The scheduling interface includes `schedule(post_spec) → PostPassport` which schedules a post for future publication (queuing it internally). It returns a PostPassport which includes the assigned `post_id`, platform, channel, and scheduled time. There’s also `cancel(post_id)` to abort a scheduled post. The publishing interface has `publish_now(post_spec) → PostPassport` for immediate posting (bypassing the scheduler). After publishing, `thread_append(post_id, body/media) → Receipt` allows adding to an existing thread (like replying to one’s own tweet). The **PostPassport** records details of each post: it ties to a Channel, holds the platform’s native post ID/URL if published, timestamps (scheduled and published), references to any media file IDs used, and an array of receipts for the plan/compose/validate/publish steps. Status transitions from “draft” to “scheduled” to “published” (or “failed/quarantined” if something went wrong) are also tracked. Internally, the scheduler ensures idempotency by deriving a unique key for each scheduled post (based on normalized content hash \+ scheduled time) to avoid duplicates.

* **Analytics & Feedback** – `social.analytics.mcp`: Endpoints to retrieve performance data. `ingest(channel_id or post_id, since?) → AnalyticsSeries` triggers a pull of analytics data from the platform (for a channel overall or a specific post). SocialForge either calls the platform’s API (like YouTube’s analytics API, etc.) or uses stored webhooks data. The returned **AnalyticsSeries** contains time-series metrics (impressions, views, likes, shares, etc.) with a given granularity (hourly, daily). For platforms that support push, `subscribe.webhooks(channel_id, events[])` sets up webhooks for events like new comments, letting SocialForge get real-time updates without polling. All ingested data is recorded with receipts to verify authenticity and timing of pulls. SocialForge normalizes these metrics into a common schema so that, for example, “likes” on Facebook and “favorites” on X are both mapped into a `reactions` count, etc. while preserving raw fields as needed.

* **Inbox & Interaction** – `social.inbox.mcp`: Interfaces to manage comments and direct messages. `comments.list(post_id, since?) → Comment[]` will fetch new comments or replies on a given post. Comments are represented in a common **Comment** format (with an id, the post it belongs to, author handle, text, timestamp, sentiment tag, etc.). Similarly, `comments.reply(comment_id, text) → Receipt` lets Entif respond to a comment thread. For direct messages, `dm.list(channel_id, since?) → DirectMessage[]` and `dm.send(channel_id, peer_handle, content) → Receipt` cover reading and sending DMs where platforms allow. SocialForge applies content safety checks to outgoing replies as well (making sure automated replies don’t violate policies). Incoming messages can be run through sentiment analysis and topic classification (with help from Glyph/GraphRAG) and tagged for follow-up.

* **Optimization & Experiments** – `social.optimize.mcp`: A specialized interface for growth-hacking features. `experiment.plan(spec) → arms` allows defining an A/B test or multi-armed bandit experiment for a post (e.g. different titles, thumbnails, or hashtags). The **ExperimentSpec** includes what factors to vary (multiple titles, different tag sets, different posting times, etc.) and the success metric (CTR, 24-hour view count, etc.). Once planned, `experiment.allocate(exp_id) → {arm, schedule_slot}` will pick the next variant to deploy (using a strategy like Thompson Sampling or Epsilon-Greedy as specified). After running for a while, `experiment.evaluate(exp_id) → findings` will update the bandit’s beliefs and possibly declare a winner to use going forward. SocialForge also has `best_slot(channel_id, horizon_days) → slots[]` which leverages historical engagement data (from ReasoningBank) to suggest the best times to post for the next horizon days. This encapsulates the learned “when to post” optimization.

* **Trends & Insights** – `social.trends.mcp`: (This is more analytical.) It provides queries like `sentiment.timeseries(post_id or channel_id)` to get how sentiment on comments evolves, `topic.mining(channel_id, horizon)` to cluster recent content or comments into topics (leveraging GraphRAG and Glyph to identify themes), and `hashtag.reco(post_spec) → tags[]` to recommend hashtags based on content and trending topics (language model \+ region trends).

**Platform Adapters:** For each supported social platform, there is an adapter MCP (e.g. `reddit.mcp`, `linkedin.mcp`, `facebook.mcp`, `youtube.mcp`, etc.). These adapters implement a uniform interface – likely methods like `compose`, `publish`, `schedule`, `analytics.pull`, `comments.list/reply`, etc., analogous to the facade, but for that platform’s API. The job of an adapter is to **translate** the common PostSpec or other request into the platform-specific API calls and data formats. For example, the Twitter/X adapter might break a PostSpec with a long body into a thread of tweets (if `kind = thread`), handle uploading media via the platform’s media endpoints, then compose the final statuses. The YouTube adapter when scheduling a video will call YouTube’s APIs to upload the video file (retrieving it from FileForge by file\_id), set title/description/tags, etc. Each adapter also deals with platform-specific constraints: e.g. allowed video aspect ratios, max length of text, whether edits are allowed after posting, how rate limiting is handled (exponential backoff on HTTP 429s, etc.). They produce receipts in the same format as the facade would, enriched with any platform response IDs or error details. By design, SocialForge’s facade calls these adapters and never calls external APIs directly except through them. This makes it easy to add or update support for new platforms by working within the adapter interface.

**Data Models:** We already touched on ChannelPassport, PostSpec, PostPassport, AnalyticsSeries, Comment, DirectMessage, ExperimentSpec. These define the shape of data across the pipeline. A few noteworthy aspects: The **PostSpec** can include composite content like carousels or threads (an array of sub-posts) and platform overrides for fine tuning (if a user wants to tweak a specific field for one platform). It also can specify scheduling policy (like “exact time” vs “best slot” which delegates the exact scheduling to SocialForge’s optimizer). **AnalyticsSeries** may include dimension breakdowns (e.g. by geography or device) where platforms support it. **Comment** objects might have a sentiment field precomputed (pos/neg/neutral) and flags like “toxicity” or “spam” if detected. This helps determine which comments need escalation or filtering. SocialForge likely uses external NLP (GraphRAG or a toxicity model) to tag these incoming comments. **ExperimentSpec** defines multiple variations (arms) of certain post attributes to test, and SocialForge then automates trying them in rotation until one is statistically better.

**Integration Points:** SocialForge interacts with almost every other part of the Entif system:

* **MediaForge**: Social posts often include media, so SocialForge relies on MediaForge to provide properly formatted and optimized media for each platform. SocialForge validates that any attached media meets the platform’s requirements (dimensions, duration, file size) – it uses the MediaPassport and preset info for that. For example, if a PostSpec includes a video media\_id, SocialForge will check that video’s passport against the target platform’s known specs (say TikTok requires 9:16 vertical, under 60s, etc.). If it doesn’t conform, SocialForge can either reject the post or even trigger MediaForge to produce a variant (e.g. generate a thumbnail or re-encode). This interplay ensures no post with incompatible media is attempted. Also, any thumbnails or captions needed are generated upstream by MediaForge (SocialForge just fetches them by ID).

* **FileForge**: All media files (images, videos) and even large text attachments are stored CAS in FileForge. SocialForge never handles raw file uploads to platforms directly; instead, it streams from FileForge. For instance, during publish, the adapter will call `file.get(file_id)` to retrieve the binary and then call the platform API. This means SocialForge benefits from FileForge’s virus scanning/quarantine – it will not post something marked quarantined. The ChannelPassport also includes rate-limit buckets which might be persisted via FileForge or a small database, but all actual file content remains in FileForge.

* **ArchiveForge**: Every time SocialForge publishes a post, it creates an **Archive Manifest** that captures exactly what was posted, where, and the evidence around it. This would include the PostSpec (fully resolved with any overrides), the final payload (text and media references), the platform response (post ID), and all relevant receipts (validation receipt, publish receipt, etc.). ArchiveForge can store these as capsules so that we have a historical ledger of all social content pushed – enabling replay or audit. In case of a content takedown or an incident, the manifest can be replayed in a sandbox to verify what was done.

* **MetadataForge**: For each social channel and post, descriptors are registered. For example, an entif `social/channel/{id}` node for each linked account, with attributes like platform, handle, and permissions. Also a `social/post/{id}` node for each piece of content, with edges to the Media items it used, or the Article it was derived from. This means we can query the graph for questions like “find all posts that used a specific media asset” or “which article did this LinkedIn post come from.” MetadataForge also can auto-generate documentation – e.g. an operator guide might be created that describes how posts flow from ArticleForge to SocialForge with receipts, using these descriptors as content.

* **VersionForge**: Platform API quirks and presets are versioned. SocialForge likely keeps a repository of **capability descriptors** for each platform (JSON files enumerating what each platform supports: max lengths, media formats, API features) and these are version-controlled. When a platform changes (say Twitter increases max tweet length), updating that descriptor and bumping its version via VersionForge allows the system to detect if certain content specs are now invalid or need migration. Also, any changes to SocialForge itself (like new fields in PostSpec) follow semantic versioning to not break automations. SocialForge publishes **policy packs** as well (like default content policy rules), versioned and rolled out carefully.

* **VizForge**: SocialForge provides the data for a lot of business KPIs, which VizForge will visualize. Dashboards include per-post performance (e.g. view velocity curves over the first 24h of each video), retention charts (for videos, if available via platform APIs), engagement over time by channel (to detect growth or decline), sentiment trends for comments, and perhaps publishing cadence vs engagement heatmaps. Experiment results are also shown – e.g. a chart might compare the performance of A vs B variants. All these charts are generated as VizSpec and rendered by viz.mcp, often attached to weekly reports or PRs for strategy changes. SocialForge itself might also send important alerts (like “rate limit nearing for Twitter API”) which would go through ops channels.

* **ReasoningBank & Automation Agents**: The data SocialForge gathers (analytics, trends) feeds back into AI agents (Coach, Muse, etc.) that refine content strategy. For instance, **Coach** might notice that posts at 7pm outperform those at noon for a channel and update the scheduling policy accordingly. The **Heretic** agent could use SocialForge’s data to propose trying a new platform or a new content format if engagement plateaus. Also, automated reply suggestions for comments are generated by a ROMA/LLM pipeline but SocialForge executes them only if safe (Tripwire ensures, for example, no auto-reply is sent to a toxic comment). SocialForge essentially acts as the execution arm for these higher-level strategies, always with governance in place.

* **AuthForge**: SocialForge operations are protected by AuthForge policies as well. For example, only users with a `social.publisher` role may actually call `publish` on a channel. Each channel resource can have ACLs (so maybe certain users can post to Twitter account A but not B). These are enforced by injecting AuthForge’s PDP checks in the SocialForge flows. Also, OAuth tokens for the platforms are treated as secrets; AuthForge/Vault stores them and rotates if needed. When SocialForge needs to use a token, it pulls from AuthForge’s vault just-in-time, reducing exposure. Rate limiting decisions might also be guided by AuthForge risk policies (e.g. if a channel sees an unusual spike in posts or logins, require re-auth or admin review).

**Quality & Governance Checks:** SocialForge has its own set of **truth fences** that apply to any post at compose/validate time. These include: **content form and limits** – ensure titles, bodies, and tag lists do not exceed the platform’s maximum lengths, that required components (like alt text for images or UTM parameters for outbound links) are present. **Media conformance** – verify that any attached media matches the platform’s required specs (dimensions, aspect ratio, duration, bitrate, etc. as defined in the linked MediaForge export preset for that platform). If a video doesn’t match, that’s a red flag (block) because the platform may reject it. **Captioning requirement** – for platforms (like some short-video apps) where captions are mandatory or strongly recommended, check that captions are attached or the video has subtitles burned in. **Mentions and tags resolution** – verify that any `@mentions` in the post actually correspond to valid user handles on that platform (the adapter can attempt to resolve them via API or preconfigured mapping). If a mention can’t be resolved, either strip it or mark with a warning. **Scheduling sanity** – ensure scheduled times are not in the past, and if the user asked for “best slot”, replace that with an actual computed time (and note the decision in a receipt). **Rate limit check** – simulate the API consumption of the action and verify the channel’s rate-limit bucket has room; if we predict hitting a limit, flag it (or delay automatically). **Platform policy safety** – run the content through safety filters for things like hate speech, personal data, or whatever each platform forbids. SocialForge can have per-platform rule packs (e.g. a list of banned words on that platform) and use content classification (via Glyph or external classifiers) to label a post. If risky, it can either quarantine or require a manual review (Tripwire escalation). **Provenance and attribution** – if the post includes media generated by AI (MediaForge) or text from an ArticleForge piece, check that attribution or provenance markings are present if required by policy (e.g. “\#GeneratedMedia” hashtag or proper credit to sources). All these checks produce a validation Receipt; *red* conditions block scheduling/publishing (the post stays in draft or gets a quarantine status), *amber* might allow scheduling but with a warning and requiring perhaps admin waiver, *green* means all clear to post.

For incoming data (comments/DMs), SocialForge also enforces governance: e.g. **auto-replies** will not be sent to certain categories of comments like legal questions or highly toxic messages – Tripwire rules explicitly forbid automated engagement on those, ensuring a human steps in.

**Scheduling & Delivery:** Under the hood, scheduled posts are handled by an internal job queue. Each platform likely has a dedicated queue with concurrency controls (most platforms require sequential posting on a given account to avoid rate issues). SocialForge’s scheduler service dequeues jobs at the appropriate time and calls the adapters to publish. It uses ADK’s orchestrator patterns – for example, a typical automated workflow might be: `compose.normalize → policy.check → media.conform → validate → schedule` as a sequence. Idempotency keys are generated to ensure if the scheduler crashes and restarts, it doesn’t double-post the same content; using (channel, normalized content hash, scheduled\_at) is a robust key. Rate limiting is carefully managed: SocialForge tracks tokens (requests allowed per time) for each channel in the ChannelPassport and will delay jobs or batch them according to refill rates. If an API responds with a 429 Too Many Requests, the adapter reports that via Receipt, and the job is rescheduled with backoff (and possibly flagged amber). The scheduling respects timezones – a PostSpec can specify a timezone for “post at 10am EST”, the system stores UTC internally but the UI or receipts reflect the local intended time for clarity.

**Analytics Ingestion:** SocialForge either periodically pulls analytics (e.g. every hour for fresh posts, daily for older posts) or receives them via webhooks. **Pullers** use platform APIs, often providing `since` cursors so that only new data is retrieved. They are rate-limited to not exceed quotas (some platforms have daily quotas for analytics calls). **Webhooks** are set up for immediate events where supported (like receiving a webhook when a YouTube video gets a comment or a live count update). Data normalization is important: each adapter translates platform-specific metrics into the unified AnalyticsSeries keys. Any metrics that don’t fit the known schema can be put into a generic key-value in `dimensions` or `values` so they aren’t lost. Derived metrics (like engagement rate \= (likes+comments)/impressions, or average view duration, etc.) are computed once data is in. The data is stored likely in a time-series database or appended to GraphRAG as nodes (with edges like `(:Post)-[:MEASURED_BY]->(:AnalyticsSeries)` linking the post to its metrics). ReasoningBank agents use these to adjust strategy (e.g. what tag improved CTR). SocialForge also triggers updates to VizForge for dashboards (maybe updating charts of performance over time).

**Inbox & Moderation:** The SocialForge “inbox” aggregator collects comments and messages across platforms. It deduplicates them and can push them into a unified queue for an operator to review or an AI to analyze. It marks each comment with sentiment (positive/neutral/negative) and perhaps topics via Glyph tagging. It applies rules: e.g. if a comment has certain keywords, mark for escalation (like a comment that looks like a legal threat could create a ticket in an internal system). The auto-reply feature, when enabled for a channel, uses ROMA decomposition to generate a few candidate replies (e.g. helpful, friendly, humorous tones) for a comment. These go through Tripwire checks (no PII, not replying if the comment is abusive or sensitive). Only if it’s a benign query (“Great product\!”) might an auto-reply be posted, and even then likely only if confidence is high and possibly after human approval unless fully autonomous mode is allowed. This ensures engagement without missteps.

**Optimizations:** SocialForge implements content experiments via bandit algorithms. For example, if an ExperimentSpec defines two possible titles for a LinkedIn post, SocialForge might initially post the content with title A to a subset of the audience (if platform allows or by quick post/delete cycles, though many platforms don’t allow A/B natively – in such cases, perhaps try A on day1 and B on day2 for similar content and compare). The `experiment.allocate` uses the chosen bandit strategy to pick which variant to try next. Over a defined horizon (say 24 hours or a certain number of impressions), `experiment.evaluate` collects the results (via analytics ingest) and decides a winning variant which then is either used going forward or used to adjust the content strategy for new posts. Best slot recommendation is another optimization: it uses historical data (extracted via GraphRAG from prior post performance by hour of day/day of week) to suggest when the audience is most active. SocialForge could integrate with ReasoningBank to continuously update these suggestions as more data comes in.

Security and compliance are a big part of SocialForge as well: it uses **OAuth 2.1 with PKCE** for connecting accounts (so it never handles user passwords for those platforms), stores refresh tokens encrypted, and respects privacy (if a user asks to disconnect a channel, tokens are wiped). SocialForge also implements **GDPR/CCPA compliance** for personal data it stores – e.g. it can delete or anonymize stored comments or DMs on request, and it honors “right to be forgotten” signals by purging data from GraphRAG if needed.

### **Implementation Plan (SocialForge)** {#implementation-plan-(socialforge)}

**Milestone 1: Unified Posting Facade and Core Adapters**

* **Task 1.1: Define Social Protocol Models** – Create `packages/protocol/src/social.ts` containing `ChannelPassport`, `PostSpec`, `PostPassport`, `AnalyticsSeries`, `Comment`, `DirectMessage`, `ExperimentSpec`, etc., based on the structures outlined. Include enumerations for supported Platform identifiers and PostKind (text, image, video, etc.). This will standardize data exchanged between facade and adapters.

* **Task 1.2: Implement SocialForge Facade MCP** – Build `packages/social-forge` service with the common methods: `auth.connect/status`, `compose.normalize/validate/preview`, `schedule.schedule/cancel`, `publish.publish_now/thread_append`, `analytics.ingest/subscribe.webhooks`, `inbox.comments.list/reply`, `inbox.dm.list/send`, `optimize.experiment.plan/allocate/evaluate`, `optimize.best_slot`, and `trends.*` queries. Initially, stub out each method to call into a yet-to-be-written adapter or return a NotImplemented if not critical. Focus on making `publish_now` and `schedule` functional first, using a simple internal queue for scheduled posts. Ensure all facade methods perform input validation and immediately return a Receipt or standardized object, even if just stubbed.

* **Task 1.3: Develop Two Adapters (YouTube and LinkedIn)** – As a proof of concept, implement adapters for two distinct platforms (one video-centric, one text/professional). In `packages/social-adapters/youtube`, implement at least `publish` (upload video via YouTube Data API, set title/description/tags from PostSpec), `schedule` (YouTube supports scheduled publishes, use that feature via API if possible), `analytics.pull` (retrieve video stats), and `comments.list/reply` (YouTube API for comments). In `packages/social-adapters/linkedin`, implement `publish` (LinkedIn API to share an article or post with image), `schedule` (LinkedIn might not support scheduling natively – we simulate by delaying publish until time), and basic analytics (LinkedIn API for share statistics). Both adapters should translate the PostSpec into platform-specific calls: e.g. map PostSpec.body to LinkedIn’s `text` field, attach media by uploading via their media endpoints, etc.. Also handle platform auth by using tokens from ChannelPassport (we’ll have stored these in AuthForge/vault). Each adapter method logs a Receipt with the platform’s response IDs or error codes for traceability.

* **Task 1.4: Channel Connection Flow** – Implement the OAuth flow for adding a new channel: likely involve a web UI redirect to the platform’s consent page. In absence of UI here, create a CLI or stub that accepts an OAuth callback. The `social.auth.connect` MCP will generate the correct authorize URL (with scopes from input) and perhaps store a temporary state. Handle the callback by exchanging code for token and storing the token (via AuthForge’s secret storage or a secure DB). After connecting, create a ChannelPassport record and save it (persist in a SocialForge database or Graph node). Also implement a background refresh mechanism for tokens if they expire, e.g. on a schedule or when `social.auth.status` is called and finds `expires_at` near. Ensure to request enough scopes (post, read, analytics, etc.) for full functionality.

**Milestone 2: Analytics, Dashboards, and Presets**

* **Task 2.1: Analytics Ingestion Service** – Set up an `analytics.pull` job that runs periodically (perhaps an Nx target `social:analytics:pull`) to gather metrics for recent posts. Implement `social.analytics.ingest` such that if called for a channel, it pulls channel-wide stats (followers gained, etc.), and if for a post, it pulls that post’s stats. For push events, implement minimal webhook handling: for platforms that support it (e.g. Facebook’s webhooks for comments), provide endpoints that can receive and translate those events into internal Comment or DM objects, then store or process them.

* **Task 2.2: Unified Analytics Store** – Design a simple storage for AnalyticsSeries, perhaps just as JSON stored via ArchiveForge or in a database keyed by post and date. Alternatively, integrate with GraphRAG: push each daily summary as a node or attach as properties on Post nodes. Implement some logic to compute derived metrics after ingestion (e.g., compute engagement rate \= comments+shares+reactions divided by impressions, store it in the series). This task ensures the data is available for VizForge.

* **Task 2.3: Basic Social Dashboards (VizForge)** – Using VizForge, create at least two charts: (a) **Views Velocity** – for a selected post, plot cumulative views over time (e.g., hours since publish on x-axis, views on y-axis) to visualize its growth. (b) **Best Slot Heatmap** – a heatmap for a channel showing engagement rate by day-of-week and hour-of-day (using historical data), to guide posting times. Implement a mechanism (maybe an Nx target `social:viz`) to generate these charts from the stored analytics. Tie them into receipts or a simple UI.

* **Task 2.4: Social Presets & Limits** – Create a configuration file or module `packages/social-presets` that codifies each platform’s constraints: max characters for body, max hashtags, supported media types and their required aspect ratios, etc.. Also define platform-specific **ExportPresets** referencing MediaForge, e.g. `entif://export/yt-short-9x16` or `entif://export/ig-photo`. SocialForge will use these to validate media and to instruct MediaForge what format to produce. Put these presets under VersionForge control (e.g. versioned JSON files) so updates can be tracked.

* **Task 2.5: Documentation & Operator Guide** – Using MetadataForge, ensure each MCP method and platform adapter has descriptors. Then create an auto-generated guide (via `metadata.mcp export.docs`) that includes how to onboard a channel, how posting is done, etc., drawn from these descriptors. Also document any default policies (like the truth fences in content validation). This will be useful for internal training of operators or for AI agents referencing how to use SocialForge.

**Milestone 3: Conversation & Inbox Management**

* **Task 3.1: Comment/DM Sync Jobs** – Implement periodic tasks (Nx target `social:inbox:sync`) that call `comments.list` for recent posts and `dm.list` for connected channels. For each channel, maintain a cursor (e.g. last comment timestamp) to fetch new ones only. Store comments in a simple table or in GraphRAG with relationships to the post and maybe to a user node for the commenter. For DMs, similarly fetch new messages since last check. Mark duplicates or already seen messages to avoid processing twice (the adapter can use unique comment IDs to filter). Deduplicate cross-posted comments (unlikely but just in case e.g. if a bot posts same comment on multiple platforms).

* **Task 3.2: Sentiment & Topic Tagging** – After fetching new comments, run them through a sentiment analysis function (could use an open-source model or an API, or even Entif’s own NLP pipeline). Tag each Comment with `sentiment: pos|neu|neg` and if possible, a simple topic classification (maybe using Glyph embeddings to cluster or label e.g. complaint, question, praise). Store these tags in the comment object. They will be used for moderation (negatives might require quicker responses) and for training the best content (if many negatives about a feature, that’s insight).

* **Task 3.3: Auto-Reply Suggestion** – Implement a function `reply.suggest(comment_id) → suggestions` in the SocialForge logic (or as part of `social.inbox` maybe) that uses an AI (possibly chain through ReasoningBank/ROMA) to generate a few candidate replies to a comment. For now, this can call a GPT-based service with a prompt that includes the comment text and asks for 2-3 possible replies in a certain tone. Tag each suggestion with a tone label (e.g. “friendly”, “professional”, “humorous”). Do **not** auto-send; just store suggestions linked to the comment.

* **Task 3.4: Safe Reply Gatekeeper** – Implement Tripwire checks before any automatic comment reply is actually posted. E.g., if comment contains any **flags** (“harassment”, “spam”, “legal”) which we can define patterns for or get from an AI classifier, then disable auto-reply entirely for that comment. If suggestions themselves contain any disallowed content (maybe unlikely if the AI is guided, but check for things like it accidentally promising something or using banned phrases), filter those out. This likely uses Petri test cases (simulate a toxic comment and verify the system does *not* auto-respond).

* **Task 3.5: Escalation & Moderation** – Define rules for escalation: e.g., if a comment has negative sentiment \+ contains specific keywords (like “cancel” or “sue”), automatically create a task/ticket for a human moderator. We can integrate with an internal ticket system or simply log an alert. Implement logic to tag such comments as requiring attention (maybe mark as `flags: ["escalate"]` in the Comment object). Also implement a simple action to hide or delete a comment (if platform API allows and if decided by moderator) – e.g. `comments.hide(comment_id)` calling the platform adapter’s moderation API.

**Milestone 4: Optimization & Experimentation**

* **Task 4.1: Implement Experiment Workflow** – Flesh out `social.optimize.experiment.plan` / `allocate` / `evaluate` using a basic multi-armed bandit. For now, you can implement a simple epsilon-greedy or Thompson Sampling manually. Plan: store the ExperimentSpec (with variants of content) in a small in-memory or DB structure, initialize counts and success metrics for each arm. Allocate: pick an arm (maybe the one with highest UCB or a random one with probability epsilon) and schedule a post with that variant. This will likely call back into `schedule(post_spec)` internally for each variant, at different times or with audience segmentation if possible. Evaluate: after some time, collect analytics from those posts (which you can find via their PostPassport linked to the experiment) and compute which variant did best on the success metric (e.g. highest 24h views). Then mark that variant as the winner in a result object. This task may be complex if done fully, so as a first slice, implement A/B for posting time: e.g., schedule identical posts at two different times and compare engagement, then record which time was better.

* **Task 4.2: “Best Slot” Recommendation** – Implement the `best_slot(channel, horizon)` function using historical data. For each hour block, compute average engagement or views. Then for the given horizon (say next 7 days), pick times that historically had above-average performance. This can be a simple heuristic: e.g., find the top 3 hour-of-week combinations for that channel. Use data from AnalyticsSeries nodes (or receipts which include timestamp and performance). Package these recommended time slots in the output (with maybe a confidence or expected lift).

* **Task 4.3: Integrate WordForge for Hashtag Suggestions** – For `trends.hashtag.reco(post_spec)`, implement a stub that uses Glyph (embedding) plus maybe trending data (could use a public API or stored hashtags from recent analytics) to suggest additional tags. For example, take key terms from the PostSpec body (via Glyph extraction of concepts) and return a list of popular related hashtags. This might require an external source of trending tags (maybe we omit deep implementation due to complexity and just do a static mapping or use a simple co-occurrence from past posts).

* **Task 4.4: Closed-Loop Learning** – Set up a periodic Coach routine (could be in ReasoningBank, but implementation-wise we do it here) that looks at the past month’s posts and outcomes. Identify any actionable patterns – e.g., if videos under 1 minute consistently outperform longer ones on TikTok, record that insight (maybe update some internal config to warn if a TikTok video \>60s in future). Another example: if certain hashtags always correlate with better engagement, note that. This task can be simplified: perhaps just log a summary of best-performing content attributes each week and have a human review. The goal is to ensure SocialForge not only automates but also improves strategy via data.

**Milestone 5: Hardening and Governance**

* **Task 5.1: Platform API Churn Handling** – Monitor platform API changes: implement version checks. For example, if an adapter call fails due to deprecation, catch it and flag the adapter as needing update. Maintain a `capabilities` JSON for each platform listing features (post types, comment support, DM support, etc.) along with version or date. Add a `social.presets.validate()` that runs on `compose.validate` to ensure the PostSpec doesn’t request something unsupported (for example, “carousel” on Twitter which doesn’t have that concept). Use VersionForge to version these capability definitions and mark breaking changes – e.g., if Twitter now allows longer video, bump version and ensure older PostSpecs with that constraint get updated.

* **Task 5.2: Rate Limit and Abuse Safeguards** – Implement more robust rate-limit handling globally: maintain a memory or DB record of last request timestamps per platform and globally. If SocialForge gets hammered by an external trigger (say an agent trying to post 100 times in a minute), implement a local throttle (not even reaching the platform API) to protect our accounts from being flagged. Also incorporate risk signals: e.g., if a usually low-activity account suddenly posts a lot (impossible travel analogy), require step-up auth (maybe mark the ChannelPassport status as “limited” until a user verifies).

* **Task 5.3: Content Policy Enforcement** – Update Tripwire policy packs to include platform-specific rules: e.g., define a Petri test for “if posting to platform X, check content doesn’t contain Y” for each X/Y combination (like no pharmaceutical claims on platform A). Implement `social.policy.check.content(post_spec)` that aggregates these (already partly done in truth fences). Also implement `social.policy.check.ratelimit(channel, op)` that can predict if an operation would exceed platform limits (maybe using static rules like “Twitter DMs \> 300/day triggers caution”). And a `gateway.decide(post_spec)` that returns allow/quarantine/escalate based on overall policy evaluation. This essentially formalizes some logic from earlier milestones and ties it into the Petri/Tripwire system so that policies can be updated declaratively.

* **Task 5.4: Multi-Org and Multi-Tenant Support** – (If relevant) ensure SocialForge can handle multiple user organizations safely. This might entail scoping channels by tenant and making sure one org’s automation can’t accidentally post to another org’s accounts. Use AuthForge’s tenant model (ChannelPassport has a tenant\_id perhaps) and enforce checks on each call that the caller has rights to that tenant’s channels. If not in initial scope, document that single-tenant assumption and plan to add later.

---

## **ArticleForge** {#articleforge}

### **Purpose & Responsibilities** {#purpose-&-responsibilities-2}

**ArticleForge** (sometimes referred to as “EssayForge” in context) is Entif’s *long-form content creation and management* module. It is responsible for drafting, editing, and publishing written content such as articles, blog posts, documentation guides, or lyrics write-ups in a governed, reproducible way. ArticleForge’s purpose is to turn ideas or outlines into well-structured textual articles, enforce editorial quality (like ensuring every factual claim is cited, writing style guidelines, etc.), and integrate with publishing workflows (exporting to various surfaces like Markdown sites, Medium, WordPress, newsletters). It brings existing authoring best practices (e.g. atomic Markdown sections, templates for common sections) into the Entif system and allows AI assistance in writing while maintaining oversight through receipts and quality gates. In short, ArticleForge lets Entif generate and maintain written content that is **consistent** (in voice and structure), **auditable** (sources cited, no hallucinations), **versioned**, and easily deployable.

### **Architecture & Components** {#architecture-&-components-2}

**Content Model:** ArticleForge formalizes an article as a collection of small sections with a clear structure. The core data model includes an **ArticlePassport** for metadata about the article, an **ArticleSection** for each unit of content, and an **ArticleSpec** that ties it all together.

* The **ArticlePassport** contains identifying and contextual info: a unique `art_<id>` slug, title, author, intended audience tags, a one-sentence thesis (core claim of the article), SEO tags, and status (draft, review, published, etc.). It also tracks provenance: a list of source identifiers for claims or facts (which could be Receipt IDs from consulted knowledge or GraphRAG nodes) and E-E-A-T metrics (Experience/Expertise/Authority/Trust ratings if applicable). The passport can accumulate risk flags if the content triggers any policy checks (like needing legal review). If the article is meant to be versioned (like a documentation page tied to a software version), a version field (semver) is included.

* The **ArticleSection** represents a self-contained chunk of content, kept small (e.g. a few paragraphs) to enable modular editing and AI drafting. Each section has an `id`, a semantic kind (like “hook” for introduction, “context”, “claim”, “evidence”, “howto”, “story”, “cta” call-to-action, etc.). The `text_md` field holds the actual Markdown content of that section. Importantly, sections can include inline citation pointers: ArticleForge ensures that for any factual claim, there’s a citation in the form of a source id (like a reference to a Source-of-Truth node in the graph or an external link). The section structure is designed to enforce atomicity and ease of rearrangement or replacement. Each section can also carry `glyph_tags` – semantic tags (via Glyph/WordForge) denoting key concepts in that section. This helps in aligning with the knowledge graph (e.g., tagging sections by the concept they discuss, for easier retrieval and consistency checks).

* The **ArticleSpec** ties together an article’s content: it contains the ArticlePassport metadata, an **outline** which is an ordered list of section headings or chapters (each with a heading and a list of section IDs under it), the full map of `sections` (id to ArticleSection content), any associated assets (like images or figures referenced) with keys to their URLs, and the target output formats/surfaces for publication. The outline allows hierarchical structuring (like the article’s table of contents). By separating outline from content, the system can re-order or replace sections easily.

**MCP APIs:** ArticleForge offers a set of MCP methods (`article.mcp`) to cover the lifecycle of article creation:

* **Planning** – `article.plan({ corpus, voice, thesis }) → ArticleSpec.outline`: Given some parameters (which could include a reference corpus of similar content, a desired voice/tone, and a thesis statement or goal of the article), the plan function generates a structured outline. It uses ROMA (Reasoning & Organization for Modular Articles) to decompose the topic into an outline: e.g., introduction, key points, conclusion. The result is an outline (a list of sections headings with suggested sequence) but without fleshed-out text. This outline provides section IDs and their semantic kind (like it might label one section as a “claim” and another as “evidence” if following a certain writing pattern). *This allows an agent or user to review the structure before actual drafting begins.*

* **Drafting** – `article.draft({ outline, voice, sources }) → ArticleSpec.sections` or populates the text for each section. This is where generative AI or templating is used to actually write the content. It takes the outline (which includes section headings and desired order), a specified voice/tone (e.g. “formal technical” vs “casual storytelling”), and any provided source material or reference links, and produces Markdown text for each section. Internally, ArticleForge will invoke something like WordForge or a large language model to generate text that fits the section’s kind and uses the sources for factual claims. It might attach placeholders for citations (like special syntax marking a statement to be cited from a source). The draft step is guided by Glyph tags as well to ensure key terms are included and consistent. The output is a filled-out ArticleSpec (all sections now have text). Each drafted section is accompanied by a Receipt capturing what source material was used (e.g., if it consulted the ReasoningBank or GraphRAG for facts, those receipts are noted).

* **Citations Enforcement** – `article.citations.enforce({ article_id }) → diff` ensures that every factual claim in the article has an attached citation and that those citations correspond to known sources of truth. This operation scans the text for any statements likely needing citation (for example, sentences with numbers, or authoritative claims) and checks if a citation is provided in the `ArticleSection.citations` field. If any are missing, it can auto-generate a MicroSpec task to fetch one (or mark the section as needing attention). It compares the claims against GraphRAG’s knowledge base or provided sources list: for each claim span it tries to find a matching source. The result is either a report that all claims are cited properly or a diff/patch that adds citation references where needed (or flags unresolved claims). If citation coverage is below threshold (there’s a certain policy like no “naked claims” allowed), this can set the article status to “quarantine” until fixed. Essentially, this is a truth fence to prevent publishing content with unsupported assertions.

* **Linting & Quality Checks** – `article.lint({ article_id }) → findings`: This runs a suite of document quality checks, similar to documentation linting. It checks for broken links, proper grammar or reading grade level, presence of required sections (like does it have a conclusion), accessibility items like alt text on any images, use of terminology (maybe cross-check against a glossary). It likely uses the same **DocForge** tools that enforce quality on technical docs, extended to articles. The lint returns a list of warnings or errors that must be resolved (e.g., “Link \[XYZ\] is broken”, or “No citation for claim in section 3”, or “Reading level 15, above target 12”). These are captured in a Receipt and can block publishing if severe.

* **Rendering** – `article.render({ article_id, surface }) → artifact_url`: Converts the internal representation into a format ready for a specific surface or publishing platform. For example, for `surface = "mdx"` (a static site), it will assemble the sections in order, include front-matter metadata from the passport, and output a Markdown/MDX file. For `surface = "medium"` or `"wordpress"`, it might generate HTML or use their APIs to create a draft post content (Medium requires HTML with certain tags). For a “newsletter” surface, it might generate a combined HTML and plaintext email. The `render` function uses templates for each surface type (possibly stored in `packages/article-templates/`) to ensure the output meets the platform’s formatting needs. It returns a URL or file path of the generated artifact (which would be stored via FileForge, perhaps).

* **Publishing** – `article.publish({ article_id, surface, when }) → receipt_id`: Schedules or immediately publishes the rendered article to the specified target. If `surface` is one of the integrated platforms (Medium, WP, etc.), ArticleForge will call the appropriate SocialForge or direct API to post it (including scheduling if a `when` time is provided). If `surface` is a static site (like an MDX site in our own repository), “publishing” might mean committing the file to a git repository or opening a Pull Request with the new article content (the text calls this autopost pattern where a Markdown file is pushed to trigger site rebuild). In any case, publish returns a Receipt and likely updates the ArticlePassport status to “published” or schedules a state change. Notably, integration with SocialForge can happen here: for instance, once an article is published, SocialForge could be invoked to create social posts announcing it (like tweeting the link).

**Nx Integration & Workflow:** ArticleForge is integrated into the Nx monorepo as a series of targets which mirror its MCP functions for CI/CD automation. For example, there might be Nx targets: `article:plan`, `article:draft`, `article:lint`, `article:render`, `article:publish` as described in the design. These allow automating article generation and updates as part of build pipelines. For instance, a CI job could detect changes in `/content/articles` (where human-edited Markdown atoms reside) and run `article.lint` to enforce quality on them. The design also mentions **Nx generators** for authoring UX – e.g. a command to scaffold a new article (`nx g @entif/article:new`) that creates an outline from a template. Additionally, Nx caching is leveraged: because ArticleForge content is chunked into small sections, if only one section changes, only that part might need re-rendering. They indicated that with Nx Cloud, planning/drafting/linting/rendering jobs are distributed-cacheable keyed by the article JSON and section content hash. This means repeated builds won't re-generate an article if nothing meaningful changed.

**Quality Gates and Governance:** ArticleForge applies similar truth fences as DocForge (documentation plane). Key ones: **Claim→Citation coverage** – every claim section must cite a source or else lint fails. **Doctest examples** – if code blocks in the article are marked for testing, they are executed to ensure they produce expected output (this ties into TestForge perhaps). **Alt-text and link integrity** – images must have alt text, all hyperlinks must resolve (no broken links). **Readability & Style** – enforce a target grade level or style guide (like avoid passive voice, etc., which can be done by a linter or language tool). **Front-matter completeness** – e.g. ensure title, author, tags are filled in the ArticlePassport (no missing fields). These gates run on PRs that include article content changes, much like docs: the CI will block merge if lint fails or citations are missing. This ensures any AI-drafted content is verified and that human edits don’t introduce issues either.

**Integration Points:**

* **WordForge/Glyph**: ArticleForge heavily uses WordForge capabilities for semantic grounding. During `draft`, it likely uses Glyph tags to maintain consistency of terminology and to embed knowledge. For example, if the article is about machine learning, it tags sections with relevant synsets and uses WordNet definitions to ensure clarity on terms. WordForge also provides the vector store and lexical search to bring in relevant facts from the knowledge base (GraphRAG) during drafting. Essentially, ArticleForge is an application of WordForge for a specific output (long-form text). It also benefits from WordForge’s governance: ensuring no forbidden terms or off-brand language is used (e.g., a Petri test might catch if the article content uses outdated terminology or disallowed phrases).

* **GraphRAG**: Each article and even each section becomes part of the graph. The content itself can be indexed: as mentioned, each Article section yields nodes in the knowledge graph, with edges linking claims to sources. For example, if Section 3 claims “X is Y”, and cites a Source-of-Truth node or a Receipt, an edge `(:Claim)-[:CITES]->(:Source)` is created. The Article as a whole is a node that can be connected to the product or feature it describes, and to the receipts that generated or published it. This integration means Entif’s cognitive components (like the Q\&A agent) can retrieve information from articles as well (with the assurance that the article is grounded in receipts/sources, making it a reliable source). Also, because ArticleForge ensures citations and uses Glyph, the content is anchored to the shared ontology, avoiding drift or hallucination.

* **DocForge**: There is overlap between ArticleForge and DocForge (which handles technical documentation). In fact, the design indicates they share mechanisms – Article content is treated almost like docs: the same CI gates (broken link check, etc.) and possibly the same build pipeline. ArticleForge may reuse DocForge’s pipelines for generating outputs and verifying them. For instance, an article that is a “guide” could be treated similarly to a documentation page and included in documentation site builds with doc quality checks unified. ArticleForge basically extends the documentation system to marketing or long-form essay content, adding additional considerations like external publishing.

* **MediaForge**: ArticleForge can call MediaForge for any embedded media in articles. If an article outline indicates an image or figure is needed (like “diagram showing X”), ArticleForge could request MediaForge to generate that image (e.g., use an image generation model or retrieve an asset from FileForge). The `ArticleSpec.assets` field allows linking such images by keys, which likely correspond to FileForge `file_id`s for images. Also, if the article is to be accompanied by a video or audio version, ArticleForge might coordinate with MediaForge or LyricsForge (for example, generating an audio narration of the article or a promotional video summary).

* **SocialForge**: Once an article is published (particularly externally on Medium or on our own site), SocialForge can automatically create social media posts linking to it. The design’s autopost integration suggests that publishing triggers a branch/PR creation which SocialForge can monitor and then generate a LinkedIn post or tweet with key highlights from the article. Also, SocialForge’s trending analysis might feed back topics that should be written about – e.g. if SocialForge sees a certain subject trending, it could prompt ArticleForge (via an Agent) to generate an article covering that subject.

* **BackupForge**: All articles (especially if considered content IP) are regularly backed up. ArticleForge content is stored likely in the repository (`/content/articles`) which BackupForge will snapshot (either via git or directly picking up the Markdown/JSON). Also, published external content might be saved (for instance, saving the HTML of a Medium article as proof of what was published, in case it needs restoration or auditing).

* **AuthForge**: If there are multi-user contributions (multiple authors or editors), AuthForge might manage roles like `article.author` vs `article.editor`. Also, publishing to external platforms often requires tokens (Medium’s API tokens, etc.), which would be stored in AuthForge’s vault (similar to SocialForge channels). So AuthForge protects those integration credentials and ensures only authorized processes use them. If an article is sensitive (e.g. not to be published publicly yet), AuthForge could enforce that only certain roles can call `publish` (like require a senior editor’s approval).

**Observability:** ArticleForge operations produce receipts at each step: plan, draft, enforce citations, lint, render, publish all yield receipts. These can be visualized. VizForge dashboards might include things like “Citation Coverage Donut” for an article (showing percentage of statements cited), or “Reading Grade vs Target” for each article, or “Broken Links Trend” to ensure content health over time. On the macro level, one could see how many articles are in draft vs published, or the throughput of the system (articles per week). Also, any automated drafting is carefully logged (which sources were used, how long generation took, etc.). If AI wrote a section, the Receipt captures the prompt and perhaps some confidence measure. This traceability is crucial to let human editors review AI contributions.

### **Implementation Plan (ArticleForge)** {#implementation-plan-(articleforge)}

**Milestone 1: Article Data Model & Contracts**

* **Task 1.1: Implement Article Protocol Types** – Create `packages/protocol/src/article.ts` defining `Surface` enum (output targets like "mdx", "medium", etc.) and interfaces `ArticlePassport`, `ArticleSection`, `ArticleSpec` as designed. Ensure fields for title, author, audience, thesis, tags, status in ArticlePassport; for section text and citations in ArticleSection; and for outline structure and section map in ArticleSpec. Add TypeForge validations (e.g., status must be one of allowed values, each citation claim\_span is a valid character range in text). This formal contract will be used by all MCP methods.

* **Task 1.2: Skeleton MCP Service (`article.mcp`)** – Set up `packages/article-forge` with an MCP server exposing methods: `plan`, `draft`, `citations.enforce`, `lint`, `render`, `publish`. Initially, stub each method to accept input and return a dummy output or basic structure. For instance, `plan` can return an outline with one section “placeholder” for now; `draft` could copy the outline into sections with lorem ipsum text initially. The goal is to have the interface in place with receipts generation (each method should emit at least a minimal Receipt with timestamp and stub action). Wire this into the monorepo build (add project to Nx).

* **Task 1.3: Content Storage Setup** – Decide where Article content is stored. We have `/content/articles/` in the design where presumably raw Markdown atoms or JSON go. Implement a simple repository: for each article, maybe use a folder with a metadata file (passport \+ outline in JSON) and section files (each section as a Markdown or JSON file). Alternatively, store whole ArticleSpec as a single JSON. For now, implement saving and loading ArticleSpec to disk (so that after planning and drafting, results are saved). This could be done in `packages/article-cli` or the service itself could write to a configured path. Ensure `ArticlePassport.id` is used as filename/dir. This will allow persistence across MCP calls.

* **Task 1.4: Nx Targets** – Add Nx targets in `project.json` for common flows:

  * `"plan"` to call `article.plan` and save the outline (writing an `article.json` spec);

  * `"draft"` to call `article.draft` to fill sections;

  * `"lint"` to run `article.lint`;

  * `"render"` to run `article.render` and produce output files;

  * `"publish"` to run the pipeline or call `article.publish`.  
     Ensure these targets have appropriate inputs/outputs set so Nx can cache them (e.g., inputs include source files under `/content/articles/**` and outputs might be rendered files or updated specs).

**Milestone 2: Outline Planning and Template Integration**

* **Task 2.1: Outline Generation Implementation (`article.plan`)** – Develop the logic for `plan`. Possibly use a prompt-based approach: integrate with a language model (through WordForge or directly) to generate an outline given parameters. For now, maybe implement a basic template approach: if `thesis` provided, create a simple 5-part structure (hook, context, supporting evidence, further discussion, conclusion). If `voice` is provided (e.g. "executive"), note it in the outline as an attribute (though voice mainly affects drafting stage). Or incorporate an existing outline if `corpus` or example is given (if `corpus` points to an existing piece, we could analyze its structure to mimic it). This is a complex AI task, but we can stub with deterministic rules: e.g., always produce sections: Introduction, Main Point 1, Main Point 2, Conclusion. Mark the appropriate `kind` (like first section "hook", last "cta" or "summary"). Output the `outline` list with these headings and generate unique `sec_...` IDs for each section.

* **Task 2.2: Article Templates Library** – Create `packages/article-templates` with some predefined content blocks or patterns. For example, templates for a “how-to” article vs a “case study”. Each template can define an outline pattern and perhaps some boilerplate text (like sections labeled “Background”, “Steps”, “Outcome”). Also create macro placeholders like `<thesis>` or `<product_name>` that can be replaced. Implement a simple function to apply a template if the user requests (not in initial scope maybe, but lay groundwork).

* **Task 2.3: Editor Ergonomics (VSCode workspace settings)** – Possibly create a `.vscode/settings.json` or recommended extensions for writing in `/content/articles/`. Not directly an engineering task affecting architecture, but something to ensure if developers open that folder, they get Markdown linting etc. This is minor but aligns with “low friction authoring” principle we keep from the original ArticleForge archive.

* **Task 2.4: Metadata and Graph Links** – When plan is done and we have initial outline, stamp the metadata of the new article in MetadataForge. Call `metadata.mcp draft` or `stamp` to create descriptors for this article (type “Document” perhaps) and for each section (maybe as child descriptors). This allows the article to be queryable by title or tags from day one. If using GraphRAG, create a node for the Article with title and thesis, and link to any relevant glyphs (if audience tags are present, link to those topics). This is a preparation for deeper integration.

**Milestone 3: Drafting with AI and Source Citation**

* **Task 3.1: Draft Section Content (`article.draft`)** – Implement the core drafting logic. For each section in the outline, generate text. Initially, we can implement a simple rule-based filler: e.g., for a "hook" section, output a prompt-like introductory sentence (like “Ever wondered about X? This article will explore…”). For "claim" sections, perhaps state a fact that supports the thesis. Without full AI integration, we might produce placeholder text that clearly marks where AI would fill in (or we can integrate a small language model if available). The key is to structure it so that citations can be attached: e.g., in the text, include references like “\[source1\]” as placeholders. If `sources` were provided to `draft` (list of reference IDs or URLs), try to distribute them in the text (for example, if 3 sources provided, ensure each is cited at least once in relevant sections). For now, one approach is: if the ArticlePassport has `sources` (like key background receipts or nodes), simply append `(Source: ${source_id})` in the relevant section text, to simulate citation. Mark each such citation in `ArticleSection.citations` with the text span. For example, find the sentence containing the source and note its character indices. The `draft` method should output fully filled sections and update the ArticleSpec. Emit a draft Receipt that possibly notes which sources were utilized in drafting.

* **Task 3.2: Integrate WordForge for Terminology** – Use the Glyph/WordNet integration to enrich draft. For each section, identify important terms (could use a simple approach like find capitalized words or domain-specific jargon). If WordForge’s vector store is available, optionally retrieve definitions or related terms. E.g., if a section is about "neural networks", attach a footnote or ensure the word is linked to a `Glyph` (concept node). Perhaps mark in the section's `glyph_tags` the WordNet synsets that correspond to key nouns. This will later allow cross-linking. Keep this minimal – e.g., one tag per section for a main concept.

* **Task 3.3: Citation Enforcement (`article.citations.enforce`)** – Implement by scanning each `ArticleSection.text_md` for patterns of claim sentences. For a simplistic approach, treat any section of kind "claim" or any sentence containing numbers or superlatives as needing a citation. If in `ArticleSection.citations` an entry exists (with a claim\_span) then assume it’s covered. If not, produce a diff: perhaps output a suggestion to add “(citation needed)” at the end of the sentence. Alternatively, if `sources` are available in passport and none used, pick one and suggest adding it. For now, we can simply flag sections missing citations. The result of `enforce` could be a list of sections that lack citation – we then modify those sections by appending `[^1]` footnote and add a dummy source. Or more simply, output a Receipt listing issues: e.g., "Section 2 has an uncited claim." This keeps it non-destructive. Later, a human or automated fix can call `draft` again with sources. Ensure that if coverage is below, say, 100%, we mark the article Passport’s status or risk\_flags accordingly (e.g., add `risk_flags: ["uncited_claims"]`).

* **Task 3.4: Lint Implementation (`article.lint`)** – Integrate with existing documentation lint tools if available (like a Markdown linter or Vale for prose). If not, implement a basic check: open each link in text via HTTP to ensure 200 OK (but in offline environment, perhaps skip). Check that every image `![]()` in Markdown has alt text between the brackets. Check that reading level is not too high: we can do a quick Flesch–Kincaid grade calculation on the text (count sentences, words, syllables – might be heavy but for demo we can approximate). Also enforce that front-matter fields (title, etc.) are not empty. Compile all findings into a structured list and create a lint Receipt. Mark severity: anything critical (like broken link) should cause a failure. If integrated with Nx, set the process exit code to non-zero if any critical issues (so CI fails).

**Milestone 4: Rendering and Publishing**

* **Task 4.1: Markdown/MDX Rendering (`article.render`)** – Implement conversion of ArticleSpec to output format. For `surface = "mdx"` (assuming we have a static site using MDX or Markdown), generate a single Markdown file: include YAML front-matter with title, date, tags from ArticlePassport. Then iterate through outline and output each section’s text as paragraphs. Possibly insert section headings (if outline has them) as `## Heading`. Ensure that internal references (like citations) are converted appropriately, e.g., if we used footnote style or a reference list at bottom. Perhaps append a “References” section listing all `ArticlePassport.sources` with their details. For now, a simple approach: just output the sections and inline any citation markers as-is. Write this file to `/content/articles/{slug}.md`.

* **Task 4.2: Medium/WordPress Exporters** – For external surfaces, implement minimal working logic: For Medium, maybe prepare an HTML string. We can reuse the Markdown by converting it (maybe use a library like a Markdown-it or similar to HTML). Ensure images are included either as links or uploads – probably out of scope to do actual API calls here, so perhaps just produce HTML with image URLs (pointing to where images are hosted if any). For WordPress, similarly produce HTML with WP-specific shortcodes if needed for things like galleries (skip complexity for now). Essentially, ensure `article.render` returns either a path (if content saved to a file) or perhaps a Memory object. We could simplify: for both mediums, just save an HTML file in an output directory (e.g., `dist/article_{slug}.html`) as the artifact.

* **Task 4.3: Archive Snapshot** – After rendering, call ArchiveForge’s snapshot if available. For example, use `archive.mcp snapshot.repo` or similar with the list of artifact URIs (the newly created MD file, etc.). This will produce a manifest capturing the content at publish time. If ArchiveForge isn’t fully functional, simulate by storing a copy of ArticleSpec or content with a timestamp in a `history/` folder. The idea is to not lose that exact version.

* **Task 4.4: Publishing Mechanism (`article.publish`)** – Implement publishing logic depending on surface:

  * For static site (mdx): could simulate by committing to git. Since we can't really do that here, maybe output that the file is “ready for PR”. Or if our site is part of this mono-repo, it might just be considered published on next deploy. Mark ArticlePassport.status \= “published”.

  * For Medium/WordPress: If possible, integrate SocialForge or direct API. We could call SocialForge to schedule a post on those channels with the article content or link. Alternatively, just output instructions or a dummy "Published to Medium with URL X". Perhaps skip actual API calls (which need keys). Instead, finalize by marking as published and maybe generating a link like `https://medium.com/@youracct/{slug}` (placeholder).

  * Regardless, create a publish Receipt summarizing the action (e.g., "Article published to Medium (simulated)").  
     Also handle scheduling: if a `when` is provided in the request and in the future, don't actually do it now, but schedule a job (maybe by storing in a `schedule.json`). For demonstration, simpler: if `when` \> now, just output a Receipt that it's scheduled, and require a separate trigger to finalize at that time (could be manual in this environment).

* **Task 4.5: Cross-Forge Hooks on Publish** – On successful publish, trigger follow-ups: e.g., call SocialForge to announce on social media. We can simulate by printing a log or creating a PostSpec for SocialForge. For instance, if ArticlePassport.tags includes "newsletter", perhaps we want to queue a newsletter email (which might be handled by SocialForge’s trends or separate EmailForge). For now, at least log “Would notify SocialForge to post announcement on LinkedIn/Twitter.” Similarly, mark any receipts or link to the final artifact.

**Milestone 5: Integration Testing & Refinement**

* **Task 5.1: End-to-End Dry Run** – Perform an end-to-end test with a sample input. E.g., call `article.plan` for a given thesis, then `article.draft`, then `article.lint`, `article.render`. Ensure each step flows and uses the data from previous properly. Adjust as needed (e.g., fix if `draft` didn’t preserve some IDs or if `render` expected a field that wasn’t set). Validate that Nx targets run in correct order and caching works (e.g. run `nx run article:render` twice, second time should be instantaneous if nothing changed).

* **Task 5.2: Evaluate Truth Fences** – Intentionally create a scenario failing each quality gate to see if properly caught. For example, remove citations and run `lint` – does it catch? If not, wire `citations.enforce` into `lint` or ensure either one blocks pipeline. If reading level is irrelevant, perhaps skip, but ensure broken link detection works by adding a fake link and seeing output. Tweak thresholds if needed (e.g., only block if citations coverage \< 100%).

* **Task 5.3: Documentation of ArticleForge** – Use MetadataForge to export docs for ArticleForge’s MCP methods and workflow. Ensure `metadata.mcp export.docs` can generate something (maybe this becomes part of an integrated doc site). Document how to create a new article, how to provide sources, etc. This not only serves users but also provides a test that Metadata integration is working (descriptors were stamped).

* **Task 5.4: Security Audit** – Check that sensitive operations require proper auth. E.g., if `article.publish` should only be done by a user with a certain role, integrate AuthForge check (like an internal call `authz.check(subject, action:"article.publish", resource: entif://article/{id})`). If AuthForge is not implemented, at least structure code to easily insert that later (maybe a TODO or stub call). Also ensure that any external tokens (like Medium API keys) are not logged or stored in plain – since we didn't implement actual external calls, we skip for now, but note for future.

* **Task 5.5: Backup and Recovery Test** – Simulate BackupForge capturing an article: run a `backup.plan` for `content/articles/` (if BackupForge is integrated) to ensure it picks up article files. If not integrated, at least manually copy out the article files to simulate a backup, then delete the original and try to restore. This ensures that if something happened, we can recover the content. The archive manifest from task 4.3 also plays into this – test that manifest can recreate the article if needed.

---

## **LyricsForge** {#lyricsforge}

### **Purpose & Responsibilities** {#purpose-&-responsibilities-3}

**LyricsForge** is Entif’s specialized module for *generating, analyzing, and aligning lyrical content*. It deals with written lyrics or transcripts in a musical context, ensuring they fit rhythmic and melodic constraints (prosody) and aligning them with audio for karaoke-style playback or captioning. In essence, LyricsForge takes a musical idea (topic, mood, possibly a backing track) and produces lyrics that **scan** correctly (syllables match the beat pattern and rhyme scheme), then ensures those lyrics are precisely **aligned** in time with an audio recording (using forced alignment or ASR), and finally generates **caption files** or lyric displays for use in media. It also performs quality checks on the lyrical composition (originality, absence of banned words, etc.) and enforces that final lyric+audio combinations have near-perfect timing alignment. In summary, LyricsForge’s responsibilities are: lyric drafting under creative and structural constraints, objective QA of lyrics (meter, rhyme, content safety), synchronizing lyrics with vocals in audio, and preparing outputs like timed subtitle files or enhanced karaoke visuals.

### **Architecture & Components** {#architecture-&-components-3}

**Data Model:** LyricsForge likely defines types for a **LyricSpec** (the content of lyrics and their structure) and a **LyricPassport** (metadata about a lyrics artifact, similar to MediaPassport but for textual lyrics). While not explicitly shown in the snippet, we can infer such structures:

* **LyricSpec** may include the actual lyrics segmented by sections (verse, chorus, etc.), each with their lines of text, plus possibly rhythmic constraints for each line (like number of syllables or a pattern indicating stressed beats). It might also hold reference to a melody or beat (like BPM, time signature) to contextualize the prosody.

* **LyricPassport** would store an ID (`lyr_<id>`), a status (draft, aligned, etc.), created timestamp, and references to related artifacts like an audio File ID (the track) or aligned caption file IDs after processing. It might also track receipts of the QA evaluation and alignment coverage results, and risk flags (like if explicit language was found). The passport status might progress from “parse-only” (meaning just text without timing) to “aligned” when timing is done.

**MCP APIs:** LyricsForge exposes several MCP endpoints to cover the pipeline from creation to output:

* **Planning** – `lyrics.mcp plan(seed: {topic, mood, audience, structure? ...}) → outline`. Similar to article planning, this creates a lyrical outline or skeleton. It outputs a sequence of sections (for example, Verse1, Chorus, Verse2, etc.) and for each maybe a desired meter and rhyme scheme. The plan could be informed by a requested structure (like ABAB rhyme, or having a bridge section, etc.) and constraints like mood (which might suggest vocabulary or style). The result is an outline with per-section info: e.g., Section type and target syllable count per line, target rhyme pattern.

* **Drafting** – `lyrics.mcp draft(spec_or_outline, style_pack?) → LyricSpec`. This generates the actual lyrics text for each section according to the outline’s constraints. It might use a combination of generative AI (possibly guided by WordForge style packs for certain lyrical style) and rule-based adjustments to ensure the syllable count and stress pattern fit. For instance, it predicts syllable counts for each line to match a given meter (like a particular number of syllables per line if the music demands it). It also tries to maximize rhyme quality: ensuring end words rhyme according to scheme, using alliteration or assonance as needed. The draft function likely leverages WordForge/Glyph to ground content and avoid nonsense, focusing on theme (topic) and mood. It emits a LyricSpec with lyrics lines filled in. It also immediately produces a Receipt with raw measures like the count of syllables vs target, rhyme classes identified, etc., for QA reference.

* **Prosody Refit** – `lyrics.mcp refit.prosody(lyric_id, ref: {bpm, meter?, time_signature?}) → patch`. This endpoint adjusts an already drafted lyric to better fit given music timing. For example, if after initial draft we have the actual BPM and time signature of the song, this can slightly alter line lengths or split/join lines so that stressed syllables align with downbeats. It returns a patch or diff to the lyrics (maybe updated lines). Essentially, it fine-tunes the lyrics' prosodic fit. This might shorten or lengthen lines, change words to alter stress patterns, etc., based on a reference tempo or meter structure.

* **Quality Evaluation** – `lyrics.mcp qa.evaluate(lyric_id) → findings`. This is a **truth fence** check for lyrics alone (before alignment). It calculates metrics: **meter fit** (do the lyrics follow the intended meter? e.g., how well syllables align with a beat grid if known or at least consistent line lengths), **rhyme coverage** (percentage of lines that adhere to the rhyme scheme, whether there are any "rhyme droughts" meaning long segments without rhymes), **assonance/alliteration** (to catch tongue-twisters or overly repetitive sounds), **lexical diversity** (are the lyrics not too repetitive in word use), **banned terms** (slang, profanity if disallowed, etc.), **toxicity** (no hate or slurs), **copyright mode** (ensuring we didn't inadvertently copy existing lyrics from known songs if policy forbids it). Each of these checks yields a pass/fail or a score. The QA results are output as findings (with values and verdicts) and likely stored in a Receipt. Red-level issues (like banned terms or toxicity) cause immediate quarantine of the lyric Passport (meaning it cannot proceed to publish). This QA is run as part of draft finalization and again after alignment possibly.

* **Rhyme Mapping** – `lyrics.mcp rhyme.map(lyric_id, lang?) → classes`. This returns a detailed breakdown of which lines rhyme with which (grouping by rhyme ending), possibly listing phonetic endings for each line. It uses a phonetic dictionary (like CMU Pronouncing Dictionary for English) to map last stressed vowel sounds and cluster lines. This is useful for analysis or for showing rhyme schemes visually. It might be invoked in the UI or for debug, not necessarily needed for pipeline but complements QA by giving details of rhyme scheme adherence.

* **Export Passport** – `lyrics.mcp export.passport(lyric_id) → LyricPassport`. When all is done (especially after alignment), this method finalizes the LyricPassport, updating its status to “final” or “aligned” and populating all references (like linking to the audio file, caption files produced, etc.). It might attach the array of receipts that led to final state (draft receipt, QA receipt, alignment receipt). Essentially it's a final stamp that can be stored in FileForge or GraphRAG.

In addition to LyricsForge’s own endpoints, two other related MCP services work closely with it:

* **Alignment Service** – `align.mcp align.run(job: AlignmentJob) → {caption: CaptionExport, coverage: number, receipt_id}`. This is used to align the lyrics text with a given audio performance. The AlignmentJob likely specifies the lyric text (or lyric\_id) and the corresponding audio file (maybe an entif:// file URI in FileForge). The service uses forced alignment algorithms (like the Montreal Forced Aligner or Gentle or WhisperX) to produce timing for each lyric line or word. By default, line-level alignment is done because it's faster and often enough for captions. The output includes a **CaptionExport** (probably a structured object with timing for each line or maybe directly an SRT or LRC file) and a coverage metric indicating what percentage of the lyrics lines were successfully aligned with audio. If any lines could not be aligned or matched, coverage drops. The alignment service tries strategies: exact text alignment if possible (since we have our lyrics, presumably exactly what’s sung; if performance deviates, fallback to ASR to match audio to lyric text). The alignment Receipt logs the method used (like "Forced alignment used; fallback not needed" or if fallback, "WhisperX used to align a diverged line"). The coverage must meet a threshold (say \>=95%) or else it's a failure requiring fix or manual adjustment. This is a crucial link between text and audio.

* **Captions Conversion** – `captions.mcp from.lyrics(lyric_id, timings) → CaptionExport`; plus `captions.convert(caption_id, to: format) → CaptionExport` and `captions.style.ass(theme) → CaptionExport` for karaoke effects. The `from.lyrics` likely takes the LyricSpec (with text) and an associated timings structure (like from align.run) and produces a **CaptionExport** object. CaptionExport might include content for SRT (with start/end times and lines) or LRC (which might have per-word timings). The convert allows converting between subtitle file formats (SRT, LRC, ASS etc.). `style.ass(theme)` probably generates a stylized Advanced SubStation Alpha file with karaoke effects (like syllable highlighting) given a theme (color/fonts). These endpoints ensure that once lyrics are aligned, we can get them in any format needed for distribution (embedding in video, etc.). All calls produce receipts and go through FileForge to store outputs.

**Integration Points:**

* **MediaForge**: LyricsForge outputs (the caption files) are fed into MediaForge if needed. E.g., `media.captions.attach` will use the SRT generated by LyricsForge to mux into a video. Also, for any audio generation (like maybe generating a vocal track from lyrics via TTS) might involve MediaForge or external models (ElevenLabs etc.). At least, if we needed an audio reference, we might call MediaForge’s TTS with the lyrics and a chosen voice to get an audio (the design hints at voice cloning requiring consent, so maybe not fully automated by default). Additionally, if a music video is being produced, MediaForge might call LyricsForge to ensure captions are ready and then overlay them.

* **Music/Audio Data**: While not a Forge per se in listed ones, LyricsForge clearly interacts with raw audio and beats. Possibly a *MusicForge* concept or integration with external libs (like analyzing instrumental tracks). The alignment service needs an audio file and possibly a phonetic breakdown of the lyrics plus the audio to align. That likely uses an external library (MFA or Gentle).

* **GraphRAG & WordForge**: The content of lyrics can be anchored conceptually. The snippet mentions using WordForge for content words and synonyms to fit intent while still considering rhyme. They use glyph tags to ensure the lyrics are "pasigraphy-anchored" (consistent semantics). Also, ReasoningBank logs what prosody adjustments worked for future learning. This implies:

  * A knowledge base (WordNet via Glyph) helps pick words that fit a theme but also rhyme or have certain phonetic properties (e.g. find words with certain ending sounds).

  * Past data from ReasoningBank influences choices (like learning that certain rhythms or rhyme patterns worked well for a given mood or tempo).

  * Possibly GraphRAG stores lyrics as nodes linking to the concepts they mention. That might be less critical, but maybe for analysis or making sure songs don't repeat lines from each other (checking similarity to avoid plagiarism).

* **Petri/Tripwire**: For safety, as with other generation, Tripwire might have rules for lyrical content. E.g., disallow generating any lyrics that mention self-harm (unless needed), or ensure that if explicit content is off, it blocks profanity. Petri tests might include known problematic lyric scenarios (like extremely long lines that never align or high lexical complexity that is unsingable) to ensure QA catches them.

* **AuthForge**: If voice cloning is involved (like using a specific singer's voice to align or generate vocals), there is mention that **consent artifacts** must be present and policy flags set. This would likely be enforced by AuthForge/Tripwire: if user tries to use a protected voice model without a stored consent (like an upload of a permission), Tripwire would block. But in context of lyrics, perhaps not directly used unless synthesizing singing voices.

* **FileForge**: All intermediate and final outputs are stored with FileForge. The lyrics text could be stored as a file or in a DB, but more likely as part of a JSON or small text. The alignment output caption file definitely goes into FileForge (the design said all `.srt/.lrc/.ass` stored through FileForge and passports made). The LyricPassport itself likely references the audio file (`file_id`) it aligns to, and the caption file IDs it produced.

* **VersionForge**: Possibly for style packs or for iterative improvements. Style packs and pattern libraries for lyrics (like a pack for "90s rap style" or "Haiku style") could be versioned. Also, if releasing lyrics as part of a song release, versioning might be considered via VersionForge or at least tying them to a release version. The design didn't highlight VersionForge in Lyrics context beyond what’s inherited via integration.

* **BackupForge**: The lyrics database or files get backed up. Also any model of alignment or special dictionaries might be backed up.

**Quality & Truth Fences:** The snippet provides a comprehensive list of QA checks (the “truth fences”) for lyrics in `qa.evaluate`:

* *Meter Fit*: computed as proportion of syllables landing on intended beats. If a known beat pattern is given, measure alignment. They likely count how many syllables align vs off-beat beyond tolerance. If below threshold (like \<85% on-beat), it's flagged (they mention threshold 0.85 example).

* *Rhyme Coverage*: Ensures lines that should rhyme do rhyme; warn if, say, more than 2 lines in a verse have no rhyme partner (rhyme drought).

* *Alliteration/Assonance Bounds*: Avoid too much tongue-twister effect unless intentionally. If a line or section has excessive alliteration (like many words starting with same sound making it tongue-twister), flag it.

* *Lexical Diversity*: Possibly measure uniqueness of words. If the lyrics reuse the same words overly, especially in verses (aside from intentional chorus repetition), mark it (fear is monotony or filler words). SimHash or some uniqueness metric used.

* *Banned Terms & Toxicity*: Check lyrics against a list of forbidden words (e.g., slurs, trademarked names if not allowed, etc.). Also run a toxicity filter (likely an AI model or list for hate speech). If any triggers, immediate red (block).

* *Copyright Mode*: If content policy says we can't regenerate known lyrics, maybe the user can set a mode (original-only vs allow references). If original-only, the system should ensure it didn't lift lines from existing songs. Possibly by cross-checking lyrics with a database of known lyrics (maybe a fuzzy match or using an API). If suspicious, Tripwire requires a waiver. They note "no ingestion/regeneration of third-party lyrics if mode says so". This can be a check using an external API or at least ensure not exact match to famous lines (like "happy birthday to you" might get flagged).

* *Alignment Coverage* (in truth fences section): Ensuring after alignment, at least 95% of lyric lines got matched to audio, else quarantined. This one is actually handled in `align.run` output, but they mention it as a truth fence bridging into final publish conditions.

* *Additional safety*: The risk mitigations mention meter brittleness (so be forgiving on strict meter to allow flexibility in creativity), alignment drift for fast lyrics (suggest splitting lines to handle rapid lyrics), and not over-automating style beyond the artist's intention (so allow a "free write" mode with minimal enforcement except safety and coverage). Also, they mention similar truth fences we use in Viz for lyric QA dashboards: "*no truncated axes*, *show N*, *declare denominator*, *declare uncertainty or say you can’t* — the same 'truth fences' we use elsewhere, applied to lyric QA dashboards.". This seems like a conflation with a different context (visualizations?), but possibly meaning even in presenting lyric QA metrics, be truthful about what they mean. It's likely referencing ensuring charts in lyric QA have proper context on axes and uncertainty (a general design principle). Might not directly affect lyric generation, more how metrics are displayed.

**Observability:** They mention **prosody heatmap** and **alignment sparkline** in VizForge for PR attachments. The prosody heatmap likely visualizes each line's meter fit (maybe lines vs stress alignment percentage as a heatmap: lines where many off-beat syllables might highlight red). The alignment sparkline might show over time how alignment coverage changes or where mis-alignments occurred (like a timeline with marks where alignment confidence dips). They plan to attach those to PRs, meaning any commit that changes lyrics or alignment triggers generation of those charts via viz.mcp. There’s also an "Autopost" mention: including `srt_url` in a release artifact row so that distribution (like publishing the video or sending to YouTube) picks it up. So likely in the final manifest of a video release, they ensure the lyric caption file link is included so SocialForge or others can automatically add subtitles on publish.

Finally, NX integration: They gave an Nx target config snippet for lyrics tasks. We see:

* `lyrics:plan`,

* `lyrics:draft` (with inputs being `lyrics/**/*.json` presumably where lyrics specs are stored, and maybe outputs none because it writes to JSON),

* `lyrics:qa` (with caching true, meaning QA results can be cached if same lyric hasn't changed \- which is interesting because QA is evidence, but they allowed caching to speed up re-checks presumably if lyrics unchanged),

* `lyrics:align` (cache false, since alignment is evidence and always re-run for actual output),

* `captions:export` for converting to final (not sure if cached or not). These tasks let them parallelize heavy stuff: e.g. Nx Cloud can run QA on multiple songs distributed since they allow caching and sharding heavy QA across agents.

### **Implementation Plan (LyricsForge)** {#implementation-plan-(lyricsforge)}

**Milestone 1: Lyric Contracts & Basic Flow**

* **Task 1.1: Define Lyrics Data Structures** – Create `packages/protocol/src/lyrics.ts` with data types: `LyricSpec` (containing sections or lines of lyrics, possibly grouped by section type), `LyricPassport` (with fields id, associated audio file\_id if any, created\_at, status, receipts, etc.), and possibly types for intermediate objects like `LyricLine` (with text and syllable count, stress pattern, etc.). Ensure the ID types are distinct (e.g., `id: lyr_${string}`). Define any enumerations needed (like SectionType: Verse, Chorus, Bridge). This provides a typed foundation to exchange lyrics info between MCP calls.

* **Task 1.2: Set Up LyricsForge MCP** – In `packages/lyrics-forge`, scaffold an MCP server with methods: `plan`, `draft`, `refit.prosody`, `qa.evaluate`, `rhyme.map`, and `export.passport`. Initially implement them minimally: e.g., `plan` returns a trivial outline (like one verse one chorus), `draft` could copy input outline into a LyricSpec with dummy text, `refit` returns no changes, `qa.evaluate` returns all checks as pass with dummy metrics, and `rhyme.map` returns classes grouping identical last words. This is just to have endpoints returning correctly structured data. Integrate this service into Nx (add to workspace config).

* **Task 1.3: Nx Targets for LyricsForge** – Similar to what's shown in the snippet, configure Nx project for lyrics with targets:

  * `"lyrics:plan"` to run `tools/lyrics/plan.mjs` (which calls MCP plan for a given input and saves output),

  * `"lyrics:draft"` to call draft (with inputs being any changes in lyric JSON files),

  * `"lyrics:qa"` to call qa.evaluate (with caching likely true since results repeatable given same lyrics text),

  * `"lyrics:align"` to perform alignment (no caching, as evidence),

  * `"captions:export"` to convert to final captions.  
     Create small scripts under `tools/lyrics/` for each that use the MCP client to call the server with appropriate parameters. Make sure to mark the Nx caching as indicated: no cache for align and caption export, cache allowed for plan/draft (maybe not heavily needed for plan/draft either as they produce creative output, but the snippet cached draft by input files) and QA (since it's deterministic given same input).

* **Task 1.4: Basic File/Storage Integration** – Decide how to store intermediate lyric content. Possibly under `packages/lyrics-forge/songs/` or in a content directory. Could do similar to Article: one JSON per lyric (with id, and maybe references to associated audio by file path or id). Implement saving after `draft` and loading for subsequent steps. For example, `draft` could write to `lyrics/<id>.json`. `align` will read that plus need audio file. For now, use placeholders for audio: maybe assume an audio file path is known or passed in manually (the align job might include a path or FileForge id). Establish a convention to link lyrics to an audio file (maybe by naming, or store in LyricPassport an `audio_file_id`).

**Milestone 2: Lyric Generation (Plan & Draft)**

**Task 2.1: Implement `lyrics.plan`** – Develop the logic to output a structured outline. Use input seed: e.g., a topic "love lost", mood "sad, reflective", audience "pop listeners", structure maybe unspecified. Create a default structure: for example, 1 Verse, 1 Chorus, 2nd Verse, Chorus, maybe Bridge, final Chorus. For each section, decide on a rhyme scheme (commonly couplets or alternating in verses, and repetitive in chorus). Also assign a meter constraint if possible: maybe each line 8 syllables for verses, 6 for chorus (just as arbitrary example). The plan can output something like:

 `{`  
  `"sections": [`  
    `{"id": "sec_1", "type": "Verse", "target_syllables": 8, "rhyme_scheme": "AABB"},`  
    `{"id": "sec_2", "type": "Chorus", "target_syllables": 8, "rhyme_scheme": "AAAA"}`  
  `]`  
`}`

*  A more sophisticated plan might include number of lines per section. For now, pick fixed values (e.g., Verse \= 4 lines, Chorus \= 4 lines) and encode in structure. Return this outline.

* **Task 2.2: Implement `lyrics.draft`** – Using the plan outline, generate actual lyric lines. Without a full LLM integration, we can do simple template-based generation:

  * For each section, generate lines using a small library of phrases or maybe random selection from a theme-related list. Possibly prepare a list of words relevant to topic (manually put a few for demo: e.g., if topic includes "love", use words like heart, tears, memory for sad mood).

  * Construct lines to meet `target_syllables`: implement a naive syllable counter (maybe count vowels as a proxy). Fill words until reaching target count. Adjust last word of lines to satisfy `rhyme_scheme`: e.g., if scheme is AABB, ensure lines1&2 end with same sound, lines3&4 same sound, different from first pair. For simplicity, define a few rhyming word sets (like {heart, apart}, {light, night}, etc.). Pick from those sets for line endings.

  * Ensure lines in a section adhere to structure: e.g., Verse 4 lines with pattern AABB, Chorus maybe repeating a key phrase (if we want AAAA).  
     Example outcome:

`sec_1 (Verse):`  
`1. "Broken heart in the dark"  (ends with 'dark')`  
`2. "Memories tearing me apart" (ends with 'apart' - doesn't rhyme with dark? Actually dark/apart not rhyme; better do heart/apart, okay fix: have line1 end 'heart', line2 'apart' to rhyme)`  
`3. "Midnight tears falling slow" (ends 'slow')`  
`4. "Lonely nights won't let go" (ends 'go' to rhyme with slow).`  
`sec_2 (Chorus):`  
`1. "In my dreams I find you"`  
`2. "In my dreams I find you"`  
`... repeated for rhyme AAAA`

*  It's fine if it's a bit repetitive. The main point is to match syllable count roughly and implement rhyme pattern. Count syllables roughly by vowels grouping. Possibly overshoot or undershoot by 1-2 is okay but aim as close as possible.  
   After generating, produce a LyricSpec JSON with each section's lines. Also fill `LyricPassport` initial entry (id and a timestamp, status "draft"). Emit a draft Receipt summarizing number of sections, total syllables, maybe listing chosen rhyme classes.

* **Task 2.3: Rhyme Mapping (`lyrics.rhyme.map`)** – Implement a helper that given the lyrics text (which we have after draft), processes the final words of each line. Use a simple phonetic dictionary for a few words (maybe store a small mapping for demo: "heart" \-\> H-ART, "apart" \-\> A-PART, "go" \-\> G-O, "slow" \-\> SL-O, etc.). If no dictionary, approximate rhyme by last 2-3 letters. Group lines that end with same last 2 letters as a class. Return JSON mapping like {"class1": \[line1, line2\], "class2": \[line3, line4\]}. This output could be part of QA or just accessible via API.  
   Actually in `qa.evaluate`, we will do rhyme coverage, but `rhyme.map` might be called independently to get more detail (like for a UI to highlight rhymes). Implement and test on the draft output.

**Milestone 3: Prosody QA and Adjustment**

* **Task 3.1: Implement `lyrics.qa.evaluate`** – Compute metrics on the drafted lyrics:

  * **Meter Fit**: if we have no actual music info yet, perhaps define meter as equal line lengths or a pattern of stresses. A simplistic measure: if all lines in a section are supposed to have X syllables, measure difference actual vs X, perhaps normalized. Or incorporate dummy stress: mark every 2nd syllable as stressed ideally, then count how many syllables fall on those positions (hard without actual music). For demo, maybe compute a consistency score: e.g., standard deviation of line syllable counts (smaller \= better meter consistency). Or if we had a BPM and known line duration, we could do more. Since not, use consistency as proxy. Evaluate result (if std dev \= 0, perfect, else degrade).

  * **Rhyme Coverage**: parse using `rhyme.map` results. If a section’s scheme expected lines to rhyme in groups, check if they indeed grouped. Actually, we know from draft because we forced it. But maybe if we allow variation, check count of distinct rhyme classes in each section vs expected. For a two-couplet verse (AABB), we expect exactly 2 classes in 4 lines. If we got 3 or 4 distinct endings, coverage is poor. So define coverage \= (expected number of rhyme classes) / (actual number of rhyme classes). Actually, expected classes smaller number, so if actual \> expected, coverage \<1. Summarize across entire lyric or worst-case section.

  * **Alliteration/Assonance**: Scan each line or adjacent word pairs to see if a lot share first letter or vowel sound. If a line has \>3 words and they all start with same letter, flag. Or if we have a list of tongue-twister patterns, just evaluate simply (due to time).

  * **Lexical Diversity**: gather all unique words in lyrics (minus stopwords like the, and, etc.), count total words. Compute ratio unique/total or some variety metric. If ratio is very low (like lyrics reusing same words over and over outside of chorus), flag. We can separate by sections: high repetition in verse is bad, but chorus intentionally repeats. Maybe skip detailed logic and just do overall unique ratio.

  * **Banned Terms & Toxicity**: define a small list e.g., banned \= \["damn", "bleed"\] (just for test), and check if any appear. For toxicity, maybe use a very simple sentiment word list or skip actual ML. We'll just simulate: if lyric contains something obviously hateful like an epithet (we won't generate that in our templates anyway). But we can test by injecting a banned word artificially. Mark risk\_flags if any found (like set `risk_flags=["explicit"]`).

  * **Copyright**: Hard to implement detection. We can simulate: have a small known lyric line list (like "let it be", "born to be wild"). If any full line matches a known famous lyric substring, flag. This is unlikely in our random generation, so skip actual detection. But include a check if user provided references to existing lyrics in sources (not in our scenario).  
     Summarize all metrics in a structure and decide verdict: if any red conditions (banned terms or extremely off meter or \<95% alignment when available) set an overall "fail". Otherwise "pass" or "warn".  
     Save a QA Receipt with numeric stats (e.g., "unique\_ratio":0.5, "std\_syllables":1.2, etc.) and verdict. Also update LyricPassport: if fail, maybe mark status "quarantine". If all good, maybe mark "qc" or leave in "draft" until alignment done.

* **Task 3.2: Implement `lyrics.refit.prosody`** – This requires musical context. If we integrate with an audio analysis, not trivial in scope. For demonstration, simulate adjustments:  
   Input: maybe BPM and meter. E.g., BPM=120, 4/4 time, perhaps we know each line should fit in 2 bars (roughly 16 beats). If a line’s syllable count \>\> beats, mark it as too wordy. For each such long line, split it into two lines (introduce a line break). If a line is too short (like less than half the allotted beats), maybe join with next line or add filler words (like "oh" or elongate a phrase).  
   Possibly easier: If BPM given, compute an "ideal" syllables per line \= (BPM/60 \* seconds per line \* some factor). Too complicated; instead, do heuristic: if BPM high (\>140) and line length high (\>10 syllables), maybe it's too hard to sing fast – suggest splitting line. If BPM low and lines short, maybe fine.  
   Implement: iterate lines, if line syllables \> 10 and BPM \> 140, then insert a break mid-line (split into two at a comma if exists or just in middle). If line syllables \< 5 and BPM slow (\<80), maybe combine with next line (but careful with rhyme). We could skip combining to avoid messing rhyme scheme.  
   Return a patch object detailing what changes (like which lines split or if we simply output a new LyricSpec with modifications and describe differences). This function should also maintain rhyme scheme if possible (if splitting a line, duplicate the rhyme vowel if needed). Because of complexity, we might just log that no major refit needed in typical conditions.  
   For demonstration, if we have a test where BPM=160 and one line with 15 syllables, we can simulate splitting it.  
   Produce a Receipt summarizing any adjustments (like "Line 2 split into 2 lines for tempo" or "No prosody refit needed"). Possibly update the LyricSpec and store new version (overwriting original in JSON).

* **Task 3.3: Logging to ReasoningBank (optional)** – The design said ReasoningBank logs which prosody moves worked for which tempos/moods. We likely cannot implement actual "learning", but simulate by making an entry: e.g., after QA or refit, if we did a split for fast tempo, log something like `RB.record({topic, BPM, action:"split_line", result:"alignment improved"})`. Since we don't have an actual ReasoningBank interface, just leave a commented placeholder or simple print.

**Milestone 4: Alignment and Caption Generation**

* **Task 4.1: Integrate Alignment (align.run)** – Ideally, we would call an alignment tool. Without one, simulate the timing for each line. If we had an actual audio, we could perhaps cheat by generating synthetic phoneme timings from lyrics themselves. For demonstration:

  * Suppose each line of lyrics takes equal time or known time (like we could allocate 2 lines per 10 seconds etc).

  * For simplicity, assign timings sequentially: e.g., if track length is L seconds (we might not know, could assume 3 minutes \= 180s for a typical song), divide roughly among lines weighted by syllable count. Or assume each line \~2-3 seconds for moderate tempo.

  * Compute a fake `CaptionExport`: a list of caption entries with start and end times and text (like SRT segments).

  * Because not actual alignment, ensure coverage is 100% (we align all lines). But to test threshold, maybe artificially drop one line alignment: e.g., say one line we "couldn't align" – simulate by skipping it or giving it 0 coverage.

  * Actually, do both scenarios for testing: one with all lines aligned (so coverage=100%), one with a misalignment (like if an extra line had no singing).

  * The align.run function can simply produce an SRT string or structure (e.g., "1\\n00:00:01,000 \--\> 00:00:03,000\\n\<line1 text\>\\n\\n2\\n00:00:03,000 \--\> 00:00:05,000\\n\<line2 text\>..."). Or produce an object listing times for each LyricSpec line.

  * Set coverage \= (\# lines aligned / total lines). If skipping none, coverage \=1. If skipping one out of, say, 8 lines, coverage=0.875 (which is below 0.95 threshold).

  * Save the caption to a file (e.g. `file_id` via FileForge simulation: perhaps call `file.mcp save.fromUri` or just assign an ID manually to simulate it).

  * Return the caption data and coverage as output plus a Receipt.

  * If coverage \< 0.95, we need to mark that in LyricPassport.status or risk\_flags (like "alignment\_failed"). Tripwire would require fix or manual alignment. For demonstration, if coverage fail occurs, just flag in output but continue to produce caption for others.

  * If we had actual audio, we could use pocketsphinx or similar offline, but likely out of scope. So simulation is acceptable.

* **Task 4.2: Implement `captions.from.lyrics` and Conversion** – Take the LyricSpec (with lines maybe numbered or time-tagged after alignment) and produce the final caption file content. If align.run already essentially did this, this might just be packaging:

  * Possibly from align we have times per line. Combine with lyrics text to produce SRT: the function could format each line as an SRT entry (with incremental numbering, properly formatted times).

  * Alternatively, produce LRC (which in simplest form is `[mm:ss.xx] line text` for each line or word). We might not bother with word-level, but could try word-level by splitting words evenly in line time as naive approach. But probably not necessary, just support SRT and perhaps have convert to LRC or ASS if needed.

  * `captions.convert(caption_id, to)` – if we have an internal representation (like list of {start, end, text}) we can easily output to different formats:

    * SRT: we already do.

    * LRC: where each line gets a timestamp as `[min:sec.milli]text`. Use start times only typically (LRC can have per-word but the question likely not expecting that detail).

    * ASS: use a static template or skip complexity. Possibly skip actual styling except a note "Karaoke effect possible with style.mcp if given".

  * `captions.style.ass(theme)` – we won't fully implement karaoke highlighting (which requires timing each syllable). But we can simulate by taking an ASS template and populating it with lyrics lines. This might be too deep, so we might just note that we would apply a style (like a specific font color given theme) in the output. Possibly just log "Applied theme X to captions" and maybe adjust some metadata in the ASS file if we had one.

  * The main deliverable is to ensure `captions.from.lyrics` returns a `CaptionExport` object (perhaps containing `file_id` of the SRT and maybe a quick stat like total lines, etc.). Then `captions.convert` returning similarly.

  * For demonstration, create a small SRT from our alignment simulation and show it can be converted to e.g. LRC format by a call.

* **Task 4.3: Integration with FileForge** – When saving caption files, do it through FileForge API if possible. For instance, call `file.mcp upload.init` \+ `upload.complete` or the simpler high-level if available. If that’s too heavy, at least simulate storing the caption content and assign a `file_id` like `file_caption123`. Possibly use a global dictionary in FileForge stub to store content by id. We should ensure the `artifact_uri` in LyricPassport references these (like entif://media/caption/\<something\>).

  * After generating SRT, call `file.mcp hash.verify` to simulate verifying integrity (or skip if content small).

  * If virus scanning was integrated, presumably the caption file would be scanned by FileForge, but it's text so likely just for record. We'll skip scanning.

  * Update LyricPassport: add an entry for the caption file in receipts or a field listing caption file ids, mark status to "aligned" or "final". Possibly call `lyrics.export.passport` as final step to finalize passport with all these details (like set status and attach receipts list).

  * Save or output the LyricPassport (maybe to the JSON file or a separate artifact).

* **Task 4.4: Hook up tripwire gating** – If alignment coverage \< 0.95 (95%) as per truth fence, in `qa.evaluate` or after align, mark the lyric as quarantined and output that a re-record or manual alignment is needed. We can simulate Tripwire by just not proceeding to final export if coverage fails, or by requiring an override flag (which we won't implement fully). For demonstration, just print a warning "Coverage below 95%, content quarantined until fix."

**Milestone 5: Testing and Final Integration**

* **Task 5.1: End-to-End Test with Example** – Use a hypothetical scenario to run through:  
   Input: topic "heartbreak", mood "sad", maybe provide a reference BPM, and run plan, draft, QA, alignment, caption creation.

  * Confirm plan yields sections, draft yields lyrics lines with intended structure (check rhyme patterns manually), QA yields mostly passes (if we intentionally can add a banned word to test detection, do that as a separate test too).

  * Test alignment: since we simulate, ensure the times are plausible and the output SRT is well-formed.

  * Test caption conversion to another format to verify it runs without crashing (comparing the output string or object).

  * Check that Nx caching logic would skip redoing plan/draft if lyrics unchanged. Possibly simulate by running `lyrics:qa` twice to see if second time reads from cache (we might not easily simulate Nx Cloud here, so maybe skip this actual demonstration, but logically all tasks should be idempotent for caching).

  * Also ensure all intermediate data flows: e.g., if we change a line in the lyric JSON and run QA again, it should re-evaluate.

  * Document in logs or final printouts the final LyricPassport and receipts.

* **Task 5.2: Integration with other forges** – While fully integrating might be beyond, we can demonstrate how it fits:

  * For MediaForge: show that our generated `file_id` for caption can be handed to `media.captions.attach`. Perhaps call `media.captions.attach(file_id_of_audio, file_id_of_srt, "mux")` in a simulated way (if we had MediaForge stub available). Or just ensure to output how `srt_url` (entif:// or actual) is included in final output for autopost as per design. Possibly modify the `ArchiveForge` or release manifest to include `srt_url`.

  * For SocialForge: we might simulate sending a snippet of lyric to a social post for promotion, but that's outside primary focus. At least ensure that if this lyric was part of a song release, and SocialForge picks up `srt_url` from release manifest, that is consistent with how we've output it. (This may be too fine, we can skip actual simulation).

  * Confirm that if AuthForge were to check something (like if voice clones needed consent before we can proceed to alignment or TTS), we leave that as not triggered in our test (we don't do voice clone).

* **Task 5.3: Evaluate and Fine-tune** – If any QA conditions incorrectly pass or fail, adjust logic. e.g., maybe our rhyme detection is naive; test a case where we intentionally break rhyme scheme to see if QA catches it. If not, refine check to be stricter (like ensure pair lines truly have same last phonetic chunk).

  * If meter calculation always shows pass even for variety, consider making it stricter if needed to demonstrate a fail scenario (maybe artificially set threshold such that slight variations cause warnings to illustrate the gating).

  * Possibly test with a purposely toxic line or banned word insertion to verify the pipeline blocks or flags it.

  * Document in the receipts or output if an issue is flagged (like adding risk\_flags on passport).

* **Task 5.4: Documentation & Dashboard Integration** – Output or log something that could feed VizForge:

  * For prosody heatmap: we can generate a simple CSV or JSON of line index vs syllable count difference or stress alignment count. Possibly store it as a file in a known location that a viz script could pick. Or simply note that data is available (the QA receipt has some values).

  * For alignment sparkline: maybe print times for each line or offset between expected and actual (we have none since expected not well-defined).

  * If time, quickly format a basic chart: e.g., print in the QA receipt each line length, we could imagine a script using it. We won't fully implement viz generation here, but ensure data is accessible (like output `stats: {line_syllables: [8,8,8,8], unique_ratio: 0.6, ...}` in QA receipt).

  * Use MetadataForge to attach a descriptor to the lyric artifact as well (for query, though that might be overkill). Possibly skip due to time, but mention how we would stamp the lyric with an entif:// resource that ties to any related doc or concept.

After performing these tasks, we will have a cohesive LyricsForge pipeline and some demonstration of outputs at each stage. This covers the generation of lyrics and alignment, fulfilling the design blueprint given.

---

Now that the analysis is extremely long, likely the actual final answer needs to be carefully summarized but still comprehensive. The user expects a single cohesive markdown blueprint, but not necessarily every fine detail of code. They want headings, bullet lists, short paragraphs, and citations.

We should ensure the final answer is not as bullet heavy in the architecture descriptions beyond reason, because they said combine bullet points for grouped ideas or steps, but paragraphs for descriptive text.

We can follow roughly the outline prepared above, but in final writing we might compress some parts to avoid too much detail in one place (like I may not need to cite every single detail repeated).

We have to also ensure it's not *too* enormous for readability. Given they've asked for expert-level blueprint, they likely expect a fairly large answer indeed, possibly a few thousand words, which we have.

We should incorporate citations especially for claims or specifics from the source:

* For each Forge we should cite at least the relevant connected lines we identified.

* The answer should preserve citations as is.

I will now proceed to draft the final answer in proper markdown style, leveraging the above plan.

# **Entif 2.0 Forge Modules – Architecture & Design Blueprint**

Below is a comprehensive design blueprint for each **Forge** in the Entif 2.0 system. Each Forge is an autonomous module with a clear purpose, built on common framework elements (MCP interfaces, Nx-managed tasks, Receipt-based quality gates, etc.)【43†L13442-L13450】. The blueprint details each Forge’s responsibilities, technical architecture (interfaces, data flows, schema, integrations, security, observability), and an implememodular tasks (\~4 hours each) grouped into milestones.

**Common Framework Assumptions:** All Forges leverage Entif’s core platform: an **ADK orchestrator** coordinates multi-step workflows; **MCP** (Micro Contract Protocol) connectors expose each Forge’s functionality via parse-first, deterministic APIs (the “USB-C” of Entif)【43†L13442-L13450】; operations are governed by **Receipts** (every action returns a structured Receipt documenting inputs, outcomes, and evidence)【43†L13442-L13450】. Artifacts are identified by `entif://` URIs and described in the **MetadataForge** graph for traceability【43†L13445-L13453】. Cross-cutting services include **ReasoningBank** for strategy memory, **GraphRAG/Glyph** for semantic context, \*\*TRning and task decomposition, **Petri/Tripwire** for testing and policy enforcement, **AuthForge** for authentication/authorization, **FileForge** for content-addressable storage and file quarantine, **ArchiveForge** for capturing manifests of work, **VersionForge** for version control, and **VizForge** for dashboards and visual validations【43†L13445-L13453】. These are referenced throughout all Forge designs to ensure consistent governance (e.g. policy checks before destructive actions, receipts for every decision) and developer experience (e.g. Nx-managed tasks, cached builds, consistent logging).

Each Forge description is structured with **Purpose & Responsibilities**, **Architecture & Components**, and an **Implementation Plan**. The implementation plans break development into milestones and atomic tasks (\~4h each), enabling incremental, testable progress toward a fully functional module.

---

## **MediaForge** {#mediaforge-1}

### **Purpose & Responsibilities** {#purpose-&-responsibilities-4}

**MediaForge** is the *generative and transformation plane* for all media artifacts (imagery, audio, video) in Entif. It is responsible for:

* **Media Generation:** Creating nrative AI models (images via Midjourney/Stable Diffusion, video via Runway, audio via TTS like ElevenLabs, etc.) behind a uniform interface【43†L13466-L13474】.

* **Media Transformation:** Deterministically processing and editing media with an auditable pipeline of operations (resizing, cropping, filtering, compositing, encoding) using a typed Filter Graph DSL that compiles to FFmpeg and similar libraries【43†L13468a Assembly:\*\* Combining media elements and auxiliary data – e.g. attaching subtitles or transcripts to video, adjusting aspect ratios or framing, normalizing loudness and color – to produce composite outputs ready for distributio】.

* **Quality Control:** Enforcing objective quality gates on media outputs (“truth fences”), such as checking for black frames in video, silent or clipped audio, sync drift between audio and video, correct color spaces, bitrate within acceptable range, caption coverage, etc. Any output failing a quality check is quarantined until fixed【43†L13472-L13480】【5†L13683-L13691】.

* **Provenance & Metadata:** Stamping outputs with provenance info (like embedding C2PA signatures or watermarks)\* record that details each file’s technical metadata, content hash, generation method, licenses, and associated receipts【43†L13472-L13480】【3†L13511-L13519】.

* **off:** Once MediaForge produces a final, evidence-backed asset, it hands it off to other forgrge for publishing on social platforms). MediaForge itself does not upload externally; it ensures assets are in the correct format and stored in FileForge for downstream pickup【43†L13477-L13480】.

MediaForge essentially makes media creation **predictable, governable, and fast** by providing one spec to request what you want, one graph to define how to preset for final encoding – with receipts at every step to prove what was done【6†L13859-L13867】【6†L13900-L13908】. It prioritizes cache-able deterministic transforms and evidence-based gates oversults are reproducible and safe【6†L13904-L13910】.

### **Architecture & Components** {#architecture-&-components-4}

**MCP Interfaces:** MediaForge exposes multipl\` namespace, each handling a stage of media processing:

* **Generation –** `media.gen.mcp`: A unified interface to various external generators. The primary method is `generate(:contentReference[oaicite:15]{index=15}{ media_passport, receipt_id }` which takes a **GenSpec** (a provider-agnostic description of what to generate) and returns a new media artifact plus a Receipt【4†L13621-L13629】. The GenSpec includes fields like kind of media (image, audio, video), prompt text, optional negative prompts, style pack references, and technical guidancsolution or duration)【3†L13525-L13533】【3†L13537-L13545】. It also specifies a provider/model (Runway, Midjourney, etc.) or allows MediaForge to pick one. MediaForge’s generation orchestrator will route the request e provider adapter (e.g., `stable.mcp` for Stable Diffusion) and hanprocessing if needed【4†L13623-L13631】. Each `generate` call logs usage info (model name, version, tokens consumed) and any policy flags (e.g. if content might be sensitive) in the resulting Receipt【4†L13627-L13633】. Other methods in this interface may include `upscale(image_id, mode) → MediaPassport` for resolution enhancement via AI, etc., all behind the common receipts-first facade.

* \*\*Tran deterministic filter/transform pipeline. The key method is `transform(graph: TransformGraph) → { outputs: MediaPassport[], receipt_id }` which executes a series of image/audio/video operaa **TransformGraph** JSON object【4†L13633-L13641】. The TransformGraph is a DSL representing nodes of operations and their connections – e.g., trim clips, concatenate, scale resolution, reframe aspect ratio, apply color correction, overlay text or images, normalize loudness, encode to a format【4†L13559-L13567】【4†L13573-L13581】. MediaForge compnto one or more ffmpeg pipelines (ensuring safe parameter values and no forbidden operations)【4†L13595-L13603】. This interface also provides utility endpoints:

  * `probe(fi:contentReference[oaicite:23]{index=23}a` uses ffprobe to fetch technical metadata of a media file (dimensions, codec, bitrate) for planning【4†L13634-L13642】.

  * `thumbnail(file_id, time_s?, width?) → MediaPassport` to capture a frame thumbnail from a video at a given timestamp【4†L13634-L13642】.

  * Possibly other specific transforms (like `media.fx.fadeIn`, `media.fx.overlayAudio`) mapped internally to the graph compiler. Alls are stored via FileForge (content-addressable by hash) – the returned MediaPassport includes the FileForge `file_id` and content hash L13499-L13507】. Crucially, transform operations are **idempotent** given the same inputs and graph, so they can be Nx-cance (heavy renders are reused if nothing changed)【6†L13821-L13826】.

* **Captioning & Subtitles –** `media.captions.mcp`: Tools for transcript and subtitle handling. For example, `transcript.extract(file_id, lang_hint?) → { text, srt_fil:contentReference[oaicite:27]{index=27}:contentReference[oaicite:28]{index=28} AI speech-to-text or leverages an existing lyric (if the media is a song with known lyrics from LyricsForge) to produce a transcript of an audio/video file【4†L13643-L:contentReference[oaicite:29]{index=29}s the raw text, an SRT caption file (saved in FileForge), and a Receipt documenting the method :contentReference[oaicite:30]{index=30} confidence).` captions.attach(file\_id, srt\_file\_id, kind: "sidecar"|"mux") → MediaPassport`will attach captions to a video – eit:contentReference[oaicite:31]{index=31}idecar file reference in the MediaPassport or actually multiplexing the subtitle track into the video container (for MP4/MKV)【4†L13643-L13650】. There’s also`captions.burn(fid, style?) → MediaPassport\` to render open captions onto the video frames permanently【4†L13681-L13684】. Under the hood, these utilize transforms (e.g., an ffmpeg filter to burn subtitles using the SRT) but are exposed as higher-level actions. MediaForge integrates with **LyricsForge** here: if extracting a transcript from a it can call LyricsForge’s alignment capability to get a high-accuracy timed transcript instead of generic ASR【4†L13645-L13648】.

* **Quality Check (QC) –** `media.qc.mcp`: Implements **truth-fence** validation of media files. `analyze(file_id) → findings` runs a battery of checks on the given ort【4†L13652-L13660】. Checks include:

  * **Video black frames / freeze detection:** scanning for long runs of identical frames or all-black frames【4†L13654-L13658】.

  * **Bitrate envelope:** verifying the file’s bitrate is not below an expected floor (which could indicate too muchits resolution) or above platform limits【5†L13687-L13690】.

  * **Frame integrity:** ensuring no frame decoding errors or mismatches.

  * **Audio loudness & peak:** calculating integrated loudness (LUFS) and true-peak dB and confirming they meet standards (e.g. –14 LUFS, –1 dBTP for streaming)【5†L13685-L13693】.

  * **A/V Sync:** checking if audio is synchronized with video (e.g., clap tg known reference signals) within a frame tolerance【5†L13691-L13699】.

  * **Color format correctness:** ensuring color primaries and transfer characteristics metadnd correct (e.g., BT.709 for SDR content)【5†L13683-L13691】.

  * **Caption coverage:** if the media has speech, ensure captions cover ≥95% of spoken words and have no overlaps, and that subtitle text is within safe on-screen areas【5†L13693-L13700】.

  * \*\*Provenance & safety flags:\*quired watermarks or C2PA signatures are present, and scanning for any NSFW or other disallowed content signals【5†L13695-L13700】.  
     Each check yields a pass/warn/fail status. The analysis Receipt includes these per-check results, and the overall verdict. If any critical check fails (marked “Red”), MediaForge will update the MediaPassport’s status to *quarantine* (meaning this file cannot be exported or published)【5†L13697-L13702】. These QC receipts serve as evidence that outputs meet quality standards before they progress in the pipeline. MediaForge can be configured to automfixes for certain failures (e.g., re-encode if bitrate too low, or call `captions.attach` if captions missing) or require manual intervention via Tripwire if needed.

* **Export & Finalization –** `media.export.mcp`: Packaging media into final deliverables. The main method is `export(input, preset_id) → MediaPassport` which takes either a media file or a Trat as input and encodes it according to a named **ExportPreset**【4†L13662-L13670】. ExportPresets define platform-specific encoding settings (container format, codecs, resolution, frame rate, bitrate or CRF, audio channels, loudness target, color space, etc.)【4†L13605-L13613】. For example, `export_yt_short_9x16` might specify MP4/H.264 video, 1080×1920 resolution, 60s max length, –14 LUFS audio. The export function will:  
   1 ID, first run the transform to get a file.  
   2\. Encode that file to the preset’s requirements (via ffmpeg, using the preset’s parameters)【4†L13685-L13693】.  
   3\. Optionally apply **provenance marking**: if the preset or policy requires, call `media.provenance.mcp` to embed digital signature of content origin) or add a visible watermark (like a logo) on the output【4†L13663-L13670】.  
   4\. Run QC checks on the encoded file as a final safeguard (often presets include constraints like max file size, correct loudness; verifying post-ose were met)【4†L13663-L13666】.  
   5\. Save the exported file via FileForge (deduplicated by hash) and produce a new MediaPassport for it. The passport links to the original source media (via an “entif://media/…” URI) and contains its technical metadata (transform, QC, export)【3†L13511-L13519】.

* **Provenance & Licensing –** `media.provenance.mcp`: Methods for explicit provenance operations. `c2pa.sign(file_id, profile) → MediaPassport` will take a media file and produce a cryptographically signed version with an attached C2PA manifest (using a given signing profile/certificate)【5†L13670-L13674】. `watermark.apply(file_id, method:contentReference[oaicite:48]{index=48}` will imprint a watermark (visible logo or invisible steganographic mark) onto the media【5†L13670-L13674】. `license.audit(media_id, inputs[]) → findings` can be used to audit the asset’s components versus licenses (for instages or generative model outputs have usage restrictions, ensure they are followed)【5†L13670-L13674】. These functions ensure that any media leaving the system carries the appropriate attribution or mark if required by content policy. They are typically called just before or during \`export outputs.

All MediaForge MCP endpoints are **parse-first and receipts-first** – they validateg., ensure format IDs are recognized, files exist in FileForge, etc.) before executing, and any external call (to provider APIs or system commands) is wrapped in Tripwire safety checks as configured (for instance, scraping a web image for generation is disallowed unless a waiver Tripwire rule allows it)【5†L13675-L13677】. This design means erroneous requests fail fast with a clear error Receipt, and side-effectsPI usage or file writes) only occur after policy guards pass.

\*\*Data Models & Storl data entity for MediaForge is the \*\*This is a TypeForge schema capturimetadata about a media artifact and lives in `packages/protocol/src/media.ts`【3†L134ields in the MediaPassport include:

* `id: med_<unique>` – a stab in entif:// URIs)【3†L13495-L13500】.

* `file_id` – reference to the raw file in FileForge (which stores the actual bytes). Also the content hash (sha256 or blake3) of the file for deduplication and integrity tracking【3† `kind` – enumerated type “image” | “audio” | “video”【3†L13490-L13498】.

* **Technical properties:** e.g., `width, height` for images/videos, `fps` for video, `duration_ms` for AV media, audio channels, sample\_rate, bit\_depth for audio, codec names, bitrate, and advanced video info (colorspace, color primaries, transfer function,nts for color, and an `hdr` flag if applicable)【3†L13503-L13511】.

* **Provenance & generation:** e.g., `generator` object with provider and model info if this media was AI-generated (including random seed used)【3†L13511-L13519】; `license` info if known (original, stock, third-party, etc.)【3†L13513-L13519】.

* **Trust & safety:** `c2pa` with flags if it’s signed and manifest ID; `watermarks` list if any waed【3†L13513-L13519】; `risk_flags` like “nsfw” or “copyright-risk” if any detectors raised concerns during QC【3†L13517-L13520】.

* **Processing record:** An array of `receipts` IDs documenting the chain of generation/transform/analysis steps that produced this filifecycle state: “draft” (still in production), “qc” (under quality check), “quarantine” (held due to an issue), or “final” (approved and ready for use)【3†L13519-L13522】.

These passports are stored in MetadataForge (graph nodes)(e.g., find all media generated by model X, or all final videos in HDR color). When media is created or processed, MediaForge updates or creates diaPassport and attaches it to outputs and receipts【3†L13515-L13523】. FileForge is used to store the actual media files by content hash and returns `file_id`s which MediaForge embeds in the passport【3†L13499-L13507】. MediaForge itself does not handle raw file conh ffmpeg; it relies on FileForge for virus scanning and storage isolation (so no untrusted media bytes are used without scanning).

MediaForge uses the **TransformGraph** data model to represent editing pipelines. This model (also defined in protocol types) lists `inputs` (with FileForge file\_ids) and a series of `nodes` each specifying an op and its parameters, sults to named output files or streams【4†L13555-L13564】【4†L13587-L13592】. The graph DSL covers operations as enumerated earlier (trim, concat, scale, reframe crop, fps adjust, color adjustmend ducking, overlay, text, subtitles burn-in, watermarking, encode etc.) with strongly typed parameters【4†L13559-L13567】【4†L13573-L13581】. This structure allows complex editing to be described declaratively, logged as JSON, and even replayed exactly (which ArchiveForge uses to snapshot workflows)【5†L13722-L13730】. The compiler ensures all file paths are resolved to FileForge safe locations and that parameters are within safe ranges (e.g., no negative dimensions3595-L13600】.

**Integration Points:**

* **FileForge:** As noted, all reading/writing of media bytes is through FileForge. MediaForge calls `file.mcp` to get file URIscessing, and saves results back to it. For instance, when generating an image, after receiving it from an API, MediaForge will call `file.mcp upload` to store it and get a `file_id` before creating the MediaPassport【7†L43-L47】. Similarly, intermediate frames or thumbnails may be stored. FileForge also runs virus scans and PII scans on any externent (if MediaForge downloads an image from a URL via a provider adapter, FileForge’s quarantine step will run)【39†L7-L15 design, MediaForge never bypasses FileForge for file access, which centralizes storage policy enforcement (size limits, MIME type checks, etc.)【39†L13-L18】.

* **ArchiveForge:** MediaForge produces data that ArchiveForge captures in manifests. For every complex operation (like generating a video via multiple steps), ArchiveForge can store a capsule containing the GenSpec used, the exact TransformGraph apPreset, and all associated Receipts【5†L13722-L13730】. This means the media output is fully reproducible: given the manifest, one can re-run those steps and get the same result (modulo nondeterministic model diffForge also records version info: e.g., it will note which version of a model or filter library was used (from receipts) so that if a model is updated, reproducibility issues are flagged【5†L13708-L13716】.

* **ReasoningBank:** MediaForge consults ReasoningBank for dynamic decision-making about external services. For instance, when `media.gen.generate` is called without a fixed provider, ReasoningBank’s strategy router will recall past performance of ilar tasks (cost, latency, quality) and pick the best fit (e.g., Runway vs. Sora for video generation)【5†L13708-L13716】. It uses accumulated success metrics es (like “talking-head video” vs “landscape scene”) in the decision【5†L13708-L13715】. Over time, as receipts log outcomes, the ReasoningBank updates these priors to continually improve provider selection. In addition, MediaForge can query ReasoningBank for budget coGenSpec`has a`budget\_usd\` limit, ReasoningBank may trigger using a cheaper model or an early stop if costs are mounting with little result【5†L13713-L13717】. ReasoningBank plus Petri also govern promotions of new generative models: Petri adversari for a model route (e.g., ensure a new image model doesn’t produce disallowed content under certain prompts) before ReasoningBank will allow it for general use【5†L13711-L13718】.

* **Petri & Tripwire:** MediaForge is tightly governed by Petri tests and Tripwire rules for safety. There are Petri test packs for known failure modes of media models (e.g., prompts that often cause glitches or IP violations) –s are gated on these tests being green【5†L13711-L13718】. Tripwire policies enforce usage rules: for instance, any write to an external provider’s API goes through a Browser-Ved (for scraping interfaces) or a usage check (ensuring we don’t violate provider TOS)【4†L13627-L13630】. If a Tripwire rule triggers (e.g., content flagged as potential disallowed deepfake by an AI filter), it can tput or require a human waiver via a policy receipt. On the output side, Tripwire can enforce that certain transformations require roles – e.g., only users with a `media.operator` role can use `media.export` with a “publish-grade” preset (AuthForge’s PDP is called to verify)【2†L91-L99】. Another Tripwire integration: if a required wag (policy: all AI-generated images must be watermarked), the QC will mark it amber and Tripwire can automatically call `media.provenance.watermark` to apply it, or block export until done【2†L49-L57】.

* **LyricsForge & ArticleForge:** MediaForge works with text for captions and generative guidanceith **LyricsForge** to generate or align subtitles when dealing with music videos or lyric videos – for example, `media.captions.transcript` will, if lyrics exist, call `lyrics.align` to get precise timing rather than relying purely on ASR【4†L13645-L13648】. It uses **ArticleForge**/WordForge outputs for overlay text or image generationce, an ArticleForge piece might include a prompt for an illustration, which MediaForge then generates an image for and inserts into a video)【5†L13735-L13738】. In essence, ArticleForge provides long-form content and MediaForge ca of it (turn paragraphs into animated text or figure images). **WordForge** also assists by providing content-aware prompt tuning: MediaForge’s image generation might use WordForge to fetch related concepts (Glyphs) ensuring the image prompt covers the key semantic elements of the request【5†L13737-L13740】.

* \*\*Versiusable media configurations and packages are versioned. Style packs for generation (collections of prompt modifiers, LUTs for color grading), filter graph libraries (common FX chains), and export presets are maintained via VersionForge with . Breaking changes (like a change in the TransformGraph JSON schema or MediaPassport fields) result in a major version bump; VersionForge then helps produce migration guides and update any ref13869】. MediaForge itself also ties into the release process: e.g., when `nx release` is run on the monorepo, it can trigger `version.mcp` to bump package versions ry receipts (like attach a QC summary receipt for a release’s demo videos)【6†L13863-L13867】.

* **VizForge:** MediaForge outputs a wealth of metrics that VizForge turns into dashboards. Examples: a \*\*throughput dashboarr of generation jobs per day and their average latency or success rate【6†L13847-L13855】; a **QC heatmap** showing which qu frequently fail (e.g., perhaps “loudness too high” is a common amber issue) so we can target improvements【6†L13848-L13856】; distributionsitrate vs. targets across recent outputs (to see if we consistently overshoot or undershoot)【6†L13848-L13856】; **cache hit rate** charts showing how often results are reused from Nx build cache; **cost curves** showing cumulative external API cost per provider per month【6†L13849-L13855】; and a **caption coverage** chart tracking what percentage of our released videos have subtitles coverage meeting threshold【6†L13851-L13853】. These are truth-fenced charts, meaning VizForge validates the data (units, baselines) and attaches receipts to them as well【42†L25-L33】【42†L43-L46】. MediaForge populates an internal “Obserh these stats by emitting events or receipts that VizForge’s pipeline picks up. For example, each QC run’s Receipt is parsed to update a central quality log; VizForge then renders This transparency ensures any regressions (like a new model causing more failures) are quickly visible.

**Security & Compliance:** MediaForge takes a **receipts-first, policy-aware** approach, which inherently boosts security: every operation is logged, and external actions are gated. Some specific points:

* \*\*Privacy controls:data from outputs by default (e.g., no EXIF location data in generated images)【6†L13831-L138media might contain PII (like image with faces), it can call FileForge’s redaction or prompt the user (privacy\_mode in GenSpec can be “redact” to auto-blur faces, etc.)【6† **Copyright compliance:** MediaForge honors the `license` field in GenSpec – if set to “original-only”, it will ensure generative models do not include any third-party content (by using models or settings that avoid it)【6†L13833-L13841】. It can run a `license.audit` step that scans the output forrighted material or patterns (via Petri tests) before allowing publish【6†L13833-L13841】. If an edge-case arises (e.g., an image might resemble a trademark), Tripwire can require an explicit waivecording that decision).

* **Deepfake safeguards:** If using any voice-cloning or generative tech that could impersonate, MediaForge requires explicit consent artifactsle, ElevenLabs voice synthesis will only run if a signed consent file is on record (checked via AuthForge or a Tripwire list of allowed voice IDs)【6†L13835-L13842】. Protected names or likenesses are blocked by default (Tripwire has celebrity faces/names that if detected, yields a red flag)【6†L13NSFW filtering:\*\* MediaForge uses an NSFW classifier on generated visuals; if content is sexual or violent beyond a threshold, the generrted (red) or quarantined (amber needing review)【6†L13839-L13841】. Similarly for audio transcripts (explicit lyrics detection, etc.).

* **Provenance recommendation:** While MediaForge can sign outputs with C2PA, it byt optional (configurable per preset). However, internal policy might be to always watermark any publicly released AI-generated media for transparency. That is encouraged in usage guidelines, and receipts capture whether an asset is watermarked or not【6†L13841-L13843】.

* **Operational Security:** All external provider credentials (API keys for Midjourney, etc.) are stored in AuthForge’s vault and not hardcoded. MediaForge connectors fetch them at runtime and do not expose them in receipts (receipts might includedentials). Rate limits on external calls are centrally defined (so we don’t accidentally overl costs – ReasoningBank can enforce budget, as mentioned).

* **Data retention:** Generated artifacts are stored conte policy demands deletion (right to be forgotten), we can remove the FileForge blob and detach its node in Metadata (though receipts remain as part of audiitate this, MediaForge marks in passports which outputs came from personal data or user uploads, so those can be traced if needed for deletion requests【18†L15313-L15321】.

Overall, MediaForge is built to plug into Entif’s CI/CD style workflow. Each of its capabilities is accessible via Nx tasks (for automation in pipelines). For example, an `nx run media-forge:fx --graph=<file>` command could execute a transform, producing outputs cached in Nx artifact storage if repeatable; `nx run media-forge:qc --fileId=<id>` would run quality checks on a media file and perhaps fail the build if it doesn’t meet gates (preventing deployment of a subpar video). This ensures that from development to deployment, media assets pass through the same governed pipeline with consistent results.

### **Implementation Plan (MediaForge)** {#implementation-plan-(mediaforge)-1}

The implementation can be broken into milestones aligning with feature vertical slices, so we can deliver i Media Transformation & QC Engine\*\*  
 *Goal:* Establish the deterministic transformation pipeline and quality gating as the backbone of MediaForge.

* **Task 1.1: MediaPassport & TransformGraph Schema (4h)** – Define the `MediaPassport` and related types in `protocol/src/media.ts` according to the specetadata, provenance, etc.)【3†L13495-L13503】【3†L13503-L13511】. Define `GenSpec`, `TransformGraph`, `ExportPreset` interfaces as well【3†L13525-L13533】【4†L13604-L13613】. Use TypeForge to enforce allowed enumerations (e.g., allowed codec strings, container types) and optional vs required fields. This schema work sets the contract for MCP and ensures all components refer to the same data modeType definitions & validation functions for these structures, with unit tests for one or two example passport*Task 1.2: TransformGraph Compiler MVP (8h)*\* – Implement a minimal parser/compiler that takes a `TransformGraph` JSON and produces an ffmpeg command or sequence of commands. Start with a subset of operations: e.g., implement support for `scale`, `encode` (final output), and `concat` first【4†L13559-L13567】【4†L13587-L13592】rameters (e.g., allowed scale methods) and incorporate guardrails: if user tries an unsupported codec or extreme resolution, throw an error (Receipt with failure)【4†L13595-L13600】. Develop this as a standalone module (so ith sample graphs). *Deliverable:* A function `compileTransform(graph) → ffmpegCommand[]` and associated tests (e.g., compile a graph with scale+encode and verify the ffmpeg command string is as expected; also verify it rejects disallowed combinations).

* **Task 1.3: QC Analyzer I** – Implement the `media.qc.analyze` logic. Use ffprobe and other libraries for real metrics: e.g., call ffprobe to get frame hashes forction, use a loudness scanner (like an EBU R128 scanner via ffmpeg filter) for LUFS and peak【4†L13654-L13658】【5†L13685-L13693】. Alternatively, for initial dev, simulate results for known test files (e.g., create a black frame video to test detection). Build checks for each gather histogram of frame pixel variances or brightness – flag fail if \>N consecutive black frames.

  * Loudness: if using ffmpeg’er in analysis mode, parse its output (LUFS, dBTP values) and compare to thresholds【5†L13685-L13693】.

  * etc., for initial at least implement 2–3 critical ones (say blss, resolution/bitrate).  
     Aggregate into a structured `QCFindings` object with boolean or percent pass for each category【5†L13683-L13691】. *Deliverable:* A module `analyzeMedia(file) → findings` with test cases (e.g., supply a short video with knofy findings includes them). Integrate it in an MCP handler stub for `media.qc.mcp`.

* **Task 1.4: Basic MCP Service Setup (4h)** – Scaffold the MediaForge MCP service (`packages/media-forge`). Implement stub handlers for `gen.generate`, `fx.transform`, `qc:contentReference[oaicite:134]{index=134}:contentReference[oaicite:135]{index=135}that validate inputs and call the underlying functions from Tasks 1.2 & 1.3 or placeholders. Include a Receipt creation mechanism: define a` makeReceipt(operation, details)`helper t:contentReference[oaicite:136]{index=136}eipt JSON and returns an ID (simulate storing it in an in-memory map for now)【42†L19-L27:contentReference[oaicite:137]{index=137}thod attaches relevant data (e.g.,`fx.transform`receipt lists the operations and output hashes;`qc.analyze`receipt lists each check with outcome). *Deliverable:* A running MCP service accessible via dev tools (perhaps using entif CLI). We should be able to do something like`media.qc.analyze(file\_id)\` via an MCP client and get back a findings object (with dummy data if necessary).

**Milestone 2: Provider Integration**  
 *Goal:* Implement the ability to generate media through external providers and incorporate caching & strategy.

* **Task h)** – Define a standard interface for provider adapters (e.g., `IProvider.generate(inputs) → fi:contentReference[oaicite:141]{index=141}r each content type). Create stub modules for a couple of providers, e.g.,` midjourney.mcp`(if direct API available) or a dummy`stable.mcp`that loads a local model or calls a fa:contentReference[oaicite:142]{index=142}tual API integration may require keys, for now simulate with placeholders (or optionally integrate a public Stable Diffusion API if one is free). Also implement usage logging: e.g., have each call return usage stats (like number of credits used, etc.)【4†L13627-L13633】. *Deliverable:* A`providers/\` directory with one dummy provider that reads a prompt and returns a static image (for testing flow), and the interface so real ones can implement it similarly.

* **Task 2.2: media.gen.generate Implementation (8h)** – Implement thdia.gen.mcp\` handler: parse the GenSpec, decide which provider to use, call the corresponding adapter, get the output file, store it via FileForge, and create a MediaPassport for33】. Include steps:

  * Determine provider: if `spec.provider` given, use that; if not, query ReasoningBank (which for now, can be a simple function that returns a default or rotcan simulate ReasoningBank by reading a config of which provider suits the content type (e.g. image \-\> stable, video \-\> runway).

  * Prepare the providerpt and all required fields present (if not, error Receipt).

  * After generation, call FileForge to save (simulate with local FS if no actual FileForge yet).

  * Create MediaPassport with conten get from file properties or provider info – e.g., for an image we know width/height from output, for audio the sample rate, etc.)【3†L13503-L13511】, generator info (provider name, model if available, any seed)【3†L13511-L13519】, initial status “dra(the generation receipt).

  * If policy says do quick checks (like NSFW classifier on result), run an image moderation model stub (could uNSFW detector on the output image, or just flag safe since we know test images).

  * Return media\_passport and generation Receipt.  
     caching: If `spec` has a deterministic seed and identical parameters have been used before, we could avoid regenerating. For now, log a key \= hash(spec) and n a cache map, short-circuit and return existing media (point to its passport)【6†L13821-L13826】. This prevents duplicate calls from costing API usage.

* *Deliverable:* A functioning `media.gen.generate` – testable by calling it with a sample prompt and seeing it produce an image (even if dummy), and then calling again with same prog path. Validate that the MediaPassport returned contains expected fields (maybe check kind, dimensions for an image, receipts list length=1, etc.).

* **Task 2.3: Budget & Timeout Enforcement (4h)** – Enhance `media.gen` with simple budget control: if GenSpec.budget\_usd is set and provider cost is known per run, decide early termination. For example, if provider X costs $0.10 per image and budget is $0.05, then either choose a cheaper model or refuse. Without actual costs, simulate by having ReasoningBank store a fake cost per provider and comparing. Also handle `spec.guidance` like fields: e.g., `pri:contentReference[oaicite:154]{index=154}:contentReference[oaicite:155]{index=155}rompt or result doesn’t include personal info (maybe beyond scope to implement fully, mention only). Implement a simple timeout for generation: use an async call with a timer that aborts if it exceeds a threshold (this ensures a stuc:contentReference[oaicite:156]{index=156}:contentReference[oaicite:157]{index=157}hang the system). *Deliverable:* Updated` generate\` that checks a dummy cost table (like stable \= $0.02, runway \= $0.2 per request) and prints a warning or chooses alternate (maybe always choose stable if budget \< $0.1). Plus unit test simulation: e.g., set budget low and see it pick the “cheap” provider.

* **Task 2.4: Nx Integration & Caching (4h)** – Register Nx targets for generation tasks. E.g., define in `project.json`:

  * `gen: {executor: run-commands, command: "node tools/media/gen.js --specFile=..."}` the spec file (so Nx caching can key off prompt changes)【6†L13803-L13811】. Ensure that `gen` is cacheable only if generation is determiniers might not be fully deterministic; but if seed given, treat as deterministic and cacheable)【6†L13821-L13825】 target set to not cache QC results, etc. Actually from Nx config snippet: `qc` is not cached【6†L13821-L13824】.

* Write a smamedia/gen.mjs\` to read a GenSpec JSON and call the MCP generate (for local dev usage). This completes hooking generation into automation pipeline.

   *Deliverable:* Nx targets in `media-forge` config and a basic test by running `nx run media-forge:gen --spec=example.json` and verifying it executes generation and caches output (maybe run twicetime used cache).

**Milestone 3: Caption & Subtitle Integration**  
 *Goal:* Enable transcript extraction and subtitle attachment to demonstrate MediaForge handling textual sidecars, which involves integration with LyricsForge or ASR and testing the transform pipeline with overlays.

* **Task 3.1: Transcript Extraction with ASR (6h)** – Implement `media.captions.transcript.extract`. Use a library or API for ASR (for a s OpenAI Whisper via an npm package or DeepSpeech). If not feasible, simulate by reading from a provided reference text. The method should:

  * Accept an audio/video file, optional language hint.

  * If **LyricsForge** is available and the media is known (e.g., an entif://media that has a related lyric in metadata), call something like `lyrics.align` to get the timed transcript【4†L13645-L13648】. To simulate, we can call a stub that if a certain flag is present (like file name has “song”), it returns a known lyric text.

  * Otherack: extract PCM via ffmpeg (if needed) and feed to the ASR model, get text and rough timings.

  * Save the raw transcript as a text file or SRT via FileForge.

  * Produce a Receipt with details: which method used (ASR model name or "Used LyricsForge alignment"), confidence metrics if available, and attach the text snippet.

* *Deliverable:* A functioning `media.captions.transcript` call. Test it on a short known audio file (maybe generate one saying a phrase and see if it picks up – but given time, we might simulate by returning a fixed sentence). Ensure the output text and SRT file (with one subtitle spanning entireassport updated with `receipts` entry.

* **Task 3.2: Caption Attachment & Burn-In (6h)** – Implement `media.captions.attach` and `media.captions.burn` methods. Both require merging subtitle data with video:

  * For *attach*: If `kind="sidecar"`, it's simple – update the MediaPassport of the video to include a reference to the SRT file (maybe add a field `subtitles: file_id`). If `kind="m:contentReference[oaicite:170]{index=170}tiplex: use ffmpeg to merge the subtitle track into a new video file. Test by taking a small MP4 and an SRT, run ffmpeg (`\-i video.mp4 \-i subs.srt \-c copy output.mp4\` works if container supports it, or burn if needed)【4†L13643-L13650】. We may implement both by default as separate code paths.

  * For *burn*: Use the filter `subtitles` in ffmpeg to render into frames (requires subtitles file and optional font/style)【4†L13579-L13587】. Implement as a specialize e.g., feed the video file and SRT into `media.fx.transform` with a `subtitles.burn` node specifying font if provided【4†L13579-L13587call ffmpeg directly in code for now (embedding in our pipeline will get complex; for initial, direct ffmpeg invocation is fine).  
     After processing, store the new video (with captions) via FileForge and issue a new MediaPassport (derivative of original). Mark in passport’s provenance that captions are embedded (maybe via a flag or note).

* *Deliverable:* The attach method should be testable by retrieving a video’s passport after attaching sidecar – confirm it lists the subtitle file reference. The burn method test by visually verifying an output (we might produce a few frames to see text). At least ensure no errors and that the output file’s size increased (implying subtitle rendered).

* **Task 3.3: End-to-End Caption Flow Test (4h)** – Now integrate with generation or existing content:

  * Use a sample video (or generate a short silent video via rm like color \+ text overlay as content).

  * Write a dummy known transcript for it (maybe 1-2 lines).

  * Call `captions.attach` sidecar and confirm output (passport updated).

  * Call `captions.burn` and confirm new video with burnt text is \- Optionally, test `captions.convert`: e.g., if we have an LRC or want to ensure we can output different formats. Implement a basic SRT-\>VTT or similar conversion (just for demonstration if time).

  * Check that all receipts (transcript extraction receipt, attach/burn receipts) appear in respective MediaPassports and that these operations can be reproduced via Nx (maybe define a target `captions:attach` in Nx to allas part of pipeline if needed).

* *Deliverable:* Document or log a scenario where a video file goes from having no subtitles to sidecar to burnt-in via these calls, including citations to receipts confirming each step. Possibly a short example included: “We took video `med_123` and attached subs. The MediaPassport now includes `subtitles_id: file_xyz` and a new receipt of type `media.captions.attach` verifying the correct role gating was applied【2†L93-L99】 (e.g., only an authorized user could attach if content classified sensitive, etc.). Then we burned in captions, producing video `med_124` with receipts showing the overlay action.”

*Milestone 4: Export oal: Finalize output encoding for target platforms and run through a full scenario (from creation to final distribution-ready assetDefine Common ExportPresets (4h)*\* – Create a configuration (e.g., JSON file or TS constants) for a few export presets: e.g., `"hd_1080p_sdr"` for 1920x1080 H.264 video at \~8 Mbps, `"social_story_9x16"` limit, `"png_image"` for still images (just pass-through with PNG encoding), etc.【4†L13605-L13613】. Include loudness targets for video (like –14 LUFS) and maybe limit file size for certain contexts. Version these presets (we can give them version numbers or IDs like `export_v1_1080p`). \*Deliverable:finitions and a small loader in MediaForge that can retrieve preset by id and feed parameters to ffmpeg (e.g., mapping to \-vf scale, \-b:v, \-profile flags as needed).

* **Task 4.2: Implement `media.export` (6h)** – Flesh out the `media.export.mcp export(file_or_graph, preset)` method:

  * Accepssport ID or a TransformGraph ID as input. If TransformGraph, run the transform first (reusing Task 1.2’s compiler).

  * Retrieve the file (if not in local storage, use FileForge to download to a working directory).

  * Build ffmpeg arguments for the preset: video codec, audio codec, bitrates, resolution changes if needed (if the input doesn’t match preset, apply a scale filter or pad to aspect ratireset.loudness\` defined, integrate the loudnorm filter to normalize audio to target LUFS【4†L13685-L13690】.

  * Run ffmpeg encode. Time the process (for receipts usage stats).

  * After encode, call `media.qc.analyze` on the resultll is within preset bounds (explicitly check resolution equals preset, bitrate ≤ preset max, etc. – though if our encoding is correct, these should pass, this is belt-and-suspenders)【4†L13663-L13666】. If any final is correct), mark export as failed (receipt showing why).

  * Save the final output via FileForge, create a new MediaPassport for it with `status="final"` (assuming QC passed)【5†L13697-L13702】. Attach receipts for export and final QC.

  * Optionally, if preset requires watermark or s needed. For instance, if preset indicates `requires_c2pa:true`, call `c2pa.sign(output, defaultProfile)` – simulate with a dummy method that adds a flag in passport `c2pa.signed=true`【5†L13670-L13674】. If `requires_visible_watermark:true`, call `watermark.apply` or better, incorpoipeline. Possibly we skip actual visible watermarking for now but set up the hook.

* *Deliverable:* The `media.export` function tested with one of the prepared presets. For example, taort with "hd\_1080p\_sdr" and confirm output file meets specs (maybe measure resolution, duration). Also test a scenario requiring re-scaling: e.g., if input video is 720p and preset is . Check that the final MediaPassport has updated technical metadata (resolution now 1080\) and that receipts from transform (if any) and export are present.

* **Task 4.3: Full Pipeline Dry Run (4h)** – Now that all major pieces are in place, do an end-to-end test scenario, tying it into a hypothetical content creation workflow:

  * **Generate** an image via `media.gen.generate` (or take a user-provided iansform\*\* it (e.g., overlay some text or resize) using `media.fx.transform`.

  * **QC** the transformed media using `media.qc.analyze` – perhaps intentionally introduce a small issue (like a weird aspect ratio) to see a warning.

  * **Export** the final media using for, say, PNG image or MP4 video. Confirm the final file is as expected.

  * **(Optional)** If it’s a video and we want subtitles: go through `media.captions.transcript` (if audio present) and `media.captions.attach/burn`.

  * Verify in the final MediaPassport th logged and status is final.

* Essentially simulate what would happen in a CI pipeline for producing an asset ready for deployment: everything from creation to packaging is done with receipts. If possible, incorporate Nx tasks to run sequentially as they would in CI (e.g., have Nx s: `draft` → `transform` → `qc` → `export`).

   *Deliverable:* A documented step-by-step example in the blueprint (under "Net effect" or conclusion perhaps) showing how a piece of content flows through MediaForge and what the outcome is. For instance: “A 1080p promotional video was created via MediaForge: an intro slide image was generated, then video clips were trimmed and overlaid (via TransformGraph), subtitles were auto-extracted from the voice-over and burned in, and the output was exported in MP4 format with correct loudneeipts captured the actions and quality checks, so by the time the video is ready to publish, Entif has a complete provenance trail of its creation【43†L13900-L13908】【43†L13912-L13919】.”

* **Tason & Hardening (4h)** – Write internal documentation (e.g., in Markdown or code comments) for MediaForge usage: how to create GenSpec, how to author a TransformGraph JSON (with examples for cto add a new ExportPreset. Make sure error handling is robust: intentionally trigger a few error conditions (like an unsupported codec in TransformGraph) to a clear error Receipt【4†L13595-L13600】. Harden security one more time: ensure any external file paths in ffmpeg commands are sanitized (we should always use FileForge paths, which are safe temp ny subprocesses, confirm we’re not vulnerable to injection (control inputs strictly).

  * Also incorporate any pending compliance: e.g., ensure NSFW filter actually ties into Tripwire to block generation (if we have a stub, maybe just ensure the code path is th integrate a real classifier).

  * If time permits, integrate a simple NSFW or content filter on images (there are lightweight models or even just checking predominant skin-tone pixels as a naive approach).

* *Deliverable:* Updated code with th short README for `media-forge` package explaining how to call its MCP endpoints and how it interacts with others, and finat all tests pass (like generation doesn’t break a QC later, etc.). Possibly generate a final combined artifact (like an ArchiveFturing the entire pipeline run) – if ArchiveForge MCP is available, call `archive.snapshot.repo` with the final artifact and all receipts to store the manifest【40†L7-L15】. Otherwise, note that we would do so when hooking into ArchiveForge.

With these milestones, MediaForge would be feature-complete for a first eate or ingest media, apply a variety of transformations, rigorously check quality, and package the outputs for distribution, all while logging evidence. Subsequent iterations might expand provider integrations, add more filter operations (the DSL could be extended to dozens of ffmpeg filters), and improve the intelligence of ReasoningBank’s routing (fine-tune model selection based on feedback loops).

---

## **SocialForge** {#socialforge-1}

### **Purpose & Responsibilities** {#purpose-&-responsibilities-5}

**SocialForge** is the *bidirectional integration modia platforms*. Its mission is to provide a unified interface for Entif to **publish content** to, and **interact with**, various social networks and to bring back engagemsis and optimization【8†L13959-L13967】. Key responsibilities include:

* **Multi-Platform Publishing:** Scheduling and posting content (text, images, videos, links, etc.)forms (Twitter/X, Facebook, Instagram, YouTube, LinkedIn, Reddit, TikTok, etc.) through a singleacting away the differences in their native APIs and formats【8†L13959-L13967】【8†L13923-L13931】. This involves formatting content to each platform’s requirements (e.g., truncating text or splitting threads, resizing media to required aspect ratios via MediaForge presets) and handling authentication with each service.

* **Content Scheduling & Calendar:** Allowing content to be prepared in advance and scheduled for automatic posting at optimal times, including recurring schedule logic (e.g., posting a series daily)【10†L14133-L14141】【10†L14216-L14224】. Ensuring posts are delivered on time, without violating rate limits of each platform, via an internal queue and rate management system.

* **Engagement Ingestion & Analytics:** Retrieving performance metrics and engagement s – likes, shares, comments, views, watch time, click-through rates – and consolidating them into a common **AnalyticsSeries** format for storage and analysis【9†L14043-L14051】【9†L14059-L14067】. Also pulling user interactions such as comments and messages (the “socrther processing.

* **Conversation & Community Management:** Providing tools for reading and responding to comments, mentions, and direct messages across platforms from a single place【10†L14146-L14151】. SocialForge captures comments and DMs, runs them through sentiment analysis or moderation filters, and (optionally) can suggest or even automate replies to routine queries with approval rules【11†L14250-L14258】. It thus aids in managing community engagement at scale.

* **Optimization & Growth Experiments:** Running experiments like A/B tests on post content and posting times to improve engagement (via multi-armed bandit strategies)【8†L13963-L13968】【10†L14152-L14160】. SocialForge can vary aspects of posts (different titles, thumbnails, or hashtags) and learn which variants perform better, updating Entif’s ReasoningBank with these 63-L14271】【11†L14265-L14273】. It also tracks trends (trending topics, hashtags) and suggests content adjustments or new posts to capitalize on them【10†L14158-L14162】.

* **Governance & Audit for Social Outputs:** Ensuring that all social publishing actions comply with policies – e.g., not posting sensitive info, not exceeding rate limits, and capturinion (what was posted where and why). For example, if a post contains potentially sensitive contenditional approval (Tripwire gating) before actual publishing【7†L41-L47】. All decisions and platform responses are logged for audit (e.g., a Receipt for a publish might include the platform’s post ID and timestamp, or an error code if it failed).

In summary, SocialForge gives Entif a **single governable rail from content creation to multi-platform distribution and feedback**【12†L14407-L14415】. It lets Entif’s operators or AI agents schedule and disseminate content widely while enforcinired hashtags or preventing duplicate posts), and it brings back unified analytics so the system can learn and improve social outreach over time【12†L14409-L14417】.

### **Architecture & Components** {#architecture-&-components-5}

SocialForge is structurally divided into a **common facade service** and individual **platform adapter services**. The **facade** (`social.*` MCP endpoints) exposes a generic API to create, manage, and analyze posts regardless of platform【8†L13939-L13947】【10†L14121-L14129】. The **platform adapters** (like `twitter.mcp`, `facebook.mcp`, etc.) handle the concrete API calls and idiosyncrasies of each social network【10†L14164-L14172】. This separation allows SocialForge to support new platforms by adding adapters without changing the core logic, and to enforce global policies in the facade layer.

**Common Facade (MCP `social.*` endpoints):**

* \*\*Authentication & Channesocial.auth.mcp\`: Handles OAuth flows and channel status. Key methods:

  * `connect(platform, scopes) → ChannelPassport`: Initiates an OAuth2 authorization with the given platform (Twitter, Facebook, etc.) requesting specified scopes (permissions)【10†L14123-L14131】【9†L13998-L14006】. It returns a **ChannelPassport** for the connected account. The ChannelPassport is SocialForge’s record of an external account: it includes a channel `id` (`chn_xxx`), platform iount handle or name on that platform, what permissions (scopes) are granted (e.g., post, read, analytics)【8†L13977-L13985】【9†L13998-L14006】, and OAuth status info (like token validity and expiration)【8†L13979-L13987】. It also contains a rate-limit model (like a bucket name, remaining tokens, refill rates) to track API usage against platform limits【9†L13990-L13998】. ChannelPassports are stored via MetadataForge so they can be referenced (e.g., entif://social/channel/123).

  * `status(channel_id) → ChannelPassport`: Checks an existing connection’s health – possibly refreshing an OAuth token if expired (using stored refresh token) and updating the passport’s `status` (“ok”, “limited”, or “rev13999】. It returns the latest passport info so calling code can know if re-auth is needed.

* Under the hood, `connect` triggers the OAuth dance: SocialForge likely provides a redirect URL, receives the code, and then calls the platform’s token API (this might involve a CLI or out-of-band step for our implementation). The result – access & refresh tokens rely (AuthForge vault or SocialForge’s encrypted storage), and not exposed in receipts (only a high-level receipt that authorization succeeded is stored, for audit)【41†L19-L27】【41†L55-L64】.

* **Post Composition & Validation –** \`social.coblish processing of post content. Key methods:

  * `normalize(post_spec) → PostSpec`: Takes a user-specified **PostSpec** and adjusts it to meet different platform requirements【10†L14129-L14137】. A **PostSpec** describes a planned social media post in platform-agnostic terms: it includes `id`, target `channel_id` (or could be multi-channel list), content fields like `title` (for platforms that use titles, e.g., YouTube), `body` (text, possibly Markdown or some basic markup that SocialForge will convert), attached `media` references (FileForge IDs for images/videos)【9†L14007-L14015】【9†L14013-L14020】, `link` (if sharing a URL with UTM parameters)【9†L14013-L14017】, `tags` (like hashtags or keywords)【9†L14ions`(user handles to @mention)【9†L14017-L14019】, and possibly platform-specific overrides (a mapping of platform→partial PostSpec, allowing fine tweaks per platform)【9†L14023-L14027】. The`normalize`function will apply general rules: e.g., split a long body into a Twitter thread if beyond 280 chars (store extra text in`thread`array)【9†L14017-L14019】, truncate or adjust tag formats (# for Twitter vs nothing for LinkedIn), ensure the`mentions\` are valid on each platform (it er” in a LinkedIn context to the proper company or user reference if needed)【10†L14129-L14137】. It also might expand shortlinks or ensure UTM parameters ared【10†L14191-L14199】. The result is a cleaned PostSpec ready for validation/publishing.

  * `validate(post_spec) → Receipt`: Checks the `PostSpec` against a set of **truth fences** (platform-independent ones). For example:

    * Character limit checks: e.g., tweet text \<= 280 chars (or \<= 140 in double-byte languages)【10†L14191-L14199】.

    * Title/description presence: if `title` is required (folong-form) and missing, flag.

    * Tag and mention checks: e.g., limit number of hashtags (some platforms allow max 30, etc.), ensure anypriate format for that platform or can be resolved【10†L14199-L14207】.

    * Media constraints: ensure any attached media’s aspect ratio, resolution, and length meet target platform’s requirements adata in MediaPassports vs known platform limits)【10†L14193-L14201】. If not, mark as fail or automatically request MediaForge to produce a conformant variant (e.g., generate a thumbnail or crop).

    * Link policy: if a link is included, ensure it has UTM tracking if required by policy, and that th(some orgs restrict posting certain links)【10†L14191-L14199】.

    * Scheduling viability: if PostSpec includes `schedule` (time), verify it’s not in the past and respects any platform constraints (like Facebook doesn’t allow scheduling more than 6 months out, etc.)【10†L14200-L14208】.

    * Governance filters: run the post content through safety checks (like check for profanity, certain banned keywords – e.g., maybe disallow posting certain confidential terms)【10†L14204-L14210】.  
       The validate functionations into a Receipt with details (e.g., “Body too long for Twitter, will be split” as warning, “Missing alt text on image” as error, “Detected NSFW term – blocked” as error)【10†L14191-L14199】【10†L14204-L14212】. SocialForge can enforce that any *red* errors must be resolved (post won’t publish), *amber* warnings might be allowed with explicit override (Tripwire can allow via waiver receipt), and *green* means all good【10†L14208-L14212】.

  * `preview(post_spec) → {images or html}`: Optionally, SocialForge may provide a preview generator – e.g., render how the post will look on each platform (maybe as an image or HTML snippet). This requires platform-specific formatting (like generating a card preview for link posts, or cropping images for an IG story preview). It’s a helper for operamatting. This might call MediaForge to create a composite image of the post or just return structured data that a UI could render similarly to the platform. (This is non-critical for headless operation, but noted in the API)【10†L14129-L14137】.

* **Scheduling & Publishing –** `social.schedule.mcp` and `social.publish.mcp`: Orchestrating post dispatch.

  * `schedule(post_spec) → PostPassport`: Schedules a post for future publishing【10†L14133-L14141】. SocialForge will assign a already in PostSpec) and store the PostSpec (likely in a database or file) along with the scheduled time. It also computes an **idempotency key** from critical content (like a hash of normalized content \+ scheduled timestamp) to avoid duplicates【10†L14218-L14222】. The returned **PostPassport** is a record of the scheduled post: it includes:

    * `id: post_<uuid>` and the `channel_id` (or channel grouping) it will go to【9†L14029-L14037】.

    * `platform` (redundant if channel known, but possibly in multi-target scenarios we might create one PostPassport per platform)【9†L14031-L14037】.

    * `sche:contentReference[oaicite:246]{index=246}lished_at` timestamps【9†L14033-L14039】.

    * If already published, the `provider_post_id` or URL on the platform【9†L14033-L14039】.

    * `media_ids` of any media attachments (to tie back to MediaForge assets in the graph)【9†L14035-L14038】.

    * `receipts` array for the plan/compose/validate actions and the eventual publish action【9†L14037-L14039】.

    * `status` (“scheduled” initially, then “published” or “failed” or “quarantine” if withheld)【9†L14037-L14040】.  
       SocialForge’s scheduler component will monitor scheduled posts and at the right time, push them to the publish queue (taking into account time zones and “best slot” policy – see below)【10†L14222-L14228】. Cancelling is provided by `cancel(post_id) → Receipt` rted (if not already sent) and removes it from the queue【10†L14135-L14141】.

  * `publish_now(post_spec) → PostPassport`: Immediately publishes a post (bypassing scheduling queue)【10†L14138-L14146】. Under the hood, it likely calls the same internal routine as the scheduler uses to dispatch a post. It will perform a final normalization & validation (if not done already), then call the appropriate platform adapter(s) to create the post in real-time. The result is a PostPassport with status “published” and the platform’s response (post ID or URL) recorded【12†L14407-L14415】【8†L13939-L13947】.

  * `thread_append(post_id, body/media) → Receipt`: For platforms that support threaded or multi-part posts (Twitter threads, Instagram carousel, etc.), this method allows adding to an existing post sequence【10†L14139-L14142】. E.g., for Twitter, if `post_id` represents the initial tweet, calling \`thread\_appeunder it. It ensures context (like linking to original thread) and obeys rate limits. This returns a Receipt confirming the append (or error if platform disallows thread after certain time).

* SocialForge’s publ**Idempotency and Rate Limits**: It uses an internal unique key per scheduled post (channel \+ normalized content hash \+ scheduled time) to avoid double-posting duplicates if, say, the request is retried【10†L14218-L14222】. It also enforces per-channel concurrency \= 1 for most platforms (no two posts at once on same account, to avoid race or flood) via locking in the queue【10†L14221-L14224】. Each platform adapter tracks how many API calls remain (from ChannelPassport’s `rate_limit` field) and SocialForge will delay jobs or fail gracefully if limits would be exceeded【10†L14222-L14226】. Exponential backoff with jitter is used if a platform returns a rate-limit response (HTTP 429\) – SocialForge catches that and reschedules the job a a warning Receipt【10†L14222-L14226】. If persistent, it marks status “failed” and surfaces an alert (possibly to Ops via VizForge).

* **Analytics & Insights –** `social.analytics.mcp`: Collects performance metrics.

  * `ingest(channel_id|post_id, since?) → AnalyticsSeries`: Pulls new analytics data either for all posts of a channel (if channel\_id given) or for a specific post (post\_id)【10†L14142-L14150】. Under the hood, this will call the respective adapter’s analytics API: e.g., use YouTube API for video stats (views, likes), Twitter API for tweet engagement (retweets, likes), etc. The adapter returns data which SocialForge normalizes into an **AnalyticsSeries** object: which includes the `channel_id` (and possibly `post_id` if it’s post-specific), the `platform`, a `granularity` (hourly, daily) and a series of data points each with a timestamp and a set of metrics values【9†L14043-L14051】【9†L14059-L14067】. Metrics values cover common engagement metrics: impressions, views, reach, likes, reactions, comments, shares, retweets, saves, watch\_time, average\_view\_duration, completion\_rate, click-through rate, follower gain, etc., as applicable【9†L14047-L14055】. The AnalyticsSeries may also carry `dimensions` – breakdowns like device or geography if provided by platform【9†L14059-L14067】. SocialForge either stores these in a time-series database or updates GraphRAG (e.g., linking Post nodes to metrics nodes) for later querying.

  * `subscribe.webhooks(channel_id, events[]) → Receipt`: For platforms that support realtime webhooks (like Facebook/Instagram for comments or YouTube for certain events), SocialForge can subscribe a webhook endpoint and rely on push instead of polling【10†L14142-L14150】. This call would register the events (e.g., “comment.added”, “dm.reURL with the platform. When events come in, the platform adapters convert them to SocialForge’s internal format (like create Comment objects) and store/process accordingly. This method returns a Receipt indicating subscription success (or error if platform requires manual verification which couldn’t be done).

  * Internally, SocialForge likely runs periodic tasks (with Nx scheduled targets or an internal scheduler) to call `ingest` for each channel’s recent posts (e.g., every hour for new posts, daily for older ones)【10†L14231-L14239】. It uses `since` cursors to not duplicate data. The ingestion receipts record how many posts were updated, any API costs, etc.

  * After data ingestion, SocialForge computes derived metrics: e.g., engagement\_rate \= (likes+comments+shares)/impressions, or follower growth rates over weeks【10†L14239-L14247】. It may store these or pass to VizForge for visualization (e.g., trending engagement rates).

* **Inbox & Engagement –** `social.inbox.mcp`: Consolidates comments and nt management.

  * `comments.list(post_id, since?) → Comment[]`: Retrieves comments (and replies) on a specific post【10†L14146-L14149】. The adapter for the platform is called (e.g., Facebook Graph API for comments, or Reddit API for thread comments). It returns a list of Comment objects, which SocialForge then possibly augments with sentiment analysis or flags (see below). The \*\*Commmt\_xxx), `post_id` it belongs to, `platform`, `provider_comment_id` (the platform’s ID), `author_handle`, `text` content, `parent_id` if it’s a reply to another comment, `created_at` timestamp, pl classification and flags (like "toxicity", "spam") added by SocialForge’s analysis【9†L14073-L14081】【9†L14079mments can be stored (and linked in GraphRAG to the Post node with a \[:HAS\_COMMENT\] edge).

  * `comments.reply(comment_id, text) → Receipt`: Posts a reply to a given comment thread【10†L14147-L14150】. SocialForge finds which channel/platform and uses the adapter’s API (e.g., reply tweet, reply Facebook comment). It returns a Receipt with success or failure info. This action would likely be gated by Tripwire: if the `text` of reply is auto-generated by an AI (the system can generate suggestions), it might require a check for appropriateness (no rude auto-replies – SocialFore rules that forbid replying to toxic comments with automated text, requiring manual review)【11†L14250-L14258】.

  * `dm.list(channel_id, since?) → DirectMessage[]`: Fetches direct/private messages for a channel/account【10†L14148-L14151】. Each **DirectMessage** has fields: `id` (dm\_xxx), `channel_id`, `platform`, `peer_handle` (the other participant), `text`, list of any attachments (images in the DM, etc.), timestamp, and `direction` (inbound "in" or outbound "out")【9†L14085-L14094】. SocialForge will typically only fetch inbound (direction "in") unless it also tracks outgoing ones for completeness.

  * `dm.send(channel_id, peer_handle, text|media) → Receipt`: Sends a direct message to a user from the given channel (where supported)【10†L14148-L14151】. E.g., seia Twitter DM or responding on LinkedIn. Outbound DMs might be heavily restricted by platforms, so SocialForge ensures compliance (e.g., not sending too many DMs in short time – rate limit, and maybe disallow certain content). A Receipt is returned confirming send or capturing an error (like “user not following – cannot DM” which Twitter enforces).

* SocialForge’s inbox processing often involves additional logic:

  * It deduplicates and collates messages across platforms for integrated view. For example, if the same person commented on multiple platforms, it might mark them (though cross-platform identity may not be obvious except via GraphRAG analyzing names).

  * It labels comments with sentiment or category tags. A pipeline might run each comment th/neutral/negative) and a topic classification (maybe using GraphRAG’s Glyph tags for key terms)【11†L14255-L14263】. These labels are stored in Comment.sentiment and Comment.flags (like "question", "complaint" if detected by keywords).

  * It wire can block auto-replies to certain categories. If a comment is very negative or contains certain keywords (legal threats, harassment), SocialForge can escalate it: e.g., tag it for human review, create a support ticket in an e automatically hide the comment if severe and platform API allows (some APIs permit hiding toxic comments)【11†- For auto-replies: if enabled (some brands might opt in to auto-respond to simple comments), SocialForge can use ROMA/WordForge to ge reply: e.g., if a comment says "Great product\!", it could suggest "Thanks for your support\!" and either auto-post it or queue for approval【11†L14250-al.inbox `might thus have a method (not shown explicitly) to get reply suggestions for a comment (using GPT model with different tones) and present them:contentReference[oaicite:270]{index=270}eply` can be called with the chosen text. Tripwire rules strictly forbis on sensitive topics: e.g., if a comment asks about medical or legal advice, the system should *never* auto-reply with AI – it either doesn't reply or escalates to a human, as encoded in the policy rules【11†L14250-L14258】.

* In summary, SocialForge’s inbox turns multiple platform streams of interactions into a unified, triaged feed and enables scaled, policy-compliant responses.

* **Optimization & Trends –** `social.optimize.mcp` and \`socials for continuously improving strategy:

  * `experiment.plan(spec) → arms`: Takes an **ExperimentSpec** defining what variables to test (e.g., titles, thumbnails, tag sets, posting times) and sets up an experiment across multiple posts or in a single multi-variant post scenario【10†L14152-L14160】【9†L14101-L14109】. For example, to test two different titles for a LinkedIn articlle two similar posts at different times (or to different auplatform supports, which most don't directly – so usually time or content variation is the approach). It returns a set of “arms” – essentiaSpecs or an identifier for each variant to be tried.

  * `experiment.allocate(exp_id) → { arm, schedule_slot }`: Uses a bandit algorithm (Thompson Sampling, UCB1, or epsilon-greedy per spec’s setting) to pick the next variant (arm) to deploy and suggests a schedule or channel for it【10†L14152-L14160】. If the experiment is about posting time, this might return the next recommended time slot. SocialForge will then either schedule that variant via normal channels or instruct the calling agent to do so.

  * `experiment.evaluate(exp_id) → findings`: Analyzes collected met analytics via the above ingestion) and computes results – e.g., which variant had higher 24-hour view count or engagement rate (depending on the success\_metric defined in ExperimentSpec: e.g., “views\_24h” or “CTR”)【9†L14107-L14111】. It updates the bandit’s state (like probability distribution for each arm’s success) and might declare a winner if enough data, recording that in ReasoningBank so future posts can adopt the winning tactic【11†L14263-L14271】. It returns a summary of which arm is currently best and any statistically significant findings.

  * `best_slot(channel_id, horizon_days) → slots[]`: Queries historical engagement pven channel to recommend the best times to post in the next given horizon (say next 7 days)【10†L14154-L14158】. It uses AnalyticsSeries data to find when followers are most active or when past posts got above-average engagement. It may output a list of time windows (e.g., “Tuesdays 10-11am” and “Fridays 5pm” as top slots) with some scoring. This uses ReasoningBank heuristics combined with historical metrics (like a heatmap of engagement by hour/day that SocialForge maintains)【11†L14267-L14274】. These suggestions can be optionally fed into scheduling (SocialForge can automatically schedule content in the “best slot” if user chooses policy “schedule=best-slot” in PostSpec)【9†L14019-L14027】, or presented t- `trends.sentiment.timeseries(target) → series`: Could produce a trendline of sentiment for either a channel or specific post over time【10†L14158-L14162】 (e.g., percentage of positive vs negative comments by day after publication – helpful to gauge community reception).

  * `trends.topic.mining(channel_id, horizon) → clusters`: Uses GraphRAG and Glyph analysis on recent comments or posts to identify common themes or topics of discussion【10†L14159-L14162】. For insuster recent comments into topics indicating what features users talk about, giving product teams insight. It leverages knowledge base (WordNet or domain-specific ontology) to label clusters with names.

  * `trends:contentReference[oaicite:281]{index=281}_spec) → tags[]`: Suggests hashtags for a draft post, based on its content and trending hashtags in relevant domain/region【10†L14160-L14162】. It might use an LLM or simply cross-reference keywords in the post with currently trending tags from Twitter’s API and return a few that fit context.

* These optimization endpoints feed into Entif’s continuous improvement loop: e.g., the Coach agent will periodically call `best_slot` and update scheduling strategies, the Heretic agent might call `topic.mining` to propose new content directions when engagement plateaus【1SocialForge ensures all these suggestions and changes are **evidence-based** by linking to the underlying data (for example, an ExperimentSpec's results are attached to receipts with numbers to justify declaring one variant winner).

**Platform Adapters:**  
 For each platform, there is a dedicated MCP adapter (e.g., `twitter.mcp`, `youtube.mcp`, `instagram.mcp`, etc.)【10†L14164-L14172】. These are not accessed by the user directly but by SocialForge’s facade internally. They encapsulate:  
 handling:\*\* Storing tokens (in memory or via AuthForge integration), refreshing thed, and adding auth headers to requests.

* **API method implementations:** Each adapter presents a uniform interface to SocialForge with methods like `composePost(post_spec)` (if the platform needs last-minute transformation, like Twitter might break a thread into multiple tweets), `publish(post_spec)` (the actual API call to create the content), `schedule(post_spec)` if the platform has a native scheduler (most don’t, except e.g., YouTube which has time for videos)【10†L14168-L14175】, `fetchAnalytics(post_ids, since)` returning raw metrics from platform, `fetchComments(post_id, since)`, `sendDM`, etc. The SocialForge facade calls these uniformly.

* **Idiosyncratic mapping:** Converting SocialForge’s generic PostSpec into the specific API parameters. E.g., for Twitter:

  * Take `post_spec.body` (which may include `#` tags and `@mentions`) and ensure it’s URL-encoded and \<= 280 chars. If \>280, split by sentence or clause into a thread of multiple tweets (the adapter will actually send the first tweet via POST, get ID, thenoad images or videos first to Twitter’s media upload API, get media\_ids and include them in the tweet payload【10†L14168-L14176】. Similarly for other platforms (Instagram requires separate upload then reference in post payload).

  * Resolve `mentions`: e.g., Twitter requires exact handle, but LinkedIn might require an entity URN for mention – the adapter might have cached a mapping of `@CompanyName` to the LinkedIn company ID, etc., from earlier data or via an AP any platform-specific fields are handled: e.g., LinkedIn requires an “author” field (the user URN) in the API call; YouTube’s API needs a separate call to upload video then one to create the video post referencing the uploaded asset; TikTok might not have an open API (in which case Soc-party integration).

  * Format differences: e.g., LinkedIn doesn’t count `#` in its character count differently, but Twitter does – the adapter ensures count calculations are accurate for validation.

* **Error handling:** Adapters interpret platform errors (e.g., duplicate content error, rate limit error with specific codes) and return standardized errors or flags to SocialForge. Also, if a post is partially successful (like first tweet posted but second failed), the adapter should relay that to allow SocialForge to possibly retry or mark incomplete thread.

* **Rate limiting & quotas:** Each adapter monitors the responsee remaining calls in headers). It updates the ChannelPassport’s `rate_limit.tokens` accordingly【9†L13990-L13998】. It may also implement local sleep/retry if an endpoint is known to be limited (some libraries auto-handle e.g., the YouTube API mcost per call – adapter could accumulate cost and if cost budget nearly exhausted, delay or refuse further heavy calls that day).

* **Receipts generation:** Adapters likelyreceipts for their actions (like a JSON of the request payload and response summary) which the facade then wraps or attaches. We don’t persist the entire response from platforms (which could include personal data of commenters etc.), likely only essential references (like post IDs, counts) – to respect privacy and also bemuch data from external systems might violate their policies. Only the needed details for traceability and metrics are stored in receipts and the graph【41†L61-L64】.

**Data Models:**

* **ChannelPassport** was described (id `chn_xxx`, platform, handle, auth scopes, rate\_limit info, status)【8†L13979so include a list of posting roles authorized (like which Entif user linked this account).

* **PostSpec** (input) and **PostPassport** (output) – already covered in facad`status` transitions from “draft” (if content prepared but not sent yet) to “scheduled” to “published” or “fined” depending on outcome【9†L14033-L14040】. If `status=failed`, receipts should indicate reason (e.g., platform error code). `quarantined` might be used if Tripwire held it (like an internal decision not to publish).

* **Comment** and **DirectMessage** – covered above, nt`and`flags\` fields that SocialForge attaches (not from platform)【9†L14079-L14087】【9†L14087-L14094】. These objects might not be persistentally (maybe just kept in memory or logged to Graph for analytics). If persistent, SocialForge could store them with edges to User nodes (if Entif models social audience) or just as ephemeral data for analysis.

* **ExperimentSpec & Experiment arms results** – has fields like `id`, associated `post_id` if it’s specifically tied to one post (like variations in one multi-option post – though practically, experiments are often separate posts), or it references the list of posts timent arms【9†L14099-L14107】【9†L14101-L14108】. It lists what factors vary (like an array of possible titles in `factors.title[]`, possible thumbnail image file\_ids in `factors.thumbnail[]`, etc.) and which metric defines success (`success_metric` like “views\_24h” or engagement\_rate)【9†L14107-L14111】. SocialForge may store experiment state (counts of impressions each arm got, current best arm) in ReasoningBank or a local object.

* \*\*AnalyticsSscribed earlier (list of MetricPoint with timestamps and values map)【9†L14059-L14067】. These are stored in Graph (e.g., as nodes linked to either Channel or Post). The reason being, queries like “which posts had the highest ncrease” or “correlate comment sentiment with engagement drop” can be done via graph queries or forwarded to Viz analysis. The receipts captuht also reference these series (like a receipt might say “Ingested analytics for post P from 2023-01-01 to 2023-01-07: {views: \[...\], likes: \[...\]}”).

**Integration Points & Workflow:**

* **With MediaForge:** SocialForge heavily relies on MediaForge outputs. Before posting, it calls FileForge to retrieve media by file\_id and often uses a MediaForge preset for each platform. For instance, if scheduling a video for TikTok, SocialForge can ensure a MediaForge export was done with preset `tiktok-9x16` (e.g., by checking the entif://media URI’s metadata)【11†L14283-L14291】. SocialForge’s validation uses MediaPassports to confirm conformance (bitrate, aspect ratio)【10†L14193-L14201】. If not, it may call MediaForge to produce thumbnails or transcode media – e.g., SocialForge can automatically request a thumbnail from a video via `media.fx.thumbnail` for use as a preview image on LinkedIn【11†L14281-L14289】. Also, if a platform requires captions (short videos often do), SocialForge ensures that by checking the MediaPassport for `captions` – if missions.attach\` upstream or mark it for Tripwire (for manual fix)【10†L14194-L14201】.  
   Additionally, SocialForge stores published media references: e.g., when a post is published with images, it logs entif://media IDs of those images in the PostPassport so the graph knows that those images were used in a given social post【2†L85-L93】.

* **With AuthForge:** AuthForge secures SocialForge operations. Each platform channel is a resource with policies: e.g., only users with `role "Social Publisher"` can trigger publish on high-risk channells AuthForge’s PDP before executing potentially sensitive ops (like posting to an official company account might require MFA step-up or a second approval if content contains certain keywords)【7†L41-L47】【12†L14415-L14423】. SocialForge also uses AuthForge for storing OAuth tokens (so that rotating keys or revoking access is managed centrally)【11†L14283-L14291】. If a token is expired or revoked, AuthForge events can notify SocialForge to update ChannelPassport status to “revoked” so the UI can prompt re-connect.

* **With Tripwire/Petri:** SocialForge has Petri tests especially for content – e.g., simulate posting the content to see if any compliance issuei test tries to parse the PostSpec for confidential code names and would fail if found, preventing accidental leaks). Tripwire implements runtime checks: e.g., *Rate-limit predictions* – before publishing, SocialForge calls `social.policy.check.ratelimit(channel, op)` to get an allowance (some predictive model might say “likely 1 API call left in this window” – if the post would exceed, Tripwire marks it amber or red)【10†L14181-L14184】. Another Tripwire rule: if content is flagged “sensitive” by classification (like maybe a crisis or legal request mention), SocialForge doesn’t auto-post but “gateway.decide\` returns escalate – requiring human sign-off【10†L14183-L1418ed decisions ensure no automated posting puts the organization at risk.  
   Petri tests also help tune the optimization algorithms – e.g., A/B experiments have Petri tests to ensure they run long enough for statistically valid results, so a Petri might flag if an experiment is ended prematurely (ensuring we don’t draw wrong conclusions).

* **With MetadataForge & VersionForge:** All posts, comments, etc., are registered in the knowledge graph. Post descriptors get linked to content descriptors (like which Article or Media item they were based on)【11†L14288-L14296】. SocialForge uses VersionForge to version its “capability packs” (capabilities JSON for each platform as mentioned, listing support like whether scheduling is possible, max video length, etc.)【11†L14342-L14350】. If a platform changes their API or rules (e.g., Twitter increases tweet length), we update the capabilities pack, bump its versialForge validate function will catch posts that use outdated assumptions and produce migration notes (via rpting “capability update needed”).

* **With GraphRAG/Glyph & ReasoningBank:** SocialForge logs all actions and outcomes into the graph. The ReasoningBank uses this data for planning content strategy – e.g., the Coach agent queries GraphRAG: “What posting times yielded above average engagement for tech announcements?” – thanks to SocialForge’s consistent data injection (Post nodes linked to AnalyticsSeries nodes to time slots, etc.), the agent can answer from evidence【11†L14293-L14300】. The Glyph embedding of content is used for trends: for example, if SocialForge wants to identify trending themes, it can vectorize post texts and comments and cluster them – GraphRAG could store embeddings (like each Post or Comment node has an emge) to facilitate similarity search【38†L85-L93】. ReasoningBank also uses experiment o update its priors for content generation (e.g., weets get more engagement, the next WordForge iteration fot incorporate that).

* **With BackupForge:** SocialForge’s data (scheduled posts database, collected analytics) likely needs backup. Post records and analytics might be stored in a database that BackupForge snapshots (the design mentions schedules & analytics DB in backup coverage, with channel tokens not dumped to avoid security leakage)【14†L67-L75】【14†L67-L75】. Also, any logseneral receipt backup. SocialForge’s critical data like OAuth credentials are more ephemeral (though some – refresh tokens – likely in AuthForge’s domain).

* **UI Integration:** Though not an external Forge, note that SocialForge would present a **calendar UI** or integration with the Entif UI (via UIForge). The UI uses SocialForge’s client SDK (could be generated by APIForge) to allow users to connect accounts, compose posts, preview, and schedule. SocialForge ensures the UI gets immediate feedback on validations (the `validate` method would be called via API and results shown so user can fix issues)【13†L55-L63】. Also, UI dsocial KPIs – SocialForge feeds those (like a panel for “Social Media Engagement – last 7 days” pulling from the unified analytics).

**Security & Compliance:**  
 SocialForge deals with external accounts, so security is paramount:

* **OAuth token security:** All tokens are stored encrypted (AuthForge or SocialForge’s storage with encryption). ChannelPassports contain no raw token, maybe just a reference or last 4 chars of token for debugging. SocialForge rotates refresh tokens regularly via background jobs (e.g., if a refresh token has limited life, it ensures to refresh and update before expiry)【8†L13977-L13985】.

* **Permissioning:** Only authorized individuals/agents can use SocialForge to post. AuthForge integrationke `social.publisher`) are required for the `social.publish` action on specific channels【7†L41-L47】. We can even implement fine-grained control: e.g., only marketing department roles can post to official social channels. SocialForge logs who triggered each publish in the Receipt (user id) for audit.

* **Platform compliance:** SocialForge must obey each platform’s terms. It builds in respect for rate limits to avoid banomate forbidden actions (like auto-follow or scraping user data beyond permitted APIs). Also, content policy – e.g., not posting certain regulated content without label – can be enforced (Tripwire can inject e.g., if a tweet contains certain keywords (financial advice), it might require adding a disclaimer or block it).

* **Privacy:** SocialForge may handle personal data (comments from users). It respects privacy by not exposing these beyond necessary scope. E.g., if performing sentiment analysis on comments, it might store aggregated results rather than individual user comments in persistent memory, unless needed for moderation logs. If a user requests data deletion (GDPR), SocialForge can delete or anonymize comments from that user in its store (though if they remain on the platform it’s out of Entif’s scope – but we should at least remove them from our records on request)【18†L15319-L15327】.

* **Failure and Retry:** To ensure reliability, SocialForge implements robust retry for transient errors (like network hiccups), but with caution not to double-post. That’s where idempotency keys are critical – if an exact duplicate call happens, it will detect and not create a duplicate post【10†L14218-L14222】. Also, a c resume scheduled posts correctly thanks to the persistent schedule store and those keys.

* **Audit & Logs:** Every publish, modification, deletion (if supported via `cancel` or perhaps future `social.delete(post_id)`) yields receipts. These receipts combined with the graph allow a full audit trail – e.g., one can query “who approved and published post X on date Y” and get that info【12†L14407-L14415】【12†L14418-L14422】. If a security incident occurs (say a hacked social account posts something unauthorized), we have data to see if it came through SocialForge or outside (if oalForge’s data might show no record – which itself is a flag to investigate the channel’s integrity).

In essence, SocialForge connects Entif’s content pipeline to the outside world in a controlled, accountable way. It makes sure that everything that leavest, reply) is tracked and within policy, and that everything that comes back (every like, comment, metric) is captured and turned into actionable intelligence for improving outreach.

### **Implementation Plan (SocialForge)** {#implementation-plan-(socialforge)-1}

Implementing SocialForge can be tackled in phases focusing on core posting, feedation:

**Milestone 1: Multi-Platform Post Publishing Core**  
 *Goal:* Enable basic ability to connect accounts and publish/schedule posts to two example platforms (e.g., Twitter and LinkedIn) via common interface.

* **Task 1.1: Social API Data Models & Auth Flow (6h)** – Define the `ChannelPassport`, `PostSpec`, `PostPassport`, `Comment`, and `DirectMessage` structures in `protocol/src/social.ts`【8†L13977-L13985】【9†L14029-L14037】. Ensure all necessary fields (as per design) are present. Implement a simple in-memory store or DB table for ChannelPassports and PostPassports. Then implement `social.auth.connect`. Use a stub for OAuth: e.g., simulate obtaining a token by reading from config (since fully implementing an OAuth dance might be beyond our environment, we can simulate by asking the developer to paste an access token). Focus on the storing part: when `connect` is called, create a ChannelPassport with dummy token, scopes, rate\_limit bucket (initialize tokens \= platform’s limit, etc.)【9†L13990-L13998】. Mark status "ok". Return it and also save it in store (so `status` can retrientegrate with AuthForge: if AuthForge has an OAuth integration module, call that. For now, stub: treat the CLI call as given valid token. *Deliverable:* `social.auth.connect` and `social.auth.status` working in a simulated way – test by calling `connect(twitter, scopes=["post","dm"])` and then `status` to see ChannelPassport (with e.g., handle \= "@MyAccount"). Confirm ChannelPassport includes a default rate limit entry (e.g., tokens=300, refill=15min for Twitter).

* **Task 1.2: Common Post Lifecycle Methods (8h)** – Implement `social.compose.normalize` and `social.compose.validate`. For `normalize`, code basic transformations:

  * If `post_spec.body` length \> platform’s max (use capability matrix for known values: e.g., 280 for Twitter, 1300 for LinkedIn post), split at sentence boundaries into `post_spec.thread` array【9†L14017-L14019】.

  * Ensure any `tags[]` have `#` prefix for Twitter/Instagram, but maybe drop `#` for LinkedIn (as they auto-link plain words).

  * Replace any `@mentions` with platform-specific format: e.g., for Twitter, they stay as @, for LinkedIn, perhaps just remove or transform if we had the actual URN (for now, maybe just leave them).

  * Append UTlinks if not present and policy says so (we can store a simple "default UTM" in config to add).  
     *Deliverable:* Given a raw PostSpec JSON (with a too-long body, some tags, etc.), `normalize` outputs a modified PostSpec with thread array or trimmed fields.

  * For `validate`, implement at least:

    * Character limit check: e.g., if any thread entry \>280 for Twitter, add a warning or error result.

    * If `media` attachments are present, verify each media’s MediaPassport is accessible and check that e.g., video length \<= platform max (e.g., 140s for Twitter)【10†L14193-L14201】. Use a stub capability map (like an object mapping platform→{max\_video:140, req\_aspect\_ratios:\[...\], req\_captions: true for TikTok, etc.}).

    * If `post_spec.tags` count \> allowed for platform (e.g., Instagram max 30 hashtags), add warning or drop extras.

    * Safety check: pick a few banned words (like "internal\_only") and if appear in body, flag error.

    * Rate-limit check: look up ChannelPassport.rate\_limit for that channel, if near 0 and likely needed calls \>0, flag amber or hold. E.g., if tokens\<1 for posting, output something like "Rate limit almost exhausted; post may fail" as a warning.  
       *Deliverable:* `validate` returns a Receipt (or simply a structured result for now) listing issues. Write a test case with a deliberately problematic PostSpec (long text, 50 hashtags, containing "internal\_only") and see that validate catches these (e.g., error "confidential phrase detected", warn "exceeds hashtag count, will drop extras", info "No captions on video: policy requires for short video" if applicable, etc.).

* **Task 1.3: Platform Adapters for Twitter & LinkedIn (10h)** – Implement minimal `twitter.mcp` and `linkedin.mcp` modules:

  * For **Twitter**: Use their API v2 or v1.1 endpoints. Possibly use a library or direct HTTP. Implement `publish(post_spec)`:

    * If media attached: simulate media upload by calling `file.mcp.get(file_id)` to retrieve media bytes (or path) and then respond with a fake media\_id (since actual upload might be complex). Possibly skip actual media upload in test, instead tweet text \+ note "media omitted".

    * Post text: call a POST to statuses/update endpoint with text and media\_ids. Use the bearer token from ChannelPassport.

    * On success, parse the tweet ID from response and return it.

    * Also implement `reply(comment or tweet)`: given parent ID, call statuses/update with in\_reply\_to\_id. (This can be tested by posting a thread.)

    * Implement `fetchAnalytics` for tweets: call GET statuses/show for each tweet to gather metrics (like favorite\_count, retweet\_count) – or skip detail due to needing auth overhead, instead simulate by returning random numbers for now.

    * Implement `fetchComments` for a tweet: Twitter doesn’t have direct “get replies” easily without query – we might skip or simulate an empty result for now (since lacking context to search).

    * Rate-limit handling: Twitter returns headers like x-rate-limit-remaining. Capture those after each request and update ChannelPassport.rate\_limit (if integration test, print them).

  * For **LinkedIn**: The API is more complex (needs an “organizationURN” to post as a company). We simplify by focusing on personal posting:

    * `publish(post_spec)`: If text only, call POST /ugcPosts with content. If images, they require upload to their media API first – skip for now by not testing image on LinkedIn.

    * On success, they return an URN for the post. Save that as provider\_post\_id.

    * `fetchAnalytics`: LinkedIn has an insights API but might require an enterprise token, skip actual call. Instead simulate by returning the number of likes in PostPassport (if we had been tracking through webhooks).

    * `fetchComments`: They have an API for comments by URN – likely skip actual, simulate none or a couple of dummy comments for testing flows.

    * Essentially, minimal actual integration due to complexity – ensure the structure is there and we can simulate a success or error (like if text \>1300, which our validate should catch).

  * It’s fine to not do full API integration in initial test – we can simulate sending by printing an output and returning a made-up ID, focusing on the SocialForge logic around it.  
     *Deliverable:* Two adapter classes with methods `publish`, `reply`, `fetchAnalytics`, etc., that SocialForge can call. Test them by calling via SocialForge facade: e.g., `social.publish.publish_now(spec)` for Twitter channel and see that our adapter prints a "posted tweet with text..." and returns an ID, and SocialForge then returns a PostPassport with status published and provider\_post\_id set.

* **Task 1.4: Publish & Schedule Orchestration (6h)** – Implement the `social.schedule.schedule`, `social.schedule.cancel`, and `social.publish.publish_now` logic:

  * For `schedule`, store the PostSpec in a simple in-memory schedule queue (or use node-schedule for timing) with key \= post\_id. Compute an idempotency key hash from content (like `hash = sha1(channel_id + normalized_body + media_ids)`)【10†L14218-L14222】. If a schedule entry with same key exists (compare recent scheduled), skip to avoid duplicates. Otherwise, set a timer (or add to a priority queue sorted by time).

  * For `cancel`, clear the timer or remove from queue and mark PostPassport status "cancelled". If it's too late (post already in progress or sent), return an error.

  * For `publish_now`, go straight to calling the appropriate adapter’s `publish`. That means determining the platform from channel\_id (we know channel has platform field) and routing to e.g., `twitterAdapter.publish(spec)`. If the adapter returns success with an external post ID, create a PostPassport: id= new, fill in channel\_id, platform, published\_at=now, provider\_post\_id etc., status "published"【9†L14029-L14037】. If the adapter threw an error (like unauthorized), capture it in a Receipt and mark status "failed".

  * Connect validation to publish: ideally ensure `validate` was run. For initial implementation, you might call `validate` inside `publish_now` to double-check, or assume the spec came through schedule which would have validated. Perhaps at least check key content like length to avoid obvious failure from platform (defensive step).

  * Multi-channel posting: if PostSpec indicated multiple channels (maybe allow an array), either split into multiple posts or loop each – but keep it simple: one schedule per channel.

  * Setup a basic loop or cron for scheduled posts dispatch: e.g., using `setTimeout` for nearest event or a periodic check that scans schedule list for due items. When due, call `publish_now` internally and update that PostPassport.  
     *Deliverable:* Being able to simulate scheduling: e.g., schedule a post for 1 minute later, and our code actually prints "posting now to Twitter...", simulating dispatch. Also test immediate publish: call `publish_now` and see that it calls adapter and returns PostPassport with status published. Make sure receipts are created at each step (e.g., a schedule Receipt logging content scheduled, a publish Receipt with external post id) for audit.

**Milestone 2: Data Ingestion & Inbox**  
 *Goal:* Implement analytics pulling (simulate or partial) and processing of comments/DMs (with some sentiment analysis stub).

* **Task 2.1: Analytics Ingestion (6h)** – Implement `social.analytics.ingest`. Without real API keys, simulate data:

  * For a given channel or post, if we have some PostPassports with known engagement (could store dummy numbers or increment counters when we posted via adapter), use those. Alternatively, generate raration (e.g., if a Twitter post id is known, pretend likes \= random 0-100, retweets 0-50). But to be realistic, maybe track metrics in PostPassport (e.g., after a publish, set initial likes=0, retweets=0 in a metrics field).

  * The ingest function would then update those with increments to simulate time passing (like \+5 likes, etc.). Or read from some memory store representing "platform".

  * Create an AnalyticsSeries with current timestamp and values【9†L14047-L14055】, and attach it to PostPassport (maybe store last N points in an array on PostPassport or a separate store).

  * Return the series.

  * The key is to mimic the shape and show how SocialForge would process it.  
     *Deliverable:* If we call `social.analytics.ingest(post_id=somePublishedPost)`, it returns an AnalyticsSeries like: `platform: "twitter", series: [ {ts: now, values: {likes: 12, retweets:3, comments:0} } ]` and also updates our internal record (like PostPassport or a global metrics map).

* **Task 2.2: Comments & DMs (8h)** – Implement `social.inbox.comments.list` and `comments.reply` (for at least Twitter or an imaginary generic platform):

  * For simulation, when we publish via adapter, generate a couple of dummy comments in a global list (e.g., "UserA: Nice post\!", "UserB: I disagree"). Or allow an external input to insert comments.

  * `comments.list(post_id)`: retrieve comments from our dummy list where `comment.post_id = given`【10†L14146-L14149】. Wrap them into Comment objects with sentiment. For sentiment, implement a simple check: if text contains "disagree" or "bad", mark sentiment "neg", if contains "nice" or "love", mark "pos", else "neu". Possibly mark "toxicity" flag if text contains certain insults (to test gating).

  * `comments.reply(comment_id, text)`: find the platform from comment’s post (or ChannelPassport), call adapwitter adapter’s reply). Simulate success by adding a new comment to list with author \= our channel and text \= provided.

  * Implement similar for DMs: keep a dummy DM list, `dm.list(channe:contentReference[oaicite:341]{index=341} inbound messages for that channel. Simulate that after some time, maybe one DM appears ("UserC: Can I get help with X?"). Mark it as` in`and unseen.`dm.send(channel, user, text)`: simulate by printing or adding to the DM list as` out\`. (No actual platform call)

  * Observability: each reply or send should produce a Receipt (we can output something like "Replied to comment cmt123 with 'Thanks\!'", saved as receipt).  
     *Deliverable:* For a given post, calling `comments.list` returns a list of dummy comments with sentiment fields (verify pos/neg tagging logic). Calling `comments.reply` adds a reply; calling `comments.list` again shows it. Check that Tripwire rules would, for example, block reply if comment had "toxicity" flag: simulate by if comment.text had an insult, and if we attempt `comments.reply` to it, we either do nothing or proing "auto-reply blocked by policy" (depending on design). Implement a simple check for demonstration: if `comment.flags` contains "toxicity", do not allow a reply without a manual override (could simulate by requiring a `force=True` param which Tripwire would set if overridden). Document this mechanism in commentary.

* **Ttation Hooks (4h)** – Provide skeleton for `social.optimize.experiment.plan/allocate/evaluate`. Without going deep into math:

  * `experiment.plan`: store the spec (with factors array) in a map with an id and create initial record (e.g., counts \= 0 for each L14111】. If success\_metric is "views\_24h", mark that for evaluation step.

  * `experiment.allocate`: If no prior data, pick a random or the first variant to try next. Otherwise if some results, pick the one with currently highest average (since no formal bandit implemented in detail, we can simulate a simple epsilon-greedy with epsilon=0.1, for example). Also decide a schedule slot perhaps: either ibest\_slot: call our `best_slot` (which we implement to always return e.g., tomorrow noon for simplicity).

  * `experiment.evaluate`: Once some arms have been posted and we have analytics, gather their metric (e.g., from PostPassports metrics or analytics store we built). Compute which performed best, mark that as winner, update internal record. For demonstration, maybe just output a findings object: {"winner": arm2, "winner\_metric": 500, "others": {...}}.

  * `best_slo:contentReference[oaicite:346]{index=346}ivial aggregator: look at ChannelPassport or posts times. Maybe in our dummy data, just return a fixed slot or if we stored analytics, choose an hour where historically one post did better. Perhaps maintain a dictionary of hour -> cumulative engagement. Fill it with some numbers (like 9am:100, 5pm:200, etc.), then best_slot returns the top 2 ho:contentReference[oaicite:347]{index=347}*Deliverable:* Even if these are simplistic, ensure they produce output in the right shape. E.g., calling` best\_slot(channel,7)\` rke \[{"day":"Tuesday","hour":17},...\] meaning we found 5pm as a best time. Document that this is where we'd incorporate historical data properly in a real scenario. For experiment, simulate an experiment with 2 variants, assign random performance, see evaluate picks one as winner. Mark that in a ReasoningBank log (could just print "Variant B wins with 20% higher CTR" to simulate updating strategy).

* **Task 2.4: Integration & Final Checks (6h)** – Tie the pieces together:

  * When a post is published viager analytics ingestion after some delay automatically (maybe set a timeout to call ingest for that post after 1 hour, for testing call it manually). Simulate that multiple posts accumulate metrics in analytics store for use in experiments and trends.

  * Implement a simple background job for scheduled posts (if not done in Milestone1): e.g., use `setInterval` to check every minute for due posts to publish.

  * Ensure receipts creation at each critical step: connecting channel, scheduling post, validation results, actual publish action, analytics fetch, comment fetch, comment replyould produce a Receipt with relevant info.

  * Double-test cross-Forge flows: e.g., create an Article (or fake one) and have SocialForge use its content to post to LinkedIn, ensure the pipeline called MediaForge if needed for images or etc. (Maybe out of scope without fully implementing that pipeline; instead simulate by saused as PostSpec.body). But at least test SocialForge with a MediaForge asset: e.g.we have from MediaForge and see if SocialForge picks up needed metadatage is too big for a platform, but our validate should catsupported).

  * Security test: atzed call (simulate by not having proper role – if we had AuthForge integrated, we'd call `authz.check` inside Socihat, simulate by a flag e.g., SocialForge has a config "allow\_post\_to\_production \= False" that if disabled, publish returns error to simulate a policy block). Ensure SocialForge does indeed block that.

* *Deliverable:* A cohesive demonstration scenario in documentation: e.g., "User cd LinkedIn accounts. They compose a post 'Hello World\!' with an image. SocialForge normalizes it (e.g., maybe removes image for LinkedIn if not allowed, etc.), schedules it. On schedule, it publishes to both platforms (simulated). We then ingest metrics (say Twitter got 10 likes, LinkedIn 50 reactppears on Twitter, SocialForge sentiment-tagged it negative and did not auto-reply due to policy. The user manually replied via our system, which was posted successfully. Meanwhile, SocialForge recommended via best\_slot that 5pm Friday is a great time to post next – the next content was automatically scheduled to that slot." Show relevant outputs from each stage with citations to lines in our connected source that align to these behaviors (like scheduling best slot ties to ReasoningBank updates and UICoach noticing in logs)【11†L14266-L14274】【12†L14409-L14417】.

By completing these milestones, we will have a working SocialForge prototype: il account connections, publish and schedule posts (with basic safety checks and one or two platform support), ingest engagement data, manage comments/DMs (in a limited but demonstrable way), and provide optimization hints. This sets the stage for expansion (adding more adapters, richer analytics and automation rules) in further development.

---

## **ArticleForge** {#articleforge-1}

### **Purpose & Responsibilities** {#purpose-&-responsibilities-6}

\*\*ArticleForgule for *long-form content creation and management*. It empowers generating, editing, and maintaining written content such as blog posts, articles, press releases, documentation pages, etc., with a strong emphasis on governance (ensuring factual accuracy via citations, stylistic consistency, and integration into Entif’s knowledge graph). ArticleForge’s resude:

* **Structured Drafting of Articles:** Taking a high-level idea or outline and producin article draft (with introduction, sections, conclusion) using AI assistance while following specified voice/tone guidelines【34†L12120-L12128】【35†L12225-L12233】. It splits content into atomic sections (small, focused Markdown segments) to al and updates【34†L12127-L12134】.

* **Quality Assurance of Content:** Enforcing documentation “truth fences” – e.g., every factual claim must have a citation to a source of truth (no uncited assertions)【35†L12205-L12213】【35†L12207-L12215】, all included images have altinks, and the text meets readability standards (target reading level, required structure like presence of a summary if needed)【35†L12258-L12266】. ArticleForge automatically validates internal references (resolves cross-links) and ensures the article stays up-or data changes by integrating with Entif’s continuous integration (docs as code).

* **Integration of Sources & Citations:** It interfaces with GraphRAG (Entif’s knowledge graph) to retrieve relevant facts or content snippets to include, and attaches **receipts** or citatrces【35†L12191-L12199】. For example, if an article states a technical claim, ArticleForge can fetch a reference from the ReasoningBank or an external source and mark it in the text with a citation that links to the evidence node in the graph【35†L12201-L12209】. It can also incorporate content from imported “canonical references” – e.g., if there’s a related ArchiveForge, ArticleForge can cite it.

* **Iterative Editing & Microcontent:** Breaking articles into sections enables ArticleForge to continuously update speequired (for instance, if a new version of a product changes one step in a procedure, ArticleForge can regenerate just that section)【35†L12253-L12261】【35†L12269-L12277】. It also supports generating microcontent out of the article, like summaries, excerpts, or social teasers, via integration with SocialForge and MediaForge.

* **Multi-Format Publishing:** ArticleForge can render and export articles into various outpuaces – including Markdown/MDX for static sites, HTML for blog platforms, PDF or Word for whitepapers, etc.【35†L12281-L12289】. It adapts the content to each target (for example, converting Entif’s Markdown with custom syntax to pure Markdown or HTML with proper heading levels) and works with SocialForge to distribute the content (e.g., autoposting a link on social network & Versioning of Content:\*\* It works closely with VersionForge and ArchiveForge so that each article version is tracked (with semantic version numbers if appropriate, e.g., documentation tied to software versions)【35†L12269-L12277】. It stores snapshots of article content in ArchiveForge for reproducibility (so one can retrieve the exact article as it was at a certain release). It also possibly integrates with an approval workflow (Tripwire gating “publish” for certain article categories until approved receipts exist).

* **Knowledge Graph Integration:** Every article and even each section becomes a first-class node in Entif’s knowledge graph, linked to the topics (Glyphs) it covers, the product features it relates to, sed【35†L12297-L12305】. This means Entif’s AI (e.g., the Q\&A agent) can pull precise sections of articles as answers, with proper citations, and that documentation is alwdecision-making (no more siloed docs).

In short, ArticleForge ensures that documentation and long-form content in Entif is **always up-to-date, accurate (with proof), well-structured, and easy to publish and reuse**. It turns what traditionally is static documentation into a living, governed artifact tightly integrated with code and data (often described as docs as code and docs as truth)【13†L49-L57】【13†L67-L71】.

### **Architecture & Components** {#architecture-&-components-6}

ArticleForge comprises:

* A content model for articles (splitting content into **ArticlePassport**, **ArticleSpec** with sections)【34†L12150-L12158】【34†L12175-L12183】.

* MCP endpoints for the article lifecycle (planning, drafting, enforcing citations, linting, rendering, publishing)【35†L12201-L12209】【35†L12225-L12233】.

* Integration points with external references (like GraphRAG, WordForge) for intelligent content generation and with pipeline tools (like Nx and CI) for automation.

**Data Model:**

* **ArticlePassport:** Metadata about an article (akin to a “document record”). It contains:

  * `id: art_<slug>` – a unique ID (often slugified title)【34†L12153-L12160】.

  * `slug` and `title` of the article【34†L12153-L12160】.

  * \`authoreferences – could be an author name or ID of an Entif user (especially if multiple contributors)【34†L12155-L12160】.

  * `audience` tags – e.g., \["developers","executives"\] to indicate target readership or permission level (maybe certain parts of an article can be marked for certain audience)【34†L12157-L12163】.

  * `thesis` – one-sentence core claim or summary of article (useful for ensuring content stays focused and for summarization)【34†L12159-L12165】.

  * `tags` – topical tags for SEO or classification (like \["AI","Entif Platform"\])【34†L12159-L12166】.

  * `status` – lifecycle status: "draf, "quarantine" (if blocked due to some policy e.g., missing citations), or "published"【34†L12161-L12169】.

  * Provenance/trust info: e.g., an `e_e_a_t` object capturing Experience/Expertise/Authority/Trust signals (for compliance with content guidelines), possibly linking to authors’ credentials【34†L12163-L12168】.

  * `sources` – a list of source identifiers (like entif graph nodes or receipt IDs) that the article draws from【34†L12161-L12167】. For instance, if the article is summarizing a set of research, the sources list those research nodes (allowing GraphRAG to see what supports this document).

  * `risk_flags` – if any (like "unverified\_claims" if citations missing somewhere, or "outdated" if freshness check fails).

  * Optionally, `version` (if the article is versioned along with releases – e.g., "2.0.1")【34†L12167roduct documentation, it might carry the version of product it’s documenting.

  * Timestamps (created\_at, updated\_at).

  * A receipts list for events on this article (like generation receipts, publish receipts) perhaps, or the receipts might be at section leection:\*\* Represents an atomic section of the article:

  * `id: sec_<uuid>` – unique section ID【34†L12175-L12182】.

  * `kind` – classification of section role (e.g., "hook" (intro), ", "howto", "story", "conclusion", etc.)【34†L12175-L12182】. This helps in ensuring structural diversity and for targeted generation (the style for a "howto" might include stepwise instructions, whereas a "story" might be \- `text_md` – the Markdown content of the section (with minimal formatting, ideally)【34†L12177-L12180】.

  * `citations` – an array of citation objects linking spans of text to a source\_id【34†L12177-L12180】. E.g., it might indicate that characters 50–1ported by source X (GraphRAG node or external link). This allows rendering references properly (like as footnotes or inline links) every claim has one.

  * `glyph_tags` – optional list of semantic tags (Glyph nodes) that this section covers (erge)【34†L12178-L12181】. This essentially anchors the section’s meaning to known concepts, aiding search and cross-linking.

  * Possibly `level` if we want to encode heading level or position (but we also have outline structure separate).

  * Status flags if needed (like if a section is incomplete or needs review).

* **ArticleSpec:** The main body of an article:

`passport: ArticlePassport` – the metadata (some duplication of fields might be avoid- `outline: [{heading: string, section_ids: [sec_a, sec_b, ...]}]` – structure of the article in terms of headings and which section IDs belong under each heading【34†L12181-L12189】. This provides hierarchy (like Table of Contents). E.g., outline could be:

 `[`   
  `{"head:contentReference[oaicite:384]{index=384}n", "section_ids": ["sec_101"]},`  
  `{"heading": "How Entif Works", "section_ids": ["sec_102", "sec_103"]},`  
  `{"heading": "Conclusion", "section_ids": ["sec_104"]}`  
`]`

*  This way, we can reassemble the article with proper headings in the correct order.

  * `sections: Record<section_id, ArticleSection>` – a mapping of section IDs to their content objects【34†L12183-L12190】. This effectively contains the actual text.

  * Possibly `assets`: list of figures or images referencedn text and actual FileForge URLs)【34†L12185-L12190】.

  * `targets: Surface[]` – list of surfaces where this article should be published (like "mdx", "medium", "pdf"). This guides rendering logic【35†L12281-L12289】.

  * If article is versioned with codede references – but likely outside ArticleSpec’s direct model (we rely on citations to code receipts instead).

* ArticleSpec is the object that the MCP methods operate on: e.g., `article.plan` returns a partial ArticleSpec (with outline but no text), `article.draft` fills in sections, etc. It's typically stored in an in-repo or in a database as JSON/MD (especially if docs are managed via Git).

**MCP Endpoints & Flow:**

* **Planning –** `article.plan({ corpus, voice, thesi:contentReference[oaicite:387]{index=387}:contentReference[oaicite:388]{index=388}09】. This uses AI (ROMA/ReasoningBank) to generate an outline structure for the article. It may take an optional` corpus`(which might be a reference link or context to base the article on) and a target`voice`(tone/style, e.g., "friendly and technical"). It returns an outline (list of sections with intended heading hierarchy, and possibly intended`kind\` for each)【35†L12225-L12233】. Internally, it might do:

  * Use a prompt to an LLM enumerating sections given thesis & audiene a prompt template in WordForge that leverages known doc structures like Diátaxis – if that concept is employed as in doc plan, maybe not explicitly given here but cre it covers tutorial vs explanation parts).

  * The outline tries to align with any provided structure or known patterns (like if user said structure "intro, part1, part2, conclusion", it follows).  
     *Output:* an ArticleSpec stub with an outline and empt distribution of content (like which sections should be "concept" vs "procedure").

* **Drafting –** `article.draft({ outline, voice, sources }) → sections.text`【35†L12225-L12233】. This populates each section in the outline with actual text content. This is where GPT (via WordForge/Glyph) is heavily used:

  * For each section (with given `kind` and maybe heading context, plus the `thesis` and otext), generate text. WordForge ensures the text is semantically grounded by using Glyphs (embeddyms or knowledge)【37†L13233-L13241】.

  * If `sources` were provided (like the user wants certain references used), the draft process attempts to incorporate them (perhaps by quoting or summarizing them, and putting a placeholder for cit: a full ArticleSpec with all sections now filled with Markdown text. Citations might be partially included as placeholders (like marking a claim with a special token awaiting actual source linking).

  * ArticleForge likely calls external knowledge for content: e.g., GraphRAG to fetch facts to include, then instruct LLM to weave them in. The content is receipts-first: for any piece of info included from a source, it attaches a citation reference to the respective `ArticleSection.citations` with the source’s id (like a ReasoningBank Q\&A receipt ID or an ext†L12177-L12180】.

  * It also tries to follow style guidelines (like if audience is "executives", ensure language is high-level).

  * After drafting, ArticleForge might automatically run a basic grammar/spell-check and fix minor issues (or mark them).  
     *Output:* Draft content likely still requires citation enforcement, which is next step.

* **Citation Enforcement –** `article.citations.enforce({ article_id }) → diff`【35†L12207-L12215】. This function scans the draft to ensure every claim that should have a citation does:

  * It finds any "citation needed" placeholders the draft left (maybe the LLM used a template to mark an unsourced claim).

  * It queries GraphRAG or an internet search to find a source for uncited claims (maybe even uses the Q\&A agent: “Find source for this statement: ...”).

  * If found, it inserts a citation in the text (e.g., turning "GraphQL was 2015 \[citation needed\]" into "GraphQL was first released in 2015【33†L11219-L11227】" referencing the source).

  * If any claim cannot find a source or the source seems weak, it flags the section or the whole article (risk\_flag "unverified") for ht runs through a checklist: number of citations vs claims, any `[citation needed]` left triggers quarantine of the lish until resolved).

  * The result might be a list of changes (diff:xt had citations added/changed) and possibly a verdict (pass if coverage above threshold, else block).  
     *Output:* Possibly an updated ArticleSpec where `citations` fields are now filled for each section, and a receipts log of what was done (like "added 3 citations from GraphRAG, 1 claim still missing source").

* **Linting & QA –** `article.lint({ article_id }) → findings`【35†L12211-L12218】. This runs documentation linters:

  * Check for broken links in `text_md` (e.g., any Markdown hyperlink whose target doesn’t resolve or exists in GraphRAG).

  * Check images have alt text (if any `![alt]()` with alt empty).

  * Check consistency of headings vs outline (the outline said headings X, ensure the text actually has those headings at appropriate levels).

  * Possibly run grammar/style check using a tool or LLM feedback (the design specifically calls out grade level and stylistic patterns via DocForge’s existing gates)【35†L12258-L12266】.

  * If any code blocks present, ensure they compile or pass tests (DocForge can execute fenced code blocks tagged with `// doctest` to verify they run)【35†L12281-L12289】. ArticleForge could tie into TestForge or a runtime to run example code in the article and mark failure if output differs (thus ensuring that documentation examples remain correct).

  * Check glossary usage (if corporate glossary terms should be used or avoided).

  * All these produce warnings/errors:

    * e.g., "Link to entif://api/user not found in graph" (maybe a placeholder not updated, so section fails lint).

    * "Section 'Introduction' reading level is grade 14, above target 10" (maybe a soft warning to simplify language).

    * "3 claims missing citations" (though enforce step should have resolved, if any remain it’s error).

  * The output is structured (e.g., a JSON array of issues by section). If any errors, article status remains “draft” or “quarantine” and cannot publish.  
     *Output:* Lint results, also possibly an updated ArticleSpec if some fixes are auto-applicable (some systems can auto-fix minor things like adding missing Glossary definitions or adjusting heading title style).

* **Rendering –** `article.render({ article_id, surface }) → artifact_url`【35†L12213-L12218】. This takes the finalized ArticleSpec and produces the format needed for a given platform or target:

  * If `surface="mdx"` (for a Docusaurus or Next.js site), it might compile the Markdown sections into one `.mdx` file with front-matter from ArticlePassport (title, slug, authors) and the content stitched in order (outline headings become actual Markdown `#` headings, sections inserted accordingly).

  * If `surface="medium"`, convert Markdown to HTML (via a Markdown library) and possibly adjust for Medium quirks (Medium may need `<figure>` tags for images).

  * If `surface="pdf"`, it could call a Pandoc or use a LaTeX template to produce a PDF.

  * If multiple surfaces are in `ArticleSpec.targets`, it can loop through and produce each.

  * It saves these outputs to FileForge (as `file_id`), and returns either an artifact URL (like entif://export/article/art\_slug\_v1.mdx) or a short info object containing path.

  * At this stage, it's not yet published externally – it’s just ready for deployment. Actually "publish" might be separate.  
     *Output:* For an MDX target, we’ll have a nice `.md` with the content including integrated references (maybe as footnotes).

* **Publishing –** `article.publish({ article_id, surface, when }) → receipt_id`【35†L12215-L12218】. ArticleForge might handle publishing to external documentation sites or CMS:

  * If it's a static site (like entif docs site in the monorepo), "publish" could mean commit the MDX to git or trigger a build. Possibly ArticleForge would integrate with Nx to open a PR containing the new doc file (the design mentions autopost blueprint for blogs similar to how media autopost works)【35†L12249-L12257】.

  * If medium/WordPress: it would call an API to publish (similar to SocialForge but oriented to blog platform). Could reuse SocialForge with a `PostSpec` linking to the article content or do direct integration.

  * The `when` parameter allows scheduling future publishing (like do not publish until a product launch date – ArticleForge can hold the content and release it via SocialForge on that date).

  * After publish, ArticlePassport.status set to "published" and a release note might be generated (like a Receipt stating "Article X published on Medium at URL Y").

  * If versioned, tie this to a VersionForge release – e.g., when code v2.0 released, ArticleForge should snapshot and publish updated docs with a pointer to that version.  
     *Output:* Confirmation that content is live (or scheduled). Possibly returns a Receipt with the external link if applicable.

**Integration Points:**

* **DocForge & TestForge (documentation CI):** ArticleForge’s lint and citation checks overlap with DocForge (the design explicitly merges these – “extend Doc gates to /content/articles”【13†L41-L49】). Indeed, we imagine DocForge as originally focusing on code reference docs; ArticleForge extends it to essay-style articles. They share mechanisms: e.g., DocForge’s broken link checker, doc test runner, and glyphtagging all apply to ArticleForge-managed content too【13†L45-L53】. We will integrate their Nx workflows:

  * On each commit affecting docs, run `article.lint` as part of CI; if fails, block merge (ensuring "docs match reality").

  * Possibly integrate with Petri tests (like simulate reading the doc and asking questions to see if answers can be found – ensuring coverage, but that’s advanced).

* **GraphRAG/Glyph:** ArticleForge heavily uses GraphRAG for content:

  * When planning/drafting, it queries GraphRAG for related content. If the article is to explain a concept, it pulls definitions from the knowledge graph’s taxonomy (the design mentions using pasigraphy anchored in glyphs – meaning it ensures terms are linked to their concept nodes)【13†L85-L93】【13†L91-L99】.

  * Each ArticleSection is linked via `[:ABOUT]` edges to the Glyph nodes for terms it covers【33†L1157-L1165】 (the design shows example: `(:Document)-[:ABOUT]->(:Glyph)` edges for docs)【33†L1155-L1163】. So, after publishing, the graph is enriched: one can query "find docs about GraphQL" and get the Article node because of these edges.

  * Citations are represented as `(:ArticleSection)-[:CITES]->(:SourceDocument)` edges【33†L1159-L1167】, which GraphRAG uses to justify answers (the chain from Q \-\> some code or article through citations forms the basis of an evidence-backed answer).

  * **WordForge/Glyph interplay:** For each section, ArticleForge obtains a set of Glyph tags (with WordNet synsets or domain-specific ids) to embed in the metadata【33†L1159-L1167】. This disambiguates content meaning and helps in multi-lingual or semantic search.

* **ReasoningBank & Knowledge Loop:** After an article is published, Entif’s QA or support bots (if user-facing) can reference it. E.g., if a question is asked that the article answers, the GraphRAG would retrieve the relevant ArticleSection and ArticleForge ensures there's a direct citation chain for the answer (the design highlights justifications: "article nodes yields doc justifications for answers chain"【33†L1159-L1167】).  
   Also, ReasoningBank monitors documentation freshness: e.g., via CI, if code changed but docs not updated, it flags (the design snippet suggests hooking documentation update to code changes: if public API changed, ArticleForge can schedule an update of relevant sections with pointers to diff evidence)【33†L12141-L12149】【33†L12169-L12177】.

* **MediaForge:** ArticleForge uses MediaForge for any media included:

  * If an article includes an image/diagram, ArticleForge might generate it via MediaForge (there’s mention of “image generation variants; figure exports with alt-text obligations; link to source receipts”【5†L13735-L13738】). Indeed, ArticleForge can have placeholders like `<figure prompt="architecture diagram of X">` – and during rendering or drafting, call MediaForge to create `fig1.png`, attach it with alt-text and stash its passport ID in ArticleSpec.assets. Also, it ensures any image includes a caption citing its provenance (maybe watermarked if required by policy).

  * If an article includes code snippet outputs or charts, ArticleForge can call MediaForge’s VizForge integration to generate charts or GraphRAG’s analytics to fetch data to include as images.

  * It uses FileForge through MediaForge to store any binary assets.

* **SocialForge:** ArticleForge works with SocialForge to distribute content:

  * When an article is published, SocialForge can automatically create social posts linking to it (the autopost blueprint in design: e.g., push a branch with the article, SocialForge is set to notice and tweet about it or share on LinkedIn)【35†L12249-L12257】.

  * ArticleForge can create multiple derivatives: e.g., `social.compose` snippets (like a “tweet-length summary” or "top 3 takeaways") by instructing WordForge to summarize the article – these can feed SocialForge directly (maybe provided via the `ArticlePassport.thesis` or an auto-generated “tweet thread” to promote the article).

  * Conversely, SocialForge might feed back into ArticleForge’s improvement loop: by capturing which article sections get the most user questions or cause confusion, triggering ArticleForge to propose clarifications or “Heretic” suggesting alternative structures if the doc isn't performing (design mentions a "Heretic spawns structural alternative or different style when calcification detected")【33†L11485-L11493】【33†L11487-L11495】 – ArticleForge would be the one to implement such suggestions by re-planning or refactoring an article if needed.

* **AuthForge & Tripwire:** Publishing an article (especially externally) might require approvals if content is sensitive (e.g., a press release might require legal sign-off). Tripwire integration: set a rule that if `ArticlePassport.tags` includes “Legal” or risk\_flags not empty, `article.publish` requires a multi-party approval (maybe a Petri simulation run or manual checkpoint). AuthForge enforces roles for publish (like only Documentation team lead can actually execute publish to public site). All such approvals would be captured in receipts and the ArticlePassport evolves accordingly ("review" to "published").

* **BackupForge:** All content (the Markdown source, etc.) is either in Git (if docs as code) or a DB that BackupForge snapshots. The design implies that docs are treated like code – no cron jobs, rather event-driven updates and snapshot after changes (the text "fold doc maintenance into after-action debrief vernance" suggests integration into code pipeline rather than manual)【33†L9943-L9951】【33†L9954-L9962】. So BackupForge ensures that previous versions of docs are stored (maybe each release’s docs to allow rolling back or referencing old docs for older software versions).

* **DocForge/TypeForge link:** ArticleForge presumably uses TypeForge for content structure. E.g., an ArticleSpec might be validated by a JSON schema (ensuring sections have required fields, etc.). Also, receipts are a specialized type of document – perhaps ArticleForge content (especially if it’s product documentation) might incorporate references to code (like using the autoAPI outputs). Indeed, they mention integrating ArticleForge content into DocForge auto pipelines: "extend Doc gates to content/articles"【13†L43-L50】 and specifically mapping how imported signals from ArticleForge map to Entif artifact mapping【13†L79-L87】【13†L115-L119】.  
   The design snippet "What we keep from ArticleForge and how it maps" shows a table mapping ArticleForge patterns to Entif equivalents (like small Markdown atoms remain atomic sections in Entif, .vscode ergonomics remain, etc.)【13†L12327-L12345】. ArticleForge’s integration was clearly designed to not disrupt developer workflow (still edit with VSCode, etc., but now with more automation around it).

**Security & Compliance:**

* ArticleForge ensures no plagiarism or license violations: by enforcing citations and pulling from known sources (if AI is used to draft, it might try to plagiarize training data – by forcing sources and verifying via plagiarism checks (like comparing against corpora), we reduce that risk). The license audit receipts from MediaForge for images and similar happen for text too: e.g., if a large text chunk matches something not allowed, Petri can catch it or we incorporate an algorithm like we do code (the design notes "Genesis checks fail if claims lack SoT" meaning the generation fails if no source of truth for a claim, which prevents hallucination from being published)【38†L127-L136】【38†L133-L136】.

* Privacy: If articles include any personal data or secret info (shouldn’t, but if an internal name slipped in, our linter should catch "internal-only" references). Also, any user data included must be authorized (likely not relevant except maybe when writing case studies, would require consents).

* Authority and trust: The E-E-A-T fields are explicitly to comply with e.g., Google’s guidelines for content quality. ArticleForge can automatically attach an author’s credentials (via AuthForge if we store that, or simply by instructing authors to mention their title, and capturing it in the passport)【34†L12163-L12168】. It logs every change so one can trust who edited what and when.

* Operating context: ArticleForge could be run as part of CI on doc changes. If someone manually edits an article’s Markdown, ArticleForge pipeline still runs (validate, etc.) to ensure style and links remain good. If it finds issues, it can fail the CI build (ensuring no broken docs in main branch).

* Orchestration: Nx tasks likely exist:

  * `article:plan` (given perhaps a brief or request, produce an outline)【35†L12237-L12245】.

  * `article:draft` (fill content, could be cached if outline unchanged)【35†L12239-L12243】.

  * `article:lint` (non-cache, always evidence).

  * `article:build` (like `render` basically).  
     Possibly integrated with `docs.scan` (DocForge scanning for missing docs references triggers ArticleForge planning new docs if needed).

* It monitors code changes: If code or API changed triggers "docs coverage drop", ArticleForge can automatically generate a MicroSpec (like a short spec describing needed doc update) or even draft a new section describing the new API (with oversight)【33†L12953-L12960】【33†L12955-L12963】. This is advanced but on the horizon per design "if freshness drift beyond threshold, schedule concept drafts with pointers to deltas"【33†L9949-L9957】 which is something ArticleForge/DocForge would do.

### **Implementation Plan (ArticleForge)** {#implementation-plan-(articleforge)-1}

Implementing ArticleForge can follow the natural content development workflow:

**Milestone 1: Outline Planning & Data Model Setup**  
 *Goal:* Establish article data structures and the initial outline generation capability.

* **Task 1.1: Define Article Data Models (4h)** – Implement the `ArticlePassport`, `ArticleSection`, and `ArticleSpec` in `protocol/src/article.ts` as described【34†L12153-L12161】【34†L12175-L12183】. Include fields for id, title, tags, status, etc., and ensure types (e.g., Section.citations as array of objects with claim\_span and source\_id)【34†L12177-L12180】. Use TypeForge to validate, for example, that every ArticleSpec has at least one section and that published articles have no `[citation needed]` in text, etc. *Deliverable:* Data model definitions and basic validation functions. Write a test constructing an ArticleSpec with two sections and ensure it passes type check, while one missing a title fails appropriately.

* **Task 1.2: Basic Integration with Nx/Repo (4h)** – Set up directory structure for article content (e.g., `content/articles/`). Decide on storage: we might keep each article as a folder containing sections as files or one JSON/MD. Possibarkdown file per article with FrontMatter for ArticlePassport and special delimiters for sections. But better for structured ops to keep JSON. However, given writing speed, maybe simulate by storing in memory or a simple JSON file store. Also create Nx targets:

  * `"articles:lint"` hooking up to run `article.lint` on all articles (pattern content/articles/\*).

  * If docs are in Git, maybe commit them to get the full pipeline (but can simulate commit by writing to file).  
     *Deliverable:* Nx config updated so that, for example, `nx run article-forge:lint` will.lint\` command for all article files (we’ll implement that command in later tasks). We can initially stub it out to just parse and say "no errors" until the implementation is done, to test integration.

* **Task 1.3: Outline Planner Implementation (8h)** – Build the `article.plan` MCP endpoint. Use a prompt tM (if openAI API accessible in environment) to create outlines. If direct LLM not available, create a heuristic:

  * If `corpus` is provided (e.g., user gave some bullet points or an external doc for context), derive main topics from it (maybe by splitting paragraphs or scanning headings).

  * Use a predefined structure for known content types: e.g., if `audience` includes "engineers", ensure an architecture section; if includes "executives", ensure a summary section. Or if `thesis` contains "How to", maybe include step-by-step parts.

  * For a first pass, simply create:

    * Introduction

    * a Section per major concept or bullet in `corpus` (or dummy "Key Idea 1, Key Idea 2")

    * Conclusion/Next steps.

  * Mark the types: first as "hook", last as "cta" maybe, others as "claim/evidence" or if we detect how-to content as "howto".

  * Return ArticleSpec with those outlines (Section IDs generated and empty text in each section).  
     *Deliverable:* `article.plan` returns a structured outline. Test by calling it with, say, corpus: "We want an article about Entif, focusing on architecture and use-cases" plus a voice "technical but approachable". Expect at least 3 sections (Intro, Architecture of Entif, Use Cases, Conclusion). Evaluate that it matches input (should mention architecture and use-cases).

* **Task 1.4: Integrate Glyph/Graph suggestions (4h)** – In `article.plan`, also try to assign `glyph_tags` for each section. We can use a simple logic: if we have GraphRAG with known concept nodes, find relevant ones for the thesis or section heading (like using a list of key terms to glyph mapping). If no actual GraphRAG integration, hard-code a mapping like if title includes "architecture", tag with Glyph "SystemArchitecture". This is partly for demonstration.  
   *Deliverable:* Outline sections now come with some glyph\_tags (if any obvious ones). This sets up for draft step to incorporate those.

**Milestone 2: Drafting Content with AI & Citation Markers**  
 \*Go heuristic to fill in section text, marking where citations should go.

* **Task 2.1: Section Drafting Function (8h)** – Implement `article.draft`. For each section in the ArticleSpec:

  * Determine context to feed the generator: likely include the section heading, the thesis (so context), possibly neighbor headings, and any `voice` instructions.

  * If `sources` are provided in ArticlePassport (which might be previous receipts or external references), consider those: maybe feed one source’s summary into the prompt or instruct the model to "use the following info".

  * Use OpenAI GPT-3.5 or similar via API if possible (with a properly crafted prompt instructing it to produce only the content of that section, maximum N words, in a given style, and to refrain from making up facts – instruct it that any factual claim must be followed by "\[^source\]" placeholder).

  * If no API access, use stubbed content: either dummy text "Lorem ip... (source needed)" to simulate or have a small local LLM (maybe not feasible in short time).

  * Once text is generated, scan it for sentences that seem factual (could naïvely pick any sentence with a number or capitalized term) and insert a placeholder for citation if not already present. E.g., a rule: after any sentence ending in ".", add "\[^1\]" if no reference in it and it contains a number or a keyword like "is" (just to simulate needing a citation).

  * Also ensure style: if `audience` includes "executives", maybe simplify some technical terms or make sentences shorter (we can do a post-pass measuring reading grade via syllable count per word or a tool, adjust if needed or flag it).

  * Save each section’s text into ArticleSpec.sections and maybe record which parts might need citations (like track indices of placeholders).  
     *Deliverable:* After calling `article.draft` on an outline from Task 1.3, it returns ArticleSpec with sections filled. Test by running plan then draft on the earlier example and see that each section now has some content with at least one placeholder \[^\] where a citation is needed. Example for "Architecture of Entif": maybe "Entif’s architecture follows a modular design introduced in 2021\[^1\]. It includes multiple 'Forges' that handle distinct concerns..." etc.

* **Task 2.2: External Source Integration for Draft (6h)** – Enhance draft to use GraphRAG:

  * For each section, if `glyph_tags` are present, query GraphRAG for any Fact or Document nodes about that tag (simulate by a dictionary of tag-\>fact string if GraphRAG not actually built). E.g., Glyph "SystemArchitecture" might map to a known line "Entif architecture is based on microservices".

  * If found, incorporate that into the section text (like append a sentence with that fact and mark it with a placeholder reference).

  * Also, if ArticlePassport.sources has some external references (like maybe an external doc the user indicated), ensure at least one sentence referencing each is included. Possibly place a direct quote or a summary of that source’s content into appropriate sections.  
     *Deliverable:* Section drafts now reflect provided sources. Test by adding a dummy source ("GraphQLSpec2015" as a source) to ArticlePassport before drafting a section about GraphQL, and see if draft includes "GraphQL was introduced in 2015\[^source\]" with a placeholder for that source.

* **Task 2.3: Receipt Logging for Draft (2h)** – Each step (especially generation calls to LLM or knowledge retrieval calls) should produce a Receipt. For example, if we call an LLM for section 2, create a Receipt with `task: "draft.section", section_id, model used, cost_ms, etc.` and partial text perhaps. If GraphRAG used, that’s already in receipts from GraphRAG queries (like KnowledgeBank receipts).

  * Implement logging via the MCP infrastructure (maybe call a `makeReceipt` function).  
     *Deliverable:* After draft, the ArticleSpec or Passport’s receipts list has entries for each generation. In test, check that e.g., receipts count equals number of sections plus any Graph queries.

**Milestone 3: Citation Enforcement & Linting**  
 *Goal:* Validate that all claims have sources and that content meets quality guidelines.

* **Task 3.1: Implement Citation Enforcement (8h)** – `article.citations.enforce`:

  * Parse each spatterns like "\[^" which denote an unsourced claim. If any found:

    * Use a placeholder mechanism to identify what needs sourcing. Possibly find the preceding sentence or clause.

    * Query GraphRAG or external resource for that claim. If GraphRAG had relevant nodes (like a snippet in ReasoningBank knowledge base), use that. If not, call external search (maybe no time to implement an actual web search, so we can simulate by using our corpus or skip).

    * If found a source (e.g., in our dummy environmeh through a known list of references we gave ArticlePassport or a static knowledge base list for a matching phrase), then replacwith a numbered citation linking to that source. E.g., change "2015\[^1\]" to "2015\[^GraphQLSpec2015\]" if Grae source id we located.

    * Add the source id to ArticleSection.citations list with the span (we might mark the entire "2015" or the sentence).

    * If not found, leave placeholder and mark ArticlePassport.risk\_flags "uncited\_claims".

  * After processing all, generate a diff or summary:

    * `broken_citations_count` (if any still unsourced).

    * `citations_added` (how many filled in).

    * Possibly an updated recommended ArticleSpec if modifications made.  
       \*Delivarticle.citations.enforce\` on the drafted ArticleSpec from milestone 2 yields either no missing cites or identifies which remain. Test on our example: if "Entif’s architecture follows a modular design introduced in 2021\[^1\]" was in draft, we might simulate GraphRAG having an entry "EntifArcDoc" citing that, and see enforcement replace \[^1\] with \[^EntifArcDoc\] and add that to citations list. If one placeholder had no matching source, see that flagged.

* **Task 3.2: Implement Lint (8h)** – `article.lint`:

  * Broken link check: find all Markdown links `](URL)` and attempt to resolve:

    * If URL starts with `entif://`, check if target exists in our Graph or content. Without actual Graph, simulate that entif:// references to known docs or code either exist or not. Or skip internal link resolution detail for now.

    * If external (http://), attempt an HTTP HEAD request or skip due to no external calls environment; maybe just check not ously malformed.

  * Alt text: find all occurrences of `![` in section texts. If followed by `](` with nothing between brackets or just whitespace, flag "Image missing alt text".

  * Spell check or sensitive word check: incorporate a small dictionarrms (like "foobar" as dummy error) and find in text, if found, flag "Contains disallowed term".

  * Glossary or style check: if we have a list of "we prefer term X over Y", scan and if Y found, warn to use X. (For example, if official term " and draft used "Entif system", warn to unify.)

  * Check heading presence: verify that the ArticleSpec.outline headings appear in text in order. Possibly ensure top-level heading (title) is in front matter, etc. If something off (like a section in outline not present maybe because we did separate sections without heading text), we cou

  * Code snippet execution: if any triple backtick blocks with a language that we can run (maybe skip due to complexity, or simulate by storing known correct outputs and comparing if output example in text matches).

  * Summarize issues by severity:

    * e.g., "Error 3" (this would block publish).

    * "Warning: Link to http://oldsite.com unreachable (timed out)" (maybe not block but needs attention).

    * "Info: Reading grade \~14, consider simplifying sentences for broader audience".

  * Possibly automatically fix trivial things like adding placeholder alt text "imag:\* `article.lint` returns a list of findings (and optionally a cleaned ArticleSpec). Test on our doc: if we intentionally had an `![](diagram.png)`, see it flag alt text. If we put a known broken link (like entif://nonexistent), see it flag. If we includeded. We then rectify those issues manually or via ArticleForge suggestion and re-run until clean.

* **Task 3.3: Final Integration for CI (4h)** – Cint`to the Nx target from Task 1.2 so that running`nx run articles:lint`goes through each article file, runs the lint logic, and reports to console any issues. Ensure that in a CI context (like on push), if lint reports an error, it exits with code !=0 (failing the pipeline, as desired)【35†L12269-L12277】. Possibly add a step in CI to run`article.citations.enforce\` as well and commit changes if any (maybe not auto-commit – just notify authors to add sources). Simulate a CI run: have an article with an error (missing alt). Run lint target – confirm it logs that error and returns failure (we can simulate by capturing exit code). Then fix alt text in f (no errors output, exit 0). This ensures our doc gating works as expected.

**Milestone 4: Rendering & Publishing**  
 *Goal:* Output the article to desired formats and simulate publishing.

* **Task 4.1: Implement Render for MDX (6h)** – `article.render(article_id, "mdx")`:

  1. tter: e.g., `---\ntitle: <ArticlePassport.title>\nslug: <passport.slug>\nauthor: <passport.author>\ntags: [..]\n---`.

  2. Iterate outline: output each heading a level (top-level heading might be Title which is given separate in frontmatter or could repeat as H1 in content – depending on static site approach; to avoid duplicates, possibly skip adding title as H1 since frontmatter does it).

  3. Then output sections under each heading. Many sections might combine to form paragraphs of a single heading (the outline can group multiple section\_ids under one heading)【34†L12181-L12189】. We should output them sequenn naturally flow as separate paragraphs or list items etc.).

  4. Insert footnotes or reference list at end for citations:

     * E.g., for each unique Source in citations across sections, add a `[^SourceID]:` note with either the external linkre GraphRAG node keys, maybe turn them into URL of an docs site or just include an identifier (some static text or just the ID ough for internal docs). For external, include full URL or title.

  5. Write the combined content to a file like `content/articles/<slug>.md`.  
      *Deliverable:* After running \`article.xample, an MD file is created. Open it and see that:

     * It has nice frontmatter.

     * Headings (like "Introduction", "ntif", etc.) properly delineated.

     * Content paragraphs from each section present.

     * Citations appear maybe as footnotes at bottom (or inline if we decide to keep them inline).

     * Alt text and code blocks properly formatted.

* **Task 4.2: Optionally Implement HTML/PDF export (4h)** – If talso do:

  1. For "pdf": use Pandoc if available or a simple approach (maybe skip due to environment complexity).

  2. For "medium": possibly integrate with SocialForge (liket have a function to post HTML to Medium – but if not, skip actual publishing, just prepare an HTML string).  
      *Deliverable:* If done, at least produce an HTML version of the article: e.g., convert the MDX (maybe using a library like marked or showdown) to HTML and output file.

* **Task 4.3: Publish via Medium/Dev (6h)** – Simulate publishing externally:  
   \-le.publish(article\_id, surface, when)\`:

  1. If surface "mdx" and our main site is code-based: commit the MD file to Git (maybe beyond scope to truly commit in test, but simulate by printing or writing to a "published" folder).

  2. If surface "medium": call Medium's API to create story – that requires token. Instead of actual call, use SocialForge to schedule a post on "Medium integration ink to article (if we have a link).

  3. If `when` is future: schedule the publish by storing an event (like similar to SocialForge s Immediately mark ArticlePassport.status accordingly ("scheduled" or "published") and create a Receipt.

  4. In an integrated scenario, we might just simulate the last mile: e.g., log "Published article \<title\> on Medium at \<some URL\>" and mark it published.

  5. Also incorporate versioning: if there's `version` field, ArticleForge might call VersionForge to tag this We can simulate by writing a line in a changelog file or simply acknowledging "Article version 1.0.0 released".  
      *Deliverable:* After running `article.publish(article_id, "mdx")`, confirm that ArticlePassublished" and perhaps a "published\_at" timestamp is recorded. Check if the MD was moved or flagged as now published (maybe we c `published/` directory to simulate deploying it).

* **Task 4.4: End-to-End Demonstration (4h)** – Now tie everything in a realistic usage storyline:

  1. **Plan** an articg., "The Entif Platform Architecture" with thesis and target audience.

  2. **Draft** the article content.

  3. **Enforce citations** – see that it adds needed references (like to an official architecture whitepaper if one was in knowle*Lint*\* the article – maybe it flags something which we manually fix (simulate that step).

  4. **Render** to MDX and verify output.

  5. \*\*ybe just mark as published.

* Meanwhile, show how sections are now integrated: e.g., after publishing, ask a sample Q to the QA system, and show that er in this published article via GraphRAG (since we have nodes for it). This part might be descriptive.

   Also incorporate the concept of continuous updates: demonstratt" scenario – e.g., "We change something in code, CI triggers ArticleForge to run plan or update a concept doc for differences." Might only describe this due to coeliverable:\* A final compiled demonstration script (which might be included in blueprint as a high-level "Net effect" scenario) where an Entif engineer can run a single Nx command or similar and get a fully drafted, checked, and deployed article with minimal human effort, all with receipnce lines from design showing how each quality gate and receipt fits in).

By completing these milestones, ArticleForge will function as a robust tool for generating high-quality documentation with provable accuracy and easy maintenance. When combined with the rest of Entif’s platform, it ensures documentation becomes a dynamic, reliable asset rather than a liability.

---

### **Net Effect of Forges Working Together** {#net-effect-of-forges-working-together}

Finally, to illustrate how these forges interoperate in Entif’s pipeline, consider an example scenario:

1. **Content Creation (ArticleForge & MediaForge):** The team wants to announce ae. ArticleForge generates a detailed technical blog post with diagrams. It uses **MediaForge** to produce an architecture diagram image and **LyricsForge** (if it were say a tutteps, not exactly lyrics but conceptually an alignment of code and explanation) to ensure any included command outputs align with actual results. Every claim in the blog is backed by internal receipts (e.g., performance stats cited have receipts from GraphRAG)【35†L12191-L12199】. Doc quality gates run – broken links fixed, 5†L12207-L12215】. The blog content (with embedded receipts) is then published as Markdown to the docs site.

2. **Multi-Channel Distribution (SocialForge):** SocialForge takes the Article content and automatically crafts a serie posts: a tweet thread summarizing key points (using the article’s thesis and sections via WordForge)【11†L14273-L14276】, a LinkedIn post linking to the full article (with an image aForge as thumbnail)【11†L14283-L14291】, and schedules them at the best times identified by its analytics (maybe next morning at 9am for Twitter, noon for LinkedIn)【11†L14265-L14273】. Before posting, it validates each – ensuring, for example, that the Twitter thrchar limits and includes the required hashtags for the campaign【10†L14191-L14199】【10†L14193-L14201】. AuthForge ensures only approved roles can okay the posts【7†L41-L47】. SocialForge then posts them (capturing receipts of exactly what was posted where and when)【12†L14407-L14415】.

3. **EngagemenialForge & ReasoningBank):** As the content goes live, SocialForge aggregates engagement data: it sees, for instance, the LinkedIn post got positive comments, while the tweet thread had fewer interactions【11†L14293-L14300】. It runs an **experiment** implicitly, comparing the two styles of post, and finds the LinkedIn approach had a higher engagement rate.to ReasoningBank, which updates strategy to favor LinkedIn for that kind of announcement【12†L14409-L14417】. SocialForge’s “Coach” notes via VizForge dashboards that “LinkedIn posts about architecture yield 3x engagement vs Twitter” (based on receipts)【12†L14418-L14423】.  
    On the feedback side, SocialForge collects a couple of technical questions asked in comments on the LinkedIn post. It labels them and flags one as needing a detailed answer. It automatically consults the knowledge graph (which includes the new article and existing docs) and suggests a reply, but Tripwire rules say any technical advicd – so it does not auto-post, but instead notifies an engineer to respond via the SocialForge interface【11†L14250-L14258】. The engineer uses the suggested answer (which cites the article and maybe a code snippet from docs) and SocialForge posts it, logging the interaction.

4. **Continuous Improvement (Petri & ArchiveForge):** All the while, Petri tests monitor the performance of content: di reduce support tickets about that feature? Are docs coverage metrics improved? (Doc coverage Petri might ser questions to see if the article answers them – given our graph-connected content, the Q\&A agent can answer from the article now, making test pass)【33†L11261-L11267】. ArchiveForgecle version along with the software release – ensuring iook at Entif v1.2, we retrieve the docs as published then【13†L14353-L14360】. When Entif updates the feature in v1.3, a Petri “freshness” test fails (code changed without corresponding doc update)【33†L9947-L9955】. This triggers ArticleForge to create an outline for an update section (via `plan`) and maybe draft a paragraph anges, ready for an engineer to review【33†L9950-L9958】. The updated article goes through the same quality pipeline (citations for new claims, etc.ng an update.

5. **Trust & Governance:** Throughout, every piehe article, the social posts, the comments, the replies – is logged with Receipts and linked in the knowledge network【122†L14418-L14423】. Months later, if someone asks “Where did we get the 2021 figure in our ?”, we can trace it: the footnote in the article points to a Receipt referencing a design document in ArchiveForge from 2021【33†L11219-L11’s forges collectively ensure **content is not only well-crafted and disseminated, but also verifiable and auditable** at each step – fulfilling a cycle of continuous,ge sharing.

In conclusion, the Entif 2.0 forges – MediaForge, SocialForge, ArticleForge, LyricsForge, WordForge, FileForge, ArchiveForge, MetadataForge, VersionForge, VizForge, AuthForge, BackupForge, UIForge, APIForge – operate as an integrated ecosystem. They treat every piece of information as part of created with assistance (but verified), stored with provenance, distributed with tracking, and fed back into improvement loops. Tint ensures that the Entif platform’s content and knowledge – from code to documentation to user communications – are **modularly produced, cross-linked, versioned, and quality-controlled**. As a result, everything is **predictable, governable, and fast** – each Forge executes its specialized role, while common frameworks (MCP interfaces, Nx orchestration, Receipts for evidence, entif:// URI linking) tie them together into a cohesive intelligent system【43†L13900-L13908】【43†L13912-L13919】.

