# Issue Draft: RLM-003-SEC — GuardLayer Policy Instantiation for RLM REPL

## Metadata

- **Prefix:** RLM-003
- **Short title:** GuardLayer Policy Instantiation for RLM REPL
- **Type:** security / governance / architecture
- **Status:** draft
- **Confidence:** HIGH (findings)
- **Source doc:** `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`
- **Findings:** RLM-003-H (RLM-003-8)
- **Collision check:** RLM-001-SANDBOX (RLM sandboxing governance) is related; this issue is about the specific Guard policy instantiation for RLM REPL, not the general sandboxing approach. RLM-001-SANDBOX is prerequisite governance context; this issue is the RLM-specific policy.

---

## Problem Statement

The RLM REPL allows the model to write and execute code that programmatically inspects and decomposes context. This is untrusted code execution by definition — the model's code is not known to be safe at the time Guard must decide whether to allow it. Currently, no Guard policy exists that governs RLM REPL operations. Without explicit policy, the REPL is effectively a blind spot in Entif's security posture.

---

## Evidence

From `docs/chats/20260302 - Chat GPT - Recursive Language Models - 3.md`, Finding RLM-003-8:

> "the RLM REPL should be treated as **untrusted code execution** behind Guard policy with:
> - default **no network**
> - filesystem allowlist (for comprehension tasks)
> - resource quotas (time, memory, max REPL iterations, max subcalls)
> - 'command mode' required for anything side-effectful"

And:

> "MCP (plumbing) stores immutable context references, Majordomo proposes work, Guard allows/modifies/denies via signed decisions, Executors only run work with Guard tokens."

The RLM REPL maps directly to this pattern:
- REPL is the analysis plane (generates code/intent)
- Guard is the policy enforcement point
- Executors are the actuation plane (actually run the REPL code)

---

## What This Issue Covers

1. **Network policy**: REPL defaults to no network access; explicit allowlist for permitted network calls (e.g., fetching external context refs)

2. **Filesystem allowlist**: REPL can only read/write from specific paths (e.g., context cache directory); no arbitrary filesystem access

3. **Resource quotas enforced by Guard**:
   - Max REPL iterations per trajectory
   - Max subcalls per iteration
   - Max memory per REPL execution
   - Max wall-clock time per REPL run
   - Max cost per trajectory

4. **Command mode for side-effectful operations**: 
   - REPL code that would mutate state (write to artifact store, emit receipts, trigger actions) requires explicit `command mode` token from Guard
   - This mirrors Entif's "parse-only ambient capture; no side effects unless explicitly commanded" doctrine

5. **Signed decision logging**: Every Guard decision (allow/deny/modify) on REPL operations is logged as a signed receipt

6. **Analysis/actuation separation enforcement**: The REPL runs in a sandbox that cannot directly mutate Entif state — only the Executor (with Guard token) can perform mutations

---

## Relationship to RLM-001-SANDBOX

RLM-001-SANDBOX addresses general sandboxing governance for RLM. This issue is the specific GuardLayer policy that implements those governance requirements. RLM-001-SANDBOX defines the principle; this issue defines the concrete policy rules. This also relates to DI-003 (Guard policy instantiation gap) from the ledger.

---

## Acceptance Criteria

- [ ] Guard policy document exists for RLM REPL operations
- [ ] Network: default deny, explicit allowlist defined
- [ ] Filesystem: allowlist paths defined for REPL read/write
- [ ] Resource quotas: max_iterations, max_subcalls, max_memory, max_time, max_cost all defined and enforced
- [ ] Command mode: policy for side-effectful REPL operations defined and tested
- [ ] Signed decision receipts: Guard decisions on REPL ops are logged as receipts
- [ ] Sandbox isolation: REPL cannot directly mutate Entif state without Executor + Guard token
- [ ] End-to-end test: REPL attempts unauthorized network call → Guard denies → receipt logged

---

## Labels

- area:security
- area:guard
- area:rlm
- priority:critical
- type:implementation
