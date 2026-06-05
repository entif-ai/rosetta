# Docs Intelligence Extraction — 20260410 PRD Revision Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: PRD Blueprint for Rosetta/Entif — Revision and Synthesis (Extended Thinking)
- Date evidence: 2026-04-10 (created 09:39, updated 11:02, exported 11:03)
- Authority tier: chat — synthesis artifact; decisions treated as proposals pending formal adoption
- Freshness: 2026-04-10 — pre-TC-005; predates Text-Core MVP scope gate consolidation
- Word count: ~3,000 (substantial code + spec content)
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

ChatGPT session (Pro-tier Deep Research) where Emilie Eudico ran two alternate PRD blueprint syntheses and then merged them. Output: 10 binding unified decisions, an Alpha RC-0–RC-4 MVP staircase, a draft ROCK-3111-C RRP Pack Filesystem Contract v0.1.0, three TypeScript code patches, and an 8-step reconciled build order. The document is significant as the bridge between scaffold-forge energy (Nx/TS/React) and RRP constitutional rigor (deterministic canonicalization, immutable tiles, receipt-first).

## Goals And Intent

- Reconcile two alternate PRD blueprint runs for Rosetta/Entif
- Establish binding unified decisions for the MVP build
- Define the next normative artifact (RRP Pack Filesystem Contract)
- Produce deployable TypeScript code patches

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| MVP alpha is RRP-first, not app-first | Unified Decision 1; Alpha RC-0 | `rosetta-canon`, `rosetta-cid`, `rosetta-receipt` | P0 | Deterministic canonicalization + CID stability gates everything |
| Two-step vertical slice (builtin.echo S0 → code.scaffold S1) | Unified Decision 2; Alpha RC-2/RC-3 | `rosetta-guard`, `builtin.echo` | P0 | S0 is constitutional proof; S1 adds scaffold |
| Nx + pnpm + TypeScript as primary spine | Unified Decision 3; Nx docs cited | nx plugin, workspace | P0 | Monorepo, project-graph-aware, cache-aware |
| Python as specialist lane only (eval, embeddings, OCR) | Unified Decision 4 | eval harness, embeddings | P1 | Not core constitutional logic |
| Local-first storage (CAS + SQLite now; Postgres later) | Unified Decision 5; Rosetta v3 Core Spine | storage adapter | P1 | SQLite local shadow; Postgres as adapter not prerequisite |
| UI scaffolded but non-alpha-gating | Unified Decision 6; Alpha RC-4 | `rosetta-operator` | P2 | CLI/API + conformance gates alpha; UI stub only |
| RRP content model adopted (subjects/claims/digests/policy_refs) | Unified Decision 7; ROCK-3111-C | `rosetta.receipt`, `rosetta.tapestry` | P0 | Sharpens generic receipt schemas from earlier runs |
| Guard decision tokens gain structure (policy_version, policy_hash, expiry, resource_caps) | Unified Decision 8; admission.ts code | `rosetta-guard` | P0 | 9-step state machine from NOT LAME PRD |
| File-level traceability headers required | Unified Decision 9; check-traceability-headers.ts | CI, all protocol-sensitive modules | P1 | Machine-checkable provenance at file level |
| Next normative artifact: RRP Pack Filesystem Contract | Unified Decision 10; ROCK-3111-C draft | `packs/rrp/` | P0 | Directly implied by RRP rigor emphasis |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 1 | `mvp`, `rrp-first`, `alpha-rc` | MVP definition | decision | MVP alpha must be RRP-first: prove deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, replay/verification before any app-layer work | "MVP alpha is RRP-first, not app-first" | Treat as binding; formalize in next RFC | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 2 | `vertical-slice`, `builtin-echo`, `dry-run` | S0/S1 slice | decision | Two-step vertical slice: S0 = builtin.echo with full guard/receipt/tapestry verification; S1 = code.scaffold --dry-run reusing same constitutional loop | "Slice S0: builtin.echo with full guard/receipt/tapestry verification. Slice S1: code.scaffold --dry-run" | Implement S0 before any scaffold work | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 3 | `nx`, `pnpm`, `typescript`, `monorepo` | tech spine | decision | Nx + pnpm + TypeScript primary spine; monorepo, project-graph-aware, cache-aware, generator-heavy | Nx remote caching docs cited | Keep current direction; no deviation | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 4 | `python`, `specialist-lane` | Python scope | decision | Python is a specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic | "Python as a specialist lane only" | Gate Python out of core packages | medium |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 5 | `local-first`, `sqlite`, `postgres`, `storage` | storage topology | decision | Storage starts local-first: local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. Honors append-only immutable tile posture | "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter" | Specify SQLite→PostgreSQL migration as explicit P1 gap | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 6 | `operator-ui`, `alpha-gating` | UI posture | decision | UI scaffolded but non-alpha-gating. rosetta-operator can exist; alpha RC gates are CLI/API, conformance, guard, receipts, replay | "UI is scaffolded, not alpha-gating" | Ensure alpha gates exclude UI dependency | medium |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 7 | `rrp`, `content-model`, `receipt-schema` | receipt schema | decision | RRP content model wins: subjects, claims, digests, policy_refs, nonce, auth, sig — and the signature hashing rule that excludes sig from CID computation | "RRP content model wins over generic receipts" | Adopt RRP schema across all receipt types | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 8 | `guard-decision-token`, `policy-version` | guard token | decision | Guard decision tokens gain structure: policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, constitution_hash placeholder, trace IDs | admission.ts code patch shows full token shape | Implement structured tokens in rosetta-guard | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 9 | `traceability-headers`, `file-level` | provenance | decision | File-level traceability headers required: Purpose Summary, Rosetta Relevance, Governing References in every protocol-sensitive module | check-traceability-headers.ts script | Add to CI gate; SKIP list for components/tests/barrels | high |
| 2026-04-10 | docs/chats/20260410... | Unified Decision 10 | `rock-3111-c`, `pack-filesystem-contract`, `rrp` | norm artifacts | decision | The next normative artifact should be a RRP Pack Filesystem Contract | "The next normative artifact should be a pack filesystem contract" | Author ROCK-3111-C formally | high |
| 2026-04-10 | docs/chats/20260410... | Alpha RC-0 through RC-4 | `mvp-staircase`, `alpha-rc` | build order | decision | MVP staircase: RC-0 (Nx boots, canon/cid/validate exist, TV1 compiles red) → RC-1 (JCS/CID conformance green, receipt schemas green) → RC-2 (Guard denies bad tokens, builtin.echo end-to-end) → RC-3 (code.scaffold --dry-run, CLI/API green) → RC-4 (local CAS + SQLite, rights-scoped retrieval, operator UI stub) | Full 5-stage staircase defined | Use as explicit milestone map | high |
| 2026-04-10 | docs/chats/20260410... | ROCK-3111-C draft | `rock-3111-c`, `pack-contract`, `rrp` | pack spec | requirement | Draft ROCK-3111-C RRP Pack Filesystem Contract v0.1.0: pack root `packs/rrp/`, required files (pack.json, README, CHANGELOG, schemas, SHACL shapes, vocabs, test vectors, examples), required exports, conformance tiers (RRP-Light, RRP-Full, RRP-Auditor), filesystem rules | Full spec with 11 required files | Promote from draft to formal RFC; assign RfcId | high |
| 2026-04-10 | docs/chats/20260410... | admission.ts code patch | `guard`, `admission`, `typescript` | guard code | technology | Code patch for `rosetta-guard/src/admission.ts`: full GuardDecisionToken interface (decision, issued_at, expires_at, policy_version, policy_hash, constitution_hash, chain_height, subject, constraints, sig), admit() function with 9 deny cases, verifyDecisionSignature stub | 130+ line TypeScript module | Review for TC-005 alignment; implement full signature verification | high |
| 2026-04-10 | docs/chats/20260410... | receipt-bundle.ts code patch | `tapestry`, `receipt-bundle`, `rrp` | tapestry code | technology | Code patch for `rosetta-tapestry/src/receipt-bundle.ts`: buildReceiptBundleTapestry() with rrp:tapestry.profile.receipt_bundle profile, roots/members closure, builderVersion | 50+ line TypeScript module | Review against existing tapestry schema in RFCs | medium |
| 2026-04-10 | docs/chats/20260410... | check-traceability-headers.ts | `ci`, `traceability`, `provenance` | CI tooling | technology | Code patch for `tools/scripts/check-traceability-headers.ts`: walks TS/JS/Python files, checks for Purpose Summary / Rosetta Relevance / Governing References headers, skip index.ts/components/__tests__/barrels | 60+ line Node.js script | Add to CI gate immediately | high |
| 2026-04-10 | docs/chats/20260410... | Final reconciled build order | `build-order`, `sequencing` | build sequence | decision | 8-step reconciled build: (1) rosetta-canon/cid + RRP TV1 vectors → (2) receipt/tapestry RRP schemas → (3) rosetta-guard admission + deny-path tests → (4) builtin.echo verified slice → (5) code.scaffold --dry-run → (6) local CAS + SQLite rights-scoped retrieval → (7) scaffold operator UI → (8) adapters, pgvector, OPA, swarm interfaces | "stop debating the cathedral and do this" | Treat as operational sequencing guidance | high |
| 2026-04-10 | docs/chats/20260410... | Staged Federation gap (from alternate run) | `staged-federation`, `omoc` | federation | risk | Alternate run had staged-federation OMOC concept not present in main run. Synthesis did not fully resolve how OMOC lean vs learned debate maps onto staged federation | Not present in unified decisions | Flag as open research question | medium |
| 2026-04-10 | docs/chats/20260410... | Python boundary enforcement | `python-boundary`, `core-vs-specialist` | python scope | risk | No mechanical enforcement of Python boundary. "Specialist lane" is a convention, not a constraint. Python code could creep into constitutional logic via eval harness or embeddings path | "Python as specialist lane only — not core constitutional logic" | Add to pack conformance rules | medium |
| 2026-04-10 | docs/chats/20260410... | OPA/Rego deferred to later phase | `opa`, `policy-as-code`, `deferred` | policy | dependency | Minimal JSON policy bundle MVP; OPA/Rego deferred. OPA live policy updates + policy bundles perfect for later compiler target. No decision yet on when OPA is introduced | "minimal JSON policy bundle now, OPA/Rego later" | Add explicit OPA introduction milestone to backlog | medium |
| 2026-04-10 | docs/chats/20260410... | verifyDecisionSignature stub | `signature`, `stub`, `mvp` | guard security | risk | verifyDecisionSignature() in admission.ts is MVP stub: only checks sig object presence, not actual cryptographic verification. "Naked allows" prevented by presence check but no real sig verification | "MVP stub: require signature object presence to avoid naked allows" | Upgrade to real Ed25519/EdDSA verification before alpha | high |
| 2026-04-10 | docs/chats/20260410... | cryptoNonce() non-standard | `nonce`, `randomness`, `security` | receipt security | risk | cryptoNonce() in receipt-bundle.ts uses `Math.random()` which is not cryptographically secure. Will produce predictable nonces | "nonce_${Math.random().toString(36).slice(2, 12)}" | Replace with crypto.randomBytes() or SubtleCrypto before any security use | high |
| 2026-04-10 | docs/chats/20260410... | Missing JSON Canonicalizer | `jcs`, `rfc8785`, `canonicalizer` | canon technology | dependency | For RRP TV1 spec test: "I'll produce a minimal canonicalizer using Node's built-ins like JSON.stringify for the job. MVP-safe subset, may not fully align with RFC 8785" | "MVP-safe subset, may not fully align with RFC 8785" | Use standards-compliant library (rfc8785 or jcs-ts) for correctness; document MVP concession | high |
| 2026-04-10 | docs/chats/20260410... | Nx executor for header check | `nx`, `executor`, `ci` | nx tooling | technology | Nx executor script suggested for check-traceability-headers but only essential fields shown; full executor schema not produced | "Nx executor script and header checks, I'll stick to essentials" | Write full Nx executor spec for check-traceability-headers | low |
| 2026-04-10 | docs/chats/20260410... | Local SQLite vs Postgres gap | `sqlite`, `postgres`, `migration` | storage topology | risk | Decision 5 says "Postgres/pgvector becomes an adapter" but no migration path specified. Bootstrap currently uses SQLite; NOT LAME specifies PostgreSQL canonical. TC-006 may need explicit SQLite→PostgreSQL migration scope | "Storage starts local-first... Postgres/pgvector becomes an adapter" | Add explicit migration milestone to backlog; avoid hard-coding SQLite assumptions | high |
| 2026-04-10 | docs/chats/20260410... | UI stub vs alpha-gating ambiguity | `operator-ui`, `alpha-rc` | UI scope | risk | "operator UI stub can inspect runs, but is still non-gating" — stub definition ambiguous. What makes a UI "stub" vs feature-complete enough to gate? Risk of scope creep via incremental UI work | "operator UI stub can inspect runs, but is still non-gating" | Define explicit UI stub criteria; add to RC-4 definition | medium |
| 2026-04-10 | docs/chats/20260410... | RRP conformance tiers (RRP-Light/Full/Auditor) | `rrp-conformance`, `tiers` | conformance | requirement | ROCK-3111-C defines three conformance tiers but the criteria for each tier are not specified in this document | "Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor" | Define tier criteria in formal ROCK-3111-C | medium |
| 2026-04-10 | docs/chats/20260410... | Builtin.echo is named but not defined | `builtin-echo`, `tool` | tool definition | open-question | "builtin.echo with full guard/receipt/tapestry verification" — the actual interface/behavior of builtin.echo is not specified. What does echo do? What is its input/output contract? | "Slice S0: builtin.echo with full guard/receipt/tapestry verification" | Define builtin.echo interface in next RFC or tool spec | medium |

