# Docs Intelligence Extraction

## Source
- Path: `docs/governance/ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md`
- Title: Rosetta Pasigraphy Protocol — Provenance, Receipts, TruthLint
- Date evidence: 2026-02-23 through 2026-02-24 (timestamps in document export header)
- Authority tier: Governed extension pack spec; references Rosetta v3.0.0 Core Spine as normative dependency
- Freshness: 2026-02-24; predates current TC-005/TC-006 critical path but directly informs provenance-layer requirements
- Word count: ~1907 lines (estimated 18,000+ words)
- Extractor: subagent/doc-intake-cycle
- Extraction date: 2026-05-26

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

ROCK-31XX is a GPT-assisted design dialogue that produced three deliverables: (1) a product thesis for "TruthLint + Proof Bundles" — an epistemic spellcheck that converts any drafted statement into typed claims, surfaced assumptions, and an auditable provenance bundle; (2) a full product PRD for that social-provenance concept; and (3) a formal **Rosetta Receipt Refinement Pack (RRP) v0.1** specification that refines how Rosetta's existing `rosetta.receipt` tile type must be structured for zero-trust, audit-closure-friendly interop. The spec assigns DocIDs ROCK-3111 (RRP spec), ROCK-3111-A (SHACL profiles), and ROCK-3111-B (test vectors), and defines a tapestry profile `rrp:tapestry.profile.receipt_bundle` for packaging receipt verification bundles. Critically, the RRP effort is explicitly a *refinement* of Rosetta v3.0.0 core — it standardizes schemas without introducing new tile kinds, consistent with the pack system's "extend, don't redefine core" rule.

---

## Goals And Intent

