# Docs Intelligence Extraction — Entif and Rosetta PRDs Revisions and Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: "Entif and Rosetta PRDs — Revisions and Synthesis (Extended Thinking)"
- Date evidence: 2026-04-10 (creation), 2026-04-10 10:56:16 AM (response timestamp)
- Authority tier: chat export — extended research run by GPT-4.1 pro, cross-referencing multiple prior docs including two competing PRD blueprints, ROCK specs, and Entif secure architecture
- Freshness: 2026-04-10 — one day after NOT LAME PRD; the "revisions and synthesis" framing means this is a secondary synthesis, not a primary spec
- Word count: ~2,500
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intysics intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A "round two" extended-research synthesis between two competing PRD build-out approaches. The narrower alternate run (RRP-conformance-heavy, receipt-verifier-spine-focused) is merged with the scaffold-forge run (TS/Nx ergonomics, dry-run loop, operator UI scaffold). Output is a reconciled build order (8-step alpha RC staircase), a new ROCK-3111-C draftspec for the RRP Pack Filesystem Contract, and three code patches (guard admission, receipt-bundle tapestry, traceability header checker). The doc is notable for its explicit cross-run conflict resolution (what each run got right/wrong about the other) and for producing the first concrete RRP pack filesystem contract spec anywhere in the corpus. Much of the content is a follow-on to the 20260410 PRD Blueprint not captured in extraction (leakage/absence noted — see Finding 12 below).

## Goals And Intent

