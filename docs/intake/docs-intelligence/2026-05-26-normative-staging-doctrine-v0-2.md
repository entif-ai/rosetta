# Docs Intelligence Extraction: Normative Staging Doctrine v0.2

## Source

- Path: `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md`
- Title: Doctrine v0.2 — Rosetta + Entif Normative Staging Doctrine
- Date evidence: 2026-04-10 (path date + declared in document)
- Authority tier: `constitutional` (implementation authority for current build wave)
- Freshness: `current` (binding unless superseded by explicit ADR)
- Word count: 1,937
- Extractor: docs-intelligence subagent
- Extraction date: 2026-05-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

The Normative Staging Doctrine v0.2 is the governing build constitution for the current Rosetta/Entif implementation era. It establishes the authority hierarchy (constitutional > implementation > expansion > design donor), codifies the three-rung staircase (Bootstrap → Text-Core MVP → MVP Alpha RC), declares Receipt Law as a first-class acceptance gate, defines the storage-by-phase trajectory (SQLite → Postgres+pgvector), mandates TS-first with Python as a specialist lane, and records 14 binding ADRs. It is the single most operationally authoritative document for the current build wave and must not be silently overridden by newer narrow documents.

---

## Goals And Intent

1. **Stop architectural drift** — freeze the most important ratified decisions as binding engineering law
2. **Translate prior synthesis into binding doctrine** — consolidate 2026-04-10 blueprint and revisions into operational rule
3. **Clarify authority hierarchy** — prevent newer narrow docs from silently overriding constitutional law
4. **Establish staging thresholds** — make Bootstrap / Text-Core / Alpha RC boundaries crisp and measurable
5. **Codify Receipt Law as first-class** — receipt absence = failure condition, not logging omission
6. **Record 14 binding ADRs** — make decisions findable, citable, and changeable only via explicit ADR process

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Freeze doctrine at `docs/doctrine/Doctrine-v0.2.md` | Section 10, Directive 1 | `docs/doctrine/` | high | Currently at `docs/governance/`; canonical path TBD |
| Author ADRs ADR-0001 through ADR-0014 | Section 10, Directive 2 | `docs/adr/` | high | All 14 ADRs already listed in Section 9; need individual files |
| Treat `ROCK-3111-C` as next normative contract | Section 10, Directive 3 | pack-filesystem | high | Already in progress |
| Treat `OB1 Assimilation Addendum` as process-law augmentation | Section 10, Directive 4 | process/workflow | high | Not a constitutional rewrite |
| Express backlog as failing tests + targeted package stubs | Section 10, Directive 5 | `packages/` | high | Converts intent into measurable acceptance |
| Tool-budget doctrine must be measurable per role/session | ADR-0013, Section 8.4 | guard, context-compiler | medium | Routing ambiguity treated as regression |
| Identity-sensitive workflows default to elevated policy + HITL | Section 7.4 | guard, governance | high | Elevated policy for person-modeling/simulation |
| Rights enforcement at retrieval boundary — no retrieve-then-filter | ADR-0010, Section 7.3 | retrieval, storage-boundary | high | Enforced at boundary, not post-facto |
| Parse-only mode default; guard mediates all side effects | ADR-0009, Section 7.1 | guard, execution-layer | high | Deny-by-default posture |
| Text-only-first binding until serious RC | ADR-0007, Section 6.1 | text-core, multimodal | high | Video/audio/image only via extracted text |
| Pruning law: never delete truth-store tiles to simulate forgetting | Section 5.3 | storage, memory-plane-1 | high | Cool long-tail; must not disappear from constitutional layer |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 1.1, Constitutional authority | authority-hierarchy, constitutional-law | four constitutional sources | decision | The four constitutional authorities are: (1) Rosetta v3.0.0 Core Spine Specification, (2) ROCK-31XX and immediate RRP refinement, (3) Entif guard/zero-trust posture, (4) identity-sensitive governance addendum for personhood-level modeling | Section 1.1 | These four sources are invariant; cannot be overridden by newer narrow documents without explicit ADR | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 1.3, Expansion authority | authority-hierarchy, expansion-authority | 2026-04-09 PRD docs, orchestrator material, Entif 2.0 broader docs | decision | Expansion authority includes Memory/Context PRD, Cost-Savings Agentic OS PRD, Agentic workflows overview, and Entif 2.0 broader docs — these are beta-expansion or broader-shape only | Section 1.3 | Do not treat these as constitutional; they shape scope but not law | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 1.4, Design donors | authority-hierarchy, design-donors | OB1, Graphiti, Zep, Muninn, paperclip | decision | OB1, Graphiti/Zep, Muninn, and Paperclip-style control plane are design donors only — methodology donors, not ontology or governance authorities | Section 1.4 | Import workflow grammar, not platform gravity or ontology | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 1.5, Chronology rule | authority-hierarchy, supersession | chronology tiebreaker | decision | Newer narrow implementation doc does NOT erase older constitutional law unless it explicitly overrules in a migration-safe way; chronology is tie-breaker only | Section 1.5 | Prevents silent erosion of constitutional authority by newer docs | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 2.1, Required distinctions | terminology, semantic-latticing, cognitive-tapestry | semantic latticing, cognitive tapestry, receipt-bundle tapestry | decision | Semantic latticing = process; cognitive tapestry = compiled bounded artifact; receipt-bundle tapestry = specific tapestry profile for verification closure; Constitutional Bootstrap = smallest honest proof of Rosetta/Guard/Receipt loop | Section 2.1 | Terminology must stay distinct operationally; conflating them is a forbidden anti-pattern (Section 2.2) | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 2.2, Forbidden conflations | terminology, forbidden-conflations | six forbidden pairs | decision | Six pairs that must remain distinct: raw signals vs interpretations, observations vs conjectures, core vs pack semantics, truth store vs cache/index, parse-only ingest vs side-effecting command, design donor methodology vs constitutional substrate, bootstrap proof vs alpha RC | Section 2.2 | Violations are doctrinal regressions | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 3, Three-rung staircase | three-rung-staircase, bootstrap, text-core, alpha-rc | rung A/B/C scope | decision | Rung A = Constitutional Bootstrap (prove blood chemistry), Rung B = Text-Core MVP (recognizably useful), Rung C = MVP Alpha RC (true ratified threshold); earlier "alpha" notion is formally demoted to bootstrap proof | Section 3 | Old "alpha" reference in prior docs is now demoted; cross-reference expected in scope-gate docs | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 3.1, Rung A non-goals | three-rung-staircase, bootstrap, non-goals | what bootstrap does NOT include | decision | Rung A explicitly excludes: real productivity orchestration, rich UI, temporal graph memory, activation memory, source ingestion breadth, multimodal input, distributed swarm functions | Section 3.1 | Bootstrap scope must stay narrow; feature creep into bootstrap is a regression | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 3.2, Rung B mandatory scope | three-rung-staircase, text-core, mandatory-scope | what Text-Core MVP must include | decision | Rung B mandatory: multiple structurally distinct text-source families, deterministic ingress refinery, source→observation→interpretation→tapestry, rights-scoped retrieval, English accompaniment for promoted artifacts, receipt emission on all meaningful promotions, Postgres/pgvector baseline before serious RC claims | Section 3.2 | TC-005 and TC-006 directly track this; Postgres/pgvector baseline is a hard gate for RC claims | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 3.3, Rung C mandatory scope | three-rung-staircase, alpha-rc, mandatory-scope | what MVP Alpha RC must include | decision | Rung C mandatory: heterogeneous text-source families ingest reliably, Ithkuil grammar corpus processed to satisfactory interpretability, lexical anchor mapping exists, English accompaniment on all relevant tiles/tapestries, temporal memory plane demonstrably improves stateful recall, activation memory plane demonstrably improves "right memory first", receipt-bundle verification for meaningful audited claims, mission-control/inspection view usable, conformance + migration tests pass | Section 3.3 | This is the true alpha threshold; conformance + migration tests must exist as acceptance gate | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 4.1, Constitutive principle | receipt-law, receipts, failure-condition | what requires receipts | requirement | Every meaningful artifact or transform requires a receipt path: ingest promotions, schema-aware routing choices, classification decisions, dedupe/revision resolutions, lexical/conceptual mappings, tapestry compilations, guard decisions, evaluations, migrations/translators, externally asserted "verified" claims | Section 4.1 | Receipt absence is a failure condition, not a logging omission — this is stricter than prior "conceptual spine" language | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 4.3, RRP content posture | receipt-law, rrp, rrp-content-model | RRP standard payload shape | decision | RRP content model prioritizes: subjects, claims, digests, policy_refs, nonce, auth, sig, bundle closure metadata | Section 4.3 | RRP takes precedence over generic receipt hand-waving | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 5.1, Storage by phase | storage, sqlite, postgresql, pgvector, bootstrap, text-core | storage trajectory | decision | Bootstrap: CAS + SQLite index acceptable/preferred; Text-Core/Alpha RC: Postgres JSONB + RLS/rights + pgvector; graph and activation layers as sidecars or native imitations | Section 5.1 | Current Bootstrap uses SQLite; NOT LAME specifies PostgreSQL as canonical; migration gap acknowledged in prior DI work (DI-011 collision) | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 5.2, Memory plane separation | memory-planes, plane-1, plane-2, plane-3, truth, temporal, activation | three-plane memory architecture | decision | Plane 1 = truth/provenance (immutable receipted tiles, policies, receipts, compiled tapestries, lineage, verification closure); Plane 2 = temporal state/history (episodic ingest, temporally aware relations, historical truth, evolving-state recall, hybrid search); Plane 3 = activation/recall (recency/frequency-aware scoring, association-weight updates, conflict-aware confidence, total-recall preservation, proactive/trigger-style relevance) | Section 5.2 | Aligned with NOT LAME 5-layer map; sidecar vs native decision deferred per implementation | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 5.3, Pruning law | pruning, memory-plane-1, truth-store, constitutional | never delete truth tiles | decision | Never delete truth-store tiles to simulate forgetting; prune indexes, caches, activation priorities, and derived projections; long-tail retrieval may cool but must not silently disappear from constitutional truth layer | Section 5.3 | Constitutional constraint: truth layer is append-only at tile level | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 6.1, Text-only-first | text-only-first, multimodal, binding | video/audio/image restriction | decision | First serious RC is text-first; video, audio, image, other media may participate only via extracted text until later phases | Section 6.1 | Binding constraint; multimodal cannot derail alpha staging | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 6.2, Ingress refinery as Pillar Zero | ingress-refinery, text-core, pillar-zero | deterministic cheap-first | decision | Before costly semantic hydration, mandatory cheap deterministic work: normalization, hashing, dedupe, revision detection, source typing, metadata extraction, policy/safety screening, promotion gating, candidate-tapestry planning | Section 6.2 | Ingress refinery is Pillar Zero — structural token economy and correctness favor | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 6.3, Raw capture preservation | raw-capture, source-episode, evidence-preservation | raw source never overwritten | decision | Raw source evidence always preserved as source/episode material; never overwritten by later interpretation | Section 6.3 | Source episode fidelity is non-negotiable | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 6.4, Ambiguity law | ambiguity, conjectures, pending-confirmation | ambiguity handling | decision | Ambiguity must produce conjectures, alternatives, or pending-confirmation artifacts rather than fake certainty | Section 6.4 | Anti-hallucination safeguard at doctrine level | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 7.1, Parse-only default | parse-only, guard, side-effects, deny-by-default | parse-only default posture | decision | Ambient or passive ingest operates in parse-only mode by default; no side-effecting action allowed without explicit transition into action-authorized mode | Section 7.1 | Governs all passive/ambient pathways | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 7.2, Guard law | guard, guard-law, decision-tokens, deny-by-default | guard requirements | requirement | All side-effecting execution must be mediated by Guard with: deny-by-default, structured decision tokens, short-lived expiry, policy hash/version binding, subject/tool/resource caps, replay refusal, admission checks in executors | Section 7.2 | Guard law is constitutional; the 9-step write-admission gate in NOT LAME is the implementation | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 7.3, Rights enforcement boundary | rights, retrieval-boundary, no-retrieve-then-filter | rights at boundary | decision | Rights must be enforced at retrieval/storage boundary; "retrieve then filter later" is forbidden for sensitive or scoped data | Section 7.3 | Rights-scoped retrieval is binding architecture, not a later refinement | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 7.4, Identity-sensitive controls | identity-sensitive, personhood, cognitive-twin, elevated-policy | identity-sensitive workflows | requirement | Any person-modeling, simulation, stylometric identity, cognitive-twin, or impersonation-adjacent workflow must default to elevated policy, explicit classification, and human-in-the-loop authorization | Section 7.4 | Direct alignment with DI-012 anti-personhood-correlation constraint from prior extraction | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 8.1, TS-first spine | typescript-first, ts-first, nx, pnpm | TS constitutional implementation lane | decision | TypeScript / Nx / pnpm is the constitutional implementation lane | Section 8.1 | Python specialist lane is exception only | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 8.2, Python specialist lane | python-specialist, python-exceptions | Python allowed exceptions | decision | Python allowed for: eval harnesses, OCR/ASR, embeddings/ML experiments, corpus utilities, graph experimentation, other specialist workloads; Python must NOT become shadow constitution for core runtime, core schemas, guard, receipt, or tapestry law | Section 8.2 | Hard boundary: Python cannot govern core constitutional runtime | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 8.3, AI-readable repo rule | ai-readable-repo, machine-legible, explicit-prerequisites | machine-legibility requirement | requirement | Every important package, pack, recipe, skill, and integration should be: machine-legible, explicit about prerequisites, explicit about acceptance conditions, example-rich, narrow in purpose, traceability-headed where appropriate | Section 8.3 | This is a structural requirement; it applies to all first-class repo artifacts | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 8.4, Tool-budget discipline | tool-budget, routing-ambiguity, context-waste | tool-surface as systems concern | decision | Tool budgets must be defined per role/session; routing ambiguity must be tested; CRUD-ish surfaces should be consolidated where that improves clarity; tool-surface size is a measurable systems concern | Section 8.4 | Routing ambiguity and context waste treated as regressions | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 9, ADR register | adr, decision-log, binding-decisions | 14 binding ADRs | decision | ADR-0001 through ADR-0014 are all Accepted and binding: Authority hierarchy, Receipt primacy, Three-rung staircase, Semantic latticing vs cognitive tapestry, Storage by phase, Memory-plane separation, Text-only-first, Ingress refinery as Pillar Zero, Parse-only default and guard, Rights at retrieval boundary, TS-first spine with Python specialist lane, OB1 as process donor only, Tool-budget doctrine, Identity-sensitive governance | Section 9 | Individual ADR files do not yet exist; Directive 2 requires authoring them | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 10, Directives | directives, immediate-actions | 5 immediate directives | requirement | (1) Freeze doctrine in `docs/doctrine/Doctrine-v0.2.md`; (2) Author ADRs ADR-0001–ADR-0014; (3) Treat `ROCK-3111-C` as next normative contract; (4) Treat OB1 Assimilation Addendum as process-law augmentation; (5) Express backlog as failing tests + targeted package stubs | Section 10 | These are immediate actions, not deferred planning | high |
| 2026-05-26 | `docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md` | Section 11, Supersession rule | supersession, adr-process | how doctrine can be changed | decision | Doctrine can be superseded only by: (a) later doctrine artifact with explicit migration-safe changes, or (b) individual ADRs that modify specific sections without reopening whole constitution; silent drift is NOT a supersession mechanism | Section 11 | Constitutional protection against silent override | high |

