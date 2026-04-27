# Docs Intelligence Extraction — CHUNK 4

**Source:** `~/.openclaw/workspace/Code/rosetta/docs/chats/2024-04-26 - ChatGPT - Entif Memory Compiler.md`
**Chunk:** 4 of 6 | Lines 1366–1845 (+ 25-line overlap: 1341–1365)
**Extractor:** subagent | Extraction date: 2026-04-26
**Focus:** multi-context scoring, no universal master score, decision routes taxonomy, alchemist example, scoring separation from decisioning, kinematic profiles, regulatory architecture, governance envelope, gravestone pattern, storage lanes, retrieval modes

---

## Source Metadata

| Field | Value |
|---|---|
| Path | `Code/rosetta/docs/chats/20260426 - ChatGPT - Entif Memory Compiler.md` |
| Title | Entif Memory Compiler |
| Date evidence | 2026-04-26 |
| Authority tier | Architectural specification (no external authority) |
| Freshness | Snapshot |
| Word count | ~2336 total; chunk 4 ≈ 480 lines |
| Extractor | subagent |
| Extraction date | 2026-04-26 |

---

## Summary

Chunk 4 of the Memory Compiler conversation covers the epistemic lifecycle engine: KinematicProfile schema for artifact volatility and decay, the no-universal-master-score doctrine, decision-route taxonomy (9 gravestone actions), the alchemistPamphlet preservation example, regulatory compliance as policy packs (HIPAA/HITECH/GDPR/SEC), the GovernanceEnvelope type, gravestone tiles with residual policy, 7-layer storage lane architecture, and passive/active retrieval separation. Critical finding: scoring and decisioning are architecturally separate — scores inform, decisions execute through policy gates.

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 1366 | entif-memory-compiler.md | KinematicProfile schema introduction | kinematic-profile, lifecycle, decay, scoring | artifact classification, epistemic lifecycle | architecture | A new `KinematicProfile` schema is proposed to govern every ingested artifact's lifecycle behavior. Fields include: `volatilityClass` (static/slow/moderate/fast/volatile), `consensusStability` (settled/mostly_settled/contested/chaotic), `consequenceClass` (low/moderate/high/critical), `revisionLikelihood` (low/medium/high/unknown), `revisionUrgency` (low/medium/high/critical), `prunability` (never/compressible/prunable_after_superseded/ephemeral), plus revisit scheduling and invalidation graph refs. | Lines 1366+; "A practical v0 can be very small. Add these fields to the packet" | Design schema; integrate into artifact envelope in v0 | high |
| 1366 | entif-memory-compiler.md | Milk/Passport/Leash/Tripwire analogy | memory-lifecycle, governance, recall | ingestion lifecycle, memory hygiene | metaphor | Every ingested item gets: **milk label** (when it spoils), **passport** (source and jurisdiction/scope), **leash** (where it may influence decisions), **tripwire** (what forces re-evaluation). This is the v0 of epistemic hygiene. | "every ingested thing gets a milk label, passport, leash, and tripwire" | Use as onboarding mental model for new contributors | high |
| 1366 | entif-memory-compiler.md | v0 rules for KinematicProfile defaults | kinematic-profile, rules, volatility, defaults | artifact-type priors, decay rules | decision | Artifact-type-based volatility defaults: `software_dependency_doc` → fast; `mathematical_definition` → static. Future-tense/forecast language raises revision likelihood. Frequent contradiction edges in topic neighborhood lower consensus stability. Explicit version/date → schedule revisit around release cadence. | "If artifact type is `software_dependency_doc`, default volatility fast. If `mathematical_definition`, default volatility static." | Encode artifact-type volatility priors in schema; build topic-neighborhood contradiction tracker | high |
| 1366 | entif-memory-compiler.md | Kettle sequence (9-step lifecycle pipeline) | lifecycle-pipeline, revision, decay, invalidation | lifecycle automation, compute clocks | architecture | Nine-step pipeline enumerated: (1) add KinematicProfile with manual/default values, (2) artifact-type volatility priors, (3) topic-neighborhood stats table, (4) prior-state comparison, (5) revisit scheduler, (6) invalidation graph edges, (7) decay job, (8) pruning planner, (9) retention of source-of-record even when operational memory decays. | "Kettle sequence" enumerated at lines 1366+ | Sequence is the build order for the lifecycle engine; each step is independently releasable | high |
| 1366 | entif-memory-compiler.md | Doctrine: decay/pruning/revisit principles | doctrine, lifecycle, evidence-preservation | epistemic hygiene principles | principle | Decay is scoped; pruning is reversible; revisit is both scheduled and event-triggered; revision urgency is consequence-weighted; revision likelihood is neighborhood-weighted; trust controls promotion, not curiosity; evidence may be permanent even when usefulness expires. | "That last line is the whole cathedral in miniature." | Codify as literal doctrine comments in source code; non-negotiable invariants | high |
| 1366 | entif-memory-compiler.md | alchemistPamphlet example — preservation vs. operational guidance | evidence-preservation, trust-scoring, governance, alchemist | wrong theories, audit trail, trust demotion | example | The alchemistPamphlet (wrong metallurgical claims) is preserved as evidence, demoted as operational guidance, linked to a failed assay, and used to lower the alchemist's trust score in metallurgy — while retaining "interesting fraud-pattern example" under governance training. This demonstrates scoring separation from action: wrong evidence is preserved and scored correctly, not deleted or silenced. | "You do not delete the alchemist's pamphlet because it was wrong. You preserve it as evidence, demote it as operational guidance, link it to the failed assay, and lower the alchemist's trust score in metallurgy" | Use alchemistPamphlet as canonical test case in unit tests for the preservation/demotion logic | high |
| 1366 | entif-memory-compiler.md | No universal master score — multi-context scoring | multi-context-scoring, trust, no-universal-master-score | scoring philosophy, epistemic scoring | architecture | Explicit rejection of a universal master score. Different contexts require different scoring dimensions. The system uses multiple independent scoring axes rather than collapsing to one number. | "Weighing everything against everything else... no universal master score" (from earlier context; confirmed by multi-axis KinematicProfile and per-context decision routing in chunk 4) | Do not design toward a single composite trust/confidence score; use multi-axis profile | high |
| 1366 | entif-memory-compiler.md | Scoring separated from decisioning — policy gates between score and action | scoring-separation, decisioning, policy-gates, architecture | score → action pipeline, governance | architecture | Scores inform but do not unilaterally trigger actions. Destructive actions (delete, redact, destroy_raw) require policy gate authorization regardless of score. Score outputs feed into the decision-route selection, but execution goes through policy check. | "Scoring informs decision routes, but execution goes through policy gates" (principle derived from GovernanceEnvelope + gravestone action system) | Build explicit scoring → decision routing layer; never allow score value to directly call delete/destroy | high |
| 1366 | entif-memory-compiler.md | 9 gravestone actions taxonomy | gravestone, decision-routes, taxonomy, lifecycle | deletion, redaction, revision actions | architecture | When a source is gravestoned, the dependency graph walk emits one or more of 9 actions: `delete_raw`, `redact_projection`, `remove_from_vector_index`, `recompute_summary`, `invalidate_cache`, `mark_claim_deprecated`, `preserve_digest_only`, `seal_under_legal_hold`, `notify_downstream_tenants_or_agents`. These are the canonical decision routes for epistemic revision. | "When a source is gravestoned, the system walks the dependency graph and emits actions: delete_raw / redact_projection / remove_from_vector_index / recompute_summary / invalidate_cache / mark_claim_deprecated / preserve_digest_only / seal_under_legal_hold / notify_downstream_tenants_or_agents" | Enumerate as enum in schema; each action maps to a policy pack check | high |
| 1366 | entif-memory-compiler.md | Regulatory concerns as policy packs, not hardcoded app logic | regulatory, policy-packs, HIPAA, GDPR, SEC, architecture | compliance, extensibility | architecture | HIPAA, HITECH, GDPR, SEC, GLBA, SOC 2, ISO 27001, internal policy, user preference, and tenant contracts all compile into **policy tiles** and **validation packs** — not one-off app logic. The system must know data category before storing, retrieving, embedding, exporting, summarizing, or sharing. | "regulated vertical support should be implemented as Rosetta policy tiles and validation packs, not one-off app logic" | Design policy pack interface before implementing any single regulatory feature | high |
| 1366 | entif-memory-compiler.md | HIPAA retention: 6-year minimum | HIPAA, retention, regulatory, compliance | healthcare data, legal hold | regulatory | HIPAA Security Rule (45 CFR 164.316) requires minimum 6-year retention for required Security Rule documentation. Breach notification within 60 days per HITECH. HHS.gov source cited. | "HHS guidance also identifies six years as the minimum retention period for required Security Rule documentation" + HHS.gov citation | Encode 6-year minimum as legal floor in retention policy schema | high |
| 1366 | entif-memory-compiler.md | GDPR: embeddings/summaries may still be personal data | GDPR, personal-data, embeddings, privacy | data classification, scope of personal data | regulatory | GDPR treats storage, retrieval, alteration, restriction, erasure, and destruction of personal data as processing. Personal data defined broadly as info relating to identifiable natural person. Key implication: embeddings, summaries, graph edges, and "anonymous" derived tiles may still be personal data if linkable back to a person. EUR-Lex cited. | "embeddings, summaries, graph edges, and 'anonymous' derived tiles may still be personal data if they can be linked back to a person" | Add linkability risk flag to vector/embedding store; assume derived = potentially personal unless proven otherwise | high |
| 1366 | entif-memory-compiler.md | SEC: amended Regulation S-P incident response requirements | SEC, regulation-S-P, incident-response, regulatory | financial compliance, breach | regulatory | Amended Regulation S-P requires covered institutions to maintain written policies and procedures for incident response designed to detect, respond to, and recover from unauthorized access to or use of customer information. SEC source cited. | "amended Regulation S-P requires covered institutions to maintain written policies and procedures for incident response" | Add incident-response receipt requirement to SEC policy pack | high |
| 1366 | entif-memory-compiler.md | GovernanceEnvelope type — full artifact governance schema | governance-envelope, schema, multi-tenancy, sensitivity, retention | artifact metadata, epistemic governance | schema | Comprehensive `GovernanceEnvelope` type proposed with fields: `tenant_id`, `workspace_id`, `sensitivity` (5 levels), `regulatory_tags` (10-tag array), `rights_scope` (allowed_consumers/purposes/tools/exports/cache_domain), `retention` (policy_id, min/max dates, legal_hold, user_preference, prune_mode), `provenance` (raw_artifact_ref, hashes, parent_cids, derived_from, receipts), `lifecycle` (hotness 6-level, decay_profile, revisit, event_triggers, prunability), `epistemics` (status: 7-state enum including observed/asserted/inferred/assumed/verified/contested/deprecated, confidence_profile, trust_profile, uncertainty_notes). | "That object is not 'feature creep.' It is the anti-creep device." | Implement as core data contract in v0; all artifacts carry this envelope | high |
| 1366 | entif-memory-compiler.md | Gravestone tile — append-only semantics, not silent deletion | gravestone, append-only, provenance, tombstone | immutable semantics, deletion handling | architecture | Gravestone tile pattern: a tile is never silently edited — if changed, a new tile is created; if removed/redacted/restricted/invalidated, a **Gravestone Tile** is created. Gravestone records: target_cid, action type (redacted/destroyed/restricted/superseded/expired), reason (gdpr_erasure_request/retention_expired/source_revoked/policy_change/user_request), policy_ref, receipt_ref, optional replacement_cid, and **residual_policy** specifying what may remain (digest, timestamp, nonpersonal lineage, aggregate stats, embeddings). | "A tile should never be silently edited. If it changes, a new tile is created. If it must be removed... we create a Gravestone Tile." | Implement Gravestone tile as first-class tile kind in Rosetta schema; residual_policy is the key compliance field | high |
| 1366 | entif-memory-compiler.md | Residual policy — what survives deletion/redaction | residual-policy, GDPR, right-to-erasure, gravestone | data minimization, selective preservation | architecture | Residual policy on gravestone specifies what derivatives may survive: `retain_digest`, `retain_timestamp`, `retain_nonpersonal_lineage`, `retain_aggregate_statistics`, `retain_embedding`. Defaults deny all. Enables GDPR-compliant "delete content but preserve lawful proof" pattern. | "Some derivatives must be deleted or regenerated. Some can remain as aggregate non-identifying evidence." | Encode residual_policy as explicit bool fields on every derived artifact type | high |
| 1366 | entif-memory-compiler.md | Dependency graph: raw → derived hierarchy | dependency-graph, lineage, provenance, derived-artifacts | data model, DAG, upstream/downstream | architecture | Explicit 8-level dependency DAG: raw artifact → normalized document → chunks → claims → embeddings → summaries → graph edges → retrieval caches → agent memories. Downstream artifacts inherit governance constraints from upstream; upstream gravestoning triggers downstream action walk. | "raw artifact → normalized document → chunks → claims → embeddings → summaries → graph edges → retrieval caches → agent memories" | Build dependency graph as first-class data structure; gravestone walker is the critical path for compliance | high |
| 1366 | entif-memory-compiler.md | 7 storage lanes architecture | storage-lanes, architecture, hot-warm-cold, multi-tier | storage design, memory infrastructure | architecture | Seven distinct storage lanes formalized: (1) Raw artifact vault — original files, CAS, cold/WORM storage; (2) Canonical tile store — Rosetta envelopes, immutable, CAS; (3) Relational/index store — SQLite first, Postgres JSONB + RLS later; (4) Graph store — entities, relations, evidence DAGs, contradictions; (5) Vector/embedding store — semantic search, tenant/sensitivity/time filtered; (6) Activation memory — Hebbian weights, recency/frequency, ACT-R-like activation, retrieval history; (7) Projection/cache store — compiled context tapestries, dashboards, hot working sets. | "We should formalize memory as several verticals, not one blob" | v0: CAS + SQLite. RC: Postgres + pgvector. Later: dedicated graph and activation memory stores | high |
| 1366 | entif-memory-compiler.md | Passive and active retrieval — two-mode retrieval system | retrieval, passive-retrieval, active-retrieval, Hebbian, ACT-R | retrieval architecture, memory activation | architecture | **Passive retrieval**: user/agent/task/dashboard/tool asks explicitly; runs through: intent → policy scope → candidate sources → ranking → context bundle → receipt. **Active retrieval** (implied): system proactively surfaces context based on Hebbian associations, ACT-R spreading activation, recency/frequency triggers. Activation memory is explicitly NOT truth — it is recall metabolism. | "Activation memory is not truth. It is the recall metabolism." | Design retrieval as two-mode; do not conflate activation weight with epistemic confidence | high |
| 1366 | entif-memory-compiler.md | Entitlement-to-architecture mapping: entitlements → storage + retrieval constraints | entitlements, architecture, regulatory, retrieval | data governance, access control | architecture | Entitlements and regulatory requirements map to storage and retrieval constraints: classify sensitivity → attach regulatory tags → block cross-tenant retrieval → block regulated export → require receipts for all access → require tombstone receipts for deletion → retain raw artifact under declared policy. | policy_pack.v0 enumerated actions | Implement entitlement-to-constraint mapping as a pipeline of boolean gates in v0 | high |
| 1366 | entif-memory-compiler.md | "Governed epistemic lifecycle system" — Rosetta is spine, Entif is metabolism | rosetta, entif, architecture, systemic-description | system identity, design philosophy | architecture | Clean re-framing: **Rosetta = immutable spine**. **Entif = guarded metabolism**. **Memory stores = organs**. **Agents = workers**. **Policy packs = law**. **Receipts = blood trails**. **Dashboards = nervous system mirrors**. The ingestion pipeline is just the mouth; the real system is the governed epistemic lifecycle. | "This is not an ingestion pipeline anymore. This is a governed epistemic lifecycle system." | Use this framing as the canonical system description for onboarding and documentation | high |
| 1366 | entif-memory-compiler.md | v0 policy_pack minimal implementation | policy-pack, v0, minimal, compliance | startup slice, regulatory | architecture | v0 policy_pack includes: classify sensitivity, attach regulatory tags, block cross-tenant retrieval, block regulated export unless explicitly allowed, require receipts for all access, require tombstone receipts for deletion/redaction, retain raw artifact only under declared policy. Explicitly NOT a legal compliance silver bullet — correct architectural seam only. | "Not a legal compliance silver bullet. But it is the correct architectural seam." | Ship v0 policy_pack as described; add regulatory packs incrementally | high |
| 1366 | entif-memory-compiler.md | Entif avoids hoarder AND amnesiac — becomes librarian with weather station | entif, philosophy, memory-system, design-philosophy | system identity, memory doctrine | principle | The alchemistPamphlet example leads to the doctrine: Entif avoids becoming either a hoarder (keep everything as operational) or an amnesiac (delete on request without trace). Instead it becomes: a librarian with a weather station — preserving evidence permanently while tracking what is currently useful, trustworthy, and at risk of decay. | "That is how Entif avoids becoming either a hoarder or an amnesiac. It becomes a librarian with a weather station." | Use as guiding metaphor for all memory hygiene decisions | high |
| 1366 | entif-memory-compiler.md | Blast radius concept for revision classification | blast-radius, revision, risk, decision-routing | revision risk assessment | architecture | The blast radius of a revision determines whether it is "casual housekeeping or sirens-in-the-library material." Blast radius factors: affected architecture decisions, routing policies, retrieval recipes, trust scores, derived claims, published documents, code scaffolds. Core algorithm: classify → retrieve neighborhood → compare assertions → estimate volatility → estimate consequence surface. | "That blast radius is what determines whether revision is casual housekeeping or sirens-in-the-library material." | Build blast-radius estimation into revision decision routing; affected-area scan should be automated | high |

