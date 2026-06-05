# Docs Intelligence Extraction — 20260410 Entif and Rosetta PRDs Revisions Synthesis

## Source

- Path: `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- Title: Entif and Rosetta PRDs — Revisions and Synthesis (Extended Thinking)
- Date evidence: 2026/4/10 11:02:59
- Authority tier: Chat export / Pro-tier Deep Research / Extended Thinking mode
- Freshness: Supersedes two prior runs from same session; dated 2026-04-10; captures consolidated position as of that date
- Word count: ~2,500
- Extractor: heartbeat subagent
- Extraction date: 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ChatGPT "Extended Thinking" session synthesizes two prior PRD-revision runs for Rosetta/Entif. Run 1 (scaffold-forge posture: TS/Nx, receipts-bearing CI, dry-run loop) merges with Run 2 (RRP-constitution-hardlined: deterministic provenance, receipt-bundle verification, stricter content model). The synthesis produces 10 unified decisions, an Alpha RC-0 through RC-4 staircase, a proposed ROCK-3111-C RRP Pack Filesystem Contract spec, and three concrete code patches. Key output: RRP-first MVP definition, `builtin.echo` as slice zero, UI as non-gating scaffold, and an 8-step reconciled build order.

## Goals And Intent

- Reconcile two divergent but complementary PRD-revision approaches from the same session
- Establish binding unified decisions for Rosetta/Entif MVP build order
- Produce concrete work products: Alpha staircase, RRP pack contract spec, code patches
- Preserve TypeScript/Nx scaffold energy while anchoring it to RRP constitutional bedrock

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| RRP-first MVP definition | "MVP alpha is RRP-first, not app-first" | Rosetta Core | P0 | Canonicalization, CID stability, signed receipts, guard, replay |
| Slice zero = `builtin.echo` guard verification | "truly smallest honest constitutional proof is guarded non-side-effect toolcall using builtin.echo" | rosetta-guard, rosetta-tapestry | P0 | Supersedes earlier `code.scaffold --dry-run` as first slice |
| Slice S1 = `code.scaffold --dry-run` | Two-step vertical slice | rosetta-scaffold | P1 | Reuses same constitutional loop as S0 |
| RRP content model for receipts | `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig` | rosetta-tapestry, ROCK-3111-C | P0 | Supersedes generic loose receipt/tapestry schemas |
| Guard decision token richness | policy_version, policy_hash, expiry, subject/tool refs, resource caps | rosetta-guard | P0 | Proposed richer structure vs earlier loose tokens |
| JCS MVP canonicalizer | "minimal canonicalizer using Node's built-ins like JSON.stringify for the job" | rosetta-canon | P1 | Not full RFC 8785; recommends full lib later |
| Local CAS + SQLite for alpha | "Local CAS + SQLite index now. Postgres/pgvector becomes an adapter" | rosetta-storage | P1 | Append-only tile posture; Postgres as adapter not prerequisite |
| Nx + pnpm + TypeScript primary spine | Monorepo, project-graph-aware, cache-aware | rosetta-nx, workspace | P0 | Already established; synthesis confirms |
| Python as specialist lane only | "Eval harnesses, embeddings, OCR/ASR, graph experimentation" | eval-harness, embeddings | P2 | Not core constitutional logic |
| UI scaffolded non-gating | "operator UI stub can inspect runs, but is still non-gating" | rosetta-operator | P2 | Alpha gates: CLI/API, conformance, guard, receipts, replay |
| File-level traceability headers | "terse, machine-checkable top-of-file provenance" | rosetta-ci, check-traceability-headers | P1 | `check-traceability-headers.ts` tool proposed |
| OPA/Rego deferred | "minimal JSON policy bundle now, OPA/Rego later" | rosetta-guard | P2 | Secure architecture wants policy-as-code; OPA deferred |
| RRP Pack Filesystem Contract spec | ROCK-3111-C proposed | ROCK-3111-C | P1 | Missing bridge between RRP ideas and repo layout |
| `builtin.echo` vertical slice end-to-end | "receipt bundle verifies successfully" | rosetta-builtin | P0 | Must pass Alpha RC-2 |
| Rights-scoped retrieval | "rights-scoped retrieval enforced" | rosetta-retrieval | P1 | Alpha RC-3 milestone |
| Local CAS + SQLite rights surface stable | "local CAS + SQLite query surfaces stable" | rosetta-storage | P1 | Alpha RC-3 milestone |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §1 | rrp-first, mvp-definition, alpha-rc | MVP alpha | decision | MVP alpha is explicitly defined as RRP-first: deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, replay/verification are the proof gates — not app features | "MVP alpha is RRP-first, not app-first" | Adopt this as the binding MVP scope definition; update any prior PRD that contradicts it | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | New work product 1: merged MVP staircase | alpha-rc, build-sequence, milestone | Alpha RC-0–4 | requirement | Alpha RC-0 through RC-4 staircase is a new concrete sequencing not seen in prior docs: RC-0=Nx workspace+canon+cid+TV1 tests red, RC-1=JCS/CID conformance+receipt schemas green, RC-2=Guard denies+builtin.echo E2E, RC-3=code.scaffold dry-run+local CAS+SQLite, RC-4=operator UI stub | "Alpha RC-0: Nx workspace boots; Alpha RC-1: JCS/CID deterministic conformance green" | Validate this staircase against existing TC-001 through TC-007 scope; this is more granular than prior milestone descriptions | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §2 | slice-zero, builtin-echo, guard-verification | builtin.echo | supersession | Slice zero is redefined as `builtin.echo` with full guard/receipt/tapestry verification — not `code.scaffold --dry-run`. Earlier scaffold-first approach (from prior PRD runs) is demoted to S1 | "truly smallest honest constitutional proof is... builtin.echo with full guard/receipt/tapestry verification" | Update any prior PRD/roadmap that listed `code.scaffold --dry-run` as slice zero; align TC-006 scope with this | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §3 | nx-monorepo, pnpm, typescript | TypeScript/Nx spine | decision | Nx + pnpm + TypeScript confirmed as primary build spine; monorepo, project-graph-aware, cache-aware, generator-heavy | "Keep Nx + pnpm + TypeScript as the primary spine" | No change needed; this validates existing practice | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §4 | python-specialist, no-core-constitutional | Python lane | decision | Python is specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experimentation. Not for core constitutional logic | "Python as a specialist lane only. Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic" | Ensure architecture docs prohibit Python for guard/receipt/constitutional modules | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §5 | local-cas, sqlite-index, postgres-adapter | storage-topology | decision | Storage starts local-first: Local CAS + SQLite index. Postgres/pgvector becomes an adapter, not a prerequisite. Honors append-only tile posture without contaminating alpha with indexing ambitions | "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter" | This is a significant scope constraint for TC-006; Postgres not required for alpha green | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §6 | ui-non-gating, operator-ui, headless-cli | operator UI | decision | UI is scaffolded but non-alpha-gating: `rosetta-operator` can exist but alpha gates are CLI/API, conformance, guard, receipts, replay | "UI is scaffolded, not alpha-gating" | Update any alpha-gating dependency on operator UI | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §7 | rrp-content-model, receipt-schema, subjects-claims-digests | receipt schema | supersession | RRP content model (subjects/claims/digests/policy_refs/nonce/auth/sig) replaces generic loose receipt/tapestry schemas from earlier runs | "RRP content model wins over generic receipts: subjects, claims, digests, policy_refs" | Update receipt and tapestry schema definitions; align with ROCK-3111-C | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §8 | guard-decision-token, policy-hash, resource-caps | guard tokens | requirement | Guard decision tokens gain richer structure: policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, constitution_hash placeholder, trace_id placeholder | "Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps" | Implement richer token structure in rosetta-guard admission module | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §9 | file-traceability-headers, ci | traceability-headers | requirement | File-level traceability headers stay; confirmed by alternate run as high-value for machine-checkable provenance | "File-level traceability headers stay" | Implement check-traceability-headers.ts CI hook | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions §10 | pack-filesystem-contract, rock-3111-c | ROCK-3111-C | decision | Next normative artifact should be a pack filesystem contract; this document produces a draft spec for ROCK-3111-C | "The next normative artifact should be a pack filesystem contract" | Initiate ROCK-3111-C spec as a formal document | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | New work product 2: ROCK-3111-C draft | rock-3111-c, pack-filesystem-contract, rrp-pack | RRP Pack Filesystem Contract | requirement | ROCK-3111-C draft specifies pack root `packs/rrp/`, required files (pack.json, CHANGELOG.md, schemas, SHACL shapes, vocab, test vectors, examples), required exports, three conformance tiers (RRP-Light, RRP-Full, RRP-Auditor), and filesystem rules (immutability of published schemas, vocab/shapes over core redefinitions) | "Pack root: packs/rrp/; Required files: packs/rrp/pack.json..." | Formalize ROCK-3111-C as a proper RFC spec document | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Guard admission.ts code patch | guard-admission, guard-decision-token, fail-closed | rosetta-guard | technology | Code patch for `rosetta-guard/src/admission.ts` implements admit() function with richer GuardDecisionToken including policy_version, toolcall_cid, tenant_id, dry_run_only constraint, resource_caps, egress_allowlist; fail-closed; signature verification stub requires kid and sig_b64 | Full admit() function in doc | Adopt this as the admission.ts baseline for rosetta-guard | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Receipt bundle tapestry code patch | receipt-bundle, tapestry, rrp-profile | rosetta-tapestry | technology | Code patch for `rosetta-tapestry/src/receipt-bundle.ts` implements buildReceiptBundleTapestry() with RRP receipt-bundle tapestry profile, roots/members structure, closure_policy | Full buildReceiptBundleTapestry() in doc | Adopt as baseline for receipt bundle implementation | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | check-traceability-headers.ts tool | traceability-headers, ci, file-headers | rosetta-ci | technology | Code patch for `tools/scripts/check-traceability-headers.ts` walks specified paths, checks for REQUIRED headers (Purpose Summary, Rosetta Relevance, Governing References), fails CI on missing headers | Full script in doc | Add to CI pipeline for protocol-sensitive modules | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Final reconciled build order | build-order, sequencing, 8-step | build order | decision | Final 8-step build order: (1) rosetta-canon/CID + RRP TV1/tamper vectors, (2) rosetta.receipt + rosetta.tapestry RRP schemas, (3) rosetta-guard admission + deny-path tests, (4) builtin.echo verified slice, (5) code.scaffold --dry-run, (6) local CAS + SQLite rights-scoped retrieval, (7) operator UI scaffold, (8) adapters, pgvector, OPA compiler, swarm interfaces | "land rossetta-canon, rosetta-cid... only then ship code.scaffold --dry-run" | Use this as authoritative sequencing for sprint planning | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Two-run synthesis methodology | methodology, synthesis, extended-thinking | synthesis method | technology | The doc models a methodology: run two divergent approaches (scaffold-forge vs RRP-hardlined), find 3 genuine disagreements, resolve them producing unified decisions. This is a reproducible synthesis pattern | "Two runs are not enemies. They are two spotlights hitting the same machine from different angles" | Consider formalizing as a "two-run synthesis" protocol for PRD reconciliation | medium |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Slice zero challenge: scaffold-first vs guard-first | slice-zero, builtin-echo, code-scaffold | builtin.echo vs code.scaffold | contradiction | Run 1 put `code.scaffold --dry-run` as first slice (developer delight flavor); Run 2 challenged this as not truly smallest constitutional proof. Resolved: builtin.echo becomes slice zero, code.scaffold becomes S1 | "truly smallest honest constitutional proof is builtin.echo... code.scaffold becomes slice one" | Ensure roadmap documents reflect this ordering | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Inspector UI timing challenge | inspector-ui, operator-ui, ui-timing | UI scoping | contradiction | Run 1 allowed inspector UI into alpha conversation; Run 2 challenged this as premature. Resolved: scaffold UI but do not let it gate alpha | "scaffold the operator UI, but do not let it gate alpha" | Align alpha milestone definitions to exclude UI from gates | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Receipt schema looseness challenge | receipt-schema, rrp-content-model | receipt schema | contradiction | Run 1 used generic loose receipt/tapestry schemas; Run 2 challenged this as too loose for RRP conformance. Resolved: adopt RRP content model | "RRP content model wins over generic receipts: subjects, claims, digests, policy_refs" | Update receipt schema implementations to RRP content model | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | OPA/Rego deferred vs desired | opa-rego, policy-as-code, deferred | policy layer | decision | Both runs converge on "minimal JSON policy bundle now, OPA/Rego later" — OPA's decoupling of decision-making from enforcement and live bundle updates fit a later compiler target | "minimal JSON policy bundle now, OPA/Rego later" | Document this as explicit non-goal for alpha; plan P2 | medium |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Extended Thinking mode provenance | extended-thinking, chatgpt, mode-label | evidence provenance | requirement | The doc is from "Extended Thinking" mode — a deeper deliberation mode that should be treated as higher-confidence synthesis than single-pass responses. Evidence quality is elevated | "Thought for 3m 59s" | Note Extended Thinking provenance when citing this document | medium |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | JCS MVP canonicalizer | jcs, canonicalization, rfc8785 | rosetta-canon | open-question | JCS canonicalizer proposed as "minimal using Node's built-ins" but document acknowledges this may not fully comply with RFC 8785. Full compliance library recommended later | "may not fully align with RFC 8785, and recommend using a full standards-compliant library later" | Track as deferred: JCS full RFC 8785 compliance library | medium |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | SIDL signature hashing rule | sig-exclusion-from-cid, rrp-rule | RRP rule | requirement | RRP bundle rule: `sig` field excluded from CID computation; CID or stable multihash commitment is what gets signed | "signature hashing rule that excludes sig from CID computation" | Ensure receipt bundling implementation enforces this | high |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Conformance tiers for RRP pack | rrp-light, rrp-full, rrp-auditor | ROCK-3111-C | technology | Three conformance tiers proposed for RRP pack: RRP-Light, RRP-Full, RRP-Auditor — gradated compliance levels for different deployment contexts | "Conformance tiers: RRP-Light, RRP-Full, RRP-Auditor" | Formalize in ROCK-3111-C spec; clarify what each tier requires | medium |
| 2026-04-10 | docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | RRP pack CID profile | cid-profile, multihash, base58btc | ROCK-3111-C | technology | RRP pack spec requires cid_profile = "sha2-256-multihash-base58btc" | "cid_profile = "sha2-256-multihash-base58btc"" | Implement in CID generation for pack contents | high |

## Components And Technologies

- `builtin.echo` — minimal guarded non-side-effect toolcall; slice zero
- `code.scaffold` — code generation tool; S1 vertical slice
- `rosetta-canon` — JSON Canonicalization (JCS) module
- `rosetta-cid` — Content ID generation
- `rosetta.receipt` — RRP receipt content schema
- `rosetta.tapestry` — RRP receipt-bundle tapestry schema
- `rosetta-guard` — admission control with richer decision tokens
- `rosetta-operator` — operator UI stub (non-gating)
- `check-traceability-headers.ts` — CI tool enforcing top-of-file provenance headers
- Nx executor script, pnpm workspaces, TypeScript
- SQLite local index (alpha); Postgres/pgvector as later adapter
- OPA/Rego (deferred to post-alpha)
- Three RRP conformance tiers: RRP-Light, RRP-Full, RRP-Auditor

## Conceptual Claims

- MVP alpha's constitutional proof is deterministic canonicalization + CID stability + signed receipts + guard admission + replay/verification — not application features
- `builtin.echo` with full guard/receipt/tapestry verification is the smallest honest constitutional proof (slice zero)
- UI scaffolding is legitimate but must never gate alpha progression
- RRP content model (`subjects`/`claims`/`digests`/`policy_refs`) is superior to generic loose schemas for conformance
- Local CAS + SQLite is the correct alpha storage posture; Postgres/pgvector is an adapter, not a prerequisite
- OPA/Rego is a post-alpha target, not day-one dependency
- Two-run synthesis with explicit disagreement resolution is a higher-fidelity PRD reconciliation method than single-pass revision
- RRP pack filesystem contract is the missing bridge between RRP ideas and concrete repo structure

## Dependencies And Sequencing

- **Blocked by**: None (synthesis doc resolves its own predecessor runs)
- **Enables**: ROCK-3111-C formalization; Alpha RC-0 through RC-4 implementation; rosetta-guard richer token structure
- **Prerequisite for**: TC-006 (tapestry v1), TC-007 (rights + Postgres)
- **Sequencing**: See 8-step final reconciled build order (finding #17)

## Contradictions Or Supersession

- **Supersedes**: Any prior PRD or roadmap that listed `code.scaffold --dry-run` as slice zero (superseded by `builtin.echo`)
- **Supersedes**: Any alpha milestone definition that included operator UI as a gating requirement (UI is now explicitly non-gating)
- **Supersedes**: Generic loose receipt/tapestry schemas from earlier runs (RRP content model now required)
- **Validates**: Nx + pnpm + TypeScript as primary spine (unchanged but confirmed)
- **Validates**: Python as specialist lane (unchanged but confirmed)
- **Contradicts**: Any prior doc that treated Postgres/pgvector as alpha prerequisite (local SQLite is now alpha storage)
- **Contradicts**: Any alpha definition that included OPA/Rego as day-one (deferred to post-alpha)

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| PRD-REV-001: Formalize Alpha RC-0 through RC-4 staircase as binding milestone spec | docs | `docs/intake/issue-drafts/PRD-REV-001-alpha-rc-staircase.md` | alpha-rc, build-sequence, milestone | — | Alpha RC-0–4 staircase in this doc is more granular than prior TC-001–TC-007 scope descriptions; needs formalization as a milestone spec |
| PRD-REV-002: Implement builtin.echo as slice-zero vertical slice | implementation | `docs/intake/issue-drafts/PRD-REV-002-builtin-echo-slice-zero.md` | builtin-echo, slice-zero, guard-verification | PRD-REV-001 | Slice zero = builtin.echo with full guard/receipt/tapestry verification; must be completed before code.scaffold S1 |
| PRD-REV-003: Adopt RRP content model in rosetta.receipt and rosetta.tapestry schemas | implementation | `docs/intake/issue-drafts/PRD-REV-003-rrp-content-model-schemas.md` | rrp-content-model, receipt-schema, tapestry-schema | PRD-REV-001 | `subjects`, `claims`, `digests`, `policy_refs`, `nonce`, `auth`, `sig` must replace generic loose schemas from earlier runs |
| PRD-REV-004: Implement richer guard decision token structure | implementation | `docs/intake/issue-drafts/PRD-REV-004-guard-decision-token-structure.md` | guard-tokens, policy-version, resource-caps | PRD-REV-001 | Guard decision tokens need policy_version, policy_hash, expiry, subject/tool refs, resource_caps, constitution_hash placeholder |
| PRD-REV-005: Write check-traceability-headers.ts and wire into CI | implementation | `docs/intake/issue-drafts/PRD-REV-005-traceability-headers-ci.md` | ci, traceability-headers, file-headers | — | `Purpose Summary:`, `Rosetta Relevance:`, `Governing References:` headers required on protocol-sensitive modules |
| PRD-REV-006: Formalize ROCK-3111-C as RRP Pack Filesystem Contract RFC | rfc | `docs/intake/issue-drafts/PRD-REV-006-rock-3111-c-pack-contract.md` | rock-3111-c, rrp-pack, pack-filesystem-contract | — | ROCK-3111-C draft spec in this doc needs formalization as a proper RFC with required files, exports, conformance tiers |
| PRD-REV-007: Implement SIDL sig-exclusion-from-CID rule in receipt bundling | bug | `docs/intake/issue-drafts/PRD-REV-007-sig-exclusion-from-cid.md` | rrp-rule, cid-computation, receipt-bundling | PRD-REV-003 | RRP rule requires sig field excluded from CID computation; must be enforced in implementation |
| PRD-REV-008: Adopt SQLite local index as alpha storage (Postgres as later adapter) | architecture | `docs/intake/issue-drafts/PRD-REV-008-sqlite-alpha-postgres-adapter.md` | storage, sqlite, postgres-adapter, alpha-storage | PRD-REV-001 | Local CAS + SQLite index is alpha storage; Postgres/pgvector is adapter, not prerequisite — affects TC-006 scope |
| PRD-REV-009: Implement check-traceability-headers.ts CI enforcement for protocol modules | implementation | `docs/intake/issue-drafts/PRD-REV-005-traceability-headers-ci.md` | ci, traceability-headers | — | (same as PRD-REV-005 — combined) |
| PRD-REV-010: Implement JCS canonicalizer MVP; plan full RFC 8785 compliance | open-question | `docs/intake/issue-drafts/PRD-REV-010-jcs-canonicalizer-mvp.md` | jcs, canonicalization, rfc8785 | PRD-REV-001 | MVP uses Node built-ins; full RFC 8785 compliance deferred but needs tracking |
| PRD-REV-011: Define three RRP conformance tiers (RRP-Light, RRP-Full, RRP-Auditor) | architecture | `docs/intake/issue-drafts/PRD-REV-011-rrp-conformance-tiers.md` | rrp-conformance, conformance-tiers | PRD-REV-006 | Three conformance tiers in ROCK-3111-C need formal definition of what each tier requires |
| PRD-REV-012: Update TC-006/TC-007 scope to reflect SQLite-first alpha storage | scope | `docs/intake/issue-drafts/PRD-REV-012-tc-006-sqlite-alpha-scope.md` | tc-006, sqlite, postgres, scope | PRD-REV-008 | TC-006 tapestry v1 + rights + Postgres may need scope change given SQLite-first alpha storage |
| PRD-REV-013: Operator UI must not gate alpha progression | docs | `docs/intake/issue-drafts/PRD-REV-013-ui-non-gating-alpha.md` | operator-ui, alpha-gating | PRD-REV-001 | Alpha gates are CLI/API, conformance, guard, receipts, replay — not UI |

## Project Board Suggestions

- Area: Rosetta MVP Build Sequencing
- Cycle: batch-3-active
- Status: This doc provides authoritative sequencing; issue candidates cover implementation gaps
- Blocked by: None
- Parallelization notes: PRD-REV-001 (staircase formalization) and PRD-REV-006 (ROCK-3111-C) can run in parallel; PRD-REV-002 through PRD-REV-004 are sequential on PRD-REV-001

## Open Questions

- Full RFC 8785 JCS compliance library — which specific library to adopt post-MVP?
- RRP-Auditor conformance tier — what additional requirements does it impose beyond RRP-Full?
- Postgres/pgvector as adapter — what is the exact adapter interface? When does it get promoted from optional to recommended?
- `builtin.echo` implementation — does it require a new built-in module or can it reuse existing `builtin` infrastructure?
- SIDL sig-exclusion-from-CID — is this documented in the RRP spec itself, or only in this synthesis? Need to verify against primary RRP source
