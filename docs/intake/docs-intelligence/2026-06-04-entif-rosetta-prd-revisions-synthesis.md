# Docs Intelligence Extraction

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: Entif and Rosetta PRDs Revisions and Synthesis — Extended Thinking
- Date evidence: 2026/4/10 9:39:31 (created), 2026/4/10 11:02:59 (updated)
- Authority tier: chat-deep-research (pro-tier extended thinking session)
- Freshness: epoch (one of the earliest PRD revision documents)
- Word count: ~1200 words output + code
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A deep-research synthesis that merged two parallel PRD runs for Rosetta/Entif. The primary output is a reconciled build order, an MVP staircase (Alpha RC-0 through RC-4), a draft spec for ROCK-3111-C (RRP Pack Filesystem Contract), and three code patches for Guard admission, receipt-bundle tapestry, and traceability headers. Key reconciliation: keep Nx/TypeScript/pnpm spine from run 1, but replace its constitutional center with RRP-first strictness from run 2.

## Goals And Intent

- Reconcile two divergent PRD runs for Entif/Rosetta
- Establish a binding build order
- Define alpha RC gate criteria
- Produce a draft pack filesystem contract spec
- Generate reference code patches for guard, tapestry, and header checking

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| MVP is RRP-first | "MVP alpha is RRP-first, not app-first" — proves deterministic canonicalization, CID stability, signed receipts first | constitutional | critical | supersedes app-first posture |
| Slice S0 before S1 | "Slice S0: builtin.echo with full guard/receipt/tapestry verification. Slice S1: code.scaffold --dry-run" | rosetta-guard, rosetta-tapestry | critical | |
| Nx + pnpm + TypeScript spine | "Keep Nx + pnpm + TypeScript as the primary spine" — monorepo, cache-aware, affected execution | nx workspace | high | reinforced by both runs |
| Python as specialist lane only | "Keep Python as a specialist lane only — eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic" | python-boundary | high | not a day-one dependency |
| Local-first storage | "Storage starts local-first — Local CAS + SQLite index now. Postgres/pgvector becomes an adapter" | storage | medium | PostgreSQL deferred |
| UI scaffolded but non-gating | "rosetta-operator can exist, but the alpha RC gates are CLI/API, conformance, guard, receipts, and replay" | rosetta-operator | low | alpha gates defined |
| RRP content model | "subjects, claims, digests, policy_refs, nonce, auth, sig" as standard payload shape | RRP schema | critical | |
| Guard decision tokens gain structure | "Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps" | rosetta-guard | critical | |
| File-level traceability headers | "File-level traceability headers stay" — Purpose Summary, Rosetta Relevance, Governing References | ci/linting | high | |
| RRP Pack Filesystem Contract next | "The next normative artifact should be a pack filesystem contract" — directly implied by both runs | ROCK-3111-C | high | |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 1 | rrp-first, mvp-staircase | MVP, RRP, build-order | decision | MVP alpha is RRP-first not app-first: prove deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, replay/verification before any app-level features | "MVP alpha is RRP-first, not app-first" — section header + first bullet | Land RRP core before any application-level features | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Two-step vertical slice" para 2 | slice-s0, slice-s1, builtin-echo | vertical-slice, builtin-echo, code-scaffold | decision | Two-step vertical slice: S0 = builtin.echo with full guard/receipt/tapestry verification, S1 = code.scaffold --dry-run | "Slice S0: builtin.echo with full guard/receipt/tapestry verification. Slice S1: code.scaffold --dry-run" | Build S0 first, S1 second, on the same constitutional loop | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 3 | nx, pnpm, typescript, monorepo | nx, pnpm, typescript | decision | Nx + pnpm + TypeScript as primary spine: monorepo, project-graph-aware, cache-aware, generator-heavy | "Keep Nx + pnpm + TypeScript as the primary spine — The repo stays monorepo, project-graph-aware, cache-aware, and generator-heavy" | Maintain Nx monorepo configuration | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 4 | python-boundary, specialist-lane | python, eval-harnesses, embeddings | decision | Python as specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experimentation — not core constitutional logic | "Keep Python as a specialist lane only — Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic" | Keep Python out of core; isolate in eval/embedding packages | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 5 | local-first, sqlite, postgres-deferred | storage, sqlite, postgres | decision | Storage starts local-first: local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite | "Storage starts local-first — Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite" | Defer PostgreSQL until after local CAS + SQLite is proven | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 6 | ui-non-gating, rosetta-operator | ui, operator, alpha-gates | decision | UI is scaffolded, not alpha-gating: rosetta-operator can exist but alpha RC gates are CLI/API, conformance, guard, receipts, replay | "UI is scaffolded, not alpha-gating — rosetta-operator can exist, but the alpha RC gates are CLI/API, conformance, guard, receipts, and replay" | Scaffold UI but do not let it gate alpha release | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 7 | rrp-content-model, subjects-claims-digests | RRP, receipts, schema | decision | RRP content model wins over generic receipts: subjects, claims, digests, policy_refs, nonce, auth, sig become standard payload shape | "RRP content model wins over generic receipts — subjects, claims, digests, policy_refs, nonce, auth, sig" | Adopt RRP receipt schema; deprecate generic receipt shape | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 8 | guard-decision-token, policy-version, resource-caps | guard, decision-token, policy | decision | Guard decision tokens gain more structure: include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, constitution_hash or trace ID placeholders | "Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps" | Implement structured GuardDecisionToken type | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 9 | traceability-headers, ci-lint | traceability, headers, ci | decision | File-level traceability headers stay: Purpose Summary, Rosetta Relevance, Governing References are required on protocol-sensitive files | "File-level traceability headers stay" | Implement check-traceability-headers.ts script | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 10 | rock-3111-c, pack-filesystem-contract | pack, filesystem-contract, normative | decision | Next normative artifact should be a pack filesystem contract: directly implied by both runs, bridge between RRP ideas and repo-known layout | "The next normative artifact should be a pack filesystem contract — The alternate run practically asks for it" | Draft ROCK-3111-C | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 2: ROCK-3111-C draft" | ROCK-3111-C draft | pack, filesystem-contract, rrp | technology | ROCK-3111-C RRP Pack Filesystem Contract v0.1.0 drafted: defines pack root, required files (pack.json, schemas, SHACL, vocab, test vectors, examples), required exports, conformance tiers (RRP-Light, RRP-Full, RRP-Auditor), filesystem rules | "DocID: ROCK-3111-C / Title: RRP Pack Filesystem Contract / Status: Draft" + full spec | Adopt ROCK-3111-C as the next normative spec | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 3: code patches" | admission.ts | guard, admission, decision-token | technology | Guard admission module drafted with GuardDecisionToken type, admit() function, deny-by-default, all reason codes: MISSING_DECISION_TOKEN, INVALID_DECISION_SIGNATURE, POLICY_VERSION_MISMATCH, TOOL_MISMATCH, TOOLCALL_CID_MISMATCH, TENANT_MISMATCH, DECISION_EXPIRED, DRY_RUN_ONLY, DECISION_DENY, HUMAN_APPROVAL_REQUIRED, QUARANTINED | Full code listing in document | Implement rosetta-guard admission module | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 3: code patches" | receipt-bundle.ts | tapestry, receipts, bundle | technology | Receipt-bundle tapestry profile drafted: buildReceiptBundleTapestry() with members deduplication, profile "rrp:tapestry.profile.receipt_bundle", closure_policy "rrp.bundle.closure.v0" | Full code listing in document | Implement rosetta-tapestry receipt-bundle builder | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 3: code patches" | check-traceability-headers.ts | traceability, linting, ci | technology | Traceability header checker script drafted: walks .ts/.tsx/.js/.mjs/.py files, checks for Purpose Summary, Rosetta Relevance, Governing References in first 1200 chars, skips index.ts and certain dirs | Full code listing in document | Add to CI pipeline | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Final reconciled build order" | build order list | build-order, sequencing, alpha-rc | decision | Final reconciled build order: (1) rosetta-canon, rosetta-cid + RRP TV1/tamper vectors, (2) rosetta.receipt + rosetta.tapestry RRP schemas, (3) rosetta-guard admission + deny-path tests, (4) builtin.echo verified slice, (5) code.scaffold --dry-run, (6) local CAS + SQLite rights-scoped retrieval, (7) scaffold operator UI + richer context assembly, (8) adapters, pgvector, OPA compiler, swarm reserved interfaces | "Final reconciled build order" full numbered list | Adopt this build order | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 1: merged MVP staircase" | Alpha RC-0 through RC-4 | mvp-staircase, alpha-rc, build-order | decision | Alpha RC staircase defined: RC-0 = Nx workspace + canon/cid/validate + TV1/tamper-negative tests compile red; RC-1 = JCS/CID conformance green + receipt/tapestry schemas green; RC-2 = Guard denies missing/expired/mismatched + builtin.echo passes end-to-end + receipt bundle verifies; RC-3 = code.scaffold --dry-run reuses same loop + CLI/API green; RC-4 = local CAS + SQLite stable + rights-scoped retrieval enforced + operator UI stub non-gating | "New work product 1: merged MVP staircase" full table | Define these as formal gate criteria | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 10 | conformance-tiers, rrp-light, rrp-full, rrp-auditor | conformance, rrp, audit | issue-candidate | Conformance tiers (RRP-Light, RRP-Full, RRP-Auditor) defined but not fully specified — what does auditor mean operationally? | "Conformance tiers: RRP-Light / RRP-Full / RRP-Auditor" — no operational definition | Clarify what each conformance tier requires and how they are verified | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 9 | open-question | traceability, headers, completeness | issue-candidate | Traceability header check has defined skips (index.ts, __tests__/simple, barrels, components/) — are these skips correct for Rosetta? Are there additional exclusions needed (e.g., generated files, schema migrations)? | "function shouldSkip(p): boolean" — skips defined but not justified | Audit shouldSkip list for correctness | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 5 | open-question | sqlite, postgres, migration-gap | issue-candidate | SQLite-first is explicitly deferred: "Postgres/pgvector becomes an adapter, not a prerequisite" — NOT LAME specifies PostgreSQL as canonical registry. When does the SQLite → PostgreSQL migration happen and what does it entail? | "Storage starts local-first — Local CAS + SQLite index now. Postgres/pgvector becomes an adapter" vs NOT LAME = PostgreSQL canonical | Schedule SQLite → PostgreSQL migration as explicit work item | high |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" para 4 | contradiction | python-boundary, not-lame-prd | contradiction | "Python as specialist lane only" appears to contradict the NOT LAME PRD, which may have assumed broader Python use (e.g., in the pipeline or embedding layers). Need to verify if NOT LAME PRD specifies Python as more than a specialist tool | "Keep Python as a specialist lane only" — explicit Python boundary vs any Python assumptions in NOT LAME PRD | Verify Python role in NOT LAME PRD; reconcile if needed | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 2: ROCK-3111-C draft" | ROCK-3111-C conformance tiers | rrp, conformance-tiers, pack | open-question | ROCK-3111-C draft defines three conformance tiers but does not specify how conformance is verified: CI automation? manual audit? third-party attestation? | "Conformance tiers: RRP-Light / RRP-Full / RRP-Auditor" + "Filesystem rules" section | Define conformance verification mechanism for ROCK-3111-C | medium |
| 2026-06-04 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 3: code patches" | verifyDecisionSignature stub | guard, crypto, signature, stub | risk | verifyDecisionSignature() is a stub: "require signature object presence to avoid naked allows" — this is not real cryptographic verification; it only checks sig.kid and sig.sig_b64 presence, not validity | "// MVP stub: // 1. canonicalize token without transient fields // 2. resolve token.sig.kid // 3. verify token.sig.signed / sig_b64" | Do not ship guard with stub signature verification in production; flag as tech debt | high |

