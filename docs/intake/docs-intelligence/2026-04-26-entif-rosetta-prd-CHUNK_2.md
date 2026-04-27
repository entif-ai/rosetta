# Docs Intelligence Extraction Artifact

## Source

- Path: `docs/PRDs/20260426 - Entif and Rosetta PRD.md`
- Title: Entif Rosetta Product Requirements Document
- Date evidence: 2026-04-26
- Authority tier: primary — product requirements document
- Freshness: current session
- Word count: ~520 lines
- Extractor: subagent (CHUNK_2, lines 456-521)
- Extraction date: 2026-04-26

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

Chunk A2 of the Entif Rosetta PRD covers the phased roadmap (constitutional hardening, Text-Core completion, memory-plane expansion, documentation-intelligence), explicit acceptance criteria for the next release family, and open questions/limitations. Confirms repo+Drive canon alignment is now sufficient to treat Rosetta as a real constitutional kernel — not speculative.

## Goals And Intent

- Harden constitutional surfaces already in the repo (pack conformance, receipt semantics, rights/guard)
- Complete Text-Core MVP gate (TC-001 through TC-007)
- Expand memory planes (temporal, activation, route-plan/conceptual mixture) only after Text-Core is honestly useful
- Productize the docs-intelligence lane as a first-class planning artifact system
- Confirm alignment between `crates/rosetta` fork and Drive canon — stop treating Rosetta as speculative superstructure

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Pack conformance completion: deterministic pack IDs, cycle detection, root-file enforcement, traceability-header enforcement, CI enforcement across packs | "pack conformance completion... deterministic pack IDs, conformance tests passing, cycle detection enforced" (lines 456-460) | `rosetta-schemas`, RRP pack manifest | high | ROCK-3111-C already in flight |
| Receipt semantics hardening: richer evidence typing, stronger policy artifact linkage, key lifecycle posture, deeper evidence claim semantics validation | "semantic hardening: richer evidence typing, stronger policy artifact linkage, key lifecycle posture" (lines 461-462) | `rosetta-receipts`, `rosetta-guard` | high | Structural closure already real; next is interpretability for explain/audit |
| Rights and guard hardening: actor-aware/tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, audience binding | "actor-aware or tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, audience binding" (lines 464-466) | `rosetta-guard` | high | Parse-only rule engine is correct but minimal; needs upgrade |
| TC-005 promotion state machinery: promotion states, structured extracts, cooling/revisit/quarantine states, extract receipts | "TC-005 around promotion states, structured extracts, cooling/revisit/quarantine states, and extract receipts" (lines 470-472) | `ingress-refinery`, `canonical-cache` | high | TC-006, TC-007 remain open after TC-001–TC-004 |
| Durable canonical cache: Postgres JSONB + row-level rights enforcement, preserve byte identity, manifestation identity, record-family revision chains, conceptual clustering, correction retention, merge-eligibility | "Move the cache to durable storage—per doctrine, Postgres JSONB plus row-level rights enforcement" (lines 474-476) | `canonical-cache`, `rosetta-store` | high | Bootstrap fixtures must replay identically into durable storage |
| English accompaniment and inspecting surfaces: summary/explain/audit views over runs, receipts, registry entries, cache clusters, promotion decisions | "Build summary/explain/audit views over runs, receipts, registry entries, cache clusters, and promotion decisions" (lines 479-481) | `projection-adapters`, `rosetta-operator` | high | Human must inspect without spelunking raw JSON or repo docs |
| Live-source adapter introduction behind refinery boundary: GitHub metadata/files, Google Drive documents as first families | "Start with one or two high-value families... likely GitHub metadata/files and Google Drive documents" (lines 483-485) | `source-substrate`, `ingress-refinery`, `source-registry` | high | Same refinery contracts and receipts as fixtures |
| Temporal plane implementation: episodic ingest, temporal edges, evolving-state projection, time-aware retrieval APIs | "temporal adapters / native temporal plane work with episodic ingest, temporal edges, evolving-state projection, and time-aware retrieval APIs" (lines 490-491) | memory-plane | medium | Only after Text-Core is honestly useful |
| Activation plane implementation: recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, proactive reminder policies | "recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, and proactive reminder policies" (lines 494-496) | memory-plane | medium | Surface right memory first without deleting colder truths |
| Route-plan and conceptual mixture integration: ontology/concept-mixture-aware routing rather than simplistic role-expert routing | "ontology/concept-mixture-aware routing layer rather than simplistic role-expert routing" (lines 498-499) | `rosetta-tapestry`, routing | medium | Compiled routes must explain conceptual overlaps and specializations |
| Extraction artifact standardization: structured artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs | "formalize extraction outputs as structured artifacts with source path, date evidence, locators, confidence, contradiction tags, candidate issue refs" (lines 503-505) | docs-intelligence | high | Easy promotion into issue drafts, project-board views, roadmap maps |
| Issue-promotion pipeline: local issue drafts as review gate, publish GitHub issues, record URLs/state changes in ledger | "local issue drafts as a review gate before publishing GitHub issues, then records issue URLs and state changes in a ledger" (lines 507-509) | docs-intelligence | high | Productize existing workflow |
| Next release acceptance: Rosetta receipts and pack conformance green for core packs and test vectors | "Rosetta receipts and pack conformance are green for the core packs and test vectors" (lines 513-514) | `rosetta-receipts`, `rosetta-schemas` | high | |
| Next release acceptance: canonical cache works against durable storage without violating match/merge semantics | "The canonical cache works against durable storage without violating current match/merge semantics" (lines 515-516) | `canonical-cache` | high | |
| Next release acceptance: at least one live source family runs through refinery contract that fixtures use | "At least one live source family runs through the same refinery contract that fixtures currently use" (lines 517-518) | `source-substrate`, `ingress-refinery` | high | |
| Next release acceptance: read-like retrieval rights-scoped at storage boundary, guard decisions receipted | "Read-like retrieval stays rights-scoped at the storage boundary and guard decisions are receipted" (lines 519-520) | `rosetta-guard`, `rosetta-store` | high | |
| Next release acceptance: operator can inspect summary/explain/audit surfaces without rereading entire docs corpus | "The operator can inspect summary, explain, and audit surfaces without rereading the entire docs corpus" (lines 521-522) | `rosetta-operator`, `projection-adapters` | high | |
| Next release acceptance: docs intelligence clearly separated from runtime Rosetta-native ingestion, but issue extraction and planning artifacts become genuinely useful | "Docs intelligence remains clearly separated from runtime Rosetta-native ingestion, but issue extraction and planning artifacts become genuinely useful and current" (lines 523-525) | docs-intelligence | high | |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Constitutional hardening phase — pack conformance | `pack-conformance`, `rights`, `ci`, `bootstrap` | Pack IDs must be deterministic; conformance tests must pass; cycle detection must be enforced; RRP pack manifest is exemplar template | requirement | Pack conformance completion is Slice 1 of constitutional hardening phase. Acceptance: deterministic pack IDs, conformance tests passing, cycle detection enforced, pack metadata sufficient for automated documentation and compatibility reasoning. | lines 456-460 | Promote ROCK-3111-C to binding product law | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Constitutional hardening phase — receipt semantics | `receipts`, `evidence`, `policy`, `semantics` | Evidence typing, policy artifact linkage, key lifecycle posture, evidence claim semantics validation | requirement | Receipt semantics hardening is Slice 2. Structural closure is already real; next is interpretability sufficient for real explain/audit views. Acceptance: not only structural closure but also policy/evidence interpretability. | lines 461-463 | Extend `rosetta-receipts` schema with evidence type taxonomy and policy linkage fields | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Constitutional hardening phase — rights and guard | `rights`, `guard`, `policy-evaluation`, `capability-token` | Actor/tenant-aware policy evaluation, temporal policy context, capability-token issuance, replay refusal, audience binding | requirement | Rights and guard hardening is Slice 3. Parse-only rule engine is correct but intentionally minimal. Acceptance: system can prove with receipts why a read was allowed, why a side effect was denied, and under which policy scope. | lines 464-467 | Upgrade `rosetta-guard` with actor-aware evaluation and temporal policy context | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase — TC-005 | `text-core`, `promotion-state`, `structured-extract`, `quarantine`, `refinery` | Promotion states, structured extracts, cooling/revisit/quarantine states, extract receipts | requirement | TC-005 is the gate for promotion state machinery. Refinery must produce source observations and structured extracts without pretending those extracts are raw evidence. TC-006, TC-007 remain open after TC-001–TC-004. | lines 470-473 | Implement TC-005 as promotion-state machinery with cooling/revisit/quarantine states | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase — durable canonical cache | `canonical-cache`, `postgres`, `durable-storage`, `semantic-identity` | Postgres JSONB + row-level rights enforcement; preserve byte identity, manifestation identity, record-family revision chains, conceptual clustering, correction retention, merge-eligibility | requirement | Durable canonical cache replaces in-memory + local JSON. Postgres JSONB with row-level rights is the clearest baseline. Bootstrap fixtures must replay identically. Cache must not block broader ingest on durability grounds. | lines 474-477 | Migrate `canonical-cache` from in-memory to Postgres JSONB with row-level rights | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase — English accompaniment | `english-accompaniment`, `inspection`, `audit`, `projection-adapters` | Summary/explain/audit views over runs, receipts, registry entries, cache clusters, promotion decisions | requirement | English accompaniment and inspecting surfaces. Human must inspect promoted claim or compiled context without spelunking raw JSON or repo docs. | lines 479-481 | Build projection views in `projection-adapters` / `rosetta-operator` | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Text-Core completion phase — live-source adapters | `live-source-adapter`, `source-substrate`, `github`, `google-drive`, `refinery` | GitHub metadata/files, Google Drive documents as first live adapter families | requirement | Live-source adapter introduction behind refinery boundary after pack/schema hardening. Same refinery contracts and receipts used for live-acquired artifacts as for fixtures. Later: DataCite, Crossref repository registries. | lines 483-486 | Implement GitHub and Google Drive adapters behind refinery boundary | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Memory-plane expansion phase — temporal plane | `temporal-plane`, `memory`, `episodic-ingest`, `time-aware-retrieval` | Episodic ingest, temporal edges, evolving-state projection, time-aware retrieval APIs | requirement | Temporal plane implementation is first slice of memory-plane expansion. Must answer questions where past and present truths must not collapse into one undifferentiated memory mass. Only after Text-Core honestly useful. | lines 490-492 | Implement temporal adapters and time-aware retrieval after Text-Core gate | medium |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Memory-plane expansion phase — activation plane | `activation-plane`, `memory`, `recency`, `relevance`, `proactive-reminder` | Recency, frequency, association, conflict-aware confidence updates, trigger-style relevance, proactive reminder policies | requirement | Activation plane implementation. System surfaces right memory first without deleting colder truths, and can explain why something surfaced now. | lines 494-496 | Implement activation plane after temporal plane | medium |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Memory-plane expansion phase — route-plan and conceptual mixture | `route-plan`, `conceptual-mixture`, `ontology`, `tapestry`, `routing` | Ontology/concept-mixture-aware routing layer, not simplistic role-expert routing | requirement | Route-plan and conceptual mixture integration. Compiled routes must explain conceptual overlaps, specializations, and why a certain council or skill set was invoked. | lines 498-500 | Extend `rosetta-tapestry` with ontology-aware routing layer | medium |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Documentation-intelligence and issue-orchestration phase — extraction artifact | `docs-intelligence`, `extraction`, `structured-artifact`, `planning` | Structured extraction artifacts with source path, date evidence, locators, confidence, contradiction tags | requirement | Extraction artifact standardization. Formalize extraction outputs as structured artifacts. Easy promotion into issue drafts, project-board views, roadmap maps. Not runtime Rosetta ingestion. | lines 503-505 | Standardize this extraction template as the canonical format | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Documentation-intelligence and issue-orchestration phase — issue-promotion pipeline | `docs-intelligence`, `issue-promotion`, `ledger`, `workflow` | Local issue drafts as review gate, publish GitHub issues, record URLs/state changes in ledger | requirement | Issue-promotion pipeline. System takes structured findings from docs intelligence, groups into candidate issue drafts, requests orchestration review, publishes/tracks with full provenance. | lines 507-510 | Productize existing draft-to-issue workflow | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Explicit acceptance criteria — all criteria listed | `acceptance-criteria`, `release-criteria`, `receipts`, `cache`, `live-source`, `rights`, `inspection`, `docs-intelligence` | Six explicit acceptance criteria for next release family | requirement | Six explicit acceptance criteria: (1) receipts+pack conformance green, (2) canonical cache on durable storage, (3) ≥1 live source family through refinery contract, (4) read-like retrieval rights-scoped+guarded with receipts, (5) operator inspection surfaces without full corpus spelunking, (6) docs intelligence clearly separated from runtime ingest but genuinely useful | lines 512-525 | Treat all six as binding release criteria | high |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Open questions and limitations | `open-question`, `scope`, `compliance`, `hipaa`, `web-check` | Repo fetches targeted not exhaustive; external web-check narrow (HIPAA/HITECH + OpenAI prompt caching only); not full official-source pass across all named standards | open-question | Two open questions: (1) repo fetches were targeted not exhaustive — PRD is code-aligned but not full file-by-file audit, (2) external web-check deliberately narrow — HIPAA/HITECH + OpenAI prompt caching only; broader privacy regimes, SEC retention, ontology/provenance standards not yet covered. Later compliance-focused pass needed before production deployment claims. | lines 527-538 | Plan follow-on compliance-focused pass covering named standards | medium |
| 2026-04-26 | docs/PRDs/20260426 - Entif and Rosetta PRD.md | Strategic confirmation (final paragraph) | `strategic`, `constitutional-kernel`, `alignment` | Repo and Drive canon now sufficiently aligned; Rosetta is a real constitutional kernel | decision | Strategic confirmation: stop treating Rosetta as purely speculative superstructure. It is now a real constitutional kernel whose next job is disciplined hardening, live-adapter replacement of fixture seams, durable cache maturation, and enforceable pack/receipt/rights discipline. | lines 540-543 | Treat this as binding strategic direction | high |

