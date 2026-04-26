# Docs Intelligence Extraction

## Source

- **Path:** `docs/external/Attention Residuals (AttnRes) - Kimi.md`
- **Title:** Attention Residuals (AttnRes)
- **Date evidence:** 2026 (arXiv: 2603.15031)
- **Authority tier:** external reference — frontier research / competitive intelligence
- **Freshness:** 2026 publication from Kimi Team
- **Word count:** ~2,400 words (lightweight research paper / GitHub repo README)
- **Extractor:** main-session
- **Extraction date:** 2026-04-25

---

## Boundary

This artifact is docs-intelligence output for planning and orchestration. It is not Rosetta runtime ingestion, not a protocol tile, not a tapestry, and not evidence that the source document has been ingested into Rosetta's future semantic corpus. AttnRes is external frontier research from the Kimi Team, useful as competitive context and inspiration for Rosetta's memory/attention architecture decisions. It does not bind Rosetta's design.

---

## Summary

AttnRes replaces standard residual connections in Transformers with learned, input-dependent attention over preceding layer outputs. It addresses PreNorm's depth dilution problem — where uniform residual accumulation dilutes each layer's contribution and causes hidden-state magnitude to grow unboundedly as depth increases. AttnRes enables selective, content-aware cross-layer representation aggregation, with a practical Block AttnRes variant that approximates full-depth attention at marginal compute overhead. The Kimi team's results show consistent gains across scaling regimes, with largest improvements on multi-step reasoning (+7.5 GPQA-Diamond) and code generation (+3.1 HumanEval). This is relevant to Rosetta in two broad areas: (1) the memory plane / activation plane discussion in Entif's layered memory architecture, where depth-aware selective aggregation is an architectural alternative to flat residual stacks; and (2) the broader frontier on attention-over-depth mechanisms, which is adjacent to but distinct from Rosetta's tapestre/cue-based retrieval model.

---

## Goals And Intent

- Provide drop-in replacement for standard residual connections in Transformer-based models
- Mitigate PreNorm depth dilution: prevent hidden-state magnitude growth, distribute gradient norms uniformly across layers
- Enable content-aware selective aggregation of earlier layer representations via learned pseudo-queries
- Demonstrate that learned aggregation outperforms uniform fixed-weight accumulation across all compute budgets
- Make a practically deployable variant (Block AttnRes) that recovers most gains with O(Nd) memory instead of O(Ld)

---

## Requirements

| Requirement | Evidence | Package/App/Area | Priority | Notes |
|---|---|---|---|---|
| Address PreNorm depth dilution in Transformer stacks | AttnRes Overview: "uniform aggregation dilutes each layer's contribution and causes hidden-state magnitudes to grow unboundedly" | Rosetta memory planes / activation routing | advisory | architectural alternative; not a Rosetta requirement |
| Learned content-dependent aggregation over depth | Equation h_l = sum_i→l-1 alpha_i→l · v_i with softmax attention weights | Rosetta LayerChoice / skip-gate mechanisms | advisory | inspiration only; Rosetta uses different retrieval paradigm |
| O(Ld) memory cost for full depth attention | AttnRes overview: "Full AttnRes is straightforward but requires O(Ld) memory at scale" | Rosetta memory plane cost modeling | reference | Rosetta should model its own depth aggregation costs separately |
| Block AttnRes ~8 blocks recovers most gains | Block AttnRes: "With ~8 blocks, it recovers most of Full AttnRes's gains" | Rosetta block-size tuning | reference | block size as architectural hyperparameter |
| Bounded output magnitudes across depth | Training Dynamics: "output magnitudes remain bounded across depth" | Rosetta stability / convergence | note | relevant if Rosetta ever runs deep transformer forward passes |
| Uniform gradient distribution across layers | Training Dynamics: "gradient norms distribute more uniformly across layers" | Rosetta training stability | note | same |

---

## Findings Ledger

