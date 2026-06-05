# PRDS-003: Guard Decision Token JSON Schema and SHACL Shapes Missing

## Summary

The 2026-04-10 PRD synthesis provides a TypeScript interface for `GuardDecisionToken` (in a code patch for `packages/rosetta-guard/src/admission.ts`) but no canonical JSON schema or SHACL shapes. The RRP pack draft (ROCK-3111-C) also does not include guard decision shapes. This is a schema gap that needs filling before conformance testing can be automated.

## Problem

The `GuardDecisionToken` interface defines:
- `decision_id`, `decision`, `issued_at`, `expires_at`
- `policy_version`, `policy_hash`, `constitution_hash` (placeholder)
- `chain_height`
- `subject: { tool, toolcall_cid, tenant_id, effects }`
- `constraints: { dry_run_only, resource_caps, egress_allowlist }`
- `rationale`
- `sig: { alg, kid, signed, sig_b64 }`

This interface exists as TypeScript only. No JSON Schema, SHACL shape, or RFC 8785-canonical serialization is defined. Without a schema, automated conformance testing for guard decision tokens is not possible.

## Evidence

- Source: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Section: "admission.ts patch"
- Quote: "Decision token includes policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, and later-ready placeholders like constitution_hash or trace IDs"

## Criteria for Closing

- [ ] `GuardDecisionToken` has a canonical JSON Schema at `packs/rrp/schema/guard-decision.schema.json`
- [ ] SHACL shapes for guard decisions at `packs/rrp/shacl/guard-decision.shapes.ttl`
- [ ] Schema is referenced in `packs/rrp/pack.json` exports
- [ ] Signature field (`sig`) excluded from CID computation per RRP rules
- [ ] `verifyDecisionSignature()` stub replaced with actual Ed25519 or equivalent verification

## Labels

rosetta-guard, schema, shacl, conformance

## Depends On

PRDS-001 (S0/S1 sequencing), PRDS-002 (ROCK-3111-C formalization)

## Linked PR

`docs/intake/docs-intelligence/2026-06-04-entif-rosetta-prds-revisions-synthesis.md`
