# Docs Intelligence Extraction — docs/PRDs/20260426 - Entif and Rosetta PRD.md

## Document Metadata

| Field | Value |
|---|---|
| **Source** | `docs/PRDs/20260426 - Entif and Rosetta PRD.md` |
| **Extracted** | 2026-04-26 |
| **Cycle** | DI-009 |
| **Authority** | PRD-class (governing) |
| **Concepts** | `governance`, `architecture`, `text-core`, `source-substrate`, `ingress-refinery`, `canonical-cache`, `guard`, `receipts`, `pack-conformance`, `memory-planes`, `tapestry`, `rights-scoping`, `multi-vector-scoring`, `bootstrap`, `parse-only`, `provenance`, `source-registry`, `docs-intelligence` |
| **Confidence** | HIGH — PRD class, correlated against live repo surfaces |
| **Locators** | file-based citations embedded in doc body (e.g. `turn28file0`, `turn5file1`) |

---

## Executive Synthesis

### Finding F-01: Repo + Drive correlation sharpens product definition

The document explicitly correlates the `crates/rosetta` fork against the Drive corpus and finds strong alignment. Rosetta is now confirmed as a **working provenance-kernel prototype** with bootstrap packages for canonicalization, CIDs, tile construction, receipt creation/verification, guard decisions, source-substrate modeling, source-registry fixtures, fixture-backed ingress refinery, and an in-memory canonical cache. The product definition is therefore grounded in actual repo surfaces, not speculation.

- **Locator**: `Executive synthesis` — `turn28file0`, `turn5file1`
- **Confidence**: HIGH

### Finding F-02: Docs intelligence is explicitly separate from runtime Rosetta ingestion

The repo's intake policy explicitly prohibits conflating docs-intelligence requirements mining with Rosetta-native runtime ingestion. This is a formal product law stated in the PRD. The docs-intelligence lane (requirements extraction, contradiction mining, issue drafting) is allowed and expected now; large-scale semantic corpus ingest is blocked until Ingress Refinery and canonical cache are ready.

- **Locator**: `Executive synthesis` — `turn25file0`, `turn13file0`
- **Confidence**: HIGH

### Finding F-03: No single universal score — multi-vector lane-specific decision model

The PRD formally adopts the scoring objection as architectural law: the system will NOT use one master scalar score for memory, prioritization, routing, trust, or promotion. Instead, it persists topic-local, lane-local, decision-specific vectors spanning novelty, relevance, value-add, resilience, urgency, trust, contradiction pressure, legal sensitivity, verification cost, decay rate, and revisitability, with lane-specific dominance rules.

- **Locator**: `Executive synthesis` — `turn8file3`, `turn9file16`
- **Confidence**: HIGH

### Finding F-04: Bootstrap is intentionally headless — UX delayed until substrate hardens

The repo is not a polished end-user product. The PRD explicitly deprioritizes "clever shell" work and delays showy UX beyond inspection and operator-read-only surfaces until the constitutional substrate hardens. Read-only projections (OB1, Prism, Mission Control) remain read-only sidecars, not constitutional authorities.

- **Locator**: `Executive synthesis` — `turn28file0`, `turn15file0`
- **Confidence**: HIGH

---

## Correlated Source Baseline

### Finding F-05: Package inventory confirmed from live repo

The repo README lists concrete packages: `rosetta-canon`, `rosetta-cid`, `rosetta-core`, `rosetta-schemas`, `rosetta-receipts`, `rosetta-guard`, `rosetta-tapestry`, `rosetta-store`, `source-substrate`, `source-registry`, `ingress-refinery`, `canonical-cache`, `projection-adapters`. Three apps: `rosetta-cli`, `rosetta-api`, `rosetta-operator`.

- **Locator**: `Correlated source baseline > What the repo now confirms` — `turn28file0`
- **Confidence**: HIGH

