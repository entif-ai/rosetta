# Docs Intelligence Extraction — PACK_SUITE_INDEX.md

## Document Metadata

- **Source:** `docs/packs/PACK_SUITE_INDEX.md`
- **Extracted:** 2026-06-01
- **Extraction ID:** `docs-intelligence/pack-suite-index`
- **Confidence:** high
- **Findings:** 8
- **Issue candidates:** 2

---

## Findings

### Finding 1: Pack Suite has two authoritative locations
**Confidence:** high

PACK_SUITE_INDEX.md lives at `docs/packs/PACK_SUITE_INDEX.md` and states that the canonical v3 extension pack index lives at `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`. This dual-location pattern creates a canonical/routing split that must be understood as intentional.

**Evidence span:** "The canonical v3 extension pack index now lives at `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md`"

---

### Finding 2: Three pack roots are currently implemented
**Confidence:** high

Three implemented pack roots are defined:
1. `packs/rrp` — Receipt vocabulary, schema, SHACL starter shapes, examples, and test vectors
2. `packs/stdpack-source-substrate` — Source-substrate vocabulary, schema, SHACL starter shapes, and examples
3. `packs/vocabpack-source-taxonomy` — Source taxonomy vocabulary and tiering examples

**Evidence span:** "Implemented Pack Roots: packs/rrp, packs/stdpack-source-substrate, packs/vocabpack-source-taxonomy"

---

### Finding 3: RRP pack is receipt-focused
**Confidence:** high

The `packs/rrp` pack covers receipt vocabulary, schema, SHACL starter shapes, examples, and test vectors. This aligns with the Receipt Law concept from Rosetta governance — every durable mutation emits receipts.

**Evidence span:** "packs/rrp — Receipt vocabulary, schema, SHACL starter shapes, examples, and test vectors"

---

### Finding 4: Source Substrate is a first-class pack domain
**Confidence:** high

`packs/stdpack-source-substrate` is explicitly named as a pack root, indicating Source Substrate is implemented as a pack-domain rather than just a concept. This is consistent with DI-011 (Source Substrate missing as first-class protocol domain) but suggests the pack itself may exist even if the protocol domain definition is incomplete.

**Evidence span:** "packs/stdpack-source-substrate — Source-substrate vocabulary, schema, SHACL starter shapes, and examples"

---

### Finding 5: Source Taxonomy is a vocabulary pack
**Confidence:** high

`packs/vocabpack-source-taxonomy` covers source taxonomy vocabulary and tiering examples. This is the vocabulary layer for the 4-source-class taxonomy referenced in the Source Substrate Addendum (SRP).

**Evidence span:** "packs/vocabpack-source-taxonomy — Source taxonomy vocabulary and tiering examples"

---

### Finding 6: Pack manifest schema exists
**Confidence:** high

The pack suite defines a machine-readable schema contract at `packs/_schemas/pack-manifest.schema.json`. This establishes that pack manifests are structured and potentially validatable, consistent with the ROCK-3111-C RRP Pack Filesystem Contract which calls for conformance testing.

**Evidence span:** "packs/_schemas/pack-manifest.schema.json"

---

### Finding 7: Pack directories are first-class repo artifacts
**Confidence:** high

The index states "These pack directories are now first-class repo artifacts." This marks an architectural transition from packs-as-documentation to packs-as-enforced runtime contracts. The next maturity step is increasing machine validation coverage so pack files and runtime validators converge.

**Evidence span:** "These pack directories are now first-class repo artifacts"

---

### Finding 8: Bootstrap contract path is preserved via workspace tests
**Confidence:** medium

The index notes it "preserves the bootstrap contract path expected by workspace tests." This indicates pack discovery is integrated into the workspace test harness and that bootstrap relies on specific pack paths being present and correctly structured.

**Evidence span:** "This compatibility index preserves the bootstrap contract path expected by workspace tests"

---

## Concept Cross-Reference

| Concept | First seen here | Related concepts |
|---|---|---|
| `pack-manifest.schema.json` | This doc | RRP pack, pack-conformance, CI |
| `packs/rrp` | This doc | receipts, SHACL, receipt-law |
| `packs/stdpack-source-substrate` | This doc | source-substrate, DI-011 |
| `packs/vocabpack-source-taxonomy` | This doc | source-taxonomy, SRP |
| `first-class-repo-artifact` | This doc | pack-conformance, bootstrap |
| `bootstrap-contract-path` | This doc | bootstrap, workspace-tests |

---

## Issue Candidates

### PSI-001: Pack schema validation CI missing

**Type:** implementation
**Confidence:** medium
**Status:** candidate

The pack manifest schema (`packs/_schemas/pack-manifest.schema.json`) exists but there is no mention of CI enforcement validating that pack contents conform to the schema. Given the stated goal of increasing machine validation coverage so pack files and runtime validators converge, CI-based schema validation is a clear gap.

**Labels:** `packs`, `ci`, `conformance`

---

### PSI-002: Dual canonical locations for pack index create routing ambiguity

**Type:** architecture
**Confidence:** medium
**Status:** candidate

PACK_SUITE_INDEX.md at `docs/packs/` redirects to `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Extension Packs.md` as the canonical v3 index. This creates a two-hop lookup for pack discovery: (1) find PACK_SUITE_INDEX.md, (2) follow redirect to Extension Packs doc. A single canonical entry point or direct pointer in PACK_SUITE_INDEX.md would eliminate this indirection.

**Labels:** `packs`, `architecture`, `discoverability`