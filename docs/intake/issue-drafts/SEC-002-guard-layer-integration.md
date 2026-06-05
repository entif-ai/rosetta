# SEC-002: Guard Layer Implementation Lacks Code-Level Integration Plan

## Metadata
- **Type:** issue-draft
- **Domain:** implementation
- **Source:** docs/governance/20251026 - Entif 2.0 - Secure Architecture Companion Paper.md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Description

The Guard Layer is described architecturally as a "policy enforcement point + sandbox + anomaly detection" but no IPC protocol, API contract, or code-level integration points with Majordomo are specified. The implementation notes say "function wrapper when opening a file" which implies code modification to Majordomo — but no guidance on which files, which functions, or how the Guard daemon communicates permission/denial back to Majordomo.

## Context

Section 1 Implementation Notes: "the Guard might run as a privileged sidecar process or within a hypervisor that hosts Majordomo's VM. System call interposition techniques (using ptrace or eBPF on Linux) could enforce policies at the kernel level for any Majordomo threads. Additionally, at the application level, Majordomo's code can be structured to call a Guard API for any action (for instance, a function wrapper when opening a file or executing a command that first asks the Guard for permission)."

No protocol defined for Guard API. No message format. No error handling.

## Impact

- Implementation team cannot estimate effort
- Integration testing cannot be planned
- No clear boundary between Guard and Majordomo responsibilities
- Risk of Guard becoming a bottleneck or single point of failure in the orchestration pipeline

## Related Findings
- [F1] Guard Layer as policy enforcement point
- [F14] Guard Layer implementation notes are high-level only

## Status
open