---

## Components And Technologies

- **Doctrine artifact** — governing build constitution; lives at `docs/doctrine/Doctrine-v0.2.md` per Section 10 Directive 1
- **ADR register** — 14 binding decisions in Section 9; need individual files at `docs/adr/ADR-0001.md` through `docs/adr/ADR-0014.md`
- **Three-rung staircase model** — Bootstrap (Rung A), Text-Core MVP (Rung B), MVP Alpha RC (Rung C)
- **Storage-by-phase model** — SQLite for bootstrap, Postgres JSONB + pgvector for serious RC
- **Three-plane memory model** — Plane 1 (truth/provenance), Plane 2 (temporal/state), Plane 3 (activation/recall)
- **Receipt Law** — constitutional first-class requirement; absence = failure condition
- **RRP content model** — subjects, claims, digests, policy_refs, nonce, auth, sig, bundle closure
- **Ingress refinery as Pillar Zero** — cheap deterministic first, then semantic hydration
- **Guard law** — deny-by-default, structured decision tokens, short-lived expiry, policy binding, caps, replay refusal
- **Identity-sensitive controls** — elevated policy default for person-modeling/simulation/cognitive-twin
- **Tool-budget doctrine** — per role/session, measurable, routing ambiguity = regression

---

## Conceptual Claims

