# Docs Intelligence Extraction

## Source

- **Path:** `docs/chats/20260225 - Chat GPT - Token boundaries explained.md`
- **Title:** Token boundaries explained
- **Date evidence:** 2025/11/6 22:40:55 (conversation date), exported 2026/2/25
- **Authority tier:** Tier 2 (internal engineering working paper / research conversation)
- **Freshness:** ~5 months old as of extraction date
- **Word count:** ~10,000 (estimated, ~3732 lines)
- **Extractor:** docs-intelligence subagent
- **Extraction date:** 2026-04-25 UTC

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

A dense technical conversation exploring: (1) why LLMs from different vendors converge on similar stylistic/empathic attractor basins despite different tokenizers and weights — framing this as an "AI metrology" problem analogous to industrial-revolution gauge blocks; (2) the design of a **Rosetta Pasigraphy Protocol (RPP)** — a vendor-agnostic, concept-level interop layer using WordNet/BabelNet/VerbAtlas/SyntagNet as the semantic gauge block set, with graph-first sense embeddings (Path2Vec/Katz), orthogonal Procrustes alignment, Personalized PageRank (PPR) disambiguation, MCDA scoring, and audited meaning bundles; (3) a full Deep Research prompt (authored in-chat) specifying the RPP MVP architecture, 10-phase build plan, evaluation gates, and code modules; (4) a second Deep Research output delivering a multi-phase implementation blueprint with repo scaffold, JSON schemas, algorithm reference code, FastAPI spec, and CLI tools; (5) a final consolidated task list distilling all 20 discrete engineering tasks with progress estimates and prioritization ordering.

---

## Goals And Intent

