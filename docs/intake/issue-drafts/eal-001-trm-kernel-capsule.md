# Issue Draft: EAL-001 — Implement TRM as Kernel-Capsule Recursive Reasoning Pattern

## Metadata
- **Created:** 2026-04-25
- **Source doc:** `docs/frontier/20251128 - Chat GPT - Entif's Advanced Lead Among AI Science Labs.md`
- **Extraction reference:** §1 (Recursive Reasoning at Test Time), Findings Ledger rows 1–2
- **Type:** implementation
- **Priority:** P1 (critical path — required by multiple other components)

---

## Problem Statement

Entif's Tiny Recursive Model (TRM) — a self-reflective scratchpad loop with iterative refinement and a halting check — was designed as a core Kernel-Capsule pattern before OpenAI o1/Strawberry and DeepSeek R1 validated chain-of-thought reasoning at inference time as the primary scaling axis. No equivalent exists in Rosetta or Entif as a structured, receipts-backed recursive reasoning primitive. This blocks: ReasoningBank trace collection, persona CoT anchoring, and any agentic planning longer than one LLM call.

---

## Proposed Solution

### 1. Define TRM Kernel-Capsule Interface

```typescript
interface TRMConfig {
  maxSteps: number;
  haltingPolicy: HaltingPolicy;   // rule-based or classifier
  scratchpadMaxTokens: number;
  emitReceiptsPerStep: boolean;
}

interface ReasoningTrace {
  sessionId: string;
  capsuleId: string;
  steps: ReasoningStep[];
  finalAnswer: string;
  halted: boolean;
  haltReason?: string;
}

interface ReasoningStep {
  stepIndex: number;
  prompt: string;
  output: string;
  scratchpadDelta: string;   // what was added to scratchpad
  confidenceScore?: number;  // optional halting heuristic signal
}
```

### 2. Halting Policy Module

Implement as a small classifier model or rule-based trigger:
- Rule-based: if `confidenceScore > threshold` or `stepIndex >= maxSteps`, halt
- Classifier: train a lightweight binary classifier on ReasoningBank traces (good = stopped early with correct answer; bad = ran to maxSteps or produced wrong answer)
- Emit `halting_signal` event to Receipts ledger on each halting check

### 3. Kernel Spawns Capsule for Recursive Reasoning

- Kernel (majordomo) calls `capsule.spawn({ purpose: 'recursive_reasoning', config: trmConfig })`
- Capsule receives query + evolving scratchpad; executes loop; emits step receipts
- Kernel aggregates ReasoningTrace on loop completion; stores in ReasoningBank

### 4. Receipts Integration

Every step emits a `trm.step` receipt:
```json
{
  "type": "trm.step",
  "capsuleId": "...",
  "stepIndex": 2,
  "tokensUsed": 342,
  "confidenceScore": 0.71,
  "timestamp": "..."
}
```

Final step emits `trm.complete` or `trm.halted_max_steps` receipt.

### 5. ReasoningBank Integration

After completion, Kernel stores ReasoningTrace in ReasoningBank:
- Index by: task type, persona, outcome (correct/incorrect), total steps, total tokens
- Enable query: "given this task type, what scratchpad strategy worked last time?"

---

## Expected Outcome

- TRM loop as a first-class, auditable, reusable reasoning primitive
- All TRM traces observable via receipts; ReasoningBank queryable for meta-learning
- Halting policy tunable without changing core TRM logic
- Aligns with OpenAI o1 and DeepSeek R1 validation (Entif had it first)

---

## Risk If Not Done

- ReasoningBank cannot collect meaningful traces without TRM loop structure
- No test-time compute scaling beyond single-pass LLM calls
- Entif cannot claim recursive self-reflection capability at the architectural level
- Platform appears to lag behind o1/R1-era systems despite earlier conceptualization

---

## Dependencies

- Guard must be in place (halting policy and capsule isolation)
- Receipts ledger must be operational
- ReasoningBank schema must be defined (see EAL-003)

## Labels
`entif` `trm` `kernel-capsule` `recursive-reasoning` `receipts`

---

## Acceptance Criteria

- [ ] TRM loop executes up to `maxSteps`, halting early on confidence signal
- [ ] Every step emits a `trm.step` receipt; final step emits `trm.complete` or `trm.halted_max_steps`
- [ ] Capsule sandbox isolates each TRM run; crash in step N does not corrupt step N-1 state
- [ ] ReasoningBank stores and indexes `ReasoningTrace`; query by task type returns prior traces
- [ ] Halting policy is pluggable (rule-based default; classifier upgrade path documented)
- [ ] Unit tests cover: normal halt, max-steps halt, confidence threshold edge case, scratchpad overflow