## Components And Technologies

- **Nx** — monorepo build orchestrator, cache-aware task execution, affected command
- **pnpm** — package manager, workspace support
- **TypeScript** — primary language for all constitutional packages
- **Python** — specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experimentation
- **SQLite** — local-first storage index (deferred PostgreSQL)
- **JCS** (JSON Canonicalization Scheme) — deterministic JSON canonicalizer for CID stability
- **OPA/Rego** — deferred policy compiler target (minimal JSON policy bundle now)
- **SHACL** — shapes for receipt and tapestry bundle validation
- **cryptoNonce()** — `Math.random()`-based nonce generation (non-cryptographic, flag as issue)

## Conceptual Claims

- **RRP-first MVP**: The minimum viable alpha is a deterministic provenance substrate, not a developer-friendly app surface. Constitutional proof precedes application features.
- **Two-slice vertical slice**: S0 (builtin.echo) establishes the full guard/receipt/tapestry loop. S1 (code.scaffold --dry-run) reuses that same loop without side effects. No slice skips constitutional steps.
- **RRP content model supersedes generic receipts**: The RRP schema (subjects/claims/digests/policy_refs/nonce/auth/sig) is the canonical receipt shape; ad-hoc generic receipts are deprecated.
- **Local CAS + SQLite is sufficient until proven otherwise**: PostgreSQL is a later adapter, not a day-one dependency. This respects Rosetta's immutable tile posture while enabling workflow indexing.
- **UI is scaffolding, not gating**: Alpha gates are headless CLI/API + conformance. UI can exist as an inspection surface but cannot block alpha RC.
- **Two runs converged**: Run 1 (repo-scaffold, Nx ergonomics, developer loop) and Run 2 (RRP constitutional hardening) were complementary, not contradictory. The synthesis kept the scaffold posture but replaced the constitutional center.