### Finding F-06: REPO_SHAPE_AND_CONSTRAINTS.md encodes live constraints

The repo governance file `REPO_SHAPE_AND_CONSTRAINTS.md` explicitly prohibits: importing donor tarball wholesale, non-Nx workspace shape, live-source ingestion before canonical cache is active source of truth, and non-read-only OB1/Prism/Mission Control integration. These constraints are binding product law per the PRD.

- **Locator**: `Correlated source baseline > What the repo now confirms` — `turn16file0`
- **Confidence**: HIGH

### Finding F-07: TC-001 through TC-004 are already merged

The handoff file confirms TC-001 (source episode envelope), TC-002 (normalization fingerprints), TC-003 (dedupe/revision/local persistence), and TC-004 (source-to-observation tiling with transform receipts) are all merged. TC-005, TC-006, TC-007 remain open candidates.

- **Locator**: `Correlated source baseline > Where the repo usefully narrows the earlier PRD` — `turn13file0`
- **Confidence**: HIGH

### Finding F-08: 128-document corpus indexed; 24 April 2026 docs

The repo intake README shows current scale: 128 documents, 24 current April 2026 docs, 36 governing/planning/live docs. Policy ranks live/governance/handoffs/backlog/PRDs/RFCs above chats and frontier notes.

- **Locator**: `Correlated source baseline > Where the repo usefully narrows the earlier PRD` — `turn25file0`
- **Confidence**: HIGH

---

## Product Definition and Non-Goals

### Finding F-09: Product is provenance-first, source-aware, rights-scoped, receipt-bound cognitive operating substrate

The product's first commercial horizon is: text-first, provenance-first, parse-only-safe system that can ingest evidence, compile trustworthy context, support live issue-driven development, and progressively mature into richer temporal + activation memory planes once constitutional contracts are stable.

- **Locator**: `Product definition and non-goals > Product definition` — `turn8file14`, `turn15file0`
- **Confidence**: HIGH

### Finding F-10: Six core capabilities must work first

The PRD enumerates six capabilities as primary: (1) ingest source-aware text evidence, (2) preserve raw material while deriving canonical artifacts, (3) mint receipts for meaningful processing steps, (4) cluster and revise without dishonest auto-merges, (5) retrieve only what policy and rights allow, (6) expose explanation and audit views sufficient that operators stop trusting vibes.

- **Locator**: `Product definition and non-goals > Product definition` — `turn17file0`, `turn19file0`, `turn20file0`
- **Confidence**: HIGH

### Finding F-11: Non-goal — collapse of distinct memory planes

Truth tiles, temporal projections, activation states, compiled contexts, docs-intelligence findings, and operator dashboards are NOT the same thing. The repo's `rosetta-store` is explicitly a simple in-memory tile store, not an everything database.

- **Locator**: `Product definition and non-goals > Non-goals` — `turn26file0`, `turn8file15`
- **Confidence**: HIGH

### Finding F-12: Non-goal — projection shells as silent shadow authorities

OB1, Prism, Mission Control are read-only sidecar views, not authorities. The PRD forbids projection shells from becoming silent shadow authorities.

- **Locator**: `Product definition and non-goals > Non-goals` — `turn28file0`, `turn16file0`
- **Confidence**: HIGH

---

## Constitutional Architecture

### Finding F-13: Rosetta operational spine is Run → Action → ToolCall → Observation → Evaluation

Doctrine v0.2 requires every meaningful step to emit or be bound to a receipt artifact; every verified claim must be supportable through receipt-bundle closure. The `rosetta-receipts` package already creates receipts as Rosetta tiles, derives digests from canonical bodies, signs CIDs using Ed25519 keypairs, verifies signed receipts cryptographically, and checks bundle closure against a tile store.

- **Locator**: `Constitutional architecture > Rosetta as the constitutional core` — `turn8file14`, `turn27file0`
- **Confidence**: HIGH

### Finding F-14: Source substrate models distinct layers