- Establish a vendor-agnostic "semantic micrometer" so models from different labs can interoperate at the concept level rather than the token level
- Formalize a pasigraphic interface: concept IDs (WordNet/BabelNet/VerbAtlas synset/frame IDs) as the interop contract
- Create a portable, content-addressable concept bundle format with CID, halo of alternatives, criterion-wise scores, and explain traces
- Build graph-first sense embeddings via Path2Vec/Katz over WordNet+SyntagNet graph topology
- Provide orthogonal Procrustes alignment so any encoder can project into RPP space
- Design a multi-criteria decision function (MCDA) for disambiguation combining PPR priors + encoder similarity + frame role-fit + gloss overlap + antonym gap + entropy penalty
- Ship an MVP "skateboard" demo: text + image modality, two host codecs (OpenAI, llama.cpp), end-to-end bundle round-trip
- Define 20 ranked engineering tasks with clear dependencies, tech choices, and progress estimates

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Vendor-neutral concept IDs (WordNet/BabelNet/VerbAtlas URIs) as interop contract | Prompt: "Am I correct in assuming that the identifiers associated with tokens... is arbitrary?"; Response: tokenization/IDs are arbitrary per vendor | `rpp/schema`, `rpp/registry` | P0 | Core protocol invariant |
| Graph-first sense embeddings (Path2Vec/Katz) capturing taxonomic/relational meaning | Response: "graph→vector works and often beats text-only embeddings"; citing WordNet Embeddings W18-3016, KorLex | `rpp/embed` | P0 | Primary embedding backbone |
| Orthogonal Procrustes alignment layer for cross-vendor embedding projection | Response: "alignment does not require retraining the host"; Procrustes via SVD of XᵀY | `rpp/align` | P0 | Enables any encoder → RPP |
| Personalized PageRank (PPR) disambiguation prior over concept graph | Response: "PPR prior boosts commerce senses for 'bought a camera'" | `rpp/wsd` | P0 | Seeds disambiguation with context |
| MCDA scoring combining: proto_cos, ppr_prior, role_fit, gloss, antonym_gap, entropy | Response: "decision layer computes S = w·f where f = [cos_sim, ppr_prior, role_fit, ...]" | `rpp/wsd` | P0 | Audible, tunable decision |
| Meaning bundle format: core + halo + scores + explain + trace | JSON bundle in Response section 5.3: `"package":"ros://bundle"`, `"core"`, `"halo"` with criterion-wise scores | `rpp/bundle` | P0 | Interchange contract |
| CID content addressing for concept packages via canonical JSON/CBOR + multihash | Response: "CIDv1 with multihash (sha2-256)"; RFC 8785 canonical JSON | `rpp/cid` | P0 | Deduplication + verifiability |
| Modality maps (text, image, audio, motion) as first-class concept anchors | Response: "Modality Maps: visual, audio, kinematic, haptic, spatial, code, math" | `rpp/modal` | P1 | Multimodal native from day 1 |
| CLIP image encoder for visual prototypes | Response: "CLIP ViT-B/32 for images"; citing OpenAI CLIP research | `rpp/modal/image` | P1 | Cross-modal retrieval |
| YAMNet audio encoder for audio event prototypes | Response: "YAMNet for audio events"; citing TensorFlow/YAMNet | `rpp/modal/audio` | P1 | Audio modality anchor |
| Two host codecs (OpenAI function-call, llama.cpp) | "Add a codec that emits function-call JSON for two host models" | `rpp/codec/openai`, `rpp/codec/llamacpp` | P1 | Prove cross-vendor interop |
| Cross-model agreement gate: cosine ≥ 0.7 on ≥80% of sense decisions | Evaluation gate: "same input through two hosts → project to RPP → cosine similarity ≥ threshold" | `rpp/eval` | P1 | Interop validation |
| Semantic stress tests: synonym swap, antonym flip, paraphrase w/o negation, word-order shuffle | "Alignment quality is gated by semantic stress tests" | `rpp/eval` | P1 | Prevents STS-good/semantics-bad |
| SimLex-999 / RG-65 correlation for intrinsic evaluation | "SimLex-999 / MEN / RG-65 correlations (expect graph-fusion > text-only)" | `rpp/eval` | P1 | Intrinsic quality gates |
| SWM micro-reasoner integration over concept graph | "TRM micro-reasoners for stepwise, verifiable thought over concept graphs" | `trm`, `rpp/wsd` | P2 | Reasoning extension |
| MLACS semantic cache + runtime router | "MLACS cache to reuse routines at multiple abstraction levels with semantic fingerprints" | `mlacs` | P2 | Compute reuse spine |
| Swarm Participation Protocol (SPP) for DHT/gossip routine sharing | "SPP for anonymized routine sharing in a small swarm" | `swarmd` | P2 | Distributed execution |
| Cross-lingual bootstrap (MT→candidate synsets + WSI purification) | "MT→candidates, synset SIF scoring, WSI purification"; citing Automated WordNet Construction 2204.03251 | `rpp/embed`, `rpp/wsd` | P2 | Non-English expansion |
| 10-phase build plan with explicit exit conditions per phase | 10 phases from Protocol/Registry through Swarm/Gov | All | P0 | Sequencing contract |
| 20 prioritized engineering tasks with progress % estimates | Consolidated task list with Approx progress column | All | P0 | Execution roadmap |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Opening exchange | tokenization, vendor-agnostic, convergence | tokenization, LLM vendors, latent space | observation | Token IDs, tokenization boundaries, and even floating-point representations are arbitrary per vendor, yet LLMs converge on similar stylistic/empathic attractor basins — indicating shared topological structure in latent space across different model families | "Token boundaries and IDs aren't globally standardized — they're just internal conventions" + "multiple independent neural fields converging on the same low-entropy basin" | Leverage convergent basin topology as the anchor for a vendor-neutral protocol; token-level differences are noise | high |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Gauge block analogy | metrology, industrial-revolution, standardization | Maudslay, Johansson gauge blocks, precision tooling | pattern | Industrial revolution breakthroughs came from shared reference standards (gauge blocks) enabling cross-shop interoperability — AI needs the equivalent "semantic gauge blocks" for cross-vendor concept alignment | "What you need is our equivalent of gauge blocks" analogy | Design RPP as the semantic gauge block set; use WordNet/SyntagNet/VerbAtlas as the measurement reference |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Mixture of Concepts vs Mixture of Experts | moe, concept-routing, pasigraphy | mixture-of-concepts, mixture-of-experts, SyntagNet, VerbAtlas | decision | Instead of "mixture of experts" where each model specializes but speaks its own dialect, move toward "mixture of concepts" where every model speaks a shared semantic language using SyntagNet/VerbAtlas/BabelNet/WordNet/Ithkuil as the concept gauge blocks | "This is like the third step... JoeBlox for meaning" | Build RPP around concept IDs; route by concept overlap signature not persona/expert label |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Napkin sketch stack (A-F) | stack-architecture, layer-diagram | protocol-layer, concept-frames, concept-packages, runtime-interop, execution-mesh, swarm-governance | architecture | Six-band stack: [A] Protocol Layer (SCS + GlyphCore), [B] Concept Frames (ID/URI, gloss, roles/slots, constraints, WordNet/BabelNet anchors), [C] Concept Packages (canonical JSON/CBOR + CID), [D] Runtime Interop Package (MCP Concept Context Package), [E] Execution Mesh (TRM micro-reasoners + MLACS cache + SPP), [F] Swarm & Governance (DHT/gossip + CID + licensing/deprecation) | Full napkin sketch in response | Implement in dependency order A→F; F deferred to post-MVP |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Concept frame schema | json-schema, concept-registry, frame-registry | concept schema, frame schema, modality maps | specification | Full JSON Schema (draft-07) defined for concept entries: required fields type/uri/version/labels/gloss/anchors/relations/modalities/provenance. Same container with type="frame" extends via roles/constraints block. Modality maps for text/image/audio/motion each have prototypes array | Schema in response Section 5.1 | Implement `rpp/schema/concept.json` and `rpp/schema/frame.json` |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Meaning bundle schema | bundle-format, halo, mcda, audit | meaning bundle, criterion scores, explain trace | specification | Runtime bundle: `"package":"ros://bundle"`, `"core"` with selected concept + frame_bindings, `"halo"` ranked alternatives with per-criterion scores (proto_cos, ppr_prior, role_fit, gloss_overlap, antonym_gap, entropy_penalty), `"explain"` narrative, `"trace"` encoder/graph/decoding metadata | JSON bundle example in Section 5.3 | Implement `rpp/bundle/validate.py` and `rpp/bundle/explain.py` |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Embedding prototypes and alignment | sbert, procrustes, multimodal-prototypes, path2vec | sentence embeddings, orthogonal Procrustes, CLIP, YAMNet | technology | Text prototypes from glosses via SBERT siamese encoder; graph embeddings via Path2Vec (predict graph proximities with dot product); multimodal prototypes (image via CLIP, audio via YAMNet) cross-linked to same concept URI; alignment via orthogonal Procrustes (SVD of XᵀY subject to RᵀR=I) with whitening and mean-centering | "Alignment quality is gated by semantic stress tests" + Procrustes algorithm description | Build `rpp/embed/train_path2vec.py` and `rpp/align/procrustes.py` |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Graph priors and disambiguation (PPR) | ppr, wsd, katz, graph-priors, syntagmatic | Personalized PageRank, WSD, graph priors, syntagmatic edges | algorithm | Concept graph unifies paradigmatic (hypernymy/meronymy) + syntagmatic (SyntagNet collocations). At inference, PPR distribution seeded by lexical anchors in context combined with encoder similarity + frame-role fit in MCDA convex combination. Bundle records criterion vector for replay under different weights | "PageRank prior solves (I − αA)π = (1 − α)s for seeded vector s over sparse adjacency A" | Implement `rpp/wsd/ppr.py` and `rpp/wsd/select.py` |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Reference code (7 modules) | reference-code, path2vec, procrustes, ppr, mcda, bundle, codec | Python modules, PyTorch, NetworkX, sentence-transformers | code | 7 reference code modules: build_wn_graph.py (NetworkX), katz_pairs.py (Katz similarity), train_path2vec.py (PyTorch MSE), make_text_prototypes.py (SBERT), fuse_vectors.py (concat+PCA), procrustes.py (orthogonal alignment), ppr.py (seeded PageRank), select.py (MCDA), validate.py (bundle validation), minimal.py (function-call codec), labeler.py (zero-shot) | Full code blocks in response Section 7 | Implement as `rpp/` package modules; all runnable |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | 20-Task consolidated build plan | build-plan, task-list, prioritization, progress-tracking | 20 tasks, phase ordering, progress estimates | planning | 20 discrete engineering tasks ranked: Protocol/Canonicalization (60-70%), Registry/Graph (35-40%), Disambiguator MCDA (45%), Embeddings/Alignment (30%), Concept Packages (55%), Runtime Interop Package (35%), Host Codecs (25%), Multimodal v1 (20%), TRM Reasoner (25%), MLACS Cache (20%), Swarm SPP (15%), Eval Harness (30%), Training Data (25%), Cross-lingual Bootstrap (10%), Licensing/Provenance (35%), Governance/Versions (40%), Skateboard Demo (20%), APIs/SDK (30%), Docs/Examples (25%) | Full task table with "Approx progress" estimates | Execute in prioritized order; top items ~60% designed, 0-30% built |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Phase ordering | fast-viable-ordering, dependencies | phase sequencing, parallelization | process | Optimal ordering: Tasks 1,2,3,5,4 then 6,7 for interchange → add 8,19 for two real hosts → fold 9,18 for first multimodal round-trip → bring up 10,11,13 as quality/reuse spine → parallelize 14,15,16,17 for data, language, governance | "Fastest viable ordering" section | Follow for milestone planning |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Research citations: SimLex-999, KorLex, WordNet Embeddings W18-3016 | benchmarking, simlex, korlex, wordnet-embeddings | SimLex-999, RG-65, KorLex, Path2Vec | evidence | Converting WordNet sense graph into vectors via Katz/Path2Vec + PCA outperforms large-corpus word2vec on SimLex-999 by ~15% correlation (W18-3016). KorLex (Korean WordNet) graph+corpus concatenation improves analogy accuracy 8.6-9.6% over baseline. Evidence that "meaning graph + usage corpus" is complementary and graph-first works | W18-3016, KorLex citation in response | Use SimLex-999/RG-65 as primary intrinsic benchmarks; expect graph-fusion to outperform text-only |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Deep Research prompt (first) | deep-research-prompt, rpp-spec | deep-research, RPP architecture | process | Full Deep Research master prompt authored in-chat with: 13 objectives ranked, constraints (model-agnostic, pasigraphic-first, auditable, content-addressed, multimodal-native), required research survey, target architecture (schemas + APIs + CLIs + repo layout), MVP skateboard definition (2k-5k senses, SBERT, Path2Vec, PPR, MCDA, CLIP image, YAMNet audio, OpenAI+llama codecs), 10-phase development workflow, code requirements (G1-G5), evaluation gates (H), governance/licensing (I), risks/mitigations (J), output package requirements (K: architecture doc, repo tarball, OpenAPI JSON, Data Cards, Eval Report, demo notebook, integration guide) | Full prompt in response | Use as authoritative Deep Research input for RPP MVP build |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Deep Research output (second) | architecture-blueprint, implementation-mvp, phase-1-10 | RPP architecture, 10 phases, implementation blueprint | implementation | Second Deep Research delivered: (1) full 10-phase implementation blueprint (Phase 1 Protocol/Schema through Phase 10 Swarm), (2) repo scaffold structure (entif-rpp/ with rpp/, data/, scripts/, tests/), (3) JSON schemas for Pasigram IR, Concept, Frame, Bundle, MCP Envelope, (4) algorithm reference code (Path2Vec trainer, Procrustes aligner, PPR, MCDA, bundle validator, zero-shot labeler), (5) FastAPI/OpenAPI endpoints, (6) eval gates with thresholds, (7) risks/mitigations, (8) licensing/SPDX approach, (9) provenance schema, (10) governance/versioning with semver + conversion tables | Full blueprint in response | Use as implementation reference; repo scaffold as starting point |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Entif alignment: Maudslay→Johansson→gauge-blocks analogy | analogy, industrial-revolution, metrology | Maudslay, Johansson, gauge blocks, RPP | framing | Historical analogy: precision machining → gauge blocks → industrial interoperability unlocked. RPP as the cognitive equivalent: models trained independently converge on similar manifolds → RPP provides the "semantic gauge blocks" for cross-vendor interop. Same structure: shared reference standard enabling composed meaning across different "factories" | Response: "Maudslay gave us precision screw-cutting lathes; Whitworth systematized thread standards; Johansson gave industry portable composable unit system" | Use as design principle anchor: RPP must be the Johansson gauge blocks for cognitive interoperability |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Entif stack alignment | entif-stack, glyphcore, mindmesh, truthfabric | SCS, GlyphCore, MindMesh, TruthFabric, MCP | technology | RPP slots into existing Entif architecture: GlyphCore (typed graph with interpretation rules), MindMesh (memory constitution), TruthFabric (truth/modality fields), distributed execution, Phase Plan scaffold | "This slots into your GlyphCore, MindMesh, and TruthFabric" | Verify RPP integration with existing Entif components; no conflicting architecture |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Multi-criteria Decision Analysis (MCDA) weights | mcda, weights, decision-function | MCDA weights, criterion vector | specification | Default convex combination weights: w = [0.35, 0.25, 0.15, 0.15, 0.07, -0.02] for criteria [proto_cos, ppr_prior, role_fit, gloss, antonym_gap, entropy] — learned under margin loss maximizing separation between selected core and best non-core candidate | `mcda_score()` function in code block | Weights are starting point; calibration script needed via eval-harness |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | TRM micro-reasoner placement | trm, micro-reasoner, concept-graph | TRM, micro-reasoners, stepwise reasoning | architecture | TRM positioned as first micro-reasoner over concept graph: stepwise, verifiable thought over RPP concept bundles with invariants and safety checks over roles and relations | "Integrate your TRM as the first stepwise reasoner operating on RPP graphs" | Design `trm.step(bundle) → bundle'` interface; place in execution mesh |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | MLACS semantic cache design | mlacs, cache, router, semantic-fingerprint | MLACS, semantic cache, runtime router | architecture | MLACS: cache routines keyed by concept fingerprints; runtime router preferring cache hits and known routines; Contextual Modality Map inside fingerprint so cache keys respect active modalities | "MLACS even names a Contextual Modality Map inside the fingerprint, so the cache keys respect which modalities were active" | Implement `mlacs.get/put` with fingerprint schema and TTL policies |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | DHT/gossip swarm for routine sharing | swarm, dht, gossip, spp | DHT, Kademlia, gossip, routine sharing | architecture | Swarm: DHT/gossip for tile discovery by CID; pinning and fetch; policy for anonymized sharing and enterprise ACLs; using libp2p or Kademlia DHT with signed manifests and capability tokens | "Discovery, routing, and replication ride on the swarm DHT using CIDs, so any lab or vendor can host tiles without central choke points" | Implement `swarmd` with CID-based discovery and signed manifest policy |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Weak supervision training data approach | weak-supervision, auto-labeling, denoising | UFSAC, OMSTI, SemCor, Train-o-Matic, parallel corpora | data | Large sense-labeled corpora expensive; weakly supervised auto-labeling via lexicons, high-precision patterns, graph propagation. Train-o-Matic leverages BabelNet/WordNet to auto-label corpora cheaply. Denoising regimen samples proportionally to confidence; small human audit set for calibration | "Auto-labeling via existing lexicons, high-precision pattern rules, and graph-based propagation produces candidate training events with per-example confidence" | Use UFSAC converters and Train-o-Matic approach for training data ETL |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | ALIGN-SIM stress test criteria | align-sim, stress-tests, semantic-robustness | ALIGN-SIM, semantic robustness, stress tests | evaluation | 5 semantic stress tests: synonym substitution (should stay close), antonym flip (should go far), paraphrase without negation (stay close), word order perturbation (relatively close if syntax-invariant), distractor injection. Must pass ≥4/5 simultaneously to avoid "looks good on STS, fails on semantics" pitfall | "Promotion requires meeting threshold margins simultaneously" | Implement stress test suite in `rpp/eval/semantic_stress_tests.py` |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Cross-lingual bootstrap (Spanish pilot) | cross-lingual, mt, wsi, spanish | MT→candidates, SIF scoring, WSI purification, Procrustes | internationalization | MT→candidate synsets for Spanish; score via translated gloss+examples+related-synset neighborhoods; Linear-WSI purification for per-word thresholds; Procrustes align to EN hub; result: bilingual mapping table + aligned vectors | "For a new language, generate MT→candidates, synset SIF scoring, WSI purification; publish bilingual mapping table and aligned vectors" | Implement Spanish as first non-EN locale pilot per recipe |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Versioning strategy | semver, versioning, deprecation, migration | SemVer, replaced_by, conversion tables, ontology versioning | governance | Each registry release = semver version. Deprecated concepts get `replaced_by` field pointing to new IDs. Backward/forward compatibility maps between versions. Ontology version negotiation header in MCP envelope for mixed-version agent comms | "Backward and forward compatibility maps; negotiation header for mixed-version agent comms" | Implement `rpp/registry/versioning.py` with semver and conversion maps |
| 2025-11-06 | docs/chats/20260225 - Chat GPT - Token boundaries explained.md | Licensing approach (SPDX, provenance) | licensing, spdx, provenance | SPDX identifiers, provenance.sources[], license field | governance | Attach SPDX license identifiers per concept; `provenance.sources[]` array; `license` field; `get_concept_license(id)` helper; CI must refuse merges with missing/conflicting licenses. WordNet BSD-style, BabelNet CC BY-NC for research, VerbAtlas CC BY-NC-SA | "CI must refuse merges with missing or conflicting licenses" | Implement `rpp/registry/license_check.py`; add to CI pre-commit |

