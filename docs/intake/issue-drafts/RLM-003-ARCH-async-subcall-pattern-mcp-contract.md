# Issue Draft: RLM-003-ARCH — Async Subcall Pattern + MCP Contract for RLMRuntime

## Metadata

- **Prefix:** RLM-003
- **Short title:** Async Subcall Pattern + MCP Contract for RLMRuntime
- **Type:** architecture / implementation
- **Status:** draft
- **Confidence:** HIGH (findings), MEDIUM (specifics)
- **Source doc:** `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`
- **Findings:** RLM-003-H (RLM-003-6, RLM-003-9), RLM-003-M (RLM-003-10, RLM-003-13)
- **Collision check:** RLM-001-ARCH (context runtime design) is complementary; this spec addresses async + MCP contract specifics not covered there

---

## Problem Statement

The RLM paper explicitly identifies blocking/sequential subcalls as the primary performance bottleneck and recommends async subcalls + sandboxed REPLs as the fix. Additionally, no formal MCP contract exists for the `RLMRuntime` component — only an informal proposal in conversation. Without a formal spec, the MCP contract cannot be implemented, tested, or integrated with Ada/ROMA.

---

## Evidence

From `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`:

**Proposed MCP tool surface (from finding RLM-003-6):**
```
context.mount(source_refs | query) -> context_handle
rlm.run(context_handle, query, budgets, policy_mode) -> {final_handle, trace_handles[]}
context.inspect(context_handle, op=grep|slice|chunk|stats, args) -> observation_handle
```

**Async pattern (from finding RLM-003-9):**
- REPL requests subcalls by enqueuing jobs (with budgets + policy tokens)
- Workers execute independently and return results as tiles
- Root REPL polls/awaits completion and keeps going
- Gives "procedural attention" without single-threaded hostage

**Batching enforcement (from finding RLM-003-13):**
- Paper's own engineering notes: making `llm_query` 1000 times is expensive
- Enforce minimum chunk sizes and "call coalescing" in the runtime, not just in prompt text
- Guard-enforced minimum subcall chunk size

---

## What This Issue Covers

1. **Formalize the MCP contract** for `RLMRuntime` / `ContextRuntime`:
   - `context.mount` — mount external context as variable environment
   - `rlm.run` — execute bounded RLM program against mounted context
   - `context.inspect` — programmatic inspection (grep/slice/chunk/stats)
   - Request/response schemas for each
   - Receipt schema per operation (cost, iterations, depth, output tiles)
   - Guard decision points in the contract

2. **Design the async subcall pattern**:
   - Producer (root REPL) → job queue (with budgets + policy tokens)
   - Workers execute independently, return results as tiles
   - Consumer (root REPL) polls/awaits and continues
   - Maps to existing worker queue patterns in Entif

3. **Enforce batching discipline at runtime level**:
   - Minimum subcall chunk sizes enforced by Guard policy
   - Call coalescing (batch multiple small subcalls into one)
   - Configurable thresholds, not prompt conventions

4. **Budget tracking in receipts**:
   - Cost per subcall step
   - Cumulative cost in trajectory receipt
   - Hard-stop rule: return best-effort partial-answer tile when budgets exhausted

---

## Relationship to RLM-001-ARCH

RLM-001-ARCH addressed the context runtime design at a high level (treating RLM as a first-class tool). This issue addresses the **specific mechanics**: the async pattern, the formal MCP contract, and the runtime enforcement of batching discipline. RLM-001-ARCH is prerequisite; this issue extends it.

---

## Acceptance Criteria

- [ ] MCP tool schema specced for `mount`, `run`, `inspect` with request/response types
- [ ] Receipt schema defined for RLM operations (per-step + trajectory)
- [ ] Guard decision points identified in the MCP contract
- [ ] Async subcall job queue pattern documented (producer/worker/consumer)
- [ ] Batching enforcement policy instantiated in GuardLayer
- [ ] Minimum chunk size configurable via policy, not hardcoded
- [ ] Hard-stop partial-result tile return path defined and tested
- [ ] Cost tracking per subcall and cumulative in receipts

---

## Labels

- area:architecture
- area:rlm
- priority:high
- type:implementation
