# Docs Intelligence Extraction — 20260410 - Entif and Rosetta PRDs - Revisions and Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: Entif and Rosetta PRDs — Revisions and Synthesis (Extended Thinking)
- Date evidence: 2026/4/10 9:39:31 created, 2026/4/10 11:02:59 updated
- Authority tier: synthesis — deep research mode, two-run reconciliation
- Freshness: 2026-04-10 — within current project window
- Word count: ~2500
- Extractor: heartbeat subagent
- Extraction date: 2026-06-05

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A deep research synthesis reconciling two PRD variants (scaffold-forge vs RRP-constitution-centric) into binding merged doctrine. Produced 10 unified decisions, a 4-stage Alpha RC staircase, ROCK-3111-C draft spec, three concrete code patches, and a final reconciled build order. This is the most architecturally binding synthesis produced so far — it explicitly overrides earlier scaffold-forge posture in three contested areas.

## Goals And Intent

- Merge two divergent PRD runs into binding doctrine
- Establish RRP-first constitutional posture for MVP
- Sharpen build sequence with concrete alpha RC gates
- Produce code-shaped artifacts (schemas, admission logic, receipt bundle)
- Define the next normative spec (ROCK-3111-C)

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| MVP must be RRP-first, not app-first | "MVP alpha is RRP-first, not app-first" | constitutional | P0 | overrides earlier scaffold-forge lean |
| builtin.echo vertical slice (S0) before code.scaffold (S1) | "Slice S0: builtin.echo with full guard/receipt/tapestry verification" | rosetta-guard, rosetta-tapestry | P0 | slice zero is the true smallest honest constitutional proof |
| Nx + pnpm + TypeScript as primary build spine | "Keep Nx + pnpm + TypeScript as the primary spine" | nx-workspace, build-system | P0 | reinforced by official Nx caching docs |
| Python as specialist lane only | "Python as a specialist lane only" | python-boundary | P1 | eval harnesses, embeddings, OCR/ASR, graph experimentation |
| Local-first CAS + SQLite before Postgres | "Storage starts local-first" | storage, rosetta-cas | P1 | Postgres/pgvector is adapter not prerequisite |
| UI scaffolded but non-alpha-gating | "UI is scaffolded, not alpha-gating" | rosetta-operator | P2 | alpha gates are CLI/API/conformance/guard/receipts |
| RRP content model for receipts | "RRP content model wins over generic receipts" | rosetta-tapestry, rrp-schema | P0 | subjects/claims/digests/policy_refs/nonce/auth/sig |
| Guard decision token structure | "Guard decision tokens gain more structure" | rosetta-guard | P0 | policy_version, policy_hash, expiry, constitution_hash |
| File-level traceability headers required | "File-level traceability headers stay" | developer-ergonomics | P1 | machine-checkable top-of-file provenance |
| ROCK-3111-C RRP Pack Filesystem Contract | "the next normative artifact should be a pack filesystem contract" | rosetta-packs | P0 | missing bridge between RRP ideas and repo layout |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" | rrp-first, mvp-definition, constitutional-posture | MVP definition | decision | MVP alpha is RRP-first, not app-first. The thing proved first is deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, replay/verification. Prior scaffold-forge lean overridden in favor of constitutional bedrock. | "MVP alpha is RRP-first, not app-first" | Adopt RRP-first sequencing; drop app-first shortcuts in alpha | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 2 | vertical-slice, two-step-s0-s1 | slice protocol | decision | Two-step vertical slice, not one. Slice S0: builtin.echo with full guard/receipt/tapestry verification. Slice S1: code.scaffold --dry-run using same constitutional loop. Earlier one-step approach is insufficient. | "Slice S0: builtin.echo... Slice S1: code.scaffold --dry-run" | Sequence S0 before S1 in all planning | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 3 | nx-workspace, typescript-first, monorepo | build-system | decision | Keep Nx + pnpm + TypeScript as primary spine. Repo stays monorepo, project-graph-aware, cache-aware, generator-heavy. Reinforced by Nx official docs on cacheable deterministic tasks, affected execution, remote caching. | "Keep Nx + pnpm + TypeScript as the primary spine" | Continue Nx-first workspace construction | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 4 | python-boundary, specialist-lane | python-usage | decision | Python is specialist lane only. Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic. Earlier generic Python enthusiasm overridden. | "Keep Python as a specialist lane only" | Define explicit Python boundary in architecture docs | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 5 | local-first, sqlite, cas, postgres-adapter | storage-topology | decision | Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes adapter not prerequisite. Honors Rosetta append-only immutable tile posture while letting indexing ambitions land without contaminating alpha. | "Storage starts local-first. Local CAS + SQLite index now" | Build CAS + SQLite before Postgres dependency | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 6 | ui-scaffold, non-alpha-gating | rosetta-operator | decision | UI is scaffolded, not alpha-gating. rosetta-operator can exist but alpha RC gates are CLI/API/conformance/guard/receipts/replay. Inspector UI does not gate alpha. | "UI is scaffolded, not alpha-gating" | Keep UI out of alpha gate criteria | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 7 | rrp-content-model, receipt-schema | rrp-schema | decision | RRP content model wins over generic receipts. subjects/claims/digests/policy_refs/nonce/auth/sig becomes standard payload shape. Signature hashing excludes sig from CID computation, signs CID or stable multihash commitment. | "RRP content model wins over generic receipts" | Adopt RRP receipt schema across all receipt-producing modules | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 8 | guard-decision-token, policy-version, expiry | rosetta-guard | decision | Guard decision tokens gain more structure. Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, and later-ready placeholders like constitution_hash or trace IDs. | "Guard decision tokens gain more structure" | Extend GuardDecisionToken interface per decision 8 | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 9 | file-traceability-headers, developer-ergonomics | auditability | decision | File-level traceability headers stay. Required fields: Purpose Summary, Rosetta Relevance, Governing References. Machine-checkable at check-traceability-headers.ts. | "File-level traceability headers stay" | Enforce header check in CI | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 10 | rock-3111-c, pack-filesystem-contract, normative-artifact | rosetta-packs | decision | The next normative artifact should be a pack filesystem contract. This is the missing bridge between RRP ideas and the repo knowing exactly how to lay them down. | "the next normative artifact should be a pack filesystem contract" | Create ROCK-3111-C as next priority spec | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 1: merged MVP staircase" | alpha-rc-staircase, build-sequence | build-order | decision | Alpha RC staircase: RC-0 Nx workspace boots, canon/cid/validate exist, TV1 tamper-negative tests compile red. RC-1 JCS/CID conformance green, receipt/tapestry schemas green. RC-2 guard denies, builtin.echo passes end-to-end, bundle verifies. RC-3 code.scaffold dry-run reuses constitutional loop. RC-4 local CAS + SQLite stable, rights-scoped retrieval enforced, UI stub non-gating. | "Alpha RC-0 through RC-4" staircase | Track Alpha RC progression as canonical build gate | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 2: ROCK-3111-C draft" | rock-3111-c, pack-filesystem-contract, rrp-pack | spec | requirement | ROCK-3111-C RRP Pack Filesystem Contract v0.1.0 draft defines pack root, required files, required pack.json fields, required exports, conformance tiers, filesystem rules. Pack root at packs/rrp/ with schema/receipt-content.schema.json, shacl/receipt.shapes.ttl, vocab/*.json, test-vectors/tv1.*.json, examples/*.json. Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor. | "ROCK-3111-C draft" section | Create full ROCK-3111-C spec document | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "New work product 3: code patches" | admission-ts, receipt-bundle-ts, check-traceability-headers | code-artifacts | technology | Three code patches provided: (1) packages/rosetta-guard/src/admission.ts with full GuardDecisionToken interface, admit() function, deny-by-default logic, signature verification stub; (2) packages/rosetta-tapestry/src/receipt-bundle.ts with ReceiptBundleBuildInput, buildReceiptBundleTapestry(); (3) tools/scripts/check-traceability-headers.ts enforcing Purpose Summary/Rosetta Relevance/Governing References headers. | "New work product 3: code patches" | Integrate these as starting-point artifacts | medium |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Final reconciled build order" | build-order, canonical-sequence | build-order | decision | Final reconciled build order: (1) land rosetta-canon, rosetta-cid, RRP TV1/tamper vectors; (2) land rosetta.receipt and rosetta.tapestry RRP schemas; (3) land rosetta-guard admission and deny-path tests; (4) ship builtin.echo verified slice; (5) ship code.scaffold --dry-run; (6) add local CAS + SQLite rights-scoped retrieval; (7) scaffold operator UI and richer context assembly; (8) start adapters, pgvector, OPA compiler, swarm-facing reserved interfaces. | "Final reconciled build order" list | Use as canonical implementation sequence | high |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" | jcs, json-canonicalization, rfc8785 | jcs-mvp | decision | For rrp-tv1.spec.ts, use Node built-ins like JSON.stringify for MVP. This is MVP-safe subset, may not fully comply with RFC 8785. Recommend full standards-compliant library later. | "I'll produce a minimal canonicalizer using Node's built-ins like JSON.stringify for the job" | Flag JCS compliance gap for later upgrade | medium |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" | opa, rego, policy-as-code | policy-as-code | decision | Minimal JSON policy bundle now, OPA/Rego later. OPA decouples decision-making from enforcement, supports policy/data bundles updateable without restarts. Perfect later compiler target rather than day-one dependency. | "minimal JSON policy bundle now, OPA/Rego later" | Plan OPA integration as later phase | medium |
| 2026-06-05 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | "Unified decisions" item 3 | npx-cache, nx-remote-cache, affected-execution | nx-ergonomics | technology | Official Nx docs on cacheable deterministic tasks, task inputs/outputs, affected execution, remote caching are exactly the ergonomics this repo wants. | "[Nx+2Nx+2](https://nx.dev/docs/getting-started/tutorials/caching)" | Leverage Nx affected execution and remote caching in CI | high |

