# 2026-06-05 — Normative Staging Doctrine

## Metadata
- **Source:** docs/governance/20260410 - Entif.AI - Rosetta - Normative Staging Doctrine (v0.2).md
- **Extracted:** 2026-06-05
- **Confidence:** high

## Boundary
This artifact is docs-intelligence output for planning and orchestration. Not runtime ingestion.

## Summary
The Normative Staging Doctrine v0.2 is the governing build constitution for the Rosetta/Entif implementation era. It establishes a three-rung staircase (Constitutional Bootstrap → Text-Core MVP → MVP Alpha RC), a four-tier authority hierarchy, receipt law requiring receipts for all meaningful artifacts and transforms, memory-plane separation into truth/provenance, temporal state, and activation/recall planes, storage progression by phase, and 14 binding ADRs. It freeze-rays key architectural decisions to prevent drift.

## Findings

### [F1] Three-rung staircase: Bootstrap, Text-Core MVP, Alpha RC
**Confidence:** high
**Reference:** Section 3 (lines ~90–160)
**Content:** The doctrine defines three mandatory staging rungs: (A) Constitutional Bootstrap — prove the blood chemistry, not broad usefulness; scope includes canonicalization, CID minting, schema validation, receipt emission, guard decision tokens, replay/tamper tests, CLI/API proof. (B) Text-Core MVP — become recognizably useful on real heterogeneous text sources; includes ingest, deterministic ingress refinery, source→observation→interpretation→tapestry progression, rights-scoped retrieval, English accompaniment. (C) MVP Alpha RC — satisfy the true ratified threshold; includes heterogeneous text ingest reliability, Ithkuil grammar corpus to interpretability threshold, lexical anchor mapping, English accompaniment on all tiles/tapestries, temporal and activation memory demonstrable, receipt-bundle verification for audited claims, mission-control view, conformance+migration tests. The older "tiny dry-run-only alpha" is formally demoted to bootstrap proof.

### [F2] Authority hierarchy — constitutional, implementation, expansion, design donor
**Confidence:** high
**Reference:** Section 1, ADR-0001
**Content:** Four-tier authority ranking: (1.1) Constitutional — Rosetta v3.0.0 Core Spine, ROCK-31XX, Entif guard/zero-trust posture, identity-sensitive governance addendum. (1.2) Implementation — 2026-04-10 consolidated blueprint, revisions/synthesis, this Doctrine v0.2, ROCK-3111-C pack filesystem contract, OB1 Assimilation Addendum, Phased Backlog v0.1. (1.3) Expansion — Memory/Context PRD, Cost-Savings Agentic OS PRD, Agentic workflows overview, orchestrator material, Entif 2.0 architecture/roadmap. (1.4) Design donors only — OB1/Open Brain (repo morphology, contribution grammar, workflow recipes), Graphiti/Zep (temporal KG memory), Muninn (activation/relevance memory), Paperclip-style control plane. Chronology rule: newer narrow documents do NOT erase older constitutional law unless explicit migration-safe override.

### [F3] Receipt law — every meaningful artifact or transform requires receipt
**Confidence:** high
**Reference:** Section 4, ADR-0002
**Content:** Constitutive principle: no meaningful artifact or meaningful transform is valid without a receipt path. Covers: ingest promotions, schema-aware routing, classification decisions, dedupe/revision resolutions, lexical/conceptual mappings, tapestry compilations, guard decisions, evaluations, migrations/translators, externally asserted verified claims. RRP content model prioritized: subjects, claims, digests, policy_refs, nonce, auth, sig, bundle closure metadata. Receipt absence is a failure condition, not a logging omission.

