# Docs Intelligence Extraction — Chunk 2

## Source

- Path: `Code/rosetta/docs/PRDs/20260426 - Entif and Rosetta PRD.md`
- Title: Entif and Rosetta PRD
- Date evidence: 2026-04-26
- Authority tier: primary (internal PRD)
- Freshness: current (2026-04-26)
- Word count: ~8,500 (full doc); ~1,100 (chunk 2 excerpt)
- Extractor: subagent chunk-2
- Extraction date: 2026-04-26

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

Chunk 2 (lines 456–521) covers the phased roadmap for constitutional hardening, Text-Core completion, memory-plane expansion, and docs-intelligence orchestration — plus explicit acceptance criteria for the next release family and an open-questions section acknowledging the PRD is code-aligned but not comprehensively audited. The section closes with a strategic confirmation that the `crates/rosetta` repo and Drive canon are now sufficiently aligned to treat Rosetta as a real constitutional kernel rather than speculative superstructure.

---

## Goals And Intent

- Complete constitutional surface hardening across pack conformance, receipt semantics, and rights/guard enforcement
- Complete the Text-Core MVP gate (TC-001 through TC-007)
- Expand into memory-plane behaviors (temporal, activation, route-plan/conceptual mixture)
- Productize the docs-intelligence lane as a first-class part of the product
- Define explicit acceptance criteria for the next release family
- Acknowledge scope limitations of the current PRD pass

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Pack conformance completion: deterministic pack IDs, cycle detection, required root-file enforcement, traceability-header enforcement, broader CI enforcement | "Finish that, then add required root-file enforcement, traceability-header enforcement, and broader CI enforcement across packs." | packs / RRP | P0 | RRP pack manifest is exemplar template |
| Receipt semantics hardening: richer evidence typing, policy artifact linkage, key lifecycle posture, deeper validation of evidence claim semantics | "richer evidence typing, stronger policy artifact linkage, key lifecycle posture, and deeper validation around evidence claim semantics." | receipts | P0 | Structural closure + policy/evidence interpretability for explain/audit |
| Rights and guard hardening: actor-aware/tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, audience binding | "actor-aware or tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, and audience binding." | guard / rights | P0 | Must prove with receipts why read-like action allowed, side effect denied, under which policy scope |
| TC-005 promotion state machinery: structured extracts, cooling/revisit/quarantine states, extract receipts | "define TC-005 around promotion states, structured extracts, cooling/revisit/quarantine states, and extract receipts." | text-core / refinery | P0 | Must not conflate structured extracts with raw evidence |
| TC-005 acceptance: refinery produces source observations and structured extracts without pretending extracts are same as raw evidence | "refinery can produce source observations and structured extracts without pretending those extracts are the same thing as raw evidence." | text-core / refinery | P0 | |
| TC-006, TC-007 remain open implementation candidates after TC-001–TC-004 land | "TC-005, TC-006, and TC-007 remain open implementation candidates after TC-001 through TC-004 landed." | text-core | P1 | |
| Durable canonical cache: move from in-memory JSON persistence to Postgres JSONB with row-level rights enforcement | "Move the cache to durable storage—per doctrine, Postgres JSONB plus row-level rights enforcement is the clearest baseline" | canonical-cache | P0 | Preserve byte identity, manifestation identity, record-family revision chains, conceptual clustering, correction retention, merge-eligibility rules |
| Durable cache acceptance: bootstrap fixtures replayed into durable storage with identical semantic outcomes; cache no longer blocks broader ingest on durability grounds | "bootstrap fixtures can be replayed into durable storage with identical semantic outcomes, and the cache no longer blocks broader ingest on durability grounds." | canonical-cache | P0 | |
| English accompaniment / inspecting surfaces: summary/explain/audit views over runs, receipts, registry entries, cache clusters, promotion decisions | "Build summary/explain/audit views over runs, receipts, registry entries, cache clusters, and promotion decisions." | docs-intelligence | P0 | Human can inspect promoted claim or compiled context without spelunking raw JSON or repo docs |
| Live-source adapter introduction: real acquisition adapters behind refinery boundary; start with GitHub metadata/files and Google Drive documents | "Start with one or two high-value families that match your near-term workflow needs—likely GitHub metadata/files and Google Drive documents already in your active scope" | source-registry / refinery | P0 | Same refinery contracts and receipts used for live-acquired artifacts as for fixtures |
| Live-source adapter later expansion: branch outward into repository registries such as DataCite or Crossref | "later branch outward into repository registries such as DataCite or Crossref" | source-registry | P2 | |
| Temporal plane implementation: episodic ingest, temporal edges, evolving-state projection, time-aware retrieval APIs | "temporal adapters / native temporal plane work with episodic ingest, temporal edges, evolving-state projection, and time-aware retrieval APIs" | memory-plane | P1 | System can answer questions where past and present truths must not collapse into one undifferentiated memory mass |
| Activation plane implementation: recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, proactive reminder policies | "recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, and proactive reminder policies" | memory-plane | P1 | Surface right memory first without deleting colder truths; explain why something surfaced now |
| Route-plan and conceptual mixture integration: ontology/concept-mixture-aware routing layer rather than simplistic role-expert routing | "ontology/concept-mixture-aware routing layer rather than simplistic role-expert routing" | memory-plane / routing | P1 | Compiled routes can explain conceptual overlaps, specializations, why council or skill set was invoked |
| Extraction artifact standardization: structured artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, authority class | "formalize extraction outputs as structured artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, and authority class" | docs-intelligence | P0 | Easy to promote into issue drafts, project-board views, roadmap maps without mislabeling as runtime Rosetta ingestion |
| Issue-promotion pipeline: structured findings → candidate issue drafts → orchestration review → publish/track with full provenance | "system can take structured findings from docs intelligence, group them into candidate issue drafts, request orchestration review, and publish/track them with full provenance" | docs-intelligence | P0 | Repo already uses local issue drafts as review gate before publishing GitHub issues |
| Next green-state acceptance: Rosetta receipts and pack conformance green for core packs and test vectors | "Rosetta receipts and pack conformance are green for the core packs and test vectors" | receipts / packs | P0 | |
| Next green-state acceptance: canonical cache works against durable storage without violating match/merge semantics | "The canonical cache works against durable storage without violating current match/merge semantics" | canonical-cache | P0 | |
| Next green-state acceptance: at least one live source family runs through same refinery contract that fixtures currently use | "At least one live source family runs through the same refinery contract that fixtures currently use" | source-registry / refinery | P0 | |
| Next green-state acceptance: read-like retrieval stays rights-scoped at storage boundary and guard decisions are receipted | "Read-like retrieval stays rights-scoped at the storage boundary and guard decisions are receipted" | guard / receipts / storage | P0 | |
| Next green-state acceptance: operator can inspect summary, explain, and audit surfaces without rereading entire docs corpus or spelunking whole repo | "operator can inspect summary, explain, and audit surfaces without rereading the entire docs corpus or spelunking the whole repo" | docs-intelligence | P0 | |
| Next green-state acceptance: docs intelligence remains clearly separated from runtime Rosetta-native ingestion, but issue extraction and planning artifacts become genuinely useful and current | "Docs intelligence remains clearly separated from runtime Rosetta-native ingestion, but issue extraction and planning artifacts become genuinely useful and current" | docs-intelligence | P0 | |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Constitutional hardening phase / pack conformance completion | `packs`, `conformance`, `receipts`, `ci` | pack IDs, cycle detection, RRP pack manifest | requirement | RRP pack manifest and schema should become the exemplar template every future pack must satisfy; acceptance requires deterministic pack IDs, conformance tests passing, cycle detection enforced, pack metadata sufficient for automated documentation and compatibility reasoning | "RRP pack manifest and schema should become the exemplar template every future pack must satisfy" | Treat RRP as canonical template; enforce in CI | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Constitutional hardening phase / receipt semantics hardening | `receipts`, `semantics`, `policy`, `evidence` | evidence typing, policy artifact linkage, key lifecycle | requirement | Receipt semantics hardening: richer evidence typing, stronger policy artifact linkage, key lifecycle posture, deeper validation around evidence claim semantics; acceptance means structural closure + policy/evidence interpretability for real explain/audit views | "not only structural closure but also policy/evidence interpretability sufficient for real explain/audit views" | Add evidence typing schema and policy linkage to receipt structure | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Constitutional hardening phase / rights and guard hardening | `rights`, `guard`, `policy`, `receipts` | actor-aware policy, temporal policy, capability tokens, replay refusal | requirement | Rights and guard hardening: actor-aware/tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, audience binding; acceptance means system can prove with receipts why read-like action allowed, why side effect denied, under which policy scope | "the system can prove, with receipts, why a read-like action was allowed, why a side effect was denied, and under which policy scope that happened" | Add tenant/scope context to guard evaluation; issue receipts for all decisions | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase / TC-005 | `text-core`, `promotion-state`, `refinery`, `extracts` | TC-005, TC-006, TC-007, structured extracts, cooling/revisit/quarantine | requirement | TC-005 defined around promotion states, structured extracts, cooling/revisit/quarantine states, extract receipts; TC-006 and TC-007 remain open after TC-001–TC-004; acceptance means refinery can produce source observations and structured extracts without pretending those extracts are same as raw evidence | "TC-005, TC-006, and TC-007 remain open implementation candidates" / "refinery can produce source observations and structured extracts without pretending those extracts are the same thing as raw evidence" | Implement promotion state machine with explicit cooling/revisit/quarantine; keep extracts distinct from raw evidence | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase / durable canonical cache | `canonical-cache`, `postgres`, `storage`, `durability` | Postgres JSONB, row-level rights, byte identity, revision chains | requirement | Move canonical cache from in-memory JSON to Postgres JSONB with row-level rights enforcement; preserve byte identity, manifestation identity, record-family revision chains, conceptual clustering, correction retention, merge-eligibility rules; acceptance means bootstrap fixtures replayed with identical semantic outcomes | "Move the cache to durable storage—per doctrine, Postgres JSONB plus row-level rights enforcement is the clearest baseline" | Migrate cache to Postgres JSONB; validate semantic equivalence with bootstrap fixtures | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase / English accompaniment | `docs-intelligence`, `inspection`, `ui`, `explain` | summary/explain/audit views, runs, receipts, registry, cache, promotion | requirement | English accompaniment: build summary/explain/audit views over runs, receipts, registry entries, cache clusters, promotion decisions; acceptance means human can inspect promoted claim or compiled context without spelunking raw JSON or repo docs | "Build summary/explain/audit views over runs, receipts, registry entries, cache clusters, and promotion decisions" | Build inspection UI layer before large-scale operator rollout | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase / live-source adapter introduction | `source-registry`, `refinery`, `adapters`, `github`, `google-drive` | GitHub, Google Drive, DataCite, Crossref, refinery boundary | requirement | Add real acquisition adapters behind refinery boundary after pack/schema hardening; start with GitHub metadata/files and Google Drive; later expand to DataCite or Crossref; same refinery contracts and receipts used for live-acquired artifacts as for fixtures | "Start with one or two high-value families... likely GitHub metadata/files and Google Drive documents already in your active scope" | Prioritize GitHub + Google Drive adapters; verify same receipt contract as fixtures | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Memory-plane expansion phase / temporal plane | `memory-plane`, `temporal`, `retrieval` | episodic ingest, temporal edges, evolving-state projection, time-aware retrieval | requirement | Temporal plane implementation: episodic ingest, temporal edges, evolving-state projection, time-aware retrieval APIs; acceptance means system can answer questions where past and present truths must not collapse into one undifferentiated memory mass | "system can answer questions where past and present truths must not collapse into one undifferentiated memory mass" | Add temporal dimension to memory-plane after Text-Core is stable | medium |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Memory-plane expansion phase / activation plane | `memory-plane`, `activation`, `retrieval` | recency, frequency, association, conflict-aware confidence, trigger relevance | requirement | Activation plane implementation: recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, proactive reminder policies; acceptance means surfacing right memory first without deleting colder truths, with explainable surfacing rationale | "surface the right memory first without deleting colder truths, and can explain why something surfaced now" | Implement activation scoring after temporal plane lands | medium |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Memory-plane expansion phase / route-plan and conceptual mixture | `memory-plane`, `routing`, `ontology`, `mixture` | ontology-aware routing, concept-mixture, role-expert routing, council | requirement | Route-plan and conceptual mixture integration: ontology/concept-mixture-aware routing layer rather than simplistic role-expert routing; acceptance means compiled routes can explain conceptual overlaps, specializations, and why council or skill set was invoked | "compiled routes can explain conceptual overlaps, specializations, and why a certain council or skill set was invoked" | Build concept-mixture router; document route rationale for explainability | medium |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Documentation-intelligence and issue-orchestration phase | `docs-intelligence`, `orchestration`, `extraction`, `issues` | extraction artifacts, issue-promotion pipeline, provenance ledger | requirement | Docs-intelligence productization: extraction artifact standardization (structured with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, authority class) + issue-promotion pipeline (structured findings → candidate drafts → orchestration review → publish/track with provenance) | "formalize extraction outputs as structured artifacts" / "system can take structured findings from docs intelligence, group them into candidate issue drafts, request orchestration review, and publish/track them with full provenance" | Standardize extraction schema; build issue-promotion ledger | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Explicit acceptance criteria for the next release family | `acceptance-criteria`, `release-criteria`, `green-state` | receipts, pack conformance, canonical cache, live source, rights-scoped retrieval, inspection, docs-intelligence separation | requirement | Six explicit acceptance criteria for "next green state": (1) Rosetta receipts and pack conformance green for core packs + test vectors; (2) canonical cache works against durable storage without violating match/merge semantics; (3) at least one live source family runs through same refinery contract as fixtures; (4) read-like retrieval stays rights-scoped at storage boundary + guard decisions are receipted; (5) operator can inspect summary/explain/audit surfaces without full corpus spelunking; (6) docs intelligence clearly separated from runtime Rosetta ingestion but issue extraction/planning artifacts genuinely useful | "A serious 'next green state' should require all of the following" | Gate next release on all six criteria | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Open questions and limitations | `scope`, `audit`, `open-question` | code-aligned vs comprehensive, external web-check narrowness | open-question | PRD is code-aligned (based on README, handoff, bootstrap track, package READMEs, RRP pack manifest, receipt schema) but NOT comprehensive source-code commentary; repo fetches were targeted rather than exhaustive | "The PRD is therefore code-aligned, but not yet a comprehensive source-code commentary" | Plan full file-by-file audit of every package implementation before claiming comprehensive coverage | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Open questions and limitations | `compliance`, `hipaa`, `openai`, `scope` | HIPAA/HITECH, OpenAI prompt caching, privacy regimes, SEC, DataCite, Crossref | open-question | External web-check was deliberately narrow: verified key guidance from HHS on HIPAA/HITECH Security Rule posture and from OpenAI on modern prompt caching. NOT yet full official-source pass across broader privacy regimes, SEC retention specifics, or additional ontology/provenance standards (DataCite, Crossref). Should be expanded in later compliance-focused pass before production deployment claims. | "Those are trustworthy and recent anchors, but they are not yet a full official-source pass" | Schedule compliance-focused pass before production deployment | high |
| 2026-04-26 | PRDs/20260426 - Entif and Rosetta PRD.md | Strategic takeaway | `strategy`, `repo-alignment`, `constitutional-kernel` | crates/rosetta fork, Drive canon alignment, constitutional kernel | decision | Strategic confirmation: repo (`crates/rosetta` fork) and Drive canon are now sufficiently aligned to treat Rosetta as a real constitutional kernel — not speculative superstructure. Next job is disciplined hardening, live-adapter replacement of fixture seams, durable cache maturation, enforceable pack/receipt/rights discipline. | "stop treating Rosetta as a purely speculative superstructure and start treating it as a real constitutional kernel" | Shift posture from speculative to hardening/execution | high |

