# Issue Draft: EAL-003 — Implement ReasoningBank with Intrinsic Reward Scoring and Nightly Fine-Tune

## Metadata
- **Created:** 2026-04-25
- **Source doc:** `docs/frontier/20251128 - Chat GPT - Entif's Advanced Lead Among AI Science Labs.md`
- **Extraction reference:** §3 (Intrinsic Self-Evaluation and Reinforcement of "Good Thinking"), Findings Ledger rows 5–6
- **Type:** implementation
- **Priority:** P1 (core to ELIXIR self-improvement; cannot be ELIXIR without it)

---

## Problem Statement

Entif's ReasoningBank — a repository of annotated reasoning traces with intrinsic productivity scores, used for case-based reuse and nightly self-supervised fine-tuning — predates arXiv:2505.19590 "Learning to Reason without External Rewards" (Intuitor method) which confirmed that models can bootstrap reasoning skills via self-assessed certainty without ground-truth labels. ReasoningBank is the memory substrate for ELIXIR's nightly self-improvement; without it, ELIXIR has no data to learn from. No equivalent exists in Rosetta.

---

## Proposed Solution

### 1. ReasoningTrace Schema

```typescript
interface ReasoningTrace {
  traceId: string;                 // unique
  taskType: string;               // e.g., "math", "code", "planning", "creative"
  context: string;                // truncated query/goal
  steps: CoherenceScoredStep[];   // ordered reasoning steps with scores
  finalAnswer: string;
  outcome: 'success' | 'failure' | 'partial';
  coherenceScore: number;         // 0.0–1.0 aggregate
  halluncinationScore: number;    // 0.0–1.0 fact-grounded
  rationalityScore: number;       // 0.0–1.0 logical coherence
  tokensUsed: number;
  durationMs: number;
  personaId?: string;
  timestamp: string;
}

interface CoherenceScoredStep {
  stepIndex: number;
  text: string;
  coherenceDelta: number;        // +0.1 good link, -0.2 contradiction
  factsUsed: string[];            // claimed facts in this step (for hallucination check)
  verified: boolean;              // cross-ref against Knowledge Graph succeeded
  hallucinationPenalty: number;   // 0 if verified, penalty if unverified/contradictory
}
```

### 2. Referee Model (Intrinsic Reward Scorer)

A lightweight scorer (rule-based or small classifier) that, given a reasoning trace, outputs:
- `coherenceScore`: logical flow, no contradictions, justified transitions
- `hallucinationScore`: factual claims verified against Knowledge Graph (EntAffirm)
- `rationalityScore`: absence of logical fallacies or leaps

```typescript
async function scoreTrace(trace: ReasoningTrace): Promise<{
  coherenceScore: number;
  hallucinationScore: number;
  rationalityScore: number;
}> {
  // 1. Run EntAffirm against Knowledge Graph for each claimed fact
  // 2. Apply coherence heuristics (contradiction detection, gap detection)
  // 3. Score using weighted formula: 0.4*coherence + 0.3*hallucination + 0.3*rationality
}
```

### 3. Nightly Self-Supervised Fine-Tune

Nightly ELIXIR job:
1. Query ReasoningBank for last 24h traces
2. Rank by composite score; select top-N (good thinking) and bottom-N (bad thinking)
3. Generate fine-tune examples:
   - **Good**: system prompt = "Excellent reasoning for {taskType}", final = correct trace
   - **Bad**: system prompt = "Example of poor reasoning for {taskType}", final = corrected version
4. Run lightweight fine-tune on base model (few-shot or adapter update)
5. Emit `elixir.finetune.complete` receipt with delta metadata

### 4. Prompt Library Auto-Inject

On similar task type query, ReasoningBank is consulted:
```typescript
async function getCoTStrategy(taskType: string): Promise<string | null> {
  const bestTraces = await reasoningBank.query({ taskType, outcome: 'success', limit: 5 });
  if (bestTraces.length === 0) return null;
  // Return merged CoT pattern from best traces
  return buildCoTPrompt(bestTraces);
}
```

Entif prepends this to math queries, code queries, etc.

### 5. Case-Based Reuse via ReasoningBank

When TRM runs on a new problem, before starting scratchpad, query ReasoningBank:
- "have we solved something similar? what strategy was used?"
- If found: copy the successful scratchpad pattern as warm-start

---

## Expected Outcome

- All reasoning traces scored and stored; observable via receipts
- Nightly fine-tune produces measurable improvement on held-out reasoning tasks
- Prompt library auto-injects proven CoT strategies per task type
- Entif meta-learns from its own experience — first step toward autopoietic improvement

---

## Risk If Not Done

- ELIXIR loop has no learning substrate; cannot self-improve
- TRM loop cannot learn from prior reasoning patterns
- Case-based reuse impossible; every problem solved from scratch
- ReasoningBank claim is unsubstantiated without implementation

---

## Dependencies

- EAL-001 (TRM — produces the traces ReasoningBank scores)
- EAL-004 (GraphRAG + EntAffirm — hallucination scoring cross-ref against Knowledge Graph)
- EAL-008 (ELIXIR — nightly fine-tune orchestration)
- Receipts ledger (trace storage infrastructure)

## Labels
`entif` `reasoningbank` `self-improvement` `elixir` `intrinsic-reward` `nightly-tuning`

---

## Acceptance Criteria

- [ ] ReasoningTrace schema defined and stored in receipts ledger
- [ ] Referee model scores every completed TRM trace; scores stored in trace record
- [ ] Hallucination scoring verified against Knowledge Graph (EntAffirm)
- [ ] Nightly fine-tune selects top-N/bottom-N traces; generates synthetic examples; runs update
- [ ] Prompt library consulted on new task; successful CoT pattern prepended when available
- [ ] Case-based reuse: when similar task found, warm-start strategy injected into TRM scratchpad
- [ ] Unit tests: trace scoring, hallucination detection, fine-tune generation, prompt library lookup
