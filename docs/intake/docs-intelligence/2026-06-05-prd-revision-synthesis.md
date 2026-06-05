# Docs Intelligence Extraction — 20260410 PRD Revision Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking
- Date evidence: 2026/4/10 9:39:31 (created), 2026/4/10 11:02:59 (updated)
- Authority tier: chat-gpt session, pro-tier deep research mode
- Freshness: current as of session date; referenced docs include Rosetta v3.0.0 Core Spine, ROCK-31XX RRP specs, Entif Secure Architecture, prior scaffold-forge blueprint
- Word count: ~1,800 words prose + code patches
- Extractor: heartbeat:1780626737
- Extraction date: 2026-06-05

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ChatGPT Pro-tier deep research session that synthesizes two competing PRD runs for the Entif/Rosetta MVP build. Run 1 favored Nx/TS/React workspace ergonomics, developer-friendly dry-run loops, and broader toolchain posture. Run 2 (RRP-conformance-centric) sharpened the constitutional center around deterministic provenance, CID stability, signed receipts, and receipt-bundle tapestries. The synthesis merges both into a 10-decision doctrine and 8-step Alpha RC staircase.

## Goals And Intent

- Reconcile two alternate PRD blueprints that took different angles on the same build problem
- Produce binding merged decisions for MVP sequencing
- Generate concrete work products: merged MVP staircase, ROCK-3111-C draft, code patches, final reconciled build order

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Deterministic canonicalization (JCS) | "MVP alpha is RRP-first" + canon, CID, validate existence | rosetta-canon | P0 | CID stability is the foundational invariant |
| RRP receipt schema (`subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig`) | "RRP content model wins" decision + code patches | rosetta.receipt | P0 | Must be exact; generic receipts rejected |
| Guard admission with decision tokens | `admit()` function in code patch | rosetta-guard | P0 | Fail-closed; signature stubbed MVP |
| Receipt-bundle tapestry profile | `buildReceiptBundleTapestry()` in code patch | rosetta.tapestry | P0 | `rrp:tapestry.profile.receipt_bundle` |
| Nx workspace with pnpm | "Keep Nx + pnpm + TypeScript as primary spine" | nx workspace | P1 | |
| Python as specialist lane only | "Python as specialist lane only" | eval-harness, embeddings, OCR | P2 | Not core constitutional logic |
| Local CAS + SQLite index (MVP) | "Storage starts local-first" | rosetta-storage | P1 | Postgres/pgvector is later adapter |
| File-level traceability headers | "File-level traceability headers stay" + check-traceability-headers.ts script | ci | P1 | Machine-checkable provenance |
| Operator UI scaffolded non-gating | "UI is scaffolded, not alpha-gating" | rosetta-operator | P2 | alpha gates are CLI/API + conformance |
| Minimal JSON policy bundle now, OPA later | "minimal JSON policy bundle now, OPA/Rego later" | rosetta-guard | P1 | |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-10 | docs/chats/20260410... | Two-run synthesis | rrp, rrp-first, scaffold-forge, nx, typescript | mvp-doctrine | decision | MVP alpha is RRP-first, not app-first. Deterministic canonicalization + CID stability + signed receipts + receipt-bundle tapestries + guard admission + replay/verification constitute the minimal honest constitutional proof | "MVP alpha is RRP-first, not app-first" | Adopt RRP-conformance as constitutional center; app features are post-alpha | high |
| 2026-04-10 | docs/chats/20260410... | Two-step vertical slice | builtin-echo, dry-run, slice-zero | vertical-slice | decision | Slice S0: `builtin.echo` with full guard/receipt/tapestry verification. Slice S1: `code.scaffold --dry-run` using same constitutional loop. This supersedes the earlier scaffold-first approach which placed `code.scaffold` first | "Slice S0: `builtin.echo` with full guard/receipt/tapestry verification. Slice S1: `code.scaffold --dry-run`" | Make `builtin.echo` the first demonstrable slice, not `code.scaffold` | high |
| 2026-04-10 | docs/chats/20260410... | Nx + pnpm + TypeScript spine | nx, pnpm, typescript, monorepo | build-toolchain | decision | Nx + pnpm + TypeScript is the primary build spine. Remote caching, affected execution, task inputs/outputs are the target ergonomics. Python remains a specialist lane for eval harnesses, embeddings, OCR, graph experimentation | "Keep Nx + pnpm + TypeScript as the primary spine" | Keep existing TS-first monorepo structure; add Nx executors | high |
| 2026-04-10 | docs/chats/20260410... | Local CAS + SQLite MVP | sqlite, local-cas, postgres-later | storage | decision | Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. This honors append-only immutable tile posture while letting indexing ambitions land without contaminating alpha | "Storage starts local-first. Local CAS + SQLite index now" | Implement local CAS with SQLite rights-scoped index as MVP storage | high |
| 2026-04-10 | docs/chats/20260410... | Operator UI non-gating | operator-ui, cli-api, alpha-gates | ui | decision | `rosetta-operator` can exist as scaffold, but alpha RC gates are CLI/API + conformance + guard + receipts + replay. UI does not gate alpha | "UI is scaffolded, not alpha-gating" | Separate operator UI from alpha gate criteria | medium |
| 2026-04-10 | docs/chats/20260410... | RRP content model | rrp-content-model, subjects-claims-digests, sig-exclusion | receipt-schema | decision | RRP content model wins: `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig`, plus signature hashing rule that excludes `sig` from CID computation and signs the CID or stable multihash commitment | "RRP content model wins over generic receipts" | Implement exact RRP receipt schema; reject generic receipt variants | high |
| 2026-04-10 | docs/chats/20260410... | Guard decision token structure | guard-decision-token, policy-hash, expiry, constraints | guard | decision | Guard decision tokens gain more structure: `policy_version`, `policy_hash`, short-lived expiry, subject/tool references, resource caps, constitution_hash placeholder, trace IDs. Include `constraints.dry_run_only` | "Guard decision tokens gain more structure" | Add all listed fields to GuardDecisionToken interface | high |
| 2026-04-10 | docs/chats/20260410... | File-level traceability headers | traceability-headers, ci, header-checks | provenance | decision | File-level traceability headers stay as machine-checkable top-of-file provenance markers. Tool script `tools/scripts/check-traceability-headers.ts` provided | "File-level traceability headers stay" | Integrate check-traceability-headers.ts into CI | medium |
| 2026-04-10 | docs/chats/20260410... | JSON policy bundle now, OPA later | opa, rego, policy-as-code, minimal-json | guard | decision | Minimal JSON policy bundle now; OPA/Rego is a later compiler target. OPA decoupling of decision-making from enforcement + live policy bundle updates fits the roadmap, not day-one dependency | "minimal JSON policy bundle now, OPA/Rego later" | Start with minimal JSON policy; plan OPA migration as P2 | medium |
| 2026-04-10 | docs/chats/20260410... | Alpha RC-0 through RC-4 staircase | alpha-rc-0, alpha-rc-1, alpha-rc-2, alpha-rc-3, alpha-rc-4 | mvp-staircase | requirement | 8-step Alpha RC staircase defined: RC-0 (Nx workspace, canon/cid/validate, TV1 compile red), RC-1 (JCS/CID conformance green, receipt schema green, tapestry schema green), RC-2 (guard denies, builtin.echo passes, bundle verifies), RC-3 (code.scaffold dry-run, no side effects, CLI/API green), RC-4 (local CAS + SQLite, rights-scoped retrieval, operator UI stub non-gating) | "Alpha RC-0 through RC-4" staircase | Define 8-step staircase as binding MVP gate criteria | high |
| 2026-04-10 | docs/chats/20260410... | ROCK-3111-C draft | rock-3111-c, pack-filesystem-contract, rrp-pack | spec | decision | New normative artifact: ROCK-3111-C draft RRP Pack Filesystem Contract. Defines pack root structure, required files, required pack.json fields, required exports, conformance tiers, filesystem rules | "ROCK-3111-C draft" section | Author ROCK-3111-C and land as formal spec | high |
| 2026-04-10 | docs/chats/20260410... | Code patches | admission-ts, receipt-bundle-ts, check-traceability-headers | code-patches | technology | Three concrete code patches provided: `packages/rosetta-guard/src/admission.ts` (admit function with GuardDecisionToken), `packages/rosetta-tapestry/src/receipt-bundle.ts` (buildReceiptBundleTapestry), `tools/scripts/check-traceability-headers.ts` (file header CI check) | "New work product 3: code patches" | Implement these patches as first code artifacts | high |
| 2026-04-10 | docs/chats/20260410... | Final reconciled build order | build-order, cathedral-stop, rrp-first | build-sequence | decision | Final build order: (1) land rosetta-canon/cid + RRP TV1/tamper vectors, (2) land receipt + tapestry RRP schemas, (3) land rosetta-guard admission + deny-path tests, (4) ship builtin.echo verified slice, (5) ship code.scaffold --dry-run, (6) add local CAS + SQLite rights-scoped retrieval, (7) scaffold operator UI, (8) start adapters, pgvector, OPA compiler, swarm-facing interfaces | "Final reconciled build order" | Adopt as binding 8-step build sequence | high |
| 2026-04-10 | docs/chats/20260410... | Push back on "missing baseline" | retrieval-scope, corpus-support, nx-posture | ablation | contradiction | The "missing baseline" notes in alternate run are retrieval-scope truth, not architectural truth. Broader corpus still supports TS/Nx/React posture and file-header discipline. Nx docs confirm cacheable deterministic tasks, affected execution, remote caching are target ergonomics | "retrieval-scope truth vs architectural truth" | Reject the alternate run's down-ranking of Nx/TS/React posture | medium |
| 2026-04-10 | docs/chats/20260410... | Two-run comparison | run-1-wider, run-2-sharper, merge-strategy | synthesis | dependency | Run 1 (scaffold-forge) = wider, Entif-operational: TS/Nx ergonomics, workspace shape, receipts-bearing CI, file-level traceability, dry-run loop, visible operator surface. Run 2 (RRP-conformance) = sharper, constitutionally harder: deterministic provenance substrate, RRP conformance vectors, exacting first cut on guard/receipt/verifier loop. Synthesis: merge Run 1's ergonomics with Run 2's RRP constitutional center | "The two runs are not enemies" | Use two-run synthesis pattern for future PRD conflicts | medium |