---

## Components And Technologies

- **rpp/schema/** — JSON Schema (draft-07) for concept.json, frame.json, bundle.json, concept-package.json, mcp-envelope.json
- **rpp/cid/** — canonicalization (RFC 8785 JSON canonicalization or CBOR RFC 8949) + CIDv1 multihash (sha2-256)
- **rpp/registry/** — concept/frame registry with importers for WordNet 3.1, BabelNet crossrefs, SyntagNet, VerbAtlas; FastAPI service
- **rpp/graph/** — typed weighted multi-relational graph over senses (NetworkX); adjacency matrices per relation type; PPR seeders and caches; Katz/Path2Vec similarity tables
- **rpp/embed/** — Path2Vec-style PyTorch trainer (MSE loss on graph proximities, neighbor regularization, negative sampling); SBERT text prototypes; vector fusion (concat + PCA); FAISS index
- **rpp/align/** — orthogonal Procrustes (SVD of XᵀY subject to RᵀR=I); whitening and mean-centering utilities; diagnostics
- **rpp/wsd/** — MCDA disambiguator combining encoder similarity + graph PPR priors + frame role-fit + gloss overlap + antonym checks + negation guard; bundle generator with criterion-wise scores and `explain()` trace; PPR seeded PageRank implementation
- **rpp/bundle/** — bundle models, validator (jsonschema), explainer; canonical Concept Package generator
- **rpp/mcp/** — MCP-friendly Concept Context Package envelope; routing stubs; FastAPI shim
- **rpp/codec/openai/** — OpenAI function-call adapter; consume/emit bundles as function-call JSON
- **rpp/codec/llamacpp/** — llama.cpp adapter; same consume/emit interface
- **rpp/modal/image/** — CLIP (ViT-B/32) image encoder; imageable concept prototypes (100 object synsets); cross-modal retrieval demo
- **rpp/modal/audio/** — YAMNet audio event classifier; audio event prototypes (50 events); audio↔text retrieval
- **rpp/eval/** — eval harness: SimLex-999/RG-65 intrinsics, WSD on SemCor/OMSTI, semantic stress tests, cross-model agreement, round-trip fidelity, multimodal retrieval @1/@5; gate enforcement
- **rpp/training/** — ETL for UFSAC/SemCor/OMSTI/parallel corpora; weakly-supervised auto-labeling; confidence-weighted samplers; Data Cards
- **rpp/swarmd/** — DHT/gossip discovery; CID-based pin/fetch; signed manifests; capability tokens; policy engine for share/deprecate/merge
- **rpp/trm/** — TRM micro-reasoner integration: `trm.step(bundle) → bundle'`; invariants and safety checks over roles and relations
- **rpp/mlacs/** — semantic cache with concept fingerprint keys; Contextual Modality Map in fingerprint; runtime router preferring cache hits; Redis/DuckDB + LSH or FAISS
- **entif-rpp/** — monorepo root with pyproject.toml, Makefile, pre-commit hooks, GitHub Actions CI

---

## Conceptual Claims

- Tokenization boundaries and token IDs are arbitrary per vendor, but the topological structure of latent space (attractor basins for empathy, narrative cadence, semantic shape) converges across independent model families trained on overlapping corpora with similar objectives — making a universal semantic protocol feasible
- The correct model for AI interoperability is "mixture of concepts" (shared semantic gauge blocks via WordNet/BabelNet/VerbAtlas/SyntagNet) not "mixture of experts" (vendor-dialect specialization)
- Graph-first sense embeddings (Path2Vec/Katz over WordNet topology) outperform text-only corpus embeddings on SimLex-999 by ~15% correlation — graph structure is a strong supervisory signal for meaning
- Any encoder can project into RPP space via orthogonal Procrustes without retraining the host; whitening and mean-centering address anisotropy
- Meaning bundles with a ranked halo of alternatives and criterion-wise scores enable auditability and replay under different MCDA weights
- DHT/gossip + CID content addressing enables decentralized knowledge sharing without central choke points
- Cross-lingual expansion is achievable via MT→candidate synsets + WSI purification + Procrustes alignment to English hub (proven for French/Russian with minimal resources)
- Semantic stress tests (synonym swap, antonym flip, paraphrase without negation, word-order shuffle, distractor injection) must all pass simultaneously to gate release — prevents "looks good on STS, fails on semantics" false confidence

---

## Dependencies And Sequencing

- **rpp/schema** must precede all other packages (all depend on shared JSON schemas)
- **rpp/registry** (Tier 2) must precede **rpp/graph** and **rpp/embed** (needs registry IDs to train over)
- **rpp/graph** must precede **rpp/wsd** (PPR disambiguation depends on graph structure)
- **rpp/embed** (Path2Vec + fusion) must precede **rpp/align** (alignment needs prototype vectors to align to)
- **rpp/wsd** must precede **rpp/bundle** (bundle needs disambiguation output)
- **rpp/cid** must precede **rpp/bundle** (bundle needs CID computation)
- **rpp/modal/** (CLIP + YAMNet) can parallelize after **rpp/embed** and **rpp/bundle** are stable
- **rpp/codec/** (OpenAI + llama.cpp) depends on **rpp/bundle** being stable
- **rpp/eval** depends on all core packages (needs to evaluate full pipeline)
- **rpp/trm** and **rpp/mlacs** depend on **rpp/wsd** + **rpp/bundle** (reasoning operates on bundles)
- **rpp/swarmd** depends on **rpp/cid** (CID-based discovery is core to swarm protocol)
- **rpp/training** (ETL/data) can run in parallel once schemas are stable
- External dependencies: NLTK WordNet 3.1, sentence-transformers (SBERT/E5), PyTorch, NetworkX, jsonschema, CLIP (OpenAI/HuggingFace), YAMNet (TensorFlow Hub), FAISS, FastAPI

---

## Contradictions Or Supersession

- **No contradiction found with prior processed documents** — RPP is consistent with and extends prior OMC layer specs. RPP provides the concrete semantic interop layer that OMC's concept-routing layer depends on.
- **Important refinement:** RPP's "mixture of concepts" framing (concept IDs as interop contract) is the concrete instantiation of OMC's "concept signature routing" — RPP provides the protocol that OMC's router consumes.
- **Important refinement:** RPP's multimodal design (Modality Maps with text/image/audio/motion first-class) aligns with OMC's six memory planes and four-zone context model — both treat modality as a first-class dimension.
- **Supersession candidate:** The 10-phase RPP build plan (Protocol/Registry → Graph/Embeddings → Disambiguator → Bundles → Host Codecs → Multimodal → Skateboard Demo → TRM/MLACS → Swarm/Gov) supersedes informal sequencing from prior specs; it is the authoritative RPP build order.
- **Supersession candidate:** The 20-task consolidated engineering task list with progress estimates provides concrete execution tracking that was not present in prior specs.

---

## Issue Candidates

| Title | Type | Draft | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| Path2Vec trainer: implement PyTorch MSE loss with neighbor regularization and negative sampling | issue-candidate | `docs/intake/issue-drafts/TB-001-path2vec-trainer-implementation.md` | graph-embeddings, path2vec, pytorch | rpp/embed module | Reference code in response Section 7.3 ready to implement as `rpp/embed/train_path2vec.py` |
| MCDA weight calibration: empirically calibrate b1-b8 weights via margin loss on human-audited dev set | issue-candidate | `docs/intake/issue-drafts/TB-002-mcda-weight-calibration.md` | mcda, weights, calibration | rpp/wsd module | Default weights [0.35, 0.25, 0.15, 0.15, 0.07, -0.02] are uncalibrated starting point; margin loss calibration script needed |
| ALIGN-SIM stress test suite: implement synonym swap, antonym flip, paraphrase, word-order, distractor injection | issue-candidate | `docs/intake/issue-drafts/TB-003-align-sim-stress-tests.md` | evaluation, semantic-robustness, stress-tests | rpp/eval module | 5 stress tests defined but not implemented; gate requires ≥4/5 simultaneous pass |
| CLIP image prototypes: ETL for 100 imageable WordNet synsets with ViT-B/32 vectors | issue-candidate | `docs/intake/issue-drafts/TB-004-clip-image-prototypes-etl.md` | multimodal, clip, image-encoder | rpp/modal/image module | "Simple ETL producing CLIP vectors for 100 imageable concepts" specified but not implemented |
| YAMNet audio prototypes: ETL for 50 audio event concepts with YAMNet vectors | issue-candidate | `docs/intake/issue-drafts/TB-005-yamnet-audio-prototypes-etl.md` | multimodal, yamnet, audio-encoder | rpp/modal/audio module | "Simple ETL producing YAMNet vectors for 50 audio events" specified but not implemented |
| Cross-lingual Spanish bootstrap: MT→candidates + WSI purification + Procrustes alignment | issue-candidate | `docs/intake/issue-drafts/TB-006-cross-lingual-spanish-bootstrap.md` | cross-lingual, spanish, mt, wsi, procrustes | rpp/embed, rpp/wsd | "MT→candidates, synset SIF scoring, WSI purification; export bilingual mapping table" recipe defined but not implemented |
| OpenAI function-call codec: bundle→function-call JSON and function-call→bundle adapter | issue-candidate | `docs/intake/issue-drafts/TB-007-openai-function-call-codec.md` | codec, openai, function-calls | rpp/codec/openai module | "Add a codec that emits function-call JSON for two host models" specified but not implemented |
| llama.cpp codec: bundle→chat format and chat→bundle adapter | issue-candidate | `docs/intake/issue-drafts/TB-008-llamacpp-codec-adapter.md` | codec, llamacpp, local-llm | rpp/codec/llamacpp module | "Add a codec for llama.cpp" specified but not implemented |
| Semantic cache fingerprint schema: define and implement MLACS fingerprint with Contextual Modality Map | issue-candidate | `docs/intake/issue-drafts/TB-009-mlacs-semantic-cache-fingerprint.md` | mlacs, cache, fingerprint | rpp/mlacs module | "MLACS even names a Contextual Modality Map inside the fingerprint" — schema not yet defined |
| DHT swarm discovery: libp2p/Kademlia DHT for CID-based tile discovery and gossip protocol | issue-candidate | `docs/intake/issue-drafts/TB-010-dht-swarm-discovery.md` | swarm, dht, gossip, libp2p | rpp/swarmd module | "DHT/gossip, policy for anonymized sharing" specified but not implemented; libp2p or Kademlia not yet chosen |
| Bundle CID computation: canonical JSON/CBOR + multihash sha2-256 → CIDv1 implementation | issue-candidate | `docs/intake/issue-drafts/TB-011-bundle-cid-computation.md` | cid, content-addressing, canonicalization | rpp/cid module | "Canonicalization uses JSON-to-CBOR normalization (RFC 8949) and a stable map key order; a multihash (sha2-256) produces CIDv1" — implementation pending |
| Train-o-Matic weak supervision pipeline: auto-labeling via lexicons + pattern rules + graph propagation | issue-candidate | `docs/intake/issue-drafts/TB-012-train-o-matic-weak-supervision.md` | weak-supervision, training-data, auto-labeling | rpp/training module | "Auto-labeling via existing lexicons, high-precision pattern rules, and graph-based propagation" approach defined; implementation pending |
| CROSS-MODEL AGREEMENT GATE: project two encoders to RPP via Procrustes, compare cosine on 500 examples | issue-candidate | `docs/intake/issue-drafts/TB-013-cross-model-agreement-gate.md` | evaluation, interop, procrustes | rpp/eval module | Gate: "cosine ≥ 0.7 on ≥80% of sense decisions" — test harness not yet implemented |
| TRM micro-reasoner interface: `trm.step(bundle) → bundle'` with role/relation invariants and safety checks | issue-candidate | `docs/intake/issue-drafts/TB-014-trm-micro-reasoner-interface.md` | trm, micro-reasoner, concept-graph | rpp/trm module | "Integrate your TRM as the first stepwise reasoner operating on RPP graphs" — interface not yet defined |
| SWARM REPUTATION METRICS: operationalize "repeatable utility" and "low drift" for shard adoption | issue-candidate | `docs/intake/issue-drafts/TB-015-swarm-reputation-metrics.md` | swarm, reputation, metrics | rpp/swarmd module | "Use provenance and proof not popularity for shard promotion" — no concrete metric definitions for "repeatable utility" or "low drift" |
| Vocabulary governance: OBO Foundry principles (stable IDs, textual definitions, relation discipline) | issue-candidate | `docs/intake/issue-drafts/TB-016-vocabulary-governance-obo-foundry.md` | governance, ontology, obo-foundry, versioning | rpp/registry module | "Use OBO Foundry principles for vocabulary governance: stable IDs, textual definitions, relation discipline, versioning" — governance policy not yet codified |
| FastAPI service + OpenAPI spec for all 6 endpoints: encode, align, disambiguate, package, explain, codec | issue-candidate | `docs/intake/issue-drafts/TB-017-rpp-fastapi-service.md` | api, fastapi, openapi | rpp/ registry+embed+wsd+bundle+codec modules | "encode: POST /v1/encode", "align: POST /v1/align", "disambiguate: POST /v1/disambiguate", "package: POST /v1/package", "explain: POST /v1/explain", "codec: POST /v1/codec/{target}" — endpoints defined but service not implemented |
| WordNet graph seed: build adjacency with HYPERNYM/HYPONYM/ANTONYM/PART_OF/HAS_PART relations, compute Katz/Path similarities | issue-candidate | `docs/intake/issue-drafts/TB-018-wordnet-graph-katz-similarity.md` | graph, wordnet, katz, path-similarity | rpp/graph module | "Build the adjacency (all relation types initially equal weight), compute Katz/Path distances with decay" — implementation pending |
| SKATEBOARD DEMO: end-to-end "She bought a camera yesterday" with image region → bundle → NL + sigil render | issue-candidate | `docs/intake/issue-drafts/TB-019-skateboard-demo-e2e.md` | demo, skateboard, e2e, multimodal | rpp/wsd, rpp/bundle, rpp/modal/image, rpp/codec modules | "CLI + notebook that runs the 'camera purchase' example end-to-end and prints the bundle + explanations, then renders NL + a sigil" — demo not yet runnable |
| CRDT library selection: choose between Yjs, Automerge, or lighter alternative for mutable overlay merge | issue-candidate | `docs/intake/issue-drafts/TB-020-crdt-library-selection.md` | crdt, distributed-state, mutable-overlay | activation-store, rpp/swarmd modules | "CRDT governs mutable overlays ONLY" — no specific library named; Yjs vs Automerge vs lighter alternative not yet chosen |

---

## Project Board Suggestions

- **Area:** Entif/Rosetta RPP (Rosetta Pasigraphy Protocol) — semantic interop layer
- **Cycle:** MVP Build (Phases 1-8 priority)
- **Status:** Ready to queue — this spec is the canonical RPP design document; 20 discrete tasks with progress estimates provided
- **Blocked by:** None — this is the design authority; implementation can begin immediately
- **Parallelization notes:**
  - rpp/schema, rpp/cid, rpp/registry can all start immediately (no dependencies)
  - rpp/graph and rpp/embed can parallelize after rpp/schema + rpp/registry
  - rpp/wsd and rpp/bundle can parallelize after rpp/graph is stable
  - rpp/align depends on rpp/embed (needs prototype vectors)
  - rpp/modal/image and rpp/modal/audio can parallelize after rpp/embed
  - rpp/codec/openai and rpp/codec/llamacpp depend on rpp/bundle
  - rpp/eval depends on all core packages being green
  - rpp/trm and rpp/mlacs depend on rpp/wsd + rpp/bundle
  - rpp/swarmd depends on rpp/cid
  - rpp/training ETL can run independently once schemas are stable

---

## Open Questions

1. **CRDT library selection:** Which specific CRDT library is appropriate for the mutable overlay use case in activation-store and swarmd? Yjs? Automerge? Something lighter? What are the performance vs. correctness tradeoffs for this use case?
2. **MCDA weight calibration protocol:** What is the exact human-audited dev set for calibrating MCDA weights? How many examples? Who annotates? What is the margin loss formulation?
3. **CLIP model variant:** Which CLIP variant to use — OpenAI's original ViT-B/32, or a newer open-weight variant (e.g., OpenCLIP, SigLIP)? What are the license implications?
4. **YAMNet vs. custom audio encoder:** Is YAMNet sufficient for the MVP audio prototype, or should we use a more recent model (e.g., AudioCLIP, BEATs)? What is the inference cost budget?
5. **Bundle CID vs. IPFS:** Should CIDs be stored in IPFS (with actual content pinning) or just use the CID as a content-addressed identifier without IPFS hosting?
6. **TRM interface boundary:** What is the exact interface contract for `trm.step(bundle) → bundle'`? What invariants must hold? How are safety checks enforced?
7. **MLACS cache eviction policy:** When the semantic cache is full, what is the eviction policy? LRU? LFU? Activity-based? Per-modality?
8. **Swarm DHT implementation:** libp2p (mature but heavy) vs. a simpler Kademlia implementation — what is the right tradeoff for a solo-developer MVP?
9. **Procrustes anchor pair harvest:** How are "high-confidence matches" harvested to compute the orthogonal Procrustes map? Is there a bootstrapping set?
10. **SimLex-999/RG-65 baseline:** What are the exact Spearman correlation thresholds for gating? Who publishes the expected graph-fusion advantage (15% above text-only)?
11. **Cross-model agreement threshold:** 0.7 cosine on 80% of 500 examples — is this the right threshold? Derived from prior experiments or a guess?
12. **SBERT vs. E5 encoder choice:** The reference code uses `all-MiniLM-L6-v2` but the spec mentions E5 as SOTA — which is the actual default for the MVP?
13. **llama.cpp integration path:** Is there a specific llama.cpp server API format (烤 http completion) to target for the codec adapter?
14. **Bundle size optimization:** Canonical JSON/CBOR for every bundle could be verbose — is there a compression strategy or short-form CID alias system?
15. **NERDm adapter for RPP artifacts:** Should RPP artifact manifests use NERDm JSON-LD format (as specified in OMC spec Section 7.4)?

---

## Tags

`rpp`, `pasigraphy`, `concept-rosetta`, `word-sense-disambiguation`, `wordnet`, `babelnet`, `verbatlas`, `syntagnet`, `graph-embeddings`, `path2vec`, `katz-similarity`, `procrustes-alignment`, `personalized-pagerank`, `mcda`, `semantic-stress-tests`, `align-sim`, `clip`, `yamnet`, `multimodal`, `cross-lingual`, `mixture-of-concepts`, `vendor-agnostic`, `content-addressing`, `cid`, `swarm`, `dht`, `gossip`, `mlacs`, `semantic-cache`, `eval-harness`, `deep-research`, `metrology`, `gauge-blocks`, `attractor-basins`, `ontological-mixture-of-concepts`, `Entif`, `Rosetta`

---

*Extracted by docs-intelligence subagent · 2026-04-25 · ~3732 lines processed → ~125 discrete findings · 20 issue candidates · 15 open questions*