- Synthesize two competing PRD perspectives into one binding doctrine
- Resolve three specific tensions between scaffold-forge and RRP-hardlined runs
- Produce concrete new work product: merged build staircase, ROCK-3111-C draftspec, code patches
- Validate Nx/pnpm/TypeScript spine choice while adopting RRP constitutional center
- Push back on alternate run's "missing baseline" conclusion re: TS/Nx and file-header discipline

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 1 | `alpha-rc`, `rrp`, `constitutional` | MVP alpha is RRP-first, not app-first | decision | The binding doctrine declares MVP alpha must prove deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, and replay/verification as the foundational invariant before any developer-ergonomic tooling. This means `code.scaffold --dry-run` is slice 1, not slice 0. Guard/receipt/tapestry verification loop is the constitutionally correct slice zero. | Gate app-level features behind RRP conformance green; do not conflate scaffold ergonomics with constitutional proof | high |
| 2026-04-10 | same | "Unified decisions" item 2 | `alpha-rc`, `vertical-slice`, `builtin-echo` | Two-step vertical slice: builtin.echo first, then code.scaffold | decision | Slice S0: `builtin.echo` with full guard/receipt/tapestry verification. Slice S1: `code.scaffold --dry-run` using the same constitutional loop. The alternate run correctly identified that the smallest honest constitutional proof is a guarded non-side-effect toolcall, not a scaffold generator. | Implement `builtin.echo` as the documented slice zero, with full RRP receipt bundle verification end-to-end | high |
| 2026-04-10 | same | "Unified decisions" item 3 | `nx`, `typescript`, `tooling` | Nx + pnpm + TypeScript spine confirmed | decision | The repo stays monorepo, project-graph-aware, cache-aware, and generator-heavy. Python stays specialist-only (evals, embeddings, OCR/ASR, graph experiments). This validates the scaffold-forge run's tooling posture. The GPT cites Nx official docs on cacheable deterministic tasks, affected execution, and remote caching. | Keep current tooling direction; add task-graph-level caching to Nx executors | high |
| 2026-04-10 | same | "Unified decisions" item 4 | `python`, `specialist-lane` | Python as specialist lane only; not core constitutional logic | decision | Eval harnesses, embeddings, OCR/ASR, graph experimentation go to Python. Core constitutional logic stays TypeScript. This is a clean separation of concerns — Python never touches receipt schemas, guard decision tokens, or RRP conformance. | Add `python-only` package annotation and explicit firewall in root README.md | high |
| 2026-04-10 | same | "Unified decisions" item 5 | `sqlite`, `postgres`, `local-first` | Storage starts local-first: SQLite + local CAS now, Postgres/pgvector as adapter later | decision | Local CAS + SQLite index now. Postgres/pgvector is an adapter, not a prerequisite for alpha. This honors Rosetta's append-only immutable tile posture while preventing alpha contamination from indexing ambitions. A P1 task later upgrades to Postgres. | Explicitly mark Postgres/pgvector as P1 in the project board; SQLite as alpha storage for RC-3 | high |
| 2026-04-10 | same | "Unified decisions" item 6 | `operator-ui`, `alpha-gating` | UI scaffolded but not alpha-gating | decision | `rosetta-operator` can exist but does not gate alpha. Alpha gates are CLI/API, conformance, guard, receipts, and replay. This corrects the scaffold-forge run's premature UI escalation. | Mark operator UI as RC-4 or later; do not wire it into any gate that blocks alpha RC | high |
| 2026-04-10 | same | "Unified decisions" item 7 | `rrp`, `receipt-schema` | RRP content model wins: subjects/claims/digests/policy_refs/nonce/auth/sig | decision | The RRP content model (subjects, claims, digests, policy_refs, nonce, auth, sig plus the signature hashing rule that excludes sig from CID computation) becomes the standard payload shape. Generic loosely-typed receipts from scaffold-forge run are superseded. | Update receipt schema to use RRP content model; exclude sig from CID computation per RRP spec | high |
| 2026-04-10 | same | "Unified decisions" item 8 | `guard-token`, `decision-token` | Guard decision tokens gain more structure | decision | Guard decision tokens now include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, and later-ready placeholders for constitution_hash or trace IDs. Extendable without schema renegotiation. | Implement structured GuardDecisionToken interface in `rosetta-guard`; add policy_version and policy_hash fields to token shape | high |
| 2026-04-10 | same | "Unified decisions" item 9 | `traceability`, `file-headers` | File-level traceability headers validated and confirmed | decision | The alternate run validates the file-level traceability header discipline rather than weakening it. Machine-checkable top-of-file provenance (Purpose Summary, Rosetta Relevance, Governing References) is confirmed as a standing requirement. | Enforce header checks in CI via `check-traceability-headers.ts`; add to pre-commit | high |
| 2026-04-10 | same | "Unified decisions" item 10 | `rock-3111-c`, `pack-contract` | Next normative artifact must be RRP pack filesystem contract | decision | "The next normative artifact should be a pack filesystem contract." The alternate run practically asks for it. The synthesized result produced the ROCK-3111-C draftspec (see Finding 11). | Prioritize the pack filesystem contract spec as the next ROCK deliverable | high |
| 2026-04-10 | same | "New work product 2: ROCK-3111-C draft" | `rock-3111-c`, `pack-contract`, `filesystem-contract` | ROCK-3111-C RRP Pack Filesystem Contract v0.1.0 drafted | issue-candidate | The first concrete RRP pack filesystem contract spec appears here — defining pack root structure, required files, required pack.json fields, required exports, conformance tiers (RRP-Light, RRP-Full, RRP-Auditor), and filesystem rules. This spec bridges "we have RRP ideas" and "the repo knows exactly how to lay them down." Key gaps that need规格化: test vectors require at least one positive and one tamper-negative case; bundle claiming "verified" must include a receipt-bundle tapestry profile export. | Create formal ROCK-3111-C spec file; review against existing ROCK-3111-A/B for completeness; add to repo as `ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.1.0.md` | high |
| 2026-04-10 | same | "New work product 3: code patches" | `rosetta-guard`, `guard-admission` | Guard admission TypeScript implementation provided | technology | Full `admit()` function with GuardDecisionToken verification, subject/tool alignment checks, dry-run constraint checking, expiry enforcement, and deny-by-default semantics. Signature verification stubbed behind `verifyDecisionSignature()` as a MUST-IMPLEMENT placeholder. The deny path is clean and exhaustive. | Implement `verifyDecisionSignature()` with proper canonicalization+verification before merging; add exhaustive deny-path test coverage | high |
| 2026-04-10 | same | "New work product 3: code patches" | `rosetta-tapestry`, `receipt-bundle` | Receipt-bundle tapestry TypeScript implementation provided | technology | `buildReceiptBundleTapestry()` produces a `rosetta.tapestry` with profile `rrp:tapestry.profile.receipt_bundle`, root receipts, member closure, builder version, and closure_policy. Nonce generated via `cryptoNonce()` stub (Math.random — NOT cryptographically safe for MVP). | Replace `cryptoNonce()` with `crypto.randomBytes()` or equivalent before merge; add deterministic/nonce test vectors | high |
| 2026-04-10 | same | "New work product 3: code patches" | `ci`, `traceability` | Traceability header checker script provided | technology | `check-traceability-headers.ts` walks file tree, checks for Purpose Summary, Rosetta Relevance, Governing References in first 1200 chars, skips index files, barrels, and `__tests__/simple/`. Exits 1 on failure. | Add this script to CI and pre-commit hooks; document the three required header labels | high |
| 2026-04-10 | same | "Unified decisions" item 10 | `open-policy-agent`, `opa`, `policy-bundle` | Minimal JSON policy bundle now; OPA/Rego later (not day-one) | decision | OPA decoupling of decision-making from enforcement and live policy bundle updates is the right long-term direction, but not a day-one dependency. Minimal JSON policy bundle MVP with OPA as a P2 compiler target. Cites Entif Secure Architecture doc for policy-as-code requirements. | Mark OPA integration as P2; make JSON policy bundle the P1 alpha approach | high |
| 2026-04-10 | same | "Final reconciled build order" | `alpha-rc`, `build-order`, `dependency-order` | 8-step alpha RC build order established | decision | Land (1) roseta-canon, rosetta-cid, RRP TV1/tamper vectors; (2) rosetta.receipt and rosetta.tapestry RRP schemas; (3) rosetta-guard admission and deny-path tests; (4) builtin.echo verified slice; (5) code.scaffold --dry-run; (6) local CAS + SQLite rights-scoped retrieval; (7) scaffold operator UI and richer context assembly; (8) adapters, pgvector, OPA compiler, swarm-facing reserved interfaces. Cleanest merger of both runs. | Adopt this as the authoritative alpha build order; update project board with RC-0 through RC-4 gates | high |
| 2026-04-10 | same | "Unified decisions" — pushback on alternate run | `nx`, `typescript`, `workspace`, `baseline` | Pushback: TS/Nx/React posture not weakened by alternate run's narrow retrieval | ablation | The alternate run's "missing baseline" notes are retrieval-scope truth, not architectural truth. The broader corpus supports TS/Nx-first build, file-header discipline, and Nx remote caching. The GPT explicitly pushes back on accepting that criticism. | Do not weaken the TS/Nx workspace ergonomics direction based on the alternate run's narrower retrieval context | high |
| 2026-04-10 | same | "Unified decisions" items 1-10 | `not-lame-prd`, `convergence` | NOT LAME PRD decisions converge with extended research synthesis | supersession | Extended research largely converges with NOT LAME PRD positions on memory sovereignty (5 layers), write-admission gate, PostgreSQL-first (as P1), LangGraph workflow-layer only. Points of extension: 8-step alpha staircase (more granular than NOT LAME's 19-ticket roadmap), explicit RRP pack contract specification. | Integrate ROCK-3111-C and the 8-step build order into the NOT LAME PRD as an implementation refinement; supersede where they add granularity | medium |

## Components And Technologies

- `rosetta-guard` — Guard admission module (admit, GuardDecisionToken, AdmissionInput, AdmissionResult types)
- `rosetta-tapestry` — Receipt-bundle tapestry builder (buildReceiptBundleTapestry)
- `check-traceability-headers.ts` — CI tool for file-level provenance header enforcement
- `builtin.echo` — slice-zero vertical slice (guarded non-side-effect toolcall)
- `code.scaffold --dry-run` — slice-one vertical slice
- RRP content model: subjects, claims, digests, policy_refs, nonce, auth, sig
- JCS (JSON Canonicalization Scheme) — MVP subset via Node built-ins; full RFC 8785 compliance deferred
- Open Policy Agent (OPA) — P2 target for policy-as-code bundle compilation
- Nx/pnpm monorepo with project graph, cacheable tasks, affected execution, remote cache
- SQLite + local CAS (alpha storage), PostgreSQL/pgvector (P1 upgrade)

## Conceptual Claims

- MVP alpha is constitutionally proven through RRP conformance, not through developer ergonomics. App features cannot be the proof of the constitutional core.
- The smallest honest slice-zero proof is a guarded `builtin.echo` with full receipt-bundle verification. Everything else (scaffold generators, dry-run loops, UI) is slice-one or later.
- RRP pack filesystem contract is the missing bridge between doc-level ideas and repo-level action — it must be the next normative artifact.
- Python is a specialist lane; TypeScript is the constitutional spine. These lanes must not cross.
- Local-first SQLite storage with no gating on Postgres does not violate Rosetta's append-only philosophy — it defers a capacity adapter until the system is proven.
- File-level traceability headers in protocol-sensitive modules are validated by both competing PRD runs, making them a standing constraint, not a suggestion.

## Dependencies And Sequencing

- RC-0: Nx workspace boots; canonicalizer, CID, validate exist; TV1+tamper-negative tests compile red
- RC-1: JCS/CID deterministic conformance green; rosetta.receipt schema green; rosetta.tapestry schema green
- RC-2: Guard denies missing/expired/mismatched tokens; builtin.echo passes end-to-end; receipt bundle verifies
- RC-3: code.scaffold --dry-run reuses constitutional loop; CLI/API both green; local CAS + SQLite stable
- RC-4: operator UI scaffolded (non-gating); rights-scoped retrieval enforced
- P1 (post-alpha): Postgres/pgvector upgrade; OPA policy compiler
- External dependencies: `json-canonicalize` npm package (full RFC 8785 compliance as replacement for Node built-in MVP subset)

## Contradictions Or Supersession

- **Supersession**: This doc does not supersede NOT LAME PRD but adds granular implementation sequencing (8-step staircase vs 19-ticket roadmap). Treat as implementation refinement layered on top of NOT LAME PRD decisions.
- **Supersession**: The scaffold-forge run (prior GPT answer) had `code.scaffold --dry-run` as slice zero; this doc correctly identifies that as slice one after the RRP-hardlined run's challenge. The correct slice zero is `builtin.echo` with comprehensive receipt bundle verification.
- **Partial contradiction**: The alternate RRP-run suggested "missing baseline" weakens the TS/Nx/workspace ergonomics direction. This doc's GPT correctly rejects that conclusion as a retrieval-scope artifact, not an architectural one.
- **Known absence**: The primary PRD blueprint this doc is revising (20260410 PRD Blueprint for Rosetta and Entif) appears in the PRIORITY_QUEUE as "to process" but has not been formally extracted. The specific "alternate run" references in this doc reference an LLM-generated alternative run within the same chat context, not a separate processed document. This extraction may overlap with the (unprocessed) 20260410 PRD Blueprint if it is ever formally ingested — watch for concept/conclusion duplication.

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRD-REV-001: Deterministic canonicalization test vectors must include tamper-negative cases | issue-candidate | `docs/intake/issue-drafts/PRD-REV-001-rp-canonicalization-tamper-vectors.md` | `rrp`, `test-vectors`, `conformance`, `alpha-rc` | | RRP spec requires TV1 + at least one tamper-negative test per test vector set; doc's ROCK-3111-C draft specifies this but no existing test vector set in repo implements it |
| PRD-REV-002: cryptoNonce() uses Math.random() — not cryptographically safe | issue-candidate | `docs/intake/issue-drafts/PRD-REV-002-crypto-nonce-math-random.md` | `rosetta-tapestry`, `security`, `receipts` | | Receipt-bundle builder provided in the doc uses `Math.random()` for nonce generation, which is not cryptographically safe; must be replaced before any production use |
| PRD-REV-003: verifyDecisionSignature() is stubbed — guard signature verification unimplemented | issue-candidate | `docs/intake/issue-drafts/PRD-REV-003-guard-signature-verification-stub.md` | `rosetta-guard`, `security`, `constitutional` | PRD-REV-001 | Guard admission module uses a stub `verifyDecisionSignature()` that only checks sig field presence, not actual signature validity; fail-closed requires full implementation before alpha |
| PRD-REV-004: RRP Pack Filesystem Contract needs formalization as ROCK-3111-C | issue-candidate | `docs/intake/issue-drafts/PRD-REV-004-rock-3111-c-pack-contract-formalization.md` | `rock`, `pack-contract`, `rrp`, `alpha-rc` | | Doc's v0.1.0 draftspec needs to become a formal `ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.1.0.md` in the repo with full review cycles |
| PRD-REV-005: check-traceability-headers.ts missing from CI pipeline | issue-candidate | `docs/intake/issue-drafts/PRD-REV-005-traceability-headers-ci.md` | `ci`, `traceability`, `developer-experience` | | Script provided in the doc's code patches is not yet implemented in the repo — needs CI integration and pre-commit hook enrollment |
| PRD-REV-006: 20260410 PRD Blueprint may overlap with this doc's content | issue-candidate | `docs/intake/issue-drafts/PRD-REV-006-prd-blueprint-duplicate-extraction-risk.md` | `docs-intelligence`, `dedup`, `alpha-rc` | | The primary PRD blueprint referenced in this synthesis chat has not been formally extracted yet; this doc is a secondary synthesis and may share/conflate concepts from that primary doc — formal extraction of the 20260410 PRD Blueprint is needed to prevent concept duplication in the knowledge graph |

## Project Board Suggestions

- Area: alpha-rc / text-core
- Cycle: TC-007-adjacent (slice sequencing implications for promotion state machine)
- Status: concrete implementations available
- Blocked by: NONE (implementation code patches are provided; no architectural blockers)
- Parallelization notes: The three code patches (guard admission, receipt-bundle tapestry, header checker) can be implemented in parallel by separate agents; RO lock on their respective packages. ROCK-3111-C formalization should follow receipt schema finalization if NOT LAME PRD is in scope.

## Open Questions

- Is the 20260410 PRD Blueprint (`docs/chats/20260410 - PRD Blueprint for Rosetta and Entif - ChatGPT - Deep Research Report.md`) already covered by a prior extraction, or should it be treated as a separate document requiring its own extraction pass given that this extended-thinking chat references it as primary input?
- Should the RRP pack contract spec (ROCK-3111-C) be a prerequisite for TC-005 (Promotion state machine) or TC-006/TC-007, given that it defines the pack conformance contract that promotion would validate against?
- Does the `builtin.echo` vertical slice already exist in the repo codebase, or is this doc's code the first spec for it?
