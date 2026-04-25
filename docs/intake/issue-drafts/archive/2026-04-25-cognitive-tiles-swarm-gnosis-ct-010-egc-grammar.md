# Issue Draft: CT-010 — EGC Formal Grammar Not Yet Specified: Round-Tripping Depends on Unambiguous Grammar

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-010: EGC formal grammar not yet specified — round-tripping depends on unambiguous grammar

**Type:** spec-gap

**Labels:** egc, grammar, formalization

**Depends on:** — (prerequisite for EGC implementation; blocks CT-003 validation)

---

## Summary

The EGC (Epistemic Graph Code) controlled language is described as having a formal grammar that enables round-tripping (parse EGC string → triples → serialize back to same EGC string). However, no formal grammar specification exists in the RFC — it states "we'll provide a formal grammar" as a design intent, not a delivered artifact. Without a formal grammar, EGC cannot be implemented, tested, or standardized.

---

## Evidence

**From "Pasigraphy Surface: Controlled Language for Meaning":**
> "We will implement a parser and pretty-printer for EGC that can parse an EGC string into a graph (triples) and serialize a graph back to the same string. This requires the language to be context-free or context-sensitive in a manageable way, and we'll provide a formal grammar."

**From "EGC Design Considerations":**
> "Reversible parsing (compiler design): We will implement a parser and pretty-printer for EGC that can parse an EGC string into a graph (triples) and serialize a graph back to the same string."

The RFC explicitly acknowledges the formal grammar is future work, not current deliverable.

---

## Discussion

EGC's stated properties:
1. Deterministic: same triples → same EGC string
2. No ambiguity: strict grammar, explicit relations, no pronouns without reference
3. Compact: short symbols for common concepts, no codebook collisions
4. Reversible: parse and pretty-print are inverses
5. Human-readable (with training) and machine-precise

These properties all depend on a well-defined formal grammar. Without it:
- Parser cannot be implemented (no grammar to implement against)
- Round-trip cannot be tested (no canonical form to verify)
- No standard for EGC compliance
- Different implementations may produce different EGC strings for same triples (non-deterministic)
- CID-based content addressing of EGC tiles becomes unreliable

The gap is analogous to specifying "we will build a programming language with a type system" without specifying the type system's rules — the concept is clear but implementation is blocked.

Related work that could inform EGC grammar:
- **ACE grammar**: Attempto Controlled English has a defined grammar (PEG or similar) that could be extended
- **SBVR BNF**: Semantics of Business Vocabulary and Rules has formal grammar specifications
- **AMR**: Abstract Meaning Representation has PENMAN notation guidelines but is English-biased

---

## Action Items

- [ ] Commission formal EGC grammar specification as a separate document
- [ ] Decision: base EGC on existing grammar (ACE, SBVR) or design from scratch?
- [ ] Grammar must specify: token vocabulary, production rules, ambiguity resolution, canonical form for serialization
- [ ] Implement parser+pretty-printer as reference implementation (can be separate from Rosetta core)
- [ ] Define EGC compliance test suite: round-trip property, no ambiguity, deterministic output
- [ ] Until grammar is specified: EGC should be marked as "research — not ready for implementation"

---

## Related

- CT-003: EGC may be too esoteric (this issue is the prerequisite that, when resolved, enables CT-003 evaluation)
- CT-010 blocks: any EGC implementation work, EGC tooling, EGC compliance testing
- Pasigraphy Protocol v3 (`docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md`): prior Rosetta work on pasigraphy may inform EGC grammar design