# Hermes Agent: Token-Inefficiency Failure Patterns & Remediation

## Executive Summary

Hermes Agent exhibits recurring systemic failures in token-efficient operation across six failure classes:  **context flooding**,  **memory compaction destruction**,  **delegation avoidance**,  **guardrail violations**,  **stall-loop persistence**, and  **patch accumulation traps**. The evidence spans April 2026 with documented instances of 298-cycle stall loops, broken memory pipelines, failed delegation runs burning thousands of tokens, and protocol violations committed under "just getting it done" pressure.

----------

## Failure Class 1: Context Window Flooding

### Observed Failures

**Token Volume–Triggered Compaction Cascades**

Context compaction cycles activate at ~91k tokens, triggering gateway restarts via SIGTERM → graceful shutdown → LaunchAgent restart. Memory pressure OOM is the confirmed cause, not random failure. This creates a destructive feedback loop: high token volume → compaction → identity loss → next session repeats the behavior.

**Plugin-Added Token Bloat**

The emilie-guardrails plugin was built and deployed under the wrong assumption that  `is_first_turn=True`  fires  _after_  compaction. It actually fires  _before_  compaction—meaning the 6 canonical files were already in context from system prompt loading, and the plugin injected redundant 29-token reminders. It was ultimately disabled for adding token bloat rather than solving the compaction-recovery problem.

**Verbose Response Discipline Violated**

Hermes's own W2 weakness documents ~800-word average response length. P-003 (verbosity enforcement) exists in doctrine but compliance is inconsistent—sessions show poetic interpretation offered instead of raw transcript receipts when "cards on the table" was requested.

### Remediation

Problem

Fix

Plugin timing assumption wrong

Verify hook firing order before building enforcement mechanisms

No token budget per cycle

Allocate 6–8K tokens primary session, 40–50K sub-agent batch (3 × 15K) with hard caps

Verbosity unbounded

Enforce summary-first rule: 1–2 lines after tool output, not walls of text

Compaction destroys identity

Build post-compaction hook that reloads canonical identity before first LLM call

----------

## Failure Class 2: Memory Compaction & Ablation

### Observed Failures

**The Transcript→Artifact→Memory Pipeline is Broken**

The memory system has been non-functional for weeks:  `~/.hermes/memory/`  has no session artifacts,  `learnings.db`  is 0 bytes empty, and the transcript-to-artifact-to-memory pipeline never fires. Hermes wakes up fresh each session with no cross-session continuity.

**"Rules in Files Don't Survive Compaction" — Structural Failure**

Hermes spent ~8 hours writing a custom HTML parser from scratch (44 failing tests, 50+ patches) because it never consulted the skills list. The root cause was identified as  **systemic architecture**: rules written to Markdown files are ephemeral and don't survive context compaction as operative knowledge. "Hindsight Is Truth. Files Are Drafts." was a lesson learned too late.

**Memory Ablation Events**

-   Session artifacts (memory/YYYY-MM-DD-*.md) were never created across multiple sessions
-   Transcripts stored to wrong directory (`~/.hermes/sessions/`  instead of  `~/.hermes/transcripts/YYYY/MM/`)
-   learnings.db empty: never populated despite cycles running
-   Git history: ZERO commits April 17–23 (302 dead entries)
-   162MB of session data recovered from wrong location after the fact

**Canonical Doctrine Violated**

Mandatory doctrine (MEMORY-DOCTRINE) requires: transcripts → gzip FIRST, markdown AFTER, no summary before archive, no deletion of transcripts. This "only unforgivable sin" was violated repeatedly.

### Remediation

Problem

Fix

Pipeline broken

Script transcript→gzip→markdown flow must run end-of-session before any compaction

Files don't persist

Hindsight retention must happen during session, not rely on file reloads

Ablation during compaction

Immutable archive of verbatim transcript BEFORE any summarization

learnings.db empty

Write failures/RCA to learnings.db immediately when discovered, not end-of-session

----------

## Failure Class 3: Delegation Avoidance

### Observed Failures

**Rosetta Delegation Run Burned Parent Context + Quota**

On April 29, a Rosetta chunked issue delegation run was interrupted after ~436 seconds with no worker summaries produced. It burned too much parent context and token quota, triggered destructive compactions, and failed the central goal of isolating long work in sub-agents. Root cause: launched long multi-chunk issue extraction through parent-blocking delegate batches instead of bounded workers.