---

## Components And Technologies

- **Rosetta receipts**: creation, signing, bundling, closure verification; semantic hardening in next phase
- **RRP pack manifest**: exemplar template for all future packs; deterministic IDs; conformance tests
- **Canonical cache**: moving from in-memory JSON → Postgres JSONB with row-level rights enforcement
- **Text-Core (TC-001–TC-007)**: promotion states, structured extracts, cooling/revisit/quarantine states, extract receipts
- **Source registry**: GitHub metadata/files, Google Drive documents (near-term); DataCite, Crossref (later)
- **Refinery boundary**: contract boundary for acquisition adapters (live vs fixture)
- **Memory-plane**: temporal adapters, activation plane, ontology/concept-mixture-aware routing
- **Docs-intelligence lane**: extraction artifact standardization + issue-promotion pipeline
- **Guard engine**: actor-aware/tenant-aware policy evaluation, temporal policy context, capability-token issuance

---

## Conceptual Claims

- Bootstrap execution track is the right posture for cache but wrong for long-term scale
- Promotion states (TC-005) must keep structured extracts distinct from raw evidence — they are not the same thing
- Live-acquired artifacts must flow through the same refinery contracts and receipts as fixtures
- Memory-plane temporal and activation behaviors only make sense after Text-Core is honestly useful
- Docs intelligence must remain clearly separated from runtime Rosetta-native ingestion
- Rosetta has crossed the threshold from speculative superstructure to real constitutional kernel
- The biggest strategic problem is no longer "what is Rosetta" but rather "how to harden it systematically"

