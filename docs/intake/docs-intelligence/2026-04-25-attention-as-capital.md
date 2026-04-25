# Docs Intelligence Extraction

## Source

- Path: `docs/ideas/Attention-as-Capital Analytics Platform.md`
- Title: Attention-as-Capital Analytics Platform
- Date evidence: No explicit date; file in `docs/ideas/` suggesting exploratory/early-stage
- Authority tier: Batch 4 — exploratory product idea (lower authority than governance, PRD, RFC, or backlog docs)
- Freshness: Unknown; no date metadata found
- Word count: ~15,000+ (extremely large exploratory document)
- Extractor: subagent:d370ef2a-5db3-4cdb-9f1d-9caa50ad1a76
- Extraction date: 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus.

---

## Summary

This document proposes a comprehensive "Attention-as-Capital Analytics Platform" — a modular, AI-driven system that forecasts and exploits cultural trend dynamics by applying quantitative financial market analogies (volatility, momentum, liquidity, arbitrage) to social media signals. It covers: real-time multi-source data ingestion from TikTok/YouTube/Instagram/Twitter/Reddit/on-chain sources via Redpanda/Kafka; graph-based correlation using Neo4j with Leiden community detection and node2vec embeddings; inference engines incorporating Active Inference (Friston's free-energy principle), fluid dynamics virality modeling, and swarm intelligence (ACO/ABC); a full metrics design including Attention Volatility Index, momentum oscillators, half-life of attention, and back-testing framework; privacy-preserving design using anonymization, archetype abstraction, differential privacy, and GDPR/CCPA compliance; and a full technology stack (Python + Rust + Neo4j + Redpanda + self-hosted GPU). The document is extremely detailed and serves as a reference architecture and experiment roadmap. It does not reference or bind to Rosetta, Entif, NOT LAME, or any existing Rosetta artifacts — it is a standalone platform concept.

---

## Goals And Intent

- Goal: build a production-grade system that models cultural trends as a market, treating influencers as equities and engagement metrics as technical indicators
- Treats each social platform as an "exchange," each influencer as a "stock," and each content/trend metric as a "technical indicator"
- Applies quantitative trading principles to cultural data to identify undervalued attention assets and predict viral surges
- Deliverable: reference architecture + experiment roadmap for an MVP
- Explicitly avoids proprietary visualization tools (Tableau/PowerBI), preferring D3.js and open-source alternatives
- Multi-language stack: Python for ML/AI layer, Rust for performance-critical ingestion, Cypher/Neo4j for graph
- Privacy-first: black-box anonymization, archetype abstraction, differential privacy, GDPR/CCPA compliance by design
- Self-hosted GPU infrastructure preferred over cloud to avoid egress costs
- Jurisdiction-aware deployment: separate EU and US instances to satisfy GDPR data residency

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
| --- | --- | --- | --- | --- |
| Real-time multi-source ingestion layer | "streaming data pipeline... Redpanda (Kafka)... 5,000 events/second per node" — Section: Real-Time Multi-Source Data Ingestion | attention-capital / ingestor | high | Redpanda/Kafka-based; per-source ingestor microservices in Rust |
| Normalized event schema across heterogeneous sources | "{source, timestamp, content_id, author/influencer_id, text, media references, engagement metrics...}" — Section: Real-Time Multi-Source Data Ingestion | attention-capital / schema | high | Unified cultural signal schema |
| Graph database for relationship modeling | "Neo4j... labeled property graph model... nodes: Influencers, Content, Topics, Audience groups" — Section: Knowledge Graph Construction | attention-capital / graph | high | Neo4j with Leiden community detection |
| Virality modeling with state machine | "state machine... Emerging, Peaking, Saturated, Declining, Dormant" — Section: Trend Life Cycle Modeling | attention-capital / analytics | high | Derivative-threshold state classification |
| Attention market metrics (volatility, momentum, liquidity) | "Attention Volatility Index (AVI)... momentum oscillator... liquidity of attention" — Section: Attention Market Metrics | attention-capital / metrics | high | Finance-grade metric analogies |
| Back-testing framework for strategy validation | "Back-Test... historical cultural data... Return on Attention (ROA)... Sharpe ratio" — Section: Back-Testing and Strategy Validation | attention-capital / validation | high | Requires historical social media datasets |
| Privacy-preserving architecture | "black-box anonymization... differential privacy... archetype abstraction" — Section: Data Anonymization and Minimization | attention-capital / privacy | critical | Hash PII, k-anonymity archetypes, DP-SGD |
| GDPR/CCPA compliance by design | "Right to Erasure... Data Localization... Consent and Lawful Basis" — Section: Regulatory Compliance (GDPR, CCPA, etc.) | attention-capital / compliance | critical | EU/US regional separation |
| Python + Rust dual-language stack | "Python (Data & ML Layer)... Rust (Ingestion & Performance-Critical Services)" — Section: Programming Languages and Frameworks | attention-capital / stack | high | Rust async (Tokio) for ingestors; Python (PyTorch, scikit-learn) for models |
| Self-hosted GPU for deep learning | "self-hosted GPU server... NVIDIA... PyTorch Geometric" — Section: Self-Hosted GPU and Compute | attention-capital / infra | medium | For GNN training, node2vec, transformer inference |
| Dashboard with D3.js (no Tableau/PowerBI) | "D3.js... Observable or Plotly... React or Vue" — Section: Visual Design and Tools | attention-capital / dashboard | medium | Web app with WebSocket real-time updates |
| Active Inference / Free-Energy modeling | "Active Inference... Friston... minimize free energy... variational Bayesian" — Section: Active Inference (Free-Energy Principle) | attention-capital / inference | low-medium | Exploratory; continuous model self-calibration |
| Swarm intelligence (ACO/ABC) | "Ant Colony Optimization... Artificial Bee Colony" — Section: Swarm Intelligence: Ant Colony & Bee Algorithms | attention-capital / inference | low-medium | Exploratory; influence maximization, exploration/exploitation |
| Fluid dynamics virality modeling | "FluidSpread model... treat influence spread akin to fluid flow" — Section: Fluid Dynamics Analogies | attention-capital / inference | low-medium | Exploratory; differential equation models for diffusion |
| Jurisdiction-aware multi-region deployment | "EU Region Deployment... US Region Deployment... data residency" — Section: Regional Deployment Strategy | attention-capital / infra | medium | Separate EU/US instances; aggregate-only cross-region sync |
| End-to-end latency target < 5 seconds | "Goal: under 5 seconds... ingestion < 2s, processing < 1s, query < 500ms" — Section: Latency Targets | attention-capital / perf | high | Performance engineering required |
| Throughput target ≥ 50,000 events/second | "at least 50,000 events per second sustained, bursts to 100k/sec" — Section: Throughput and Scalability | attention-capital / perf | high | Requires horizontal scaling |
| No surveillance or personal targeting beyond aggregate | "not designed to single out private individuals or invade privacy" — Section: Ethical Considerations | attention-capital / ethics | critical | Explicit ethical boundary; public data only |
| Open-source stack (no vendor lock-in) | "avoid proprietary solutions like Tableau or PowerBI" — Section: Visualization Dashboards and Decision Support | attention-capital / stack | medium | D3.js, Plotly, Observable; self-hosted Neo4j |
| Multi-modal fusion for cultural data | "multi-modal learning... CLIP for image-text... audio transformers" — Section: Multi-modal Fusion | attention-capital / ml | low-medium | Text + image + video + audio embedding fusion |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | System Overview, Figure 1 | architecture, ingestion, graph, analytics, dashboard | attention-capital, real-time-pipeline | technology | Full Lambda architecture: Redpanda streaming + Neo4j graph + Python analytics + D3.js dashboard, with iterative analysis loop | "Figure 1: High-level system architecture. Data from diverse sources flows into a streaming ingestion layer, is stored in a graph database and data lake, analyzed by various engines, and finally presented on dashboards" | Design decision: adopt Lambda architecture principles for batch + streaming separation | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Data Sources and Strategic Value (TikTok) | platform-constraints, ingestion, api-limitations | tiktok, data-sources | technology | TikTok lacks open public API; requires third-party scrapers or partnership; high video volume bandwidth cost | "Lacks an open public API for full feed; requires third-party scrapers or partnership" | Plan for scraping/wrapper approach; budget bandwidth costs for video metadata | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Data Sources and Strategic Value (Twitter/X) | platform-constraints, ingestion, api-limitations | twitter, x, api-restrictions | technology | Twitter API recently restricted; real-time access requires enterprise subscription or filtered stream | "Recently restricted API; real-time access requires enterprise subscription or filtered stream" | Budget for Twitter enterprise API or accept filtered stream coverage | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Ingestion Performance and Reliability | performance, reliability, streaming | redpanda, kafka, throughput | technology | Target: 5,000 events/second per node; Redpanda/Kafka horizontal scalability via partitioning; at-least-once delivery semantics; checkpointing for no data loss | "target throughput of at least 5,000 events/second per node... partitioning streams by source and topic" | Size infrastructure based on 50k events/sec sustained target | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Virality Metrics and Indicators | metrics, virality, modeling | virality-metrics, r0, half-life, momentum | technology | Three core virality metrics defined: R₀ (reproduction rate), Half-Life of Attention, Velocity/Acceleration, Breadth Index | "Reproduction Rate (R₀ equivalent)... Half-Life of Attention... Velocity and Acceleration... Breadth Index" | These metrics map directly to financial technical indicators; implement as time-series features | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Trend Life Cycle Modeling | state-machine, virality, analytics | trend-lifecycle, state-machine | technology | State machine: Emerging → Peaking → Saturated → Declining → Dormant → (possible resurgence). Transitions determined by thresholds on dE/dt and d²E/dt² | "state machine to classify a trend's current phase: Emerging, Peaking, Saturated, Declining, Dormant" | Implement as threshold-based state machine; validate against historical trend datasets | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Knowledge Graph Construction | graph-db, neo4j, architecture | neo4j, knowledge-graph, influencer-graph | technology | Neo4j labeled property graph: node types = Influencers, Content, Topics, Audience groups; edge types = creates, follows, engages, tagged-with, collaborates, related-to | "nodes represent key entities: Influencers (content creators), Content/Posts, Topics/Hashtags, Audience groups" | Schema design for heterogeneous graph; indexes on influencer ID and topic | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Community Detection and Influence Clusters | graph-algorithms, community-detection | leiden, louvain, community-detection | technology | Leiden algorithm chosen over Louvain for guaranteed connected communities and better quality; used for identifying influencer clusters by niche | "Leiden algorithm yields better-quality, well-connected communities and is faster" | Use Leiden (via Neo4j GDS library) for community detection; compare with Louvain as baseline | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Graph Embeddings and Similarity | graph-embeddings, similarity, ml | node2vec, gnn, embeddings | technology | node2vec for low-dimensional embeddings preserving homophily and structural equivalence; GNN alternative for deeper non-linear patterns; decision: prototype with node2vec, graduate to GNN if accuracy insufficient | "node2vec outperforms prior embedding techniques on multi-label classification and link prediction... prototype with simpler methods and graduate to GNNs if needed" | Start with node2vec + classifier as MVP; plan GNN upgrade path | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Advanced Graph Algorithms | graph-algorithms, link-prediction, centrality | link-prediction, centrality, temporal-graph | technology | Link prediction (common neighbor analysis / embedding distance), Temporal Graph Analysis (TGN for online embedding updates), Centrality measures (betweenness, eigenvector) | "Link Prediction... Temporal Graph Analysis... Centrality Measures" | Implement link prediction for trend spread forecasting; centrality for influencer ranking | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Active Inference (Free-Energy Principle) | ai-framework, inference, modeling | active-inference, friston, free-energy | technology | Active Inference via Friston's free-energy principle: maintain generative model of trend evolution; compute prediction error (surprise) on new data; continuously self-tune model parameters to minimize free energy via variational Bayesian framework | "Active Inference... minimize the 'prediction error' of cultural trends... feedback loop where the system self-tunes its forecasting models" | Exploratory for MVP; implement as optional adaptive calibration layer | low |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Fluid Dynamics Analogies | virality-modeling, physics-analogies | fluid-dynamics, diffusion-model | technology | FluidSpread model (Wang et al. 2017): treat influence spread as fluid diffusion through network; high-conductance channels = strong social ties; turbulence as chaotic trend behavior; Reynolds-number analog for information flow | "treat influence spread akin to fluid flow in three dimensions... FluidSpread model achieved effective results in influence maximization" | Exploratory; may produce useful trend diffusion spatial-temporal maps | low |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Swarm Intelligence: Ant Colony & Bee Algorithms | optimization, swarm-intelligence, ai | aco, abc, ant-colony, bee-colony | technology | ACO for optimal influence pathways and seed node selection; ABC/Bee algorithms for exploration/exploitation balance in trend monitoring; adaptive resource allocation to emerging trends | "Ant Colony Optimization... find optimal information pathways... Artificial Bee Colony... balance exploration vs exploitation" | Implement ACO for influence maximization optimization; ABC for trend monitoring resource allocation | low |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Attention Market Metrics | metrics-design, finance-analogies | attention-volatility-index, momentum, liquidity | technology | Three metric families: Attention Volatility Index (AVI) analogous to VIX; Momentum oscillator (MACD-like, week-over-week growth); Liquidity of Attention (entropy of engagement distribution across topics) | "Volatility of Attention: standard deviation of engagement... Momentum: month-over-month growth... Liquidity: entropy of attention spread across topics" | Design metrics as time-series indicators; back-test against historical data | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Back-Testing and Strategy Validation | validation, backtesting, metrics | backtesting, return-on-attention, sharpe-ratio | technology | Return on Attention (ROA) as portfolio return analog; Sharpe ratio for risk-adjusted returns; back-test against historical cultural events (Gangnam Style, Ice Bucket Challenge) and MusicLab social influence experiments | "Return on Attention (ROA)... Sharpe Ratio of strategy... simulate the system's behavior in the past" | Build back-test harness early; use Salganik MusicLab data as test case for social influence unpredictability | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Data Anonymization and Minimization | privacy, anonymization, gdpr | anonymization, differential-privacy, pii | requirement | Black-box anonymization: hash platform user/influencer IDs; store only feature representations (sentiment scores, topic tags) not raw text; differential privacy (DP-SGD) for model training; GDPR data minimization principle | "black-box anonymization... hash these IDs using one-way cryptographic hash... differential privacy introduces noise to prevent re-identification" | Implement hash-and-discard for PII at ingestion; apply DP-SGD for any user-level modeling | critical |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Archetype Abstraction | privacy, abstraction, cohorts | archetype-abstraction, k-anonymity, cohort-analysis | technology | Archetype abstraction: cluster users into behavioral cohorts (k-anonymity with k≥50) rather than individual-level analysis; reduces complexity; aligns with marketing segment use-cases; representative agent model | "archetype abstraction: shift analysis from individual level to archetype or cohort level... k-anonymity: each group has at least k members" | Design archetype clustering as primary privacy-preserving mechanism | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Regulatory Compliance (GDPR, CCPA, etc.) | compliance, gdpr, ccpa, jurisdiction | gdpr, ccpa, data-residency, erasure | requirement | GDPR: lawful basis (legitimate interest for public data), right to erasure, data localization, 72-hour breach notification; CCPA: right to access/opt-out; SOC 2 alignment target | "Right to Erasure... Data Localization... GDPR mandates that EU personal data not be transferred out of the EEA without safeguards" | Design EU/US regional separation architecture; implement deletion pipeline | critical |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Python (Data & ML Layer) | stack, python, ml | python, pytorch, scikit-learn | technology | Python for all ML/AI: NumPy, Pandas, scikit-learn, PyTorch/TensorFlow, NetworkX, py2neo for Neo4j, confluent-kafka-python for Redpanda | "Python is the lingua franca of data science... Python for rapid development of analysis modules" | Python primary language for modeling; plan Rust/Python IPC for performance-sensitive paths | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Rust (Ingestion & Performance-Critical Services) | stack, rust, performance | rust, tokio, async, ingestion | technology | Rust via Tokio async runtime for ingestor microservices: API connections, JSON processing, Redpanda publishing; memory-safe concurrency; no GC pauses; C++ implementation of Redpanda for streaming backbone | "Rust offers memory safety and concurrency without a garbage collector... async runtime like Tokio" | Implement per-source ingestors in Rust; leverage Redpanda's Kafka-compatible API | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Neo4j (Graph Database) | stack, neo4j, graph-db | neo4j, cypher, graph-database | technology | Neo4j Enterprise for graph DB; Cypher for queries; APOC and GDS (Graph Data Science) library for Leiden, community detection, PageRank, link prediction; indexes on influencer_id and topic for query performance | "Neo4j... APOC library or GDS... Leiden algorithm available in GDS library" | Design graph schema with indexes; plan GDS library usage for algorithms | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Redpanda (Kafka API) | stack, redpanda, streaming | redpanda, kafka, streaming | technology | Redpanda as Kafka-compatible streaming platform: no ZooKeeper needed; C++ single-binary; schema registry support; target end-to-end latency < 5 seconds; partitioned by source/topic for parallelization | "Redpanda... Kafka-compatible streaming platform... low-latency message ingestion... millions of events per second" | Configure Redpanda with 1-3 day retention; partition by source for parallelization | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Self-Hosted GPU and Compute | infra, gpu, compute | gpu, self-hosted, nvidia | technology | Self-hosted NVIDIA GPU server (not cloud) for GNN training, node2vec, transformer inference; Docker with NVIDIA runtime; periodic (e.g. nightly) model retraining; Lambda architecture: streaming for real-time + batch for deep analysis | "self-hosted GPU server... for GNN training, node2vec... periodic model retraining overnight" | Plan self-hosted GPU procurement; use Docker+NVIDIA runtime for containerized ML workloads | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Visualization Dashboards | dashboard, visualization, ui | d3js, plotly, react, vue | technology | D3.js for custom charts (time-series, network graphs, confidence bands); Plotly as fallback for quick interactive plots; React or Vue web app; WebSocket for real-time updates; no Tableau/PowerBI | "D3.js... Plotly... React or Vue for structure... WebSockets or periodic refresh" | Build custom D3.js dashboard; avoid proprietary BI tools per explicit requirement | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | D3.js | dashboard, visualization, ui | d3js, react | technology | D3.js for dynamic, interactive data visualizations: time-series with brushing/zooming, network graphs with tooltips, confidence band shading; fine control over specialized visuals | "D3 will be employed to create custom charts... force-directed layout for cluster maps" | Prioritize D3.js for core charts; Plotly for rapid prototyping of secondary views | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Latency Targets | performance, latency, sla | latency, performance-targets, slas | requirement | Ingestion latency < 2s; Processing latency < 1s average / < 5s worst-case; Dashboard query < 500ms cached / < 2s complex; End-to-end < 5s target | "Goal: ingestion < 2 seconds... processing < 1 second on average, worst-case < 5 seconds... dashboard < 500ms for cached or indexed data" | Design streaming pipeline to meet these SLA targets; load test to validate | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Throughput and Scalability | performance, throughput, scalability | throughput, scalability, 50k-events | requirement | Sustained 50,000 events/second; bursts to 100,000/second; horizontal scaling via Redpanda partitioning and Kubernetes pod scaling; back-pressure via Kafka queue backlog monitoring | "at least 50,000 events per second sustained, with bursts to 100k/sec" | Size Kafka/Redpanda partition count and consumer group parallelism accordingly | high |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Regional Deployment Strategy | compliance, deployment, jurisdiction | eu-deployment, us-deployment, data-residency | technology | EU instance (EU data center e.g. Frankfurt) for GDPR compliance; US instance for Americas; aggregate-only cross-region sync (no personal data transfer); separate graph instances per region | "EU Region Deployment... US Region Deployment... exchange only aggregate trend metrics between regional systems" | Architecture must support regional isolation; shared aggregate index layer | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Reinforcement Learning for Content Strategy | ai-framework, reinforcement-learning | rl, reinforcement-learning, content-strategy | technology | RL agent for dynamic content deployment strategy: state = trend momentum + competition + audience mood; actions = topic/timing choices; reward = engagement; learns posting strategy over time | "RL agent could learn a policy of when to post content or what kind of content to post to maximize attention" | Exploratory; implement after baseline metrics and back-testing infrastructure exists | low |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Multi-modal Fusion | ai-framework, multimodal | multimodal, clip, audio-transformers | technology | Multi-modal fusion: CLIP for image-text embedding, audio transformers for video/speech; fuse signals into common representation space for holistic trend analysis | "transformer-based models (like CLIP for image-text or audio transformers)... fuse signals" | Low priority for MVP; include as roadmap item for post-MVP | low |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Explainable AI & Causal Inference | ai-framework, xai, causal-inference | explainability, shap, causal-inference | technology | SHAP values for model prediction explainability; counterfactual reasoning; Granger causality tests on time-series for cross-platform causal direction (e.g., Reddit mentions causing Twitter spikes) | "SHAP values... counterfactual reasoning... Granger causality tests" | Implement as interpretability layer post-MVP; needed for user trust | low |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Black Swan Events | risk, outliers, modeling | black-swan, outlier-detection, risk | technology | Black swan detection for outlier trend events (e.g., Gangnam Style one-time massive spike); system should label and acknowledge prediction limits rather than over-confidently forecast | "system might label it a Black Swan event... after peak, classify influencer's momentum as reverting to baseline" | Build outlier detection for black swan events; calibrate confidence bands accordingly | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Ethical Considerations | ethics, surveillance, fairness | ethics, surveillance, fairness | requirement | Explicit ethical boundary: no surveillance or personal targeting beyond aggregate; public data only; avoid reinforcing majority biases; multi-lingual coverage required to avoid English-only bias | "not designed to single out private individuals or invade privacy... avoid reinforcing only majority interests" | Establish ethical review gate before production deployment; add multilingual analysis | critical |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Security Standards | security, compliance, infrastructure | security, tls, aes256, vault | requirement | Zero-trust inside cluster; TLS in transit; AES-256 at rest; Vault or K8s secrets for API keys; audit logging for all data access; SOC 2 alignment target; periodic encrypted backups | "TLS for data in transit, AES-256 for data at rest... secrets stored in Vault or K8s secrets" | Implement security hardening as infrastructure requirement before any production data | critical |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Infrastructure as Code | deployment, iac, terraform | terraform, helm, kubernetes | technology | Terraform for infrastructure provisioning (servers, network, load balancers); Helm charts for Kubernetes configs; ensures reproducibility and scaling | "Terraform or similar for provisioning infrastructure... Helm charts for Kubernetes configurations" | Plan IaC approach from inception; don't manual-provision | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Benchmarking Plan | validation, benchmarking | benchmarking, baselines | technology | Benchmarks against: heuristic rules (most-followers strategy), existing tools (Google Trends), random/naive forecasts. Metrics: precision/recall/F1 for viral classification, RMSE/MAPE for engagement forecasts | "Heuristic Rules... Existing Social Analytics... Random or Naive Forecasts" | Build benchmarking harness alongside back-testing framework | medium |
| 2026-04-25 | docs/ideas/Attention-as-Capital Analytics Platform.md | Cost and Egress Considerations | cost, infrastructure, budget | cost, egress, budget | risk | Cloud GPU vs self-hosted cost trade-off; Redpanda open-source vs Kafka licensing; egress costs for user data transfer; storage costs for video/image retention | "Self-hosting (versus cloud) may be cost-effective... GPU rig... owning a GPU rig could save costs long-term" | Model infrastructure costs in detail before MVP commitment | medium |

---

## Components And Technologies

- **Redpanda** (Kafka-compatible streaming platform; C++ single-binary; no ZooKeeper; schema registry)
- **Neo4j** (Graph database; Enterprise preferred; Cypher query language; APOC + GDS libraries)
- **Python 3.x** (Primary ML/AI language: NumPy, Pandas, scikit-learn, PyTorch, TensorFlow, NetworkX, py2neo, confluent-kafka-python)
- **Rust** (Ingestor microservices via Tokio async runtime; performance-critical services)
- **D3.js** (Custom interactive web visualizations; time-series charts with confidence bands; network graphs)
- **Plotly / Observable** (Fallback rapid visualization prototyping)
- **React or Vue** (Dashboard web application framework)
- **Apache Kafka / Redpanda** (Message broker / streaming platform)
- **TimescaleDB / PostgreSQL** (Time-series and relational storage for engagement records)
- **Self-hosted NVIDIA GPU server** (PyTorch Geometric, DGL, node2vec training, GNN inference)
- **Docker / Kubernetes** (Container orchestration; Helm charts; NVIDIA runtime)
- **Terraform** (Infrastructure as Code; provisioning and scaling)
- **Vault / Kubernetes Secrets** (Secrets management; API key rotation)
- **AWS S3 / MinIO** (Object storage data lake; parquet archives; raw event logs)
- **CLIP / Audio Transformers** (Multi-modal embedding models; for image-text-audio fusion)
- **SHAP** (Model explainability; prediction attribution)
- **DP-SGD** (Differentially private stochastic gradient descent for model training)
- **Leiden algorithm** (Community detection; via Neo4j GDS)
- **node2vec** (Graph embedding; via gensim or PyTorch Geometric)
- **GNN / GraphSAGE** (Graph neural networks; future upgrade path)
- **ARIMA / Prophet / RNN** (Time-series forecasting for trend engagement)
- **GARCH** (Volatility clustering model; for attention volatility forecasting)
- **Leiden / Louvain** (Community detection algorithms)
- **Personalized PageRank** (Influence ranking relative to topic)
- **Ant Colony Optimization (ACO)** (Influence maximization; optimal path finding)
- **Artificial Bee Colony (ABC)** (Exploration/exploitation optimization for trend monitoring)
- **FluidSpread model** (Fluid dynamics influence diffusion model)
- **Active Inference / Free-Energy** (Variational Bayesian self-calibrating model)
- **Granger Causality** (Causal inference for cross-platform trend causation)
- **Differential Privacy (ε-differential privacy)** (Mathematical privacy guarantee per Dwork's definition)

---

## Conceptual Claims

- Cultural phenomena (viral videos, memes, social movements) rise and fall in patterns analogous to financial markets (stocks, commodities)
- Attention is a form of capital; influencers are equity-like assets; platform engagement metrics are technical indicators
- Real-time cultural trend forecasting is achievable via quantitative methods analogous to quantitative finance
- Virality is a multi-dimensional phenomenon: platform, medium, reach, acceleration, cultural impact, lifespan
- Trend life cycles can be modeled as state machines with derivative-threshold transitions
- Graph structures naturally express social network topology and content diffusion pathways
- Privacy-preserving analytics at scale is achievable via anonymization + archetype abstraction + differential privacy
- Active Inference (free-energy principle) provides a self-calibrating framework for non-stationary cultural environments
- Swarm intelligence algorithms (ACO, ABC) are applicable to trend detection and influence optimization
- Fluid dynamics analogies (diffusion, turbulence) can model memetic spread through networks
- Reinforcement learning can learn content strategy policies from trend state + engagement reward
- Attention market metrics (volatility, momentum, liquidity) have direct analogs in financial markets and are back-testable
- Self-hosted GPU infrastructure is more cost-effective than cloud for continuous deep learning workloads
- EU/US regional separation is technically necessary and sufficient for GDPR + CCPA compliance
- Multi-modal fusion (text + image + video + audio) is required for holistic cultural trend analysis

---

## Dependencies And Sequencing

- Requires: historical social media trend datasets (for back-testing); platform API access / scraping infrastructure; self-hosted GPU hardware; Neo4j GDS library expertise; Redpanda cluster deployment; privacy/legal review for GDPR compliance
- Blocked by: none explicitly (exploratory document, not part of Rosetta/Entif implementation)
- Sequencing from doc: Real-Time Ingestion → Storage/Graph → Analysis Engines → Dashboards → Back-Testing → Production
- Note: This is a standalone concept; no stated dependency on or connection to Rosetta, Entif, NOT LAME, or any existing Rosetta project artifacts

---

## Contradictions Or Supersession

- This document is entirely standalone — no references to Rosetta, Entif, NOT LAME, or any existing Rosetta codebase, backlog, or governance docs. It proposes its own complete tech stack (Python + Rust + Neo4j + Redpanda) that is entirely separate from the TypeScript/Nx/parse-only/Rockette-focused Rosetta ecosystem.
- The document does not address any Rosetta-specific concepts: no mention of text-core-mvp, receipt-law, rights-scoped-retrieval, tapestry, source-episode, parse-only-default, sovereignty-kernel, write-admission-gate, memory-sovereignty-map, LangGraph, or any of the NOT LAME PRD components.
- If this Attention-as-Capital platform were to be integrated into the broader Entif/Rosetta ecosystem, it would require a significant integration design effort that is not present in this document.
- No contradiction with existing Rosetta docs — this is a separate product concept in the ideas batch.

---

## Issue Candidates

| Title | Type | Labels | Depends On | Evidence |
| --- | --- | --- | --- | --- |
| AC-001: Attention Capital Platform — standalone nature requires integration design if added to Entif/Rosetta ecosystem | architecture | docs-intelligence, integration, attention-capital | none | This doc proposes an entirely separate tech stack (Python/Rust/Neo4j/Redpanda) with no Rosetta bindings; if it becomes a real product, a formal integration design is needed to align with NOT LAME architecture and avoid duplicate infrastructure |
| AC-002: No data source for back-testing framework — historical social media trend datasets not identified | dependency | attention-capital, backtesting, data | none | Doc explicitly calls for back-testing against historical cultural events (Gangnam Style, Ice Bucket Challenge, MusicLab) but no specific dataset sources or acquisition plan are named; this is a blocker for metrics validation |
| AC-003: TikTok API access is unsolved — third-party scraper approach carries legal/terms-of-service risk | risk | attention-capital, tikok, legal, ingestion | none | Doc acknowledges TikTok "lacks an open public API" and proposes "third-party scrapers or partnership" — scraping may violate TikTok Terms of Service and robot.txt; needs legal review before implementation |
| AC-004: Twitter API restrictions — enterprise subscription cost may be prohibitive for MVP | risk | attention-capital, twitter, api-restrictions, cost | none | Twitter API now requires paid enterprise access for real-time firehose; doc notes this constraint but does not provide fallback plan or budget for enterprise API |
| AC-005: GDPR data residency implementation — EU/US regional separation requires multi-region infrastructure planning | implementation | attention-capital, gdpr, infra, deployment | none | Regional deployment strategy is defined at architecture level but no implementation plan for data partitioning, cross-region sync protocol, or deletion propagation across regions is provided |

---

## Project Board Suggestions

- Area: docs/ideas — Batch 4 exploratory product concept
- Cycle: not in active development; candidate for future epic
- Status: exploratory reference architecture; no commitment to build
- Blocked by: no Rosetta integration; no platform API access secured; no historical dataset identified; no GDPR legal review
- Parallelization notes: This is an independent concept; no parallelization with active Rosetta development tracks

---

## Open Questions

- What is the actual market for an Attention-as-Capital Analytics Platform? Who are the target customers — content creators, brands, researchers?
- Is there a binding relationship intended between this concept and the Rosetta/Entif ecosystem, or is it fully standalone?
- How will the legal/terms-of-service risk of TikTok scraping be resolved — partnership, official API (if available), or is it excluded from MVP scope?
- What historical datasets are available for back-testing? Are there free/paid sources for social media trend time-series data?
- Given that this doc proposes a full Python+Rust+Neo4j+Redpanda+GPU stack entirely separate from Rosetta's TypeScript/Nx stack, what is the governance model for maintaining two independent tech stacks?
- How does the privacy-by-design approach interact with platform-specific terms of service (e.g., Twitter's data usage restrictions)?
- Is the self-hosted GPU approach cost-justified vs. cloud GPU instances for the expected workload?
- What is the timeline from "reference architecture" to "MVP"? Are there partners or funding identified?