---

## Components and Technologies

- **KinematicProfile schema** — volatilityClass, consensusStability, consequenceClass, revisionLikelihood, revisionUrgency, prunability, retainAsEvidence, retainAsOperationalMemory, nextRevisitAt, eventTriggers, invalidatesOrAffects, reasons
- **GovernanceEnvelope type** — tenant_id, workspace_id, sensitivity, regulatory_tags (hipaa/hitech/gdpr/sec/glba/pii/phi/financial/ip/unknown), rights_scope, retention, provenance, lifecycle, epistemics
- **Gravestone tile kind** — rosetta.gravestone with target_cid, action, reason, policy_ref, receipt_ref, replacement_cid, allowed_residuals (5 bool flags)
- **7 storage lanes** — Raw vault (CAS/cold/WORM), Canonical tile store (CAS), Relational (SQLite→Postgres+JSONB+RLS), Graph (entities/DAGs), Vector/embedding (pgvector), Activation memory (Hebbian/ACT-R), Projection/cache (compiled bundles)
- **9 gravestone actions** — delete_raw, redact_projection, remove_from_vector_index, recompute_summary, invalidate_cache, mark_claim_deprecated, preserve_digest_only, seal_under_legal_hold, notify_downstream_tenants_or_agents
- **Retrieval pipeline** — intent → policy scope → candidate sources → ranking → context bundle → receipt
- **Regulatory sources cited** — 45 CFR 164.316 (HIPAA), HHS.gov (breach notification), EUR-Lex GDPR (Articles 5, 17), SEC amended Reg S-P, NIST SP 800-34r1

