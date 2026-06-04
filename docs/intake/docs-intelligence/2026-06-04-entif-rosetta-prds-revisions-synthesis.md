# Docs Intelligence Extraction — 20260410 PRD Revisions and Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: Entif and Rosetta PRDs — Revisions and Synthesis
- Date evidence: 2026-04-10
- Authority tier: chat-deep-research
- Freshness: stale (2026-04-10; ~8 weeks old)
- Word count: ~1800
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A deep-research synthesis that reconciles two parallel PRD approaches for Rosetta/Entif. The document produces a merged MVP build order, a new RRP Pack Filesystem Contract spec (ROCK-3111-C), three code patches for guard admission, receipt-bundle tapestry, and traceability-header checking, and a finalized 8-step build order. Key output: RRP-first constitutional framing, S0/S1 vertical slice ordering, alpha RC-0 through RC-4 gate definitions, and an explicit Python/TypeScript role division.

## Goals And Intent

- Reconcile two divergent PRD/scaffold runs for Rosetta/Entif
- Produce binding unified decisions
- Generate concrete code artifacts and pack spec
- Establish alpha RC sequencing gates

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| RRP-first MVP proof | synthesis decision 1 | rosetta-core | P0 | Deterministic canonicalization, CID, receipts, guard, replay before any app-first features |
| S0 before S1 slice order | synthesis decision 2 | rosetta-core | P0 | `builtin.echo` slice must precede `code.scaffold --dry-run` |
| Nx/pnpm/TS spine | synthesis decision 3 | nx workspace | P1 | Monorepo, cacheable tasks, affected execution |
| Python specialist-only | synthesis decision 4 | eval, embeddings | P2 | Not core constitutional logic |
| Local CAS + SQLite first | synthesis decision 5 | rosetta-storage | P1 | Postgres/pgvector as later adapter only |
| UI non-gating alpha | synthesis decision 6 | rosetta-operator | P1 | Scaffold only; CLI/API and conformance are alpha gates |
| RRP content model | synthesis decision 7 | rosetta-receipts | P0 | `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig` |
| Guard decision token schema | synthesis decision 8 | rosetta-guard | P0 | `policy_version`, `policy_hash`, expiry, constraints, constitution_hash placeholders |
| File-level traceability headers | synthesis decision 9 | all packages | P1 | Purpose Summary, Rosetta Relevance, Governing References |
| ROCK-3111-C pack contract | new work product 2 | packs/rrp | P1 | Pack filesystem layout spec with schemas, SHACL, vocab, test vectors |
| Traceability header CI check | new work product 3 | tools/scripts | P2 | `check-traceability-headers.ts` needs CI integration |
| JCS MVP safe subset | synthesis decision | rosetta-canon | P2 | Node `JSON.stringify` MVP; RFC 8785 library later |
| OPA/Rego deferred | synthesis decision | rosetta-policy | P3 | Minimal JSON policy MVP; OPA later |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 1 | rrp-first, mvp-gate, constitutional | rrp, mvp, alpha-rc | decision | MVP alpha is RRP-first, not app-first. First proof is deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, replay/verification. | "MVP alpha is RRP-first, not app-first" | Formalize as binding build order | high |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 2 | vertical-slice, sequencing | builtin-echo, code-scaffold | decision | Two-step vertical slice: S0 = `builtin.echo` with full guard/receipt/tapestry verification; S1 = `code.scaffold --dry-run` using same constitutional loop. S0 must precede S1. | "Slice S0: `builtin.echo` with full guard/receipt/tapestry verification. Slice S1: `code.scaffold --dry-run`" | Explicitly gate S1 behind S0 green | high |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 3 | nx, pnpm, typescript, spine | nx, pnpm, typescript | decision | Nx + pnpm + TypeScript as primary build spine. Repo stays monorepo, project-graph-aware, cache-aware, generator-heavy. | "Keep Nx + pnpm + TypeScript as the primary spine" | Maintain current direction; codify in workspace config | high |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 4 | python, specialist-lane, constitutional | python, constitutional | decision | Python is a specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic. | "Keep Python as a specialist lane only. Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic." | Add explicit Python boundary rule to contributing guide | medium |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 5 | local-first, sqlite, postgres, adapter | storage, sqlite, postgres, pgvector | decision | Storage starts local-first: local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. | "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite." | Define local CAS + SQLite as alpha storage; pgvector as RC-1+ | high |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 6 | ui, non-gating, operator | operator-ui, alpha-rc | decision | UI is scaffolded, not alpha-gating. `rosetta-operator` can exist but alpha RC gates are CLI/API, conformance, guard, receipts, replay. | "UI is scaffolded, not alpha-gating" | Ensure RC gate criteria explicitly exclude UI from critical path | medium |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 7 | rrp-content-model, receipts, schema | rrp, receipts, tapestry | decision | RRP content model wins over generic receipts: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig` plus signature hashing rule that excludes `sig` from CID computation. | "RRP content model wins over generic receipts" | Adopt RRP schema as standard; deprecate generic receipt shape | high |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 8 | guard-token, policy-version, constraints | guard, admission, policy | decision | Guard decision tokens gain more structure: `policy_version`, `policy_hash`, short-lived expiry, subject/tool references, resource caps, and later-ready `constitution_hash` placeholders. | "Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps" | Formalize GuardDecisionToken interface in rosetta-guard | high |
| 2026-04-10 | 20260410 PRD synthesis | Unified decisions, decision 9 | traceability-headers, ci, header-check | traceability, headers, ci | decision | File-level traceability headers stay required: every protocol-sensitive module needs Purpose Summary, Rosetta Relevance, Governing References. | "File-level traceability headers stay" | Integrate `check-traceability-headers.ts` into CI gate | medium |
| 2026-04-10 | 20260410 PRD synthesis | New work product 1: merged MVP staircase | alpha-rc-0 through rc-4 | alpha-rc, mvp-staircase | decision | Alpha RC staircase defined: RC-0 = Nx boots + canon/cid/validate + TV1/tamper tests compile red; RC-1 = JCS/CID conformance green + receipt/tapestry schemas; RC-2 = guard denies + builtin.echo slice passes; RC-3 = code.scaffold --dry-run works; RC-4 = local CAS + SQLite stable + rights-scoped retrieval + operator UI stub non-gating | "Alpha RC-0 through RC-4" defined with specific criteria | Convert to formal gate criteria ticket | high |
| 2026-04-10 | 20260410 PRD synthesis | New work product 2: ROCK-3111-C draft | rrp-pack, filesystem-contract, rock-3111-c | rrp-pack, filesystem-contract, shacl, vocab | decision | New RRP Pack Filesystem Contract v0.1.0 draft: `packs/rrp/` layout with pack.json, README, CHANGELOG, schema/, shacl/, vocab/, test-vectors/, examples/. Pack.json fields defined: pack_id, doc_id, version, kind, exports[], depends_on[], conformance_tiers[], canonicalization, cid_profile, compatibility. Three conformance tiers: RRP-Light, RRP-Full, RRP-Auditor. | ROCK-3111-C draft section | Formalize ROCK-3111-C as a tracked spec document | high |
| 2026-04-10 | 20260410 PRD synthesis | admission.ts patch | guard-admission, signature-stub, deny-by-default | rosetta-guard, admission | technology | Code patch for `packages/rosetta-guard/src/admission.ts`: deny-by-default admission checks (freshness, policy alignment, subject/tool match, dry-run constraints). MVP stub for `verifyDecisionSignature()` requires signature object presence to avoid naked allows. | admission.ts code block | Implement full signature verification before RC-2 | medium |
| 2026-04-10 | 20260410 PRD synthesis | receipt-bundle.ts patch | receipt-bundle, tapestry, rrp-profile | rosetta-tapestry, rrp | technology | Code patch for `packages/rosetta-tapestry/src/receipt-bundle.ts`: builds RRP receipt-bundle tapestry profile using `rrp:tapestry.profile.receipt_bundle`, includes both receipt CIDs and member CIDs as members, closure_policy `rrp.bundle.closure.v0`. | receipt-bundle.ts code block | Verify profile URI is registered in vocab | medium |
| 2026-04-10 | 20260410 PRD synthesis | check-traceability-headers.ts patch | traceability, ci, header-check, tooling | tools/scripts, ci | technology | Code patch for `tools/scripts/check-traceability-headers.ts`: checks TS/JS/Python files for required header blocks (Purpose Summary, Rosetta Relevance, Governing References) in first 1200 chars. Skip index.ts, components, __tests__/simple, barrels. | check-traceability-headers.ts code block | Add to CI pipeline as pre-commit/lint gate | medium |
| 2026-04-10 | 20260410 PRD synthesis | Final reconciled build order | build-order, sequencing, alpha-rc | build-order, sequencing | dependency | Final 8-step build order: (1) rosetta-canon/cid + RRP TV1/tamper vectors; (2) rosetta.receipt + rosetta.tapestry RRP schemas; (3) rosetta-guard admission + deny-path tests; (4) builtin.echo verified slice; (5) code.scaffold --dry-run; (6) local CAS + SQLite rights-scoped retrieval; (7) scaffold operator UI; (8) adapters + pgvector + OPA. | "Final reconciled build order" section | Convert to milestone/epic tickets | high |
| 2026-04-10 | 20260410 PRD synthesis | JCS MVP decision | jcs, rfc8785, canonicalizer, mvp | rosetta-canon, jcs | risk | MVP canonicalizer uses Node `JSON.stringify` as safe subset. Not RFC 8785 compliant. Full JCS library needed later for compliance. | "MVP safe subset, which may not fully align with RFC 8785" | Track as deferred RFC 8785 compliance task | medium |
| 2026-04-10 | 20260410 PRD synthesis | OPA/Rego deferred | opa, rego, policy-deferred | rosetta-policy, opa | decision | Policy-as-code and signed policy bundles deferred to later phase. Minimal JSON policy bundle for MVP. OPA targets later adapter. | "Minimal JSON policy bundle now, OPA/Rego later" | OPA integration as RC-2+ item | medium |
| 2026-04-10 | 20260410 PRD synthesis | Pushback on alternate run | retrieval-scope, nx-cache, file-headers | retrieval, nx | ablation | Author pushes back on alternate run's "missing baseline" framing: the narrower retrieval window doesn't invalidate TypeScript-first/Nx posture or file-header discipline. Broader corpus supports both. | "retrieval-scope truth vs architectural truth" | Note: document reflects retrieval-context bias | low |
| 2026-04-10 | 20260410 PRD synthesis | Missing: JSON schema for GuardDecisionToken | guard-token, json-schema, admission | rosetta-guard, schema | issue-candidate | The `GuardDecisionToken` interface is defined in prose/code but no canonical JSON schema is provided. SHACL shapes for guard decisions also missing from the RRP pack draft. | admission.ts code block shows interface but no schema artifact | Create guard-decision.schema.json and SHACL shapes | high |
| 2026-04-10 | 20260410 PRD synthesis | Missing: RRP test vector coverage | rrp, test-vectors, conformance | rrp, test-vectors | issue-candidate | ROCK-3111-C draft lists tv1 test vectors but no actual test vector content defined. Tamper-negative vectors also referenced but not specified. | "test-vectors/tv1.hash-input.json, tv1.expected.json, tv1.tampered.json" | Populate tv1 test vectors per RRP spec | medium |
| 2026-04-10 | 20260410 PRD synthesis | Missing: builtin.echo slice definition | builtin-echo, s0, slice | builtin-echo, s0 | issue-candidate | S0 vertical slice (`builtin.echo`) is referenced as the first honest constitutional proof but no concrete definition of `builtin.echo` is provided. What exactly does it echo? What are its boundaries? | "Slice S0: builtin.echo with full guard/receipt/tapestry verification" | Define builtin.echo scope and interface explicitly | medium |
| 2026-04-10 | 20260410 PRD synthesis | Missing: non-replay counter on receipts | non-replay, nonce, receipts | receipts, non-replay | issue-candidate | Receipt schema mentions `nonce` for replay protection but no explicit non-replay counter or nonce store architecture is specified. | "non-replay counters" mentioned in decision 7 discussion | Design nonce store for receipt replay protection | medium |
| 2026-04-10 | 20260410 PRD synthesis | Missing: RRP conformance test harness | rrp, conformance, ci, test-harness | rrp, ci, conformance | issue-candidate | No CI-integrated RRP conformance test harness is specified. ROCK-3111-C references conformance tiers but no automated test runner is defined. | "Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor" | Design automated conformance test runner for CI | medium |

## Components And Technologies

- `packages/rosetta-guard/src/admission.ts` — guard admission module (code patch provided)
- `packages/rosetta-tapestry/src/receipt-bundle.ts` — receipt-bundle tapestry builder (code patch provided)
- `tools/scripts/check-traceability-headers.ts` — file header compliance checker (code patch provided)
- Nx workspace (primary build spine)
- pnpm (package manager)
- TypeScript (primary language)
- Python (specialist only: eval, embeddings, OCR/ASR, graph)
- JCS (JSON Canonicalizer, MVP safe subset)
- SQLite (local CAS index, alpha storage)
- PostgreSQL/pgvector (later adapter)
- OPA/Rego (deferred policy)
- SHACL (shape validation for receipts and tapestries)

## Conceptual Claims

- MVP alpha = RRP-first, not app-first
- `builtin.echo` (S0) is the truly smallest honest constitutional proof
- `code.scaffold --dry-run` (S1) reuses the same constitutional loop but is not slice zero
- Python belongs in specialist lanes only, not core constitutional logic
- Local CAS + SQLite is alpha-appropriate; Postgres/pgvector is a later adapter
- Operator UI should be scaffolded but must not gate alpha RC
- RRP content model (`subjects`, `claims`, `digests`, `policy_refs`) supersedes generic receipt schema
- Guard decision tokens need `policy_version`, `policy_hash`, expiry, and resource constraints
- File-level traceability headers (Purpose Summary, Rosetta Relevance, Governing References) are required
- ROCK-3111-C pack contract is the missing bridge between RRP ideas and repo layout

## Dependencies And Sequencing

- S0 (`builtin.echo`) must complete before S1 (`code.scaffold --dry-run`) can begin
- RRP TV1/tamper test vectors needed before RRP schema work can be validated
- `rosetta.receipt` + `rosetta.tapestry` schemas needed before guard admission tests
- Local CAS + SQLite must be stable before rights-scoped retrieval can be enforced
- UI scaffold can run in parallel with core constitutional work but is non-blocking for alpha RC
- OPA/Rego deferred beyond alpha; minimal JSON policy for MVP
- RFC 8785 JCS library deferred beyond MVP

## Contradictions Or Supersession

- **Supersedes earlier "app-first" MVP framing**: The doc explicitly retracts the earlier "developer delight" flavored MVP slice in favor of RRP-first constitutional proof.
- **Supersedes early UI gating**: The alternate run's stance (UI scaffold but non-gating) wins over the earlier run's early inspector UI conversation.
- **Retains Nx/pnpm/TS spine**: Neither run challenges the TypeScript-first, Nx/pnpm monorepo direction.
- **Retains Python specialist role**: Neither run proposes Python for core constitutional logic.
- **Stale document risk**: Document is from 2026-04-10. Some decisions may have already been implemented or superseded by subsequent sprints. Verification needed against current branch state.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRDS-001: S0/S1 vertical slice sequencing — builtin.echo before code.scaffold | sequencing | `docs/intake/issue-drafts/prds-001-s0-s1-vertical-slice-sequencing.md` | build-order, sequencing, alpha-rc | — | Synthesis decision 2: S0 (`builtin.echo`) must precede S1 (`code.scaffold --dry-run`) |
| PRDS-002: Formalize ROCK-3111-C RRP Pack Filesystem Contract | spec | `docs/intake/issue-drafts/prds-002-rock-3111-c-rrp-pack-filesystem-contract.md` | rrp, packs, filesystem-contract, shacl | — | New work product 2: `packs/rrp/` layout with pack.json, schemas, SHACL, vocab, test vectors |
| PRDS-003: Guard decision token JSON schema and SHACL shapes missing | schema-gap | `docs/intake/issue-drafts/prds-003-guard-decision-token-schema-missing.md` | rosetta-guard, schema, shacl | PRDS-001 | admission.ts code patch shows GuardDecisionToken interface but no canonical JSON schema or SHACL shapes |
| PRDS-004: RRP test vector coverage — tv1 and tamper-negative vectors unspecified | testing | `docs/intake/issue-drafts/prds-004-rrp-test-vector-coverage.md` | rrp, test-vectors, conformance, ci | PRDS-002 | ROCK-3111-C lists test-vectors/ filenames but no actual vector content defined |
| PRDS-005: builtin.echo slice scope undefined | spec-gap | `docs/intake/issue-drafts/prds-005-builtin-echo-slice-undefined.md` | builtin-echo, s0, slice | PRDS-001 | S0 referenced as first honest constitutional proof but no concrete interface/boundary definition |
| PRDS-006: Non-replay counter / nonce store architecture missing | architecture | `docs/intake/issue-drafts/prds-006-nonce-store-architecture-missing.md` | receipts, non-replay, security | — | Receipt schema mentions nonce for replay protection but no nonce store architecture specified |
| PRDS-007: RRP conformance test harness for CI | ci, testing | `docs/intake/issue-drafts/prds-007-rrp-conformance-test-harness.md` | rrp, conformance, ci | PRDS-002, PRDS-004 | ROCK-3111-C defines conformance tiers but no automated test runner in CI |
| PRDS-008: Alpha RC-0 through RC-4 gate criteria need formal tickets | tracking | `docs/intake/issue-drafts/prds-008-alpha-rc-gate-criteria.md` | alpha-rc, mvp, tracking | PRDS-001, PRDS-005 | Alpha RC staircase defined in prose only; needs formal gate criteria tickets |

## Project Board Suggestions

- Area: Rosetta Build / Alpha RC
- Cycle: batch-3 (this doc is from Batch 3 priority queue)
- Status: Backlog
- Blocked by: Bootstrap must be green (TC-005 critical path)
- Parallelization notes: S0 and UI scaffold can proceed in parallel; S1 blocked by S0; pgvector/OPA blocked by RC-4

## Open Questions

- Has `builtin.echo` been defined in any subsequent sprint? Doc is 8 weeks stale.
- Has the RRP pack filesystem contract (ROCK-3111-C) been formalized as a spec document?
- Is the `check-traceability-headers.ts` script already integrated into CI?
- Has RFC 8785 JCS compliance been addressed, or is the MVP `JSON.stringify` still in use?
- Are the alpha RC-0 through RC-4 gate criteria tracked as formal tickets?