### [F4] Memory-plane separation — three distinct planes with distinct semantics
**Confidence:** high
**Reference:** Section 5.2, ADR-0006
**Content:** Three memory planes: Plane 1 (Rosetta truth/provenance plane) — immutable receipted tiles, policies, receipts, compiled tapestries, lineage, verification closure. Plane 2 (temporal state/history plane) — episodic ingest, temporally aware relations, historical truth handling, evolving-state recall, hybrid search across time/text/semantics/graph. Plane 3 (activation/recall plane) — recency/frequency-aware scoring, association-weight updates, conflict-aware confidence modulation, total-recall preservation, proactive/trigger-style relevance. Pruning law: never delete truth-store tiles to simulate forgetting; prune indexes, caches, activation priorities, and derived projections. Long-tail retrieval may cool but must not silently disappear from constitutional truth layer.

### [F5] Storage by phase — CAS+SQLite bootstrap → Postgres+pgvector by alpha
**Confidence:** high
**Reference:** Section 5.1, ADR-0005
**Content:** Bootstrap phase: content-addressed local store, SQLite index acceptable and preferred. Text-Core/Alpha RC: Postgres JSONB + RLS/rights enforcement, pgvector for portable vector baseline, graph and activation layers as sidecars/adapters or native imitations.

### [F6] Text-only-first is binding
**Confidence:** high
**Reference:** Section 6.1, ADR-0007
**Content:** First serious RC is text-first. Video, audio, image, other media may participate only via extracted text until later phases.

### [F7] Ingress refinery as Pillar Zero — cheap deterministic work before semantic hydration
**Confidence:** high
**Reference:** Section 6.2, ADR-0008
**Content:** Before costly semantic hydration, mandatory cheap deterministic work: normalization, hashing, dedupe, revision detection, source typing, metadata extraction, policy/safety screening, promotion gating, candidate-tapestry planning.

### [F8] Parse-only default + guard-mediated side effects
**Confidence:** high
**Reference:** Section 7.1, ADR-0009
**Content:** Ambient or passive ingest operates in parse-only mode by default. No side-effecting action allowed without explicit transition into action-authorized mode. Guard requirements: deny-by-default, structured decision tokens, short-lived expiry, policy hash/version binding, subject/tool/resource caps, replay refusal, admission checks in executors.

### [F9] Rights at retrieval boundary — retrieve-then-filter is forbidden
**Confidence:** high
**Reference:** Section 7.3, ADR-0010
**Content:** Rights must be enforced at retrieval/storage boundary. "Retrieve then filter later" is forbidden for sensitive or scoped data.

### [F10] TypeScript-first spine, Python specialist lane
**Confidence:** high
**Reference:** Section 8, ADR-0011
**Content:** TypeScript/Nx/pnpm is the constitutional implementation lane. Python allowed for: eval harnesses, OCR/ASR, embeddings/ML experiments, corpus utilities, graph experimentation, other specialist workloads. Python must not become a shadow constitution for core runtime, core schemas, guard, receipt, or tapestry law.

### [F11] 14 binding ADRs codified
**Confidence:** high
**Reference:** Section 9 (ADR-0001 through ADR-0014)
**Content:** ADR-0001 Authority hierarchy, ADR-0002 Receipt primacy, ADR-0003 Three-rung staircase, ADR-0004 Semantic latticing vs. cognitive tapestry (process vs. artifact), ADR-0005 Storage by phase, ADR-0006 Memory-plane separation, ADR-0007 Text-only-first, ADR-0008 Ingress refinery as Pillar Zero, ADR-0009 Parse-only default and guard-mediated side effects, ADR-0010 Rights at retrieval boundary, ADR-0011 TS-first spine, Python specialist lane, ADR-0012 OB1 as process donor only, ADR-0013 Tool-budget doctrine, ADR-0014 Identity-sensitive governance.