## Components And Technologies

- `rosetta-canon` — JCS/CID deterministic canonicalization module
- `rosetta-cid` — content identifier module with multihash
- `rosetta.receipt` — RRP receipt schema (subjects/claims/digests/policy_refs/nonce/auth/sig)
- `rosetta.tapestry` — receipt-bundle tapestry profile
- `rosetta-guard` — admission logic with deny-by-default
- `builtin.echo` — slice-zero verification tool
- `code.scaffold` — slice-one scaffolding tool
- `packages/rosetta-guard/src/admission.ts` — code patch for admission logic
- `packages/rosetta-tapestry/src/receipt-bundle.ts` — code patch for receipt bundle
- `tools/scripts/check-traceability-headers.ts` — header enforcement script
- `packs/rrp/` — RRP pack filesystem layout (proposed)
- `Nx` + `pnpm` — monorepo workspace
- `SQLite` — local index before Postgres
- `OPA` — future policy compiler target

## Conceptual Claims

1. **RRP-first MVP**: The smallest honest constitutional proof is a guarded non-side-effect toolcall (builtin.echo) with full receipt-bundle verification — not a developer-friendly dry-run loop.
2. **Constitutional strictness beats scaffold ergonomics**: Earlier scaffold-forge posture is overridden by RRP-constitution-centric lean in three contested areas (MVP definition, slice ordering, inspector UI gate).
3. **Nx + pnpm + TypeScript is the primary spine**: Reinforced by official Nx docs on cacheable deterministic tasks, affected execution, remote caching.
4. **Python is specialist-only**: Core constitutional logic stays TypeScript; Python handles eval/embeddings/OCR/graph work.
5. **Storage is local-first then adapter-upgrade**: CAS + SQLite now, Postgres/pgvector as adapter later — honors append-only immutable tile posture.
6. **RRP content model is the receipt standard**: subjects/claims/digests/policy_refs/nonce/auth/sig with signature hashing excluding sig from CID computation.
7. **File-level traceability headers are non-negotiable**: Purpose Summary, Rosetta Relevance, Governing References enforced in CI.
8. **ROCK-3111-C is the next normative artifact**: Pack filesystem contract is the missing bridge between RRP ideas and repo layout.
9. **OPA is a later-phase target**: Minimal JSON policy bundle now; OPA/Rego when policy complexity demands it.
10. **Build order is now explicit and canonical**: 8-step sequence from canon/cid through adapters/pgvector/swarm-interfaces.

