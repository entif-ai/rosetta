# Docs Intelligence Extraction — 20260410 PRD Revisions Synthesis

## Source

- **Path:** `docs/chats/20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md`
- **Title:** Pro-tier Deep Research Prompt — Entif/Rosetta PRD Synthesis
- **Date evidence:** 2026-04-10 (session conducted 10:56 AM)
- **Authority tier:** ChatGPT Pro extended research session; internal reasoning traces visible
- **Freshness:** 2026-04-10 — 7 weeks old; references other 2026-04-10 and earlier docs
- **Word count:** ~2,500 words of substantive output + code artifacts
- **Extractor:** heartbeat subagent
- **Extraction date:** 2026-06-04

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

A ChatGPT Pro "deep research" synthesis that reconciles two competing PRDBlueprint runs for Rosetta/Entif: one wider and scaffold-heavy (Nx/TS/React), one stricter and RRP-conformance-centric. The synthesis adopts RRP-first constitutional framing while preserving Nx monorepo ergonomics, Python-as-specialist-lane, and local-first storage. Produces three concrete artifacts: a merged MVP staircase, a ROCK-3111-C RRP Pack Filesystem Contract draft, and three TypeScript code patches. Marks 10 binding unified decisions. Critical finding: `Math.random()` in the receipt-bundle nonce generation is a security bug requiring immediate correction.

## Goals And Intent

