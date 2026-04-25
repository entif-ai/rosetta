# Docs Intelligence Extraction

**Source:** `/Users/cr8s/.openclaw/workspace/Code/rosetta/docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`

**Extraction date:** 2026-04-25

---

## Source

- **Path:** `docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md`
- **Title:** Cognitive Tiles and Swarm Gnosis — A Tile-First Knowledge Framework
- **Date evidence:** 2025-10-24 (from filename)
- **Authority tier:** RFC — design specification; not yet implemented
- **Freshness:** 2025-10-24 — approximately 6 months old
- **Word count:** ~8,000–10,000 words (153KB document)
- **Extractor:** subagent:cognitive-tiles-swarm-gnosis
- **Extraction date:** 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This RFC proposes **Cognitive Tiles** — self-describing, content-addressed Merkle-DAG objects that carry provenance, proofs, and lineage — and **Swarm Gnosis**, a decentralized P2P knowledge substrate built on Kademlia DHT + GossipSub for discovery, routing, and replication. The framework covers: tile schema and canonicalization (RFC 8785 JSON canonicalization, CID/multihash), swarm design (DHT + gossip hybrid, pinning, anti-entropy), versioning/evolution (append-only DAG, CRDT vs explicit merge, supersedence markers), trust/provenance (Ed25519 signatures, attestations, receipts, WASM sandboxing, ZK proofs), retrieval with economic decoding (expected free energy agent policies, GraphRAG), pasigraphy/EGC controlled language (AMR/UCCA/OWL/SBVR/ACE/Ithkuil-inspired), codec adapters (VQ-VAE optical slugs, symbolic slugs, alias testing), security (Sybil resistance via staking, rate limiting, reputation), governance/licensing (embedded license fields, public vs private swarms), and a 10-category evaluation harness. The document is a comprehensive architectural RFC with no current implementation.

---

## Goals And Intent