- Produce a verifiable, auditable凭证 layer for post/composition outputs ( TruthLint MVP as wedge)
- Resolve the "cryptographic receipts for cognition" problem for regulated industries (legal, accounting, financial auditing)
- Define formal RRP v0.1 spec standards and DocIDs for cross-implementation receipt interop
- Anchor provenance chain design to Rosetta v3.0.0 core spine (run/action/toolcall/observation/evaluation)
- Avoid duplicating core tile kinds; all new semantics go into VocabPacks + SHACL shapes
- Enable multi-party quorum receipts for incident envelopes per Rosetta's governed evolution posture

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| All claims in a receipt bundle must be grounded in evidence tiles (observation CIDs or equivalent) | ROCK-31XX lines 1300-1400; "bundle closure requirement" section | RRP / provenance layer | high | Receipts can't assert unsupported claims without evidence links |
| rosetta.receipt tiles must include: kind, timestamp, nonce, sig, auth, run, derived_from | ROCK-3111 §3.1 normative list | RRP / tile schema | high | nonce prevents accidental duplicate collisions |
| Signature (`sig`) must NOT be included in CID computation; signs the CID itself | ROCK-31XX lines 1318-1326 | RRP / tile schema | high | Rosetta v3.0.0 core signature rule |
| Receipt content must include: receipt_type, subjects array, claims array, digests array, optionally policy_refs | ROCK-3111 §4.1 minimal required fields | RRP / tile schema | high | |
| Claim objects must include: claim_type, statement, evidence array, verdict, optionally confidence | ROCK-3111 §4.2 minimal field set | RRP / tile schema | high | |
| Digest objects must include: alg, digest, of, cid_ref | ROCK-3111 §4.3 minimal field set | RRP / tile schema | high | |
| Verdict values must be one of: pass, fail, partial, unknown (controlled vocab) | ROCK-3111-A rrp:VerdictValueShape | RRP / vocab | high | SKOS-compatible vocab hierarchy |
| Receipt bundles must use tapestry profile `rrp:tapestry.profile.receipt_bundle` | ROCK-3111 §6 | RRP / tapestry | high | No new tile kind required |
| Bundle closure: subject tiles + receipt tiles + evidence tiles + policy tiles + derived_from chains to raw observations | ROCK-3111 §6.1 | RRP / tapestry | high | Must satisfy "why did it do X?" query |
| SHACL shapes must be applied via deterministic Tile→RDF projection | ROCK-3111-A §A1 | RRP / validation | medium | JSON TileEnvelope → RDF graph projection defined |
| RRP-Light, RRP-Full, RRP-Auditor, RRP-Forge conformance tiers must be defined | ROCK-3111 §9.1 | RRP / conformance | medium | Progression from minimal to auditor-grade |
| Zero-trust verification algorithm: CID integrity → signature validation → spine anchoring → digest validation → policy validation | ROCK-3111 §7 | RRP / verification | medium | Deterministic 6-step verifier |
| TruthLint MVP1: claim extraction + rewrite suggestions + proof bundle generation + public viewer | ROCK-31XX lines 624-682 | TruthLint product | medium | Web composer first (no sources yet) |
| Proof Bundle schema: bundle_id, created_at, author_identity, text_hash, claims[], sources[], assertions[], policy_profile, signatures[] | ROCK-31XX lines 624-682 | TruthLint product | medium | Portable JSON object |
| Claim types taxonomy: FACT / OPINION / PREDICTION / INTERPRETATION / SATIRE / QUESTION | ROCK-31XX lines 624-682 | TruthLint / claim typing | medium | Enforced in composer UX |
| Source typing: primary / secondary / commentary / social / official / dataset with weight scoring | ROCK-31XX lines 624-682 | TruthLint / scoring | low | Prevents citation laundering |
| Claim budget mechanism: Gish gallop resistance — unsupported claim count displayed prominently | ROCK-31XX lines 624-682 | TruthLint / abuse resistance | low | |
| Policy profiles must be forkable and versioned; old receipts keep pointing to old policy | ROCK-31XX lines 1318-1326 | RRP / governance | medium | Prevents retroactive policy warp |
| TruthLint non-goal: being the social network — provenance layer only | ROCK-31XX lines 624-682 | TruthLint product | low | Platform-layer not platform |
| TruthLint non-goal: omniscient truth adjudication | ROCK-31XX lines 624-682 | TruthLint product | low | Typed claims + provenance + transparent confidence |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-02-23 | ROCK-31XX lines 9-37 | Prompt: Twitter/BBS/Usenet critique + provenance platform thesis | social-media, provenance, trust-layer, gish-gallop | Twitter, Bluesky, Mastodon, Ground News | decision | BlueSky/Mastodon survived by changing fundamental axis (decentralization/portability), not by surface-level feature differences | "Mastodon was 'Twitter, and decentralized _because_...' every other clone was just 'Twitter, BUT...'" | Design for network-effect resistance from day one — find the axis that makes your platform structurally non-interchangeable | high |
| 2026-02-23 | ROCK-31XX lines 9-37 | Prompt: "provenance Twitter" wedge | provenance, trust-layer, emergency-comms | emergency alerts, institutional broadcasts | requirement | Verified Broadcast Rail (cryptographically signed institutional alerts) is the wedge use case: trust is operational not philosophical for police/FAA/emergency-response channels | "That's where truth is not a philosophical preference. It's operational necessity." | Lead with institutional broadcast product, not social feed | high |
| 2026-02-23 | ROCK-31XX lines 9-37 | Prompt: epistemic cost visible as autocorrect | product-philosophy, epistemic-hygiene | end users | technology | System must make epistemology feel like spellcheck — if it feels like homework, it fails | "If your system feels like homework, it dies. If it feels like a seatbelt that clicks itself, it spreads." | Invest in UX friction reduction as a core requirement, not a polish item | high |
| 2026-02-23 | ROCK-31XX lines 38-187 | Response: TruthLint + Proof Bundles PRD | product, claim-extraction, proof-bundle, composer | TruthLint composer | decision | TruthLint MVP is the pre-post inspection tool: extracts claims from draft text, surfaces assumptions and unknown unknowns, generates portable proof bundle | "A cross-platform 'epistemic spellcheck' that converts a draft post into a set of typed claims, surfaced assumptions, and an auditable provenance bundle" | Ship as thin vertical slices: composer→extraction→bundle→viewer | high |
| 2026-02-24 | ROCK-31XX lines 190-279 | Prompt: sub-strategy for social posting → applies to everything | substrate, enterprise, cognitive-provenance | PwC, legal, accounting, tax auditing | decision | Provenance pathing solution is substrate, not feature — applies to entire Entif stack and any regulated knowledge work industry | "If this provenance pathing solution works reliably enough to be reasonable trustworthy... the exposed surface gets smaller." | Plan RRP as the default provenance primitive for all Entif-agent operations | high |
| 2026-02-24 | ROCK-31XX lines 282-624 | Response: Cryptographic Receipts (Cognitive Provenance) | receipt-protocol, cognitive-provenance, immutable-tile | RRP, rosetta.receipt | decision | 6-class taxonomy: immutable cognitive tile (content-addressed blob+envelope), receipt (signed attestation), policy profile (forkable/versioned), transparency log (append-only Merkle tree), pre/post-flight receipts, runtime gate | "Receipt = 'I transformed inputs into outputs under policy P, using method M, at time T.'" | Build toward the runtime gate = receipt-aware policy engine model | high |
| 2026-02-24 | ROCK-31XX lines 282-624 | Response: Compositional versioning (PwC template nightmare solution) | versioning, workflow-tiles, composable-patches | PwC | decision | Templates composed into workflows composed into projects = new patch tiles, not edits; each composition is a composition receipt; environment differences materialized as deployment receipts | "No one 'edits the workflow.' They publish a new patch tile and issue a new composition receipt." | Design any template/workflow system in Rosetta as immutable tiles + version receipts | high |
| 2026-02-24 | ROCK-31XX lines 282-624 | Response: Pre-flight/post-flight receipt model | agent-safety, pre-flight, post-flight | runtime gate, agent permissions | requirement | Before tool call: declare intent + prove authorization (pre-flight receipt); after execution: record tool call + params + outputs + hashes (post-flight receipt); tool access gated by valid pre-flight receipt under allowed policy | "An agent can't 'just do things.' It must continuously produce verifiable paperwork, automatically, as a condition of motion." | Route all tool/agent calls through pre-flight/post-flight receipt gates | high |
| 2026-02-24 | ROCK-31XX lines 282-624 | Response: WORM storage + selective disclosure | storage, compliance, redaction | legal, health, finance | requirement | For regulated industries: object lock/retention controls + integrity hashes allow selective disclosure (redact content, preserve integrity via commitments) | "Integrity without oversharing is the killer feature in legal/health/finance." | Storage layer must support WORM and content commitment/redaction separately | high |
| 2026-02-24 | ROCK-31XX lines 682-944 | Prompt: Refine, don't redefine; consistent with Rosetta v3.0.0 | roseta-v3-core, extension-posture, pack-system | Rosetta v3.0.0 core | decision | RRP is a refinement pack, not a new system — uses existing `rosetta.receipt` tile type with standardized schemas; packs attach but core does not expand; packs MUST NOT redefine core semantics | "What you're asking for is not 'a new provenance system.' It's a **refinement pack**." | All RRP work must stay within rosetta.receipt tile type and pack extension posture | high |
| 2026-02-24 | ROCK-31XX lines 967-1311 | Response: RRP v0.1 Specification (ROCK-3111) | RRP, receipt-schema, DocID, ROCK-3111 | rosetta.receipt, tapestry, policy | decision | Assigned DocID ROCK-3111 for main spec, ROCK-3111-A for SHACL profile set, ROCK-3111-B for test vectors; structural refinement only (no new core tile kinds) | "Assigned DocID: ROCK-3111 (RRP Spec), ROCK-3111-A (SHACL), ROCK-3111-B (Test Vectors)" | Register these DocIDs in the spec index immediately | high |
| 2026-02-24 ROCK-3111 §4 | ROCK-31XX lines 1314-1400 | RRP §4: Receipt Content Schema | receipt-schema, required-fields, claim-object | rosetta.receipt content | requirement | Minimal receipt content: receipt_type (XID), subjects (cid+role array), claims (claim_type+statement+evidence+verdict+confidence), digests (alg+digest+of+cid_ref), optional policy_refs; confidence as rosetta.matrix reference or [0,1] scalar with rationale | "A rosetta.receipt content object MUST include: receipt_type, subjects, claims, digests" | Implement RRP receipt content schema as the canonical receipt authoring format | high |
| 2026-02-24 ROCK-3111 §5 | ROCK-31XX lines 1401-1500 | RRP §5: VocabPack — required receipt type taxonomy | vocab-pack, receipt-type-taxonomy | receipt type vocab | requirement | Required vocab families: rrp:toolcall.execution, rrp:policy.authorization, rrp:policy.compliance_check, rrp:evaluation.score_attestation, rrp:bundle.closure_attestation, rrp:incident.quorum_attestation; new types via VocabPack versioning | "New receipt types MUST be introduced by adding a new VocabPack version" | Build VocabPack v0.1 as part of RRP package | high |
| 2026-02-24 ROCK-3111 §6 | ROCK-31XX lines 1501-1600 | RRP §6: Receipt Bundle via Tapestry Profile | tapestry-profile, receipt-bundle, bundle-closure | rosetta.tapestry | requirement | Profile ID: rrp:tapestry.profile.receipt_bundle; bundle closure requires: subject tiles + receipt tiles + evidence tiles + referenced policy tiles + derived_from chains to raw observations | "If a system presents a user with a claim labeled as 'verified,' it MUST also present a Receipt Bundle tapestry..." | Implement bundle TAPESTRY_PROFILE field and closure validation | high |
| 2026-02-24 ROCK-3111 §7 | ROCK-31XX lines 1601-1650 | RRP §7: Verification Algorithm | verification-algorithm, zero-trust, CID-check | verifier | requirement | 6-step deterministic verifier: (1) CID integrity recompute, (2) signature vs auth key, (3) spine anchoring+derived_from chain resolvability, (4) digest recompute vs receipt digests, (5) policy tile signature+trust roots, (6) optional PROV-O projection | §7 — zero-trust verification | Implement formal verifier as a library function, not an implicit heuristic | medium |
| 2026-02-24 ROCK-3111 §9 | ROCK-31XX lines 1651-1700 | RRP §9: Conformance Tiers | conformance-tiers, RRP-Light, RRP-Full, RRP-Auditor | RRP conformance | requirement | 4-tier model: RRP-Light (emit basic receipt), RRP-Full (policy refs+bundle for verified labels), RRP-Auditor (retain traces to answer "why did it do X"), RRP-Forge (multi-party/quorum workflows later) | "RRP-Light: emits rosetta.receipt with minimal schema..." | Define conformance tier migration path for the team | medium |
| 2026-02-24 | ROCK-31XX lines 624-682 | Proof Bundle: schema vs interop | bundle-vs-tile, proof-bundle, schema-clarity | TruthLint proof bundle vs RRP receipts | contradiction | TruthLint MVP proof bundle (plain JSON, portable) and RRP receipt tile (Rosetta-native, CID-addressed) are conceptually overlapping but not formally unified. The doc does not clarify whether a TruthLint bundle IS a rosetta.tapestry or a separate artifact. | "Proof Bundle = portable JSON object" vs rosetta.tapestry profile for receipt bundle | Explicitly resolve: is a TruthLint proof bundle a rosetta.tapestry under the rrp:profile, or a distinct format? | high |
| 2026-02-24 | ROCK-31XX lines 1314-1400 | Non-goal contradiction: "no truth engine" vs TruthLint scoring | truth-adjudication, scoring, confidence | TruthLint vs RRP | contradiction | RRP §3 non-goals: "no 'truth engine': receipts attest to events/conditions, not objective truth." But TruthLint MVP includes claim scoring (confidence values, source diversity, staleness index) and "unsupported claim count" prominently displayed — this IS a form of truth adjudication | "We provide typed claims + provenance + transparent confidence, not omniscience." but also "unsupported claim count indicator prominently displayed" | Clarify whether TruthLint scoring is advisory (confidence signal) or evaluative (pass/fail gate). Distinguish from RRP's explicit non-truth-engine posture | medium |
| 2026-02-24 | ROCK-31XX lines 1314-1400 | RRP Light: nonce not enforced in example schemas | nonce-field, schema-inconsistency | rosetta.receipt receipt | issue-candidate | Example receipt does NOT include `nonce` field yet §3.1 lists it as required/recommended for receipts specifically | "nonce (recommended by core especially for receipts to avoid accidental duplication collisions)" | Add `nonce` to all RRP receipt examples; enforce in SHACL via sh:maxCount 1 (minCount 0 allowed) | medium |
| 2026-02-24 | ROCK-31XX lines 624-682 | Threat model: prompt injection via sources not fully resolved | security, prompt-injection, source-sandboxing | TruthLint source ingestion | risk | Mitigation stated ("treat sources as untrusted data; strip scripts; sandbox parsing") but no concrete implementation specified | "Do not let source text steer system prompts." | Requires explicit design spec for source ingestion sandboxing before TruthLint ships | medium |
| 2026-02-24 | ROCK-31XX lines 1314-1400 | SHACL validation requires Tile→RDF projection (not specified comprehensively) | SHACL, RDF-projection, validation | Tile→RDF projection | open-question | ROCK-3111-A §A1 defines 4 projection rules but acknowledges implementations may extend it; implementations using non-RDF stores need a projection adapter; conformance testing requires stable projection algorithm | "RRP assumes the following minimal projection (implementations MAY extend it, but MUST preserve these invariants)" | Define full Tile→RDF canonical projection as a separate normative section or reference document | medium |
| 2026-02-24 | ROCK-31XX lines 1314-1400 | TAPESTRY_ENGINE integration not defined | tapestry-engine, proof-bundle-wallet | rosetta.tapestry engine | open-question | RRP v0.1 specifies the bundle profile but does not specify how the tapestry engine would generate, present, or verify these bundles — implementation is left open | Bundle closure requirement is defined but execution path is not | Requires TAPESTRY_ENGINE integration spec before RRP-Auditor tier can be claimed | medium |
| 2026-02-24 | ROCK-31XX lines 1314-1400 | DocIDs exist as inline text assignments within conversation; not formally registered | DocID-registration, spec-index | DocID registry | issue-candidate | ROCK-3111, ROCK-3111-A, ROCK-3111-B DocIDs were assigned within a chat session and never formally added to any Rosetta spec index or DocID registry table | "Assigned DocID: ROCK-3111..." | Create formal spec index entry for ROCK-3111/3111-A/3111-B | low |
| 2026-02-24 | ROCK-31XX lines 9-37 | Social feed timing trade-off: user adoption before network effect | network-effect, adoption-strategy | Bluesky | technology | Lessons from Bluesky: algorithm/moderation choice built in from start; portability is the antidote to billionaire capture | Bluesky AT Protocol | Don't design for network effects too early; focus on institutional broadcast wedge first | low |