### [F12] Standardized terminology locked in — process vs. artifact splits enforced
**Confidence:** high
**Reference:** Section 2
**Content:** Required distinctions: semantic latticing = process; cognitive tapestry = compiled artifact; receipt-bundle tapestry = verification-closure tapestry profile; constitutional bootstrap = smallest honest proof; text-core MVP = first ingest-and-interpret rung; MVP alpha RC = true alpha threshold. Forbidden conflations: raw signals vs. interpretations, observations vs. conjectures, core semantics vs. pack semantics, truth store vs. cache/index, parse-only ingest vs. side-effecting command execution, design donor methodology vs. constitutional substrate, bootstrap proof vs. alpha RC.

### [F13] AI-readable repo rule and tool-budget discipline
**Confidence:** high
**Reference:** Sections 8.3, 8.4
**Content:** Every important package, pack, recipe, skill, and integration must be: machine-legible, explicit about prerequisites, explicit about acceptance conditions, example-rich, narrow in purpose, traceability-headed where appropriate. Tool budgets must be defined per role/session, routing ambiguity must be tested, CRUD-ish surfaces should be consolidated.

### [F14] Identity-sensitive controls for personhood-level modeling
**Confidence:** high
**Reference:** Section 7.4, ADR-0014
**Content:** Any person-modeling, simulation, stylometric identity, cognitive-twin, or impersonation-adjacent workflow must default to elevated policy, explicit classification, and human-in-the-loop authorization.

### [F15] Directive: freeze doctrine, author ADRs, drive implementation from failing tests
**Confidence:** high
**Reference:** Section 10
**Content:** Immediate directives: (1) freeze doctrine in docs/doctrine/Doctrine-v0.2.md; (2) author docs/adr/ADR-0001 through ADR-0014; (3) treat ROCK-3111-C as next normative contract; (4) treat OB1 Assimilation Addendum as process-law augmentation; (5) drive implementation from phased backlog expressed as failing tests and targeted package stubs.

## Issue Candidates

### [NSD-001] ADR-0001 through ADR-0014 not yet authored in docs/adr/
**Priority:** P1
**Description:** Doctrine v0.2 Section 10 directive #2 requires authoring ADR-0001 through ADR-0014. Check if these files exist in docs/adr/. If not, this is a blocking gap — the 14 binding ADRs are declared but not instantiated as individual ADR documents, which means they lack the formal artifact lifecycle that makes them enforceable in the docs-intake pipeline.

### [NSD-002] Doctrine v0.2 not yet frozen in docs/doctrine/Doctrine-v0.2.md
**Priority:** P1
**Description:** Doctrine v0.2 Section 10 directive #1 requires freezing the doctrine in docs/doctrine/Doctrine-v0.2.md. This is the canonical living-copy location. If the file does not exist at that path, the doctrine has not been formally installed into the governance artifact tree and references to it from other artifacts may be dangling.

### [NSD-003] Phased Backlog v0.1 not represented as failing tests / package stubs
**Priority:** P2
**Description:** Directive #5 says implementation should be driven from the phased backlog expressed as failing tests and targeted package stubs. There is no evidence in the current docs-intake artifacts that backlog items have been translated into executable acceptance criteria. Without failing tests, there's no programmatic proof the doctrine is being operationalized.

### [NSD-004] Memory plane separation — Plane 2 temporal state and Plane 3 activation/recall have no demonstrated implementation
**Priority:** P2
**Description:** The three memory planes (truth/provenance, temporal state, activation/recall) are defined in doctrine but there is no evidence of Plane 2 or Plane 3 implementation artifacts in the docs-intake corpus. The doctrine requires these planes to be "demonstrably" improving stateful recall and right-memory-first behavior by Alpha RC. Without package stubs or spec artifacts for these planes, staging compliance cannot be verified.

### [NSD-005] ROCK-3111-C as next normative contract — no docs-intake artifact found
**Priority:** P2
**Description:** Doctrine v0.2 names ROCK-3111-C as the next normative contract (directive #3). No extraction artifact for ROCK-3111-C was found in the docs-intake/docs-intelligence directory. Given the doctrine treats this as the immediate next contractual step, its absence is a compliance gap.