- Break knowledge into self-contained, content-addressed tiles that carry their own context, proofs, and lineage
- Build a decentralized "Swarm Gnosis" substrate: a swarm of agents that can discover, verify, and evolve knowledge tiles collaboratively
- Make meaning portable, auditable, and economically decodable across agents
- Attach provenance metadata and proof-carrying data to enable trust and reuse
- Implement selective attention with economic decoding via expected free energy agent policies
- Provide a controlled representational language (EGC) for canonical machine-readable knowledge

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Tile canonicalization via RFC 8785 JSON | "We adopt a canonical JSON encoding (following RFC 8785)" | tile-schema | must-have | Deterministic key ordering, normalized numbers, whitespace strip |
| CIDv1 multihash content addressing | "self-describing CIDs (Content IDs) as in IPLD/IPFS: identifier encodes hash function + codec" | tile-schema | must-have | Hash agility; SHA-256 default; future quantum-resistant upgrade path |
| Merkle-DAG append-only version graph | "Each modification is a new node linked to parent, forming immutable chain of evolution" | versioning | must-have | Git/IPFS-inspired; natural deduplication |
| Kademlia DHT + GossipSub hybrid discovery | "hybrid of Kademlia DHT and gossip protocols for discovery and routing" | swarm-network | must-have | O(log N) DHT lookups; GossipSub for fan-out dissemination |
| Pinning + cache with garbage collection | "nodes periodically run garbage collection to discard unpinned, least-recently-used content" | swarm-storage | must-have | Anti-entropy protocol for peer reconciliation |
| Supersedence markers + deprecation tiles | "A deprecation tile is a small tile that marks another tile as deprecated" | versioning | must-have | Index tiles for stable latest-version pointers (IPNS-style) |
| Ed25519 content signatures | "Tiles are signed by their creators using digital signatures (we use Ed25519 by default)" | trust-provenance | must-have | Ed25519: 32-byte keys, 64-byte signatures |
| Attestations and receipts | "An attestation is like a certificate... a receipt-style trace records an agent performed an operation" | trust-provenance | should-have | Third-party certificates, verification event logs |
| WASM sandbox for witness code execution | "WebAssembly sandboxing to run untrusted code with no access to host environment" | trust-provenance | must-have | CPU/memory limits; controlled API |
| Expected free energy (EFE) retrieval policy | "expected free energy (EFE) quantifies expected reduction in uncertainty from an action" | retrieval-agent | should-have | Active inference / rational metareasoning basis |
| GraphRAG integration | "our approach can return tile URIs (CIDs) and concise descriptors rather than full passages on first pass" | retrieval-agent | should-have | Two-stage retrieval: pointer + drill-down |
| EGC controlled language with deterministic round-tripping | "EGC will be deterministic: given a set of triples, exactly one valid EGC string" | pasigraphy | should-have | AMR/UCCA/OWL/SBVR/ACE inspiration; Ithkuil precision goal |
| Codebook alias collision testing for slugs | "During codec evaluation, we perform collision tests — feed in large corpora to see if distinct inputs yield same slug" | codec-adapters | must-have | Zero-collisions target; alias rate metric |
| VQ-VAE optical slug codec (≤10× near-lossless) | "VQGAN and DALLE's dVAE have shown images can be compressed 20×–40× with minimal perceptual loss" | codec-adapters | should-have | Target: ≤10× size with near-lossless fidelity |
| Sybil resistance via staking/economic cost | "nodes may need to stake a small amount to perform certain actions (like advertising large batch of tiles)" | security | must-have | PromptChain-inspired token mechanics |
| Rate limiting and DoS protection | "token bucket style limits on how many queries per second a node handles" | security | must-have | |
| Reputation system for tiles and identities | "Each tile or identity can have a reputation score... computed from verification failures" | security | should-have | Web-of-trust model |
| Embedded license metadata per tile | "Each tile's metadata includes a license field (e.g. CC-BY-4.0, MIT, All Rights Reserved)" | governance | must-have | Attribution propagation on derivation |
| Public vs private swarm governance model | "In a public swarm, anyone can join; governance minimal. In private, centralized admin controls membership" | governance | should-have | Enterprise SSO/ACL overlay capability |
| Evaluation harness: discovery latency, replication depth, verification throughput, decode latency, cache hit rates, alias rate | "10-category evaluation plan" | evaluation | must-have | Automated harness; reference implementation |
| ZK proofs for privacy-preserving verification (optional) | "A tile can carry a ZK-proof that a certain property holds without revealing all details" | trust-provenance | future | SNARK verification ~10ms; not immediate |
| CRDT tile support (optional merge mode) | "we could employ CRDT-type tiles (e.g. a tile whose payload is a G-Set) which would merge automatically" | versioning | optional | Deterministic auto-merge for primitive types |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Motivation | content-addressing, provenance, proof-carrying | cognitive-tiles, swarm-gnosis | technology | Cognitive Tiles are IPFS-like content-addressed tiles with Merkle-DAG structure; Swarm Gnosis is the P2P substrate using Kademlia + GossipSub | "Cognitive Tiles address this by breaking knowledge into self-contained, content-addressed 'tiles' that carry their own context, proofs, and lineage" | Align with existing Rosetta IPLD/CID work if any exists; this is a parallel architectural track | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Tile Schema and Canonicalization | canonicalization, rfc8785, cid, multihash | tile-schema, merkle-dag | requirement | Every tile must use RFC 8785 canonical JSON for deterministic hashing; CIDv1 encoding with codec+hash function prefix | "We adopt a canonical JSON encoding (following RFC 8785)... CID encodes hash digest and codec" | Add RFC 8785 canonicalization to Rosetta tile schema specification; adopt IPLD CIDv1 | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Tile Schema and Canonicalization | tile-structure, header-payload | tile-schema | requirement | Tile must have: header (type, timestamp, author ID, license) + payload (content/slug, parent CIDs, proof/witness, signatures) | "Each tile contains a header... and a payload which may include: (a) core content or latent slug, (b) links to parent/source tiles, (c) proof/witness data, (d) digital signatures" | Define Rosetta tile schema with explicit header/payload separation; consider existing Rosetta receipt/tile formats | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Tile Schema and Canonicalization | hash-agility, multihash, future-proofing | tile-schema | decision | Choose multihash content addressing over fixed-hash for hash agility (upgrade to SHA-512 or quantum-resistant later without breaking links) | "multihash/multicodec scheme provides hash agility — e.g. a tile can be upgraded to a stronger hash algorithm while still being distinguishable" | Rosetta tile spec should adopt multihash; document supported hash algos | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Swarm Design: Discovery, Routing and Replication | kademlia, dht, gossipsub, p2p | swarm-network | technology | Swarm uses Kademlia DHT (libp2p) for CID-key lookups + GossipSub for fan-out dissemination of new tile announcements | "we leverage a hybrid of Kademlia DHT and gossip protocols... GossipSub ensures reliable, fan-out dissemination without flooding" | Evaluate whether Rosetta's current network layer uses libp2p or has a different design; document gap | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Swarm Design | semantic-indexes, tagging, discovery | swarm-network | technology | DHT supports semantic indexes via tag→CID mappings; gossip for emergent/trending topics; controlled vocabularies required for hash-based index keys | "for a given tag or keyword, a subset of peers act as indexers storing mappings from tag → list of CIDs" | Rosetta should define canonical tag/glyph vocabulary for semantic indexing; coordinate with OMOC concept taxonomy | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Swarm Design | pinning, caching, gc, anti-entropy | swarm-storage | technology | Nodes cache retrieved tiles and advertise as providers; pinning for persistence; garbage collection of unpinned LRU content; anti-entropy protocol for peer reconciliation via Merkle tree hash sketches | "nodes periodically run garbage collection to discard unpinned, least-recently-used content... anti-entropy protocol to continuously reconcile data between peers" | Design Rosetta storage layer with pin/unpin semantics; consider anti-entropy sync mechanism | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Swarm Design | http-fallback, gateway, peering | swarm-network | decision | HTTP peering as fallback: some nodes expose RESTful HTTP APIs (`tile.get(CID)`) as gateways for lightweight clients | "We also allow HTTP peering as a fallback: some nodes may expose HTTP APIs (RESTful endpoints for tile.get(CID) etc.)" | Rosetta should support HTTP gateway mode for integration; align with existing API surface | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Versioning and Knowledge Evolution | version-dag, append-only, crdt-vs-explicit | versioning | decision | Append-only version graph (Git-like) preferred over CRDT auto-merge for semantic knowledge; explicit merge tiles with two parents for reconciliation; CRDT tiles (G-Set) available as optional mode for primitive types | "We opt for a more Git-like model where concurrent branches can exist and a deliberate merge operation (which produces a new tile) is used to reconcile them" | Rosetta version model should follow explicit merge DAG, not CRDT auto-merge; align with existing receipt/artifact versioning | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Versioning and Knowledge Evolution | supersedence-markers, deprecation, index-tiles | versioning | requirement | Supersedence via `supersedes` field in new tiles pointing to prior CID(s); deprecation tiles to mark tiles invalid; index tiles as stable latest-version pointers (IPNS-style mutable names) | "every tile can carry a 'supersedes' field listing which prior tile(s) it replaces... a deprecation tile marks another tile as deprecated" | Rosetta artifact promotion system needs supersedes/deprecation tracking; index tiles as a pattern for stable references | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Versioning and Knowledge Evolution | human-readable-change-summary, diff | versioning | requirement | New version tiles should include human-readable change summary (like Git commit message) + optional reverse delta for machine-computable diffs | "the creator is encouraged to include a brief change summary in the metadata (analogous to a Git commit message or Wikipedia edit summary)" | Rosetta artifact updates should carry change summaries; consider diff/delta format for structured content | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Trust, Provenance, and Verification | ed25519-signatures, content-authentication | trust-provenance | requirement | All tiles signed by creators with Ed25519 (32-byte keys, 64-byte signatures); signatures give authenticity and enable web-of-trust | "Tiles are signed by their creators or curators using digital signatures (we use Ed25519 by default for its strong security and speed)" | Rosetta tile format must support Ed25519 signatures; current receipt system may need signature coverage audit | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Trust, Provenance, and Verification | attestations, receipts, third-party-verification | trust-provenance | technology | Attestations: third-party certificates ("tile X has been peer reviewed"); receipts: signed records of verification events ("Agent A verified tile X on date") | "an attestation is like a certificate or statement, possibly issued by a third party... a receipt-style trace records an agent performed some operation" | Rosetta receipts are similar to these receipts; consider attestation tile type for third-party validation | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Trust, Provenance, and Verification | provenance-metadata, witness-packages | trust-provenance | requirement | Tiles carry provenance metadata: `origin` (source datasets/prior tiles), `method` (protocol/code ID), `environment` (software versions, parameters); witness packages (Docker image hashes, notebooks) as evidence | "provenance metadata includes fields like origin, method, environment... aligning with initiatives in scientific computing to package and share entire workflow (data + code + environment)" | Rosetta source episode should carry origin/method/environment fields; align with existing provenance requirements | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Trust, Provenance, and Verification | wasm-sandbox, untrusted-code | trust-provenance | requirement | Witness code (scripts to recompute results) executed in WASM sandbox with CPU/memory limits and no host access unless explicitly granted | "WebAssembly sandboxing to run untrusted code with no access to the host environment unless explicitly granted... code can't do I/O or harm unless host explicitly permits it" | Rosetta skillpack importer or adapter certification harness may need WASM sandbox for untrusted code execution | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Trust, Provenance, and Verification | verification-levels, quarantine, risk-management | trust-provenance | decision | Three-tier: accept-on-trust (high-authority signed + attestations), verify-on-demand (critical or unknown origin), quarantine (failed verification); agents maintain quarantine list | "if a tile comes from a highly trusted source... agent might accept it on trust without re-running all proofs. If content is critical or from unknown source, the agent should verify end-to-end" | Rosetta agent policy should implement trust tiers; define verification level expectations per artifact type | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Trust, Provenance, and Verification | zk-proofs, privacy-preserving-verification | trust-provenance | technology | Optional ZK-SNARK proofs: prove "I applied algorithm A to dataset committed in hash H and got result R" without revealing dataset; tile includes proof + verification key | "A tile could state a conclusion that depends on some confidential data; it could include a ZK proof that 'I applied algorithm A to dataset committed in hash H and got result R' without revealing the dataset" | Future extension; current Rosetta implementation not ready for ZK; track as future research | low |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Retrieval and Agent Policies for Economic Decoding | expected-free-energy, active-inference, value-of-information | retrieval-agent | technology | Agents use expected free energy (EFE) to score candidate tiles: expected_gain/cost; pick highest scores first; this is active inference / rational metareasoning | "expected free energy (EFE) quantifies the expected reduction in uncertainty (and gain in utility) from an action... score = expected_gain / cost" | Rosetta agent retrieval policy could implement EFE scoring; align with NOT LAME query router design | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Retrieval and Agent Policies | graphrag, two-stage-retrieval, pointer-then-drill-down | retrieval-agent | technology | GraphRAG approach: return CID + short descriptor (200-byte summary) on first pass; agent decides which to drill into; reduces context window and latency | "our approach can return tile URIs (CIDs) and concise descriptors rather than full passages on first pass... two-stage process reduces cognitive load and context window size" | Rosetta retrieval should implement pointer-then-drill-down pattern; CIDs + summaries as first-class retrieval units | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Retrieval and Agent Policies | economic-cost-model, telemetry-reinforcement-loop | retrieval-agent | decision | Agent has budget (time/tokens/currency); decoding cost includes API calls, CPU cycles, network bandwidth; telemetry logs feedback after each task to update tile priors (multi-armed bandit) | "Agents log and possibly pay for these actions (in research simulation payment could be abstract)... agent learns which tiles 'pay for themselves'" | Rosetta should instrument cost tracking for retrieval decisions; align with NOT LAME context compiler | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Pasigraphy Surface: Controlled Language for Meaning | egc, controlled-language, amr-ucca-owl-sbvr-ace | pasigraphy | technology | EGC (Epistemic Graph Code): controlled representational language; draws on AMR (sentence→graph), UCCA (cross-linguistic), OWL/RDF (triples), SBVR (structured English), ACE (unambiguous controlled English), Ithkuil (maximal precision/conciseness) | "We draw on research in controlled natural languages and semantic representations such as AMR, UCCA, OWL, SBVR, and ACE... Ithkuil shows it's possible to compress complex thoughts into very compact words" | Rosetta should evaluate EGC for standardized knowledge representation; AMR-like graph format may align with Rosetta's knowledge graph concepts | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Pasigraphy Surface | deterministic-round-tripping, no-ambiguity | pasigraphy | requirement | EGC must be deterministic: same triples always produce identical EGC string and CID; strict grammar (no pronouns without reference, explicit relations); no codebook collisions | "We will implement a parser and pretty-printer for EGC that can parse an EGC string into a graph (triples) and serialize a graph back to the same string... no collision in codebooks" | Rosetta formal knowledge representation must ensure deterministic encoding; EGC parser/pretty-printer needed | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Codec Adapters | optical-slugs, symbolic-slugs, vq-vae, vqgan | codec-adapters | technology | Pluggable mint/hydrate codecs: optical slugs for visual data (VQ-VAE/VQGAN compress images 20×–40×, target ≤10× near-lossless); symbolic slugs for text/knowledge (vector quantization on language model latents) | "using VQ-VAE, an image can be encoded as a sequence of discrete codes... VQGAN and DALLE's dVAE have shown images can be compressed 20×–40× with minimal perceptual loss" | Rosetta may need codec adapters for image/audio content; VQ-VAE approach for text summarization as symbolic slug candidate | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Codec Adapters | alias-collision-testing, codec-evaluation | codec-adapters | requirement | Codec evaluation must test alias rate: feed large test corpus, count collisions (distinct inputs→identical slug); target zero collisions; record alias rate metric | "During codec evaluation, we perform collision tests – feed in large corpora to see if distinct inputs ever yield the same slug... if collisions found, codebook may need enlargement" | Any compression/codec scheme in Rosetta must include alias collision testing as part of acceptance criteria | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Codec Adapters | modular-pluggable-codecs, codec-registry | codec-adapters | decision | Codecs are modular: tile metadata includes codec ID/hash; agents with codec can decode; community codecs can plug in with unique IDs; old codecs preserved for backward compatibility | "the system could adopt a higher compression ratio for less critical data... we plan to supply a suite of default codecs and allow community-developed ones to plug in" | Rosetta codec registry should support versioning and unique identification; pluggable adapter pattern | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Security and Abuse Resistance | sybil-resistance, staking, economic-barriers | security | requirement | Sybil countermeasures: identity reputation (new nodes start with no trust), token stake for actions (proof-of-stake), rate limits, web-of-trust / proof-of-personhood, DHT node ID via proof-of-work | "nodes may need to stake a small amount of a token or resource to perform certain actions... The staking requirements create meaningful barriers against low-quality submissions" | Rosetta network layer must account for Sybil risk; implement stake/cost for content publishing if decentralized | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Security and Abuse Resistance | rate-limiting, dos-protection, token-bucket | security | requirement | DoS protection: token bucket rate limits per peer; concurrent request limits on expensive services (proof verification); proof-of-work for service access; libp2p peer scoring to drop bad actors | "token bucket style limits on how many queries per second a node handles... libp2p uses peer scoring to punish those who send bad messages" | Rosetta API endpoints should implement rate limiting; track per-identity reputation | must-have |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Security and Abuse Resistance | reputation-system, trust-scores | security | decision | Tile/identity reputation scores: community curation (upvote/downvote) or automatic (verification failure rate); reputation tiles signed by oracles; high-rep nodes get bandwidth priority and trust skip | "a well-regarded security researcher tile says 'tile X contains malware'... many nodes will honor this and isolate those" | Rosetta should track source/author reputation; integrate with trust scoring (cf. OMOC trust model) | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Security and Abuse Resistance | eclipse-attack, diversity-requirements | security | risk | Eclipse attack: Sybil nodes control all replicas near a key; mitigation: store multiple replicas, cross-check multiple sources, gossip for popular content availability even if DHT subverted | "If an attacker controls many nodes near a key, they might be the ones storing that content and could refuse to provide it (eclipse attack). Mitigations include making the DHT store multiple replicas" | Rosetta swarm should mandate minimum replica diversity; cross-source verification before accepting content | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Governance and Licensing | embedded-license-field, attribution-propagation | governance | requirement | Each tile has license field (CC-BY-4.0, MIT, All Rights Reserved, etc.); on derivation, attribution propagated as "sources" list in metadata; automated compliance for license constraints | "When a new tile is created that substantially derives from others, default behavior is to include references to those source tiles in the metadata" | Rosetta artifact schema must include license field; promotion gate should verify license propagation | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Governance and Licensing | public-vs-private-swarms, enterprise-acl | governance | decision | Public swarm: open participation, minimal governance, upgrade via working group/consensus; Private swarm: admin-controlled membership, SSO/OAuth integration, ACL overlay, encryption for confidentiality | "In a private swarm... integration with enterprise authN/Z is crucial... a tile can specify an encryption scheme or required clearance to read" | Rosetta swarm deployment modes should distinguish public vs private; enterprise mode needs ACL/gatekeeping | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Evaluation Plan and Benchmarking Harness | evaluation-categories, 10-category-plan | evaluation | requirement | 10 evaluation categories: (1) discovery latency, (2) replication depth under load, (3) verification throughput, (4) decode latency/accuracy, (5) cache hit rates, (6) alias rate for codebooks, (7) economic evaluation (cost-benefit), (8) swarm scalability/failure modes, (9) GraphRAG query performance, (10) limitations/tripwires | "comprehensive evaluation plan with an automated harness to measure key performance and robustness metrics" | Rosetta should define analogous benchmark categories; align with existing testing/regression requirements | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Limitations and Future Work | bootstrapping-trust, new-user-challenge | risk | Limitation: System assumes initial trust seeds; new users may struggle without established web-of-trust; risk of echo chambers | "The system assumes some initial trust seeds (trusted identities or attestations) to get started. In a completely open network, new users might struggle to know which tiles or signers to trust" | Rosetta bootstrap strategy must address initial trust; consider trusted seed identities or institutional anchors | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Limitations and Future Work | metadata-bloat, scalability | risk | Limitation: Every tile includes proofs, signatures, receipts; metadata can grow large; heavy ZK proof generation is slow and expensive | "A tile might end up referencing many sources or carrying large proof blobs... heavy use of ZK proofs is currently limited by proof generation cost" | Rosetta tile size budgets should be defined; ZK proofs not near-term viable | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Limitations and Future Work | privacy-vs-transparency, immutability-gdpr | risk | Limitation: Transparency vs privacy conflict; immutable content-addressed network incompatible with GDPR right-to-erasure; can delist but not delete | "Content-addressing is immutable and content can persist indefinitely if pinned. Removing data from a content-addressed network is hard; you can delist but not truly delete" | Rosetta must address right-to-erasure; immutable network conflicts with GDPR compliance; consider encryption scope | high |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Limitations and Future Work | economic-incentives-not-implemented | risk | Limitation: No real token/payment system implemented; relies on altruistic nodes; unpopular data may be garbage-collected; Filecoin integration as future extension | "We have not implemented a real token or payment system... without economic incentives, altruistic nodes must store and serve data" | Rosetta persistence strategy must account for no economic incentives at this stage; rely on voluntary pinning / institutional archival | medium |
| 2026-04-25 | docs/RFCs/20251024 - RFC - Rosetta - Cognitive Tiles and Swarm Gnosis.md | Limitations and Future Work | merge-conflicts-no-central-authority | risk | Limitation: Decentralized model means no single truth; controversial content creates many forks; consensus on best version may not be reached; reintroduces centralization pressure | "Our system doesn't enforce one truth – which is good for diversity, but also means knowledge consumers might get contradictory tiles" | Rosetta should define conflict resolution policy; consider community governance for canonical version selection | medium |