- Reconcile two prior PRDBlueprint runs (scaffold-forge vs RRP-conformance-centrism)
- Produce binding unified decisions for the merged MVP build order
- Generate concrete code artifacts (schemas, admission logic, traceability checker)
- Establish the RRP Pack Filesystem Contract as the next normative artifact

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 1 | `text-core`, `rrp`, `mvp-gate` | MVP definition | decision | MVP alpha is RRP-first, not app-first. The thing proven first is deterministic canonicalization, CID stability, signed receipts, receipt-bundle tapestries, guard admission, and replay/verification. | "MVP alpha is RRP-first, not app-first. The thing we prove first is deterministic canonicalization, CID stability, signed receipts..." | Land RRP canonicalization and receipt schemas as the first alpha gate before any app-level tooling | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 2 | `vertical-slice`, `builtin-echo`, `code-scaffold` | vertical slice | decision | Two-step vertical slice: S0 = `builtin.echo` with full guard/receipt/tapestry verification; S1 = `code.scaffold --dry-run` using the same constitutional loop. | "Slice S0: builtin.echo with full guard/receipt/tapestry verification. Slice S1: code.scaffold --dry-run using the same constitutional loop." | Implement builtin.echo as slice-zero gate; code.scaffold --dry-run is slice-one | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 3 | `nx`, `typescript`, `monorepo`, `tooling` | tech stack | decision | Nx + pnpm + TypeScript is the primary build spine. Repo stays monorepo, project-graph-aware, cache-aware, generator-heavy. | "Keep Nx + pnpm + TypeScript as the primary spine. The repo stays monorepo, project-graph-aware, cache-aware, and generator-heavy." | Preserve Nx monorepo structure for all constitutional packages | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 4 | `python`, `specialist-lane` | tech stack | decision | Python is a specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic. | "Keep Python as a specialist lane only. Eval harnesses, embeddings, OCR/ASR, graph experimentation. Not core constitutional logic." | All core Rosetta constitutional logic must be TypeScript/Node; Python is opt-in for specialized subsystems | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 5 | `sqlite`, `local-first`, `postgres-migration` | storage | decision | Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite. | "Storage starts local-first. Local CAS + SQLite index now. Postgres/pgvector becomes an adapter, not a prerequisite." | Implement SQLite-backed local CAS for alpha; define Postgres adapter as P1 post-alpha work | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 6 | `operator-ui`, `alpha-gate` | ui | decision | UI is scaffolded but not alpha-gating. Alpha RC gates are CLI/API, conformance, guard, receipts, and replay. | "UI is scaffolded, not alpha-gating. Alpha RC gates are CLI/API, conformance, guard, receipts, and replay." | Rosetta-operator UI is non-blocking stub until alpha-RC-4; do not gate on it | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 7 | `rrp`, `receipt-schema`, `tapestry-schema` | schema | decision | RRP content model wins over generic receipts: subjects, claims, digests, policy_refs, nonce, auth, sig — with the signature hashing rule that excludes sig from CID computation. | "RRP content model wins over generic receipts. subjects, claims, digests, policy_refs, nonce, auth, sig, and the RRP bundle closure profile become the standard payload shape." | Adopt RRP receipt schema as standard; enforce sig exclusion from CID in canonicalizer | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 8 | `guard`, `decision-token`, `policy-versioning` | guard | decision | Guard decision tokens gain more structure: policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, plus placeholders for constitution_hash and trace IDs. | "Include policy_version, policy_hash, short-lived expiry, subject/tool references, resource caps, and later-ready placeholders like constitution_hash or trace IDs." | Implement full GuardDecisionToken schema with all specified fields | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 9 | `traceability-headers`, `provenance`, `ci` | audit | decision | File-level traceability headers stay required. Each protocol-sensitive file must have Purpose Summary, Rosetta Relevance, and Governing References blocks. | "File-level traceability headers stay required. The alternate run validates this rather than weakening it." | Enforce via pre-commit hook AND CI gate, not just tools/scripts/check-traceability-headers.ts | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 10 | `rock-3111-c`, `pack-contract`, `normative-artifact` | pack | decision | The next normative artifact should be a RRP Pack Filesystem Contract. The draft is provided in the document. | "The next normative artifact should be a pack filesystem contract. The alternate run practically asks for it. I agree." | Promote ROCK-3111-C from draft to formal RFC; file as PR | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | New work product 2 | `rock-3111-c`, `pack-schema`, `rrp-pack` | pack | requirement | ROCK-3111-C RRP Pack Filesystem Contract v0.1.0 is specified with required pack.json fields, required files, filesystem rules, and conformance tiers (RRP-Light, RRP-Full, RRP-Auditor). | Full contract spec in document body: pack_id, doc_id, version, kind, exports[], depends_on[], conformance_tiers[], canonicalization, cid_profile, compatibility fields | Formalize ROCK-3111-C as a proper RFC with PR process | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | admission.ts code patch | `guard`, `admission-logic`, `typescript` | implementation | risk | The admission.ts code uses a stub verifyDecisionSignature() that only checks for signature object presence (kid and sig_b64), not actual cryptographic verification. This is an MVP stub that must not ship unchallenged. | "MVP stub: require signature object presence to avoid 'naked allows'." | Replace stub with proper Ed25519 verification before alpha-RC-2; add cryptographic test vectors | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | receipt-bundle.ts code patch | `nonce-generation`, `Math.random`, `security` | security | risk | CRITICAL: `cryptoNonce()` uses `Math.random()` which is NOT cryptographically secure. In a receipt bundle, nonce values must be unpredictable. Predictable nonces undermine receipt uniqueness and replay-protection guarantees. | "function cryptoNonce(): string { return nonce_${Math.random().toString(36).slice(2, 12)}; }" | Replace immediately with `crypto.randomBytes()` or `crypto.randomUUID()` for Node 14+ | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | check-traceability-headers.ts code patch | `traceability-headers`, `ci`, `enforcement` | audit | issue-candidate | check-traceability-headers.ts exists as a standalone script but there is no evidence of a pre-commit hook or CI enforcement. Files can be committed without traceability headers if the check is not run. | "tools/scripts/check-traceability-headers.ts" — no mention of CI integration or pre-commit hook | Add as required CI step; consider Husky pre-commit hook | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Final reconciled build order | `build-order`, `alpha-rc-staircase` | sequencing | dependency | The build order is: (1) roseta-canon/CID + TV1/tamper vectors, (2) RRP schemas, (3) guard admission + deny-path tests, (4) builtin.echo slice, (5) code.scaffold --dry-run, (6) local CAS + SQLite retrieval, (7) operator UI scaffold, (8) adapters, pgvector, OPA, swarm interfaces. Steps 1-6 must precede 7-8. | "Stop debating the cathedral and do this: 1. land roseta-canon, roseta-cid... 8. then start adapters..." | Formalize as explicit milestone map with numbered RC gates | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | New work product 1 | `alpha-rc`, `mvp-staircase`, `milestone` | milestone | requirement | Alpha RC-0 through RC-4 staircase is defined: RC-0 Nx workspace; RC-1 JCS/CID + receipt/tapestry schemas; RC-2 Guard + builtin.echo; RC-3 code.scaffold dry-run + CLI/API; RC-4 local CAS + SQLite + rights-scoped retrieval. | "Alpha RC-0: Nx workspace boots... RC-1: JCS/CID... RC-2: Guard denies... RC-3: code.scaffold dry-run... RC-4: local CAS + SQLite..." | Use this staircase as the explicit Text-Core MVP gate checklist | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 9 | `jcs`, `rfc8785`, `canonicalization` | canonicalization | risk | JCS MVP decision defers RFC 8785 full compliance. Node's JSON.stringify does NOT guarantee stable key ordering across all cases, which could cause CID instability if object key order varies. | "For the rrp-tv1.spec.ts, I'll produce a minimal canonicalizer using Node's built-ins like JSON.stringify for the job. I'll mention that this is an MVP-safe subset, which may not fully align with RFC 8785." | Track as known gap; add explicit test for key-order independence; plan RFC 8785 upgrade | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 8 | `policy`, `opa`, `rego` | policy | decision | Minimal JSON policy bundle now; OPA/Rego later. Policy-as-code and signed policy bundles are the target, but OPA is a later compiler target, not a day-one dependency. | "Minimal JSON policy bundle now, OPA/Rego later." | Keep JSON policy for alpha; define OPA migration as P2 milestone | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | New work product 2 | `shacl`, `vocab`, `test-vectors` | schema | technology | ROCK-3111-C specifies required vocab files (receipt-types.json, claim-types.json, verdicts.json) and SHACL shapes (receipt.shapes.ttl, tapestry-bundle.shapes.ttl) alongside test vectors (tv1.hash-input.json, tv1.expected.json, tv1.tampered.json). | Full file list in document: packs/rrp/schema/, packs/rrp/shacl/, packs/rrp/vocab/, packs/rrp/test-vectors/, packs/rrp/examples/ | Implement these files as part of the RRP pack; ensure CI validates all three test vector cases | high |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | New work product 2 | `pack-id`, `doc-id`, `exports` | schema | issue-candidate | ROCK-3111-C draft defines pack_id as a required field but does not specify the naming convention. The document shows packs/rrp/ but the naming convention for pack_id values is not defined (e.g., @rosetta/rrp vs rrp vs rosetta.rrp). | "Required pack.json fields: - pack_id" | Define pack_id naming convention as part of ROCK-3111-C finalization | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Alpha RC-4 | `sqlite`, `postgres`, `migration` | storage | open-question | Alpha RC-4 establishes local CAS + SQLite as the initial storage, with explicit intent to upgrade to Postgres/pgvector as an adapter later. The upgrade path and adapter interface are not specified in this document. | "local CAS + SQLite query surfaces stable... Postgres/pgvector becomes an adapter, not a prerequisite." | Define SQLite-to-Postgres migration as explicit post-alpha milestone; specify the adapter interface | medium |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 3 | `nx`, `affected`, `remote-cache` | tooling | technology | Nx remote caching is referenced as a core ergonomic feature, but the security model for remote cache nodes is not addressed. Remote cache in a multi-tenant or adversarial environment requires content authentication. | Nx docs cited: "cacheable deterministic tasks, task inputs/outputs, affected execution, and remote caching" | Define remote cache security posture: are cache artifacts content-addressed and self-certifying, or does the runner verify? | low |
| 2026-04-10 | docs/chats/.../20260410 - Entif and Rosetta PRDs - Revisions and Synthesis - ChatGPT - Extended Thinking.md | Unified decisions, item 7 | `sig`, `cid-exclusion`, `merkle` | provenance | risk | The signature exclusion rule (sig excluded from CID computation, but sig signs the CID) creates a two-step verification: first compute CID from non-sig fields, then verify sig over that CID. Order of operations matters and must be enforced. | "the signature hashing rule that excludes sig from CID computation and signs the CID or stable multihash commitment" | Document the exact verification algorithm in the RRP spec; add integration tests that verify tamper-detection order | high |