## Components And Technologies

- Nx workspace + pnpm (monorepo, project graph-aware, cache-aware)
- TypeScript primary spine
- Python specialist lane (eval harnesses, embeddings, OCR/ASR, graph experimentation)
- Local CAS + SQLite index (MVP); Postgres/pgvector later
- JCS (JSON Canonicalization) for CID stability
- SHACL for receipt and tapestry shape validation
- OPA/Rego as future policy compiler target
- `builtin.echo` as first vertical slice (not `code.scaffold`)
- Operator UI scaffolded but non-alpha-gating

## Conceptual Claims

- RRP-conformance is the constitutional center, not app ergonomics
- `builtin.echo` vertical slice is slice zero; `code.scaffold --dry-run` is slice one
- CID stability requires JCS (not raw `JSON.stringify`)
- RRP receipt schema (`subjects`, `claims`, `digests`, `policy_refs`) supersedes generic receipt schema
- Guard decision tokens must include `policy_version`, `policy_hash`, expiry, subject/tool alignment
- Python in MVP is eval/embeddings only; not core constitutional logic
- Operator UI does not gate alpha; CLI/API + conformance are the alpha gates

## Dependencies And Sequencing

- Build order is strict: canon/cid → receipt/tapestry schemas → guard admission → builtin.echo → code.scaffold → local CAS/SQLite → UI scaffold → adapters/pgvector/OPA
- `builtin.echo` must pass before `code.scaffold --dry-run` (slicing rule)
- JCS must be correct before CID stability can be verified
- Guard admission must be green before any tool execution is allowed