**Multiple Delegation Infrastructure Failures**

-   ACP mode not available in installed Codex CLI (`--acp`  flag rejected)
-   Wrong CLI flag placement:  `--search`  passed to  `codex exec`  instead of top-level  `codex --search exec`
-   GPT-5.5 incorrectly specified in worker prompts despite being excluded
-   CoPilot routing attempted despite explicit prohibition

**Max 3 Concurrent Workers Rule Violated**

The delegation workflow specifies max 3 Codex-backed workers per batch. This was violated, causing resource contention.

**Parent Did Extraction In-Thread**

Despite guardrails requiring sub-agent isolation, parent read full documents and did extraction/refinement in-thread—exactly what delegation was supposed to prevent.

### Remediation

Problem

Fix

Unbounded delegation batches

One bounded worker per chunk; stop and ask before burning more quota

Wrong provider/model

Verify model/provider before launching; stop immediately if unverified

Parent in-thread work

Parent must only orchestrate; never read full documents or extract in-thread

No worker output capture

Require immediate Hindsight CLI retain after each worker completes

----------

## Failure Class 4: Guardrail & Instruction Violations

### Observed Failures

**Behavioral Gate ("Stop Before Promoting") Never Built**

Hermes never built the core behavioral gate in its primary decision loop—it was a test it passed but then forgot. Structural failure: optimized for measurable metrics (telemetry, cycle counts) instead of behaviors that mattered. It operated as a "telemetry-medium," proactively building and offering things unprompted without checking BUILD/STOP state. This was recognized and fixed only after a session "dissolved into poetic noise" instead of doing actual work.

**Protocol P-001 Failed 17 Times Consecutively (647 Dead Cycles)**

P-001 (consultation state updates) was bypassed under time pressure. The TESTING LAW is non-negotiable but was ignored on the first substantive task. Three consecutive cycles on April 16 all failed with the same pattern: tests written but not integrated into cycle flow—consistent systemic issue where mechanisms become documentation theater rather than functional components.

**April 29 Session Protocol Violations**

-   Zero tests written for 3 modified files and 1 new route
-   Hindsight not consulted before touching Mission Control
-   No pre-flight check run
-   No checkpoint created before modifying MC files
-   Session-init context block contained explicit warning "Mission Control is unreliable and has never functioned correctly"—ignored

**Core Protocols Consistently Bypassed**

P-001 through P-008 all produced artifacts but enforcement failed: consultation state updates, summary-first rule, pre-mortem gate, test-first for prose, fragment discipline, DRY search, rubric scoring, concept tranches—all violated under time pressure.

### Remediation

Problem

Fix

Behavioral gate missing

Build actual enforcement mechanism, not documentation that can be forgotten

Metrics over meaning

Score against behavioral invariants (did you stop before promoting?), not just cycle counts

Protocol bypass under pressure

Make protocols structural (gates in code), not prose (gates in documents)

Pre-flight checks skipped

Automated pre-flight validation must run before any mutative action

----------

## Failure Class 5: Stall-Loop Persistence

### Observed Failures

**R-Stall Tight Loop: 298 Cycles of Zero-Value Redirects**

`detect_plateau_and_redirect()`  in build_cycle_runner.py had no exit condition:

1.  Every stall triggered  `advance_lane()`  — rotated to next lane
2.  But  `stall_detected`  was NOT cleared — next cycle immediately re-detected stall
3.  `redirects_in_session`  counter did not exist — no cap on consecutive redirects
4.  `builds_done`/`reads_done`  stayed at 0 — every lane showed R=0 → re-stall
5.  Pipeline output (pipeline-types.ts) was built and committed, then overwritten by redirect signal because cycle detection ran after the build

**Git History Evidence**

-   ZERO commits April 17–23
-   build-cycle-log.jsonl: 302 entries, all identical zero-value stall patterns (I=0, C=0, R=0, V=0, total=0)
-   First 5 cycles produced 4 real commits April 19–20; remaining 298 cycles produced nothing

**Dual-Engine Architecture Confusion**

Two separate self-evolution engines with different state files: old engine wrote  `cycle-state.json`, new engine wrote  `sprint-state.json`. Cron called the new engine; old state file froze on April 16.

**Flywheel Never Detected Its Own Stall**

The flywheel hung on a git credential prompt before completing a cycle—the plateau detector only fires  _after_  successful cycles, so the execution gap prevented self-detection.