## Dependencies And Sequencing

- **Depends on**: Rosetta v3.0.0 Core Spine, ROCK-3111 (core RRP spec), ROCK-3111-A (receipt schema), ROCK-3111-B (tapestry schema)
- **Blocks**: All downstream alpha RC work is blocked on the Alpha RC-0 build (rosetta-canon, rosetta-cid, TV1 vectors)
- **Sequencing (final reconciled order)**:
  1. rosetta-canon + rosetta-cid + RRP TV1/tamper-negative test vectors
  2. rosetta.receipt + rosetta.tapestry RRP schemas + SHACL shapes
  3. rosetta-guard admission + deny-path test suite
  4. builtin.echo vertical slice (full loop)
  5. code.scaffold --dry-run (same constitutional loop)
  6. local CAS + SQLite rights-scoped retrieval
  7. scaffold rosetta-operator UI (non-gating)
  8. adapters, pgvector, OPA compiler, swarm interfaces

## Contradictions Or Supersession

- **Python boundary vs NOT LAME PRD**: This doc says Python is specialist-only; NOT LAME PRD may assume broader Python use (embedding pipelines, eval harnesses). Need cross-reference to reconcile. Not a blocking contradiction but a clarification gap.
- **SQLite-first vs NOT LAME PostgreSQL canonical**: This doc explicitly defers PostgreSQL. NOT LAME PRD specifies PostgreSQL as canonical registry. The two positions need explicit reconciliation — likely a migration gap that should be an explicit work item.
- **UI non-gating**: This doc explicitly resolves a potential debate: operator UI is scaffolded but does not gate alpha. This is a clean decision, not a contradiction.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRD-001: SQLite → PostgreSQL migration gap — local-first deferred vs canonical PostgreSQL | implementation | `docs/intake/issue-drafts/prd-001-sqlite-postgres-migration.md` | storage, migration, sqlite, postgres | — | Finding: "Storage starts local-first — Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite" — directly conflicts with NOT LAME PRD's PostgreSQL-as-canonical-registry position. When does the migration happen? |
| PRD-002: Guard signature verification is an MVP stub — not safe for production | security | `docs/intake/issue-drafts/prd-002-guard-signature-stub.md` | guard, security, crypto, production-readiness | — | Finding: verifyDecisionSignature() only checks sig.kid and sig_b64 presence, not cryptographic validity. "MVP stub" comment in code. Cannot ship production guard with unverified signature logic. |
| PRD-003: ROCK-3111-C conformance tier operational definitions missing | spec-gap | `docs/intake/issue-drafts/prd-003-rrp-conformance-tiers.md` | rrp, conformance, spec-gap | — | Finding: ROCK-3111-C draft defines RRP-Light, RRP-Full, RRP-Auditor but does not specify how conformance is verified (CI? manual audit? attestation?). Operational definition needed before adoption. |
| PRD-004: cryptoNonce() uses Math.random() — not cryptographically random | security | `docs/intake/issue-drafts/prd-004-cryptononce-random.md` | crypto, security, randomness, receipts | — | Finding: in receipt-bundle.ts, `cryptoNonce()` uses `Math.random()` — not a secure random source. Nonces in receipt bundles must be cryptographically random. |

## Project Board Suggestions

- Area: Alpha RC Staircase (RC-0 through RC-4)
- Cycle: batch-3 (this doc is batch-3 source dialogue)
- Status: candidate for priority lane
- Blocked by: Rosetta v3.0.0 Core Spine + ROCK-3111/3111-A/3111-B (upstream specs)
- Parallelization notes: Steps 1-3 (canon/cid, schemas, guard) are sequential. Steps 4-5 (builtin.echo + code.scaffold) are sequential. Steps 6-8 are parallelizable once steps 1-5 are green.

## Open Questions

- When exactly does SQLite → PostgreSQL migration happen? Is it a TC-006 or TC-007 work item?
- How is RRP conformance verified operationally for each tier (RRP-Light / RRP-Full / RRP-Auditor)?
- Is the Python specialist-lane boundary consistent with NOT LAME PRD's assumptions about embedding pipelines?
- Does the `cryptoNonce()` non-cryptographic nonce break receipt bundle integrity?
- Should `code.scaffold --dry-run` be part of the same package as builtin.echo, or a separate package?
- What is the upgrade path from minimal JSON policy bundle to OPA/Rego?