## Contradictions Or Supersession

- Run 1 (scaffold-forge) placed `code.scaffold` too early; superseded by slice-zero `builtin.echo`
- Run 1's generic receipt schema superseded by exact RRP content model
- Run 1's "missing baseline" framing for Nx/TS posture rejected as retrieval-scope artifact, not architectural truth
- Run 2's narrower retrieval window down-ranked Nx/TS/React posture incorrectly; synthesis restores it

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PDR-001: Adopt 8-step Alpha RC staircase as binding MVP gate criteria | implementation | `docs/intake/issue-drafts/pdr-001-alpha-rc-staircase.md` | mvp, alpha-rc, staircase | — | Alpha RC-0 through RC-4 defined in synthesis; currently no formal acceptance criteria for MVP gate |
| PDR-002: Author and land ROCK-3111-C RRP Pack Filesystem Contract v0.1.0 | spec | `docs/intake/issue-drafts/pdr-002-rock-3111-c-pack-filesystem-contract.md` | spec, rrp, rock-3111-c, pack | — | "The next normative artifact should be a pack filesystem contract" — no formal spec yet |
| PDR-003: Implement RRP exact receipt schema (`subjects`, `claims`, `digests`, `policy_refs`) in rosetta.receipt | implementation | `docs/intake/issue-drafts/pdr-003-rrp-exact-receipt-schema.md` | rrp, receipt-schema, implementation | PDR-002 | RRP content model wins over generic receipts; generic schema currently not conforming |
| PDR-004: Implement GuardDecisionToken with full structure (policy_version, policy_hash, expiry, constraints) | implementation | `docs/intake/issue-drafts/pdr-004-guard-decision-token-structure.md` | guard, decision-token, implementation | — | "Guard decision tokens gain more structure" — current implementation is incomplete |
| PDR-005: Integrate check-traceability-headers.ts into CI pipeline | ci | `docs/intake/issue-drafts/pdr-005-traceability-headers-ci.md` | ci, provenance, headers | — | File-level traceability headers decision + code patch provided; not yet in CI |
| PDR-006: Slice-zero `builtin.echo` vertical slice — guard/receipt/tapestry verification | implementation | `docs/intake/issue-drafts/pdr-006-builtin-echo-slice-zero.md` | slice-zero, builtin-echo, vertical-slice | PDR-001, PDR-003, PDR-004 | "Slice S0: `builtin.echo` with full guard/receipt/tapestry verification" — currently `code.scaffold` is considered first slice |

## Project Board Suggestions

- Area: MVP / Alpha RC
- Cycle: batch-3
- Status: open
- Blocked by: TC-005 (Promotion state machine) is critical path; this doc's recommendations should feed into TC-005 design
- Parallelization notes: ROCK-3111-C (PDR-002) can be authored in parallel with guard token structure (PDR-004) and CI script (PDR-005); these are independent workstreams

## Open Questions

- Does the `builtin.echo` slice require a new `builtin` package or can it live in `rosetta-core`?
- What is the exact boundary between `rosetta-guard` and `rosetta-tapestry` — does guard call tapestry or does tapestry call guard?
- Is the 8-step build order consistent with TC-005 promotion state machine design, or does it need adjustment?
- JCS MVP stub uses `JSON.stringify` — should a proper RFC 8785 library be a P0 dependency or is the subset sufficient for alpha?