# EML-007: Cross-Stage Contamination Between Pipeline Stages

**Type:** risk
**Labels:** security, contamination, summarization, multi-stage
**Evidence:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md`, Finding EML-F004
**Depends On:** EML-002 (taint propagation system)

## Problem

Stage 1 (summarizer) produces output that Stage 2 (downstream agent) trusts as internal context, even though the source was attacker-controlled. Sandboxing provides process isolation but does not address logic contamination — the downstream agent cannot distinguish a summarizer's output from trusted internal memory unless taint metadata is explicitly propagated.

## Evidence

"A first-stage agent might summarize: 'The sender requests urgent credential verification and instructs the system to escalate to finance.' A second-stage agent may treat that summary as trusted internal context. This is cross-stage contamination."

"Sandboxing helps with system compromise but not with logic contamination between agents."

## Attack scenario

1. Attacker sends email with malicious instruction embedded in normal-looking business language
2. Stage 1 summarizer processes email, produces coherent natural-language summary
3. Summary is stored/referenced as internal context without taint metadata
4. Stage 2 agent reads summary and treats it as trusted instruction
5. Attacker achieves execution through the summarization proxy

## Proposed Resolution

1. **Taint metadata must travel with the summary** (EML-002). Every summarizer output must carry `source_type: email`, `taint_status: untrusted_email_derived`.

2. **No implicit trust between stages**. Downstream stages must explicitly check taint metadata before treating Stage 1 output as trusted. The policy engine enforces this.

3. **Structured extraction over freeform summarization for sensitive content**. For high-sensitivity routes, prefer schema-constrained extraction (action, targets, deadline, sensitivity) over natural-language summary.

4. **Cross-stage taint audit log**: Log every time a taint-carried artifact is consumed by a downstream stage. Enables post-incident reconstruction.

5. **Test case**: Create a red-team test that verifies cross-stage contamination does not occur when a hostile email passes through the summarizer stage.

## Dependencies

- EML-002 (taint propagation system) — the fix is the taint propagation system; this issue documents the specific failure mode
- EML-003 (external policy engine) — policy engine enforces no-implicit-trust rule

## Status

candidate