| Timestamp | Source path | Heading / locator | Tags | Subjects | Finding type | Finding | Citation / evidence | Recommendation | Confidence |
|---|---|---|---|---|---|---|---|---|---|
| 2026-04-25 | docs/external/AttnRes | Overview | attention-residuals, prenorm-dilution, depth-aggregation | transformer-architecture, memory-planes | technology | PreNorm residual connections cause hidden-state magnitude growth unbounded in depth; AttnRes addresses this with learned attention over depth rather than fixed additive accumulation | "Standard residual connections accumulate all layer outputs with fixed unit weights. As depth grows, this uniform aggregation dilutes each layer's contribution and causes hidden-state magnitudes to grow unboundedly" | Rosetta should consider whether its own layered memory planes face analogous depth dilution; if so, block-attention or cue-gating may apply | high |
| 2026-04-25 | docs/external/AttnRes | Block AttnRes | block-attention, memory-efficiency, o-nd-complexity | transformer-architecture, memory-plane-costs | technology | Block AttnRes partitions layers into N blocks, accumulating within-block via standard residuals and attending only over block-level representations, reducing memory from O(Ld) to O(Nd) | "Block AttnRes partitions layers into N blocks, accumulates within each block via standard residuals, and applies attention only over block-level representations. With ~8 blocks, it recovers most of Full AttnRes's gains" | Rosetta's tapestry/block segmentation design has structural parallels; model memory cost of N blocks explicitly | high |
| 2026-04-25 | docs/external/AttnRes | Results / GPQA-Diamond | benchmark, reasoning, multi-step-reasoning | evaluation, model-capability | technology | Largest AttnRes gains on GPQA-Diamond (+7.5 pts) — multi-step reasoning tasks show the most from learned depth aggregation | Table: GPQA-Diamond baseline 36.9 vs AttnRes 44.4 | For Rosetta's own agentic reasoning tasks, depth-aware aggregation may improve multi-step deduction traces | high |
| 2026-04-25 | docs/external/AttnRes | Results / HumanEval | benchmark, code-generation | evaluation, code-capability | technology | Code generation (HumanEval) improves +3.1 pts with AttnRes | Table: HumanEval baseline 59.1 vs AttnRes 62.2 | Relevant to any Rosetta code-generation or tile-synthesis capability | medium |
| 2026-04-25 | docs/external/AttnRes | Pseudocode | block-attn-res-impl, transformer-layer-integration | implementation, layer-hook | technology | PyTorch pseudocode shows AttnRes inserted as pre-attention and pre-MLP hooks within each transformer layer; uses learned projection + RMSNorm | pseudocode: block_attn_res(blocks, partial_block, proj, norm) | Rosetta's layer integration points (if any transformer forward passes are used) could follow similar insertion pattern | medium |
| 2026-04-25 | docs/external/AttnRes | Scaling Laws | scaling-laws, compute-efficiency, 1.25x-compute-equivalent | compute-efficiency, model-training | technology | Block AttnRes matches loss of a baseline trained with 1.25x more compute; suggests learned aggregation provides ~20% compute savings at iso-performance | "Block AttnRes matches the loss of a baseline trained with 1.25x more compute" | Rosetta's memory efficiency arguments can reference this data point for comparative architecture claims | medium |
| 2026-04-25 | docs/external/AttnRes | Training Dynamics | gradient-distribution, magnitude-bounding, convergence | training-stability, convergence | technology | AttnRes mitigates PreNorm dilution: output magnitudes bounded across depth, gradient norms distribute uniformly across layers | "output magnitudes remain bounded across depth and gradient norms distribute more uniformly across layers" | If Rosetta ever trains deep models, this is directly applicable; for inference-only passes, lower priority | medium |
| 2026-04-25 | docs/external/AttnRes | Citation / Authors | kimi-team, research-authorship | research, competitive-intelligence | open-question | Kimi Team (within Moonshot AI) produced this 2026 paper; Kimi is a direct Rosetta competitor in long-context and agentic memory research | arXiv 2603.15031, cs.CL | Rosetta should monitor Kimi's published research for alignment or gap analysis | low |

---

## Components And Technologies

- **AttnRes (Attention Residuals):** drop-in replacement for standard residual connections in Transformers
- **Full AttnRes:** each layer attends over all previous layer outputs via learned pseudo-query; O(Ld) memory
- **Block AttnRes:** layers grouped into N blocks; within-block standard residuals; inter-block attention; O(Nd) memory
- **Learned pseudo-query:** single learned vector w_l ∈ R^d per layer; computes softmax attention weights over preceding representations
- **RMSNorm:** used to normalize block representations before computing attention logits
- **PyTorch implementation:** two linear projections (attn_res_proj, mlp_res_proj) + RMSNorm; called before attention and before MLP in each layer
- **Kimi Linear 48B / 3B activated:** evaluation benchmark model; 1.4T tokens trained
- **Benchmarks:** MMLU, GPQA-Diamond, BBH, TriviaQA, Math, HumanEval, MBPP, CMMLU, C-Eval