The `source-substrate` package models source-system profiles, records, manifestations, packages, trust matrices, and correction events as separate layers — each emitted as Rosetta tiles. This is a constitutional pillar, not optional later work.

- **Locator**: `Constitutional architecture > The source substrate` — `turn9file16`, `turn18file0`
- **Confidence**: HIGH

### Finding F-15: Source registry does NOT yet fetch from live registries

The repo explicitly states that `source-registry` does NOT yet fetch from DataCite, Crossref, ORCID, ROR, OpenAlex, or repository registries, and that provenance receipts for registry refreshes do not exist yet. This gap must become an explicit product milestone.

- **Locator**: `Constitutional architecture > The source substrate` — `turn24file0`
- **Confidence**: HIGH

### Finding F-16: Ingress refinery is Pillar Zero

`ingress-refinery` is the only approved promotion boundary. Every new source adapter must emit parse-only ingress jobs into the refinery contract rather than writing straight into canonical cache or bypassing Rosetta receipts. The refinery is fixture-backed but the contract surface is real.

- **Locator**: `Constitutional architecture > The ingress refinery` — `turn17file0`
- **Confidence**: HIGH

### Finding F-17: Canonical cache indexes four ways but merge-eligible is only two

The `canonical-cache` package indexes by byte identity, manifestation identity, record family, and conceptual cluster. Only byte and manifestation matches are merge-eligible. Conceptual cluster matches are NOT auto-merged. This is explicit and must be preserved.

- **Locator**: `Constitutional architecture > The canonical corpus cache` — `turn19file0`
- **Confidence**: HIGH

### Finding F-18: Canonical cache is not yet database-backed

Current cache is in-memory with local JSON persistence. Doctrine's staged-storage rule says: Bootstrap = SQLite, Text-Core/Alpha RC = Postgres JSONB + row-level rights enforcement + pgvector. Bulk ingest remains blocked until durable storage migration.

- **Locator**: `Constitutional architecture > The canonical corpus cache` — `turn19file0`, `turn8file15`
- **Confidence**: HIGH

### Finding F-19: Guard enforces deny-by-default parse-only

`rosetta-guard` is a minimal but correct policy engine: action/resource-prefix matching, deny-side-effects-by-default in parse-only mode, allow read-like actions when rules permit, emit guard decisions as tiles. Future expansion to actor-aware/tenant-aware policy is on roadmap but parse-only baseline is non-negotiable.

- **Locator**: `Constitutional architecture > Guard, store, and projections` — `turn20file0`, `turn6file17`
- **Confidence**: HIGH

### Finding F-20: Rights enforcement belongs at storage/retrieval boundary

`rosetta-store` guards reads by rights scopes. Doctrine explicitly forbids "retrieve then filter later" for sensitive or scoped data. Every future durable store must inherit this pattern.

- **Locator**: `Constitutional architecture > Guard, store, and projections` — `turn26file0`, `turn8file15`
- **Confidence**: HIGH

---

## Detailed Functional Requirements

### Finding F-21: Source registry as first-class versioned product surface

Every supported source family requires a source-system profile (identifiers, access properties, authority assumptions, lifecycle behavior, moderation expectations, rights posture, refresh mechanics) versioned as receipted artifacts. Identity resolution is evidence-producing work, not silent side effect.

- **Locator**: `Detailed functional requirements > Source registry and evidence intake` — `turn9file16`, `turn24file0`
- **Confidence**: HIGH

### Finding F-22: Raw-artifact permanence even when activation/suppression occurs

Raw bytes or immutable evidence handles must remain recoverable in cold/sealed storage while downstream projections/embeddings/summaries may be cooled, rebuilt, or suppressed under retention policy. Implements "gravestoned tiles but preserved provenance."

- **Locator**: `Detailed functional requirements > Source registry and evidence intake` — `turn8file15`
- **Confidence**: HIGH

