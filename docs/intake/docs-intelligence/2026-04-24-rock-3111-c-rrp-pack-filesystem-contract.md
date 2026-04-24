<!-- DOCUMENT: docs-intelligence/2026-04-24-rock-3111-c-rrp-pack-filesystem-contract.md -->
<!-- PROCESSED: 2026-04-24T22:50:00Z -->
<!-- EXTRACTOR: sub-agent docs-intelligence cycle -->

# Docs Intelligence Extraction

## Source

- Path: docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md
- Title: RRP Pack Filesystem Contract v0.2.0
- Date evidence: v0.2.0, Draft status; file header
- Authority tier: RFC / Contract / Normative spec
- Freshness: Draft; part of ROCK-3111 series
- Word count: ~2,500
- Extractor: sub-agent docs-intelligence cycle
- Extraction date: 2026-04-24T22:50:00Z

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

## Summary

This RFC defines the complete filesystem contract for Rosetta packs: mandatory directory structure, required and optional subtrees, the `pack.json` manifest schema, file-level traceability headers, conformance profiles, release and migration rules, CI/acceptance gates, and an RRP-specific (Receipt Refinement Pack) concrete instantiation. It is simultaneously a generic pack law and the specific RRP instantiation. The core design principle is **refinement-first**: packs extend core semantics without mutating Rosetta's constitutional center.

## Goals And Intent

