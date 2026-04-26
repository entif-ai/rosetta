# EML-010: Rosetta-Native Cognitive Model Training Requirements and Four-Wave Training Ladder

**Status:** issue-candidate
**Priority:** HIGH
**Type:** research/ml-training
**Source:** `docs/chats/20260408 - Chat GPT - Email-driven Security Defenses.md` — EML-F010

---

## Problem Statement

The source document fully specifies what is required to train a Rosetta-native cognitive model once foundational artifacts are available. This is a critical path item for Entif/Rosetta's long-term capability roadmap.

## Phase 0: Lock the Training Substrate

Before touching weights, build a Rosetta-native corpus including:
- `rosetta.observation` pairs with derived `form`, `lexeme`, `concept`, `frame`, `conjecture` artifacts
- Canonical pasigram/concept targets for atomic and compositional meanings
- `tapestry` objects as compiled context bundles
- Provenance-rich positive and negative examples (correct mappings, ambiguous mappings, unsupported mappings, contradictory candidate bundles)
- Pack anchors into external references (WordNet, VerbAtlas, Ithkuil curriculum) for stabilization

## Recommended First Move: Codec-and-Alignment, Not Scratch Pretraining

- Externalize meaning into Rosetta bundles and tiles
- Align host model into Rosetta space via prototype embeddings + orthogonal Procrustes alignment
- First trainable system = base model + Rosetta codec + projection head + disambiguator + bundle builder/verifier loop
- NOT: replace the model's tokenizer with pasigraphy on day one

## Four Training Waves

**Wave 1 — Rosetta-aware host model:**
- Structural tokens for bundle syntax
- Projector head into Rosetta prototype space
- Adapters on output/selected attention layers
- Bundle emission and bundle reading tasks
- Goal: model can convert natural inputs into Rosetta candidate bundles and consume tapestries

**Wave 2 — Rosetta-refined post-training:**
- D&P-generated candidate bundles
- Rosetta-pruned promoted cores
- Abstention examples
- Ambiguity-preserving examples
- Negative examples where correct behavior is "insufficiently grounded"

**Wave 3 — Continued pretraining on mixed corpora:**
- Natural language + Rosetta bundles + HDS control markers + pasigraphic realizations + validated tapestries
- Only after Waves 1–2 work

**Wave 4 — Deeper architecture adaptation:**
- AttnRes, CCA, ENGRAM-like lookup memory, other sequence/backbone improvements
- Only once semantic substrate, pruning, and eval harness are proven real

## Evaluation Harness Requirements

- **Semantic fidelity:** Can model map inputs to correct Rosetta concepts/frames/roles?
- **Bundle correctness:** Valid, typed, contradiction-free, provenance-compatible, equivalent to gold even when surface wording differs?
- **Failure quality:** Structured uncertainty, unresolved ambiguity, or unsupported candidate bundle — NOT confident fabrication

## v1 Scope Definition

**v1 should be able to:**
- Consume a tapestry as primary context
- Emit candidate bundle cores/halos
- Map into Rosetta prototype space
- Preserve ambiguity with conjectures
- Ground outputs in concept/frame/lattice structure
- Abstain when no canonical core survives pruning

**v1 does NOT need to:**
- Think only in pasigraphic tokens end-to-end
- Replace all natural-language tokenization
- Pretrain from scratch

## Notes

D&P (Draft-and-Prune) becomes a data refinery producing better pseudo-labels and bundle corpora than one-shot generation.