---

## Components And Technologies

- **IPLD/CIDv1** — content addressing via multihash/multicodec; hash agility for future algorithm upgrades
- **libp2p** — P2P networking stack; Kademlia DHT + GossipSub protocols
- **RFC 8785 (JCS)** — JSON Canonicalization Scheme for deterministic tile hashing
- **Ed25519** — digital signatures (32-byte keys, 64-byte signatures, fast verification)
- **WebAssembly (WASM)** — sandboxed execution environment for untrusted witness code
- **ZK-SNARKs** — optional zero-knowledge proofs for privacy-preserving verification
- **VQ-VAE / VQGAN** — vector-quantized variational autoencoders for optical slug compression
- **Active Inference / Expected Free Energy** — agent decision framework for selective retrieval
- **GraphRAG** — knowledge-graph-augmented retrieval (Microsoft pattern); two-stage pointer-then-drill-down
- **AMR / UCCA / OWL / SBVR / ACE** — semantic representation standards feeding EGC design
- **Ithkuil** — constructed language reference for maximal precision and conciseness
- **Merkle trees / Bloom filters** — anti-entropy peer reconciliation data structures
- **CRDTs (G-Set)** — optional conflict-free merge for primitive-type tiles
- **IPNS-style mutable pointers** — stable names for evolving tile versions