- Define a machine-checkable, CI-friendly pack existence contract.
- Stabilize Rosetta's constitutional core by forcing new semantics into packs rather than casual core mutation.
- Provide a concrete RRP specialization that serves as a template for future pack families.
- Establish acceptance gates and release criteria that all packs must satisfy.
- Define normative conformance profiles (light, full, auditor, forge) with explicit inclusion/exclusion lists.

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Every pack MUST declare exactly one primary category | Section 1.1: categories list | packs/rrp/pack.json | critical | Seven categories defined; cross-category exports allowed but primary must be named |
| Pack root MUST be under `packs/<pack-name>/` | Section 2: required generic pack root | packs/* | critical | Canonical location enforced |
| Minimum required files: pack.json, README.md, CHANGELOG.md, acceptance.md, metadata.json, examples/, tests/ | Section 2: minimum required files | packs/* | critical | Absence of any required file blocks merge |
| Pack.json MUST include 13 required fields: pack_id, name, doc_id, category, namespace, version, status, compatible_core, depends_on, owners, exports, entrypoints, profiles | Section 4.1-4.2 | packs/*/pack.json | critical | Missing any required field blocks merge |
| Exports array MUST enumerate machine-consumable assets | Section 4.2: exports field | packs/*/pack.json | high | Required when pack has exportable assets |
| File-level traceability headers REQUIRED for: normative schemas, SHACL files, policy bundles, translator specs, canonical conformance fixtures | Section 5: headers required list | packs/rrp/schema/, shacl/, policy/, translators/ | high | Header format: DocID, Artifact, Version, Status, Depends-On, Source-Of-Truth |
| Conformance profiles MUST specify: included exports, excluded exports, mandatory tests, optional tests, known non-goals, compatibility guarantees | Section 6: profile requirements | packs/*/profiles/ | high | Four standard names: light, full, auditor, forge |
| Semver: major bump for breaking schema/meaning changes; minor for additive fields/vocab/examples; patch for typo/docs-only | Section 7.1 | packs/*/CHANGELOG.md | medium | Changelog must reflect version bumps |
| Breaking or translator-relevant updates MUST include at least one of: translator spec, migration notes, before/after fixtures, updated test vectors, migration receipts | Section 7.2 | packs/*/migrations/ or translators/ | high | Enforcement: no migration note = merge blocked |
| Packs MUST refuse merge if: pack.json missing required fields, required files absent, declared exports missing, examples fail validation, required vectors fail, release version changed without changelog, major change has no migration/translator strategy | Section 8: must refuse merge list | CI gates | critical | Seven hard merge blockers |
| RRP pack MUST have exact tree: pack.json, README.md, CHANGELOG.md, acceptance.md, metadata.json, schema/, shacl/, vocab/, profiles/, test-vectors/, examples/, receipts-fixtures/, migrations/, translators/ | Section 9 | packs/rrp/ | critical | 10-item acceptance checklist |
| PersonaPack requires elevated governance (outside normal pack contract) | Section 1.1: PersonaPack | packs/persona/* | high | Elevated governance applies; not a normal pack |
| Doctrine v0.2 as source of truth; traceability required | Section 4.1: source_of_truth | packs/rrp/pack.json | medium | source_of_truth.doctrine and traceability_required both required |
| Test vector naming: `<vector-id>.[hash-input|expected|tampered|invalid].json` + optional `.notes.md` | Section 11 | packs/*/test-vectors/ | medium | Stable, human-legible vector IDs required |
| RRP: receipt example MUST include required `subjects`; bundle example MUST reference existing subjects/evidence tiles; signature/digest mismatch MUST NOT pass accidentally | Section 12: must-fail conditions | packs/rrp/test-vectors/, examples/ | critical | Tamper-negative vectors must fail verification |
| Pack tagged for release only if: pack validation green, vectors green, acceptance gates green, migration notes included, docs updated, no unresolved known-red-tests | Section 13 | CI/CD | high | Six criteria before release tagging |
| Nine immediate next implementation actions listed | Section 14 | packs/rrp/ | medium | Scaffold, validate, move assets, write CI target, generate vectors, add contract checker |

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 1.1 | packs,pack-categories | pack-model | requirement | Seven pack categories defined (StdPack, VocabPack, SchemaPack, GovernancePack, RecipePack, SkillPack, PersonaPack); each pack MUST declare exactly one primary category; cross-category exports allowed but primary must be named; PersonaPack noted as requiring elevated governance | "A pack MUST declare exactly one primary category" | Ensure pack authors understand the category declaration requirement; consider CI validation for category uniqueness | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 1.2 | packs,identity | pack-model | requirement | Pack identity requires: stable pack_id, human-readable name, namespace, semver version, doc_id where applicable, core compatibility range, content-addressed export metadata or file hashes | "Each pack MUST expose: stable pack_id..." | pack_id SHOULD be content-addressed when frozen (currently placeholder in RRP example) | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 1.3 | packs,refinement-first | core-stability | requirement | Refinement-first rule: packs MUST extend core semantics without redefining or silently mutating Rosetta core meanings; core semantic mutation requires out-of-band escalation | "Packs MUST extend core semantics without redefining or silently mutating Rosetta core meanings" | No automated enforcement mechanism described; needs manual review or tooling to detect core mutation attempts | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 2 | packs,filesystem,required-files | filesystem-contract | requirement | Every pack root MUST exist under `packs/<pack-name>/` with minimum required files: pack.json, README.md, CHANGELOG.md, acceptance.md, metadata.json, examples/, tests/ | "Every pack root MUST exist under: packs/<pack-name>/" | Consider pre-commit hook to enforce required file presence | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 3 | packs,optional-subtrees | filesystem-contract | decision | Nine optional-but-standard subtrees defined: schema/, shacl/, vocab/, profiles/, test-vectors/, receipts-fixtures/, policy/, migrations/, translators/ | "These are optional generically, but standard if applicable" | Encourage consistent use across pack families | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 4.1 | packs,pack-json,manifest | manifest-contract | requirement | pack.json requires 13 fields: pack_id, name, doc_id, category, namespace, version, status, compatible_core, depends_on, owners, exports, entrypoints, profiles, source_of_truth | Section 4.1 JSON example | Validate with JSON Schema at pre-commit/CI | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 4.2 | packs,exports,compatibility | manifest-contract | requirement | exports MUST enumerate machine-consumable assets with kind/id/path/version/hash/profile; compatible_core MUST define Rosetta core compatibility window; depends_on MUST include required dependencies | "exports: MUST enumerate machine-consumable assets if present" | CI should validate export paths exist | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 4.3 | packs,exports-format | manifest-contract | decision | Export entry format: kind, id, path, version, hash, profile; hash SHOULD be sha256 or equivalent | "kind, id, path, version, hash, profile" | Standardize hash algorithm across packs | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 5 | packs,traceability,headers | traceability | requirement | File-level traceability headers REQUIRED for: normative schemas, SHACL files, policy bundles, translator specs, canonical conformance fixtures; recommended minimum: DocID, Artifact, Version, Status, Depends-On, Source-Of-Truth | "Headers are REQUIRED for: normative schemas, SHACL files..." | Add header validation to CI contract checker | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 6 | packs,conformance-profiles | conformance | requirement | Four standard profile names: light, full, auditor, forge; each profile MUST specify: included exports, excluded exports, mandatory tests, optional tests, known non-goals, compatibility guarantees | "Recommended standard profile names: light, full, auditor, forge" | Consider profile inheritance or composition mechanism for future | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 7.1 | packs,semver | versioning | requirement | Semver rules: major bump for breaking schema/meaning changes; minor for additive fields/vocab/examples; patch for typo/docs/example-only | "breaking schema or meaning changes require a major bump" | CHANGELOG must reflect correct semver bump | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 7.2 | packs,migrations,translators | migration | requirement | Breaking/translator-relevant updates MUST include: translator spec, OR migration notes, OR before/after fixtures, OR updated test vectors, OR migration receipts | "Any breaking or translator-relevant pack update MUST include at least one of..." | No migration note = merge blocked | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 7.3 | packs,backwards-compatibility | compatibility | decision | Packs SHOULD prefer additive evolution and translator-based compatibility rather than deletion or redefinition | "Packs SHOULD prefer additive evolution" | Additive-first policy; deletion requires major bump + migration | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 8 | packs,ci-gates,merge-blockers | ci,acceptance | requirement | Seven hard merge blockers: missing required pack.json fields, absent required files, missing declared exports, examples fail validation, required vectors fail, version changed without changelog, major change without migration/translator | "A pack MUST refuse merge if: [7 conditions]" | Implement all 7 as CI checks | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 9 | packs,rrp,specialization | rrp,filesystem-contract | decision | RRP (Receipt Refinement Pack) is the concrete instantiation: SchemaPack category, namespace "rrp", version 0.2.0, 4 schema files, 4 SHACL files, 5 vocab files, 3 profiles, 5 test vectors, 4 example files, 4 receipts-fixtures, 1 migration doc, 1 translator | Section 9: RRP required tree + example pack.json | Serves as template for all future pack families | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 9 | packs,rrp,pack-id | rrp,identity | issue-candidate | RRP pack.json example uses `pack_id: "cid:rrp-pack-placeholder"` — content-addressed ID is a placeholder, not actual CID | "pack_id": "cid:rrp-pack-placeholder" | Replace with real content-addressed ID when pack is frozen for release | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 10 | packs,recipes,skills,subtrees | filesystem-contract | decision | Recommended contribution subtree rules for recipes/ and skills/ follow same manifest discipline (README.md, metadata.json, acceptance.md, examples/, tests/) but are not RRP pack roots | "These are not RRP pack roots, but they should follow the same manifest discipline" | recipes/ and skills/ need CI enforcement to match pack discipline | low |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 11 | packs,test-vectors,naming | testing | decision | Test vector naming: `<vector-id>.[hash-input|expected|tampered|invalid].json` + optional `.notes.md`; vector IDs should be stable and human-legible | "Vector IDs SHOULD be stable and human-legible" | tv1, tv2, bundle-guard-allow, bundle-guard-expired as examples | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 12 | packs,rrp,acceptance-checklist | rrp,acceptance | requirement | 10-item RRP acceptance checklist; must-fail conditions: receipt example missing required subjects, bundle example referencing missing subjects/evidence tiles, signature/digest mismatch passing accidentally, undeclared vocab items in examples, release claiming conformance without vectors | Section 12: "Must fail if" list | These must-fail conditions should be encoded as CI test cases | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 13 | packs,release-policy | release | requirement | Release tagging requires: pack validation green, vectors green, acceptance gates green, migration notes included, docs updated, no unresolved known-red-tests | "A pack may be tagged for release only if: [6 criteria]" | Implement release gating in CI pipeline | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 14 | packs,implementation,next-actions | implementation | decision | Nine immediate implementation actions: scaffold packs/rrp/, validate pack.json, move RRP assets, write CI target nx run packs-rrp:conformance, generate initial vectors, add contract checker to pre-commit/CI | Section 14 | These 9 actions should be entered as tickets in the backlog | high |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 1.3 | packs,refinement-first,enforcement | core-stability | issue-candidate | Refinement-first rule (no core mutation via packs) has no described enforcement mechanism; depends on author discipline and manual review | "If a change requires core semantic mutation, it is not a pack change and must be escalated out of band" | Add tooling to detect when pack tries to redefine something in core namespace | medium |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 4.2 | packs,depends-on,cycles | dependencies | issue-candidate | depends_on field uses doc_id-based dependencies; no cycle detection mechanism described (e.g., pack A depends on B which depends on A) | Section 4.2: depends_on field | Add dependency cycle detection to pack validation | low |
| 2026-04-24T22:50 | docs/RFCs/ROCK-3111-C-RRP-Pack-Filesystem-Contract-v0.2.0.md | Section 1.1 | packs,persona-pack,governance | governance | issue-candidate | PersonaPack noted as requiring elevated governance, but no specifics defined in this contract; governance-pack category exists but PersonaPack is distinguished from it | "PersonaPack — identity/persona/council pack (non-core; elevated governance applies)" | Define what "elevated governance" means for PersonaPack; create PersonaPack governance spec | low |