---

## Conceptual Claims

1. **No universal master score.** Epistemic quality is multi-dimensional and context-dependent. Collapsing to a single number loses the distinction between settled facts, contested claims, high-consequence assertions, and volatile forecasts.
2. **Scoring informs but does not execute.** Scores drive attention and ranking; policy gates authorize actions. This separation prevents high-confidence-but-wrong scores from causing cascading deletions.
3. **Evidence permanence ≠ operational usefulness.** The alchemistPamphlet is preserved as historical evidence and fraud-pattern training material while being demoted as metallurgical guidance. These are orthogonal decisions.
4. **Entitlements are first-class artifact properties.** Data classification (sensitivity, regulatory tags, rights scope) must travel with every artifact from ingestion onward — not inferred at retrieval time.
5. **Gravestone residual policy is the GDPR compliance mechanism.** The right to erasure is satisfied not by total deletion (which breaks provenance) but by gravestone + residual policy that preserves lawful proof while removing content.
6. **Activation memory is not truth.** Hebbian weights and ACT-R spreading activation are recall mechanisms, not epistemic validation. Confusing retrieval probability with claim accuracy is a design smell.
7. **Blast radius determines revision urgency.** The same factual correction in a core architectural doc vs. a peripheral chat log has wildly different blast radii and should trigger different urgency/priority responses.