---

## Components And Technologies

- **TruthLint Composer**: web app + browser extension (thin shell) — MVP slice 1
- **Claim Extraction Service**: tokenize → segment → normalize → deduplicate → Claim objects with entity extraction
- **Assumption Generator (RPP-lite)**: produces assumptions + ambiguity flags + rewrite suggestions per claim
- **Source Attachment + Parser**: server-side URL fetcher, PDF/text extractor, quote anchoring (excerpt + hash)
- **Bundle Builder**: builds JSON bundle, hashes bundle, optional author signature
- **Public Viewer**: renders bundle, explains scoring per-claim, shows provenance edges
- **rosetta.receipt tile type**: existing core tile type (not extended), used as-is for receipts
- **rosetta.tapestry tile type**: used as-is for Receipt Bundle profile (rrp:tapestry.profile.receipt_bundle)
- **SHACL shapes (Turtle)**: rrp:ReceiptTileShape, rrp:ReceiptContentShape, rrp:ClaimShape, rrp:DigestShape, rrp:ReceiptBundleTapestryShape
- **Tile→RDF projection**: JSON envelope fields → rosetta: namespace; content fields → rrp: namespace; CID values → cid: IRI scheme
- **W3C Verifiable Credentials**: referenced for attestation/signature standards alignment
- **W3C DID (Decentralized Identifiers)**: referenced for composable identity layer optional-strong for institutions
- **C2PA (Content Credentials)**: referenced for media provenance schema alignment
- **Merkle-tree transparency log**: Certificate Transparency pattern for append-only log inclusion proofs (future layer)
- **RFC 6962 (Certificate Transparency)**: Merkle tree consistency/inclusion proof standard referenced as architecture model
- **ActivityPub / AT Protocol**: referenced for interoperability bridge pattern for Bluesky/Mastodon