## Components And Technologies

- JSON Schema (for pack.json, receipt-content.schema.json, receipt-bundle-tapestry.schema.json)
- SHACL (for receipt.shapes.ttl, tapestry-bundle.shapes.ttl, profile-light.shapes.ttl, profile-auditor.shapes.ttl)
- SKOS/JSON vocab files (receipt-types.json, claim-types.json, verdicts.json, subject-roles.json, digest-algorithms.json)
- Test vectors (hash-input, expected, tampered, invalid variants)
- Content-addressed identifiers (CID) for pack_id
- Semver (^0.2.0 style version ranges in depends_on)
- SHA256 hashes for export metadata
- Nx CLI (nx run packs-rrp:conformance referenced as implementation action)
- Pre-commit hooks (mentioned in implementation action 6)

## Conceptual Claims

- **Refinement-first rule**: packs extend core without mutating it; core semantic mutation is out-of-band
- **Packs as constitutional boundary**: the pack contract keeps Rosetta's constitutional center stable by forcing new semantics into packs
- **Machine-checkable conformance**: packs are CI-friendly; conformance can be automated
- **Profile-based conformance**: a single pack can declare multiple conformance profiles (light/full/auditor/forge) with explicit inclusion/exclusion lists
- **Receipt Refinement Pack as template**: RRP is both a specific pack and the canonical template for future pack families
- **Traceability headers as first-class artifacts**: protocol-sensitive files are first-class with machine-checkable headers

