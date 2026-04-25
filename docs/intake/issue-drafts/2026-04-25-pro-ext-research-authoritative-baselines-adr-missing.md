# Issue Draft: Missing ADR for the 21 authoritative project baseline documents

## Title

Missing: ADR formally establishing the 21 authoritative project baseline documents

## Type

documentation

## Labels

- ADR
- authoritative-baselines
- reference-corpus

## Depends On

none

## Evidence

The consolidated Pro-tier Deep Research prompt (`20260410 - Entif and Rosetta PRDs - ChatGPT - Pro-Extended Research.md`) lists **21 specific project documents** as authoritative baselines that any DR run or architecture decision should synthesize against. These span:

**Core Rosetta / protocol / spine / provenance / taxonomy:**
- Rosetta v3.0.0 Core Spine Specification.pdf
- ROCK-31XX - Rosetta Pasigraphy Protocol - Provenance, Receipts, TruthLint - 20260224.md
- 20251130 - ChatGPT 5.1 - Taxonomy System Design.md
- Chat GPT - Taxonomic Standards for Software.md
- Chat GPT - LLMs and New Languages.md

**Entif architecture / orchestration / safety / MVP / operational posture:**
- 20251115 - Entif.ai 2.0 Architecture Blueprint and Roadmap.md
- Entif 2.0 - Comprehensive Action Plans.md
- Entif 2.0 - Decentralization and Governance.md
- 20251026 - Entif 2.0 - Secure Architecture Companion Paper.md
- Entif 2.0 - Enriched by External Advancements - 20251016.md
- 20260409 - PRD Blueprint for a Cost-Savings Agentic OS - ChatGPT - Deep Research Report.md
- 20260409 - ChatGPT - Agentic workflows overview.md
- Chat GPT - Voice Control Overview.md
- 20260221 - Chat GPT - YT, Agents, Auth and Cache.md
- ChatGPT-Memory Stack Recommendations.md
- ChatGPT-Memory and Agentic Tools.md

**Cognition / memory / tapestries / tiles / versioning / reuse:**
- Cognitive Tiles and Swarm Gnosis.md
- Cognitive Tapestries via Semantic Latticing.md
- ChatGPT-Versioning Data and States.md
- Chat GPT - MCTS and Strategy Chunking.md
- Chat GPT - mHCs and Engram in ML.md
- ChatGPT-Ithkuil, Residuals and AttnRes.md
- 260319 - Rosetta's Metacognitive Atlas via Tulpamancy Archetypes.md

There is no ADR formally establishing this list as the project baseline. Future contributors or agents have no formal reference for which documents govern architectural decisions.

## Recommendation

Create an ADR (e.g., ADR-0002 or similar) that formally lists the 21 authoritative project baseline documents, their categories, and the rule that architectural decisions should be traceable to at least one of these documents. Place it in `docs/adr/`.