---

## Components And Technologies

- **Nx + pnpm monorepo** — primary build spine; project-graph-aware, cache-aware, generator-heavy
- **TypeScript** — core constitutional logic language
- **Python** — specialist lane only: eval harnesses, embeddings, OCR/ASR, graph experiments
- **SQLite** — MVP local CAS index; Postgres/pgvector as adapter (post-alpha)
- **JCS (JSON Canonicalization Form)** — MVP subset; RFC 8785 full compliance deferred
- **Node crypto** — receipt signing (Ed25519 stub at MVP); nonce generation (bug: Math.random())
- **OPA/Rego** — deferred to P2; JSON policy bundle for MVP
- **SHACL** — receipt and tapestry shape validation
- **RRP Pack** — new pack kind: rosetta.pack with RRP-Light/Full/Auditor conformance tiers

---

## Conceptual Claims

1. **RRP-first MVP gate**: The smallest honest constitutional proof is a guarded non-side-effect toolcall (`builtin.echo`) with full receipt-bundle verification — not a `code.scaffold` dry-run. This establishes RRP as the invariant spine that all subsequent features build on.
2. **Two-staircase merge**: The synthesis merges "developer delight" scaffold energy (Nx/TS/React) with RRP constitutional strictness (deterministic canonicalization, CID stability, receipt verification). Neither approach is abandoned; they occupy different layers.
3. **Python as specialist, not core**: Constitutional logic (guard, receipts, tapestries, canonicalization) stays in TypeScript. Python is appropriate for evaluation harnesses, embeddings, and graph experimentation — tasks that are important but not constitutional.
4. **Storage as adapter**: The storage substrate is not a design constraint — it is an implementation detail that can be swapped. Local-first (SQLite) is correct for bootstrapping; Postgres/pgvector is correct for scale. The interface between them is what needs specification.
5. **Policy versioning as first-class**: Guard decision tokens must carry `policy_version` and `policy_hash`, making policy state explicit and auditable rather than implicit.

