# Orchestration layer design

**User:** Anonymous  
**Created:** 4/27/2026 14:53:40  
**Updated:** 4/29/2026 18:44:09  
**Exported:** 4/29/2026 18:45:17  
**Link:** [https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0-entif-2-0/c/69efaff2-c9ec-8332-95a6-b955b6783f4a](https://chatgpt.com/g/g-p-69299306a6408191947092cdf41148f0-entif-2-0/c/69efaff2-c9ec-8332-95a6-b955b6783f4a)  

Boss, the design you described is not “better memory.” It is **an operational cognition control plane**: a deterministic middleware layer that decides what an agent should know, remember, enforce, retrieve, compact, write, and forget-per-session, without trusting the LLM to obey a bloated instruction pile.

Below is the architectural plan distilled from this chat.

# Entif/Rosetta Operational Context Control Plane

## 1. Core thesis

Current agent stacks fail because they treat context, memory, skills, governance, and workflow procedure as **prompt matter**. That is the wrong layer.

Your proposed architecture moves those concerns into a **deterministic orchestration substrate** that sits outside the model and only injects the minimum live context needed at the moment of execution.

The system should not say:

> “Agent, remember to do TDD, check memory, avoid leaking PII, write insights down, respect provenance, preserve tasks, don’t bloat context…”

It should instead operate as:

> “This task is coding. This domain has PII. This repo has prior memory. This workflow requires red-green TDD. This tool call is side-effecting. This memory item is hot. This context block is stable. This cache prefix must not be invalidated. This insight must become a receipt-backed memory tile.”

That aligns directly with the Rosetta posture of treating every computation and artifact as explicitly represented, content-addressed, semantically typed, and auditable, with a universal Run → Action → ToolCall → Observation → Evaluation spine. 

---

# 2. Architectural layers

## Layer 0: Rosetta/Hindsight Canonical Memory Spine

**Purpose:** Give every agent a canonical, queryable, provenance-preserving memory substrate.

Hindsight becomes the immediate practical memory engine, while Rosetta defines the deeper semantic/audit constitution.

Core memory objects:

| Object        | Purpose                                                            |
| ------------- | ------------------------------------------------------------------ |
| `Observation` | Raw event, transcript, tool result, user instruction, agent output |
| `Insight`     | Useful derived learning from a task                                |
| `Decision`    | Explicit choice made, with rationale                               |
| `Task`        | Actionable future work                                             |
| `Procedure`   | Reusable workflow pattern                                          |
| `Policy`      | Enforceable rule or constraint                                     |
| `Failure`     | Misstep, context collapse, bad assumption, broken process          |
| `Evaluation`  | Result quality, test outcome, success/failure signal               |
| `Receipt`     | Proof of what happened, by whom/what, when, and with what inputs   |

Design rule:

**Agents never treat loose Markdown files, TODO docs, or chat residue as canonical state.** They may generate them as artifacts, but canonical operational memory goes into Hindsight/Rosetta.

This fits your existing Cognitive Tiles direction: portable, content-addressed knowledge objects carrying context, proofs, lineage, and purpose. 

---

## Layer 1: Ingress Refinery and Context Classifier

**Purpose:** Before content reaches an agent or memory store, classify what kind of thing it is.

Every incoming user message, transcript, file, tool result, code diff, error, PR note, or agent reflection gets passed through a deterministic/classifier hybrid that assigns:

| Classification   | Examples                                                                         |
| ---------------- | -------------------------------------------------------------------------------- |
| Domain           | coding, architecture, governance, personal, finance, security                    |
| Risk             | PII, secret, credential, proprietary IP, destructive action, external disclosure |
| Workflow mode    | coding, planning, debugging, research, writing, memory maintenance               |
| Memory relevance | transient, session-hot, project-warm, constitutional, archive                    |
| Retrieval need   | must query memory, should query memory, no query needed                          |
| Writeback need   | must write insight, may write summary, no durable value                          |
| Cache volatility | stable prefix, semi-stable mode, hot task context, ephemeral turn                |

This is where your PII example lives.

Instead of having a skill saying “don’t leak PII,” the system detects:

> “This conversation contains PII. Any external call, summary, tool invocation, or sub-agent delegation must route through PII policy.”

That means PII becomes an operational constraint, like secrets masking, not a mere instruction.

This extends the existing Entif Guard Layer idea from broad policy enforcement into **workflow-level governance**, which is exactly the missing granularity you identified. The existing Guard Layer design already frames itself as a higher-privilege policy enforcement point intermediating agent operations. 

---

## Layer 2: ACT-R-Style Activation Engine

**Purpose:** Activate the right memory, procedures, policies, and context only when the situation calls for them.

This is your crucial “ACT-R injected” insight.

The system maintains activation scores over memory and procedure objects, using signals such as:

| Signal          | Meaning                                                     |
| --------------- | ----------------------------------------------------------- |
| Recency         | Was this used recently?                                     |
| Frequency       | Has this solved similar tasks before?                       |
| Domain match    | Does this relate to coding, security, memory, etc.?         |
| Entity overlap  | Same repo, agent, file, project, vendor, workflow           |
| Failure history | Did prior agents fail here?                                 |
| Risk level      | Does this involve secrets, PII, destructive tools?          |
| User preference | Has Crates repeatedly demanded this practice?               |
| Mode            | Are we in coding, research, architecture, governance, etc.? |

Activation outputs a **Context Activation Plan**:

```txt
For this turn:
- Activate coding workflow mode.
- Require Hindsight preflight query.
- Inject TDD procedure summary.
- Activate repo-specific memory.
- Activate PII policy because user data is present.
- Activate guardrails for file edits and shell commands.
- Suppress unrelated long-term doctrine.
- Use hot memory near user prompt.
- Preserve stable prefix for cache.
```

This replaces dumb skill invocation with **scenario-specific procedural cognition**.

---

## Layer 3: Context Compiler and Cache Planner

**Purpose:** Build prompts with deliberate cache geometry.

This was one of the most important corrections you made: you do **not** want to inject and remove rules constantly after every tiny operation, because that causes cache churn.

Instead, the context compiler should produce ordered prompt strata:

```txt
[Stable Constitutional Prefix]
  Rosetta/Entif invariants
  Identity and authority hierarchy
  Core safety model
  Stable project doctrine

[Mode Prefix]
  Coding mode / research mode / architecture mode
  TDD requirements if coding
  Memory discipline if agentic work
  PII handling if sensitive data present

[Project/Repo Context]
  Current repo architecture
  relevant prior decisions
  active tickets
  current branch / PR state

[Hot Working Memory]
  immediate task
  latest tool results
  files touched
  errors encountered
  active hypotheses

[User Turn]
  actual user instruction
```

Design rule:

**Stable, slow-changing context goes high in the prompt. Hot, fast-changing context goes low/late in the prompt.**

This allows provider prompt caching to keep the expensive stable prefix intact while still allowing task-local work to mutate.

When a semi-session ends, the compiler does not wipe the whole session. It performs **surgical compaction**:

| Keep                                | Compact                   | Drop                       |
| ----------------------------------- | ------------------------- | -------------------------- |
| durable decisions                   | task-local chatter        | stale injected scaffolding |
| successful procedures               | repeated logs             | obsolete hypotheses        |
| failed attempts worth learning from | tool traces into receipts | verbose mode text          |
| new tasks                           | code diff summaries       | transient scratch          |

Output becomes a **Compiled Context Package** or Rosetta Tapestry: a bounded, rights-scoped context bundle optimized for reuse, cacheability, and replay.

This is also directly compatible with the NOT LAME PRD’s claim that the sovereign kernel should own context compilation, memory routing, write admission, policy enforcement, and adapter certification rather than letting harnesses become state authorities. 

---

## Layer 4: Operational Rails Engine

**Purpose:** Enforce workflow behavior at runtime, not by pleading with the model.

This is the layer that fixes the “skills are not enough” problem.

A skill file can say:

> “Before answering, check Hindsight.”

But a rail can require:

> “No answer may be emitted for this class of task until a Hindsight query receipt exists or an explicit skip reason is recorded.”

Examples:

| Scenario                     | Enforced operational rail                                    |
| ---------------------------- | ------------------------------------------------------------ |
| Coding task                  | Must run red-green TDD workflow or record exception          |
| Unknown error                | Must search Hindsight before spinning                        |
| Agent finds reusable insight | Must write insight to memory                                 |
| TODO discovered              | Must write canonical task, not random TODO file only         |
| Sensitive data present       | Must redact/mask before external route                       |
| Tool call side effect        | Must obtain Guard decision token                             |
| Long task                    | Must checkpoint state before compaction risk                 |
| Sub-agent spawn              | Must inherit minimal scoped context, not whole parent prompt |
| Repeated failure             | Must escalate model/tool/memory route                        |

This is the difference between **instructional governance** and **operational governance**.

Instructional governance says: “Please be careful.”

Operational governance says: “The state machine does not advance until the preconditions are satisfied.”

Your existing inter-agent messaging spec already supports this posture by separating data-plane messages from control-plane action requests, requiring signed envelopes, replay protection, and Guard decisions for action-triggering messages. 

---

## Layer 5: Agent Runtime Adapters

**Purpose:** Demote OpenClaw/IronClaw/Minimax/Codex/etc. into replaceable workers.

The agent harness is not the sovereign system. It is a worker substrate.

Each runtime adapter exposes a common contract:

```ts
interface AgentRuntime {
  id: string;
  modelProfile: ModelProfile;
  capabilities: Capability[];
  contextBudget: TokenBudget;
  execute(workUnit: CompiledWorkUnit): Promise<AgentResult>;
}
```

The adapter receives:

| Input                   | Description                     |
| ----------------------- | ------------------------------- |
| `CompiledWorkUnit`      | scoped task                     |
| `ContextPackage`        | minimal relevant context        |
| `PolicyEnvelope`        | applicable constraints          |
| `MemoryHandles`         | Hindsight/Rosetta references    |
| `ToolPermissions`       | explicit allowed tools          |
| `WritebackRequirements` | required receipts/memory writes |

The adapter returns:

| Output             | Description                              |
| ------------------ | ---------------------------------------- |
| `Result`           | answer, code, plan, artifact             |
| `Receipts`         | what happened                            |
| `MemoryCandidates` | insights/tasks/decisions worth storing   |
| `FailureSignals`   | confusion, contradiction, low confidence |
| `CostTelemetry`    | tokens, latency, model route             |

Agents can still be dumb. The system around them is not.

That is the architectural jailbreak from today’s agent-stack stupidity swamp.

---

## Layer 6: Tool Execution, Receipts, and Guarded Side Effects

**Purpose:** Every action becomes auditable, replayable, and enforceable.

Tool calls follow:

```txt
Intent → Plan → Guard Decision → ToolCall → Observation → Evaluation → Receipt → Memory Write
```

Side-effecting tools require admission:

```txt
Can this agent write this file?
Can it run this shell command?
Can it call this external API?
Can it send this message?
Can it expose this context to another model/provider?
Can it persist this derived memory?
```

The Guard Layer does not merely block “dangerous” behavior. It also ensures procedural compliance:

```txt
No code write without branch context.
No final coding answer without tests or exception.
No sub-agent delegation with private memory unless scope allows.
No memory mutation without source/provenance.
No external provider route with unmasked secrets/PII.
```

Each operation emits a receipt.

Receipts are not logs as decoration. They are the system’s circulatory system.

---

## Layer 7: Hindsight/Rosetta Memory Writeback Loop

**Purpose:** Agents must not lose valuable work to context collapse.

Every completed operation gets post-processed:

```txt
Did we learn something reusable?
Did we make a decision?
Did we discover a failure mode?
Did we create a task?
Did we validate a procedure?
Did we find a library/tool/pattern worth reusing?
Did we produce a durable artifact?
```

If yes, the system writes memory into canonical storage.

Memory write classes:

| Write Type      | Example                                                            |
| --------------- | ------------------------------------------------------------------ |
| `InsightTile`   | “Minimax agents fail unless memory preflight is mandatory.”        |
| `ProcedureTile` | “For coding tasks, enforce red-green TDD before final.”            |
| `FailureTile`   | “Agent wrote TODO to local file, then lost path after compaction.” |
| `DecisionTile`  | “Use Hindsight as thin memory substrate for Rosetta mapping.”      |
| `TaskTile`      | “Build Hindsight adapter for graph + semantic memory.”             |
| `PolicyTile`    | “PII must be handled like environment secrets.”                    |
| `EvalTile`      | “This rail reduced repeated dead-end behavior.”                    |

This converts agent experience into durable operational knowledge.

---

# 3. End-to-end runtime flow

## A. User or agent initiates work

Example:

> “Fix this failing test and update the skill.”

## B. Ingress classifier labels the task

```json
{
  "domain": "coding",
  "mode": "implementation",
  "risk": ["repo_write", "possible_secret_exposure"],
  "requires_memory_preflight": true,
  "requires_tdd": true,
  "writeback_expected": true
}
```

## C. Activation engine selects rails

```txt
Activate:
- Coding/TDD rail
- Hindsight preflight rail
- Repo memory retrieval
- Diff receipt rail
- Post-run insight extraction
```

## D. Context compiler builds cache-aware prompt

```txt
Stable prefix remains unchanged.
Coding mode prefix added.
Repo context retrieved from memory.
Hot test failure placed near user turn.
```

## E. Agent attempts work

The agent cannot proceed blindly.

Required first step:

```txt
Query Hindsight for prior related failures, repo conventions, known patterns.
```

## F. Tool calls are guarded

```txt
File write? Requires admission.
Shell command? Requires admission.
Network call? Requires admission.
```

## G. Receipts are emitted

```txt
ToolCall receipt
Test receipt
Diff receipt
Memory query receipt
Memory write receipt
```

## H. Post-run memory writeback occurs

```txt
Store:
- what fixed the issue
- test result
- reusable pattern
- new task if incomplete
- failure if agent struggled
```

## I. Context is surgically compacted

```txt
Keep durable facts.
Summarize task-specific trace.
Drop scaffolding.
Preserve cacheable prefixes.
```

---

# 4. Key design decisions

## Decision 1: Skills become packages, not authority

Skills are useful as human-readable bundles and reusable task affordances.

But they are not reliable authority.

So:

```txt
Skill.md = documentation and examples
Policy = enforceable rule
Rail = workflow state machine
Receipt = proof of execution
Memory = durable learning
```

A skill can describe “check Hindsight first.”

A rail enforces it.

---

## Decision 2: Context is compiled, not accumulated

The system must stop treating context as a landfill.

Context should be:

| Kind                   | Handling                    |
| ---------------------- | --------------------------- |
| Constitutional         | stable prefix               |
| Procedural             | mode-scoped prefix          |
| Project memory         | retrieved by activation     |
| Working state          | hot/late prompt             |
| Tool traces            | receipts, not prompt bulk   |
| Completed task details | compacted into summary/tile |
| Obsolete scaffolding   | removed                     |

---

## Decision 3: Governance must exist at process granularity

Outer firewall governance is necessary but insufficient.

You need governance at every operational seam:

```txt
before retrieval
before context injection
before sub-agent spawn
before tool call
before memory write
before external provider route
before final response
before compaction
```

This is granular governance as workflow metabolism.

---

## Decision 4: Memory must be preflight and postflight

Every meaningful workflow should have:

```txt
Preflight:
  “Do we already know this?”

Postflight:
  “What did we just learn?”
```

That one pattern alone fixes a grotesque amount of current agent waste.

---

## Decision 5: Repeated inference should be promoted into deterministic substrate

If agents keep needing the same reasoning, do not keep paying for inference.

Promote it:

| Repeated pattern          | Promote into           |
| ------------------------- | ---------------------- |
| common coding workflow    | rail/procedure         |
| recurring validation      | deterministic test     |
| frequent retrieval bundle | context package        |
| repeated policy concern   | policy rule            |
| repeated transformation   | tool/function          |
| useful explanation        | memory tile            |
| recurring judgment        | eval rubric            |
| common sub-agent setup    | scoped runtime profile |

This matches the OMOC/Entif thesis: optimize for value density per token, retrieval, route, and retained artifact, not bigger prompts. 

---

# 5. Proposed core services

## `context-orchestrator`

Owns:

```txt
mode detection
context package creation
cache-aware ordering
surgical compaction
prompt assembly
```

## `activation-engine`

Owns:

```txt
ACT-R-like spreading activation
memory/procedure/policy selection
salience scoring
retrieval routing
```

## `hindsight-rosetta-adapter`

Owns:

```txt
Hindsight reads/writes
Rosetta tile mapping
semantic search
graph search
memory receipts
```

## `operational-rails-engine`

Owns:

```txt
workflow preconditions
TDD rail
memory preflight rail
postflight writeback rail
sub-agent inheritance rules
```

## `guard-admission-service`

Owns:

```txt
policy decisions
side-effect admission
PII/secret route gating
provider route approval
decision tokens
```

## `receipt-ledger`

Owns:

```txt
append-only event records
tool receipts
memory receipts
eval receipts
cost and latency telemetry
```

## `deterministic-promotion-engine`

Owns:

```txt
detect repeated inference
recommend conversion to tool/policy/procedure
score cost savings
track adoption
```

---

# 6. Minimal viable build slice

The first shippable slice should be deliberately narrow:

## MVP: “Memory-Aware Coding Rail”

Goal:

Make one dumb coding agent stop wasting an hour on things already in Hindsight and stop losing durable outputs after compaction.

### Build components

1. **Hindsight query wrapper**

   * `search_memory(query, scope, mode)`
   * returns top semantic/graph matches.

2. **Mandatory memory preflight rail**

   * before coding/debugging/planning, agent must query Hindsight or record skip reason.

3. **Postflight memory writer**

   * writes insights, decisions, tasks, failures, successful fixes.

4. **Context compiler v0**

   * separates stable project context, active task context, hot memory, and user turn.

5. **TDD rail v0**

   * for coding tasks:

     * identify failing test or create test
     * implement
     * run test
     * record result

6. **Receipt ledger v0**

   * records:

     * memory query
     * files touched
     * shell commands
     * test results
     * final writeback

7. **Compaction-safe task persistence**

   * no task exists only in a local TODO file.
   * task must be stored in Hindsight/Rosetta.

### Acceptance test

Give a low-tier agent a task where the answer already exists in Hindsight.

It should:

```txt
1. Query Hindsight first.
2. Retrieve prior answer/procedure.
3. Avoid redundant exploration.
4. Apply solution.
5. Run validation.
6. Write a receipt.
7. Store any new insight.
8. Compact without losing the task state.
```

That is the first clean win.

---

# 7. Priority roadmap

## Phase 1: Stop the bleeding

Build:

```txt
Hindsight adapter
memory preflight rail
postflight memory writeback
receipt ledger
coding/TDD rail
context package v0
```

Outcome:

Agents stop forgetting, spinning, and writing durable knowledge into random files.

## Phase 2: Cache-aware context compiler

Build:

```txt
prompt strata
stable prefix manager
mode prefix manager
hot memory injector
surgical compactor
cache invalidation planner
```

Outcome:

Lower token cost, fewer context collapses, less prompt pollution.

## Phase 3: Policy and PII operationalization

Build:

```txt
PII/secret classifier
external-route sanitizer
provider route guard
side-effect admission
sub-agent context scoping
```

Outcome:

Security becomes process-native, not a warning in a skill file.

## Phase 4: Deterministic promotion engine

Build:

```txt
pattern mining
repeated inference detector
candidate tool/procedure/policy generator
eval-backed promotion workflow
```

Outcome:

The system gradually converts expensive cognition into cheap reusable substrate.

## Phase 5: Rosetta-native memory tiling

Build:

```txt
ObservationTile
InsightTile
DecisionTile
TaskTile
ProcedureTile
FailureTile
ReceiptTile
EvaluationTile
```

Outcome:

Hindsight becomes a practical Rosetta-backed memory substrate rather than just a memory app.

## Phase 6: Multi-agent inheritance and delegation

Build:

```txt
sub-agent spawn contract
minimal context inheritance
capability-scoped memory handles
delegation receipts
return-summary compiler
```

Outcome:

Parent agents stop bloating from sub-agent chatter, and sub-agents stop inheriting the entire cathedral when they only need a screwdriver.

---

# 8. The sharpest formulation

What you described is:

> **A cache-aware, activation-driven, receipts-first operational governance layer for agentic cognition, where procedural memory, policy, context, and writeback are enforced outside the LLM and injected only as compiled, scenario-specific, minimally sufficient runtime substrate.**

Or, more productively:

> **Rosetta/Hindsight becomes the memory spine; Entif becomes the operational nervous system; the LLM becomes a replaceable cognitive muscle, not the brain, not the memory, not the constitution, and definitely not the compliance department.**

That is the whole trick, sugar-britches: stop asking the monkey to remember the circus rules while it is juggling chainsaws. Build the floor so the chainsaws only turn on when the choreography says they may.