1. **Constitutional authority cannot be silently overridden** — newer narrow docs cannot erase older constitutional law without explicit ADR
2. **Bootstrap is proof-of-blood-chemistry, not usefulness** — early "alpha" demoted to bootstrap proof; true alpha requires full Rung C
3. **Receipt law is first-class acceptance gate** — stricter than prior "conceptual spine" language; every meaningful transform needs receipt
4. **Parse-only is the default ambient posture** — guard mediates all side effects; explicit action-authorized mode required to cross
5. **Text-only-first is binding until serious RC** — multimodal via extracted text only; cannot derail alpha staging
6. **Storage trajectory is phase-gated** — SQLite bootstrap → Postgres+pgvector for real RC; not binary choice
7. **Memory planes are architecturally distinct** — truth/provenance (Plane 1) is append-only; Plane 2/3 can prune derived projections
8. **Pruning law protects constitutional truth** — never delete truth-store tiles to simulate forgetting; cool long-tail, not disappear
9. **Design donors are methodology only** — OB1, Graphiti, Muninn, Paperclip are workflow/process donors, not ontology authorities
10. **OB1 assimilation is process-law augmentation** — not a constitutional rewrite; process grammar only
11. **Python is specialist, not constitutional** — Python cannot govern core runtime, guard, receipt, or tapestry law
12. **AI-readable repo is structural requirement** — machine-legible prerequisites, acceptance conditions, traceability
13. **Identity-sensitive workflows require elevated policy** — personhood-level modeling/simulation defaults to elevated controls + HITL
14. **Tool-surface size is a systems concern** — routing ambiguity and context waste are regressions
15. **Supersession requires explicit ADR** — silent drift is not a supersession mechanism; doctrine is protected