---

## Dependencies And Sequencing

| Phase | Slice | Depends On |
|---|---|---|
| Constitutional hardening | Pack conformance completion | ROCK-3111 work already in flight; RRP pack manifest as template |
| Constitutional hardening | Receipt semantics hardening | Receipt mechanics already real (creation, signing, bundling, closure verification) |
| Constitutional hardening | Rights and guard hardening | Parse-only rule engine already correct/minimal |
| Text-Core | TC-005 promotion state machinery | TC-001–TC-004 must land first |
| Text-Core | Durable canonical cache | Postgres JSONB + row-level rights; bootstrap fixtures must replay identically |
| Text-Core | English accompaniment / inspecting surfaces | Should happen before large-scale operator rollout |
| Text-Core | Live-source adapter introduction | Requires pack/schema hardening complete first; refinery boundary in place |
| Memory-plane | Temporal plane | Only after Text-Core is honestly useful |
| Memory-plane | Activation plane | Only after Text-Core is honestly useful |
| Memory-plane | Route-plan and conceptual mixture | After temporal plane |
| Docs-intelligence | Extraction artifact standardization | Docs-intelligence workflow already exists in repo |
| Docs-intelligence | Issue-promotion pipeline | Local issue drafts already used as review gate; ledger already exists |

---

## Contradictions Or Supersession