---

## Conceptual Claims

- Tile content addressed by CID derived from canonical JSON ensures any participant can independently verify tile integrity by recomputing the hash
- Merkle-DAG lineage (each modification = new node linked to parent) yields append-only, auditable version history similar to Git commits
- Kademlia DHT + GossipSub hybrid provides O(log N) DHT lookups plus timely fan-out for new/emergent content
- CRDT auto-merge is inappropriate for semantic knowledge (blind merges could produce incoherent results); explicit merge tiles with dual parentage are preferred
- Ed25519 signatures enable trust establishment in trustless P2P networks without centralized CA infrastructure
- WASM sandbox provides safe execution of untrusted witness code with no host access unless explicitly granted
- Expected free energy agent policies implement rational selective attention: decode only tiles that reduce uncertainty enough to justify their cost
- GraphRAG two-stage retrieval (pointer first, drill-down on demand) reduces context window usage and latency vs bulk-fetch RAG
- EGC deterministic round-tripping ensures two agents independently encoding the same knowledge produce identical CIDs, preventing duplication
- VQ-VAE optical slugs achieve ≤10× near-lossless compression for images, enabling lightweight tile propagation
- ZK proofs allow verification of computation correctness without revealing inputs, enabling privacy-preserving attestation
- Sybil resistance requires economic cost (staking, proof-of-work) not just identity reputation alone
- Immutable content-addressed networks conflict with GDPR right-to-erasure; can delist but not delete