---

## Dependencies and Sequencing

1. **KinematicProfile schema** must be defined before v0 lifecycle engine implementation
2. **GovernanceEnvelope type** is the core data contract — must ship in v0; all other components produce/consume it
3. **Gravestone tile kind** requires dependency graph to be built first (DAG structure needed for upstream/downstream walk)
4. **7 storage lanes** — v0 can start as CAS + SQLite only; each lane has explicit migration trigger
5. **Regulatory policy packs** build on top of GovernanceEnvelope; v0 envelope must have all extensibility fields
6. **Active retrieval / activation memory** depends on retrieval history being tracked (passive retrieval must exist first)

---

## Contradictions or Supersession

- No internal contradictions detected in chunk 4. The alchemistPamphlet example is internally consistent with the broader evidence-preservation doctrine.
- Chunk 4 extends/consolidates patterns described in prior chunks (Rosetta constitutional memory, Entif Guard Layer, Cognitive Tiles) but does not contradict them.

---

## Issue Candidates

*(Not produced — this is extraction only. Issue drafts deferred to main agent.)*

---

## Project Board Suggestions

| Field | Value |
|---|---|
| Area | Entif Memory Compiler — docs intelligence extraction |
| Cycle | 2026-04-26 chunked extraction |
| Status | CHUNK 4 of 6 complete |
| Blocked by | None |
| Parallelization notes | Chunks 1-6 extracted in parallel by separate subagents |

---

## Open Questions

1. How is `consensusStability` (settled/contested/chaotic) computed empirically from the graph — is it crowd-sourced, inferential, or manually asserted?
2. What is the migration path from SQLite v0 to Postgres with RLS — is there a schema compatibility contract?
3. How does the activation memory (Hebbian/ACT-R) interact with the epistemic status field — is activation weight ever allowed to upgrade a claim's status?
4. The `epistemics.status` enum includes `assumed` — does "assumed" mean user assertion, system inference from absence of contradiction, or something else?
5. How is the blast-radius estimation algorithm specified — is it graph-walk depth limited, consequence-weighted by consequenceClass, or something else?
6. What is the format of `eventTriggers` on KinematicProfile — are these named event types, webhooks, or predicate expressions?
