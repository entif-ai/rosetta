# CW-004: Reuse enforcement not wired into planning loop

**Type:** issue-candidate  
**Confidence:** high  
**Source:** `docs/chats/20260225 - Chat GPT - Code Wiki integration.md` §5

## Problem

The "never build twice" principle requires that before any new feature plan is accepted, the system auto-inserts a `search_capabilities(feature_spec)` step and requires a Reuse vs Build justification. This is not implemented.

## Evidence

> "Before any 'new feature' implementation plan is accepted: auto-insert a step: search_capabilities(feature_spec). If registry returns any candidate with fit_score > threshold, the plan must include a Reuse vs Build justification step."

## Required

1. Define fit_score threshold (what counts as "good enough to reuse"?)
2. Add search_capabilities call as mandatory gate in ROMA/TRM planning pipeline
3. Extend receipt schema to include: capability_id, existing_candidates_considered, decision, rationale
4. Implement "oops duplicated anyway" detection by scanning receipts post-hoc

## Notes

- Depends on: CW-001 (CapabilityRegistry defined), CW-007 (search_capabilities MCP tool implemented)
- Without this, "never build twice" is advisory only, not enforced