---

## Dependencies And Sequencing

- **Prerequisite: RFC 8785 JSON canonicalization** must be specified before tile hashing schema can be finalized
- **Prerequisite: CIDv1 multihash spec** adoption required before implementing tile content addressing
- **Depends: libp2p integration** for swarm networking; must be available before swarm can operate
- **Depends: WASM sandbox infrastructure** must be in place before witness code execution is possible
- **Depends: Trust seed identities** must be bootstrapped before new nodes can establish reputation
- **Depends: EGC grammar formalization** before pasigraphy surface can be implemented or evaluated
- **Depends: VQ-VAE codec training** before optical slug adapter can be deployed (offline training step)
- **Depends: Stable codebook generation** before symbolic slug codec can be deployed (collision testing required first)
- **Future: ZK proving infrastructure** ( Circom/plonk setup) needed before ZK proofs can be integrated
- **Future: Filecoin/incentive layer integration** for economic persistence (not in initial scope)
- **Parallel: GraphRAG index service** can be built independently once tile graph structure is defined

---

## Contradictions Or Supersession

- **Swarm Gnosis vs existing Rosetta network layer**: This RFC describes a full P2P decentralized network with DHT/gossip; current Rosetta Bootstrap uses SQLite/local storage. If Swarm Gnosis is adopted, Rosetta's network layer architecture must change significantly.
- **Immutable append-only vs GDPR right-to-erasure**: The framework explicitly acknowledges this conflict as unresolved. Rosetta must decide whether to adopt a privacy-preserving variant (encryption + access control) or accept the immutability constraint.
- **EGC deterministic language vs natural language expressiveness**: The desire for human readability (SBVR-style structured English) conflicts with maximal precision/conciseness (Ithkuil). The spec attempts to bridge but admits EGC may end up "esoteric."
- **Economic incentives not implemented vs persistence requirement**: Framework relies on altruistic nodes but acknowledges unpopular data may disappear. Rosetta must choose: accept best-effort persistence or implement incentive layer.
- **Decentralized no-single-truth vs practical knowledge convergence**: The design allows unlimited forks with no arbitration mechanism. Rosetta's goal of convergence (tapestry closure) may conflict with this freedom.

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- | --- |
| CT-001: Rosetta network layer gap — Swarm Gnosis P2P vs current SQLite/Bootstrap architecture | architecture | #84 | network, p2p, swarm, gap | CT-002 | RFC describes full P2P swarm with Kademlia + GossipSub; current Rosetta Bootstrap uses SQLite local storage; no P2P networking layer exists in current codebase. May require new `swarm-network` package. |
| CT-002: Trust bootstrap problem — new nodes have no reputation in fully open network | risk | #96 | trust, bootstrap, sybil | — | "The system assumes some initial trust seeds (trusted identities or attestations) to get started. In a completely open network, new users might struggle to know which tiles or signers to trust. Web-of-trust can take time to grow." |
| CT-003: EGC pasigraphy may be too esoteric for practical adoption — human readability vs formalism tension | risk | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-003-egc-esoteric.md` | pasigraphy, egc, ux, controlled-language | — | "Our pasigraphy aims to be both human-readable and machine-precise, but in practice it might end up being somewhat esoteric. There is a risk that it becomes like a new programming language that users have to learn." |
| CT-004: GDPR right-to-erasure conflict with immutable content-addressed storage | ethics | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-004-gdpr-erasure.md` | privacy, gdpr, immutability, legal | — | "Content-addressing is immutable and content can persist indefinitely if pinned. Removing data from a content-addressed network is hard; you can delist but not truly delete... tension between immutability and the right to be forgotten is unresolved." |
| CT-005: Economic persistence gap — no token/payment system; unpopular data may disappear | risk | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-005-persistence-gap.md` | persistence, incentives, economics | — | "We have not implemented a real token or payment system... without economic incentives, altruistic nodes must store and serve data... unpopular data gets garbage-collected everywhere." |
| CT-006: ZK proof integration not near-term viable — heavy ZK proof generation cost limits adoption | technology | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-006-zk-proofs.md` | zk-proofs, snarks, future-work | — | "heavy use of ZK proofs is currently limited by proof generation cost – producing proofs for arbitrary computations can be very slow, which might limit adoption of that feature until ZK tech improves." |
| CT-007: No arbitration mechanism for conflicting tile versions — fork resolution delegated to social process | process | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-007-no-arbitration.md` | versioning, governance, conflicts, decentralized | — | "Our system doesn't enforce one truth – which is good for diversity, but also means knowledge consumers might get contradictory tiles. Resolving that is outside the technical system (it's a social process)." |
| CT-008: VQ-VAE codebook size and alias rate must be validated before optical slugs can be trusted | validation | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-008-vq-vae-aliasing.md` | codec, vq-vae, aliasing, testing | — | "codebook size k seems to put a hard limit on the benefits... performance lags far behind... an absurd number of codebook entries would be required to catch up." — from VQ-VAE evaluation blog. Alias testing is explicitly required before deployment. |
| CT-009: WASM sandbox for witness code execution not yet implemented in Rosetta | implementation | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-009-wasm-sandbox.md` | wasm, sandbox, security, witness | — | "we employ WebAssembly sandboxing to run untrusted code with no access to the host environment unless explicitly granted" — not currently part of Rosetta skillpack importer or adapter certification. |
| CT-010: EGC formal grammar not yet specified — round-tripping depends on unambiguous grammar | spec-gap | `docs/intake/issue-drafts/2026-04-25-cognitive-tiles-swarm-gnosis-ct-010-egc-grammar.md` | egc, grammar, formalization | — | "we'll provide a formal grammar... The EGC compiler will serve as the bridge between human/agent-readable tiles and underlying formal triples" — grammar design is future work. No formal spec exists yet. |

---

## Project Board Suggestions

- **Area:** Swarm Network / Knowledge Substrate
- **Cycle:** This RFC is early-stage; it is a design specification not yet passing through Rosetta's implementation pipeline
- **Status:** RFC — no implementation; requires architecture decision before entry into sprint planning
- **Blocked by:**
  - CT-001 (network layer gap): requires architectural decision on whether to adopt P2P swarm model
  - CT-002 (trust bootstrap): requires trust seed strategy before open swarm is viable
  - CT-004 (GDPR): requires legal/privacy review before any deployment
- **Parallelization notes:**
  - EGC grammar formalization (CT-010) can proceed independently of network layer
  - VQ-VAE codec evaluation (CT-008) can proceed as offline ML experiment
  - WASM sandbox (CT-009) can be explored as a parallel research thread within adapter certification work

---

## Open Questions

1. **Does Rosetta intend to adopt P2P decentralized swarm model, or remain centralized (PostgreSQL-backed) architecture?** The Swarm Gnosis RFC describes a fundamentally different network topology than current Bootstrap/SQLite model. This is the primary architectural question.
2. **What is Rosetta's trust seed strategy?** The RFC acknowledges new nodes struggle in open networks. How does Rosetta bootstrap initial trust — institutional anchors, existing identity systems (ORCiD, Web PKI), or something else?
3. **How does Rosetta handle GDPR right-to-erasure given immutable content-addressed storage?** This is explicitly identified as unresolved in the RFC. Rosetta must make a decision if it plans to store personal/regulated data.
4. **Is EGC intended to be a Rosetta deliverable, or a research exploration?** The controlled language ambition is large and not yet formally specified. Should Rosetta allocate resources to EGC formalization?
5. **What is the strategy for economic persistence?** Without token incentives, unpopular but important knowledge may disappear. Should Rosetta seek institutional archivists (like academic libraries running pinning nodes), or accept best-effort persistence?
6. **Should Rosetta implement the two-stage GraphRAG retrieval pattern?** The RFC's pointer-then-drill-down approach aligns well with NOT LAME's query router concept. Is this a planned feature for TC-006 or a future enhancement?
7. **How does Rosetta's existing provenance model (source episodes, observations, tapestry receipts) compare to Cognitive Tiles' provenance metadata (origin/method/environment fields)?** Are these compatible or do they need reconciliation?
8. **Should Rosetta adopt IPLD/CID content addressing for its artifacts?** The RFC is a strong advocate. This would be a significant change from current file-based artifact storage.
9. **What is the expected free energy retrieval model? Is this a candidate for Rosetta agent policy implementation?** The concept is well-specified but complex. Is there an existing agent policy implementation in Rosetta to extend, or is this net new?
10. **What is the governance model for fork resolution?** If two conflicting tile branches both have credible attestations, how does an agent decide which to follow? The RFC delegates to social process — is Rosetta comfortable with that?
