# Docs Intelligence Extraction

**Source:** `docs/governance/20260410 - OpenBrain OB1 Assimilation Addendum (v0.1).md`
**Title:** Process-Architecture Assimilation Addendum for OB1-Derived Methodologies
**Date evidence:** 2026-04-10
**Authority tier:** Governance — design-donor addendum (draft status)
**Freshness:** 2026-04-10 (14+ months old, no evidence of update since)
**Word count:** ~402 lines
**Extractor:** subagent docs-intelligence cycle
**Extraction date:** 2026-05-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This addendum defines what Rosetta/Entif imports from the OB1/OpenBrain project family and what it explicitly refuses to import. The core finding: **OB1 influences process architecture far more than semantic constitution**. The document establishes a contribution grammar (8-class taxonomy), tool-budget doctrine, deduplication placement rules, schema-aware routing principles, and a quiet retrieval behavior requirement. It also defines the first approved recipe and skill wave (10 recipes, 8 skills) and gives 7 immediate implementation actions. Several findings map to gaps in current Rosetta Bootstrap/TC-001-007 that are not tracked in the implementation backlog.

---

## Goals And Intent

- Define the scope of permissible import from OB1 without adopting OB1's ontology, storage gravity, or platform assumptions as constitutional law.
- Establish contribution grammar as a normative repo-structure constraint.
- Introduce tool-budget doctrine as a governance-level constraint on agent role design.
- Translate OB1 process instincts (dedupe-low, schema-aware routing, quiet retrieval) into Rosetta-native requirements.
- Clarify interaction between Graphiti/Muninn temporal/activation patterns and Rosetta memory planes.
- Define the first approved recipe and skill wave.
- Enumerate what NOT to import from OB1.

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| OB1 exclusion list enforced in CI | Section 7; "what not to import" | `packages/validators` or `recipes/truthlint` | high | No enforcement currently exists |
| Contribution folder contract enforced | Section 2.1 — every contribution needs README.md, metadata.json, acceptance.md, examples/, tests/ | CI validators | high | Gap: current CI does not check all fields |
| Tool-budget CI checks for tool-heavy roles | Section 6 — routing ambiguity tests, context-budget snapshots, tool-surface regression metric | CI eval harness | high | No implementation currently |
| Schema-aware routing with pending-confirmation states | Section 1.6 — ambiguity is flagged not guessed; Section 5 lists pending-confirmation states as approved target | `packages/refinery-routing` | medium | Depends on TC-005 (Promotion state machine) |
| Deterministic dedupe in Pillar Zero | Section 1.5 — normalization fingerprints, revision fingerprints, dedupe receipts | `packages/ingest-core` (Pillar Zero) | high | No implementation currently |
| Quiet retrieval as product requirement | Section 1.7 — scoped, explainable, terse, refusal-safe | `packages/retrieval`, `dashboards/` | medium | Affects operator-facing surfaces |
| First recipe wave implementation (10 recipes) | Section 3 — named list of 10 recipes each dry-run-first and receipt-bearing | `recipes/` | medium | Gap: recipes/ folder may not yet exist |
| First skill wave implementation (8 skills) | Section 4 — named list of 8 skills as behavior packs | `skills/` | medium | Gap: skills/ folder may not yet exist |
| 7 immediate implementation actions tracked | Section 10 — concrete actions, no owner/timeline | Project board | high | None tracked currently |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-05-26 | OB1 Assimilation Addendum | §0 Scope and anti-confusion clause | governance, ob1, import-scope, architectural-decision | ob1-import-rule, process-vs-constitution | decision | OB1 is a design-donor, not a constitutional adoptant. The addendum explicitly draws a boundary: imports process architecture, not ontology, storage gravity, or platform assumptions. The rule: "OB1 influences our process architecture far more than our semantic constitution." | Section 0: "It does not: adopt OB1's ontology as Rosetta's ontology; adopt OB1's storage gravity as constitutional law; adopt OB1's platform assumptions as mandatory" | Treat OB1's process instincts as input to Rosetta's own design; do not treat OB1 docs as authoritative over Rosetta docs | high |
| 2026-05-26 | OB1 Assimilation Addendum | §1.1 Contribution grammar | governance, repo-structure, contribution-taxonomy | contribution-classes, folder-contract | requirement | The addendum defines 8 contribution classes with explicit folder hierarchy: core/packages/rosetta-* for constitutional logic; packs/ for governed pack families; primitives/ for reusable low-level patterns; recipes/ for standalone compositional workflows; integrations/ for source adapters and tool-connectors; skills/ for reusable agent/operator behaviors; dashboards/ for human inspection; apps/verticals/ for reference implementations. This is a structural requirement that maps to REPO_SHAPE_AND_CONSTRAINTS folder contract. | Section 1.1: listing of 8 approved contribution classes | Enforce folder contract in CI; ensure existing `packages/` and `apps/` map cleanly to this taxonomy | high |
| 2026-05-26 | OB1 Assimilation Addendum | §1.4 Tool-budget doctrine | governance, agent-design, tool-surface, hot-tools | tool-budget, routing-ambiguity, context-cost | requirement | Tool surfaces are not free: they consume context, introduce routing ambiguity, and increase accidental misuse. Four mandatory rules: (1) each agent role SHOULD have an explicit hot-tool budget; (2) near-identical tools SHOULD be consolidated; (3) routing ambiguity tests SHOULD exist for tool-rich roles; (4) tool-surface growth SHOULD be treated as a measurable regression. Default budgets are specified per role: Bootstrap orchestrator 4-6; Ingest refiner 4; Guard service 2-3; Inspector/mission-control 0-2; Recipe executor 6-8; Research/eval harness 4-6. | Section 1.4: "Tool surfaces are not free. They consume context, introduce routing ambiguity, and increase accidental misuse." | Implement tool-budget snapshot and regression checks in CI; create routing ambiguity test suite for tool-heavy roles | high |
| 2026-05-26 | OB1 Assimilation Addendum | §1.5 Deterministic dedupe belongs low in the stack | storage, dedupe, ingest, receipts | dedupe-low, normalization-fingerprint, revision-detect, idempotent-import | requirement | Imported rule: normalize first → hash first → detect duplicates before expensive reasoning → revision-detect before reinterpreting → make imports idempotent. Rosetta-native translation: add to Pillar Zero: normalization fingerprints, revision fingerprints, duplicate suppression, replay-safe upserts, dedupe receipts. "Dedupe receipts" implies every deduplication action emits a receipt — consistent with Receipt Law. | Section 1.5: "Add to Pillar Zero: normalization fingerprints, revision fingerprints, duplicate suppression, replay-safe upserts, dedupe receipts" | Implement deterministic dedupe in Pillar Zero as part of TC-002 or a parallel ingestion package; emit dedupe receipts | high |
| 2026-05-26 | OB1 Assimilation Addendum | §1.6 Schema-aware routing | routing, ingress, ambiguity, policy | schema-aware-routing, pending-confirmation, metadata-first-routing | requirement | Imported rule: raw input always preserved; metadata drives routing; additional writes are conditional; ambiguity is flagged not guessed. Rosetta-native translation for every ingress event: (1) preserve source episode, (2) mint source/observation material, (3) extract metadata, (4) run routing policy, (5) promote conditionally, (6) emit pending-confirmation when ambiguity remains. The document lists "pending-confirmation states" as an approved implementation target in Section 5. | Section 1.6; Section 5 approved targets | Implement metadata-first routing and pending-confirmation states in `packages/refinery-routing`; define formal state machine for pending-confirmation | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §1.7 Quiet live retrieval | retrieval, ux, behavior | quiet-retrieval, terse-output, refusal-safe | requirement | Imported behavior: silent on miss, brief on hit, log and tune retrieval quality, surface context without smothering. Rosetta-native translation: live retrieval sits on truth/provenance, temporal state/history, activation/relevance, tapestry assembly. Human-visible retrieval: scoped, explainable, terse, refusal-safe when policy scope blocks disclosure. | Section 1.7 | Treat quiet retrieval as a product requirement for all operator-facing surfaces; define refusal-safe behavior in policy scope | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §2.1 Standard contribution folder contract | governance, ci, contribution-contract | metadata-json, folder-contract, ci-validators | requirement | Every non-core contribution SHOULD contain: README.md, metadata.json, acceptance.md, examples/, tests/. When relevant: policy-scope.json, receipts-fixtures/, CHANGELOG.md. metadata.json has defined schema with id, title, kind, version, owner, depends_on, human_summary, agent_hints, status. Section 9 defines merge refusal conditions: absence of README.md, invalid/missing metadata.json, missing examples, missing acceptance conditions. | Sections 2.1 and 9 | Implement folder contract checks in CI; validate metadata.json schema; add merge-gate for contribution-class artifacts | high |
| 2026-05-26 | OB1 Assimilation Addendum | §2.2 Contribution-specific expectations | governance, recipes, skills, integrations | recipe-spec, skill-spec, integration-spec | requirement | Recipe spec: goal, prerequisites, typed inputs, steps, receipts emitted, failure/refusal paths, acceptance checks. Skill spec: role, trigger conditions, allowed actions, refusal conditions, examples, context/tape budget. Integration spec: source system, auth assumptions, normalization rules, provenance fields, idempotency key, backoff/retry policy, parse-only vs side-effecting mode. Dashboard spec: intended operator, read/write scope, refresh cadence, canonical data queries, security posture. | Section 2.2 | Define acceptance criteria for each contribution class; these specs could inform the adapter certification harness | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §3 First approved recipe wave | recipes, implementation-targets | recipe-list, receipt-bearing, dry-run-first | requirement | 10 named recipes approved as implementation targets: recipe.provenance.bundle.verify; recipe.ingest.chatlog; recipe.ingest.arxiv; recipe.ingest.journal; recipe.ingest.youtube-transcript; recipe.ingest.social-thread; recipe.refinery.dedupe-revision; recipe.route.schema-aware; recipe.tapestry.compile; recipe.truthlint.publish-dry-run. Each should be dry-run-first and receipt-bearing. | Section 3 | Create `recipes/` directory and implement first recipe wave; track against implementation roadmap | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §4 First approved skill wave | skills, implementation-targets, behavior-packs | skill-list, skill-vs-persona | requirement | 8 named skills approved as implementation targets: skill.receipt-author; skill.guard-admission; skill.schema-router; skill.dedupe-reconciler; skill.tapestry-assembler; skill.run-inspector; skill.retrieval.brief-on-hit; skill.migration.translator-check. Explicit note: "These are not 'persona souls'. They are behavior packs." Normalizes the skill = behavior-pack concept. | Section 4 | Create `skills/` directory and implement first skill wave; treat as behavior packs, not personas | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §5 Ingress refinery upgrades | ingest, refinery, implementation-targets | content-fingerprinting, revision-chain, pending-confirmation, source-type-receipts | requirement | The following are upgraded from good ideas to approved implementation targets: content fingerprinting; revision chain detection; raw-source preservation; metadata-first routing; pending-confirmation states; replay-safe import semantics; source-type-specific receipt emission; candidate-tapestry planning. | Section 5 | Track these as approved targets; some overlap with TC-001-007 scope | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §6 Tool-budget and routing eval requirements | governance, ci, metrics, tool-surface | tool-budget-metrics, routing-tests, regression-tracking | requirement | Every hot-tool role SHOULD eventually ship: routing ambiguity tests; false-positive tool selection tests; context-budget snapshots; refusal tests for out-of-budget or out-of-scope actions. Recommended metrics: number of hot tools; prompt/tool schema token count; routing disagreement rate; misfire rate; average tool-selection latency; context consumed by tool manifests. A PR that materially increases tool-surface size SHOULD explain why consolidation was not appropriate. | Section 6 | Implement tool-budget metrics in CI; add tool-surface regression tracking; require justification for tool-surface growth | high |
| 2026-05-26 | OB1 Assimilation Addendum | §7 What not to import from OB1 | governance, ob1, exclusion-list | ob1-exclusions, thoughts-table, storage-stack, mcp-assumptions | decision | Explicit exclusion list: (1) central "thoughts table" gravity as constitutional model; (2) storage stack as mandatory law; (3) MCP edge-function assumptions as mandatory; (4) license-sensitive direct code/text transplantation; (5) any ontology that displaces Rosetta/ROCK pack law. | Section 7 | Ensure CI or linting flags any attempt to import the excluded items; currently no enforcement | high |
| 2026-05-26 | OB1 Assimilation Addendum | §8 Interaction with Graphiti-style and Muninn-style patterns | memory-planes, temporal, activation, graphiti, muninn | temporal-plane, activation-plane, graphiti-import, muninn-import | decision | Section 8 approves imports from Graphiti/Muninn patterns for temporal and activation planes. Temporal plane: episodic ingest, time-aware edges, evolving-state handling, hybrid retrieval over time+text+graph proximity. Activation plane: recency/frequency/association scoring, confidence modulation, total-recall preservation, trigger-style activation semantics. Explicit: "These remain planes and adapters, not constitutional replacements." | Section 8 | This clarifies the relationship between memory planes and external frameworks; consistent with the 3-plane model in NOT LAME and the memory-sovereignty-map | high |
| 2026-05-26 | OB1 Assimilation Addendum | §9 CI hooks and enforcement | governance, ci, merge-gate | ci-validators, merge-refusal, contribution-gate | requirement | Recommended validators: manifest presence checker; metadata schema validator; acceptance doc presence checker; example existence checker; tests existence checker; tool-budget snapshot checker. Merge refusal conditions: README.md absent; metadata.json absent or invalid; examples missing; acceptance conditions not defined; tool-heavy contribution expands surface without explicit budget note. | Section 9 | Implement all recommended validators; these map to DI-009 (internal knowledge graph) and DI-008 (ledger locking mechanism) concerns | high |
| 2026-05-26 | OB1 Assimilation Addendum | §10 Immediate implementation actions | governance, implementation-track | 7-actions, implementation-backlog | issue-candidate | Section 10 lists 7 concrete immediate actions: (1) create top-level recipes/, skills/, integrations/, dashboards/, primitives/; (2) add contribution metadata schema to repo validators; (3) scaffold first recipe pack wave; (4) scaffold first skill wave; (5) add tool-budget checks to CI/eval; (6) implement deterministic dedupe and schema-aware routing in Pillar Zero packages; (7) treat quiet retrieval behavior as a requirement for future operator-facing context surfacing. These are concrete and trackable but are NOT currently tracked in the project board or backlog. | Section 10 | Create 7 tracking issues; map to existing packages or new packages | high |
| 2026-05-26 | OB1 Assimilation Addendum | §1.3 AI-readable repo rule | governance, ai-readability, documentation | ai-readable-repo, agent-understandable, stepwise-docs | decision | Every important package, pack, recipe, skill, and integration should be understandable by: human developer skimming quickly; coding agent asked to work within bounds; CI systems and validators. Requirements per contribution: stepwise; explicit about prerequisites; explicit about success conditions; explicit about allowed actions; explicit about where humans click and where agents act; accompanied by minimal examples. | Section 1.3 | This is a quality bar for all documentation; could be enforced via acceptance.md presence + readability checklist | medium |
| 2026-05-26 | OB1 Assimilation Addendum | §1.2 Progressive learning path | docs, build-order, education | progressive-learning, compounding-verticals, 10-step-path | decision | The build path should teach by compounding verticals rather than dumping abstractions. 10 approved steps: canonicalization+CID → receipt authoring+bundle verification → guarded no-side-effect toolcall → deterministic ingress refinery → schema-aware routing → tapestry compilation → temporal memory sidecar → activation memory sidecar → TruthLint/provenance publication workflows → broader mission-control and external verticals. Docs and examples should follow this order. | Section 1.2 | Use this as a documentation ordering principle; could inform the tutorial/onboarding path | low |
| 2026-05-26 | OB1 Assimilation Addendum | Dedup receipts | receipts, dedupe, integrity | dedupe-receipts, receipt-law | requirement | Section 1.5 lists "dedupe receipts" as a required output of the deterministic dedupe system in Pillar Zero. This extends the Receipt Law: every meaningful step emits receipts, and deduplication is a meaningful step. | Section 1.5 | Add dedupe receipts to Receipt Law specification; ensure dedupe receipts are first-class citizens in the receipt schema | medium |