- No internal contradictions detected in chunk 2. The phased approach is internally consistent with prior sections of the PRD.
- This PRD (2026-04-26) supersedes prior draft by being materially stronger (now includes `crates/rosetta` fork correlation to Drive canon).

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
|---|---|---|---|---|
| chunk-2-001: Implement TC-005 promotion state machinery with cooling/revisit/quarantine states | enhancement | `text-core`, `promotion-state`, `refinery` | TC-001–TC-004 landing | "define TC-005 around promotion states, structured extracts, cooling/revisit/quarantine states, and extract receipts" |
| chunk-2-002: Migrate canonical cache from in-memory JSON to Postgres JSONB | enhancement | `canonical-cache`, `storage`, `postgres`, `durability` | None (greenfield for this slice) | "Move the cache to durable storage—per doctrine, Postgres JSONB plus row-level rights enforcement is the clearest baseline" |
| chunk-2-003: Add live-source acquisition adapters behind refinery boundary (GitHub, Google Drive) | enhancement | `source-registry`, `refinery`, `adapters`, `github`, `google-drive` | Pack/schema hardening complete | "Start with one or two high-value families that match your near-term workflow needs—likely GitHub metadata/files and Google Drive documents" |
| chunk-2-004: Build English accompaniment inspection surfaces (summary/explain/audit views) | enhancement | `docs-intelligence`, `ui`, `inspection` | Before large-scale operator rollout | "Build summary/explain/audit views over runs, receipts, registry entries, cache clusters, and promotion decisions" |
| chunk-2-005: Rights and guard hardening: actor-aware policy, capability tokens, receipted guard decisions | enhancement | `rights`, `guard`, `policy`, `receipts` | Parse-only rule engine already in place | "actor-aware or tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, and audience binding" |
| chunk-2-006: Productize docs-intelligence extraction artifact standardization | enhancement | `docs-intelligence`, `orchestration`, `extraction` | Docs-intelligence workflow already exists | "formalize extraction outputs as structured artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs, and authority class" |
| chunk-2-007: Productize issue-promotion pipeline with provenance ledger | enhancement | `docs-intelligence`, `orchestration`, `issues` | Extraction artifact standardization (chunk-2-006) | "system can take structured findings from docs intelligence, group them into candidate issue drafts, request orchestration review, and publish/track them with full provenance" |
| chunk-2-008: Temporal plane implementation (episodic ingest, temporal edges, time-aware retrieval) | enhancement | `memory-plane`, `temporal`, `retrieval` | Text-Core honestly useful | "temporal adapters / native temporal plane work with episodic ingest, temporal edges, evolving-state projection, and time-aware retrieval APIs" |
| chunk-2-009: Activation plane implementation (recency, frequency, association, conflict-aware confidence) | enhancement | `memory-plane`, `activation`, `retrieval` | Text-Core honestly useful | "recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, and proactive reminder policies" |
| chunk-2-010: Route-plan and conceptual mixture integration (ontology-aware routing) | enhancement | `memory-plane`, `routing`, `ontology` | Temporal plane | "ontology/concept-mixture-aware routing layer rather than simplistic role-expert routing" |
| chunk-2-011: Comprehensive source-code audit before claiming full PRD coverage | research | `scope`, `audit`, `comprehensive` | None | "not the same as a full file-by-file audit of every package implementation. The PRD is therefore code-aligned, but not yet a comprehensive source-code commentary" |
| chunk-2-012: Compliance-focused pass (HIPAA broader, SEC, privacy regimes) before production deployment | research | `compliance`, `hipaa`, `security`, `production` | None | "not yet a full official-source pass across every standard you named earlier, such as broader privacy regimes, SEC retention specifics, or additional ontology/provenance standards" |
| chunk-2-013: Expand live-source adapters to DataCite and Crossref repository registries | enhancement | `source-registry`, `datacite`, `crossref` | Initial GitHub/Google Drive adapters live (chunk-2-003) | "later branch outward into repository registries such as DataCite or Crossref" |