---

## Dependencies And Sequencing

1. **Canonicalization (JCS/CID)** — prerequisite for all receipt work; unstable canonicalizer is a risk
2. **RRP schemas (receipt + tapestry)** — prerequisite for guard admission logic
3. **Guard admission + deny-path tests** — requires both schemas and canonicalization
4. **builtin.echo slice (RC-2)** — requires guard admission
5. **code.scaffold dry-run (RC-3)** — requires builtin.echo working
6. **Local CAS + SQLite retrieval (RC-4)** — can proceed in parallel with RC-3
7. **Operator UI scaffold (RC-4, non-blocking)** — can start after RC-2
8. **Adapters, pgvector, OPA, swarm interfaces (post-alpha)** — post-RC-4 milestone

Critical path: canonicalization → RRP schemas → guard → builtin.echo

---

## Contradictions Or Supersession

| Superseded | Superseding | Nature |
|---|---|---|
| Generic receipt schema (prior PRDBlueprint runs) | RRP content model: subjects/claims/digests/policy_refs/nonce/auth/sig | RRP receipt schema wins per Unified Decision 7 |
| code.scaffold as slice-zero | builtin.echo as slice-zero (per the alternate run's argument) | Slice-zero is now builtin.echo; code.scaffold becomes slice-one |
| UI as alpha gate | UI scaffolded but non-blocking | Alpha gates are CLI/API, conformance, guard, receipts, replay only |
| Postgres/pgvector as prerequisite | Postgres/pgvector as adapter (post-alpha) | Storage deferral; SQLite MVP |
| Python as parallel constitutional lane | Python as specialist lane only | Python relegated to eval/embeddings/OCR; TypeScript is sole constitutional language |

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| RRP-001: Math.random() in cryptoNonce — replace with crypto.randomBytes() | security | `docs/intake/issue-drafts/rrp-001-math-random-nonce.md` | security, bug, rrp | — | receipt-bundle.ts uses Math.random() for nonce generation in a security-critical receipt context |
| RRP-002: Guard decision token signature verification is an MVP stub | security | `docs/intake/issue-drafts/rrp-002-guard-signature-stub.md` | security, guard, implementation | — | verifyDecisionSignature() only checks for presence of kid/sig_b64 fields, not actual cryptographic validity |
| RRP-003: ROCK-3111-C pack_id naming convention undefined | spec-gap | `docs/intake/issue-drafts/rrp-003-pack-id-naming.md` | spec-gap, rock, pack | — | ROCK-3111-C requires pack_id but does not define naming convention |
| RRP-004: check-traceability-headers.ts not enforced in CI or pre-commit | reliability | `docs/intake/issue-drafts/rrp-004-traceability-headers-not-enforced.md` | ci, audit, tooling | — | Standalone script exists but no pre-commit hook or CI gate references found |
| RRP-005: JCS MVP canonicalizer may not be RFC 8785 compliant — CID stability risk | risk | `docs/intake/issue-drafts/rrp-005-jcs-rfc8785-gap.md` | canonicalization, rfc8785, risk | — | "MVP-safe subset which may not fully align with RFC 8785"; Node JSON.stringify key ordering is not guaranteed stable |
| RRP-006: SQLite-to-Postgres migration path and adapter interface unspecified | open-question | `docs/intake/issue-drafts/rrp-006-sqlite-postgres-migration.md` | storage, migration, adapter | — | Alpha RC-4 defers to Postgres as adapter; no interface spec exists |

---

## Project Board Suggestions

- **Area:** Text-Core MVP / RRP Core
- **Cycle:** TC-005 (Promotion state machine is critical path) + TC-006 (Tapestry + rights + Postgres)
- **Status:** Active
- **Blocked by:** TC-005 (state machine gate); ROCK-3111-C formalization pending
- **Parallelization notes:** SQLite storage (RC-4) can proceed in parallel with code.scaffold dry-run (RC-3). Operator UI scaffold can begin after RC-2. Python specialist lanes (eval/embeddings) can run independently of constitutional core.

---

## Open Questions

1. What is the exact pack_id naming convention for Rosetta packs? (@rosetta/rrp? rrp? rosetta.rrp?)
2. What is the SQLite-to-Postgres adapter interface? When does migration become necessary?
3. Does Nx remote cache require content-authentication for cached artifacts in multi-tenant environments?
4. How is the policy_version rollback or migration path handled when policy_hash changes?
5. Is there a pre-commit hook enforcing traceability headers, or only the standalone script?
6. What is the upgrade path from JCS MVP subset to full RFC 8785 compliance?
7. When does Python become a constitutional liability vs. a useful specialist tool?