---

## Components And Technologies

- **Contribution taxonomy:** `core/`, `packs/`, `primitives/`, `recipes/`, `integrations/`, `skills/`, `dashboards/`, `apps/`, `verticals/`
- **metadata.json schema:** id, title, kind, version, owner, depends_on, human_summary, agent_hints, status
- **Tool-budget model:** per-role hot-tool budgets with routing ambiguity tests, context-budget snapshots, tool-surface regression metrics
- **Recipe spec fields:** goal, prerequisites, typed inputs, steps, receipts emitted, failure/refusal paths, acceptance checks
- **Skill spec fields:** role, trigger conditions, allowed actions, refusal conditions, examples, context/tape budget
- **Dedupe infrastructure:** normalization fingerprints, revision fingerprints, duplicate suppression, replay-safe upserts, dedupe receipts
- **Schema-aware routing:** source preservation → metadata extraction → routing policy → conditional promotion → pending-confirmation on ambiguity
- **Quiet retrieval:** silent-on-miss, brief-on-hit, refusal-safe when policy blocks

---

## Conceptual Claims

- OB1 is a process-architecture donor, not a semantic/ontological donor for Rosetta
- Tool surfaces have measurable costs (context, routing ambiguity, misuse risk) that must be governed
- Deduplication belongs low in the stack, before expensive reasoning
- Ambiguity in routing should be flagged and held in pending-confirmation rather than guessed
- Skills are behavior packs, not persona souls — this is an explicit normalization
- Graphiti/Muninn temporal and activation patterns are approved as planes/adapters, not constitutional replacements
- The 10-step progressive learning path is the canonical onboarding/build order for Rosetta