### Finding F-23: Refinery performs deterministic low-cost work before expensive semantic work

At minimum: canonical byte capture, timestamp normalization, dedupe fingerprint generation, revision detection, rights classification, source-family typing, claimed-author capture, identity-evidence linkage, policy screening, candidate evaluation-vector initialization. Only after those pass should semantic extraction proceed.

- **Locator**: `Detailed functional requirements > Refinery behavior` — `turn8file15`
- **Confidence**: HIGH

### Finding F-24: Every refinement stage must mint or be subject of a receipt

Each stage — fetch, normalize, classify, dedupe decision, revision link, source-to-observation transform, extract, promote, compile — must either mint a receipt directly or become an explicit subject inside a receipt bundle.

- **Locator**: `Detailed functional requirements > Refinery behavior` — `turn17file0`, `turn13file0`
- **Confidence**: HIGH

### Finding F-25: Four distinct dedupe relationships — not one

Same bytes, same manifestation, same record family with material revision, conceptually related but not merge-safe. Only byte identity and manifestation identity are merge-eligible per canonical cache spec.

- **Locator**: `Detailed functional requirements > Dedupe, revision, conflict, and trust` — `turn19file0`
- **Confidence**: HIGH

### Finding F-26: Correction events must not silently overwrite prior state

Materially changed content creates revision links; corrected/superseded records remain traceable. Source substrate and canonical cache already implement this.

- **Locator**: `Detailed functional requirements > Dedupe, revision, conflict, and trust` — `turn18file0`, `turn19file0`
- **Confidence**: HIGH

### Finding F-27: Candidate evaluation vectors must carry multi-dimensional scores

Every promotable/retrievable candidate carries: relevance, novelty, value-add, resilience, urgency, trust, contradiction pressure, legal sensitivity, verification cost, dedupe confidence, expected decay, revisit guidance. Different lanes use different ordering rules. Gate-first, rank-second.

- **Locator**: `Detailed functional requirements > Dedupe, revision, conflict, and trust` — `turn8file3`
- **Confidence**: HIGH

### Finding F-28: Trust scoring is staged — schema must exist now, live evidence accumulation is future work

The repo README explicitly says no evidence-derived trust scoring engine exists yet; trust matrix is formal model + bootstrap fixture values. Trust scoring schema and vector fields must exist now; live trust scoring is future work dependent on evidence accumulation and adjudication.

- **Locator**: `Detailed functional requirements > Dedupe, revision, conflict, and trust` — `turn28file0`, `turn18file0`
- **Confidence**: HIGH

### Finding F-29: Three memory planes — truth, temporal, activation — must remain separated

Truth plane = immutable receipted artifacts. Temporal plane = historical state transitions and time-aware projections. Activation plane = recency, frequency, association, proactive trigger logic. This separation must survive all implementation detail.

- **Locator**: `Detailed functional requirements > Retrieval, memory, and compiled context` — `turn8file15`
- **Confidence**: HIGH

### Finding F-30: Promotion, cooling, revisit, quarantine are explicit state transitions

Not hidden behavior. Promotion = item becomes reusable for compiled context. Cooling = remains true but loses hot-surface priority. Revisit = system believes item merits future re-checking. Quarantine = system refuses to promote until contradiction/legal/trust concerns resolved.

- **Locator**: `Detailed functional requirements > Retrieval, memory, and compiled context` — `turn8file15`, `turn9file16`
- **Confidence**: HIGH

### Finding F-31: Compiled contexts (tapestries) must carry full trace metadata

Compiled contexts must carry: participating artifact refs, excluded artifact refs, rights scope, policy refs, stable-prefix eligibility, evidence density summaries, uncertainty markers, human-readable accompaniment for explain/audit interfaces.

- **Locator**: `Detailed functional requirements > Retrieval, memory, and compiled context` — `turn28file0`, `turn8file12`
- **Confidence**: HIGH

