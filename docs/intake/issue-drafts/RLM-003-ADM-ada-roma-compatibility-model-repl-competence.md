# Issue Draft: RLM-003-ADM — Ada/ROMA Compatibility + Model REPL Competence for RLM

## Metadata

- **Prefix:** RLM-003
- **Short title:** Ada/ROMA Compatibility and Model REPL Competence for RLM
- **Type:** integration / architecture
- **Status:** draft
- **Confidence:** MEDIUM (assessment), HIGH (risk if unaddressed)
- **Source doc:** `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`
- **Findings:** RLM-003-L (RLM-003-15), RLM-003-M (RLM-003-11)
- **Collision check:** No existing issue covers Ada/ROMA compatibility with RLM. DCP-003 (model-broker-nim-unimplemented) is related — model selection for RLM root vs. subcall is a concrete requirement for the model broker.

---

## Problem Statement

Two related risks:

1. **Ada compatibility**: The assistant claims Ada (the orchestrator) already has the spine needed for RLM integration, but this is unverified. Ada's tool-calling interface may not support the mount/run/inspect primitives without API changes. If Ada cannot call the RLMRuntime as a standard tool, special-case glue code is required — which violates Entif's "no special-case glue" principle.

2. **Model REPL competence**: The RLM paper shows that models with weak coding ability fail in the REPL-centric setup. The root model (which writes the REPL programs) needs strong coding competence. Cheaper models are acceptable for subcalls. Currently, the model broker (DCP-003) has no "REPL competence" axis for model selection.

---

## Evidence

From Finding RLM-003-15 (LOW confidence — the assistant's unverified claim):
> "Entif's layering already separates Orchestrator (Ada), reasoning modules (TRM/ROMA/ReasoningBank), evaluation (ELIXIR), and safety (Tripwire). And that this existing structure is 'exactly the spine RLMs need to be usable (not just clever).'"

This claim is the assistant's interpretation; no evidence that Ada/TRM/ROMA are designed for RLM integration.

From Finding RLM-003-11 (MEDIUM confidence — attributed to the paper):
> "The paper explicitly notes that smaller models without sufficient coding skill struggle in the REPL-centric setup."
> "Mitigation: choose 'root' models for REPL competence; use cheaper models for subcalls."

---

## What This Issue Covers

### Part A: Ada/ROMA Compatibility Verification

1. **Tool interface audit**: Does Ada's tool-calling API support the mount/run/inspect primitives natively?
   - `context.mount(source_refs | query)` → context_handle
   - `rlm.run(context_handle, query, budgets, policy_mode)` → {final_handle, trace_handles[]}
   - `context.inspect(context_handle, op, args)` → observation_handle
   - If not: what API changes are required?

2. **ROMA integration**: Can ROMA (reasoning module) invoke RLMRuntime as a sub-reasoning capability?
   - Or is RLMRuntime only accessible via Ada orchestration?

3. **Special-case glue detection**: If Ada cannot call RLMRuntime as a standard tool, document the minimum glue code required and flag it as technical debt

4. **Receipt flow**: Verify that RLMRuntime receipts can be routed back through Ada's receipt tracking system

### Part B: Model REPL Competence Axis

5. **Model broker extension (DCP-003)**:
   - Add "REPL competence" as a model selection axis
   - Axis values: HIGH (can write and execute REPL programs), MEDIUM (can follow REPL programs), LOW (subcall only)
   - Root model selection requires HIGH REPL competence
   - Subcall models can be MEDIUM or LOW
   - Cost optimization: route to cheapest model meeting the required REPL competence level

6. **Model compatibility matrix**:
   - Document which models have been tested for REPL competence
   - Flag models known to fail in REPL-centric setups
   - Establish a test harness to verify REPL competence

7. **Dynamic model switching**:
   - If root model fails REPL competence check mid-trajectory, can Ada switch to a more capable model?
   - What is the cost/complexity of mid-trajectory model switch?

---

## Relationship to DCP-003

DCP-003 (model broker NIM unimplemented) is the parent issue. This issue is a concrete requirement against DCP-003: the model broker must support REPL competence as a selection axis, and RLMRuntime is a concrete use case that exercises this requirement.

---

## Acceptance Criteria

- [ ] Ada tool-calling API audit: mount/run/inspect primitives supported natively or API change required
- [ ] If API changes required: minimal changeset documented
- [ ] ROMA integration path verified
- [ ] RLMRuntime receipts flow through Ada's receipt tracking
- [ ] DCP-003 updated to include REPL competence as a model selection axis
- [ ] Model compatibility matrix created (at least for top 3 candidate root models)
- [ ] Test harness for REPL competence verification defined
- [ ] Mid-trajectory model switch path documented (or explicitly deferred)

---

## Labels

- area:integration
- area:model-broker
- area:rlm
- priority:medium
- type:implementation
