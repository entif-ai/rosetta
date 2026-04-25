# TXS-007: VocabPacks: WordNet + BabelNet + Ontolex Integration

**Status:** issue-candidate (not yet filed as GitHub issue)
**Labels:** `vocabpack`, `wordnet`, `babelnet`, `ontolex`, `lexicon`, `vocabulary`
**Depends on:** none

## Problem Statement

ROCK-3004 VocabPacks and Lexicon Guide references WordNet (Princeton), BabelNet, and W3C Ontolex as integration standards for lexical anchors (LEXID) and concept anchors (ANCHORID). No VocabPack definitions, no namespace conventions, and no registry currently exist. The vocabulary integration layer of Rosetta is unimplemented.

## Specific Findings

- **F-TXS-020** (confidence: medium): WordNet synsets, BabelNet multilingual senses, and Ontolex lexical entries all referenced as integration targets
- **F-TXS-011** (confidence: high): ROCK-3004 specifically targets WordNet, BabelNet, Ontolex as vocabulary integration standards

## Action Required

1. Define VocabPack format: a directory structure with namespace, version, manifest, and lexical resources
2. Define WordNet synset-to-ANCHORID mapping schema: synset offset → Pasigraphy anchor URI, with mapping confidence score
3. Define BabelNet multilingual sense anchoring: sense ID → ANCHORID with language tag and source confidence
4. Define Ontolex LexicalEntry format for Pasigraphy LEXID tiles: lemma, partOfSpeech, senses, morphological properties
5. Define namespace conventions for VocabPack registry (e.g., `vocab:wordnet:3.0`, `vocab:babelnet:2.0`)
6. Create `scripts/build-vocabpack.mjs` that validates and packages a VocabPack directory
7. Create `docs/rosetta/vocabpack-registry.json` as the canonical registry of known VocabPacks