## Dependencies And Sequencing

- Depends on: Rosetta v3.0.0 Core Spine, ROCK-3111 / ROCK-3111-A / ROCK-3111-B
- Blocks: Alpha RC staircase (RC-0 through RC-4), ROSETTA-packs work, guard/tapestry implementation
- Sequencing: builtin.echo (S0) before code.scaffold (S1); local CAS/SQLite before Postgres; UI scaffolded but non-gating

## Contradictions Or Supersession

- **Supersedes** earlier scaffold-forge posture that was app-first, one-step, and UI-gating in alpha
- **Supersedes** generic receipt schema in favor of RRP content model (subjects/claims/digests/policy_refs/nonce/auth/sig)
- **Reconciled** two divergent PRD runs: scaffold-forge (mine) vs RRP-constitution-centric (alternate). Synthesis: keep scaffold-forge energy but bolt it to constitutional bedrock.
- **Partial pushback acknowledged**: Retrieval-scope narrower in alternate run does not invalidate broader corpus supporting TS/Nx/React posture

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRS-001: Create ROCK-3111-C RRP Pack Filesystem Contract | spec | `docs/intake/issue-drafts/prs-001-rock-3111-c.md` | spec, rrp, packs | — | "the next normative artifact should be a pack filesystem contract" — missing bridge between RRP ideas and repo layout |
| PRS-002: Local CAS + SQLite before Postgres — explicit migration path | architecture | `docs/intake/issue-drafts/prs-002-local-cas-sqlite-first.md` | storage, migration, sqlite, postgres-adapter | — | "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite" |
| PRS-003: Python boundary enforcement — specialist lane only | governance | `docs/intake/issue-drafts/prs-003-python-boundary.md` | python, architecture, boundary | — | "Python as a specialist lane only. Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic" |
| PRS-004: JCS MVP canonicalizer compliance gap — RFC 8785 full compliance later | tech-debt | `docs/intake/issue-drafts/prs-004-jcs-mvp-gap.md` | jcs, rfc8785, canonicalization | — | "MVP-safe subset, may not fully align with RFC 8785. Recommend using a full standards-compliant library later" |
| PRS-005: Alpha RC staircase tracking — RC-0 through RC-4 gates | implementation | `docs/intake/issue-drafts/prs-005-alpha-rc-staircase.md` | build-order, alpha-rc, milestone | — | "Alpha RC-0 through RC-4" staircase with explicit gate criteria |
| PRS-006: Check-traceability-headers.ts CI enforcement | devops | `docs/intake/issue-drafts/prs-006-traceability-headers-ci.md` | ci, auditability, file-headers | PRS-001 | "File-level traceability headers stay" + check-traceability-headers.ts tool provided |

## Project Board Suggestions

- Area: Architecture / Build Order
- Cycle: batch-3 (PRDs and synthesis)
- Status: synthesis doc — decisions are binding pending formal confirmation
- Blocked by: None — this is a synthesis that unblocks further work
- Parallelization notes: ROCK-3111-C can be authored in parallel with Alpha RC-0 implementation; Python boundary doc can be written independently

## Open Questions

- Is the 4-stage Alpha RC staircase (RC-0 through RC-4) the canonical tracking structure for the project? Should this replace or augment the existing TC-001 through TC-007 tracking?
- Should the check-traceability-headers.ts script be part of the Nx workspace tooling or a standalone script?
- Is the `nonce` field in receipt-bundle.ts using `Math.random()` acceptable for MVP or does it need cryptographic nonce generation?
- Should OPA/Rego be formally scheduled as a P1 item in the roadmap or kept as post-alpha?

---

*Extracted: 2026-06-05 | Confidence: high | Findings: 19 | Issue candidates: 6*