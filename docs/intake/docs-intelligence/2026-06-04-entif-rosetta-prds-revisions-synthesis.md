# Docs Intelligence Extraction — 20260410 - Entif and Rosetta PRDs - Revisions and Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: Pro-tier Deep Research Prompt — Entif 2.0 PRD Blueprint Merge and RRP Pack Contract
- Date evidence: 2026/4/10 9:39:31 (created), 2026/4/10 11:02:59 (updated), 2026/4/10 11:03:58 (exported)
- Authority tier: chat — synthesis document, not governing spec
- Freshness: stale relative to current Rosetta state ( Apr 2026 vs current Jun 2026)
- Word count: ~1800
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A two-run synthesis that merges a scaffold-forge/entif-operational perspective with an RRP-constitutionally-sharp perspective on the Rosetta MVP build. Produces 10 unified decisions, a merged MVP staircase (RC-0 to RC-4), a draft ROCK-3111-C RRP Pack Filesystem Contract v0.1.0, and three code patches (guard admission, receipt bundle tapestry, traceability header checker). Resolves three collisions between the two runs: builtin.echo slice-zero choice, UI non-gating in alpha, and RRP content model adoption.

## Goals And Intent

- Reconcile two alternate PRD build runs into one binding merged doctrine
- Resolve three specific collisions: slice-zero choice, UI alpha-gating, receipt schema looseness
- Produce: merged MVP staircase, ROCK-3111-C spec draft, code patches for guard/tapestry/headers
- Validate: TypeScript/Nx/pnpm spine, Python-as-specialist-lane, SQLite-local-first posture

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| MVP alpha is RRP-first (not app-first) | "MVP alpha is RRP-first, not app-first" | rosetta canon / RRP | P0 | Provenance substrate before developer ergonomics |
| Slice S0: `builtin.echo` with guard/receipt/tapestry end-to-end | "Slice S0: builtin.echo with full guard/receipt/tapestry verification" | rosetta-guard, rosetta-tapestry | P0 | Constitutional zero, not developer feature |
| Slice S1: `code.scaffold --dry-run` using same constitutional loop | "Slice S1: code.scaffold --dry-run using the same constitutional loop" | rosetta-code | P1 | Developer ergonomics on proven loop |
| Nx + pnpm + TypeScript as primary spine | "Keep Nx + pnpm + TypeScript as the primary spine" | nx workspace, monorepo | P0 | Monorepo, cache-aware, generator-heavy |
| Python as specialist lane only (eval/embeddings/OCR/ASR) | "Keep Python as a specialist lane only" | python-boundary | P2 | Not core constitutional logic |
| Storage starts local-first (CAS + SQLite) | "Storage starts local-first. Local CAS + SQLite index now" | rosetta-storage | P1 | Postgres/pgvector becomes adapter, not prerequisite |
| UI scaffolded but non-alpha-gating | "UI is scaffolded, not alpha-gating" | rosetta-operator | P2 | Alpha gates: CLI/API/conformance/guard/receipts/replay |
| RRP content model: subjects/claims/digests/policy_refs/nonce/auth/sig | "RRP content model wins over generic receipts" | rosetta-receipt, RRP pack | P0 | Exact schema vs loose generic receipts |
| Guard decision tokens gain policy_version/policy_hash/expiry/subject/tool/resource_caps | "Guard decision tokens gain more structure" | rosetta-guard | P0 | More structured than prior generic tokens |
| File-level traceability headers stay | "File-level traceability headers stay" | all packages | P1 | Machine-checkable provenance at top of file |
| Next normative artifact: RRP Pack Filesystem Contract | "The next normative artifact should be a pack filesystem contract" | RRP pack spec | P0 | Missing bridge from RRP ideas to repo layout |
| JCS MVP: use Node built-ins; note RFC 8785 compliance gap | "I'll produce a minimal canonicalizer using Node's built-ins... may not fully align with RFC 8785" | rosetta-canon | P1 | Full compliance library recommended post-MVP |
| OPA/Rego deferred to later compiler target | "OPA/Rego later. That is a later compiler target rather than a day-one dependency" | rosetta-guard, policy | P2 | Minimal JSON policy bundle MVP |
| Deterministic conformance tests: TV1 + tamper-negative | "TV1 and tamper-negative tests compile red" | rosetta-canon, test-vectors | P0 | Fail-closed baseline before any feature work |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 1 | rrp-first, mvp-build-order | MVP build philosophy | decision | MVP alpha is RRP-first, not app-first. Provenance substrate (deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, replay/verification) comes before developer ergonomics. | "MVP alpha is RRP-first, not app-first" | Prioritize rosetta-canon and RRP test vectors before scaffold-forge | high |
| 2026-06-04 | docs/chats/20260410... | New work product 1 / Alpha RC-0 to RC-4 | mvp-build-order, staged-build | Build sequencing | decision | Two-step vertical slice over one-step: S0 = `builtin.echo` with full guard/receipt/tapestry; S1 = `code.scaffold --dry-run`. Prior doc made code.scaffold slice zero — this corrects that. | "Slice S0: builtin.echo... Slice S1: code.scaffold --dry-run" | Implement builtin.echo as the first provable slice | high |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 3 | nx, monorepo, typescript, toolchain | TypeScript/Nx spine | decision | Nx + pnpm + TypeScript confirmed as primary spine. Repo stays monorepo, project-graph-aware, cache-aware, generator-heavy. | "Keep Nx + pnpm + TypeScript as the primary spine" | Confirm current workspace structure is aligned | medium |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 4 | python-boundary, architecture | Python lane | decision | Python is specialist only: eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic. | "Keep Python as a specialist lane only" | Enforce tooling boundary; no python in guard/receipt core | medium |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 5 | sqlite, postgres, storage, local-first | Storage strategy | decision | Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. Honors append-only immutable tile posture. | "Storage starts local-first... Postgres/pgvector becomes an adapter" | Confirm Bootstrap still uses SQLite; mark migration as explicit P1 | high |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 6 | operator-ui, ui, alpha-rc | UI sequencing | decision | UI scaffolded but does not gate alpha. Alpha RC gates are CLI/API/conformance/guard/receipts/replay. | "UI is scaffolded, not alpha-gating" | rosetta-operator can exist but must not block RC | medium |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 7 | rrp, receipt-schema, tapestry, content-model | Receipt schema | decision | RRP content model wins: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig` with signature-hashing rule that excludes `sig` from CID computation. Replaces prior generic receipt schema. | "RRP content model wins over generic receipts... subjects, claims, digests, policy_refs" | Adopt RRP receipt schema in rosetta-receipt package | high |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 8 | guard-tokens, policy-version, admission | Guard token structure | decision | Guard decision tokens gain: policy_version, policy_hash, short-lived expiry, subject/tool references, resource_caps, constitution_hash placeholder, trace_id placeholder. More structured than prior draft. | "Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps" | Update GuardDecisionToken interface in rosetta-guard | high |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 9 | traceability-headers, file-level-headers, audit | File headers | decision | File-level traceability headers stay. Required: `Purpose Summary:`, `Rosetta Relevance:`, `Governing References:`. Machine-checkable provenance. | "File-level traceability headers stay" | Implement check-traceability-headers.ts as CI gate | medium |
| 2026-06-04 | docs/chats/20260410... | Unified decisions / point 10 | rrp-pack, filesystem-contract, rock-3111-c | Pack spec | decision | Next normative artifact is the RRP Pack Filesystem Contract. Missing bridge between RRP ideas and exact repo layout conventions. | "The next normative artifact should be a pack filesystem contract" | Draft and commit ROCK-3111-C | high |
| 2026-06-04 | docs/chats/20260410... | New work product 2 | rock-3111-c, rrp-pack, filesystem-contract | Pack spec draft | technology | ROCK-3111-C draft includes: pack root `packs/rrp/`, required files (pack.json, README.md, CHANGELOG.md, schema/, shacl/, vocab/, test-vectors/, examples/), required exports list, conformance tiers (RRP-Light, RRP-Full, RRP-Auditor), filesystem rules (immutability once published, vocab/shapes/examples for new semantics, test vectors require pos+neg cases). | Full spec in doc body | Implement packs/rrp/ layout per spec | high |
| 2026-06-04 | docs/chats/20260410... | New work product 3 / admission.ts | guard, admission, fail-closed | Guard code | technology | Code patch for `packages/rosetta-guard/src/admission.ts` with GuardDecisionToken interface (policy_version, policy_hash, constitution_hash, chain_height, subject, constraints, sig), admit() function with deny-by-default checks, verifyDecisionSignature stub requiring sig.kid + sig.sig_b64 presence. | Full code in doc | Adopt or adapt into rosetta-guard | medium |
| 2026-06-04 | docs/chats/20260410... | New work product 3 / receipt-bundle.ts | tapestry, receipt-bundle, rrp | Tapestry code | technology | Code patch for `packages/rosetta-tapestry/src/receipt-bundle.ts` with ReceiptBundleBuildInput and buildReceiptBundleTapestry() producing `rosetta.tapestry` with `profile: "rrp:tapestry.profile.receipt_bundle"`. | Full code in doc | Adopt or adapt into rosetta-tapestry | medium |
| 2026-06-04 | docs/chats/20260410... | New work product 3 / check-traceability-headers.ts | traceability-headers, ci, file-headers | CI tooling | technology | Code patch for `tools/scripts/check-traceability-headers.ts` — walks ts/js/py files, requires first 1200 chars to contain Purpose Summary / Rosetta Relevance / Governing References. Skips index.ts, components/, __tests__/simple/, barrels/. | Full code in doc | Adopt as pre-commit / CI gate | medium |
| 2026-06-04 | docs/chats/20260410... | Final reconciled build order | build-order, sequencing, mvp | Build sequencing | decision | 8-step final build order: (1) land rosetta-canon, rosetta-cid, RRP TV1/tamper vectors; (2) land rosetta.receipt and rosetta.tapestry RRP schemas; (3) land rosetta-guard admission and deny-path tests; (4) ship builtin.echo verified slice; (5) only then ship code.scaffold --dry-run; (6) then add local CAS + SQLite rights-scoped retrieval; (7) then scaffold operator UI; (8) then start adapters, pgvector, OPA compiler, swarm-facing interfaces. | "stop debating the cathedral and do this" | Use as implementation sequencing reference | high |
| 2026-06-04 | docs/chats/20260410... | Collisions resolved / collision 1 | builtin-echo, slice-zero | Build sequencing | decision | Collision 1: prior doc made code.scaffold slice zero. Resolved: builtin.echo with full guard/receipt/tapestry verification is true slice zero. code.scaffold becomes slice 1. | "it is right that my earlier MVP slice was still a little too 'developer delight' flavored" | builtin.echo first | high |
| 2026-06-04 | docs/chats/20260410... | Collisions resolved / collision 2 | operator-ui, ui-gating, alpha-rc | UI sequencing | decision | Collision 2: prior doc let inspector UI gate alpha. Resolved: scaffold operator UI but do not let it gate alpha. Alpha is headless CLI/API plus conformance green. | "it is right that I let the inspector UI into the alpha conversation too early" | Enforce CLI/API gates before UI | high |
| 2026-06-04 | docs/chats/20260410... | Collisions resolved / collision 3 | rrp-content-model, receipt-schema | Receipt schema | decision | Collision 3: prior doc had loose generic receipt/tapestry schemas. Resolved: adopt exact RRP content model (subjects/claims/digests/policy_refs + signature hash rule excluding sig from CID). | "it is right that my earlier generic receipt/tapestry schemas were too loose" | Adopt RRP receipt schema | high |
| 2026-06-04 | docs/chats/20260410... | Push-back on alternate run | typescript, nx, retrieval-scope | Retrieval gap | ablation | One push-back: alternate run's "missing baseline" notes are retrieval-scope truth, not architectural truth. Broader corpus still supports TS/Nx/React posture and file-header discipline. | "I would not let that run's narrower retrieval window down-rank the TS/Nx/React posture" | Nx/TS spine remains valid despite narrower doc retrieval | medium |
| 2026-06-04 | docs/chats/20260410... | JCS MVP note | jcs, rfc8785, canonicalizer | Canonicalization | risk | JCS canonicalizer uses Node built-ins (JSON.stringify) for MVP. Explicitly notes may not fully comply with RFC 8785. Full standards-compliant library recommended later. | "may not fully align with RFC 8785... recommend using a full standards-compliant library later" | Track as known compliance gap; don't ship as RFC 8785 compliant | medium |
| 2026-06-04 | docs/chats/20260410... | OPA deferred | opa, rego, policy-as-code | Policy | decision | OPA/Rego is later compiler target, not day-one dependency. MVP uses minimal JSON policy bundle. OPA's decoupling of decision-making from enforcement noted as future fit. | "OPA's own docs make clear that OPA decouples decision-making from enforcement... later compiler target rather than a day-one dependency" | Minimal JSON policy bundle for MVP; OPA roadmap item | medium |
| 2026-06-04 | docs/chats/20260410... | Nx caching reference | nx, caching, remote-caching, deterministic-tasks | Nx toolchain | technology | Nx remote caching, affected execution, task inputs/outputs, cacheable deterministic tasks cited as rationale for Nx spine. Points to nx.dev docs. | "official Nx docs reinforce that cacheable deterministic tasks, task inputs/outputs, affected execution, and remote caching are exactly the sort of ergonomics this repo wants" | Document Nx caching behavior in rosetta tooling docs | low |
| 2026-06-04 | docs/chats/20260410... | Final reconciled build order / note on SQLite | sqlite, postgres, migration, local-first | Storage | open-question | Step 6 (local CAS + SQLite) defers Postgres. No explicit decision on SQLite→Postgres migration path, timeline, or what "later" means for the pgvector baseline. | "then add local CAS + SQLite rights-scoped retrieval" | Explicit migration plan for SQLite→PostgreSQL needed | medium |

## Components And Technologies

- **Nx** — monorepo task orchestration, cache-aware, affected execution, remote caching
- **pnpm** — package manager for workspace
- **TypeScript** — primary language for constitutional spine
- **Python** — specialist lane only (eval/embeddings/OCR/ASR)
- **JCS (JSON Canonicalization Scheme)** — RFC 8785; MVP uses Node built-ins, full library deferred
- **SQLite** — local-first index; Postgres/pgvector as adapter later
- **OPA (Open Policy Agent)** — deferred; Rego compiler target
- **RRP Pack Filesystem Contract** — new spec (ROCK-3111-C draft v0.1.0)
- **Guard decision tokens** — structured with policy_version, policy_hash, expiry, resource_caps
- **File traceability headers** — Purpose Summary / Rosetta Relevance / Governing References

## Conceptual Claims

- Two-spotlight synthesis model: scaffold-forge (developer ergonomics) + RRP-constitutional (provenance substrate) merge into stricter build order
- Slice-zero is `builtin.echo` not `code.scaffold` — constitutional proof before developer delight
- RRP content model supersedes generic receipt schema — more exact, testable, SHACL-shapable
- SQLite local-first defers Postgres complexity without abandoning pgvector baseline requirement
- OPA/Rego is a later compiler target, not day-one dependency — keeps MVP scope tight
- File traceability headers are machine-checkable, not aesthetic — CI gate enforces them

## Dependencies And Sequencing

- Depends on: Rosetta v3.0.0 Core Spine, ROCK-3111/3111-A/3111-B (for ROCK-3111-C draft)
- Blocking: RRP canonicalizer (TV1 + tamper-negative) must be green before any feature slice ships
- Sequencing: builtin.echo (S0) → code.scaffold dry-run (S1) → local CAS/SQLite retrieval (S2) → operator UI scaffold (S3) → adapters/pgvector/OPA/swarm (S4+)
- JCS RFC 8785 compliance gap is known and deferred — should not block MVP but must be tracked

## Contradictions Or Supersession

- **Supersedes** prior doc that treated `code.scaffold --dry-run` as slice zero — this corrects to builtin.echo first
- **Supersedes** prior doc's generic receipt/tapestry schemas — adopts RRP exact content model
- **Supersedes** prior doc's UI-alpha-gating — operator UI is now explicitly non-gating
- **Does not supersede**: broader TS/Nx/React posture — confirmed valid despite alternate run's narrower retrieval window
- **Known gap**: SQLite→Postgres migration path not defined — Bootstrap currently uses SQLite; NOT LAME specifies PostgreSQL canonical; TC-006 blocked until this is resolved

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRD-001: Adopt RRP receipt schema (subjects/claims/digests/policy_refs) | implementation | `docs/intake/issue-drafts/prd-001-rrp-receipt-schema.md` | rrp, receipt-schema, rosetta-receipt | — | "RRP content model wins over generic receipts" |
| PRD-002: Implement ROCK-3111-C RRP Pack Filesystem Contract | implementation | `docs/intake/issue-drafts/prd-002-rock-3111-c-pack-fs-contract.md` | rrp-pack, rock-3111-c, pack-spec | — | "The next normative artifact should be a pack filesystem contract" |
| PRD-003: builtin.echo slice-zero — guard/receipt/tapestry end-to-end | implementation | `docs/intake/issue-drafts/prd-003-builtin-echo-slice-zero.md` | builtin-echo, guard, tapestry, slice-zero | PRD-001, PRD-002 | "Slice S0: builtin.echo with full guard/receipt/tapestry verification" |
| PRD-004: Implement check-traceability-headers.ts CI gate | implementation | `docs/intake/issue-drafts/prd-004-traceability-headers-ci.md` | ci, traceability-headers, file-headers | — | "File-level traceability headers stay... check-traceability-headers.ts" |
| PRD-005: JCS MVP compliance gap — document and track | documentation | `docs/intake/issue-drafts/prd-005-jcs-mvp-compliance-gap.md` | jcs, rfc8785, compliance, canonicalizer | — | "may not fully align with RFC 8785... recommend using a full standards-compliant library later" |
| PRD-006: SQLite→PostgreSQL migration plan for Bootstrap | architecture | `docs/intake/issue-drafts/prd-006-sqlite-postgres-migration.md` | sqlite, postgres, migration, bootstrap, tc-006 | — | "Storage starts local-first... Postgres/pgvector becomes an adapter" — no explicit migration path defined |
| PRD-007: Guard decision token policy_version/policy_hash enforcement | implementation | `docs/intake/issue-drafts/prd-007-guard-token-policy-versioning.md` | guard, policy-version, admission | PRD-001 | "Guard decision tokens gain more structure" — policy_version/policy_hash enforcement not yet in code |

## Project Board Suggestions

- Area: MVP Build Order / RRP Conformance
- Cycle: batch-3 (this doc is batch-3 PRIORITY_QUEUE)
- Status: not started
- Blocked by: Rosetta v3.0.0 Core Spine (for RRP pack layout), ROCK-3111/3111-A/3111-B (for ROCK-3111-C)
- Parallelization notes: ROCK-3111-C spec and check-traceability-headers.ts can be started independently of builtin.echo slice-zero; JCS compliance gap doc can be written in parallel with any implementation

## Open Questions

- What is the explicit timeline/trigger for SQLite→PostgreSQL migration? Bootstrap currently uses SQLite; NOT LAME specifies PostgreSQL canonical. TC-006 is blocked but has no explicit migration plan.
- Does the 8-step final build order supersede any previously committed build-order documentation in the repo? If so, which artifacts need updating?
- Is `builtin.echo` already implemented or is this still a proposal? The doc treats it as if it doesn't exist yet.
- What is the conformance test suite structure for RRP-Light / RRP-Full / RRP-Auditor tiers? ROCK-3111-C draft names the tiers but doesn't define test coverage per tier.