## Dependencies And Sequencing

- Depends on: Rosetta v3.0.0 Core Spine, ROCK-3111, ROCK-3111-A, ROCK-3111-B, Doctrine v0.2
- RRP pack assets currently exist elsewhere and need to be moved into packs/rrp/ per implementation action 3
- PersonaPack governance spec is deferred (depends on this contract to establish baseline)
- Pack contract checker (action 6) must exist before packs/ can be reliably enforced in CI
- TC-007 (adapter certification harness) may interact with SkillPack category defined here

## Contradictions Or Supersession

- No explicit contradictions found
- This contract supersedes any informal pack structure conventions that preceded it
- This contract does NOT govern: runtime ingestion behavior, tapestry compilation, the write-admission gate (those are core spine or separate specs)

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| RRP pack_id is a placeholder — needs real content-addressed ID at freeze | docs-intelligence | packs,rrp,identity | ROCK-3111-C | pack.json example: `"pack_id": "cid:rrp-pack-placeholder"` |
| Refinement-first rule has no automated enforcement mechanism | implementation | packs,core-stability,enforcement | ROCK-3111-C | "Packs MUST extend core semantics without redefining or silently mutating Rosetta core meanings" — no tooling described to detect violations |
| PersonaPack "elevated governance" is undefined | docs-intelligence | packs,governance,persona-pack | ROCK-3111-C | "PersonaPack — identity/persona/council pack (non-core; elevated governance applies)" — no specifics |
| Pack dependency cycle detection not specified | implementation | packs,dependencies,validation | ROCK-3111-C | depends_on uses doc_id but no cycle detection mechanism described |
| recipes/ and skills/ subtrees lack CI enforcement | implementation | packs,ci,recipes,skills | ROCK-3111-C | Section 10: recommended but "not RRP pack roots"; no CI enforcement described |

## Project Board Suggestions

- Area: Rosetta / Pack Infrastructure
- Cycle: docs-intelligence batch-2
- Status: Extracted; issue candidates identified
- Blocked by: None — this doc is standalone RFC
- Parallelization notes: RRP scaffold (action 1) and pack.json validator (action 2) can proceed in parallel; CI target (action 4) depends on validator (action 2); all nine actions are independently actionable by separate agents

## Open Questions

- What is the exact scope of "elevated governance" required for PersonaPack vs GovernancePack?
- How does the pack contract interact with NOT LAME's write-admission gate — are pack mutations required to go through the gate?
- Should pack validation be a pre-commit hook, a CI target, or both?
- How does the RRP pack relate to the Text-Core MVP scope gate TC-007 (adapter certification harness)? Does the harness certify packs?
- Is there a need for a pack registry or index within Rosetta, or is filesystem presence sufficient?
- The doctine field references "Doctrine v0.2" — is this document versioned and where is it located?
