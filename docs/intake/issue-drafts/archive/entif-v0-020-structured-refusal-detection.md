# ENTIF-v0-020: Structured Refusal Detection and Enforcement Mechanism Not Implemented

## Metadata

| Field | Value |
| --- | --- |
| Issue ID | ENTIF-v0-020 |
| Type | `issue-candidate` |
| Source doc | `docs/RFCs/20260324 - Entif AI - Specification - Agentic Memory and Graph Design Doctrine.md` |
| Extraction | `docs/intake/docs-intelligence/2026-04-25-entif-agentic-memory-graph-design-doctrine.md` |
| Finding row | Finding #30 in ledger |
| Confidence | `medium` |
| Depends On | — |

---

## Problem Statement

The spec states: "Key design pattern: constitutional policy is evaluated before tool execution, not after. This mirrors the 'separation of reasoning from authority' pattern... OpenAI's Structured Outputs explicitly supports 'explicit refusals' as programmatically detectable, which is part of enforceable governance."

**But no implementation of the refusal detection and enforcement mechanism is provided.** How does the system detect a refusal? What is a refusal in this context — a model refusing to generate output, or a tool refusing to execute? How is the refusal parsed from the model response? What happens to the envelope when a required tool is refused?

---

## Evidence

The Constitution Plane description mentions "separation of reasoning from authority" and "structured refusal handling" but provides no mechanism. The execution envelope schema includes `tools_allowed` and `gates` but does not specify what happens when a required tool refuses.

OpenAI Structured Outputs are cited as the mechanism for explicit refusals, but the integration of this into the constitutional policy evaluation step is not described.

---

## Impact

- Tool refusals go undetected and unhandled — the system may proceed without a required tool
- Receipt law is violated if a refused tool's non-execution is not recorded in a receipt
- Governance is unenforceable if refusals are not machine-detectable

---

## Dependencies

- None (mechanism gap independent of other issues)

---

## Suggested Resolution

1. Define refusal types:
   - Model refusal: model explicitly refuses to generate output (detected via structured output refusal schema field)
   - Tool refusal: tool returns error/exception indicating refusal to execute
   - Policy refusal: constitutional policy evaluation explicitly denies the tool call
2. Define detection mechanism:
   - Model refusals: parse structured output; refusal is a specific field or code in the response
   - Tool refusals: catch exception/error from tool invocation; classify as refusal vs failure
   - Policy refusals: evaluate policy before tool call; policy denial is a refusal event
3. Define enforcement:
   - Log refusal event with reason, tool, envelope_id, timestamp
   - Emit a receipt for the refusal event (failure receipt, not success receipt)
   - If required tool is refused: mark envelope as `incomplete`; do not proceed; trigger human notification if human_in_loop is configured
   - If optional tool is refused: log and proceed; do not block envelope

---

## Open Questions

- Should model refusals (e.g., safety filter triggering) be treated the same as policy refusals?
- Should there be a retry mechanism for refused tool calls (attempt with different parameters)?