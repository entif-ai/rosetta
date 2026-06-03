# CMT-005: Design and Ship 6–10 High-Correction Specialist Agents

## Metadata

- **Type:** implementation
- **Status:** draft
- **Labels:** `context-management`, `specialist-agents`, `guard-layer`
- **Evidence:** `docs/chats/20260301 - Chat GPT - Context Management Techniques.md` (Findings T3, T9)
- **Extraction:** `docs/intake/docs-intelligence/2026-06-01-context-management-techniques.md`
- **Depends on:** CMT-002 (Constitution exists before agents can consult it)

## Summary

Design and ship 6–10 specialist agents as domain-expert constrained context bundles. Each agent is not a persona but a scoped context bundle with: scope boundaries, tools/permissions, Tier 3 doc references, output formats, and preemptive domain-mistake guardrails. Prioritize where mistakes are most expensive.

## Problem Statement

A generalist agent "vaguely trying its best" produces inconsistent rigor. Domain expertise must be structurally embedded in agents, not inferred from prompts.

## Proposed Resolution — Priority Order

**1. Security/GuardLayer Agent (HIGHEST PRIORITY)**
- Scope: AuthN/AuthZ, signing, key rotation, trust boundaries, prompt-injection detection
- Permissions: Read-only by default; explicit authorization required for writes
- Tier 3 docs: AuthN/AuthZ model, Tool-call safety policy
- Output: Security review checklist

**2. Orchestration + Message Schema Agent**
- Scope: Envelope schema, nonce/TTL, DLQ/quarantine rules, replay protection
- Tier 3 docs: Envelope schema doc, state machine doc
- Output: Schema validation checklist

**3. Storage/Memory Agent**
- Scope: Cache semantics (TTL, invalidation), provenance, redaction boundaries
- Tier 3 docs: Cache semantics doc, provenance boundary doc
- Output: Storage review checklist

**4. Repo Hygiene Agent**
- Scope: Tests, CI, lint, formatting, regression detection
- Tier 3 docs: CI/CD invariants, test coverage requirements
- Output: Hygiene pass/fail

**5. API Contract Agent**
- Scope: Versioning, compatibility, breaking-change protocol, changelog enforcement
- Tier 3 docs: API versioning policy
- Output: Breaking-change report

**6. Code Review Agent**
- Scope: Post-change regression hunting across all domains
- Triggered: Automatically on sensitive paths (from trigger table)
- Output: Regression risk assessment

**Additional candidates (lower priority):**
- Networking agent
- Testing patterns agent
- Schema/data model agent

**Agent Spec Standard Template (all agents must implement):**
```yaml
agent_spec:
  name: <domain>-agent
  scope:
    handles: [list of file areas / task types]
    refuses: [explicit refusal cases]
  tools: [permissions granted]
  tier3_docs: [required Tier 3 doc references]
  output_format: [diff-first | checklist-first | RFC-style]
  common_mistakes: [preemptive guardrails]
  version: semver
```

**Treat agent specs like code:** versioned, reviewed, pruned.

## Acceptance Criteria

- [ ] 6 specialist agents fully implemented and registered
- [ ] Each agent spec follows the standard template
- [ ] Each agent has its required Tier 3 docs referenced
- [ ] Agent specs are versioned in Git
- [ ] Trigger table routes to correct agents (CMT-004)

## Dependencies

- CMT-002 (Constitution must exist first)
- CMT-004 (trigger table must route to agents)
- TC-005 (Promotion state machine — specialist agents may gate promotion)

## Related Issues

- CMT-002, CMT-004, CMT-006
- NOT LAME: Adapter Certification Harness (8 test classes before promotion)