---

## Project Board Suggestions

- **Area**: Rosetta / Entif — phased roadmap execution
- **Cycle**: Q2-Q3 2026 (based on 2026-04-26 date)
- **Status**: Ready for sprint planning against the four phases
- **Blocked by**: TC-001–TC-004 must land before TC-005; pack/schema hardening before live-source adapters; Text-Core honest utility before memory-plane
- **Parallelization notes**: Constitutional hardening slices (pack conformance, receipt semantics, rights/guard) can run in parallel. Text-Core slices are sequential on TC-001–TC-004. Memory-plane slices are sequential on Text-Core. Docs-intelligence slices can run in parallel with each other and partially with other phases.

---

## Open Questions

1. What is the exact schema for structured extracts (TC-005) and how are they distinguished from raw evidence at the type level?
2. What is the bootstrap fixture set, and has semantic equivalence been validated for the Postgres JSONB migration?
3. Which specific GitHub events/metadata will the first live-source adapter consume (issues, PRs, commits, files)?
4. How is the ontology/concept-mixture routing layer defined — is there an existing OMOC document that defines the concept vocabulary?
5. What is the authority class taxonomy for the extraction artifacts (as mentioned in docs-intelligence standardization)?
6. Is there an existing compliance pass document covering HIPAA/HITECH and OpenAI prompt caching that can be cited?
7. What is the full list of packages in `crates/rosetta` that were included in the code-aligned pass vs. what was excluded?