---

## Conceptual Claims

1. Cryptographic receipts for cognition are a substrate not a feature — applicable to all regulated knowledge work, not just social posting
2. Epoché (suspension of judgment) as design principle: a tool that forces author confrontation with implied worldview before shipping is the product differentiation
3. "Provenance Twitter" succeeds not by fighting network effects but by being useful before being popular (institutional broadcast first, social feed later)
4. RRP is a refinement pack, not a new provenance system — it standardizes schemas for rosetta.receipt without redefining core
5. Receipt bundles satisfy the interpretability requirement: higher-level constructs must be grounded in traceable evidence tiles
6. Conformance tiers (Light/Full/Auditor/Forge) provide a natural migration path from minimal viable receipt to full audited cognition
7. Policy profiles as immutable referenced tiles prevent retroactive policy warp in audit trails
8. Pre-flight/post-flight receipt model shrinks agent exploit surface by making tool access conditional on verifiable paperwork
9. Compositional versioning (patch tiles + composition receipts) solves the template-nested-workflow inheritance problem
10. WORM + selective disclosure together satisfy regulated-industry storage requirements while preserving audit integrity

---

## Dependencies And Sequencing

- **Depends on**: Rosetta v3.0.0 Core Spine (ROCK-3001) — core primitives (TileEnvelope, rosetta.receipt, rosetta.tapestry, run/action/toolcall/observation/evaluation spine)
- **Depends on**: Pack System Architecture + "No Redefinition" rule — extension posture guard
- **Depends on**: TileEnvelope canonicalization + signature rules — from Rosetta v3.0.0 core
- **Blocked by**: DocID registry update — ROCK-3111/3111-A/3111-B must be formally registered before work advances
- **Blocked by**: TAPESTRY_ENGINE integration spec — required for RRP-Auditor tier
- **TruthLint MVP1 depends on**: Claim extraction service (LLM-assisted per the design)
- **TruthLint MVP1 depends on**: Claim budget / scoring UI — Gish gallop resistance
- **All RRP tiers depend on**: stable canonicalization algorithm for deterministic CID computation
- **RRP-Auditor depends on**: SHACL validator implementation with Tile→RDF projection
- **RRP v0.1 completion depends on**: ROCK-3111-A SHACL shapes (already drafted inline) need formal extraction
- **RRP v0.1 completion depends on**: ROCK-3111-B test vectors (flagged as next increment, not yet produced in this document)

