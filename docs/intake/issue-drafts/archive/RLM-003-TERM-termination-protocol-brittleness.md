# Issue Draft: RLM-003-TERM — RLM Termination Protocol Brittleness

## Metadata

- **Prefix:** RLM-003
- **Short title:** RLM Termination Protocol Brittleness — Typed FinalizeAnswer Required
- **Type:** reliability / correctness
- **Status:** draft
- **Confidence:** MEDIUM (paper attribution), HIGH (risk)
- **Source doc:** `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`
- **Findings:** RLM-003-M (RLM-003-12)
- **Collision check:** No existing issue covers RLM termination protocol. Related to RLM-001-ARCH (context runtime) but distinct — this is specifically about termination correctness.

---

## Problem Statement

The RLM paper's termination protocol is brittle: they had to add explicit `FINAL`/`FINAL_VAR` patterns and programmatically fix a chunk of training samples because models kept generating non-terminating trajectories. In Entif's production environment, a non-terminating RLM trajectory is an unbounded cost and resource leak. The current mitigation (prompt conventions) is insufficient — Entif needs a typed, enforceable termination mechanism that produces a receipt.

---

## Evidence

From `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`, Finding RLM-003-12:

> "They had to add explicit FINAL/FINAL_VAR patterns and even programmatically fix a chunk of training samples because models kept generating non-terminating trajectories."

> "Mitigation: in Entif, make 'finalization' a typed tool event (`FinalizeAnswer(tile_cid)`), not a prompt convention."

The assistant explicitly recommends moving away from prompt-based termination signals to typed tool events. This aligns with Entif's "explicit over implicit" doctrine.

---

## What This Issue Covers

1. **Typed `FinalizeAnswer` tool event**: 
   - Not a prompt convention — a first-class typed event in the tool schema
   - Signature: `FinalizeAnswer(tile_cid: ContentAddress) -> receipt_id: Receipt`
   - Produces a signed termination receipt
   - Triggers guard checkpoint before accepting the final answer

2. **Non-terminating trajectory detection**:
   - Max iterations hard-stop (from GuardLayer quotas — RLM-003-SEC)
   - Dead-loop detection in generated REPL code
   - Timeout with partial-result tile return

3. **Partial-result tile on hard-stop**:
   - When max iterations/time/cost reached, return best-effort partial answer tile
   - The tile includes: partial trace, what was completed, what was not
   - Receipt indicates hard-stop termination (not normal termination)

4. **Training sample audit** (longer-term):
   - The paper had to programmatically fix training samples that generated non-terminating trajectories
   - In Entif's case: audit the model selection for RLM root — does the model reliably emit FinalizeAnswer events?
   - If not, either fine-tune or switch models

---

## Relationship to Existing Work

- **RLM-003-SEC**: Resource quotas (max_iterations) are the hard-stop mechanism; this issue handles the graceful termination path
- **RLM-003-ARCH**: The MCP contract should include FinalizeAnswer as a standard event, not a special case
- **NOT LAME Write-Admission Gate**: The 9-step state machine should include a FinalizeAnswer step as the explicit termination condition for RLM trajectories

---

## Acceptance Criteria

- [ ] `FinalizeAnswer(tile_cid)` typed tool event defined in the tool schema
- [ ] Tool produces a signed termination receipt
- [ ] Guard checkpoint before accepting final answer
- [ ] Max iterations hard-stop triggers partial-result tile return
- [ ] Partial-result tile includes: partial trace, completion status, outstanding work
- [ ] Non-terminating trajectory detection (dead-loop in REPL code)
- [ ] Timeout with partial-result tile return
- [ ] Receipt indicates termination type: normal | hard-stop | timeout | error
- [ ] End-to-end test: RLM trajectory reaches max iterations → partial tile returned → receipt indicates hard-stop

---

## Labels

- area:rlm
- area:correctness
- priority:high
- type:implementation
