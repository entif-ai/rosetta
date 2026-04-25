# Issue Draft: CT-003 — EGC Pasigraphy May Be Too Esoteric for Practical Adoption

**Source extraction:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Issue candidate title:** CT-003: EGC pasigraphy may be too esoteric for practical adoption — human readability vs formalism tension

**Type:** risk

**Labels:** pasigraphy, egc, ux, controlled-language

**Depends on:** CT-010 (EGC formal grammar not specified — this issue cannot be validated until grammar exists)

---

## Summary

The EGC (Epistemic Graph Code) controlled language is positioned as both human-readable and machine-precise. The RFC explicitly acknowledges the risk that it may become "like a new programming language that users have to learn," limiting contributions to those with specialized knowledge. The tension between maximal precision/conciseness (Ithkuil-inspired) and natural language readability has not been resolved.

---

## Evidence

**From "Limitations and Future Work" — Human Readability vs Formalism:**
> "Our pasigraphy (EGC) aims to be both human-readable and machine-precise, but in practice it might end up being somewhat esoteric. There is a risk that it becomes like a new programming language that users have to learn. That could limit contributions to those with specialized knowledge."

**From "Pasigraphy Surface":**
> "Ithkuil's creator set out to create a language with 'the highest possible degree of logic, efficiency, detail, and accuracy in cognitive expression, while minimizing ambiguity, vagueness, redundancy, and arbitrariness.'"
> "This is exactly the sort of goal we have for the EGC, albeit we need it in a form practical for machines (and perhaps for humans with some training)."

---

## Discussion

EGC draws on multiple prior art:
- **AMR** (Abstract Meaning Representation): English-biased, sentence-level DAGs
- **UCCA** (Universal Conceptual Cognitive Annotation): cross-linguistic semantic framework
- **OWL/RDF**: verbose triples, machine-processable but not human-legible
- **SBVR**: structured English with formal semantics
- **ACE** (Attempto Controlled English): unambiguous controlled English that compiles to logic
- **Ithkuil**: maximally precise and concise, but extremely complex for humans

The design goal of combining "maximal precision" with "human readability" is inherently contradictory for complex knowledge. ACE achieves readability but with restricted grammar that limits expressiveness. Ithkuil achieves precision but is impractical for most humans.

Rosetta faces a choice:
1. **Practical EGC**: sacrifice some precision/conciseness for usability; model on ACE/SBVR
2. **Formal EGC**: prioritize precision; treat as machine-only notation (like a programming language)
3. **Dual surface**: EGC for machines, ACE-style natural language for humans, with verified equivalence
4. **Deprioritize EGC**: treat as research exploration; focus resources on implementable features

Mitigation mentioned in RFC: "building good authoring tools (perhaps GUI-assisted or templates)" — but this doesn't resolve the fundamental tension.

---

## Action Items

- [ ] Rosetta must decide whether EGC is a planned deliverable or research exploration
- [ ] If planned: commission formal grammar specification (CT-010 is prerequisite)
- [ ] If planned: design UI/authoring tools as part of EGC work package
- [ ] Consider dual-surface approach (machine EGC + human readable companion) as mitigation
- [ ] Evaluate whether ACE or SBVR subsets could serve as interim EGC while full formalization is pending

---

## Related

- CT-010: EGC formal grammar not yet specified
- Pasigraphy RFC reference: `docs/live/Entif.AI - Rosetta Pasigraphy Protocol - v3 - Architecture.md` (already extracted in prior run)