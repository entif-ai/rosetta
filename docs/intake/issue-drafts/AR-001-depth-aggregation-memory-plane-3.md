# AR-001: Evaluate AttnRes-style Depth Aggregation for Memory Plane 3

**Type:** research  
**Status:** draft  
**Labels:** memory-plane-3, research, attention-residuals  
**Depends on:** —

---

## Context

AttnRes (Kimi Team, arXiv:2603.15031) demonstrates that learned, content-dependent attention over depth — replacing uniform residual accumulation with softmax-weighted aggregation — consistently improves multi-step reasoning tasks. The largest gains are on GPQA-Diamond (+7.5 pts) and HumanEval (+3.1 pts), both tasks requiring selective access to intermediate representations across depth.

Rosetta's Memory Plane 3 is defined as the "activation/relevance" plane. The current design calls for scheduled pruning and relevance-weighted activation of older memory artifacts, but the specific mechanism for how older Plane 1/2 artifacts are weighted in Plane 3 aggregation is not yet specified.

## Claim

If Plane 3 performs uniform aggregation over a growing set of Plane 1/2 artifacts, it faces an analogous "depth dilution" problem: older memories contribute equally to current activation state regardless of their relevance to the current context, causing the signal-to-noise ratio to degrade as the memory corpus grows.

AttnRes-style block attention — or more generally, learned content-dependent weighting over the depth dimension of the memory archive — may address this. Even a simple version using a learned query vector per "block" of memory age could provide selective, context-aware aggregation without requiring full O(Nd) attention over every memory artifact.

## Research Questions

1. What is the current aggregation rule for Plane 3? Is it uniform, recency-weighted, or something else?
2. If uniform, what is the evidence that depth dilution is or is not occurring in the current design?
3. What would a minimal AttnRes-inspired variant look like for Rosetta's memory plane — a per-block learned query? A global learned query per query vector?
4. Would block boundaries in the memory plane align with time tranches, importance scores, or something else?
5. What is the cost model? Block attention reduces memory from O(Ld) to O(Nd) — does a similar reduction apply to a memory-plane variant?

## Evidence

- AttnRes paper: h_l = sum_i→l-1 alpha_i→l · v_i, where weights are softmax over learned pseudo-queries
- Block AttnRes: partitions into ~8 blocks; recovers most gains with O(Nd) memory
- Rosetta Memory Sovereignty Map: Plane 3 = activation/relevance; aggregation mechanism unspecified
- GPQA-Diamond +7.5: multi-step reasoning benefits most from selective depth aggregation

## Risks

- Adding learned parameters to the memory plane introduces training requirements; Rosetta is currently inference-focused
- Block boundaries in memory space are less natural than in transformer depth (layers are sequential; memory artifacts are not)
- Overfitting memory weighting to training distribution could suppress novel but valid older memories

## Notes

- This is a research issue; no implementation is implied by this draft
- Related to AR-002 (block size cost model) — the two should be evaluated together