## Components And Technologies

- `rosetta-receipts` — receipt creation, signing, bundling, closure verification; needs evidence type taxonomy and policy artifact linkage
- `rosetta-guard` — parse-only rule engine to be upgraded with actor-aware/tenant-aware evaluation, temporal policy context, capability-token issuance
- `rosetta-schemas` — pack IDs, cycle detection, root-file enforcement, traceability-header enforcement
- `canonical-cache` — migrating from in-memory+JSON to Postgres JSONB with row-level rights enforcement
- `ingress-refinery` — TC-005 promotion state machinery; same contract for fixtures and live-source adapters
- `source-substrate` / `source-registry` — live-source adapter families (GitHub metadata/files, Google Drive docs)
- `projection-adapters` — summary/explain/audit views (OB1, Prism, Mission Control projections)
- `rosetta-tapestry` — ontology/concept-mixture-aware routing layer
- `rosetta-operator` — operator inspection surfaces
- Postgres JSONB — durable storage for canonical cache (per doctrine)
- Docs intelligence tooling — extraction artifacts, issue-promotion pipeline, ledger

## Conceptual Claims

- Rosetta is now a real constitutional kernel, not a speculative superstructure — confirmed by alignment of `crates/rosetta` fork and Drive canon
- Constitutional hardening must precede Text-Core completion; Text-Core must precede memory-plane expansion (phased dependency order is binding)
- Docs intelligence is an explicitly separate planning lane from Rosetta-native runtime ingestion — must not be conflated
- In-memory cache is the right bootstrap posture and the wrong long-term scale posture — migrate to Postgres JSONB
- Live-source adapters must use identical refinery contracts and receipts as bootstrap fixtures
- Six explicit acceptance criteria define the next green state for the release family
- Multi-vector scoring (not one master scalar) is architectural law: topic-local, lane-local, decision-specific vectors with different dominance rules per decision type