---

## Dependencies And Sequencing

1. **Doctrine canonical path** — current location is `docs/governance/`; Section 10 Directive 1 specifies `docs/doctrine/Doctrine-v0.2.md`; moving requires architectural ADR
2. **ADR files** — 14 ADRs listed in Section 9 but not yet as individual files; need `docs/adr/ADR-0001.md` through `docs/adr/ADR-0014.md`; this is immediate per Directive 2
3. **Bootstrap → Text-Core → Alpha RC sequencing** — Rung A must pass before Rung B work is valid; Rung B must pass before Rung C claims
4. **SQLite → PostgreSQL migration** — Bootstrap uses SQLite; NOT LAME specifies PostgreSQL as canonical; TC-006 gap acknowledged; migration plan needed
5. **Receipt Law enforcement** — requires receipt schema + RRP content model + verification closure; guard must emit receipts on all meaningful mutations
6. **Ingress refinery (Pillar Zero)** — must be operational before text-core can claim deterministic refinement; source-episode → observation → interpretation → tapestry chain depends on it
7. **Memory planes** — Plane 1 (truth/provenance) is constitutional; Planes 2/3 as sidecars vs native is deferred implementation decision
8. **Rights-scoped retrieval** — must be enforced at storage boundary before text-core claims are valid; no retrieve-then-filter
9. **OB1 assimilation** — process-law augmentation, not constitutional rewrite; OB1 workflow grammar can be imported without importing ontology

