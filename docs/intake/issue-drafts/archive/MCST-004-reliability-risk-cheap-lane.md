# MCST-004: Reliability Risk in High-Volume "Cheap Lane" Automation

**Status:** draft
**Type:** risk
**Priority:** medium-high
**Confidence:** high

---

## Problem Statement

MaxClaw is being evaluated precisely because it is cheap — the economic proposition is to offload high-volume, low-stakes, discrete tasks to an external agent at low per-task cost. **However, the "cheap lane" is also where flaky behavior becomes most operationally expensive.** When a $0.001 per-task cost seems negligible, the operational impulse is to route many tasks through MaxClaw without rigorous verification. This creates conditions for:

- **Silent partial failures**: MaxClaw completes a task in a way that appears successful but misses key requirements; the internal orchestrator (or human) doesn't catch it until downstream
- **Hallucinated "done" states**: MaxClaw reports task completion without actually completing the task correctly, especially in multi-step workflows where intermediate steps succeed but the final output is wrong
- **Looping behavior**: MaxClaw enters a repeated execution cycle that consumes budget and produces no useful output, with no reliable circuit breaker on the Entif side
- **Tool failure with no retry policy**: External tool calls from MaxClaw (web search, API calls) fail in ways that are not surfaced to Entif's monitoring, leaving tasks in an indeterminate state
- **Output quality degradation at volume**: Tasks that individually pass quality checks may fail when composed — a batch of individually-correct MaxClaw outputs may not compose correctly in a downstream pipeline

The response explicitly identifies this as an economic reliability paradox: "The cheap lane is where you'll be tempted to put lots of automation. That's precisely where flaky behavior becomes operationally expensive (retries, silent partial failures, hallucinated 'done' states)."

---

## Evidence

- Source: `docs/chats/20260302 - Chat GPT - MaxClaw Split-Testing Evaluation.md`, Finding 008
- Direct response quote: "The cheap lane is where you'll be tempted to put lots of automation. That's precisely where flaky behavior becomes operationally expensive (retries, silent partial failures, hallucinated 'done' states)"
- The response recommends instrumenting each task with: completion rate, verifier pass rate, human edit distance, and failure mode taxonomy (hallucination, refusal, tool failure, looping)

---

## Why This Is an Entif AI Problem

Entif AI's portfolio includes ventures with:
- **VieDay**: Gamified habit and productivity systems where missed or incorrect daily tasks corrupt user-facing streaks, scores, and coaching recommendations
- **Mislead.Us**: Evidence-based storytelling pipelines where factual errors in sourced content could undermine legal resilience
- **Entif agentic messaging**: Decision-support and memory systems where incorrect intermediate outputs can compound into significant downstream errors
- **GenOper.ai / Phantasmagoria**: Creative engines where unreliable output quality breaks artistic coherence

In each case, silent failures in automated tasks (particularly those routed through a cheap external lane without robust verification) could produce:
- Corrupted user-facing data
- Incorrect strategic or creative outputs that appear legitimate
- Accumulated technical debt from workarounds and manual remediation
- Erosion of trust in automated systems, leading to over-reliance on manual review (defeating the cost savings)

---

## Constraints and Context

- This risk is not about MaxClaw's reliability in isolation — it is about the *systemic* reliability of an architecture that routes high-volume automation through a cheap external lane without proportionate verification investment
- The risk is inherent to the split-testing proposal: without instrumentation and acceptance testing, there is no way to distinguish a successful cheap-lane task from a failed one
- The risk is amplified by Entif AI's stated intent to scale: "in time we might even have our primary agents spin up these sorts of external specialized agents ad-hoc, on demand" — as the volume and autonomy of MaxClaw tasks increase, so does the expected cost of each undetected failure

---

## Suggested Action

1. **Instrumentation as a prerequisite**: Before any production MaxClaw routing, implement the full instrumentation stack recommended in the response: cost (tokens, $), latency, completion rate, verifier pass rate, human edit distance, failure mode taxonomy. This data is the only signal that distinguishes reliable from unreliable task types.
2. **Verifier layer as a first-class component**: Build a lightweight verifier agent that runs after every MaxClaw task, checking: (a) output shape matches expected schema; (b) key assertions in the output are consistent with input constraints; (c) no tool failures were reported. Only outputs that pass verification should be routed to downstream systems.
3. **Hard circuit breaker**: Implement a spending circuit breaker per task type and per day on MaxClaw. If a task type exceeds a configurable failure rate threshold, routing to MaxClaw for that task type is automatically suspended pending review.
4. **Failure mode catalog**: Build and maintain a taxonomy of observed MaxClaw failure modes for each task type. Use this to inform task routing decisions — if a task type consistently fails in a particular way, either fix the task spec or move it out of the cheap lane.
5. **Escalation path**: Define explicit escalation criteria: if a MaxClaw task fails in a way that affects a user-facing output, there must be a defined escalation path and SLA for human review.

---

## Notes

- Cf. MCST-007 (recommended architecture) — the "artifact-only" output pattern is a key reliability mitigation: MaxClaw produces artifacts, the internal verifier decides what becomes real
- Cf. MCST-009 (split-test methodology) — the recommended instrumentation is the mechanism by which this risk is measured and managed

---

## Related Issues

- MCST-002: Supply-chain community skills risk (adjacent: both risks are amplified by high-volume cheap-lane routing; community skill failures compound with general cheap-lane reliability issues)
- MCST-005: Missing verification harness (direct dependency: the verification harness is the primary reliability mitigation for cheap-lane tasks; without it, circuit breaker and escalation path cannot be systematically implemented)