### Finding F-32: Agent orchestration is typed, replayable workflow system

Orchestration design specifies tiered leadership, executor specialization, scoped reusable skills, immutable manifests, idempotent payloads, durable archival, replayability, message-bus with DLQ support. State lives in step-versioned manifests, not in growing prompt histories.

- **Locator**: `Detailed functional requirements > Agent orchestration and workflows` — `turn9file1`, `turn9file2`
- **Confidence**: HIGH

### Finding F-33: Docs intelligence is first-class orchestration domain — not just internal process

Repo intake README defines the workflow: run `docs:intake`, inspect ledger, prioritize documents, use extraction templates, emit structured findings with locators/tags/subjects/evidence/confidence/action recommendations, promote selected findings into issue drafts or GitHub issues after orchestration review.

- **Locator**: `Detailed functional requirements > Agent orchestration and workflows` — `turn25file0`
- **Confidence**: HIGH

### Finding F-34: Three mandatory operator modes — summary, explain, audit

Summary = what happened, most relevant, changed, blocked, next. Explain = why surfaced, evidence, alternatives considered, confidence/contradiction, policy lane. Audit = which receipts bind this decision, bundle closure, rights scope, decision token/denial, revision chain.

- **Locator**: `Detailed functional requirements > Inspection and operator surfaces` — `turn8file12`, `turn28file0`
- **Confidence**: HIGH

---

## Data Model and Implementation Scaffolding

### Finding F-35: TileEnvelope formalization

```ts
export interface TileEnvelope {
  kind: string;           // rosetta.run, rosetta.observation, etc.
  cid?: CID;              // canonical body hash
  rid?: RID;              // stable handle when warranted
  nonce: string;
  createdAt: string;       // ISO-8601
  authorRef?: string;
  runRef?: CID;
  derivedFrom?: CID[];
  prev?: CID[];           // superseded / replaced artifacts
  policyRef?: CID;
  rightsScopeRef?: CID;
  summaryRef?: CID;
}
```

- **Locator**: `Data model and implementation scaffolding > Canonical Rosetta envelope` — `turn5file1`, `turn28file0`
- **Confidence**: HIGH

### Finding F-36: RRPPayload from live pack schema

Receipt schema from `packs/rrp/schema/receipt.schema.json` requires `claims`, `digests`, `policyRefs`, `receiptType`, and `subjects`. Evidence structured as CID-linked objects with optional spans. Pack manifest advertises JSON Schema, SHACL, vocab, examples, test vectors, compatibility `>=3.0.0 <4.0.0`.

- **Locator**: `Data model and implementation scaffolding > A receipt model that matches the real pack` — `turn22file0`, `turn23file0`, `turn27file0`
- **Confidence**: HIGH

### Finding F-37: SourceSystemProfile, SourceRecord, Manifestation formalization

Source-system profile, record, manifestation as separate layers — not collapsed into one blob. Trust matrices, correction events as distinct facts.

- **Locator**: `Data model and implementation scaffolding > Source-aware artifact model` — `turn18file0`, `turn24file0`, `turn9file16`
- **Confidence**: HIGH

### Finding F-38: CandidateEvaluationVector with lane-specific ranking

```ts
export interface CandidateEvaluationVector {
  subjectRef: CID;
  topicRef?: RID;
  lane: "hot" | "warm" | "cool" | "cold" | "quarantine";
  relevance: number; novelty: number; valueAdd: number; resilience: number;
  urgency: number; trust: number;
  contradictionPressure: number; legalSensitivity: number;
  verificationCost: number; dedupeConfidence: number;
  expectedDecayDays?: number; revisitBy?: string;
  revisionVelocity?: "slow" | "medium" | "fast";
  decisionBasis: string[];
}
```

Gate-first, rank-second pattern. Hot lane ranks by urgency + valueAdd + relevance - verificationCost. Hardening lane ranks by trust + contradictionPressure + relevance + resilience.