---

## Contradictions Or Supersession

1. **Doctrine vs. old "alpha" claims** — prior docs referring to "alpha" as a release gate must be cross-referenced; Doctrine v0.2 formally demotes early dry-run "alpha" to bootstrap proof. This is a retroactive correction that needs to propagate to prior PRDs and backlog documents. No prior doc explicitly overrides this, so it stands as the correction.
2. **Doctrine vs. broader Entif 2.0 docs** — Section 1.3 places Entif 2.0 architecture/roadmap in "expansion authority" (beta-shape only), not constitutional. This is a downgrade from how those docs were previously treated. The 2025-11-15 blueprint and related docs are now explicitly scoped as design donors / broader shape, not law. This may create tension with how those docs have been referenced in earlier planning. No contradiction — the doctrine is the override.
3. **Doctrine vs. Python-first inclinations** — Section 8.1/8.2 explicitly bars Python from becoming "shadow constitution" for core runtime. Any implementation pushing Python into core guard, receipt, or tapestry layers is a doctrinal violation. This directly constrains the Python specialist lane to specialist workloads only.
4. **Doctrine vs. multimodal ambitions** — Section 6.1 is binding: video/audio/image cannot be first-class until later phases. This overrides any implicit roadmap that suggested multimodal was near-term. Explicitly binding.
5. **Doctrine vs. ambiguous supersession in prior docs** — Section 11 explicitly prohibits silent drift as a supersession mechanism. Any prior doc that was implicitly treated as overriding constitutional authority via chronology alone is now explicitly invalidated.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| NSD-001: Author all 14 ADRs as individual files | governance | `docs/intake/issue-drafts/nsd-001-author-14-adrs.md` | governance, adr, doctrine | — | Section 10 Directive 2: "Author ADR-0001 through ADR-0014"; ADRs listed in Section 9 but no individual files exist yet |
| NSD-002: Freeze doctrine at canonical path `docs/doctrine/Doctrine-v0.2.md` | governance | `docs/intake/issue-drafts/nsd-002-doctrine-canonical-path.md` | governance, doctrine, repo-structure | — | Section 10 Directive 1: freeze at `docs/doctrine/Doctrine-v0.2.md`; currently at `docs/governance/` |
| NSD-003: Clarify SQLite → PostgreSQL migration timeline for Bootstrap → Text-Core | implementation | `docs/intake/issue-drafts/nsd-003-sqlite-postgres-migration.md` | storage, bootstrap, text-core, postgresql | TC-005 (Promotion state machine) | Doctrine Section 5.1 specifies Postgres/pgvector baseline before serious RC claims; Bootstrap uses SQLite; TC-006 blocked until TC-005; migration gap needs explicit resolution |
| NSD-004: Ingress refinery (Pillar Zero) must be operational before Text-Core claims | implementation | `docs/intake/issue-drafts/nsd-004-ingress-refinery-pillar-zero.md` | ingress-refinery, text-core, pillar-zero | TC-005 | Section 6.2: ingress refinery is Pillar Zero; mandatory cheap deterministic work before semantic hydration; TC-005/TC-006 cannot claim completion without it |
| NSD-005: Implement tool-budget doctrine with measurable per-role budgets | implementation | `docs/intake/issue-drafts/nsd-005-tool-budget-doctrine.md` | tool-budget, guard, context-compiler | — | Section 8.4: tool budgets must be defined per role/session; routing ambiguity is regression; no current implementation |
| NSD-006: Propagate "alpha demotion" correction to prior PRD/backlog docs | documentation | `docs/intake/issue-drafts/nsd-006-alpha-demotion-propagation.md` | documentation, scope-corrections, three-rung-staircase | — | Section 3: old "alpha" notion formally demoted to bootstrap proof; prior docs using old alpha claims need cross-reference correction |