## Dependencies And Sequencing

- Constitutional hardening → Text-Core completion → memory-plane expansion (mandatory phased order)
- Pack conformance (ROCK-3111-C) must complete before live-source adapters replace fixture seams
- TC-001–TC-004 must land before TC-005/TC-006/TC-007 are viable
- Canonical cache must reach durable storage before broader ingest is unblocked
- `rosetta-guard` actor-aware upgrade depends on receipt semantics hardening completing first
- Temporal plane before activation plane (both after Text-Core gate)
- Route-plan/conceptual mixture integration depends on tapestry foundation

## Contradictions Or Supersession

- No direct contradictions detected in this chunk. Prior draft (Drive-only) is superseded by this code-aligned PRD which incorporates `crates/rosetta` fork reality.

## Issue Candidates

No issue-drafts produced for this chunk (per task constraints). Candidates identified for future drafting:

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| (A2-IC-001) Implement TC-005 promotion state machinery | enhancement | future draft | `text-core`, `promotion-state` | TC-001–TC-004 complete | lines 470-473 |
| (A2-IC-002) Migrate canonical-cache to Postgres JSONB | enhancement | future draft | `canonical-cache`, `postgres`, `durable-storage` | pack-conformance green | lines 474-477 |
| (A2-IC-003) Upgrade roseta-guard with actor-aware policy evaluation | enhancement | future draft | `rights`, `guard`, `actor-aware` | receipt semantics hardening | lines 464-467 |
| (A2-IC-004) Live-source adapter: GitHub family | enhancement | future draft | `live-source-adapter`, `github` | pack/schema hardening complete | lines 483-486 |
| (A2-IC-005) Live-source adapter: Google Drive family | enhancement | future draft | `live-source-adapter`, `google-drive` | pack/schema hardening complete | lines 483-486 |
| (A2-IC-006) English accompaniment: inspection surfaces | enhancement | future draft | `english-accompaniment`, `projection-adapters` | cache and receipts stable | lines 479-481 |
| (A2-IC-007) Temporal plane implementation | enhancement | future draft | `temporal-plane`, `memory` | Text-Core MVP gate complete | lines 490-492 |
| (A2-IC-008) Activation plane implementation | enhancement | future draft | `activation-plane`, `memory` | Temporal plane complete | lines 494-496 |
| (A2-IC-009) Issue-promotion pipeline productization | enhancement | future draft | `docs-intelligence`, `issue-promotion` | extraction standardization | lines 507-510 |

## Project Board Suggestions

- Area: Rosetta core hardening + Entif memory-plane
- Cycle: Next release family (post-current sprint)
- Status: Roadmap phase 1–4 identified
- Blocked by: Pack conformance (ROCK-3111-C) for live adapter work; TC-001–TC-004 for TC-005; durable cache migration for broader ingest
- Parallelization notes: Constitutional hardening slices (pack, receipt, rights) can proceed in parallel once started; Text-Core slices (TC-005, durable cache, English accompaniment, live adapters) are sequential within phase; memory-plane phases are sequential after Text-Core

## Open Questions

- Was the full file-by-file audit of every package implementation performed, or only targeted fetches of key packages? (Answer: targeted — README, handoff, bootstrap track, repo shape constraints, intake policy, package READMEs, RRP pack manifest, receipt schema. NOT exhaustive implementation audit.)
- What broader privacy regimes, SEC retention specifics, or ontology/provenance standards should be covered in the follow-on compliance-focused pass? (HHS HIPAA/HITECH + OpenAI prompt caching are current anchors only.)
- Are TC-006 and TC-007 fully scoped anywhere, or only named as "open implementation candidates"?