---

## Contradictions Or Supersession

1. **TruthLint scoring vs RRP non-truth-engine posture**: TruthLint MVP includes claim-quality scoring ("unsupported claim count prominently displayed") which is a form of truth adjudication — conflicts with RRP's stated non-goal of "no truth engine: receipts attest to events/conditions, not objective truth." **Resolution needed**: clarify advisory (confidence signal) vs evaluative (pass/fail gate) distinction; RRP receipts themselves should remain descriptive, while TruthLint scoring overlay can be advisory.

2. **Proof bundle schema vs roseta.tapestry profile**: TruthLint MVP defines a portable JSON Proof Bundle schema without referencing rosetta.tapestry; RRP later says "natural primitive for compiled working set is rosetta.tapestry" and defines a tapestry profile for Receipt Bundles. The two are not formally unified. **Resolution needed**: declare TruthLint Proof Bundle as an RRP-compliant rosetta.tapestry under `rrp:tapestry.profile.receipt_bundle`, or formally separate the two artifact types.

3. **Nonce in examples vs §3.1 required**: Receipt examples in body text do not include `nonce` field; §3.1 lists nonce as recommended for receipts. **Resolution**: nonce is optional at emit time but SHACL should require it for RRP-Auditor conformance.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| RRP-001: Register DocIDs ROCK-3111, ROCK-3111-A, ROCK-3111-B in Rosetta spec index | docs/spec-gap | `docs/intake/issue-drafts/rrp-001-roc-docid-registration.md` | spec, DocID, ROCK-3111 | — | DocIDs assigned inline in chat but never formally registered in spec index |
| RRP-002: Resolve TruthLint proof-bundle vs rosetta.tapestry profile relationship | architecture/spec-gap | `docs/intake/issue-drafts/rrp-002-truthlint-bundle-tapestry-unification.md` | architecture, tapestry, proof-bundle, RRP | RRP-001 | Portable JSON bundle vs RRP tapestry profile not formally unified in doc |
| RRP-003: Clarify TruthLint scoring vs RRP non-truth-engine posture | spec-gap | `docs/intake/issue-drafts/rrp-003-truthlint-scoring-vs-rrp-non-truth-engine.md` | spec-gap, scoring, RRP, TruthLint | RRP-002 | TruthLint scoring conflicts with RRP's stated non-goal of truth adjudication |
| RRP-004: Define formal Tile→RDF canonical projection for SHACL conformance | validation/shacl | `docs/intake/issue-drafts/rrp-004-tile-rdf-canonical-projection.md` | SHACL, RDF, validation, conformance | RRP-001 | §A1 defines partial projection; full deterministic algorithm needed for conformance testing |
| RRP-005: Specify TAPESTRY_ENGINE integration for RRP-Auditor bundle verification | architecture | `docs/intake/issue-drafts/rrp-005-tapestry-engine-rrp-auditor-integration.md` | tapestry-engine, auditor, bundle-verification | RRP-001, RRP-004 | RRP v0.1 specifies bundle profile but not engine integration; Auditor tier blocked |
| RRP-006: Design source ingestion sandboxing for TruthLint before shipping | security | `docs/intake/issue-drafts/rrp-006-truthlint-source-sandboxing.md` | security, prompt-injection, source-ingestion | — | Threat model identifies prompt injection via sources; mitigation not concretely specified |
| RRP-007: Extract SHACL shapes from ROCK-3111-A inline draft into formal normative section or file | docs | `docs/intake/issue-drafts/rrp-007-shacl-shapes-extraction.md` | SHACL, docs, RRP | RRP-001 | ROCK-3111-A SHACL shapes are embedded in chat transcript; need formal normative extraction |
| RRP-008: Add nonce to all RRP receipt examples; enforce in SHACL via optional-required (maxCount 1) | docs/shacl | `docs/intake/issue-drafts/rrp-008-nonce-field-examples-shacl.md` | docs, SHACL, nonce, receipts | RRP-001 | Nonce listed in §3.1 but absent from body examples; SHACL should constrain it |

---

## Project Board Suggestions

- **Area**: Provenance layer (RRP) + TruthLint product
- **Cycle**: RRP v0.1 completion → TruthLint MVP1
- **Status**: Requirements gathered; spec needs formal DocID registry + SHACL extraction
- **Blocked by**: RRP-001 (DocID registration), RRP-005 (TAPESTRY_ENGINE integration), RRP-006 (source sandboxing design)
- **Parallelization notes**: SHACL extraction (RRP-007) can proceed independently; TruthLint scoring design (RRP-003) is a product decision that gates TruthLint MVP1
- **First ship**: `docs/governance/ROCK-3111-rrp-v0.1.md` — formal spec extracted from ROCK-31XX, with DocIDs registered and contradictions resolved