---

## Project Board Suggestions

- **Area:** Governance / Constitutional Layer
- **Cycle:** Current build wave (Rung A Bootstrap → Rung B Text-Core)
- **Status:** Doctrine is current; ADRs are not yet files; migration plan is missing
- **Blocked by:** NSD-001 (ADR files needed before other governance work can cite them)
- **Parallelization notes:** NSD-001 and NSD-002 are independent; NSD-003 (migration) is blocked by TC-005; NSD-004 is blocked by TC-005; NSD-005 can be started independently; NSD-006 can be done in parallel

---

## Open Questions

1. **Canonical path for doctrine** — Section 10 Directive 1 says `docs/doctrine/Doctrine-v0.2.md` but moving from `docs/governance/` requires an ADR or a migration-safe relocation. Should we create the `docs/doctrine/` directory and file, or is the current `docs/governance/` location acceptable as the canonical location pending a formal ADR?
2. **OB1 assimilation addendum relationship to this doctrine** — Section 10 Directive 4 treats OB1 as process-law augmentation. What is the exact boundary between what OB1 governs (contribution grammar, workflow recipes, AI-readable repo habits, tool-surface discipline) and what it cannot touch (ontology, constitutional substrate)? A formal delineation would prevent scope creep.
3. **Memory planes as sidecars vs native** — Section 5.2 describes Plane 2 (temporal) and Plane 3 (activation) but does not specify whether they are sidecar adapters or native PG implementations. This is a deferred decision that impacts TC-006 scope. What triggers this decision?
4. **Tool-budget measurement** — Section 8.4 requires tool budgets to be "defined per role/session" and treated as measurable systems concern. What is the instrumentation approach? Who owns the metric?
5. **Ingress refinery scope boundary** — Pillar Zero is defined in terms of cheap deterministic work (normalization, hashing, dedupe, revision detection, source typing, metadata extraction, policy/safety screening, promotion gating, candidate-tapestry planning). What is the exact boundary between Pillar Zero and the semantic promotion layer? At what point does "cheap" become "costly"?
6. **Supersession procedure** — Section 11 says doctrine can be superseded by explicit ADR. What is the minimum viable ADR process for doctrine amendment? How many maintainers must ratify? What is the migration-safety bar?
7. **Identity-sensitive controls implementation** — Section 7.4 requires elevated policy, explicit classification, and HITL for personhood-level modeling. Is there a defined threshold for what counts as "personhood-level"? Who classifies? What does HITL look like in an automated system?