## Components And Technologies

- Nx (monorepo, remote cache, affected execution, executors)
- pnpm (workspace package manager)
- TypeScript (primary implementation language)
- Python (specialist: eval harnesses, embeddings, OCR/ASR, graph)
- Node.js (CLI tooling, scripts)
- SQLite (local CAS index — MVP phase)
- PostgreSQL/pgvector (target adapter, not MVP prerequisite)
- OPA/Rego (future policy-as-code target)
- JCS / RFC 8785 (JSON Canonicalization — MVP stub used)
- SHACL (receipt and tapestry shape validation)
- Ed25519/EdDSA (guard decision token signatures — stubbed)

## Conceptual Claims

- MVP alpha is proven by constitutional RRP loop, not by developer ergonomics or UI features
- Two-step slice (S0: constitutional proof → S1: scaffold tool) prevents premature closure on developer-facing surface
- Nx/pnpm/TS spine and RRP constitutional rigor are complementary, not conflicting — scaffold-forge energy bolted to bedrock
- Local CAS + SQLite is the correct MVP storage posture; Postgres is an adapter to be introduced after local stability
- RRP content model (subjects/claims/digests/policy_refs) is sharper than generic receipt schemas
- Policy-as-code (OPA) is correct long-term but wrong as a day-one dependency
- Traceability headers are machine-checkable provenance that keep governance visible without bloating runtime

