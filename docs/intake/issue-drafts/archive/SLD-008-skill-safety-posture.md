# SLD-008: Safety Posture — Guard Enforcement of Skill Metadata and Risk Classification

## Meta

- **Drafted:** 2026-04-25
- **Source:** docs/chats/20260323 - Chat GPT - Entif Skill Library Design.md
- **Extraction:** 2026-04-25-skill-library-design.md (Finding 8)
- **Confidence:** HIGH
- **Labels:** skills, safety, guard, risk-class, dry-run, enforcement

## Summary

Enforce two hard safety rules for all skill execution: (A) The Guard must enforce skill metadata and risk_class at every execution boundary — no skill runs without risk classification, tool scope allowlist, and budget constraints; (B) High-risk skills (financial, identity, admin) require dry-run validation before any real execution. Skills are plan generators plus constraints, not execution authorities.

## Problem Statement

Skills are authored by humans (or agents) and can contain errors, hidden tool dependencies, or malicious intent. Without Guard enforcement:
- A `write_local` skill could attempt `financial` operations
- A skill could exceed its declared `tool_scopes`
- A high-risk skill could execute without dry-run validation
- The agent could treat the skill's output as authoritative when it's actually unvalidated

The Guard is the enforcement layer that prevents skills from exceeding their declared boundaries.

## Rule A: Skill Metadata and Risk Class Enforcement

At every skill execution boundary, the Guard must verify:

### Pre-Execution Checks

1. **Risk ceiling enforcement:**
   - The agent's current risk ceiling must be >= skill's `risk_class`
   - `read_only` ≤ `write_local` ≤ `write_external` ≤ `financial` ≤ `identity` ≤ `admin`
   - If skill's `risk_class` exceeds agent's ceiling → fail-closed (block execution)

2. **Tool scope enforcement:**
   - Every tool call made by the skill must be in the skill's declared `tool_scopes`
   - Any tool call outside `tool_scopes` → fail-closed
   - Tools not declared in SkillCard → quarantine + flag

3. **Non-amplification enforcement:**
   - The skill cannot delegate to other skills that raise the risk level
   - Amplification detection: skill tries to invoke a higher-risk_class skill without Guard authorization

4. **Budget requirements:**
   - Token budget and time budget must be set before execution
   - Skill exceeding budget → halt (not fail — halt gracefully)

5. **Fail-closed on uninterpretable:**
   - If the Guard cannot determine the skill's `risk_class` or `tool_scopes` → block execution
   - No implicit trust for unclassifiable skills

### During Execution

- Guard intercepts every tool call
- Verifies tool is in `tool_scopes`
- Enforces budget (token count, call count, wall-clock time)

### Post-Execution

- Verify acceptance checks were attempted
- If acceptance checks were not met → emit failure receipt
- Flag for review if tool calls exceeded declared scopes

## Rule B: High-Risk Skills Require Dry-Run First

For skills with `risk_class: financial | identity | admin`:

### Dry-Run Protocol

1. **Sandbox execution:** Run the skill's plan in a fully sandboxed environment (no real network, no real filesystem, mocked external dependencies)
2. **Tool call log:** Record every tool call the skill attempts in dry-run
3. **Scope verification:** Compare dry-run tool calls against declared `tool_scopes`
4. **Diff analysis:** If dry-run would produce different tool calls than declared → fail
5. **State mutation check:** Verify dry-run produces no real state changes
6. **Guard authorization:** Only after dry-run passes does the Guard issue a real execution token

**Source doc quote:**
> "So the 'skill' is just a _plan generator plus constraints_. Execution is still adjudicated."

This means: the skill generates a plan, the Guard adjudicates whether the plan is safe, and only then does execution proceed.

## Guard-Skill Interface

```
Agent → Skill → [Guard pre-check] → [Dry-run if high-risk] → [Guard authorization] → Executor
                 ↑                                                        ↑
            fail/halt if                                        approve/reject
            unclassifiable                                       based on dry-run
```

## Acceptance Criteria

- [ ] Guard enforces risk ceiling: agent cannot execute skill with `risk_class` above its ceiling
- [ ] Guard enforces `tool_scopes`: any tool call outside declared scopes is blocked
- [ ] Guard enforces non-amplification: skill cannot delegate to higher-risk skills without Guard authorization
- [ ] Guard enforces budget: token/time limits are set and enforced during execution
- [ ] Guard fails-closed on uninterpretable: if `risk_class` unknown → block
- [ ] High-risk skills (`financial`, `identity`, `admin`) require dry-run before real execution
- [ ] Dry-run is sandboxed: no real side effects, no real network, mocked dependencies
- [ ] Skill is treated as plan generator + constraints; execution is always Guard-adjudicated
- [ ] All Guard decisions are logged as receipts

## Implementation Notes

- This builds on the existing Write Admission Gate architecture (9-step state machine: Propose → Normalize → Authorize → Ground → Checkpoint → Apply → Observe → Receipt → Project)
- The "code interception + sandboxed validation" referenced in the source doc is the dry-run enforcement point
- Fail-closed means: if the Guard is uncertain, it blocks. Uncertainty should never result in execution.
- "Plan generator plus constraints" is the mental model: the skill says what it wants to do and what constraints it operates under; the Guard decides if those constraints are acceptable.

## Dependencies

- SLD-001 (SkillCard — Guard reads `risk_class` and `tool_scopes`)
- SLD-006 (vetting pipeline — Guard rules come from policy established during certification)
- Write Admission Gate (existing Entif architecture)
- Sandbox/executor environment (existing Entif architecture)

## Status

issue-candidate