- **Locator**: `Data model and implementation scaffolding > Candidate evaluation vectors` — `turn8file3`
- **Confidence**: HIGH

### Finding F-39: Pack conformance is release-gating requirement

Current branch computes deterministic `rosetta-pack-id-v1` values from pack metadata + sorted file hashes, verifies declared `pack_id`, checks declared entrypoint/export paths, rejects self/cyclic `depends_on`. Pack conformance graduation from "good hygiene" to mandatory release gate.

- **Locator**: `Data model and implementation scaffolding > Pack conformance as a live implementation axis` — `turn13file0`, `turn22file0`
- **Confidence**: HIGH

---

## Security, Compliance, Retention, and Operating Economics

### Finding F-40: HIPAA/HITECH as policy-pack overlay

HIPAA Security Rule establishes national standards for ePHI, is flexible/scalable/technology-neutral. A 2024 proposed rule update strengthens cybersecurity for ePHI. HIPAA/HITECH profile must be implemented as a policy-pack overlay on Rosetta/Entif substrate, not as hard-coded branches.

- **Locator**: `Security, compliance, retention, and operating economics > HIPAA, HITECH, and policy-pack posture` — `turn3search0`, `turn3search1`, `turn3search5`
- **Confidence**: MEDIUM — web reference, not full compliance audit

### Finding F-41: Layered lifecycle state machine for artifacts

Artifact states: `active`, `restricted`, `superseded`, `sealed`, `hidden_from_projection`, `legally_retained`, `pending_erasure_review`. Supports simultaneous constitutional presence + cooling + tenant hiding + correction + lawful suppression. Implements both provenance continuity and lawful suppression.

- **Locator**: `Security, compliance, retention, and operating economics > Retention, gravestoning, and provenance continuity` — `turn8file15`, `turn9file16`
- **Confidence**: HIGH

### Finding F-42: Prompt caching design principle for stable-prefix blocks

OpenAI prompt caching: works automatically on recent models, requires exact prefix reuse, starts at 1,024 tokens in 128-token increments, exposes `cached_tokens` field, isolates caches across organizations. Design consequence: static high-value reused content (core instructions, pack manifests, schemas, routing rules) should be compiled into reusable prefix blocks; dynamic deltas at tail.

- **Locator**: `Security, compliance, retention, and operating economics > Prompt economics and stable-prefix strategy` — `turn3search3`, `turn3search4`
- **Confidence**: MEDIUM — web reference, applied correctly

### Finding F-43: Message bus semantics — idempotent, replayable, manifest-driven

Workflow substrate uses immutable manifests, message-bus semantics, dead-letter handling, replayability, durable archival. Side effects key off idempotency identifiers and receipt subjects so retries/partial failures/resumptions do not silently duplicate work.

- **Locator**: `Security, compliance, retention, and operating economics > Message buses, idempotency, and durability` — `turn9file1`, `turn13file0`
- **Confidence**: HIGH

---

## Phased Roadmap and Acceptance Criteria

### Finding F-44: Phase 1 — Constitutional hardening: pack conformance, receipt semantics, rights/guard

Slice 1 = pack conformance completion (deterministic pack IDs, cycle detection, CI enforcement). Slice 2 = receipt semantics hardening (evidence typing, policy artifact linkage, key lifecycle, validation). Slice 3 = rights and guard hardening (actor/tenant-aware policy, capability tokens, replay refusal).

- **Locator**: `Phased roadmap, acceptance criteria, and limitations > Constitutional hardening phase` — `turn13file0`, `turn22file0`, `turn23file0`, `turn27file0`, `turn20file0`, `turn6file17`
- **Confidence**: HIGH

### Finding F-45: Phase 2 — Text-Core completion: TC-005, durable cache, English accompaniment, live-source adapters

TC-005 (promotion state machinery), durable canonical cache (Postgres JSONB + row-level rights), English accompaniment + inspection surfaces, live-source adapter behind refinery boundary (GitHub + Google Drive first).