---

## Conceptual Claims

- Standard residual connections with PreNorm cause depth dilution: uniform additive accumulation at fixed unit weight means each layer's contribution is progressively diluted as depth grows
- Hidden-state magnitude growth under PreNorm is a fundamental architectural problem, not just a training tuning issue
- Learned input-dependent attention over depth is a principled replacement for fixed uniform accumulation
- Content-aware aggregation (via pseudo-queries) allows layers to selectively emphasize or de-emphasize earlier representations based on the current input
- Block partitioning of depth is an effective memory-efficient approximation: ~8 blocks recovers most of full-depth attention gains
- AttnRes consistently outperforms baseline across all compute budgets (scaling law compliance)
- Largest gains are on tasks requiring multi-step reasoning or complex program synthesis, where selective access to earlier intermediate representations matters most

---

## Dependencies And Sequencing

- No internal Rosetta dependencies; this is external reference material
- Relevant to Rosetta's potential future work on:
  - Memory Plane 3 (activation/relevance): if Rosetta ever implements depth-aware attention over memory layers, Block AttnRes provides a proven cost-efficient pattern
  - Layer integration points: if Rosetta's runtime ever executes transformer forward passes (not currently planned), AttnRes provides an integration hook
  - Comparative architecture analysis: when arguing Rosetta's memory efficiency vs. transformer depth aggregation approaches, AttnRes provides a credible external reference point

---

## Contradictions Or Supersession

- No internal contradictions within this source
- Structurally related to but distinct from Rosetta's cue-based tapestry retrieval: AttnRes operates within a single model's depth dimension; Rosetta's memory planes operate across a provenance-closed artifact store. Neither supersedes the other — they address different problem spaces (model-internal representation aggregation vs. external memory retrieval with rights scoping)
- This doc does not supersede any Rosetta internal document

---

## Issue Candidates

| Title | Type | Draft or Existing Issue | Labels | Depends On | Evidence |
|---|---|---|---|---|---|
| AR-001: Evaluate AttnRes-style depth aggregation for Memory Plane 3 | research | `docs/intake/issue-drafts/AR-001-depth-aggregation-memory-plane-3.md` | memory-plane-3, research, attention-residuals | — | AttnRes demonstrates that learned depth aggregation improves multi-step reasoning; Rosetta's Plane 3 (activation/relevance) may benefit from analogous block-attention over memory layers |
| AR-002: Model block-size cost tradeoff for tapestry segmentation | research | `docs/intake/issue-drafts/AR-002-block-size-tapestry-cost-model.md` | tapestry, memory-cost-modeling, block-size | — | Block AttnRes shows ~8 blocks recovers most gains; Rosetta should explicitly model optimal tapestry block size vs. retrieval precision |
| AR-003: Track Kimi Team publications for competitive gap analysis | monitoring | `docs/intake/issue-drafts/AR-003-kimi-competitive-tracking.md` | competitive-intelligence, kimi, frontier-research | — | Kimi is a direct competitor in long-context agentic memory; AttnRes is one data point in an ongoing competitive research stream |

---

## Project Board Suggestions

- **Area:** Research / competitive intelligence
- **Cycle:** not applicable — external reference; does not create Rosetta sprint work
- **Status:** captured for architecture reference and competitive awareness
- **Blocked by:** nothing
- **Parallelization notes:** these are async reference extractions; no sprint dependencies

---

## Open Questions

- Does Rosetta's current tapestry design face an analogous depth dilution problem at the memory layer level? If memory Plane 3 aggregates across many prior Plane 1/2 artifacts, does uniform accumulation cause older memories to become effectively invisible?
- What is Rosetta's block size parameter for tapestry segmentation, and is it tuned to any evidence? AttnRes suggests ~8 blocks as a sweet spot — does Rosetta have a comparable parameter?
- If Rosetta ever runs transformer forward passes (vs. retrieval-only passes), should AttnRes hooks be considered as an alternative to flat residual connections?
- Should Kimi/Moonshot AI be on Rosetta's competitive monitoring list alongside the other frontier research sources?