---

## Dependencies And Sequencing

- Section 10 actions require creation of `recipes/`, `skills/`, `integrations/`, `dashboards/`, `primitives/` top-level directories — currently not present in Bootstrap
- Tool-budget CI checks depend on tool-surface definition in packages/roles
- Deterministic dedupe in Pillar Zero is a prerequisite for schema-aware routing (TC-005 blocked by TC-005)
- pending-confirmation states for schema-aware routing depend on TC-005 (Promotion state machine)
- Quiet retrieval requirement affects operator-facing surfaces which are downstream of core kernel

---

## Contradictions Or Supersession

- The document (2026-04-10) depends on "Doctrine v0.2" and "ROCK-3111-C" — both of which may have evolved or been superseded since. The Normative Staging Doctrine v0.2 (2026-04-10 same date) was processed in run 10 (PR #1166) and is the current authoritative governance doc, suggesting the OB1 addendum may need a refresh to reference the latest Doctrine.
- Section 10's immediate implementation actions overlap with work that may already be tracked in TC-001-007 (Pillar Zero, ingest-core) — coordination needed to avoid duplicate work orders.
- The 10-step progressive learning path in §1.2 may conflict with the actual build order in the TC-001-007 dependency graph — need alignment.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| OB1-001: Section 10 implementation actions not tracked | tracking-gap | `docs/intake/issue-drafts/OB1-001-section-10-actions-untracked.md` | governance, tracking, implementation | — | Section 10 lists 7 concrete immediate actions with no owner, no timeline, no tracking issue |
| OB1-002: Tool-budget CI enforcement missing | implementation | `docs/intake/issue-drafts/OB1-002-tool-budget-ci-missing.md` | governance, ci, tool-surface, regression-tracking | OB1-001 | Section 6 defines mandatory tool-budget checks; no implementation exists |
| OB1-003: Contribution folder contract CI not enforcing metadata.json | implementation | `docs/intake/issue-drafts/OB1-003-contribution-folder-contract-ci.md` | governance, ci, contribution-contract, metadata-json | OB1-001 | Section 9 merge refusal conditions not enforced in current CI |
| OB1-004: OB1 exclusion list not enforced in CI | implementation | `docs/intake/issue-drafts/OB1-004-ob1-exclusion-list-unenforced.md` | governance, ci, ob1-exclusions | OB1-001 | Section 7 exclusion list has no automated enforcement currently |
| OB1-005: pending-confirmation state machine undefined for schema-aware routing | architecture | `docs/intake/issue-drafts/OB1-005-pending-confirmation-state-machine.md` | routing, ingress, pending-confirmation, state-machine | TC-005 (Promotion state machine) | Section 1.6/5 requires pending-confirmation states; no formal state machine defined |
| OB1-006: First recipe wave (10 recipes) not scaffolded | implementation | `docs/intake/issue-drafts/OB1-006-first-recipe-wave-unscaffolded.md` | recipes, implementation-targets, receipts | OB1-001 | Section 3 names 10 approved recipes; recipes/ directory may not exist; no implementation |
| OB1-007: First skill wave (8 skills) not scaffolded | implementation | `docs/intake/issue-drafts/OB1-007-first-skill-wave-unscaffolded.md` | skills, implementation-targets, behavior-packs | OB1-001 | Section 4 names 8 approved skills; skills/ directory may not exist; no implementation |
| OB1-008: Deterministic dedupe not implemented in Pillar Zero | implementation | `docs/intake/issue-drafts/OB1-008-deterministic-dedupe-pillar-zero.md` | dedupe, ingest, pillar-zero, receipts | TC-002 or parallel | Section 1.5 requires normalization fingerprints, revision fingerprints, dedupe receipts in Pillar Zero; no current implementation |
| OB1-009: OB1 addendum may need refresh against current Doctrine v0.2 | maintenance | `docs/intake/issue-drafts/OB1-009-ob1-addendum-refresh-needed.md` | governance, staleness, doctrine | — | OB1 addendum (2026-04-10) depends on "Doctrine v0.2" which is now the current Normative Staging Doctrine v0.2; cross-refs may need updating |

---

## Project Board Suggestions

- **Area:** Governance / Process Architecture
- **Cycle:** This is a governance addendum that affects multiple implementation tracks. Issues OB1-001 through OB1-009 map to: Bootstrap gaps, TC-005 dependencies, CI enforcement, and documentation quality.
- **Status:** Not currently tracked
- **Blocked by:** OB1-001 (the tracking gap itself blocks the other OB1 items from being properly managed); TC-005 for OB1-005
- **Parallelization notes:** OB1-001 through OB1-004 are governance/CI work that can proceed independently of TC-001-007. OB1-005 depends on TC-005 (Promotion state machine). OB1-006/007 (recipe/skill waves) can be scaffolded in parallel with TC development. OB1-008 (dedupe) is Pillar Zero work that may overlap with TC-002.

---

## Open Questions

- Does the `recipes/` directory currently exist in the Rosetta repo? If not, who owns creation?
- Are the 10 approved recipes and 8 approved skills tracked anywhere in the project board as implementation candidates?
- What is the current enforcement status of the contribution folder contract in CI?
- Is the OB1 addendum intended to be a living document or a static snapshot?
- How does the 10-step progressive learning path (§1.2) map to the current TC-001-007 build order?
- Does the tool-budget doctrine apply to external adapter/skills or only to internal agent roles?