- **Locator**: `Phased roadmap, acceptance criteria, and limitations > Text-Core completion phase` — `turn13file0`, `turn19file0`, `turn8file15`, `turn8file12`, `turn15file0`, `turn17file0`, `turn24file0`
- **Confidence**: HIGH

### Finding F-46: Phase 3 — Memory plane expansion: temporal, activation, route-plan/OMOC

Temporal plane (episodic ingest, temporal edges, time-aware retrieval). Activation plane (recency, frequency, association, trigger-style relevance, proactive reminders). Route-plan and conceptual mixture integration (OMOC-aware routing, explainable conceptual overlaps).

- **Locator**: `Phased roadmap, acceptance criteria, and limitations > Memory-plane expansion phase` — `turn8file12`, `turn8file15`, `turn6file17`
- **Confidence**: HIGH

### Finding F-47: Phase 4 — Docs intelligence and issue orchestration productization

Extraction artifact standardization (source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, authority class). Issue-promotion pipeline (structured findings → candidate issue drafts → orchestration review → publish/track with provenance).

- **Locator**: `Phased roadmap, acceptance criteria, and limitations > Documentation-intelligence and issue-orchestration phase` — `turn25file0`
- **Confidence**: HIGH

### Finding F-48: Next release family acceptance criteria (green state definition)

Pack conformance green for core packs/test vectors. Canonical cache against durable storage preserving match/merge semantics. At least one live source family through same refinery contract as fixtures. Rights-scoped retrieval at storage boundary + receipted guard decisions. Human-inspectable summary/explain/audit surfaces. Docs intelligence clearly separated from runtime ingestion but genuinely useful and current.

- **Locator**: `Phased roadmap, acceptance criteria, and limitations > Explicit acceptance criteria for the next release family` — `turn13file0`, `turn19file0`, `turn17file0`, `turn15file0`, `turn20file0`, `turn26file0`, `turn8file12`, `turn28file0`, `turn25file0`
- **Confidence**: HIGH

---

## Open Questions and Limitations

### Finding F-49: Repo fetches targeted not exhaustive — code-aligned not code commentary

Pulled and correlated: repo README, current handoff, bootstrap execution track, repo shape constraints, intake policy, ingress-refinery/source-substrate/source-registry/canonical-cache/guard/store/receipts package READMEs, RRP pack manifest + receipt schema. Not a full file-by-file audit of every package implementation.

- **Locator**: `Open questions and limitations` — `turn28file0`, `turn13file0`
- **Confidence**: HIGH (self-reported limitation)

### Finding F-50: External web-check deliberately narrow — HIPAA + OpenAI caching only

HIPAA/HITECH Security Rule and OpenAI prompt caching are recent and trustworthy anchors; not a full official-source pass across all named standards (broader privacy regimes, SEC retention specifics, additional ontology/provenance standards).

- **Locator**: `Open questions and limitations` — `turn3search0`, `turn3search1`, `turn3search5`, `turn3search3`, `turn3search4`
- **Confidence**: MEDIUM (self-reported limitation)

### Finding F-51: Confirmation — repo and Drive canon aligned enough to treat Rosetta as real kernel

The biggest strategic takeaway is a confirmation: repo and Drive canon are sufficiently aligned to stop treating Rosetta as purely speculative superstructure and start treating it as a real constitutional kernel requiring disciplined hardening, fixture seam replacement, durable cache maturation, and enforceable pack/receipt/rights discipline.

- **Locator**: `Open questions and limitations` — `turn28file0`, `turn15file0`
- **Confidence**: HIGH

---

## Extracted Concepts