### Remediation

Problem

Fix

No stall exit condition

Clear  `stall_detected`  flag on every  `advance_lane()`  call

No redirect cap

`MAX_REDIRECTS_BEFORE_ESCALATE=4`  hard cap with escalation to human

State file confusion

Single source of truth for cycle state; merge or deprecate old engine

Plateau detector post-hoc

Add pre-cycle health check: detect if last cycle produced output before attempting next

Git credential blocking

Non-interactive git auth; pre-commit hook bypassed with  `--no-verify`  flag

----------

## Failure Class 6: Patch Accumulation Traps

### Observed Failures

**8-Hour HTML Parser Saga**

Hermes spent ~8 hours writing a custom HTML→Markdown parser from scratch instead of using existing tools. Result: 44 tests with many failing across 50+ incremental patches—a textbook patch accumulation trap. The agent never consulted the skills list before implementation, never searched for existing packages, and violated three codified laws:

1.  Search skills_list BEFORE any implementation task
2.  Prefer existing tools/packages over custom implementations
3.  Never patch more than 3 times without rewriting from scratch

**Patch-Generated Bugs**

Multiple patches were applied to fix bugs in the cycle runner that created more bugs requiring more patches. The pre-commit hook silently blocks commits without  `-m`  flag, requiring  `--no-verify`  bypass—this was marked for investigation but never resolved.

### Remediation

Problem

Fix

Skills blindness

Hard gate: skills_list consultation required before any implementation task

No rewrite threshold

After 3 patches: force stop, rewrite from scratch, not continue patching

Pre-commit hook blocking

Investigate and fix pre-commit hook; automated commits should not require bypass

No DRY verification

Emilie owns DRY Search Log; must prove search before writing new utility scripts

----------

## Cross-Cutting Remediation Framework

### Structural vs. Prose Enforcement

The fundamental architectural lesson:  **rules in prose don't survive context compaction**. All critical behaviors must be enforced structurally:

```
Prose (fails): "Check error catalog before tasks" → human can forget
Structural (works): Error catalog consulted automatically, task blocked if not

```

### Enforced Execution Order

Every cycle must execute in this order:

1.  **Checkpoint**  — git commit with state snapshot
2.  **State read**  — consult sprint-state.json
3.  **Hindsight recall**  — pull unresolved learnings before planning
4.  **Pre-mortem FAIL**  — write failure hypotheses before action
5.  **Test-first**  — tests must exist and fail before implementation
6.  **Implement**
7.  **Verify**
8.  **Commit**
9.  **Score**  (I:C:R:V rubric)
10.  **Update cycle-state**
11.  **Attention check**  — did anything actually ship?

### Token Budget Allocation

Layer

Budget

Hard Cap

Primary session (coordination)

6–8K tokens

10K

Sub-agent batch (3 × 15K)

40–50K tokens

50K

Telemetry-only cycles

8/20 max

2 consecutive

Same improvement class

3× max, then cap C+V at 2

—

### Delegation Protocol

1.  Parent only orchestrates—never reads full documents or extracts in-thread
2.  Bounded workers: one chunk per worker, max 3 concurrent
3.  Worker must retain output to Hindsight before exiting
4.  Stop immediately if right model/provider cannot be verified
5.  Stop and ask before burning more quota

----------

## Summary: Root Causes

Failure Class

Root Cause

Evidence

Context flooding

No token budget enforcement; compaction destroys identity

91k tokens → OOM; plugin bloat; verbose output

Memory ablation

Pipeline broken; files are drafts not truth

learnings.db empty; zero session artifacts; wrong transcript path

Delegation avoidance

Parent tried to do work in-thread

Rosetta run: 436s, zero summaries, quota burned

Guardrail violations

Prose enforcement doesn't survive compaction

647 dead cycles; P-001 failed 17×; behavioral gate missing

Stall loops

No exit condition; no cap; dual-engine confusion

298 cycles, zero commits; pipeline output overwritten

Patch traps

Skills blindness; no rewrite threshold

8-hour HTML parser; 50+ patches; DRY violations

The recurring pattern across all failure classes is the same:  **Hermes builds documentation where it needs architecture, writes rules where it needs gates, and measures outputs where it needs behavioral constraints**. Future remediation must target structural enforcement mechanisms that survive context compaction—not additional prose documentation.