## Dependencies And Sequencing

1. `rosetta-canon` + `rosetta-cid` must land before any receipt or guard work (RC-0 prerequisite)
2. RRP TV1 + tamper-negative test vectors needed for conformance testing (RC-0)
3. `rosetta.receipt` and `rosetta.tapestry` RRP schemas before guard admission tests (RC-1)
4. `builtin.echo` S0 verified slice before `code.scaffold` S1 (RC-2 before RC-3)
5. Local CAS + SQLite before Postgres adapter (RC-4 before subsequent phases)
6. OPA/Rego deferred past alpha RC; introduce as explicit P1 milestone
7. check-traceability-headers.ts in CI before any new module lands

## Contradictions Or Supersession

- **Contradiction:** Alternate run challenged scaffold-first on the grounds that "developer delight" flavor was premature; synthesis resolved by adopting RRP constitutional center but preserving Nx/TS/React scaffold posture. Both runs' instincts were partially right.
- **Supersession:** This document supersedes the two antecedent PRD blueprint runs (not named but referenced). The 10 unified decisions are the binding synthesis.
- **Partial supersession:** Earlier generic receipt/tapestry schemas from prior documents are sharpened by RRP content model (subjects/claims/digests/policy_refs).
- **Gap:** Two runs had different retrieval windows (alternate run had narrower scope). Synthesis acknowledged broader corpus supports TS/Nx posture, but this means some decisions are based on corpus visibility assumptions.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRD-001: Author ROCK-3111-C RRP Pack Filesystem Contract formally | spec | `docs/intake/issue-drafts/prd-001-rock-3111-c-rrp-pack-contract.md` | `rrp`, `pack-contract`, `spec` | — | Unified Decision 10 + full draft spec in source; currently a chat-exported draft only |
| PRD-002: Local SQLite → PostgreSQL migration path needs explicit spec | architecture | `docs/intake/issue-drafts/prd-002-sqlite-postgres-migration-path.md` | `storage`, `sqlite`, `postgres`, `migration` | — | Decision 5: "Postgres/pgvector becomes an adapter"; Bootstrap uses SQLite; NOT LAME says PostgreSQL canonical; no migration spec exists |
| PRD-003: Guard decision token signature verification is MVP stub | security | `docs/intake/issue-drafts/prd-003-guard-signature-verification-mvp-stub.md` | `guard`, `security`, `signature`, `mvp` | TC-005 (guard admission) | admission.ts verifyDecisionSignature() only checks object presence; no real cryptographic verification |
| PRD-004: cryptoNonce() uses Math.random() — not cryptographically secure | security | `docs/intake/issue-drafts/prd-004-cryptononce-weak-randomness.md` | `security`, `nonce`, `random` | — | receipt-bundle.ts uses Math.random() for nonce generation |
| PRD-005: builtin.echo interface undefined — S0 slice needs contract | spec | `docs/intake/issue-drafts/prd-005-builtin-echo-interface-undefined.md` | `builtin-echo`, `tool-contract`, `spec` | TC-005 | S0 vertical slice named but no input/output contract defined |
| PRD-006: JCS canonicalizer MVP stub vs RFC 8785 full compliance gap | standards | `docs/intake/issue-drafts/prd-006-jcs-canonicalizer-mvp-gap.md` | `jcs`, `rfc8785`, `canonicalizer`, `standards` | RC-1 (JCS/CID conformance) | Source explicitly says MVP-safe subset "may not fully align with RFC 8785" |

## Project Board Suggestions

- Area: `docs-intelligence`
- Cycle: `batch-3-active`
- Status: `ready-for-review`
- Blocked by: None — this doc is unprocessed
- Parallelization notes: No other active cycle processing this doc

## Open Questions

- What is the exact interface/contract of builtin.echo for S0 slice?
- What are the criteria for RRP-Light vs RRP-Full vs RRP-Auditor conformance tiers?
- When exactly is OPA/Rego introduced — what alpha milestone triggers it?
- What constitutes a "UI stub" vs alpha-gating feature-complete UI — need explicit criteria for RC-4?
- How is staged-federation OMOC (from alternate run) resolved vs the lean/learned debate?
- What is the migration path from SQLite to PostgreSQL — explicit P1 task or later?