| Concept ID | Concept | Source Locator |
|---|---|---|
| C-001 | text-core-mvp | `turn13file0` |
| C-002 | source-substrate-domain | `turn18file0` |
| C-003 | ingress-refinery-pillar-zero | `turn17file0` |
| C-004 | canonical-cache-in-memory | `turn19file0` |
| C-005 | multi-vector-no-universal-score | `turn8file3` |
| C-006 | three-memory-planes-truth-temporal-activation | `turn8file15` |
| C-007 | promotion-cooling-revisit-quarantine-explicit | `turn8file15`, `turn9file16` |
| C-008 | docs-intelligence-first-class-orchestration | `turn25file0` |
| C-009 | pack-conformance-release-gate | `turn13file0`, `turn22file0` |
| C-010 | receipts-law-every-step | `turn8file14`, `turn27file0` |
| C-011 | rights-enforcement-before-retrieval | `turn26file0`, `turn8file15` |
| C-012 | parse-only-default-deny-by-default | `turn20file0`, `turn6file17` |
| C-013 | source-registry-not-live-fetch | `turn24file0` |
| C-014 | stable-prefix-prompt-caching | `turn3search3`, `turn3search4` |
| C-015 | layered-lifecycle-state-machine | `turn8file15`, `turn9file16` |
| C-016 | TC-001-TC-004-merged | `turn13file0` |
| C-017 | TC-005-TC-006-TC-007-open | `turn13file0` |
| C-018 | projection-surfaces-read-only-constraint | `turn28file0`, `turn16file0` |
| C-019 | HIPAA-policy-pack-overlay | `turn3search0`, `turn3search1`, `turn3search5` |
| C-020 | message-bus-idempotent-replayable | `turn9file1`, `turn13file0` |

---

## Issue Candidates

The following distinct issue candidates are extractable from this document. Each maps to one or more findings above.

| # | Issue Title | Basis | Priority |
|---|---|---|---|
| IC-01 | Pack Conformance Release Gate — ROCK-3111-C CI enforcement across all packs | F-39, F-44 | HIGH |
| IC-02 | TC-005 Promotion State Machinery — implement promotion/cooling/revisit/quarantine state machine | F-16, F-25, F-30 | HIGH |
| IC-03 | Durable Canonical Cache — migrate from in-memory JSON to Postgres JSONB + pgvector | F-17, F-18, F-45 | HIGH |
| IC-04 | Docs Intelligence Productization — formalize extraction artifacts and issue promotion pipeline | F-02, F-08, F-33, F-47 | HIGH |
| IC-05 | Live-Source Adapter — introduce GitHub + Google Drive behind refinery boundary | F-16, F-45 | MEDIUM |
| IC-06 | Receipt Semantics Hardening — richer evidence typing, policy artifact linkage, key lifecycle | F-13, F-36, F-44 | MEDIUM |
| IC-07 | Trust Scoring Staged Implementation — schema now, live evidence scoring future | F-28 | MEDIUM |
| IC-08 | Rights/Guar d Hardening — actor-aware policy, capability tokens, replay refusal | F-19, F-20, F-44 | MEDIUM |
| IC-09 | Three Memory Planes Implementation — truth/temporal/activation separation | F-29, F-46 | MEDIUM |
| IC-10 | Source Registry Refresh Lane — explicit milestone for DataCite/Crossref/ORCID/ROR fetch | F-14, F-15, F-21 | MEDIUM |
| IC-11 | Stable-Prefix Prompt Caching — implement prefix block strategy for cost reduction | F-42 | LOW |
| IC-12 | HIPAA/HITECH Policy Pack — implement as policy-pack overlay not hard-coded branch | F-40 | LOW |
| IC-13 | English Accompaniment + Inspection Surfaces — summary/explain/audit modes | F-34, F-45 | MEDIUM |
| IC-14 | Multi-Vector Scoring Formalization — gate-first rank-second lane-specific implementation | F-03, F-27, F-38 | MEDIUM |
| IC-15 | Message Bus Idempotency — implement manifest-driven replayable workflow substrate | F-43 | MEDIUM |